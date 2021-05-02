import {DigitToNumber, FractionToBase, NumberToDigit, SplitNumber} from "../NumberTools";
import {NumOptions} from "./NumOptions";

/**
 * A class providing information about a number.
 */
export class Num {
    /**
     * The base that the number is in.
     * @private
     */
    private _base: number = 10;
    /**
     * The base that the number is in.
     */
    public get base(): number {
        return this._base;
    }

    /**
     * The non-decimal digits of a number.
     * For example, in the number `1234.56`, this will contain the digits `1234`.
     * @private
     */
    private readonly _digits: string[] = [];

    /**
     * The decimal digits of a number.
     * For example, in the number `1234.56`, this will contain the digit `56`.
     * @private
     */
    private readonly _decimals: string[] = [];

    /**
     * A cache of all conversions to other number systems.
     * base|precision: numberStr
     * @private
     */
    private _cache: Record<string, string> = {};

    /**
     * Turn a base 10 number into a Num.
     * @param num {number} - is the number which will be used.
     * @constructor
     */
    public constructor(num: NumOptions | number) {
        if(typeof(num) === "number" || typeof(num) === "string") num = {num};

        if(num.base != null){
            if(typeof(num.num) !== "string"){
                num.num = num.num.toString().trim().toLowerCase();
            }

            if(isNaN(num.base)){
                throw new Error("The base field is not a valid number.");
            }

            this._base = num.base;

            let inputSplit = num.num.split(/\./g);

            const decimals = inputSplit.length > 1 ? inputSplit.pop() : "";
            const digits = (inputSplit.join(".") || "0").split("");

            let convertedNum = 0;

            for (let i = 0; i < digits.length; i++) {
                convertedNum += DigitToNumber(digits[i]) * Math.pow(this._base, digits.length-i-1);
            }

            if(decimals){
                for (let y = 0; y < decimals.length; y++) {
                    convertedNum += DigitToNumber(decimals[y])/Math.pow(this._base, y+1);
                }
            }
            
            return new Num({num: convertedNum});
        } else {
            if(typeof(num.num) === "string"){
                num.num = parseInt(num.num.trim().toLowerCase());
            }

            if(isNaN(num.num)){
                throw new Error("The input number is not valid. If you are trying to use a non-base 10 number, supply a base field to the options.");
            }

            const split = SplitNumber(num.num);

            for (let digit of split.digits) {
                this._digits.push(digit);
            }

            if(split.decimals){
                for (let decimal of split.decimals) {
                    this._decimals.push(decimal);
                }
            }
        }
    }

    /**
     * Converts the num to another number system and places it in the cache.
     * @param base {number} - is the base being converted to.
     * @param precision {number} - is the maximum decimal places a decimal should have.
     * @private
     */
    private Convert(base: number, precision: number) : void {
        if(this._cache.hasOwnProperty(base.toString() + "|" + precision.toString())) return;

        if(base === 10){
            let digitsPart = this._digits.join("");
            let decimalsPart = this._decimals.join("");

            if(decimalsPart === "0") decimalsPart = "";

            this._cache[base.toString() + "|" + precision.toString()] = digitsPart + (decimalsPart ? "." : "") + decimalsPart;

            return;
        }

        let digit = parseInt(this._digits.join(""));
        const digitLog = Math.ceil(Math.log(digit)/Math.log(this._base)) + (digit % this._base === 0 ? 1 : 0);

        let digits: string[] = [];
        let decimals: string[] = [];

        for (let i = digitLog-1; i > -1; i--){
            let number = Math.floor((digit / Math.pow(this._base, i)) % this._base);
            digit -= number * Math.pow(this._base, i);

            digits.push(NumberToDigit(number));
        }

        if(this._base !== 10) {
            let fraction = parseInt(this._decimals.join("")) / Math.pow(10, this._decimals.length);

            decimals.push(...FractionToBase(fraction, this._base, precision));
        } else {
            for (let decimal of this._decimals) {
                decimals.push(decimal);
            }
        }

        let digitsPart = digits.join("");
        let decimalsPart = decimals.join("");

        if(decimalsPart === "0") decimalsPart = "";

        this._cache[base.toString() + "|" + precision.toString()] = digitsPart + (decimalsPart ? "." : "") + decimalsPart;
    }

    /**
     * Converts a num to another number system in place.
     * @param base {number} - is the base that this Num will be converted to.
     */
    public ToBase(base: number) : Num {
        if(this._base === base) return this;

        this._base = base;

        return this;
    }

    /**
     * Convert this Num to a string. If `isDecimal` is `true`, then each decimal digit will be encased in brackets.
     * For example, `[1.01] 1.1` means `{digits: ["1.01", "1"], decimals: ["1"]}`.
     *
     * If `isDecimal` is `false`, then it will be turned into a normal number string.
     * @param precision {number} - is the maximum decimal places a decimal should have.
     */
    public toString(precision: number = 8) : string {
        if(this._cache.hasOwnProperty(this._base.toString() + "|" + precision.toString())) return this._cache[this._base.toString() + "|" + precision.toString()];

        this.Convert(this._base, precision);

        return this._cache[this._base.toString() + "|" + precision.toString()];
    }
}