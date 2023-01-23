const {existsSync, readFileSync, writeFileSync, mkdirSync} = require("fs");

const glob = require("glob");
const {joinPath, isDirectory, resolvePath, normalisePath} = require("@thimpat/libutils");
const {anaLogger} = require("analogger");
const path = require("path");

const setupConsole = () =>
{
    try
    {
        anaLogger.setOptions({silent: false, hideError: false, hideHookMessage: true, lidLenMax: 4});
        anaLogger.overrideConsole();
        anaLogger.overrideError();

        console.log({lid: "TT1012"}, "Console is set up");
        return anaLogger;
    }
    catch (e)
    {
        console.error({lid: "TT3008"}, e.message);
    }

    return null;
};

const transformTemplateString = function (initialContent, data, {
    start = "##",
    end = "##",
})
{
    try
    {
        const regexExp = new RegExp(start + "(\\w+)?" + end, "g");
        const finalContent = initialContent.replace(regexExp, (match, offset) =>
        {
            const val = data[offset];
            if (!val)
            {
                return match;
            }
            return val;
        });

        return finalContent;
    }
    catch (e)
    {
        console.error({lid: "TT5545"}, e.message);
    }

    return initialContent;
};


const transformTemplateFiles = function (fileOrDir, data = {}, {
    datafile = "",
    outputDir = "./out",
    outputFile = "",
    mask = "**/*",
    start = "##",
    end = "##",
} = {})
{
    try
    {
        let files;

        if (!existsSync(fileOrDir))
        {
            console.error({lid: "TT5245"}, `Could not find [${fileOrDir}]`);
            return false;
        }

        data = data || {};
        if (existsSync(datafile))
        {
            try
            {
                const content = readFileSync(datafile, {encoding: "utf-8"});
                const json = JSON.parse(content);
                data = Object.assign({}, json, data);
            }
            catch (e)
            {
                console.error({lid: "TT5475"}, e.message);
            }
        }

        let templatesDir = "";
        if (isDirectory(fileOrDir))
        {
            templatesDir = fileOrDir;
            files = glob.sync(mask, {
                cwd: fileOrDir
            });
        }
        else
        {
            fileOrDir = resolvePath(fileOrDir);
            let parsed;
            if (outputFile)
            {
                parsed = path.parse(outputFile);
            }
            else
            {
                parsed = path.parse(fileOrDir);
            }
            templatesDir = normalisePath(parsed.dir);
            files = [parsed.base];
        }

        outputDir = normalisePath(outputDir);
        mkdirSync(outputDir, {recursive: true});

        for (let i = 0; i < files.length; ++i)
        {
            const originalFile = joinPath(templatesDir, files[i]);
            const targetFile = joinPath(outputDir, files[i]);

            if (isDirectory(originalFile))
            {
                if (!existsSync(targetFile))
                {
                    mkdirSync(targetFile, {recursive: true});
                }
                continue;
            }

            const initialContent = readFileSync(originalFile, {encoding: "utf-8"});

            const finalContent = transformTemplateString(initialContent, data, {start, end})

            if (initialContent === finalContent)
            {
                if (!existsSync(targetFile))
                {
                    writeFileSync(targetFile, finalContent, {encoding: "utf8"});
                    console.log({lid: "TT5240", color: "green"}, `Generated: [${targetFile}]`);
                }
            }
            else
            {
                writeFileSync(targetFile, finalContent, {encoding: "utf8"});
                console.log({lid: "TT5242", color: "yellow"}, `Updated: [${originalFile}]`);
            }

        }

        return true;
    }
    catch (e)
    {
        console.error({lid: "TT5255"}, e.message);
    }

    return false;
};

const transformTemplate = function (...args)
{
    return transformTemplateFiles(...args);
};

module.exports.transformTemplateString = transformTemplateString;
module.exports.transformTemplateFiles = transformTemplateFiles;
module.exports.transformTemplate = transformTemplate;

module.exports.setupConsole = setupConsole;


