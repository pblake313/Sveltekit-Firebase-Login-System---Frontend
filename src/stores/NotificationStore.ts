// src/lib/notificationStore.ts

import { writable } from 'svelte/store';

export interface Notification {
    id: string;
    message: string;
    alertType: 'error' | 'warning' | 'success' | 'neutral';
    manualClose?: boolean;
    duration?: number; // Duration in milliseconds
}

const notifications = writable<Notification[]>([]);

function pushNotification(message: string, alertType: 'error' | 'warning' | 'success' | 'neutral', manualClose: boolean = false, duration: number = 3000) {
    const id = `${new Date().getTime()}${Math.random()}`;

    notifications.update(currentNotifications => {
        const exists = currentNotifications.some(notification => notification.message === message);
        if (!exists) {
            const newNotification: Notification = { id, message, alertType, manualClose, duration };
            const newNotifications = [...currentNotifications, newNotification];

            if (!manualClose) {
                setTimeout(() => removeNotification(id), duration);
            }

            return newNotifications;
        }
        return currentNotifications;
    });
}

function removeNotification(id: string) {
    notifications.update(currentNotifications => 
        currentNotifications.filter(notification => notification.id !== id)
    );
}

export { notifications, pushNotification, removeNotification };
