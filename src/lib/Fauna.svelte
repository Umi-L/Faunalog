<script lang="ts">
    import {AppState, CurrentState, Leaderboard, type LeaderboardData} from "../State";

    export let name: string;
    export let count: number;

    function showLeaderboard(){
        Leaderboard.set({Name: name, TopCount: count} as LeaderboardData)

        CurrentState.set(AppState.Leaderboard)
    }
</script>


<div class="cell" on:click={showLeaderboard}>
    <h1>{name}</h1>

    <p>captures: {count ? count : 0}</p>
</div>


<style>
    .cell{
        width: 100%;

        background-color: var(--text-color);
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        /*align-items: center;*/

        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        padding: 5px;
    }

    h1{
        font-size: 1rem;
        margin: 0;
        padding: 0;

        /*    wrap text hard    */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    p{
        font-size: 0.8rem;
        margin: 0;
        padding: 0;
    }
</style>