#!/usr/bin/env node
const minimist = require("minimist");
const {setupConsole, transformTemplateFiles} = require("./cjs/index.cjs");

const init = function (argv)
{
    try
    {
        setupConsole();

        const {source, datafile, output, outputfile, force} = argv;
        transformTemplateFiles(source, {}, {datafile, outputDir: output, outputFile: outputfile, force})

        return true;
    }
    catch (e)
    {
        console.error({lid: "TT5695"}, e.message);
    }

    return false;
};

(function async()
{
    const argv = minimist(process.argv);
    init(argv);
}())