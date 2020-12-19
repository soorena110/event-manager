/* eslint-disable @typescript-eslint/no-explicit-any */
const globalAsAny = global as any;

export default class TraceLogger {
  private readonly _keys: string[] = [];
  private readonly _defaultValues?: boolean[];
  private readonly _name: string;
  private readonly settings = {
    logs: {} as any,
  };

  constructor(name: string, loggerKeys: string[], defaultValues?: boolean[]) {
    this._keys = loggerKeys;
    this._name = name;
    this._defaultValues = defaultValues;

    this._createTraceObjcet();
    this._loadPreviousSetting();
  }

  get(key: string) {
    return !!this.settings.logs[key];
  }

  private _getStorageKey() {
    return 'logSetting.' + this._name;
  }

  private _saveLogSetting() {
    try {
      const logStrings = JSON.stringify(this.settings.logs);
      localStorage.setItem(this._getStorageKey(), logStrings);
    } catch {
    }
  }


  private _loadPreviousSettingFromLocalStorage() {
    if (!globalAsAny || !globalAsAny.localStorage)
      return {};

    try {
      const logSettingString = globalAsAny.localStorage.getItem(this._getStorageKey());
      if (logSettingString)
        return JSON.parse(logSettingString);
    } catch {
    }
    return {};
  }

  private _loadPreviousSetting = () => {
    if (!globalAsAny) return;

    const previousLogSetting = this._loadPreviousSettingFromLocalStorage();
    this._keys.forEach((verb, ix) => {
      let value = previousLogSetting[verb];
      if (previousLogSetting[verb] == undefined)
        value = this._defaultValues ? this._defaultValues[ix] : false;
      globalAsAny.$trace[this._name].setLogEnablity(verb, value);
    });
  };

  private _createTraceObjcet() {
    if (!globalAsAny) return;

    if (!globalAsAny.$trace) globalAsAny.$trace = {};

    globalAsAny.$trace[this._name] = {
      setting: this.settings,
      setLogEnablity: (verb: string, enablity: boolean) => {
        this.settings.logs[verb] = enablity;
        this._saveLogSetting();
        const newPropName = verb + (enablity ? '_off' : '_on');
        const deletingPropName = verb + (!enablity ? '_off' : '_on');

        Object.defineProperty(globalAsAny.$trace[this._name], newPropName, {
          get: () => globalAsAny.$trace[this._name].setLogEnablity(verb, !enablity),
          configurable: true,
        });
        delete globalAsAny.$trace[this._name][deletingPropName];

        return `$trace.${this._name}.${verb} is set to '${enablity}'`;
      },
      setAllLogsEnablity: (enablity: boolean) => {
        if (!globalAsAny) return;

        this._keys.forEach(verb => globalAsAny.$trace[this._name].setLogEnablity(verb, enablity));
      },
    };
  }
}
