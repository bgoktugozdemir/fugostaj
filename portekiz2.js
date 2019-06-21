const url = 'https://www.lexico.pt/ortografar/'

const Iframe = document.createElement("iframe")
document.documentElement.appendChild(Iframe)

let Buff = [];
let totalWork = 0;

Iframe.onload = () => {
    try {
        const Word1 = Iframe.contentDocument.querySelector('.next > .nav-main > a').innerText;
        Buff.push(Word1)
        const Word2 = Iframe.contentDocument.querySelector('.next > .nav-secondary > a').innerText;
        Buff.push(Word2)
        totalWork+=2;
        const Next = Iframe.contentDocument.querySelector('.next > .nav-secondary > a').href;
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
    copyToClipboard(words);
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

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    console.log("KOPYALANDI!")
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