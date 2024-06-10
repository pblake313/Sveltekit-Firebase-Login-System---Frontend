
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    export let shaking : boolean = false; //  prop for shaking animation

    const dispatch = createEventDispatcher();

</script>

<style>
    /* Some basic styling, you can customize this */
    button {
        padding: 18px;
        border: 1px solid #c4c4c4;
        border-radius: 4px;
        background-color: #c4c4c4;
        color: black;
        font-size: 16px;
        cursor: pointer;
        width: calc(100%);
        font-weight: bold;
        transition: 0.3s;
        text-transform: uppercase;
        font-family: 'Roboto' sans-serif;
        margin-bottom: 20px;
    }
    button:hover {
        background-color: rgb(231, 231, 231);
        border-color: white;
        color: black;
    }

    button:disabled {
        background-color: #A5A5A5;
        cursor: not-allowed;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
    }

    .shake {
        animation: shake 0.2s;
    }
</style>

<button class="{shaking ? 'shake' : ''}" on:click>
    <slot />
</button>