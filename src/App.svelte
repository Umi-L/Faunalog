<script lang="ts">
    import PhotoPage from "./lib/PhotoPage.svelte";
    import {AppState, CurrentState} from "./State";

    let _currentState : AppState;
    CurrentState.subscribe((state) => {
        console.log("Current State: ", state);
        _currentState = state;
    });
</script>

<main class="main">
    <PhotoPage />
</main>

<style>

</style>
