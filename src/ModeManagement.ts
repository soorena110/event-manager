const ModeManagementLocalStorageKey = 'ModeManagementData';

export class ModeManagementClass {
    private _activeModes = [] as string[];
    private _keys = [] as string[];
    public modeModifier = {} as any;

    constructor() {
        const savedMode = localStorage.getItem(ModeManagementLocalStorageKey);
        if (savedMode)
            this._activeModes = JSON.parse(savedMode);
        this.modeModifier.showActiveModes = () => this._logActiveModes();
        this.modeModifier.clear = () => this._clear();

        this._setActiveModesFromUrl();
        if (this._activeModes.length)
            this._logActiveModes();
    }

    add(name: string, defaultValue = false) {
        if (defaultValue && this._activeModes.indexOf(name) == -1)
            this._activeModes.push(name);
        if (!defaultValue && this._keys.indexOf(name) == -1)
            this._keys.push(name);
        this.modeModifier[name + 'On'] = () => this._set(name, true);
        this.modeModifier[name + 'Off'] = () => this._set(name, false);
    }

    getEnabled(name: string) {
        if (this._keys.indexOf(name) == -1) {
            console.error(`'${name}' does not exist in ModeManagement`);
            return false;
        }

        return this._activeModes.indexOf(name) != -1;
    }

    setEnabled(name: string, enability: boolean) {
        this.modeModifier[name + (enability ? 'On' : 'Off')]();
    }

    private _setActiveModesFromUrl() {
        const urlModeSplit = window.location.href.split('mode=');
        if (urlModeSplit.length >= 2)
            urlModeSplit[1].split(',').forEach(mode =>
                this._activeModes.push(mode))
    }

    private _clear() {
        this._activeModes = [];
        this._saveStorage();
    }

    private _set(name: string, isEnabled: boolean) {
        const ix = this._activeModes.indexOf(name);
        if (isEnabled && ix == -1)
            this._activeModes.push(name);
        if (!isEnabled && ix != -1)
            this._activeModes.splice(ix, 1);
        this._saveStorage();
    }

    private _saveStorage() {
        localStorage.setItem(ModeManagementLocalStorageKey, JSON.stringify(this._activeModes));
        this._logActiveModes()
    }

    private _logActiveModes() {
        const activeModes = this._activeModes && this._activeModes.length ? this._activeModes.join(', ') : '- No Active Mode -';
        console.log('%c  Mode  %c ' + activeModes, 'background:orange;color:black', 'color:orange');
    }

}

const ModeManagement = new ModeManagementClass();
export default ModeManagement;

(window as any).$mode = ModeManagement.modeModifier;
