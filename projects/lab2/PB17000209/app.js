let timeInfo = document.getElementById("hint");
let upStartBtn = document.getElementById("countup");
let downStartBtn = document.getElementById("countdown");
let pauseBtn = document.getElementById("pause");
let clearBtn = document.getElementById("clear");
let resumeBtn = document.getElementById("resume");
let restartBtn = document.getElementById("restart");
let hour = 0, minute = 0, second = 0, ms = 0;
let isFinished = false;
let isCleared = true;
let clock = document.getElementById("time");
let timeObj = null;
let isDownTiming = new Boolean();
let inputHour = document.getElementById("hour");
let inputMinute = document.getElementById("minute");
let inputSecond = document.getElementById("second");
let limitStr, limitHour, limitMinute, limitSecond;
inputHour.oninput = inputMinute.oninput = inputSecond.oninput = showTextTime;

// Show while changing text
function showTextTime() {
    if (timeObj == null) {
        getInputInfo();
        // printToClock();
    }
    // alert("Changing text");
}

// 
function changeDisplayAttr(countdown, countup, resume, pause,
    clear, restart, input_block, hint, hintText) {
    if (countdown === true) showObj("countdown");
    else hideObj("countdown");
    if (countup === true) showObj("countup");
    else hideObj("countup");
    if (resume === true) showObj("resume");
    else hideObj("resume");
    if (pause === true) showObj("pause");
    else hideObj("pause");
    if (clear === true) showObj("clear");
    else hideObj("clear");
    if (restart === true) showObj("restart");
    else hideObj("restart");
    if (input_block === true) showObj("input_block");
    else hideObj("input_block");
    if (hint === true) showObj("hint");
    else hideObj("hint");
    if (hintText !== "") {
        timeInfo.innerText = hintText;
    }
}

// Count up:

document.onkeypress = function pressAnyKey(e) {
    var event = e || window.event;
    switch (event.keyCode) {
        case 13:
            if (isCleared)
                countupBtnClick();
            break;
        case 32:
            if (!isFinished && !isCleared)
                if (timeObj != null)
                    pauseBtnClick();
                else
                    resumeBtnClick();
            break;
        default:
            break;
    }
}

upStartBtn.onclick = countupBtnClick;
function countupBtnClick() {
    if (timeObj == null) {
        isCleared = false;
        isFinished = false;
        getInputInfo();
        hour = minute = second = ms = 0;
        printToClock();
        isDownTiming = false;
        changeDisplayAttr(false, false, false, true, true, true, false, true, "正在正计时 " + limitStr);
        timeObj = setInterval(upTiming, 100);
    }
}

// Count down:
downStartBtn.onclick = countdownBtnClick;
function countdownBtnClick() {
    if (timeObj == null) {
        isCleared = false;
        isFinished = false;
        /* Get input info: */
        getInputInfo();
        printToClock();
        isDownTiming = true;
        changeDisplayAttr(false, false, false, true, true, true, false, true, "正在倒计时 " + limitStr);
        timeObj = setInterval(downTiming, 100);
    }
}

clearBtn.onclick = clearBtnClick;
function clearBtnClick() {
    if (timeObj != null) {
        clearInterval(timeObj);
        timeObj = null;
    }
    isCleared = true;
    changeDisplayAttr(true, true, false, false, false, false, true, false, "");
    hour = minute = second = ms = 0;
    printToClock();

}

resumeBtn.onclick = resumeBtnClick;
function resumeBtnClick() {
    if (timeObj == null) {
        let tmpStr;
        if (isDownTiming)
            tmpStr = "正在倒计时 " + limitStr;
        else
            tmpStr = "正在正计时 " + limitStr;
        changeDisplayAttr(false, false, false, true, true, true, false, true, tmpStr);
        if (isDownTiming)
            timeObj = setInterval(downTiming, 100);
        else
            timeObj = setInterval(upTiming, 100);
    }
}

