var _pageLength = 0;
var bound = 0;
var _closedTicketCount = 0;
var currentPage = 1;
var closeButton;
const url = 'http://89.19.9.78/fugosftp/osticket/upload/scp/tickets.php?status=open&p=';
var index = 0;
const Iframe = document.createElement("iframe");
var errorTolerance  = 5;
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
    var ticketTextSplit = ticketText.split("\n");

    if(ticketText == "") {
        filterNone();
    }
    if(checkVLI()){
        filterVLI();
    }
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
        Iframe.src = url + currentPage;
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
function checkVLI() {
    for(var x = 0; x < ticketTextSplit.length-2; x++) {
        if(ticketTextSplit[x][0] == "v" && x == 3) {
            if(ticketTextSplit[x + 1][0] == "L") {
                if(ticketTextSplit[x + 2][0] == "I") {
                    return true;
                    filterVLI(y);

                }
            }
            return false;
        }
    }
    return false;
}
function LoadFrame() {
    Iframe.src = url + currentPage;
    pageProcess();
}
function filterVLI() {
    if(ticketTextSplit[6][0] == "F" && ticketTextSplit[6][1] == "B") { //VlI dan sonrasi bossa
       if(ticketTextSplit[7] == "") {
           closeTicket();
       }
    } else if (ticketTextSplit[6] == "") {
        closeTicket();
    }
}
function filterNone() {
    if(ticketTextSplit[0] == "") {
        closeTicket();
    }
}

async function Main() {
    Iframe.height = 1200;
    Iframe.width = 1600;
    await LoadFrame();
}

Main();