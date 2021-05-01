/**
 * A digit in a number.
 */
export interface Digit {
    /**
     * The number of a digit. For example, in the number `A 2 3 4.56`, the number of the first digit is `A`.
     */
    number: string;

    /**
     * The decimals of a digit. For example, in the number `A 2 3 4.56`, the number of the fourth digit is `56`.
     */
    decimals?: number;
}