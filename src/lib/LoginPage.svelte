<script lang="ts">
    import {getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult} from "firebase/auth";
    import {AppState, CurrentState} from "../State";

    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(user);

            if (user)
                CurrentUser.set(user);
            // ...

            CurrentState.set(AppState.Photo);
        } else {
            // User is signed out
            // ...

            CurrentState.set(AppState.Auth);
        }
    });

    function signIn() {
        signInWithPopup(auth, AuthProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential!.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...

            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...

            console.log(error);
        });
    }


</script>

<div class="main">
    <button on:click={signIn}>Sign in with Google</button>
</div>

<style>
    .main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>