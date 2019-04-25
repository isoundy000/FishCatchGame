var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BagViewItem = (function (_super) {
    __extends(BagViewItem, _super);
    function BagViewItem(itemId, count, select) {
        if (select === void 0) { select = false; }
        var _this = _super.call(this) || this;
        _this._itemId = itemId;
        _this._count = count;
        _this._selected = select;
        return _this;
    }
    BagViewItem.prototype.init = function () {
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
            var userModel = burn.Director.getModelByKey(UserModel);
            var vo = game.table.T_Item_Table.getVoByKey(self._itemId);
            if (self._itemId == userModel.getCurGunBgId()
                || self._itemId == userModel.getCurSkinId()) {
                self.equipState.visible = true;
                self.numBg.visible = true;
            }
            else {
                if (vo.type == BagItemType.BATTERY
                    || vo.type == BagItemType.BARBETTE) {
                    self.numBg.visible = false;
                }
            }
            if (vo.type == BagItemType.BATTERY
                || vo.type == BagItemType.BARBETTE) {
                self.countTxt.visible = false;
            }
            self.selected(self._selected);
        }, this);
    };
    BagViewItem.prototype.initAutoGun = function () {
        var _this = this;
        var self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", function () {
            self.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
            var txtr = "ZiDong_png";
            RES.getResAsync(txtr, function () {
                var txture = RES.getRes(txtr);
                var icon = new egret.Bitmap(txture);
                if (!icon) {
                    return;
                }
                icon.anchorOffsetX = icon.width / 2;
                icon.anchorOffsetY = icon.height / 2;
                icon.x = self.itemBg.width / 2;
                icon.y = self.itemBg.height / 2;
                self.itemBg.addChild(icon);
                self.countTxt.text = "自动开炮";
            }, _this);
        }, this);
    };
    BagViewItem.prototype.selected = function (flag) {
        if (flag) {
            this.selectedBg.visible = true;
        }
        else {
            this.selectedBg.visible = false;
        }
    };
    BagViewItem.prototype.setNull = function () {
        this.itemBg.visible = false;
        this.numBg.visible = false;
        this.countTxt.visible = false;
    };
    BagViewItem.prototype.getItemId = function () {
        return this._itemId;
    };
    return BagViewItem;
}(eui.Component));
__reflect(BagViewItem.prototype, "BagViewItem");
//# sourceMappingURL=BagViewItem.js.map