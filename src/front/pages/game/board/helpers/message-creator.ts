export type TSeverity = 'success' | 'info' | 'warning' | 'error';

export const snackMessageCreator = (message: string, severity: TSeverity) => ({
  message,
  key: new Date().getTime(),
  severity,
});
