//Saida
const expressao = document.getElementById('expressao');
const resposta = document.getElementById('resposta');

//controle primario
const numChave = [];
for(let i=0; i<10; i++) {
    numChave[i] = document.getElementById(i);
}
const multChave = document.getElementById('*');
const divideChave = document.getElementById('/');
const somaChave = document.getElementById('+');
const subtrairChave = document.getElementById('-');
const igualChave = document.getElementById('Igual');
const pontoChave = document.getElementById('Ponto');
const expChave = document.getElementById('Exp');
const ansChave = document.getElementById('Ans');
const delChave = document.getElementById('Del')
const acChave = document.getElementById('AC');
const grausChave = document.getElementById('deg');
const radianosChave = document.getElementById('rad');

//controle adcional
const piChave = document.getElementById('pi');
const reversoChave = document.getElementById('rev');
const factorialChave = document.getElementById('fac');
const combChave = document.getElementById('comb');
const permChave = document.getElementById('perm');
const powChave = document.getElementById('pow');
const squareChave = document.getElementById('square');
const radicChave = document.getElementById('radic');
const logChave = document.getElementById('log');
const lnChave = document.getElementById('ln');
const tenPowChave = document.getElementById('ten-power');
const parepriChave = document.getElementById('pareprimeiro');
const paresecuChave = document.getElementById('paresegundo');
const sinChave = document.getElementById('sin');
const SinRevChave = document.getElementById('sin^-1');
const cosChave = document.getElementById('cos');
const cosRevChave = document.getElementById('cos^-1');
const tanChave = document.getElementById('tan');
const tanRevChave = document.getElementById('tan^-1');

//variaveis

let ultimaResposta ='';
let inputContainerTexto ='';
let noNumero = false;
let tempNum;
let tempNumLength;
let operator = '';

//função utilitaria
function esseNumero (value) {
    return value != '' && !Number.isNaN(Number(value)) || value == '.';
}

function arithimeticaOperador(value) {
    return value == '+' || value == '-' || value == '/' || value == '*';
}

function resetarTodososCalculos() {
    expressao.value = '';
    resposta.value = '';
    inputContainerTexto = '';
    noNumero = false;
    tempNum = '';
    tempNumLength = 0;
    operator = '';
}

//calcular funções
function reverso(n) {
    return (1/n);
}

function f(n) {
    let ans = 1;
    for(let i =1; i<=n; i++){
        ans *= i;
    }
    return ans;
}

function P(n, r) {
    return f(n)/f(n-r);
}

function C(n, r) {
    return P(n,r)/f(n-r);
}

function nPower(x, n){
    if(isNumber(n)) {
        return Math.pow(x,n);
    }
    console.log(x,n);
}

function squarePower(x) {
    return Math.pow(x,2);
}

function decimalPower(x) {
    return Math.pow(10,x);
}

function rt(n) {
    return Math.sqrt(n)
}

function log(n) {
    return Math.log(n)/Math.log(10);
}

function ln(n) {
    return Math.log(n);
}

function sin(n) {
    return Math.sin(n*Math.PI/180).toFixed(15);
}

function sinRev(n) {
    return 1/(Math.sin(n*Math.PI/180).toFixed(15));
}

function cos(n) {
    return Math.cos(n*Math.PI/180).toFixed(15);
}

function cosRev(n) {
    return 1/(Math.cos(n*Math.PI/180).toFixed(15));
}

function tan(n){
    return Math.tan(n*Math.PI/180).toFixed(15);
}

function tanRev(n) {
    return 1/(Math.tan(n*Math.PI/180).toFixed(15));
}

function E(n) {
    return Math.pow(10,n);
}
function rad(n) {
return n*(Math.PI / 180);
}
function graus(n) {
    return n * (180 / Math.PI);
}

function radianos(n) {
    return n * (Math.PI / 180);
}

function ans() {
    return parseInt(ultimaResposta);
}

