const {FromNumber} = require("../dist/index");
const {expect} = require("chai");

describe("NumberTools", () => {
    describe("FromNumber", () => {
        context("with integer test", () => {
            it("should return the correct Num.", () => {
                expect(FromNumber(100)).to.eql({
                    base: 10, isDecimal: false, digits:
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
                    decimals: []
                });
            });
        });
    });
});