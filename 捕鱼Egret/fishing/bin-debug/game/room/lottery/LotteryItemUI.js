var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var room;
(function (room) {
    /**
     * 抽奖item
     */
    var LotteryItemUI = (function (_super) {
        __extends(LotteryItemUI, _super);
        function LotteryItemUI(itemId, count) {
            var _this = _super.call(this) || this;
            _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/LotteryItem.exml";
            _this.setData(itemId, count);
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            return _this;
        }
        LotteryItemUI.prototype.setData = function (itemId, count) {
            var itemVo = game.table.T_Item_Table.getVoByKey(itemId);
            this.name_txt.text = game.util.Language.getText(itemVo.name);
            if (itemVo.id == PropEnum.FISH_TICKIT) {
                this.count_txt.text = count / 10 + "元";
            }
            else {
                this.count_txt.text = String(count);
            }
            var self = this;
            game.util.IconUtil.getIconByIdAsync(IconType.PROP, itemVo.id, function (icon) {
                if (!icon) {
                    return;
                }
                var child = self.getChildByName("icon_lottery");
                child && self.removeChild(child);
                icon.width = 90;
                icon.height = 90;
                icon.anchorOffsetX = icon.width / 2;
                icon.anchorOffsetY = icon.height / 2;
                icon.x = icon.width / 2 + 35;
                icon.y = icon.height / 2 + 54;
                icon.name = "icon_lottery";
                self.addChildAt(icon, 2);
            });
        };
        return LotteryItemUI;
    }(eui.Component));
    room.LotteryItemUI = LotteryItemUI;
    __reflect(LotteryItemUI.prototype, "room.LotteryItemUI");
})(room || (room = {}));
//# sourceMappingURL=LotteryItemUI.js.map