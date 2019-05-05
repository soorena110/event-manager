"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModeManagementLocalStorageKey = 'ModeManagementData';
var ModeManagementClass = /** @class */ (function () {
    function ModeManagementClass() {
        var _this = this;
        this._activeModes = [];
        this._keys = [];
        this.modeModifier = {};
        var savedMode = localStorage.getItem(ModeManagementLocalStorageKey);
        if (savedMode)
            this._activeModes = JSON.parse(savedMode);
        this.modeModifier.showActiveModes = function () { return _this._logActiveModes(); };
        this.modeModifier.clear = function () { return _this._clear(); };
        this._setActiveModesFromUrl();
        if (this._activeModes.length)
            this._logActiveModes();
    }
    ModeManagementClass.prototype.add = function (name, defaultValue) {
        var _this = this;
        if (defaultValue === void 0) { defaultValue = false; }
        if (defaultValue && this._activeModes.indexOf(name) == -1)
            this._activeModes.push(name);
        if (!defaultValue && this._keys.indexOf(name) == -1)
            this._keys.push(name);
        this.modeModifier[name + 'On'] = function () { return _this._set(name, true); };
        this.modeModifier[name + 'Off'] = function () { return _this._set(name, false); };
    };
    ModeManagementClass.prototype.getEnabled = function (name) {
        if (this._keys.indexOf(name) == -1) {
            console.error("'" + name + "' does not exist in ModeManagement");
            return false;
        }
        return this._activeModes.indexOf(name) != -1;
    };
    ModeManagementClass.prototype._setActiveModesFromUrl = function () {
        var _this = this;
        var urlModeSplit = window.location.href.split('mode=');
        if (urlModeSplit.length >= 2)
            urlModeSplit[1].split(',').forEach(function (mode) {
                return _this._activeModes.push(mode);
            });
    };
    ModeManagementClass.prototype._clear = function () {
        this._activeModes = [];
        this._saveStorage();
    };
    ModeManagementClass.prototype._set = function (name, isEnabled) {
        var ix = this._activeModes.indexOf(name);
        if (isEnabled && ix == -1)
            this._activeModes.push(name);
        if (!isEnabled && ix != -1)
            this._activeModes.splice(ix, 1);
        this._saveStorage();
    };
    ModeManagementClass.prototype._saveStorage = function () {
        localStorage.setItem(ModeManagementLocalStorageKey, JSON.stringify(this._activeModes));
        this._logActiveModes();
    };
    ModeManagementClass.prototype._logActiveModes = function () {
        var activeModes = this._activeModes && this._activeModes.length ? this._activeModes.join(', ') : '- No Active Mode -';
        console.log('%c  Mode  %c ' + activeModes, 'background:orange;color:black', 'color:orange');
    };
    return ModeManagementClass;
}());
exports.ModeManagementClass = ModeManagementClass;
var ModeManagement = new ModeManagementClass();
exports.default = ModeManagement;
window.$mode = ModeManagement.modeModifier;
ModeManagement.add('noRefresh');
ModeManagement.add('socket');
