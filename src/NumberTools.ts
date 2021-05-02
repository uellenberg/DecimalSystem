/**
 * Converts a digit to a number
 * @param digit {string} - the digit being converted.
 */
export const DigitToNumber = (digit: string) : number => {
    //Essentially, the way this works is that if the number is not an integer, then it is the character code - 87. This is because character code 97 (a) is the first character code for 10.

    let num = parseInt(digit);
    if(isNaN(num)) num = digit.charCodeAt(0) - 87;

    return num;
}

/**
 * Converts a number to a digit, optionally changing its base.
 * @param num {number} - the number that will be changed to a Digit.
 * @constructor
 */
export const NumberToDigit = (num: number) : string => {
    return num < 10 ? num.toString() : String.fromCharCode(num+87);
}