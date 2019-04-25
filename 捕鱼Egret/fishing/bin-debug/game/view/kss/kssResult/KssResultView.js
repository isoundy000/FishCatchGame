var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KssResultView = (function (_super) {
    __extends(KssResultView, _super);
    function KssResultView(msg) {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        _this._msg = msg;
        return _this;
    }
    KssResultView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new KssResultCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //关闭当前界面
        this._uiDisplay.okGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.okGroup));
        var self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssResultItem.exml", function () {
            self.InitData();
        }, this);
    };
    KssResultView.prototype.InitData = function () {
        var arrData = this._msg.getRank();
        var len = arrData.length;
        var userModel = burn.Director.getModelByKey(UserModel);
        var myId = userModel.getUserId();
        this._uiDisplay.listGroup.removeChildren();
        var myIndex = -1;
        for (var i = 0; i < len; i++) {
            var item = new KssResultItemUI();
            item.setData(arrData[i], myId);
            if (arrData[i].userId == myId) {
                myIndex = i;
            }
            this._uiDisplay.listGroup.addChild(item);
        }
        var tLayout = new eui.VerticalLayout();
        this._uiDisplay.listGroup.layout = tLayout; /// 网格布局
        myIndex++;
        if (myIndex <= 3) {
            //赢了
            this._uiDisplay.titleLost.visible = false;
            this._uiDisplay.imgLost.visible = false;
        }
        else {
            //输了
            this._uiDisplay.titleWin.visible = false;
            this._uiDisplay.imgWin.visible = false;
        }
        this._uiDisplay.rankLab.text = myIndex + "";
    };
    /**关闭游戏 */
    KssResultView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
        this.send(NotifyEnum.CLICK_EXIT_ROOM);
    };
    KssResultView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssResultUI.exml", this.addBgResource, this);
    };
    KssResultView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this.parent && this.parent.removeChild(this);
    };
    return KssResultView;
}(burn.view.PopView));
__reflect(KssResultView.prototype, "KssResultView");
/***操作UI的对应类 */
var KssResultCom = (function (_super) {
    __extends(KssResultCom, _super);
    function KssResultCom() {
        return _super.call(this) || this;
    }
    return KssResultCom;
}(eui.Component));
__reflect(KssResultCom.prototype, "KssResultCom");
//# sourceMappingURL=KssResultView.js.map