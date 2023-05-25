import { Circus } from "@jest/types";
export declare type JestEvent = JestSyncEvent | JestAsyncEvent;
export declare type JestSyncEvent = {
    timestamp: number;
    mode: Circus.BlockMode;
    name: 'start_describe_definition';
    blockName: Circus.BlockName;
} | {
    timestamp: number;
    mode: Circus.BlockMode;
    name: 'finish_describe_definition';
    blockName: Circus.BlockName;
} | {
    timestamp: number;
    name: 'add_hook';
    hookType: Circus.HookType;
    timeout: number | undefined;
} | {
    timestamp: number;
    name: 'add_test';
    testName: Circus.TestName;
    mode?: Circus.TestMode;
    timeout: number | undefined;
} | {
    timestamp: number;
    name: 'error';
    formattedError: string;
};
export declare type JestAsyncEvent = {
    timestamp: number;
    name: 'setup';
    testNamePattern?: string;
} | {
    timestamp: number;
    name: 'include_test_location_in_result';
} | {
    timestamp: number;
    name: 'hook_start';
} | {
    timestamp: number;
    name: 'hook_success';
    describeBlock?: JestDescribeBlock;
    test?: JestTestEntry;
} | {
    timestamp: number;
    name: 'hook_failure';
    formattedError: string;
    describeBlock?: JestDescribeBlock;
    test?: JestTestEntry;
} | {
    timestamp: number;
    name: 'test_fn_start';
    test: JestTestEntry;
} | {
    timestamp: number;
    name: 'test_fn_success';
    test: JestTestEntry;
} | {
    timestamp: number;
    name: 'test_fn_failure';
    formattedError: string;
    test: JestTestEntry;
} | {
    timestamp: number;
    name: 'test_retry';
    test: JestTestEntry;
} | {
    timestamp: number;
    name: 'test_start';
    test: JestTestEntry;
} | {
    timestamp: number;
    name: 'test_skip';
    test: JestTestEntry;
} | {
    timestamp: number;
    name: 'test_todo';
    test: JestTestEntry;
} | {
    timestamp: number;
    name: 'test_done';
    test: JestTestEntry;
} | {
    timestamp: number;
    name: 'run_describe_start';
    describeBlock: JestDescribeBlock;
} | {
    timestamp: number;
    name: 'run_describe_finish';
    describeBlock: JestDescribeBlock;
} | {
    timestamp: number;
    name: 'run_start';
} | {
    timestamp: number;
    name: 'run_finish';
} | {
    timestamp: number;
    name: 'teardown';
};
export declare type JestDescribeBlock = {
    type: 'describeBlock';
    children: Array<{
        type: 'test' | 'describeBlock';
        name: Circus.BlockName;
    }>;
    mode: Circus.BlockMode;
    name: Circus.BlockName;
    parent?: Circus.BlockName[];
};
export declare type JestTestEntry = {
    type: 'test';
    invocations: number;
    mode: Circus.TestMode;
    name: Circus.TestName;
    parent: Circus.BlockName[];
    startedAt?: number | null;
    duration?: number | null;
    status?: Circus.TestStatus | null;
    timeout?: number;
};
export declare function parseJestEvent(event: Circus.Event): JestEvent;
