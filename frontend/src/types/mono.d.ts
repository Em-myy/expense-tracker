declare module "@mono.co/connect.js" {
  export interface MonoSuccessData {
    id: string;
  }

  export interface MonoEventData {
    type: string;
    reference?: string;
    pageName?: string;
    errorType?: string;
    errorMessage?: string;
    timestamp: number;
  }

  export interface MonoConfiguration {
    key: string;
    onSuccess: (data: MonoSuccessData) => void;
    onClose?: () => void;
    onLoad?: () => void;
    onEvent?: (eventName: string, data: MonoEventData) => void;
    reference?: string;
  }

  export default class MonoConnect {
    constructor(config: MonoConfiguration);
    setup(): void;
    open(): void;
    close(): void;
    reauthorize(reauthCode: string): void;
  }
}
