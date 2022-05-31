let componentTypography = require("./components/typography/typography.plugin").getPlugin;
let componentFlex = require("./components/flex/flex.plugin").getPlugin;
let componentButtons = require("./components/buttons/buttons.plugin").getPlugin;

exports.plugins = [
    componentTypography,
    componentFlex,
    componentButtons,
];
