//设置音乐播放条
var wp_playBtn = document.getElementById("wp_playBtn");
var mymusic = document.getElementById("mymusic");
var wp_playTime = document.getElementById("wp_playTime");
var timeid;
var wp_processBtn = document.getElementById("wp_processBtn");
var prograssBar = document.getElementById("prograssBar");
var wp_mute = document.getElementById("wp_mute");
//改变开始暂停键
wp_playBtn.onclick = function () {
    if (wp_playBtn.className == "play") {
        wp_playBtn.className = "zan";
        mymusic.play();
        //实现播放时长的变化
        timeid = setInterval(function () {
            var curtime = mymusic.currentTime;
            var minute = parseInt(Math.floor(curtime) / 60) > 9 ? parseInt(Math.floor(curtime) / 60) : "0" + parseInt(Math.floor(curtime) / 60);
            var seconds = Math.floor(curtime) % 60 > 9 ? Math.floor(curtime) % 60 : "0" + Math.floor(curtime) % 60;
            wp_playTime.innerHTML = minute + "." + seconds;
            timebtn();
        }, 1000);
    }
    else {
        wp_playBtn.className = "play";
        mymusic.pause();
        clearInterval(timeid);
    }
}

//播放时进条的位置随之改变
function timebtn() {
    var curtime = mymusic.currentTime;
    var audioLength = mymusic.duration;
    wp_processBtn.style.left = 430 * (curtime / audioLength) + "px";
    prograssBar.style.width = 430 * (curtime / audioLength) + "px";
    prograssBar.style.backgroundColor = "#ffcd2d";
}

//实现静音效果
wp_mute.onclick = function () {
    mymusic.muted = !mymusic.muted;
}