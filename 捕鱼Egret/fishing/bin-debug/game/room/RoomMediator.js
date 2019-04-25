var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoomMediator = (function (_super) {
    __extends(RoomMediator, _super);
    function RoomMediator(view) {
        var _this = _super.call(this, view) || this;
        //UI是否加载完毕
        _this._loaderOver = false;
        //是否是在使用带头过程中
        _this._isInWarhead = false;
        _this.loadErrorCount = 0;
        _this._arrCloneId = new Array();
        _this._bSendDjsResult = false;
        _this._arrQuickInfo = new Array();
        _this._peopleNum = -1;
        _this._kssEndTime = -1;
        return _this;
    }
    RoomMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        //初始化UI
        this.getView().initView();
        //处理QQ玩吧礼包
        if (CONFIG.PLATFORM_ID == PlatformTypeEnum.QQ_ZONE && !RoomMediator._isOpenWanbaUI) {
            RoomMediator._isOpenWanbaUI = true;
            var giftId = Number(window["FISHING_CONFIG"]["giftId"]);
            if (giftId > 0) {
                game.net.MessageDispatcher.register(game.net.ResponseType.GETWANBAGIFTBACK, function (msg) {
                    var state = msg.getResult();
                    if (state != 0) {
                        var wanbaView = new WanbaGiftView(state, msg.getRewardList());
                        var wanbaMed = new WanbaGiftMeditor(wanbaView);
                        burn.Director.pushView(wanbaMed);
                    }
                });
                var req = new GetWanbaGiftMessage();
                req.initData();
                req.setGiftId(giftId);
                NetManager.send(req);
            }
        }
        setTimeout(function () {
            game.util.LoaderUtil.startFishingSilentLoad();
        }, 5000);
        //添加断线重连监听
        GlobalManager.getInstance().addReconnectListener();
    };
    RoomMediator.prototype.init = function () {
        var _this = this;
        //注册UI加载完成观察者
        this.subscrib(NotifyEnum.ROOM_UI_INIT_END, this.uiLoadEnd);
        //注册开炮观察者
        this.subscrib(NotifyEnum.GUN_SEND, this.gunSend);
        //自己击中鱼时的击中事件
        this.subscrib(NotifyEnum.HIT_FISH, this.hitFishSend);
        //使用道具功能
        this.subscrib(NotifyEnum.USE_PROP_ITEM, this.usePropItemSend);
        //使用弹头道具
        this.subscrib(NotifyEnum.USE_WARHEAD, this.useWarHead);
        //退出房间功能
        this.subscrib(NotifyEnum.CLICK_EXIT_ROOM, this.exitRoom);
        //调整倍率
        this.subscrib(NotifyEnum.RESET_RATE, this.resetGunRate);
        //打开抽奖界面
        this.subscrib(NotifyEnum.OPEN_LOTTERY_UI, this.openLotteryUI);
        //锁定的鱼不存在了，死亡
        this.subscrib(NotifyEnum.LOCKED_FISH_DISAPPEAR, this.lockedFishDisappear);
        //更改锁定个鱼
        this.subscrib(NotifyEnum.LOCKED_FISH_CHANGE, this.changeLockedFish);
        //抽奖界面加载完成
        this.subscrib(NotifyEnum.LOTTERY_UI_LOAD_END, this.showLottery);
        //请求设置道具数量
        this.subscrib(NotifyEnum.SET_PROP_NUM, this.setPropNum);
        //设置解锁炮倍UI内容
        this.subscrib(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED, this.checkGunUpdate);
        //监听救济金状态
        this.subscrib(NotifyEnum.BANKRUPT_MESSAGE, this.bankruptStauts);
        //监听选中鱼的消息
        this.subscrib(NotifyEnum.SEND_CLICK_FISH, this.clickFish);
        //监听查找最新炮倍
        this.subscrib(NotifyEnum.CHECK_GUN_RESET, this.checkGunRest);
        //监听显示查看板
        this.subscrib(NotifyEnum.SHOW_CHAKAN_PANEL, this.showChakan);
        //点击自动开炮按钮
        this.subscrib(NotifyEnum.AUTO_GUN_FIRE, this.autoGunFire);
        //弹出解锁炮倍板子
        this.subscrib(NotifyEnum.GUIDE_OPEN, this.guideOpen);
        this.subscrib(NotifyEnum.GUIDE_CLOSE, this.guideClose);
        //任务引导板子加载结束
        this.subscrib(NotifyEnum.TASK_GUIDE_PANEL_LOADED, this.taskLoaded);
        this.subscrib(NotifyEnum.TASK_GUIDE_CHANGE, this.taskChange);
        this.subscrib(NotifyEnum.TASK_GUIDE_LOAD, this.taskGuideLoad);
        //弹出兑换板子
        this.subscrib(NotifyEnum.POP_EXCHANGE, this.popExchange);
        //更新兑换板子
        this.subscrib(NotifyEnum.POP_UPDATEEXCHANGE, this.updateExchange);
        //大奖赛报名
        this.subscrib(NotifyEnum.SIGN_UP_DJS, this.signUp);
        //大奖赛任务变更
        this.subscrib(NotifyEnum.DJS_TASK_CHANGE, this.djsTasjChange);
        this.subscrib(NotifyEnum.DJS_RESULT_SEND, this.djsResultSend);
        //关闭报名界面
        this.subscrib(NotifyEnum.CLOSE_SIGN_VIEW, this.closeSignView);
        //弹出充值界面
        this.subscrib(NotifyEnum.POP_CHARGE, this.popCharge);
        //修改次日礼包
        this.subscrib(NotifyEnum.POP_CIRI, this.popCiri);
        this.subscrib(NotifyEnum.CLOSE_CIRI, this.closeCiri);
        //凤凰UI变更
        this.subscrib(NotifyEnum.CHANGE_PHOENIX_UI, this.phoenixUI);
        //悬赏任务变更
        this.subscrib(NotifyEnum.PRICE_TASK_CHANGE, this.priceTaskChange);
        //悬赏任务清除
        this.subscrib(NotifyEnum.CLEAR_PRICE_TASK, this.clearPriceTask);
        //悬赏任务失败
        this.subscrib(NotifyEnum.PRICE_CHALLENGE_FAIL, this.priceFail);
        //显示排行信息
        this.subscrib(NotifyEnum.SHOW_PRICE_RANK, this.showPriceRankUI);
        //检查VIP等级对道具的影响
        this.subscrib(NotifyEnum.CHECN_VIP_ITEM, this.checkVipItem);
        //监听华丽版与流程版监听
        this.subscrib(NotifyEnum.UPDATE_GORGEOUS_STATE, this.updateGorgeous);
        //快速赛等待
        game.net.MessageDispatcher.register(game.net.ResponseType.QUICKGAMEINTOROOM, function (msg) {
            _this.quitGameIntoRoom(msg);
        });
        //奖池信息监听消息
        game.net.MessageDispatcher.register(game.net.ResponseType.LOTTERYCONDITONACCUMULATE, function (msg) {
            _this.lotteryDataReceive(msg);
        });
        //监听兑换模型
        game.net.MessageDispatcher.register(game.net.ResponseType.EXCHANGEGOODSBACK, function (msg) {
            _this.exchangeGoodsBack(msg);
        });
        var send = new ExchangeGoodsSendMessage();
        send.initData();
        NetManager.send(send);
        //定义Timer
        this._timer = new egret.Timer(1000, 0);
        //注册事件侦听器
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        //开始计时
        this._timer.start();
        //初始化model对象
        this._userModel = burn.Director.getModelByKey(UserModel);
        this._roomModel = burn.Director.getModelByKey(RoomModel);
        //加载背景音乐
        var rType = this._userModel.getMatchRoomLevel();
        this._bgMusicName = FishUtil.getMusicByRoomType(rType);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.createGroup("currBgMusic", [this._bgMusicName]);
        if (CONFIG.isOpenMusic) {
            RES.loadGroup("currBgMusic");
        }
    };
    RoomMediator.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "currBgMusic") {
            game.util.SoundManager.playBackgroundMusic(this._bgMusicName);
        }
    };
    RoomMediator.prototype.onResourceLoadError = function (event) {
        if (event.groupName == "currBgMusic") {
            console.warn("Group:" + event.groupName + " has failed to load");
            this.loadErrorCount += 1;
            if (this.loadErrorCount < 5) {
                RES.loadGroup(event.groupName);
            }
        }
    };
    /** timer */
    RoomMediator.prototype.timerFunc = function () {
        //清除无用的鱼类
        var roomView = this.getView();
        var fishList = roomView.getFishList();
        var deadList = new Array();
        var len = fishList.length;
        for (var i = 0; i < len; i++) {
            var fish = fishList[i];
            if (fish.getActor().getType() == AddFishType.FISH_GROUP) {
                if (!fish.getActionAlive()) {
                    deadList.push(fish);
                }
                else if (fish.getActor().getFishList().length <= 0) {
                    deadList.push(fish);
                }
            }
            else if (fish.getActor().getType() == AddFishType.FISH || fish.getActor().getType() == AddFishType.CATCH_WHOLE_FISH) {
                if (!fish.getActionAlive()) {
                    deadList.push(fish);
                }
            }
        }
        //移除死鱼
        len = deadList.length;
        for (var i = 0; i < len; i++) {
            var idx = fishList.indexOf(deadList[i]);
            var actionObj = fishList.splice(idx, 1);
            if (actionObj.length > 0) {
                FishingObjPool.getInstance().insertFishPool(actionObj[0].getActor());
                actionObj[0].destory();
                actionObj[0] = null;
            }
        }
        deadList = null;
    };
    //UI加载结束
    RoomMediator.prototype.uiLoadEnd = function (obj, target) {
        var self = target;
        var roomView = target.getView();
        //初始化房间内已经有的鱼和玩家
        target.initInRoomInfo();
        roomView.startRoom();
        game.util.UIUtil.closeLoading();
        //监听玩家开炮消息
        game.net.MessageDispatcher.register(game.net.ResponseType.FISHINGGUNBACK, function (msg) {
            self.gunSendBack(msg);
        });
        //监听服务器加鱼消息
        game.net.MessageDispatcher.register(game.net.ResponseType.ADDFISH, function (msg) {
            self.addFish(msg);
        });
        game.net.MessageDispatcher.register(game.net.ResponseType.PONDFISHES, function (msg) {
            self.pondFish(msg);
        });
        //监听新玩家进入房间
        game.net.MessageDispatcher.register(game.net.ResponseType.INTOROOMBACK, function (msg) {
            self.addPlayerInRoom(msg);
        });
        //监听新玩家退出房间
        game.net.MessageDispatcher.register(game.net.ResponseType.QUITROOM, function (msg) {
            self.quitRoom(msg);
        });
        //监听鱼击中死亡消息
        game.net.MessageDispatcher.register(game.net.ResponseType.FISHINGHITBACK, function (msg) {
            self.fishHitBack(msg);
        });
        //道具使用监听
        game.net.MessageDispatcher.register(game.net.ResponseType.USEITEMBACK, function (msg) {
            self.useItemBack(msg);
        });
        //使用弹头返回监听
        game.net.MessageDispatcher.register(game.net.ResponseType.USEWARHEADBACK, function (msg) {
            self.useWarheadBack(msg);
        });
        //鱼塘状态监听
        game.net.MessageDispatcher.register(game.net.ResponseType.PONDSTATE, function (msg) {
            self.setRoomState(msg.getType(), msg.getFishId(), msg.getUserId());
        });
        //监听更换炮台消息
        game.net.MessageDispatcher.register(game.net.ResponseType.CHANGEGUNBACK, function (msg) {
            self.changeGunBack(msg);
        });
        //监听锁定目标更改的消息
        game.net.MessageDispatcher.register(game.net.ResponseType.USELOCKITEM, function (msg) {
            self.changeLocked(msg);
        });
        //监听锁定、狂暴、分身状态结束消息
        game.net.MessageDispatcher.register(game.net.ResponseType.LOCKITEMEND, function (msg) {
            self.lockedEnd(msg);
        });
        //一网打尽、炸弹鱼、电鳗死亡消息
        game.net.MessageDispatcher.register(game.net.ResponseType.RANDOMFISHHITBACK, function (msg) {
            self.killManyFish(msg);
        });
        //解锁泡杯返回监听消息
        game.net.MessageDispatcher.register(game.net.ResponseType.UPGRADEORFORGEBACK, function (msg) {
            self.updateOrForgeBack(msg);
        });
        //监听玩家升级消息
        game.net.MessageDispatcher.register(game.net.ResponseType.LEVELUP, function (msg) {
            self.levelUp(msg);
        });
        //检测新手任务
        game.net.MessageDispatcher.register(game.net.ResponseType.FINISHTASKBACK, function (msg) {
            self.taskFinishBack(msg);
        });
        //监听大奖赛结算
        game.net.MessageDispatcher.register(game.net.ResponseType.GRANDPRIXSETTLEMENT, function (msg) {
            self.grandPrixSettement(msg);
        });
        //报名大奖赛返回
        game.net.MessageDispatcher.register(game.net.ResponseType.ARENASIGNUPBACK, function (msg) {
            self.signUpBack(msg);
        });
        //大奖赛积分变化
        game.net.MessageDispatcher.register(game.net.ResponseType.GRANDPRIXINFOCHANGE, function (msg) {
            self.grandPrixInfoChange(msg);
        });
        //全民赛积分变化
        game.net.MessageDispatcher.register(game.net.ResponseType.THEPEOPLECHANGE, function (msg) {
            self.thePeopleBack(msg);
        });
        //快速赛信息变化
        game.net.MessageDispatcher.register(game.net.ResponseType.QUICKGAMEINFOCHANGE, function (msg) {
            self.quickGameInfoChange(msg);
        });
        //快速赛信息变化&结算
        game.net.MessageDispatcher.register(game.net.ResponseType.QUICKGAMERANKRESULT, function (msg) {
            self.quickRank(msg);
        });
        //添加世界boss检测消息
        game.net.MessageDispatcher.register(game.net.ResponseType.WORLDBOSSINFOBACK, function (msg) {
            self.worldBossInfo(msg);
        });
        //海盗任务完成
        game.net.MessageDispatcher.register(game.net.ResponseType.PIRATERANKRESULT, function (msg) {
            self.showPriceResult(msg);
        });
        //监听服务器索要时的消息
        game.net.MessageDispatcher.register(game.net.ResponseType.SYNCFISHPOSINFO, function (msg) {
            self.serverFishHandler(msg);
        });
        //收到邮件
        game.net.MessageDispatcher.register(game.net.ResponseType.MAIL, function (msg) {
            self.receiMail(msg);
        });
        var userModle = burn.Director.getModelByKey(UserModel);
        var curId = userModle.getGuideID();
        if (curId == 0) {
            game.util.Guide.checkGuide(GuideTrriger.GunSend);
        }
        var roomType = userModle.getMatchRoomLevel();
        if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom) {
            var roomModel = burn.Director.getModelByKey(RoomModel);
            var roomer = roomModel.getRoomerById(userModle.getUserId());
            if (roomType == RequesetRoomState.DjsRoom) {
                roomView.getRoomUI().setDjsUI(roomView.isFlip());
            }
            else if (roomType == RequesetRoomState.QmsRoom) {
                roomView.getRoomUI().setQmsUI(roomView.isFlip());
            }
            roomView.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), roomView.isFlip()), false);
            if (roomer.getDjsObj().grandPrixBulletNum > 0) {
                target._bSendDjsResult = false;
            }
        }
        else if (game.util.GameUtil.isKss(roomType)) {
            roomView.getRoomUI().setKssUI(roomView.isFlip());
            //添加等待UI
            var viewKssWait = new KssWaitView(roomType - 7);
            var med = new KssWaitMediator(viewKssWait);
            burn.Director.pushView(med);
            if (target._peopleNum != -1) {
                burn._Notification_.send(NotifyEnum.CHANGE_WAIT_PEOPLE, { num: target._peopleNum });
            }
            // if (target._kssEndTime != -1) {
            //     (roomView.getRoomUI() as DajiangsaiRoomUI).startKssTime(target._kssEndTime);
            // }
            if (target._peopleNum >= 8) {
                var view = target.getView();
                if (view.getRoomUI()) {
                    view.getRoomUI().startKssTime(target._kssEndTime);
                }
                //如果是第二次进入快速赛。则不显示321go
                var roomer = target._roomModel.getRoomerById(target._userModel.getUserId());
                if (roomer) {
                    var num = roomer.getDjsObj().grandPrixBulletNum;
                    if (num >= 600) {
                        game.util.GameUtil.play321Go(view.getRoomUI(), function () {
                            console.log("#---------------------------");
                        });
                    }
                }
            }
        }
        if (roomType == RequesetRoomState.QmsRoom || game.util.GameUtil.isKss(roomType)) {
            //更新房间内玩家子弹显示
            target.subscrib(NotifyEnum.UPDATE_ROOM_UI_BULLETS, target.updateRoomUIBullets);
        }
        else {
            //更新房间内玩家金币显示
            target.subscrib(NotifyEnum.UPDATE_ROOM_UI_COINS, target.updateRoomUICoins);
        }
        //更新房间内玩家钻石显示
        target.subscrib(NotifyEnum.UPDATE_ROOM_UI_MONEY, target.updateRoomUIMoney);
        //如果是快速赛,清空原有数据
        if (game.util.GameUtil.isKss(roomType)) {
            this._arrQuickInfo = new Array();
        }
        //初始化积分
        //更新所有人的积分
        if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom || game.util.GameUtil.isKss(roomType)) {
            var roomerList = target._roomModel.getRoomerList();
            var myPos = target._roomModel.getRoomerById(target._userModel.getUserId()).getRoomPos();
            var isFlip = roomView.isFlip();
            for (var i = 0; i < roomerList.length; i++) {
                if (roomerList[i].getRoomPos() != myPos) {
                    //初始化积分
                    roomView.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomerList[i].getRoomPos(), isFlip), true);
                    roomView.getRoomUI().setDjsScoreByPos(RoomUtil.getPosByFlip(roomerList[i].getRoomPos(), isFlip), roomerList[i].getDjsObj().grandPrixIntegral);
                }
                else {
                    roomView.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomerList[i].getRoomPos(), isFlip), false);
                    roomView.getRoomUI().updateDjsScore(roomerList[i].getDjsObj().grandPrixIntegral);
                }
            }
            //全民赛，大奖赛，没报名进入直接弹出报名界面
            if (!game.util.GameUtil.isKss(roomType)) {
                var roomer = target._roomModel.getRoomerById(userModle.getUserId());
                if (roomer.getDjsObj().grandPrixSignUp == 0) {
                    //弹出报名界面
                    roomView.getRoomUI().openArenaSignView();
                }
            }
        }
        burn._Notification_.send(NotifyEnum.CHANGE_PHOENIX_UI);
        burn._Notification_.send(NotifyEnum.PRICE_TASK_CHANGE);
        var bShowExchange = true;
        if (CONFIG.openGuide) {
            var guideOver = game.table.T_Config_Table.getVoByKey(49).value;
            var curID = target._userModel.getGuideID();
            var strOver = guideOver.split(",");
            for (var i = 0; i < strOver.length; i++) {
                if (curID < Number(strOver[i])) {
                    bShowExchange = false;
                    break;
                }
            }
        }
        if (!target._userModel.bOpenedExchangeUI && bShowExchange) {
            if (!game.util.GameUtil.isKss(roomType)) {
                var exchangeView = new ExchangeView();
                var exchangeMed = new ExchangeMediator(exchangeView);
                burn.Director.pushView(exchangeMed);
                target._userModel.bOpenedExchangeUI = true;
            }
        }
        //开启家广播
        target._timerBroad = new egret.Timer(1000 * 60 * 2, 1);
        target._timerBroad.addEventListener(egret.TimerEvent.TIMER, target.broadCast, target);
        target._timerBroad.start();
    };
    RoomMediator.prototype.broadCast = function () {
        this._timerBroad.removeEventListener(egret.TimerEvent.TIMER, this.broadCast, this);
        this._timerBroad = null;
        this._timerBroad = new egret.Timer(1000 * 60 * 2, 1);
        this._timerBroad.addEventListener(egret.TimerEvent.TIMER, this.broadCast, this);
        this._timerBroad.start();
        var fakeStr = game.table.T_Config_Table.getVoByKey(85);
        var fakeArr = fakeStr.value.split(",");
        var tempIdx = Math.ceil(Math.random() * (fakeArr.length - 1));
        var txt = game.util.Language.getText(Number(fakeArr[tempIdx]));
        game.util.GCBroadcastManager.addRoomBroadcast(txt, 3);
        if (GlobalManager.getInstance().trumpetMsgList.length > 20) {
            GlobalManager.getInstance().trumpetMsgList.shift();
        }
        GlobalManager.getInstance().trumpetMsgList.unshift(txt);
    };
    //报名
    RoomMediator.prototype.signUp = function (obj, target) {
        var userModel = burn.Director.getModelByKey(UserModel);
        var roomModel = burn.Director.getModelByKey(RoomModel);
        var roomer = roomModel.getRoomerById(userModel.getUserId());
        var view = target.getView();
        view.setAutoGunFire(true);
        if (roomer.getDjsObj().grandPrixSignUp != 0) {
            //提示。
            return;
        }
        var roomType = userModel.getMatchRoomLevel();
        if (roomer.getDjsObj().todayGrandPrixTimes > 0) {
            //判断报名费够不够
            var goldStr = game.table.T_Config_Table.getVoByKey(62).value;
            var goldNum_1 = Number(goldStr.split("_")[1]);
            var flafMoney = game.util.GameUtil.isEnough(CurrencyEnum.MONEY, goldNum_1, false);
            if (!flafMoney && roomer.getDjsObj().todayGrandPrixTimes != 0) {
                //钱不够
                game.util.GameUtil.openConfirmByTwoButton(null, function () {
                    game.util.GameUtil.isEnough(CurrencyEnum.MONEY, goldNum_1);
                }, this, game.util.Language.getText(206));
                // game.util.GameUtil.popTips(game.util.Language.getText(139));
                return;
            }
            var str = ""; //155
            if (roomType == RequesetRoomState.DjsRoom) {
                str = game.util.Language.getText(140);
            }
            else if (roomType == RequesetRoomState.QmsRoom) {
                str = game.util.Language.getText(155);
            }
            game.util.GameUtil.openConfirmByTwoButton(null, function () {
                var send = new ArenaSignUpSendMessage();
                send.initData();
                send.setType(roomType);
                NetManager.send(send);
            }, this, str);
        }
        else {
            //免费
            var send = new ArenaSignUpSendMessage();
            send.initData();
            send.setType(roomType);
            NetManager.send(send);
        }
    };
    //悬赏任务变更
    RoomMediator.prototype.priceTaskChange = function (obj, target) {
        var taskModel = target.getModel(TaskModel);
        var taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
        if (taskList.length == 0) {
            //没有任务
            //干掉
            return;
        }
        var view = target.getView();
        var roomUI = view.getRoomUI();
        if (!roomUI) {
            return;
        }
        roomUI.changePriceTask();
    };
    //悬赏任务失败
    RoomMediator.prototype.priceFail = function (obj, target) {
        var view = target.getView();
        var roomUI = view.getRoomUI();
        if (!roomUI) {
            return;
        }
        roomUI.showPriceFail();
    };
    //清除悬赏任务
    RoomMediator.prototype.clearPriceTask = function (obj, target) {
        var taskModel = target.getModel(TaskModel);
        var taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
        if (taskList.length == 0) {
            return;
        }
        var view = target.getView();
        var roomUI = view.getRoomUI();
        roomUI.clearPriceTask();
        roomUI.clearPriceRank();
        var len = taskList.length;
        for (var i = 0; i < len; i++) {
            taskModel.removeItem(taskList[i].getTaskID());
        }
    };
    //显示悬赏第几名排行
    RoomMediator.prototype.showPriceRankUI = function (obj, target) {
        var taskModel = target.getModel(TaskModel);
        var taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
        if (taskList.length == 0) {
            return;
        }
        var userId = Number(obj.userId);
        var rank = Number(obj.rank);
        var view = target.getView();
        var roomer = target._roomModel.getRoomerById(userId);
        if (!roomer) {
            return;
        }
        view.getRoomUI().showPriceRank(roomer.getRoomPos(), view.isFlip(), rank);
    };
    //结算海盗悬赏
    RoomMediator.prototype.showPriceResult = function (msg) {
        var type = msg.getType(); //0比赛中，1比赛结束，给第一名奖励
        if (type == 0) {
            var rankArr = msg.getRank();
            var len = rankArr.length;
            for (var i = 0; i < len; i++) {
                var userId = rankArr[i].getUserId();
                var rank = rankArr[i].getRank();
                burn._Notification_.send(NotifyEnum.SHOW_PRICE_RANK, { userId: userId, rank: rank });
            }
            return;
        }
        if (type == 1) {
            //清空排行
            var view = this.getView();
            view.getRoomUI().clearPriceRank();
            //情况任务数据
            burn._Notification_.send(NotifyEnum.CLEAR_PRICE_TASK);
            //掉落
            var award = msg.getAward();
            var userId = msg.getRank()[0].getUserId();
            var roomer = this._roomModel.getRoomerById(userId);
            var item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
            var to = new egret.Point(item.x, item.y);
            if (to.y > 360) {
                to.y = 670;
            }
            else {
                to.y = 50;
            }
            game.util.GameUtil.flyItems(award.getCount(), award.getItemId(), new egret.Point(640, 0), new egret.Point(to.x, to.y), view.getRoomUI(), userId);
            if (userId != this._userModel.getUserId()) {
                burn._Notification_.send(NotifyEnum.PRICE_CHALLENGE_FAIL);
            }
            else {
                this._userModel.updateItem(award.getItemId(), award.getCount());
            }
        }
    };
    //检查vip对道具状态变更
    RoomMediator.prototype.checkVipItem = function (obj, target) {
        var vipLv = target._userModel.getVipLevel();
        var view = target.getView();
        var roomUI = view.getRoomUI();
        var lockedRageLv = game.table.T_Config_Table.getVoByKey(34).value.split("_")[0];
        if (vipLv >= Number(lockedRageLv)) {
            roomUI.getSidePropUI().buttonRageNN.lockedImg.visible = false;
        }
        var lockedCloneLv = game.table.T_Config_Table.getVoByKey(35).value.split("_")[0];
        if (vipLv >= Number(lockedCloneLv)) {
            roomUI.getSidePropUI().buttonCloneNN.lockedImg.visible = false;
        }
        var minVipLv = game.table.T_Config_Table.getVoByKey(83).value;
        if (vipLv >= Number(minVipLv)) {
            roomUI.getNuclearBtn().lockedImg.visible = false;
        }
    };
    //更新华丽版和流畅版状态
    RoomMediator.prototype.updateGorgeous = function (obj, target) {
        var view = target.getView();
        //判断波光粼粼效果
        view.addBoguang();
        //更新背景气泡特效
        view.updateStageBubble();
    };
    //大奖赛任务变更
    RoomMediator.prototype.djsTasjChange = function (obj, target) {
        var taskModel = target.getModel(TaskModel);
        var taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX);
        if (taskList.length == 0) {
            //没有任务
            return;
        }
        var view = target.getView();
        var roomUI = view.getRoomUI();
        roomUI.setDjsTask(Number(obj.times));
    };
    RoomMediator.prototype.djsResultSend = function (obj, target) {
        if (target._bSendDjsResult) {
            return;
        }
        var send1 = new GrandPrixSettlementSendMessage();
        send1.initData();
        send1.setRoomtType(target._userModel.getMatchRoomLevel());
        NetManager.send(send1);
        target._bSendDjsResult = true;
        var view = target.getView();
        view.getRoomUI().clearTask();
    };
    //关闭报名界面
    RoomMediator.prototype.closeSignView = function (obj, target) {
        var view = target.getView();
        var roomUI = view.getRoomUI();
        roomUI._bOpenSignView = false;
    };
    //设置道具数量
    RoomMediator.prototype.setPropNum = function (obj, target) {
        var roomView = target.getView();
        //获取各种道具
        var frozenItem = target._userModel.getItemById(PropEnum.FROZEN);
        var lockItem = target._userModel.getItemById(PropEnum.LOCK);
        var cloneItem = target._userModel.getItemById(PropEnum.CLONE);
        var rageItem = target._userModel.getItemById(PropEnum.RAGE);
        var calabashItem = target._userModel.getItemById(PropEnum.CALABASH);
        var goldItem = target._userModel.getItemById(PropEnum.GOLD_WARHEAD);
        var silverItem = target._userModel.getItemById(PropEnum.SILVER_WARHEAD);
        var bronzeItem = target._userModel.getItemById(PropEnum.BRONZE_WARHEAD);
        var nucleareItem = target._userModel.getItemById(PropEnum.NUCLEAR_WARHEAD);
        var roomType = target._userModel.getMatchRoomLevel();
        if (roomType == RequesetRoomState.QmsRoom) {
            rageItem = target._userModel.getItemById(PropEnum.FREE_RAGE);
            cloneItem = target._userModel.getItemById(PropEnum.FREE_CLONE);
        }
        var frozenNum = 0;
        var lockNum = 0;
        var cloneNum = 0;
        var rageNum = 0;
        var calabashNum = 0;
        var goldNum = 0;
        var silverNum = 0;
        var bronzeNum = 0;
        var nucleareNum = 0;
        if (frozenItem) {
            frozenNum = frozenItem.getCount();
        }
        if (lockItem) {
            lockNum = lockItem.getCount();
        }
        if (cloneItem) {
            cloneNum = cloneItem.getCount();
        }
        if (rageItem) {
            rageNum = rageItem.getCount();
        }
        if (calabashItem) {
            calabashNum = calabashItem.getCount();
        }
        if (goldItem) {
            goldNum = goldItem.getCount();
        }
        if (silverItem) {
            silverNum = silverItem.getCount();
        }
        if (bronzeItem) {
            bronzeNum = bronzeItem.getCount();
        }
        if (nucleareItem) {
            nucleareNum = nucleareItem.getCount();
        }
        //初始化道具数量
        roomView.setPropNum(frozenNum, lockNum, cloneNum, rageNum, calabashNum, goldNum, silverNum, bronzeNum, nucleareNum);
    };
    //发送开炮请求
    RoomMediator.prototype.gunSend = function (obj, target) {
        this._isGun = true;
        var roomType = target._userModel.getMatchRoomLevel();
        target._loaderOver = true;
        var req = game.util.ProtobufUtil.getInstance().getGunSend();
        req.setAngle(Number(obj.angle));
        req.setGunIndex(Number(obj.gunIndex));
        req.setBulletId(obj.bulletId);
        NetManager.send(req);
        var roomer = target._roomModel.getRoomerById(target._userModel.getUserId());
        var view = target.getView();
        if (roomType != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(roomType)) {
            //处理消耗金币UI显示
            var coins = target._userModel.getCoins();
            var gunRate = roomer.getGunRate();
            var gunRateVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
            var costCoin = gunRateVo.bulletNum;
            if (view.getRage()) {
                var vipLv = target._userModel.getVipLevel();
                // 2_5
                var data = game.table.T_Config_Table.getVoByKey(34).value;
                var datas = data.split("_");
                var min = Number(datas[0]);
                var max = Number(datas[1]);
                if (vipLv >= min && vipLv < max) {
                    costCoin *= 2;
                }
                else if (vipLv >= max) {
                    costCoin *= 3;
                }
            }
            if (coins >= costCoin) {
                var temp = coins - costCoin;
                target._userModel.setCoins(temp);
                //更新UI显示
                view.setRoomerCoins(roomer.getRoomPos(), temp);
                //播放开炮音效
                game.util.SoundManager.playSoundEffect("gunFire_mp3");
            }
            else {
                if (view.getRage() && target._userModel.getCoins() > 0) {
                    var temp = 0;
                    target._userModel.setCoins(temp);
                    //更新UI显示
                    view.setRoomerCoins(roomer.getRoomPos(), temp);
                    //播放开炮音效
                    game.util.SoundManager.playSoundEffect("gunFire_mp3");
                }
            }
        }
        //如果是大奖赛。扣除子弹数
        if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom || game.util.GameUtil.isKss(roomType)) {
            //扣除子弹。更新子弹数量
            if (roomer.getDjsObj()) {
                roomer.getDjsObj().grandPrixBulletNum--;
                if (roomer.getDjsObj().grandPrixBulletNum <= 0) {
                    roomer.getDjsObj().grandPrixBulletNum = 0;
                }
                view.getRoomUI().updateDjdBulletNum(roomer.getDjsObj().grandPrixBulletNum);
                //只有快速赛显示自己的子弹
                if (game.util.GameUtil.isKss(roomType)) {
                    view.setRoomerBullet(roomer.getRoomPos(), roomer.getDjsObj().grandPrixBulletNum);
                }
            }
            if (roomType == RequesetRoomState.QmsRoom || game.util.GameUtil.isKss(roomType)) {
                burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_BULLETS, { userId: roomer.getUserId() });
            }
        }
        //
        game.util.Guide.checkGuide(GuideTrriger.GunSend);
        if (game.util.Guide.gunSendTimes >= 16) {
            game.util.Guide.checkGuide(GuideTrriger.GunSendTimes);
            return;
        }
        game.util.Guide.gunSendTimes++;
    };
    //自己击中鱼时的击中事件
    RoomMediator.prototype.hitFishSend = function (obj, target) {
        var req = game.util.ProtobufUtil.getInstance().getHitSend();
        req.setFishId(obj.fId);
        req.setBulletId(obj.bId);
        NetManager.send(req);
    };
    //使用弹头选中鱼
    RoomMediator.prototype.clickFish = function (obj, target) {
        if (!target._isInWarhead) {
            return;
        }
        var view = target.getView();
        var fish = RoomUtil.getFishById(view.getFishList(), Number(obj));
        if (!fish) {
            return;
        }
        var fishVo = game.table.T_Fish_Table.getVoByKey(fish.getFishId());
        if (fishVo.functionType != 2) {
            game.util.GameUtil.popTips(game.util.Language.getText(44));
            return;
        }
        var lastId = view.getInHandWarHeadFish();
        var lastFish = RoomUtil.getFishById(view.getFishList(), Number(lastId));
        if (lastFish) {
            lastFish.removeEffect("locked");
            lastFish.removeEffect("WarHeadLocked");
        }
        view.setInHandWarheadFish(Number(obj));
        if (fish) {
            game.util.GameUtil.setLockedEffect(fish, "locked", "locked_circle_png");
        }
    };
    //使用弹头道具 
    RoomMediator.prototype.useWarHead = function (obj, target) {
        if (target._isInWarhead) {
            game.util.GameUtil.popTips(game.util.Language.getText(10));
            return;
        }
        var view = target.getView();
        if (!view.getRoomUI().goldBulletBtn.isClick()
            || !view.getRoomUI().silverBulletBtn.isClick()
            || !view.getRoomUI().bronzeBulletBtn.isClick()
            || !view.getRoomUI().nuclearBulletBtn.isClick()) {
            game.util.GameUtil.popTips(game.util.Language.getText(10));
            return;
        }
        if (view.getLocked()) {
            game.util.GameUtil.popTips(game.util.Language.getText(74));
            return;
        }
        if (view.getRage()) {
            game.util.GameUtil.popTips(game.util.Language.getText(75));
            return;
        }
        if (view.getClone()) {
            game.util.GameUtil.popTips(game.util.Language.getText(76));
            return;
        }
        //首先检测身上是否存在该弹头
        var warItem = target._userModel.getItemById(Number(obj));
        var warId = Number(obj);
        var warNum = 0;
        if (warItem) {
            warNum = warItem.getCount();
        }
        if (warNum == 0) {
            if (warId == PropEnum.NUCLEAR_WARHEAD) {
                var minValue = game.table.T_Config_Table.getVoByKey(41).value;
                var userModel = target.getModel(UserModel);
                var cunGunId = userModel.getCurGunID();
                var bulletNum = game.table.T_Gun_Table.getVoByKey(cunGunId).bulletNum;
                if (bulletNum < Number(minValue)) {
                    //炮倍不足
                    game.util.GameUtil.popTips(game.util.Language.getText(129));
                    return;
                }
                else {
                    var nuclearVo = game.table.T_Item_Table.getVoByKey(PropEnum.NUCLEAR_WARHEAD);
                    var gemNum = Number(nuclearVo.worth.split('_')[2]);
                    var flag = game.util.GameUtil.isEnough(CurrencyEnum.MONEY, gemNum);
                    if (!flag) {
                        //钱不足
                        game.util.GameUtil.popTips(game.util.Language.getText(130));
                        return;
                    }
                }
            }
            else {
                game.util.GameUtil.popTips(game.util.Language.getText(42));
                return;
            }
        }
        target._isInWarhead = true;
        if (target._warTimer) {
            target._warTimer.stop();
            target._warTimer = null;
        }
        //检查鱼池中是否有奖金鱼
        var bonusFish = RoomUtil.getBonusFish(view.getFishList());
        if (bonusFish.length > 0) {
            view.setInHandWarheadFish(bonusFish[0].getUniqId());
            view.setSelectFishState(true);
        }
        else {
            game.util.GameUtil.popTips(game.util.Language.getText(5));
            target._isInWarhead = false;
            return;
        }
        //
        target.warDisPlay = new egret.DisplayObjectContainer();
        var label = new egret.TextField();
        label.size = 35;
        label.text = game.util.Language.getText(43);
        label.anchorOffsetX = label.width / 2;
        label.anchorOffsetY = label.height / 2;
        label.textAlign = egret.HorizontalAlign.CENTER;
        var txtr = RES.getRes("tipBg_png"); //43,0,0,44
        var img = new egret.Bitmap(txtr);
        img.scaleX = 1.2;
        img.scaleY = 1.2;
        img.width = label.width + 70;
        img.anchorOffsetX = img.width / 2;
        img.anchorOffsetY = img.height / 2;
        target.warDisPlay.addChild(img);
        target.warDisPlay.addChild(label);
        view.getBulletLayer().addChild(target.warDisPlay);
        target.warDisPlay.x = CONFIG.contentWidth / 2 + CONFIG.adaptX;
        target.warDisPlay.y = CONFIG.contentHeight / 2 + CONFIG.adaptY - 100;
        var warHeadID = Number(obj);
        target.warId = warHeadID;
        if (warHeadID == PropEnum.GOLD_WARHEAD) {
            view.getRoomUI().goldBulletBtn.startBtnTick();
        }
        else if (warHeadID == PropEnum.SILVER_WARHEAD) {
            view.getRoomUI().silverBulletBtn.startBtnTick();
        }
        else if (warHeadID == PropEnum.BRONZE_WARHEAD) {
            view.getRoomUI().bronzeBulletBtn.startBtnTick();
        }
        else if (warHeadID == PropEnum.NUCLEAR_WARHEAD) {
            view.getRoomUI().nuclearBulletBtn.startBtnTick();
        }
        target._warTimer = new egret.Timer(1000, 3);
        target.countDown = 3;
        //注册事件侦听器
        target._warTimer.addEventListener(egret.TimerEvent.TIMER, target.warFun, target);
        target._warTimer.start();
    };
    RoomMediator.prototype.warFun = function () {
        var target = this;
        var view = target.getView();
        var bonusFish = RoomUtil.getBonusFish(view.getFishList());
        if (bonusFish.length > 0) {
            view.setSelectFishState(true);
            view.showNum(target.countDown);
            for (var i = 0; i < bonusFish.length; i++) {
                var locked = null;
                if (view.getInHandWarHeadFish() == bonusFish[i].getUniqId()) {
                    game.util.GameUtil.setLockedEffect(bonusFish[i], "locked", "locked_circle_png", true);
                }
                else {
                    // if (i ==0 && view.getInHandWarHeadFish() == -1) {
                    // } else {
                    // }
                    game.util.GameUtil.setLockedEffect(bonusFish[i], "locked", "locked_png", true);
                }
            }
            target.countDown--;
            if (target.countDown <= 0) {
                target._warTimer.removeEventListener(egret.TimerEvent.TIMER, target.warFun, target);
                view.getBulletLayer().removeChild(target.warDisPlay);
                var send = new UseWarheadSendMessage();
                send.initData();
                send.setItemId(target.warId);
                send.setUniId(view.getInHandWarHeadFish());
                NetManager.send(send);
                game.util.SoundManager.playEffectSound("ddz25");
                for (var i = 0; i < bonusFish.length; i++) {
                    bonusFish[i].removeEffect("locked");
                }
                view.setSelectFishState(false);
                target._isInWarhead = false;
            }
        }
        else {
            //没有奖金鱼，不能使用弹头。
            game.util.GameUtil.popTips(game.util.Language.getText(5));
            this._warTimer.stop();
            this._warTimer = null;
            view.setSelectFishState(false);
            target._isInWarhead = false;
            view.getBulletLayer().removeChild(target.warDisPlay);
            var warHeadID = target.warId;
            if (warHeadID == PropEnum.GOLD_WARHEAD) {
                view.getRoomUI().goldBulletBtn.stopBtnTick();
            }
            else if (warHeadID == PropEnum.SILVER_WARHEAD) {
                view.getRoomUI().silverBulletBtn.stopBtnTick();
            }
            else if (warHeadID == PropEnum.BRONZE_WARHEAD) {
                view.getRoomUI().bronzeBulletBtn.stopBtnTick();
            }
            else if (warHeadID == PropEnum.NUCLEAR_WARHEAD) {
                view.getRoomUI().nuclearBulletBtn.stopBtnTick();
            }
            var rbonusFish = RoomUtil.getBonusFish(view.getFishList());
            for (var i = 0; i < rbonusFish.length; i++) {
                rbonusFish[i].removeEffect("locked");
            }
        }
    };
    //使用弹头消息返回
    RoomMediator.prototype.useWarheadBack = function (msg) {
        var view = this.getView();
        RoomUtil.shakeWindow(view);
        game.util.GameUtil.bobmHexEffect(view.getBulletLayer(), function (msg, view) {
            game.util.SoundManager.playEffectSound("cycle_bomb");
            var fishUid = msg.getUniId();
            var userId = msg.getUserId();
            var coins = msg.getAddCoins();
            var roomer = this._roomModel.getRoomerById(userId);
            var item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
            var to = new egret.Point(item.x, item.y);
            if (to.y > 360) {
                to.y = 670;
            }
            else {
                to.y = 50;
            }
            //userId 和自己不匹配。不显示暴富特效
            if (userId == this._userModel.getUserId()) {
                var dropX = CONFIG.contentWidth / 2;
                var dropY = CONFIG.contentHeight / 2;
                var data = RES.getRes("ef_baojinbi_json");
                var txtr = RES.getRes("ef_baojinbi_png");
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var goldIcon = new MovieFish(mcFactory.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
                goldIcon.initEvent();
                // goldIcon.blendMode = egret.BlendMode.ADD;
                goldIcon.scaleX = 2.3;
                goldIcon.scaleY = 2.3;
                goldIcon.frameRate = 12;
                //goldIcon.gotoAndPlay("play", 1);
                goldIcon.visible = false;
                var dataMc = goldIcon.movieClipData;
                var frameCur = 0;
                var Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
                goldIcon.anchorOffsetX = (goldIcon.width >> 1) + Rect.x;
                goldIcon.anchorOffsetY = (goldIcon.height >> 1) + Rect.y;
                goldIcon.frameRate = 12;
                goldIcon.x = dropX;
                goldIcon.y = dropY;
                var parent_1 = view.getBulletLayer();
                parent_1.addChild(goldIcon);
                //播放一个圆盘
                game.util.FrameUtil.playCaipan(view, roomer, coins, "-1", true);
                setTimeout(function () {
                    game.util.GameUtil.baoFuEffect(coins, view.getBulletLayer());
                }, 800);
            }
            //使用完弹头。清除破产状态
            view.removeBankrupt(roomer.getRoomPos());
            roomer.setBankrupt(false);
        }, this, msg, view);
        var fishUid = msg.getUniId();
        var userId = msg.getUserId();
        var coins = msg.getAddCoins();
        var roomer = this._roomModel.getRoomerById(userId);
        var item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        var to = new egret.Point(item.x, item.y);
        if (to.y > 360) {
            to.y = 670;
        }
        else {
            to.y = 50;
        }
        setTimeout(function () {
            RoomUtil.fishDeadHandler(view.getFishList(), fishUid, userId, to, [{ itemId: 10001, count: coins }], view.getRoomUI(), view);
        }, 800);
    };
    //道具使用
    RoomMediator.prototype.usePropItemSend = function (obj, target) {
        var userModel = burn.Director.getModelByKey(UserModel);
        var roomType = userModel.getMatchRoomLevel();
        if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom) {
            var roomModel = burn.Director.getModelByKey(RoomModel);
            var roomer = roomModel.getRoomerById(userModel.getUserId());
            if (roomer.getDjsObj().grandPrixSignUp == 0) {
                //提示不能使用道具
                game.util.GameUtil.popTips(game.util.Language.getText(141));
                return;
            }
        }
        //快速赛不能使用分身狂暴
        if (game.util.GameUtil.isKss(roomType)) {
            if (Number(obj) == PropEnum.RAGE || Number(obj) == PropEnum.CLONE) {
                game.util.GameUtil.popTips(game.util.Language.getText(160));
                return;
            }
        }
        //世界Boss 在池塘中。不能使用葫芦
        var phoenixObj = target._roomModel.getPhoenix();
        if (phoenixObj) {
            if (phoenixObj.getState() == Phoenix_State.Ing) {
                if (Number(obj) == PropEnum.CALABASH) {
                    game.util.GameUtil.popTips(game.util.Language.getText(159));
                    return;
                }
            }
        }
        if (CONFIG.openGuide) {
            var guideOver = game.table.T_Config_Table.getVoByKey(49).value;
            var curID = userModel.getGuideID();
            if (curID < Number(guideOver)) {
                var itemLock = game.table.T_Config_Table.getVoByKey(47).value;
                var param = itemLock.split("_");
                if (curID >= Number(param[0]) && curID <= Number(param[1])) {
                    game.util.GameUtil.popTips("请先进行完新手引导");
                    return;
                }
            }
        }
        var itemId = Number(obj);
        if (itemId == PropEnum.LOCK || itemId == PropEnum.RAGE || itemId == PropEnum.CLONE) {
            var userId = target._userModel.getUserId();
            var roomer = target._roomModel.getRoomerById(userId);
            if (roomer.getBankrupt()) {
                game.util.GameUtil.popTips(game.util.Language.getText(2));
                return;
            }
        }
        if (target._isInWarhead) {
            if (true) {
                game.util.GameUtil.popTips(game.util.Language.getText(45));
                return;
            }
        }
        if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
            if (Number(obj) == PropEnum.RAGE) {
                obj = PropEnum.FREE_RAGE;
            }
            else if (Number(obj) == PropEnum.CLONE) {
                obj = PropEnum.FREE_CLONE;
            }
        }
        var view = target.getView();
        var send = new UseItemSendMessage();
        send.initData();
        send.setItemId(obj);
        NetManager.send(send);
    };
    //使用道具返回
    RoomMediator.prototype.useItemBack = function (msg) {
        var view = this.getView();
        var userId = msg.getUserId();
        var state = msg.getState();
        if (state != 1) {
            //game.util.GameUtil.popTips(game.util.Language.getText(12));
            if (state == UseItemFail.USE_ITEM_NO_ITEM_NO_MONEY) {
                game.util.GameUtil.popTips(game.util.Language.getText(82));
            }
            else if (state == UseItemFail.USE_ITEM_NO_VIP_LEVEL) {
                game.util.GameUtil.popTips(game.util.Language.getText(83));
            }
            else if (state == UseItemFail.USE_ITEM_LOCK_CONFLICT) {
                game.util.GameUtil.popTips(game.util.Language.getText(84));
            }
            else if (state == UseItemFail.USE_ITEM_BEFORE_TIDE) {
                game.util.GameUtil.popTips(game.util.Language.getText(85));
            }
            else if (state == UseItemFail.USE_ITEM_SCORE_TOO_SMALL_USE_TOKEN) {
                game.util.GameUtil.popTips(game.util.Language.getText(87));
            }
            else if (state == UseItemFail.USE_ITEM_ALIVE_FISHES_TOO_MUCH) {
                game.util.GameUtil.popTips(game.util.Language.getText(88));
            }
            //*/
            return;
        }
        var roomer = this._roomModel.getRoomerById(userId);
        //获取使用的道具id
        var itemId = msg.getItemId();
        //
        if (userId == this._userModel.getUserId()) {
            var itemNum = 0;
            var item = this._userModel.getItemById(itemId);
            if (item) {
                itemNum = item.getCount();
            }
            if (itemNum == 0) {
                //扣钻石
                var itemVo = game.table.T_Item_Table.getVoByKey(itemId);
                var cost = Number(itemVo.worth.split('_')[2]);
                if (this._userModel.getMoney() >= cost) {
                    this._userModel.setMoney(this._userModel.getMoney() - cost);
                    burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userId });
                }
            }
        }
        if (itemId == PropEnum.RAGE || itemId == PropEnum.FREE_RAGE) {
            roomer.setIsRage(true);
            view.setRageEffect(true, roomer.getRoomPos());
            if (userId == this._userModel.getUserId()) {
                burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
                view.getRoomUI().getSidePropUI().buttonRageNN.startBtnTick();
                view.setRage(true);
                //自己狂暴开始
                if (!view.getLocked() && !view.getClone()) {
                    //走一遍锁定逻辑
                    var roomer_1 = this._roomModel.getRoomerById(userId);
                    //view.setLockedPos(roomer.getRoomPos());
                    var fish = RoomUtil.getMaxScoreFish(view.getFishList());
                    //view.setLocked(fish.getUniqId());
                    var arrLocked = new Array();
                    arrLocked.push(fish.getUniqId());
                    var obj = new LockedObj(arrLocked, roomer_1.getRoomPos(), userId);
                    view.setLockedObj(obj);
                    if (userId == this._userModel.getUserId()) {
                        game.util.GameUtil.setLockedEffect(fish, "locked", "locked_circle_png", true);
                        view.send(NotifyEnum.LOCKED_FISH_CHANGE, { fishId: fish.getUniqId(), gunIndex: 0 });
                    }
                }
            }
            else {
                //其他人狂暴开始
                if (!roomer.getIsLock() && !roomer.getIsClone()) {
                    var fish = RoomUtil.getMaxScoreFish(view.getFishList());
                    var arrLocked = new Array();
                    arrLocked.push(fish.getUniqId());
                    var obj = new LockedObj(arrLocked, roomer.getRoomPos(), userId);
                    view.setLockedObj(obj);
                }
            }
        }
        else if (itemId == PropEnum.LOCK) {
            var fish = RoomUtil.getMaxScoreFish(view.getFishList());
            if (!fish) {
                return;
            }
            roomer.setIsLock(true);
            view.setLockedEffect(true, roomer.getRoomPos());
            //view.setLockedPos(roomer.getRoomPos());
            //view.setLocked(fish.getUniqId());
            var arrLocked = new Array();
            arrLocked.push(fish.getUniqId());
            var obj = new LockedObj(arrLocked, roomer.getRoomPos(), userId);
            view.setLockedObj(obj);
            if (userId == this._userModel.getUserId()) {
                burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
                game.util.GameUtil.setLockedEffect(fish, "locked", "locked_circle_png", true);
                view.send(NotifyEnum.LOCKED_FISH_CHANGE, { fishId: fish.getUniqId(), gunIndex: 0 });
                view.setLocked(true);
                view.getRoomUI().getFrozenAndLockUI().buttonLockNN.startBtnTick();
            }
        }
        else if (itemId == PropEnum.CLONE || itemId == PropEnum.FREE_CLONE) {
            roomer.setIsClone(true);
            view.setCloneEffect(true, roomer.getRoomPos());
            var gunNum = roomer.getGunNum();
            //TODO:暂时默认分身3个炮管
            var fishList = RoomUtil.getMaxScoreFishByNum(view.getFishList(), gunNum);
            var arrLocked = new Array();
            for (var i = 0; i < fishList.length; i++) {
                arrLocked.push(fishList[i].getUniqId());
                //console.log("#----------index---->",i,"-------id---->",fishList[i].getUniqId());
                view.send(NotifyEnum.LOCKED_FISH_CHANGE, { fishId: fishList[i].getUniqId(), gunIndex: i });
                if (userId == this._userModel.getUserId()) {
                    game.util.GameUtil.setLockedEffect(fishList[i], "locked", "locked_circle_png", true);
                }
            }
            var pos = roomer.getRoomPos();
            var obj = new LockedObj(arrLocked, pos, userId);
            view.setLockedObj(obj);
            if (userId == this._userModel.getUserId()) {
                burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
                view.setClone(true);
                view.setGunNum(gunNum);
                view.getRoomUI().getSidePropUI().buttonCloneNN.startBtnTick();
            }
            else {
                //其他人开炮
                //RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip())
                view.getRoomUI().setGunState(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), true, 3, roomer.getRoomPos());
                this.insertClonePos(roomer.getRoomPos());
            }
        }
        else if (itemId == PropEnum.FROZEN) {
            var fishIds = msg.getFrozenFishIds();
            view.frozen(fishIds);
            game.util.SoundManager.playEffectSound("ice");
            /*
            let arrPos:Array<any> = RoomUtil.getFrozenEffectPos();
            for(let i = 0; i < arrPos.length; i++)
            {
                (function (arrPosItem) {
                        setTimeout(function() {
                        let armature = game.util.BonesUtil.playBingdongEffect();
                        view.getBulletLayer().addChild(armature.getDisplay());
                        armature.display.x = arrPosItem.x;
                        armature.display.y = arrPosItem.y;
                        armature.display.scaleX = 1.2;
                        armature.display.scaleY = 1.2;
                    }, 500 + 100*i);
                })(arrPos[i])
            }
            */
            if (userId == this._userModel.getUserId()) {
                view.getBulletLayer().showFrozen();
                view.getRoomUI().getFrozenAndLockUI().buttonFrozenNN.startBtnTick();
            }
        }
        else if (itemId == PropEnum.CALABASH) {
            var addFishObj = msg.getAddFish();
            var fishId = addFishObj.fishId;
            var uniqId = addFishObj.uniId;
            var pathId = addFishObj.pathId;
            var corrdX = addFishObj.coordinate.xvalue;
            var corrdY = addFishObj.coordinate.yvalue;
            //为葫芦添加在路径上的起始点
            var pathVo = game.table.T_FishPath_Table.getVoByKey(pathId);
            if (pathVo != null) {
                var arr = RoomUtil.getFishPathById(pathId);
                var pObj = RoomUtil.getPointsByCala(arr, pathVo.calabashPoint);
                var p = pObj.point;
                view.useCalabash(roomer.getRoomPos(), uniqId[0], fishId, pathId, corrdX, corrdY, corrdX + p.x, corrdY + p.y, pathVo.calabashPoint);
            }
            else {
                //如果葫芦没随机出鱼，就随机一个点播放动画
                view.useCalabash(roomer.getRoomPos(), uniqId[0], fishId, pathId, corrdX, corrdY, 400 * Math.random() + 400, 200 * Math.random() + 200, -1);
            }
            if (userId == this._userModel.getUserId()) {
                view.getRoomUI().getSidePropUI().buttonCalabashNN.startBtnTick();
                game.util.SoundManager.playEffectSound("godlamp_begin");
            }
        }
        //刷新道具信息
        burn._Notification_.send(NotifyEnum.SET_PROP_NUM);
    };
    //自己更改锁定目标
    RoomMediator.prototype.changeLockedFish = function (obj, target) {
        var userModel = burn.Director.getModelByKey(UserModel);
        var send = new UseLockItemMessage();
        send.initData();
        send.setUserId(userModel.getUserId());
        send.setFishId(parseInt(obj.fishId));
        send.setGunIndex(parseInt(obj.gunIndex));
        send.setItemId(0);
        NetManager.send(send);
    };
    //锁定的鱼不存在了，重新寻找鱼
    RoomMediator.prototype.lockedFishDisappear = function (obj, target) {
        var index = Number(obj.index);
        var simple = Boolean(obj.simple);
        var view = target.getView();
        var userModel = burn.Director.getModelByKey(UserModel);
        var bFindFish = null;
        //getMaxScoreFishByNum 找仨最高分的。看谁没被锁定。 
        var roomer = target._roomModel.getRoomerById(userModel.getUserId());
        if (!roomer) {
            return;
        }
        var gunNum = roomer.getGunNum();
        if (!simple) {
            var fishListMax = RoomUtil.getMaxScoreFishByNum(view.getFishList(), gunNum);
            for (var i = 0; i < fishListMax.length; i++) {
                var bFind = false;
                for (var j = 0; j < gunNum; j++) {
                    var id = view.getLockedFishId(userModel.getUserId(), j);
                    if (id == fishListMax[i].getUniqId()) {
                        bFind = true;
                        break;
                    }
                }
                if (!bFind) {
                    bFindFish = fishListMax[i];
                }
            }
        }
        else {
            var fishListMax = RoomUtil.getMaxScoreFishByNum(view.getFishList(), 1);
            bFindFish = fishListMax[0];
        }
        if (bFindFish == null) {
            return;
        }
        //更换锁定目标
        view.changeLockedFish(userModel.getUserId(), bFindFish, index);
        var send = new UseLockItemMessage();
        send.initData();
        send.setUserId(userModel.getUserId());
        send.setFishId(bFindFish.getUniqId());
        send.setGunIndex(index);
        send.setItemId(0);
        NetManager.send(send);
    };
    //监听锁定、狂暴、分身状态结束消息
    RoomMediator.prototype.lockedEnd = function (msg) {
        var view = this.getView();
        var itemId = msg.getItemId();
        var userId = msg.getUserId();
        var roomer = this._roomModel.getRoomerById(userId);
        var userModel = burn.Director.getModelByKey(UserModel);
        if (itemId == PropEnum.LOCK) {
            roomer.setIsLock(false);
            view.setLockedEffect(false, roomer.getRoomPos());
            if (userId == userModel.getUserId()) {
                view.setLocked(false);
            }
            else {
            }
            if (!roomer.getIsClone()) {
                if (roomer.getIsRage()) {
                    view.deleteLockedObj(userId, false);
                }
                else {
                    view.deleteLockedObj(userId, true);
                }
            }
        }
        else if (itemId == PropEnum.CLONE || itemId == PropEnum.FREE_CLONE) {
            roomer.setIsClone(false);
            view.setCloneEffect(false, roomer.getRoomPos());
            if (userId == userModel.getUserId()) {
                view.setClone(false);
            }
            else {
                view.getRoomUI().setGunState(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), false, 3, roomer.getRoomPos());
                this.deleteClonePos(roomer.getRoomPos());
            }
            if (!roomer.getIsRage() && !roomer.getIsLock()) {
                view.deleteLockedObj(userId, true);
            }
            else {
                view.deleteLockedObj(userId, false);
            }
        }
        else if (itemId == PropEnum.RAGE || itemId == PropEnum.FREE_RAGE) {
            roomer.setIsRage(false);
            view.setRageEffect(false, roomer.getRoomPos());
            var userModel_1 = burn.Director.getModelByKey(UserModel);
            if (userId == userModel_1.getUserId()) {
                view.setRage(false);
            }
            else {
            }
            if (!roomer.getIsClone()) {
                if (roomer.getIsLock()) {
                    view.deleteLockedObj(userId, false);
                }
                else {
                    view.deleteLockedObj(userId, true);
                }
            }
        }
    };
    //更改锁定目标
    RoomMediator.prototype.changeLocked = function (msg) {
        var view = this.getView();
        var fish = RoomUtil.getFishById(view.getFishList(), msg.getFishId());
        view.changeLockedFish(msg.getUserId(), fish, parseInt(msg.getGunIndex()));
    };
    //设置房间状态
    RoomMediator.prototype.setRoomState = function (state, fishId, userId) {
        var view = this.getView();
        if (state == pondState.FROZEN_END) {
            view.unfrozen();
        }
        else if (state == pondState.WAVE_COMING) {
            view.showWave(function () {
                var arr = view.getFishList();
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].getActor().getUniqId() != Especial_Fish.Guide_Fish
                        && arr[i].getActor().getUniqId() != Especial_Fish.Phoenix) {
                        arr[i].runaway();
                    }
                }
            });
        }
        else if (state == pondState.BOSS_COMING) {
            view.bossComing(fishId);
        }
        else if (state == pondState.USER_EXCHANGE) {
            var roomer = this._roomModel.getRoomerById(userId);
            if (roomer) {
                view.getRoomUI().setExchangeByPos(roomer.getRoomPos(), view.getIsFlip(), true);
            }
        }
        else if (state == pondState.USER_EXCHANGED) {
            var roomer = this._roomModel.getRoomerById(userId);
            if (roomer) {
                view.getRoomUI().setExchangeByPos(roomer.getRoomPos(), view.getIsFlip(), false);
            }
        }
    };
    //退出房间逻辑
    RoomMediator.prototype.exitRoom = function (obj, target) {
        var my = target._roomModel.getRoomerById(target._userModel.getUserId());
        var send = new QuitRoomMessage();
        send.initData();
        send.setPlayerId(target._userModel.getUserId());
        send.setPosition(my.getRoomPos());
        NetManager.send(send);
    };
    //退出房间
    RoomMediator.prototype.quitRoom = function (msg) {
        var _this = this;
        var userId = msg.getPlayerId();
        var pos = msg.getPosition();
        var roomer = this._roomModel.getRoomerById(userId);
        if (roomer == null) {
            console.log("玩家不存在：" + userId);
            return;
        }
        if (userId == this._userModel.getUserId() && pos == roomer.getRoomPos()) {
            burn._Notification_.send(NotifyEnum.CLEAR_PRICE_TASK);
            //重新连接逻辑服务器
            NetManager.resetNet(CONFIG.SERVER_IP, CONFIG.SERVER_PORT, function () {
                //清理房间信息
                _this._roomModel.clearRoom();
                game.util.UIUtil.closeLoading();
                GlobalManager.getInstance().reConnect2Server();
            });
        }
        else if (pos == roomer.getRoomPos()) {
            var view = this.getView();
            this.deleteClonePos(roomer.getRoomPos());
            view.deleteLockedObj(roomer.getUserId(), true);
            view.setLockedEffect(false, roomer.getRoomPos());
            view.setRageEffect(false, roomer.getRoomPos());
            view.setCloneEffect(false, roomer.getRoomPos());
            roomer.setIsClone(false);
            roomer.setIsLock(false);
            roomer.setIsRage(false);
            view.getRoomUI().setExchangeByPos(roomer.getRoomPos(), view.getIsFlip(), false);
            view.removeBankrupt(roomer.getRoomPos());
            this._roomModel.removeRoomer(roomer);
            var roomUI = view.getRoomUI();
            if (!roomUI) {
                return;
            }
            roomUI.setGunState(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), false, 3, roomer.getRoomPos());
            roomUI.setGunVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), false);
            //清空排行信息
            roomUI.showPriceRank(roomer.getRoomPos(), view.isFlip(), -1);
            if (roomUI.getIsChakan()) {
                if (roomer.getRoomPos() == roomUI.nChakanPos) {
                    roomUI.setHideChakan();
                }
            }
            var roomType = this._userModel.getMatchRoomLevel();
            if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom || game.util.GameUtil.isKss(roomType)) {
                //如果是大奖赛
                roomUI.setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), false);
            }
        }
        else {
            console.log("玩家信息错误！");
        }
    };
    RoomMediator.prototype.exchangeGoodsBack = function (msg) {
        var exchangeModel = this.getModel(ExchangeModel);
        exchangeModel.clearList();
        var items = msg.getItemList();
        var len = items.length;
        for (var i = 0; i < len; i++) {
            var item = items[i];
            var data = new game.model.ExchangeItem(item.id, item.name, item.type, item.exchangePriceId, item.exchangePrice, item.instruction, item.marketPrice, item.url, item.minVip, item.goodsId, item.goodsNum, item.serverNum, items.orders, item.loopRecordColor, item.minGunId, item.deliveryState);
            exchangeModel.addItem(data);
        }
    };
    //新手任务
    RoomMediator.prototype.taskFinishBack = function (msg) {
        var state = msg.getState();
        if (state != 1) {
            return;
        }
        var model = burn.Director.getModelByKey(UserModel);
        var roomer = this._roomModel.getRoomerById(model.getUserId());
        var view = this.getView();
        var item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        var to = new egret.Point(item.x, item.y);
        if (to.y > 360) {
            to.y = 670;
        }
        else {
            to.y = 50;
        }
        //添加奖励
        var items = msg.getTaskAward();
        for (var i = 0; i < items.length; i++) {
            var itemId = items[i].itemId;
            var count = items[i].totalCount;
            var data = new game.model.Item(itemId, count);
            if (model.isExist(data)) {
                var itemLast = model.getItemById(itemId);
                model.updateItem(itemId, itemLast.getCount() + count);
            }
            else {
                model.addItem(data);
            }
            if (itemId != PropEnum.GOLD) {
                game.util.GameUtil.flyItems(count, itemId, new egret.Point(640, 0), new egret.Point(to.x, to.y), view.getRoomUI(), model.getUserId());
            }
            else {
                game.util.GameUtil.flyCoins(count, 1, new egret.Point(640, 0), new egret.Point(to.x, to.y), view.getRoomUI(), model.getUserId());
            }
            if (itemId == PropEnum.GOLD) {
                model.setCoins(Number(model.getCoins()) + Number(count));
            }
            else if (itemId == PropEnum.GEM) {
                model.setMoney(Number(model.getMoney()) + Number(count));
            }
        }
        var completeId = msg.getTaskId();
        game.util.ReyunUtil.sendEvent(completeId + game.util.LogEnum.GUIDE_TASK_END);
        var taskModel = burn.Director.getModelByKey(TaskModel);
        taskModel.removeItem(completeId);
        var newID = msg.getNewTaskId();
        if (newID) {
            //塞进去新的任务
            var taskItem = new game.model.TaskItem(newID, 0, 0);
            taskModel.addItem(taskItem);
        }
        //刷新UI
        burn._Notification_.send(NotifyEnum.TASK_GUIDE_CHANGE);
        var finishTaskId = game.table.T_Config_Table.getVoByKey(82).value;
        if (completeId == Number(finishTaskId)) {
            //弹出恭喜获得
            game.util.Guide.checkGuide(GuideTrriger.Open);
        }
    };
    //弹出话费动画结束后更新兑换板子
    RoomMediator.prototype.updateExchange = function (obj, target) {
        var view = target.getView();
        var userModel = burn.Director.getModelByKey(UserModel);
        var itemTicks = new game.model.Item(PropEnum.FISH_TICKIT, 1);
        var num = 0;
        if (userModel.isExist(itemTicks)) {
            num = userModel.getItemById(PropEnum.FISH_TICKIT).getCount();
        }
        var curNum = num;
        var exchangeModel = target.getModel(ExchangeModel);
        var list = exchangeModel.getList();
        var len = list.length;
        var exchagneName = "";
        var maxNum = 0;
        for (var i = 0; i < len; i++) {
            var item = list[i];
            if (curNum <= item._exchangePrice) {
                exchagneName = item._name;
                maxNum = item._exchangePrice;
                break;
            }
            if ((i == (len - 1)) && exchagneName == "") {
                exchagneName = item._name;
                maxNum = item._exchangePrice;
            }
        }
        view.getRoomUI().updateShowExchangeBan(curNum, maxNum);
    };
    RoomMediator.prototype.popExchange = function (obj, target) {
        var view = target.getView();
        var userModel = target.getModel(UserModel);
        var itemTicks = new game.model.Item(PropEnum.FISH_TICKIT, 1);
        var num = 0;
        if (userModel.isExist(itemTicks)) {
            num = userModel.getItemById(PropEnum.FISH_TICKIT).getCount();
        }
        var curNum = num;
        var exchangeModel = target.getModel(ExchangeModel);
        var list = exchangeModel.getList();
        var len = list.length;
        var exchagneName = "";
        var maxNum = 0;
        for (var i = 0; i < len; i++) {
            var item = list[i];
            if (curNum <= item._exchangePrice) {
                exchagneName = item._name;
                maxNum = item._exchangePrice;
                break;
            }
            if ((i == (len - 1)) && exchagneName == "") {
                exchagneName = item._name;
                maxNum = item._exchangePrice;
            }
        }
        view.getRoomUI().showExchangeBan(exchagneName, curNum, maxNum);
    };
    RoomMediator.prototype.taskGuideLoad = function (obj, target) {
        var view = target.getView();
        view.getRoomUI().addGuideTask();
    };
    RoomMediator.prototype.taskChange = function (obj, target) {
        var view = target.getView();
        var ui = view.getRoomUI().getGuideTaskUI();
        if (!ui) {
            return;
        }
        var taskModel = burn.Director.getModelByKey(TaskModel);
        var task = taskModel.getTaskListByType(TaskType.TASK_TYPE_NEWBIE);
        var taskPrice = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
        if (!task) {
            return;
        }
        if (task.length == 0) {
            if (taskPrice.length == 0) {
                view.getRoomUI().guideTaskGroup.removeChildren();
            }
            return;
        }
        view.getRoomUI().getGuideTaskUI().setData(task[0]);
    };
    RoomMediator.prototype.taskLoaded = function (obj, target) {
        var taskModel = burn.Director.getModelByKey(TaskModel);
        var task = taskModel.getTaskListByType(TaskType.TASK_TYPE_NEWBIE);
        var taskPrice = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
        if (!task) {
            return;
        }
        var view = target.getView();
        if (task.length == 0) {
            if (taskPrice.length == 0) {
                view.getRoomUI().guideTaskGroup.removeChildren();
            }
            return;
        }
        view.getRoomUI().getGuideTaskUI().setData(task[0]);
    };
    //引导结束
    RoomMediator.prototype.guideClose = function (obj, target) {
        var type = Number(obj);
        var curId = 0;
        switch (type) {
            case GuideClose.GUIDE_CLOSE_UNLOCK:
                var req = new UpgradeOrForgeSendMessage();
                req.initData();
                req.setType(GunUpdateType.UNLOCK);
                NetManager.send(req);
                curId = target._userModel.getGuideID();
                var c_id = Number(curId) + 1;
                var c_vo = game.table.T_Guide_Table.getVoByKey(c_id);
                game.util.Guide.checkGuide(c_vo.trrigertype);
                break;
            case GuideClose.GUIDE_CLOSE_TRRIGER_NEXT:
                curId = target._userModel.getGuideID();
                var t_id = Number(curId) + 1;
                var t_vo = game.table.T_Guide_Table.getVoByKey(t_id);
                game.util.Guide.checkGuide(t_vo.trrigertype);
                break;
            case GuideClose.GUIDE_CLOSE_LOCK:
                var l_userId = target._userModel.getUserId();
                var l_roomer = target._roomModel.getRoomerById(l_userId);
                var l_view = target.getView();
                var fish = RoomUtil.getFishById(l_view.getFishList(), Especial_Fish.Guide_Fish);
                if (!fish) {
                    return;
                }
                l_roomer.setIsLock(true);
                l_view.setLockedEffect(true, l_roomer.getRoomPos());
                var arrLocked = new Array();
                arrLocked.push(fish.getUniqId());
                var obj1 = new LockedObj(arrLocked, l_roomer.getRoomPos(), l_userId);
                l_view.setLockedObj(obj1);
                if (true) {
                    game.util.GameUtil.setLockedEffect(fish, "locked", "locked_circle_png", true);
                    l_view.send(NotifyEnum.LOCKED_FISH_CHANGE, { fishId: fish.getUniqId(), gunIndex: 0 });
                    l_view.setLocked(true);
                    l_view.getRoomUI().getFrozenAndLockUI().buttonLockNN.startBtnTick();
                }
                break;
            case GuideClose.GUIDE_CLOSE_OPENLOTTERY:
                var view = target.getView();
                var userId = target._userModel.getUserId();
                var roomer = target._roomModel.getRoomerById(userId);
                var to = RoomUtil.getPointByPos(roomer.getRoomPos(), view.getIsFlip());
                target._lotteryUI = new room.LotteryUI(to);
                target._lotteryUI.x += CONFIG.adaptX;
                target._lotteryUI.y += CONFIG.adaptY;
                target._lotteryUI.setGuide();
                view.addChildAt(target._lotteryUI, 82);
                var userModle = burn.Director.getModelByKey(UserModel);
                curId = userModle.getGuideID();
                var id = Number(curId) + 1;
                var vo = game.table.T_Guide_Table.getVoByKey(id);
                game.util.Guide.checkGuide(vo.trrigertype);
                break;
            case GuideClose.GUIDE_CLOSE_LOTTERY:
                if (target._lotteryUI) {
                    target._lotteryUI.startLottery();
                }
                break;
            case GuideClose.GUIDE_CLOSE_CLOSE_RMB_GAIN:
                //RMBGAIN
                var child = egret.MainContext.instance.stage.getChildByName("RMBGAIN");
                if (child) {
                    egret.MainContext.instance.stage.removeChild(child);
                }
                curId = target._userModel.getGuideID();
                var r_id = Number(curId) + 1;
                var r_vo = game.table.T_Guide_Table.getVoByKey(r_id);
                game.util.Guide.checkGuide(r_vo.trrigertype);
                break;
            case GuideClose.GUIDE_CLOSE_CLICK_EXCHAGE:
                burn._Notification_.send(NotifyEnum.EXCHANGE_ITEM, 1100);
                break;
            case GuideClose.GUIDE_CLOSE_EXCHNANGE_END:
                game.util.Guide.checkGuide(GuideTrriger.Open);
                break;
            default:
                console.log("#------------------------close----傻逼你会用吗？");
                break;
        }
    };
    //显示引导开始
    RoomMediator.prototype.guideOpen = function (obj, target) {
        var type = Number(obj);
        switch (type) {
            case GuideOpen.GUIDE_OPEN_UNLOCK:
                var u_view = target.getView();
                u_view.getRoomUI().unlockGunGroup.visible = true;
                u_view.getRoomUI().getUnlockUpdateUI().openGunUpdateByGuide();
                break;
            case GuideOpen.GUIDE_OPEN_ADDFISH:
                var a_view = target.getView();
                a_view.guide_addFish();
                break;
            case GuideOpen.GUIDE_OPEN_FISHDEAD:
                target.guide_fishDead();
                // 去掉锁定引导
                var view = target.getView();
                var userModle = burn.Director.getModelByKey(UserModel);
                var userId = userModle.getUserId();
                var roomer = target._roomModel.getRoomerById(userId);
                roomer.setIsLock(false);
                view.setLockedEffect(false, roomer.getRoomPos());
                view.setLocked(false);
                view.deleteLockedObj(userId, true);
                view.getRoomUI().getFrozenAndLockUI().buttonLockNN.stopBtnTick();
                break;
            case GuideOpen.GUIDE_OPEN_OPENLOTTERY:
                var l_view = target.getView();
                l_view.getRoomUI().lotteryGroup.visible = true;
                l_view.getRoomUI().openLotteryGuide();
                break;
            case GuideOpen.GUIDE_OPEN_TRRIGERTASK:
                break;
            case GuideOpen.GUIDE_OPEN_EXCHANGE:
                var exchangeView = new ExchangeView();
                var exchangeMed = new ExchangeMediator(exchangeView);
                burn.Director.pushView(exchangeMed);
                break;
            case GuideOpen.GUIDE_OPEN_POP_RMB_GAIN:
                //
                game.util.GameUtil.openRMBGain();
                break;
            default:
                console.log("#------------------------open----傻逼你会用吗？");
                break;
        }
    };
    //显示查看板子
    RoomMediator.prototype.showChakan = function (obj, target) {
        var view = target.getView();
        if (view.getRoomUI().getIsChakan()) {
            view.getRoomUI().setHideChakan();
            return;
        }
        var roomerList = target._roomModel.getRoomerList();
        var myPos = RoomUtil.getPosByFlip(Number(obj), view.isFlip());
        for (var i = 0; i < roomerList.length; i++) {
            if (roomerList[i].getRoomPos() == myPos) {
                var roomer = roomerList[i];
                view.showChakan(roomer);
                return;
            }
        }
    };
    //自动开炮
    RoomMediator.prototype.autoGunFire = function (obj, target) {
        var view = target.getView();
        view.setAutoGunFire(obj);
    };
    //查找最新炮倍 
    RoomMediator.prototype.checkGunRest = function (obj, target) {
        var userModle = burn.Director.getModelByKey(UserModel);
        var roomer = target._roomModel.getRoomerById(userModle.getUserId());
        var rate = roomer.getGunRate();
        var gunRateVo = game.table.T_Gun_Table.getVoByKey(rate);
        var flagNull = game.util.GameUtil.isEnough(CurrencyEnum.COINS, gunRateVo.bulletNum);
        if (!flagNull) {
            var newID = -1;
            for (var id = gunRateVo.id; id > 0; id--) {
                var vo = game.table.T_Gun_Table.getVoByKey(id);
                var voEnough = game.util.GameUtil.isEnough(CurrencyEnum.COINS, vo.bulletNum);
                if (voEnough) {
                    newID = id;
                    break;
                }
            }
        }
    };
    //调整炮台倍率
    RoomMediator.prototype.resetGunRate = function (obj, target) {
        game.util.SoundManager.playEffectSound("C14");
        var send = new ChangeGunSendMessage();
        send.initData();
        var userModle = burn.Director.getModelByKey(UserModel);
        var roomer = target._roomModel.getRoomerById(userModle.getUserId());
        var view = target.getView();
        if (obj == "reduce") {
            send.setType(ChangeGunState.REDUCE_RATE);
            var gunPos = roomer.getRoomPos();
            var gun = view.getRoomUI().gunList[RoomUtil.getPosByFlip(Number(roomer.getRoomPos()), view.isFlip())];
            if (gun.getGunLocked()) {
                var minGunId = game.util.GameUtil.getNeedGunByRoomType(userModle.getMatchRoomLevel(), -1);
                if (roomer.getGunRate() == minGunId) {
                    return;
                }
                roomer.setGunRate(roomer.getGunRate() - 1);
                var gunRateVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
                view.setRoomerGunRate(roomer.getRoomPos(), gunRateVo.bulletNum, false);
                gun.setLocked(false);
                return;
            }
        }
        else if (obj == "add") {
            if (roomer.getGunRate() == userModle.getCurGunID() && userModle.getMatchRoomLevel() != RequesetRoomState.DjsRoom
                && userModle.getMatchRoomLevel() != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(userModle.getMatchRoomLevel())) {
                roomer.setGunRate(roomer.getGunRate() + 1);
                var gunRateVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
                if (gunRateVo) {
                    var view_1 = target.getView();
                    view_1.setRoomerGunRate(roomer.getRoomPos(), gunRateVo.bulletNum, false);
                    var gun = view_1.getRoomUI().gunList[RoomUtil.getPosByFlip(Number(roomer.getRoomPos()), view_1.isFlip())];
                    gun.setLocked(true);
                    return;
                }
                else {
                    send.setType(ChangeGunState.ADD_RATE);
                }
            }
            else {
                roomer.setGunRate(userModle.getCurGunID());
                var gunRateVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
                if (gunRateVo) {
                    var view_2 = target.getView();
                    view_2.setRoomerGunRate(roomer.getRoomPos(), gunRateVo.bulletNum, false);
                    var gun = view_2.getRoomUI().gunList[RoomUtil.getPosByFlip(Number(roomer.getRoomPos()), view_2.isFlip())];
                    gun.setLocked(false);
                }
                send.setType(ChangeGunState.ADD_RATE);
            }
        }
        NetManager.send(send);
    };
    //调整炮台倍率服务器返回
    RoomMediator.prototype.changeGunBack = function (msg) {
        var type = msg.getType();
        var userId = msg.getUserId();
        var roomer = this._roomModel.getRoomerById(userId);
        var view = this.getView();
        if (type != ChangeGunState.CHANGE_SKIN) {
            var gunRateVo = game.table.T_Gun_Table.getVoByKey(msg.getGunId());
            if (gunRateVo == null) {
                console.log("炮倍不存在：" + msg.getGunId());
                game.util.GameUtil.popTips(game.util.Language.getText(99));
                return;
            }
            roomer.setGunRate(Number(msg.getGunId()));
            view.setRoomerGunRate(roomer.getRoomPos(), gunRateVo.bulletNum, roomer.getIsClone());
            if (userId == this._userModel.getUserId()) {
                this.checkGunUpdate(null, this);
                game.util.SoundManager.playEffectSound("C14");
            }
        }
        else {
            var state = msg.getState();
            if (state != 1) {
                game.util.GameUtil.popTips("更换炮台失败-->", state);
                return;
            }
            var skinId = msg.getSkinId();
            var vo = game.table.T_Item_Table.getVoByKey(skinId);
            if (vo.type == BagItemType.BATTERY) {
                if (userId == this._userModel.getUserId()) {
                    this._userModel.setCurSkinId(skinId);
                }
                roomer.setCurSkinId(skinId);
            }
            //修改界面
            burn._Notification_.send(NotifyEnum.CHANGE_GUN_UI_LOADED);
            view.changeGunSkin(roomer);
        }
    };
    //出发特殊鱼：一网打尽、电鳗、炸弹鱼
    RoomMediator.prototype.killManyFish = function (msg) {
        var view = this.getView();
        var list = msg.getFishingHitback();
        room.OneKillMany.killMany(view, msg.getUserId(), msg.getFishId(), list, msg.getFishFunctionType(), view.getFishList(), view.getIsFlip(), view.getRoomUI());
        var len = list.length;
        var icon = 0;
        for (var i = 0; i < len; i++) {
            var items = list[i].items;
            var lenI = items.length;
            for (var j = 0; j < lenI; j++) {
                var item = items[j];
                if (item.itemId == 10001) {
                    icon += Number(item.count);
                }
            }
        }
        if (this._userModel.getUserId() == msg.getUserId()) {
            var reason = game.table.T_Config_Table.getVoByKey(43).value;
            var times = game.table.T_Config_Table.getVoByKey(54).value.split("_");
            if (icon >= Number(reason)) {
                /** enum OneKillManyType {
                    CATCH_WHOLE = 0,	//一网打尽
                    ELECTRIC = 3,		//电鳗
                    BOMB = 4			//炸弹
                } */
                var time = 0;
                switch (msg.getFishFunctionType()) {
                    case OneKillManyType.CATCH_WHOLE:
                        time = Number(times[0]);
                        break;
                    case OneKillManyType.ELECTRIC:
                        time = Number(times[1]);
                        break;
                    case OneKillManyType.BOMB:
                        time = Number(times[2]);
                        break;
                }
                setTimeout(function () {
                    game.util.GameUtil.baoFuEffect(icon, view.getBulletLayer());
                }, time);
            }
        }
    };
    //初始化房间内已经有的鱼和玩家
    RoomMediator.prototype.initInRoomInfo = function () {
        var view = this.getView();
        var isFlip = false;
        var myPos = 0;
        //初始化房间内玩家
        var roomerList = this._roomModel.getRoomerList();
        for (var i = 0; i < roomerList.length; i++) {
            if (roomerList[i].getUserId() == this._userModel.getUserId()) {
                myPos = roomerList[i].getRoomPos();
                if (myPos > 1) {
                    isFlip = true;
                    break;
                }
            }
        }
        //设置房间玩家数据
        view.resetView(isFlip, roomerList, myPos);
        for (var i = 0; i < roomerList.length; i++) {
            if (roomerList[i].getUserId() == this._userModel.getUserId()) {
                myPos = roomerList[i].getRoomPos();
                if (myPos == 0 || myPos == 3) {
                    view.setPaobeiAddState(true);
                }
                else if (myPos == 1 || myPos == 2) {
                    view.setPaobeiAddState(false);
                }
                this._userModel.setMoney(roomerList[i].getMoney());
                this._userModel.setCoins(roomerList[i].getCoins());
                var roomType = this._userModel.getMatchRoomLevel();
                if (roomType != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(roomType)) {
                    view.setRoomerCoins(myPos, this._userModel.getCoins());
                }
                else {
                    view.setRoomerBullet(myPos, roomerList[i].getDjsObj().grandPrixBulletNum);
                }
                view.setRoomerMoney(myPos, this._userModel.getMoney());
                var gunVo = game.table.T_Gun_Table.getVoByKey(roomerList[i].getGunRate());
                if (gunVo) {
                    view.setRoomerGunRate(myPos, gunVo.bulletNum);
                }
                else {
                    console.warn("没有这个炮倍：" + roomerList[i].getGunRate());
                }
                //您在这里
                view.showYourPos(myPos);
                //定义Timer
                var timer = new egret.Timer(5000, 1);
                //注册事件侦听器
                timer.addEventListener(egret.TimerEvent.TIMER, function () {
                    view.hideYourPos(myPos);
                }, this);
                //开始计时
                timer.start();
            }
            else {
                var roomType = this._userModel.getMatchRoomLevel();
                if (roomType != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(roomType)) {
                    view.setRoomerCoins(roomerList[i].getRoomPos(), roomerList[i].getCoins());
                }
                else {
                    view.setRoomerBullet(roomerList[i].getRoomPos(), roomerList[i].getDjsObj().grandPrixBulletNum);
                }
                view.setRoomerMoney(roomerList[i].getRoomPos(), roomerList[i].getMoney());
                var gunVo = game.table.T_Gun_Table.getVoByKey(roomerList[i].getGunRate());
                if (gunVo) {
                    view.setRoomerGunRate(roomerList[i].getRoomPos(), gunVo.bulletNum);
                }
                else {
                    console.warn("没有这个炮倍：" + roomerList[i].getGunRate());
                }
                if (roomerList[i].getIsLock()) {
                    view.setLockedEffect(true, roomerList[i].getRoomPos());
                }
                if (roomerList[i].getIsRage()) {
                    view.setRageEffect(true, roomerList[i].getRoomPos());
                }
                if (roomerList[i].getIsClone()) {
                    //同步分身，狂暴状态
                    view.getRoomUI().setGunState(RoomUtil.getPosByFlip(roomerList[i].getRoomPos(), view.getIsFlip()), true, 3, roomerList[i].getRoomPos());
                    view.setCloneEffect(true, roomerList[i].getRoomPos());
                    this.insertClonePos(roomerList[i].getRoomPos());
                    // 同步其它的锁定鱼ID
                    for (var j = 0; j < 3; j++) {
                        var fishLocked = RoomUtil.getFishById(view.getFishList(), roomerList[i].getLockedIdByGun(j));
                        view.changeLockedFish(roomerList[i].getUserId(), fishLocked, j);
                    }
                }
                else {
                    // 同步其它的锁定鱼ID
                    for (var j = 0; j < 1; j++) {
                        var fishLocked = RoomUtil.getFishById(view.getFishList(), roomerList[i].getLockedIdByGun(j));
                        view.changeLockedFish(roomerList[i].getUserId(), fishLocked, j);
                    }
                }
            }
            view.changeGunSkin(roomerList[i]);
        }
        //设置房间玩家数据
        view.resetView(isFlip, roomerList, myPos);
        //初始化鱼
        var fishList = this._roomModel.getFishList();
        for (var i = 0; i < fishList.length; i++) {
            var fish = fishList[i];
            view.addUnitFish(fish.fishType, fish.uniqId, fish.fishId, fish.pathId, fish.coord, fish.aliveTime);
        }
    };
    RoomMediator.prototype.pondFish = function (msg) {
        var fishList = msg.getFishes();
        var len = fishList.length;
        for (var i = 0; i < len; i++) {
            this.addFish(fishList[i]);
        }
    };
    //向鱼池中添加鱼
    RoomMediator.prototype.addFish = function (msg) {
        var view = this.getView();
        var type = msg.getType();
        var fId = msg.getFishId();
        if (type == AddFishType.FISH_GROUP) {
            var fishGroupVo = game.table.T_FishGroup_Table.getVoByKey(fId);
            if (fishGroupVo.type == FishGroupType.SIMPLE) {
                view.addUnitFish(type, msg.getUniId(), fId, msg.getPathId(), new egret.Point(msg.getCoordinate().xvalue, msg.getCoordinate().yvalue));
            }
            else if (fishGroupVo.type == FishGroupType.QUEUE) {
                //队列鱼
                var vo = game.table.T_FishGroup_Table.getVoByKey(fId);
                if (!vo) {
                    return;
                }
                var str = vo.pos.split("|");
                var timeTotal = 0;
                var uniId = msg.getUniId();
                var len = str.length;
                var _loop_1 = function (i) {
                    var itemStr = str[i].split(",");
                    var id = itemStr[0];
                    var time = itemStr[1];
                    timeTotal += Number(time);
                    var timer = new egret.Timer(timeTotal, 1);
                    var uId = new Array();
                    uId.push(uniId[i]);
                    var tiemFun = function () {
                        timer.removeEventListener(egret.TimerEvent.TIMER, tiemFun, self);
                        view.addUnitFish(AddFishType.FISH, uId, Number(id), msg.getPathId(), new egret.Point(msg.getCoordinate().xvalue, msg.getCoordinate().yvalue));
                    };
                    timer.addEventListener(egret.TimerEvent.TIMER, tiemFun, this_1);
                    timer.start();
                };
                var this_1 = this;
                for (var i = 0; i < len; i++) {
                    _loop_1(i);
                }
            }
        }
        else {
            view.addUnitFish(type, msg.getUniId(), fId, msg.getPathId(), new egret.Point(msg.getCoordinate().xvalue, msg.getCoordinate().yvalue));
        }
    };
    //房间中进入新的玩家
    RoomMediator.prototype.addPlayerInRoom = function (msg) {
        var player = msg.getPlayerInfo()[0];
        var roomer = new game.model.Roomer(player.playerId, player.position, player.name, player.gunId, Number(player.coins), player.gems, player.items, player.lockRelation, player.vipLevel, player.batterySkinId, player.gunrestSkinId, player.roleLevel);
        this._roomModel.addRoomer(roomer);
        //显示新进入玩家炮台
        var view = this.getView();
        var isFlip = view.getIsFlip();
        var roomUI = view.getRoomUI();
        roomUI.setGunVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), isFlip), true);
        var roomType = this._userModel.getMatchRoomLevel();
        view.setRoomerMoney(roomer.getRoomPos(), roomer.getMoney());
        var gunVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
        if (gunVo) {
            view.setRoomerGunRate(roomer.getRoomPos(), gunVo.bulletNum);
        }
        else {
            console.warn("没有这个炮倍：" + roomer.getGunRate());
        }
        view.changeGunSkin(roomer);
        if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom || game.util.GameUtil.isKss(roomType)) {
            //如果是大奖赛
            var djsObj = new game.model.DjsObj(player.grandPrixMessage);
            roomer.setDjsObj(djsObj);
            view.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), isFlip), true);
            view.getRoomUI().setDjsScoreByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), djsObj.grandPrixIntegral);
        }
        if (roomType != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(roomType)) {
            view.setRoomerCoins(roomer.getRoomPos(), roomer.getCoins());
        }
        else {
            view.setRoomerBullet(roomer.getRoomPos(), roomer.getDjsObj().grandPrixBulletNum);
        }
    };
    //弹出大奖赛结算面板
    RoomMediator.prototype.grandPrixSettement = function (msg) {
        var userModel = burn.Director.getModelByKey(UserModel);
        burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userModel.getUserId() });
        var roomType = msg.getRoomtType();
        var settingView = new DjsResultView(msg, roomType);
        var settingMed = new DjsResultMediator(settingView);
        burn.Director.pushView(settingMed);
    };
    //大奖赛积分变化
    RoomMediator.prototype.grandPrixInfoChange = function (msg) {
        var roomer = this._roomModel.getRoomerById(msg.getUserId());
        if (!roomer) {
            //提示
            return;
        }
        roomer.getDjsObj().grandPrixIntegral = msg.getGrandPrixIntegral();
        var view = this.getView();
        view.getRoomUI().setDjsScoreByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), msg.getGrandPrixIntegral());
        if (msg.getUserId() == this._userModel.getUserId()) {
            view.getRoomUI().updateDjsScore(roomer.getDjsObj().grandPrixIntegral);
            view.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), false);
        }
    };
    //报名回复
    RoomMediator.prototype.signUpBack = function (msg) {
        var state = msg.getState();
        if (state != 1) {
            //不成功。提示
            switch (state) {
                case SignUp_State.ARENA_SIGN_UP_TIMES_MORE:
                    game.util.GameUtil.popTips(game.util.Language.getText(191));
                    break;
                case SignUp_State.ARENA_SIGN_UP_TOCKEN_LESS:
                    game.util.GameUtil.popTips(game.util.Language.getText(192));
                    break;
                case SignUp_State.ARENA_SIGN_UP_SIGNED:
                    game.util.GameUtil.popTips(game.util.Language.getText(99));
                    break;
            }
            return;
        }
        var roomer = this._roomModel.getRoomerById(this._userModel.getUserId());
        roomer.getDjsObj().grandPrixBulletNum = Number(msg.getGrandPrixBulletNum());
        roomer.getDjsObj().grandPrixIntegral = Number(msg.getGrandPrixIntegral());
        //发送消息，更新RoomerUI的数据
        var view = this.getView();
        view.getRoomUI().updateDjdBulletNum(roomer.getDjsObj().grandPrixBulletNum);
        view.getRoomUI().updateDjsScore(roomer.getDjsObj().grandPrixIntegral);
        roomer.getDjsObj().grandPrixSignUp = 1;
        this._bSendDjsResult = false;
        if (this._userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom || game.util.GameUtil.isKss(this._userModel.getMatchRoomLevel())) {
            burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_BULLETS, { userId: this._userModel.getUserId() });
        }
        game.util.GameUtil.play321Go(view.getRoomUI(), function () {
        });
    };
    //其他玩家开炮
    RoomMediator.prototype.gunSendBack = function (msg) {
        var userId = msg.getUid();
        var roomer = this._roomModel.getRoomerById(userId);
        if (!roomer) {
            return;
        }
        var gun = msg.getGun();
        var angle = gun.angle;
        var gunIndex = gun.gunIndex;
        var view = this.getView();
        var userPos = roomer.getRoomPos(); // 此人位置
        //观察者位置 
        var my = this._roomModel.getRoomerById(this._userModel.getUserId());
        var posMy = my.getRoomPos();
        if ((userPos == 0 || userPos == 1) && (posMy == 2 || posMy == 3)) {
            if (view.getIsFlip()) {
                angle += 180;
            }
        }
        else if ((userPos == 2 || userPos == 3) && (posMy == 0 || posMy == 1)) {
            if (view.getIsFlip()) {
                angle += 180;
            }
        }
        else if (userPos == 2 && posMy == 3) {
            if (view.getIsFlip()) {
                angle += 180;
            }
        }
        else if (userPos == 3 && posMy == 2) {
            if (view.getIsFlip()) {
                angle += 180;
            }
        }
        var bClone = this.isCloneByPos(userPos);
        view.otherGunFire(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), angle, bClone, gunIndex, roomer.getIsRage(), roomer.getCurSkinId());
        var gunRateVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
        var costCoin = gunRateVo.bulletNum;
        if (roomer.getIsRage()) {
            var vipLv = roomer.getVipLevel();
            // 2_5
            var data = game.table.T_Config_Table.getVoByKey(34).value;
            var datas = data.split("_");
            var min = Number(datas[0]);
            var max = Number(datas[1]);
            if (vipLv >= min && vipLv < max) {
                costCoin *= 2;
            }
            else if (vipLv >= max) {
                costCoin *= 3;
            }
        }
        var temp = roomer.getCoins() - costCoin;
        if (temp < 0) {
            temp = 0;
        }
        roomer.setCoins(temp);
        var roomType = this._userModel.getMatchRoomLevel();
        if (roomType != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(roomType)) {
            view.setRoomerCoins(userPos, temp);
        }
        else {
            roomer.getDjsObj().grandPrixBulletNum--;
            view.setRoomerBullet(roomer.getRoomPos(), roomer.getDjsObj().grandPrixBulletNum);
        }
    };
    //抽奖信息更新监听
    RoomMediator.prototype.lotteryDataReceive = function (msg) {
        var score = msg.getIntegral(); //当前积分
        var killNum = msg.getKillNum(); //当前杀死奖金鱼数目
        var todayCount = msg.getTodayDrawTimes(); //今日领奖次数
        if (todayCount > 1) {
            todayCount = 1;
        }
        var lotteryModel = burn.Director.getModelByKey(LotteryModel);
        if (score != null) {
            lotteryModel.setScore(score);
        }
        if (killNum != null) {
            lotteryModel.setKillNum(killNum);
        }
        if (todayCount != null) {
            lotteryModel.setTodayCount(todayCount);
        }
        if (this._loaderOver) {
            //弹出tips
            this.getView().openLotteryTips(lotteryModel.getScore(), lotteryModel.getKillNum(), lotteryModel.getMaxKill(lotteryModel.getTodayCount()));
        }
    };
    //展开抽奖tips
    RoomMediator.prototype.showLottery = function (obj, target) {
        var userModle = burn.Director.getModelByKey(UserModel);
        var roomType = userModle.getMatchRoomLevel();
        if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.KssRoom || roomType == RequesetRoomState.QmsRoom) {
            var view = target.getView();
            var roomUI = view.getRoomUI();
            roomUI.lotteryBtn.visible = false;
        }
        var lotteryModel = burn.Director.getModelByKey(LotteryModel);
        target.getView().openLotteryTips(lotteryModel.getScore(), lotteryModel.getKillNum(), lotteryModel.getMaxKill(lotteryModel.getTodayCount()));
    };
    //全民赛积分变化
    RoomMediator.prototype.thePeopleBack = function (msg) {
        /**required uint32 grandPrixIntegral = 1;//大奖赛积分
            required uint32 userId = 2;
            optional uint32 fishId = 3; */
        var view = this.getView();
        var userId = msg.getUserId();
        var roomer = this._roomModel.getRoomerById(userId);
        roomer.getDjsObj().grandPrixIntegral = msg.getGrandPrixIntegral();
        //更新UI上的积分
        view.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.isFlip()), userId != this._userModel.getUserId());
        view.getRoomUI().setDjsScoreByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), msg.getGrandPrixIntegral());
        //播放爆金币
        var item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        var to = new egret.Point(item.x, item.y);
        if (to.y > 360) {
            to.y = 670;
        }
        else {
            to.y = 50;
        }
        var uniqId = msg.getFishId();
        var fishList = view.getFishList();
        //如果是黄金鱼，特殊鱼。播放金币特效
        //functionType == 2
        var fish = RoomUtil.getFishById(view.getFishList(), uniqId);
        if (fish == null) {
            console.warn("此条鱼不存在：" + uniqId);
            return;
        }
        var fishVo = game.table.T_Fish_Table.getVoByKey(fish.getFishId());
        if (fishVo.functionType == 2) {
            var dropX = 0;
            var dropY = 0;
            if (fish.getType() == AddFishType.FISH) {
                var p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            else {
                var p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            var parent_2 = view.getBulletLayer();
            var data = RES.getRes("ef_baojinbi_json");
            var txtr = RES.getRes("ef_baojinbi_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            var goldIcon_1 = new MovieFish(mcFactory.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
            goldIcon_1.initEvent();
            // goldIcon.blendMode = egret.BlendMode.ADD;
            goldIcon_1.scaleX = 2.3;
            goldIcon_1.scaleY = 2.3;
            goldIcon_1.frameRate = 12;
            //goldIcon.gotoAndPlay("play", 1);
            goldIcon_1.visible = false;
            var dataMc = goldIcon_1.movieClipData;
            var frameCur = 0;
            var Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
            goldIcon_1.anchorOffsetX = (goldIcon_1.width >> 1) + Rect.x;
            goldIcon_1.anchorOffsetY = (goldIcon_1.height >> 1) + Rect.y;
            goldIcon_1.frameRate = 12;
            goldIcon_1.x = dropX;
            goldIcon_1.y = dropY;
            var baojinbiBg_1 = new egret.Bitmap(RES.getRes("baojinbiBg_png"));
            baojinbiBg_1.anchorOffsetX = (baojinbiBg_1.width >> 1);
            baojinbiBg_1.anchorOffsetY = (baojinbiBg_1.height >> 1);
            baojinbiBg_1.x = dropX;
            baojinbiBg_1.y = dropY;
            parent_2.addChild(baojinbiBg_1);
            parent_2.addChild(goldIcon_1);
            var twBg_1 = egret.Tween.get(baojinbiBg_1, { loop: false });
            baojinbiBg_1.scaleY = 0;
            baojinbiBg_1.scaleX = 0;
            baojinbiBg_1.visible = false;
            twBg_1.
                wait(100)
                .call(function () {
                goldIcon_1.visible = true;
                baojinbiBg_1.visible = true;
                goldIcon_1.gotoAndPlay("play", 1);
            })
                .to({ scaleX: 2, scaleY: 2 }, 300)
                .to({ alpha: 0 }, 300)
                .call(function () {
                egret.Tween.removeTweens(twBg_1);
                parent_2.removeChild(baojinbiBg_1);
            });
            //震屏
            RoomUtil.shakeWindowByFish(view);
        }
        //处理死亡与掉落逻辑
        RoomUtil.fishDeadHandlerByQms(fishList, uniqId, userId, to, view.getRoomUI(), view);
        if (userId == this._userModel.getUserId()) {
            view.getRoomUI().updateDjsScore(msg.getGrandPrixIntegral());
        }
    };
    //快速赛信息变化
    RoomMediator.prototype.quickGameInfoChange = function (msg) {
        /**
         *  required uint32 integral = 1;//积分
            required uint32 userId = 2;
            optional uint32 fishId = 3; */
        var view = this.getView();
        var userId = msg.getUserId();
        var roomer = this._roomModel.getRoomerById(userId);
        if (!roomer) {
            return;
        }
        roomer.getDjsObj().grandPrixIntegral = msg.getIntegral();
        //更新UI上的积分
        view.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.isFlip()), userId != this._userModel.getUserId());
        view.getRoomUI().setDjsScoreByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), msg.getIntegral());
        //播放爆金币
        var item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        var to = new egret.Point(item.x, item.y);
        if (to.y > 360) {
            to.y = 670;
        }
        else {
            to.y = 50;
        }
        var uniqId = msg.getFishId();
        var fishList = view.getFishList();
        //如果是黄金鱼，特殊鱼。播放金币特效
        //functionType == 2
        var fish = RoomUtil.getFishById(view.getFishList(), uniqId);
        if (fish == null) {
            console.warn("此条鱼不存在：" + uniqId);
            return;
        }
        var fishVo = game.table.T_Fish_Table.getVoByKey(fish.getFishId());
        if (fishVo.functionType == 2) {
            var dropX = 0;
            var dropY = 0;
            if (fish.getType() == AddFishType.FISH) {
                var p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            else {
                var p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            var parent_3 = view.getBulletLayer();
            var data = RES.getRes("ef_baojinbi_json");
            var txtr = RES.getRes("ef_baojinbi_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            var goldIcon_2 = new MovieFish(mcFactory.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
            goldIcon_2.initEvent();
            // goldIcon.blendMode = egret.BlendMode.ADD;
            goldIcon_2.scaleX = 2.3;
            goldIcon_2.scaleY = 2.3;
            goldIcon_2.frameRate = 12;
            //goldIcon.gotoAndPlay("play", 1);
            goldIcon_2.visible = false;
            var dataMc = goldIcon_2.movieClipData;
            var frameCur = 0;
            var Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
            goldIcon_2.anchorOffsetX = (goldIcon_2.width >> 1) + Rect.x;
            goldIcon_2.anchorOffsetY = (goldIcon_2.height >> 1) + Rect.y;
            goldIcon_2.frameRate = 12;
            goldIcon_2.x = dropX;
            goldIcon_2.y = dropY;
            var baojinbiBg_2 = new egret.Bitmap(RES.getRes("baojinbiBg_png"));
            baojinbiBg_2.anchorOffsetX = (baojinbiBg_2.width >> 1);
            baojinbiBg_2.anchorOffsetY = (baojinbiBg_2.height >> 1);
            baojinbiBg_2.x = dropX;
            baojinbiBg_2.y = dropY;
            parent_3.addChild(baojinbiBg_2);
            parent_3.addChild(goldIcon_2);
            var twBg_2 = egret.Tween.get(baojinbiBg_2, { loop: false });
            baojinbiBg_2.scaleY = 0;
            baojinbiBg_2.scaleX = 0;
            baojinbiBg_2.visible = false;
            twBg_2.
                wait(100)
                .call(function () {
                goldIcon_2.visible = true;
                baojinbiBg_2.visible = true;
                goldIcon_2.gotoAndPlay("play", 1);
            })
                .to({ scaleX: 2, scaleY: 2 }, 300)
                .to({ alpha: 0 }, 300)
                .call(function () {
                egret.Tween.removeTweens(twBg_2);
                parent_3.removeChild(baojinbiBg_2);
            });
            //震屏
            RoomUtil.shakeWindowByFish(view);
        }
        //处理死亡与掉落逻辑
        RoomUtil.fishDeadHandlerByQms(fishList, uniqId, userId, to, view.getRoomUI(), view);
        if (userId == this._userModel.getUserId()) {
            view.getRoomUI().updateDjsScore(msg.getIntegral());
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////
    RoomMediator.prototype.quickRank = function (msg) {
        var type = msg.getType(); //0比赛中，1比赛结束
        if (type == 1) {
            var view = new KssResultView(msg);
            var med = new KssResultMediator(view);
            burn.Director.pushView(med);
            return;
        }
        var msgList = msg.getRank();
        var lenMsg = msgList.length;
        this._arrQuickInfo.length = 0;
        for (var i = 0; i < lenMsg; i++) {
            var itemObj = new QuickInfo(msgList[i]);
            this._arrQuickInfo.push(itemObj);
            var roomer = this._roomModel.getRoomerById(itemObj.getUserId());
            if (roomer) {
                roomer.getDjsObj().grandPrixBulletNum = itemObj.getBulletNum();
                roomer.getDjsObj().grandPrixIntegral = itemObj.getIntegral();
            }
        }
        var len = this._arrQuickInfo.length;
        //排序
        function sortFun(a, b) {
            if (a.getIntegral() > b.getIntegral()) {
                return -1;
            }
            else if (a.getIntegral() < b.getIntegral()) {
                return 1;
            }
            else {
                return 0;
            }
        }
        this._arrQuickInfo.sort(sortFun);
        var myIndex = -1;
        len = this._arrQuickInfo.length;
        for (var i = 0; i < len; i++) {
            var item = this._arrQuickInfo[i];
            if (item.getUserId() == this._userModel.getUserId()) {
                myIndex = i;
                break;
            }
        }
        if (myIndex == -1 || this._arrQuickInfo.length < 4) {
            return;
        }
        //找到需要显示的4名数据
        var arrUIData = new Array();
        if (myIndex <= 3) {
            arrUIData.push(this._arrQuickInfo[0]);
            arrUIData.push(this._arrQuickInfo[1]);
            arrUIData.push(this._arrQuickInfo[2]);
            arrUIData.push(this._arrQuickInfo[3]);
        }
        else {
            arrUIData.push(this._arrQuickInfo[0]);
            arrUIData.push(this._arrQuickInfo[1]);
            arrUIData.push(this._arrQuickInfo[2]);
            arrUIData.push(this._arrQuickInfo[myIndex]);
        }
        //通知刷新UI
        var roomView = this.getView();
        roomView.getRoomUI().changeKssInfoList(arrUIData, myIndex);
        var roomerList = this._roomModel.getRoomerList();
        var myPos = this._roomModel.getRoomerById(this._userModel.getUserId()).getRoomPos();
        var isFlip = roomView.isFlip();
        for (var i = 0; i < roomerList.length; i++) {
            if (roomerList[i].getRoomPos() != myPos) {
                roomView.getRoomUI().updateDjdBulletNum(roomerList[i].getDjsObj().grandPrixBulletNum);
                roomView.getRoomUI().updateDjsScore(roomerList[i].getDjsObj().grandPrixIntegral);
            }
            else {
                roomView.getRoomUI().updateDjsScore(roomerList[i].getDjsObj().grandPrixIntegral);
            }
        }
    };
    //快速赛等待
    RoomMediator.prototype.quitGameIntoRoom = function (msg) {
        var peopleNum = msg.getCurNum();
        this._peopleNum = Number(peopleNum);
        burn._Notification_.send(NotifyEnum.CHANGE_WAIT_PEOPLE, { num: peopleNum });
        this._kssEndTime = Number(msg.getEndSec());
        // if(this._uiLoadComplete){
        if (peopleNum >= 8) {
            var view = this.getView();
            if (view.getRoomUI()) {
                view.getRoomUI().startKssTime(Number(msg.getEndSec()));
            }
            else {
                this._kssEndTime = Number(msg.getEndSec());
            }
            //如果是第二次进入快速赛。则不显示321go
            var roomer = this._roomModel.getRoomerById(this._userModel.getUserId());
            if (!roomer) {
                return;
            }
            var num = roomer.getDjsObj().grandPrixBulletNum;
            if (num >= 600) {
                game.util.GameUtil.play321Go(view.getRoomUI(), function () {
                    console.log("#---------------------------");
                });
            }
        }
        // }
    };
    //世界boss信息变动
    RoomMediator.prototype.worldBossInfo = function (msg) {
        var phoenixObj = this._roomModel.getPhoenix();
        if (!phoenixObj) {
            this._roomModel.setPhoenix(new game.model.PhoenixObj(msg));
        }
        else {
            phoenixObj.changeData(msg);
        }
        var state = msg.getState();
        if (state == Phoenix_State.ShieldDead) {
            //护盾碎了
            this.phoenixDead(msg.getUserId(), msg.getItems(), false);
        }
        else if (state == Phoenix_State.Dead) {
            //凤凰死了
            this.phoenixDead(msg.getUserId(), msg.getItems(), true);
        }
        else if (state == Phoenix_State.Coming) {
            this.getView().bossComing(201);
        }
        burn._Notification_.send(NotifyEnum.CHANGE_PHOENIX_UI);
    };
    //凤凰UI变更
    RoomMediator.prototype.phoenixUI = function (obj, target) {
        var view = target.getView();
        var phoenixObj = target._roomModel.getPhoenix();
        if (!phoenixObj) {
            return;
        }
        if (!view.getRoomUI()) {
            return;
        }
        if (phoenixObj.getState() == Phoenix_State.Paolule) {
            view.getRoomUI().clearPhoenixUI();
            view.getRoomUI().clearPhoenixTop();
            return;
        }
        if (phoenixObj.getState() == Phoenix_State.Dead) {
            view.getRoomUI().clearPhoenixUI();
            view.getRoomUI().clearPhoenixTop();
            return;
        }
        if (phoenixObj.getState() != Phoenix_State.Ing) {
            //干掉这些UI
            view.getRoomUI().clearPhoenixUI();
            view.getRoomUI().addShieldTopPanel();
        }
        else {
            view.getRoomUI().addPhoenixShield(phoenixObj.getCurShield(), phoenixObj.getMaxShield());
            view.getRoomUI().clearPhoenixTop();
        }
    };
    //播放特效
    RoomMediator.prototype.phoenixDead = function (userId, items, isPhoenix) {
        var uniqId = Especial_Fish.Phoenix;
        var view = this.getView();
        var fishList = view.getFishList();
        var roomer = this._roomModel.getRoomerById(userId);
        var item = null;
        var to = new egret.Point(0, 0);
        if (roomer) {
            item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
            to = new egret.Point(item.x, item.y);
        }
        if (isPhoenix) {
            //弄死这条鱼,从list中清除
            RoomUtil.fishDeadHandler(fishList, uniqId, userId, to, items, view.getRoomUI(), view);
        }
        if (!view.getRoomUI()) {
            return;
        }
        var fish = RoomUtil.getFishById(view.getFishList(), Especial_Fish.Phoenix);
        if (fish == null) {
            console.warn("此条鱼不存在：" + uniqId);
            return;
        }
        if (roomer) {
            //如果是黄金鱼，特殊鱼。播放金币特效
            //functionType == 2
            var goldCount = 0;
            var dropX = 0;
            var dropY = 0;
            if (fish.getType() == AddFishType.FISH) {
                var p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            else {
                var p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            var parent_4 = view.getBulletLayer();
            var data = RES.getRes("ef_baojinbi_json");
            var txtr = RES.getRes("ef_baojinbi_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            var goldIcon_3 = new MovieFish(mcFactory.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
            goldIcon_3.initEvent();
            goldIcon_3.scaleX = 2.3;
            goldIcon_3.scaleY = 2.3;
            goldIcon_3.frameRate = 12;
            goldIcon_3.visible = false;
            var dataMc = goldIcon_3.movieClipData;
            var frameCur = 0;
            var Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
            goldIcon_3.anchorOffsetX = (goldIcon_3.width >> 1) + Rect.x;
            goldIcon_3.anchorOffsetY = (goldIcon_3.height >> 1) + Rect.y;
            goldIcon_3.frameRate = 12;
            goldIcon_3.x = dropX;
            goldIcon_3.y = dropY;
            var baojinbiBg_3 = new egret.Bitmap(RES.getRes("baojinbiBg_png"));
            baojinbiBg_3.anchorOffsetX = (baojinbiBg_3.width >> 1);
            baojinbiBg_3.anchorOffsetY = (baojinbiBg_3.height >> 1);
            baojinbiBg_3.x = dropX;
            baojinbiBg_3.y = dropY;
            parent_4.addChild(baojinbiBg_3);
            parent_4.addChild(goldIcon_3);
            var twBg_3 = egret.Tween.get(baojinbiBg_3, { loop: false });
            baojinbiBg_3.scaleY = 0;
            baojinbiBg_3.scaleX = 0;
            baojinbiBg_3.visible = false;
            twBg_3.
                wait(100)
                .call(function () {
                goldIcon_3.visible = true;
                baojinbiBg_3.visible = true;
                goldIcon_3.gotoAndPlay("play", 1);
            })
                .to({ scaleX: 2, scaleY: 2 }, 300)
                .to({ alpha: 0 }, 300)
                .call(function () {
                egret.Tween.removeTweens(twBg_3);
                parent_4.removeChild(baojinbiBg_3);
            });
            if (uniqId == Especial_Fish.Phoenix) {
                //震屏
                RoomUtil.shakeWindowByFish(view);
            }
            if (to.y > 360) {
                to.y = 670;
            }
            else {
                to.y = 50;
            }
            //飞金币
            for (var i = 0; i < items.length; i++) {
                var itemId = Number(items[i].itemId);
                var count = Number(items[i].count);
                if (itemId == 10001) {
                    game.util.FrameUtil.playAddCoinsEff(count, new egret.Point(dropX, dropY), view.getRoomUI(), userId);
                    game.util.GameUtil.flyCoins(count, 201, new egret.Point(dropX, dropY), new egret.Point(to.x, to.y), view.getRoomUI(), userId);
                    game.util.SoundManager.playEffectSound("drop_gold");
                }
            }
        }
        if (!isPhoenix) {
            var phoenixObj = this._roomModel.getPhoenix();
            var cur = phoenixObj.getCurShield();
            var max = phoenixObj.getMaxShield();
            if ((max - cur) <= 0) {
                fish.removeEffect("boss_shield_png");
            }
        }
        //护盾碎了
        // if(!isPhoenix)
        // {
        //     fish.removeEffect("boss_shield_png");
        // }
    };
    //鱼被击中死亡
    RoomMediator.prototype.fishHitBack = function (msg) {
        var view = this.getView();
        var userId = msg.getUserId();
        var roomer = this._roomModel.getRoomerById(userId);
        if (!roomer) {
            return;
        }
        var item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        var to = new egret.Point(item.x, item.y);
        if (to.y > 360) {
            to.y = 670;
        }
        else {
            to.y = 50;
        }
        var uniqId = msg.getFishId();
        var fishList = view.getFishList();
        //如果是黄金鱼，特殊鱼。播放金币特效
        //functionType == 2
        var fish = RoomUtil.getFishById(view.getFishList(), uniqId);
        if (fish == null) {
            console.warn("此条鱼不存在：" + uniqId);
            return;
        }
        var fishVo = game.table.T_Fish_Table.getVoByKey(fish.getFishId());
        if (fishVo.functionType == 2) {
            var bFind = false;
            var goldCount = 0;
            var items = msg.getItems();
            for (var i = 0; i < items.length; i++) {
                var itemId = items[i].itemId;
                if (itemId == 10001) {
                    bFind = true;
                    goldCount = items[i].count;
                }
            }
            if (!bFind) {
                return;
            }
            var dropX = 0;
            var dropY = 0;
            if (fish.getType() == AddFishType.FISH) {
                var p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            else {
                var p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            if (game.util.GorgeousManager.getState()) {
                var parent_5 = view.getBulletLayer();
                var data = RES.getRes("ef_baojinbi_json");
                var txtr = RES.getRes("ef_baojinbi_png");
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var goldIcon_4 = new MovieFish(mcFactory.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
                goldIcon_4.initEvent();
                // goldIcon.blendMode = egret.BlendMode.ADD;
                goldIcon_4.scaleX = 2.3;
                goldIcon_4.scaleY = 2.3;
                goldIcon_4.frameRate = 12;
                //goldIcon.gotoAndPlay("play", 1);
                goldIcon_4.visible = false;
                var dataMc = goldIcon_4.movieClipData;
                var frameCur = 0;
                var Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
                goldIcon_4.anchorOffsetX = (goldIcon_4.width >> 1) + Rect.x;
                goldIcon_4.anchorOffsetY = (goldIcon_4.height >> 1) + Rect.y;
                goldIcon_4.frameRate = 12;
                goldIcon_4.x = dropX;
                goldIcon_4.y = dropY;
                var baojinbiBg_4 = new egret.Bitmap(RES.getRes("baojinbiBg_png"));
                baojinbiBg_4.anchorOffsetX = (baojinbiBg_4.width >> 1);
                baojinbiBg_4.anchorOffsetY = (baojinbiBg_4.height >> 1);
                baojinbiBg_4.x = dropX;
                baojinbiBg_4.y = dropY;
                parent_5.addChild(baojinbiBg_4);
                parent_5.addChild(goldIcon_4);
                var twBg_4 = egret.Tween.get(baojinbiBg_4, { loop: false });
                baojinbiBg_4.scaleY = 0;
                baojinbiBg_4.scaleX = 0;
                baojinbiBg_4.visible = false;
                twBg_4.
                    wait(100)
                    .call(function () {
                    goldIcon_4.visible = true;
                    baojinbiBg_4.visible = true;
                    goldIcon_4.gotoAndPlay("play", 1);
                })
                    .to({ scaleX: 2, scaleY: 2 }, 300)
                    .to({ alpha: 0 }, 300)
                    .call(function () {
                    egret.Tween.removeTweens(twBg_4);
                    parent_5.removeChild(baojinbiBg_4);
                });
                //震屏
                RoomUtil.shakeWindowByFish(view);
            }
            //播放一个圆盘
            var lotteryModel = burn.Director.getModelByKey(LotteryModel);
            var maxScore = game.table.T_Config_Table.getVoByKey(17).value;
            if (lotteryModel.getScore() >= Number(maxScore)) {
                game.util.FrameUtil.playCaipan(view, roomer, goldCount, "-1", true);
            }
            else {
                var roomType = this._userModel.getMatchRoomLevel();
                //竞技类赛事不进奖池
                if (roomType == RequesetRoomState.DjsRoom ||
                    roomType == RequesetRoomState.QmsRoom ||
                    game.util.GameUtil.isKss(roomType)) {
                    game.util.FrameUtil.playCaipan(view, roomer, goldCount, "-1", true);
                }
                else {
                    game.util.FrameUtil.playCaipan(view, roomer, goldCount);
                }
            }
        }
        /** 测试特效 */
        /////////////////////////////////
        var itemsWar = msg.getItems();
        var listWar = new Array();
        var showGoldWar = false;
        for (var i = 0; i < itemsWar.length; i++) {
            var itemId = itemsWar[i].itemId;
            if (itemId == PropEnum.BRONZE_WARHEAD) {
                listWar.push(Number(itemId));
            }
            else if (itemId == PropEnum.SILVER_WARHEAD) {
                listWar.push(Number(itemId));
            }
            else if (itemId == PropEnum.GOLD_WARHEAD) {
                listWar.push(Number(itemId));
                showGoldWar = true;
            }
        }
        //排序
        function compareFun(item1, item2) {
            if (item1 > item2) {
                return 1; // 如果是降序排序，返回-1。
            }
            else if (item1 === item2) {
                return 0;
            }
            else {
                return -1; // 如果是降序排序，返回1。
            }
        }
        if (listWar.length > 0) {
            if (listWar.length > 1) {
                listWar.sort(compareFun);
            }
            var id = listWar[0];
            //warHead_5003_png
            //播放一个圆盘
            game.util.FrameUtil.playCaipan(view, roomer, 0, "" + id);
        }
        //弹出分享
        if (showGoldWar && roomer.getUserId() == this._userModel.getUserId()) {
            if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
                var yaoQingView = new ShareZiYou(ShareType.Share_GuangYU);
                view.addChild(yaoQingView);
            }
        }
        /* TEST 电鳗
        let deadList = RoomUtil.getMaxScoreFishByNum(view.getFishList(),5);
        let listDead = new Array<any>();
        for(let i = 0; i < deadList.length; i++)
        {
            listDead.push({fishId:deadList[i].getUniqId()});
        }
        room.OneKillMany.killMany(view, userId, uniqId, listDead, OneKillManyType.ELECTRIC, view.getFishList(), view.getIsFlip(), view.getRoomUI());
        */
        //处理死亡与掉落逻辑
        RoomUtil.fishDeadHandler(fishList, uniqId, userId, to, msg.getItems(), view.getRoomUI(), view);
        //检查解锁炮倍逻辑
        var userModle = burn.Director.getModelByKey(UserModel);
        if (userId == userModle.getUserId()) {
            this.checkGunUpdate(null, this);
            game.util.Guide.checkGuide(GuideTrriger.FishDead);
        }
    };
    //玩家消息
    RoomMediator.prototype.levelUp = function (msg) {
        var userId = msg.getUserId();
        var oldLv = Number(msg.getOldLevel());
        var newLv = Number(msg.getNewLevel());
        var roomer = this._roomModel.getRoomerById(userId);
        if (roomer) {
            roomer.setLv(newLv);
        }
        if (userId != this._userModel.getUserId()) {
            return;
        }
        for (var i = newLv; i > oldLv; i--) {
            game.util.GameUtil.openUserLvip(null, i);
        }
        this._userModel.setLevel(newLv);
        game.util.SoundManager.playEffectSound("levelup");
    };
    //解锁炮倍返回的逻辑
    RoomMediator.prototype.updateOrForgeBack = function (msg) {
        var state = msg.getState();
        var id = msg.getUserId();
        if (state == UpdateOrForgeType.TYPE_SUC) {
            var type = msg.getType();
            if (type != GunUpdateType.UNLOCK) {
                return;
            }
            var gunId = msg.getAfterGunId();
            if (this._userModel.getUserId() == id) {
                this._userModel.setCurGunID(gunId);
            }
            var view = this.getView();
            var userId = msg.getUserId();
            var roomer = this._roomModel.getRoomerById(userId);
            var gunVo = game.table.T_Gun_Table.getVoByKey(gunId);
            if (gunVo) {
                view.setRoomerGunRate(roomer.getRoomPos(), gunVo.bulletNum);
            }
            if (this._userModel.getUserId() == id) {
                var items = msg.getItemProto();
                //掉落内容
                var itemId = items.itemId;
                var count = items.count;
                var item = new game.model.Item(itemId, count);
                if (itemId == PropEnum.GOLD) {
                    var posData = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
                    var to = new egret.Point(posData.x, posData.y);
                    if (to.y > 360) {
                        to.y = 670;
                    }
                    else {
                        to.y = 50;
                    }
                    game.util.GameUtil.flyCoinsTOTOTO(count, 8, to, null, userId);
                }
                else {
                    this._userModel.addItem(item);
                }
                burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userId, isTween: true, count: this._userModel.getMoney() });
                var gunPos = roomer.getRoomPos();
                var gun = view.getRoomUI().gunList[gunPos];
                gun.setLocked(false);
                this.checkGunUpdate(null, this);
                roomer.setGunRate(msg.getAfterGunId());
                //检测隐藏。解锁按钮
                if (gunVo) {
                    var arr = gunVo.upgradeOrForgeCost;
                    var arrData = arr.split(",");
                    if (arrData.length > 1) {
                        view.getRoomUI().setHideUnlock();
                    }
                    var arrStr = arrData[0].split("_");
                    var num = parseInt(arrStr[1]);
                    var flafMoney = (this._userModel.getMoney() >= num);
                    if (flafMoney) {
                        view.openGunUpdateGroupByEnough();
                    }
                }
            }
            if (this._userModel.getUserId() != id) {
                var gunRateVo = game.table.T_Gun_Table.getVoByKey(msg.getAfterGunId());
                if (gunRateVo == null) {
                    game.util.GameUtil.popTips(game.util.Language.getText(99));
                    return;
                }
                roomer.setGunRate(msg.getAfterGunId());
                view.setRoomerGunRate(roomer.getRoomPos(), gunRateVo.bulletNum, roomer.getIsClone());
                burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: id });
            }
        }
        else {
            if (state == UpdateOrForgeType.TYPE_MAX) {
                game.util.GameUtil.popTips(game.util.Language.getText(25));
            }
            else if (state == UpdateOrForgeType.TYPE_NOENOUGH) {
                game.util.GameUtil.popTips(game.util.Language.getText(26));
                var view1 = new UnlockGunView();
                var med = new UnlockGunMediator(view1);
                burn.Director.pushView(med);
            }
            else if (state == UpdateOrForgeType.TYPE_NULL) {
                game.util.GameUtil.popTips(game.util.Language.getText(27));
            }
        }
        if (this._userModel.getUserId() == id) {
            this.checkGunUpdate(null, this);
        }
    };
    //弹出充值界面
    RoomMediator.prototype.popCharge = function (obj, target) {
        var type = ChargeType.Ticket;
        if (obj && obj.type) {
            type = obj.type;
        }
        var userModle = target._userModel;
        if (userModle.getTicket() > 0) {
            //弹出各自类型
            var chargeView_1 = new ChargeView(type);
            var chargeMed_1 = new ChargeMediator(chargeView_1);
            burn.Director.pushView(chargeMed_1);
            return;
        }
        if (userModle.getTatolChargeRMB() <= 0) {
            //首冲
            var firstChargeView = new FirstChargeView();
            var firstChargeMed = new FirstChargeMediator(firstChargeView);
            burn.Director.pushView(firstChargeMed);
            return;
        }
        //冲过值，且没有点券，弹出点券充值界面
        var chargeView = new ChargeView(ChargeType.Ticket);
        var chargeMed = new ChargeMediator(chargeView);
        burn.Director.pushView(chargeMed);
    };
    //次日礼包相关内容
    RoomMediator.prototype.popCiri = function (obj, target) {
        //判断次日礼包状态
        var state = target._userModel.getCiriState();
        if (state != Ciri_State.Time_Up) {
            return;
        }
        var gainArr = new Array();
        var voItem = game.table.T_Config_Table.getVoByKey(57).value;
        var str = voItem.split(",");
        var len = str.length;
        for (var i = 0; i < len; i++) {
            var dataS = str[i].split("_");
            gainArr.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]), 0));
        }
        var self = this;
        game.util.GameUtil.openCiriByPos(null, gainArr, null, function () {
            var send = new NextDayAwardSendMessage();
            send.initData();
            NetManager.send(send);
            burn._Notification_.send(NotifyEnum.CLOSE_CIRI);
        });
    };
    //关闭次日礼包
    RoomMediator.prototype.closeCiri = function (obj, target) {
        setTimeout(function () {
            //关闭
            var view = target.getView();
            view.getRoomUI().addCiriBtn();
        }, 200);
    };
    //检查炮倍解锁逻辑
    RoomMediator.prototype.checkGunUpdate = function (obj, target) {
        var userId = target._userModel.getUserId();
        var roomer = target._roomModel.getRoomerById(userId);
        //最高ID
        var gunRate = target._userModel.getCurGunID();
        var gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
        if (gunRate == game.table.T_Gun_Table.getAllVo().length) {
            var view = target.getView();
            view.getRoomUI().setHideUnlock();
            return;
        }
        //判断有没有下一个炮倍
        if (gunRateVo) {
            var arr = gunRateVo.upgradeOrForgeCost;
            var arrData = arr.split(",");
            var bEnough = true;
            var nEnoughNum = 0;
            var nCurNum = 0;
            if (arrData.length > 1) {
                var view_3 = target.getView();
                if (obj) {
                    view_3.setRoomerGunRate(roomer.getRoomPos(), gunRateVo.bulletNum, roomer.getIsClone());
                    roomer.setGunRate(gunRate);
                    game.util.GameUtil.popTips(game.util.Language.getText(71));
                }
                view_3.getRoomUI().setHideUnlock();
                return;
            }
            for (var i = 0; i < 1; i++) {
                var item = arrData[i];
                var arrStr = item.split("_");
                var id = parseInt(arrStr[0]);
                var num = parseInt(arrStr[1]);
                var itemObj = new game.model.Item(id, 0);
                nEnoughNum = num;
                nCurNum = target._userModel.getMoney();
                if (nCurNum < num) {
                    bEnough = false;
                    break;
                }
            }
            var view = target.getView();
            view.setGunUpdateContains((gunRate), nCurNum, nEnoughNum);
            if (bEnough) {
                if (obj == null) {
                    view.openGunUpdateTips();
                }
                else {
                    view.openGunUpdateTips();
                    var req = new UpgradeOrForgeSendMessage();
                    req.initData();
                    req.setType(GunUpdateType.UNLOCK);
                    NetManager.send(req);
                    view.getRoomUI().getUnlockUpdateUI().openGunUpdateGroupByEnough();
                }
            }
            else {
                if (obj != null) {
                    var view_4 = target.getView();
                    view_4.setRoomerGunRate(roomer.getRoomPos(), gunRateVo.bulletNum, false);
                    roomer.setGunRate(gunRate);
                }
                if (obj == true) {
                    // burn._Notification_.send(NotifyEnum.POP_CHARGE,{type:ChargeType.Gem});
                    var view1 = new UnlockGunView();
                    var med = new UnlockGunMediator(view1);
                    burn.Director.pushView(med);
                }
                view.getRoomUI().getUnlockUpdateUI().openGunUpdateGroupByNoEnough();
            }
        }
    };
    //救济金状态返回
    RoomMediator.prototype.bankruptStauts = function (obj, target) {
        var status = obj.status;
        if (status == BankruptStauts.STATE_RESUME) {
            var userId = obj.userId;
            var myUserId = target._userModel.getUserId();
            if (userId == myUserId) {
                //重置破产信息
                target._userModel.setBankruptTime(-1);
            }
            var view = target.getView();
            var roomer = target._roomModel.getRoomerById(userId);
            view.removeBankrupt(roomer.getRoomPos());
            roomer.setBankrupt(false);
        }
        else if (status == BankruptStauts.GET_SUCC) {
            var coins = obj.coins;
            var userId = obj.userId;
            var view = target.getView();
            var roomer = target._roomModel.getRoomerById(userId);
            var item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
            var to = new egret.Point(item.x, item.y);
            if (to.y > 360) {
                to.y = 670;
            }
            else {
                to.y = 50;
            }
            game.util.GameUtil.flyCoinsTOTOTO(coins, 8, to, null, userId);
            view.removeBankrupt(roomer.getRoomPos());
            roomer.setBankrupt(false);
            target._userModel.setBankruptTime(-1);
        }
        else if (status == BankruptStauts.GET_LIMIT) {
            game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getText(35));
        }
        else if (status == BankruptStauts.NOT_TO_TIME) {
            var view_5 = target.getView();
            var userId = obj.userId;
            var roomer = target._roomModel.getRoomerById(userId);
            if (roomer.getBankrupt()) {
                return;
            }
            var time = obj.time;
            target._userModel.setBankruptTime(time);
            var residueTime = time - game.util.TimeUtil.getCurrTime();
            var timeStr = game.util.TimeUtil.sceonds2MinStr(residueTime);
            var content = game.util.Language.getDynamicText(36, [timeStr]);
            var myUserId = target._userModel.getUserId();
            if (userId == myUserId) {
                view_5.setBackrupt(roomer.getRoomPos(), content, true);
            }
            else {
                view_5.setBackrupt(roomer.getRoomPos(), content, false);
            }
            roomer.setBankrupt(true);
            setTimeout(function () {
                RoomUtil.shakeWindowByFish(view_5);
            }, 166);
        }
    };
    //更新房间内玩家子弹数量显示
    RoomMediator.prototype.updateRoomUIBullets = function (obj, target) {
        var userId = obj.userId;
        var roomer = target._roomModel.getRoomerById(userId);
        if (!roomer) {
            return;
        }
        var pos = roomer.getRoomPos();
        var num = roomer.getDjsObj().grandPrixBulletNum;
        var view = target.getView();
        view.setRoomerBullet(pos, num, obj.isTween);
    };
    //更新房间内玩家金币显示
    RoomMediator.prototype.updateRoomUICoins = function (obj, target) {
        var userId = obj.userId;
        var roomer = target._roomModel.getRoomerById(userId);
        if (!roomer) {
            return;
        }
        var pos = roomer.getRoomPos();
        var num = 0;
        if (userId == target._userModel.getUserId()) {
            num = target._userModel.getCoins();
        }
        else {
            num = roomer.getCoins();
        }
        var view = target.getView();
        view.setRoomerCoins(pos, num, obj.isTween);
        //添加一个自己的+999的数字标签
        var item = RoomUtil.getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        var to = new egret.Point(item.x, item.y);
        if (to.x > 640) {
            to.x = 1168;
        }
        else {
            to.x = 112;
        }
        if (to.y > 360) {
            to.y = 620;
        }
        else {
            to.y = 150;
        }
        //num pos 
        if (obj.count) {
            game.util.FrameUtil.playAddCoinsOnLab(obj.count, to, view.getBulletLayer());
        }
    };
    //更新房间内玩家钻石显示
    RoomMediator.prototype.updateRoomUIMoney = function (obj, target) {
        var userId = obj.userId;
        var roomer = target._roomModel.getRoomerById(userId);
        if (roomer) {
            var pos = roomer.getRoomPos();
            var num = 0;
            if (userId == target._userModel.getUserId()) {
                num = target._userModel.getMoney();
            }
            else {
                num = roomer.getMoney();
            }
            var view = target.getView();
            view.setRoomerMoney(pos, num);
        }
        if (userId == target._userModel.getUserId()) {
            burn._Notification_.send(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED);
        }
    };
    //打开抽奖界面
    RoomMediator.prototype.openLotteryUI = function (obj, target) {
        var view = target.getView();
        var userId = target._userModel.getUserId();
        var roomer = target._roomModel.getRoomerById(userId);
        var to = RoomUtil.getPointByPos(roomer.getRoomPos(), view.getIsFlip());
        view.openLotteryUI(to);
    };
    //////////////////////////////////////////////////////引导相关/////////////////////////////////////////////////////////////
    RoomMediator.prototype.guide_fishDead = function () {
        var view = this.getView();
        var userId = this._userModel.getUserId();
        var roomer = this._roomModel.getRoomerById(userId);
        var item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        var to = new egret.Point(item.x, item.y);
        if (to.y > 360) {
            to.y = 670;
        }
        else {
            to.y = 50;
        }
        var uniqId = Especial_Fish.Guide_Fish;
        var fishList = view.getFishList();
        //如果是黄金鱼，特殊鱼。播放金币特效
        //functionType == 2
        var fish = RoomUtil.getFishById(view.getFishList(), uniqId);
        if (fish == null) {
            console.warn("此条鱼不存在：" + uniqId);
            return;
        }
        var fishVo = game.table.T_Fish_Table.getVoByKey(fish.getFishId());
        if (fishVo.functionType == 2) {
            var bFind = false;
            var goldCount = 2000;
            var dropX = 0;
            var dropY = 0;
            if (fish.getType() == AddFishType.FISH) {
                var p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            else {
                var p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            var parent_6 = view.getBulletLayer();
            var data = RES.getRes("ef_baojinbi_json");
            var txtr = RES.getRes("ef_baojinbi_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            var goldIcon = new MovieFish(mcFactory.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
            goldIcon.initEvent();
            // goldIcon.blendMode = egret.BlendMode.ADD;
            goldIcon.scaleX = 2.1;
            goldIcon.scaleY = 2.1;
            goldIcon.frameRate = 8;
            goldIcon.gotoAndPlay("play", 1);
            var dataMc = goldIcon.movieClipData;
            var frameCur = 0;
            var Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
            goldIcon.anchorOffsetX = (goldIcon.width >> 1) + Rect.x;
            goldIcon.anchorOffsetY = (goldIcon.height >> 1) + Rect.y;
            goldIcon.frameRate = 10;
            goldIcon.x = dropX;
            goldIcon.y = dropY;
            parent_6.addChild(goldIcon);
            //震屏
            RoomUtil.shakeWindowByFish(view);
            //播放一个圆盘
            var lotteryModel = burn.Director.getModelByKey(LotteryModel);
            var maxScore = game.table.T_Config_Table.getVoByKey(17).value;
            if (lotteryModel.getScore() >= Number(maxScore)) {
                game.util.FrameUtil.playCaipan(view, roomer, goldCount, "-1", true);
            }
            else {
                game.util.FrameUtil.playCaipan(view, roomer, goldCount);
            }
        }
        //处理死亡与掉落逻辑
        var arr = new Array();
        RoomUtil.fishDeadHandler(fishList, uniqId, userId, to, arr, view.getRoomUI(), view);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //插入分身状态的ID
    RoomMediator.prototype.insertClonePos = function (nPos) {
        if (this._arrCloneId == null) {
            this._arrCloneId = new Array();
        }
        for (var i = 0; i < this._arrCloneId.length; i++) {
            if (this._arrCloneId[i] == nPos) {
                return;
            }
        }
        this._arrCloneId.push(nPos);
    };
    //删除分身状态
    RoomMediator.prototype.deleteClonePos = function (nPos) {
        if (this._arrCloneId == null) {
            return;
        }
        var index = -1;
        for (var i = 0; i < this._arrCloneId.length; i++) {
            if (this._arrCloneId[i] == nPos) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            this._arrCloneId.splice(index, 1);
        }
    };
    //判断当前位置是否是分身状态
    RoomMediator.prototype.isCloneByPos = function (nPos) {
        if (this._arrCloneId == null) {
            return false;
        }
        if (this._arrCloneId.length == 0) {
            return false;
        }
        for (var i = 0; i < this._arrCloneId.length; i++) {
            if (this._arrCloneId[i] == nPos) {
                return true;
            }
        }
        return false;
    };
    RoomMediator.prototype.serverFishHandler = function (msg) {
        var backList = new Array();
        var view = this.getView();
        var fishList = view.getFishList();
        var groupList = msg.getGroupIdList();
        for (var i = 0; i < groupList.length; i++) {
            var pos = groupList[i];
            var gunPos = view.getRoomUI().getGunByPos(pos);
            if (fishList.length > i) {
                var fish = fishList[fishList.length - i - 1];
                var fUid = 0;
                if (fish.getActor().getType() == AddFishType.FISH) {
                    fUid = fish.getActor().getUniqId();
                    var point = fish.getActor().localToGlobal();
                    var angle = FishUtil.getAngle(gunPos.x, gunPos.y, point.x, point.y);
                    backList.push({ groupId: pos, fishId: [fUid], pos: angle });
                }
                else if (fish.getActor().getType() == AddFishType.FISH_GROUP) {
                    var gFish = fish.getActor();
                    var gFishList = gFish.getFishList();
                    if (gFishList.length > 0) {
                        fUid = gFishList[0].getUniqId();
                        var x = gFishList[0].x;
                        var y = gFishList[0].y;
                        var point = gFishList[0].localToGlobal();
                        var angle = FishUtil.getAngle(gunPos.x, gunPos.y, point.x, point.y);
                        backList.push({ groupId: pos, fishId: [fUid], pos: angle });
                    }
                }
            }
            if (backList.length > 0) {
                var back = new GunFishPosInfoMessageMessage();
                back.initData();
                back.setFishPostList(backList);
                NetManager.send(back);
            }
        }
    };
    /** 收取邮件 */
    RoomMediator.prototype.receiMail = function (data) {
        var emailItem = new game.model.EmailItem(data.getMailId(), data.getMailType(), data.getUserId(), data.getReceiveUserName(), data.getSendUserId(), data.getSendUserName(), data.getItems(), data.getTime(), data.getState(), data.getMailContent(), data.getMailTitle());
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
    RoomMediator.prototype.destroy = function () {
        //清理公告内容
        game.util.GCBroadcastManager.clearRoomBroadcast();
        this.getView().destroy();
        //移除计时器
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        if (this._warTimer) {
            this._warTimer.removeEventListener(egret.TimerEvent.TIMER, this.warFun, this);
            this._warTimer.stop();
            this._warTimer = null;
        }
        //移除观察者
        this.unsubscribByType(NotifyEnum.GUN_SEND);
        this.unsubscribByType(NotifyEnum.HIT_FISH);
        this.unsubscribByType(NotifyEnum.USE_PROP_ITEM);
        this.unsubscribByType(NotifyEnum.USE_WARHEAD);
        this.unsubscribByType(NotifyEnum.CLICK_EXIT_ROOM);
        this.unsubscribByType(NotifyEnum.ROOM_UI_INIT_END);
        this.unsubscribByType(NotifyEnum.RESET_RATE);
        this.unsubscribByType(NotifyEnum.OPEN_LOTTERY_UI);
        this.unsubscribByType(NotifyEnum.LOCKED_FISH_DISAPPEAR);
        this.unsubscribByType(NotifyEnum.LOCKED_FISH_CHANGE);
        this.unsubscribByType(NotifyEnum.UPDATE_ROOM_UI_COINS);
        this.unsubscribByType(NotifyEnum.UPDATE_ROOM_UI_MONEY);
        this.unsubscribByType(NotifyEnum.LOTTERY_UI_LOAD_END);
        this.unsubscribByType(NotifyEnum.SET_PROP_NUM);
        this.unsubscribByType(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED);
        this.unsubscribByType(NotifyEnum.BANKRUPT_MESSAGE);
        this.unsubscribByType(NotifyEnum.SEND_CLICK_FISH);
        this.unsubscribByType(NotifyEnum.CHECK_GUN_RESET);
        this.unsubscribByType(NotifyEnum.SHOW_CHAKAN_PANEL);
        this.unsubscribByType(NotifyEnum.GUIDE_OPEN);
        this.unsubscribByType(NotifyEnum.GUIDE_CLOSE);
        this.unsubscribByType(NotifyEnum.TASK_GUIDE_PANEL_LOADED);
        this.unsubscribByType(NotifyEnum.TASK_GUIDE_CHANGE);
        this.unsubscribByType(NotifyEnum.TASK_GUIDE_LOAD);
        this.unsubscribByType(NotifyEnum.POP_EXCHANGE);
        this.unsubscribByType(NotifyEnum.POP_UPDATEEXCHANGE);
        this.unsubscribByType(NotifyEnum.SIGN_UP_DJS);
        this.unsubscribByType(NotifyEnum.DJS_TASK_CHANGE);
        this.unsubscribByType(NotifyEnum.DJS_RESULT_SEND);
        this.unsubscribByType(NotifyEnum.CLOSE_SIGN_VIEW);
        this.unsubscribByType(NotifyEnum.UPDATE_ROOM_UI_BULLETS);
        this.unsubscribByType(NotifyEnum.POP_CHARGE);
        this.unsubscribByType(NotifyEnum.POP_CIRI);
        this.unsubscribByType(NotifyEnum.CLOSE_CIRI);
        this.unsubscribByType(NotifyEnum.CHANGE_PHOENIX_UI);
        this.unsubscribByType(NotifyEnum.PRICE_TASK_CHANGE);
        this.unsubscribByType(NotifyEnum.CLEAR_PRICE_TASK);
        this.unsubscribByType(NotifyEnum.PRICE_CHALLENGE_FAIL);
        this.unsubscribByType(NotifyEnum.SHOW_PRICE_RANK);
        this.unsubscribByType(NotifyEnum.CHECN_VIP_ITEM);
        this.unsubscribByType(NotifyEnum.UPDATE_GORGEOUS_STATE);
        //移除消息监听
        game.net.MessageDispatcher.unregister(game.net.ResponseType.ADDFISH);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.INTOROOMBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.QUITROOM);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.FISHINGGUNBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.FISHINGHITBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.USEITEMBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.USEWARHEADBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.PONDSTATE);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.CHANGEGUNBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.LOCKITEMEND);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.USELOCKITEM);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.RANDOMFISHHITBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.LOTTERYCONDITONACCUMULATE);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.LEVELUP);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.PONDFISHES);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.UPGRADEORFORGEBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.FINISHTASKBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.EXCHANGEGOODSBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.GRANDPRIXSETTLEMENT);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.ARENASIGNUPBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.GRANDPRIXINFOCHANGE);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.THEPEOPLECHANGE);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.QUICKGAMEINFOCHANGE);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.QUICKGAMERANKRESULT);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.QUICKGAMEINTOROOM);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.WORLDBOSSINFOBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.PIRATERANKRESULT);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.SYNCFISHPOSINFO);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.MAIL);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.GETWANBAGIFTBACK);
    };
    return RoomMediator;
}(burn.mediator.SimpleMediator));
/** 是否打开过玩吧UI */
RoomMediator._isOpenWanbaUI = false;
__reflect(RoomMediator.prototype, "RoomMediator");
//# sourceMappingURL=RoomMediator.js.map