pauseBtn.onclick = pauseBtnClick;
function pauseBtnClick() {
    if (timeObj != null) {
        // alert(isDownTiming);        
        let tmpStr;
        if (isDownTiming)
            tmpStr = "暂停倒计时 " + limitStr;
        else
            tmpStr = "暂停正计时 " + limitStr;
        changeDisplayAttr(false, false, true, false, true, true, false, true, tmpStr);
        clearInterval(timeObj);
        timeObj = null;
    }
}

restartBtn.onclick = restartBtnClick;
function restartBtnClick() {
    if (timeObj != null) {
        clearInterval(timeObj);
        timeObj = null;
    }
    isFinished = false;
    let tmpStr;
    if (!isDownTiming)
        tmpStr = "正在正计时 " + limitStr;
    else
        tmpStr = "正在倒计时 " + limitStr;
    changeDisplayAttr(false, false, false, true, true, true, false, true, tmpStr);
    printToClock();
    if (isDownTiming) {
        hour = limitHour;
        minute = limitMinute;
        second = limitSecond;
        ms = 0;
        timeObj = setInterval(downTiming, 100);
    }
    else {
        hour = minute = second = ms = 0;
        timeObj = setInterval(upTiming, 100);
    }
}

/* Hide obj which id is id. */
function hideObj(id) {
    document.getElementById(id).setAttribute("style", "display: none");
}

/* Show obj which id is id. */
function showObj(id) {
    document.getElementById(id).setAttribute("style", "display: inline-block");
}

function getInputInfo() {
    hour = Number(inputHour.value);
    if (isNaN(hour)) hour = 0;
    if (hour > 99)
        hour = 99;
    else if (hour < 0)
        hour = 0;
    // inputHour.value = 
    limitHour = hour;

    minute = Number(inputMinute.value);
    if (isNaN(minute)) minute = 0;
    if (minute > 59)
        minute = 59;
    else if (minute < 0)
        minute = 0;
    // inputMinute.value = 
    limitMinute = minute;

    second = Number(inputSecond.value);
    if (isNaN(second)) second = 0;
    if (second > 59)
        second = 59;
    else if (second < 0)
        second = 0;
    // inputSecond.value = 
    limitSecond = second;
    ms = 0;

    let strHour = hour.toString();
    let strMinute = minute.toString();
    let strSecond = second.toString();
    if (strHour < 10) strHour = '0' + strHour;
    if (strMinute < 10) strMinute = '0' + strMinute;
    if (strSecond < 10) strSecond = '0' + strSecond;
    limitStr = strHour + ":" + strMinute + ":" + strSecond;
}

function upTiming() {
    if (hour === limitHour && minute === limitMinute && second === limitSecond && ms === 0) {
        isFinished = true;
        hideObj("resume");
        hideObj("pause");
        clearInterval(timeObj);
        timeInfo.innerText = "正计时 " + limitStr + " 已结束";
        printToClock();
        return;
    }
    ms += 100;
    if (ms > 999) {
        ms = 0;
        second++;
    }
    if (second > 59) {
        second = 0;
        minute++;
    }
    if (minute > 59) {
        minute = 0;
        hour++;
    }
    printToClock();
}

function downTiming() {
    if (second === 0 && minute === 0 && hour === 0 && ms === 0) {
        isFinished = true;
        hideObj("resume");
        hideObj("pause");
        clearInterval(timeObj);
        timeInfo.innerText = "倒计时 " + limitStr + " 已结束";
        printToClock();
        return;
    }
    ms -= 100;
    if (ms < 0) {
        ms = 900;
        second--;
    }
    if (second < 0) {
        second = 59;
        minute--;
    }
    if (minute < 0) {
        minute = 59;
        hour--;
    }
    printToClock();
}

let clockStr;
function printToClock() {
    let strHour = hour.toString();
    let strMinute = minute.toString();
    let strSecond = second.toString();
    if (strHour < 10) strHour = '0' + strHour;
    if (strMinute < 10) strMinute = '0' + strMinute;
    if (strSecond < 10) strSecond = '0' + strSecond;
    clockStr = strHour + ":" + strMinute + ":" + strSecond;
    clock.innerHTML = clockStr;
}