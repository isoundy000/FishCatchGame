class RoomMediator extends burn.mediator.SimpleMediator {
    //对象池
    private _objPool: FishingObjPool;
    //循环Timer
    private _timer: egret.Timer;
    //扔弹头的Timer
    private _warTimer: egret.Timer;
    /**war timer 相关参数 */
    private countDown: number;
    private warDisPlay: egret.DisplayObjectContainer;
    private warId: number;
    //UserModel
    private _userModel: UserModel;
    //RoomModel
    private _roomModel: RoomModel;
    //UI是否加载完毕
    private _loaderOver: boolean = false;
    //是否是在使用带头过程中
    private _isInWarhead: boolean = false;
    //当前背景音乐名字
    private _bgMusicName: string;

    //正在分身的roomPos
    private _arrCloneId: Array<number>;
    //guide
    private _lotteryUI: room.LotteryUI;
    //大奖赛是否发过消息
    private _bSendDjsResult: boolean;
    //快速赛信息列表
    private _arrQuickInfo: Array<QuickInfo>;
    //快速赛显示
    private _peopleNum: number;
    private _kssEndTime: number;
    /** 是否打开过玩吧UI */
    private static _isOpenWanbaUI: boolean = false;
    /** 假广播timer */
    private _timerBroad: egret.Timer;
    //是否开过枪
    private _isGun: boolean;

    public constructor(view: burn.view.ViewBase) {
        super(view);
        this._arrCloneId = new Array<number>();
        this._bSendDjsResult = false;
        this._arrQuickInfo = new Array<QuickInfo>();
        this._peopleNum = -1;
        this._kssEndTime = -1;
    }

    public onAdded() {
        super.onAdded();
        //初始化UI
        (this.getView() as RoomView).initView();
        //处理QQ玩吧礼包
        if (CONFIG.PLATFORM_ID == PlatformTypeEnum.QQ_ZONE && !RoomMediator._isOpenWanbaUI) {
            RoomMediator._isOpenWanbaUI = true;
            let giftId = Number(window["FISHING_CONFIG"]["giftId"]);
            if (giftId > 0) {
                game.net.MessageDispatcher.register(game.net.ResponseType.GETWANBAGIFTBACK, (msg: GetWanbaGiftBackMessage) => {
                    let state: number = msg.getResult();
                    if (state != 0) {
                        let wanbaView = new WanbaGiftView(state, msg.getRewardList());
                        let wanbaMed = new WanbaGiftMeditor(wanbaView);
                        burn.Director.pushView(wanbaMed);
                    }
                });
                let req: GetWanbaGiftMessage = new GetWanbaGiftMessage();
                req.initData();
                req.setGiftId(giftId);
                NetManager.send(req);
            }
        }
        setTimeout(function() {
            game.util.LoaderUtil.startFishingSilentLoad();
        }, 5000);
        //添加断线重连监听
        GlobalManager.getInstance().addReconnectListener();
    }

    public init(): void {
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
        game.net.MessageDispatcher.register(game.net.ResponseType.QUICKGAMEINTOROOM, (msg: QuickGameIntoRoomMessage) => {
            this.quitGameIntoRoom(msg);
        });
        //奖池信息监听消息
        game.net.MessageDispatcher.register(game.net.ResponseType.LOTTERYCONDITONACCUMULATE, (msg: LotteryConditonAccumulateMessage) => {
            this.lotteryDataReceive(msg);
        });
        //监听兑换模型
        game.net.MessageDispatcher.register(game.net.ResponseType.EXCHANGEGOODSBACK, (msg: ExchangeGoodsBackMessage) => {
            this.exchangeGoodsBack(msg);
        });
        let send: ExchangeGoodsSendMessage = new ExchangeGoodsSendMessage();
        send.initData();
        NetManager.send(send);

        //定义Timer
        this._timer = new egret.Timer(1000, 0);
        //注册事件侦听器
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        //开始计时
        this._timer.start();
        //初始化model对象
        this._userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        this._roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;

        //加载背景音乐
        let rType = this._userModel.getMatchRoomLevel();
        this._bgMusicName = FishUtil.getMusicByRoomType(rType);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.createGroup("currBgMusic", [this._bgMusicName]);
        if (CONFIG.isOpenMusic) {
            RES.loadGroup("currBgMusic");
        }
    }

    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "currBgMusic") {
            game.util.SoundManager.playBackgroundMusic(this._bgMusicName);
        }
    }
    private loadErrorCount: number = 0;
    private onResourceLoadError(event: RES.ResourceEvent): void {
        if (event.groupName == "currBgMusic") {
            console.warn("Group:" + event.groupName + " has failed to load");
            this.loadErrorCount += 1;
            if (this.loadErrorCount < 5) {
                RES.loadGroup(event.groupName);
            }
        }
    }

    /** timer */
    private timerFunc(): void {
        //清除无用的鱼类
        let roomView = (this.getView() as RoomView);
        let fishList: Array<room.action.ActionBase> = roomView.getFishList();
        let deadList: Array<room.action.ActionBase> = new Array<room.action.ActionBase>();
        let len = fishList.length;
        for (let i = 0; i < len; i++) {
            let fish = fishList[i];
            if (fish.getActor().getType() == AddFishType.FISH_GROUP) {
                if (!fish.getActionAlive()) {
                    deadList.push(fish);
                } else if ((fish.getActor() as room.actor.FishGroup).getFishList().length <= 0) {
                    deadList.push(fish);
                }
            } else if (fish.getActor().getType() == AddFishType.FISH || fish.getActor().getType() == AddFishType.CATCH_WHOLE_FISH) {
                if (!fish.getActionAlive()) {
                    deadList.push(fish);
                }
            }
        }
        //移除死鱼
        len = deadList.length;
        for (let i = 0; i < len; i++) {
            let idx = fishList.indexOf(deadList[i]);
            let actionObj = fishList.splice(idx, 1);
            if (actionObj.length > 0) {
                FishingObjPool.getInstance().insertFishPool(actionObj[0].getActor());
                actionObj[0].destory();
                actionObj[0] = null;
            }
        }
        deadList = null;
    }

    //UI加载结束
    private uiLoadEnd(obj: any, target: any): void {
        let self = target;
        let roomView = target.getView() as RoomView;
        //初始化房间内已经有的鱼和玩家
        target.initInRoomInfo();
        roomView.startRoom();
        game.util.UIUtil.closeLoading();

        //监听玩家开炮消息
        game.net.MessageDispatcher.register(game.net.ResponseType.FISHINGGUNBACK, function(msg: FishingGunBackMessage): void {
            self.gunSendBack(msg);
        });
        //监听服务器加鱼消息
        game.net.MessageDispatcher.register(game.net.ResponseType.ADDFISH, function(msg: AddFishMessage): void {
            self.addFish(msg);
        });
        game.net.MessageDispatcher.register(game.net.ResponseType.PONDFISHES, function(msg: PondFishesMessage): void {
            self.pondFish(msg);
        });
        //监听新玩家进入房间
        game.net.MessageDispatcher.register(game.net.ResponseType.INTOROOMBACK, function(msg: IntoRoomBackMessage): void {
            self.addPlayerInRoom(msg);
        });
        //监听新玩家退出房间
        game.net.MessageDispatcher.register(game.net.ResponseType.QUITROOM, function(msg: QuitRoomMessage): void {
            self.quitRoom(msg);
        });
        //监听鱼击中死亡消息
        game.net.MessageDispatcher.register(game.net.ResponseType.FISHINGHITBACK, function(msg: FishingHitBackMessage): void {
            self.fishHitBack(msg);
        });
        //道具使用监听
        game.net.MessageDispatcher.register(game.net.ResponseType.USEITEMBACK, function(msg: UseItemBackMessage): void {
            self.useItemBack(msg);
        });
        //使用弹头返回监听
        game.net.MessageDispatcher.register(game.net.ResponseType.USEWARHEADBACK, function(msg: UseWarheadBackMessage): void {
            self.useWarheadBack(msg);
        });
        //鱼塘状态监听
        game.net.MessageDispatcher.register(game.net.ResponseType.PONDSTATE, function(msg: PondStateMessage): void {
            self.setRoomState(msg.getType(), msg.getFishId(), msg.getUserId());
        });
        //监听更换炮台消息
        game.net.MessageDispatcher.register(game.net.ResponseType.CHANGEGUNBACK, function(msg: ChangeGunBackMessage): void {
            self.changeGunBack(msg);
        });
        //监听锁定目标更改的消息
        game.net.MessageDispatcher.register(game.net.ResponseType.USELOCKITEM, function(msg: UseLockItemMessage): void {
            self.changeLocked(msg);
        });
        //监听锁定、狂暴、分身状态结束消息
        game.net.MessageDispatcher.register(game.net.ResponseType.LOCKITEMEND, function(msg: LockItemEndMessage): void {
            self.lockedEnd(msg);
        });
        //一网打尽、炸弹鱼、电鳗死亡消息
        game.net.MessageDispatcher.register(game.net.ResponseType.RANDOMFISHHITBACK, function(msg: RandomFishHitBackMessage): void {
            self.killManyFish(msg);
        });
        //解锁泡杯返回监听消息
        game.net.MessageDispatcher.register(game.net.ResponseType.UPGRADEORFORGEBACK, function(msg: UpgradeOrForgeBackMessage): void {
            self.updateOrForgeBack(msg);
        });
        //监听玩家升级消息
        game.net.MessageDispatcher.register(game.net.ResponseType.LEVELUP, function(msg: LevelUpMessage): void {
            self.levelUp(msg);
        });
        //检测新手任务
        game.net.MessageDispatcher.register(game.net.ResponseType.FINISHTASKBACK, function(msg: FinishTaskBackMessage): void {
            self.taskFinishBack(msg);
        });
        //监听大奖赛结算
        game.net.MessageDispatcher.register(game.net.ResponseType.GRANDPRIXSETTLEMENT, function(msg: GrandPrixSettlementMessage): void {
            self.grandPrixSettement(msg);
        });
        //报名大奖赛返回
        game.net.MessageDispatcher.register(game.net.ResponseType.ARENASIGNUPBACK, function(msg: ArenaSignUpBackMessage): void {
            self.signUpBack(msg);
        });
        //大奖赛积分变化
        game.net.MessageDispatcher.register(game.net.ResponseType.GRANDPRIXINFOCHANGE, function(msg: GrandPrixInfoChangeMessage): void {
            self.grandPrixInfoChange(msg);
        });
        //全民赛积分变化
        game.net.MessageDispatcher.register(game.net.ResponseType.THEPEOPLECHANGE, function(msg: ThePeopleChangeMessage): void {
            self.thePeopleBack(msg);
        });
        //快速赛信息变化
        game.net.MessageDispatcher.register(game.net.ResponseType.QUICKGAMEINFOCHANGE, function(msg: QuickGameInfoChangeMessage): void {
            self.quickGameInfoChange(msg);
        });
        //快速赛信息变化&结算
        game.net.MessageDispatcher.register(game.net.ResponseType.QUICKGAMERANKRESULT, function(msg: QuickGameRankResultMessage): void {
            self.quickRank(msg);
        });

        //添加世界boss检测消息
        game.net.MessageDispatcher.register(game.net.ResponseType.WORLDBOSSINFOBACK, function(msg: WorldBossInfoBackMessage): void {
            self.worldBossInfo(msg);
        });
        //海盗任务完成
        game.net.MessageDispatcher.register(game.net.ResponseType.PIRATERANKRESULT, function(msg: PirateRankResultMessage): void {
            self.showPriceResult(msg);
        });
        //监听服务器索要时的消息
        game.net.MessageDispatcher.register(game.net.ResponseType.SYNCFISHPOSINFO, function(msg: SyncFishPosInfoMessage): void {
            self.serverFishHandler(msg);
        });
        //收到邮件
        game.net.MessageDispatcher.register(game.net.ResponseType.MAIL, function(msg: MailMessage): void {
            self.receiMail(msg);
        });
        let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        let curId = userModle.getGuideID();
        if (curId == 0) {
            game.util.Guide.checkGuide(GuideTrriger.GunSend);
        }

        let roomType = userModle.getMatchRoomLevel();
        if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom) {
            let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
            let roomer = roomModel.getRoomerById(userModle.getUserId());
            if (roomType == RequesetRoomState.DjsRoom) {
                (roomView.getRoomUI() as DajiangsaiRoomUI).setDjsUI(roomView.isFlip());
            } else if (roomType == RequesetRoomState.QmsRoom) {
                (roomView.getRoomUI() as DajiangsaiRoomUI).setQmsUI(roomView.isFlip());
            }
            (roomView.getRoomUI() as DajiangsaiRoomUI).setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), roomView.isFlip()), false);
            if (roomer.getDjsObj().grandPrixBulletNum > 0) {
                target._bSendDjsResult = false;
            }
        } else if (game.util.GameUtil.isKss(roomType)) {
            (roomView.getRoomUI() as DajiangsaiRoomUI).setKssUI(roomView.isFlip());
            //添加等待UI
            let viewKssWait = new KssWaitView(roomType - 7);
            let med: KssWaitMediator = new KssWaitMediator(viewKssWait);
            burn.Director.pushView(med);
            if (target._peopleNum != -1) {
                burn._Notification_.send(NotifyEnum.CHANGE_WAIT_PEOPLE, { num: target._peopleNum });
            }
            // if (target._kssEndTime != -1) {
            //     (roomView.getRoomUI() as DajiangsaiRoomUI).startKssTime(target._kssEndTime);
            // }
            if (target._peopleNum >= 8) {
                let view = target.getView() as RoomView;
                if (view.getRoomUI()) {
                    (view.getRoomUI() as DajiangsaiRoomUI).startKssTime(target._kssEndTime);
                }
                //如果是第二次进入快速赛。则不显示321go
                let roomer: game.model.Roomer = target._roomModel.getRoomerById(target._userModel.getUserId());
                if (roomer) {
                    let num = roomer.getDjsObj().grandPrixBulletNum;
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
        } else {
            //更新房间内玩家金币显示
            target.subscrib(NotifyEnum.UPDATE_ROOM_UI_COINS, target.updateRoomUICoins);
        }
        //更新房间内玩家钻石显示
        target.subscrib(NotifyEnum.UPDATE_ROOM_UI_MONEY, target.updateRoomUIMoney);
        //如果是快速赛,清空原有数据
        if (game.util.GameUtil.isKss(roomType)) {
            this._arrQuickInfo = new Array<QuickInfo>();
        }

        //初始化积分
        //更新所有人的积分
        if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom || game.util.GameUtil.isKss(roomType)) {
            let roomerList = target._roomModel.getRoomerList();
            let myPos = target._roomModel.getRoomerById(target._userModel.getUserId()).getRoomPos();
            let isFlip = roomView.isFlip();
            for (let i = 0; i < roomerList.length; i++) {
                if (roomerList[i].getRoomPos() != myPos) {
                    //初始化积分
                    (roomView.getRoomUI() as DajiangsaiRoomUI).setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomerList[i].getRoomPos(), isFlip), true);
                    (roomView.getRoomUI() as DajiangsaiRoomUI).setDjsScoreByPos(RoomUtil.getPosByFlip(roomerList[i].getRoomPos(), isFlip), roomerList[i].getDjsObj().grandPrixIntegral);
                } else {
                    (roomView.getRoomUI() as DajiangsaiRoomUI).setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomerList[i].getRoomPos(), isFlip), false);
                    (roomView.getRoomUI() as DajiangsaiRoomUI).updateDjsScore(roomerList[i].getDjsObj().grandPrixIntegral);
                }
            }
            //全民赛，大奖赛，没报名进入直接弹出报名界面
            if (!game.util.GameUtil.isKss(roomType)) {
                let roomer = target._roomModel.getRoomerById(userModle.getUserId());
                if (roomer.getDjsObj().grandPrixSignUp == 0) {
                    //弹出报名界面
                    (roomView.getRoomUI() as DajiangsaiRoomUI).openArenaSignView();
                }
            }
        }

        burn._Notification_.send(NotifyEnum.CHANGE_PHOENIX_UI);
        burn._Notification_.send(NotifyEnum.PRICE_TASK_CHANGE);

        let bShowExchange = true;
        if (CONFIG.openGuide) {
            let guideOver = game.table.T_Config_Table.getVoByKey(49).value;
            let curID = target._userModel.getGuideID();
            let strOver = guideOver.split(",");
            for (let i = 0; i < strOver.length; i++) {
                if (curID < Number(strOver[i])) {
                    bShowExchange = false;
                    break;
                }
            }
        }

        if (!target._userModel.bOpenedExchangeUI && bShowExchange) {
            if (!game.util.GameUtil.isKss(roomType)) {
                let exchangeView: ExchangeView = new ExchangeView();
                let exchangeMed: ExchangeMediator = new ExchangeMediator(exchangeView);
                burn.Director.pushView(exchangeMed);
                target._userModel.bOpenedExchangeUI = true;
            }
        }
        //开启家广播
        target._timerBroad = new egret.Timer(1000 * 60 * 2, 1);
        target._timerBroad.addEventListener(egret.TimerEvent.TIMER, target.broadCast, target);
        target._timerBroad.start();

    }
    private broadCast(): void {
        this._timerBroad.removeEventListener(egret.TimerEvent.TIMER, this.broadCast, this);
        this._timerBroad = null;
        this._timerBroad = new egret.Timer(1000 * 60 * 2, 1);
        this._timerBroad.addEventListener(egret.TimerEvent.TIMER, this.broadCast, this);
        this._timerBroad.start();

        let fakeStr = game.table.T_Config_Table.getVoByKey(85);
        let fakeArr = fakeStr.value.split(",");
        let tempIdx = Math.ceil(Math.random() * (fakeArr.length - 1));
        let txt = game.util.Language.getText(Number(fakeArr[tempIdx]));
        game.util.GCBroadcastManager.addRoomBroadcast(txt, 3);
        if (GlobalManager.getInstance().trumpetMsgList.length > 20) {
            GlobalManager.getInstance().trumpetMsgList.shift();
        }
        GlobalManager.getInstance().trumpetMsgList.unshift(txt);
    }

    //报名
    private signUp(obj: any, target: any): void {
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
        let roomer = roomModel.getRoomerById(userModel.getUserId());
        let view = (target.getView() as RoomView);
        view.setAutoGunFire(true);
        if (roomer.getDjsObj().grandPrixSignUp != 0) {
            //提示。
            return;
        }
        let roomType = userModel.getMatchRoomLevel();
        if (roomer.getDjsObj().todayGrandPrixTimes > 0) {
            //判断报名费够不够
            let goldStr = game.table.T_Config_Table.getVoByKey(62).value;
            let goldNum = Number(goldStr.split("_")[1]);
            let flafMoney = game.util.GameUtil.isEnough(CurrencyEnum.MONEY, goldNum, false);
            if (!flafMoney && roomer.getDjsObj().todayGrandPrixTimes != 0) {
                //钱不够
                game.util.GameUtil.openConfirmByTwoButton(null, function () {
                    game.util.GameUtil.isEnough(CurrencyEnum.MONEY, goldNum);
                }, this, game.util.Language.getText(206));
                // game.util.GameUtil.popTips(game.util.Language.getText(139));
                return;
            }
            let str = "";//155
            if (roomType == RequesetRoomState.DjsRoom) {
                str = game.util.Language.getText(140);
            } else if (roomType == RequesetRoomState.QmsRoom) {
                str = game.util.Language.getText(155);
            }
            game.util.GameUtil.openConfirmByTwoButton(null, function () {

                let send: ArenaSignUpSendMessage = new ArenaSignUpSendMessage();
                send.initData();
                send.setType(roomType);
                NetManager.send(send);

            }, this, str);
        } else {
            //免费
            let send: ArenaSignUpSendMessage = new ArenaSignUpSendMessage();
            send.initData();
            send.setType(roomType);
            NetManager.send(send);
        }
    }
    //悬赏任务变更
    private priceTaskChange(obj: any, target: any): void {
        let taskModel = target.getModel(TaskModel) as TaskModel;
        let taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
        if (taskList.length == 0) {
            //没有任务
            //干掉
            return;
        }
        let view = target.getView() as RoomView;
        let roomUI = view.getRoomUI() as RoomUI;
        if (!roomUI) {
            return;
        }
        roomUI.changePriceTask();
    }
    //悬赏任务失败
    private priceFail(obj: any, target: any): void {
        let view = target.getView() as RoomView;
        let roomUI = view.getRoomUI() as RoomUI;
        if (!roomUI) {
            return;
        }
        roomUI.showPriceFail();
    }
    //清除悬赏任务
    private clearPriceTask(obj: any, target: any): void {
        let taskModel = target.getModel(TaskModel) as TaskModel;
        let taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
        if (taskList.length == 0) {
            return;
        }
        let view = target.getView() as RoomView;
        let roomUI = view.getRoomUI() as RoomUI;
        roomUI.clearPriceTask();
        roomUI.clearPriceRank();
        let len = taskList.length;
        for (let i = 0; i < len; i++) {
            taskModel.removeItem(taskList[i].getTaskID());
        }
    }
    //显示悬赏第几名排行
    private showPriceRankUI(obj: any, target: any): void {
        let taskModel = target.getModel(TaskModel) as TaskModel;
        let taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
        if (taskList.length == 0) {
            return;
        }
        let userId = Number(obj.userId);
        let rank = Number(obj.rank);
        let view = target.getView() as RoomView;
        let roomer: game.model.Roomer = target._roomModel.getRoomerById(userId);
        if (!roomer) {
            return;
        }
        view.getRoomUI().showPriceRank(roomer.getRoomPos(), view.isFlip(), rank);
    }
    //结算海盗悬赏
    private showPriceResult(msg: PirateRankResultMessage): void {
        let type = msg.getType();//0比赛中，1比赛结束，给第一名奖励
        if (type == 0) {
            let rankArr = msg.getRank() as Array<PirateRankItemMessage>;
            let len = rankArr.length;
            for (let i = 0; i < len; i++) {
                let userId = rankArr[i].getUserId();
                let rank = rankArr[i].getRank();
                burn._Notification_.send(NotifyEnum.SHOW_PRICE_RANK, { userId: userId, rank: rank });
            }
            return;
        }
        if (type == 1) {
            //清空排行
            let view = this.getView() as RoomView;
            view.getRoomUI().clearPriceRank();
            //情况任务数据
            burn._Notification_.send(NotifyEnum.CLEAR_PRICE_TASK);
            //掉落
            let award: ItemProtoMessage = msg.getAward();
            let userId = msg.getRank()[0].getUserId();
            let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
            let item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
            let to: egret.Point = new egret.Point(item.x, item.y);
            if (to.y > 360) {
                to.y = 670;
            } else {
                to.y = 50;
            }
            game.util.GameUtil.flyItems(award.getCount(), award.getItemId(), new egret.Point(640, 0), new egret.Point(to.x, to.y), view.getRoomUI(), userId);

            if (userId != this._userModel.getUserId()) {
                burn._Notification_.send(NotifyEnum.PRICE_CHALLENGE_FAIL);
            } else {
                this._userModel.updateItem(award.getItemId(), award.getCount());
            }
        }
    }

    //检查vip对道具状态变更
    private checkVipItem(obj: any, target: any): void {
        let vipLv = target._userModel.getVipLevel();
        let view = target.getView() as RoomView;
        let roomUI = view.getRoomUI();
        let lockedRageLv = game.table.T_Config_Table.getVoByKey(34).value.split("_")[0];
        if (vipLv >= Number(lockedRageLv)) {
            roomUI.getSidePropUI().buttonRageNN.lockedImg.visible = false;
        }
        let lockedCloneLv = game.table.T_Config_Table.getVoByKey(35).value.split("_")[0];
        if (vipLv >= Number(lockedCloneLv)) {
            roomUI.getSidePropUI().buttonCloneNN.lockedImg.visible = false;
        }

        let minVipLv = game.table.T_Config_Table.getVoByKey(83).value;
        if (vipLv >= Number(minVipLv)) {
            roomUI.getNuclearBtn().lockedImg.visible = false;
        }
    }
    //更新华丽版和流畅版状态
    private updateGorgeous(obj: any, target: any): void {
        let view = target.getView() as RoomView;
        //判断波光粼粼效果
        view.addBoguang();
        //更新背景气泡特效
        view.updateStageBubble();
    }

    //大奖赛任务变更
    private djsTasjChange(obj: any, target: any): void {
        let taskModel = target.getModel(TaskModel) as TaskModel;
        let taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX);
        if (taskList.length == 0) {
            //没有任务
            return;
        }
        let view = target.getView() as RoomView;
        let roomUI = view.getRoomUI() as DajiangsaiRoomUI;
        roomUI.setDjsTask(Number(obj.times));
    }

    private djsResultSend(obj: any, target: any): void {
        if (target._bSendDjsResult) {
            return;
        }
        let send1: GrandPrixSettlementSendMessage = new GrandPrixSettlementSendMessage();
        send1.initData();
        send1.setRoomtType(target._userModel.getMatchRoomLevel());
        NetManager.send(send1);
        target._bSendDjsResult = true;

        let view: RoomView = target.getView() as RoomView;
        (view.getRoomUI() as DajiangsaiRoomUI).clearTask();
    }

    //关闭报名界面
    private closeSignView(obj: any, target: any): void {
        let view = target.getView() as RoomView;
        let roomUI = view.getRoomUI() as RoomUI;
        roomUI._bOpenSignView = false;
    }

    //设置道具数量
    private setPropNum(obj: any, target: any): void {
        let roomView = target.getView() as RoomView;
        //获取各种道具
        let frozenItem: game.model.Item = target._userModel.getItemById(PropEnum.FROZEN);
        let lockItem: game.model.Item = target._userModel.getItemById(PropEnum.LOCK);
        let cloneItem: game.model.Item = target._userModel.getItemById(PropEnum.CLONE);
        let rageItem: game.model.Item = target._userModel.getItemById(PropEnum.RAGE);
        let calabashItem: game.model.Item = target._userModel.getItemById(PropEnum.CALABASH);
        let goldItem: game.model.Item = target._userModel.getItemById(PropEnum.GOLD_WARHEAD);
        let silverItem: game.model.Item = target._userModel.getItemById(PropEnum.SILVER_WARHEAD);
        let bronzeItem: game.model.Item = target._userModel.getItemById(PropEnum.BRONZE_WARHEAD);
        let nucleareItem: game.model.Item = target._userModel.getItemById(PropEnum.NUCLEAR_WARHEAD);

        let roomType = target._userModel.getMatchRoomLevel();
        if (roomType == RequesetRoomState.QmsRoom) {
            rageItem = target._userModel.getItemById(PropEnum.FREE_RAGE);
            cloneItem = target._userModel.getItemById(PropEnum.FREE_CLONE);
        }

        let frozenNum = 0;
        let lockNum = 0;
        let cloneNum = 0;
        let rageNum = 0;
        let calabashNum = 0;
        let goldNum = 0;
        let silverNum = 0;
        let bronzeNum = 0;
        let nucleareNum = 0;
        if (frozenItem) {
            frozenNum = frozenItem.getCount();
        }
        if (lockItem) {
            lockNum = lockItem.getCount();
        }
        if (cloneItem) {
            cloneNum = cloneItem.getCount()
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
    }

    //发送开炮请求
    private gunSend(obj: any, target: any): void {
        this._isGun = true;
        let roomType = target._userModel.getMatchRoomLevel();
        target._loaderOver = true;
        let req: FishingGunSendMessage = game.util.ProtobufUtil.getInstance().getGunSend();
        req.setAngle(Number(obj.angle));
        req.setGunIndex(Number(obj.gunIndex));
        req.setBulletId(obj.bulletId);
        NetManager.send(req);
        let roomer: game.model.Roomer = target._roomModel.getRoomerById(target._userModel.getUserId());
        let view = target.getView() as RoomView;
        if (roomType != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(roomType)) {
            //处理消耗金币UI显示
            let coins = target._userModel.getCoins();
            let gunRate = roomer.getGunRate();
            let gunRateVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
            let costCoin = gunRateVo.bulletNum;
            if (view.getRage()) {
                let vipLv = target._userModel.getVipLevel();
                // 2_5
                let data = game.table.T_Config_Table.getVoByKey(34).value;
                let datas = data.split("_");
                let min = Number(datas[0]);
                let max = Number(datas[1]);
                if (vipLv >= min && vipLv < max) {
                    costCoin *= 2;
                } else if (vipLv >= max) {
                    costCoin *= 3;
                }
            }
            if (coins >= costCoin) {
                let temp = coins - costCoin;
                target._userModel.setCoins(temp);
                //更新UI显示
                view.setRoomerCoins(roomer.getRoomPos(), temp);
                //播放开炮音效
                game.util.SoundManager.playSoundEffect("gunFire_mp3");
            } else {
                if (view.getRage() && target._userModel.getCoins() > 0) {
                    let temp = 0;
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
                (view.getRoomUI() as DajiangsaiRoomUI).updateDjdBulletNum(roomer.getDjsObj().grandPrixBulletNum);
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
    }

    //自己击中鱼时的击中事件
    private hitFishSend(obj: any, target: any): void {
        let req: FishingHitSendMessage = game.util.ProtobufUtil.getInstance().getHitSend();
        req.setFishId(obj.fId);
        req.setBulletId(obj.bId);
        NetManager.send(req);
    }

    //使用弹头选中鱼
    private clickFish(obj: any, target: any): void {
        if (!target._isInWarhead) {
            return;
        }
        let view = target.getView() as RoomView;
        let fish = RoomUtil.getFishById(view.getFishList(), Number(obj));
        if (!fish) {
            return;
        }
        let fishVo = game.table.T_Fish_Table.getVoByKey(fish.getFishId());
        if (fishVo.functionType != 2) {
            game.util.GameUtil.popTips(game.util.Language.getText(44));
            return;
        }
        let lastId = view.getInHandWarHeadFish();
        let lastFish = RoomUtil.getFishById(view.getFishList(), Number(lastId));
        if (lastFish) {
            lastFish.removeEffect("locked");
            lastFish.removeEffect("WarHeadLocked");
        }
        view.setInHandWarheadFish(Number(obj));
        if (fish) {
            game.util.GameUtil.setLockedEffect(fish, "locked", "locked_circle_png");
        }
    }
    //使用弹头道具 
    private useWarHead(obj: any, target: any): void {
        if (target._isInWarhead) {
            game.util.GameUtil.popTips(game.util.Language.getText(10));
            return;
        }
        let view = target.getView() as RoomView;
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
        let warItem: game.model.Item = target._userModel.getItemById(Number(obj));
        let warId = Number(obj);
        let warNum = 0;
        if (warItem) {
            warNum = warItem.getCount();
        }
        if (warNum == 0) {
            if (warId == PropEnum.NUCLEAR_WARHEAD) {
                let minValue = game.table.T_Config_Table.getVoByKey(41).value;
                let userModel = target.getModel(UserModel) as UserModel;
                let cunGunId = userModel.getCurGunID();
                let bulletNum = game.table.T_Gun_Table.getVoByKey(cunGunId).bulletNum;
                if (bulletNum < Number(minValue)) {
                    //炮倍不足
                    game.util.GameUtil.popTips(game.util.Language.getText(129));
                    return;
                } else {
                    let nuclearVo = game.table.T_Item_Table.getVoByKey(PropEnum.NUCLEAR_WARHEAD);
                    let gemNum = Number(nuclearVo.worth.split('_')[2]);
                    let flag = game.util.GameUtil.isEnough(CurrencyEnum.MONEY, gemNum);
                    if (!flag) {
                        //钱不足
                        game.util.GameUtil.popTips(game.util.Language.getText(130));
                        return;
                    }
                }
            } else {
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
        let bonusFish = RoomUtil.getBonusFish(view.getFishList());
        if (bonusFish.length > 0) {
            view.setInHandWarheadFish(bonusFish[0].getUniqId());
            view.setSelectFishState(true);
        } else {
            game.util.GameUtil.popTips(game.util.Language.getText(5));
            target._isInWarhead = false;
            return;
        }
        //
        target.warDisPlay = new egret.DisplayObjectContainer();
        let label: egret.TextField = new egret.TextField();
        label.size = 35;
        label.text = game.util.Language.getText(43);
        label.anchorOffsetX = label.width / 2;
        label.anchorOffsetY = label.height / 2;
        label.textAlign = egret.HorizontalAlign.CENTER;

        let txtr: egret.Texture = RES.getRes("tipBg_png");//43,0,0,44
        let img: egret.Bitmap = new egret.Bitmap(txtr);
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
        let warHeadID = Number(obj);
        target.warId = warHeadID;
        if (warHeadID == PropEnum.GOLD_WARHEAD) {
            view.getRoomUI().goldBulletBtn.startBtnTick();
        } else if (warHeadID == PropEnum.SILVER_WARHEAD) {
            view.getRoomUI().silverBulletBtn.startBtnTick();
        } else if (warHeadID == PropEnum.BRONZE_WARHEAD) {
            view.getRoomUI().bronzeBulletBtn.startBtnTick();
        } else if (warHeadID == PropEnum.NUCLEAR_WARHEAD) {
            view.getRoomUI().nuclearBulletBtn.startBtnTick();
        }
        target._warTimer = new egret.Timer(1000, 3);
        target.countDown = 3;
        //注册事件侦听器
        target._warTimer.addEventListener(egret.TimerEvent.TIMER, target.warFun, target);
        target._warTimer.start();
    }
    private warFun(): void {
        let target = this;
        let view = target.getView() as RoomView;
        let bonusFish = RoomUtil.getBonusFish(view.getFishList());
        if (bonusFish.length > 0) {
            view.setSelectFishState(true);
            view.showNum(target.countDown);
            for (let i = 0; i < bonusFish.length; i++) {
                let locked: egret.Bitmap = null;
                if (view.getInHandWarHeadFish() == bonusFish[i].getUniqId()) {
                    game.util.GameUtil.setLockedEffect(bonusFish[i], "locked", "locked_circle_png", true);
                } else {
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
                let send = new UseWarheadSendMessage();
                send.initData();
                send.setItemId(target.warId);
                send.setUniId(view.getInHandWarHeadFish());
                NetManager.send(send);

                game.util.SoundManager.playEffectSound("ddz25");
                for (let i = 0; i < bonusFish.length; i++) {
                    bonusFish[i].removeEffect("locked");
                }
                view.setSelectFishState(false);
                target._isInWarhead = false;
            }
        } else {
            //没有奖金鱼，不能使用弹头。
            game.util.GameUtil.popTips(game.util.Language.getText(5));
            this._warTimer.stop();
            this._warTimer = null;
            view.setSelectFishState(false);
            target._isInWarhead = false;
            view.getBulletLayer().removeChild(target.warDisPlay);

            let warHeadID = target.warId;
            if (warHeadID == PropEnum.GOLD_WARHEAD) {
                view.getRoomUI().goldBulletBtn.stopBtnTick();
            } else if (warHeadID == PropEnum.SILVER_WARHEAD) {
                view.getRoomUI().silverBulletBtn.stopBtnTick();
            } else if (warHeadID == PropEnum.BRONZE_WARHEAD) {
                view.getRoomUI().bronzeBulletBtn.stopBtnTick();
            } else if (warHeadID == PropEnum.NUCLEAR_WARHEAD) {
                view.getRoomUI().nuclearBulletBtn.stopBtnTick();
            }
            let rbonusFish = RoomUtil.getBonusFish(view.getFishList());
            for (let i = 0; i < rbonusFish.length; i++) {
                rbonusFish[i].removeEffect("locked");
            }
        }
    }
    //使用弹头消息返回
    private useWarheadBack(msg: UseWarheadBackMessage): void {
        let view = this.getView() as RoomView;
        RoomUtil.shakeWindow(view);
        game.util.GameUtil.bobmHexEffect(view.getBulletLayer(), function (msg, view) {
            game.util.SoundManager.playEffectSound("cycle_bomb");
            let fishUid = msg.getUniId();
            let userId = msg.getUserId();
            let coins = msg.getAddCoins();
            let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
            let item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
            let to: egret.Point = new egret.Point(item.x, item.y);
            if (to.y > 360) {
                to.y = 670;
            } else {
                to.y = 50;
            }
            //userId 和自己不匹配。不显示暴富特效
            if (userId == this._userModel.getUserId()) {
                let dropX = CONFIG.contentWidth / 2;
                let dropY = CONFIG.contentHeight / 2;
                let data = RES.getRes("ef_baojinbi_json");
                let txtr = RES.getRes("ef_baojinbi_png");
                let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);

                let goldIcon = new MovieFish(mcFactory.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
                goldIcon.initEvent();
                // goldIcon.blendMode = egret.BlendMode.ADD;
                goldIcon.scaleX = 2.3;
                goldIcon.scaleY = 2.3;
                goldIcon.frameRate = 12;
                //goldIcon.gotoAndPlay("play", 1);
                goldIcon.visible = false;
                let dataMc: egret.MovieClipData = goldIcon.movieClipData;

                let frameCur = 0;
                let Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
                goldIcon.anchorOffsetX = (goldIcon.width >> 1) + Rect.x;
                goldIcon.anchorOffsetY = (goldIcon.height >> 1) + Rect.y;
                goldIcon.frameRate = 12;
                goldIcon.x = dropX;
                goldIcon.y = dropY;
                let parent = view.getBulletLayer();
                parent.addChild(goldIcon);

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

        let fishUid = msg.getUniId();
        let userId = msg.getUserId();
        let coins = msg.getAddCoins();
        let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
        let item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        let to: egret.Point = new egret.Point(item.x, item.y);
        if (to.y > 360) {
            to.y = 670;
        } else {
            to.y = 50;
        }
        setTimeout(function () {
            RoomUtil.fishDeadHandler(view.getFishList(), fishUid, userId, to, [{ itemId: 10001, count: coins }], view.getRoomUI(), view);
        }, 800);
    }
    //道具使用
    private usePropItemSend(obj: any, target: any): void {
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let roomType = userModel.getMatchRoomLevel();
        if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom) {
            let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
            let roomer = roomModel.getRoomerById(userModel.getUserId());
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
        let phoenixObj: game.model.PhoenixObj = target._roomModel.getPhoenix();
        if (phoenixObj) {
            if (phoenixObj.getState() == Phoenix_State.Ing) {
                if (Number(obj) == PropEnum.CALABASH) {
                    game.util.GameUtil.popTips(game.util.Language.getText(159));
                    return;
                }
            }
        }

        if (CONFIG.openGuide) {
            let guideOver = game.table.T_Config_Table.getVoByKey(49).value;
            let curID = userModel.getGuideID();
            if (curID < Number(guideOver)) {
                let itemLock = game.table.T_Config_Table.getVoByKey(47).value;
                let param = itemLock.split("_");
                if (curID >= Number(param[0]) && curID <= Number(param[1])) {
                    game.util.GameUtil.popTips("请先进行完新手引导");
                    return;
                }
            }
        }

        let itemId = Number(obj);
        if (itemId == PropEnum.LOCK || itemId == PropEnum.RAGE || itemId == PropEnum.CLONE) {
            let userId = target._userModel.getUserId();
            let roomer: game.model.Roomer = target._roomModel.getRoomerById(userId);
            if (roomer.getBankrupt()) {
                game.util.GameUtil.popTips(game.util.Language.getText(2));
                return;
            }
        }

        if (target._isInWarhead) {
            if (true) {//(Number(obj) != PropEnum.GOLD_WARHEAD && Number(obj) != PropEnum.SILVER_WARHEAD)
                game.util.GameUtil.popTips(game.util.Language.getText(45));
                return;
            }
        }

        if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
            if (Number(obj) == PropEnum.RAGE) {
                obj = PropEnum.FREE_RAGE;
            } else if (Number(obj) == PropEnum.CLONE) {
                obj = PropEnum.FREE_CLONE;
            }
        }
        let view = target.getView() as RoomView;
        let send: UseItemSendMessage = new UseItemSendMessage();
        send.initData();
        send.setItemId(obj);
        NetManager.send(send);
    }

    //使用道具返回
    private useItemBack(msg: UseItemBackMessage): void {
        let view = this.getView() as RoomView;
        let userId = msg.getUserId();
        let state = msg.getState();
        if (state != 1) {
            //game.util.GameUtil.popTips(game.util.Language.getText(12));
            if (state == UseItemFail.USE_ITEM_NO_ITEM_NO_MONEY) {
                game.util.GameUtil.popTips(game.util.Language.getText(82));
            } else if (state == UseItemFail.USE_ITEM_NO_VIP_LEVEL) {
                game.util.GameUtil.popTips(game.util.Language.getText(83));
            } else if (state == UseItemFail.USE_ITEM_LOCK_CONFLICT) {
                game.util.GameUtil.popTips(game.util.Language.getText(84));
            } else if (state == UseItemFail.USE_ITEM_BEFORE_TIDE) {
                game.util.GameUtil.popTips(game.util.Language.getText(85));
            } else if (state == UseItemFail.USE_ITEM_SCORE_TOO_SMALL_USE_TOKEN) {
                game.util.GameUtil.popTips(game.util.Language.getText(87));
            } else if (state == UseItemFail.USE_ITEM_ALIVE_FISHES_TOO_MUCH) {
                game.util.GameUtil.popTips(game.util.Language.getText(88));
            }
            //*/
            return;
        }
        let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
        //获取使用的道具id
        let itemId: number = msg.getItemId();
        //
        if (userId == this._userModel.getUserId()) {
            let itemNum = 0;
            let item = this._userModel.getItemById(itemId);
            if (item) {
                itemNum = item.getCount();
            }
            if (itemNum == 0) {
                //扣钻石
                let itemVo = game.table.T_Item_Table.getVoByKey(itemId);
                let cost = Number(itemVo.worth.split('_')[2]);
                if (this._userModel.getMoney() >= cost) {
                    this._userModel.setMoney(this._userModel.getMoney() - cost);
                    burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userId });
                }
            }
        }
        if (itemId == PropEnum.RAGE || itemId == PropEnum.FREE_RAGE) {  //狂暴    
            roomer.setIsRage(true);
            view.setRageEffect(true, roomer.getRoomPos());
            if (userId == this._userModel.getUserId()) {
                burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
                view.getRoomUI().getSidePropUI().buttonRageNN.startBtnTick();
                view.setRage(true);
                //自己狂暴开始
                if (!view.getLocked() && !view.getClone()) {//如果自己并没有锁定状态的{
                    //走一遍锁定逻辑
                    let roomer = this._roomModel.getRoomerById(userId);
                    //view.setLockedPos(roomer.getRoomPos());
                    let fish = RoomUtil.getMaxScoreFish(view.getFishList());
                    //view.setLocked(fish.getUniqId());
                    let arrLocked = new Array<number>();
                    arrLocked.push(fish.getUniqId());
                    let obj: LockedObj = new LockedObj(arrLocked, roomer.getRoomPos(), userId);
                    view.setLockedObj(obj);
                    if (userId == this._userModel.getUserId()) {
                        game.util.GameUtil.setLockedEffect(fish, "locked", "locked_circle_png", true);
                        view.send(NotifyEnum.LOCKED_FISH_CHANGE, { fishId: fish.getUniqId(), gunIndex: 0 });
                    }
                }
            } else {
                //其他人狂暴开始
                if (!roomer.getIsLock() && !roomer.getIsClone()) {
                    let fish = RoomUtil.getMaxScoreFish(view.getFishList());
                    let arrLocked = new Array<number>();
                    arrLocked.push(fish.getUniqId());
                    let obj: LockedObj = new LockedObj(arrLocked, roomer.getRoomPos(), userId);
                    view.setLockedObj(obj);
                }
            }
        } else if (itemId == PropEnum.LOCK) {   //锁定
            let fish = RoomUtil.getMaxScoreFish(view.getFishList());
            if (!fish) {
                return;
            }
            roomer.setIsLock(true);
            view.setLockedEffect(true, roomer.getRoomPos());
            //view.setLockedPos(roomer.getRoomPos());
            //view.setLocked(fish.getUniqId());
            let arrLocked = new Array<number>();
            arrLocked.push(fish.getUniqId());
            let obj: LockedObj = new LockedObj(arrLocked, roomer.getRoomPos(), userId);
            view.setLockedObj(obj);
            if (userId == this._userModel.getUserId()) {
                burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
                game.util.GameUtil.setLockedEffect(fish, "locked", "locked_circle_png", true);
                view.send(NotifyEnum.LOCKED_FISH_CHANGE, { fishId: fish.getUniqId(), gunIndex: 0 });
                view.setLocked(true);
                view.getRoomUI().getFrozenAndLockUI().buttonLockNN.startBtnTick();
            }
        } else if (itemId == PropEnum.CLONE || itemId == PropEnum.FREE_CLONE) {  //分身
            roomer.setIsClone(true);
            view.setCloneEffect(true, roomer.getRoomPos());
            let gunNum = roomer.getGunNum();
            //TODO:暂时默认分身3个炮管
            let fishList = RoomUtil.getMaxScoreFishByNum(view.getFishList(), gunNum);
            let arrLocked = new Array<number>();
            for (let i = 0; i < fishList.length; i++) {
                arrLocked.push(fishList[i].getUniqId());
                //console.log("#----------index---->",i,"-------id---->",fishList[i].getUniqId());
                view.send(NotifyEnum.LOCKED_FISH_CHANGE, { fishId: fishList[i].getUniqId(), gunIndex: i });
                if (userId == this._userModel.getUserId()) {
                    game.util.GameUtil.setLockedEffect(fishList[i], "locked", "locked_circle_png", true);
                }
            }
            let pos = roomer.getRoomPos();
            let obj: LockedObj = new LockedObj(arrLocked, pos, userId);
            view.setLockedObj(obj);

            if (userId == this._userModel.getUserId()) {
                burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
                view.setClone(true);
                view.setGunNum(gunNum);
                view.getRoomUI().getSidePropUI().buttonCloneNN.startBtnTick();
            } else {
                //其他人开炮
                //RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip())

                view.getRoomUI().setGunState(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), true, 3, roomer.getRoomPos());
                this.insertClonePos(roomer.getRoomPos());
            }
        } else if (itemId == PropEnum.FROZEN) {   //冰冻
            let fishIds = msg.getFrozenFishIds();
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
        } else if (itemId == PropEnum.CALABASH) {   //葫芦
            let addFishObj = msg.getAddFish();
            let fishId = addFishObj.fishId;
            let uniqId = addFishObj.uniId;
            let pathId = addFishObj.pathId;
            let corrdX = addFishObj.coordinate.xvalue;
            let corrdY = addFishObj.coordinate.yvalue;
            //为葫芦添加在路径上的起始点
            let pathVo = game.table.T_FishPath_Table.getVoByKey(pathId);
            if (pathVo != null) {
                let arr: Array<room.action.PathPoint> = RoomUtil.getFishPathById(pathId);
                let pObj = RoomUtil.getPointsByCala(arr, pathVo.calabashPoint);
                let p = pObj.point;
                view.useCalabash(roomer.getRoomPos(), uniqId[0], fishId, pathId,
                    corrdX, corrdY, corrdX + p.x, corrdY + p.y, pathVo.calabashPoint);
            } else {
                //如果葫芦没随机出鱼，就随机一个点播放动画
                view.useCalabash(roomer.getRoomPos(), uniqId[0], fishId, pathId, corrdX, corrdY,
                    400 * Math.random() + 400, 200 * Math.random() + 200, -1);
            }
            if (userId == this._userModel.getUserId()) {
                view.getRoomUI().getSidePropUI().buttonCalabashNN.startBtnTick();
                game.util.SoundManager.playEffectSound("godlamp_begin");
            }
        }
        //刷新道具信息
        burn._Notification_.send(NotifyEnum.SET_PROP_NUM);
    }
    //自己更改锁定目标
    private changeLockedFish(obj: any, target: any): void {
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let send: UseLockItemMessage = new UseLockItemMessage();
        send.initData();
        send.setUserId(userModel.getUserId());
        send.setFishId(parseInt(obj.fishId));
        send.setGunIndex(parseInt(obj.gunIndex));
        send.setItemId(0);
        NetManager.send(send);
    }
    //锁定的鱼不存在了，重新寻找鱼
    private lockedFishDisappear(obj: any, target: any): void {
        let index = Number(obj.index);
        let simple = Boolean(obj.simple);
        let view = target.getView() as RoomView;
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let bFindFish: room.actor.FishBase = null;
        //getMaxScoreFishByNum 找仨最高分的。看谁没被锁定。 
        let roomer: game.model.Roomer = target._roomModel.getRoomerById(userModel.getUserId());
        if (!roomer) {
            return;
        }
        let gunNum = roomer.getGunNum();
        if (!simple) {
            let fishListMax = RoomUtil.getMaxScoreFishByNum(view.getFishList(), gunNum);
            for (let i = 0; i < fishListMax.length; i++) {
                let bFind = false;
                for (let j = 0; j < gunNum; j++) {
                    let id = view.getLockedFishId(userModel.getUserId(), j);
                    if (id == fishListMax[i].getUniqId()) {
                        bFind = true;
                        break;
                    }
                }
                if (!bFind) {
                    bFindFish = fishListMax[i];
                }
            }
        } else {
            let fishListMax = RoomUtil.getMaxScoreFishByNum(view.getFishList(), 1);
            bFindFish = fishListMax[0];
        }
        if (bFindFish == null) {
            return;
        }
        //更换锁定目标
        view.changeLockedFish(userModel.getUserId(), bFindFish, index);
        let send: UseLockItemMessage = new UseLockItemMessage();
        send.initData();
        send.setUserId(userModel.getUserId());
        send.setFishId(bFindFish.getUniqId());
        send.setGunIndex(index);
        send.setItemId(0);
        NetManager.send(send);
    }

    //监听锁定、狂暴、分身状态结束消息
    private lockedEnd(msg: LockItemEndMessage): void {
        let view = this.getView() as RoomView;
        let itemId = msg.getItemId();
        let userId = msg.getUserId();
        let roomer = this._roomModel.getRoomerById(userId);
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        if (itemId == PropEnum.LOCK) {
            roomer.setIsLock(false);
            view.setLockedEffect(false, roomer.getRoomPos());
            if (userId == userModel.getUserId()) {
                view.setLocked(false);
                //console.log("#-------------------LOCK---end");
            } else {
                //console.log("#-------------------LOCK---end--->", userId);
            }
            if (!roomer.getIsClone()) {
                if (roomer.getIsRage()) {
                    view.deleteLockedObj(userId, false);
                } else {
                    view.deleteLockedObj(userId, true);
                }
            }
        } else if (itemId == PropEnum.CLONE || itemId == PropEnum.FREE_CLONE) {
            roomer.setIsClone(false);
            view.setCloneEffect(false, roomer.getRoomPos());
            if (userId == userModel.getUserId()) {
                view.setClone(false);
                //console.log("#-------------------CLONE---end");
            } else {
                view.getRoomUI().setGunState(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), false, 3, roomer.getRoomPos());
                this.deleteClonePos(roomer.getRoomPos());
                //console.log("#-------------------CLONE---end--->", userId);
            }
            if (!roomer.getIsRage() && !roomer.getIsLock()) {
                view.deleteLockedObj(userId, true);
            } else {
                view.deleteLockedObj(userId, false);
            }
        } else if (itemId == PropEnum.RAGE || itemId == PropEnum.FREE_RAGE) {
            roomer.setIsRage(false);
            view.setRageEffect(false, roomer.getRoomPos());
            let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
            if (userId == userModel.getUserId()) {
                view.setRage(false);
                //console.log("#-------------------RAGE---end", "-----isClone()---->", roomer.getIsClone());
            } else {
                //console.log("#-------------------RAGE---end--->", userId);
            }
            if (!roomer.getIsClone()) {
                if (roomer.getIsLock()) {
                    view.deleteLockedObj(userId, false);
                } else {
                    view.deleteLockedObj(userId, true);
                }
            }
        }
    }
    //更改锁定目标
    private changeLocked(msg: UseLockItemMessage): void {
        let view = this.getView() as RoomView;
        let fish: room.actor.FishBase = RoomUtil.getFishById(view.getFishList(), msg.getFishId());
        view.changeLockedFish(msg.getUserId(), fish, parseInt(msg.getGunIndex()));
    }
    //设置房间状态
    public setRoomState(state: number, fishId: number, userId: number): void {
        let view = this.getView() as RoomView;
        if (state == pondState.FROZEN_END) {    //解除冰冻
            view.unfrozen();
        } else if (state == pondState.WAVE_COMING) {    //鱼潮来临
            view.showWave(function (): void {
                let arr = view.getFishList();
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].getActor().getUniqId() != Especial_Fish.Guide_Fish
                        && arr[i].getActor().getUniqId() != Especial_Fish.Phoenix) {
                        arr[i].runaway();
                    }
                }
            });
        } else if (state == pondState.BOSS_COMING) {
            view.bossComing(fishId);
        } else if (state == pondState.USER_EXCHANGE) { //开始兑换
            let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
            if (roomer) {
                view.getRoomUI().setExchangeByPos(roomer.getRoomPos(), view.getIsFlip(), true);
            }
        } else if (state == pondState.USER_EXCHANGED) { //结束兑换
            let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
            if (roomer) {
                view.getRoomUI().setExchangeByPos(roomer.getRoomPos(), view.getIsFlip(), false);
            }
        }
    }

    //退出房间逻辑
    private exitRoom(obj: any, target: any): void {
        let my: game.model.Roomer = target._roomModel.getRoomerById(target._userModel.getUserId());
        let send: QuitRoomMessage = new QuitRoomMessage();
        send.initData();
        send.setPlayerId(target._userModel.getUserId());
        send.setPosition(my.getRoomPos());
        NetManager.send(send);
    }

    //退出房间
    private quitRoom(msg: QuitRoomMessage): void {
        let userId: number = msg.getPlayerId();
        let pos: number = msg.getPosition();
        let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
        if (roomer == null) {
            console.log("玩家不存在：" + userId);
            return;
        }
        if (userId == this._userModel.getUserId() && pos == roomer.getRoomPos()) {
            burn._Notification_.send(NotifyEnum.CLEAR_PRICE_TASK);
            //重新连接逻辑服务器
            NetManager.resetNet(CONFIG.SERVER_IP, CONFIG.SERVER_PORT, () => {
                //清理房间信息
                this._roomModel.clearRoom();
                game.util.UIUtil.closeLoading();
                GlobalManager.getInstance().reConnect2Server();
            });
            //game.util.GCBroadcastManager.initStatic();
        } else if (pos == roomer.getRoomPos()) {    //移除退出房间的玩家
            let view = this.getView() as RoomView;
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

            let roomUI = view.getRoomUI();
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

            let roomType = this._userModel.getMatchRoomLevel();
            if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom || game.util.GameUtil.isKss(roomType)) {
                //如果是大奖赛
                (roomUI as DajiangsaiRoomUI).setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), false);
            }
        } else {
            console.log("玩家信息错误！");
        }
    }
    public exchangeGoodsBack(msg: ExchangeGoodsBackMessage): void {
        let exchangeModel: ExchangeModel = this.getModel(ExchangeModel) as ExchangeModel;
        exchangeModel.clearList();
        let items = msg.getItemList();
        let len = items.length;
        for (let i = 0; i < len; i++) {
            let item = items[i];
            let data = new game.model.ExchangeItem(item.id, item.name, item.type, item.exchangePriceId, item.exchangePrice, item.instruction,
                item.marketPrice, item.url, item.minVip, item.goodsId, item.goodsNum, item.serverNum, items.orders, item.loopRecordColor, item.minGunId,
                item.deliveryState);
            exchangeModel.addItem(data);
        }
    }
    //新手任务
    public taskFinishBack(msg: FinishTaskBackMessage): void {
        let state = msg.getState();
        if (state != 1) {
            return;
        }
        let model: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let roomer: game.model.Roomer = this._roomModel.getRoomerById(model.getUserId());
        let view = (this.getView() as RoomView);
        let item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        let to: egret.Point = new egret.Point(item.x, item.y);
        if (to.y > 360) {
            to.y = 670;
        } else {
            to.y = 50;
        }
        //添加奖励
        let items = msg.getTaskAward();
        for (let i = 0; i < items.length; i++) {
            let itemId = items[i].itemId;
            let count = items[i].totalCount;
            let data = new game.model.Item(itemId, count);
            if (model.isExist(data)) {
                let itemLast = model.getItemById(itemId);
                model.updateItem(itemId, itemLast.getCount() + count);
            } else {
                model.addItem(data);
            }
            if (itemId != PropEnum.GOLD) {
                game.util.GameUtil.flyItems(count, itemId, new egret.Point(640, 0), new egret.Point(to.x, to.y), view.getRoomUI(), model.getUserId());
            } else {
                game.util.GameUtil.flyCoins(count, 1, new egret.Point(640, 0), new egret.Point(to.x, to.y), view.getRoomUI(), model.getUserId());
            }

            if (itemId == PropEnum.GOLD) {
                model.setCoins(Number(model.getCoins()) + Number(count));
            } else if (itemId == PropEnum.GEM) {
                model.setMoney(Number(model.getMoney()) + Number(count));
            }
        }

        let completeId = msg.getTaskId();

        game.util.ReyunUtil.sendEvent(completeId + game.util.LogEnum.GUIDE_TASK_END);

        let taskModel: TaskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
        taskModel.removeItem(completeId);

        let newID = msg.getNewTaskId();
        if (newID) {
            //塞进去新的任务
            let taskItem = new game.model.TaskItem(newID, 0, 0);
            taskModel.addItem(taskItem);
        }
        //刷新UI
        burn._Notification_.send(NotifyEnum.TASK_GUIDE_CHANGE);
        let finishTaskId = game.table.T_Config_Table.getVoByKey(82).value;
        if (completeId == Number(finishTaskId)) {
            //弹出恭喜获得
            game.util.Guide.checkGuide(GuideTrriger.Open);
            //game.util.GameUtil.openRMBGain();
        }
    }
    //弹出话费动画结束后更新兑换板子
    private updateExchange(obj: any, target: any): void {
        let view = (target.getView() as RoomView);
        let userModel: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let itemTicks = new game.model.Item(PropEnum.FISH_TICKIT, 1);
        let num = 0;
        if (userModel.isExist(itemTicks)) {
            num = userModel.getItemById(PropEnum.FISH_TICKIT).getCount();
        }
        let curNum = num;
        let exchangeModel: ExchangeModel = target.getModel(ExchangeModel) as ExchangeModel;
        let list = exchangeModel.getList();
        let len = list.length;
        let exchagneName = "";
        let maxNum = 0;
        for (let i = 0; i < len; i++) {
            let item: game.model.ExchangeItem = list[i];
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
    }

    private popExchange(obj: any, target: any): void {
        let view = (target.getView() as RoomView);
        let userModel: UserModel = target.getModel(UserModel) as UserModel;
        let itemTicks = new game.model.Item(PropEnum.FISH_TICKIT, 1);
        let num = 0;
        if (userModel.isExist(itemTicks)) {
            num = userModel.getItemById(PropEnum.FISH_TICKIT).getCount();
        }
        let curNum = num;
        let exchangeModel: ExchangeModel = target.getModel(ExchangeModel) as ExchangeModel;
        let list = exchangeModel.getList();
        let len = list.length;
        let exchagneName = "";
        let maxNum = 0;
        for (let i = 0; i < len; i++) {
            let item: game.model.ExchangeItem = list[i];
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
    }


    private taskGuideLoad(obj: any, target: any): void {
        let view = (target.getView() as RoomView);
        view.getRoomUI().addGuideTask();
    }
    private taskChange(obj: any, target: any): void {
        let view = (target.getView() as RoomView);
        let ui = view.getRoomUI().getGuideTaskUI();
        if (!ui) {
            return;
        }
        let taskModel: TaskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
        let task = taskModel.getTaskListByType(TaskType.TASK_TYPE_NEWBIE);
        let taskPrice = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
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
    }
    private taskLoaded(obj: any, target: any): void {
        let taskModel: TaskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
        let task = taskModel.getTaskListByType(TaskType.TASK_TYPE_NEWBIE);
        let taskPrice = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
        if (!task) {
            return;
        }
        let view = (target.getView() as RoomView);
        if (task.length == 0) {
            if (taskPrice.length == 0) {
                view.getRoomUI().guideTaskGroup.removeChildren();
            }
            return;
        }
        view.getRoomUI().getGuideTaskUI().setData(task[0]);
    }
    //引导结束
    private guideClose(obj: any, target: any): void {
        let type = Number(obj);
        let curId = 0;
        switch (type) {
            case GuideClose.GUIDE_CLOSE_UNLOCK:// = 0,            //触发解锁炮倍功能
                let req: UpgradeOrForgeSendMessage = new UpgradeOrForgeSendMessage();
                req.initData();
                req.setType(GunUpdateType.UNLOCK);
                NetManager.send(req);

                curId = target._userModel.getGuideID();
                let c_id = Number(curId) + 1;
                let c_vo = game.table.T_Guide_Table.getVoByKey(c_id);
                game.util.Guide.checkGuide(c_vo.trrigertype);
                break;
            case GuideClose.GUIDE_CLOSE_TRRIGER_NEXT://  = 1,      //引导点击锁定
                curId = target._userModel.getGuideID();
                let t_id = Number(curId) + 1;
                let t_vo = game.table.T_Guide_Table.getVoByKey(t_id);
                game.util.Guide.checkGuide(t_vo.trrigertype);
                break;
            case GuideClose.GUIDE_CLOSE_LOCK://  = 2,              //锁定
                let l_userId = target._userModel.getUserId();
                let l_roomer = target._roomModel.getRoomerById(l_userId);
                let l_view = (target.getView() as RoomView);
                let fish = RoomUtil.getFishById(l_view.getFishList(), Especial_Fish.Guide_Fish);
                if (!fish) {
                    return;
                }
                l_roomer.setIsLock(true);
                l_view.setLockedEffect(true, l_roomer.getRoomPos());
                let arrLocked = new Array<number>();
                arrLocked.push(fish.getUniqId());
                let obj1: LockedObj = new LockedObj(arrLocked, l_roomer.getRoomPos(), l_userId);
                l_view.setLockedObj(obj1);
                if (true) {
                    game.util.GameUtil.setLockedEffect(fish, "locked", "locked_circle_png", true);
                    l_view.send(NotifyEnum.LOCKED_FISH_CHANGE, { fishId: fish.getUniqId(), gunIndex: 0 });
                    l_view.setLocked(true);
                    l_view.getRoomUI().getFrozenAndLockUI().buttonLockNN.startBtnTick();
                }
                break;
            case GuideClose.GUIDE_CLOSE_OPENLOTTERY://  = 3,       //触发打开抽奖界面
                let view = target.getView() as RoomView;
                let userId = target._userModel.getUserId();
                let roomer = target._roomModel.getRoomerById(userId);
                let to: egret.Point = RoomUtil.getPointByPos(roomer.getRoomPos(), view.getIsFlip());
                target._lotteryUI = new room.LotteryUI(to);
                target._lotteryUI.x += CONFIG.adaptX;
                target._lotteryUI.y += CONFIG.adaptY;
                target._lotteryUI.setGuide();
                view.addChildAt(target._lotteryUI, 82);

                let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
                curId = userModle.getGuideID();
                let id = Number(curId) + 1;
                let vo = game.table.T_Guide_Table.getVoByKey(id);
                game.util.Guide.checkGuide(vo.trrigertype);
                break;
            case GuideClose.GUIDE_CLOSE_LOTTERY://  = 4            //触发抽奖功能
                if (target._lotteryUI) {
                    target._lotteryUI.startLottery();
                }
                break;
            case GuideClose.GUIDE_CLOSE_CLOSE_RMB_GAIN:
                //RMBGAIN
                let child = egret.MainContext.instance.stage.getChildByName("RMBGAIN");
                if (child) {
                    egret.MainContext.instance.stage.removeChild(child);
                }
                curId = target._userModel.getGuideID();
                let r_id = Number(curId) + 1;
                let r_vo = game.table.T_Guide_Table.getVoByKey(r_id);
                game.util.Guide.checkGuide(r_vo.trrigertype);
                break;
            case GuideClose.GUIDE_CLOSE_CLICK_EXCHAGE://引导兑换。
                burn._Notification_.send(NotifyEnum.EXCHANGE_ITEM, 1100);
                break;
            case GuideClose.GUIDE_CLOSE_EXCHNANGE_END:
                game.util.Guide.checkGuide(GuideTrriger.Open);
                break;
            default:
                console.log("#------------------------close----傻逼你会用吗？");
                break;
        }
    }
    //显示引导开始
    private guideOpen(obj: any, target: any): void {
        let type = Number(obj);
        switch (type) {
            case GuideOpen.GUIDE_OPEN_UNLOCK:
                let u_view = (target.getView() as RoomView);
                u_view.getRoomUI().unlockGunGroup.visible = true;
                u_view.getRoomUI().getUnlockUpdateUI().openGunUpdateByGuide();
                break;
            case GuideOpen.GUIDE_OPEN_ADDFISH:
                let a_view = (target.getView() as RoomView);
                a_view.guide_addFish();
                break;
            case GuideOpen.GUIDE_OPEN_FISHDEAD:
                target.guide_fishDead();
                // 去掉锁定引导
                let view = (target.getView() as RoomView);
                let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
                let userId = userModle.getUserId();
                let roomer = target._roomModel.getRoomerById(userId);
                roomer.setIsLock(false);
                view.setLockedEffect(false, roomer.getRoomPos());
                view.setLocked(false);
                view.deleteLockedObj(userId, true);
                view.getRoomUI().getFrozenAndLockUI().buttonLockNN.stopBtnTick();
                break;
            case GuideOpen.GUIDE_OPEN_OPENLOTTERY: //弹出抽奖板子
                let l_view = (target.getView() as RoomView);
                l_view.getRoomUI().lotteryGroup.visible = true;
                l_view.getRoomUI().openLotteryGuide();

                break;
            case GuideOpen.GUIDE_OPEN_TRRIGERTASK:
                break;
            case GuideOpen.GUIDE_OPEN_EXCHANGE:
                let exchangeView: ExchangeView = new ExchangeView();
                let exchangeMed: ExchangeMediator = new ExchangeMediator(exchangeView);
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
    }
    //显示查看板子
    private showChakan(obj: any, target: any): void {
        let view = (target.getView() as RoomView);
        if (view.getRoomUI().getIsChakan()) {
            view.getRoomUI().setHideChakan();
            return;
        }
        let roomerList = target._roomModel.getRoomerList();
        let myPos = RoomUtil.getPosByFlip(Number(obj), view.isFlip());
        for (let i = 0; i < roomerList.length; i++) {
            if (roomerList[i].getRoomPos() == myPos) {
                let roomer = roomerList[i];
                view.showChakan(roomer);
                return;
            }
        }
    }

    //自动开炮
    private autoGunFire(obj: any, target: any): void {
        let view = (target.getView() as RoomView);
        view.setAutoGunFire(obj);
    }

    //查找最新炮倍 
    private checkGunRest(obj: any, target: any): void {
        let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        let roomer = target._roomModel.getRoomerById(userModle.getUserId());
        let rate = roomer.getGunRate();
        let gunRateVo = game.table.T_Gun_Table.getVoByKey(rate);
        let flagNull = game.util.GameUtil.isEnough(CurrencyEnum.COINS, gunRateVo.bulletNum);
        if (!flagNull) {
            let newID = -1;
            for (let id = gunRateVo.id; id > 0; id--) {
                let vo = game.table.T_Gun_Table.getVoByKey(id);
                let voEnough = game.util.GameUtil.isEnough(CurrencyEnum.COINS, vo.bulletNum);
                if (voEnough) {
                    newID = id;
                    break;
                }
            }
            // if(newID != id)
            // {
            //     //
            // }
        }
    }
    //调整炮台倍率
    private resetGunRate(obj: any, target: any): void {
        game.util.SoundManager.playEffectSound("C14");
        let send: ChangeGunSendMessage = new ChangeGunSendMessage();
        send.initData();
        let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        let roomer = target._roomModel.getRoomerById(userModle.getUserId());
        let view = (target.getView() as RoomView);
        if (obj == "reduce") {
            send.setType(ChangeGunState.REDUCE_RATE);
            let gunPos = roomer.getRoomPos();
            let gun = view.getRoomUI().gunList[RoomUtil.getPosByFlip(Number(roomer.getRoomPos()), view.isFlip())];
            if (gun.getGunLocked()) {
                let minGunId = game.util.GameUtil.getNeedGunByRoomType(userModle.getMatchRoomLevel(), -1);
                if (roomer.getGunRate() == minGunId) {
                    return;
                }
                roomer.setGunRate(roomer.getGunRate() - 1);
                let gunRateVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
                view.setRoomerGunRate(roomer.getRoomPos(), gunRateVo.bulletNum, false);
                gun.setLocked(false);
                return;
            }
        } else if (obj == "add") {
            if (roomer.getGunRate() == userModle.getCurGunID() && userModle.getMatchRoomLevel() != RequesetRoomState.DjsRoom
                && userModle.getMatchRoomLevel() != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(userModle.getMatchRoomLevel())) {
                roomer.setGunRate(roomer.getGunRate() + 1);
                let gunRateVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
                if (gunRateVo) {
                    let view = target.getView() as RoomView;
                    view.setRoomerGunRate(roomer.getRoomPos(), gunRateVo.bulletNum, false);
                    let gun = view.getRoomUI().gunList[RoomUtil.getPosByFlip(Number(roomer.getRoomPos()), view.isFlip())];
                    gun.setLocked(true);
                    return;
                } else {
                    send.setType(ChangeGunState.ADD_RATE);
                }
            } else {
                roomer.setGunRate(userModle.getCurGunID());
                let gunRateVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
                if (gunRateVo) {
                    let view = target.getView() as RoomView;
                    view.setRoomerGunRate(roomer.getRoomPos(), gunRateVo.bulletNum, false);
                    let gun = view.getRoomUI().gunList[RoomUtil.getPosByFlip(Number(roomer.getRoomPos()), view.isFlip())];
                    gun.setLocked(false);
                }
                send.setType(ChangeGunState.ADD_RATE);
            }
        }
        NetManager.send(send);
    }

    //调整炮台倍率服务器返回
    private changeGunBack(msg: ChangeGunBackMessage): void {
        let type = msg.getType();
        let userId = msg.getUserId();
        let roomer = this._roomModel.getRoomerById(userId);
        let view = this.getView() as RoomView;
        if (type != ChangeGunState.CHANGE_SKIN) {
            let gunRateVo = game.table.T_Gun_Table.getVoByKey(msg.getGunId());
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
        } else { //换皮肤
            let state = msg.getState();
            if (state != 1) {
                game.util.GameUtil.popTips("更换炮台失败-->", state);
                return;
            }
            let skinId = msg.getSkinId();
            let vo = game.table.T_Item_Table.getVoByKey(skinId);
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
    }

    //出发特殊鱼：一网打尽、电鳗、炸弹鱼
    private killManyFish(msg: RandomFishHitBackMessage): void {
        let view = this.getView() as RoomView;
        let list = msg.getFishingHitback() as Array<any>;
        room.OneKillMany.killMany(view, msg.getUserId(), msg.getFishId(), list, msg.getFishFunctionType(),
            view.getFishList(), view.getIsFlip(), view.getRoomUI());
        let len = list.length;
        let icon = 0;
        for (let i = 0; i < len; i++) {
            let items = list[i].items;
            let lenI = items.length;
            for (let j = 0; j < lenI; j++) {
                let item = items[j];
                if (item.itemId == 10001) {
                    icon += Number(item.count);
                }
            }
        }
        if (this._userModel.getUserId() == msg.getUserId()) {
            let reason = game.table.T_Config_Table.getVoByKey(43).value;
            let times = game.table.T_Config_Table.getVoByKey(54).value.split("_");
            if (icon >= Number(reason)) {
                /** enum OneKillManyType { 
                    CATCH_WHOLE = 0,	//一网打尽
                    ELECTRIC = 3,		//电鳗
                    BOMB = 4			//炸弹
                } */
                let time = 0;
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
    }

    //初始化房间内已经有的鱼和玩家
    private initInRoomInfo(): void {
        let view = this.getView() as RoomView;
        let isFlip: boolean = false;
        let myPos: number = 0;
        //初始化房间内玩家
        let roomerList = this._roomModel.getRoomerList();
        for (let i = 0; i < roomerList.length; i++) {
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
        for (let i = 0; i < roomerList.length; i++) {
            if (roomerList[i].getUserId() == this._userModel.getUserId()) {
                myPos = roomerList[i].getRoomPos();
                if (myPos == 0 || myPos == 3) {
                    view.setPaobeiAddState(true);
                } else if (myPos == 1 || myPos == 2) {
                    view.setPaobeiAddState(false);
                }
                this._userModel.setMoney(roomerList[i].getMoney());
                this._userModel.setCoins(roomerList[i].getCoins());
                let roomType = this._userModel.getMatchRoomLevel();
                if (roomType != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(roomType)) {
                    view.setRoomerCoins(myPos, this._userModel.getCoins());
                } else {
                    view.setRoomerBullet(myPos, roomerList[i].getDjsObj().grandPrixBulletNum);
                }
                view.setRoomerMoney(myPos, this._userModel.getMoney());
                let gunVo = game.table.T_Gun_Table.getVoByKey(roomerList[i].getGunRate());
                if (gunVo) {
                    view.setRoomerGunRate(myPos, gunVo.bulletNum);
                } else {
                    console.warn("没有这个炮倍：" + roomerList[i].getGunRate());
                }
                //您在这里
                view.showYourPos(myPos);
                //定义Timer
                let timer = new egret.Timer(5000, 1);
                //注册事件侦听器
                timer.addEventListener(egret.TimerEvent.TIMER, function (): void {
                    view.hideYourPos(myPos);
                }, this);
                //开始计时
                timer.start();
            } else {
                let roomType = this._userModel.getMatchRoomLevel();
                if (roomType != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(roomType)) {
                    view.setRoomerCoins(roomerList[i].getRoomPos(), roomerList[i].getCoins());
                } else {
                    view.setRoomerBullet(roomerList[i].getRoomPos(), roomerList[i].getDjsObj().grandPrixBulletNum);
                }
                view.setRoomerMoney(roomerList[i].getRoomPos(), roomerList[i].getMoney());
                let gunVo = game.table.T_Gun_Table.getVoByKey(roomerList[i].getGunRate());
                if (gunVo) {
                    view.setRoomerGunRate(roomerList[i].getRoomPos(), gunVo.bulletNum);
                } else {
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
                    for (let j = 0; j < 3; j++) {
                        let fishLocked: room.actor.FishBase = RoomUtil.getFishById(view.getFishList(), roomerList[i].getLockedIdByGun(j));
                        view.changeLockedFish(roomerList[i].getUserId(), fishLocked, j);
                    }
                } else {
                    // 同步其它的锁定鱼ID
                    for (let j = 0; j < 1; j++) {
                        let fishLocked: room.actor.FishBase = RoomUtil.getFishById(view.getFishList(), roomerList[i].getLockedIdByGun(j));
                        view.changeLockedFish(roomerList[i].getUserId(), fishLocked, j);
                    }
                }
            }
            view.changeGunSkin(roomerList[i]);
        }
        //设置房间玩家数据
        view.resetView(isFlip, roomerList, myPos);
        //初始化鱼
        let fishList = this._roomModel.getFishList();
        for (let i = 0; i < fishList.length; i++) {
            let fish = fishList[i];
            view.addUnitFish(fish.fishType, fish.uniqId, fish.fishId, fish.pathId, fish.coord, fish.aliveTime);
        }
    }

    private pondFish(msg: PondFishesMessage): void {
        let fishList: Array<any> = msg.getFishes();
        let len = fishList.length;
        for (let i = 0; i < len; i++) {
            this.addFish(fishList[i]);
        }
    }

    //向鱼池中添加鱼
    private addFish(msg: AddFishMessage): void {
        let view = this.getView() as RoomView;
        let type = msg.getType();
        let fId = msg.getFishId();
        if (type == AddFishType.FISH_GROUP) {
            let fishGroupVo = game.table.T_FishGroup_Table.getVoByKey(fId);
            if (fishGroupVo.type == FishGroupType.SIMPLE) {
                view.addUnitFish(type, msg.getUniId(), fId, msg.getPathId(),
                    new egret.Point(msg.getCoordinate().xvalue, msg.getCoordinate().yvalue));
            } else if (fishGroupVo.type == FishGroupType.QUEUE) {
                //队列鱼
                let vo = game.table.T_FishGroup_Table.getVoByKey(fId);
                if (!vo) {
                    return;
                }
                let str = vo.pos.split("|");
                let timeTotal = 0;
                let uniId = msg.getUniId();
                let len = str.length;
                for (let i = 0; i < len; i++) {
                    let itemStr = str[i].split(",");
                    let id = itemStr[0];
                    let time = itemStr[1];
                    timeTotal += Number(time);
                    let timer = new egret.Timer(timeTotal, 1);
                    let uId = new Array<number>();
                    uId.push(uniId[i]);
                    let tiemFun = function (): void {
                        timer.removeEventListener(egret.TimerEvent.TIMER, tiemFun, self);
                        view.addUnitFish(AddFishType.FISH, uId, Number(id), msg.getPathId(),
                            new egret.Point(msg.getCoordinate().xvalue, msg.getCoordinate().yvalue));
                    }
                    timer.addEventListener(egret.TimerEvent.TIMER, tiemFun, this);
                    timer.start();
                }
            }
        } else {
            view.addUnitFish(type, msg.getUniId(), fId, msg.getPathId(),
                new egret.Point(msg.getCoordinate().xvalue, msg.getCoordinate().yvalue));
        }
    }

    //房间中进入新的玩家
    private addPlayerInRoom(msg: IntoRoomBackMessage): void {
        let player = msg.getPlayerInfo()[0];

        let roomer: game.model.Roomer = new game.model.Roomer(player.playerId, player.position, player.name,
            player.gunId, Number(player.coins), player.gems, player.items, player.lockRelation, player.vipLevel,
            player.batterySkinId,
            player.gunrestSkinId,
            player.roleLevel);
        this._roomModel.addRoomer(roomer);
        //显示新进入玩家炮台
        let view = this.getView() as RoomView;
        let isFlip = view.getIsFlip();
        let roomUI = view.getRoomUI();
        roomUI.setGunVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), isFlip), true);
        let roomType = this._userModel.getMatchRoomLevel();
        view.setRoomerMoney(roomer.getRoomPos(), roomer.getMoney());
        let gunVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
        if (gunVo) {
            view.setRoomerGunRate(roomer.getRoomPos(), gunVo.bulletNum);
        } else {
            console.warn("没有这个炮倍：" + roomer.getGunRate());
        }
        view.changeGunSkin(roomer);

        if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom || game.util.GameUtil.isKss(roomType)) {
            //如果是大奖赛
            let djsObj = new game.model.DjsObj(player.grandPrixMessage);
            roomer.setDjsObj(djsObj);
            (view.getRoomUI() as DajiangsaiRoomUI).setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), isFlip), true);
            (view.getRoomUI() as DajiangsaiRoomUI).setDjsScoreByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), djsObj.grandPrixIntegral);
        }
        if (roomType != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(roomType)) {
            view.setRoomerCoins(roomer.getRoomPos(), roomer.getCoins());
        } else {
            view.setRoomerBullet(roomer.getRoomPos(), roomer.getDjsObj().grandPrixBulletNum);
        }
    }

    //弹出大奖赛结算面板
    public grandPrixSettement(msg: GrandPrixSettlementMessage): void {
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userModel.getUserId() });
        let roomType = msg.getRoomtType();
        let settingView: DjsResultView = new DjsResultView(msg, roomType);
        let settingMed: DjsResultMediator = new DjsResultMediator(settingView);
        burn.Director.pushView(settingMed);
    }

    //大奖赛积分变化
    public grandPrixInfoChange(msg: GrandPrixInfoChangeMessage): void {
        let roomer = this._roomModel.getRoomerById(msg.getUserId());
        if (!roomer) {
            //提示
            return;
        }
        roomer.getDjsObj().grandPrixIntegral = msg.getGrandPrixIntegral();
        let view = this.getView() as RoomView;
        (view.getRoomUI() as DajiangsaiRoomUI).setDjsScoreByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), msg.getGrandPrixIntegral());
        if (msg.getUserId() == this._userModel.getUserId()) {
            (view.getRoomUI() as DajiangsaiRoomUI).updateDjsScore(roomer.getDjsObj().grandPrixIntegral);
            (view.getRoomUI() as DajiangsaiRoomUI).setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), false);
        }
    }

    //报名回复
    private signUpBack(msg: ArenaSignUpBackMessage): void {
        let state: number = msg.getState();
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
        let roomer = this._roomModel.getRoomerById(this._userModel.getUserId());
        roomer.getDjsObj().grandPrixBulletNum = Number(msg.getGrandPrixBulletNum());
        roomer.getDjsObj().grandPrixIntegral = Number(msg.getGrandPrixIntegral());
        //发送消息，更新RoomerUI的数据
        let view = this.getView() as RoomView;
        (view.getRoomUI() as DajiangsaiRoomUI).updateDjdBulletNum(roomer.getDjsObj().grandPrixBulletNum);
        (view.getRoomUI() as DajiangsaiRoomUI).updateDjsScore(roomer.getDjsObj().grandPrixIntegral);
        roomer.getDjsObj().grandPrixSignUp = 1;
        this._bSendDjsResult = false;

        if (this._userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom || game.util.GameUtil.isKss(this._userModel.getMatchRoomLevel())) {
            burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_BULLETS, { userId: this._userModel.getUserId() });
        }
        game.util.GameUtil.play321Go(view.getRoomUI(), function () {
        });
    }
    //其他玩家开炮
    private gunSendBack(msg: FishingGunBackMessage): void {
        let userId = msg.getUid();
        let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
        if (!roomer) {
            return;
        }
        let gun = msg.getGun();
        let angle = gun.angle;
        let gunIndex = gun.gunIndex;

        let view = this.getView() as RoomView;
        let userPos = roomer.getRoomPos();// 此人位置
        //观察者位置 
        let my: game.model.Roomer = this._roomModel.getRoomerById(this._userModel.getUserId());
        let posMy = my.getRoomPos();
        if ((userPos == 0 || userPos == 1) && (posMy == 2 || posMy == 3)) {
            if (view.getIsFlip()) {
                angle += 180;
            }
        } else if ((userPos == 2 || userPos == 3) && (posMy == 0 || posMy == 1)) {
            if (view.getIsFlip()) {
                angle += 180;
            }
        } else if (userPos == 2 && posMy == 3) {
            if (view.getIsFlip()) {
                angle += 180;
            }
        } else if (userPos == 3 && posMy == 2) {
            if (view.getIsFlip()) {
                angle += 180;
            }
        }
        let bClone = this.isCloneByPos(userPos);
        view.otherGunFire(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), angle, bClone, gunIndex, roomer.getIsRage(), roomer.getCurSkinId());
        let gunRateVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
        let costCoin = gunRateVo.bulletNum;
        if (roomer.getIsRage()) {
            let vipLv = roomer.getVipLevel();
            // 2_5
            let data = game.table.T_Config_Table.getVoByKey(34).value;
            let datas = data.split("_");
            let min = Number(datas[0]);
            let max = Number(datas[1]);
            if (vipLv >= min && vipLv < max) {
                costCoin *= 2;
            } else if (vipLv >= max) {
                costCoin *= 3;
            }
        }
        let temp = roomer.getCoins() - costCoin;
        if (temp < 0) {
            temp = 0;
        }
        roomer.setCoins(temp);
        let roomType = this._userModel.getMatchRoomLevel();
        if (roomType != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(roomType)) {
            view.setRoomerCoins(userPos, temp);
        } else {
            roomer.getDjsObj().grandPrixBulletNum--;
            view.setRoomerBullet(roomer.getRoomPos(), roomer.getDjsObj().grandPrixBulletNum);
        }
    }

    //抽奖信息更新监听
    private lotteryDataReceive(msg: LotteryConditonAccumulateMessage): void {
        let score = msg.getIntegral();              //当前积分
        let killNum = msg.getKillNum();             //当前杀死奖金鱼数目
        let todayCount = msg.getTodayDrawTimes();   //今日领奖次数
        if (todayCount > 1) {
            todayCount = 1;
        }
        let lotteryModel = burn.Director.getModelByKey(LotteryModel) as LotteryModel;
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
            (this.getView() as RoomView).openLotteryTips(lotteryModel.getScore(),
                lotteryModel.getKillNum(), lotteryModel.getMaxKill(lotteryModel.getTodayCount()));
        }
    }
    //展开抽奖tips
    private showLottery(obj: any, target: any): void {
        let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        let roomType = userModle.getMatchRoomLevel();
        if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.KssRoom || roomType == RequesetRoomState.QmsRoom) {
            let view = target.getView() as RoomView;
            let roomUI = view.getRoomUI() as RoomUI;
            roomUI.lotteryBtn.visible = false;
        }
        let lotteryModel = burn.Director.getModelByKey(LotteryModel) as LotteryModel;
        (target.getView() as RoomView).openLotteryTips(lotteryModel.getScore(),
            lotteryModel.getKillNum(), lotteryModel.getMaxKill(lotteryModel.getTodayCount()));
    }

    //全民赛积分变化
    private thePeopleBack(msg: ThePeopleChangeMessage): void {
        /**required uint32 grandPrixIntegral = 1;//大奖赛积分
            required uint32 userId = 2;
            optional uint32 fishId = 3; */
        let view = this.getView() as RoomView;
        let userId: number = msg.getUserId();
        let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
        roomer.getDjsObj().grandPrixIntegral = msg.getGrandPrixIntegral();

        //更新UI上的积分
        (view.getRoomUI() as DajiangsaiRoomUI).setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.isFlip()), userId != this._userModel.getUserId());
        (view.getRoomUI() as DajiangsaiRoomUI).setDjsScoreByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), msg.getGrandPrixIntegral());
        //播放爆金币
        let item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        let to: egret.Point = new egret.Point(item.x, item.y);
        if (to.y > 360) {
            to.y = 670;
        } else {
            to.y = 50;
        }
        let uniqId: number = msg.getFishId();
        let fishList = view.getFishList();
        //如果是黄金鱼，特殊鱼。播放金币特效
        //functionType == 2
        let fish = RoomUtil.getFishById(view.getFishList(), uniqId);
        if (fish == null) {
            console.warn("此条鱼不存在：" + uniqId);
            return;
        }
        let fishVo = game.table.T_Fish_Table.getVoByKey(fish.getFishId());
        if (fishVo.functionType == 2) {
            let dropX = 0;
            let dropY = 0;
            if (fish.getType() == AddFishType.FISH) {
                let p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            } else {
                let p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            let parent = view.getBulletLayer();
            let data = RES.getRes("ef_baojinbi_json");
            let txtr = RES.getRes("ef_baojinbi_png");
            let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);

            let goldIcon = new MovieFish(mcFactory.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
            goldIcon.initEvent();
            // goldIcon.blendMode = egret.BlendMode.ADD;
            goldIcon.scaleX = 2.3;
            goldIcon.scaleY = 2.3;
            goldIcon.frameRate = 12;
            //goldIcon.gotoAndPlay("play", 1);
            goldIcon.visible = false;
            let dataMc: egret.MovieClipData = goldIcon.movieClipData;

            let frameCur = 0;
            let Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
            goldIcon.anchorOffsetX = (goldIcon.width >> 1) + Rect.x;
            goldIcon.anchorOffsetY = (goldIcon.height >> 1) + Rect.y;
            goldIcon.frameRate = 12;
            goldIcon.x = dropX;
            goldIcon.y = dropY;

            let baojinbiBg = new egret.Bitmap(RES.getRes("baojinbiBg_png"));

            baojinbiBg.anchorOffsetX = (baojinbiBg.width >> 1);
            baojinbiBg.anchorOffsetY = (baojinbiBg.height >> 1);
            baojinbiBg.x = dropX;
            baojinbiBg.y = dropY;

            parent.addChild(baojinbiBg);
            parent.addChild(goldIcon);

            let twBg = egret.Tween.get(baojinbiBg, { loop: false });
            baojinbiBg.scaleY = 0;
            baojinbiBg.scaleX = 0;
            baojinbiBg.visible = false;
            twBg.
                wait(100)
                .call(function() {
                    goldIcon.visible = true;
                    baojinbiBg.visible = true;
                    goldIcon.gotoAndPlay("play", 1);
                })
                .to({ scaleX: 2, scaleY: 2 }, 300)
                .to({ alpha: 0 }, 300)
                .call(function() {
                    egret.Tween.removeTweens(twBg);
                    parent.removeChild(baojinbiBg);
                })
            //震屏
            RoomUtil.shakeWindowByFish(view);
        }

        //处理死亡与掉落逻辑
        RoomUtil.fishDeadHandlerByQms(fishList, uniqId, userId, to, view.getRoomUI(), view);
        if (userId == this._userModel.getUserId()) {
            (view.getRoomUI() as DajiangsaiRoomUI).updateDjsScore(msg.getGrandPrixIntegral());
        }
    }

    //快速赛信息变化
    private quickGameInfoChange(msg: QuickGameInfoChangeMessage): void {
        /** 		
         *  required uint32 integral = 1;//积分
            required uint32 userId = 2;
            optional uint32 fishId = 3; */
        let view = this.getView() as RoomView;
        let userId: number = msg.getUserId();
        let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
        if (!roomer) {
            return;
        }
        roomer.getDjsObj().grandPrixIntegral = msg.getIntegral();

        //更新UI上的积分
        (view.getRoomUI() as DajiangsaiRoomUI).setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.isFlip()), userId != this._userModel.getUserId());
        (view.getRoomUI() as DajiangsaiRoomUI).setDjsScoreByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), view.getIsFlip()), msg.getIntegral());
        //播放爆金币
        let item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        let to: egret.Point = new egret.Point(item.x, item.y);
        if (to.y > 360) {
            to.y = 670;
        } else {
            to.y = 50;
        }
        let uniqId: number = msg.getFishId();
        let fishList = view.getFishList();
        //如果是黄金鱼，特殊鱼。播放金币特效
        //functionType == 2
        let fish = RoomUtil.getFishById(view.getFishList(), uniqId);
        if (fish == null) {
            console.warn("此条鱼不存在：" + uniqId);
            return;
        }
        let fishVo = game.table.T_Fish_Table.getVoByKey(fish.getFishId());
        if (fishVo.functionType == 2) {
            let dropX = 0;
            let dropY = 0;
            if (fish.getType() == AddFishType.FISH) {
                let p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            } else {
                let p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            let parent = view.getBulletLayer();
            let data = RES.getRes("ef_baojinbi_json");
            let txtr = RES.getRes("ef_baojinbi_png");
            let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);

            let goldIcon = new MovieFish(mcFactory.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
            goldIcon.initEvent();
            // goldIcon.blendMode = egret.BlendMode.ADD;
            goldIcon.scaleX = 2.3;
            goldIcon.scaleY = 2.3;
            goldIcon.frameRate = 12;
            //goldIcon.gotoAndPlay("play", 1);
            goldIcon.visible = false;
            let dataMc: egret.MovieClipData = goldIcon.movieClipData;

            let frameCur = 0;
            let Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
            goldIcon.anchorOffsetX = (goldIcon.width >> 1) + Rect.x;
            goldIcon.anchorOffsetY = (goldIcon.height >> 1) + Rect.y;
            goldIcon.frameRate = 12;
            goldIcon.x = dropX;
            goldIcon.y = dropY;

            let baojinbiBg = new egret.Bitmap(RES.getRes("baojinbiBg_png"));

            baojinbiBg.anchorOffsetX = (baojinbiBg.width >> 1);
            baojinbiBg.anchorOffsetY = (baojinbiBg.height >> 1);
            baojinbiBg.x = dropX;
            baojinbiBg.y = dropY;

            parent.addChild(baojinbiBg);
            parent.addChild(goldIcon);

            let twBg = egret.Tween.get(baojinbiBg, { loop: false });
            baojinbiBg.scaleY = 0;
            baojinbiBg.scaleX = 0;
            baojinbiBg.visible = false;
            twBg.
                wait(100)
                .call(() => {
                    goldIcon.visible = true;
                    baojinbiBg.visible = true;
                    goldIcon.gotoAndPlay("play", 1);
                })
                .to({ scaleX: 2, scaleY: 2 }, 300)
                .to({ alpha: 0 }, 300)
                .call(() => {
                    egret.Tween.removeTweens(twBg);
                    parent.removeChild(baojinbiBg);
                })

            //震屏
            RoomUtil.shakeWindowByFish(view);
        }

        //处理死亡与掉落逻辑
        RoomUtil.fishDeadHandlerByQms(fishList, uniqId, userId, to, view.getRoomUI(), view);
        if (userId == this._userModel.getUserId()) {
            (view.getRoomUI() as DajiangsaiRoomUI).updateDjsScore(msg.getIntegral());
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////
    private quickRank(msg: QuickGameRankResultMessage): void {
        let type = msg.getType();//0比赛中，1比赛结束
        if (type == 1) {
            let view: KssResultView = new KssResultView(msg);
            let med: KssResultMediator = new KssResultMediator(view);
            burn.Director.pushView(med);
            return;
        }

        let msgList = msg.getRank();
        let lenMsg = msgList.length;
        this._arrQuickInfo.length = 0;
        for (let i = 0; i < lenMsg; i++) {
            let itemObj = new QuickInfo(msgList[i]);
            this._arrQuickInfo.push(itemObj);
            let roomer: game.model.Roomer = this._roomModel.getRoomerById(itemObj.getUserId());
            if (roomer) {
                roomer.getDjsObj().grandPrixBulletNum = itemObj.getBulletNum();
                roomer.getDjsObj().grandPrixIntegral = itemObj.getIntegral();
            }
        }

        let len = this._arrQuickInfo.length;
        //排序
        function sortFun(a: QuickInfo, b: QuickInfo) {
            if (a.getIntegral() > b.getIntegral()) {
                return -1;
            } else if (a.getIntegral() < b.getIntegral()) {
                return 1;
            } else {
                return 0;
            }
        }
        this._arrQuickInfo.sort(sortFun);

        let myIndex = -1;
        len = this._arrQuickInfo.length;
        for (let i = 0; i < len; i++) {
            let item = this._arrQuickInfo[i];
            if (item.getUserId() == this._userModel.getUserId()) {
                myIndex = i;
                break;
            }
        }
        if (myIndex == -1 || this._arrQuickInfo.length < 4) {
            return;
        }

        //找到需要显示的4名数据
        let arrUIData = new Array<QuickInfo>();
        if (myIndex <= 3) {
            arrUIData.push(this._arrQuickInfo[0]);
            arrUIData.push(this._arrQuickInfo[1]);
            arrUIData.push(this._arrQuickInfo[2]);
            arrUIData.push(this._arrQuickInfo[3]);
        } else {
            arrUIData.push(this._arrQuickInfo[0]);
            arrUIData.push(this._arrQuickInfo[1]);
            arrUIData.push(this._arrQuickInfo[2]);
            arrUIData.push(this._arrQuickInfo[myIndex]);
        }
        //通知刷新UI
        let roomView = this.getView() as RoomView;
        (roomView.getRoomUI() as DajiangsaiRoomUI).changeKssInfoList(arrUIData, myIndex);

        let roomerList = this._roomModel.getRoomerList();
        let myPos = this._roomModel.getRoomerById(this._userModel.getUserId()).getRoomPos();
        let isFlip = roomView.isFlip();
        for (let i = 0; i < roomerList.length; i++) {
            if (roomerList[i].getRoomPos() != myPos) {
                (roomView.getRoomUI() as DajiangsaiRoomUI).updateDjdBulletNum(roomerList[i].getDjsObj().grandPrixBulletNum);
                (roomView.getRoomUI() as DajiangsaiRoomUI).updateDjsScore(roomerList[i].getDjsObj().grandPrixIntegral);
            } else {
                (roomView.getRoomUI() as DajiangsaiRoomUI).updateDjsScore(roomerList[i].getDjsObj().grandPrixIntegral);
            }
        }
    }

    //快速赛等待
    private quitGameIntoRoom(msg: QuickGameIntoRoomMessage): void {
        let peopleNum = msg.getCurNum();
        this._peopleNum = Number(peopleNum);
        burn._Notification_.send(NotifyEnum.CHANGE_WAIT_PEOPLE, { num: peopleNum });
        this._kssEndTime = Number(msg.getEndSec());
        // if(this._uiLoadComplete){
        if (peopleNum >= 8) {
            let view = this.getView() as RoomView;
            if (view.getRoomUI()) {
                (view.getRoomUI() as DajiangsaiRoomUI).startKssTime(Number(msg.getEndSec()));
            } else {
                this._kssEndTime = Number(msg.getEndSec());
            }
            //如果是第二次进入快速赛。则不显示321go
            let roomer: game.model.Roomer = this._roomModel.getRoomerById(this._userModel.getUserId());
            if (!roomer) {
                return;
            }
            let num = roomer.getDjsObj().grandPrixBulletNum;
            if (num >= 600) {
                game.util.GameUtil.play321Go(view.getRoomUI(), function () {
                    console.log("#---------------------------");
                });
            }
        }
        // }
    }

    //世界boss信息变动
    private worldBossInfo(msg: WorldBossInfoBackMessage): void {
        let phoenixObj = this._roomModel.getPhoenix();
        if (!phoenixObj) {
            this._roomModel.setPhoenix(new game.model.PhoenixObj(msg));
        } else {
            phoenixObj.changeData(msg);
        }
        let state = msg.getState();
        if (state == Phoenix_State.ShieldDead) {
            //护盾碎了
            this.phoenixDead(msg.getUserId(), msg.getItems(), false);
        } else if (state == Phoenix_State.Dead) {
            //凤凰死了
            this.phoenixDead(msg.getUserId(), msg.getItems(), true);
        } else if (state == Phoenix_State.Coming) {
            (this.getView() as RoomView).bossComing(201);
            //凤凰来临
        }
        burn._Notification_.send(NotifyEnum.CHANGE_PHOENIX_UI);
    }
    //凤凰UI变更
    private phoenixUI(obj: any, target: any): void {
        let view = target.getView() as RoomView;
        let phoenixObj: game.model.PhoenixObj = target._roomModel.getPhoenix();
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
        } else {
            view.getRoomUI().addPhoenixShield(phoenixObj.getCurShield(), phoenixObj.getMaxShield());
            view.getRoomUI().clearPhoenixTop();
        }
    }

    //播放特效
    private phoenixDead(userId: number, items: any, isPhoenix: boolean): void {
        let uniqId = Especial_Fish.Phoenix;
        let view = this.getView() as RoomView;
        let fishList = view.getFishList();
        let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
        let item = null;
        let to: egret.Point = new egret.Point(0, 0);
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
        let fish = RoomUtil.getFishById(view.getFishList(), Especial_Fish.Phoenix);
        if (fish == null) {
            console.warn("此条鱼不存在：" + uniqId);
            return;
        }

        if (roomer) {
            //如果是黄金鱼，特殊鱼。播放金币特效
            //functionType == 2
            let goldCount = 0;
            let dropX = 0;
            let dropY = 0;
            if (fish.getType() == AddFishType.FISH) {
                let p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            } else {
                let p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            let parent = view.getBulletLayer();
            let data = RES.getRes("ef_baojinbi_json");
            let txtr = RES.getRes("ef_baojinbi_png");
            let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);

            let goldIcon = new MovieFish(mcFactory.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
            goldIcon.initEvent();
            goldIcon.scaleX = 2.3;
            goldIcon.scaleY = 2.3;
            goldIcon.frameRate = 12;
            goldIcon.visible = false;
            let dataMc: egret.MovieClipData = goldIcon.movieClipData;

            let frameCur = 0;
            let Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
            goldIcon.anchorOffsetX = (goldIcon.width >> 1) + Rect.x;
            goldIcon.anchorOffsetY = (goldIcon.height >> 1) + Rect.y;
            goldIcon.frameRate = 12;
            goldIcon.x = dropX;
            goldIcon.y = dropY;

            let baojinbiBg = new egret.Bitmap(RES.getRes("baojinbiBg_png"));
            baojinbiBg.anchorOffsetX = (baojinbiBg.width >> 1);
            baojinbiBg.anchorOffsetY = (baojinbiBg.height >> 1);
            baojinbiBg.x = dropX;
            baojinbiBg.y = dropY;

            parent.addChild(baojinbiBg);
            parent.addChild(goldIcon);

            let twBg = egret.Tween.get(baojinbiBg, { loop: false });
            baojinbiBg.scaleY = 0;
            baojinbiBg.scaleX = 0;
            baojinbiBg.visible = false;
            twBg.
                wait(100)
                .call(() => {
                    goldIcon.visible = true;
                    baojinbiBg.visible = true;
                    goldIcon.gotoAndPlay("play", 1);
                })
                .to({ scaleX: 2, scaleY: 2 }, 300)
                .to({ alpha: 0 }, 300)
                .call(() => {
                    egret.Tween.removeTweens(twBg);
                    parent.removeChild(baojinbiBg);
                })

            if (uniqId == Especial_Fish.Phoenix) {
                //震屏
                RoomUtil.shakeWindowByFish(view);
            }
            if (to.y > 360) {
                to.y = 670;
            } else {
                to.y = 50;
            }
            //飞金币
            for (let i = 0; i < items.length; i++) {
                let itemId = Number(items[i].itemId);
                let count = Number(items[i].count);
                if (itemId == 10001) {
                    game.util.FrameUtil.playAddCoinsEff(count, new egret.Point(dropX, dropY), view.getRoomUI(), userId);
                    game.util.GameUtil.flyCoins(count, 201, new egret.Point(dropX, dropY),
                        new egret.Point(to.x, to.y), view.getRoomUI(), userId);
                    game.util.SoundManager.playEffectSound("drop_gold");
                }
            }
        }
        if (!isPhoenix) {
            let phoenixObj = this._roomModel.getPhoenix();
            let cur = phoenixObj.getCurShield();
            let max = phoenixObj.getMaxShield();
            if ((max - cur) <= 0) {
                fish.removeEffect("boss_shield_png");
            }
        }
        //护盾碎了
        // if(!isPhoenix)
        // {
        //     fish.removeEffect("boss_shield_png");
        // }
    }
    //鱼被击中死亡
    private fishHitBack(msg: FishingHitBackMessage): void {
        let view = this.getView() as RoomView;
        let userId: number = msg.getUserId();
        let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
        if (!roomer) {
            return;
        }
        let item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        let to: egret.Point = new egret.Point(item.x, item.y);
        if (to.y > 360) {
            to.y = 670;
        } else {
            to.y = 50;
        }
        let uniqId: number = msg.getFishId();

        let fishList = view.getFishList();
        //如果是黄金鱼，特殊鱼。播放金币特效
        //functionType == 2
        let fish = RoomUtil.getFishById(view.getFishList(), uniqId);
        if (fish == null) {
            console.warn("此条鱼不存在：" + uniqId);
            return;
        }
        let fishVo = game.table.T_Fish_Table.getVoByKey(fish.getFishId());
        if (fishVo.functionType == 2) {
            let bFind = false;
            let goldCount = 0;
            let items = msg.getItems();
            for (let i = 0; i < items.length; i++) {
                let itemId = items[i].itemId;
                if (itemId == 10001) {
                    bFind = true;
                    goldCount = items[i].count;
                }
            }
            if (!bFind) {
                return;
            }
            let dropX = 0;
            let dropY = 0;
            if (fish.getType() == AddFishType.FISH) {
                let p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            } else {
                let p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }

            if (game.util.GorgeousManager.getState()) {
                let parent = view.getBulletLayer();
                let data = RES.getRes("ef_baojinbi_json");
                let txtr = RES.getRes("ef_baojinbi_png");
                let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);

                let goldIcon = new MovieFish(mcFactory.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
                goldIcon.initEvent();
                // goldIcon.blendMode = egret.BlendMode.ADD;
                goldIcon.scaleX = 2.3;
                goldIcon.scaleY = 2.3;
                goldIcon.frameRate = 12;
                //goldIcon.gotoAndPlay("play", 1);
                goldIcon.visible = false;
                let dataMc: egret.MovieClipData = goldIcon.movieClipData;

                let frameCur = 0;
                let Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
                goldIcon.anchorOffsetX = (goldIcon.width >> 1) + Rect.x;
                goldIcon.anchorOffsetY = (goldIcon.height >> 1) + Rect.y;
                goldIcon.frameRate = 12;
                goldIcon.x = dropX;
                goldIcon.y = dropY;

                let baojinbiBg = new egret.Bitmap(RES.getRes("baojinbiBg_png"));
                baojinbiBg.anchorOffsetX = (baojinbiBg.width >> 1);
                baojinbiBg.anchorOffsetY = (baojinbiBg.height >> 1);
                baojinbiBg.x = dropX;
                baojinbiBg.y = dropY;

                parent.addChild(baojinbiBg);
                parent.addChild(goldIcon);

                let twBg = egret.Tween.get(baojinbiBg, { loop: false });
                baojinbiBg.scaleY = 0;
                baojinbiBg.scaleX = 0;
                baojinbiBg.visible = false;
                twBg.
                    wait(100)
                    .call(() => {
                        goldIcon.visible = true;
                        baojinbiBg.visible = true;
                        goldIcon.gotoAndPlay("play", 1);
                    })
                    .to({ scaleX: 2, scaleY: 2 }, 300)
                    .to({ alpha: 0 }, 300)
                    .call(() => {
                        egret.Tween.removeTweens(twBg);
                        parent.removeChild(baojinbiBg);
                    })
                //震屏
                RoomUtil.shakeWindowByFish(view);
            }

            //播放一个圆盘
            let lotteryModel = burn.Director.getModelByKey(LotteryModel) as LotteryModel;
            let maxScore = game.table.T_Config_Table.getVoByKey(17).value;
            if (lotteryModel.getScore() >= Number(maxScore)) {
                game.util.FrameUtil.playCaipan(view, roomer, goldCount, "-1", true);
            } else {
                let roomType = this._userModel.getMatchRoomLevel();
                //竞技类赛事不进奖池
                if (roomType == RequesetRoomState.DjsRoom ||
                    roomType == RequesetRoomState.QmsRoom ||
                    game.util.GameUtil.isKss(roomType)) {
                    game.util.FrameUtil.playCaipan(view, roomer, goldCount, "-1", true);
                } else {
                    game.util.FrameUtil.playCaipan(view, roomer, goldCount);
                }
            }
        }

        /** 测试特效 */
        /////////////////////////////////
        let itemsWar = msg.getItems();
        let listWar = new Array<Number>();
        let showGoldWar = false;
        for (let i = 0; i < itemsWar.length; i++) {
            let itemId = itemsWar[i].itemId;
            if (itemId == PropEnum.BRONZE_WARHEAD) {//青铜
                listWar.push(Number(itemId));
            } else if (itemId == PropEnum.SILVER_WARHEAD) {
                listWar.push(Number(itemId));
            } else if (itemId == PropEnum.GOLD_WARHEAD) {
                listWar.push(Number(itemId));
                showGoldWar = true;
            }
        }
        //排序
        function compareFun(item1: number, item2: number) {
            if (item1 > item2) {
                return 1; // 如果是降序排序，返回-1。
            } else if (item1 === item2) {
                return 0;
            } else {
                return -1; // 如果是降序排序，返回1。
            }
        }
        if (listWar.length > 0) {//播放一个底盘特效 
            if (listWar.length > 1) {
                listWar.sort(compareFun);
            }
            let id = listWar[0];
            //warHead_5003_png
            //播放一个圆盘
            game.util.FrameUtil.playCaipan(view, roomer, 0, "" + id);
        }
        //弹出分享
        if(showGoldWar && roomer.getUserId() == this._userModel.getUserId() ) {
            if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
                let yaoQingView = new ShareZiYou(ShareType.Share_GuangYU);
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
        let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        if (userId == userModle.getUserId()) {
            this.checkGunUpdate(null, this);
            game.util.Guide.checkGuide(GuideTrriger.FishDead);
        }
    }
    //玩家消息
    private levelUp(msg: LevelUpMessage): void {
        let userId = msg.getUserId();
        let oldLv = Number(msg.getOldLevel());
        let newLv = Number(msg.getNewLevel());
        let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
        if (roomer) {
            roomer.setLv(newLv);
        }
        if (userId != this._userModel.getUserId()) {
            return;
        }
        for (let i = newLv; i > oldLv; i--) {
            game.util.GameUtil.openUserLvip(null, i);
        }
        this._userModel.setLevel(newLv);
        game.util.SoundManager.playEffectSound("levelup");
    }

    //解锁炮倍返回的逻辑
    private updateOrForgeBack(msg: UpgradeOrForgeBackMessage): void {
        let state = msg.getState();
        let id = msg.getUserId();
        if (state == UpdateOrForgeType.TYPE_SUC) {
            let type = msg.getType();
            if (type != GunUpdateType.UNLOCK) {
                return;
            }
            let gunId = msg.getAfterGunId();
            if (this._userModel.getUserId() == id) {
                this._userModel.setCurGunID(gunId);
            }
            let view = this.getView() as RoomView;
            let userId = msg.getUserId();
            let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
            let gunVo = game.table.T_Gun_Table.getVoByKey(gunId);
            if (gunVo) {
                view.setRoomerGunRate(roomer.getRoomPos(), gunVo.bulletNum);
            }
            if (this._userModel.getUserId() == id) {
                let items = msg.getItemProto();
                //掉落内容
                let itemId = items.itemId;
                let count = items.count;
                let item = new game.model.Item(itemId, count);
                if (itemId == PropEnum.GOLD) {
                    let posData = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
                    let to: egret.Point = new egret.Point(posData.x, posData.y);
                    if (to.y > 360) {
                        to.y = 670;
                    } else {
                        to.y = 50;
                    }
                    game.util.GameUtil.flyCoinsTOTOTO(count, 8, to, null, userId);

                } else {
                    this._userModel.addItem(item);
                }
                burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userId, isTween: true, count: this._userModel.getMoney() });

                let gunPos = roomer.getRoomPos();
                let gun = view.getRoomUI().gunList[gunPos];
                gun.setLocked(false);
                this.checkGunUpdate(null, this);
                roomer.setGunRate(msg.getAfterGunId());

                //检测隐藏。解锁按钮
                if (gunVo) {
                    let arr = gunVo.upgradeOrForgeCost;
                    let arrData = arr.split(",");
                    if (arrData.length > 1) {
                        view.getRoomUI().setHideUnlock();
                    }

                    let arrStr = arrData[0].split("_");
                    let num = parseInt(arrStr[1]);

                    let flafMoney = (this._userModel.getMoney() >= num);
                    if (flafMoney) {
                        view.openGunUpdateGroupByEnough();
                    }
                }
            }

            if (this._userModel.getUserId() != id) {
                let gunRateVo = game.table.T_Gun_Table.getVoByKey(msg.getAfterGunId());
                if (gunRateVo == null) {
                    game.util.GameUtil.popTips(game.util.Language.getText(99));
                    return;
                }
                roomer.setGunRate(msg.getAfterGunId());
                view.setRoomerGunRate(roomer.getRoomPos(), gunRateVo.bulletNum, roomer.getIsClone());
                burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: id });
            }
        } else {
            if (state == UpdateOrForgeType.TYPE_MAX) {
                game.util.GameUtil.popTips(game.util.Language.getText(25));
            } else if (state == UpdateOrForgeType.TYPE_NOENOUGH) {
                game.util.GameUtil.popTips(game.util.Language.getText(26));
                let view1: UnlockGunView = new UnlockGunView();
                let med: UnlockGunMediator = new UnlockGunMediator(view1);
                burn.Director.pushView(med);
            } else if (state == UpdateOrForgeType.TYPE_NULL) {
                game.util.GameUtil.popTips(game.util.Language.getText(27));
            }
        }
        if (this._userModel.getUserId() == id) {
            this.checkGunUpdate(null, this);
        }
    }
    //弹出充值界面
    private popCharge(obj: any, target: any): void {
        let type = ChargeType.Ticket;
        if (obj && obj.type) {
            type = obj.type;
        }
        let userModle = target._userModel as UserModel;
        if (userModle.getTicket() > 0) {
            //弹出各自类型
            let chargeView: ChargeView = new ChargeView(type);
            let chargeMed: ChargeMediator = new ChargeMediator(chargeView);
            burn.Director.pushView(chargeMed);
            return;
        }
        if (userModle.getTatolChargeRMB() <= 0) {
            //首冲
            let firstChargeView: FirstChargeView = new FirstChargeView();
            let firstChargeMed: FirstChargeMediator = new FirstChargeMediator(firstChargeView);
            burn.Director.pushView(firstChargeMed);
            return;
        }
        //冲过值，且没有点券，弹出点券充值界面
        let chargeView: ChargeView = new ChargeView(ChargeType.Ticket);
        let chargeMed: ChargeMediator = new ChargeMediator(chargeView);
        burn.Director.pushView(chargeMed);
    }

    //次日礼包相关内容
    private popCiri(obj: any, target: any): void {
        //判断次日礼包状态
        let state = target._userModel.getCiriState();
        if (state != Ciri_State.Time_Up) {
            return;
        }
        let gainArr = new Array<game.model.Item>();
        let voItem = game.table.T_Config_Table.getVoByKey(57).value;
        let str = voItem.split(",");
        let len = str.length;
        for (let i = 0; i < len; i++) {
            let dataS = str[i].split("_");
            gainArr.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]), 0));
        }
        let self = this;
        game.util.GameUtil.openCiriByPos(null, gainArr, null, function () {
            let send: NextDayAwardSendMessage = new NextDayAwardSendMessage();
            send.initData();
            NetManager.send(send);
            burn._Notification_.send(NotifyEnum.CLOSE_CIRI);
        });
    }
    //关闭次日礼包
    private closeCiri(obj: any, target: any): void {
        setTimeout(function () {
            //关闭
            let view = target.getView() as RoomView;
            view.getRoomUI().addCiriBtn();
        }, 200);
    }
    //检查炮倍解锁逻辑
    private checkGunUpdate(obj: any, target: any): void {
        let userId = target._userModel.getUserId();
        let roomer: game.model.Roomer = target._roomModel.getRoomerById(userId);
        //最高ID
        let gunRate = target._userModel.getCurGunID();
        let gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
        if (gunRate == game.table.T_Gun_Table.getAllVo().length) {
            let view = target.getView() as RoomView;
            view.getRoomUI().setHideUnlock();
            return;
        }
        //判断有没有下一个炮倍
        if (gunRateVo) {
            let arr = gunRateVo.upgradeOrForgeCost;
            let arrData = arr.split(",");
            let bEnough = true;
            let nEnoughNum = 0;
            let nCurNum = 0;
            if (arrData.length > 1) {
                let view = target.getView() as RoomView;
                if (obj) {
                    view.setRoomerGunRate(roomer.getRoomPos(), gunRateVo.bulletNum, roomer.getIsClone());
                    roomer.setGunRate(gunRate);
                    game.util.GameUtil.popTips(game.util.Language.getText(71));
                }
                view.getRoomUI().setHideUnlock();
                return;
            }
            for (let i = 0; i < 1; i++) {
                let item = arrData[i];
                let arrStr = item.split("_");
                let id = parseInt(arrStr[0]);
                let num = parseInt(arrStr[1]);
                let itemObj = new game.model.Item(id, 0);
                nEnoughNum = num;
                nCurNum = target._userModel.getMoney();
                if (nCurNum < num) {
                    bEnough = false;
                    break;
                }
            }
            let view = target.getView() as RoomView;
            view.setGunUpdateContains((gunRate), nCurNum, nEnoughNum);
            if (bEnough) {
                if (obj == null) {
                    view.openGunUpdateTips();
                } else {
                    view.openGunUpdateTips();
                    let req: UpgradeOrForgeSendMessage = new UpgradeOrForgeSendMessage();
                    req.initData();
                    req.setType(GunUpdateType.UNLOCK);
                    NetManager.send(req);
                    view.getRoomUI().getUnlockUpdateUI().openGunUpdateGroupByEnough();
                }
            } else {
                if (obj != null) {
                    let view = (target.getView() as RoomView);
                    view.setRoomerGunRate(roomer.getRoomPos(), gunRateVo.bulletNum, false);
                    roomer.setGunRate(gunRate);
                }
                if (obj == true) {
                    // burn._Notification_.send(NotifyEnum.POP_CHARGE,{type:ChargeType.Gem});
                    let view1: UnlockGunView = new UnlockGunView();
                    let med: UnlockGunMediator = new UnlockGunMediator(view1);
                    burn.Director.pushView(med);
                }
                view.getRoomUI().getUnlockUpdateUI().openGunUpdateGroupByNoEnough();
            }
        }
    }

    //救济金状态返回
    private bankruptStauts(obj: any, target: any): void {
        let status = obj.status;
        if (status == BankruptStauts.STATE_RESUME) {
            let userId = obj.userId;
            let myUserId = target._userModel.getUserId();
            if (userId == myUserId) {
                //重置破产信息
                target._userModel.setBankruptTime(-1);
            }
            let view = target.getView() as RoomView;
            let roomer: game.model.Roomer = target._roomModel.getRoomerById(userId);
            view.removeBankrupt(roomer.getRoomPos());
            roomer.setBankrupt(false);
        } else if (status == BankruptStauts.GET_SUCC) {
            let coins = obj.coins;
            let userId = obj.userId;
            let view = target.getView() as RoomView;
            let roomer: game.model.Roomer = target._roomModel.getRoomerById(userId);
            let item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
            let to: egret.Point = new egret.Point(item.x, item.y);
            if (to.y > 360) {
                to.y = 670;
            } else {
                to.y = 50;
            }
            game.util.GameUtil.flyCoinsTOTOTO(coins, 8, to, null, userId);
            view.removeBankrupt(roomer.getRoomPos());
            roomer.setBankrupt(false);
            target._userModel.setBankruptTime(-1);
        } else if (status == BankruptStauts.GET_LIMIT) {
            game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getText(35));
        } else if (status == BankruptStauts.NOT_TO_TIME) {
            let view = target.getView() as RoomView;
            let userId = obj.userId;
            let roomer: game.model.Roomer = target._roomModel.getRoomerById(userId);
            if (roomer.getBankrupt()) {
                return;
            }
            let time = obj.time;
            target._userModel.setBankruptTime(time);
            let residueTime = time - game.util.TimeUtil.getCurrTime();
            let timeStr = game.util.TimeUtil.sceonds2MinStr(residueTime);
            let content = game.util.Language.getDynamicText(36, [timeStr]);
            let myUserId = target._userModel.getUserId();
            if (userId == myUserId) {
                view.setBackrupt(roomer.getRoomPos(), content, true);
            } else {
                view.setBackrupt(roomer.getRoomPos(), content, false);
            }
            roomer.setBankrupt(true);
            setTimeout(function () {
                RoomUtil.shakeWindowByFish(view);
            }, 166);
        }
    }

    //更新房间内玩家子弹数量显示
    private updateRoomUIBullets(obj: any, target: any): void {
        let userId: number = obj.userId;
        let roomer: game.model.Roomer = target._roomModel.getRoomerById(userId);
        if (!roomer) {
            return;
        }
        let pos = roomer.getRoomPos();
        let num = roomer.getDjsObj().grandPrixBulletNum;
        let view = target.getView() as RoomView;
        view.setRoomerBullet(pos, num, obj.isTween);
    }

    //更新房间内玩家金币显示
    private updateRoomUICoins(obj: any, target: any): void {
        let userId: number = obj.userId;
        let roomer: game.model.Roomer = target._roomModel.getRoomerById(userId);
        if (!roomer) {
            return;
        }
        let pos = roomer.getRoomPos();
        let num = 0;
        if (userId == target._userModel.getUserId()) {
            num = target._userModel.getCoins();
        } else {
            num = roomer.getCoins();
        }
        let view = target.getView() as RoomView;
        view.setRoomerCoins(pos, num, obj.isTween);

        //添加一个自己的+999的数字标签
        let item: egret.Point = RoomUtil.getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        let to: egret.Point = new egret.Point(item.x, item.y);
        if (to.x > 640) {
            to.x = 1168;
        } else {
            to.x = 112;
        }
        if (to.y > 360) {
            to.y = 620;
        } else {
            to.y = 150;
        }
        //num pos 
        if (obj.count) {
            game.util.FrameUtil.playAddCoinsOnLab(obj.count, to, view.getBulletLayer());
        }
    }
    //更新房间内玩家钻石显示
    private updateRoomUIMoney(obj: any, target: any): void {
        let userId: number = obj.userId;
        let roomer: game.model.Roomer = target._roomModel.getRoomerById(userId);
        if (roomer) {
            let pos = roomer.getRoomPos();
            let num = 0;
            if (userId == target._userModel.getUserId()) {
                num = target._userModel.getMoney();
            } else {
                num = roomer.getMoney();
            }
            let view = target.getView() as RoomView;
            view.setRoomerMoney(pos, num);
        }
        if (userId == target._userModel.getUserId()) {
            burn._Notification_.send(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED);
        }
    }

    //打开抽奖界面
    private openLotteryUI(obj: any, target: any): void {
        let view = target.getView() as RoomView;
        let userId = target._userModel.getUserId();
        let roomer: game.model.Roomer = target._roomModel.getRoomerById(userId);
        let to: egret.Point = RoomUtil.getPointByPos(roomer.getRoomPos(), view.getIsFlip());
        view.openLotteryUI(to);
    }
    //////////////////////////////////////////////////////引导相关/////////////////////////////////////////////////////////////
    private guide_fishDead(): void {
        let view = this.getView() as RoomView;
        let userId: number = this._userModel.getUserId();
        let roomer: game.model.Roomer = this._roomModel.getRoomerById(userId);
        let item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip());
        let to: egret.Point = new egret.Point(item.x, item.y);
        if (to.y > 360) {
            to.y = 670;
        } else {
            to.y = 50;
        }
        let uniqId: number = Especial_Fish.Guide_Fish;

        let fishList = view.getFishList();
        //如果是黄金鱼，特殊鱼。播放金币特效
        //functionType == 2
        let fish = RoomUtil.getFishById(view.getFishList(), uniqId);
        if (fish == null) {
            console.warn("此条鱼不存在：" + uniqId);
            return;
        }
        let fishVo = game.table.T_Fish_Table.getVoByKey(fish.getFishId());
        if (fishVo.functionType == 2) {
            let bFind = false;
            let goldCount = 2000;
            let dropX = 0;
            let dropY = 0;
            if (fish.getType() == AddFishType.FISH) {
                let p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            } else {
                let p = fish.localToGlobal();
                dropX = p.x;
                dropY = p.y;
            }
            let parent = view.getBulletLayer();
            let data = RES.getRes("ef_baojinbi_json");
            let txtr = RES.getRes("ef_baojinbi_png");
            let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);

            let goldIcon = new MovieFish(mcFactory.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
            goldIcon.initEvent();
            // goldIcon.blendMode = egret.BlendMode.ADD;
            goldIcon.scaleX = 2.1;
            goldIcon.scaleY = 2.1;
            goldIcon.frameRate = 8;
            goldIcon.gotoAndPlay("play", 1);
            let dataMc: egret.MovieClipData = goldIcon.movieClipData;

            let frameCur = 0;
            let Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
            goldIcon.anchorOffsetX = (goldIcon.width >> 1) + Rect.x;
            goldIcon.anchorOffsetY = (goldIcon.height >> 1) + Rect.y;
            goldIcon.frameRate = 10;
            goldIcon.x = dropX;
            goldIcon.y = dropY;
            parent.addChild(goldIcon);


            //震屏
            RoomUtil.shakeWindowByFish(view);

            //播放一个圆盘
            let lotteryModel = burn.Director.getModelByKey(LotteryModel) as LotteryModel;
            let maxScore = game.table.T_Config_Table.getVoByKey(17).value;
            if (lotteryModel.getScore() >= Number(maxScore)) {
                game.util.FrameUtil.playCaipan(view, roomer, goldCount, "-1", true);
            } else {
                game.util.FrameUtil.playCaipan(view, roomer, goldCount);
            }
        }
        //处理死亡与掉落逻辑
        let arr = new Array<any>();
        RoomUtil.fishDeadHandler(fishList, uniqId, userId, to, arr, view.getRoomUI(), view);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //插入分身状态的ID
    public insertClonePos(nPos: number): void {
        if (this._arrCloneId == null) {
            this._arrCloneId = new Array<number>();
        }
        for (let i = 0; i < this._arrCloneId.length; i++) {
            if (this._arrCloneId[i] == nPos) {
                return;
            }
        }
        this._arrCloneId.push(nPos);
    }
    //删除分身状态
    public deleteClonePos(nPos: number): void {
        if (this._arrCloneId == null) {
            return;
        }
        let index = -1;
        for (let i = 0; i < this._arrCloneId.length; i++) {
            if (this._arrCloneId[i] == nPos) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            this._arrCloneId.splice(index, 1);
        }
    }
    //判断当前位置是否是分身状态
    public isCloneByPos(nPos: number): boolean {
        if (this._arrCloneId == null) {
            return false;
        }
        if (this._arrCloneId.length == 0) {
            return false;
        }
        for (let i = 0; i < this._arrCloneId.length; i++) {
            if (this._arrCloneId[i] == nPos) {
                return true;
            }
        }
        return false;
    }

    public serverFishHandler(msg: SyncFishPosInfoMessage): void {

        let backList = new Array<any>();

        let view = this.getView() as RoomView;
        let fishList = view.getFishList();

        let groupList: Array<number> = msg.getGroupIdList();
        for (let i = 0; i < groupList.length; i++) {
            let pos = groupList[i];
            let gunPos = view.getRoomUI().getGunByPos(pos);

            if (fishList.length > i) {
                let fish = fishList[fishList.length - i - 1];
                let fUid = 0;
                if (fish.getActor().getType() == AddFishType.FISH) {
                    fUid = fish.getActor().getUniqId();
                    let point = fish.getActor().localToGlobal();
                    let angle = FishUtil.getAngle(gunPos.x, gunPos.y, point.x, point.y);
                    backList.push({ groupId: pos, fishId: [fUid], pos: angle });
                } else if (fish.getActor().getType() == AddFishType.FISH_GROUP) {
                    let gFish = fish.getActor() as room.actor.FishGroup;
                    let gFishList = gFish.getFishList();
                    if (gFishList.length > 0) {
                        fUid = gFishList[0].getUniqId();
                        let x = gFishList[0].x;
                        let y = gFishList[0].y;
                        let point = gFishList[0].localToGlobal();
                        let angle = FishUtil.getAngle(gunPos.x, gunPos.y, point.x, point.y);
                        backList.push({ groupId: pos, fishId: [fUid], pos: angle });
                    }
                }
            }
            if (backList.length > 0) {
                let back = new GunFishPosInfoMessageMessage();
                back.initData();
                back.setFishPostList(backList);
                NetManager.send(back);
            }
        }
    }

    /** 收取邮件 */
    private receiMail(data: MailMessage) {
        let emailItem = new game.model.EmailItem(data.getMailId(), data.getMailType(), data.getUserId(), data.getReceiveUserName(),
            data.getSendUserId(), data.getSendUserName(), data.getItems(), data.getTime(),
            data.getState(), data.getMailContent(), data.getMailTitle());
        let arrName = new Array<string>();
        arrName.push(data.getSendUserName() + "");
        arrName.push(data.getSendUserId() + "");
        arrName.push(emailItem.getItems()[0].getCount() + "");
        let vo = game.table.T_Item_Table.getVoByKey(Number(emailItem.getItems()[0].getItemId()));
        arrName.push(game.util.Language.getText(vo.name) + "");
        //是否邮寄{0}个{1}给{2}({3})
        let string = game.util.Language.getDynamicText(46, arrName);
        (function (emailItem, string) {
            game.util.GameUtil.openEmailChakan(null, function () {
                let req: ReceiveMailSendMessage = new ReceiveMailSendMessage();
                req.initData();
                req.setMailId(emailItem.getMailId());
                NetManager.send(req);
            }, string, emailItem.getItems(), emailItem.getState());
        } (emailItem, string));
    }

    public destroy(): void {
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
    }
}                                                                              