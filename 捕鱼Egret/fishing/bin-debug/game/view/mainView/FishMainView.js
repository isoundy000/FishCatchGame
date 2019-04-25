var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FishMainView = (function (_super) {
    __extends(FishMainView, _super);
    function FishMainView() {
        var _this = _super.call(this) || this;
        _this.MAIN_ITEM_COUNT = 6;
        _this.loadErrorCount = 0;
        _this._nExchangeActIndex = 0;
        return _this;
    }
    FishMainView.prototype.initView = function () {
        var userModel = burn.Director.getModelByKey(UserModel);
        if (!userModel.isTodayFirstLogin()) {
            //开始转loading
            game.util.UIUtil.startLoading();
        }
        var model = burn.Director.getModelByKey(UserModel);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/MainView.exml", this.addBgResource, this);
        this._btnWrapList = new Array();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    };
    FishMainView.prototype.onResourceLoadError = function (event) {
        if (event.groupName == "currBgMusic") {
            console.warn("Group:" + event.groupName + " has failed to load");
            this.loadErrorCount += 1;
            if (this.loadErrorCount < 3) {
                RES.loadGroup(event.groupName);
            }
        }
    };
    FishMainView.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "ui_sound") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            game.util.SoundManager.uiSoundLoadEnd = true;
            if (CONFIG.isOpenMusic) {
                this._bgMusicName = "bgm_lobby_mp3";
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.createGroup("currBgMusic", [this._bgMusicName]);
                RES.loadGroup("currBgMusic");
            }
        }
        if (event.groupName == "currBgMusic") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            game.util.SoundManager.playBackgroundMusic(this._bgMusicName);
        }
    };
    FishMainView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        //添加操作UI
        this._uiDisplay = new MainViewUI();
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        this.send(NotifyEnum.MAIN_UI_INIT);
        var vos = new Array();
        this._arrMainItem = new Array();
        var itemLoadCount = 0;
        var itemCallback = function () {
            itemLoadCount++;
            if (itemLoadCount > 3) {
                game.util.UIUtil.closeLoading();
                var userModel_1 = burn.Director.getModelByKey(UserModel);
                if (userModel_1.getGuideID() >= 1) {
                    game.util.LoaderUtil.startMainSilentLoad();
                    if (CONFIG.isOpenMusic) {
                        RES.loadGroup("ui_sound");
                    }
                }
            }
        };
        for (var i = 1; i < this.MAIN_ITEM_COUNT; i++) {
            if (i == GlobalManager.getInstance().MAIN_ENTR_IDX) {
                var item = new main.MainItem(i, true, itemCallback);
                item.scaleX = item.scaleY = 0.9;
                vos.push(item);
                if (i < 4) {
                    this._arrMainItem.push(item);
                }
            }
            else {
                var item = new main.MainItem(i, false, itemCallback);
                item.scaleX = item.scaleY = 0.9;
                vos.push(item);
                if (i < 4) {
                    this._arrMainItem.push(item);
                }
            }
        }
        this._scrollView = new burn.display.PageView();
        this._scrollView.init(1020, 535, 340, 10);
        this._scrollView.setData(vos);
        // this._scrollView.x = 120;
        // this._scrollView.y = 100;
        this._uiDisplay.mainItemGroup.addChild(this._scrollView);
        this._scrollView.gotoPage(GlobalManager.getInstance().MAIN_ENTR_IDX);
        this._scrollView.addEventListener(burn.event.ScrollEvent.SCROLL_END, this.scrollEnd, this);
        //为按钮添加事件
        this._uiDisplay.bagBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.aquariumBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.makeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.emailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.bankruptBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.exchangeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.roleAvaGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.taskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.signinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.monthBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.activityBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.vipLotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.vipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.btnAddGem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.btnAddTicket.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        // this._uiDisplay.guanzhuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        //
        this._uiDisplay.imageAvaBg.touchEnabled = false;
        this._uiDisplay.imageAva.touchEnabled = false;
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.aquariumBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.bagBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.makeBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.taskBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.shopBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.exchangeBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.emailBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.bankruptBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.signinBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.monthBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.activityBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.settingBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.rankBtn));
        //this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.vipLotteryBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.vipBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnAddGold));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnAddGem));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnAddTicket));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.yaoqingBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.guanzhuBtn));
        //播放动画
        this._uiDisplay.play.addEventListener('complete', this.onTweenGroupComplete, this);
        this._uiDisplay.play.play(0);
        // Debug模式，编辑鱼的碰撞区域入口按钮
        if (true) {
            if (CONFIG.DEBUG) {
                var debugBtn = new eui.Button();
                debugBtn.width = 150;
                debugBtn.height = 40;
                debugBtn.label = "超级无敌模式";
                // debugBtn.skinName = "ButtonSkin.exml";
                this._uiDisplay.addChild(debugBtn);
                debugBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    var testView = new TestView();
                    var testMed = new TestMediator(testView);
                    burn.Director.pushView(testMed);
                }, this);
            }
        }
        this._uiDisplay.rankGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
        //增加UI适配边框
        game.util.UIUtil.screenAdapter(this._uiDisplay);
        //登录后进入主界面请求滚屏公告
        var send = new CGBroadcastMessageSendMessage();
        send.initData();
        NetManager.send(send);
        //处理QQ玩吧礼包
        if (CONFIG.PLATFORM_ID == PlatformTypeEnum.QQ_ZONE && !FishMainView._isOpenWanbaUI) {
            FishMainView._isOpenWanbaUI = true;
            this.send(NotifyEnum.REQ_QQZONE_GIFT);
        }
        else {
            this.checkMianLogic();
        }
        //设置首冲按钮
        var userModel = burn.Director.getModelByKey(UserModel);
        if (userModel.getTatolChargeRMB() > 0) {
            this._uiDisplay.firstChargeImg.visible = false;
            this._uiDisplay.chargeImg.visible = true;
        }
        else {
            this._uiDisplay.firstChargeImg.visible = true;
            this._uiDisplay.chargeImg.visible = false;
        }
        if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
            this._uiDisplay.guanzhuBtn.visible = true;
            this._uiDisplay.yaoqingBtn.visible = true;
            if (CONFIG.IS_WEB) {
                this._uiDisplay.yaoqingBtn.visible = false;
            }
            this._uiDisplay.guanzhuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.yaoqingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        var imageGold = this._uiDisplay.imageGold;
        game.util.GameUtil.addGoldEffect(imageGold);
        var imageGem = this._uiDisplay.imageGem;
        var tw = egret.Tween.get(imageGem);
        tw.wait(1000).call(function () {
            egret.Tween.removeTweens(imageGem);
            game.util.GameUtil.addGoldEffect(imageGem);
        });
        var imageTic = this._uiDisplay.imageTicket;
        var twTic = egret.Tween.get(imageTic);
        twTic.wait(2000).call(function () {
            egret.Tween.removeTweens(imageTic);
            game.util.GameUtil.addGoldEffect(imageTic);
        });
        //添加动画
        var group = this._uiDisplay.exchangeGroup;
        this.playActExchange();
        //给充值按钮添加跳一跳动画
        burn.tools.TweenTools.jump(this._uiDisplay.vipLotteryBtn);
    };
    FishMainView.prototype.playActExchange = function () {
        var _this = this;
        var tw = egret.Tween.get(this._uiDisplay.exchangeGroup, { loop: false });
        tw.to({ x: 912, y: 71, scaleX: 1, scaleY: 1 }, 20)
            .to({ x: 912, y: 73, scaleX: 1, scaleY: 0.78 }, 100)
            .to({ x: 912, y: 63, scaleX: 1, scaleY: 1 }, 100)
            .to({ x: 912, y: 71, scaleX: 1, scaleY: 1 }, 60)
            .to({ x: 912, y: 73, scaleX: 1, scaleY: 0.78 }, 40)
            .to({ x: 912, y: 71, scaleX: 1, scaleY: 1 }, 60)
            .wait(5000).call(function () {
            egret.Tween.removeTweens(_this._uiDisplay.exchangeGroup);
            _this.playActExchange();
        });
    };
    /** qq玩吧礼包 */
    FishMainView.prototype.showWanbaGift = function (state, itemList) {
        var wanbaView = new WanbaGiftView(state, itemList);
        var wanbaMed = new WanbaGiftMeditor(wanbaView);
        burn.Director.pushView(wanbaMed);
    };
    /** 检查进入游戏大厅逻辑 */
    FishMainView.prototype.checkMianLogic = function () {
        var userModel = burn.Director.getModelByKey(UserModel);
        //检查次日礼包
        this.checkCiri();
        //检查红点
        this.send(NotifyEnum.CHECK_MAIN_ALERT);
        if (CONFIG.openGuide) {
            //检测抽奖
            if (userModel.getGuideID() != 9999) {
                userModel.setGuideID(9998);
                game.util.Guide.checkGuide(GuideTrriger.First);
                //播放入场动画
                this.playIntoAct();
                return;
            }
            var guideOver = game.table.T_Config_Table.getVoByKey(49).value;
            var curID = userModel.getGuideID();
            var strOver = guideOver.split(",");
            for (var i = 0; i < strOver.length; i++) {
                if (curID >= Number(strOver[i])) {
                    //this.openPanel();
                    this.send(NotifyEnum.CHECK_POP);
                    break;
                }
            }
        }
        if (!CONFIG.openGuide) {
            //this.openPanel();
            this.send(NotifyEnum.CHECK_POP);
        }
        //播放入场动画
        this.playIntoAct();
    };
    //检查次日礼包
    FishMainView.prototype.checkCiri = function () {
        var userModel = burn.Director.getModelByKey(UserModel);
        var state = userModel.getCiriState();
        switch (state) {
            case Ciri_State.Expired:
                this._uiDisplay.ciriBtn.visible = false;
                this._uiDisplay.expireTime.visible = false;
                this._uiDisplay.ciriAlert.visible = false;
                break;
            case Ciri_State.Gained:
                this._uiDisplay.ciriBtn.visible = false;
                this._uiDisplay.expireTime.visible = false;
                this._uiDisplay.ciriAlert.visible = false;
                break;
            case Ciri_State.Time_Up:
                this._uiDisplay.ciriBtn.visible = true;
                this._uiDisplay.ciriAlert.visible = false;
                var gainArr_1 = new Array();
                var voItem = game.table.T_Config_Table.getVoByKey(57).value;
                var str = voItem.split(",");
                var len = str.length;
                for (var i = 0; i < len; i++) {
                    var dataS = str[i].split("_");
                    gainArr_1.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]), 0));
                }
                this._uiDisplay.ciriBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    game.util.GameUtil.openCiriByPos(null, gainArr_1, null, null);
                }, this);
                //expireTime
                this._uiDisplay.expireTime.text = game.util.TimeUtil.expireTime(game.table.T_Language_Table.getVoByKey(120).value);
                break;
            case Ciri_State.Un_Gain:
                this._uiDisplay.ciriBtn.visible = true;
                this._uiDisplay.ciriAlert.visible = true;
                var cireGainArr_1 = new Array();
                var cvoItem = game.table.T_Config_Table.getVoByKey(57).value;
                var cstr = cvoItem.split(",");
                var clen = cstr.length;
                for (var i = 0; i < clen; i++) {
                    var dataS = cstr[i].split("_");
                    cireGainArr_1.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]), 0));
                }
                this._uiDisplay.ciriBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    game.util.GameUtil.openCiriByPos(null, cireGainArr_1, new egret.Point(262, 659), function () {
                        var send = new NextDayAwardSendMessage();
                        send.initData();
                        NetManager.send(send);
                    });
                }, this);
                this._uiDisplay.expireTime.text = game.util.TimeUtil.expireTime(game.table.T_Language_Table.getVoByKey(120).value);
                break;
        }
    };
    //弹出各种板子
    FishMainView.prototype.openPanel = function (state) {
        switch (state) {
            case Pop_State.VIP:
                var userModel = burn.Director.getModelByKey(UserModel);
                var vipLv = userModel.getVipLevel();
                var voVip = game.table.T_VipLevel_Table.getVoByKey(vipLv);
                var makeUpConisTo = voVip.makeUpConisTo;
                var award = voVip.everydayAward;
                if (makeUpConisTo > 0 && userModel.isTodayFirstLogin()) {
                    var gainArr_2 = new Array();
                    gainArr_2.push(new game.model.Item(PropEnum.GOLD, makeUpConisTo, 0));
                    var str_1 = award.split(",");
                    var len_1 = str_1.length;
                    for (var i = 0; i < len_1; i++) {
                        var dataS = str_1[i].split("_");
                        gainArr_2.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]), 0));
                    }
                    var self_1 = this;
                    game.util.GameUtil.openVipCommonPanel(null, gainArr_2, new egret.Point(262, 659), function () {
                        self_1.send(NotifyEnum.CHECK_POP);
                    }, makeUpConisTo);
                }
                else {
                    this.send(NotifyEnum.CHECK_POP);
                }
                break;
            case Pop_State.MONTH_CARD:
                // let view1:MonthCardView = new MonthCardView(true);
                // let med1:MonthCardMediator = new MonthCardMediator(view1);
                // burn.Director.pushView(med1);
                var view1 = new MonthCardRewardView(true);
                var med1 = new MonthCardRewardMediator(view1);
                burn.Director.pushView(med1);
                break;
            case Pop_State.FIRST_CHARGE:
                // let view:FirstChargeView = new FirstChargeView();
                // let med:FirstChargeMediator = new FirstChargeMediator(view);
                // burn.Director.pushView(med);
                break;
            case Pop_State.CIRI:
                var gainArr = new Array();
                var voItem = game.table.T_Config_Table.getVoByKey(57).value;
                var str = voItem.split(",");
                var len = str.length;
                for (var i = 0; i < len; i++) {
                    var dataS = str[i].split("_");
                    gainArr.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]), 0));
                }
                var self_2 = this;
                game.util.GameUtil.openCiriByPos(null, gainArr, new egret.Point(262, 659), function () {
                    var send = new NextDayAwardSendMessage();
                    send.initData();
                    NetManager.send(send);
                    self_2.send(NotifyEnum.CHECK_POP);
                });
                break;
            case Pop_State.CIRCLE:
                var view3 = new CircleView();
                var med3 = new CircleMediator(view3);
                burn.Director.pushView(med3);
                break;
        }
    };
    FishMainView.prototype.playIntoAct = function () {
        var _this = this;
        this._uiDisplay.start_btn.touchEnabled = false;
        /** down up right */
        var actTime = 600;
        var self = this;
        var twUp = egret.Tween.get(this._uiDisplay.up, { loop: false });
        this._uiDisplay.up.y = -100;
        twUp.to({ y: 0 }, actTime, egret.Ease.backOut)
            .call(function () {
            egret.Tween.removeTweens(self._uiDisplay.up);
        });
        var twDown = egret.Tween.get(this._uiDisplay.down, { loop: false });
        this._uiDisplay.down.y = 600;
        twDown.to({ y: 488 }, actTime, egret.Ease.backOut)
            .call(function () {
            egret.Tween.removeTweens(self._uiDisplay.down);
        });
        var twDownRight = egret.Tween.get(this._uiDisplay.mainBtnGroup, { loop: false });
        this._uiDisplay.mainBtnGroup.x = -1280;
        twDownRight.wait(actTime).to({ x: 0 }, actTime, egret.Ease.backOut)
            .call(function () {
            egret.Tween.removeTweens(self._uiDisplay.mainBtnGroup);
            _this._uiDisplay.start_btn.touchEnabled = true;
        });
        var twRight = egret.Tween.get(this._uiDisplay.rightGroup, { loop: false });
        this._uiDisplay.rightGroup.x = 1180;
        twRight.to({ x: 1080 }, actTime, egret.Ease.backOut)
            .call(function () {
            egret.Tween.removeTweens(self._uiDisplay.rightGroup);
        });
        var twLeft = egret.Tween.get(this._uiDisplay.rankGroup, { loop: false });
        this._uiDisplay.rankGroup.x = -150;
        twLeft.to({ x: -100 }, actTime, egret.Ease.backOut)
            .call(function () {
            egret.Tween.removeTweens(self._uiDisplay.rankGroup);
        });
        var items = this._scrollView.getVisibleItems();
        var twMiddle = egret.Tween.get(items[1], { loop: false });
        items[1].y = 200;
        twMiddle.to({ y: 0 }, actTime, egret.Ease.backOut)
            .call(function () {
            egret.Tween.removeTweens(items[1]);
        });
        var twMiddleLeft = egret.Tween.get(items[0], { loop: false });
        items[0].x = -175;
        twMiddleLeft.to({ x: 0 }, actTime, egret.Ease.backOut)
            .call(function () {
            egret.Tween.removeTweens(items[0]);
            _this._scrollView.startRegistEvent();
        });
        var twMiddleRight = egret.Tween.get(items[2], { loop: false });
        items[2].x = 875;
        twMiddleRight.to({ x: 700 }, actTime, egret.Ease.backOut)
            .call(function () {
            egret.Tween.removeTweens(items[2]);
        });
    };
    FishMainView.prototype.checkAlert = function (bEmail, bTask, bSign, monthArert) {
        if (this._uiDisplay) {
            this._uiDisplay.alertEmail.visible = bEmail;
            this._uiDisplay.alertTask.visible = bTask;
            this._uiDisplay.alertSign.visible = bSign;
            this._uiDisplay.alertMonth.visible = monthArert;
        }
    };
    FishMainView.prototype.shouTips = function (evt) {
        game.util.GameUtil.popTips(game.util.Language.getText(47));
    };
    //播放主场景UI动画
    FishMainView.prototype.onTweenGroupComplete = function () {
        if (this._uiDisplay) {
            this._uiDisplay.play.play(0);
        }
    };
    /** 点击功能按钮 */
    FishMainView.prototype.onButtonClick = function (e) {
        var target = e.target;
        if (target == this._uiDisplay.bagBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "bagBtn");
        }
        else if (target == this._uiDisplay.makeBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "makeBtn");
        }
        else if (target == this._uiDisplay.bankruptBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "bankruptBtn");
        }
        else if (target == this._uiDisplay.emailBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "emailBtn");
        }
        else if (target == this._uiDisplay.exchangeBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "exchangeBtn");
        }
        else if (target == this._uiDisplay.roleAvaGroup) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "roleAvaGroup");
        }
        else if (target == this._uiDisplay.taskBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "taskBtn");
        }
        else if (target == this._uiDisplay.shopBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "shopBtn");
        }
        else if (target == this._uiDisplay.settingBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "settingBtn");
        }
        else if (target == this._uiDisplay.signinBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "signinBtn");
        }
        else if (target == this._uiDisplay.btnAddGold) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "charge_gold");
        }
        else if (target == this._uiDisplay.btnAddGem) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "charge_gem");
        }
        else if (target == this._uiDisplay.btnAddTicket) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "charge_ticket");
        }
        else if (target == this._uiDisplay.vipBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "vipBtn");
        }
        else if (target == this._uiDisplay.monthBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "monthBtn");
        }
        else if (target == this._uiDisplay.vipLotteryBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "vipLotteryBtn");
        }
        else if (target == this._uiDisplay.rankBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "rankBtn");
        }
        else if (target == this._uiDisplay.yaoqingBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "yaoqingBtn");
        }
        else if (target == this._uiDisplay.guanzhuBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "guanzhuBtn");
        }
        else if (target == this._uiDisplay.activityBtn) {
            this.send(NotifyEnum.CLICK_MAIN_BTN, "activityBtn");
        }
        else {
            game.util.GameUtil.popTips(game.util.Language.getText(47));
        }
    };
    //滚动结束事件
    FishMainView.prototype.scrollEnd = function (evt) {
        if (CONFIG.openGuide) {
            var userModel = burn.Director.getModelByKey(UserModel);
            if (userModel.getGuideID() <= 1) {
                return;
            }
        }
        var vos = this._scrollView.getVos();
        var middleItem = null;
        for (var i = 0; i < vos.length; i++) {
            var vo = vos[i];
            if (vo.getSelected() == true) {
                if (evt.scrollType == "left") {
                    var j = i + 1;
                    if (j < vos.length) {
                        var temp = vos[j];
                        temp.setSelected(true);
                        GlobalManager.getInstance().MAIN_ENTR_IDX = temp.id;
                    }
                    else {
                        var temp = vos[0];
                        temp.setSelected(true);
                        GlobalManager.getInstance().MAIN_ENTR_IDX = temp.id;
                    }
                }
                else if (evt.scrollType == "right") {
                    var j = i - 1;
                    if (j > 0) {
                        var temp = vos[j];
                        temp.setSelected(true);
                        GlobalManager.getInstance().MAIN_ENTR_IDX = temp.id;
                    }
                    else {
                        var temp = vos[vos.length - 1];
                        temp.setSelected(true);
                        GlobalManager.getInstance().MAIN_ENTR_IDX = temp.id;
                    }
                }
                vo.setSelected(false);
                break;
            }
        }
        // let vos = this._scrollView.getVisibleItems();
        // for (let i = 0; i < vos.length; i++) {
        // 	let item = vos[i] as main.MainItem;
        // 	if (i == 1) {
        // 		item.setSelected(true);
        // 		GlobalManager.getInstance().MAIN_ENTR_IDX = item.id;
        // 	} else {
        // 		item.setSelected(false);
        // 	}
        // }
    };
    FishMainView.prototype.updateCoins = function (goldStr) {
        var labGold = this._uiDisplay.labelGoldNum;
        labGold.text = goldStr;
    };
    //设置主界面状态
    FishMainView.prototype.setMainStateInfo = function (goldStr, gemStr, ticStr, lvStr, exp, cunExp, maxExp, uName) {
        this._btnStartGame = this._uiDisplay.start_btn;
        this._btnStartGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartButtonClick, this);
        this._btnStartGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this._btnStartGame.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this._btnStartGame.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        var labGold = this._uiDisplay.labelGoldNum;
        labGold.text = goldStr;
        var labGem = this._uiDisplay.labelGemNum;
        labGem.text = gemStr;
        var labTicket = this._uiDisplay.labelTicketNum;
        labTicket.text = ticStr;
        if (uName.length > 5) {
            uName = uName.substr(0, 5) + "...";
        }
        this._uiDisplay.user_name.text = uName + "  Lv:" + lvStr;
        this._uiDisplay.expLab.text = cunExp + "/" + maxExp;
        var percent = Number(cunExp) * 1.0 / Number(maxExp);
        this._uiDisplay.expCur_152.width = percent * 152.0;
        var userModel = burn.Director.getModelByKey(UserModel);
        this._uiDisplay.vipLab.text = "VIP " + userModel.getVipLevel();
    };
    //设置玩家头像
    FishMainView.prototype.setHeadIcon = function (bmp) {
        bmp.x = 7;
        bmp.y = 7;
        this._uiDisplay.roleAvaGroup.addChild(bmp);
    };
    /**直接捕鱼的界面 */
    FishMainView.prototype.onStartButtonClick = function (e) {
        this.openLoadingUI(null);
    };
    FishMainView.prototype.onTouchBegin = function (e) {
        this._btnStartGame.scaleX = this._btnStartGame.scaleY = 1.1;
    };
    FishMainView.prototype.onTouchEnd = function (e) {
        this._btnStartGame.scaleX = this._btnStartGame.scaleY = 1;
    };
    /**开启选房间界面 */
    FishMainView.prototype.onSelectButtonClick = function () {
        var selectRoomView = new SelectRoomView();
        var selectRoomMed = new SelectRoomMediator(selectRoomView);
        burn.Director.pushView(selectRoomMed);
    };
    FishMainView.prototype.openLoadingUI = function (data) {
        if (data == null) {
            this.send(NotifyEnum.RES_LOAD_OVER, null);
        }
        else {
            this.send(NotifyEnum.RES_LOAD_OVER, data);
        }
    };
    //添加loadingUI
    FishMainView.prototype.addLoadingUI = function () {
        //清除大厅内的滚动公告
        game.util.GCBroadcastManager.clearHallBroadcast();
        this._loadingUI = new LoadingUI();
        this.addChild(this._loadingUI);
        this._loadingUI.initView();
    };
    //更新loading进度
    FishMainView.prototype.updateLoading = function (itemsLoaded, itemsTotal) {
        this._loadingUI.setProgress(itemsLoaded, itemsTotal);
    };
    FishMainView.prototype.closeLoadingUI = function () {
        this._loadingUI.parent.removeChild(this._loadingUI);
    };
    FishMainView.prototype.getScrollView = function () {
        return this._scrollView;
    };
    /** 设置救济金倒计时 */
    FishMainView.prototype.setBankruptTime = function (str) {
        this._uiDisplay.bankruptTime.text = str;
    };
    /** 设置救济金倒计时是否显示 */
    FishMainView.prototype.setBankruptVisble = function (flag) {
        this._uiDisplay.bankruptTime.visible = flag;
    };
    //设置在线人数
    FishMainView.prototype.setRoomOnLineUI = function () {
        //this._arrMainItem
        if (!this._arrMainItem) {
            return;
        }
        var len = this._arrMainItem.length;
        for (var i = 0; i < len; i++) {
            if (this._arrMainItem[i]._alivePerson) {
                this._arrMainItem[i]._alivePerson.setPersonNumById(this._arrMainItem[i].id);
            }
        }
    };
    //设置活动红点
    FishMainView.prototype.setActiveAlert = function (bShow) {
        if (!this._uiDisplay) {
            return;
        }
        this._uiDisplay.alertActive.visible = bShow;
    };
    //设置月卡红点
    FishMainView.prototype.setMonthAlert = function (bShow) {
        if (!this._uiDisplay) {
            return;
        }
        this._uiDisplay.alertMonth.visible = bShow;
    };
    FishMainView.prototype.destroy = function () {
        this._loadingUI && this._loadingUI.destroy();
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        //清理主界面入口相关资源
        var vos = this._scrollView.getVos();
        for (var _i = 0, vos_1 = vos; _i < vos_1.length; _i++) {
            var vo = vos_1[_i];
            vo.destory();
        }
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        if (this._uiDisplay) {
            this._uiDisplay.play.removeEventListener('complete', this.onTweenGroupComplete, this);
            this._btnStartGame.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartButtonClick, this);
            this._uiDisplay.makeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.bagBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.emailBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.exchangeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.taskBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.aquariumBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.bankruptBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.roleAvaGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.shopBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.signinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.monthBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.activityBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.vipLotteryBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.vipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.btnAddGold.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.btnAddGem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.btnAddTicket.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.rankGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
            this._uiDisplay.settingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.guanzhuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        this.parent && this.parent.removeChild(this);
    };
    return FishMainView;
}(burn.view.FullView));
FishMainView._isOpenWanbaUI = false;
__reflect(FishMainView.prototype, "FishMainView");
/***操作UI的对应类 */
var MainViewUI = (function (_super) {
    __extends(MainViewUI, _super);
    function MainViewUI() {
        return _super.call(this) || this;
    }
    return MainViewUI;
}(eui.Component));
__reflect(MainViewUI.prototype, "MainViewUI");
//# sourceMappingURL=FishMainView.js.map