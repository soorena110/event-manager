/* eslint-disable @typescript-eslint/no-explicit-any */
import { clearModes, loadModes, saveMode } from './_storageUtils';
import { logActiveModes } from './_utils';
import TraceLogger from './TraceLogger';
import EventManager from './EventManager';

const logSettings = new TraceLogger('modeManager', ['verbose']);

class ModeManagementClass {
  events = new EventManager<any, string>();

  public localStorageKey?: string;
  private _modes = {} as { [key: string]: any };
  public modeModifier = {} as any;

  constructor() {
    this._modes = loadModes(this.localStorageKey);
    if (logSettings.get('verbose'))
      logActiveModes(this.localStorageKey);

    Object.defineProperty(this.modeModifier, 'activeModes', { get: () => this.logActiveModes() });
    Object.defineProperty(this.modeModifier, 'clear', { get: () => this.clear() });
  }

  logActiveModes() {
    logActiveModes(this.localStorageKey);
  }

  clear() {
    this._modes = {};
    clearModes();
    return 'cleared';
  }

  add(modeName: string, defaultValue: any) {
    if (this._modes[modeName] == undefined)
      this._modes[modeName] = defaultValue;

    if (!this.modeModifier[modeName])
      this._defineModeModifierGetSetProps(modeName);
  }

  set(modeName: string, value: any, options?: { preventTriggerEvents: boolean }) {
    this._modes[modeName] = value;

    if (!options || !options.preventTriggerEvents)
      this.events.trigger(modeName, value);

    saveMode(modeName, value, this.localStorageKey);

    this._defineModeModifierGetSetProps(modeName);
  }

  private _defineModeModifierGetSetProps(modeName: string) {
    if (!(modeName in this.modeModifier))
      Object.defineProperty(this.modeModifier, modeName, {
        get: () => this.get(modeName),
        set: (value) => this.set(modeName, value),
      });
  }

  get(modeName: string) {
    if (this._modes[modeName] == undefined)
      console.warn(`'${modeName}' does not exist in ModeManagement`);
    return this._modes[modeName];
  }


  addFlag(modeName: string, defaultValue: boolean) {
    if (this._modes[modeName] == undefined)
      this._modes[modeName] = defaultValue;

    this._defineModeModifierGetSetBooleanProps(modeName, defaultValue);
  }

  setFlag(modeName: string, value: boolean, options?: { preventTriggerEvents: boolean }) {
    if (this._modes[modeName] != value)
      this._modes[modeName] = value;

    if (!options || !options.preventTriggerEvents)
      this.events.trigger(modeName, value);

    saveMode(modeName, value, this.localStorageKey);

    this._defineModeModifierGetSetBooleanProps(modeName, value);
  }


  private _defineModeModifierGetSetBooleanProps(modeName: string, value: boolean) {
    const newPropName = modeName + (value ? '_off' : '_on');
    const deletingPropName = modeName + (!value ? '_off' : '_on');

    if (deletingPropName in this.modeModifier)
      delete this.modeModifier[deletingPropName];

    if (!(newPropName in this.modeModifier))
      Object.defineProperty(this.modeModifier, newPropName, {
        get: () => {
          this.setFlag(modeName, !value);
          return `$mode.${modeName} is set to '${!value}'`;
        },
        configurable: true,
      });
  }

  getFlag(modeName: string) {
    if (this._modes[modeName] == undefined)
      console.warn(`'${modeName}' does not exist in ModeManagement`);
    return this._modes[modeName];
  }
}

export { ModeManagementClass };

const globalAsAny = global as any;
if (!('$_modeManager' in global)) {
  globalAsAny.$_modeManager = new ModeManagementClass();
  Object.defineProperty(global, '$mode', {
    get: () => globalAsAny.$_modeManager.modeModifier,
  });
}
const ModeManagement = globalAsAny.$_modeManager as ModeManagementClass;
export default ModeManagement;
