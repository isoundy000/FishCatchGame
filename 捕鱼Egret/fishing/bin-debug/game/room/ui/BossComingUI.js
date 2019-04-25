var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BossComingUI = (function (_super) {
    __extends(BossComingUI, _super);
    function BossComingUI() {
        return _super.call(this) || this;
    }
    BossComingUI.prototype.setData = function (name, rate) {
        var nametr = RES.getRes(name);
        var ratetr = RES.getRes(rate);
        var name1 = new egret.Bitmap(nametr);
        name1.anchorOffsetX = name1.width;
        name1.anchorOffsetY = name1.height;
        this.name_1.addChild(name1);
        var rate1 = new egret.Bitmap(ratetr);
        rate1.anchorOffsetX = rate1.width;
        rate1.anchorOffsetY = rate1.height;
        this.rate_1.addChild(rate1);
        var name2 = new egret.Bitmap(nametr);
        name2.anchorOffsetX = name2.width;
        name2.anchorOffsetY = name2.height;
        this.name_2.addChild(name2);
        var rate2 = new egret.Bitmap(ratetr);
        rate2.anchorOffsetX = rate2.width;
        rate2.anchorOffsetY = rate2.height;
        this.rate_2.addChild(rate2);
        var name3 = new egret.Bitmap(nametr);
        name3.anchorOffsetX = name3.width;
        name3.anchorOffsetY = name3.height;
        this.name_3.addChild(name3);
        var rate3 = new egret.Bitmap(ratetr);
        rate3.anchorOffsetX = rate3.width;
        rate3.anchorOffsetY = rate3.height;
        this.rate_3.addChild(rate3);
    };
    return BossComingUI;
}(eui.Component));
__reflect(BossComingUI.prototype, "BossComingUI");
//# sourceMappingURL=BossComingUI.js.map