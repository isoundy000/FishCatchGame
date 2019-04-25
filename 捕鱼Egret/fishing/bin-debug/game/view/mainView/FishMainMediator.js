var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FishMainMediator = (function (_super) {
    __extends(FishMainMediator, _super);
    function FishMainMediator(view) {
        var _this = _super.call(this, view) || this;
        _this._isInBankrupt = false;
        return _this;
    }
    FishMainMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this._arrPop = new Array();
        var userModel = burn.Director.getModelByKey(UserModel);
        var vipLv = userModel.getVipLevel();
        var voVip = game.table.T_VipLevel_Table.getVoByKey(vipLv);
        //判断是否是今天头一次登录
        var isFirstLogin = userModel.isTodayFirstLogin();
        if (isFirstLogin) {
            if (voVip.makeUpConisTo > 0) {
                this._arrPop.push(Pop_State.VIP);
            }
            var monthTime = userModel.getMonthEndTime();
            var residueTime = monthTime - game.util.TimeUtil.getCurrTime();
            //弹出板子
            if (residueTime > 0 && FishMainMediator.isFirstOpen) {
                FishMainMediator.isFirstOpen = false;
                this._arrPop.push(Pop_State.MONTH_CARD);
            }
        }
        var state = userModel.getCiriState();
        if (state == Ciri_State.Un_Gain) {
            if (isFirstLogin) {
                this._arrPop.push(Pop_State.CIRI);
            }
        }
        if (!userModel.isTodayDraw()) {
            if (isFirstLogin) {
                this._arrPop.push(Pop_State.CIRCLE);
            }
        }
        // if(userModel.getTatolChargeRMB() <= 0)
        // {
        // 	this._arrPop.push(Pop_State.FIRST_CHARGE);
        // } 
        this.subscrib(NotifyEnum.CHECK_POP, this.checkPop);
        this.getView().initView();
    };
    FishMainMediator.prototype.checkPop = function (obj, target) {
        var self = target;
        var view = target.getView();
        if (target._arrPop.length == 0) {
            return;
        }
        var id = target._arrPop.shift();
        view.openPanel(id);
    };
    FishMainMediator.prototype.init = function () {
        var _this = this;
        //注册观察者
        this.subscrib(NotifyEnum.MAIN_UI_INIT, this.viewInit);
        this.subscrib(NotifyEnum.RES_LOAD_OVER, this.resLoadOver);
        this.subscrib(NotifyEnum.OPEN_SELECT_ROOM, this.openSelcetRoom);
        this.subscrib(NotifyEnum.CLICK_MAIN_FUN_ITEM, this.clickMainFunItem);
        this.subscrib(NotifyEnum.CLICK_MAIN_BTN, this.clickMainBtn);
        this.subscrib(NotifyEnum.UPDATE_MAIN_DATA, this.updateMainState);
        this.subscrib(NotifyEnum.CHECK_MAIN_ALERT, this.checkMainAlert);
        //刷新房间在线人数
        this.subscrib(NotifyEnum.REFRES_ROOM_ONLINE, this.refreshRoomOnline);
        //监听救济金返回消息
        this.subscrib(NotifyEnum.BANKRUPT_MESSAGE, this.bankruptBack);
        //监听救济金更新金币的消息
        this.subscrib(NotifyEnum.UPDATE_ROOM_UI_COINS, this.updateUICoins);
        //领取qq玩吧礼包
        this.subscrib(NotifyEnum.REQ_QQZONE_GIFT, this.reqQQZoneGift);
        //关闭qq玩吧礼包
        this.subscrib(NotifyEnum.CLOSE_QQZONE_GIFT, this.checkMianViewPopLogic);
        //TEST
        this.subscrib(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, this.openLoadingUI);
        //活动信息加载成功
        this.subscrib(NotifyEnum.ACTIVE_CONFIG_DATA_LOAEDED, this.showActiveAlert);
        game.net.MessageDispatcher.register(game.net.ResponseType.MAIL, function (msg) {
            _this.receiMail(msg);
        });
        game.net.MessageDispatcher.register(game.net.ResponseType.MAILBOX, function (msg) {
            _this.refreshMail(msg);
        });
        game.net.MessageDispatcher.register(game.net.ResponseType.GETWANBAGIFTBACK, function (msg) {
            _this.getWanbaGiftback(msg);
        });
        game.net.MessageDispatcher.register(game.net.ResponseType.NEXTDAYAWARDBACK, function (msg) {
            _this.nextDarWard(msg);
        });
        this.sendRefreshMail();
        //添加断线重连监听
        GlobalManager.getInstance().addReconnectListener();
        //提前加载主场景UI资源
        this.preLoad();
    };
    /** 提前加载主场景UI资源 */
    FishMainMediator.prototype.preLoad = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/SideProp.exml");
        //加载冰冻和锁定UI
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/FrozenAndLock.exml");
        //加载解锁炮倍UI
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/UnlockGunGroup.exml");
        //加载炮台资源
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Gun.exml");
        //加载War资源
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/WarGroup.exml");
        //加载chakanUI资源
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/ChakanPanel.exml");
    };
    FishMainMediator.prototype.sendRefreshMail = function () {
        var req = new CommonRequestMessage();
        req.initData();
        req.setType(CommonRequest.EMAIL); //1 email
        NetManager.send(req);
    };
    FishMainMediator.prototype.refreshMail = function (msg) {
        var emailModel = burn.Director.getModelByKey(EmailModel);
        emailModel.clearEmail();
        var mailItems = msg.getMailListByType();
        for (var i = 0; i < mailItems.length; i++) {
            var dataObj = mailItems[i].getMails();
            for (var j = 0; j < dataObj.length; j++) {
                var data = dataObj[j];
                var emailItem = new game.model.EmailItem(data.getMailId(), data.getMailType(), data.getUserId(), data.getReceiveUserName(), data.getSendUserId(), data.getSendUserName(), data.getItems(), data.getTime(), data.getState(), data.getMailContent(), data.getMailTitle());
                emailModel.addItem(emailItem);
            }
        }
        this.checkMail();
        //发送通知消息
        this.getView().send(NotifyEnum.REFRESH_EMAIL, msg);
        burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
    };
    //检查主界面弹出面板逻辑
    FishMainMediator.prototype.checkMianViewPopLogic = function (obj, target) {
        target.getView().checkMianLogic();
    };
    //次日礼包提醒
    FishMainMediator.prototype.nextDarWard = function (msg) {
        var state = msg.getResultState();
        var userModel = burn.Director.getModelByKey(UserModel);
        userModel.setCiriState(state);
        var view = this.getView();
        //0时间没到不可领取，2已领取，3已过期  //113 - 115
        if (state == 0) {
            game.util.GameUtil.popTips(game.util.Language.getText(113));
        }
        else if (state == 2) {
            game.util.GameUtil.popTips(game.util.Language.getText(114));
        }
        else if (state == 3) {
            game.util.GameUtil.popTips(game.util.Language.getText(115));
        }
        view.checkCiri();
    };
    FishMainMediator.prototype.getWanbaGiftback = function (msg) {
        var state = msg.getResult();
        var view = this.getView();
        if (state != 0) {
            view.showWanbaGift(state, msg.getRewardList());
        }
        else {
            view.checkMianLogic();
        }
    };
    FishMainMediator.prototype.checkMail = function () {
        var emailModel = burn.Director.getModelByKey(EmailModel);
        var list = emailModel.getMailListByType(3);
        for (var i = 0; i < list.length; i++) {
            var data = list[i];
            var self_1 = this;
            var arrName = new Array();
            arrName.push(data.getSendUserName() + "");
            arrName.push(data.getSendUserId() + "");
            arrName.push(data.getItems()[0].getCount() + "");
            var vo = game.table.T_Item_Table.getVoByKey(Number(data.getItems()[0].getItemId()));
            arrName.push(game.util.Language.getText(vo.name) + "");
            //是否邮寄{0}个{1}给{2}({3})
            var string = game.util.Language.getDynamicText(46, arrName);
            (function (data, string) {
                game.util.GameUtil.openEmailChakan(null, function () {
                    var req = new ReceiveMailSendMessage();
                    req.initData();
                    req.setMailId(data.getMailId());
                    NetManager.send(req);
                }, string, data.getItems(), data.getState());
            }(data, string));
        }
    };
    /** 收取邮件 */
    FishMainMediator.prototype.receiMail = function (msg) {
        var data = msg;
        var emailItem = new game.model.EmailItem(data.getMailId(), data.getMailType(), data.getUserId(), data.getReceiveUserName(), data.getSendUserId(), data.getSendUserName(), data.getItems(), data.getTime(), data.getState(), data.getMailContent(), data.getMailTitle());
        var self = this;
        var arrName = new Array();
        arrName.push(data.getSendUserName() + "");
        arrName.push(data.getSendUserId() + "");
        arrName.push(emailItem.getItems()[0].getCount() + "");
        var vo = game.table.T_Item_Table.getVoByKey(Number(emailItem.getItems()[0].getItemId()));
        arrName.push(game.util.Language.getText(vo.name) + "");
        //是否邮寄{0}个{1}给{2}({3})
        var string = game.util.Language.getDynamicText(46, arrName);
        (function (emailItem, string) {
            game.util.GameUtil.openEmailChakan(null, function () {
                var req = new ReceiveMailSendMessage();
                req.initData();
                req.setMailId(emailItem.getMailId());
                NetManager.send(req);
            }, string, emailItem.getItems(), emailItem.getState());
        }(emailItem, string));
    };
    /**UI资源加载完成的回调 */
    FishMainMediator.prototype.viewInit = function (obj, target) {
        //请求活动信息
        var sendActive = new ActiveConfigMessagesSendMessage();
        sendActive.initData();
        NetManager.send(sendActive);
        var self = target;
        var model = burn.Director.getModelByKey(UserModel);
        var view = self.getView();
        //更新UI数据
        // self.setMainState();
        //设置玩家头像
        self.setHeadIcon();
        //请求房间连接监听
        game.net.MessageDispatcher.register(game.net.ResponseType.REQUESTROOMBACK, function (msg) {
            if (msg.getFlag()) {
                NetManager.resetNet(msg.getIp(), msg.getPort(), function () {
                    var roomType = msg.getType();
                    var skinid = model.getCurSkinId();
                    model.setMatchRoomLevel(roomType);
                    //记录开始加载前时间
                    game.util.LogUtil.timestamp = new Date().getTime();
                    // game.util.ReyunUtil.sendEvent(game.util.LogEnum.START_ROOM_LOADING);
                    var intoRoomScene = function () {
                        // game.util.ReyunUtil.sendEvent(game.util.LogEnum.END_ROOM_LOADING);
                        //发送进入房间请求
                        var req = new IntoRoomSendMessage();
                        req.initData();
                        req.setId(msg.getRoomId());
                        req.setUid(model.getUserId());
                        NetManager.send(req);
                    };
                    var fishingLoadCount = 0;
                    var onResourceLoadComplete = function (event) {
                        //发送进入房间消息
                        if (event.groupName == "asyn_fish_" + roomType + skinid) {
                            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);
                            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);
                            intoRoomScene();
                        }
                        //  else if (event.groupName == "fishing") {
                        // 	fishingLoadCount++;
                        // 	if (fishingLoadCount >= 2) {
                        // 		intoRoomScene();
                        // 	}
                        // }
                    };
                    //资源加载进度
                    var onResourceProgress = function (event) {
                        if (event.groupName == "asyn_fish_" + roomType) {
                            view.updateLoading(event.itemsLoaded, event.itemsTotal);
                        }
                        else {
                            view.updateLoading(event.itemsLoaded, event.itemsTotal);
                        }
                    };
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);
                    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);
                    EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Loading.exml", function () {
                        view.addLoadingUI();
                        var resList = game.util.LoaderUtil.getFishResByType(roomType);
                        resList.push("gunsicon_" + skinid + "_png");
                        resList.push("fishing");
                        RES.createGroup("asyn_fish_" + roomType + skinid, resList);
                        RES.loadGroup("asyn_fish_" + roomType + skinid);
                    }, self);
                });
            }
            else {
                console.log("进入房间失败:" + msg.getFlag());
            }
        });
        //请求房间数据监听
        game.net.MessageDispatcher.register(game.net.ResponseType.INTOROOMBACK, function (msg) {
            //初始化房间model
            var rModel = burn.Director.getModelByKey(RoomModel);
            var uModel = burn.Director.getModelByKey(UserModel);
            //玩家信息列表
            var playList = msg.getPlayerInfo();
            for (var i = 0; i < playList.length; i++) {
                var roomer = new game.model.Roomer(parseInt(playList[i].playerId), parseInt(playList[i].position), playList[i].name, parseInt(playList[i].gunId), parseInt(playList[i].coins), parseInt(playList[i].gems), playList[i].items, playList[i].lockRelation, playList[i].vipLevel, playList[i].batterySkinId, playList[i].gunrestSkinId, playList[i].roleLevel);
                rModel.addRoomer(roomer);
                var roomType = uModel.getMatchRoomLevel();
                if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom || game.util.GameUtil.isKss(roomType)) {
                    //如果是大奖赛
                    var djsObj = new game.model.DjsObj(playList[i].grandPrixMessage);
                    roomer.setDjsObj(djsObj);
                }
            }
            if (uModel.isTodayFirstLogin()) {
                //记录登录加载时长
                var tempTime = new Date().getTime() - game.util.LogUtil.timestamp;
                var content = { duration: tempTime };
                game.util.LogUtil.sendLogicalLog(game.util.LogEnum.INTO_ROOM_LOADING_TIME, content);
            }
        });
        //初始房间内鱼群
        game.net.MessageDispatcher.register(game.net.ResponseType.PONDFISHES, function (msg) {
            game.net.MessageDispatcher.unregister(game.net.ResponseType.PONDFISHES);
            var rModel = burn.Director.getModelByKey(RoomModel);
            var fishList = msg.getFishes();
            for (var i = 0; i < fishList.length; i++) {
                if (!rModel.isPathExist(fishList[i].pathId)) {
                    var fish = new game.model.Fish();
                    fish.fishId = fishList[i].fishId;
                    fish.pathId = fishList[i].pathId;
                    fish.fishType = fishList[i].type;
                    fish.uniqId = fishList[i].uniId;
                    fish.coord = new egret.Point(fishList[i].coordinate.xvalue, fishList[i].coordinate.yvalue);
                    fish.aliveTime = Number(fishList[i].aliveTime);
                    rModel.addRoomLiveFish(fish);
                }
            }
            game.util.UIUtil.startLoading();
            //关闭loading界面
            view.closeLoadingUI();
            //进入房间
            var roomView = new RoomView();
            var roomMed = new RoomMediator(roomView);
            burn.Director.repleaceView(roomMed);
        });
        self._timer = new egret.Timer(1000, 0);
        self._timer.addEventListener(egret.TimerEvent.TIMER, self.timerFunc, self);
        //开始计时
        self._timer.start();
        //设置玩家信息
    };
    //主界面计时
    FishMainMediator.prototype.timerFunc = function () {
        var view = this.getView();
        var model = burn.Director.getModelByKey(UserModel);
        if (this._isInBankrupt) {
            var time = model.getBankruptTime();
            var currTime = game.util.TimeUtil.getCurrTime();
            var residue = time - currTime;
            if (residue > 0) {
                var str = game.util.TimeUtil.sceonds2MinStr(residue);
                view.setBankruptTime(str);
            }
            else {
                view.setBankruptTime(game.util.Language.getText(32));
            }
        }
    };
    FishMainMediator.prototype.setHeadIcon = function () {
        var self = this;
        var userModel = burn.Director.getModelByKey(UserModel);
        var headUrl = "";
        if (CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
            headUrl = userModel.getHeadUrl().replace("yiwantang/", "");
        }
        else {
            headUrl = userModel.getHeadUrl();
        }
        game.util.IconUtil.getHeadIcon(headUrl, function (bmp) {
            //设置玩家头像
            self.getView().setHeadIcon(bmp);
        });
    };
    FishMainMediator.prototype.resLoadOver = function (obj, target) {
        var model = burn.Director.getModelByKey(UserModel);
        if (model.getCoins() <= 0) {
            game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getText(2));
            return;
        }
        var req = new RequestRoomMessage();
        req.initData();
        var roomType = 0;
        var view = target.getView();
        if (obj == null) {
            game.util.ReyunUtil.sendEvent(game.util.LogEnum.QUICKLY_GAME_COUNT);
            req.setId(model.getUserId());
            //根据金币和炮倍获取可进入的房间类型,炮倍
            // roomType = game.util.GameUtil.getRoomTypeByCoinsAndRate(model.getCoins(), model.getCurGunID());
            req.setType(RequesetRoomState.QuickGame);
            NetManager.send(req);
        }
        else {
            roomType = obj.type;
            var flag = game.util.GameUtil.verifyRoomCoins(roomType, model.getCoins());
            if (!flag) {
                var coins = game.util.GameUtil.getNeedCoinsByRoomType(roomType);
                game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(57, [String(coins)]));
                return;
            }
            var gunFlag = game.util.GameUtil.getNeedGunByRoomType(roomType, model.getCurGunID());
            if (gunFlag != -1) {
                var vo = game.table.T_Gun_Table.getVoByKey(gunFlag);
                game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(77, [String(vo.bulletNum)]));
                return;
            }
            var rId = obj.id;
            req.setId(model.getUserId());
            req.setType(roomType);
            req.setRoomId(rId);
            NetManager.send(req);
        }
    };
    //刷新room在线人数UI
    FishMainMediator.prototype.refreshRoomOnline = function (obj, target) {
        var view = target.getView();
        view.setRoomOnLineUI();
    };
    FishMainMediator.prototype.checkMainAlert = function (obj, target) {
        var emailAlert = false;
        var emailModel = target.getModel(EmailModel);
        var list = emailModel.getMailList();
        var listLen = list.length;
        for (var i = 0; i < listLen; i++) {
            var emailItemState = list[i].getState();
            if (emailItemState == 0) {
                emailAlert = true;
                break;
            }
        }
        var taskModel = target.getModel(TaskModel);
        var taskAlert = taskModel.showAlert();
        var view = target.getView();
        var model = target.getModel(UserModel);
        var signObj = model.getSignObj();
        var monthArert = false;
        var monthModel = target.getModel(UserModel);
        var endTime = monthModel.getMonthEndTime() - game.util.TimeUtil.getCurrTime();
        if (endTime < 0 && !monthModel.bOpenedMonthUI) {
            monthArert = true;
        }
        else {
            monthArert = false;
        }
        view.checkAlert(emailAlert, taskAlert, !signObj.IsTodaySign(), monthArert);
    };
    FishMainMediator.prototype.updateMainState = function (obj, target) {
        target.setMainState();
    };
    FishMainMediator.prototype.setMainState = function () {
        var view = this.getView();
        var userModel = this.getModel(UserModel);
        var exp = userModel.getExp();
        var vo = game.table.T_RoleLevel_Table.getVoByKey(userModel.getLevel());
        var maxExp = vo.levelUpExp;
        //更新玩家数据：金币和钻石
        view.setMainStateInfo(String(userModel.getCoins()), String(userModel.getMoney()), String(userModel.getTicket()), String(userModel.getLevel()), String(userModel.getExp()), String(exp), String(maxExp), userModel.getUserName());
        //判断救济金状态
        var bankruptTime = userModel.getBankruptTime();
        if (bankruptTime > 0 && userModel.getCoins() > 0) {
            var msg = new BankruptMessage();
            msg.initData();
            msg.setState(BankruptStauts.STATE_RESUME);
            NetManager.send(msg);
            userModel.setBankruptTime(0);
            bankruptTime = 0;
        }
        if (bankruptTime == 0) {
            view.setBankruptVisble(false);
            this._isInBankrupt = false;
        }
        else {
            view.setBankruptVisble(true);
            this._isInBankrupt = true;
        }
    };
    //进入手动选房功能
    FishMainMediator.prototype.openSelcetRoom = function (obj, target) {
        var userModel = target.getModel(UserModel);
        var flag = game.util.GameUtil.verifyRoomCoins(RequesetRoomState.SelectRoom, userModel.getCoins());
        if (flag) {
            var flag1 = game.util.GameUtil.verifyRoomCoins(RequesetRoomState.SelectRoom, userModel.getCoins());
            if (!flag1) {
                var coins = game.util.GameUtil.getNeedCoinsByRoomType(RequesetRoomState.SelectRoom);
                game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(57, [String(coins)]));
                return;
            }
            var gunFlag = game.util.GameUtil.getNeedGunByRoomType(RequesetRoomState.SelectRoom, userModel.getCurGunID());
            if (gunFlag != -1) {
                var vo = game.table.T_Gun_Table.getVoByKey(gunFlag);
                game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(77, [String(vo.bulletNum)]));
                return;
            }
            target.getView().onSelectButtonClick();
        }
        else {
            var gunFlag = game.util.GameUtil.getNeedGunByRoomType(RequesetRoomState.SelectRoom, userModel.getCurGunID());
            if (gunFlag != -1) {
                var vo = game.table.T_Gun_Table.getVoByKey(gunFlag);
                game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(77, [String(vo.bulletNum)]));
                return;
            }
            var coins = game.util.GameUtil.getNeedCoinsByRoomType(RequesetRoomState.SelectRoom);
            game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(57, [String(coins)]));
        }
    };
    //点击两边非中间item的时候
    FishMainMediator.prototype.clickMainFunItem = function (obj, target) {
        var view = target.getView();
        var vos = view.getScrollView().getVos();
        var middleItem = null;
        for (var _i = 0, vos_1 = vos; _i < vos_1.length; _i++) {
            var vo = vos_1[_i];
            if (vo.getSelected() == true) {
                middleItem = vo;
            }
        }
        if (obj) {
            var currId = middleItem.id;
            if (currId < obj && obj - currId == 1) {
                view.getScrollView().prevPosition();
            }
            else if (currId > obj && currId - obj == 1) {
                view.getScrollView().nextPosition();
            }
            else if (currId < obj && obj - currId > 1) {
                view.getScrollView().nextPosition();
            }
            else if (currId > obj && currId - obj > 1) {
                view.getScrollView().prevPosition();
            }
        }
    };
    //点击主界面上的按钮
    FishMainMediator.prototype.clickMainBtn = function (obj, target) {
        if ("bagBtn" == obj) {
            var bagView = new BagView();
            var bagMed = new BagMediator(bagView);
            burn.Director.pushView(bagMed);
        }
        else if ("makeBtn" == obj) {
            var userModle = burn.Director.getModelByKey(UserModel);
            //最高ID
            var gunRate = userModle.getCurGunID();
            var gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
            //判断有没有下一个炮倍
            if (gunRateVo) {
                var arr = gunRateVo.upgradeOrForgeCost;
                var arrData = arr.split(",");
                if (arrData.length > 1) {
                    var forgeView = new ForgeView();
                    var forgeMed = new ForgeMediator(forgeView);
                    burn.Director.pushView(forgeMed);
                    return;
                }
            }
            if (gunRate == 54) {
                //未开启锻造界面
                game.util.GameUtil.popTips("已经是最高炮倍");
            }
            else {
                //未开启锻造界面
                game.util.GameUtil.popTips(game.util.Language.getText(28));
            }
        }
        else if ("bankruptBtn" == obj) {
            var userModle = burn.Director.getModelByKey(UserModel);
            var time = userModle.getBankruptTime();
            if (time > 0) {
                var currTime = game.util.TimeUtil.getCurrTime();
                var residue = time - currTime;
                if (residue > 0) {
                    game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getText(33)); //时间还没到，等一会！
                }
                else {
                    var req = new BankruptMessage();
                    req.initData();
                    //7:领取救济金
                    req.setState(7);
                    NetManager.send(req);
                }
            }
            else {
                game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getText(34)); //你没破产，没有救济金！
            }
        }
        else if ("emailBtn" == obj) {
            var emailView = new EmailView();
            var emailMed = new EmailMediator(emailView);
            burn.Director.pushView(emailMed);
        }
        else if ("exchangeBtn" == obj) {
            var exchangeView = new ExchangeView(false);
            var exchangeMed = new ExchangeMediator(exchangeView);
            burn.Director.pushView(exchangeMed);
        }
        else if ("roleAvaGroup" == obj) {
            var userView = new UserInfoView();
            var userMed = new UserInfoMediator(userView);
            burn.Director.pushView(userMed);
        }
        else if ("taskBtn" == obj) {
            var taskView = new TaskView();
            var taskMed = new TaskMediator(taskView);
            burn.Director.pushView(taskMed);
        }
        else if ("shopBtn" == obj) {
            var itemShopView = new ItemShopView();
            var itemShopMed = new ItemShopMediator(itemShopView);
            burn.Director.pushView(itemShopMed);
        }
        else if ("settingBtn" == obj) {
            var settingView = new SettingView();
            var settingMed = new SettingMediator(settingView);
            burn.Director.pushView(settingMed);
        }
        else if ("vipBtn" == obj) {
            var view = new VipView();
            var med = new VipMediator(view);
            burn.Director.pushView(med);
        }
        else if ("signinBtn" == obj) {
            var view2 = new SignView();
            var med2 = new SignMediator(view2);
            burn.Director.pushView(med2);
        }
        else if ("activityBtn" == obj) {
            var activeModel = burn.Director.getModelByKey(ActiveModel);
            if (activeModel.getActiveList().length > 0) {
                var view3 = new ActiveView();
                var med3 = new ActiveMediator(view3);
                burn.Director.pushView(med3);
            }
            else {
                game.util.GameUtil.popTips(game.util.Language.getText(190));
            }
        }
        else if ("vipLotteryBtn" == obj) {
            var userModel = burn.Director.getModelByKey(UserModel);
            if (userModel.getTatolChargeRMB() > 0) {
                var chargeView = new ChargeView(ChargeType.Ticket);
                var chargeMed = new ChargeMediator(chargeView);
                burn.Director.pushView(chargeMed);
            }
            else {
                var firstChargeView = new FirstChargeView();
                var firstChargeMed = new FirstChargeMediator(firstChargeView);
                burn.Director.pushView(firstChargeMed);
            }
        }
        else if ("rankBtn" == obj) {
            var view4 = new RankView();
            var med4 = new RankMediator(view4);
            burn.Director.pushView(med4);
        }
        else if ("monthBtn" == obj) {
            var view1 = new MonthCardView();
            var med1 = new MonthCardMediator(view1);
            burn.Director.pushView(med1);
            target.getView().setMonthAlert(false);
        }
        else if ("charge_gold" == obj) {
            var chargeView = new ChargeView(ChargeType.Gold);
            var chargeMed = new ChargeMediator(chargeView);
            burn.Director.pushView(chargeMed);
        }
        else if ("charge_gem" == obj) {
            var chargeView = new ChargeView(ChargeType.Gem);
            var chargeMed = new ChargeMediator(chargeView);
            burn.Director.pushView(chargeMed);
        }
        else if ("charge_ticket" == obj) {
            var chargeView = new ChargeView(ChargeType.Ticket);
            var chargeMed = new ChargeMediator(chargeView);
            burn.Director.pushView(chargeMed);
        }
        else if ("yaoqingBtn" == obj) {
            // let view = target.getView() as FishMainView;
            // let yaoQingView = new YaoQingView();
            // view.addChild(yaoQingView);
            // let shareView:ShareView = new ShareView();
            // let shareMed:ShareMediator = new ShareMediator(shareView);
            // burn.Director.pushView(shareMed);
            var yaoQingView = new ShareZiYou(ShareType.NORMAL, "");
            target.getView().addChild(yaoQingView);
        }
        else if ("guanzhuBtn" == obj) {
            if (CONFIG.PLATFORM_ID == PlatformTypeEnum.ZI_YOU) {
                openQrCode();
            }
            if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
                openCombunetQrCode(Number(CONFIG.SUB_PLATFORM_ID));
            }
        }
    };
    FishMainMediator.prototype.updateUICoins = function (obj, target) {
        var view = target.getView();
        var userModle = burn.Director.getModelByKey(UserModel);
        view.updateCoins(userModle.getCoins() + "");
    };
    //请求qq玩吧礼包
    FishMainMediator.prototype.reqQQZoneGift = function (obj, target) {
        var giftId = Number(window["FISHING_CONFIG"]["giftId"]);
        if (giftId > 0) {
            var req = new GetWanbaGiftMessage();
            req.initData();
            req.setGiftId(giftId);
            NetManager.send(req);
        }
        else {
            target.getView().checkMianLogic();
        }
    };
    //救济金消息返回
    FishMainMediator.prototype.bankruptBack = function (obj, target) {
        var status = obj.status;
        if (status == BankruptStauts.GET_SUCC) {
            var coins = obj.coins;
            var userId = obj.userId;
            // let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
            // let coinsTatal = Number(userModle.getCoins()) + Number(coins);
            // userModle.setCoins( coinsTatal );
            game.util.GameUtil.flyCoins(coins, 3, new egret.Point(1200, 400), new egret.Point(300, 55), null, userId);
            //
            var view = target.getView();
            view.setBankruptVisble(false);
        }
        else if (status == BankruptStauts.GET_LIMIT) {
            game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getText(35));
        }
        else if (status == BankruptStauts.NOT_TO_TIME) {
            game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getText(33));
        }
    };
    //活动数据加载完成
    FishMainMediator.prototype.showActiveAlert = function (obj, target) {
        var activeModel = burn.Director.getModelByKey(ActiveModel);
        var userModle = burn.Director.getModelByKey(UserModel);
        var view = target.getView();
        if (activeModel.getActiveList().length > 0) {
            if (!userModle.bOpenedActiveUI) {
                //添加
                view.setActiveAlert(true);
                return;
            }
        }
        //去掉
        view.setActiveAlert(false);
    };
    FishMainMediator.prototype.openLoadingUI = function (obj, target) {
        //检测
        var userModle = burn.Director.getModelByKey(UserModel);
        if (obj.type == RequesetRoomState.NewbieRoom) {
            var lv = userModle.getLevel();
            var gunRateVo = game.table.T_Gun_Table.getVoByKey(userModle.getCurGunID());
            var lvLimit = game.table.T_Config_Table.getVoByKey(37); //等级限制
            var gunRateLimit = game.table.T_Config_Table.getVoByKey(38); //炮倍限制
        }
        userModle.setMatchRoomLevel(Number(obj.type));
        var flag = game.util.GameUtil.verifyRoomCoins(Number(obj.type), userModle.getCoins());
        // if (!flag) {
        // 	let coins = game.util.GameUtil.getNeedCoinsByRoomType(Number(obj.type));
        // 	game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(57, [String(coins)]));
        // 	return;
        // }
        // let gunFlag = game.util.GameUtil.getNeedGunByRoomType(Number(obj.type), userModle.getCurGunID());
        // if (gunFlag != -1) {
        // 	let vo = game.table.T_Gun_Table.getVoByKey(gunFlag);
        // 	game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(77, [String(vo.bulletNum)]));
        // 	return;
        // }
        var view = target.getView();
        view.openLoadingUI(obj);
    };
    FishMainMediator.prototype.destroy = function () {
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.unsubscribByType(NotifyEnum.RES_LOAD_OVER);
        this.unsubscribByType(NotifyEnum.MAIN_UI_INIT);
        this.unsubscribByType(NotifyEnum.OPEN_SELECT_ROOM);
        this.unsubscribByType(NotifyEnum.CLICK_MAIN_FUN_ITEM);
        this.unsubscribByType(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM);
        this.unsubscribByType(NotifyEnum.ACTIVE_CONFIG_DATA_LOAEDED);
        this.unsubscribByType(NotifyEnum.CLICK_MAIN_BTN);
        this.unsubscribByType(NotifyEnum.BANKRUPT_MESSAGE);
        this.unsubscribByType(NotifyEnum.UPDATE_ROOM_UI_COINS);
        this.unsubscribByType(NotifyEnum.REQ_QQZONE_GIFT);
        this.unsubscribByType(NotifyEnum.CLOSE_QQZONE_GIFT);
        this.unsubscribByType(NotifyEnum.CHECK_MAIN_ALERT);
        this.unsubscribByType(NotifyEnum.CHECK_POP);
        this.unsubscribByType(NotifyEnum.REFRES_ROOM_ONLINE);
        this.getView().destroy();
        //移除监听
        game.net.MessageDispatcher.unregister(game.net.ResponseType.PONDFISHES);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.INTOROOMBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.REQUESTROOMBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.NEXTDAYAWARDBACK);
        //清理资源
        RES.destroyRes("mainUI", false);
    };
    return FishMainMediator;
}(burn.mediator.SimpleMediator));
/** 是否第一次打开主界面 */
FishMainMediator.isFirstOpen = true;
__reflect(FishMainMediator.prototype, "FishMainMediator");
//# sourceMappingURL=FishMainMediator.js.map