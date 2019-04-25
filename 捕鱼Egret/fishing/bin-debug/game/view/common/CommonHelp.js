var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var CommonHelpView = (function (_super) {
    __extends(CommonHelpView, _super);
    function CommonHelpView(parent, id) {
        var _this = _super.call(this) || this;
        _this._parentView = parent;
        _this._str = game.util.Language.getText(game.table.T_Desc_Table.getVoByKey(id).descVip);
        var strW_H = game.table.T_Desc_Table.getVoByKey(id).descW_H.split("_");
        _this._containW = Number(strW_H[0]);
        _this._containH = Number(strW_H[1]);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/commonHelp/CommonHelpUI.exml", _this.loaded, _this);
        return _this;
    }
    CommonHelpView.prototype.loaded = function (clazz, url) {
        this.skinName = clazz;
        game.util.UIUtil.popView(this.root);
        this.root.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        this.contain.width = this._containW;
        this.contain.height = this._containH;
        this.bgInner.width = this._containW + 30;
        this.bgInner.height = this._containH + 30;
        this.bg.width = this._containW + 60;
        this.bg.height = this._containH + 60;
        var contentTxt = new egret.TextField();
        contentTxt.textAlign = egret.HorizontalAlign.LEFT;
        contentTxt.textFlow = (new egret.HtmlTextParser).parser(this._str);
        contentTxt.touchEnabled = false;
        contentTxt.lineSpacing = 16;
        contentTxt.width = this._containW;
        contentTxt.height = this._containH;
        this.contain.addChild(contentTxt);
    };
    /**确定按钮 */
    CommonHelpView.prototype.onOKButtonClick = function (e) {
        if (this._parentView) {
            this._parentView.removeChild(this);
            burn._Notification_.send(NotifyEnum.CHECK_POP);
        }
    };
    CommonHelpView.prototype.destroy = function () {
        var _this = this;
        game.util.UIUtil.closeView(this.root, function () {
            _this.parent && _this.parent.removeChild(_this);
            _this.root.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOKButtonClick, _this);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/commonHelp/CommonHelpUI.exml");
        });
    };
    return CommonHelpView;
}(eui.Component));
__reflect(CommonHelpView.prototype, "CommonHelpView");
//# sourceMappingURL=CommonHelp.js.map