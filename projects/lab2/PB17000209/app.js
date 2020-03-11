const timeInfo = document.getElementById("hint");
const upStartBtn = document.getElementById("countup");
const downStartBtn = document.getElementById("countdown");
const pauseBtn = document.getElementById("pause");
const clearBtn = document.getElementById("clear");
const resumeBtn = document.getElementById("resume");
const restartBtn = document.getElementById("restart");
const ZERO = 0;
const MAX_MINUTE = 59;
const MAX_SECOND = 59;
const MAX_HOUR = 99;
const INTERVAL = 50;
const TEN = 10;
const ONE = 1;
const TWO = 2;
const THREE = 3;
const ARR_SIZE = 4;
const MINUTE_PER_HOUR = 60;
const SECOND_PER_MINUTE = 60;
const MS_PER_SECOND = 1000;
let hour = ZERO, minute = ZERO, second = ZERO, ms = ZERO;
let isFinished = false;
let isCleared = true;
const clock = document.getElementById("time");
let timeObj = null;
let isDownTiming = new Boolean();
const inputHour = document.getElementById("hour");
const inputMinute = document.getElementById("minute");
const inputSecond = document.getElementById("second");
let limitStr, limitHour, limitMinute, limitSecond;
let remainningTime, limitTime, finishTime, currentTime;

function changeDisplayAttr (countdown, countup, resume, pause,
    clear, restart, inputBlock, hint, hintText) {
    if (countdown === true) {showObj("countdown");}
    else {hideObj("countdown");}
    if (countup === true) {showObj("countup");}
    else {hideObj("countup");}
    if (resume === true) {showObj("resume");}
    else {hideObj("resume");}
    if (pause === true) {showObj("pause");}
    else {hideObj("pause");}
    if (clear === true) {showObj("clear");}
    else {hideObj("clear");}
    if (restart === true) {showObj("restart");}
    else {hideObj("restart");}
    if (inputBlock === true) {showObj("input_block");}
    else {hideObj("input_block");}
    if (hint === true) {showObj("hint");}
    else {hideObj("hint");}
    if (hintText !== "") {
        timeInfo.innerText = hintText;
    }
}

// Count up:
const ENTER = 13;
const SPACE = 32;
let spaceEnable = true;
document.onkeyup = function upKey (eve) {
    var event = eve || window.event;
    if (event.keyCode === SPACE) {
        spaceEnable = true;
    }
};
document.onkeydown = function downKey (eve) {
    var event = eve || window.event;
    switch (event.keyCode) {
        case ENTER:
            if (isCleared)
                {countupBtnClick();}
            break;
        case SPACE:
            if (!isFinished && !isCleared && spaceEnable === true)
            {
                spaceEnable = false;
                if (timeObj !== null)
                    {pauseBtnClick();}
                else
                    { resumeBtnClick(); }
            }
            break;
        default:
            break;
    }
};

upStartBtn.onclick = countupBtnClick;
function countupBtnClick () {
    if (timeObj === null) {
        isCleared = false;
        isFinished = false;
        isDownTiming = false;
        getInputInfo();
        hour = minute = second = ms = ZERO;
        changeDisplayAttr(false, false, false, true, true, true, false, true, "正在正计时 " + limitStr);
        updateTime();
        timeObj = setInterval(updateTime, INTERVAL);
    }
}

// Count down:
downStartBtn.onclick = countdownBtnClick;
function countdownBtnClick () {
    if (timeObj === null) {
        isCleared = false;
        isFinished = false;
        isDownTiming = true;
        /* Get input info: */
        getInputInfo();
        changeDisplayAttr(false, false, false, true, true, true, false, true, "正在倒计时 " + limitStr);
        setTimeout(() => {
            updateTime();
            timeObj = setInterval(updateTime, INTERVAL);
        }
        , ONE);
    }
}

clearBtn.onclick = clearBtnClick;
function clearBtnClick () {
    if (timeObj !== null) {
        clearInterval(timeObj);
        timeObj = null;
    }
    isCleared = true;
    changeDisplayAttr(true, true, false, false, false, false, true, false, "");
    hour = minute = second = ms = ZERO;
    printToClock();

}

resumeBtn.onclick = resumeBtnClick;
function resumeBtnClick () {
    if (timeObj === null) {
        finishTime = remainningTime + Date.now();
        let tmpStr;
        if (isDownTiming)
            {tmpStr = "正在倒计时 " + limitStr;}
        else
            { tmpStr = "正在正计时 " + limitStr; }
        updateTime();
        changeDisplayAttr(false, false, false, true, true, true, false, true, tmpStr);
        if (isDownTiming)
            {timeObj = setInterval(updateTime, INTERVAL);}
        else
            {timeObj = setInterval(updateTime, INTERVAL);}
    }
}

pauseBtn.onclick = pauseBtnClick;
function pauseBtnClick () {
    if (timeObj !== null) {
        // alert(isDownTiming);
        let tmpStr;
        if (isDownTiming)
            {tmpStr = "暂停倒计时 " + limitStr;}
        else
            {tmpStr = "暂停正计时 " + limitStr;}
        changeDisplayAttr(false, false, true, false, true, true, false, true, tmpStr);
        clearInterval(timeObj);
        timeObj = null;
    }
}

