const url = 'https://www.lexico.pt/incorrigivel/'

const Iframe = document.createElement("iframe")
document.documentElement.appendChild(Iframe)

let Buff = [];
let totalWork = 0;

Iframe.onload = () => {
    try {
        const Word = Iframe.contentDocument.querySelector('h1.title').innerText;
        Buff.push(Word)
        totalWork++;
        const Next = Iframe.contentDocument.querySelector('.next > .nav-main > a').href;
        Iframe.src = Next;
    } catch (error) {
        console.log(`zurro son kelimedir. En son taranan kelime: ${Word}\n\r${error}`);
    }

}

function print() {
    let words = "";

    for (const word of Buff) {
        words += `${word}\n`
    }
    console.log(words);
    alert("Basıldı!");
    Buff = [];
    console.clear()
}

let WordDone;
function LoadFrame() {
    return new Promise(R => {
        WordDone = R;
        Buff = [];
        Iframe.src = url;
    });
}

async function Main() {
    Iframe.height = 1200;
    Iframe.width = 1600;
    let Words = "";
    Words = await LoadFrame();
    alert(`İŞLENEN KELİME SAYISI: ${totalWork}`) 
    print()
}

Main();