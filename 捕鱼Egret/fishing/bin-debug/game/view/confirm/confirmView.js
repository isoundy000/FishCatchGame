var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var ConfirmView = (function (_super) {
    __extends(ConfirmView, _super);
    function ConfirmView(fun) {
        if (fun === void 0) { fun = null; }
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        _this._pCall = fun;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Confirm.exml", _this.addResources, _this);
        return _this;
    }
    ConfirmView.prototype.addResources = function (claz, url) {
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Confirm.exml";
        var closeBtn = this.closeBtn;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        //关闭当前界面
        var okBtn = this.okBtn;
        okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        var cancleBtn = this.cancleBtn;
        cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        var okOneBtn = this.okOneBtn;
        okOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this.closeBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this.okOneBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this.cancleBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this.okBtn));
        this._pCall && this._pCall();
    };
    /**
     *
    //回调函数
    private _callFun:Function;
    //回调对象
    private _callObj:any;
     */
    ConfirmView.prototype.setOkCallFun = function (callFun, obj, parent) {
        this._callFun = callFun;
        this._callObj = obj;
        this._parentView = parent;
    };
    ConfirmView.prototype.setTips = function (str) {
        this.showTips.text = str;
    };
    ConfirmView.prototype.setGroupTwo = function () {
        this.twoGroup.visible = true;
        this.oneGroup.visible = false;
    };
    ConfirmView.prototype.setGroupOne = function () {
        this.twoGroup.visible = false;
        this.oneGroup.visible = true;
    };
    ConfirmView.prototype.initView = function () {
    };
    /**关闭游戏 */
    ConfirmView.prototype.onClosttButtonClick = function (e) {
        if (this._parentView) {
            this._parentView.removeChild(this);
        }
    };
    /**确定按钮 */
    ConfirmView.prototype.onOKButtonClick = function (e) {
        if (this._callFun && this._callObj) {
            this._callFun(this._callObj);
        }
        if (this._parentView) {
            this._parentView.removeChild(this);
        }
    };
    ConfirmView.prototype.onOKClickNoClose = function (e) {
        if (this._callFun && this._callObj) {
            this._callFun(this._callObj);
        }
    };
    ConfirmView.prototype.closePanel = function () {
        if (this._parentView) {
            this._parentView.removeChild(this);
        }
    };
    ConfirmView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        this.cancleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this.okOneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Confirm.exml");
    };
    return ConfirmView;
}(eui.Component));
__reflect(ConfirmView.prototype, "ConfirmView");
//# sourceMappingURL=confirmView.js.map