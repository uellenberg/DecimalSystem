import {Digit} from "./Digit";
import {SplitNumber} from "../NumberTools";

/**
 * An class providing information about a number.
 */
export class Num {
    private _base: number;
    /**
     * The base that the number is in.
     */
    public get base(): number {
        return this._base;
    }

    private _isDecimal: boolean;
    /**
     * When a decimal number is converted to a decimal base, it can a digit to become a decimal. Normally a number looks like `1 2 3 4`, but in some cases, it can look like `1.1 2 3 4`. If one of the digits is a decimal, this value is `true`.
     */
    public get isDecimal(): boolean {
        return this._isDecimal;
    }

    private _digits: Digit[];
    /**
     * The non-decimal digits of a number.
     * For example, in the number `1234.56`, this will contain the digits `1234`.
     */
    public get digits(): ReadonlyArray<Digit> {
        return this._digits;
    }

    private _decimals: Digit[];
    /**
     * The decimal digits of a number.
     * For example, in the number `1234.56`, this will contain the digit `56`.
     */
    public get decimals(): ReadonlyArray<Digit> {
        return this._decimals;
    }

    /**
     * Turn a base 10 number into a Num.
     * @param num {number} - is the number which will be used.
     * @constructor
     */
    public constructor(num: number) {
        this._base = 10;
        this._isDecimal = false;
        this._digits = [];
        this._decimals = [];

        const split = SplitNumber(num);

        for (let digit of split.digits) {
            this._digits.push({number: digit});
        }

        if(split.decimals){
            for (let decimal of split.decimals) {
                this._decimals.push({number: decimal});
            }
        }
    }
}