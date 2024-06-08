<script lang="ts">
    import {DeterminePlant} from "../SupabaseUtils";
    import Icon from '@iconify/svelte';
    import Topbar from "./Topbar.svelte";
    import {Loader} from '@svelteuidev/core';
    import {CurrentPlantData, type PlantData} from "../State";
    import Info from "./Info.svelte";

    import ClickAudio from "../assets/Jingle.mp3";

    let video: HTMLMediaElement;
    let videoWidth: number;
    let videoHeight: number;
    let _stream: MediaStream;

    let loading = false;

    const constraints = {
        audio: false,
        video: {
            facingMode: "environment",
        },
    };

    const clickAudio = new Audio(ClickAudio);

    clickAudio.volume = 1;

    // handle if mediaDevices is not supported\
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("getUserMedia is not supported by your browser");
    }

    let _currentPlantInfo: PlantData | undefined;
    CurrentPlantData.subscribe(value => {
        _currentPlantInfo = value;
    });


    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        const videoTracks = stream.getVideoTracks();
        console.log("Got stream with constraints:", constraints);
        console.log(`Using video device: ${videoTracks[0].label}`);
        stream.onremovetrack = () => {
            console.log("Stream ended");
        };

        videoWidth = stream.getVideoTracks()[0].getSettings().width!;
        videoHeight = stream.getVideoTracks()[0].getSettings().height!;

        video.srcObject = stream;

        _stream = stream;
    })
        .catch((error) => {
            if (error.name === "OverconstrainedError") {
                console.error(
                    `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`,
                );
            } else if (error.name === "NotAllowedError") {
                console.error(
                    "You need to grant this page permission to access your camera and microphone.",
                );
            } else {
                console.error(`getUserMedia error: ${error.name}`, error);
            }
        });

    async function onShutter() {
        // get snapshot of video
        const canvas = document.createElement('canvas');
        canvas.width = videoWidth;
        canvas.height = videoHeight;
        const ctx = canvas.getContext('2d');
        // @ts-ignore
        ctx!.drawImage(video, 0, 0, videoWidth, videoHeight);
        const data = canvas.toDataURL('image/png');
        // console.log(data);

        // // add canvas to document
        // document.body.appendChild(canvas);

        loading = true;

        let result = await DeterminePlant(data);

        loading = false;

        let plant = {
            Name: result,
            Description: "",
            ImageUrl: data,
        } as PlantData;

        CurrentPlantData.set(plant);

        clickAudio.play();

        // // add result to document
        // const resultDiv = document.createElement('div');
        // resultDiv.innerText = result;
        // resultDiv.style.color = "black";
        // document.body.appendChild(resultDiv);
    }
</script>

<div class="wrapper">
    {#if _currentPlantInfo}
        <Info/>
    {/if}

    {#if loading}
        <div class="loader">
            <Loader/>
        </div>
    {/if}

    <main class="main">

        <Topbar/>

        <div></div>

        <div class="camera-wrapper">
            <video class="camera" bind:this={video} autoplay></video>
        </div>
        <div class="button" on:click={onShutter}>
            <Icon icon="akar-icons:camera" width="100" height="100" class="icon"/>
        </div>
    </main>
</div>

<style>
    .main {
        width: 100dvw;
        height: 100dvh;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        overflow: hidden;

        padding-top: 20px;
        padding-bottom: 20px;
    }

    .loader {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: rgba(0, 0, 0, 0.5);

        z-index: 100;

    }

    :global(.icon) {
        color: black;
        width: 60%;
        height: 60%;
    }

    .camera-wrapper {
        padding: 20px;
        margin: 10px;
        background-color: white;

        border-radius: 10px;

        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .button {
        width: 100px;
        height: 100px;

        background-color: white;

        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .camera {
        width: 100%;
        height: 100%;

        border-radius: 10px;
    }
</style>
