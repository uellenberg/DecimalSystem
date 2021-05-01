import {Digit} from "./Digit";
import {DigitToNumber, FractionToBase, NumberToDigit, SplitNumber} from "../NumberTools";
import {NumOptions} from "./NumOptions";
import {RecursiveMap, RegexTokenizer, TokenizerChain} from "parselib";

const inputParseChain = new TokenizerChain(new RegexTokenizer(/[\[\]]/g));

/**
 * A class providing information about a number.
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
    public constructor(num: NumOptions | number) {
        this._base = 10;
        this._isDecimal = false;
        this._digits = [];
        this._decimals = [];

        if(typeof(num) === "number") num = {num};

        if(num.base != null){
            if(typeof(num.num) !== "string"){
                num.num = num.num.toString().trim().toLowerCase();
            }

            if(isNaN(num.base)){
                throw new Error("The base field is not a valid number.");
            }

            this._base = num.base;

            let inputSplit = num.num.split(/\.(?![^[]*?])/g);

            const decimals = inputSplit.length > 1 ? inputSplit.pop() : "";
            const digits = inputSplit.join(".");

            const tokens = inputParseChain.run(digits);
            const parsedDigits = RecursiveMap<Digit>(tokens, token => token.isToken && token.value === "[", token => token.isToken && token.value === "]", token => {
                const digitSplit = token.value.split(".");

                const number = digitSplit.shift();
                const decimals = digitSplit.shift();

                if(number.length > 1){
                    let out: Digit[] = [];

                    for(const digit of number){
                        out.push({number: digit});
                    }

                    return out;
                }

                return {number, decimals};
            }, tokens => tokens, tokens => {
                let out: Digit[] = [];

                tokens.forEach(token => {
                    if(Array.isArray(token)) out.push(...token);
                    else out.push(token);
                });

                return out;
            });

            let convertedNum = 0;

            for (let i = 0; i < parsedDigits.length; i++) {
                convertedNum += DigitToNumber({number: parsedDigits[i].number}) * Math.pow(this._base, parsedDigits.length-i-1);

                if(parsedDigits[i].decimals){
                    const decimals1 = parsedDigits[i].decimals.toString();

                    for (let y = 0; y < decimals1.length; y++) {
                        convertedNum += DigitToNumber({number: decimals1[y]})/Math.pow(this._base, y+1);
                    }
                }
            }

            if(decimals){
                for (let y = 0; y < decimals.length; y++) {
                    convertedNum += DigitToNumber({number: decimals[y]})/Math.pow(this._base, y+1);
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
                this._digits.push({number: digit});
            }

            if(split.decimals){
                for (let decimal of split.decimals) {
                    this._decimals.push({number: decimal});
                }
            }
        }
    }

    /**
     * Converts a num to another number system in place.
     * @param base {number} - is the base that this Num will be converted to.
     */
    public ToBase(base: number) : Num {
        if(this._base === base) return this;

        //Directly converting from one decimal system to another is hard, so I'm using base 10 as a midpoint between the two.
        if(this._base !== 10 && base !== 10) this.ToBase(10);

        this._isDecimal = false;

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

            this._base = base;

            return this;
        }

        this._base = base;

        const digit = parseInt(this._digits.map(digit => digit.number).join(""));
        const digitLog = Math.ceil(Math.log(digit)/Math.log(this._base)) + (digit % this._base === 0 ? 1 : 0);

        let digits: Digit[] = [];

        for (let i = 0; i < digitLog; i++){
            const number = Math.floor(digit/Math.pow(this._base, i)) % this._base;
            const d = NumberToDigit(number);

            digits.push(d);

            if(d.decimals) this._isDecimal = true;
        }

        digits.reverse();
        this._digits = digits;

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
        let digits: string[] = [];
        let decimals: string[] = [];

        for (let digit of this._digits) {
            let str = digit.number;
            if(digit.decimals) {
                str = "["+str+"."+FractionToBase(digit.decimals, this._base, precision).join("")+"]";
            }

            digits.push(str);
        }

        if(this._base !== 10) {
            let fraction = parseInt(this._decimals.map(decimal => decimal.number).join("")) / Math.pow(10, this._decimals.length);

            decimals.push(...FractionToBase(fraction, this._base, precision));
        } else {
            for (let decimal of this._decimals) {
                let str = decimal.number;
                if(decimal.decimals) {
                    str = "["+str+"."+FractionToBase(decimal.decimals, this._base, precision).join("")+"]";
                }

                decimals.push(str);
            }
        }

        let digitsPart = digits.join("");
        let decimalsPart = decimals.join("");

        if(decimalsPart === "0") decimalsPart = "";

        return digitsPart+(decimalsPart ? "." : "")+decimalsPart;
    }
}