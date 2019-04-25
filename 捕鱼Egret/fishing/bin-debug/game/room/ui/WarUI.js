var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//WarUI
var WarView = (function (_super) {
    __extends(WarView, _super);
    function WarView() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/WarGroup.exml";
        return _this;
    }
    /** 销毁函数 */
    WarView.prototype.destroy = function () {
    };
    return WarView;
}(eui.Component));
__reflect(WarView.prototype, "WarView");
//# sourceMappingURL=WarUI.js.map