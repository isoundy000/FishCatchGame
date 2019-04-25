var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 道具商城中介者
 */
var ItemShopMediator = (function (_super) {
    __extends(ItemShopMediator, _super);
    function ItemShopMediator(view) {
        return _super.call(this, view, "ItemShopMediator") || this;
    }
    ItemShopMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
    };
    ItemShopMediator.prototype.init = function () {
        var _this = this;
        this.subscrib(NotifyEnum.SHOP_BUY_ITEM, this.buyItem);
        //监听服务器消息返回
        game.net.MessageDispatcher.register(game.net.ResponseType.SHOPBUYBACK, function (msg) {
            _this.shopBuyBack(msg);
        });
    };
    //购买物品
    ItemShopMediator.prototype.buyItem = function (obj, target) {
        var msg = new ShopBuyMessage();
        msg.initData();
        msg.setShopId(Number(obj.itemId));
        NetManager.send(msg);
    };
    //购买物品返回
    ItemShopMediator.prototype.shopBuyBack = function (msg) {
        var state = msg.getState();
        switch (state) {
            case 0:
                game.util.GameUtil.openConfirmByTwoButton(null, function () {
                    var chargeView = new ChargeView(ChargeType.Ticket);
                    var chargeMed = new ChargeMediator(chargeView);
                    burn.Director.pushView(chargeMed);
                }, this, game.util.Language.getText(204));
                break;
            case 1:
                game.util.GameUtil.popTips("购买成功");
                burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
                break;
            case 2:
                game.util.GameUtil.popTips("背包已满");
                break;
        }
        //添加到自己背包。重新设置shop
        burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
    };
    ItemShopMediator.prototype.destroy = function () {
        this.unsubscribByType(NotifyEnum.SHOP_BUY_ITEM);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.SHOPBUYBACK);
        this.getView().destroy();
    };
    return ItemShopMediator;
}(burn.mediator.SimpleMediator));
__reflect(ItemShopMediator.prototype, "ItemShopMediator");
//# sourceMappingURL=ItemShopMediator.js.map