import {writable} from "svelte/store";

export enum AppState {
    Auth,
    Photo
}

export let CurrentState = writable(AppState.Auth);