// import pageComponents from '@internal/page-components'; // required to fix weird issue with VuePress sidebar navigation breaking: https://github.com/vuejs/vuepress/issues/1173#issuecomment-470534176
import BrightComponentLibrary from '@/bright/main';

export default ({
                    Vue, // the version of Vue being used in the VuePress app
                    options, // the options for the root Vue instance
                    router, // the router instance for the app
                    siteData // site metadata
                }) => {
    Object.keys(BrightComponentLibrary).forEach(function(key) {
        const component = BrightComponentLibrary[key];
        Vue.component(component.name, component);
    });
}