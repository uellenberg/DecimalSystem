const {Num} = require("../dist/index");
const {expect} = require("chai");

describe("NumberTools", () => {
    describe("FromNumber", () => {
        context("with integer test", () => {
            it("should return the correct Num.", () => {
                expect(new Num(100)).to.eql({
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
                    _decimals: []
                });
            });
        });
    });
});