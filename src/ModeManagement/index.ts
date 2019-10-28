import {EventHandlerClass} from "./EventHandler";
import {clearModes, loadModes, saveMode} from "./_storageUtils";
import {logActiveModes} from "./_utils";


class ModeManagementClass extends EventHandlerClass {
    public localStorageKey?: string;
    private _modes = {} as { [key: string]: any };
    public modeModifier = {} as any;

    constructor() {
        super();

        this._modes = loadModes(this.localStorageKey);
        if (Object.keys(this._modes).length > 0)
            logActiveModes(this.localStorageKey);

        Object.defineProperty(this.modeModifier, 'activeModes', {get: () => this.logActiveModes()});
        Object.defineProperty(this.modeModifier, 'activeModes', {get: () => this.clear()});
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
        if (!this._modes[name])
            this._modes[name] = defaultValue;

        if (!this.modeModifier[name])
            this._defineModeModifierGetSetProps(name);
    }

    set(name: string, value: any, options?: { preventTriggerEvents: boolean }) {
        this._modes[name] = value;

        if (!options || !options.preventTriggerEvents)
            this._eventHandler.trigger(name, value);

        saveMode(name, value, this.localStorageKey);

        if (this.modeModifier[name] == undefined)
            this._defineModeModifierGetSetProps(name);
    }

    private _defineModeModifierGetSetProps(name: string) {
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
        if (!this._modes[name])
            this._modes[name] = defaultValue;

        if (this.modeModifier[name] == undefined)
            this._defineModeModifierGetSetBooleanProps(name, defaultValue);
    }

    private _defineModeModifierGetSetBooleanProps(name: string, value: boolean) {
        const newPropName = name + (value ? '_off' : '_on');
        const deletingPropName = name + (!value ? '_off' : '_on');

        if (this.modeModifier[deletingPropName])
            delete this.modeModifier[deletingPropName];

        if (!this.modeModifier[newPropName])
            Object.defineProperty(this.modeModifier, newPropName, {
                get: () => this.set(name, true)
            });
    }

    setFlag(name: string, value: any, options?: { preventTriggerEvents: boolean }) {
        if (this._modes[name] != value)
            this._modes[name] = value;

        if (!options || !options.preventTriggerEvents)
            this._eventHandler.trigger(name, value);

        if (this.modeModifier[name] == undefined)
            this._defineModeModifierGetSetBooleanProps(name, value);
    }

    getFlag(name: string) {
        if (this._modes[name] == undefined)
            console.error(`'${name}' does not exist in ModeManagement`);
        return this._modes[name];
    }

}

export {ModeManagementClass};

const ModeManagement = new ModeManagementClass();
export default ModeManagement;

(window as any).$mode = ModeManagement.modeModifier;
