<script lang="ts">
    import NotificationItem from "./NotificationItem.svelte";
    import { notifications, removeNotification } from '../../../stores/NotificationStore'

    interface CloseEventDetail {
        notificationId: string;
    }

    // Define the event type for Svelte's dispatch mechanism
    interface NotificationItemEventMap {
        close: CustomEvent<CloseEventDetail>;
    }

    function handleNotificationClose(event: NotificationItemEventMap['close']) {
        removeNotification(event.detail.notificationId)
    }
</script>

<style>
    .notificationsWrapper {
        position: fixed;
        width: 400px;
        top: 90px;
        right: 0; /* Initially right aligned to the viewport */
        margin-right: calc((100vw - 1850px)/2); /* Dynamically calculate right margin */
    }

    @media (max-width: 1850px){
        .notificationsWrapper {
            max-width: 400px;
            margin: auto;
            top: 90px;
            right: 25px;
        }
    }
    @media (max-width: 600px) {
        .notificationsWrapper{
            width: calc(100% - 50px);
            max-width: 100%;
        }
    }
</style>

<div class="notificationsWrapper">
    {#each $notifications as n}
        <NotificationItem notification={n} on:close={handleNotificationClose}></NotificationItem>
    {/each}
</div>
