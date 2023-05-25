import { ThenableWebDriver } from "selenium-webdriver";
import { UserInsight } from "./insight";
import { Secrets } from "./secrets";
export declare class UserUtil {
    private webDriver;
    insights: UserInsight;
    secrets: Secrets;
    is: {
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
    constructor(webDriver: ThenableWebDriver);
    finish: () => Promise<string>;
}
