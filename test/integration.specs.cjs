const shelljs = require("shelljs");
const {rmSync} = require("fs");

const chai = require("chai");
chai.use(require("chai-fs"));

const {expect} = chai;

describe('The CLI converter', function ()
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

    it('should convert the directory', function ()
    {
        shelljs.exec("node ../cli.cjs --source ../demo --output ./out2 --datafile ../package.json");
        expect("./out2/file3.js").to.be.a.file().with.contents.that.match(/const version = "##aaaa##.transform-template";/);
    });

});