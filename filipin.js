var wordList = []; //Saved Words
var wordsText = ``; //Saved Words String
var addedWordCount = 0;
var letterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'Ng','O', 'P',
 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var currentLetterId = 1;
var win;
var waitTime = 100;

function main(){
    win = window.open("https://diksiyonaryo.ph/");
    setTimeout(() => {
        openLetterPage();
    }, waitTime);
}

function openLetterPage(){
    
    var letterHref = win.document.getElementsByClassName("letter")[currentLetterId].href;
    setTimeout(() => {
        newTab(letterHref);
        setTimeout(() => {
            addWords()
        }, waitTime);
    }, waitTime);
}

function addWords(){
    var webWordList = win.document.getElementsByClassName("pronunciation"); // Current Page Words
    var thisPageAddedWord = 0;

    setTimeout(() => {
        for (let index = 0; index < webWordList.length; index++) {
            wordList.push(webWordList[index].textContent);
            thisPageAddedWord++;
        }
        prepareTxt();
        setTimeout(() => {
            nextPage();
        }, waitTime);
    }, waitTime);
    addedWordCount += thisPageAddedWord;
    console.log("Bu sayfada işlenen kelime sayısı: " + thisPageAddedWord + "\nTotalde işlenen kelime sayısı: " + addedWordCount);
}

function nextPage() {
    var oldUrl = win.window.location.href;
    var nextPageHref = win.document.getElementsByClassName("pagination-list text-center")[0].lastElementChild.href; // Next Page Button
    setTimeout(() => {
        newTab(nextPageHref);
        setTimeout(() => {
            var newUrl = win.window.location.href;
            console.log("Old URL: " + oldUrl +"\nNew URL: " + newUrl);
            if (oldUrl == newUrl) 
                nextLetter();
            else
                addWords();
        }, waitTime);
    }, waitTime);
}

function nextLetter(){

    if (currentLetterId < letterList.length-1) {
        //currentLetterId++;
        //openLetterPage();
        console.log(wordsText);
        alert(addedWordCount + " Kelime Tarandı!")
    }
    else{
        console.log(wordsText);
        alert(addedWordCount + " Kelime Tarandı!")
        download();
    }
}

function prepareTxt(){
    wordsText += wordList.join('\r\n');
    wordList = []
}

function download(wordsText) {
    var hiddenElement = win.document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI(wordsText);
    hiddenElement.target = '_blank';
    hiddenElement.download = letterList[currentLetterId]+'.txt';
    hiddenElement.click();
}

function newTab(buttonHref) {
    if(win != null) win.close();
    win = window.open(buttonHref);
}

function p() {
    console.log(wordsText);
}




/* #### */




const Iframe = document.createElement("iframe");
document.documentElement.appendChild(Iframe);
const Letters = [
  "A"/*,
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
"Ñ", 'Ng','O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'*/];

let Buff;

Iframe.onload = () => {
  console.log(Iframe.src);
  const Items = Array.from(Iframe.contentDocument.querySelectorAll(".pronunciation"));
  const Next = Iframe.contentDocument.querySelector(".pagination-list > a:last-child");
  Buff.push(Items.map(x => x.textContent).join('\r\n'));
  
  if(Next.href === Iframe.contentWindow.location.href)
    WordDone(Buff.join(''));
  else {
    Iframe.src = Next.href;
  }
}

let WordDone;

function LoadFrame(Letter){
  return new Promise(R => {
    WordDone = R;
    Buff = [];
    Iframe.src = `https://diksiyonaryo.ph/list/${Letter}`;
  })
}

async function Main(){
  let Words = "";
  for(const Letter of Letters)
    Words += await LoadFrame(Letter);
  console.log(Words);
}

Main();