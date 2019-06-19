const Iframe = document.createElement("iframe");
document.documentElement.appendChild(Iframe) // Iframe i ekrana ekledi.
const empty = "";
const Letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "Ñ",
    'Ng',
    'O',
    'P', 
    'Q', 
    'R', 
    'S', 
    'T', 
    'U', 
    'V', 
    'W', 
    'X', 
    'Y', 
    'Z'
];
let currentLetter = 0;
let Buff = [];
let totalWork = 0;
let wordWork = 0;
let pageCount = 0;
Iframe.onload = () => {
    const Items = Array.from(Iframe.contentDocument.querySelectorAll(".pronunciation")); // Kelimeler tespit edildi.
    const Next = Iframe.contentDocument.querySelector(".pagination-list > a:last-child"); // Sonraki sayfa buttonu tespit edildi.
    Buff.push(Items.map(x => x.textContent).join('\r\n'));
    
    wordWork += Items.length; // O harfteki kelime sayıları toplanıyor.
    totalWork += Items.length; // Sayfadaki kelime sayıları toplanıyor.
    //console.log(`###   ${Letters[currentLetter]}   ###\r\nSayfada işlenen kelime sayısı: ${Items.length}\r\nToplamda işlenen kelime sayısı: ${totalWork}\r\n${Iframe.src}`); // Konsola basılıyor.
    
    if (Next.href === Iframe.contentWindow.location.href || Items.length < 100) // Harf bitti
    {
        console.log(`${Letters[currentLetter]} HARFİNTEN İŞLENEN TOPLAM KELİME SAYISI: ${wordWork}\r\nTOPLAM İŞLENEN KELİME SAYISI: ${totalWork}`)
        wordWork = 0;
        pageCount = 0;
        Buff.push(empty); // Yeni harften evvel 1 satır boşluk bırakıyor.
        WordDone(Buff.join(`\r\n`)); 
    }
    else
    {
        console.log(`${Letters[currentLetter]} - ${++pageCount}`);
        Iframe.src = Next.href; // Sıradaki sayfa
    }
}

let WordDone;

function LoadFrame(Letter) {
    return new Promise(R => {
        WordDone = R;
        Buff = [];
        Iframe.src = `https://diksiyonaryo.ph/list/${Letter}`;
    });
}

async function Main() {
    let Words = "";
    for(const Letter of Letters){
        Words += await LoadFrame(Letter);
        currentLetter++;
    }
    console.log(Words);
    alert(`İşlenen kelime sayısı: ${totalWork}`)
}

Main();