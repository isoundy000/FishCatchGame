var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ActiveSurePanel = (function (_super) {
    __extends(ActiveSurePanel, _super);
    function ActiveSurePanel(parent, id) {
        var _this = _super.call(this) || this;
        _this._parentView = parent;
        _this._id = id;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/ActiveSure.exml", _this.loaded, _this);
        return _this;
    }
    ActiveSurePanel.prototype.loaded = function () {
        var _this = this;
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/ActiveSure.exml";
        game.util.UIUtil.popView(this.root);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        this.goldGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGold, this);
        this.activeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onActive, this);
        var vo = game.table.T_SecretShop_Table.getVoByKey(this._id);
        var goodsStr = vo.goods;
        var datas = goodsStr.split("_");
        var self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", function () {
            var showItem = new BagViewItem(Number(datas[0]), Number(datas[1]));
            showItem.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
            showItem.anchorOffsetX = showItem.width / 2;
            showItem.anchorOffsetY = showItem.height / 2;
            showItem.init();
            _this.iconGroup.addChild(showItem);
        }, this);
        var voGoods = game.table.T_Item_Table.getVoByKey(Number(datas[0]));
        this.iconLab.text = game.util.Language.getText(voGoods.name) + "x" + datas[1];
        var priceStr = vo.price.split(",");
        var price1 = priceStr[0].split("_");
        var price2 = priceStr[1].split("_");
        this.goldLab.text = price1[1];
        this.goldLab.textAlign = egret.HorizontalAlign.CENTER;
        this.activeLab.text = price2[1];
        this.activeLab.textAlign = egret.HorizontalAlign.CENTER;
    };
    ActiveSurePanel.prototype.onGold = function (e) {
        var activeModel = burn.Director.getModelByKey(ActiveModel);
        var userModel = burn.Director.getModelByKey(UserModel);
        var type = Active_Type.LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP;
        var item = activeModel.getActiveObjByType(type);
        var send = new LimitedTimeActiveSendMessage();
        send.initData();
        send.setState(1);
        send.setId(item._id);
        send.setGoodsId(this._id);
        send.setPriceIndex(0);
        NetManager.send(send);
        // 发消息
        this.onOKButtonClick(null);
    };
    ActiveSurePanel.prototype.onActive = function (e) {
        var activeModel = burn.Director.getModelByKey(ActiveModel);
        var userModel = burn.Director.getModelByKey(UserModel);
        var type = Active_Type.LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP;
        var item = activeModel.getActiveObjByType(type);
        var send = new LimitedTimeActiveSendMessage();
        send.initData();
        send.setState(1);
        send.setId(item._id);
        send.setGoodsId(this._id);
        send.setPriceIndex(1);
        NetManager.send(send);
        //发消息
        this.onOKButtonClick(null);
    };
    /**确定按钮 */
    ActiveSurePanel.prototype.onOKButtonClick = function (e) {
        var _this = this;
        if (this._parentView) {
            game.util.UIUtil.closeView(this.root, function () {
                _this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOKButtonClick, _this);
                _this.goldGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGold, _this);
                _this.activeGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.onActive, _this);
                _this._parentView.removeChild(_this);
            });
        }
    };
    return ActiveSurePanel;
}(eui.Component));
__reflect(ActiveSurePanel.prototype, "ActiveSurePanel");
//# sourceMappingURL=ActiveSurePanel.js.map