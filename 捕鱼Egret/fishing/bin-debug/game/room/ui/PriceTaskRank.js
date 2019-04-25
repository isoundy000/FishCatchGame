var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//PriceTaskUI
/** 悬赏任务 第几名 UI */
var PriceTaskRankUI = (function (_super) {
    __extends(PriceTaskRankUI, _super);
    function PriceTaskRankUI(nRank) {
        var _this = _super.call(this) || this;
        _this._nRank = nRank;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/price/PriceTaskRank.exml", function () {
            _this.init();
        }, _this);
        return _this;
    }
    PriceTaskRankUI.prototype.init = function () {
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/price/PriceTaskRank.exml";
        this.rankLab.text = this._nRank + "";
        this.rankLab.anchorOffsetX = this.rankLab.width / 2;
        this.rankLab.anchorOffsetY = this.rankLab.height / 2;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    /** 销毁函数 */
    PriceTaskRankUI.prototype.destroy = function () {
        this.parent && this.parent.removeChild(this);
    };
    return PriceTaskRankUI;
}(eui.Component));
__reflect(PriceTaskRankUI.prototype, "PriceTaskRankUI");
//# sourceMappingURL=PriceTaskRank.js.map