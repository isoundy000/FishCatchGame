var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChangeGunView = (function (_super) {
    __extends(ChangeGunView, _super);
    function ChangeGunView() {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        game.util.UIUtil.startLoading();
        return _this;
    }
    ChangeGunView.prototype.addBgResource = function (clazz, url) {
        var _this = this;
        game.util.UIUtil.closeLoading();
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new ChangeGunUI();
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
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/changeGun/ChangeGunItem.exml", function () {
            _this.send(NotifyEnum.CHANGE_GUN_UI_LOADED);
        }, this);
    };
    ChangeGunView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/changeGun/ChangeGun.exml", this.addBgResource, this);
    };
    ChangeGunView.prototype.showList = function (arr) {
        var childNum = this._uiDisplay.listGroup.numChildren;
        for (var i = 0; i < childNum; i++) {
            var child = this._uiDisplay.listGroup.getElementAt(i);
            child.clearItem();
        }
        this._uiDisplay.listGroup.removeChildren();
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var itemDown = new ChangeGunItemItem();
            itemDown.setData(arr[i]);
            this._uiDisplay.listGroup.addChild(itemDown);
        }
        var tLayout = new eui.HorizontalLayout();
        this._uiDisplay.listGroup.layout = tLayout; /// 网格布局
    };
    /**关闭游戏 */
    ChangeGunView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    ChangeGunView.prototype.destroy = function () {
        var _this = this;
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (_this._btnWrapList.length > 0) {
                var wrap = _this._btnWrapList.pop();
                wrap.destroy();
            }
            _this._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClosttButtonClick, _this);
            _this.parent && _this.parent.removeChild(_this);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/changeGun/ChangeGun.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/changeGun/ChangeGunItem.exml");
        });
    };
    return ChangeGunView;
}(burn.view.PopView));
__reflect(ChangeGunView.prototype, "ChangeGunView");
/***操作UI的对应类 */
var ChangeGunUI = (function (_super) {
    __extends(ChangeGunUI, _super);
    function ChangeGunUI() {
        return _super.call(this) || this;
    }
    return ChangeGunUI;
}(eui.Component));
__reflect(ChangeGunUI.prototype, "ChangeGunUI");
//# sourceMappingURL=ChangeGunView.js.map