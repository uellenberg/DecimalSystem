const {Num} = require("../dist/index");
const {expect} = require("chai");

describe("Num", () => {
    describe("Constructor", () => {
        context("with number test", () => {
            it("should return the correct Num.", () => {
                expect(new Num(100.1)).to.eql({
                    _base: 10, _cache: {}, _digits:
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
        context("with number to base 2, then back to base 10", () => {
            it("should return the correct Num.", () => {
                const num = new Num(9.5);
                num.ToBase(2);
                num.ToBase(10);
                expect(num.toString()).to.eql("9.5");

                const num2 = new Num(9);
                num2.ToBase(2);
                num2.ToBase(10);
                expect(num2.toString()).to.eql("9");
            });
        });

        context("with number to base 2.5, then back to base 10", () => {
            it("should return the correct Num.", () => {
                const num = new Num(9.5);
                num.ToBase(2.5);
                num.ToBase(10);
                expect(num.toString()).to.eql("9.5");

                const num2 = new Num(9);
                num2.ToBase(2.5);
                num2.ToBase(10);
                expect(num2.toString()).to.eql("9");
            });
        });

        context("with number to base 2.5", () => {
            it("should return the correct Num.", () => {
                const num = new Num(9.5);
                num.ToBase(2.5);
                expect(num.toString()).to.eql("1[0.10021200][1.10021200].10021200");

                const num2 = new Num(9);
                num2.ToBase(2.5);
                expect(num2.toString()).to.eql("1[0.10021200][1.10021200]");
            });
        });

        context("with number to base 16", () => {
            it("should return the correct Num.", () => {
                const num = new Num(6858.9);
                num.ToBase(16);
                expect(num.toString()).to.eql("1aca.e6666666");

                const num2 = new Num(6858);
                num2.ToBase(16);
                expect(num2.toString()).to.eql("1aca");
            });
        });

        //this is ridiculous
        context("with number to base 65536", () => {
            it("should return the correct Num.", () => {
                const num = new Num(5477458767.436);
                num.ToBase(65536);
                expect(num.toString()).to.eql("1䛒掦.濴늄ອї0000");

                const num2 = new Num(5477458767);
                num2.ToBase(65536);
                expect(num2.toString()).to.eql("1䛒掦");
            });
        });
    });

    describe("Constructor (from base)", () => {
        context("with a base 16 number", () => {
            it("should return the correct Num.", () => {
                const num = new Num({num: "1aca.e6666666", base: 16});
                num.ToBase(10);
                expect(num.toString()).to.eql("6858.899999999907");

                const num2 = new Num({num: "1aca", base: 16});
                num2.ToBase(10);
                expect(num2.toString()).to.eql("6858");
            });
        });

        context("with a base 2.5 number", () => {
            it("should return the correct Num.", () => {
                const num = new Num({num: "1[0.10021200][1.10021200].10021200", base: 2.5});
                num.ToBase(10);
                //9.5, some with inaccuracies
                expect(num.toString()).to.eql("9.363343999999998");

                const num2 = new Num({num: "1[0.10021200][1.10021200]", base: 2.5});
                num2.ToBase(10);
                //9, some with inaccuracies
                expect(num2.toString()).to.eql("8.893711999999999");
            });
        });

        //this is also ridiculous
        context("with a base 65536", () => {
            it("should return the correct Num.", () => {
                const num = new Num({num: "1䛒掦.濴늄ອї0000", base: 65536});
                num.ToBase(10);
                //I can't believe this actually worked
                expect(num.toString()).to.eql("5477458767.436");

                const num2 = new Num({num: "1䛒掦", base: 65536});
                num2.ToBase(10);
                expect(num2.toString()).to.eql("5477458767");
            });
        });
    });
});