// src/stores/userStore.ts
import { writable } from 'svelte/store';
import type { User } from '../types/User';

// Initial user state is null, meaning no user is logged in
export const user = writable(null);
