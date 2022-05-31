<template>
    <div class="NavigationActions NavigationActions--Sidebar">
        <BrightButton
            use="tertiary"
            icon="share"
            icon-position="center"
            rounded
            disabled
            aria-label="Get Quick Links"
            @click="handleButtonClick('quickLinks')"
            @keydown.space.enter="handleButtonClick('quickLinks')"
        />
        <BrightButton
            id="notificationsButton"
            use="tertiary"
            icon="notifications"
            icon-position="center"
            rounded
            aria-label="View Notifications"
            @click="handleButtonClick('notifications')"
            @keydown.space.enter="handleButtonClick('notifications')"
        />
        <BrightButton
            use="tertiary"
            icon="email"
            icon-position="center"
            rounded
            disabled
            aria-label="View and Send Messages"
            @click="handleButtonClick('messages')"
            @keydown.space.enter="handleButtonClick('messages')"
        />
        <BrightButton
            id="actionAccountButton"
            use="tertiary"
            icon="account_circle"
            icon-position="center"
            rounded
            disabled
            aria-label="View My Account or Logout"
            @click="handleButtonClick('account')"
            @keydown.space.enter="handleButtonClick('account')"
        />
    </div>
</template>

<script>
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
export default {
    name: "NavigationLenderHeaderActions",
    components: { BrightButton },
    emits: ['button-click'],
    methods: {
        handleButtonClick(type) {
            this.$emit('button-click', type);
        },
    },
};
</script>
