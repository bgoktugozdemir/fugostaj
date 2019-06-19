let page = window.location.href.slice(36,38);
let i = 0;
function a() {
    if (i < 450) {
        try {
            document.getElementsByClassName('loadmore')[i++].click();
            setTimeout(() => {
                a();
            }, 2200); 
        } catch (error) {
            i--;
            alert(i);
            console.log(`HATA: ${document.getElementsByClassName('loadmore').length+1} - ${i} (page = i+1)`);
        }
        finally{
            window.scrollTo(0,document.body.scrollHeight);
        }
    }
    else 
        alert(i);
}

let wordList = "";
function getWords() {
    const words = Array.from(document.querySelectorAll('.news_list > li > h3'));
    for(let ww of words){
        wordList += `${ww.innerText}\r\n`
    }
    console.log(wordList);
    console.log(`Sayfa Sayısı: ${i}\r\nBulunan Kelime Sayısı: ${words.length}`);
    copyToClipboard(wordList);
    setInterval(() => {
        window.open(`https://พจนานุกรมไทย.com/${++page}.html`)
    }, 2000);
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
a();