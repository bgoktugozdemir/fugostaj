var _pageLength = 0;
var bound = 0;
var _closedTicketCount = 0;
var currentPage = 1;
var closeButton;
const url = 'http://89.19.9.78/fugosftp/osticket/upload/scp/tickets.php?status=open&p=';
var index = 0;
const Iframe = document.createElement("iframe");
document.documentElement.appendChild(Iframe);


Iframe.onload = () => {
    try {
        //closeButton = Iframe.contentDocument.querySelectorAll(".no-pjax.ticket-action")[4].click()
    } catch (error) {

    }

}

function pageProcess() {
    console.log("pageProcess");
    pageProcessGetLength();
    console.log(index)
    
}

async function pageProcessGetLength() {
    Iframe.onload = () => {
        console.log("pageProcess onload");
        _pageLength = Iframe.contentDocument.querySelectorAll("table.list tbody tr").length;
        console.log(_pageLength);
    }
    await pageProcessIn();
    return _pageLength;
}
async function pageProcessIn(){
    for (index = 0; index < _pageLength; index++) {
        console.log(index);
        Iframe.contentDocument.querySelectorAll("form tbody tr")[index].click();
        console.log("click");
        ticketProcess();
    }
}

function ticketProcess() {
    Iframe.onload = () => {
        var ticketText = Iframe.contentDocument.querySelector(".thread-body.no-pjax div div").innerText;
        var ticketTextSplit = ticketText.split("\n");
        if (ticketTextSplit[0] == "" || ticketTextSplit[3][0] == "v" || ticketTextSplit[4][0] == "L" || ticketTextSplit[5][0] == "I") {
            index--;
            _closedTicketCount++;
        }
        else {
            Iframe.contentWindow.history.back(); //bı oncekı sayfaya gerı donuyor
        }
    }
}
function LoadFrame() {
    return new Promise(R => {
        Iframe.src = url + currentPage++;
        pageProcess();
    });
}

async function Main() {
    Iframe.height = 1200;
    Iframe.width = 1600;
    await LoadFrame();
}

Main();