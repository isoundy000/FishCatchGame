var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GunShopItemView = (function (_super) {
    __extends(GunShopItemView, _super);
    function GunShopItemView(type, id, itemId, priceType, price, num) {
        var _this = _super.call(this) || this;
        _this._type = type;
        _this._id = id;
        _this._itemId = itemId;
        _this._priceType = priceType;
        _this._price = price;
        _this._num = num;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/GunShopItem.exml";
        _this._btnWrapList = new Array();
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/GunShopItem.exml", _this.addResource, _this);
        return _this;
    }
    //UI加载完成
    GunShopItemView.prototype.addResource = function (clazz, url) {
        var self = this;
        var priceName = game.util.Language.getText(game.table.T_Item_Table.getVoByKey(this._priceType).name);
        if (this._type == 3) {
            game.util.IconUtil.getIconByIdAsync(IconType.PROP, this._itemId, function (icon) {
                if (icon) {
                    icon.anchorOffsetX = icon.width >> 1;
                    icon.anchorOffsetY = icon.height + 20;
                    self.icon_point.addChild(icon);
                }
            });
            this.desTxt.text = "x" + this._num;
            var itemVo = game.table.T_Item_Table.getVoByKey(this._itemId);
            this.item_name.text = game.util.Language.getText(itemVo.name);
            this.priceTxt.text = this._price + priceName;
        }
        else if (this._type == 1) {
            game.util.IconUtil.getIconByIdAsync(IconType.PAO, this._itemId, function (icon) {
                if (icon) {
                    icon.anchorOffsetX = icon.width >> 1;
                    icon.anchorOffsetY = icon.height - 17;
                    self.icon_point.addChild(icon);
                }
            });
            this.desTxt.text = "x" + this._num;
            var itemVo = game.table.T_Item_Table.getVoByKey(this._itemId);
            this.item_name.text = game.util.Language.getText(itemVo.name);
            this.priceTxt.text = this._price + priceName;
            this.priceTxt.y -= 100;
            this.timeImg.visible = true;
            this.desTxt.visible = false;
        }
        else if (this._type == 2) {
            game.util.IconUtil.getIconByIdAsync(IconType.PAOBG, this._itemId, function (icon) {
                if (icon) {
                    icon.anchorOffsetX = icon.width >> 1;
                    icon.anchorOffsetY = icon.height;
                    self.icon_point.addChild(icon);
                }
            });
            this.desTxt.text = "x" + this._num;
            var itemVo = game.table.T_Item_Table.getVoByKey(this._itemId);
            this.item_name.text = game.util.Language.getText(itemVo.name);
            this.priceTxt.text = this._price + priceName;
            this.priceTxt.y -= 100;
            this.timeImg.visible = true;
            this.desTxt.visible = false;
        }
        this.buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtn, this);
        this._btnWrapList.push(new burn.tools.UIWrap(this.buy));
        var userModle = burn.Director.getModelByKey(UserModel);
        var itemObj = new game.model.Item(this._itemId, 1, 0);
        if (userModle.isExist(itemObj) && this._type != 3) {
            this.xufeiIcon.visible = true;
            this.buyIcon.visible = false;
        }
        else {
            this.xufeiIcon.visible = false;
            this.buyIcon.visible = true;
        }
    };
    GunShopItemView.prototype.onBuyBtn = function (e) {
        burn._Notification_.send(NotifyEnum.SHOP_BUY_ITEM, { itemId: this._id });
    };
    return GunShopItemView;
}(eui.Component));
__reflect(GunShopItemView.prototype, "GunShopItemView");
//# sourceMappingURL=GunShopItemView.js.map