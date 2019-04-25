var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChargeItemUI = (function (_super) {
    __extends(ChargeItemUI, _super);
    function ChargeItemUI() {
        return _super.call(this) || this;
    }
    ChargeItemUI.prototype.setData = function (data) {
        var _this = this;
        if (!data) {
            return;
        }
        this._nChargeID = data.id;
        var userModel = burn.Director.getModelByKey(UserModel);
        this.sendLab.textAlign = egret.HorizontalAlign.CENTER;
        if (userModel.isCharged(this._nChargeID) || data.firstAward == "0") {
            this.firstGroup.visible = false;
        }
        else {
            this.firstGroup.visible = true;
            var firstAwardList = data.firstAward.split("_");
            var sendId = Number(firstAwardList[0]);
            var sendNum = Number(firstAwardList[1]);
            switch (sendId) {
                case PropEnum.GOLD:
                    this.img_10001.visible = true;
                    this.img_10002.visible = false;
                    this.img_10012.visible = false;
                    if (sendNum > 10000) {
                        if (CONFIG.LANGUAGE == LanguageType.TW_Chinese) {
                            this.sendLab.text = (sendNum / 10000) + "萬";
                        }
                        else {
                            this.sendLab.text = (sendNum / 10000) + "万";
                        }
                    }
                    else {
                        this.sendLab.text = sendNum + "";
                    }
                    break;
                case PropEnum.GEM:
                    this.img_10001.visible = false;
                    this.img_10002.visible = true;
                    this.img_10012.visible = false;
                    this.sendLab.text = sendNum + "";
                    break;
                case PropEnum.TICKET:
                    this.img_10001.visible = false;
                    this.img_10002.visible = false;
                    this.img_10012.visible = true;
                    this.sendLab.text = sendNum + "";
                    break;
            }
        }
        this._nType = data.type;
        game.util.IconUtil.getIconByIdAsync(IconType.CHARGE, Number(data.res), function (icon) {
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            icon.x = _this.iconGroup.width / 2 + 5;
            icon.y = _this.iconGroup.height / 2 + 5;
            _this.iconGroup.addChild(icon);
        });
        this.desc.text = game.util.Language.getText(data.desc);
        this.sureGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
        this._touchObj = new burn.tools.UIWrap(this.sureGroup);
        var Font = new egret.BitmapText();
        RES.getResAsync("chargeNum_fnt", function (bData, key) {
            Font.font = bData;
            if (data.type == 3) {
                RES.getResAsync("R_FuHao_png", function () {
                    var unit = new egret.Bitmap(RES.getRes("R_FuHao_png"));
                    unit.anchorOffsetX = unit.width >> 1;
                    unit.anchorOffsetY = unit.height >> 1;
                    _this.priceTypeGroup.addChild(unit);
                }, _this);
                Font.text = Number(data.price) / 100 + "";
                Font.textAlign = egret.HorizontalAlign.LEFT;
                Font.anchorOffsetX = Font.width >> 1;
                Font.anchorOffsetY = Font.height >> 1;
                _this.priceGroup.addChild(Font);
                var arr = data.price.split("_");
                var type = Number(arr[0]);
                var num = Number(arr[1]);
                if (PropEnum.GOLD == type) {
                    var unit = new egret.Bitmap(RES.getRes("common_coins_png"));
                    unit.anchorOffsetX = unit.width >> 1;
                    unit.anchorOffsetY = unit.height >> 1;
                    unit.scaleX = unit.scaleY = 0.4;
                    _this.priceTypeGroup.addChild(unit);
                }
                else if (PropEnum.GEM == type) {
                    var unit = new egret.Bitmap(RES.getRes("common_diamond_png"));
                    unit.anchorOffsetX = unit.width >> 1;
                    unit.anchorOffsetY = unit.height >> 1;
                    unit.scaleX = unit.scaleY = 0.4;
                    _this.priceTypeGroup.addChild(unit);
                }
                else if (PropEnum.TICKET == type) {
                    var unit = new egret.Bitmap(RES.getRes("common_point_ticket_png"));
                    unit.anchorOffsetX = unit.width >> 1;
                    unit.anchorOffsetY = unit.height >> 1;
                    unit.scaleX = unit.scaleY = 0.4;
                    _this.priceTypeGroup.addChild(unit);
                }
            }
            else {
                var arr = data.price.split("_");
                var type = Number(arr[0]);
                var num = Number(arr[1]);
                if (PropEnum.GOLD == type) {
                    var unit = new egret.Bitmap(RES.getRes("common_coins_png"));
                    unit.anchorOffsetX = unit.width >> 1;
                    unit.anchorOffsetY = unit.height >> 1;
                    unit.scaleX = unit.scaleY = 0.4;
                    _this.priceTypeGroup.addChild(unit);
                }
                else if (PropEnum.GEM == type) {
                    var unit = new egret.Bitmap(RES.getRes("common_diamond_png"));
                    unit.anchorOffsetX = unit.width >> 1;
                    unit.anchorOffsetY = unit.height >> 1;
                    unit.scaleX = unit.scaleY = 0.4;
                    _this.priceTypeGroup.addChild(unit);
                }
                else if (PropEnum.TICKET == type) {
                    var unit = new egret.Bitmap(RES.getRes("common_point_ticket_png"));
                    unit.anchorOffsetX = unit.width >> 1;
                    unit.anchorOffsetY = unit.height >> 1;
                    unit.scaleX = unit.scaleY = 0.4;
                    _this.priceTypeGroup.addChild(unit);
                }
                Font.text = num + "";
                Font.textAlign = egret.HorizontalAlign.LEFT;
                Font.anchorOffsetX = Font.width >> 1;
                Font.anchorOffsetY = Font.height >> 1;
                _this.priceGroup.addChild(Font);
            }
        }, this);
    };
    ChargeItemUI.prototype.onBuyClick = function (e) {
        if (this._nType == 4) {
            burn.Director.popView();
            var view1 = new MonthCardView();
            var med1 = new MonthCardMediator(view1);
            burn.Director.pushView(med1);
            return;
        }
        burn._Notification_.send(NotifyEnum.BUY_CHARGE_ITEM, { id: this._nChargeID, type: this._nType });
    };
    ChargeItemUI.prototype.clearItem = function () {
        this.sureGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
    };
    return ChargeItemUI;
}(eui.Component));
__reflect(ChargeItemUI.prototype, "ChargeItemUI");
//# sourceMappingURL=ChargeItem.js.map