var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KssView = (function (_super) {
    __extends(KssView, _super);
    function KssView() {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        _this._nIndex = -1;
        return _this;
    }
    KssView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new KssCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //关闭当前界面
        var closeBtn = this._uiDisplay.btnClose;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._unArr = new Array();
        this._unArr.push(this._uiDisplay.unFree);
        this._unArr.push(this._uiDisplay.unChu);
        this._unArr.push(this._uiDisplay.unZhong);
        this._unArr.push(this._uiDisplay.unJingying);
        this._selArr = new Array();
        this._selArr.push(this._uiDisplay.selFree);
        this._selArr.push(this._uiDisplay.selChu);
        this._selArr.push(this._uiDisplay.selZhong);
        this._selArr.push(this._uiDisplay.selJingying);
        this._selectArr = new Array();
        this._selectArr.push(this._uiDisplay.img_0);
        this._selectArr.push(this._uiDisplay.img_1);
        this._selectArr.push(this._uiDisplay.img_2);
        this._selectArr.push(this._uiDisplay.img_3);
        this._uiDisplay.free.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_0, this);
        this._uiDisplay.chu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_1, this);
        this._uiDisplay.zhong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_2, this);
        this._uiDisplay.jingying.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_3, this);
        this._uiDisplay.joinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoin, this);
        this._uiDisplay.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRule, this);
        this._strGun = this._uiDisplay.gunRateLab.text;
        this.selectByIndex(0);
    };
    KssView.prototype.onRule = function (e) {
        var settingView = new DjsRuleView(Rule_State.KssRoom);
        var settingMed = new DjsRuleMediator(settingView);
        burn.Director.pushView(settingMed);
    };
    KssView.prototype.onJoin = function (e) {
        //暂时屏蔽后两个等级的比赛
        if (this._nIndex == 2 || this._nIndex == 3) {
            game.util.GameUtil.openConfirm(null, null, this, game.util.Language.getText(190));
            return;
        }
        if (this._nIndex == -1) {
            return;
        }
        //判断炮倍和钱
        var id = this._nIndex + 7;
        var vo = game.table.T_QuickGame_Table.getVoByKey(id);
        if (!vo) {
            return;
        }
        var userModel = burn.Director.getModelByKey(UserModel);
        if (userModel.getCurGunID() < vo.minGunId) {
            //提示炮倍不足
            game.util.GameUtil.popTips(game.util.Language.getText(148));
            return;
        }
        var flagCoin = game.util.GameUtil.isEnough(CurrencyEnum.COINS, Number(vo.admissionFee.split("_")[1]));
        if (!flagCoin) {
            //提示钱不够
            game.util.GameUtil.popTips(game.util.Language.getText(149));
            return;
        }
        this.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, { type: id, id: 0 });
        burn.Director.popView();
        // let view:KssWaitView = new KssWaitView(this._nIndex);
        // let med:KssWaitMediator = new KssWaitMediator(view);
        // burn.Director.pushView(med);
    };
    KssView.prototype.onChange_0 = function (e) {
        this.selectByIndex(0);
    };
    KssView.prototype.onChange_1 = function (e) {
        this.selectByIndex(1);
    };
    KssView.prototype.onChange_2 = function (e) {
        this.selectByIndex(2);
    };
    KssView.prototype.onChange_3 = function (e) {
        this.selectByIndex(3);
    };
    KssView.prototype.selectByIndex = function (nIndex) {
        var self = this;
        if (this._nIndex == nIndex) {
            return;
        }
        var id = nIndex + 7;
        var vo = game.table.T_QuickGame_Table.getVoByKey(id);
        if (!vo) {
            return;
        }
        this._nIndex = nIndex;
        for (var i = 0; i < this._unArr.length; i++) {
            if (i == nIndex) {
                this._unArr[i].visible = false;
            }
            else {
                this._unArr[i].visible = true;
            }
        }
        for (var i = 0; i < this._selArr.length; i++) {
            if (i == nIndex) {
                this._selArr[i].visible = true;
                this._selectArr[i].visible = true;
            }
            else {
                this._selArr[i].visible = false;
                this._selectArr[i].visible = false;
            }
        }
        this._uiDisplay.ticket.removeChildren();
        var nid = this._nIndex + 7;
        var nvo = game.table.T_QuickGame_Table.getVoByKey(nid);
        if (nvo) {
            var tickeNum = Number(nvo.admissionFee.split("_")[1]);
            var ticketId = Number(nvo.admissionFee.split("_")[0]);
            game.util.IconUtil.getIconByIdAsync(IconType.PROP, ticketId, function (icon) {
                if (!icon) {
                    return;
                }
                icon.width = 50;
                icon.height = 50;
                icon.anchorOffsetX = icon.width / 2;
                icon.anchorOffsetY = icon.height / 2;
                self._uiDisplay.ticket.addChild(icon);
            });
            var lab_ticket = new eui.Label();
            lab_ticket.textAlign = egret.HorizontalAlign.LEFT;
            lab_ticket.text = tickeNum + "";
            lab_ticket.anchorOffsetX = 0;
            lab_ticket.anchorOffsetY = lab_ticket.height / 2;
            lab_ticket.x = 25;
            self._uiDisplay.ticket.addChild(lab_ticket);
        }
        //gunRateLab
        //gain_0 - gain_2
        this._uiDisplay.gain_0.removeChildren();
        this._uiDisplay.gain_1.removeChildren();
        this._uiDisplay.gain_2.removeChildren();
        var gunId = nvo.minGunId;
        var gainStr_0 = nvo.theFirst;
        var gainStr_1 = nvo.theSecond;
        var gainStr_2 = nvo.theThird;
        var gunVo = game.table.T_Gun_Table.getVoByKey(Number(gunId));
        var arrName = new Array();
        arrName.push(gunVo.bulletNum + "");
        this._uiDisplay.gunRateLab.text = game.util.Language.getDynamicTextByStr(this._strGun, arrName);
        var gainData_0 = gainStr_0.split("_");
        var gainData_1 = gainStr_1.split("_");
        var gainData_2 = gainStr_2.split("_");
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, Number(gainData_0[0]), function (icon) {
            if (!icon) {
                return;
            }
            icon.width = 50;
            icon.height = 50;
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            self._uiDisplay.gain_0.addChild(icon);
        });
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, Number(gainData_1[0]), function (icon) {
            if (!icon) {
                return;
            }
            icon.width = 50;
            icon.height = 50;
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            self._uiDisplay.gain_1.addChild(icon);
        });
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, Number(gainData_2[0]), function (icon) {
            if (!icon) {
                return;
            }
            icon.width = 50;
            icon.height = 50;
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            self._uiDisplay.gain_2.addChild(icon);
        });
        var lab_0 = new eui.Label();
        lab_0.textAlign = egret.HorizontalAlign.LEFT;
        lab_0.text = gainData_0[1] + "";
        lab_0.anchorOffsetX = 0;
        lab_0.anchorOffsetY = lab_0.height / 2;
        lab_0.x = 25;
        self._uiDisplay.gain_0.addChild(lab_0);
        var lab_1 = new eui.Label();
        lab_1.textAlign = egret.HorizontalAlign.LEFT;
        lab_1.text = gainData_1[1] + "";
        lab_1.anchorOffsetX = 0;
        lab_1.anchorOffsetY = lab_1.height / 2;
        lab_1.x = 25;
        self._uiDisplay.gain_1.addChild(lab_1);
        var lab_2 = new eui.Label();
        lab_2.textAlign = egret.HorizontalAlign.LEFT;
        lab_2.text = gainData_2[1] + "";
        lab_2.anchorOffsetX = 0;
        lab_2.anchorOffsetY = lab_2.height / 2;
        lab_2.x = 25;
        self._uiDisplay.gain_2.addChild(lab_2);
    };
    /**关闭游戏 */
    KssView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    KssView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssUI.exml", this.addBgResource, this);
    };
    KssView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.free.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_0, this);
        this._uiDisplay.chu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_1, this);
        this._uiDisplay.zhong.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_2, this);
        this._uiDisplay.jingying.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_3, this);
        this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssUI.exml");
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssWaitUI.exml");
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssResultUI.exml");
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssResultItem.exml");
    };
    return KssView;
}(burn.view.PopView));
__reflect(KssView.prototype, "KssView");
/***操作UI的对应类 */
var KssCom = (function (_super) {
    __extends(KssCom, _super);
    function KssCom() {
        return _super.call(this) || this;
    }
    return KssCom;
}(eui.Component));
__reflect(KssCom.prototype, "KssCom");
//# sourceMappingURL=KssView.js.map