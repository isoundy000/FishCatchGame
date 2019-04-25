var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoomUI = (function (_super) {
    __extends(RoomUI, _super);
    function RoomUI(clazz) {
        var _this = _super.call(this) || this;
        /** 加载错误次数 */
        _this.loadErrorCount = 0;
        /** 黄金弹头 */
        _this.goldBulletBtn = null;
        /** 白银弹头 */
        _this.silverBulletBtn = null;
        /** 青铜弹头 */
        _this.bronzeBulletBtn = null;
        /** 核弹头 */
        _this.nuclearBulletBtn = null;
        //已经打开过界面
        _this._bOpenSignView = false;
        _this._bOpenSignView = false;
        _this.skinName = clazz;
        _this.anchorOffsetX = CONFIG.contentWidth / 2;
        _this.anchorOffsetY = 740 / 2;
        _this.x = egret.MainContext.instance.stage.stageWidth / 2;
        _this.y = egret.MainContext.instance.stage.stageHeight / 2;
        //添加按钮特效
        var ef_button = new egret.Bitmap(RES.getRes("ef_rotation_bg_png"));
        burn.tools.TweenTools.rotation(ef_button, 10000);
        ef_button.anchorOffsetX = ef_button.width / 2;
        ef_button.anchorOffsetY = ef_button.height / 2;
        _this.effect_Arena.addChild(ef_button);
        var ef_button1 = new egret.Bitmap(RES.getRes("ef_rotation_bg_png"));
        burn.tools.TweenTools.rotation(ef_button1, 10000);
        ef_button1.anchorOffsetX = ef_button1.width / 2;
        ef_button1.anchorOffsetY = ef_button1.height / 2;
        _this.effect_Gold.addChild(ef_button1);
        _this.btnWrapList = new Array();
        //默认炮台隐藏
        _this.setGunVisableByPos(RoomPosEnum.GUN_POS_0, false);
        _this.setGunVisableByPos(RoomPosEnum.GUN_POS_1, false);
        _this.setGunVisableByPos(RoomPosEnum.GUN_POS_2, false);
        _this.setGunVisableByPos(RoomPosEnum.GUN_POS_3, false);
        //修改炮台位置
        _this.reviseGun();
        //倍率调整
        _this.addRateBtn_0.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.modifRate, _this);
        _this.addRateBtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.modifRate, _this);
        _this.reduceRateBtn_0.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.modifRate, _this);
        _this.reduceRateBtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.modifRate, _this);
        //退出房间
        _this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.exitRoom, _this);
        // 背景音乐
        _this.bgMusicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.bgMusic, _this);
        // 音效按钮
        _this.soundEffectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.soundEffect, _this);
        _this.sound_off.visible = !game.util.SoundManager.getSoundEffectState();
        _this.music_off.visible = !game.util.SoundManager.getBackgroundMusicState();
        //奖金鱼抽奖按钮默认隐藏，等待资源加载结束后显示
        _this.lotteryBtn.visible = false;
        _this.lotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.openLotteryGroup, _this);
        _this.lotteryGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.openLotteryView, _this);
        _this.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.openShopView, _this);
        _this.getCoinsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.getCoins, _this);
        _this.exchangeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.exchange, _this);
        _this.trumpetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.trumpet, _this);
        //为按钮增加按下状态
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.trumpetBtn));
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.lotteryBtn));
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.unlockBtn));
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.exchangeBtn));
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.getCoinsBtn));
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.backBtn));
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.bgMusicBtn));
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.soundEffectBtn));
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.shopBtn));
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.fishkindBtn));
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.addRateBtn_0));
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.addRateBtn_1));
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.reduceRateBtn_0));
        _this.btnWrapList.push(new burn.tools.UIWrap(_this.reduceRateBtn_1));
        //添加炮倍的美术字
        _this.initRateLab();
        //开始加载抽奖UI
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, _this.onResourceLoadComplete, _this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, _this.onResourceLoadError, _this);
        RES.loadGroup("lottery");
        //加载侧边道具栏
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/SideProp.exml", _this.loadSideProp, _this);
        //加载冰冻和锁定UI
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/FrozenAndLock.exml", _this.frozenAndLock, _this);
        //加载解锁炮倍UI
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/UnlockGunGroup.exml", _this.unlockGunUpdate, _this);
        //加载炮台资源
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Gun.exml", _this.gunTemp, _this);
        //加载War资源
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/WarGroup.exml", _this.warLoaded, _this);
        //加载chakanUI资源
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/ChakanPanel.exml", _this.chakanLoaded, _this);
        _this.setExchange();
        var userModel = burn.Director.getModelByKey(UserModel);
        var gunRate = userModel.getCurGunID();
        var gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
        //判断有没有下一个炮倍
        if (gunRateVo) {
            var arr = gunRateVo.upgradeOrForgeCost;
            var arrData = arr.split(",");
            if (arrData.length > 1) {
                _this.setHideUnlock();
            }
        }
        if (!CONFIG.openGuide) {
            _this.addGuideTask();
            return _this;
        }
        var guideOver = game.table.T_Config_Table.getVoByKey(49).value;
        var curID = userModel.getGuideID();
        var strOver = guideOver.split(",");
        for (var i = 0; i < strOver.length; i++) {
            if (curID >= Number(strOver[i])) {
                _this.addGuideTask();
                return _this;
            }
        }
        var unLock = game.table.T_Config_Table.getVoByKey(46).value;
        var strUnlock = unLock.split(",");
        for (var i = 0; i < strUnlock.length; i++) {
            var param = strUnlock[i].split("_");
            if (curID >= Number(param[0]) && curID <= Number(param[1])) {
                _this.unlockGunGroup.visible = false;
            }
        }
        var unLottery = game.table.T_Config_Table.getVoByKey(50).value;
        var strUnLottery = unLottery.split(",");
        for (var i = 0; i < strUnLottery.length; i++) {
            var param1 = strUnLottery[i].split("_");
            if (curID >= Number(param1[0]) && curID <= Number(param1[1])) {
                _this.lotteryGroup.visible = false;
            }
        }
        var guideTaskHide = game.table.T_Config_Table.getVoByKey(48).value;
        var strGuideTaskHide = guideTaskHide.split(",");
        for (var i = 0; i < strGuideTaskHide.length; i++) {
            var param2 = strGuideTaskHide[i].split("_");
            if (curID >= Number(param2[0]) && curID <= Number(param2[1])) {
                _this.addGuideTask();
            }
        }
        return _this;
    }
    RoomUI.prototype.addGuideTask = function () {
        //加载GuideTask
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/task/TaskGuide.exml", this.guideTaskLoaded, this);
        game.util.Guide.isOpentask = true;
    };
    RoomUI.prototype.guideTaskLoaded = function (clazz, url) {
        var taskModel = burn.Director.getModelByKey(TaskModel);
        var task = taskModel.getTaskListByType(TaskType.TASK_TYPE_NEWBIE);
        var taskPrice = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
        if (taskPrice.length > 0) {
            return;
        }
        this._guideTaskUI = new GuideTaskUI();
        this._guideTaskUI.anchorOffsetX = this._guideTaskUI.width / 2;
        this._guideTaskUI.anchorOffsetY = 0;
        this.guideTaskGroup.addChild(this._guideTaskUI);
        //this.guideTaskGroup.visible = false;
        burn._Notification_.send(NotifyEnum.TASK_GUIDE_PANEL_LOADED);
    };
    RoomUI.prototype.chakanLoaded = function (clazz, url) {
        this.chakanUI = new ChakanPanelUI();
        this.chakanUI.anchorOffsetX = this.chakanUI.width / 2;
        this.chakanUI.anchorOffsetY = this.chakanUI.height;
        this.chakanUI.x = -500;
        this.chakanUI.y = -500;
        this.addChild(this.chakanUI);
        this.bShowChakan = false;
    };
    //加载炮台资源
    RoomUI.prototype.warLoaded = function (clazz, url) {
        this.warUI = new WarView();
        this.warUI.anchorOffsetX = this.warUI.width;
        this.warUI.anchorOffsetY = this.warUI.height / 2;
        this.warGroupPos.addChild(this.warUI);
        //this.warUI.cacheAsBitmap = true;
        /** 黄金弹头 */
        this.goldGroup = this.warUI.goldBulletGroup;
        /** 白银弹头 */
        this.silverGroup = this.warUI.silverBulletGroup;
        /** 青铜弹头 */
        this.bronzeGroup = this.warUI.bronzeBulletGroup;
        /** 核弹头 */
        this.nuclearGroup = this.warUI.nuclearBulletGroup;
        this.warUI.closeWarGroupBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseWarHead, this);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/newProgressButton.exml", this.loadedButton, this);
    };
    RoomUI.prototype.loadedButton = function (clazz, url) {
        this.goldBulletBtn = new NewProgresButton(clazz, "goldWarBtn");
        this.goldBulletBtn.setButtonClickFun(function () {
            burn._Notification_.send(NotifyEnum.USE_WARHEAD, PropEnum.GOLD_WARHEAD);
        });
        var w_vo = game.table.T_Config_Table.getVoByKey(86);
        var w_time = 20;
        if (w_vo) {
            w_time = Number(w_vo.value);
        }
        this.goldBulletBtn.setIcon("goldWarBtn_png");
        this.goldBulletBtn.setTypeWar();
        this.goldBulletBtn.setTimeTotal(w_time);
        var goldVo = game.table.T_Item_Table.getVoByKey(PropEnum.GOLD_WARHEAD);
        var str = goldVo.worth.split('_')[2];
        this.goldBulletBtn.setGemCost(str);
        this.goldBulletBtn.anchorOffsetX = this.goldBulletBtn.width / 2;
        this.goldBulletBtn.anchorOffsetY = this.goldBulletBtn.height / 2;
        this.goldGroup.addChild(this.goldBulletBtn);
        this.silverBulletBtn = new NewProgresButton(clazz, "silverWarBtn");
        this.silverBulletBtn.setButtonClickFun(function () {
            burn._Notification_.send(NotifyEnum.USE_WARHEAD, PropEnum.SILVER_WARHEAD);
        });
        this.silverBulletBtn.setIcon("silverWarBtn_png");
        this.silverBulletBtn.setTypeWar();
        this.silverBulletBtn.setTimeTotal(w_time);
        var silverVo = game.table.T_Item_Table.getVoByKey(PropEnum.SILVER_WARHEAD);
        var str1 = silverVo.worth.split('_')[2];
        this.silverBulletBtn.setGemCost(str1);
        this.silverBulletBtn.anchorOffsetX = this.silverBulletBtn.width / 2;
        this.silverBulletBtn.anchorOffsetY = this.silverBulletBtn.height / 2;
        this.silverGroup.addChild(this.silverBulletBtn);
        this.bronzeBulletBtn = new NewProgresButton(clazz, "tongWarBtn");
        this.bronzeBulletBtn.setButtonClickFun(function () {
            burn._Notification_.send(NotifyEnum.USE_WARHEAD, PropEnum.BRONZE_WARHEAD);
        });
        this.bronzeBulletBtn.setIcon("tongWarBtn_png");
        this.bronzeBulletBtn.setTypeWar();
        this.bronzeBulletBtn.setTimeTotal(w_time);
        var bronzeVo = game.table.T_Item_Table.getVoByKey(PropEnum.BRONZE_WARHEAD);
        var str2 = bronzeVo.worth.split('_')[2];
        this.bronzeBulletBtn.setGemCost(str2);
        this.bronzeBulletBtn.anchorOffsetX = this.bronzeBulletBtn.width / 2;
        this.bronzeBulletBtn.anchorOffsetY = this.bronzeBulletBtn.height / 2;
        this.bronzeGroup.addChild(this.bronzeBulletBtn);
        this.nuclearBulletBtn = new NewProgresButton(clazz, "tongWarBtn");
        this.nuclearBulletBtn.setButtonClickFun(function () {
            burn._Notification_.send(NotifyEnum.USE_WARHEAD, PropEnum.NUCLEAR_WARHEAD);
        });
        this.nuclearBulletBtn.setIcon("tongWarBtn_png");
        this.nuclearBulletBtn.setTypeWar();
        this.nuclearBulletBtn.setTimeTotal(w_time);
        //83
        var minVipLv = game.table.T_Config_Table.getVoByKey(83).value;
        var userModel = burn.Director.getModelByKey(UserModel);
        if (userModel.getVipLevel() < Number(minVipLv)) {
            this.nuclearBulletBtn.lockedImg.visible = true;
        }
        else {
            this.nuclearBulletBtn.lockedImg.visible = false;
        }
        var nuclearVo = game.table.T_Item_Table.getVoByKey(PropEnum.NUCLEAR_WARHEAD);
        var str3 = nuclearVo.worth.split('_')[2];
        this.nuclearBulletBtn.setGemCost(str3);
        this.nuclearBulletBtn.anchorOffsetX = this.nuclearBulletBtn.width / 2;
        this.nuclearBulletBtn.anchorOffsetY = this.nuclearBulletBtn.height / 2;
        this.nuclearGroup.addChild(this.nuclearBulletBtn);
        var goldItem = userModel.getItemById(PropEnum.GOLD_WARHEAD);
        var silverItem = userModel.getItemById(PropEnum.SILVER_WARHEAD);
        var bronzeItem = userModel.getItemById(PropEnum.BRONZE_WARHEAD);
        var nucleareItem = userModel.getItemById(PropEnum.NUCLEAR_WARHEAD);
        var goldNum = 0;
        var silverNum = 0;
        var bronzeNum = 0;
        var nucleareNum = 0;
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
        this.goldBulletBtn.setNum(String(goldNum));
        this.silverBulletBtn.setNum(String(silverNum));
        this.bronzeBulletBtn.setNum(String(bronzeNum));
        this.nuclearBulletBtn.setNum(String(nucleareNum));
    };
    RoomUI.prototype.initRateLab = function () {
        this.rageLab_num_0 = new egret.BitmapText();
        this.rageLab_num_0.font = RES.getRes("bitmapNum_3_fnt");
        this.rageLab_num_0.text = String("1");
        this.rateLab_0.addChild(this.rageLab_num_0);
        this.rageLab_num_0.textAlign = egret.HorizontalAlign.CENTER;
        this.rageLab_num_0.anchorOffsetX = this.rageLab_num_0.width / 2;
        this.rageLab_num_0.anchorOffsetY = this.rageLab_num_0.height / 2;
        this.rageLab_num_1 = new egret.BitmapText();
        this.rageLab_num_1.font = RES.getRes("bitmapNum_3_fnt");
        this.rageLab_num_1.text = String("1");
        this.rateLab_1.addChild(this.rageLab_num_1);
        this.rageLab_num_1.textAlign = egret.HorizontalAlign.CENTER;
        this.rageLab_num_1.anchorOffsetX = this.rageLab_num_1.width / 2;
        this.rageLab_num_1.anchorOffsetY = this.rageLab_num_1.height / 2;
        this.rageLab_num_2 = new egret.BitmapText();
        this.rageLab_num_2.font = RES.getRes("bitmapNum_3_fnt");
        this.rageLab_num_2.text = String("1");
        this.rateLab_2.addChild(this.rageLab_num_2);
        this.rageLab_num_2.textAlign = egret.HorizontalAlign.CENTER;
        this.rageLab_num_2.anchorOffsetX = this.rageLab_num_2.width / 2;
        this.rageLab_num_2.anchorOffsetY = this.rageLab_num_2.height / 2;
        this.rageLab_num_3 = new egret.BitmapText();
        this.rageLab_num_3.font = RES.getRes("bitmapNum_3_fnt");
        this.rageLab_num_3.text = String("1");
        this.rateLab_3.addChild(this.rageLab_num_3);
        this.rageLab_num_3.textAlign = egret.HorizontalAlign.CENTER;
        this.rageLab_num_3.anchorOffsetX = this.rageLab_num_3.width / 2;
        this.rageLab_num_3.anchorOffsetY = this.rageLab_num_3.height / 2;
        this.goldLab_num_0 = new egret.BitmapText();
        this.goldLab_num_0.font = RES.getRes("bitmapNum_4_fnt");
        this.goldLab_num_0.text = String("1");
        this.goldLab_0.addChild(this.goldLab_num_0);
        this.goldLab_num_0.textAlign = egret.HorizontalAlign.CENTER;
        this.goldLab_num_0.anchorOffsetX = this.goldLab_num_0.width / 2;
        this.goldLab_num_0.anchorOffsetY = this.goldLab_num_0.height / 2;
        this.gemLab_num_0 = new egret.BitmapText();
        this.gemLab_num_0.font = RES.getRes("bitmapNum_4_fnt");
        this.gemLab_num_0.text = String("1");
        this.gemLab_0.addChild(this.gemLab_num_0);
        this.gemLab_num_0.textAlign = egret.HorizontalAlign.CENTER;
        this.gemLab_num_0.anchorOffsetX = this.gemLab_num_0.width / 2;
        this.gemLab_num_0.anchorOffsetY = this.gemLab_num_0.height / 2;
        /////////////////////////////////pos1////////////////////////////////////
        this.goldLab_num_1 = new egret.BitmapText();
        this.goldLab_num_1.font = RES.getRes("bitmapNum_4_fnt");
        this.goldLab_num_1.text = String("1");
        this.goldLab_1.addChild(this.goldLab_num_1);
        this.goldLab_num_1.textAlign = egret.HorizontalAlign.CENTER;
        this.goldLab_num_1.anchorOffsetX = this.goldLab_num_1.width / 2;
        this.goldLab_num_1.anchorOffsetY = this.goldLab_num_1.height / 2;
        this.gemLab_num_1 = new egret.BitmapText();
        this.gemLab_num_1.font = RES.getRes("bitmapNum_4_fnt");
        this.gemLab_num_1.text = String("1");
        this.gemLab_1.addChild(this.gemLab_num_1);
        this.gemLab_num_1.textAlign = egret.HorizontalAlign.CENTER;
        this.gemLab_num_1.anchorOffsetX = this.gemLab_num_1.width / 2;
        this.gemLab_num_1.anchorOffsetY = this.gemLab_num_1.height / 2;
        /////////////////////////////////pos2////////////////////////////////////
        this.goldLab_num_2 = new egret.BitmapText();
        this.goldLab_num_2.font = RES.getRes("bitmapNum_4_fnt");
        this.goldLab_num_2.text = String("2");
        this.goldLab_2.addChild(this.goldLab_num_2);
        this.goldLab_num_2.textAlign = egret.HorizontalAlign.CENTER;
        this.goldLab_num_2.anchorOffsetX = this.goldLab_num_2.width / 2;
        this.goldLab_num_2.anchorOffsetY = this.goldLab_num_2.height / 2;
        this.gemLab_num_2 = new egret.BitmapText();
        this.gemLab_num_2.font = RES.getRes("bitmapNum_4_fnt");
        this.gemLab_num_2.text = String("1");
        this.gemLab_2.addChild(this.gemLab_num_2);
        this.gemLab_num_2.textAlign = egret.HorizontalAlign.CENTER;
        this.gemLab_num_2.anchorOffsetX = this.gemLab_num_2.width / 2;
        this.gemLab_num_2.anchorOffsetY = this.gemLab_num_2.height / 2;
        /////////////////////////////////pos3////////////////////////////////////
        this.goldLab_num_3 = new egret.BitmapText();
        this.goldLab_num_3.font = RES.getRes("bitmapNum_4_fnt");
        this.goldLab_num_3.text = String("3");
        this.goldLab_3.addChild(this.goldLab_num_3);
        this.goldLab_num_3.textAlign = egret.HorizontalAlign.CENTER;
        this.goldLab_num_3.anchorOffsetX = this.goldLab_num_3.width / 2;
        this.goldLab_num_3.anchorOffsetY = this.goldLab_num_3.height / 2;
        this.gemLab_num_3 = new egret.BitmapText();
        this.gemLab_num_3.font = RES.getRes("bitmapNum_4_fnt");
        this.gemLab_num_3.text = String("1");
        this.gemLab_3.addChild(this.gemLab_num_3);
        this.gemLab_num_3.textAlign = egret.HorizontalAlign.CENTER;
        this.gemLab_num_3.anchorOffsetX = this.gemLab_num_3.width / 2;
        this.gemLab_num_3.anchorOffsetY = this.gemLab_num_3.height / 2;
        //抽奖小面板 击杀奖金鱼数量
        //抽奖小面板 奖金数量
        //public bounsGroup:eui.Group;
        //抽奖小面板 击杀奖金鱼数量
        this.fishCountTxt = new egret.BitmapText();
        this.fishCountTxt.font = RES.getRes("bitmapNum_4_fnt");
        this.fishCountTxt.text = String("1");
        this.fishCountGroup.addChild(this.fishCountTxt);
        this.fishCountTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.fishCountTxt.anchorOffsetX = this.fishCountTxt.width / 2;
        this.fishCountTxt.anchorOffsetY = this.fishCountTxt.height / 2;
        this.bounsTxt = new egret.BitmapText();
        this.bounsTxt.font = RES.getRes("bitmapNum_4_fnt");
        this.bounsTxt.text = String("1");
        this.bounsGroup.addChild(this.bounsTxt);
        this.bounsTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.bounsTxt.anchorOffsetX = this.bounsTxt.width / 2;
        this.bounsTxt.anchorOffsetY = this.bounsTxt.height / 2;
        //抽奖小面板 奖金数量
        //public bounsTxt:eui.Label;
        var scaleParam = 1.1;
        this.goldLab_0.scaleX = scaleParam;
        this.goldLab_0.scaleY = scaleParam;
        this.goldLab_1.scaleX = scaleParam;
        this.goldLab_1.scaleY = scaleParam;
        this.goldLab_2.scaleX = scaleParam;
        this.goldLab_2.scaleY = scaleParam;
        this.goldLab_3.scaleX = scaleParam;
        this.goldLab_3.scaleY = scaleParam;
        this.gemLab_0.scaleX = scaleParam;
        this.gemLab_0.scaleY = scaleParam;
        this.gemLab_1.scaleX = scaleParam;
        this.gemLab_1.scaleY = scaleParam;
        this.gemLab_2.scaleX = scaleParam;
        this.gemLab_2.scaleY = scaleParam;
        this.gemLab_3.scaleX = scaleParam;
        this.gemLab_3.scaleY = scaleParam;
    };
    //加载炮台资源
    RoomUI.prototype.gunTemp = function (clazz, url) {
        var model = burn.Director.getModelByKey(UserModel);
        this.gunList = new Array();
        ///groupGun_0
        this.gunList_0 = new GunTempleUI(clazz);
        this.gunList_0.anchorOffsetX = this.gunList_0.width / 2;
        this.gunList_0.anchorOffsetY = this.gunList_0.height;
        this.gunList_0.setRoomerPos(0);
        this.groupGun_0.addChild(this.gunList_0);
        this.gunList.push(this.gunList_0);
        ///groupGun_1
        this.gunList_1 = new GunTempleUI(clazz);
        this.gunList_1.anchorOffsetX = this.gunList_1.width / 2;
        this.gunList_1.anchorOffsetY = this.gunList_1.height;
        this.gunList_1.setRoomerPos(1);
        this.groupGun_1.addChild(this.gunList_1);
        this.gunList.push(this.gunList_1);
        ///groupGun_2
        this.gunList_2 = new GunTempleUI(clazz);
        this.gunList_2.anchorOffsetX = this.gunList_2.width / 2;
        this.gunList_2.anchorOffsetY = 0;
        this.gunList_2.setRoomerPos(2);
        this.groupGun_2.addChild(this.gunList_2);
        this.groupGun_2.rotation = 180;
        this.gunList.push(this.gunList_2);
        ///groupGun_3
        this.gunList_3 = new GunTempleUI(clazz);
        this.gunList_3.anchorOffsetX = this.gunList_3.width / 2;
        this.gunList_3.anchorOffsetY = 0;
        this.gunList_3.setRoomerPos(3);
        this.groupGun_3.addChild(this.gunList_3);
        this.groupGun_3.rotation = 180;
        this.gunList.push(this.gunList_3);
        //分身炮
        this.avatarGunList = new Array();
        var avaGunList1 = new Array();
        //第一组分身炮
        this.gun_0_1 = new GunTempleUI(clazz);
        this.gun_0_1.anchorOffsetX = this.gun_0_1.width / 2;
        this.gun_0_1.anchorOffsetY = this.gun_0_1.height;
        this.gun_0_1.setRoomerPos(0);
        this.groupGun_0_1.addChild(this.gun_0_1);
        avaGunList1.push(this.gun_0_1);
        this.gun_0_2 = new GunTempleUI(clazz);
        this.gun_0_2.anchorOffsetX = this.gun_0_2.width / 2;
        this.gun_0_2.anchorOffsetY = this.gun_0_2.height;
        this.gun_0_2.setRoomerPos(0);
        this.groupGun_0_2.addChild(this.gun_0_2);
        avaGunList1.push(this.gun_0_2);
        this.gun_0_3 = new GunTempleUI(clazz);
        this.gun_0_3.anchorOffsetX = this.gun_0_3.width / 2;
        this.gun_0_3.anchorOffsetY = this.gun_0_3.height;
        this.gun_0_3.setRoomerPos(0);
        this.groupGun_0_3.addChild(this.gun_0_3);
        avaGunList1.push(this.gun_0_3);
        this.gun_0_1.visible = false;
        this.gun_0_2.visible = false;
        this.gun_0_3.visible = false;
        this.avatarGunList.push(avaGunList1);
        //位置2的分身炮
        var avaGunList2 = new Array();
        //第一组分身炮
        this.gun_1_1 = new GunTempleUI(clazz);
        this.gun_1_1.anchorOffsetX = this.gun_1_1.width / 2;
        this.gun_1_1.anchorOffsetY = this.gun_1_1.height;
        this.groupGun_1_1.addChild(this.gun_1_1);
        avaGunList2.push(this.gun_1_1);
        this.gun_1_2 = new GunTempleUI(clazz);
        this.gun_1_2.anchorOffsetX = this.gun_1_2.width / 2;
        this.gun_1_2.anchorOffsetY = this.gun_1_2.height;
        this.groupGun_1_2.addChild(this.gun_1_2);
        avaGunList2.push(this.gun_1_2);
        this.gun_1_3 = new GunTempleUI(clazz);
        this.gun_1_3.anchorOffsetX = this.gun_1_3.width / 2;
        this.gun_1_3.anchorOffsetY = this.gun_1_3.height;
        this.groupGun_1_3.addChild(this.gun_1_3);
        avaGunList2.push(this.gun_1_3);
        this.gun_1_1.visible = false;
        this.gun_1_2.visible = false;
        this.gun_1_3.visible = false;
        this.gun_1_1.setRoomerPos(1);
        this.gun_1_2.setRoomerPos(1);
        this.gun_1_3.setRoomerPos(1);
        this.avatarGunList.push(avaGunList2);
        //位置3的分身炮
        var avaGunList3 = new Array();
        //第一组分身炮
        this.gun_2_1 = new GunTempleUI(clazz);
        this.gun_2_1.anchorOffsetX = this.gun_2_1.width / 2;
        this.gun_2_1.anchorOffsetY = 0;
        this.groupGun_2_1.addChild(this.gun_2_1);
        this.groupGun_2_1.rotation = 180;
        avaGunList3.push(this.gun_2_1);
        this.gun_2_2 = new GunTempleUI(clazz);
        this.gun_2_2.anchorOffsetX = this.gun_2_2.width / 2;
        this.gun_2_2.anchorOffsetY = 0;
        this.groupGun_2_2.addChild(this.gun_2_2);
        this.groupGun_2_2.rotation = 180;
        avaGunList3.push(this.gun_2_2);
        this.gun_2_3 = new GunTempleUI(clazz);
        this.gun_2_3.anchorOffsetX = this.gun_2_3.width / 2;
        this.gun_2_3.anchorOffsetY = 0;
        this.groupGun_2_3.addChild(this.gun_2_3);
        this.groupGun_2_3.rotation = 180;
        avaGunList3.push(this.gun_2_3);
        this.gun_2_1.visible = false;
        this.gun_2_2.visible = false;
        this.gun_2_3.visible = false;
        this.gun_2_1.setRoomerPos(2);
        this.gun_2_2.setRoomerPos(2);
        this.gun_2_3.setRoomerPos(2);
        this.avatarGunList.push(avaGunList3);
        //位置4的分身炮
        var avaGunList4 = new Array();
        //第一组分身炮
        this.gun_3_1 = new GunTempleUI(clazz);
        this.gun_3_1.anchorOffsetX = this.gun_3_1.width / 2;
        this.gun_3_1.anchorOffsetY = 0;
        this.groupGun_3_1.addChild(this.gun_3_1);
        this.groupGun_3_1.rotation = 180;
        avaGunList4.push(this.gun_3_1);
        this.gun_3_2 = new GunTempleUI(clazz);
        this.gun_3_2.anchorOffsetX = this.gun_3_2.width / 2;
        this.gun_3_2.anchorOffsetY = 0;
        this.groupGun_3_2.addChild(this.gun_3_2);
        this.groupGun_3_2.rotation = 180;
        avaGunList4.push(this.gun_3_2);
        this.gun_3_3 = new GunTempleUI(clazz);
        this.gun_3_3.anchorOffsetX = this.gun_3_3.width / 2;
        this.gun_3_3.anchorOffsetY = 0;
        this.groupGun_3_3.addChild(this.gun_3_3);
        this.groupGun_3_3.rotation = 180;
        avaGunList4.push(this.gun_3_3);
        this.gun_3_1.visible = false;
        this.gun_3_2.visible = false;
        this.gun_3_3.visible = false;
        this.gun_3_1.setRoomerPos(3);
        this.gun_3_2.setRoomerPos(3);
        this.gun_3_3.setRoomerPos(3);
        this.avatarGunList.push(avaGunList4);
        this.zuoList = new Array();
        this.zuoList.push(this.zuoGroup_0);
        this.zuoList.push(this.zuoGroup_1);
        this.zuoList.push(this.zuoGroup_2);
        this.zuoList.push(this.zuoGroup_3);
        burn._Notification_.send(NotifyEnum.ROOM_UI_INIT_END);
    };
    //冰冻和锁定ui加载结束
    RoomUI.prototype.frozenAndLock = function (clazz, url) {
        this._frozenAndLockUI = new FrozenAndLockUI(clazz);
        this._frozenAndLockUI.x = 480;
        this._frozenAndLockUI.y = 580;
        this.addChild(this._frozenAndLockUI);
        // this._frozenAndLockUI.cacheAsBitmap = true;
        burn._Notification_.send(NotifyEnum.SET_PROP_NUM);
    };
    //炮倍解锁的UI
    RoomUI.prototype.unlockGunUpdate = function (clazz, url) {
        this._unlockGunUpdateUI = new UnlockGunUpdateUI(clazz);
        this._unlockGunUpdateUI.x = -400;
        this._unlockGunUpdateUI.y = 0;
        this.unlockGunGroup.addChild(this._unlockGunUpdateUI);
        burn._Notification_.send(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED);
    };
    //侧边道具栏
    RoomUI.prototype.loadSideProp = function (clazz, url) {
        this._sidePropUI = new SidePropUI(clazz);
        this._sidePropUI.x = 1176;
        this._sidePropUI.y = 214;
        this.addChild(this._sidePropUI);
        //this._sidePropUI.cacheAsBitmap = true;
        burn._Notification_.send(NotifyEnum.SET_PROP_NUM);
    };
    //兑换板子
    RoomUI.prototype.setExchange = function () {
        this.exchangeGroup.x = -400;
        this.txtExchangeNum = new egret.BitmapText();
        this.txtExchangeNum.font = RES.getRes("bitmapNum_4_fnt");
        this.txtExchangeNum.text = String("1");
        this.exchangeNum.addChild(this.txtExchangeNum);
        this.txtExchangeNum.textAlign = egret.HorizontalAlign.CENTER;
        this.txtExchangeNum.anchorOffsetX = this.txtExchangeNum.width / 2;
        this.txtExchangeNum.anchorOffsetY = this.txtExchangeNum.height / 2;
        this._bIsShowExchange = false;
        this.exchangeName.text = "";
    };
    RoomUI.prototype.updateShowExchangeBan = function (cur, max) {
        this.txtExchangeNum.text = (cur / 10 + "元") + "/" + (max / 10 + "元");
    };
    //弹出兑换板
    RoomUI.prototype.showExchangeBan = function (name, cur, max) {
        this.txtExchangeNum.text = (cur / 10 + "元") + "/" + (max / 10 + "元");
        this.txtExchangeNum.textAlign = egret.HorizontalAlign.CENTER;
        this.txtExchangeNum.anchorOffsetX = this.txtExchangeNum.width / 2;
        this.txtExchangeNum.anchorOffsetY = this.txtExchangeNum.height / 2;
        this.exchangeName.text = name;
        var self = this;
        var lotteryObj = self.exchangeGroup;
        egret.Tween.removeTweens(lotteryObj);
        if (self._bIsShowExchange) {
            self._bIsShowExchange = false;
            var tw = egret.Tween.get(lotteryObj, { loop: false });
            tw.to({ scaleX: 0 }, 2000).call(function () {
                egret.Tween.removeTweens(lotteryObj);
                lotteryObj.x = -400;
                lotteryObj.scaleX = 1;
            });
        }
        else {
            lotteryObj.scaleX = 0;
            lotteryObj.x = 3;
            self._bIsShowExchange = true;
            var tw = egret.Tween.get(lotteryObj, { loop: false });
            tw.to({ scaleX: 1 }, 200).wait(4000).to({ scaleX: 0 }, 200).call(function () {
                egret.Tween.removeTweens(lotteryObj);
                self._bIsShowExchange = false;
                lotteryObj.x = -400;
                lotteryObj.scaleX = 1;
            });
        }
    };
    //UI资源加载完成
    RoomUI.prototype.addBgResource = function (clazz, url) {
        //显示抽奖按钮
        this.lotteryBtn.visible = true;
        this.lotteryGroup.scaleX = 1;
        this.lotteryGroup.x = -300;
        this._lotteryIsOpen = true;
        burn._Notification_.send(NotifyEnum.LOTTERY_UI_LOAD_END);
        this.unlockBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openGunUpdateGroup, this);
        //弹头横幅
        this.warHeadGroupIsClose = true;
        this.openWarHeadBtn.name = "openWarHeadBtn";
        this.openWarHeadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseWarHead, this);
        this.shrinkGroup.x = 1280;
        this.shrinkGroup.cacheAsBitmap = true;
        this._shrinkGroupIsOpen = false;
        this.shrinkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseShrink, this);
        this.shrinkBackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseShrink, this);
        //this.btnWrapList.push(new burn.tools.UIWrap(this.shrinkBtn));
        //加载鱼死亡音效
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        if (CONFIG.isOpenMusic) {
            RES.loadGroup("fish_sound");
        }
    };
    /** 显示您在此处 */
    RoomUI.prototype.showYourPos = function (pos) {
        var gunPos = this.getGunGroup(pos);
        var yourTips = new egret.Bitmap(RES.getRes("youAreHere_png"));
        this.addChild(yourTips);
        //gunPos.addChild(yourTips);
        yourTips.x = gunPos.x;
        yourTips.y = gunPos.y;
        yourTips.name = "yourTips";
        yourTips.anchorOffsetX = yourTips.width / 2;
        yourTips.anchorOffsetY = 180;
        yourTips.touchEnabled = false;
        burn.tools.TweenTools.shrink(yourTips, 0.05, 1500);
    };
    /** 隐藏您在此处的提示 */
    RoomUI.prototype.hideYourPos = function (pos) {
        var yourTips = this.getChildByName("yourTips");
        if (yourTips) {
            yourTips.parent && yourTips.parent.removeChild(yourTips);
        }
    };
    //打开或者关闭弹头横幅
    RoomUI.prototype.openAndCloseWarHead = function (evt) {
        if (evt.target instanceof eui.Button) {
        }
        else {
            return;
        }
        var self = this; //{x:self.warHeadGroup.x - 472} {x:self.warHeadGroup.x + 472} {scaleX:1}
        egret.Tween.removeTweens(self.warUI);
        var tw = egret.Tween.get(this.warUI, { loop: false });
        this.openWarHeadBtn.touchEnabled = false;
        this.goldBulletBtn.touchEnabled = false;
        this.silverBulletBtn.touchEnabled = false;
        this.bronzeBulletBtn.touchEnabled = false;
        this.nuclearBulletBtn.touchEnabled = false;
        if (this.warHeadGroupIsClose) {
            tw.to({ x: -348 }, 200).call(function () {
                self.warHeadGroupIsClose = false;
                self.warUI.touchEnabled = false;
                self.openWarHeadBtn.touchEnabled = true;
                self.goldBulletBtn.touchEnabled = true;
                self.silverBulletBtn.touchEnabled = true;
                self.bronzeBulletBtn.touchEnabled = true;
                self.nuclearBulletBtn.touchEnabled = true;
            });
            var arr = new Array();
            arr.push(self.goldGroup);
            arr.push(self.silverGroup);
            arr.push(self.bronzeGroup);
            arr.push(self.nuclearGroup);
            game.util.GameUtil.playWarAction(arr);
        }
        else {
            tw.to({ x: 0 }, 200).call(function () {
                egret.Tween.removeTweens(self.warUI);
                self.warHeadGroupIsClose = true;
                self.openWarHeadBtn.touchEnabled = true;
            });
        }
    };
    //打开或关闭功能菜单
    RoomUI.prototype.openAndCloseShrink = function (evt) {
        var self = this;
        egret.Tween.removeTweens(self.shrinkGroup);
        if (self._shrinkGroupIsOpen) {
            self.fishkindBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openFishKindsView, self);
            var tw = egret.Tween.get(this.shrinkGroup, { loop: false });
            tw.to({ x: 1280 }, 200).call(function () {
                egret.Tween.removeTweens(self.shrinkGroup);
                self._shrinkGroupIsOpen = false;
                self.shrinkBtn.visible = true;
            });
        }
        else {
            self._shrinkGroupIsOpen = true;
            self.shrinkBtn.visible = false;
            var arr = new Array();
            arr.push(self.fishkindBtn);
            arr.push(self.shopBtn);
            arr.push(self.soundEffectBtn);
            arr.push(self.bgMusicBtn);
            arr.push(self.backBtn);
            game.util.GameUtil.playWarAction(arr);
            self.fishkindBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openFishKindsView, self);
            var tw = egret.Tween.get(this.shrinkGroup, { loop: false });
            tw.to({ x: 800 }, 200).wait(7000).to({ x: 1280 }, 200).call(function () {
                egret.Tween.removeTweens(self.shrinkGroup);
                self._shrinkGroupIsOpen = false;
                self.shrinkBtn.visible = true;
            });
        }
    };
    RoomUI.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "lottery") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Lottery.exml", this.addBgResource, this);
            this.loadErrorCount = 0;
        }
        else if (event.groupName == "fish_sound") {
            game.util.SoundManager.fishSoundLoadEnd = true;
            RES.loadGroup("effect_sound");
        }
        else if (event.groupName == "effect_sound") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            game.util.SoundManager.effectSoundLoadEnd = true;
        }
    };
    RoomUI.prototype.onResourceLoadError = function (event) {
        this.loadErrorCount += 1;
        console.warn("Group:" + event.groupName + " has failed to load");
        //加载失败后尝试5次重新加载
        if (this.loadErrorCount < 5) {
            RES.loadGroup(event.groupName);
        }
    };
    //修改炮台位置
    RoomUI.prototype.reviseGun = function () {
    };
    //更新玩家金币数量显示
    RoomUI.prototype.updateRoomerCoins = function (pos, coins, isTween) {
        if (isTween === void 0) { isTween = false; }
        var lab = null;
        var parent = null;
        if (pos == RoomPosEnum.GUN_POS_0) {
            lab = this.goldLab_num_0;
            parent = this.gold_eff_0;
        }
        else if (pos == RoomPosEnum.GUN_POS_1) {
            lab = this.goldLab_num_1;
            parent = this.gold_eff_1;
        }
        else if (pos == RoomPosEnum.GUN_POS_2) {
            lab = this.goldLab_num_2;
            parent = this.gold_eff_2;
        }
        else if (pos == RoomPosEnum.GUN_POS_3) {
            lab = this.goldLab_num_3;
            parent = this.gold_eff_3;
        }
        if (isTween) {
            var twlab = egret.Tween.get(lab, { loop: false });
            twlab.to({ scaleX: 1.5, scaleY: 1.5 }, 200).call(function () {
                lab.text = "" + coins;
            }).to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
                egret.Tween.removeTweens(lab);
            });
            var ef_gold_1 = new egret.Bitmap(RES.getRes("ef_gold_png"));
            ef_gold_1.alpha = 0;
            ef_gold_1.anchorOffsetX = ef_gold_1.width / 2;
            ef_gold_1.anchorOffsetY = ef_gold_1.height / 2;
            var tw = egret.Tween.get(ef_gold_1, { loop: false });
            tw.to({ alpha: 1 }, 300).
                to({ alpha: 0 }, 300).call(function () {
                egret.Tween.removeTweens(ef_gold_1);
                parent.removeChild(ef_gold_1);
            });
            parent.addChild(ef_gold_1);
            lab.text = "" + coins;
            lab.anchorOffsetX = lab.width / 2;
            lab.anchorOffsetY = lab.height / 2;
        }
        else {
            lab.text = "" + coins;
            lab.anchorOffsetX = lab.width / 2;
            lab.anchorOffsetY = lab.height / 2;
        }
    };
    //更新玩家钻石数量显示
    RoomUI.prototype.updateRoomerMoney = function (pos, money) {
        if (pos == RoomPosEnum.GUN_POS_0) {
            this.gemLab_num_0.text = "" + money;
            this.gemLab_num_0.anchorOffsetX = this.gemLab_num_0.width / 2;
            this.gemLab_num_0.anchorOffsetY = this.gemLab_num_0.height / 2;
        }
        else if (pos == RoomPosEnum.GUN_POS_1) {
            this.gemLab_num_1.text = "" + money;
            this.gemLab_num_1.anchorOffsetX = this.gemLab_num_1.width / 2;
            this.gemLab_num_1.anchorOffsetY = this.gemLab_num_1.height / 2;
        }
        else if (pos == RoomPosEnum.GUN_POS_2) {
            this.gemLab_num_2.text = "" + money;
            this.gemLab_num_2.anchorOffsetX = this.gemLab_num_2.width / 2;
            this.gemLab_num_2.anchorOffsetY = this.gemLab_num_2.height / 2;
        }
        else if (pos == RoomPosEnum.GUN_POS_3) {
            this.gemLab_num_3.text = "" + money;
            this.gemLab_num_3.anchorOffsetX = this.gemLab_num_3.width / 2;
            this.gemLab_num_3.anchorOffsetY = this.gemLab_num_3.height / 2;
        }
    };
    //更新玩家炮台倍率显示
    RoomUI.prototype.updateGunRate = function (pos, rate, bClone) {
        if (bClone === void 0) { bClone = false; }
        if (pos == RoomPosEnum.GUN_POS_0) {
            //this.rateLab_0.text = rate.toString();
            this.rageLab_num_0.text = "" + rate;
            this.rageLab_num_0.anchorOffsetX = this.rageLab_num_0.width / 2;
            this.rageLab_num_0.anchorOffsetY = this.rageLab_num_0.height / 2;
            this.rageLab_num_0.x = 0;
            this.rageLab_num_0.y = 0;
        }
        else if (pos == RoomPosEnum.GUN_POS_1) {
            //this.rateLab_1.text = rate.toString();
            this.rageLab_num_1.text = "" + rate;
            this.rageLab_num_1.anchorOffsetX = this.rageLab_num_1.width / 2;
            this.rageLab_num_1.anchorOffsetY = this.rageLab_num_1.height / 2;
        }
        else if (pos == RoomPosEnum.GUN_POS_2) {
            //this.rateLab_2.text = rate.toString();
            this.rageLab_num_2.text = "" + rate;
            this.rageLab_num_2.anchorOffsetX = this.rageLab_num_2.width / 2;
            this.rageLab_num_2.anchorOffsetY = this.rageLab_num_2.height / 2;
        }
        else if (pos == RoomPosEnum.GUN_POS_3) {
            //this.rateLab_3.text = rate.toString();
            this.rageLab_num_3.text = "" + rate;
            this.rageLab_num_3.anchorOffsetX = this.rageLab_num_3.width / 2;
            this.rageLab_num_3.anchorOffsetY = this.rageLab_num_3.height / 2;
        }
        this.playAddGunRateEffect(pos, bClone);
    };
    /** 炮台更换皮肤 */
    RoomUI.prototype.changeGunSkin = function (roomer, isFlip) {
        var skinId = roomer.getCurSkinId();
        var pos = RoomUtil.getPosByFlip(roomer.getRoomPos(), isFlip);
        var skinBgId = roomer.getCurSkinBgId();
        if (this.gunList) {
            var gun = this.gunList[pos];
            if (gun) {
                gun.setGunImageAnchor(skinId);
                gun.setGunNorData(skinId);
            }
        }
        if (this.avatarGunList) {
            for (var i = 0; i < 3; i++) {
                var gun = this.avatarGunList[pos][i];
                if (gun) {
                    gun.setGunImageAnchor(skinId);
                    gun.setGunData(skinId);
                }
            }
        }
        //炮座this.zuoList
        if (skinBgId == 0) {
            var vo = game.table.T_Gun_skin_Table.getVoByKey(skinId);
            var zuoUrl = vo.zuoUrl;
            this.changeGunBgSkin(pos, zuoUrl);
        }
        else {
            this.changeGunBgSkin(pos, "gunBgsicon_" + skinBgId + "_png");
        }
    };
    /** 更换炮座皮肤 */
    RoomUI.prototype.changeGunBgSkin = function (pos, txtr) {
        if (this.zuoList) {
            var zuo_1 = this.zuoList[pos];
            if (zuo_1) {
                RES.getResAsync(txtr, function () {
                    var txture = RES.getRes(txtr);
                    var icon = new egret.Bitmap(txture);
                    if (icon) {
                        zuo_1.removeChildren();
                        if (pos > 1) {
                            icon.anchorOffsetX = icon.width / 2;
                            icon.anchorOffsetY = icon.height - 11;
                            icon.rotation = 180;
                        }
                        else {
                            icon.x = -90;
                            icon.y = -98;
                        }
                        zuo_1.addChild(icon);
                    }
                }, this);
            }
        }
    };
    /** 播放调整炮倍动画 */
    RoomUI.prototype.playAddGunRateEffect = function (pos, bClone) {
        if (bClone === void 0) { bClone = false; }
        var data = RES.getRes("addGunRate_json");
        var txtr = RES.getRes("addGunRate_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var addGunRate = new MovieFish(mcFactory.generateMovieClipData("addGunRate"), egret.Event.COMPLETE);
        addGunRate.initEvent();
        addGunRate.gotoAndPlay("play", 1);
        addGunRate.frameRate = 24;
        //TODO：坐标暂时固定写死，等O重构炮台修改。
        if (pos == RoomPosEnum.GUN_POS_0) {
            addGunRate.x = 224; //259;
            addGunRate.y = 554;
        }
        else if (pos == RoomPosEnum.GUN_POS_1) {
            addGunRate.x = 781;
            addGunRate.y = 554;
        }
        else if (pos == RoomPosEnum.GUN_POS_2) {
            addGunRate.x = 224;
            addGunRate.y = -100;
        }
        else if (pos == RoomPosEnum.GUN_POS_3) {
            addGunRate.x = 781;
            addGunRate.y = -100;
        }
        //放大1.25倍使用
        addGunRate.scaleX = addGunRate.scaleY = 1.25;
        this.addChild(addGunRate);
        if (!bClone) {
            if (this.gunList) {
                var gun = this.gunList[pos];
                if (gun) {
                    gun.playGunChangeEff();
                }
            }
        }
        else {
            if (this.avatarGunList) {
                for (var i = 0; i < 3; i++) {
                    var gun = this.avatarGunList[pos][i];
                    if (gun) {
                        gun.playGunChangeEff();
                    }
                }
            }
        }
    };
    //跟进炮台位置设置炮台隐藏和显示
    RoomUI.prototype.setGunVisableByPos = function (pos, vis) {
        switch (pos) {
            case RoomPosEnum.GUN_POS_0:
                //group隐藏
                this.groupGun_0.visible = vis;
                this.group_0.visible = vis;
                this.waiting_0.visible = !vis;
                if (!vis) {
                    burn.tools.TweenTools.showOutAndIn(this.waiting_0, 3000);
                }
                else {
                    this.cache_group_0.cacheAsBitmap = true;
                    burn.tools.TweenTools.clearTween(this.waiting_0);
                }
                break;
            case RoomPosEnum.GUN_POS_1:
                this.groupGun_1.visible = vis;
                this.group_1.visible = vis;
                this.waiting_1.visible = !vis;
                if (!vis) {
                    burn.tools.TweenTools.showOutAndIn(this.waiting_1, 3000);
                }
                else {
                    this.cache_group_1.cacheAsBitmap = true;
                    burn.tools.TweenTools.clearTween(this.waiting_1);
                }
                break;
            case RoomPosEnum.GUN_POS_2:
                this.groupGun_2.visible = vis;
                this.group_2.visible = vis;
                this.waiting_2.visible = !vis;
                if (!vis) {
                    burn.tools.TweenTools.showOutAndIn(this.waiting_2, 3000);
                }
                else {
                    this.cache_group_2.cacheAsBitmap = true;
                    burn.tools.TweenTools.clearTween(this.waiting_2);
                }
                break;
            case RoomPosEnum.GUN_POS_3:
                this.groupGun_3.visible = vis;
                this.group_3.visible = vis;
                this.waiting_3.visible = !vis;
                if (!vis) {
                    burn.tools.TweenTools.showOutAndIn(this.waiting_3, 3000);
                }
                else {
                    this.cache_group_3.cacheAsBitmap = true;
                    burn.tools.TweenTools.clearTween(this.waiting_3);
                }
                break;
        }
    };
    RoomUI.prototype.setGunState = function (pos, isAva, state, oldPos) {
        if (state === void 0) { state = 2; }
        //显示分身炮
        if (isAva) {
            this.gunList[pos].visible = false;
            var roomerModel = burn.Director.getModelByKey(RoomModel);
            var roomer = roomerModel.getRoomerByPos(oldPos);
            var vipLevel = roomer.getVipLevel();
            state = roomer.getGunNum();
            for (var i = 0; i < state; i++) {
                var item = this.avatarGunList[pos][i];
                item.visible = true;
            }
        }
        else {
            this.gunList[pos].visible = true;
            for (var i = 0; i < this.avatarGunList[pos].length; i++) {
                var item = this.avatarGunList[pos][i];
                item.visible = false;
            }
        }
    };
    //开炮
    RoomUI.prototype.gunfire = function (pos, r, isAva, nAvaPos) {
        if (isAva === void 0) { isAva = false; }
        if (nAvaPos === void 0) { nAvaPos = 0; }
        if (pos <= 1) {
            if (r > 90 && r < 270) {
                if (r > 90 && r < 180) {
                    r = 90;
                }
                if (r < 270 && r > 180) {
                    r = 270;
                }
            }
        }
        if (!isAva) {
            var gunListTemp = this.gunList;
            if (gunListTemp && gunListTemp[pos]) {
                var gun = gunListTemp[pos];
                if (pos > 1) {
                    gun.gunFireTw(r + 180);
                }
                else {
                    gun.gunFireTw(r);
                }
            }
        }
        else {
            if (this.avatarGunList && this.avatarGunList[pos]) {
                var gun = this.avatarGunList[pos][nAvaPos];
                if (pos > 1) {
                    gun.gunFireTw(r + 180);
                }
                else {
                    gun.gunFireTw(r);
                }
            }
        }
    };
    RoomUI.prototype.setGunRageEff = function (pos, bRage, isAva, nAvaPos) {
        if (isAva === void 0) { isAva = false; }
        if (nAvaPos === void 0) { nAvaPos = 0; }
        if (!isAva) {
            var gun = this.gunList[pos];
            gun.setRage(bRage);
        }
        else {
            var gun = this.avatarGunList[pos][nAvaPos];
            gun.setRage(bRage);
        }
    };
    //根据位置获取炮台
    RoomUI.prototype.getGunByPos = function (pos, isAva, nGUNIndex) {
        if (isAva === void 0) { isAva = false; }
        if (nGUNIndex === void 0) { nGUNIndex = 0; }
        if (!isAva) {
            if (this.gunList && this.gunList[pos]) {
                return this.gunList[pos].gunFirePos();
            }
            else {
                return RoomUtil.getGunPointByPos(pos, false);
            }
        }
        else {
            if (this.avatarGunList && this.avatarGunList[pos]) {
                return this.avatarGunList[pos][nGUNIndex].gunFirePos();
            }
            else {
                return RoomUtil.getGunPointByPos(pos, false);
            }
        }
    };
    /**打开鱼种界面 */
    RoomUI.prototype.openFishKindsView = function (evt) {
        if (!this._shrinkGroupIsOpen) {
            return;
        }
        var fishKindsView = new FishKindsView();
        var fishKindsMed = new FishKindsMediator(fishKindsView);
        burn.Director.pushView(fishKindsMed);
    };
    /** 修改倍率 */
    RoomUI.prototype.modifRate = function (evt) {
        if (evt.target == this.addRateBtn_0 || evt.target == this.addRateBtn_1) {
            burn._Notification_.send(NotifyEnum.RESET_RATE, "add");
        }
        else if (evt.target == this.reduceRateBtn_0 || evt.target == this.reduceRateBtn_1) {
            burn._Notification_.send(NotifyEnum.RESET_RATE, "reduce");
        }
    };
    /** 点击退出房间 */
    RoomUI.prototype.exitRoom = function (evt) {
        game.util.GameUtil.openConfirmByTwoButton(null, function () {
            game.util.UIUtil.startLoading();
            burn._Notification_.send(NotifyEnum.CLICK_EXIT_ROOM);
        }, this, game.util.Language.getText(78));
    };
    /** 背景音乐 */
    RoomUI.prototype.bgMusic = function (evt) {
        game.util.SoundManager.setBackgroundMusicState(!game.util.SoundManager.getBackgroundMusicState());
        this.music_off.visible = !game.util.SoundManager.getBackgroundMusicState();
    };
    /** 音效 */
    RoomUI.prototype.soundEffect = function (evt) {
        game.util.SoundManager.setSoundEffectState(!game.util.SoundManager.getSoundEffectState());
        this.sound_off.visible = !game.util.SoundManager.getSoundEffectState();
    };
    //设置解锁炮倍需要的
    RoomUI.prototype.setUpdateGunNum = function (gunId, value, max) {
        this._unlockGunUpdateUI.setUpdateGunNum(gunId, value, max);
    };
    /**打开解锁炮倍界面 */
    RoomUI.prototype.openGunUpdateGroup = function (evt) {
        var userModle = burn.Director.getModelByKey(UserModel);
        var userId = userModle.getUserId();
        var _roomModel = burn.Director.getModelByKey(RoomModel);
        var roomer = _roomModel.getRoomerById(userId);
        //最高ID
        var gunRate = roomer.getGunRate();
        var gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
        //判断有没有下一个炮倍
        if (gunRateVo) {
            var arr = gunRateVo.upgradeOrForgeCost;
            var arrData = arr.split(",");
            var bEnough = true;
            var nEnoughNum = 0;
            var nCurNum = 0;
            if (arrData.length > 1) {
                return;
            }
            this._unlockGunUpdateUI.openGunUpdateGroup();
        }
    };
    RoomUI.prototype.openGunUpdateGroupByEnough = function () {
        this._unlockGunUpdateUI.openGunUpdateGroupByEnough();
    };
    /** 打开抽奖界面 */
    RoomUI.prototype.openLotteryGroup = function (evt) {
        var self = this;
        if (evt == null) {
            if (self._lotteryIsOpen) {
                var lotteryModel = burn.Director.getModelByKey(LotteryModel);
                var lotteryVo = game.table.T_Lottery_Table.getVoByKey(1);
                var score = lotteryModel.getScore();
                var killNum = lotteryModel.getKillNum();
                var max = lotteryModel.getMaxKill(lotteryModel.getTodayCount());
                if (killNum >= max && score >= lotteryVo.integral) {
                    self._lotteryIsOpen = false;
                }
            }
        }
        var lotteryObj = self.lotteryGroup;
        egret.Tween.removeTweens(lotteryObj);
        if (self._lotteryIsOpen) {
            self._lotteryIsOpen = false;
            var tw = egret.Tween.get(lotteryObj, { loop: false });
            tw.to({ scaleX: 0 }, 200).call(function () {
                egret.Tween.removeTweens(lotteryObj);
                lotteryObj.x = -400;
                lotteryObj.scaleX = 1;
            });
        }
        else {
            lotteryObj.scaleX = 0;
            lotteryObj.x = 3;
            self._lotteryIsOpen = true;
            var tw = egret.Tween.get(lotteryObj, { loop: false });
            tw.to({ scaleX: 1 }, 200).wait(5000).to({ scaleX: 0 }, 200).call(function () {
                egret.Tween.removeTweens(lotteryObj);
                self._lotteryIsOpen = false;
                lotteryObj.x = -400;
                lotteryObj.scaleX = 1;
            });
        }
    };
    /** 打开抽奖提示面板 */
    RoomUI.prototype.openLotteryGroupWithData = function (score, killNum, max) {
        var lotteryVo = game.table.T_Lottery_Table.getVoByKey(1);
        if (killNum >= max && score >= lotteryVo.integral) {
            this.lottery_tips.visible = true;
            this.lottery_tips.text = game.util.Language.getText(14); //点击开始抽奖
            this.jiangjinyu_txt.visible = false;
            this.jjy_txt_bg.visible = false;
            this.fishCountTxt.visible = false;
            var self_1 = this;
            var hintChild = this.lotteryGroup.getChildByName("LotteryHint");
            if (!hintChild) {
                var hint = new egret.Bitmap(RES.getRes("ef_lottery_hint_png"));
                hint.name = "LotteryHint";
                hint.anchorOffsetX = 0;
                hint.anchorOffsetY = hint.height / 2;
                hint.width = 272;
                hint.height = 94;
                hint.x = 12;
                hint.y = hint.height / 2 - 1;
                hint.blendMode = egret.BlendMode.ADD;
                self_1.lotteryGroup.addChild(hint);
                self_1.openLotteryGroup(null);
                burn.tools.TweenTools.showOutAndIn(hint, 1500);
            }
        }
        else {
            this.fishCountTxt.visible = true;
            this.fishCountTxt.text = killNum + "/" + max;
            this.fishCountTxt.anchorOffsetX = this.fishCountTxt.width / 2;
            this.fishCountTxt.anchorOffsetY = this.fishCountTxt.height / 2;
            this.lottery_tips.visible = false;
            this.jiangjinyu_txt.visible = true;
            this.jjy_txt_bg.visible = true;
            var hintChild = this.lotteryGroup.getChildByName("LotteryHint");
            if (hintChild) {
                this.lotteryGroup.removeChild(hintChild);
            }
        }
        this.bounsTxt.text = "" + score;
        this.bounsTxt.anchorOffsetX = this.bounsTxt.width / 2;
        this.bounsTxt.anchorOffsetY = this.bounsTxt.height / 2;
        this.openLotteryGroup(null);
    };
    RoomUI.prototype.openLotteryGuide = function () {
        //造假
        this.lottery_tips.visible = true;
        this.lottery_tips.text = game.util.Language.getText(14); //点击开始抽奖
        this.jiangjinyu_txt.visible = false;
        this.jjy_txt_bg.visible = false;
        this.fishCountTxt.visible = false;
        var self = this;
        var hintChild = this.lotteryGroup.getChildByName("LotteryHint");
        if (!hintChild) {
            var hint = new egret.Bitmap(RES.getRes("ef_lottery_hint_png"));
            hint.name = "LotteryHint";
            hint.anchorOffsetX = 0;
            hint.anchorOffsetY = hint.height / 2;
            hint.width = 272;
            hint.height = 94;
            hint.x = 12;
            hint.y = hint.height / 2 - 1;
            hint.blendMode = egret.BlendMode.ADD;
            self.lotteryGroup.addChild(hint);
            self.openLotteryGroup(null);
            burn.tools.TweenTools.showOutAndIn(hint, 1500);
        }
        this.bounsTxt.text = "" + 2000;
        this.bounsTxt.anchorOffsetX = this.bounsTxt.width / 2;
        this.bounsTxt.anchorOffsetY = this.bounsTxt.height / 2;
        //弹出
        var lotteryObj = self.lotteryGroup;
        egret.Tween.removeTweens(lotteryObj);
        lotteryObj.scaleX = 0;
        lotteryObj.x = 3;
        self._lotteryIsOpen = true;
        var tw = egret.Tween.get(lotteryObj, { loop: false });
        tw.to({ scaleX: 1 }, 200).call(function () {
            egret.Tween.removeTweens(lotteryObj);
        });
    };
    /** 打开抽奖界面 */
    RoomUI.prototype.openLotteryView = function (evt) {
        if (this._lotteryIsOpen) {
            burn._Notification_.send(NotifyEnum.OPEN_LOTTERY_UI);
        }
    };
    /** 打开商店UI */
    RoomUI.prototype.openShopView = function (evt) {
        var itemShopView = new ItemShopView();
        var itemShopMed = new ItemShopMediator(itemShopView);
        burn.Director.pushView(itemShopMed);
    };
    /** 购买金币界面 */
    RoomUI.prototype.getCoins = function (evt) {
        var chargeView = new ChargeView(ChargeType.Gold);
        var chargeMed = new ChargeMediator(chargeView);
        burn.Director.pushView(chargeMed);
    };
    /** tips */
    RoomUI.prototype.exchange = function (evt) {
        var exchangeView = new ExchangeView();
        var exchangeMed = new ExchangeMediator(exchangeView);
        burn.Director.pushView(exchangeMed);
    };
    /** 打开喇叭界面 */
    RoomUI.prototype.trumpet = function (evt) {
        var trumpetView = new TrumpetView();
        var trumpetMed = new TrumpetMediator(trumpetView);
        burn.Director.pushView(trumpetMed);
    };
    /** 设置破产特效 */
    RoomUI.prototype.setBankrupt = function (pos, time, showTime) {
        if (showTime === void 0) { showTime = false; }
        var self = this;
        var gun = this.getGunGroup(pos);
        var tempChild = gun.getChildByName("bankrupt" + pos);
        if (tempChild) {
            return;
        }
        var onResourceLoadComplete = function () {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResourceLoadError, self);
            var bankrupt = new egret.Bitmap(RES.getRes("bankrupt_fishing_png"));
            bankrupt.anchorOffsetX = bankrupt.width / 2;
            bankrupt.anchorOffsetY = bankrupt.height / 2;
            bankrupt.scaleX = bankrupt.scaleY = 3;
            bankrupt.name = "bankrupt" + pos;
            bankrupt.y = 50;
            gun.addChild(bankrupt);
            var tw = egret.Tween.get(bankrupt);
            tw.to({ scaleX: 1, scaleY: 1 }, 166, egret.Ease.circIn).call(function () {
                egret.Tween.removeTweens(bankrupt);
            });
            if (showTime) {
                self._bankruptView = new BankruptView();
                self._bankruptView.x = -170;
                self._bankruptView.y = -100;
                self._bankruptView.name = "" + pos;
                gun.addChild(self._bankruptView);
                self._bankruptView.setText(time);
                self._bankruptView.startTick();
            }
        };
        var onResourceLoadError = function () {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResourceLoadError, self);
        };
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResourceLoadError, this);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BankruptUI.exml", function (clazz, url) {
            RES.createGroup("bankrupt_fishing_png", ["bankrupt_fishing_png"]);
            RES.loadGroup("bankrupt_fishing_png");
        }, this);
    };
    /** 移除破产状态显示 */
    RoomUI.prototype.removeBankrupt = function (pos) {
        var gun = this.getGunGroup(pos);
        var tempChild = gun.getChildByName("bankrupt" + pos);
        if (tempChild) {
            gun.removeChild(tempChild);
        }
        if (this._bankruptView && pos == Number(this._bankruptView.name)) {
            this._bankruptView.destroy();
            this._bankruptView.parent && this._bankruptView.parent.removeChild(this._bankruptView);
        }
    };
    /** 隐藏解锁按钮 */
    RoomUI.prototype.setHideUnlock = function () {
        this.unlockBtn.visible = false;
        this.unlockGunGroup.visible = false;
        this.bossBtn.visible = false;
        return;
        if (this.bossBtn.visible) {
            return;
        }
        var userModel = burn.Director.getModelByKey(UserModel);
        if (userModel.getMatchRoomLevel() != RequesetRoomState.SelectRoom) {
            return;
        }
        this.bossBtn.visible = true;
        this.bossBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var view = new WorldBossView();
            var med = new WorldBossMediator(view);
            burn.Director.pushView(med);
        }, this);
    };
    //获取特效播放位置
    RoomUI.prototype.getGunGroup = function (pos) {
        switch (pos) {
            case RoomPosEnum.GUN_POS_0:
                return this.pos_0;
            case RoomPosEnum.GUN_POS_1:
                return this.pos_1;
            case RoomPosEnum.GUN_POS_2:
                return this.pos_2;
            case RoomPosEnum.GUN_POS_3:
                return this.pos_3;
        }
    };
    RoomUI.prototype.getGunPointByPos = function (pos, isFlip) {
        if (isFlip) {
            switch (pos) {
                case RoomPosEnum.GUN_POS_0:
                    return this.posEff_3;
                case RoomPosEnum.GUN_POS_1:
                    return this.posEff_2;
                case RoomPosEnum.GUN_POS_2:
                    return this.posEff_1;
                case RoomPosEnum.GUN_POS_3:
                    return this.posEff_0;
            }
        }
        else {
            switch (pos) {
                case RoomPosEnum.GUN_POS_0:
                    return this.posEff_0;
                case RoomPosEnum.GUN_POS_1:
                    return this.posEff_1;
                case RoomPosEnum.GUN_POS_2:
                    return this.posEff_2;
                case RoomPosEnum.GUN_POS_3:
                    return this.posEff_3;
            }
        }
        return null;
    };
    RoomUI.prototype.setExchangeByPos = function (pos, isFlip, isShow) {
        if (isFlip) {
            switch (pos) {
                case RoomPosEnum.GUN_POS_0:
                    this.exchange_3.visible = isShow;
                    break;
                case RoomPosEnum.GUN_POS_1:
                    this.exchange_2.visible = isShow;
                    break;
                case RoomPosEnum.GUN_POS_2:
                    this.exchange_1.visible = isShow;
                    break;
                case RoomPosEnum.GUN_POS_3:
                    this.exchange_0.visible = isShow;
                    break;
            }
        }
        else {
            switch (pos) {
                case RoomPosEnum.GUN_POS_0:
                    this.exchange_0.visible = isShow;
                    break;
                case RoomPosEnum.GUN_POS_1:
                    this.exchange_1.visible = isShow;
                    break;
                case RoomPosEnum.GUN_POS_2:
                    this.exchange_2.visible = isShow;
                    break;
                case RoomPosEnum.GUN_POS_3:
                    this.exchange_3.visible = isShow;
                    break;
            }
        }
    };
    //获取排行信息
    RoomUI.prototype.getRankByPos = function (pos, isFlip) {
        if (isFlip) {
            switch (pos) {
                case RoomPosEnum.GUN_POS_0:
                    return this.posEff_7;
                case RoomPosEnum.GUN_POS_1:
                    return this.posEff_6;
                case RoomPosEnum.GUN_POS_2:
                    return this.posEff_5;
                case RoomPosEnum.GUN_POS_3:
                    return this.posEff_4;
            }
        }
        else {
            switch (pos) {
                case RoomPosEnum.GUN_POS_0:
                    return this.posEff_4;
                case RoomPosEnum.GUN_POS_1:
                    return this.posEff_5;
                case RoomPosEnum.GUN_POS_2:
                    return this.posEff_6;
                case RoomPosEnum.GUN_POS_3:
                    return this.posEff_7;
            }
        }
        return null;
    };
    RoomUI.prototype.setShowChakan = function (roomer, bFlip) {
        var id = roomer.getUserId();
        var userModel = burn.Director.getModelByKey(UserModel);
        var newPos = RoomUtil.getPosByFlip(roomer.getRoomPos(), bFlip);
        if (id == userModel.getUserId()) {
            this.chakanUI.setMine();
        }
        else {
            if (newPos > 1) {
                this.chakanUI.setOther(true, roomer);
            }
            else {
                this.chakanUI.setOther(false, roomer);
            }
        }
        var posObj = this.getGunPointByPos(newPos, false);
        var posPoint = new egret.Point(posObj.x, posObj.y);
        var posX = posPoint.x + CONFIG.adaptX;
        var posY = posPoint.y + CONFIG.adaptY;
        if (posY > 360) {
            posY -= 100;
            posY -= CONFIG.adaptY;
        }
        if (posY < 360) {
            posY += 300;
            posY += CONFIG.adaptY;
        }
        this.chakanUI.x = posX;
        this.chakanUI.y = posY;
        this.bShowChakan = true;
        this.nChakanPos = roomer.getRoomPos();
    };
    RoomUI.prototype.setHideChakan = function () {
        this.chakanUI.x = -500;
        this.chakanUI.y = -500;
        this.bShowChakan = false;
        this.nChakanPos = -1;
    };
    //添加一个按钮
    RoomUI.prototype.addCiriBtn = function () {
        var _this = this;
        if (this.ciriGroup.numChildren > 0) {
            //已经存在按钮
            return;
        }
        RES.getResAsync("CiRiLiBao_png", function (data, key) {
            var img = new eui.Image(data);
            img.x = -img.width / 2;
            img.y = -img.height / 2;
            img.touchEnabled = false;
            _this.ciriGroup.addChild(img);
        }, this);
        this.ciriGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            burn._Notification_.send(NotifyEnum.POP_CIRI);
        }, this);
        var posX = this.ciriGroup.x;
        var posY = this.ciriGroup.y;
        this.ciriGroup.x = CONFIG.contentWidth / 2;
        this.ciriGroup.y = CONFIG.contentHeight / 2;
        this.ciriGroup.scaleX = 0.3;
        this.ciriGroup.scaleY = 0.3;
        var tw = egret.Tween.get(this.ciriGroup, { loop: false });
        var self = this;
        tw.to({ x: posX, y: posY, scaleX: 0.7, scaleY: 0.7 }, 1000, egret.Ease.backOut)
            .call(function () {
            egret.Tween.removeTweens(self.ciriGroup);
        });
    };
    //凤凰UI
    RoomUI.prototype.addPhoenixShield = function (cur, max) {
        if (this.shieldGroup.numChildren > 0) {
            //已经存在UI
            this.setPhoenixShield(cur, max);
            if ((max - cur) <= 0) {
                this.clearPhoenixUI();
            }
            return;
        }
        var self = this;
        //添加UI,然后回调 
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/worldBoss/worldBossShield.exml", function () {
            self.shieldUI = new PhoenixShield();
            self.shieldUI.anchorOffsetX = self.shieldUI.width / 2;
            self.shieldUI.anchorOffsetY = 0;
            self.shieldGroup.addChild(self.shieldUI);
            self.setPhoenixShield(cur, max);
            burn._Notification_.send(NotifyEnum.CHANGE_PHOENIX_UI);
        }, this);
        return;
    };
    //护盾UI
    RoomUI.prototype.setPhoenixShield = function (cur, max) {
        this.shieldUI && this.shieldUI.setData(cur, max);
    };
    //凤凰顶部的时间
    RoomUI.prototype.addShieldTopPanel = function () {
        if (this.bossTopGroup.numChildren > 0) {
            //已经存在UI
            return;
        }
        var self = this;
        //添加UI,然后回调 
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/worldBoss/worldBossTips.exml", function () {
            self.shieldTips = new PhoenixTop();
            self.shieldTips.anchorOffsetX = self.shieldTips.width / 2;
            self.shieldTips.anchorOffsetY = 0;
            self.bossTopGroup.addChild(self.shieldTips);
            self.shieldTips.start();
        }, this);
    };
    //tops
    RoomUI.prototype.clearPhoenixTop = function () {
        this.bossTopGroup.removeChildren();
        this.shieldTips = null;
    };
    //清除UI
    RoomUI.prototype.clearPhoenixUI = function () {
        this.shieldGroup.removeChildren();
        this.shieldUI = null;
    };
    //////////////////////////海盗悬赏任务////////////////////////////////////
    RoomUI.prototype.changePriceTask = function () {
        if (this.priceTaskUI) {
            this.priceTaskUI.setTask();
            return;
        }
        this.guideTaskGroup.removeChildren();
        var self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/price/PriceTask.exml", function () {
            self.priceTaskUI = new PriceTaskUI();
            self.priceTaskUI.anchorOffsetX = self.priceTaskUI.width / 2;
            self.priceTaskUI.anchorOffsetY = 0;
            self.guideTaskGroup.addChild(self.priceTaskUI);
            burn._Notification_.send(NotifyEnum.PRICE_TASK_CHANGE);
        }, this);
    };
    //清除任务
    RoomUI.prototype.clearPriceTask = function () {
        this.guideTaskGroup.removeChildren();
        this.priceTaskUI = null;
    };
    //显示排行信息
    RoomUI.prototype.showPriceRank = function (pos, isFlip, rank) {
        var group = this.getRankByPos(pos, isFlip);
        group.removeChildren();
        if (rank == -1) {
            return;
        }
        var priceRankUI = new PriceTaskRankUI(rank);
        group.addChild(priceRankUI);
    };
    //情况排行
    RoomUI.prototype.clearPriceRank = function () {
        for (var i = 0; i < 4; i++) {
            var group = this.getRankByPos(i, true);
            group.removeChildren();
        }
    };
    //海盗悬赏任务失败的UI
    RoomUI.prototype.showPriceFail = function () {
        var self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/price/PriceFail.exml", function () {
            var ui = new PriceFailUI();
            self.addChild(ui);
            ui.anchorOffsetX = ui.width / 2;
            ui.anchorOffsetY = ui.height / 2;
            ui.x = self.width / 2;
            ui.y = self.height / 2;
            var tw = egret.Tween.get(ui, { loop: false });
            tw.wait(2000).call(function () {
                egret.Tween.removeTweens(ui);
                self.removeChild(ui);
            });
        }, this);
    };
    RoomUI.prototype.getIsChakan = function () {
        return this.bShowChakan;
    };
    /** 获取冰冻和锁定组件 */
    RoomUI.prototype.getFrozenAndLockUI = function () {
        return this._frozenAndLockUI;
    };
    /**获取炮倍解锁的组件 */
    RoomUI.prototype.getUnlockUpdateUI = function () {
        return this._unlockGunUpdateUI;
    };
    /** 获取道具侧边栏组件 */
    RoomUI.prototype.getSidePropUI = function () {
        return this._sidePropUI;
    };
    /** 获取弹头组件 */
    RoomUI.prototype.getGoldBtn = function () {
        return this.goldBulletBtn;
    };
    RoomUI.prototype.getSilverBtn = function () {
        return this.silverBulletBtn;
    };
    RoomUI.prototype.getBronzeBtn = function () {
        return this.bronzeBulletBtn;
    };
    RoomUI.prototype.getNuclearBtn = function () {
        return this.nuclearBulletBtn;
    };
    RoomUI.prototype.getGuideTaskUI = function () {
        return this._guideTaskUI;
    };
    RoomUI.prototype.destory = function () {
        //移除按钮封装
        while (this.btnWrapList.length > 0) {
            var wrap = this.btnWrapList.pop();
            wrap.destroy();
        }
        //移除事件监听
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.exitRoom, this);
        this.openWarHeadBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseWarHead, this);
        this.shrinkBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseShrink, this);
        this.shrinkBackBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseShrink, this);
        this.lotteryBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openLotteryGroup, this);
        this.lotteryBtn.name = "lotteryBtn";
        this.lotteryGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openLotteryView, this);
        this.lotteryGroup.name = "lotteryGroup";
        this.addRateBtn_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.modifRate, this);
        this.addRateBtn_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.modifRate, this);
        this.reduceRateBtn_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.modifRate, this);
        this.reduceRateBtn_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.modifRate, this);
        this.getCoinsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getCoins, this);
        this.exchangeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.exchange, this);
        this.shopBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openShopView, this);
        this.unlockBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openGunUpdateGroup, this);
        this.warUI.closeWarGroupBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseWarHead, this);
        burn.tools.TweenTools.clearTween(this.waiting_0);
        burn.tools.TweenTools.clearTween(this.waiting_1);
        burn.tools.TweenTools.clearTween(this.waiting_2);
        burn.tools.TweenTools.clearTween(this.waiting_3);
    };
    return RoomUI;
}(eui.Component));
__reflect(RoomUI.prototype, "RoomUI");
//# sourceMappingURL=RoomUI.js.map