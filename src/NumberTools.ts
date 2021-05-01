import {Num} from "./types/Num";

/**
 * Turn a base 10 number into a Num.
 * @param num {number} - is the number which will be used.
 * @constructor
 */
export const FromNumber = (num: number) : Num => {
    const number: Num = {base: 10, decimals: [], digits: [], isDecimal: false};

    const split = SplitNumber(num);

    for (let digit of split.digits) {
        number.digits.push({number: digit});
    }

    if(split.decimals){
        for (let decimal of split.decimals) {
            number.decimals.push({number: decimal});
        }
    }

    return number;
}

/**
 * Split a number into its digits and decimals.
 * @param num {number} - is the number which will be split.
 * @constructor
 */
const SplitNumber = (num: number) : SplitNumber => {
    const split = num.toString().split(".");

    return {digits: split.shift(), decimals: split.shift() || null};
}

/**
 * A number split into its digits and decimals.
 */
interface SplitNumber {
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
const GetNumberInfo = (num: number) : NumberInfo => {
    const split = SplitNumber(num);

    return {digits: split.digits, decimals: split.decimals, wholeNumber: parseInt(split.digits + (split.digits || ""))};
}

/**
 * Info about a number used for converting to other bases.
 */
interface NumberInfo {
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