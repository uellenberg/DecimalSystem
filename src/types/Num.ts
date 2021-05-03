import {DigitToNumber, NumberToDigit} from "../NumberTools";
import {BaseFunction, NumOptions} from "./NumOptions";

/**
 * A class providing information about a number.
 */
export class Num {
    /**
     * The base function used to find the weight of each number place.
     * @private
     */
    private _base: BaseFunction = (pos) => Math.pow(10, pos);

    /**
     * The number that this Num is using.
     * @private
     */
    private readonly _number: number;

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
        const options = (typeof(num) === "number" || typeof(num) === "string") ? {num} : num;

        if(options.base != null){
            if(typeof(options.num) !== "string"){
                options.num = options.num.toString().trim().toLowerCase();
            }

            //If the base is an invalid number.
            if(typeof(options.base) !== "function" && isNaN(options.base)){
                throw new Error("The base field is not a valid number.");
            }

            this._base = typeof(options.base) === "number" ? ((pos) => pos === 1 ? <number>options.base : Math.pow(<number>options.base, pos)) : options.base;

            let inputSplit = options.num.split(/\./g);

            const decimals = inputSplit.length > 1 ? inputSplit.pop() : "";
            const digits = (inputSplit.join(".") || "0").split("");

            let convertedNum = 0;

            for (let i = 0; i < digits.length; i++) {
                convertedNum += DigitToNumber(digits[i]) * this._base(digits.length-i-1);
            }

            if(decimals){
                for (let y = 0; y < decimals.length; y++) {
                    convertedNum += DigitToNumber(decimals[y])/this._base(y+1);
                }
            }

            return new Num({num: convertedNum});
        } else {
            if(typeof(options.num) === "string"){
                options.num = parseInt(options.num.trim().toLowerCase());
            }

            if(isNaN(options.num)){
                throw new Error("The input number is not valid. If you are trying to use a non-base 10 number, supply a base field to the options.");
            }

            this._number = options.num;
        }
    }

    /**
     * Converts the num to another number system and places it in the cache.
     * @param base {number} - is the base being converted to.
     * @param precision {number} - is the maximum decimal places a decimal should have.
     * @private
     */
    private Convert(base: BaseFunction, precision: number) : void {
        if(this._cache.hasOwnProperty(base.toString() + "|" + precision.toString())) return;

        if(base.toString() === "(pos) => pos === 1 ? base : Math.pow(base, pos)" && base(1) === 10){
            let out = this._number.toString();
            if(out.startsWith("0")) out = out.substring(1);

            this._cache[base.toString() + "|" + precision.toString()] = out;

            return;
        }

        let digit = this._number;
        const digitLog = Math.ceil(Math.log(digit)/Math.log(this._base(1))) + (digit % this._base(1) === 0 ? 1 : 0);

        let digits: string[] = [];
        let toAdd: string[] = [];

        for (let i = digitLog-1; i > (-1*precision)-1; i--){
            let number = Math.floor((digit / this._base(i)) % this._base(1));
            digit -= number * this._base(i);

            const digitStr = NumberToDigit(number);

            if(digitStr !== "0") {
                digits.push(...toAdd, digitStr);
                toAdd = [];
            }
            else toAdd.push("0");

            if(digit <= 0) break;
        }

        if(digits.length > digitLog) digits.splice(digitLog, 0, ".");

        this._cache[base.toString() + "|" + precision.toString()] = digits.join("");
    }

    /**
     * Converts a num to another number system in place.
     * @param base {number | BaseFunction} - is the base that this Num will be converted to.
     */
    public toBase(base: number | BaseFunction) : Num {
        const baseFunc = typeof(base) === "number" ? ((pos) => pos === 1 ? <number>base : Math.pow(<number>base, pos)) : base;

        if(this._base.toString() === baseFunc.toString()) return this;

        this._base = baseFunc;

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

    /**
     * Converts the result of toString to a number.
     * @param precision {number} - is the maximum decimal places a decimal should have.
     */
    public toNumber(precision: number = 8) : number {
        return parseFloat(this.toString(precision));
    }
}