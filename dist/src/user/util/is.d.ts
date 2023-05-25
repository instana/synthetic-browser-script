export declare const UserIs: {
    undefined: (value: any) => value is undefined;
    defined: (ref: any) => boolean;
    NaN: (value?: any) => boolean;
    number: (value?: any) => value is number;
    numeric: (ref: any) => boolean;
    string: (value?: any) => value is string;
    array: {
        (value?: any): value is any[];
        <T>(value?: any): value is any[];
    };
    object: (value?: any) => value is object;
    function: (value: any) => value is (...args: any[]) => any;
    collection: (ref: any) => boolean;
    empty: (value?: any) => boolean;
};
