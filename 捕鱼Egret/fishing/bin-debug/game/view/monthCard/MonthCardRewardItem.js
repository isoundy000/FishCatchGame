var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MonthCardRewardItem = (function (_super) {
    __extends(MonthCardRewardItem, _super);
    function MonthCardRewardItem(itemId, count) {
        var _this = _super.call(this) || this;
        _this._itemId = itemId;
        _this._count = count;
        return _this;
    }
    MonthCardRewardItem.prototype.init = function () {
        var self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", function () {
            self.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
            game.util.IconUtil.getIconByIdAsync(IconType.PROP, self._itemId, function (icon) {
                if (!icon) {
                    return;
                }
                icon.width = 100;
                icon.height = 100;
                icon.anchorOffsetX = icon.width / 2;
                icon.anchorOffsetY = icon.height / 2;
                icon.x = self.itemBg.width / 2;
                icon.y = self.itemBg.height / 2;
                self.itemBg.addChild(icon);
                if (self._itemId == PropEnum.FISH_TICKIT) {
                    self.countTxt.text = self._count / 10 + "元";
                }
                else {
                    //道具数量
                    self.countTxt.text = "x" + self._count;
                }
            });
        }, this);
    };
    MonthCardRewardItem.prototype.getItemId = function () {
        return this._itemId;
    };
    MonthCardRewardItem.prototype.destroy = function () {
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml");
    };
    return MonthCardRewardItem;
}(eui.Component));
__reflect(MonthCardRewardItem.prototype, "MonthCardRewardItem");
//# sourceMappingURL=MonthCardRewardItem.js.map