restartBtn.onclick = restartBtnClick;
function restartBtnClick () {
    if (timeObj !== null) {
        clearInterval(timeObj);
        timeObj = null;
    }
    isFinished = false;
    finishTime = limitTime + Date.now();
    let tmpStr;
    if (!isDownTiming)
        {tmpStr = "正在正计时 " + limitStr;}
    else
        {tmpStr = "正在倒计时 " + limitStr;}
    changeDisplayAttr(false, false, false, true, true, true, false, true, tmpStr);
    if (isDownTiming) {
        setTimeout(() => {
            updateTime();
            timeObj = setInterval(updateTime, INTERVAL);
        }, ONE);
    }
    else {
        hour = minute = second = ms = ZERO;
        timeObj = setInterval(updateTime, INTERVAL);
    }
}

/* Hide obj which id is id. */
function hideObj (id) {
    document.getElementById(id).setAttribute("style", "display: none");
}

/* Show obj which id is id. */
function showObj (id) {
    document.getElementById(id).setAttribute("style", "display: inline-block");
}

function getInputInfo () {
    hour = Number(inputHour.value);
    if (isNaN(hour)) {hour = ZERO;}
    if (hour > MAX_HOUR)
        {hour = MAX_HOUR;}
    else if (hour < ZERO)
        {hour = ZERO;}
    // inputHour.value =
    limitHour = hour;

    minute = Number(inputMinute.value);
    if (isNaN(minute)) {minute = ZERO;}
    if (minute > MAX_MINUTE)
        {minute = MAX_MINUTE;}
    else if (minute < ZERO)
        {minute = ZERO;}
    // inputMinute.value =
    limitMinute = minute;

    second = Number(inputSecond.value);
    if (isNaN(second)) {second = ZERO;}
    if (second > MAX_SECOND)
        {second = MAX_SECOND;}
    else if (second < ZERO)
        {second = ZERO;}
    // inputSecond.value =
    limitSecond = second;
    ms = ZERO;

    let strHour = hour.toString();
    let strMinute = minute.toString();
    let strSecond = second.toString();
    if (strHour < TEN) {strHour = '0' + strHour;}
    if (strMinute < TEN) {strMinute = '0' + strMinute;}
    if (strSecond < TEN) {strSecond = '0' + strSecond;}
    limitStr = strHour + ":" + strMinute + ":" + strSecond;

    // Calculate ms by input.
    remainningTime = limitTime = calcMs(limitHour, limitMinute, limitSecond, ms);
    currentTime = ZERO;
    finishTime = Date.now() + limitTime;
}

function calcMs (hr, min, sec, ms) {
    const tmpTime = MS_PER_SECOND * (SECOND_PER_MINUTE * (MINUTE_PER_HOUR * hr + min) + sec) + ms;
    return tmpTime;
}

function calcHMS (tmpTime) {
    const arr = new Array(ARR_SIZE);
    arr[THREE] = tmpTime % MS_PER_SECOND;
    tmpTime = parseInt(tmpTime / MS_PER_SECOND);
    arr[TWO] = tmpTime % SECOND_PER_MINUTE;
    tmpTime = parseInt(tmpTime / SECOND_PER_MINUTE);
    arr[ONE] = tmpTime % MINUTE_PER_HOUR;
    arr[ZERO] = parseInt(tmpTime / MINUTE_PER_HOUR);
    // console.log(arr);
    return arr;
}

function updateTime () {
    const timeNow = Date.now();
    remainningTime = finishTime - timeNow;
    if (remainningTime < ZERO)
    {
        isFinished = true;
        hideObj("resume");
        hideObj("pause");
        clearInterval(timeObj);
        if (isDownTiming)
            {timeInfo.innerText = "倒计时 " + limitStr + " 已结束";}
        else
            {timeInfo.innerText = "正计时 " + limitStr + " 已结束";}
        remainningTime = ZERO;
    }
    currentTime = limitTime - remainningTime;
    // console.log(remainningTime, currentTime);
    if (isDownTiming)
    {
        const tmpArr = calcHMS(remainningTime);
        hour = tmpArr[ZERO];
        minute = tmpArr[ONE];
        second = tmpArr[TWO];
        ms = tmpArr[THREE];
    }
    else
    {
        const tmpArr = calcHMS(currentTime);
        hour = tmpArr[ZERO];
        minute = tmpArr[ONE];
        second = tmpArr[TWO];
        ms = tmpArr[THREE];
    }
    printToClock();
}

let clockStr;
function printToClock () {
    let strHour = hour.toString();
    let strMinute = minute.toString();
    let strSecond = second.toString();
    if (strHour < TEN) {strHour = '0' + strHour;}
    if (strMinute < TEN) {strMinute = '0' + strMinute;}
    if (strSecond < TEN) {strSecond = '0' + strSecond;}
    clockStr = strHour + ":" + strMinute + ":" + strSecond;
    clock.innerHTML = clockStr;
}