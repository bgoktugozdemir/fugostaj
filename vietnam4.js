let url = `http://www.informatik.uni-leipzig.de/~duc/TD/td/index.php?word=&db=ve`;

const Iframe = document.createElement("iframe")
document.documentElement.appendChild(Iframe)
let counterDifference = 300;
let maxPageCounter = counterDifference;
let pageCounter = 0;

let Buff = [];
let totalWork = 0;
let wordListText = "";

Iframe.onload = () => {
    const Items = Array.from(Iframe.contentDocument.querySelectorAll('#suggestions > a'));
    Items.shift();
    const Next = Items[Items.length-1];
    if (Items.length > 0) {

        Buff.push(Items.map(x => x.innerText).join('\n'));

        totalWork += Items.length;
        pageCounter++;
        
    }
    if (Items.length <= 1) {
        Buff.push(""); 
        WordDone(Buff.join(`\r\n`)); 
    } else if(pageCounter >= maxPageCounter){
        maxPageCounter += counterDifference;
        Iframe.src = Next.href;
        for(let word of Buff){
            wordListText += word
        }
        wordListText += `\r\n @ ${Iframe.contentWindow.location.href}`
        console.log(wordListText)
        alert(`SINIRA ULAŞILDI! ${pageCounter} İŞLENEN KELİME SAYISI: ${totalWork}`);
        console.clear()
        Buff = [];
        wordListText = "";
    }
    else {
        Iframe.src = Next.href;
    }
}

let WordDone;

function LoadFrame() {
    return new Promise(R => {
        WordDone = R;
        Buff = [];
        Iframe.src = url;
    });
}

function Exit() {
    return;
}

async function Main() {
    Iframe.width = 800;
    Iframe.height = 500;
    let Words = "";
    Words = await LoadFrame();
    console.log(Words);
    alert(`İŞLENEN KELİME SAYISI: ${totalWork}`) 
}

Main();

// http://www.informatik.uni-leipzig.de/~duc/TD/td/index.php?bpos=328666&db=ve