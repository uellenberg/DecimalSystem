const {Num} = require("../dist/index");
const {expect} = require("chai");

describe("Num", () => {
    describe("Constructor", () => {
        context("with number test", () => {
            it("should return the correct Num.", () => {
                expect(new Num(100.1)).to.eql({
                    _base: 10, _isDecimal: false, _digits:
                        [
                            {
                                number: "1"
                            },
                            {
                                number: "0"
                            },
                            {
                                number: "0"
                            }
                        ],
                    _decimals: [
                        {
                            number: "1"
                        }
                    ]
                });
            });
        });
    });

    describe("ToBase", () => {
        context("with number to base 2", () => {
            it("should return the correct Num.", () => {
                const num = new Num(9.5);

                num.ToBase(2);
                num.ToBase(10);

                console.log();

                expect(num.toString()).to.eql("9.5");
            });
        });

        context("with number to base 2.5", () => {
            it("should return the correct Num.", () => {
                const num = new Num(9.5);

                num.ToBase(2.5);
                num.ToBase(10);

                //floats cause the weird number
                expect(num.toString()).to.eql("9.6610227200000001");
            });
        });
    });
});