import {DigitToNumber, NumberToDigit} from "./NumberTools";
import {NumOptions} from "./types/NumOptions";

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
     * The base 10 number that this Num is using.
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
        //To make things easier, any number/string input is just placed inside of NumOptions.
        if(typeof(num) === "number" || typeof(num) === "string") num = {num};

        //If the number is not base 10
        if(num.base != null && num.base !== 10){
            //To make things easier, all numbers here are strings. Below just turns it into a string and cleans it up a bit.
            //Strings are needed for bases > 10, which this part might need to parse.
            if(typeof(num.num) !== "string"){
                num.num = num.num.toString().trim().toLowerCase();
            }

            //This just validates that the base is valid.
            if(isNaN(num.base)){
                throw new Error("The base field is not a valid number.");
            }

            //The current base is stored.
            this._base = num.base;

            //The length of the actual digits is needed to figure out what exponent should be used.
            let inputSplit = num.num.split(/\./g);

            //Just a quick check to validate input.
            if(inputSplit.length > 2){
                throw new Error("The input number contains multiple decimals.");
            }

            const digitsLength = inputSplit[0].length;
            const digits = inputSplit.join("");

            //This is the base 10 representation of the input number.
            let convertedNum = 0;

            //This just goes through all of the digits, and multiplies it like:
            //1234.5 base 6 -> 1*6^3 + 2*6^2 + 3*6^1 + 4*6^0 + 5*6^-1, which converts the number to base 10.
            for (let i = 0; i < digits.length; i++) {
                convertedNum += DigitToNumber(digits[i]) * Math.pow(this._base, digitsLength-i-1);
            }

            //The new base 10 number is stored in this.
            this._number = convertedNum;
        } else {
            //Because only base 10 numbers can be here, we can safely turn them into numbers if they are strings.
            if(typeof(num.num) === "string"){
                num.num = parseInt(num.num.trim().toLowerCase(), 10);
            }

            //A quick check to make sure the number is valid.
            if(isNaN(num.num)){
                throw new Error("The input number is not valid. If you are trying to use a non-base 10 number, supply a base field to the options.");
            }

            //Store the number.
            this._number = num.num;
        }
    }

    /**
     * Converts the num to another number system and places it in the cache.
     * @param base {number} - is the base being converted to.
     * @param precision {number} - is the maximum decimal places a decimal should have.
     * @private
     */
    private Convert(base: number, precision: number) : void {
        //Because the number internally never changes, the output of this function is cached to increase performance.
        //It's stored by it's base and precision, and if it already exists, nothing happens.
        if(this._cache.hasOwnProperty(base.toString() + "|" + precision.toString())) return;

        //Because our number already is in base 10, converting it would cause issues. Instead, we can simply output the actual number.
        if(base === 10){
            let out = this._number.toString();
            if(out.startsWith("0")) out = out.substring(1);

            this._cache[base.toString() + "|" + precision.toString()] = out;

            return;
        }

        /*
        Notice how multiline comments are used here? That's because this one is gonna be a long one.

        Below, `number` is used to refer to the base 10 number that is being converted to another base.

        Essentially, the way this algorithm works is it first calculates the amount of digits that appear in the
        final number with `ceil(log_base(digit))` (the addition after it fixes a special case, but isn't important
        for the most part). Then, starting with the first digit in the output and moving backwards, to a maximum
        of the above function + precision, digits are calculated by finding the maximum digit that can be in that
        place without exceeding the number (`floor((digit / base^i) % base)`, where `i` is the 1-based position of
        the digit being calculated. Once this is done, the digit is turned into a base 10 number (`number * base^i`)
        and subtracted from the number. Then, the non-base 10 version of the digit is turned into its correct symbol
        if it is over 9, then a few checks are performed to prevent leading or trailing zeros, and it is added to the
        digits array. Finally, if the number is less than or equal to zero (if the number has been fully represented
        by the digits so far), then the loop is stopped early.
         */
        let digit = this._number;
        let digitLog = Math.ceil(Math.log(digit)/Math.log(this._base)) + (digit % this._base === 0 ? 1 : 0);

        let digits: string[] = [];
        let toAdd: string[] = [];

        for (let i = digitLog-1; i > (-1*precision)-2; i--){
            let number = Math.floor((digit / Math.pow(this._base, i)) % this._base);
            digit -= number * Math.pow(this._base, i);

            const digitStr = NumberToDigit(number);

            if(digitStr === "0" && digits.length < 1) {
                //This is just to make sure the decimal symbol is placed in the correct location.
                digitLog--;
                continue;
            }

            if(digitStr !== "0" || digits.length < digitLog) {
                digits.push(...toAdd, digitStr);
                toAdd = [];
            }
            else toAdd.push("0");

            if(digit <= 0) break;
        }

        //Because the number can be terminated early, some of the zeros may not be added. To solve this, we need to pad the number with zeros.
        if(digits.length < digitLog) digits.push(..."0".repeat(digitLog-digits.length).split(""))

        //Now, our output contains all of the digits but no way to distinguish between digits of the decimal and non-decimal part.
        //To solve this, we use our number length to place a decimal point where it is meant to go.
        if(digits.length > digitLog) digits.splice(digitLog, 0, ".");

        //Now, we put together our new number and put it into the cache.
        this._cache[base.toString() + "|" + precision.toString()] = digits.join("");
    }

    /**
     * Converts a num to another number system in place.
     * @param base {number} - is the base that this Num will be converted to.
     */
    public toBase(base: number) : Num {
        //The toBase function simply changes the internal base number. This is done so that the conversion only occurs when is is necessary.

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
        //The toString function uses the cache, and if nothing is present, runs a conversion, then returns the cached value.

        if(!this._cache.hasOwnProperty(this._base.toString() + "|" + precision.toString())) this.Convert(this._base, precision);

        return this._cache[this._base.toString() + "|" + precision.toString()];
    }

    /**
     * Converts the result of toString to a number.
     * @param precision {number} - is the maximum decimal places a decimal should have.
     */
    public toNumber(precision: number = 8) : number {
        //This just wraps toString to parse it as a number.
        return parseFloat(this.toString(precision));
    }
}