import firebase from 'firebase'


// const firebaseApp = firebase.initializeApp({
    
//     apiKey: "AIzaSyBcS936p-Wu8lvWOzCEV3FE1A4r1-DDz14",
//     authDomain: "nextjs-blog-ff31e.firebaseapp.com",
//     projectId: "nextjs-blog-ff31e",
//     storageBucket: "nextjs-blog-ff31e.appspot.com",
//     messagingSenderId: "982262902892",
//     appId: "1:982262902892:web:eff7ed72073e067e6fa849",
//     measurementId: "G-L1R8YF93ZN"
    
// });



try {
    firebase.initializeApp({
        apiKey: "AIzaSyBcS936p-Wu8lvWOzCEV3FE1A4r1-DDz14",
        authDomain: "nextjs-blog-ff31e.firebaseapp.com",
        projectId: "nextjs-blog-ff31e",
        storageBucket: "nextjs-blog-ff31e.appspot.com",
        messagingSenderId: "982262902892",
        appId: "1:982262902892:web:eff7ed72073e067e6fa849",
        measurementId: "G-L1R8YF93ZN"
    })
    } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
    }
    }


const db = firebase.firestore();

export default db;