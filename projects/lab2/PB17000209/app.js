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
const MAX_MS = 900;
const INTERVAL = 100;
const TEN = 10;
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
inputHour.oninput = inputMinute.oninput = inputSecond.oninput = showTextTime;

// Show while changing text
function showTextTime () {
    if (timeObj === null) {
        getInputInfo();
        // printToClock();
    }
    // alert("Changing text");
}

//
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
        getInputInfo();
        hour = minute = second = ms = ZERO;
        printToClock();
        isDownTiming = false;
        changeDisplayAttr(false, false, false, true, true, true, false, true, "正在正计时 " + limitStr);
        timeObj = setInterval(upTiming, INTERVAL);
    }
}

// Count down:
downStartBtn.onclick = countdownBtnClick;
function countdownBtnClick () {
    if (timeObj === null) {
        isCleared = false;
        isFinished = false;
        /* Get input info: */
        getInputInfo();
        if (downTiming() === true) {
            ms = MAX_MS + INTERVAL;
        }
        printToClock();
        isDownTiming = true;
        changeDisplayAttr(false, false, false, true, true, true, false, true, "正在倒计时 " + limitStr);
        timeObj = setInterval(downTiming, INTERVAL);
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
        let tmpStr;
        if (isDownTiming)
            {tmpStr = "正在倒计时 " + limitStr;}
        else
            {tmpStr = "正在正计时 " + limitStr;}
        changeDisplayAttr(false, false, false, true, true, true, false, true, tmpStr);
        if (isDownTiming)
            {timeObj = setInterval(downTiming, INTERVAL);}
        else
            {timeObj = setInterval(upTiming, INTERVAL);}
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
    let tmpStr;
    if (!isDownTiming)
        {tmpStr = "正在正计时 " + limitStr;}
    else
        {tmpStr = "正在倒计时 " + limitStr;}
    changeDisplayAttr(false, false, false, true, true, true, false, true, tmpStr);
    printToClock();
    if (isDownTiming) {
        hour = limitHour;
        minute = limitMinute;
        second = limitSecond;
        ms = ZERO;
        if (downTiming() === true) {
            ms = MAX_MS + INTERVAL;
        }
        printToClock();
        timeObj = setInterval(downTiming, INTERVAL);
    }
    else {
        hour = minute = second = ms = ZERO;
        timeObj = setInterval(upTiming, INTERVAL);
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
}

function upTiming () {
    if (hour === limitHour && minute === limitMinute && second === limitSecond && ms === ZERO) {
        isFinished = true;
        hideObj("resume");
        hideObj("pause");
        clearInterval(timeObj);
        timeInfo.innerText = "正计时 " + limitStr + " 已结束";
        printToClock();
        return true;
    }
    ms += INTERVAL;
    if (ms > MAX_MS) {
        ms = ZERO;
        second++;
    }
    if (second > MAX_SECOND) {
        second = ZERO;
        minute++;
    }
    if (minute > MAX_MINUTE) {
        minute = ZERO;
        hour++;
    }
    printToClock();
    return true;
}

function downTiming () {
    if (second === ZERO && minute === ZERO && hour === ZERO && ms === ZERO) {
        isFinished = true;
        hideObj("resume");
        hideObj("pause");
        clearInterval(timeObj);
        timeInfo.innerText = "倒计时 " + limitStr + " 已结束";
        printToClock();
        return false;
    }
    ms -= INTERVAL;
    if (ms < ZERO) {
        ms = MAX_MS;
        second--;
    }
    if (second < ZERO) {
        second = MAX_SECOND;
        minute--;
    }
    if (minute < ZERO) {
        minute = MAX_MINUTE;
        hour--;
    }
    printToClock();
    return true;
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