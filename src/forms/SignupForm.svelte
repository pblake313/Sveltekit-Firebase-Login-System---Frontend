<script lang="ts">
    import Button from "../components/buttons/Button.svelte";
    import TextInput from "../components/form-inputs/TextInput.svelte";
    import FormError from "../components/reusable/FormError.svelte";
    import Loader from "../components/reusable/Loader.svelte";
    import { containsNumber, containsSpecialCharacter, hasOneCapitalLetter, isNineCharacters, isValidEmail, isValidPassword } from "../helpers/formValidators";
    import { fly, fade } from 'svelte/transition';
    import { pushNotification } from "../stores/NotificationStore";
    import { googleSignIn, login, signup } from "../helpers/authFunctions";
    import { goto } from "$app/navigation";
    import GoogleSignInButton from "../components/reusable/GoogleSignInButton.svelte";

    
    let formSubmitted: boolean = false;
    let email: string = ''; 
    let emailInputError: string = '';
    let passwordInputError: string = ''
    let shaking: boolean = false;
    let password: string = ''
    let confirmPassword: string = ''
    let confirmInputError: string = ''

    let isNine: boolean = false
    let hasCap: boolean = false
    let hasNum: boolean = false
    let hasSpec: boolean= false

    let formError: string | null = null
    let errorTitle: string | null = null

    let isLoading: boolean = false

    async function signInWithGoogle() {
        formError = null
        isLoading = true

        const signInResult = await googleSignIn()

        if (signInResult.error){
            formError = signInResult.error
        }

        isLoading = false

    }



    async function handleSignup() {
        formSubmitted = true;

        if (!isValidEmail(email)){ // if the email is invalid
            emailInputError = 'Please enter a valid email';
        }
        if (!isValidPassword(password)){
            passwordInputError = 'Please enter a valid password'
        }
        if (confirmPassword === '') {
            confirmInputError = 'Please enter a valid password'
        }     
        if (confirmPassword !== password){
            confirmInputError = 'Passwords do not match'
        }
        // shake the button if any feild is invalid
        if (!isValidEmail(email) || !isValidPassword(password) || confirmPassword === '' || confirmPassword !== password){
            shake()
            return
        }

        // if the form is valid continue.

        isLoading = true

        try {

            const signupResult = await signup(email, password, confirmPassword)

            formError = null
            errorTitle = null

            if (signupResult.formError) {
                formError = signupResult.formError
            }

            if (signupResult.errorTitle) {
                errorTitle = signupResult.errorTitle
            }

            if (signupResult.formError || signupResult.errorTitle){
                isLoading = false
                return
            }


            const loginResult = await login(email, password)

            if (loginResult.formError || loginResult.errorTitle){
                console.log('some login error occurred. route to login page, and show account created push notification.')
                pushNotification('Account created!', 'success', false, 3000)
                goto('/login')
                return
            }


            errorTitle = null
            formError = null
            isLoading = false;
        } catch (error) {
            // This will handle network errors and any errors that occurred while handling the response
            formError = "We're having trouble processing your request right now. Please check your internet connection or try again later."
            isLoading = false;
        }

    }
    function shake(){
        shaking = true;
        setTimeout(() => { shaking = false; }, 600); // reset shaking
    }
    function updateEmail(event: Event) {
        const input = event.target as HTMLInputElement;
        // Remove all spaces from the input value
        email = input.value.replace(/\s+/g, '');

        if (formSubmitted && isValidEmail(email)) {
            emailInputError = '';
        }
    }
    function handlePassword(event: Event) {
        const input = event.target as HTMLInputElement;
        password = input.value.replace(/\s+/g, '');

        if (password !== '') {
            if (isNineCharacters(password)){
                isNine = true
            } else {
                isNine = false
            }
            if (hasOneCapitalLetter(password)){
                hasCap = true
            } else {
                hasCap = false
            }
            if (containsNumber(password)){
                hasNum = true
            } else {
                hasNum = false
            }
            if (containsSpecialCharacter(password)){
                hasSpec = true
            } else {
                hasSpec = false
            }
        }

        if (formSubmitted && !isValidPassword(password)){
            passwordInputError = 'Please enter a valid password'
        } else {
            passwordInputError = ''
        }

    }
    function handleConfirm(event: Event){
        const input = event.target as HTMLInputElement;
        // Remove all spaces from the input value
        confirmPassword = input.value.replace(/\s+/g, '');

        if (formSubmitted){
            if (confirmPassword === password){
                confirmInputError = ''
            } else {
                confirmInputError = 'Passwords do not match.'
            }
        } else if (confirmPassword === '') {
            confirmInputError = 'Please enter a valid password'

        }

    }

</script>

<style>
    .padBottom {
        padding-bottom: 15px;
    }
    .passwordRequirements p {
        font-size: 9pt;
        margin: 0px;
        padding: 0px;
        margin-left: 25px;
    }
    .bottomLinks {
        text-align: center;
    }
</style>


{#if !isLoading}

    <h2>Signup</h2>
    <TextInput on:input={updateEmail} label="Email" placeholder="email@example.com" value={email} inputError={emailInputError}/>
    <TextInput inputError={passwordInputError} inputType='password' label='Password' value={password} on:input={handlePassword}></TextInput>
    {#if password !== ''}
        <div class="passwordRequirements" in:fly={{ y: -20, duration: 300 }}>
            {#if !hasSpec}
                <p in:fly={{ y: -20, duration: 300 }} out:fade={{ duration: 300 }}>Must have 1 special character</p>
            {/if}
            {#if !hasNum}
                <p in:fly={{ y: -20, duration: 300 }} out:fade={{ duration: 300 }}>Must have 1 number</p>
            {/if}
            {#if !hasCap}
                <p in:fly={{ y: -20, duration: 300 }} out:fade={{ duration: 300 }}>Must have 1 capital letter</p>
            {/if}
            {#if !isNine}
                <p in:fly={{ y: -20, duration: 300 }} out:fade={{ duration: 300 }}>Must be 9 Characters long</p>
            {/if}

            {#if !hasSpec || !hasNum || !hasCap || !isNine}
                <div in:fly={{ y: -20, duration: 300 }} out:fade={{ duration: 300 }} class="padBottom"></div>
            {/if}
        </div>
    {/if}
    <TextInput inputError={confirmInputError} value={confirmPassword} inputType='password' on:input={handleConfirm} label='Confirm Password'></TextInput>
    <Button shaking={shaking} on:click={handleSignup}>Sign Up</Button>

    {#if errorTitle || formError}
        <FormError errorTitle={errorTitle} formError={formError}></FormError>
        <br>
    {/if}

    <GoogleSignInButton on:click={signInWithGoogle}></GoogleSignInButton>

    <div class="bottomLinks">
        <p style="font-size: 10pt;">Already have an account? <a href="/login">Login</a></p>
    </div>

{:else}
    <Loader></Loader>
{/if}
