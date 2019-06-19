function a() {
    if (i < 450) {
        try {
            document.getElementsByClassName('loadmore')[i++].click() 
        } catch (error) {
            i--;
            console.log('hata');
        }
        finally{
            window.scrollTo(0,document.body.scrollHeight);
            setTimeout(() => {
                a();
            }, 1700);
        }
    }
    else 
        alert(i);
}

a();
//464

for(let ww of words){
    wordList += `${ww.textContent}+\r\n`
}