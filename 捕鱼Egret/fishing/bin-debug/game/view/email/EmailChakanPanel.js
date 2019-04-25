var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var EmailChakanView = (function (_super) {
    __extends(EmailChakanView, _super);
    function EmailChakanView(strTips, callFun, parent, list, state) {
        var _this = _super.call(this) || this;
        _this._strTips = strTips;
        _this._callFun = callFun;
        _this._parentView = parent;
        _this._list = list;
        _this._state = state;
        _this._btnWrapList = new Array();
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/EmailChakanPanel.exml";
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", function () {
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/EmailChakanPanel.exml", _this.addBgResource, _this);
        }, _this);
        return _this;
    }
    EmailChakanView.prototype.addBgResource = function (clazz, url) {
        this.oneGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this.oneGroup));
        //
        this.setGroupOne();
        this.setTips(this._strTips);
        this.setOkCallFun(this._list);
        var state = this._state;
        /**	0:没领取/没查看
            1:已领取
            2:已查看 */
        var isEnd = false;
        var items = this._list;
        if (state == 0) {
            isEnd = false;
        }
        else {
            isEnd = true;
        }
        if (items.length > 0) {
            this.setLingqu(isEnd);
        }
        else {
            this.setChaKan(isEnd);
        }
    };
    EmailChakanView.prototype.setOkCallFun = function (list) {
        if (list && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var item = new BagViewItem(list[i].getItemId(), list[i].getCount());
                item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
                item.name = list[i].getItemId() + "";
                item.scaleX = item.scaleY = 0.95;
                item.init();
                this.scrolGroup.addChild(item);
            }
            var tLayout = new eui.HorizontalLayout();
            tLayout.gap = 10;
            tLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
            this.scrolGroup.layout = tLayout; /// 网格布局
            this.scrolGroup.anchorOffsetX = this.scrolGroup.width / 2;
            this.scrolGroup.anchorOffsetY = this.scrolGroup.height / 2;
        }
    };
    EmailChakanView.prototype.setChaKan = function (bEnd) {
        this.lingqu.visible = false;
        this.chakan.visible = true;
        if (bEnd) {
            this.imgYiChakan.visible = true;
            this.imgChakan.visible = false;
            this.endChakan.visible = true;
        }
        else {
            this.imgYiChakan.visible = false;
            this.imgChakan.visible = true;
            this.endChakan.visible = false;
        }
    };
    //领取按钮
    EmailChakanView.prototype.setLingqu = function (bEnd) {
        this.lingqu.visible = true;
        this.chakan.visible = false;
        if (bEnd) {
            this.imgYilingqu.visible = true;
            this.imgLingqu.visible = false;
            this.endLingqu.visible = true;
        }
        else {
            this.imgYilingqu.visible = false;
            this.imgLingqu.visible = true;
            this.endLingqu.visible = false;
        }
    };
    EmailChakanView.prototype.setTips = function (str) {
        this.showTips.text = str;
    };
    EmailChakanView.prototype.setGroupOne = function () {
        this.oneGroup.visible = true;
    };
    EmailChakanView.prototype.initView = function () {
    };
    /**关闭游戏 */
    EmailChakanView.prototype.onClosttButtonClick = function (e) {
        if (this._parentView) {
            this._parentView.removeChild(this);
        }
    };
    /**确定按钮 */
    EmailChakanView.prototype.onOKButtonClick = function (e) {
        if (this._callFun) {
            this._callFun();
        }
        if (this._parentView) {
            this._parentView.removeChild(this);
        }
    };
    EmailChakanView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this.oneGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        this.parent && this.parent.removeChild(this);
        console.log("LoginView destory!");
    };
    return EmailChakanView;
}(eui.Component));
__reflect(EmailChakanView.prototype, "EmailChakanView");
//# sourceMappingURL=EmailChakanPanel.js.map