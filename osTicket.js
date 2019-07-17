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
    for (index = 0; index < 6; index++) {
        Iframe.src = tickets[index].href;
        Iframe.onload = () => {
            ticketText = Iframe.contentDocument.querySelector(".thread-body.no-pjax div div").innerText.trim();
            callTicket();
        };
    }
    currentPage++;
}
function callTicket() {
    console.log("call");
    return new Promise((resolve, reject) => {
        ticketProcess();
        console.log("promise");
    });
}
async function ticketProcess() {
    var lineCount = ticketText.split("/\r\n|\r|\n/").length;
    var ticketTextSplit = ticketText.split("\n");

    if(lineCount == 1) return;

    if (ticketTextSplit[0] == "" || ticketTextSplit[0] == "\n" || ticketTextSplit[3][0] == "v" || ticketTextSplit[4][0] == "L" || ticketTextSplit[5][0] == "I") {
        index--;
        _closedTicketCount++;
        console.log(ticketText);
        return new Promise((resolve, reject) => {
            closeTicket();
        });
    }
    else {
        console.log("back");
        Iframe.src = url + currentPage; //bı oncekı sayfaya gerı donuyor
        Iframe.onload = () => {
            console.log("waiting...")
            return;
        };
    }
}

function closeTicket() {
    document.querySelectorAll("a.no-pjax.ticket-action")[4].click();
    setTimeout(() => {
        document.querySelector("div#ticket-status form span.buttons input[type='submit']").click();
    }, 2000);
}

function LoadFrame() {
    Iframe.src = url + currentPage;
    pageProcess();
}

async function Main() {
    Iframe.height = 1200;
    Iframe.width = 1600;
    await LoadFrame();
}

Main();