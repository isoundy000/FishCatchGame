var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChargeView = (function (_super) {
    __extends(ChargeView, _super);
    function ChargeView(type) {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        _this._nType = -1;
        _this._toType = type;
        return _this;
    }
    ChargeView.prototype.addBgResource = function (clz, url) {
        var _this = this;
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new ChargeUI();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeUI.exml";
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        game.util.UIUtil.popView(this._uiDisplay.root);
        //关闭当前界面
        var closeBtn = this._uiDisplay.closeBtn;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.gold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeType, this);
        this._uiDisplay.gem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeType, this);
        this._uiDisplay.ticket.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeType, this);
        this._uiDisplay.showPrivilege.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowPrivilege, this);
        RES.getResAsync("vipNum_fnt", function () {
            RES.getResAsync("vipNum_png", function () {
                _this._curVipFont = new egret.BitmapText();
                _this._curVipFont.font = RES.getRes("vipNum_fnt");
                _this._curVipFont.text = "0";
                _this._curVipFont.anchorOffsetX = 0;
                _this._curVipFont.anchorOffsetY = _this._curVipFont.height / 2;
                _this._uiDisplay.vipCurGroup.addChild(_this._curVipFont);
                _this._maxVipFont = new egret.BitmapText();
                _this._maxVipFont.font = RES.getRes("vipNum_fnt");
                _this._maxVipFont.text = "0";
                _this._maxVipFont.anchorOffsetX = 0;
                _this._maxVipFont.anchorOffsetY = _this._maxVipFont.height / 2;
                _this._uiDisplay.vipNextGroup.addChild(_this._maxVipFont);
                //打开默认界面
                _this.showListByType(_this._toType);
            }, _this);
        }, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
    };
    ChargeView.prototype.showListByType = function (type, clean) {
        if (clean === void 0) { clean = false; }
        if (this._nType == type && !clean) {
            console.log("#------------重复点击?");
            return;
        }
        this._uiDisplay.selectGem.visible = false;
        this._uiDisplay.selectGold.visible = false;
        this._uiDisplay.selectTicket.visible = false;
        switch (type) {
            case ChargeType.Gold:
                this._uiDisplay.selectGold.visible = true;
                break;
            case ChargeType.Gem:
                this._uiDisplay.selectGem.visible = true;
                break;
            case ChargeType.Ticket:
                this._uiDisplay.selectTicket.visible = true;
        }
        this._nType = type;
        this.showDataList(clean);
    };
    ChargeView.prototype.showDataList = function (clean) {
        if (clean === void 0) { clean = false; }
        var vos = game.table.T_Charge_Table.getAllVo();
        var len = vos.length;
        var voList = new Array();
        if (this._nType == 1 || this._nType == 2) {
            var voMonthCard = null;
            for (var i = 0; i < len; i++) {
                if (vos[i].type == 4) {
                    voMonthCard = vos[i];
                    break;
                }
            }
            voList.push(voMonthCard);
        }
        if (this._nType == 3) {
            var curPid = CONFIG.PLATFORM_ID;
            if (curPid == PlatformTypeEnum.QQ_ZONE) {
                curPid += Number(CONFIG.CHANNEL_ID);
            }
            for (var i = 0; i < len; i++) {
                if (vos[i].type == this._nType && vos[i].platform == curPid) {
                    voList.push(vos[i]);
                }
            }
        }
        else {
            for (var i = 0; i < len; i++) {
                if (vos[i].type == this._nType) {
                    voList.push(vos[i]);
                }
            }
        }
        var childNum = this._uiDisplay.listGroup.numChildren;
        for (var i = 0; i < childNum; i++) {
            var child = this._uiDisplay.listGroup.getElementAt(i);
            child.clearItem();
        }
        this._uiDisplay.listGroup.removeChildren();
        if (this._uiDisplay.listGroup.layout) {
            this._uiDisplay.listGroup.layout.scrollPositionChanged();
        }
        var lenN = voList.length;
        for (var i = 0; i < lenN; i++) {
            var item = new ChargeItemUI();
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeItem.exml";
            item.setData(voList[i]);
            this._uiDisplay.listGroup.addChild(item);
            if (!clean) {
                game.util.UIUtil.listTweenFly(item.root, i, 3);
            }
        }
        var tLayout = new eui.TileLayout();
        tLayout.paddingLeft = 20;
        tLayout.paddingRight = 20;
        this._uiDisplay.listGroup.layout = tLayout; /// 网格布局
        var userModel = burn.Director.getModelByKey(UserModel);
        var vipLv = userModel.getVipLevel();
        var totalRMB = userModel.getTatolChargeRMB();
        var vos1 = game.table.T_VipLevel_Table.getAllVo();
        var vlen = vos1.length;
        var maxVo = null;
        var maxLv = 0;
        maxLv = vos1[vlen - 1].vipLevel;
        maxVo = vos1[vlen - 1];
        if (maxLv <= vipLv) {
            this.initData(maxLv, maxLv, maxVo.levelUpExp, maxVo.levelUpExp);
        }
        else {
            var curVo = game.table.T_VipLevel_Table.getVoByKey(vipLv);
            var lastVo = game.table.T_VipLevel_Table.getVoByKey(vipLv - 1);
            if (lastVo) {
                var maxExp = curVo.levelUpExp / 100;
                var arrName = new Array();
                var chargeTxt = totalRMB / 100;
                var percent = chargeTxt * 1.0 / (curVo.levelUpExp / 100);
                this.initData(vipLv, vipLv + 1, chargeTxt, curVo.levelUpExp / 100);
            }
            else {
                var maxExp = curVo.levelUpExp / 100;
                var arrName = new Array();
                var chargeTxt = totalRMB / 100;
                var percent = chargeTxt * 1.0 / (curVo.levelUpExp / 100);
                this.initData(vipLv, vipLv + 1, chargeTxt, curVo.levelUpExp / 100);
            }
        }
        this._uiDisplay.scroller.viewport.scrollV = 0;
        this._uiDisplay.scroller.viewport.scrollH = 0;
    };
    ChargeView.prototype.initData = function (curVip, nextVip, curExp, maxExp) {
        this._curVipFont.text = curVip + "";
        this._maxVipFont.text = nextVip + "";
        this._uiDisplay.proTxt.text = curExp + "/" + maxExp;
        var percent = curExp * 1.0 / maxExp;
        this._uiDisplay.proCur_228.width = 228 * percent;
        //txt
        if (curVip < nextVip) {
            var curVo = game.table.T_VipLevel_Table.getVoByKey(curVip);
            var maxExp_1 = curVo.levelUpExp / 100;
            var percent_1 = curExp * 1.0 / maxExp_1;
            var arrName = new Array();
            var chargeTxt = maxExp_1 - curExp;
            arrName.push(chargeTxt + "");
            arrName.push(nextVip + "");
            this._uiDisplay.txt.text = game.util.Language.getDynamicText(121, arrName);
        }
        else {
            this._uiDisplay.txt.text = game.util.Language.getText(176);
            this._uiDisplay.nextVipIcon.visible = false;
            this._uiDisplay.vipNextGroup.visible = false;
            this._uiDisplay.proCur_228.width = 228;
            var userModel = burn.Director.getModelByKey(UserModel);
            var vipLv = userModel.getVipLevel();
            var lastVo = game.table.T_VipLevel_Table.getVoByKey(vipLv - 1);
            this._uiDisplay.proTxt.text = lastVo.levelUpExp / 100 + "/" + lastVo.levelUpExp / 100;
        }
    };
    ChargeView.prototype.initView = function () {
        var _this = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeItem.exml", function () {
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeUI.exml", _this.addBgResource, _this);
        }, this);
    };
    /**关闭游戏 */
    ChargeView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    ChargeView.prototype.onShowPrivilege = function (e) {
        burn.Director.popView();
        var view = new VipView();
        var med = new VipMediator(view);
        burn.Director.pushView(med);
    };
    ChargeView.prototype.onChangeType = function (e) {
        var target = e.target;
        if (target == this._uiDisplay.gold) {
            // this.send(NotifyEnum.SHOW_CHARGE_LIST, ChargeType.Gold);
            this.showListByType(ChargeType.Gold);
        }
        else if (target == this._uiDisplay.gem) {
            this.showListByType(ChargeType.Gem);
        }
        else if (target == this._uiDisplay.ticket) {
            this.showListByType(ChargeType.Ticket);
        }
    };
    ChargeView.prototype.destroy = function () {
        var self = this;
        //关闭UI动画
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            var childNum = self._uiDisplay.listGroup.numChildren;
            for (var i = 0; i < childNum; i++) {
                var child = self._uiDisplay.listGroup.getElementAt(i);
                child.clearItem();
            }
            self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self._uiDisplay.gold.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChangeType, self);
            self._uiDisplay.gem.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChangeType, self);
            self._uiDisplay.ticket.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChangeType, self);
            self._uiDisplay.showPrivilege.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onShowPrivilege, self);
            self.parent && self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeUI.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeItem.exml");
        });
    };
    return ChargeView;
}(burn.view.PopView));
__reflect(ChargeView.prototype, "ChargeView");
/***操作UI的对应类 */
var ChargeUI = (function (_super) {
    __extends(ChargeUI, _super);
    function ChargeUI() {
        return _super.call(this) || this;
    }
    return ChargeUI;
}(eui.Component));
__reflect(ChargeUI.prototype, "ChargeUI");
//# sourceMappingURL=ChargeView.js.map