<script lang="ts">
    import {CurrentPlantData, type PlantData} from "../State";
    import {Button} from "@svelteuidev/core";
    import {onMount} from "svelte";
    import {GetPlantSummary} from "../SupabaseUtils";

    let _currentPlantData: PlantData;
    CurrentPlantData.subscribe(value => {
        _currentPlantData = value!;
    });

    let info : string = "Loading fact...";

    onMount(() => {
        GetPlantSummary(_currentPlantData.Name).then(value => {
            info = value;
        });
    });

</script>

<div class="wrapper">
    <div class="main">

        <h1>{_currentPlantData.Name}</h1>
        <p>{_currentPlantData.Description}</p>

        <p>{info}</p>

        <img class="image" src={_currentPlantData.ImageUrl} alt={_currentPlantData.Name} />

        <Button on:click={() => CurrentPlantData.set(undefined)} color="#8da290">Close</Button>
    </div>
</div>

<style>

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100dvh;
        width: 100dvw;

        background-color: rgba(0, 0, 0, 0.5);

        position: absolute;

        z-index: 100;
    }

    .image {
        width: 50%;
        height: 50%;

        border-radius: 10px;
    }

    .main {
        color: var(--text-color);
        gap: 15px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 90%;
        width: 90%;

        padding: 10px;

        border-radius: 10px;
        border: 5px solid var(--accent-color);

        background-color: var(--background-color);

        position: absolute;
    }

    h1 {
        font-size: 2em;
        margin: 0;
    }

    p {
        font-size: 1.5em;
        margin: 0;
    }
</style>