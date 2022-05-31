<template>
    <div>
        <transition name="loader-fade" @after-enter="afterEnter" @after-leave="afterLeave">
            <div v-show="isLoading" class="BrightLoader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "BrightLoader",
    props: {
        isLoading: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    emits: ['after-enter', 'after-leave'],
    methods: {
        afterEnter() {
            this.$emit('after-enter');
        },
        afterLeave() {
            this.$emit('after-leave');
        },
    },
};
</script>
