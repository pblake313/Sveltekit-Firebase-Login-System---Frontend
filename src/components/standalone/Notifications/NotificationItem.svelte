<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type {Notification} from '../../../stores/NotificationStore'
    import { fly, fade } from 'svelte/transition';
    export let notification: Notification;
    import CloseButton from '../../buttons/CloseButton.svelte';
    import CheckIcon from '../../svg/Icons/CheckIcon.svelte';
    import ErrorIcon from '../../svg/Icons/ErrorIcon.svelte';
    import InfoIcon from '../../svg/Icons/InfoIcon.svelte';
    import WarningIcon from '../../svg/Icons/WarningIcon.svelte';
    import './NotificationItem.css';
  
    const dispatch = createEventDispatcher();
  
    function handleClose() {
        dispatch('close', { notificationId: notification.id });
    }
  </script>
  
  <div class="singleNotification {notification.alertType}"
       in:fly={{ y: -20, duration: 300 }} out:fade={{ duration: 300 }}>
      <div class="notificationIcon {notification.alertType}">
          {#if notification.alertType === 'error'}
              <div class="noteIconWrap">
                  <ErrorIcon height='30px'></ErrorIcon>
              </div>
          {:else if notification.alertType === 'neutral'}
              <div class="noteIconWrap">
                  <InfoIcon height='30px'></InfoIcon>
              </div>
          {:else if notification.alertType === 'warning'}
              <div class="noteIconWrap">
                  <WarningIcon height='30px'></WarningIcon>
              </div>
          {:else if notification.alertType === 'success'}
              <div class="noteIconWrap">
                  <CheckIcon height='30px'></CheckIcon>
              </div>
          {/if}
      </div>
      <div class="messageArea">
          <p style="margin: 8px 0px 0px 0px;">{notification.message}</p>
      </div>
      <CloseButton on:click={handleClose}></CloseButton>
  </div>
  