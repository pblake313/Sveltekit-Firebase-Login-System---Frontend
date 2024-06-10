<script lang="ts">

    import HideIcon from '../svg/Icons/HideIcon.svelte';
import ShowIcon from '../svg/Icons/ShowIcon.svelte'

    export let label: string = 'Enter Label Value'
    export let value: string = ''
    export let id: string | null = `${new Date().getTime() + Math.random()}`
    export let placeholder: string | null = null
    export let inputType: string = 'text'
    export let inputError: string = ''
    export let showPassword = false

    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    .inputWrapper {
        margin-bottom: 20px;
        position: relative;
    }

    input {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        width: 250px;
        padding: 10px 15px;
        border: 1px solid #333639;
        padding-top: 30px;
        border-radius: 4px;
        background-color: transparent;
        width: calc(100% - 32px);
        background-color: #232528;
        color: #b7bbc3;
        transition: .3s;
        font-size: 11pt;
    }

    input:hover {
        background-color: #232528;
    }
    input:focus {
        outline: none;
        background-color: #2d3034;
    }
    input::placeholder {
        color: #6e7075;
        font-family: "Roboto", sans-serif;

    }
    label {
        position: absolute;
        font-family: "Roboto", sans-serif;
        color: #a0a2a6;
        top: 10px;
        left: 15px;
        display: block;
        width: fit-content;
        font-size: 11pt;
        font-weight: 400;
    }
    .passwordTogglerWrapper {
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 25px;
        height: 25px;
    }
    button {
        background-color: transparent;
        cursor: pointer;
        position: relative;
        border: none;
    }
    button img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: .7;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 50px #232528 inset !important; /* Change the color to match your form's background */
        -webkit-text-fill-color: #b7bbc3 !important; /* Change the text color */
    }

    input:-webkit-autofill {
        -webkit-text-fill-color: blue;
        transition: background-color 5000s ease-in-out 0s;
    }
    .inputError {
        line-height: 1em;
        margin: 0px;
        padding: 0px;
        font-size: 10pt;
        padding: 0px 16px;
        color: #b27718;
        margin-bottom: 8px;
    }
    .error {
        background-color: #342712;
        border-color: #9b7332;
    }
    .error:hover {
        background-color: #423219;
        border-color: #9b7332;
    }
    .error:focus {
        background-color: #423219;
        border-color: #9b7332;
    }
    .showHide {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

</style>

{#if inputError !== ''}
    <p class="inputError">{inputError}</p>
{/if}
<div class="inputWrapper">
    <label for={id}>{label}</label>
    <input class:error={inputError !== ''} id={id} value={value} type={showPassword ? 'text' : inputType} on:input placeholder={!placeholder ? label : placeholder} autocomplete="off">
    {#if inputType === 'password'}
        <button class="passwordTogglerWrapper" on:click={togglePasswordVisibility}>
            {#if showPassword}
                <div class="showHide">
                    <ShowIcon></ShowIcon>
                </div>
            {:else}
                <div class="showHide">
                    <HideIcon></HideIcon>
                </div>
            {/if}
        </button>
    {/if}
</div>
