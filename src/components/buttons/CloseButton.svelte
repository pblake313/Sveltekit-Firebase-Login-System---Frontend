<script>
  import CloseIcon from "../svg/Icons/CloseIcon.svelte";


</script>

<style>
    button {
        background-color: transparent;
        border: none;
        outline: none;
        height: 40px;
        width: 40px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        opacity: .6;
        transition: .3s;
    }
    button:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.093);
        opacity: 1;
    }
</style>

<button on:click>
    <CloseIcon height='20px'></CloseIcon>
</button>