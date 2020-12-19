/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
import ModeManagement, { ModeManagementClass } from './index';


export function useMode<T = any>(modeName: string, modeManagementObject = ModeManagement) {
  const [mode, setMode] = useState<T>(modeManagementObject.get(modeName));

  useEffect(() => {
    const handler = (value: T) => setMode(value);
    modeManagementObject.events.addEventListener(modeName, handler);
    return () => modeManagementObject.events.removeEventListener(modeName, handler);
  }, [modeName]);

  return mode;
}


export function useModeFlag(modeName: string, modeManagementObject?: ModeManagementClass) {
  return useMode<boolean>(modeName, modeManagementObject);
}

export function useModeMutation<T = any>(modeName: string, modeManagementObject = ModeManagement) {
  return useCallback((value: T) =>
      modeManagementObject.set(modeName, value)
    , [modeName]);
}

export function useModeFlagMutation(modeName: string, modeManagementObject = ModeManagement) {
  return useModeMutation<boolean>(modeName, modeManagementObject);
}
