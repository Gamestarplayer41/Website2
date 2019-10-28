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
            console.log(k);
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
    if (p != undefined && q != undefined && n != undefined && phiN != undefined && e != undefined && d != undefined && p != q) {
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
    $('#componentp').val(values[0]);
    $('#componentq').val(values[1]);
    $('#componentN').val(values[2]);
    $('#componentphiN').val(values[3]);
    $('#componente').val(values[4]);
    $('#componentd').val(values[5]);
    $('#privateKey').val("(" + values[2] + ";" + values[5] + ")");
    $('#publicKey').val("(" + values[2] + ";" + values[4] + ")");
    //$('#values').val({p:values[0],q:values[1],N:values[2],phiN:values[3],e:values[4],d:values[5]});
}

function encrypt() {
    if($('#text').val()){
    var N = $('#componentN').val();
    N = parseInt(N);
    var e = $('#componente').val();
    e = parseInt(e);
    var text = $('#text').val();
    var Output = "";
    for (var i in text) {
        var KeyCode = text.charCodeAt(i);

        KeyCode = powFun(KeyCode,e,N)
        Output += KeyCode;
        Output+=" ";
    }
    $('#encrypted').val(Output);
    



  
}
}
/* Encrypt function https://stackoverflow.com/questions/30630603/javascript-self-made-pow-with-modulo */
function addmod(x, y, n)
{
    // Precondition: x<n, y<n
    // If it will overflow, use alternative calculation
    if (x + y <= x) x = x - (n - y) % n;
    else x = (x + y) % n;
    return x;
}

function sqrmod(a, n)
{
    var b;
    var sum = 0;

    // Make sure original number is less than n
    a = a % n;

    // Use double and add algorithm to calculate a*a mod n
    for (b = a; b != 0; b >>= 1) {
        if (b & 1) {
            sum = addmod(sum, a, n);
        }
        a = addmod(a, a, n);
    }
    return sum;
}

function powFun(base, ex, mo) {
    var r;
    if(ex === 0) 
        return 1;
    else if(ex % 2 === 0) {
        r = powFun(base, ex/2, mo) % mo ;
        // return (r * r) % mo;
        return sqrmod(r, mo);
    }else  return (base * powFun(base, ex - 1, mo)) % mo;
}