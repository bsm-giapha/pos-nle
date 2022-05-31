<template>
    <BrightCard v-bind="headerContainerBindings">
        <SmartLink
            v-if="showBackBar"
            v-bind="backBar"
            class="NavigationHeader__BackBar"
        >
            <BrightIcon use="chevron_left" style="font-size: 24px"/> Back to {{ backBar.label }}
        </SmartLink>
        <div class="NavigationHeader__Container">
            <BrightButton v-bind="desktopMenuToggleButtonBindings" @click="emitMenuToggle()" @keydown.space.enter="emitMenuToggle()"/>
            <div class="NavigationHeader__Left">
                <BrightGrid gutters-vertical="none">
                    <BrightRow>
                        <BrightColumn mobile="flex" class="w-auto">
                            <BrightButton v-bind="nonDesktopMenuToggleButtonBindings" @click="emitMenuToggle()" @keydown.space.enter="emitMenuToggle()"/>
                            <div v-if="showAvatar" class="inline-block mr-12">
                                <BrightAvatar
                                    size="large"
                                    color="indigo"
                                    :name="avatarName"
                                    :src="avatarImageSrc"
                                />
                            </div>
                            <div class="inline-block">
                                <div class="NavigationHeader__Left__PageName">{{ pageName }}</div>
                                <SmartLink v-bind="breadcrumbs" class="NavigationHeader__Left__Breadcrumbs">
                                    {{ breadcrumbs.label }}
                                </SmartLink>
                            </div>
                        </BrightColumn>
                        <BrightColumn mobile="flex-shrink" class="w-full tablet:w-auto">
                            <div>
                                <slot></slot>
                            </div>
                        </BrightColumn>
                    </BrightRow>
                    <BrightRow>
                        <BrightColumn>
                            <NavigationTabGroup :tabs="tabs"/>
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </div>
        </div>
    </BrightCard>
</template>

<script>
import BrightButton from "../../../bright/components/core-library/button/BrightButton.vue";
import BrightCard from "../../../bright/components/layout-library/card/BrightCard.vue";
import BrightIcon from "../../../bright/components/core-library/icon/BrightIcon.vue";
import NavigationTabGroup from "../tabs/NavigationTabGroup.vue";
import SmartLink from "../SmartLink.vue";
import BrightAvatar from "../../../bright/components/core-library/avatar/BrightAvatar.vue";
import BrightGrid from "@/bright/components/layout-library/grid/BrightGrid.vue";
import BrightRow from "@/bright/components/layout-library/grid/BrightRow.vue";
import BrightColumn from "@/bright/components/layout-library/grid/BrightColumn.vue";
export default {
    name: "NavigationHeader",
    components: {
        BrightColumn,
        BrightRow,
        BrightGrid,
        BrightAvatar,
        SmartLink,
        NavigationTabGroup,
        BrightIcon,
        BrightCard,
        BrightButton,
    },
    props: {
        pageName: {
            type: String,
            default: '',
            required: true,
        },
        breadcrumbs: {
            type: Object,
            default() {
                return {};
            },
            required: false,
        },
        backBar: {
            type: Object,
            default() {
                return {};
            },
            required: false,
        },
        tabs: {
            type: Array,
            default() {
                return [];
            },
            required: false,
        },
        id: {
            type: String,
            default: 'navigation',
            required: false,
        },
        sidebarMenuIsExpanded: {
            type: Boolean,
            default: false,
            required: false,
        },
        avatarName: {
            type: String,
            default: '',
            required: false,
        },
        avatarImageSrc: {
            type: String,
            default: '',
            required: false,
        },
    },
    emits: ['menu:toggle'],
    computed: {
        navID() {
            return this.id + 'Nav';
        },
        headerContainerBindings() {
            return {
                class: {
                    'NavigationHeader': true,
                    'NavigationHeader--expanded': this.sidebarMenuIsExpanded,
                },
                noPadding: true,
                rounded: false,
                bordered: false,
                raised: true,
            };
        },
        desktopMenuToggleButtonBindings() {
            return {
                id: this.id + 'DesktopMenuToggleButton',
                class: {
                    'NavigationHeader__Button': true,
                    'NavigationHeader__Button--expanded': this.sidebarMenuIsExpanded,
                },
                use: 'secondary',
                icon: 'menu',
                iconPosition: 'center',
                rounded: true,
                'aria-haspopup': 'true',
                'aria-controls': this.navID,
                'aria-expanded': this.sidebarMenuIsExpanded.toString(),
                'aria-label': 'Site Navigation',
            };
        },
        nonDesktopMenuToggleButtonBindings() {
            return {
                id: this.id + 'ToggleSidebarMobileButton',
                class: {
                    'inline-block align-top -ml-10 mr-8 -mt-10': true,
                },
                use: 'tertiary',
                size: 'large',
                icon: 'menu',
                iconPosition: 'center',
                rounded: true,
                'aria-label': 'Toggle Menu',
            };
        },
        buttonID() {
            return this.id + 'MenuButton';
        },
        showBackBar() {
            return 'label' in this.backBar && this.backBar['label'].length > 0;
        },
        showAvatar() {
            return this.avatarName.length > 0 || this.avatarImageSrc.length > 0;
        },
    },
    methods: {
        emitMenuToggle() {
            this.$emit('menu:toggle');
        },
    },
};
</script>
