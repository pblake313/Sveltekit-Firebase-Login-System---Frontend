<script>

  import GoogleLogo from "../svg/Logos/GoogleLogo.svelte";

</script>


<style>
    .googleButton {
        background-color: transparent;
        filter: grayscale(100%);
        border: none;
        cursor: pointer;
        transition: .3s;
        width: 100%;
        border-radius: 5px;
        display: flex;
        justify-content: space-evenly;
        padding: 7px 0px;
    }
    .googleButton:hover {
        filter: grayscale(0%);
        background-color: #232528;

    }
    .googFlex {
        display: flex;
        align-items: center;
        width: fit-content;
    }
</style>


<button class="googleButton" on:click>
    <div class="googFlex">
        <GoogleLogo width='35px'></GoogleLogo>
        <p style="margin-left: 15px;">Sign in with Google</p>
    </div>
</button>