import {Digit} from "./Digit";
import {DigitToNumber, NumberToDigit, SplitNumber} from "../NumberTools";

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

    /**
     * Converts a num to another number system in place.
     */
    public ToBase(base: number) : void {
        if(this._base === base) return;

        //Directly converting from one decimal system to another is hard, so I'm using base 10 as a midpoint between the two.
        if(this._base !== 10 && base !== 10) this.ToBase(10);

        if(base === 10){
            let out = 0;

            for (let i = 0; i < this._digits.length; i++){
                const number = DigitToNumber(this._digits[i]);

                out += number*Math.pow(this._base, this._digits.length-i-1);
            }

            this._digits = [];

            //If there ends up being decimals here, something really, really bad happened.
            for(const digit of out.toString()){
                this._digits.push({number: digit});
            }

            out = 0;

            for (let i = 0; i < this._decimals.length; i++){
                const number = DigitToNumber(this._decimals[i]);

                out += number*Math.pow(this._base, -i-1);
            }

            //-2 because it starts with 0.
            out *= Math.pow(10, out.toString().length-2);

            this._decimals = [];

            //If there ends up being decimals here, something really, really bad happened.
            for(const digit of out.toString()){
                this._decimals.push({number: digit});
            }

            this._base = base;

            return;
        }

        this._base = base;

        const digit = parseInt(this._digits.map(digit => digit.number).join(""));
        const digitLog = Math.ceil(Math.log(digit)/Math.log(this._base)) + (digit % this._base === 0 ? 1 : 0);

        let digits: Digit[] = [];

        for (let i = 0; i < digitLog; i++){
            const number = Math.floor(digit/Math.pow(this._base, i)) % this._base;

            digits.push(NumberToDigit(number));
        }

        digits.reverse();
        this._digits = digits;

        const decimal = parseInt(this._decimals.map(decimal => decimal.number).join(""))/Math.pow(10, this._decimals.length);
        //8-bit number
        const decimalLog = !isNaN(decimal) ? 8 : 0;

        let decimals: Digit[] = [];

        for (let i = 0; i < decimalLog; i++){
            const number = Math.floor(decimal/Math.pow(this._base, -i-1)) % this._base;

            decimals.push(NumberToDigit(number));
        }

        this._decimals = decimals;
    }
}