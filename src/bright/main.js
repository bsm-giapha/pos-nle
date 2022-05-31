import 'animate.css/animate.min.css';
import './css/tailwind.css';
import "trix/dist/trix.css";

let components = {};

/* Auto-import all none-Base components in the components directory */
const modules = import.meta.globEager('./components/**/*.vue');
for (const path in modules) {
    let componentName = path.match(/[^\\/]+(?=\.[\w]+$)|[^\\/]+$/)[0];
    components[componentName] = modules[path];
}

// console.log(components);
export default components;