function calcularExpressao(exp){
    console.log('input: ', exp.join(''));
    let i, isOperator = 0, next=false;
    for(i=0; i<exp.length; i++) {
        if(!esseNumero(exp[i]) && exp[i] != '-' && exp[i] != '+'){
        if(exp[i] == '^'){
            exp[i] = '*';
            exp.splice(i+1, 0, '*');
        }
        if(exp[i] == '√') {
            exp[i] = 'r';
            exp.splice(i+1, 0, 't');
        }
        if(exp[i] == 'a' && exp[i+1] == 'n' && exp[i+2] == 's') {
            exp.splice(i+3, 0, '()');
        }
        //parentese
        else if(exp[i] !=  '(') {
            if(esseNumero(exp[i+1]) || exp[i+1] == '-'){
                exp.splice(i+1, 0, '(');
            isOperator ++;
            i++;
            next = true;
            }
        }
        if(isOperator > 0 && !next) {
            exp.splice(i, 0, ')');
            isOperator --;
            i++;
        }
        next = false;
    }
//adciona multi operadores
 if(esseNumero(exp[i-2]) || exp[i-2] == ')') {
    if(exp[i-1] == '√' || exp[i-1] == 's' || exp[i-1] == 'c' || exp[i-1] == 't' || exp[i-1] == 'l' || exp[i-1] == 'E') {
        exp.splice(i-1, 0, '*');
      i++;
    }
}
if(exp[i-1] == '(') {
    if(exp[i-2] == '!') {
        exp.splice(i-1, 0, '*');
        i++;
    }
}
else if(exp[i-1] == ')') {
    if(exp[i-2] == '!') {
        exp.splice(i, 0, '*');
        i++;
    }
  }
}
if(isOperator > 0) {
    for(let j=0; j<isOperator; j++) {
        exp[i++] = ')';
    }
}
exp = exp.join('');
exp = exp.split('!').join('f()');
exp = exp.split('C(').join('C(,');
exp = exp.split('P(').join('P(,');

//mover indice de valor para o primeiro ou segundo
let moverValor = [];
 for(let p=0; p<exp.length; p++) {
   if(exp[p] == 'f' || exp[p] == 'C' || exp[p] == 'P'){
    moverValor[0] = p+1;
    moverValor[2] = p-1;
    let isParent = false, parentCount =0, over = false;
    if(exp[p-1] == ')') {
        isParent = true;
        parentCount = 0;
    }
    for(let q=p-1; q>=0; q--) {
        if(!isParent) {
            if(esseNumero(exp[q])) {
                moverValor[1] = q;
            }
            else {
                break;
            }
        }
        if(isParent){
            if(over) {
                break;
            }
            if(exp[q] == ')') {
                parentCount ++;
            }
            else if(exp[q] == '('){
                parentCount --;
                moverValor[1] = q;
                if(parentCount == 0) {
                    over = true;
                }
            }
            else {
                moverValor[1] = q;
            }
        }
    }
    
    exp = 
       exp.substring(0, moverValor[1])
       +exp.substring(moverValor[2]+1, moverValor[0]+1)
       +exp.substring(moverValor[1], moverValor[2]+1) 
       +exp.substring(moverValor[0]+1, exp.length)
     ;

   }
 } 

 console.log('exp:', exp);
 try {
    resposta.value = eval(exp.toString());
    console.log('ans:', resposta.value);
    if(resposta.value && esseNumero(resposta.value)){
        expressao.value = resposta.value;
        inputContainerTexto = resposta.value;
        ultimaResposta = resposta.value;
        noNumero = true;
    }
    else{
       resetarTodososCalculos();
       resposta.value = 'Syntax ERROR' 
    }
 }
 catch(err) {
    resetarTodososCalculos();
    resposta.value = 'Syntax ERROR'
 }
 resposta.focus();
}
// tratar eventos
function addChaveparaContainerInput(keyText) {
    inputContainerTexto += keyText;
    expressao.value = inputContainerTexto;
    noNumero = false;
}

function tratarTecla(event) {
    const inputChave = parseInt(event.key);
    if (inputChave >= 0 && inputChave <= 9) {
        numChave[inputChave]. className = 'active';
        if(noNumero) {
            inputContainerTexto = '';
            operator = '';
        }
        addChaveparaContainerInput(event.key);
    }
    else if(event.key == '*' || event.key == 'x' || event.key == 'X'){ //multiplicação
    multChave.className = 'active';
    addChaveparaContainerInput('*');    
    noNumero = false;
    }
    else if(event.key == '/'){
        divideChave.className = 'active';
        addChaveparaContainerInput('/');
        noNumero = false;
    }
    else if(event.key == '+'){
        somaChave.className = 'active';
        addChaveparaContainerInput('+');
        noNumero = false;
    }
    else if(event.key == '-'){
        subtrairChave.className = 'active';
        addChaveparaContainerInput('-');
        noNumero = false;
    }
    else if(event.key == '.') {
        pontoChave.className = 'active';
        addChaveparaContainerInput('.')
        
    }
    else if(event.key == 'Enter') { 
        igualChave.className = 'active';
        calcularExpressao(expressao.value.split(""));
    }
    else if(event.key == 'Escape') { //esc e ac
        acChave.className = 'active';
        resetarTodososCalculos();
    }
    else if(event.key == 'Backspace'){ //del ou backspace
        delChave.className = 'active';
        deletaOUltimo();
    }
    else if(event.key == '('){
        parepriChave.className = 'active';
        addChaveparaContainerInput('(');
    }
    else if(event.key == ')') {
        paresecuChave.className = 'active';
        addChaveparaContainerInput(')');
    }
}

