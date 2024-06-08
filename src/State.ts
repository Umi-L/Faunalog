import {writable} from "svelte/store";

export enum AppState {
    Auth,
    Photo,
    Dex
}

export interface PlantData {
    Name: string;
    Description: string;
    ImageUrl: string;
}

export let CurrentState = writable(AppState.Photo);
export let CurrentPlantData = writable<PlantData | undefined>(undefined);