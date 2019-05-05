export declare class ModeManagementClass {
    private _activeModes;
    private _keys;
    modeModifier: any;
    constructor();
    add(name: string, defaultValue?: boolean): void;
    getEnabled(name: string): boolean;
    private _setActiveModesFromUrl;
    private _clear;
    private _set;
    private _saveStorage;
    private _logActiveModes;
}
declare const ModeManagement: ModeManagementClass;
export default ModeManagement;
