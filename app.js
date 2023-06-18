const dateValue = document.querySelector("#date-input");
const showBtn = document.querySelector("#show-button");
const resultMsg = document.querySelector("#result-message");


showBtn.addEventListener("click", (e) => {
    e.preventDefault();

    Array.prototype.move = function(from,to){
        this.splice(to,0,this.splice(from,1)[0]);
        return this;
      };

    let dateStringArray = dateValue.value.split("-");
    let newArray = dateStringArray.move(1,2)
    let dateString = newArray.join("");

    checkPalindrome(dateString)

})

const reverseStr = (str) => {

    let reversedString = str.split("").reverse().join("");


    return reversedString;
}

const checkPalindrome = (date) => {

    if(date === reverseStr(date)){

        resultMsg.innerText = "Your Birthday is a Palindrome. 💁🏻‍♂️";

    }
    else{

        resultMsg.innerText = "Your Birthday is not Palindromic.";

    }

}