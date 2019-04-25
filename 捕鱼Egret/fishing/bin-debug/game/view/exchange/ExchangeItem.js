var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeItemUI = (function (_super) {
    __extends(ExchangeItemUI, _super);
    function ExchangeItemUI() {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        return _this;
    }
    ExchangeItemUI.prototype.setData = function (data) {
        this.nameExchange.text = data._name;
        this._tId = data._id;
        this.costGroup.name = String(data._id);
        if (data._instruction != "0") {
            this.size.text = data._instruction;
        }
        else {
            this.size.visible = false;
        }
        if (data._serverNum != -1) {
            if (data._serverNum <= 0) {
                this.marketPrice.text = "已售罄";
            }
            else {
                this.marketPrice.text = "剩余:" + data._serverNum;
            }
        }
        else {
            this.marketPrice.text = "获得:" + data._goodsNum;
        }
        this.costGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
        this._btnWrapList.push(new burn.tools.UIWrap(this.costGroup));
        //iconGroup
        var self = this;
        RES.getResAsync("exchange_" + data._url + "_png", function () {
            var icon = new egret.Bitmap(RES.getRes("exchange_" + data._url + "_png"));
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            self.iconGroup.addChild(icon);
        }, this);
        if (data._exchangePriceId == PropEnum.FISH_TICKIT) {
            this.huafei.visible = true;
            this.dantou.visible = false;
            this.costNum.text = data._exchangePrice / 10 + "元";
        }
        else if (data._exchangePriceId == PropEnum.GOLD_WARHEAD) {
            this.huafei.visible = false;
            this.dantou.visible = true;
            this.costNum.text = String(data._exchangePrice);
        }
        this.costNum.textAlign = egret.HorizontalAlign.CENTER;
        if (data._type == 4) {
            var strNum = data._name.substring(0, data._name.length - 3);
            switch (Number(strNum)) {
                case 1:
                    this.nameExchange.visible = false;
                    this.HongBao_1.visible = true;
                    break;
                case 5:
                    this.nameExchange.visible = false;
                    this.HongBao_5.visible = true;
                    break;
                case 10:
                    this.nameExchange.visible = false;
                    this.HongBao_10.visible = true;
                    break;
            }
            //显示描述
            this.residue.visible = true;
            this.residue.text = "剩余：" + data._serverNum;
            //显示刷新时间
            this.updateTime.visible = true;
            this.updateTime.text = data._instruction;
            //
            // this.dantou.visible = false;
            // this.huafei.visible = false;
            // this.costNum.visible = false;
            var gunVo = game.table.T_Gun_Table.getVoByKey(data._minGunId);
            // RES.getResAsync("HongBao_ShengJi_" + gunVo.bulletNum + "_png", (data, key)=>{
            // 	let temp = new egret.Bitmap(data);
            // 	temp.anchorOffsetX = temp.width >> 1;
            // 	temp.anchorOffsetY = temp.height >> 1;
            // 	temp.x = this.costGroup.width >> 1;
            // 	temp.y = (this.costGroup.height >> 1) - 5;
            // 	this.costGroup.addChild(temp);
            // }, this);
            //恶心的特殊处理：一元红包显示一次
            if (data._id == 1100) {
                this.residue.text = "";
                this.updateTime.text = "每人限1个";
            }
            if (data._id == 1101) {
                this.updateTime.text = "VIP1开启";
            }
            //
            var userModel = burn.Director.getModelByKey(UserModel);
            var ticketNum = 0;
            var itemTicket = userModel.isExist(new game.model.Item(PropEnum.FISH_TICKIT, 0, 0));
            if (itemTicket) {
                ticketNum = userModel.getItemById(PropEnum.FISH_TICKIT).getCount();
            }
            if (ticketNum >= 1) {
                var curGunId = userModel.getCurGunID();
                var curVo = game.table.T_Gun_Table.getVoByKey(curGunId);
                if (curVo.bulletNum >= gunVo.bulletNum) {
                    this.HongSelect.visible = true;
                    burn.tools.TweenTools.showOutAndIn(this.HongSelect, 1500);
                }
            }
        }
    };
    ExchangeItemUI.prototype.touchItemEvent = function (e) {
        var name = this._tId;
        var userModel = burn.Director.getModelByKey(UserModel);
        var exchangeModel = burn.Director.getModelByKey(ExchangeModel);
        var vo = exchangeModel.getListById(Number(name));
        if (userModel.getCurGunID() < vo._minGunId) {
            //tishi 158
            game.util.GameUtil.popTips(game.util.Language.getText(158));
            return;
        }
        burn._Notification_.send(NotifyEnum.EXCHANGE_ITEM, name);
    };
    ExchangeItemUI.prototype.setType = function () {
        this.type_1.visible = false;
        this.type_2.visible = true;
        this.costGroup.visible = false;
    };
    ExchangeItemUI.prototype.setMoney = function () {
        this.type_1.visible = false;
        this.type_2.visible = false;
        this.type_3.visible = true;
        this.vis_1.visible = false;
        this.vis_2.visible = false;
        this.size.visible = false;
        this.marketPrice.visible = false;
        this.iconGroup.visible = true;
    };
    ExchangeItemUI.prototype.destory = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        egret.Tween.removeTweens(this.HongSelect);
        //移除事件监听
        this.costGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
    };
    return ExchangeItemUI;
}(eui.Component));
__reflect(ExchangeItemUI.prototype, "ExchangeItemUI");
//# sourceMappingURL=ExchangeItem.js.map