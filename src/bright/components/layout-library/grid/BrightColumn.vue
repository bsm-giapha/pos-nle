<template>
    <div :class="[baseClassObject, guttersClassObject]">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "BrightColumn",
    props: {
        mobile: {
            type: String,
            default: null,
            required: false,
            validator: validateBreakpoint,
        },
        tablet: {
            type: String,
            default: null,
            required: false,
            validator: validateBreakpoint,
        },
        desktop: {
            type: String,
            default: null,
            required: false,
            validator: validateBreakpoint,
        },
        alignSelf: {
            type: String,
            default: null,
            required: false,
            validator: function (value) {
                return ['auto', 'start', 'center', 'end', 'stretch'].includes(value);
            },
        },
    },
    computed: {
        baseClassObject: function() {
            return this.determineBaseClassNames();
        },
        guttersClassObject: function() {
            return {
                'BrightColumn': true,
                'BrightColumn__gutters--small': this.$parent.gutters === "small",
                'BrightColumn__gutters--medium': !this.$parent.gutters || this.$parent.gutters === "medium",
                'BrightColumn__gutters--large': this.$parent.gutters === "large",
                'BrightColumn__gutters--none': this.$parent.gutters === "none",
            };
        },
    },
    methods: {
        determineBaseClassNames() {
            let classNames = "";
    
            // Evaluate breakpoint widths
            let breakpoints = {
                "mobile": this.mobile,
                "tablet": this.tablet,
                "desktop": this.desktop,
            };
            let widthClasses = evaluateWidth(breakpoints);
    
            // Evaluate align-self
            let options = {
                "alignSelf": this.alignSelf,
            };
            let alignSelfClasses = evaluateAlignSelf(options);
    
            classNames = widthClasses + alignSelfClasses;
            return classNames;
        },
    },
};

function validateBreakpoint(value) {
    // Accept values 1-12
    let acceptedValues = Array(12).fill().map((_, i) => i + 1).map(String);

    // Accept custom Flex plugin classes
    acceptedValues.push("flex", "flex-initial", "flex-none", "flex-grow", "flex-grow-none", "flex-shrink", "flex-shrink-none");

    return acceptedValues.includes(value);
}

function evaluateWidth(props) {
    let classNames = "";

    // If no breakpoint values are passed, set the 'tablet' & 'desktop' breakpoints to "flex" by default.
    if (!props['mobile']) {
        props.mobile = "12";
        if (!props['tablet'] && !props['desktop']) {
            props.tablet = "flex";
        }
    }

    for (let breakpoint in props) {
        if (props[breakpoint] === null) continue;

        if (props[breakpoint].includes("flex")) {
            classNames += determineFlexClassNames(props, breakpoint);

        } else if (props[breakpoint] === "12") {
            if (breakpoint === "mobile") {
                classNames += "w-full ";
            } else {
                // eslint-disable-next-line no-useless-escape
                classNames += breakpoint + "\:w-full ";
            }

        } else if (breakpoint === "mobile") {
            // eslint-disable-next-line no-useless-escape
            classNames += "w-"+props[breakpoint]+"\/12 ";

        } else {
            // eslint-disable-next-line no-useless-escape
            classNames += breakpoint+"\:w-"+props[breakpoint]+"\/12 "+breakpoint+"\:"+"flex-none ";
        }
    }
    return classNames;
}

function determineFlexClassNames(props, breakpoint) {
    let classNames = "";
    // eslint-disable-next-line no-useless-escape
    let prefix = breakpoint + "\:";

    if (breakpoint === "mobile") {
        prefix = "";
    }

    switch (props[breakpoint]) {
        case "flex":
            classNames += prefix + "__flex ";
            break;
        case "flex-initial":
            classNames += prefix + "__flex--initial ";
            break;
        case "flex-none":
            classNames += prefix + "__flex--none ";
            break;
        case "flex-grow":
            classNames += prefix + "__flex--grow ";
            break;
        case "flex-grow-none":
            classNames += prefix + "__flex--grow--none ";
            break;
        case "flex-shrink":
            classNames += prefix + "__flex--shrink ";
            break;
        case "flex-shrink-none":
            classNames += prefix + "__flex--shrink--none ";
            break;
        default:
            break;
    }
    return classNames;
}

function evaluateAlignSelf(prop) {
    let alignSelfObj = {
        'BrightColumn__align-self--auto': prop.alignSelf === 'auto',
        'BrightColumn__align-self--start': prop.alignSelf === 'start',
        'BrightColumn__align-self--center': prop.alignSelf === 'center',
        'BrightColumn__align-self--end': prop.alignSelf === 'end',
        'BrightColumn__align-self--stretch': prop.alignSelf === 'stretch',
    };

    for (let className in alignSelfObj) {
        if (alignSelfObj[className] === true) {
            return className;
        }
    }
    return "";
}
</script>
