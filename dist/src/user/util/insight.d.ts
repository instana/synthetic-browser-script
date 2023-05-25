export declare class UserInsight {
    insightsData: Map<string, any>;
    set: (k: string, v: any) => Map<string, any>;
    get: (k: string) => any;
    getKeys: () => string[];
    has: (k: string) => boolean;
    unset: (k: string) => boolean;
    unsetAll: () => void;
}
