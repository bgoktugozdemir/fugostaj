let url = `http://www.informatik.uni-leipzig.de/~duc/TD/td/index.php?word=&db=ve`;

let Buff = [];
let totalWork = 0;
var Items;
var Next;
function onload  () {
    
    try {
        Items = Array.from(document.querySelectorAll('#suggestions > a'));
        Next = Items[Items.length-1];
        
        Buff.push(Items.map(x => x.innerText).join(`\r\n`));
        
        totalWork += Items.length;
        if (Items.length < 1) {
            console.log(`İŞLENEN KELİME SAYISI: ${totalWork}`);
            Buff.push(""); 
            WordDone(Buff.join(`\r\n`)); 
        } else {
            document.src = Next.href;
        }

        counter++;
        setTimeout(() => {
            onload();
        }, 3000); 
    } catch (error) {
        counter--;
        alert(counter);
        console.log(`HATA: ${counter}`);
    }
}

let WordDone;
let counter = 0;

async function Main() {
    let Words = "";
    onload();
    console.log(Words);
    alert(`İşlenen kelime sayısı: ${totalWork}`)
}

Main();

