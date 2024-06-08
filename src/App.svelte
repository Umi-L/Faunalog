<script lang="ts">
    import PhotoPage from "./lib/PhotoPage.svelte";
    import {AppState, CurrentState} from "./State";
    import DexPage from "./lib/DexPage.svelte";
    import {onMount} from "svelte";
    import MainTheme from "./assets/MainTheme.mp3";
    import Leaderboard from "./lib/Leaderboard.svelte";

    let _currentState: AppState;
    CurrentState.subscribe((state) => {
        console.log("Current State: ", state);
        _currentState = state;
    });

    onMount(() => {
        // play main theme
        const audio = new Audio(MainTheme);

        audio.loop = true;

        audio.volume = 0.5;

        audio.play();


        // on document interaction, play audio
        document.addEventListener("click", () => {
            audio.play();
        });
    });

</script>

<main class="main">
    {#if _currentState == AppState.Photo}
        <PhotoPage/>
    {:else if _currentState == AppState.Dex}
        <DexPage/>
    {:else if _currentState == AppState.Leaderboard}
        <Leaderboard/>
    {/if}
</main>

<style>

</style>
