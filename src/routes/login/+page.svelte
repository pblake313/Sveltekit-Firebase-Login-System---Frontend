<script lang="ts">
    import LoginForm from "../../forms/LoginForm.svelte"
    import { user } from "../../stores/userStore";
    import type {User} from '../../types/User'
    import { goto } from "$app/navigation";

    $: typedUser = $user as User | null;
    
    $: if (typedUser) {
        goto('/account')
    }

</script>

<style>
    .loginWrap {
        width: 500px;
        margin: auto;
    }
</style>


<div class="loginWrap">
    <LoginForm></LoginForm>
</div>

