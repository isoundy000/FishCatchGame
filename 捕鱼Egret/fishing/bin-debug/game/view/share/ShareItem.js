var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShareItem = (function (_super) {
    __extends(ShareItem, _super);
    function ShareItem() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/share/shareGainItem.exml";
        return _this;
    }
    ShareItem.prototype.init = function (shareData) {
        var self = this;
        this.desc.text = game.util.Language.getText(Number(shareData.dec));
        var txtr = "shareType_" + shareData.type + "_png";
        RES.getResAsync(txtr, function () {
            var txture = RES.getRes(txtr);
            var img = new egret.Bitmap(txture);
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
            this.iconGroup.addChild(img);
        }, this);
    };
    return ShareItem;
}(eui.Component));
__reflect(ShareItem.prototype, "ShareItem");
//# sourceMappingURL=ShareItem.js.map