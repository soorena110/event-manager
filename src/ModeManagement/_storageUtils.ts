export const localStorageKey = 'ModeManagementData';

export const saveMode = (key: string, value: any, storageKey = localStorageKey) => {
    const savingObj = {
        ...getModesFromLocalStorage(storageKey),
        [key]: value
    };
    localStorage.setItem(storageKey, JSON.stringify(savingObj));
};

export const loadModes = (storageKey = localStorageKey) => {
    return {
        ...getModesFromLocalStorage(storageKey),
        ...getModesFromUrl()
    }
};

export const clearModes = (storageKey = localStorageKey) => {
    localStorage.removeItem(storageKey);
};
export const removeMode = (key: string, storageKey = localStorageKey) => {
    const savingObj = {
        ...getModesFromLocalStorage(storageKey)
    };
    delete savingObj[key];
    localStorage.setItem(storageKey, JSON.stringify(savingObj));
};


export const getModesFromLocalStorage = (storageKey = localStorageKey) => {
    const savedMode = localStorage.getItem(storageKey);
    if (!savedMode) return {};

    try {
        return JSON.parse(savedMode)
    } catch (e) {
        console.error('Modes could not be loaded.', e);
        return {};
    }
};

export const getModesFromUrl = () => {
    const ret = {} as any;
    const urlModeSplit = window.location.href.split('mode=');
    if (urlModeSplit.length >= 2)
        urlModeSplit[1].split(',').forEach(mode => ret [mode] = true);
    return ret;
};