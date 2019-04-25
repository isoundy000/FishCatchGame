var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShareGainView = (function (_super) {
    __extends(ShareGainView, _super);
    function ShareGainView() {
        var _this = _super.call(this) || this;
        game.util.ReyunUtil.sendEvent(game.util.LogEnum.CHECK_FISH_FUN_COUNT);
        _this._btnWrapList = new Array();
        return _this;
    }
    ShareGainView.prototype.addBgResource = function (clazz, url) {
        var _this = this;
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new ShareGainCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //关闭当前界面
        this._uiDisplay.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/share/ShareGainItemB.exml", function () {
            _this.send(NotifyEnum.SHARE_GAIN_UI_LOADED);
        }, this);
    };
    ShareGainView.prototype.showList = function (list) {
        this._uiDisplay.llistGroup.removeChildren();
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var item = new ShareGainItem();
            item.init(list[i]);
            item.lingqu.name = list[i].getMailId() + "";
            item.lingqu.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
            this._uiDisplay.llistGroup.addChild(item);
        }
        var tLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingBottom = 20;
        this._uiDisplay.llistGroup.layout = tLayout; /// 网格布局
    };
    ShareGainView.prototype.touchItemEvent = function (e) {
        var _this = this;
        var name = e.currentTarget.name;
        var emialModel = burn.Director.getModelByKey(EmailModel);
        var itemList = emialModel.getMailListById(Number(name));
        game.util.GameUtil.openEmailChakan(null, function () {
            _this.send(NotifyEnum.RECEIVE_MAIL_SEND, name);
        }, itemList.getMailContent(), itemList.getItems(), itemList.getState());
    };
    /**关闭游戏 */
    ShareGainView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    ShareGainView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/share/ShareGainUI.exml", this.addBgResource, this);
    };
    ShareGainView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/share/ShareGainUI.exml");
    };
    return ShareGainView;
}(burn.view.PopView));
__reflect(ShareGainView.prototype, "ShareGainView");
/***操作UI的对应类 */
var ShareGainCom = (function (_super) {
    __extends(ShareGainCom, _super);
    function ShareGainCom() {
        return _super.call(this) || this;
    }
    return ShareGainCom;
}(eui.Component));
__reflect(ShareGainCom.prototype, "ShareGainCom");
//# sourceMappingURL=ShareGainView.js.map