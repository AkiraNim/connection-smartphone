import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { exec } from "child_process";

const firebaseConfig = {
    apiKey: "AIzaSyB5bVYBmXpjNyDBniXl-mxtYdXDf8m-6No",
    authDomain: "umsimples-smartphone.firebaseapp.com",
    databaseURL: "https://umsimples-smartphone-default-rtdb.firebaseio.com",
    projectId: "umsimples-smartphone",
    storageBucket: "umsimples-smartphone.appspot.com",
    messagingSenderId: "26048398759",
    appId: "1:26048398759:web:818b83b0c7b3833030e282",
    measurementId: "G-0D18BG7285"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const vibrarRef = ref(db, "vibrador/vibrar");
const lanternaRef = ref(db, "lanterna/status");

onValue(vibrarRef, (snapshot) => {
    const vibrar = snapshot.val();
    if (vibrar) {
        console.log("Vibrando princesa😏...");
        exec("termux-vibrate -d 5000 -f", (error) => {
            if (error) {
                console.error("Não vibrou😔", error);
            } else {
                console.log("Descansar né princesa? Ngm é de ferro");
                set(vibrarRef, false);
            }
        });
    }
});

onValue(lanternaRef, (snapshot) => {
    const ligarLanterna = snapshot.val();
    if (ligarLanterna) {
        console.log("Virou boate?😏");
        exec("termux-torch on", (error) => {
            if (error) {
                console.error("Só vejo escuridão", error);
            }
        });
    } else {
        console.log("Faltou energia?😔");
        exec("termux-torch off");
    }
});