var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TrumpetView = (function (_super) {
    __extends(TrumpetView, _super);
    function TrumpetView() {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/trumpet/TrumpetUI.exml", _this.loadUIComplete, _this);
        return _this;
    }
    TrumpetView.prototype.loadUIComplete = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        this._trumpetUI = new TrumpetUIView();
        this._trumpetUI.skinName = clazz;
        this._trumpetUI.horizontalCenter = 0;
        this._trumpetUI.verticalCenter = 0;
        uiLayer.addChild(this._trumpetUI);
        this._trumpetUI.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._trumpetUI.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendButtonClick, this);
        this._btnWrapList.push(new burn.tools.UIWrap(this._trumpetUI.closeBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._trumpetUI.sendBtn));
        this._trumpetUI.input_txt.addEventListener(egret.Event.CHANGE, this.onChang, this);
        //输入限制提示
        this._trumpetUI.des_txt.text = game.util.Language.getText(205);
        this.setViewList();
    };
    TrumpetView.prototype.setViewList = function () {
        //显示聊天内容
        this._trumpetUI.itemList.removeChildren();
        var msgList = GlobalManager.getInstance().trumpetMsgList;
        for (var _i = 0, msgList_1 = msgList; _i < msgList_1.length; _i++) {
            var msg = msgList_1[_i];
            var container = new eui.Group();
            var tf = new egret.TextField();
            tf.text = game.util.Language.getText(221) + " " + msg;
            tf.width = 870;
            tf.textColor = 0xffe58c;
            container.addChild(tf);
            var shp = new egret.Shape();
            shp.graphics.lineStyle(2, 0xffffff);
            shp.graphics.moveTo(0, tf.height + 15);
            shp.graphics.lineTo(900, tf.height + 15);
            shp.graphics.endFill();
            shp.alpha = 0.5;
            container.addChild(shp);
            container.height = tf.height + 25;
            this._trumpetUI.itemList.addChild(container);
            container.cacheAsBitmap = true;
        }
        var tLayout = new eui.VerticalLayout();
        this._trumpetUI.itemList.layout = tLayout; //线性布局
    };
    TrumpetView.prototype.onChang = function (e) {
        var text = this._trumpetUI.input_txt.text;
        //最多显示30字
        if (text.length > 30) {
            text = text.substring(0, 30);
            this._trumpetUI.input_txt.text = text;
            game.util.GameUtil.popTips(game.util.Language.getText(205));
        }
    };
    TrumpetView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    TrumpetView.prototype.onSendButtonClick = function (e) {
        var text = this._trumpetUI.input_txt.text;
        if (text.length > 30) {
            text = text.substring(0, 30);
        }
        this._trumpetUI.input_txt.text = "";
        this.send(NotifyEnum.SEND_TRUMPET_MSG, text);
        burn.Director.popView();
    };
    TrumpetView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this.parent && this.parent.removeChild(this);
    };
    return TrumpetView;
}(burn.view.PopView));
__reflect(TrumpetView.prototype, "TrumpetView");
var TrumpetUIView = (function (_super) {
    __extends(TrumpetUIView, _super);
    function TrumpetUIView() {
        return _super.call(this) || this;
    }
    return TrumpetUIView;
}(eui.Component));
__reflect(TrumpetUIView.prototype, "TrumpetUIView");
//# sourceMappingURL=TrumpetView.js.map