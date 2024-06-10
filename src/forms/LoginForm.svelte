<script lang="ts">
    import Button from "../components/buttons/Button.svelte";
    import TextInput from "../components/form-inputs/TextInput.svelte";
    import FormError from "../components/reusable/FormError.svelte";
    import Loader from "../components/reusable/Loader.svelte";
    import { googleSignIn, login } from "../helpers/authFunctions";
    import { isValidEmail } from "../helpers/formValidators";
    import GoogleSignInButton from "../components/reusable/GoogleSignInButton.svelte";

    let email: string = ''
    let emailInputError: string = '';
    let password: string = ''
    let passwordInputError: string = ''
    let shaking: boolean = false;
    let formSubmitted: boolean = false
    let isLoading: boolean = false

    let formError: string | null = null
    let errorTitle: string | null = null

    async function signInWithGoogle() {
        formError = null
        isLoading = true

        const signInResult = await googleSignIn()

        if (signInResult.error){
            formError = signInResult.error
        }

        isLoading = false

    }

    async function handleLogin() {
        formSubmitted = true

        if (password === ''){
            passwordInputError = 'Please enter a password.'
        }

        if (!isValidEmail(email)){
            emailInputError = 'Please enter a valid email';
        }

        if (password === '' || !isValidEmail(email)){
            shake()
            return
        }

        isLoading = true

        try {
            const loginResult = await login(email, password)
            if (loginResult.formError) {
                formError = loginResult.formError
            }

            if (loginResult.errorTitle) {
                errorTitle = loginResult.errorTitle
            }

            if (loginResult.formError || loginResult.errorTitle){
                isLoading = false
                return
            }


            errorTitle = null
            formError = null
            isLoading = false;
        } catch (error) {
            // This will handle network errors and any errors that occurred while handling the response
            errorTitle = null;
            formError = "We're having trouble processing your request right now. Please check your internet connection or try again later."
            isLoading = false;
        }


    }

    function handleEmail(event: Event){
        const input = event.target as HTMLInputElement;
        // Remove all spaces from the input value
        email = input.value.replace(/\s+/g, '');

        if (formSubmitted && isValidEmail(email)) {
            emailInputError = '';
        }
    }

    function handlePassword(event: Event){
        const input = event.target as HTMLInputElement;
        password = input.value.replace(/\s+/g, '');

        if (formSubmitted && password === ''){
            passwordInputError = 'Please enter a valid password'
        } else {
            passwordInputError = ''
        }
    }

    function shake(){
        shaking = true;
        setTimeout(() => { shaking = false; }, 600); // reset shaking
    }
</script>

<style>
    .bottomLinks {
        text-align: center;
    }

</style>


{#if isLoading}
    <Loader></Loader>
{:else}
    <h2>Login</h2>
    <TextInput on:input={handleEmail} label="Email" placeholder="you@example.com" value={email} inputError={emailInputError}></TextInput>
    <TextInput on:input={handlePassword} inputType='password' label='Password' value={password} inputError={passwordInputError}></TextInput>
    <Button shaking={shaking} on:click={handleLogin}>Login</Button>

    {#if errorTitle || formError}
        <FormError errorTitle={errorTitle} formError={formError}></FormError>
        <br>
    {/if}

    <GoogleSignInButton on:click={signInWithGoogle}></GoogleSignInButton>

    <div class="bottomLinks">
        <p style="font-size: 10pt;">No account? <a href="/signup">Sign Up</a></p>
    </div>

{/if}
