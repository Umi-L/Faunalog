<script>
    import Icon from "@iconify/svelte";
    import {AppState, CurrentState} from "../State";
</script>

<div class="topbar">
    <div class="button" on:click={()=>{CurrentState.set(AppState.Photo)}}>
        <Icon icon="eva:camera-outline" width="30" height="30"/>
    </div>

    <div class="button" on:click={()=>{CurrentState.set(AppState.Dex)}}>
        <Icon icon="eva:menu-outline" width="30" height="30"/>
    </div>
</div>

<style>
    .topbar {
        height: 70px;
        width: 100%;
        position: fixed;
        top: 0;

        padding: 10px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .button {
        height: 50px;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: var(--accent-color);

        border-radius: 50%;

        border: 1px solid var(--text-color);

        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    }
</style>