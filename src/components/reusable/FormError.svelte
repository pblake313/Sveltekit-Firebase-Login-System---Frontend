<script lang="ts">
    export let formError: string | null = 'An unknown error has occurred.'
    export let errorTitle: string | null = null    
</script>

<style>
    .formError {
        border: 1px solid white;
        padding: 5px 15px;
        border-radius: 5px;
        background-color: #321818;
        border-color: #5d2323;
    }
    h5 {
        padding: 0px;
        margin: 0px;
        padding-top: 20px;    
        font-size: 16pt;
    }
</style>

<div class="formError">
    {#if errorTitle}
        <h5>{errorTitle}</h5>
    {/if}
    <p style="font-size: 10pt;">{formError}</p>
</div>