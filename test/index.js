const {Num} = require("../dist/index");
const {expect} = require("chai");

describe("Num", () => {
    describe("Constructor", () => {
        context("with number test", () => {
            it("should return the correct Num.", () => {
                expect(new Num(100.1)).to.eql({
                    _base: 10,
                    _cache: {},
                    _number: 100.1
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
                expect(new Num(9.5).ToBase(2.5).toString()).to.eql("110.12010100");

                expect(new Num(9).ToBase(2.5).toString()).to.eql("110.01110000");
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
                expect(new Num(5477458767.436).ToBase(65536).toString()).to.eql("1䛒掦.濴끗");

                expect(new Num(5477458767).ToBase(65536).toString()).to.eql("1䛒掦");
            });
        });

        //this shouldn't be possible
        context("with number to base 65536.65536", () => {
            it("should return the correct Num.", () => {
                expect(new Num(5477458767.436).ToBase(65536.65536).toString()).to.eql("1䛐.俩䑼彼㜓甐뀸﷨");

                expect(new Num(5477458767).ToBase(65536.65536).toString()).to.eql("1䛐.ḑﵙ﹃믗");
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
                expect(new Num({num: "110.12010100", base: 2.5}).ToBase(10).toString()).to.eql("9.499696000000002");

                //9, some with inaccuracies
                expect(new Num({num: "110.01110000", base: 2.5}).ToBase(10).toString()).to.eql("8.999600000000001");
            });
        });

        context("with a base 65536", () => {
            it("should return the correct Num.", () => {
                //I can't believe this actually worked

                expect(new Num({num: "1䛒掦.濴끗", base: 65536}).ToBase(10).toString()).to.eql("5477458767.436");

                expect(new Num({num: "1䛒掦", base: 65536}).ToBase(10).toString()).to.eql("5477458767");
            });
        });

        context("with number to base 65536.65536", () => {
            it("should return the correct Num.", () => {
                //It's base 65536.65536. And it's lossless. What?

                expect(new Num({num: "1䛐.俩䑼彼㜓甐뀸﷨", base: 65536.65536}).ToBase(10).toString()).to.eql("5477458767.436");

                expect(new Num({num: "1䛐.ḑﵙ﹃믗", base: 65536.65536}).ToBase(10).toString()).to.eql("5477458767");
            });
        });
    });
});