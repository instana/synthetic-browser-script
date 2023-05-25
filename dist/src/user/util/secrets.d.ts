/**
 * IBM Confidential
 * PID 5737-N85, 5900-AG5
 * Copyright IBM Corp. 2022
 */
import { SecretRedactor } from "../../common/strip-secrets";
export declare class Secrets extends SecretRedactor {
    /**
     * URL parameters will be replaced with redacted value, if parameter name matches any regex expression in this array
     * e.g. https://rtpgsa.ibm.com/gsadoc/?account=user1&pass=*"
     * @param urlRegex RegExp[] e.g. [/redig/i, /pass/i]
     */
    setURLSecretsRegExps(urlRegex: RegExp[]): void;
    getURLSecretsRegExp(): [] | RegExp[];
}
