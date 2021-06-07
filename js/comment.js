//获取文本结点对象
var subBtn = document.getElementById("subBtn");
var span = document.getElementById("subCon");
var comNum = document.getElementById("comment_num");
var textarea = document.getElementById("comment_mid_right");
var timeid;

//文本框点击时默认值消失，失去焦点时默认值出现,并且动态计算显示输入字符数
textarea.onfocus = function () {
    if (textarea.value == "分享你的音乐见解") {
        textarea.value = "";
    }
    timeid = setInterval(countChar(textarea, span), 600);
}
textarea.onblur = function () {
    if (textarea.value == "") {
        textarea.value = "分享你的音乐见解";
        span.innerHTML = "已输入0个字";
    }
    clearInterval(timeid);
}
function countChar(textarea, span) {
    textarea.onkeyup = function () {
        span.innerHTML = "已输入" + textarea.value.length + "个字";
    }

}

//本地存储获取时间
function getDate(myDate) {
    var year = myDate.getFullYear();
    var month = (myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
    var day = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.myDate.getDate();
    var hour = myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours();
    var min = myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate.getMinutes();
    var sec = myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds();
    var time = year + "-" + month + "-" + day + "    " + hour + ":" + min + ":" + sec;
    return time;
}
//根据评论数显示有多少页
var box = document.getElementById("box");
function createLi() {
    var num = box.getElementsByTagName("li").length;
    var noteList = localStorage["commentContent"];
    noteList = JSON.parse(noteList);
    if ((noteList.length / 3) > num - 2) {
        for (var i = 0; i < parseInt(noteList.length / 3); i++) {
            var lastChild = box.lastElementChild;
            var num = box.getElementsByTagName("li").length;
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.setAttribute("href", "##");
            a.innerText = num - 1;
            li.appendChild(a);
            box.insertBefore(li, lastChild);
        }
    }
}

//本地存储,并根据评论条数显示有几条评论
subBtn.onclick = function () {
    if (textarea.value == "") {
        alert("请输入您想要分享的内容");
        return;
    }
    var noteList = localStorage["commentContent"];
    var myDate = new Date();
    if (noteList == "" || noteList == null || noteList == undefined) {
        localStorage["commentContent"] = "[]";
    }
    noteList = JSON.parse(localStorage["commentContent"]);
    var userContent = textarea.value;
    var timeCur = getDate(myDate);
    var userObj = {
        userCon: userContent,
        time: timeCur
    };
    noteList.push(userObj);
    localStorage["commentContent"] = JSON.stringify(noteList);
    textarea.value = "";
    comNum.innerHTML = noteList.length + "条评论";
    window.location.reload();
}
var showArea = document.getElementById("show_area");
function showComment() {
    var noteList = localStorage["commentContent"];
    noteList = JSON.parse(noteList);
    for (var i = 0; i < noteList.length; i++) {
        var divNode = document.createElement("div");
        divNode.className="show_mid_con";
        divNode.innerHTML =
            "<img src='images/头像.jpg' alt=''>" + "<div><ul><li><a href='#'>酷狗用户</a></li>" +
            "<li>" + noteList[i]["userCon"] + "</li>" +
            "<li>" + noteList[i]["time"] + "</li>" + "</ul><ul><li><a href='#'>分享</a></li><li></br></li>" +
            "<li><a href='#'>删除</a>&nbsp;&nbsp;&nbsp;&nbsp;163&nbsp;<img src='images/bg2.jpg' alt=''>&nbsp;&nbsp;&nbsp;&nbsp;<a href='#'>回复</a></li>" +
            "</ul></div>"
        showArea.appendChild(divNode);
    }
}
//实现分页切换效果
var next=document.getElementsByClassName("next")[0];
var prev=document.getElementsByClassName("prev")[0];
var show_mid=document.getElementsByClassName("show_mid")[0];
var value=0;
function getPages(){
    var num = box.getElementsByTagName("li").length-2;
    return num;
}
    
next.onclick=function(){  
    var pages=getPages();
    if(-value/450==pages-1){
        return;
    }
    show_mid.style.top=value-450+"px";
    value-=450;
}
prev.onclick=function(){
    if(value==0){
        return;
    }
    show_mid.style.top=value+450+"px";
    value+=450;
}

//刷新页面时，读取本地存储中并在页面上显示之前保存的数据(最新一次保存的)
window.onload = function () {
    var noteList = localStorage["commentContent"];
    noteList = JSON.parse(noteList);
    comNum.innerHTML = noteList.length + "条评论";
    createLi();
    showComment();
}