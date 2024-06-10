<script lang="ts">
    import { onMount } from 'svelte';
    import Nav from '../components/standalone/Nav/Nav.svelte';
    import Loader from '../components/reusable/Loader.svelte'
    import NotificationsList from '../components/standalone/Notifications/NotificationsList.svelte'
    import { autoLogin } from '../helpers/authFunctions'
    import { fade } from 'svelte/transition';

    import './styles.css';

    let autoLoginStatus = 'loading'

    onMount(async () => {

        await handleAutoLogin() 
        
    });


    async function handleAutoLogin(){
        try {
            await autoLogin()
            autoLoginStatus = 'complete'
        } catch (error) {
            // console.log(error)
            autoLoginStatus = 'complete'
        }
    }

</script>

<style>
    .iploader{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .startWrapper {
		padding: 25px;
		max-width: 1850px;
		margin: auto;
	}
</style>

    <!-- here is where you will put things if you have a sucessful ip. -->


{#if autoLoginStatus === 'loading'}
    <div class="iploader"  in:fade={{ duration: 500 }}  out:fade={{ duration: 300 }}>
        <Loader></Loader>
    </div>
{:else if autoLoginStatus === 'complete'}
    <div  in:fade={{ duration: 500 }}  out:fade={{ duration: 300 }}>
        <Nav></Nav>
        <div class="startWrapper">
            <slot></slot>
        </div>
    </div>
{/if}


<NotificationsList></NotificationsList>



