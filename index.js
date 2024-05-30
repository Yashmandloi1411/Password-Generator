

var lenghtDisplay = document.querySelector('[data-lengthNumber]');
var inputSlider = document.querySelector('[data-lengthSlider]');

let password = "";

let passwordLength  = 10;


handleSlider();

function handleSlider() {
    inputSlider.value = passwordLength;
    lenghtDisplay.innerText = passwordLength;
}


inputSlider.addEventListener('input',(e)=>{
    passwordLength =  e.target.value;
    handleSlider();
})



function getRandomInteger(min,max){
            return Math.floor(Math.random()* (max-min)) + min;
}

function generateRandomInteger() {
      return getRandomInteger(0,9);
}

function generateLowerCase() {
     return  String.fromCharCode(getRandomInteger(97,123));
}

function generateUpperCase() {
    return  String.fromCharCode(getRandomInteger(65,91));
}

let symbol = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

function generateSymbol() {
      const randomNum =  getRandomInteger(0,symbol.length);
      return symbol[randomNum];
}



var uppercaseCheck = document.querySelector('#uppercase');
var lowercaseCheck = document.querySelector('#lowercase');
var numbereCheck = document.querySelector('#number');
var symbolsCheck = document.querySelector('#symbols');

var allCheckBox = document.querySelectorAll('input[ type=checkbox]');

let checkCount = 0;

function handleCheckBoxChange() {
    checkCount = 0;
     allCheckBox.forEach((checkbox) => {
         if(checkbox.checked){
            checkCount++;
         }
     })
       //special condition or edge case
       if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
       }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

var generator = document.querySelector('.generateButton');

var passwordDisplay = document.querySelector('[data-passwordDisplay]');


generator.addEventListener('click',()=> {
       if(checkCount == 0){
        return;
       }

       if(passwordLength < checkCount ){
        passwordLength = checkCount ;
        handleSlider();
       }


       password = "";

    
       let funcArr = [];

       if(uppercaseCheck.checked) {
           funcArr.push(generateUpperCase);
       }
       if(lowercaseCheck.checked) {
           funcArr.push(generateLowerCase);
       }
       if(symbolsCheck.checked) {
           funcArr.push(generateSymbol);
       }
       if(numbereCheck.checked) {
           funcArr.push(generateRandomInteger);
       }

       // inko password ma add karo checked check ko
       for(let i=0; i<funcArr.length; i++){
            password += funcArr[i]();
       }


       for(let i=0; i<passwordLength - funcArr.length; i++){
            let randIndex = getRandomInteger(0, funcArr.length);
            password += funcArr[randIndex]();
        }

        // shuffle the password
          password = shufflePassword(Array.from(password));

        //show in UI
        passwordDisplay.value = password;

       // strength val cal
    
        calculateStrength()
})

function shufflePassword(array) {
    //Fisher Yates Method Algorithm
    for (let i = array.length - 1; i > 0; i--) {
        // random j find out
        const j = Math.floor(Math.random() * (i + 1));
        // swapping
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


// handel strength

let indicator = document.querySelector('[data-indicator]');

// set indication


function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color} `;
}
setIndicator("#ccc");

function calculateStrength() {

     let hasUpper = false;
     let hasLower = false;
     let hasNum = false;
     let hasSymbol = false;

    if(uppercaseCheck.checked){
        hasUpper = true;
     }
    if(lowercaseCheck.checked){
       hasLower = true;
    }
    if(numbereCheck.checked){
     hasNum = true;
    }
    if(symbolsCheck.checked){
       hasSymbol = true;
    }

      if(hasUpper && hasLower && hasSymbol && hasNum && passwordLength >=8){
         setIndicator("#0f0");
      }

      else if((hasLower || hasUpper) && (hasNum || hasSymbol) && passwordLength >=5){
        setIndicator("#ff0");
      }
      else{
        setIndicator("#f00");
      }
}



// clipboard

var copyBtn = document.querySelector('[data-copy]');
var copyMsg = document.querySelector('[data-copyMsg]');


copyBtn.addEventListener('click',()=>{
       if(passwordDisplay.value){
        copyContent();
       }
})

async function copyContent() {
    //jab tak ya complete na ho tab tak ma aga na badu isliya await key use kuya ha

    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e){
         copyMsg.innerText = "failed";
    }
        //  to make copy vala text vissible
        copyMsg.classList.add("active");

        // copied vala icon sirf 2 sec tak hi vissible rhaga then remove hojaya
        // isliys settimeout use kiys ha
        setTimeout(()=>{
            copyMsg.classList.remove("active");
        },2000);
}

