import {Digit} from "./Digit";

/**
 * An interface providing information about a number.
 */
export interface Num {
    /**
     * The base that the number is in.
     */
    base: number;

    /**
     * When a decimal number is converted to a decimal base, it can a digit to become a decimal. Normally a number looks like `1 2 3 4`, but in some cases, it can look like `1.1 2 3 4`. If one of the digits is a decimal, this value is `true`.
     */
    isDecimal: boolean;

    /**
     * The non-decimal digits of a number.
     * For example, in the number `1234.56`, this will contain the digits `1234`.
     */
    digits: Digit[];

    /**
     * The decimal digits of a number.
     * For example, in the number `1234.56`, this will contain the digit `56`.
     */
    decimals: Digit[];
}