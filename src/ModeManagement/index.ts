import {clearModes, loadModes, saveMode} from "./_storageUtils";
import {logActiveModes} from "./_utils";
import {EventManager, TraceLogger} from "azi-tools";

export type ModeManagementEventHandler = (newValue: string) => void;
const logSettings = new TraceLogger('modeManager', ['verbose']);

class ModeManagementClass {
    events = new EventManager<ModeManagementEventHandler, string>();

    public localStorageKey?: string;
    private _modes = {} as { [key: string]: any };
    public modeModifier = {} as any;

    constructor() {
        this._modes = loadModes(this.localStorageKey);
        if (logSettings.get('verbose'))
            logActiveModes(this.localStorageKey);

        Object.defineProperty(this.modeModifier, 'activeModes', {get: () => this.logActiveModes()});
        Object.defineProperty(this.modeModifier, 'clear', {get: () => this.clear()});
    }

    logActiveModes() {
        logActiveModes(this.localStorageKey);
        return '';
    }

    clear() {
        this._modes = {};
        clearModes();
        return 'cleared';
    }

    add(name: string, defaultValue: any) {
        if (this._modes[name] == undefined)
            this._modes[name] = defaultValue;

        if (!this.modeModifier[name])
            this._defineModeModifierGetSetProps(name);
    }

    set(name: string, value: any, options?: { preventTriggerEvents: boolean }) {
        this._modes[name] = value;

        if (!options || !options.preventTriggerEvents)
            this.events.trigger(name, value);

        saveMode(name, value, this.localStorageKey);

        this._defineModeModifierGetSetProps(name);
    }

    private _defineModeModifierGetSetProps(name: string) {
        if (!(name in this.modeModifier))
            Object.defineProperty(this.modeModifier, name, {
                get: () => this.get(name),
                set: (value) => this.set(name, value)
            });
    }

    get(name: string) {
        if (this._modes[name] == undefined)
            console.error(`'${name}' does not exist in ModeManagement`);
        return this._modes[name];
    }


    addFlag(name: string, defaultValue: boolean) {
        if (this._modes[name] == undefined)
            this._modes[name] = defaultValue;

        this._defineModeModifierGetSetBooleanProps(name, defaultValue);
    }

    setFlag(name: string, value: boolean, options?: { preventTriggerEvents: boolean }) {
        if (this._modes[name] != value)
            this._modes[name] = value;

        if (!options || !options.preventTriggerEvents)
            this.events.trigger(name, value);

        saveMode(name, value, this.localStorageKey);

        this._defineModeModifierGetSetBooleanProps(name, value);
    }


    private _defineModeModifierGetSetBooleanProps(name: string, value: boolean) {
        const newPropName = name + (value ? '_off' : '_on');
        const deletingPropName = name + (!value ? '_off' : '_on');

        if (deletingPropName in this.modeModifier)
            delete this.modeModifier[deletingPropName];

        if (!(newPropName in this.modeModifier))
            Object.defineProperty(this.modeModifier, newPropName, {
                get: () => {
                    this.setFlag(name, !value);
                    return `$mode.${name} is set to '${!value}'`;
                },
                configurable: true
            });
    }

    getFlag(name: string) {
        if (this._modes[name] == undefined)
            console.error(`'${name}' does not exist in ModeManagement`);
        return this._modes[name];
    }
}

export {ModeManagementClass};

const win = window as any;
if (!('$_modeManager' in window)) {
    win.$_modeManager = new ModeManagementClass();
    Object.defineProperty(window, '$mode', {
        get: () => win.$_modeManager.modeModifier
    });
}
const ModeManagement = win.$_modeManager as ModeManagementClass;
export default ModeManagement;
export const connectToModeChange = ModeManagement.events.connectToEvent;
