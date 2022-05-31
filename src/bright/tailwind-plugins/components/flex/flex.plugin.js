let pluginClasses = {};
exports.getPluginClasses = function() {
    return pluginClasses;
};

exports.getPlugin = function({ addComponents }) {
    pluginClasses = {
        '.__flex': { flex: '1 1 0' },
        '.__flex--initial': { flex: '1 1 auto' },
        '.__flex--grow': { display: 'flex', 'flex-grow': '1', 'flex-shrink': '0' },
        '.__flex--grow--none': { display: 'flex', 'flex-grow': 0 },
        '.__flex--shrink': { display: 'flex', 'flex-shrink': '1' },
        '.__flex--shrink--none': { display: 'flex', 'flex-shrink': '0' },
        '.__flex--none': { display: 'flex', flex: 'none' },
    };

    addComponents(pluginClasses);
};
