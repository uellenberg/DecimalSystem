/**
 * Split a number into its digits and decimals.
 * @param num {number} - is the number which will be split.
 * @constructor
 */
export const SplitNumber = (num: number) : SplitNumber => {
    const split = num.toString().split(".");

    return {digits: split.shift(), decimals: split.shift() || null};
}

/**
 * A number split into its digits and decimals.
 */
export interface SplitNumber {
    /**
     * The number's digits.
     */
    digits: string;

    /**
     * The number's decimals. `Null` if the number has no decimals.
     */
    decimals?: string;
}

/**
 * Get information about a number used for converting to other bases.
 * @param num {number} - is the number which will be used to get info.
 * @constructor
 */
export const GetNumberInfo = (num: number) : NumberInfo => {
    const split = SplitNumber(num);

    return {digits: split.digits, decimals: split.decimals, wholeNumber: parseInt(split.digits + (split.digits || ""))};
}

/**
 * Info about a number used for converting to other bases.
 */
export interface NumberInfo {
    /**
     * The number's digits.
     */
    digits: string;

    /**
     * The number's decimals. `Null` if the number has no decimals.
     */
    decimals?: string;

    /**
     * The entire number, with decimals treated as normal digits.
     * For example, 1.101 turns to 1101.
     */
    wholeNumber: number;
}