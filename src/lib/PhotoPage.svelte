<script lang="ts">
    import {DeterminePlant} from "../SupabaseUtils";

    let video: HTMLMediaElement;
    let videoWidth : number;
    let videoHeight : number;
    let _stream : MediaStream;

    const constraints = {
        audio: false,
        video: {
            facingMode: "environment",
        },
    };

    // handle if mediaDevices is not supported\
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("getUserMedia is not supported by your browser");
    }

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

    async function onShutter(){
        // get snapshot of video
        const canvas = document.createElement('canvas');
        canvas.width = videoWidth;
        canvas.height = videoHeight;
        const ctx = canvas.getContext('2d');
        // @ts-ignore
        ctx!.drawImage(video, 0, 0, videoWidth, videoHeight);
        const data = canvas.toDataURL('image/png');
        // console.log(data);

        // add canvas to document
        document.body.appendChild(canvas);

        let result = await DeterminePlant(data);

        // add result to document
        const resultDiv = document.createElement('div');
        resultDiv.innerText = result;
        resultDiv.style.color = "black";
        document.body.appendChild(resultDiv);
    }
</script>

<main class="main">
    <video class="camera" bind:this={video} autoplay></video>
    <div class="button" on:click={onShutter} />
</main>

<style>
    .main {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        overflow: hidden;
    }

    .button {
        width: 100px;
        height: 100px;

        background-color: white;
    }

    .camera {
        width: 100%;
        height: 100%;
    }
</style>
