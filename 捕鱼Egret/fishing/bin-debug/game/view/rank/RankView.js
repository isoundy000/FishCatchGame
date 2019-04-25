var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RankView = (function (_super) {
    __extends(RankView, _super);
    function RankView() {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        return _this;
    }
    RankView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new RankCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //关闭当前界面
        this._uiDisplay.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
        var userModel = burn.Director.getModelByKey(UserModel);
        this._uiDisplay.lvLab.text = "" + userModel.getLevel();
        this._uiDisplay.expLab.text = "" + userModel.getExp();
        this._uiDisplay.lvBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeLv, this);
        this._uiDisplay.goldBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeGold, this);
        this._uiDisplay.saiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeSai, this);
        this._uiDisplay.zhouBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeZhou, this);
        this._uiDisplay.tuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeTu, this);
        this.onChangeLv(null);
    };
    RankView.prototype.onChangeLv = function (e) {
        this._uiDisplay.lvSel.visible = true;
        this._uiDisplay.goldSel.visible = false;
        this._uiDisplay.saiSel.visible = false;
        this._uiDisplay.zhouSel.visible = false;
        this._uiDisplay.tuSel.visible = false;
        this.send(NotifyEnum.SET_RANK_LIST, { type: 1 });
    };
    RankView.prototype.onChangeGold = function (e) {
        this._uiDisplay.lvSel.visible = false;
        this._uiDisplay.goldSel.visible = true;
        this._uiDisplay.saiSel.visible = false;
        this._uiDisplay.zhouSel.visible = false;
        this._uiDisplay.tuSel.visible = false;
        this.send(NotifyEnum.SET_RANK_LIST, { type: 2 });
    };
    RankView.prototype.onChangeSai = function (e) {
        this._uiDisplay.lvSel.visible = false;
        this._uiDisplay.goldSel.visible = false;
        this._uiDisplay.saiSel.visible = true;
        this._uiDisplay.zhouSel.visible = false;
        this._uiDisplay.tuSel.visible = false;
        this.send(NotifyEnum.SET_RANK_LIST, { type: 3 });
    };
    RankView.prototype.onChangeZhou = function (e) {
        this._uiDisplay.lvSel.visible = false;
        this._uiDisplay.goldSel.visible = false;
        this._uiDisplay.saiSel.visible = false;
        this._uiDisplay.zhouSel.visible = true;
        this._uiDisplay.tuSel.visible = false;
        this.send(NotifyEnum.SET_RANK_LIST, { type: 4 });
    };
    RankView.prototype.onChangeTu = function (e) {
        this._uiDisplay.lvSel.visible = false;
        this._uiDisplay.goldSel.visible = false;
        this._uiDisplay.saiSel.visible = false;
        this._uiDisplay.zhouSel.visible = false;
        this._uiDisplay.tuSel.visible = true;
        //this.changeList(5);
        this.send(NotifyEnum.SET_RANK_LIST, { type: 99 });
    };
    RankView.prototype.changeList = function (arr) {
        this._uiDisplay.scrolGroup.removeChildren();
        if (arr.length == 0) {
            this._uiDisplay.nullLab.visible = true;
            return;
        }
        this._uiDisplay.nullLab.visible = false;
        var self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/rank/RankItem.exml", function () {
            for (var i = 0; i < arr.length; i++) {
                var item = new RankItem();
                item.setData(arr[i]);
                self._uiDisplay.scrolGroup.addChild(item);
            }
            var tLayout = new eui.TileLayout();
            tLayout.paddingTop = 10;
            tLayout.paddingBottom = 20;
            self._uiDisplay.scrolGroup.layout = tLayout; /// 网格布局
        }, this);
    };
    /**关闭游戏 */
    RankView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    RankView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/rank/RankUI.exml", this.addBgResource, this);
    };
    RankView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.lvBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeLv, this);
        this._uiDisplay.goldBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeGold, this);
        this._uiDisplay.saiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeSai, this);
        this._uiDisplay.zhouBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeZhou, this);
        this._uiDisplay.tuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeTu, this);
        this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/rank/RankUI.exml");
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/rank/RankItem.exml");
    };
    return RankView;
}(burn.view.PopView));
__reflect(RankView.prototype, "RankView");
/***操作UI的对应类 */
var RankCom = (function (_super) {
    __extends(RankCom, _super);
    function RankCom() {
        return _super.call(this) || this;
    }
    return RankCom;
}(eui.Component));
__reflect(RankCom.prototype, "RankCom");
//# sourceMappingURL=RankView.js.map