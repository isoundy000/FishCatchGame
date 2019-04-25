var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 公告UI界面View
 */
var NoticeView = (function (_super) {
    __extends(NoticeView, _super);
    function NoticeView() {
        var _this = _super.call(this) || this;
        _this._itemList = new Array();
        return _this;
    }
    NoticeView.prototype.initView = function (callback) {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/notice/NoticeUI.exml", this.addUIResource, this);
        this._callback = callback;
    };
    NoticeView.prototype.addUIResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this._ui = new NoticeViewUI();
        this._ui.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/notice/NoticeUI.exml";
        this._ui.horizontalCenter = 0;
        this._ui.verticalCenter = 0;
        uiLayer.addChild(this._ui);
        this.addChild(uiLayer);
        this._ui.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeEvent, this);
        this._callback && this._callback();
    };
    NoticeView.prototype.setNoticeData = function (data) {
        if (data.length == 0) {
            burn.Director.popView();
            return;
        }
        this._ui.left_group.removeChildren();
        for (var i = 0; i < data.length; i++) {
            if (i == 0) {
                var item = new NoticeTitleItemView(data[i].orders, data[i].title, true);
                this.setContent(data[i].title, data[i].content);
                this._ui.left_group.addChild(item);
                this._itemList.push(item);
            }
            else {
                var item = new NoticeTitleItemView(data[i].orders, data[i].title, false);
                this._ui.left_group.addChild(item);
                this._itemList.push(item);
            }
        }
        var tLayout = new eui.VerticalLayout();
        tLayout.paddingLeft = 0;
        tLayout.paddingRight = 0;
        this._ui.left_group.layout = tLayout;
        if (this._ui.left_scroller.verticalScrollBar) {
            this._ui.left_scroller.verticalScrollBar.autoVisibility = false;
        }
    };
    /** 设置右侧面板公告内容 */
    NoticeView.prototype.setContent = function (title, str) {
        this._ui.right_group.removeChildren();
        var titleGroup = new eui.Group();
        var contentGroup = new eui.Group();
        var W = 595;
        this._tx = new egret.TextField();
        this._tx.textAlign = egret.HorizontalAlign.CENTER;
        this._tx.text = title;
        this._tx.size = 33;
        this._tx.bold = true;
        titleGroup.addChild(this._tx);
        titleGroup.width = W;
        this._tx.width = W;
        titleGroup.height = this._tx.height;
        this._contentTxt = new egret.TextField();
        this._contentTxt.textAlign = egret.HorizontalAlign.LEFT;
        this._contentTxt.textFlow = (new egret.HtmlTextParser).parser(str);
        this._contentTxt.touchEnabled = false;
        this._contentTxt.lineSpacing = 16;
        contentGroup.addChild(this._contentTxt);
        contentGroup.width = W;
        this._contentTxt.width = W;
        contentGroup.height = this._contentTxt.height;
        this._ui.right_group.addChild(titleGroup);
        this._ui.right_group.addChild(contentGroup);
        var tLayout = new eui.VerticalLayout();
        tLayout.paddingLeft = 20;
        tLayout.paddingRight = 20;
        this._ui.right_group.layout = tLayout;
    };
    NoticeView.prototype.clickItem = function (id, title, content) {
        for (var i = 0; i < this._itemList.length; i++) {
            if (id == this._itemList[i].getId()) {
                this._itemList[i].setSelected(true);
            }
            else {
                this._itemList[i].setSelected(false);
            }
        }
        this.setContent(title, content);
    };
    NoticeView.prototype.closeEvent = function (evt) {
        burn.Director.popView();
    };
    /**
     * 销毁函数
     */
    NoticeView.prototype.destroy = function () {
        this._itemList = null;
        this._ui.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeEvent, this);
        this.removeChildren();
        this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/notice/NoticeUI.exml");
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/notice/NoticeItemBtnUI.exml");
    };
    return NoticeView;
}(burn.view.FullView));
__reflect(NoticeView.prototype, "NoticeView");
var NoticeViewUI = (function (_super) {
    __extends(NoticeViewUI, _super);
    function NoticeViewUI() {
        return _super.call(this) || this;
    }
    return NoticeViewUI;
}(eui.Component));
__reflect(NoticeViewUI.prototype, "NoticeViewUI");
//# sourceMappingURL=NoticeView.js.map