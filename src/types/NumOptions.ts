/**
 * The options for a Num. Alternatively, a number or string can be specified and will be treated as a base 10 number.
 */
export interface NumOptions {
    /**
     * The number being parsed.
     */
    num: number | string;
    /**
     * The base that the number is in.
     */
    base?: number;
}
