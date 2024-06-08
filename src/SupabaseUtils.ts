import {type Writable, writable} from "svelte/store";

import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://ovxdxlgvjcykgzcbbhrp.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eGR4bGd2amN5a2d6Y2JiaHJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4Njc5NDIsImV4cCI6MjAzMzQ0Mzk0Mn0.gfAyDb9H6Iq-btQWMXdOSMFEfcHWjleMvGNA4uL2s04"
const supabase = createClient(supabaseUrl, supabaseKey)


export async function DeterminePlant(imageBase64: string): Promise<string> {

    const body = {ImageBase64: imageBase64}

    const {data} = await supabase.functions.invoke('determine-plant', {
        body: body,
    })

    console.log(data.data)

    return data.data;
}

export async function GetPlantSummary(plantName: string): Promise<string> {
    const body = {name: plantName}

    const {data} = await supabase.functions.invoke('get-plant-summary', {
        body: body,
    })

    console.log(data.data)

    return data.data;
}

interface plantCount {
    [key: string]: number;
}

export async function getTopFauna(): Promise<plantCount> {
    const {data} = await supabase.from('Plants').select('*');

    if (!data) {
        return {};
    }

    // count number of repeated plants
    let counts = {} as any;
    for (let row of data) {
        let plantList = row.data.plants;
        for (let plant of plantList) {
            if (counts[plant]) {
                counts[plant] += 1;
            } else {
                counts[plant] = 1;
            }
        }
    }


    console.log(counts);

    // remove undefined and unrecognizable
    counts["undefined"] = undefined;
    counts["unrecognizable"] = undefined;
    counts["Unrecognizable"] = undefined;

    console.log(counts);

    return counts;
}