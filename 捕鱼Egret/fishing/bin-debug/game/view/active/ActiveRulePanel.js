var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ActiveRulePanel = (function (_super) {
    __extends(ActiveRulePanel, _super);
    function ActiveRulePanel(parent) {
        var _this = _super.call(this) || this;
        _this._parentView = parent;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/ActiveReul.exml", _this.loaded, _this);
        return _this;
    }
    ActiveRulePanel.prototype.loaded = function () {
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/ActiveReul.exml";
        game.util.UIUtil.popView(this.root);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        var contentTxt = new egret.TextField();
        contentTxt.textAlign = egret.HorizontalAlign.LEFT;
        contentTxt.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(178).value);
        contentTxt.touchEnabled = false;
        contentTxt.lineSpacing = 16;
        contentTxt.width = this.contain.width;
        contentTxt.height = this.contain.height;
        this.contain.addChild(contentTxt);
    };
    /**确定按钮 */
    ActiveRulePanel.prototype.onOKButtonClick = function (e) {
        var _this = this;
        if (this._parentView) {
            game.util.UIUtil.closeView(this.root, function () {
                _this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOKButtonClick, _this);
                _this._parentView.removeChild(_this);
            });
        }
    };
    return ActiveRulePanel;
}(eui.Component));
__reflect(ActiveRulePanel.prototype, "ActiveRulePanel");
//# sourceMappingURL=ActiveRulePanel.js.map