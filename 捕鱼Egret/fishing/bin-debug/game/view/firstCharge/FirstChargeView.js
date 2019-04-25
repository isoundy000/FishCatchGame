var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FirstChargeView = (function (_super) {
    __extends(FirstChargeView, _super);
    function FirstChargeView() {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._btnWrapList = new Array();
        return _this;
    }
    FirstChargeView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new FirstChargeCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        if (!this._bPop) {
            game.util.UIUtil.popView(this._uiDisplay.root);
            this._bPop = true;
        }
        //关闭当前界面
        var closeBtn = this._uiDisplay.btnClose;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.chargeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharge, this);
        //封装按钮chargeGroup
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.chargeGroup));
        this._uiDisplay.listGroup.removeChildren();
        var str = game.table.T_Config_Table.getVoByKey(53).value;
        var datas = str.split(",");
        var len = datas.length;
        for (var i = 0; i < len; i++) {
            var itemStr = datas[i].split("_");
            var itemId = Number(itemStr[0]);
            var itemCount = Number(itemStr[1]);
            var item_1 = new BagViewItem(itemId, itemCount);
            item_1.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
            item_1.init();
            this._uiDisplay.listGroup.addChild(item_1);
        }
        var item = new BagViewItem(1, 1);
        item.initAutoGun();
        this._uiDisplay.listGroup.addChild(item);
        var tLayout = new eui.HorizontalLayout();
        tLayout.gap = 50;
        tLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
        this._uiDisplay.listGroup.layout = tLayout; /// 网格布局
        this._uiDisplay.listGroup.anchorOffsetX = this._uiDisplay.listGroup.width / 2;
        this._uiDisplay.listGroup.anchorOffsetY = this._uiDisplay.listGroup.height / 2;
    };
    /**关闭游戏 */
    FirstChargeView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    FirstChargeView.prototype.onCharge = function (e) {
        burn.Director.popView();
        var chargeView = new ChargeView(ChargeType.Ticket);
        var chargeMed = new ChargeMediator(chargeView);
        burn.Director.pushView(chargeMed);
    };
    FirstChargeView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/firstCharge/firstChargeUI.exml", this.addBgResource, this);
    };
    FirstChargeView.prototype.destroy = function () {
        var self = this;
        this._bPop = false;
        //关闭UI动画
        game.util.UIUtil.closeView(self._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self._uiDisplay.chargeGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onCharge, self);
            self.parent && self.parent.removeChild(self);
            self.send(NotifyEnum.CHECK_POP);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/firstCharge/firstChargeUI.exml");
        });
    };
    return FirstChargeView;
}(burn.view.PopView));
__reflect(FirstChargeView.prototype, "FirstChargeView");
/***操作UI的对应类 */
var FirstChargeCom = (function (_super) {
    __extends(FirstChargeCom, _super);
    function FirstChargeCom() {
        return _super.call(this) || this;
    }
    return FirstChargeCom;
}(eui.Component));
__reflect(FirstChargeCom.prototype, "FirstChargeCom");
//# sourceMappingURL=FirstChargeView.js.map