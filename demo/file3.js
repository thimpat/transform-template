const someFunction = function ()
{
    try
    {
        const aa = "##aaaa##";
        const version = "##aaaa##.##name##";
        console.log(aa);
        return true;
    }
    catch (e)
    {
        console.error({lid: 565445}, e.message);
    }

    return false;
};

someFunction();

module.exports.someFunction = someFunction;
