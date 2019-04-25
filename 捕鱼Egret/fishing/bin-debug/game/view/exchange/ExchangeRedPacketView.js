var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeRedPacketView = (function (_super) {
    __extends(ExchangeRedPacketView, _super);
    function ExchangeRedPacketView(nid) {
        var _this = _super.call(this) || this;
        _this._nId = nid;
        _this._btnWrapList = new Array();
        return _this;
    }
    ExchangeRedPacketView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new ExchangesRedPacketUI();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //按钮动画
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.okBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
        //打开UI动画
        game.util.UIUtil.popView(this._uiDisplay.root);
        //关闭当前界面
        var closeBtn = this._uiDisplay.closeBtn;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExchange, this);
        this._uiDisplay.edit_QQ.alpha = 0.4;
        this._uiDisplay.edit_WeChat.alpha = 0.4;
        this._uiDisplay.edit_ALi.alpha = 0.4;
        this._uiDisplay.edit_Phone.alpha = 0.4;
        this._uiDisplay.edit_QQ.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this._uiDisplay.edit_WeChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this._uiDisplay.edit_ALi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this._uiDisplay.edit_Phone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
    };
    ExchangeRedPacketView.prototype.onExchange = function (e) {
        //qq 微信 支付宝 手机 全部必填 输入框
        var qqTxt = this._uiDisplay.edit_QQ;
        var wechetTxt = this._uiDisplay.edit_WeChat;
        var aliTxt = this._uiDisplay.edit_ALi;
        var phoneTxt = this._uiDisplay.edit_Phone;
        //校验
        var judgeWeChet = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
        var judgeQQ = /^\d{5,10}$/;
        var judgeALiPhone = /^1\d{10}$/;
        var judgeALiEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (qqTxt.text == "" || wechetTxt.text == "" || aliTxt.text == "") {
            game.util.GameUtil.popTips(game.util.Language.getText(172));
            return;
        }
        if (!judgeWeChet.test(wechetTxt.text)) {
            game.util.GameUtil.popTips(game.util.Language.getText(2455));
            return;
        }
        if (!judgeQQ.test(qqTxt.text)) {
            game.util.GameUtil.popTips(game.util.Language.getText(2455));
            return;
        }
        if (!judgeALiPhone.test(aliTxt.text) && !judgeALiEmail.test(aliTxt.text)) {
            game.util.GameUtil.popTips(game.util.Language.getText(2455));
            return;
        }
        if (!judgeALiPhone.test(phoneTxt.text)) {
            game.util.GameUtil.popTips(game.util.Language.getText(2455));
            return;
        }
        //提交
        var exchangeModel = burn.Director.getModelByKey(ExchangeModel);
        var item = exchangeModel.getListById(this._nId);
        if (item._type == 4) {
            var self_1 = this;
            var strTips = "您确认兑换吗?";
            game.util.GameUtil.openConfirmByTwoButton(null, function () {
                var req = new ExchangeSendMessage();
                req.initData();
                req.setGoodsId(self_1._nId);
                req.setReceiverZFB(aliTxt.text);
                req.setReceiverQQ(qqTxt.text);
                req.setReceiverWX(wechetTxt.text);
                req.setReceiverPhone(phoneTxt.text);
                NetManager.send(req);
                self_1.onClosttButtonClick(null);
            }, this, strTips);
        }
    };
    ExchangeRedPacketView.prototype.onChange = function (e) {
        e.target.text = "";
        e.target.alpha = 1;
    };
    ExchangeRedPacketView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    ExchangeRedPacketView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeRedPacket.exml", this.addBgResource, this);
    };
    ExchangeRedPacketView.prototype.destroy = function () {
        var self = this;
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.edit_QQ.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            self._uiDisplay.edit_WeChat.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            self._uiDisplay.edit_ALi.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            self._uiDisplay.edit_Phone.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            self._uiDisplay.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onExchange, self);
            self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self.parent && self.parent.removeChild(self);
        });
    };
    return ExchangeRedPacketView;
}(burn.view.PopView));
__reflect(ExchangeRedPacketView.prototype, "ExchangeRedPacketView");
/***操作UI的对应类 */
var ExchangesRedPacketUI = (function (_super) {
    __extends(ExchangesRedPacketUI, _super);
    function ExchangesRedPacketUI() {
        return _super.call(this) || this;
    }
    return ExchangesRedPacketUI;
}(eui.Component));
__reflect(ExchangesRedPacketUI.prototype, "ExchangesRedPacketUI");
//# sourceMappingURL=ExchangeRedPacketView.js.map