function liberarTecla(event) {
    const inputChave = parseInt(event.key);
    if(inputChave >= 0 && inputChave <= 9) {
        numChave[inputChave].className = 'pri_botao';
    }
    else if (event.key == '*' || event.key == 'x' || event.key == 'X'){
        multChave.className = 'pri_botao';
    }
    else if(event.key == '/'){
        divideChave.className = 'pri_botao'
    }
    else if(event.key == '+'){
        somaChave.className = 'pri_botao'
    }
    else if(event.key == '-'){
        subtrairChave.className = 'pri_botao'
    }
    else if(event.key == '.'){
        pontoChave.className = 'pri_botao'
    }
    else if(event.key == 'Enter'){
        igualChave.className = 'pri_botao'
    }
    else if(event.key == 'Escape'){
        acChave.className = 'pri_botao'
    }
    else if(event.key == 'Backspace'){
        delChave.className = 'pri_botao'
    }
    else if(event.key == '('){
        parepriChave.className = 'adi_botao'
    }
    else if(event.key == ')'){
        paresecuChave.className = 'adi_botao'
    }
    }

    function ansEvent(event) {
        if(ultimaResposta != ''){
            if(esseNumero(inputContainerTexto[inputContainerTexto.length-1])){
                inputContainerTexto = '';
                operator = '';
            }
            addChaveparaContainerInput('ans');
            noNumero = true;
        }
    }

    function deletaOUltimo() {
        inputContainerTexto = inputContainerTexto.slice(0,-1);
        expressao.value = inputContainerTexto;
    }

    function numChaveHandler(event) {
        if(noNumero) {
            inputContainerTexto = '';
            operator = '';
        }
        addChaveparaContainerInput(event.target.id);
    }

    window.addEventListener('keydown', tratarTecla);
    window.addEventListener('keyup', liberarTecla);

    for(let i=0; i<10; i++){
        numChave[i].addEventListener('click', numChaveHandler);
    }
   multChave.addEventListener('click', (event) => {
    addChaveparaContainerInput('*');
   });
   divideChave.addEventListener('click', (event) => {
    addChaveparaContainerInput('/');
   });
   somaChave.addEventListener('click', (event) => {
    addChaveparaContainerInput('+');
   });
   subtrairChave.addEventListener('click', (event) => {
    addChaveparaContainerInput('-');
   });
   pontoChave.addEventListener('click', (event) => {
    addChaveparaContainerInput('.');
   });

   ansChave.addEventListener('click', ansEvent);
   expChave.addEventListener('click', (event) => {
    addChaveparaContainerInput('E');
   });
   igualChave.addEventListener('click', (event) => {
       calcularExpressao(expressao.value.split(""));
   });
   acChave.addEventListener('click', resetarTodososCalculos);
   delChave.addEventListener('click', deletaOUltimo);

   reversoChave.addEventListener('click', (event) => {
    operator = '-1';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('^-1');
   });

   factorialChave.addEventListener('click', (event) => {
    operator = '!';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('!');
   });

   combChave.addEventListener('click', (event) => {
    operator = 'comb';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('C');
   });

   factorialChave.addEventListener('click', (event) => {
    operator = '!';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('!');
   });

   permChave.addEventListener('click', (event) => {
    operator = 'perm';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('P');
   });

   powChave.addEventListener('click', (event) => {
    operator = '^';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('^');
   });

    squareChave.addEventListener('click', (event) => {
    operator = '^2';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('^2');
   });

   radicChave.addEventListener('click', (event) => {
    operator = 'sqrt';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('√');
   });

    logChave.addEventListener('click', (event) => {
    operator = 'log';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('log');
   });

    lnChave.addEventListener('click', (event) => {
    operator = 'ln';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('ln');
   });

    tenPowChave.addEventListener('click', (event) => {
    operator = '10^';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('10^');
   });

    sinChave.addEventListener('click', (event) => {
    operator = 'sin';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('sin');
   });

    SinRevChave.addEventListener('click', (event) => {
    operator = 'sin^-1';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('sinRev');
   });

    cosChave.addEventListener('click', (event) => {
    operator = 'cos';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('cos');
   });

    cosRevChave.addEventListener('click', (event) => {
    operator = 'cos^-1';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('cosRev');
   });

    tanChave.addEventListener('click', (event) => {
    operator = 'tan';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('tan');
   });

    tanRevChave.addEventListener('click', (event) => {
    operator = 'tan^-1';
    tempNum = expressao;
    tempNumLength = tempNum.length;
    addChaveparaContainerInput('tanRev');
   });
    
   piChave.addEventListener('click', (event) => {
    addChaveparaContainerInput(Math.PI);
    });



   parepriChave.addEventListener('click', (event) => {
    addChaveparaContainerInput('(');
   });

   paresecuChave.addEventListener('click', (event)  => {
    addChaveparaContainerInput(')');
   });
   
   grausChave.addEventListener('click', (event) => {
    if (inputContainerTexto === '') {
        inputContainerTexto = 'graus(';
    } else {
        inputContainerTexto += '*graus(';
    }
    expressao.value = inputContainerTexto;
});

radianosChave.addEventListener('click', (event) => {
    if (inputContainerTexto === '') {
        inputContainerTexto = 'radianos(';
    } else {
        inputContainerTexto += '*radianos(';
    }
    expressao.value = inputContainerTexto;
});