var _pageLength = 0;
var bound = 0;
var _closedTicketCount = 0;
var currentPage = 1;
var closeButton;
const url = 'http://89.19.9.78/fugosftp/osticket/upload/scp/tickets.php?status=open&p=';
var index = 0;
const Iframe = document.createElement("iframe");
var errorTolerance = 5;
var errorCount = 0;
document.documentElement.appendChild(Iframe);
$("iframe").addClass("iframe-script");
let ticketText = "";

function pageProcess() {
    Iframe.onload = () => {
        _pageLength = Iframe.contentDocument.querySelectorAll("table.list tbody tr").length;
        return new Promise((resolve, reject) => {
            pageProcessIn();
        });
    };
}

function pageProcessIn() {
    var tickets = Iframe.contentDocument.querySelectorAll("form tbody tr a.preview");
    for (index = 0; index < 1; index++) {
        tickets[index].click();
        $("iframe").load(function(){
            console.log("onload");
            ticketText = Iframe.contentDocument.querySelector(".thread-body.no-pjax div div").innerText;
            return new Promise((resolve, reject) => {
                ticketProcess();
            });
        });
    }
}

async function ticketProcess() {
    console.log(ticketText);
    /*
    var ticketTextSplit = ticketText.split("\n");
    if (ticketTextSplit[0] == "" || ticketTextSplit[3][0] == "v" || ticketTextSplit[4][0] == "L" || ticketTextSplit[5][0] == "I") {
        index--;
        _closedTicketCount++;
    }
    else {
        Iframe.contentWindow.history.back(); //bı oncekı sayfaya gerı donuyor
    }
    */
}

function LoadFrame() {
    Iframe.src = url + currentPage++;
    pageProcess();
}

async function Main() {
    Iframe.height = 1200;
    Iframe.width = 1600;
    await LoadFrame();
}

Main();