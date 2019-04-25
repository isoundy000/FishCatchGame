var burnGameEntity = burnGameEntity || {};

burnGameEntity.bgMask = null;
burnGameEntity.dialogueBox = null;

//初始化sdk
burnGameEntity.startup = function(appId) {
    burnGameEntity.bgMask = document.getElementById("dialogueMask");
    burnGameEntity.dialogueBox = document.getElementById("gameDialogue");
    //初始化mask样式
    burnGameEntity.bgMask.style.position = "absolute";
    burnGameEntity.bgMask.style.width = "100%";
    burnGameEntity.bgMask.style.height = "100%";
    burnGameEntity.bgMask.style.opacity = "0.5";
    burnGameEntity.bgMask.style.background = "black";
    burnGameEntity.bgMask.style.zIndex = "2";
    burnGameEntity.bgMask.style.display = "none";
    //初始化对话框
    
    burnGameEntity.dialogueBox.style.position = "absolute";
    // burnGameEntity.dialogueBox.style.width = "400px";
    // burnGameEntity.dialogueBox.style.height = "300px";
    // burnGameEntity.dialogueBox.style.background = "red";
    burnGameEntity.dialogueBox.style.zIndex = "3";
    burnGameEntity.dialogueBox.style.display = "block";
    dialogueBox.innerHTML = burnGameEntity.html;
}

//显示背景遮罩
burnGameEntity.showMask = function() {

}

//检查登录状态
burnGameEntity.checkLogin = function() {

}

//判断支持的登录类型
burnGameEntity.isSupport = function() {

}

//登录
burnGameEntity.login = function() {

}

//登出
burnGameEntity.logout = function() {

}

burnGameEntity.html = "";
/**
 * 登录功能逻辑：
 * 1.初始化项目数据
 * 2.在游戏中展示一张登录背景界面
 * 3.调用 checkLogin 函数判断是否已经登录过，如果登录过，进入步骤7，否则进入步骤4
 * 4.调用 isSupport 函数判断支持的登录类型，根据登录类型显示对应的登录图标
 * 5.用户点击登录图标后，调用 login 函数打开登录面板进行登录
 * 6.如果登录成功，进入步骤7
 * 7.退出登录界面，进入游戏
 *
 * 登出功能逻辑：
 * 1.在游戏中放置一个“退出游戏”或者“切换账号”的按钮
 * 2.用户点击“退出游戏”图标后，调用 logout 函数
 * 3.在登出成功后，返回到登录逻辑的步骤4
 */