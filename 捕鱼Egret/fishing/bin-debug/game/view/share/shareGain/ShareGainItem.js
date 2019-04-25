var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShareGainItem = (function (_super) {
    __extends(ShareGainItem, _super);
    function ShareGainItem() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/share/ShareGainItemB.exml";
        return _this;
    }
    ShareGainItem.prototype.init = function (data) {
        this.nameLab.text = data.getMailTitle();
        this.descLab.text = data.getMailContent();
        var time = Date.now();
        var emailTime = Date.parse(String(data.getTime()));
        var state = data.getState();
        /**	0:没领取/没查看
            1:已领取
            2:已查看 */
        var isEnd = false;
        var items = data.getItems();
        if (state == 0) {
            isEnd = false;
        }
        else {
            isEnd = true;
        }
        this.setLingqu(isEnd);
    };
    //领取按钮
    ShareGainItem.prototype.setLingqu = function (bEnd) {
        this.lingqu.visible = true;
        if (bEnd) {
            this.yilingqu.visible = true;
            this.lingqu.visible = false;
        }
        else {
            this.yilingqu.visible = false;
            this.lingqu.visible = true;
        }
    };
    return ShareGainItem;
}(eui.Component));
__reflect(ShareGainItem.prototype, "ShareGainItem");
//# sourceMappingURL=ShareGainItem.js.map