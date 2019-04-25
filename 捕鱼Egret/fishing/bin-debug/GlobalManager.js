var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalManager = (function () {
    function GlobalManager() {
        this._isInit = false;
        //炮台普通状态下的攻击频率
        this.GUN_FRAME_TIME = 205;
        //主界面当前滑动到了第几个入口
        this.MAIN_ENTR_IDX = 2;
        if (this._isInit) {
            throw (new burn.error.SimpleError(""));
        }
        this._isInit = true;
        this.bIsNeedDelayLogin = false;
    }
    GlobalManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new GlobalManager();
            //初始化全局管理类
            this._instance.init();
        }
        return this._instance;
    };
    GlobalManager.prototype.init = function () {
        //初始化消息集合
        this.trumpetMsgList = new Array();
        //添加如假消息
        var fakeStr = game.table.T_Config_Table.getVoByKey(85);
        var fakeArr = fakeStr.value.split(",");
        var randomNum = Math.random() * 8 + 2;
        for (var i = 0; i < randomNum; i++) {
            var fakeArrLen = fakeArr.length - 1;
            var tempIdx = Math.random() * fakeArrLen;
            var ele = fakeArr.splice(tempIdx, 1);
            this.trumpetMsgList.push(game.util.Language.getText(Number(ele[0])));
        }
        ///////////////////////////////////////////////
        var self = this;
        //服务器通用状态返回
        game.net.MessageDispatcher.register(game.net.ResponseType.COMMONSTATUS, function (msg) {
            switch (msg.getStatus()) {
                case CommonEnum.RECONNECT:
                    self.reconnect();
                    break;
                case CommonEnum.RELOGIN:
                    game.util.GameUtil.openConfirm(null, function () {
                        GlobalManager.getInstance().reLogin();
                    }, this, game.util.Language.getText(59));
                    break;
                case CommonEnum.LOGIN_FAIL:
                    game.util.GameUtil.openConfirm(null, null, this, game.util.Language.getText(64));
                    break;
                case CommonEnum.REPLACED:
                    game.util.GameUtil.openConfirm(null, null, this, game.util.Language.getText(59));
                    GlobalManager.getInstance().reLogin();
                    break;
                case CommonEnum.ACCOUNT_BAN:
                    game.util.GameUtil.openConfirm(null, null, this, GlobalManager.BAN_TIPS);
                    break;
                case CommonEnum.DALAY_LOGIN:
                    GlobalManager.getInstance().bIsNeedDelayLogin = true;
                    setTimeout(function () {
                        if (!GlobalManager.getInstance().bIsNeedDelayLogin) {
                            return;
                        }
                        var req = new LoginSendMessage();
                        req.initData();
                        req.setId(CONFIG.USER_ID);
                        req.setAccount(CONFIG.ACCOUNT);
                        req.setPlatform(CONFIG.PLATFORM_ID);
                        req.setSecret(CONFIG.USER_SECRET);
                        NetManager.send(req);
                    }, 1000);
                    break;
            }
        });
        // game.net.MessageDispatcher.register(game.net.ResponseType.LOGINBACK, function(msg:LoginBackMessage):void{});
        //监听玩家主要数据变化
        game.net.MessageDispatcher.register(game.net.ResponseType.MAJORPARAMETERCHANGE, function (msg) {
            var userModel = burn.Director.getModelByKey(UserModel);
            var userId = Number(msg.getUserId());
            var coins = Number(msg.getCoins());
            var money = Number(msg.getGems());
            if (userId == userModel.getUserId()) {
                var level = Number(msg.getLevel());
                if (msg.getCoins() != null) {
                    userModel.setCoins(coins);
                    burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: userId });
                }
                if (msg.getGems() != null) {
                    userModel.setMoney(money);
                    burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userId });
                }
                var coupon = msg.getCoupon();
                if (coupon != null) {
                    userModel.setTicket(coupon);
                }
                if (level) {
                    userModel.setLevel(level);
                }
                var items = msg.getItem();
                var len = items.length;
                for (var i = 0; i < len; i++) {
                    var vo = game.table.T_Item_Table.getVoByKey(Number(items[i].itemId));
                    var time = 0;
                    if (vo.type == BagItemType.BARBETTE
                        || vo.type == BagItemType.BATTERY) {
                        time = items[i].expried;
                    }
                    userModel.updateItem(items[i].itemId, items[i].totalCount, time);
                    //发消息同步
                    var id = items[i].itemId;
                    if (id == PropEnum.CALABASH
                        || id == PropEnum.CLONE
                        || id == PropEnum.RAGE
                        || id == PropEnum.FREE_RAGE
                        || id == PropEnum.FREE_CLONE
                        || id == PropEnum.FROZEN
                        || id == PropEnum.LOCK
                        || id == PropEnum.GOLD_WARHEAD
                        || id == PropEnum.SILVER_WARHEAD
                        || id == PropEnum.BRONZE_WARHEAD
                        || id == PropEnum.NUCLEAR_WARHEAD) {
                        burn._Notification_.send(NotifyEnum.SET_PROP_NUM);
                    }
                }
                burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
            }
            else {
                var roomModel = burn.Director.getModelByKey(RoomModel);
                var roomer = roomModel.getRoomerById(userId);
                if (!roomer) {
                    return;
                }
                if (coins) {
                    roomer.setCoins(coins);
                    burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: userId });
                    burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
                }
                if (money) {
                    roomer.setMoney(money);
                    burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userId });
                    burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
                }
            }
        });
        //监听救济金状态
        game.net.MessageDispatcher.register(game.net.ResponseType.BANKRUPT, function (msg) {
            var status = Number(msg.getState());
            var uId = Number(msg.getUserId());
            if (status == BankruptStauts.BANKRUPT) {
                burn._Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, { status: status, userId: uId, time: Number(msg.getCanReliefTime()) });
            }
            else if (status == BankruptStauts.STATE_RESUME) {
                burn._Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, { status: status, userId: uId });
            }
            else if (status == BankruptStauts.GET_SUCC) {
                burn._Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, { status: status, userId: uId, coins: Number(msg.getCoins()) });
            }
            else if (status == BankruptStauts.GET_LIMIT) {
                burn._Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, { status: status, userId: uId });
            }
            else if (status == BankruptStauts.NOT_TO_TIME) {
                burn._Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, { status: status, userId: uId, time: Number(msg.getCanReliefTime()) });
            }
        });
        //监听服务器通知：跑马灯		世界广播 > 兑奖消息 > 分享消息 > 打死高倍鱼 > 获得鱼券
        game.net.MessageDispatcher.register(game.net.ResponseType.GCBROADCASTMESSAGEBACK, function (msg) {
            var broadcastList = msg.getMessageList();
            var hallList = new Array();
            for (var _i = 0, broadcastList_1 = broadcastList; _i < broadcastList_1.length; _i++) {
                var broadVo = broadcastList_1[_i];
                var broadType = broadVo.broadType;
                var txt = broadVo.msg;
                var langId = broadVo.langId;
                var msgType = broadVo.priority;
                var param = broadVo.params;
                if (broadType == BroadType.NewsActive) {
                    if (txt) {
                        hallList.push(txt);
                    }
                    else {
                        var lan = game.util.Language.getDynamicText(langId, param);
                        hallList.push(lan);
                    }
                }
                else if (broadType == BroadType.NewsFishing) {
                    if (txt) {
                        game.util.GCBroadcastManager.addRoomBroadcast(txt, broadType);
                    }
                    else {
                        var lan = game.util.Language.getDynamicText(langId, param);
                        game.util.GCBroadcastManager.addRoomBroadcast(lan, broadType, msgType);
                    }
                }
                else if (broadType == BroadType.NewsWorld) {
                    if (txt) {
                        game.util.GCBroadcastManager.addRoomBroadcast(txt, broadType);
                        if (self.trumpetMsgList.length > 20) {
                            self.trumpetMsgList.shift();
                        }
                        self.trumpetMsgList.unshift(txt);
                    }
                }
            }
            if (hallList.length > 0) {
                game.util.GCBroadcastManager.addHallBroadcast(hallList);
            }
        });
        //监听任务变更
        game.net.MessageDispatcher.register(game.net.ResponseType.TASKPARAMETERCHANGE, function (msg) {
            var changeTaskList = msg.getChangedTasks();
            var taskModel = burn.Director.getModelByKey(TaskModel);
            var len = changeTaskList.length;
            var isFindPrix = false;
            var isPriceTask = false;
            for (var i = 0; i < len; i++) {
                var id = changeTaskList[i].taskId;
                var state = changeTaskList[i].taskStatus;
                var value = changeTaskList[i].curParameterValue;
                taskModel.updateItem(id, state, value);
                var vo = game.table.T_FishTaskItem_Table.getVoByKey(Number(id));
                if (vo && vo.type == TaskType.TASK_TYPE_NEWBIE) {
                    burn._Notification_.send(NotifyEnum.TASK_GUIDE_CHANGE);
                }
                else if (vo && vo.type == TaskType.TASK_TYPE_GRAND_PRIX) {
                    isFindPrix = true;
                }
                else if (vo && vo.type == TaskType.TASK_TYPE_PRICE) {
                    isPriceTask = true;
                    if (msg.getPirateTaskEndTime() != null) {
                        var comTime = Number(msg.getPirateTaskEndTime());
                        taskModel.updateItem(id, state, value, comTime);
                    }
                }
                else {
                    burn._Notification_.send(NotifyEnum.TASK_ACT_CHANGE);
                }
            }
            //大奖赛数据设置完成
            if (isFindPrix) {
                var taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX);
                burn._Notification_.send(NotifyEnum.DJS_TASK_CHANGE, { times: msg.getArenaTaskTimes() });
            }
            //悬赏任务
            if (isPriceTask) {
                burn._Notification_.send(NotifyEnum.PRICE_TASK_CHANGE);
            }
        });
        //监听VIP更改
        game.net.MessageDispatcher.register(game.net.ResponseType.VIPLEVELUP, function (msg) {
            var userModel = burn.Director.getModelByKey(UserModel);
            userModel.setVipLevel(Number(msg.getNewLevel()));
        });
        //房间人数变化
        game.net.MessageDispatcher.register(game.net.ResponseType.ROOMONLINEMESSAGE, function (msg) {
            var list = msg.getOnlineList();
            var len = list.length;
            var arr = new Array();
            arr.push(1);
            arr.push(1);
            arr.push(1);
            for (var i = 0; i < len; i++) {
                var item = list[i];
                var roomType = item.getRoomType();
                var num = item.getNum();
                arr[roomType - 2] = num;
            }
            var userModel = burn.Director.getModelByKey(UserModel);
            userModel.setRoomOnLine(arr);
            burn._Notification_.send(NotifyEnum.REFRES_ROOM_ONLINE);
        });
        //活动信息
        game.net.MessageDispatcher.register(game.net.ResponseType.ACTIVECONFIGMESSAGESBACK, function (msg) {
            var activeModel = burn.Director.getModelByKey(ActiveModel);
            activeModel.setData(msg);
            burn._Notification_.send(NotifyEnum.ACTIVE_CONFIG_DATA_LOAEDED);
        });
        //初始化子渠道数据
        this.initSubPlatformData();
    };
    /**
     * 初始化子渠道数据
     */
    GlobalManager.prototype.initSubPlatformData = function () {
        this._subsMap = new burn.util.Map();
        var vo = game.table.T_Config_Table.getVoByKey(94);
        var subs = vo.value.split(",");
        for (var _i = 0, subs_1 = subs; _i < subs_1.length; _i++) {
            var sub = subs_1[_i];
            var data = sub.split("_");
            var subId = Number(data[0]);
            var key = data[1];
            this._subsMap.put(subId, key);
        }
    };
    /**
     * 根据子渠道id获取热云appkey
     */
    GlobalManager.prototype.getKeyBySubId = function (id) {
        if (CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG || CONFIG.PLATFORM_ID == PlatformTypeEnum.ZI_YOU) {
            return CONFIG.logAppID;
        }
        if (this._subsMap.contains(id)) {
            return this._subsMap.get(id);
        }
        else {
            return CONFIG.logAppID;
        }
    };
    //开始发送心跳轮询
    GlobalManager.prototype.startHeartbeat = function () {
        //心跳协议轮询
        this._heartTimer = new egret.Timer(1000 * 60, 0);
        this._heartTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._heartTimer.start();
    };
    GlobalManager.prototype.startLogHeartBeat = function () {
        //心跳协议轮询
        this._logHeartTimer = new egret.Timer(1000 * 5, 0);
        this._logHeartTimer.addEventListener(egret.TimerEvent.TIMER, this.logTimerFunc, this);
        this._logHeartTimer.start();
    };
    //心跳函数
    GlobalManager.prototype.timerFunc = function () {
        var req = new HeartbeatMessage();
        req.initData();
        NetManager.send(req);
    };
    //心跳函数
    GlobalManager.prototype.logTimerFunc = function () {
        game.util.ReyunUtil.heartbeat();
    };
    /** 初始化服务器时间 */
    GlobalManager.prototype.setServerTime = function (time) {
        // GlobalManager.SERVER_TIME_STAMP = time;
        game.util.TimeUtil.initServerTime(time);
    };
    /** 断线重连 */
    GlobalManager.prototype.reconnect = function () {
        var view = new FishMainView();
        var med = new FishMainMediator(view);
        burn.Director.repleaceView(med);
    };
    /** 清除所有数据 */
    GlobalManager.prototype.clearAllGameData = function () {
        //清除所有消息通知
        burn._Notification_.removeAll();
        //清除所有消息协议
        game.net.MessageDispatcher.removeAll();
        //清除所有Model
        burn.Director.clearAllModel();
        //清除Global
        this._heartTimer && this._heartTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._logHeartTimer && this._logHeartTimer.addEventListener(egret.TimerEvent.TIMER, this.logTimerFunc, this);
        this._isInit = false;
        GlobalManager._instance = null;
    };
    /** 重新登录 */
    GlobalManager.prototype.reLogin = function (auto) {
        if (auto === void 0) { auto = false; }
        //清除数据
        this.clearAllGameData();
        //切换登录
        var loginView = new LoginView();
        var loginMed = new LoginMediator(loginView);
        burn.Director.repleaceView(loginMed);
    };
    /** 添加重连 */
    GlobalManager.prototype.addReconnectListener = function () {
        game.net.MessageDispatcher.register(game.net.ResponseType.LOGINBACK, function (msg) {
            GlobalManager.getInstance().bIsNeedDelayLogin = false;
            var model = burn.Director.getModelByKey(UserModel);
            model.setUserId(msg.getId());
            model.setMoney(msg.getGems());
            model.setCoins(msg.getCoins());
            model.setCurGunID(msg.getMaxGunId());
            model.setBankruptTime(msg.getCanReliefTime());
            model.setTodayFirstLogin(msg.getIsTodayFirstLogin());
            var chargedGearsMsg = msg.getChargedGears();
            if (chargedGearsMsg.length > 0) {
                var len = chargedGearsMsg.length;
                for (var i = 0; i < len; i++) {
                    model.addChargedGears(Number(chargedGearsMsg[i]));
                }
            }
            //初始化人物信息
            var lv = msg.getRoleLevel();
            var exp = msg.getRoleExp();
            var vipLv = msg.getVipLevel();
            model.setLevel(Number(lv));
            model.setExp(Number(exp));
            model.setVipLevel(vipLv);
            //初始化服务器时间戳
            GlobalManager.getInstance().setServerTime(Number(msg.getSystemTime()));
            //回到大厅
            var view = new FishMainView();
            var med = new FishMainMediator(view);
            burn.Director.repleaceView(med);
            //清理房间内的数据
            var roomModel = burn.Director.getModelByKey(RoomModel);
            roomModel.clearRoom();
        });
    };
    GlobalManager.prototype.initUserData = function (msg) {
        var model = burn.Director.getModelByKey(UserModel);
        model.init();
        model.setUserId(msg.getId());
        model.setUserName(msg.getName());
        model.setHeadUrl(msg.getIconUrl());
        model.setMoney(msg.getGems());
        model.setCoins(msg.getCoins());
        model.setTicket(msg.getCoupon());
        model.setCurGunID(msg.getMaxGunId());
        model.setBankruptTime(msg.getCanReliefTime());
        model.setEverydayActive(msg.getEverydayActive());
        model.setEveryWeekActive(msg.getEveryWeekActive());
        model.setGuideID(msg.getNewbieGuideId());
        model.setCurSkinId(msg.getBatterySkinId());
        model.setCurGunBgId(msg.getGunrestSkinId());
        model.setTatolChargeRMB(msg.getTotalChargeRMB());
        model.setMonthEndTime(msg.getMonthEndTime());
        model.setTodayFirstLogin(msg.getIsTodayFirstLogin());
        model.setSignObj(msg.getMonthSignActiveInfo());
        model.setIsTodayDraw(msg.getIsTodayDraw());
        model.setInviteCode(msg.getSelfInviteCode());
        //处理充值项
        var chargedGearsMsg = msg.getChargedGears();
        if (chargedGearsMsg.length > 0) {
            var len = chargedGearsMsg.length;
            for (var i = 0; i < len; i++) {
                model.addChargedGears(Number(chargedGearsMsg[i]));
            }
        }
        //处理兑换项
        var exchangedGears = msg.getExchangedGears();
        for (var _i = 0, exchangedGears_1 = exchangedGears; _i < exchangedGears_1.length; _i++) {
            var eVo = exchangedGears_1[_i];
            model.addExchangeGears(eVo);
        }
        var activeInfo = msg.getActiveInfo();
        var conVo = game.table.T_Config_Table.getVoByKey(79);
        var shareTime = Number(conVo.value) - activeInfo.getShareTimes();
        if (shareTime < 0) {
            shareTime = 0;
        }
        model.setShareTimes(shareTime);
        model.setIsFocusFlag(activeInfo.getFocusFlag() == 1);
        if (msg.getNextDayAwardActiveInfo()) {
            model.setCiriState(msg.getNextDayAwardActiveInfo().nextDayAwardState);
        }
        //初始化服务器时间戳
        GlobalManager.getInstance().setServerTime(Number(msg.getSystemTime()));
        //开始心跳
        GlobalManager.getInstance().startHeartbeat();
        //开始日志平台心跳
        GlobalManager.getInstance().startLogHeartBeat();
        //初始化物品列表
        var items = msg.getItemInfo();
        for (var i = 0; i < items.length; i++) {
            var itemId = items[i].itemId;
            var count = items[i].totalCount;
            var vo = game.table.T_Item_Table.getVoByKey(Number(itemId));
            var time = 0;
            if (vo.type == BagItemType.BARBETTE
                || vo.type == BagItemType.BATTERY) {
                time = items[i].expried;
            }
            var item = new game.model.Item(itemId, count, time);
            model.addItem(item);
        }
        //初始化Email列表
        var mailItems = msg.getMailListByType();
        var emailModel = burn.Director.getModelByKey(EmailModel);
        emailModel.init();
        for (var i = 0; i < mailItems.length; i++) {
            var dataObj = mailItems[i].getMails();
            for (var j = 0; j < dataObj.length; j++) {
                var data = dataObj[j];
                var emailItem = new game.model.EmailItem(data.getMailId(), data.getMailType(), data.getUserId(), data.getReceiveUserName(), data.getSendUserId(), data.getSendUserName(), data.getItems(), data.getTime(), data.getState(), data.getMailContent(), data.getMailTitle());
                emailModel.addItem(emailItem);
            }
        }
        //初始化人物信息
        var lv = msg.getRoleLevel();
        var exp = msg.getRoleExp();
        var vipLv = msg.getVipLevel();
        model.setLevel(Number(lv));
        model.setExp(Number(exp));
        model.setVipLevel(vipLv);
        //初始化人物信息
        var tasks = msg.getTaskInfo();
        var taskModel = burn.Director.getModelByKey(TaskModel);
        taskModel.init();
        var taskLen = tasks.length;
        for (var i = 0; i < taskLen; i++) {
            var obj = tasks[i];
            var taskItem = new game.model.TaskItem(obj.taskId, obj.taskStatus, obj.curParameterValue);
            taskModel.addItem(taskItem);
        }
        if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET) {
            burn.net.HttpManager.init("http://gamecenter.combunet.com/LoginServer/weixinShare.action", egret.HttpResponseType.TEXT, egret.HttpMethod.GET, function (httpResp) {
                var model = burn.Director.getModelByKey(UserModel);
                var resp = JSON.parse(httpResp);
                game.platform.PaymentManager.WXConfig(Number(resp.timestamp), resp.noncestr, resp.signature, model.getInviteCode());
            }, function () {
            });
            var userModel = burn.Director.getModelByKey(UserModel);
            var url = window.location.href;
            var urls = url.split("?");
            burn.net.HttpManager.addParam("url", url);
            burn.net.HttpManager.send();
        }
        if (CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
            burn.net.HttpManager.init("http://gamecenter.combunet.com/LoginServer4yiwantang/weixinShare.action", egret.HttpResponseType.TEXT, egret.HttpMethod.GET, function (httpResp) {
                var model = burn.Director.getModelByKey(UserModel);
                var resp = JSON.parse(httpResp);
                game.platform.PaymentManager.WXConfig(Number(resp.timestamp), resp.noncestr, resp.signature, model.getInviteCode());
            }, function () {
            });
            var userModel = burn.Director.getModelByKey(UserModel);
            var url = window["FISHING_CONFIG"]["curURL"];
            burn.net.HttpManager.addParam("url", url);
            burn.net.HttpManager.send();
        }
        //清空房间属性
        var roomModel = burn.Director.getModelByKey(RoomModel);
        roomModel.init();
        //清空活动属性
        var activeModel = burn.Director.getModelByKey(ActiveModel);
        activeModel.init();
        //清空兑换属性
        var exchangeModel = burn.Director.getModelByKey(ExchangeModel);
        exchangeModel.init();
        //清空抽奖属性
        var lotterModel = burn.Director.getModelByKey(LotteryModel);
        lotterModel.init();
    };
    /** 重新连接服务器 */
    GlobalManager.prototype.reConnect2Server = function () {
        var userModel = burn.Director.getModelByKey(UserModel);
        var req = new LoginSendMessage();
        req.initData();
        req.setId(userModel.getUserId());
        req.setAccount(CONFIG.ACCOUNT);
        req.setPlatform(CONFIG.PLATFORM_ID);
        req.setSecret(CONFIG.USER_SECRET);
        NetManager.send(req);
    };
    return GlobalManager;
}());
GlobalManager._instance = null;
GlobalManager.isFirstOpenGame = true;
/** 不同资源资源版本目录 */
GlobalManager.SkinPath = "fish_skins";
GlobalManager.BAN_TIPS = "您的帐号因违规操作，如有疑问请联系官方QQ群179830410";
GlobalManager.SERVER_CLOSED_TIPS = "服务器维护中，请稍后登录。";
__reflect(GlobalManager.prototype, "GlobalManager");
//# sourceMappingURL=GlobalManager.js.map