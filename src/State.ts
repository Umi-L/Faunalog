import {writable} from "svelte/store";

export enum AppState {
    Auth,
    Photo,
    Dex,
    Leaderboard
}

export interface PlantData {
    Name: string;
    Description: string;
    ImageUrl: string;
}

export interface LeaderboardData {
    Name: string;
    TopCount: string;
}

export let CurrentState = writable(AppState.Photo);
export let CurrentPlantData = writable<PlantData | undefined>(undefined);
export let Leaderboard = writable<LeaderboardData | undefined>(undefined);