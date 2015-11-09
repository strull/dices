var counter = 0;

var anzahlWuerfe = 0;

var twoBlanks = blanks(2);

var fiveBlanks = blanks(5);

var verdoppler = 0;

var augenWurf1;

var augenWurf2;

var startScorePlayer1 = 0;

function verdoppeln() {
    document.getElementById("verdoppler").innerHTML = plotVerdoppler();
}

function wuerfeln() {
    var wuerfel1 = Math.ceil(Math.random() * 6);
    var wuerfel2 = Math.ceil(Math.random() * 6);
    var pic1 = '<img src="' + wuerfel1 + '.png">';
    var pic2 = '<img src="' + wuerfel2 + '.png">';
    augenWurf1 = new Audio(wuerfel1 + ".wav");
    augenWurf2 = new Audio(wuerfel2 + ".wav");
    var res = twoBlanks + pic1 + twoBlanks + pic2 + indicatePasch(wuerfel1, wuerfel2);
    counter++;
    sayWurf();
    window.scrollTo(0, document.body.scrollHeight);
    if (counter % 2) {
        anzahlWuerfe++;
        return fiveBlanks + anzahlWuerfe + twoBlanks + res + fiveBlanks;
    } else {
        return res + br();
    }
}

function sayWurf() {
    augenWurf1.addEventListener("ended", sayWurf2, true);
    augenWurf1.play();
}

function sayWurf2() {
    augenWurf2.play();
}

function br() {
    return "<br>";
}

function blanks(count) {
    return Array(count + 1).join("&nbsp;");
}

function indicatePasch(wuerfel1, wuerfel2) {
    if (wuerfel1 == wuerfel2) {
        return "*";
    } else {
        return "&nbsp;";
    }
}

function plotVerdoppler() {
    verdoppler <<= 1;
    if (verdoppler == 0) {
        verdoppler = 1;
    }
    if (verdoppler < 9) {
        return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g><rect x="40" y="20" rx="20" ry="20" width="100" height="100" style="fill:grey;stroke:black;stroke-width:5;opacity:0.5"/><text fill="#ffffff" font-size="45" font-family="Verdana" x="75" y="85">' + verdoppler + "</text></g></svg>";
    } else if (verdoppler >= 10 && verdoppler <= 99) {
        return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g><rect x="40" y="20" rx="20" ry="20" width="100" height="100" style="fill:grey;stroke:black;stroke-width:5;opacity:0.5"/><text fill="#ffffff" font-size="45" font-family="Verdana" x="60" y="85">' + verdoppler + "</text></g></svg>";
    } else if (verdoppler >= 100 && verdoppler <= 999) {
        return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g><rect x="40" y="20" rx="20" ry="20" width="100" height="100" style="fill:grey;stroke:black;stroke-width:5;opacity:0.5"/><text fill="#ffffff" font-size="45" font-family="Verdana" x="47" y="85">' + verdoppler + "</text></g></svg>";
    } else {
        return "So weit verdoppeln ist verboten... ein W�rfel explodiert...<br>" + '<img src="wuerfel_explodiert.jpg">';
    }
}

function playerwins(player) {
    var score = (parseInt(document.getElementById("scorePlayer" + player).innerHTML, 10) || 0) + verdoppler;
    var punkte = document.getElementById("punkte").value;
    if (score >= punkte) {
        alert("GameOver!");
    }
    document.getElementById("scorePlayer" + player).innerHTML = (parseInt(document.getElementById("scorePlayer" + player).innerHTML, 10) || 0) + verdoppler;
    verdoppler = 0;
    verdoppeln();
}
