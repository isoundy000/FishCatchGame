var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView() {
        var _this = _super.call(this) || this;
        _this._loginBtn = null;
        _this._username = null;
        _this._isNew = false;
        return _this;
    }
    LoginView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishLogin.exml", this.addBgResource, this);
    };
    LoginView.prototype.addBgResource = function (clazz, url) {
        var self = this;
        var img = new egret.Bitmap();
        img.texture = RES.getRes("loading_jpg");
        this.addChildAt(img, 0);
        img.x = CONFIG.adaptX;
        img.y = CONFIG.adaptY;
        var uiLayer = new eui.UILayer();
        this._fishLoginUI = new FishLoginUI();
        this._fishLoginUI.horizontalCenter = 0;
        this._fishLoginUI.verticalCenter = 0;
        this._fishLoginUI.skinName = clazz;
        this._fishLoginUI.change_id_btn.visible = false;
        uiLayer.addChild(this._fishLoginUI);
        //添加动画
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/LoadingAnim.exml", function () {
            self._movie = new LoadingAnimUI();
            self._movie.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/LoadingAnim.exml";
            self.addChildAt(self._movie, 1);
            self._movie.startAction();
            // self._movie.play.addEventListener('complete', self.onTweenGroupComplete, self);
            // self._movie.play.play(0);
        }, this);
        this.addChildAt(uiLayer, 10);
        var logoImg = new egret.Bitmap(RES.getRes("logo_png"));
        logoImg.anchorOffsetX = logoImg.width >> 1;
        logoImg.anchorOffsetY = logoImg.height >> 1;
        logoImg.x = (CONFIG.contentWidth >> 1) + CONFIG.adaptX;
        logoImg.y = CONFIG.contentHeight - 310 + CONFIG.adaptY;
        this.addChildAt(logoImg, 11);
        this._username = this._fishLoginUI.username;
        this._loginBtn = this._fishLoginUI.login_btn;
        this._username_bg = this._fishLoginUI.username_bg;
        this._loginBtnWrap = new burn.tools.UIWrap(this._loginBtn);
        if (game.platform.PlatformManager.isThirdPartyLogin) {
            this._username.visible = false;
            this._username_bg.visible = false;
            this._fishLoginUI.login_btn.visible = false;
            this._fishLoginUI.login_group.visible = true;
            // if(CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG){
            // 	this._fishLoginUI.qq_btn.touchEnabled = false;
            // 	this._fishLoginUI.qq_btn.visible = false;
            // }
            if (!isWeixin() && !IsInPC()) {
                this._fishLoginUI.wechat_btn.includeInLayout = false;
                this._fishLoginUI.wechat_btn.touchEnabled = false;
                this._fishLoginUI.wechat_btn.visible = false;
            }
            this._fishLoginUI.qq_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.thirdPartyLogin, this);
            this._fishLoginUI.wechat_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.thirdPartyLogin, this);
        }
        else {
            /** 判断是否是平台登录 */
            if (game.platform.PlatformManager.isPlatform) {
                this._username.visible = false;
                this._username_bg.visible = false;
                if (game.platform.PlatformManager.isAutoLogin) {
                    this._loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoLoginFun, this);
                }
                else {
                    if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
                        if (IsInPC()) {
                            this._fishLoginUI.change_id_btn.visible = true;
                            this._fishLoginUI.change_id_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeButtonClick, this);
                        }
                    }
                    this._loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoAutoLogin, this);
                }
            }
            else {
                this._loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginFun, this);
            }
            //预加载音效资源
            if (CONFIG.isOpenMusic) {
                RES.loadGroup("ui_sound");
            }
            //增加UI适配边框
            game.util.UIUtil.screenAdapter(this._fishLoginUI);
            //打开公告通知
            this.send(NotifyEnum.OPEN_NOTICE_UI);
        }
    };
    LoginView.prototype.thirdPartyLogin = function (evt) {
        if (evt.currentTarget == this._fishLoginUI.wechat_btn) {
            game.platform.PlatformManager.thirdPartyLogin(CONFIG.PLATFORM_ID, ThirdPartyType.WECHAT);
        }
        else if (evt.currentTarget == this._fishLoginUI.qq_btn) {
            game.platform.PlatformManager.thirdPartyLogin(CONFIG.PLATFORM_ID, ThirdPartyType.QQ);
        }
    };
    //切换账号功能
    LoginView.prototype.onChangeButtonClick = function (evt) {
        game.util.GameUtil.openConfirmByTwoButton(null, function () {
            if (CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
                deleteCookie4YWT();
            }
            else {
                deleteCookie4ChangeAccount();
            }
        }, this, game.table.T_Language_Table.getVoByKey(2439).value);
    };
    //window.location.href="http://gamecenter.combunet.com/LoginServer/combunet/combunetGame.jsp";
    /**
     * 平台登录后直接连接大厅
     */
    LoginView.prototype.gotoLoginFun = function (evt) {
        if (CONFIG.SERVER_USER_STATE == ServerState.BAN) {
            //被封号了！
            game.util.GameUtil.openConfirm(null, null, this, GlobalManager.BAN_TIPS);
            return;
        }
        if (CONFIG.SERVER_USER_STATE == ServerState.CLOSED) {
            //服务器停服维护中
            game.util.GameUtil.openConfirm(null, null, this, GlobalManager.SERVER_CLOSED_TIPS);
            return;
        }
        game.util.UIUtil.startLoading();
        this._loginBtn.visible = false;
        //初始化连接
        NetManager.initNet(CONFIG.SERVER_IP, CONFIG.SERVER_PORT, function () {
            var req = new LoginSendMessage();
            req.initData();
            req.setId(CONFIG.USER_ID);
            req.setAccount(CONFIG.ACCOUNT);
            req.setPlatform(CONFIG.PLATFORM_ID);
            req.setSecret(CONFIG.USER_SECRET);
            NetManager.send(req);
        });
    };
    LoginView.prototype.gotoAutoLogin = function (evt) {
        if (CONFIG.SERVER_USER_STATE == ServerState.BAN) {
            //被封号了！
            game.util.GameUtil.openConfirm(null, null, this, GlobalManager.BAN_TIPS);
            return;
        }
        if (CONFIG.SERVER_USER_STATE == ServerState.CLOSED) {
            //服务器停服维护中
            game.util.GameUtil.openConfirm(null, null, this, GlobalManager.SERVER_CLOSED_TIPS);
            return;
        }
        this.updateLoginBtnState(false);
        //还需要手动连接到登录服务器
        game.platform.PlatformManager.gotoLoginByPlatform(CONFIG.PLATFORM_ID, this.httpSuccFunc, this.httpFailFunc);
        game.util.UIUtil.startLoading();
    };
    /**
     * 手动登录
     */
    LoginView.prototype.loginFun = function (evt) {
        var text = this._username.text;
        if (text == "") {
            game.util.GameUtil.popTips("请输入数字ID");
            return;
        }
        var reg = new RegExp("^[0-9a-zA-Z]*$");
        if (reg.test(text)) {
            this.updateLoginBtnState(false);
            CONFIG.ACCOUNT = text;
            burn.net.HttpManager.init(CONFIG.LOGIN_ADDR + "login.action", egret.HttpResponseType.TEXT, egret.HttpMethod.POST, this.httpSuccFunc, this.httpFailFunc);
            burn.net.HttpManager.addParam("account", CONFIG.ACCOUNT);
            burn.net.HttpManager.addParam("password", CONFIG.ACCOUNT);
            burn.net.HttpManager.addParam("platform", "" + CONFIG.PLATFORM_ID);
            burn.net.HttpManager.send();
            game.util.UIUtil.startLoading();
        }
        else {
            this._username.text = "";
            game.util.GameUtil.popTips("只能输入数字");
        }
    };
    LoginView.prototype.updateLoginBtnState = function (flag) {
        this._loginBtn.visible = flag;
    };
    LoginView.prototype.httpSuccFunc = function (obj) {
        var netObj = JSON.parse(obj);
        var retCode = netObj.retcode;
        if (retCode == ServerState.SUCC) {
            var userId_1 = netObj.userId;
            CONFIG.SERVER_IP = netObj.host;
            CONFIG.SERVER_PORT = netObj.port;
            CONFIG.USER_SECRET = netObj.secret;
            //初始化连接
            NetManager.initNet(CONFIG.SERVER_IP, CONFIG.SERVER_PORT, function () {
                var req = new LoginSendMessage();
                req.initData();
                req.setId(userId_1);
                req.setAccount(CONFIG.ACCOUNT);
                req.setPlatform(CONFIG.PLATFORM_ID);
                req.setSecret(CONFIG.USER_SECRET);
                NetManager.send(req);
            });
        }
        else if (retCode == ServerState.BAN) {
            game.util.GameUtil.openConfirm(null, function () {
                burn._Notification_.send(NotifyEnum.UPDATE_LOGIN_BTN, true);
            }, this, GlobalManager.BAN_TIPS);
        }
        else if (retCode == ServerState.CLOSED) {
            //服务器停服维护中
            game.util.GameUtil.openConfirm(null, null, this, GlobalManager.SERVER_CLOSED_TIPS);
        }
        else {
            //登录失败
            game.util.GameUtil.openConfirm(null, function () {
                burn._Notification_.send(NotifyEnum.UPDATE_LOGIN_BTN, true);
            }, this, game.util.Language.getText(65));
        }
    };
    LoginView.prototype.httpFailFunc = function () {
        game.util.UIUtil.closeLoading();
        //连接登录服务器异常
        game.util.GameUtil.openConfirm(null, null, this, game.util.Language.getText(64));
    };
    //isNew:是否是新手
    LoginView.prototype.enterMainView = function (isNew) {
        game.util.LogUtil.timestamp = new Date().getTime();
        // game.util.ReyunUtil.sendEvent(game.util.LogEnum.START_LOGIN_LOADING);
        //加载主题文件
        var thmPath = "resource/default.thm.json";
        if (CONFIG.LANGUAGE == LanguageType.TW_Chinese) {
            thmPath = "resource/default_tw.thm.json";
            GlobalManager.SkinPath = "fish_skins_tw";
        }
        else if (CONFIG.LANGUAGE == LanguageType.English) {
            thmPath = "resource/default_en.thm.json";
            GlobalManager.SkinPath = "fish_skins_en";
        }
        this._isNew = isNew;
        this._thm = new eui.Theme(CONFIG.RES_PATH_PREFIX + thmPath, this.stage);
        this._thm.addEventListener(eui.UIEvent.COMPLETE, this.onLoginThemeLoadComplete, this);
        if (LoginView.bLoadTHM) {
            this.initMainView();
        }
    };
    /**
     * 主题加载事件
     */
    LoginView.prototype.onLoginThemeLoadComplete = function () {
        var _this = this;
        this._thm.removeEventListener(eui.UIEvent.COMPLETE, this.onLoginThemeLoadComplete, this);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Loading.exml", function () {
            _this.initMainView();
        }, this);
    };
    /**
     * 进入主界面
     */
    LoginView.prototype.initMainView = function () {
        LoginView.bLoadTHM = true;
        game.util.UIUtil.closeLoading();
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        this.loadingView.initView();
        this.thmLoadComplete(this._isNew);
    };
    /**
     * 主题文件加载完成
     * @param isNew 是否是新手
     */
    LoginView.prototype.thmLoadComplete = function (isNew) {
        //将主界面需要的资源和通用资源加载		
        if (isNew) {
            var model = burn.Director.getModelByKey(UserModel);
            var req = new RequestRoomMessage();
            req.initData();
            req.setId(model.getUserId());
            req.setType(RequesetRoomState.QuickGame);
            NetManager.send(req);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onConfigComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.createGroup("firstLoad", ["mainUI", "common"]);
            RES.loadGroup("firstLoad");
        }
    };
    LoginView.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onConfigComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        if (event.groupName == "firstLoad") {
            //加载完成进入新界面
            var mainView = new FishMainView();
            var fishMainMediator = new FishMainMediator(mainView);
            burn.Director.repleaceView(fishMainMediator);
            var model = burn.Director.getModelByKey(UserModel);
            if (model.isTodayFirstLogin()) {
                //记录登录加载时长
                var tempTime = new Date().getTime() - game.util.LogUtil.timestamp;
                var content = { duration: tempTime };
                game.util.LogUtil.sendLogicalLog(game.util.LogEnum.LOGIN_LOADING_TIME, content);
            }
        }
    };
    LoginView.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    LoginView.prototype.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
    };
    LoginView.prototype.onResourceProgress = function (event) {
        this.updateResProgress(event.itemsLoaded, event.itemsTotal);
    };
    LoginView.prototype.updateResProgress = function (count, total) {
        this.loadingView.setProgress(count, total);
    };
    LoginView.prototype.destroy = function () {
        //this._movie.play.removeEventListener('complete', this.onTweenGroupComplete, this);
        this._movie && this._movie.clearAction();
        this._loginBtnWrap.destroy();
        this._loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.loginFun, this);
        this._fishLoginUI.change_id_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeButtonClick, this);
        this.loadingView.destroy();
        this.parent && this.parent.removeChild(this);
        console.log("LoginView destory!");
    };
    return LoginView;
}(burn.view.FullView));
LoginView.bLoadTHM = false;
__reflect(LoginView.prototype, "LoginView");
/***操作UI的对应类 */
var FishLoginUI = (function (_super) {
    __extends(FishLoginUI, _super);
    function FishLoginUI() {
        return _super.call(this) || this;
    }
    return FishLoginUI;
}(eui.Component));
__reflect(FishLoginUI.prototype, "FishLoginUI");
//# sourceMappingURL=LoginView.js.map