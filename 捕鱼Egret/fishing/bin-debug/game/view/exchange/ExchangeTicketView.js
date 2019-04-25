var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeTicketView = (function (_super) {
    __extends(ExchangeTicketView, _super);
    function ExchangeTicketView(nId) {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        _this._nId = nId;
        return _this;
    }
    ExchangeTicketView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new ExchangesTicketUI();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //打开UI动画
        game.util.UIUtil.popView(this._uiDisplay.root);
        //关闭当前界面
        var closeBtn = this._uiDisplay.closeBtn;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.name_Edit.alpha = 0.4;
        this._uiDisplay.phone_Edit.alpha = 0.4;
        this._uiDisplay.name_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this._uiDisplay.phone_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this._uiDisplay.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExchange, this);
        var exchangeModel = burn.Director.getModelByKey(ExchangeModel);
        var item = exchangeModel.getListById(this._nId);
        //161-168
        if (item._type != 4) {
            this._uiDisplay.nameT.text = game.util.Language.getText(161);
            this._uiDisplay.phoneT.text = game.util.Language.getText(162);
            this._uiDisplay.name_Edit.text = game.util.Language.getText(163);
            this._uiDisplay.phone_Edit.text = game.util.Language.getText(164);
        }
        else {
            this._uiDisplay.nameT.text = game.util.Language.getText(165);
            this._uiDisplay.phoneT.text = game.util.Language.getText(166);
            this._uiDisplay.name_Edit.text = game.util.Language.getText(167);
            this._uiDisplay.phone_Edit.text = game.util.Language.getText(168);
        }
        //this._uiDisplay.descLab.text = game.table.T_Language_Table.getVoByKey(174).value;
        var str = game.table.T_Language_Table.getVoByKey(174).value;
        var contentTxt = new egret.TextField();
        contentTxt.textAlign = egret.HorizontalAlign.LEFT;
        contentTxt.textFlow = (new egret.HtmlTextParser).parser(str);
        contentTxt.touchEnabled = false;
        contentTxt.lineSpacing = 5;
        contentTxt.width = this._uiDisplay.descGroup.width;
        contentTxt.height = this._uiDisplay.descGroup.height;
        this._uiDisplay.descGroup.addChild(contentTxt);
    };
    ExchangeTicketView.prototype.onExchange = function (e) {
        var strName = this._uiDisplay.name_Edit.text;
        var strPhone = this._uiDisplay.phone_Edit.text;
        if (strName == "" || strPhone == "") {
            game.util.GameUtil.popTips(game.util.Language.getText(172));
            return;
        }
        if (strName != strPhone) {
            game.util.GameUtil.popTips(game.util.Language.getText(69));
            return;
        }
        var exchangeModel = burn.Director.getModelByKey(ExchangeModel);
        var item = exchangeModel.getListById(this._nId);
        if (item._type != 4) {
            var self_1 = this;
            var strTips = game.util.Language.getText(161) + strPhone + "\n";
            strTips += "您确认兑换吗?";
            game.util.GameUtil.openConfirmByTwoButton(null, function () {
                var req = new ExchangeSendMessage();
                req.initData();
                req.setGoodsId(self_1._nId);
                req.setReceiverPhone(strPhone);
                NetManager.send(req);
                self_1.onClosttButtonClick(null);
            }, this, strTips);
        }
        else {
            var self_2 = this;
            var strTips = game.util.Language.getText(165) + strPhone + "\n";
            strTips += "您确认兑换吗?";
            game.util.GameUtil.openConfirmByTwoButton(null, function () {
                var req = new ExchangeSendMessage();
                req.initData();
                req.setGoodsId(self_2._nId);
                req.setReceiverZFB(strPhone);
                NetManager.send(req);
                self_2.onClosttButtonClick(null);
            }, this, strTips);
        }
    };
    ExchangeTicketView.prototype.onChange = function (e) {
        e.target.text = "";
        e.target.alpha = 1;
    };
    /**关闭游戏 */
    ExchangeTicketView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    ExchangeTicketView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeTicket.exml", this.addBgResource, this);
    };
    ExchangeTicketView.prototype.destroy = function () {
        var self = this;
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.name_Edit.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            self._uiDisplay.phone_Edit.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self.parent && self.parent.removeChild(self);
        });
    };
    return ExchangeTicketView;
}(burn.view.PopView));
__reflect(ExchangeTicketView.prototype, "ExchangeTicketView");
/***操作UI的对应类 */
var ExchangesTicketUI = (function (_super) {
    __extends(ExchangesTicketUI, _super);
    function ExchangesTicketUI() {
        return _super.call(this) || this;
    }
    return ExchangesTicketUI;
}(eui.Component));
__reflect(ExchangesTicketUI.prototype, "ExchangesTicketUI");
//# sourceMappingURL=ExchangeTicketView.js.map