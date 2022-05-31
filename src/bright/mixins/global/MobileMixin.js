import { nextTick } from "vue";
import debounce from "lodash/debounce";

/**
 *  Exposes useful computed properties for detecting screen breakpoints (i.e. mobile responsiveness).
 *  Prefer using CSS over this, because this is a slightly more expensive operation for browsers.
 */
export const MobileMixin = {
    data() {
        return {
            windowWidth: window.innerWidth,
            debouncedOnResize: debounce(this.onResize, 100, { trailing: true }),
        };
    },
    mounted() {
        nextTick(() => {
            window.addEventListener('resize', this.debouncedOnResize);
        });
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.debouncedOnResize);
    },
    computed: {
        isMobile() {
            return this.windowWidth < 640;
        },
        isPortrait() {
            return this.windowWidth >= 640 && this.windowWidth < 1024;
        },
        isLandscape() {
            return this.windowWidth >= 1024 && this.windowWidth < 1440;
        },
        isTablet() {
            return this.windowWidth >= 640 && this.windowWidth < 1440;
        },
        isDesktop() {
            return this.windowWidth >= 1440;
        },
    },
    methods: {
        onResize() {
            this.windowWidth = window.innerWidth;
        },
    },
};
