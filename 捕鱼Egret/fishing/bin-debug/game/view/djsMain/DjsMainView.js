var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DjsMainView = (function (_super) {
    __extends(DjsMainView, _super);
    function DjsMainView() {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._btnWrapList = new Array();
        return _this;
    }
    DjsMainView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new DjsMainCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        if (!this._bPop) {
            game.util.UIUtil.popViewCircle(this._uiDisplay.root);
            this._bPop = true;
        }
        //关闭当前界面
        var closeBtn = this._uiDisplay.btnClose;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnDjs));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnAll));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnFast));
        //添加描述
        var contentTxt = new egret.TextField();
        contentTxt.textAlign = egret.HorizontalAlign.LEFT;
        contentTxt.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(135).value);
        contentTxt.touchEnabled = false;
        contentTxt.lineSpacing = 16;
        contentTxt.width = this._uiDisplay.descDjs.width;
        contentTxt.height = this._uiDisplay.descDjs.height;
        this._uiDisplay.descDjs.addChild(contentTxt);
        var contentTxt1 = new egret.TextField();
        contentTxt1.textAlign = egret.HorizontalAlign.LEFT;
        contentTxt1.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(136).value);
        contentTxt1.touchEnabled = false;
        contentTxt1.lineSpacing = 16;
        contentTxt1.width = this._uiDisplay.descFast.width;
        contentTxt1.height = this._uiDisplay.descFast.height;
        this._uiDisplay.descFast.addChild(contentTxt1);
        var contentTxt2 = new egret.TextField();
        contentTxt2.textAlign = egret.HorizontalAlign.LEFT;
        contentTxt2.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(137).value);
        contentTxt2.touchEnabled = false;
        contentTxt2.lineSpacing = 16;
        contentTxt2.width = this._uiDisplay.descAll.width;
        contentTxt2.height = this._uiDisplay.descAll.height;
        this._uiDisplay.descAll.addChild(contentTxt2);
        this._uiDisplay.btnDjs.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intoDjs, this);
        this._uiDisplay.btnFast.addEventListener(egret.TouchEvent.TOUCH_TAP, this.noOpen, this);
        this._uiDisplay.btnAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intoKss, this);
    };
    DjsMainView.prototype.intoDjs = function () {
        var gunStr = game.table.T_Config_Table.getVoByKey(60).value;
        var goldStr = game.table.T_Config_Table.getVoByKey(61).value;
        var minGunID = Number(gunStr.split("_")[0]);
        var minGold = Number(goldStr.split("_")[0]);
        var userModel = burn.Director.getModelByKey(UserModel);
        if (userModel.getCoins() <= 0) {
            game.util.GameUtil.popTips(game.util.Language.getText(179));
            return;
        }
        if (userModel.getCurGunID() < minGunID) {
            //提示炮倍不足 138
            game.util.GameUtil.popTips(game.util.Language.getText(138));
            return;
        }
        var flagCoins = game.util.GameUtil.isEnough(CurrencyEnum.COINS, minGold);
        if (!flagCoins) {
            //提示钱不够 139
            game.util.GameUtil.popTips(game.util.Language.getText(139));
            return;
        }
        //判断时间
        var date = new Date(new Date().getTime());
        var h = date.getHours();
        if (h >= 7 && h < 23) {
        }
        else {
            //提示时间不正确
            game.util.GameUtil.popTips(game.util.Language.getText(142));
            return;
        }
        this.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, { type: RequesetRoomState.DjsRoom, id: 0 });
        burn.Director.popView();
    };
    DjsMainView.prototype.intoKss = function () {
        game.util.GameUtil.popTips(game.util.Language.getText(47));
        return;
        var gunStr = game.table.T_Config_Table.getVoByKey(60).value;
        var goldStr = game.table.T_Config_Table.getVoByKey(61).value;
        var minGunID = Number(gunStr.split("_")[1]);
        var minGold = Number(goldStr.split("_")[1]);
        var userModel = burn.Director.getModelByKey(UserModel);
        if (userModel.getCurGunID() < minGunID) {
            //提示炮倍不足 138
            game.util.GameUtil.popTips(game.util.Language.getText(152));
            return;
        }
        var flagCoins = game.util.GameUtil.isEnough(CurrencyEnum.COINS, minGold);
        if (!flagCoins) {
            //提示钱不够 139
            game.util.GameUtil.popTips(game.util.Language.getText(153));
            return;
        }
        //判断时间
        var date = new Date(new Date().getTime());
        var h = date.getHours();
        if (h >= 7 && h < 23) {
        }
        else {
            //提示时间不正确
            game.util.GameUtil.popTips(game.util.Language.getText(151));
            return;
        }
        this.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, { type: RequesetRoomState.QmsRoom, id: 0 });
        burn.Director.popView();
    };
    DjsMainView.prototype.noOpen = function () {
        game.util.GameUtil.popTips(game.util.Language.getText(47));
        return;
        var gunStr = game.table.T_Config_Table.getVoByKey(60).value;
        var goldStr = game.table.T_Config_Table.getVoByKey(61).value;
        var minGunID = Number(gunStr.split("_")[2]);
        var minGold = Number(goldStr.split("_")[2]);
        var userModel = burn.Director.getModelByKey(UserModel);
        if (userModel.getCurGunID() < minGunID) {
            //提示炮倍不足 138
            game.util.GameUtil.popTips(game.util.Language.getText(152));
            return;
        }
        //判断时间
        var date = new Date(new Date().getTime());
        var h = date.getHours();
        if (h >= 7 && h < 23) {
        }
        else {
            //提示时间不正确
            game.util.GameUtil.popTips(game.util.Language.getText(150));
            return;
        }
        burn.Director.popView();
        var roomView = new KssView();
        var roomMed = new KssMediator(roomView);
        burn.Director.pushView(roomMed);
    };
    /**关闭游戏 */
    DjsMainView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    DjsMainView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/DjsMain/DjsMainUI.exml", this.addBgResource, this);
    };
    DjsMainView.prototype.destroy = function () {
        //移除按钮封装
        var self = this;
        this._bPop = false;
        //关闭UI动画
        game.util.UIUtil.closeViewCircle(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self._uiDisplay.btnDjs.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.intoDjs, self);
            self._uiDisplay.btnFast.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.noOpen, self);
            self._uiDisplay.btnAll.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.intoKss, self);
            self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/DjsMain/DjsMainUI.exml");
        });
    };
    return DjsMainView;
}(burn.view.PopView));
__reflect(DjsMainView.prototype, "DjsMainView");
/***操作UI的对应类 */
var DjsMainCom = (function (_super) {
    __extends(DjsMainCom, _super);
    function DjsMainCom() {
        return _super.call(this) || this;
    }
    return DjsMainCom;
}(eui.Component));
__reflect(DjsMainCom.prototype, "DjsMainCom");
//# sourceMappingURL=DjsMainView.js.map