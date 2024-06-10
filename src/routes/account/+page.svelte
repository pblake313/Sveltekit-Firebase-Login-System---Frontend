<script lang="ts">
    import { goto } from '$app/navigation';
    import Button from '../../components/buttons/Button.svelte';
    import { logout, refreshAccessToken } from '../../helpers/authFunctions';
    import { user } from '../../stores/userStore';
    import type { User } from '../../types/User';
    import { get } from "svelte/store";
    import {tokenStore} from '../../stores/tokenStore'
    import Loader from '../../components/reusable/Loader.svelte'
    const backendLink = import.meta.env.VITE_BACKEND_URL;

    let fetchedData: string | null = null

    let isLoading: boolean = false

    $: typedUser = $user as User | null;

    $: if (!typedUser) {
        handleLogout();
    }

    async function handleLogout() {
        await logout();
        goto('/login');
    }

    async function requestProtectedData() {

        fetchedData = null
        try {
            isLoading = true
            
            await refreshAccessToken(); // refreshing the token every time because the access token only lasts for 30 seconds

            const token = get(tokenStore);

            const response = await fetch(`${backendLink}/protectedData/get-private-data`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const result = await response.json();

            if (result.successMessage) {
                fetchedData = result.successMessage
            } else {
                fetchedData = 'An error occurred :(  Check the logs.'
            }
            console.log(result)
            isLoading = false

            return result; 
        } catch (error) {
            isLoading = false
            console.log(error) 
            fetchedData = 'An error occurred :(  Check the logs.'
        }
    }

</script>

{#if typedUser}
    <h3 style="margin: 0px;">Success!</h3>
    <p>Logged in user is {typedUser.email}</p>
    <hr>
    <p>Here is an example of requesting protected data!</p>

    {#if isLoading}
        <Loader></Loader>
    {:else}
        <div style="width: 250px;">
            <Button on:click={requestProtectedData}>Request Data</Button>
        </div>
    {/if}
    

    {#if fetchedData}
        <p>{fetchedData}</p>
    {/if}
{/if}
