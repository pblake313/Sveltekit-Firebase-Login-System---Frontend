<script lang="ts">
    import './Nav.css'
    import { user } from '../../../stores/userStore';
    import type {User} from '../../../types/User'
    import { logout } from '../../../helpers/authFunctions';

    $: typedUser = $user as User | null;

</script>


<div class="navContainer">
    <div class="insideNav">
        <a href="/">
            <p>Your Logo Here!</p>
        </a>

        <div class="navButtons">
            <a href="/">Home</a>

            {#if !typedUser}
                <a href="/login">Login</a>
                <!-- <a href="/signup">Sign Up</a> -->
            {/if}
      
            {#if typedUser}
                <a href="/account">Account</a>

                <button on:click={logout}>Log Out</button>

            {/if}   

        </div>

    </div>
</div>
