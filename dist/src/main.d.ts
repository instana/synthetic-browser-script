/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import * as cproc from "child_process";
import * as driver from "selenium-webdriver";
import * as command from "selenium-webdriver/lib/command";
import { DefineStepPattern, IDefineStepOptions, IDefineTestCaseHookOptions, IDefineTestRunHookOptions, IDefineTestStepHookOptions, IParameterTypeDefinition, TestCaseHookFunction, TestStepFunction, TestStepHookFunction } from "@cucumber/cucumber/lib/support_code_library_builder/types";
import { ScriptRunnerOption } from "./runoption";
import { UserUtil } from "./user";
import { BrowserInfo } from "./common/his-entry";
import { WdioSelector } from "./prepare/inject/webdriverio/utils";
import { TOTPOptions } from "./prepare/inject/mf-authentication";
import { Network } from "./network";
import { CProxyConfig, FFProxyConfig } from "./network";
import { IWorld } from "@cucumber/cucumber";
import { UserInsight } from "./user/util/insight";
/**
 * Declarations we injected
 */
declare module 'selenium-webdriver' {
    interface ThenableWebDriver {
        greeting(): void;
    }
    interface TimeoutOption {
        implicitlyWait(ms: number): Promise<void>;
        pageLoadTimeout(ms: number): Promise<void>;
        setScriptTimeout(ms: number): Promise<void>;
    }
    interface Options {
        timeouts(): TimeoutOption;
    }
    interface Actions {
        mouseMove(location: WebElement | {
            x: number;
            y: number;
        }, opt_offset?: {
            x: number;
            y: number;
        }): Actions;
    }
    interface WebDriver {
        addHeader(key: string, value: string): Promise<void>;
        addHeaders: (headers: {
            [k: string]: string;
        }) => Promise<void>;
        deleteHeader: (key: string) => Promise<void>;
        deleteHeaders: (header: string[]) => Promise<void>;
        getHeaders: () => Map<string, any>;
        waitForAndFindElement: (locator: Locator, timeout?: number) => driver.WebElementPromise;
        waitForPendingRequests: (timeout?: number, test?: boolean) => Promise<void>;
        getBrowserInfo(): Promise<BrowserInfo>;
        schedule: (command: command.Command, description: string) => Promise<any>;
        Command: typeof command.Command;
        CommandName: typeof command.Name;
        $(selector: WdioSelector): driver.WebElementPromise;
        $$(selector: WdioSelector): Promise<driver.WebElement[]>;
        addHostnameToDenylist(hostname: string): Promise<string>;
        addHostnamesToDenylist(hostnameArr: string[]): Promise<string>;
        addHostnameToAllowlist(hostname: string): Promise<string>;
        addHostnamesToAllowlist(hostnameArr: string[]): Promise<string>;
        deleteHostnameFromDenylist(hostname: string): Promise<string>;
        deleteHostnamesFromDenylist(hostnameArr: string[]): Promise<string>;
        deleteHostnameFromAllowlist(hostname: string): Promise<string>;
        deleteHostnamesFromAllowlist(hostnameArr: string[]): Promise<string>;
        setAuthentication(authName: string, authPass: string): Promise<void>;
        /**
         * Generate a Time-based One-time Password (TOTP) token from a TOTP key.
         *
         * It needs to be generated in runtime when you need to input it.
         *
         * The default token settings are:
         * - SHA-1
         * - 30-second epoch interval
         * - 6-digit tokens
         *
         * Settings can be provided as an optional second parameter inside an object.
         * @param {string} key  A TOTP key. Keys provided must be base32 strings
         * @param {TOTPOptions} options  Optional Settings e.g. {digits: 8, algorithm: "SHA-512", period: 60}
         * @returns {string} A Time-based One-time Password (TOTP) token
         */
        generateTOTPToken(key: string, options?: TOTPOptions): string;
        setProxyAuthentication(authName: string, authPass: string): Promise<void>;
        setProxy(proxyURL: string | URL, noProxy?: string): Promise<void>;
        setProxyPAC(pacScriptURL: string, noProxy?: string, authMap?: Map<string, any>): Promise<void>;
        setProxyAdvanced(proxyConfig: Object, authName?: string, authPass?: string): Promise<void>;
        setProxyForHttp(proxyURL: string | URL, noProxy?: string): Promise<void>;
        setProxyForHttps(proxyURL: string | URL, noProxy?: string): Promise<void>;
        getProxy(): FFProxyConfig | CProxyConfig;
        clearProxy(): Promise<void>;
    }
    interface WebElement {
        $(selector: WdioSelector): driver.WebElementPromise;
        $$(selector: WdioSelector): Promise<driver.WebElement[]>;
    }
}
declare global {
    const $driver: typeof driver;
    const $browser: driver.ThenableWebDriver;
    const $bro: driver.WebDriver;
    const $env: NodeJS.ProcessEnv;
    const $secure: NodeJS.Dict<string>;
    const $util: UserUtil;
    const $network: Network;
    const $synthetic: NodeJS.Dict<string>;
    const $attributes: UserInsight;
    const defineParameterType: (options: IParameterTypeDefinition<any>) => void;
    const defineStep: (<WorldType = IWorld>(pattern: DefineStepPattern, code: TestStepFunction<WorldType>) => void) & (<WorldType = IWorld>(pattern: DefineStepPattern, options: IDefineStepOptions, code: TestStepFunction<WorldType>) => void);
    const setDefaultTimeout: (milliseconds: number) => void;
    const setDefinitionFunctionWrapper: (fn: Function) => void;
    const setWorldConstructor: (fn: any) => void;
    const After: (<WorldType = IWorld>(code: TestCaseHookFunction<WorldType>) => void) & (<WorldType = IWorld>(tags: string, code: TestCaseHookFunction<WorldType>) => void) & (<WorldType = IWorld>(options: IDefineTestCaseHookOptions, code: TestCaseHookFunction<WorldType>) => void);
    const AfterStep: (<WorldType = IWorld>(code: TestStepHookFunction<WorldType>) => void) & (<WorldType = IWorld>(tags: string, code: TestStepHookFunction<WorldType>) => void) & (<WorldType = IWorld>(options: IDefineTestStepHookOptions, code: TestStepHookFunction<WorldType>) => void);
    const AfterAll: ((code: Function) => void) & ((options: IDefineTestRunHookOptions, code: Function) => void);
    const Before: (<WorldType = IWorld>(code: TestCaseHookFunction<WorldType>) => void) & (<WorldType = IWorld>(tags: string, code: TestCaseHookFunction<WorldType>) => void) & (<WorldType = IWorld>(options: IDefineTestCaseHookOptions, code: TestCaseHookFunction<WorldType>) => void);
    const BeforeStep: (<WorldType = IWorld>(code: TestStepHookFunction<WorldType>) => void) & (<WorldType = IWorld>(tags: string, code: TestStepHookFunction<WorldType>) => void) & (<WorldType = IWorld>(options: IDefineTestStepHookOptions, code: TestStepHookFunction<WorldType>) => void);
    const BeforeAll: ((code: Function) => void) & ((options: IDefineTestRunHookOptions, code: Function) => void);
    const Given: (<WorldType = IWorld>(pattern: DefineStepPattern, code: TestStepFunction<WorldType>) => void) & (<WorldType = IWorld>(pattern: DefineStepPattern, options: IDefineStepOptions, code: TestStepFunction<WorldType>) => void);
    const Then: (<WorldType = IWorld>(pattern: DefineStepPattern, code: TestStepFunction<WorldType>) => void) & (<WorldType = IWorld>(pattern: DefineStepPattern, options: IDefineStepOptions, code: TestStepFunction<WorldType>) => void);
    const When: (<WorldType = IWorld>(pattern: DefineStepPattern, code: TestStepFunction<WorldType>) => void) & (<WorldType = IWorld>(pattern: DefineStepPattern, options: IDefineStepOptions, code: TestStepFunction<WorldType>) => void);
}
/**
 * Implementation
 */
export declare function greeting(name: string): string;
export declare function executeSyntheticTest(option: ScriptRunnerOption): Promise<{
    proc: cproc.ChildProcess;
    shutdown: () => void;
}>;
