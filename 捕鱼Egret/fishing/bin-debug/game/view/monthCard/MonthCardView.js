var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MonthCardView = (function (_super) {
    __extends(MonthCardView, _super);
    function MonthCardView(bShow) {
        if (bShow === void 0) { bShow = false; }
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._bShow = bShow;
        _this._btnWrapList = new Array();
        game.util.UIUtil.startLoading();
        return _this;
    }
    MonthCardView.prototype.addBgResource = function (clazz, url) {
        game.util.UIUtil.closeLoading();
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new MonthCardCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        if (!this._bPop) {
            game.util.UIUtil.popView(this._uiDisplay.root);
            this._bPop = true;
        }
        //关闭当前界面
        this._uiDisplay.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.gainCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGain, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.gainCard));
        this.setData();
    };
    MonthCardView.prototype.setData = function () {
        var userModel = burn.Director.getModelByKey(UserModel);
        var monthCardTime = userModel.getMonthEndTime() - game.util.TimeUtil.getCurrTime();
        //monthCardTime = 1000*60*60*24*7;
        if (monthCardTime > 0) {
            var str = game.util.TimeUtil.sceondsMonthCard(monthCardTime);
            this._uiDisplay.remainLab.text = str;
            this._uiDisplay.renewTxt.visible = true;
            this._uiDisplay.getMonthTxt.visible = false;
        }
        else {
            this._uiDisplay.renewTxt.visible = false;
            this._uiDisplay.getMonthTxt.visible = true;
            this._uiDisplay.remainLab.text = "当前没有月卡";
        }
    };
    /**关闭游戏 */
    MonthCardView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
        if (this._bShow) {
            this.send(NotifyEnum.CHECK_POP);
        }
    };
    MonthCardView.prototype.onGain = function (e) {
        if (this._bShow) {
            burn.Director.popView();
            this.send(NotifyEnum.CHECK_POP);
            return;
        }
        //购买
        var vos = game.table.T_Charge_Table.getAllVo();
        var len = vos.length;
        var voMonthCard = null;
        for (var i = 0; i < len; i++) {
            if (vos[i].type == 4) {
                voMonthCard = vos[i];
                break;
            }
        }
        // let priceArr = voMonthCard.price.split("_");
        // let priceStr:string = "";
        // if (priceArr[0] == 10012) {
        // 	priceStr = priceArr[1] + "点券";
        // }
        // game.util.GameUtil.openConfirmByTwoButton(null,function(){
        var msg = new ChargeSendMessage();
        msg.initData();
        msg.setChargeId(voMonthCard.id);
        NetManager.send(msg);
        // }, this, game.util.Language.getDynamicText(125, [priceStr]));
    };
    MonthCardView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/monthCard/MonthCardUI.exml", this.addBgResource, this);
    };
    MonthCardView.prototype.destroy = function () {
        var self = this;
        this._bPop = false;
        //关闭UI动画
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self._uiDisplay.gainCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onGain, self);
            self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/monthCard/MonthCardUI.exml");
        });
    };
    return MonthCardView;
}(burn.view.PopView));
__reflect(MonthCardView.prototype, "MonthCardView");
/***操作UI的对应类 */
var MonthCardCom = (function (_super) {
    __extends(MonthCardCom, _super);
    function MonthCardCom() {
        return _super.call(this) || this;
    }
    return MonthCardCom;
}(eui.Component));
__reflect(MonthCardCom.prototype, "MonthCardCom");
//# sourceMappingURL=MonthCardView.js.map