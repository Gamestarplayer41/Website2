function primzahl(n) {
    var arr = [2];
    for (var i = 3; i < n; i += 2) {
        if (isPrimeNumber(i)) {
            arr.push(i);
        }
    }
    return arr;
}

function isPrimeNumber(num) {
    for (var i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}


function calculateN(p, q) {
    return p * q;
}

function calcPhiN(p, q) {
    return (p - 1) * (q - 1);
}

function primeToPhi(primeArray, phi) {

    var randomNum = (Math.random() * Math.floor(primeArray.length));
    randomNum = Math.round(randomNum);
    if (phi != primeArray[randomNum] && primeArray[randomNum] < phi) {
        return primeArray[randomNum];
    } else if (primeArray[randomNum + 1] < phi) {
        return primeArray[randomNum + 1];
    } else {
        return primeArray[randomNum - 1];
    }
}

function calcD(e, phiN) {
    /* d = (1 + k * fi)/e */
    var d;
    var k = 1;
    while (true) {
        d = (1 + k * phiN) / e;
        if (d == parseInt(d)) {

            break;

        } else if (k > 10000) {
            return -1;
        } else {
            k++;
        }
    }
    return d;
}

function pick2Numbers(max) {
    return [Math.round(Math.random() * Math.floor(max)), Math.round(Math.random() * Math.floor(max))];
}

function RSAAlgo() {
    startAgain:
    var primeArray = primzahl(100);
    var randomNum = pick2Numbers(primeArray.length);
    var p = primeArray[randomNum[0]];
    var q = primeArray[randomNum[1]];
    var n = calculateN(p, q);
    var phiN = (p - 1) * (q - 1);
    var e = primeToPhi(primeArray, phiN);
    var d = calcD(e, phiN);

    /*  console.log(p);
     console.log(q);
     console.log(n);
     console.log(phiN);
     console.log(e);
     console.log(d); */
    if (p != undefined && q != undefined && n != undefined && phiN != undefined && e != undefined && d != undefined && p!=q) {
        return [p, q, n, phiN, e, d];
    } else {
        return [0, 0, 0, 0, 0, -1];
    }
}

function KeyGen() {
    var values;
    while (true) {
        values = RSAAlgo();
        if (values[5] != -1) {
            break;
        }
    }
    console.log(values);
}