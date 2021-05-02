/**
 * Split a number into its digits and decimals.
 * @param num {number} - is the number which will be split.
 * @constructor
 */
import {Digit} from "./types/Digit";

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
 * Converts a digit to a number
 * @param digit {Digit} - the digit being converted.
 */
export const DigitToNumber = (digit: Digit) : number => {
    //Essentially, the way this works is that if the number is not an integer, then it is the character code - 87. This is because character code 97 (a) is the first character code for 10.

    let num = parseInt(digit.number);
    if(isNaN(num)) num = digit.number.charCodeAt(0) - 87;

    if(digit.decimals) num += digit.decimals/Math.pow(10, digit.decimals.toString().length);

    return num;
}

/**
 * Converts a number to a digit, optionally changing its base.
 * @param num {number} - the number that will be changed to a Digit.
 * @constructor
 */
export const NumberToDigit = (num: number) : Digit => {
    //This is similar to the above, but in reverse.

    const split = SplitNumber(num);

    return num < 10 ? {number: split.digits, decimals: split.decimals ? parseInt(split.decimals) : null} : {number: String.fromCharCode(parseInt(split.digits)+87), decimals: split.decimals ? parseInt(split.decimals) : null};
}

/**
 * Convert a fraction in base 10 to another base.
 * @param fraction {number} - is the base 10 fraction which will be converted.
 * @param base {number} - is the base which the fraction will be converted to.
 * @param precision {number} - is the maximum decimal places a decimal should have.
 */
export const FractionToBase = (fraction: number, base: number, precision: number) : string[] => {
    let digits: string[] = [];
    let tries = 0;

    while (fraction && tries < precision) {
        const num = Math.floor((fraction * Math.pow(base, tries+1)) % base);
        let digit = NumberToDigit(num);

        digits.push(digit.number);

        tries++;
    }

    return digits;
}