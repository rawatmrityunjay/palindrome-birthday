const dateValue = document.querySelector("#date-input");
const showBtn = document.querySelector("#show-button");
const resultMsg = document.querySelector("#result-message");

function reverseString(str) {
    let listOfChars = str.split("");

    let reversedListOfChars = listOfChars.reverse();

    let reversedStr = reversedListOfChars.join("");
    return reversedStr;
  }

function isPalindrome(str){

    var reverse = reverseString(str);

    return str === reverse;

}

function convertDateToStr(date){

var dateStr = {day: "", month: "", year: ""};

    if (date.day < 10){

        dateStr.day = "0" + date.day;

    }
    else{

        dateStr.day = date.day.toString();

    }

    if (date.month < 10){

        dateStr.month = "0" + date.month;

    }
    else{

        dateStr.month = date.month.toString();

    }

    dateStr.year = date.year.toString();

    return dateStr;

}

function getAllDateFormats(date){

    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPalindromeForAllDateFormats(date){

    var listOfPalindromes = getAllDateFormats(date);

    var flag = false;

    for(var i=0; i<listOfPalindromes.length; i++){

        if(isPalindrome(listOfPalindromes[i])){

            flag = true;

            break;

        }

    }
    return flag;
}

function isLeapYear(year){

    if(year%400===0){

        return true

    }
    if(year%100===0){

        return true

    }
    if(year%4===0){

        return true

    }
    return false;
}

function getNextDate(date){

    var day = date.day+1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month===2){

        if(isLeapYear(year)){
            if(day > 29){
                day=1;
                month++;
            }
        }
        else{
            if(day > 28){
                day=1;
                month++;
            }
        }

    }
    else{

        if(day>daysInMonth[month-1]){
            day=1;
            month++;
        }

    }

    if(month > 12){
        month=1;
        year++;
    }

    return {

        day : day,
        month : month,
        year : year

    }

}

function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){

        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];

}

function getPreviousDate(date){

    var day = date.day-1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(day===0){

        month--;

        if(month===0){

            month=12;
            day=31;
            year--;

        }else if (month === 2) {

            if (isLeapYear(year)) {
            day = 29;
            }else {
            day = 28;
            }

        }else {
            day = daysInMonth[month - 1];
        }
    }



    return {

        day : day,
        month : month,
        year : year

    };
}

function getPreviousPalindromeDate(date){
    let ctr = 0;
    let previousDate = getPreviousDate(date);

    while (1) {
        ctr++;
        let isPalindrome = checkPalindromeForAllDateFormats(previousDate);

        if (isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [ctr, previousDate];
}

function clickHandler(e){
    e.preventDefault();
    var bDayStr = dateValue.value;

    if (bDayStr!==""){

        var listOfDate = bDayStr.split("-")

        var date = {

            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])

        };

        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if (isPalindrome) {

            resultMsg.innerText = "Yay! your birthday is a palindrome!!";

        }else{

            var [ctr, nextDate] = getNextPalindromeDate(date)
            resultMsg.innerText = `Your Birthday is not Palindrome. The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days 👨🏻‍💻`;

        }

    }

}


showBtn.addEventListener("click", clickHandler);