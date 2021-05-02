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
        context("with number to base 2", () => {
            it("should return the correct Num.", () => {
                expect(new Num(9.5).ToBase(2).toString()).to.eql("1001.1");

                expect(new Num(9).ToBase(2).toString()).to.eql("1001");
            });
        });

        context("with number to base 2.5", () => {
            it("should return the correct Num.", () => {
                expect(new Num(9.5).ToBase(2.5).toString()).to.eql("1[0.100212][1.100212].100212");

                expect(new Num(9).ToBase(2.5).toString()).to.eql("1[0.100212][1.100212]");
            });
        });

        context("with number to base 16", () => {
            it("should return the correct Num.", () => {
                expect(new Num(6858.9).ToBase(16).toString()).to.eql("1aca.e6666666");

                expect(new Num(6858).ToBase(16).toString()).to.eql("1aca");
            });
        });

        //this is ridiculous
        context("with number to base 65536", () => {
            it("should return the correct Num.", () => {
                expect(new Num(5477458767.436).ToBase(65536).toString()).to.eql("1䛒掦.濴늄ອї");

                expect(new Num(5477458767).ToBase(65536).toString()).to.eql("1䛒掦");
            });
        });

        //this shouldn't be possible
        context("with number to base 65536.65536", () => {
            it("should return the correct Num.", () => {
                expect(new Num(5477458767.436).ToBase(65536.65536).toString()).to.eql("1[䛐.墑跢恎␄鏝庯保碷][趰.勀覴靧吧䒿箲뤯].濴ﮪ専祝㋟雏");

                expect(new Num(5477458767).ToBase(65536.65536).toString()).to.eql("1[䛐.墑跢恎␄鏝庯保碷][趰.勀覴靧吧䒿箲뤯]");
            });
        });
    });

    describe("Constructor (from base)", () => {
        context("with a base 16 number", () => {
            it("should return the correct Num.", () => {
                expect(new Num({num: "1aca.e6666666", base: 16}).ToBase(10).toString()).to.eql("6858.899999999907");

                expect(new Num({num: "1aca", base: 16}).ToBase(10).toString()).to.eql("6858");
            });
        });

        context("with a base 2.5 number", () => {
            it("should return the correct Num.", () => {
                //9.5, some with inaccuracies
                expect(new Num({num: "1[0.100212][1.100212].100212", base: 2.5}).ToBase(10).toString()).to.eql("9.363343999999998");

                //9, some with inaccuracies
                expect(new Num({num: "1[0.100212][1.100212]", base: 2.5}).ToBase(10).toString()).to.eql("8.893711999999999");
            });
        });

        //this is ridiculous
        context("with a base 65536", () => {
            it("should return the correct Num.", () => {
                //I can't believe this actually worked

                expect(new Num({num: "1䛒掦.濴늄ອї0000", base: 65536}).ToBase(10).toString()).to.eql("5477458767.436");

                expect(new Num({num: "1䛒掦", base: 65536}).ToBase(10).toString()).to.eql("5477458767");
            });
        });

        //this shouldn't be possible
        context("with number to base 65536.65536", () => {
            it("should return the correct Num.", () => {
                //I am converting a number to base 65536.65536 and back to base 10 losslessly. How the hell?
                expect(new Num({num: "1[䛐.墑跢恎␄鏝庯保碷][趰.勀覴靧吧䒿箲뤯].濴ﮪ専祝㋟雏", base: 65536.65536}).ToBase(10).toString()).to.eql("5477458767.436");

                expect(new Num({num: "1[䛐.墑跢恎␄鏝庯保碷][趰.勀覴靧吧䒿箲뤯]", base: 65536.65536}).ToBase(10).toString()).to.eql("5477458767");
            });
        });
    });
});