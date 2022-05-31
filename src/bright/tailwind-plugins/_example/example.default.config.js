module.exports = function(theme){
    return {
        myPluginName: {
            buildOptions: {
                useDefaultConfig: true,
            },
            base: {
                color: theme("colors.red.500"),
                fontSize: theme("fontSize.h1")
            }
        }
    }
};