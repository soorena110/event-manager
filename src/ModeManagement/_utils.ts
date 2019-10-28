import {getModesFromLocalStorage, getModesFromUrl, localStorageKey} from "./_storageUtils";

export const logActiveModes = (storageKey = localStorageKey) => {
    const modesInLocalStorage = getModesFromLocalStorage(storageKey);
    const hasModesInLocalStorage = Object.keys(modesInLocalStorage).length > 0;
    if (hasModesInLocalStorage)
        log('active', modesInLocalStorage);


    const modesInUrl = getModesFromUrl();
    const hasModesInUrl = Object.keys(modesInUrl).length > 0;
    if (hasModesInUrl)
        log('in url', hasModesInUrl);

    if (!hasModesInLocalStorage && !hasModesInUrl)
        log('-- NO ACTIVE MODE --', '');
};

const log = (title: string, data: any) => {
    console.log('%c  Mode  %c ' + title + ' : ', 'background:orange;color:black', 'color:orange', data);
};