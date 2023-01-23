const {rmSync} = require("fs");
const {transformTemplate, transformTemplateString, transformTemplateFiles} = require("../cjs/index.cjs");

const chai = require("chai");
chai.use(require("chai-fs"));

const {expect} = chai;

describe('The converter', function ()
{
    before(() =>
    {
        process.chdir(__dirname);
        rmSync("out", {recursive: true, force: true});
        rmSync("out2", {recursive: true, force: true});
    })

    after(() =>
    {
        process.chdir(__dirname);
        rmSync("out", {recursive: true, force: true});
        rmSync("out2", {recursive: true, force: true});
    })

    it('should convert the string', function ()
    {
        const str = `const someFunction = function () { const aa = "##aaaa##"; const version = "##version##"; }`
        const content = transformTemplateString(str, {aaaa: "Salut"}, {});
        expect(content).to.eql(`const someFunction = function () { const aa = "Salut"; const version = "##version##"; }`);
    });

    it('should convert the file', function ()
    {
        transformTemplateFiles("../demo/file1.js", {aaaa: "Hi you!"}, {});
        expect("./out/file1.js").to.be.a.file().with.contents.that.match(/Hi you!/);
    });

    it('should convert the file with multiple occurences', function ()
    {
        transformTemplateFiles("../demo/file2.js", {aaaa: "Hey you!"});
        expect("./out/file2.js").to.be.a.file().with.contents.that.match(/const aa = "Hey you!";const bb = "Hey you!";const cc = "Hey you!";/);
    });

    it('should convert the demo directory', function ()
    {
        transformTemplate("../demo", {aaaa: "tel"}, {datafile: "../package.json"});
        expect("./out/file3.js").to.be.a.file().with.contents.that.match(/tel.transform-template/);
    });
});