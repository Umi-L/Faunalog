<script lang="ts">
    import InfiniteScroll from "svelte-infinite-scroll";
    import Topbar from "./Topbar.svelte";
    import Icon from "@iconify/svelte";
    import Fauna from "./Fauna.svelte";
    import {FaunaList} from "../FaunaList";
    import {getTopFauna} from "../SupabaseUtils";
    import {onMount} from "svelte";

    interface FaunaInterface {
        name: string;
        count?: number;
    }

    let i = 0;

    let faunaToDisplay: FaunaInterface[] = [];

    async function top() {
        let plantCounts = await getTopFauna();

        // sort the plant counts
        let sorted = Object.entries(plantCounts).sort((a, b) => b[1] - a[1]);
        faunaToDisplay = []

        // add all the names to the list
        for (let i = 0; i < sorted.length; i++) {
            let name = sorted[i][0];


            faunaToDisplay.push({
                name,
                count: plantCounts[name]
            });

        }

        loadNextPage();
    }

    onMount(() => {
        top();
    })

    function loadNextPage() {
        let oldI = i;
        i += 20;
        // add the next 20 plants to the list
        for (let j = oldI; j < i; j++) {
            if (j < faunaToDisplay.length) {
                let plant = faunaToDisplay[j];
                faunaToDisplay = [...faunaToDisplay, plant];
            }
        }
    }

    loadNextPage();

</script>


<div class="wrapper">
    <Topbar/>

    <h1>
        Faunalog
    </h1>

    <div class="search-bar">
        <Icon icon="bi:search" width="30px" height="30px" class="search-icon"/>

        <input type="text" placeholder="Search for a species..." class="search-input"/>
    </div>

    <div class="fauna-grid">
        {#each faunaToDisplay as plant}
            <Fauna name={plant.name} count={plant.count}/>
        {/each}

        <InfiniteScroll threshold={100} on:loadMore={()=>{loadNextPage()}}/>
    </div>
</div>


<style>

    :global(.search-icon) {
        color: black;
        width: 20px;
        height: 20px;
    }

    .search-bar {
        width: 90%;
        height: 50px;
        background-color: #FFF;
        border-radius: 20px;

        display: flex;
        justify-content: start;
        align-items: center;

        padding: 10px;

        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .search-input {
        border: none;
        outline: none;
        background-color: transparent;
        width: 100%;
        height: 100%;
        font-size: 20px;
        margin-left: 10px;

        color: var(--text-color);
    }

    .fauna-grid {
        display: grid;
        /*three cols*/
        grid-template-columns: 30% 30% 30%;

        /*repeating rows*/
        grid-auto-rows: 120px;

        gap: 20px;
        padding: 20px;

        width: 100%;
        height: 100%;

        overflow-y: auto;

        /*    center*/
        justify-content: center;
    }

    .wrapper {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        width: 100vw;

        overflow: hidden;
        background-color: var(--background-color);
    }

    h1, h2, h3, h4, h5, h6, p {
        color: var(--text-color);
    }
</style>