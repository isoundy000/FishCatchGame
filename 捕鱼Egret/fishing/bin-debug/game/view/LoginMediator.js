var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginMediator = (function (_super) {
    __extends(LoginMediator, _super);
    function LoginMediator(view) {
        return _super.call(this, view) || this;
    }
    LoginMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
        // EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/newProgressButton.exml");
        game.util.LoaderUtil.startLoginSilentLoad();
    };
    LoginMediator.prototype.init = function () {
        var model = this.getModel(RoomModel);
        var self = this;
        //初始化GlobalManager.getInstance()
        GlobalManager.getInstance();
        //监听打开公告界面
        this.subscrib(NotifyEnum.OPEN_NOTICE_UI, this.openNoticeUI);
        //更新登录按钮状态
        this.subscrib(NotifyEnum.UPDATE_LOGIN_BTN, this.updateLoginBtn);
        /** 监听登录消息返回 只在登录时监听 */
        var isNewUser = false;
        self.getView().enterMainView(isNewUser);
        // game.net.MessageDispatcher.register(game.net.ResponseType.LOGINBACK, function(msg:LoginBackMessage):void{
        // 	GlobalManager.getInstance().bIsNeedDelayLogin = false;
        // 	GlobalManager.getInstance().initUserData(msg);
        // 	let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        // 	let isNewUser:boolean = false;
        // 	if (userModel.getGuideID() <= 0) {
        // 		isNewUser = true;
        // 	}
        // 	//进入主界面
        // 	(self.getView() as LoginView).enterMainView(isNewUser);
        // 	//初始化缓存协议
        // 	game.util.ProtobufUtil.getInstance().initCacheProto();
        // });
        //请求房间连接监听
        game.net.MessageDispatcher.register(game.net.ResponseType.REQUESTROOMBACK, function (msg) {
            if (msg.getFlag() == 1) {
                NetManager.resetNet(msg.getIp(), msg.getPort(), function () {
                    var model = burn.Director.getModelByKey(UserModel);
                    var view = self.getView();
                    var roomType = msg.getType();
                    var skinid = model.getCurSkinId();
                    model.setMatchRoomLevel(roomType);
                    var onConfigComplete = function () {
                        intoRoomScene();
                    };
                    var onResourceProgress = function (event) {
                        view.updateResProgress(event.itemsLoaded, event.itemsTotal);
                    };
                    var intoRoomScene = function () {
                        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onConfigComplete, self);
                        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);
                        // game.util.ReyunUtil.sendEvent(game.util.LogEnum.END_ROOM_LOADING);
                        //发送进入房间请求
                        var req = new IntoRoomSendMessage();
                        req.initData();
                        req.setId(msg.getRoomId());
                        req.setUid(model.getUserId());
                        NetManager.send(req);
                    };
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onConfigComplete, self);
                    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);
                    var resList = game.util.LoaderUtil.getFishResByType(roomType);
                    resList.push("gunsicon_" + skinid + "_png");
                    resList.push("fishing");
                    RES.createGroup("asyn_fish_" + roomType + skinid, resList);
                    RES.loadGroup("asyn_fish_" + roomType + skinid);
                });
            }
            else {
                game.util.GameUtil.popTips("进入房间失败:" + msg.getFlag());
                var view = self.getView();
                view._loginBtn.visible = true;
            }
        });
        //请求房间数据监听
        game.net.MessageDispatcher.register(game.net.ResponseType.INTOROOMBACK, function (msg) {
            //初始化房间model
            var model = burn.Director.getModelByKey(RoomModel);
            //玩家信息列表
            var playList = msg.getPlayerInfo();
            for (var i = 0; i < playList.length; i++) {
                var roomer = new game.model.Roomer(parseInt(playList[i].playerId), parseInt(playList[i].position), playList[i].name, parseInt(playList[i].gunId), parseInt(playList[i].coins), parseInt(playList[i].gems), playList[i].items, playList[i].lockRelation, playList[i].vipLevel, playList[i].batterySkinId, playList[i].gunrestSkinId, playList[i].roleLevel);
                model.addRoomer(roomer);
            }
            var uModel = burn.Director.getModelByKey(UserModel);
            if (uModel.isTodayFirstLogin()) {
                //记录登录加载时长
                var tempTime = new Date().getTime() - game.util.LogUtil.timestamp;
                var content = { duration: tempTime };
                game.util.LogUtil.sendLogicalLog(game.util.LogEnum.INTO_ROOM_LOADING_TIME, content);
            }
        });
        //初始房间内鱼群
        game.net.MessageDispatcher.register(game.net.ResponseType.PONDFISHES, function (msg) {
            var model = burn.Director.getModelByKey(RoomModel);
            var fishList = msg.getFishes();
            for (var i = 0; i < fishList.length; i++) {
                if (!model.isPathExist(fishList[i].pathId)) {
                    var fish = new game.model.Fish();
                    fish.fishId = fishList[i].fishId;
                    fish.pathId = fishList[i].pathId;
                    fish.fishType = fishList[i].type;
                    fish.uniqId = fishList[i].uniId;
                    fish.coord = new egret.Point(fishList[i].coordinate.xvalue, fishList[i].coordinate.yvalue);
                    fish.aliveTime = Number(fishList[i].aliveTime);
                    model.addRoomLiveFish(fish);
                }
            }
            game.util.UIUtil.startLoading();
            //进入房间
            var roomView = new RoomView();
            var roomMed = new RoomMediator(roomView);
            burn.Director.repleaceView(roomMed);
        });
    };
    /** 打开公告界面 */
    LoginMediator.prototype.openNoticeUI = function (obj, target) {
        var noticeView = new NoticeView();
        var noticeMed = new NoticeMeditor(noticeView);
        burn.Director.pushView(noticeMed);
    };
    /** 过呢关系登录按钮状态 */
    LoginMediator.prototype.updateLoginBtn = function (obj, target) {
        var view = target.getView();
        view.updateLoginBtnState(obj);
    };
    LoginMediator.prototype.destroy = function () {
        this.getView().destroy();
        game.net.MessageDispatcher.unregister(game.net.ResponseType.LOGINBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.REQUESTROOMBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.PONDFISHES);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.INTOROOMBACK);
        this.unsubscribByType(NotifyEnum.OPEN_NOTICE_UI);
        this.unsubscribByType(NotifyEnum.UPDATE_LOGIN_BTN);
        RES.destroyRes("login_serverBg_png", false);
        RES.destroyRes("login_startBtn_png", false);
    };
    return LoginMediator;
}(burn.mediator.SimpleMediator));
__reflect(LoginMediator.prototype, "LoginMediator");
//# sourceMappingURL=LoginMediator.js.map