const Iframe = document.createElement("iframe");
document.documentElement.appendChild(Iframe);

let Buff = [];
let totalWork = 0;

Iframe.onload = () => {
    const Items = Iframe.contentDocument.querySelectorAll('#suggestions > a');
    const Next = Items[Items.length-1];
    
    Buff.push(Items.map(x => x.textContent).join('\r\n'));
    
    totalWork += Items.length;
    if (Items.length < 1) {
        console.log(`İŞLENEN KELİME SAYISI: ${totalWork}`);
        Buff.push(""); 
        WordDone(Buff.join(`\r\n`)); 
    } else {
        Iframe.src = Next.href;
    }
}

let WordDone;

function LoadFrame() {
    return new Promise(R => {
        WordDone = R;
        Buff = [];
        Iframe.src = `http://www.informatik.uni-leipzig.de/~duc/Dict/`;

        var ddl = Iframe.contentDocument.getElementById('db');
        var opts = ddl.options.length;
        for (var i=0; i<opts; i++){
            if (ddl.options[i].value == "ve"){
                ddl.options[i].selected = true;
                break;
            }
        }
    });
}

async function Main() {
    let Words = "";
    LoadFrame();
    console.log(Words);
    alert(`İşlenen kelime sayısı: ${totalWork}`)
}

Main();