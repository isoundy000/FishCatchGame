var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeRecodeView = (function (_super) {
    __extends(ExchangeRecodeView, _super);
    function ExchangeRecodeView() {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        return _this;
    }
    ExchangeRecodeView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new ExchangesRecodeUI();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //打开UI动画
        game.util.UIUtil.popView(this._uiDisplay.root);
        //关闭当前界面
        var closeBtn = this._uiDisplay.closeBtn;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.psLab.text = game.util.Language.getText(66);
        //自由游戏做特殊处理，不显示添加QQ文案
        if (CONFIG.PLATFORM_ID == PlatformTypeEnum.ZI_YOU) {
            this._uiDisplay.psLab.visible = false;
        }
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeRecodeItem.exml", this.setUILoaded, this);
    };
    ExchangeRecodeView.prototype.setUILoaded = function (clazz, url) {
        this.send(NotifyEnum.EXCHANGE_RECODE_LOADED);
    };
    ExchangeRecodeView.prototype.setData = function (arr) {
        this._arr = arr;
        var exchangeModel = burn.Director.getModelByKey(ExchangeModel);
        this._uiDisplay.listGroup.removeChildren();
        for (var i = 0; i < arr.length; i++) {
            var item = new ExchangeRecodeUIItem();
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeRecodeItem.exml";
            var vo = exchangeModel.getListById(Number(arr[i].id));
            if (!vo) {
                continue;
            }
            if (vo._type != 0) {
                item.name = i + "";
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenInfo, this);
            }
            else {
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    game.util.GameUtil.popTips(game.util.Language.getText(177));
                }, this);
            }
            item.nameLab.text = vo._name;
            item.timeLab.text = game.util.TimeUtil.longToDateStr(Number(arr[i].time));
            //发货状态 0，未发货，1发货
            if (arr[i].state == 0) {
                item.stateLab.text = "未发货";
            }
            else if (arr[i].state == 1) {
                item.stateLab.text = "已发货";
            }
            this._uiDisplay.listGroup.addChild(item);
        }
        var tLayout = new eui.VerticalLayout();
        this._uiDisplay.listGroup.layout = tLayout; //纵向布局
    };
    ExchangeRecodeView.prototype.onOpenInfo = function (e) {
        var name = e.currentTarget.name;
        var parentView;
        var width = 0;
        var height = 0;
        parentView = egret.MainContext.instance.stage;
        width = CONFIG.contentWidth;
        height = CONFIG.contentHeight;
        var confirm = new RecodeInfoCom(parentView, this._arr[Number(name)].msg);
        confirm.anchorOffsetX = confirm.width >> 1;
        confirm.anchorOffsetY = confirm.height >> 1;
        if (parentView) {
            parentView.addChild(confirm);
        }
    };
    /**关闭游戏 */
    ExchangeRecodeView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    ExchangeRecodeView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeRecode.exml", this.addBgResource, this);
    };
    ExchangeRecodeView.prototype.destroy = function () {
        var self = this;
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self.parent && self.parent.removeChild(self);
        });
    };
    return ExchangeRecodeView;
}(burn.view.PopView));
__reflect(ExchangeRecodeView.prototype, "ExchangeRecodeView");
/***操作UI的对应类 */
var ExchangesRecodeUI = (function (_super) {
    __extends(ExchangesRecodeUI, _super);
    function ExchangesRecodeUI() {
        return _super.call(this) || this;
    }
    return ExchangesRecodeUI;
}(eui.Component));
__reflect(ExchangesRecodeUI.prototype, "ExchangesRecodeUI");
var ExchangeRecodeUIItem = (function (_super) {
    __extends(ExchangeRecodeUIItem, _super);
    function ExchangeRecodeUIItem() {
        return _super.call(this) || this;
    }
    return ExchangeRecodeUIItem;
}(eui.Component));
__reflect(ExchangeRecodeUIItem.prototype, "ExchangeRecodeUIItem");
//记录详情界面
var RecodeInfoCom = (function (_super) {
    __extends(RecodeInfoCom, _super);
    function RecodeInfoCom(parent, msg) {
        var _this = _super.call(this) || this;
        _this._msg = msg;
        _this._parentView = parent;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeRecodeInfo.exml", _this.loaded, _this);
        return _this;
    }
    RecodeInfoCom.prototype.loaded = function (clazz, url) {
        this.skinName = clazz;
        game.util.UIUtil.popView(this.root);
        this.root.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        var id = this._msg.getGoodsId();
        var exchangeModel = burn.Director.getModelByKey(ExchangeModel);
        var vo = exchangeModel.getListById(id);
        if (vo._type == 4) {
            this.goodsGroup.visible = false;
            this.oneLab.visible = true;
            this.oneLab.text = game.table.T_Language_Table.getVoByKey(165).value + this._msg.getReceiverPhone();
        }
        else if (vo._type == 1) {
            this.goodsGroup.visible = false;
            this.oneLab.visible = true;
            this.oneLab.text = game.table.T_Language_Table.getVoByKey(161).value + this._msg.getReceiverPhone();
        }
        else if (vo._type == 3) {
            this.oneLab.visible = false;
            this.goodsGroup.visible = true;
            this.nameLab.text = this._msg.getReceiverName();
            this.phoneLab.text = this._msg.getReceiverPhone();
            this.qqLab.text = this._msg.getReceiverQQ();
            this.addLab.text = this._msg.getReceiverAddress();
        }
    };
    /**确定按钮 */
    RecodeInfoCom.prototype.onOKButtonClick = function (e) {
        if (this._parentView) {
            this._parentView.removeChild(this);
            burn._Notification_.send(NotifyEnum.CHECK_POP);
        }
    };
    RecodeInfoCom.prototype.destroy = function () {
        var self = this;
        game.util.UIUtil.closeView(self.root, function () {
            self.parent && self.parent.removeChild(self);
            self.root.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onOKButtonClick, self);
        });
    };
    return RecodeInfoCom;
}(eui.Component));
__reflect(RecodeInfoCom.prototype, "RecodeInfoCom");
//# sourceMappingURL=ExchangeRecodeView.js.map