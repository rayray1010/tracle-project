export enum LoggingLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}
export interface Config {
  maxConnections: number;
  maintenanceMode: boolean;
  supportedLocales: string[];
  loggingLevel: LoggingLevel;
}
