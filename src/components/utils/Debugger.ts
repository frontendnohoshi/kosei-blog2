const isDebug = true;

export const getDebugger = (enabled: boolean = true): ((message?: any, ...optionalParams: any[]) => void) => {
  return isDebug && enabled ? console.log.bind(console) : () => {};
};
