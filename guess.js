

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
const result = document.querySelector(".result");
const count = document.querySelector(".count");
const guesses = document.querySelector(".guesses");


    let randomNumber = Math.floor(Math.random() * 100) + 1; // 1-100
    console.log("觀察隨機的數字：", randomNumber);
    let countNum =0;   //廣域變數
function checkGuess() {
    countNum++;
    count.textContent = "猜測次數："+countNum;
    //guessField.focus();       //游標焦點預設在輸入欄位裡
}

guessSubmit.addEventListener('click', checkGuess);
function checkGuess() {
    const userGuess = Number(guessField.value);  //取得欄位值，並轉為數字



    if (countNum === 1) {
        guesses.textContent = "猜過的數字: ";
    }
    guesses.textContent += userGuess + " "; 
    guessField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkGuess();
    });


if  (  userGuess === randomNumber ) {
    result.textContent = "猜測結果：Congratulations!" ;
}
else if (userGuess < randomNumber ) {
    result.textContent = "猜測結果：數字太小!" ;
}
else if ( userGuess >  randomNumber ) {
    result.textContent = "猜測結果：數字太大!";}
//guess.feild.focus();    
    result.textContent += "遊戲結束";
result.style.backgroundColor="red";
alert("遊戲結束");

setGameOver();
}

function setGameOver() {
        guessField.disabled = true; //停止輸入功能
        guessSubmit.disabled = true;    //停止按鈕功能
}

guessField.value = ""; //清空輸入欄位
guessField.focus(); //讓輸入欄位取得焦點
