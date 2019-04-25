var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WanbaGiftView = (function (_super) {
    __extends(WanbaGiftView, _super);
    function WanbaGiftView(state, itemList) {
        var _this = _super.call(this) || this;
        _this._state = state;
        _this._itemList = itemList;
        return _this;
    }
    WanbaGiftView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/qqZone/QZoneGift.exml", this.addUIResource, this);
    };
    WanbaGiftView.prototype.addUIResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this._ui = new WanbaGiftUI();
        this._ui.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/qqZone/QZoneGift.exml";
        this._ui.horizontalCenter = 0;
        this._ui.verticalCenter = 0;
        uiLayer.addChild(this._ui);
        this.addChild(uiLayer);
        //初始化文案
        if (this._state == 1) {
            this._ui.title_txt.text = "领取成功";
            this._ui.tips_txt.text = "恭喜你获得：";
        }
        else if (this._state == 2) {
            this._ui.title_txt.text = "每天只能领取一次哦";
            this._ui.tips_txt.text = "你今天已经领取过：";
        }
        var giftListStr = "";
        //显示道具列表
        for (var i = 0; i < this._itemList.length; i++) {
            var vo = this._itemList[i];
            var itemId = vo.itemId;
            var num = vo.totalCount;
            var itemVo = game.table.T_Item_Table.getVoByKey(itemId);
            var name_1 = game.util.Language.getText(itemVo.name);
            giftListStr += name_1 + " x " + num + "\n";
        }
        this._ui.gift_txt.text = giftListStr;
        this._ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", this.addList, this);
    };
    WanbaGiftView.prototype.addList = function (clazz, url) {
        //显示道具列表
        for (var i = 0; i < this._itemList.length; i++) {
            var vo = this._itemList[i];
            var itemId = vo.itemId;
            var num = vo.totalCount;
            var itemVo = game.table.T_Item_Table.getVoByKey(itemId);
            var name_2 = game.util.Language.getText(itemVo.name);
            var item = new BagViewItem(itemId, num, false);
            item.scaleX = item.scaleY = 0.9;
            item.skinName = clazz;
            item.init();
            this._ui.gift_grop.addChild(item);
        }
        var tLayout = new eui.HorizontalLayout();
        tLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this._ui.gift_grop.layout = tLayout; /// 网格布局
    };
    /** 关闭UI */
    WanbaGiftView.prototype.closeUI = function (e) {
        burn.Director.popView();
        this.send(NotifyEnum.CLOSE_QQZONE_GIFT);
    };
    /**
     * 销毁函数
     */
    WanbaGiftView.prototype.destroy = function () {
        var self = this;
        self.removeChildren();
        self.parent && self.parent.removeChild(self);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/qqZone/QZoneGift.exml");
    };
    return WanbaGiftView;
}(burn.view.FullView));
__reflect(WanbaGiftView.prototype, "WanbaGiftView");
var WanbaGiftUI = (function (_super) {
    __extends(WanbaGiftUI, _super);
    function WanbaGiftUI() {
        return _super.call(this) || this;
    }
    return WanbaGiftUI;
}(eui.Component));
__reflect(WanbaGiftUI.prototype, "WanbaGiftUI");
//# sourceMappingURL=WanbaGiftView.js.map