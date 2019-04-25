var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/** 活动类型4 */
var Active4Item = (function (_super) {
    __extends(Active4Item, _super);
    function Active4Item() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_4.exml";
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        _this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var parentView;
            var width = 0;
            var height = 0;
            parentView = egret.MainContext.instance.stage;
            width = CONFIG.contentWidth;
            height = CONFIG.contentHeight;
            var confirm = new ActiveRulePanel(parentView);
            confirm.anchorOffsetX = confirm.width >> 1;
            confirm.anchorOffsetY = confirm.height >> 1;
            if (parentView) {
                parentView.addChild(confirm);
            }
        }, _this);
        var userModel = burn.Director.getModelByKey(UserModel);
        _this.goldLab.text = userModel.getCoins() + "";
        var activeModel = burn.Director.getModelByKey(ActiveModel);
        _this.activeIconLab.text = activeModel.getActiveCoin() + "";
        var type = Active_Type.LIMIT_TIME_ACTIVE_TYPE_FISH_SEND;
        var item = activeModel.getActiveObjByType(type);
        _this.actTimeLab.text = game.util.TimeUtil.getActiveTime(item._startTime, item._endTime);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_4Item.exml", function () {
            _this.setList();
        }, _this);
        return _this;
    }
    Active4Item.prototype.setList = function () {
        var activeModel = burn.Director.getModelByKey(ActiveModel);
        var datas = activeModel.getActiveShopDataList();
        var lenDatas = datas.length;
        var vos = game.table.T_SecretShop_Table.getAllVo();
        var len = vos.length;
        //列表
        this.listGroup.removeChildren();
        this.arrItemList = new Array();
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < lenDatas; j++) {
                if (vos[i].id == datas[j]._id) {
                    var item = new Active4ItemCom(vos[i]);
                    this.listGroup.addChild(item);
                    this.arrItemList.push(item);
                }
            }
        }
        var tLayout = new eui.VerticalLayout();
        this.listGroup.layout = tLayout; /// 网格布局
    };
    Active4Item.prototype.destory = function () {
        if (this.arrItemList && this.arrItemList.length > 0) {
            var len = this.arrItemList.length;
            for (var i = 0; i < len; i++) {
                this.arrItemList[i].destory();
            }
        }
    };
    return Active4Item;
}(ComponetBase));
__reflect(Active4Item.prototype, "Active4Item");
var Active4ItemCom = (function (_super) {
    __extends(Active4ItemCom, _super);
    function Active4ItemCom(vo) {
        var _this = _super.call(this) || this;
        _this._id = vo.id;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_4Item.exml";
        var activeModel = burn.Director.getModelByKey(ActiveModel);
        var obj = activeModel.getActiveShopDataById(vo.id);
        _this._state = obj._state;
        _this.buyGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
        _this.setData(vo);
        /**LIMIT_TIME_ACTIVE_SECRET_SHOP_GOODS_CAN_BUY = 0;// 可以买购买
         * LIMIT_TIME_ACTIVE_SECRET_SHOP_GOODS_HAVE_BOUGHT = 1;// 购买过
        */
        if (obj._state == 1) {
            //提示
            // let colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
            // this.buyGroup.filters = [colorFlilter];
            _this.buyGroup.visible = false;
        }
        var gainBtn = new burn.tools.UIWrap(_this.buyGroup);
        return _this;
    }
    Active4ItemCom.prototype.setData = function (vo) {
        var _this = this;
        //id:1,goods:"40001_5",price:"10001_10,10013_2"
        var goodsStr = vo.goods;
        var datas = goodsStr.split("_");
        var self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", function () {
            var showItem = new BagViewItem(Number(datas[0]), Number(datas[1]));
            showItem.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
            showItem.scaleX = showItem.scaleY = 0.75;
            showItem.anchorOffsetX = showItem.width / 2;
            showItem.anchorOffsetY = showItem.height / 2;
            showItem.init();
            _this.iconGroup.addChild(showItem);
        }, this);
        //描述
        var priceStr = vo.price.split(",");
        var price1 = priceStr[0].split("_");
        var price2 = priceStr[1].split("_");
        var vo1 = game.table.T_Item_Table.getVoByKey(Number(price1[0]));
        var vo2 = game.table.T_Item_Table.getVoByKey(Number(price2[0]));
        var str = price1[1] + game.util.Language.getText(vo1.name) + "或" + price2[1] + game.util.Language.getText(vo2.name);
        this.desc.text = str;
    };
    Active4ItemCom.prototype.onClick = function () {
        if (this._state == 1) {
            game.util.GameUtil.popTips(game.util.Language.getText(187));
            return;
        }
        var parentView;
        var width = 0;
        var height = 0;
        parentView = egret.MainContext.instance.stage;
        width = CONFIG.contentWidth;
        height = CONFIG.contentHeight;
        var confirm = new ActiveSurePanel(parentView, this._id);
        confirm.anchorOffsetX = confirm.width >> 1;
        confirm.anchorOffsetY = confirm.height >> 1;
        if (parentView) {
            parentView.addChild(confirm);
        }
    };
    Active4ItemCom.prototype.destory = function () {
        this.buyGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return Active4ItemCom;
}(eui.Component));
__reflect(Active4ItemCom.prototype, "Active4ItemCom");
//# sourceMappingURL=Active4Item.js.map