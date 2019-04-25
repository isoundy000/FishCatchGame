var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var ForgeView = (function (_super) {
    __extends(ForgeView, _super);
    function ForgeView() {
        var _this = _super.call(this) || this;
        _this.loadErrorCount = 0;
        _this._btnWrapList = new Array();
        game.util.UIUtil.startLoading();
        return _this;
    }
    ForgeView.prototype.addBgResource = function (clazz, url) {
        game.util.UIUtil.closeLoading();
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new ForgeUI();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //打开UI动画
        game.util.UIUtil.popView(this._uiDisplay.root);
        this._bIsRunning = false;
        //关闭当前界面
        var closeBtn = this._uiDisplay.btnClose;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
        this._uiDisplay.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        this._uiDisplay.useEns.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeUse, this);
        //水晶图片集合
        this._arrImage = new Array();
        this._arrImage.push(this._uiDisplay.ensIcon0);
        this._arrImage.push(this._uiDisplay.ensIcon1);
        this._arrImage.push(this._uiDisplay.ensIcon2);
        this._arrImage.push(this._uiDisplay.ensIcon3);
        //水晶标签集合
        this._arrLab = new Array();
        this._arrLab.push(this._uiDisplay.costEnsLab1);
        this._arrLab.push(this._uiDisplay.costEnsLab2);
        this._arrLab.push(this._uiDisplay.costEnsLab3);
        this._arrLab.push(this._uiDisplay.costEnsLab4);
        this._isUseEns = false;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.loadGroup("forge");
    };
    ForgeView.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "forge") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            this.send(NotifyEnum.CHECK_FORGEUI_LOADED);
        }
    };
    ForgeView.prototype.onResourceLoadError = function (event) {
        this.loadErrorCount += 1;
        console.warn("Group:" + event.groupName + " has failed to load");
        //加载失败后尝试5次重新加载
        if (this.loadErrorCount < 5) {
            RES.loadGroup(event.groupName);
        }
    };
    ForgeView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Forge.exml", this.addBgResource, this);
    };
    //设置界面属性
    ForgeView.prototype.setUIData = function (gunId, bUseEns, bEnough) {
        if (bUseEns === void 0) { bUseEns = false; }
        if (bEnough === void 0) { bEnough = false; }
        //gunId = 54;
        var self = this;
        this._bEnough = bEnough;
        var userModle = burn.Director.getModelByKey(UserModel);
        var gunVo = game.table.T_Gun_Table.getVoByKey(gunId);
        var gunNextVo = game.table.T_Gun_Table.getVoByKey(gunId + 1);
        //炮倍
        var rate = gunVo.bulletNum;
        this._curRate = rate + "";
        this._uiDisplay.paobeiNum.text = rate + "";
        if (gunNextVo) {
            var rateNext = gunNextVo.bulletNum;
            var arrName = new Array();
            arrName.push(rateNext + "");
            this._uiDisplay.titleShow.text = game.util.Language.getDynamicText(30, arrName); //30 
        }
        else {
            this._uiDisplay.titleShow.text = game.table.T_Language_Table.getVoByKey(25).value; //25
        }
        //显示炮
        game.util.IconUtil.getIconByIdAsync(IconType.PAO, userModle.getCurSkinId(), function (icon) {
            if (icon) {
                self._uiDisplay.gunImgGroup.removeChildren();
                icon.anchorOffsetX = icon.width / 2;
                icon.anchorOffsetY = icon.height / 2;
                self._uiDisplay.gunImgGroup.addChild(icon);
            }
        });
        //消耗
        var arr = gunVo.upgradeOrForgeCost;
        var arrEnsence = gunVo.forgeSuccessAlsoCost;
        var arrEnsData = arrEnsence.split("_");
        var arrData = arr.split(",");
        if (arrData.length <= 1) {
            //70001_10,70002_10,70003_10,70004_10
            //70005_1800
            arrData = "70001_10,70002_10,70003_10,70004_10".split(",");
            arrEnsData = "70005_1800".split("_");
        }
        var nEnoughNum = 0;
        var nCurNum = 0;
        var _loop_1 = function (i) {
            var item = arrData[i];
            var arrStr = item.split("_");
            var id = parseInt(arrStr[0]);
            var num = parseInt(arrStr[1]);
            var curNum = 0;
            var itemObj = new game.model.Item(id, 0);
            if (userModle.isExist(itemObj)) {
                curNum = userModle.getItemById(id).getCount();
            }
            if (gunId == 54) {
                this_1._arrLab[i].text = curNum + "";
            }
            else {
                this_1._arrLab[i].text = curNum + "/" + num;
            }
            (function (Image) {
                game.util.IconUtil.getIconByIdAsync(IconType.PROP, id, function (icon) {
                    icon.anchorOffsetX = icon.width / 2;
                    icon.anchorOffsetY = icon.height / 2;
                    icon.x = Image.width / 2;
                    icon.y = Image.height / 2;
                    Image.addChild(icon);
                });
            })(self._arrImage[i]);
        };
        var this_1 = this;
        //四个水晶的图标
        for (var i = 0; i < arrData.length; i++) {
            _loop_1(i);
        }
        //如果是精华锻造,扣除精华
        var ensId = parseInt(arrEnsData[0]);
        var ensNum = parseInt(arrEnsData[1]);
        var arrName1 = new Array();
        arrName1.push(ensNum + "");
        this._uiDisplay.costEnsLab.text = game.util.Language.getDynamicText(31, arrName1); //30 
        var curEnsNum = 0;
        var itemEnsObj = new game.model.Item(ensId, 0);
        if (userModle.isExist(itemEnsObj)) {
            curEnsNum = userModle.getItemById(ensId).getCount();
        }
        if (gunId == 54) {
            this._uiDisplay.costEnsLab0.text = curEnsNum + "";
        }
        else {
            this._uiDisplay.costEnsLab0.text = curEnsNum + "/" + ensNum;
        }
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, ensId, function (icon) {
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            icon.x = self._uiDisplay.ensIcon.width / 2;
            icon.y = self._uiDisplay.ensIcon.height / 2;
            self._uiDisplay.ensIcon.addChild(icon);
        });
        if (gunId == 54) {
            this._uiDisplay.useEns.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeUse, this);
            this._uiDisplay.costEnsLab.text = game.table.T_Language_Table.getVoByKey(25).value;
            return;
        }
        this._isUseEns = bUseEns;
        this.changeUseEns();
    };
    //根据当前使用状态。设置图片
    ForgeView.prototype.changeUseEns = function () {
        if (this._isUseEns) {
            this._uiDisplay.useEnsImag.visible = true;
            this._uiDisplay.useEnsImag.touchEnabled = false;
        }
        else {
            this._uiDisplay.useEnsImag.visible = false;
            this._uiDisplay.useEnsImag.touchEnabled = false;
        }
    };
    /**关闭游戏 */
    ForgeView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    /**切换是否使用水晶精华 */
    ForgeView.prototype.onChangeUse = function (e) {
        this.send(NotifyEnum.SET_USEENSENCE_FLAG);
    };
    /**确认锻造 */
    ForgeView.prototype.onOKButtonClick = function (e) {
        if (this._bIsRunning) {
            return;
        }
        if (!this._bEnough) {
            this._uiDisplay.useEns.touchEnabled = false;
            this._uiDisplay.okBtn.touchEnabled = false;
            game.util.GameUtil.openConfirm(this, this.callFun, this, "材料不足");
        }
        else {
            this._bIsRunning = true;
            //发消息
            var req = new UpgradeOrForgeSendMessage();
            req.initData();
            if (this._isUseEns) {
                req.setType(GunUpdateType.USE_ESSENCE_FORGE_TYPE);
            }
            else {
                req.setType(GunUpdateType.NO_ESSENCE_FORGE_TYPE);
            }
            NetManager.send(req);
            for (var i = 0; i < this._arrImage.length; i++) {
                (function (Image) {
                    var data = RES.getRes("ef_forge_json");
                    var txtr = RES.getRes("ef_forge_png");
                    var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                    var effect = new MovieFish(mcFactory.generateMovieClipData("ef_forge"), egret.Event.COMPLETE);
                    effect.initEvent();
                    var dataMc = effect.movieClipData;
                    var frameCur = 0;
                    var modifyRect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
                    effect.gotoAndPlay("play", 1);
                    Image.addChild(effect);
                    effect.anchorOffsetX = effect.width / 2 + modifyRect.x;
                    effect.anchorOffsetY = effect.height / 2 + modifyRect.y;
                    effect.x = 50;
                    effect.y = 50;
                    effect.frameRate = 9;
                })(this._arrImage[i]);
            }
        }
    };
    ForgeView.prototype.setEffect = function (state) {
        var _this = this;
        if (state != 1) {
            var txtr = RES.getRes("ef_forge_lost_png");
            var effect_1 = new egret.Bitmap(txtr);
            this._uiDisplay.gunGroup.addChild(effect_1);
            effect_1.anchorOffsetX = effect_1.width / 2;
            effect_1.anchorOffsetY = effect_1.height / 2;
            effect_1.x = 80;
            effect_1.y = 90;
            var tw = egret.Tween.get(effect_1);
            effect_1.alpha = 0;
            var self_1 = this;
            tw.to({ alpha: 0.5 }, 300).
                to({ alpha: 0.8 }, 300).
                to({ alpha: 0 }, 300).
                to({ alpha: 0.5 }, 300).
                to({ alpha: 0.25 }, 300).
                to({ alpha: 0 }, 300).
                call(function () {
                egret.Tween.removeTweens(effect_1);
                self_1._uiDisplay.gunGroup.removeChild(effect_1);
                self_1._bIsRunning = false;
                if (state == UpdateOrForgeType.TYPE_MAX) {
                    game.util.GameUtil.popTips(game.util.Language.getText(29));
                }
                else if (state == UpdateOrForgeType.TYPE_NOENOUGH) {
                    game.util.GameUtil.popTips(game.util.Language.getText(29));
                }
                else if (state == UpdateOrForgeType.TYPE_NULL) {
                    game.util.GameUtil.popTips(game.util.Language.getText(29));
                }
                else if (state == UpdateOrForgeType.TYPE_FAIL) {
                    game.util.GameUtil.popTips(game.util.Language.getText(29));
                }
            });
        }
        else if (state == 1) {
            //锻造成功的分享
            if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
                var yaoQingView = new ShareZiYou(ShareType.Forge_Succ, this._curRate);
                this.addChild(yaoQingView);
                return;
            }
            var data = RES.getRes("ef_forge_win_json");
            var txtr = RES.getRes("ef_forge_win_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            var effect1 = new MovieFish(mcFactory.generateMovieClipData("ef_forge_win"), egret.Event.COMPLETE, function () {
                game.util.GameUtil.popTips("锻造成功");
                _this._bIsRunning = false;
            });
            effect1.initEvent();
            var dataMc = effect1.movieClipData;
            var frameCur = 0;
            var modifyRect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
            effect1.gotoAndPlay("play", 1);
            this._uiDisplay.gunGroup.addChild(effect1);
            effect1.frameRate = 9;
            effect1.anchorOffsetX = effect1.width / 2 + modifyRect.x;
            effect1.anchorOffsetY = effect1.height / 2 + modifyRect.y;
            effect1.x = 67;
            effect1.y = 90;
        }
    };
    ForgeView.prototype.callFun = function (target) {
        target._uiDisplay.useEns.touchEnabled = true;
        target._uiDisplay.okBtn.touchEnabled = true;
    };
    ForgeView.prototype.destroy = function () {
        var self = this;
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self._uiDisplay.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onOKButtonClick, self);
            self.parent && self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Forge.exml");
        });
    };
    return ForgeView;
}(burn.view.PopView));
__reflect(ForgeView.prototype, "ForgeView");
/***操作UI的对应类 */
var ForgeUI = (function (_super) {
    __extends(ForgeUI, _super);
    function ForgeUI() {
        return _super.call(this) || this;
    }
    return ForgeUI;
}(eui.Component));
__reflect(ForgeUI.prototype, "ForgeUI");
//# sourceMappingURL=forgeView.js.map