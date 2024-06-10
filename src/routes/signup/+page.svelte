<script lang="ts">
  import SignupForm from "../../forms/SignupForm.svelte";
  import { user } from "../../stores/userStore";
    import type {User} from '../../types/User'
    import { goto } from "$app/navigation";

    $: typedUser = $user as User | null;

    $: if (typedUser) {
        goto('/account')
    }

</script>


<div style="width: 500px; margin: auto;">
    <SignupForm></SignupForm>

</div>