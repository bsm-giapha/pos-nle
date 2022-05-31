<template>
    <div v-bind="containerBindings" role="img" :aria-label="name">
        <img v-if="src.length > 0" :src="src" :alt="name"/>
        <div v-else>
            {{ initials }}
        </div>
    </div>
</template>

<script>
export default {
    name: "BrightAvatar",
    props: {
        color: {
            type: String,
            required: false,
            default: 'blue',
            validator(value) {
                return ['blue', 'aqua', 'pink', 'yellow', 'green', 'red', 'orange', 'purple', 'indigo', 'grey'].includes(value);
            },
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        light: {
            type: Boolean,
            required: false,
            default: false,
        },
        name: {
            type: String,
            required: true,
            default: '',
        },
        size: {
            type: String,
            required: false,
            default: 'medium',
            validator(value) {
                return ['small', 'medium', 'large', 'extra-large', 'extra-extra-large'].includes(value);
            },
        },
        src: {
            type: String,
            required: false,
            default: '',
        },
    },
    computed: {
        containerBindings() {
            return {
                class: {
                    'BrightAvatar': true,
                    'BrightAvatar__disabled': this.disabled,
                    'BrightAvatar__light': this.light,

                    'BrightAvatar__size--small': this.size === 'small',
                    'BrightAvatar__size--medium': this.size === 'medium',
                    'BrightAvatar__size--large': this.size === 'large',
                    'BrightAvatar__size--extra-large': this.size === 'extra-large',
                    'BrightAvatar__size--extra-extra-large': this.size === 'extra-extra-large',

                    'BrightAvatar__color--blue': this.color === 'blue',
                    'BrightAvatar__color--aqua': this.color === 'aqua',
                    'BrightAvatar__color--pink': this.color === 'pink',
                    'BrightAvatar__color--yellow': this.color === 'yellow',
                    'BrightAvatar__color--green': this.color === 'green',
                    'BrightAvatar__color--red': this.color === 'red',
                    'BrightAvatar__color--orange': this.color === 'orange',
                    'BrightAvatar__color--purple': this.color === 'purple',
                    'BrightAvatar__color--indigo': this.color === 'indigo',
                    'BrightAvatar__color--grey': this.color === 'grey',
                },
                role: (this.src.length > 0) ? null : 'img',
                'aria-label': (this.src.length > 0) ? null : this.name,
            };
        },
        initials() {
            let name = this.name.trim();
            if (name.length === 0) return '';
            if (name.includes(' ')) {
                return name[0].toUpperCase() + name.split(' ', 2)[1][0].toUpperCase();
            } else {
                let initials = name[0].toUpperCase();
                if (name.length > 1) {
                    initials += name[1].toUpperCase();
                }
                return initials;
            }
        },
    },
};
</script>
