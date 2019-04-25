var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeSureView = (function (_super) {
    __extends(ExchangeSureView, _super);
    function ExchangeSureView() {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        return _this;
    }
    ExchangeSureView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new ExchangesSureUI();
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
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeItem.exml", this.loadItem, this);
        this._uiDisplay.name_Edit.alpha = 0.4;
        this._uiDisplay.phone_Edit.alpha = 0.4;
        this._uiDisplay.qq_Edit.alpha = 0.4;
        this._uiDisplay.add_Edit.alpha = 0.4;
        this._uiDisplay.name_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this._uiDisplay.phone_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this._uiDisplay.qq_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this._uiDisplay.add_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
    };
    ExchangeSureView.prototype.loadItem = function (clazz, url) {
        this.send(NotifyEnum.EXCHANGE_SURE_LOADED);
    };
    ExchangeSureView.prototype.setOption = function (nId) {
        var exchangeModel = burn.Director.getModelByKey(ExchangeModel);
        var vo = exchangeModel.getListById(nId);
        this._nId = nId;
        var item = new ExchangeItemUI();
        item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeItem.exml";
        item.setData(vo);
        item.setType();
        item.anchorOffsetX = item.width / 2;
        item.anchorOffsetY = item.height / 2;
        this._uiDisplay.itemGroup.addChild(item);
        this._uiDisplay.exchangeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExchange, this);
        this._uiDisplay.psLab.text = game.util.Language.getText(66);
        this.oldName = this._uiDisplay.name_Edit.text;
        this.oldAdd = this._uiDisplay.add_Edit.text;
    };
    ExchangeSureView.prototype.onExchange = function (e) {
        var strName = this._uiDisplay.name_Edit.text;
        var strPhone = this._uiDisplay.phone_Edit.text;
        var strQQ = this._uiDisplay.qq_Edit.text;
        var strAdd = this._uiDisplay.add_Edit.text;
        if (strName.trim() == "" || this.oldName == strName.trim()) {
            game.util.GameUtil.popTips(game.util.Language.getText(72));
            return;
        }
        if (strAdd.trim() == "" || this.oldAdd == strAdd.trim()) {
            game.util.GameUtil.popTips(game.util.Language.getText(73));
            return;
        }
        var judgePhone = /^1\d{10}$/;
        var reg = new RegExp("^[0-9a-zA-Z]*$");
        if (!judgePhone.test(strPhone)) {
            game.util.GameUtil.popTips(game.util.Language.getText(2455));
            return;
        }
        if (!reg.test(strQQ)) {
            game.util.GameUtil.popTips(game.util.Language.getText(70));
            return;
        }
        var self = this;
        var strTips = "姓名:" + strName + "\n";
        strTips += "电话" + strPhone + "\n";
        strTips += "QQ:" + strQQ + "\n";
        strTips += "地址:" + strAdd + "\n";
        strTips += "您确认兑换吗?";
        game.util.GameUtil.openConfirmByTwoButton(null, function () {
            var req = new ExchangeSendMessage();
            req.initData();
            req.setGoodsId(self._nId);
            req.setReceiverName(strName);
            req.setReceiverPhone(strPhone);
            req.setReceiverQQ(strQQ);
            req.setReceiverAddress(strAdd);
            NetManager.send(req);
            self.onClosttButtonClick(null);
        }, this, strTips);
    };
    ExchangeSureView.prototype.onChange = function (e) {
        e.target.text = "";
        e.target.alpha = 1;
    };
    /**关闭游戏 */
    ExchangeSureView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    ExchangeSureView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeSure.exml", this.addBgResource, this);
    };
    ExchangeSureView.prototype.destroy = function () {
        var self = this;
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self._uiDisplay.exchangeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onExchange, self);
            self._uiDisplay.name_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            self._uiDisplay.phone_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            self._uiDisplay.qq_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            self._uiDisplay.add_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            self.parent && self.parent.removeChild(self);
        });
    };
    return ExchangeSureView;
}(burn.view.PopView));
__reflect(ExchangeSureView.prototype, "ExchangeSureView");
/***操作UI的对应类 */
var ExchangesSureUI = (function (_super) {
    __extends(ExchangesSureUI, _super);
    function ExchangesSureUI() {
        return _super.call(this) || this;
    }
    return ExchangesSureUI;
}(eui.Component));
__reflect(ExchangesSureUI.prototype, "ExchangesSureUI");
//# sourceMappingURL=ExchangeSureView.js.map