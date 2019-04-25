var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SignView = (function (_super) {
    __extends(SignView, _super);
    function SignView() {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._btnWrapList = new Array();
        game.util.UIUtil.startLoading();
        return _this;
    }
    SignView.prototype.addBgResource = function (clazz, url) {
        var _this = this;
        game.util.UIUtil.closeLoading();
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new SignCom();
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
        this._uiDisplay.qiandao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQiandao, this);
        this._uiDisplay.buqian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuqian, this);
        this._uiDisplay.help.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.qiandao));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.buqian));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.help));
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/sign/SignItem.exml", function () {
            _this.send(NotifyEnum.SIGN_UI_LOADED);
        }, this);
    };
    SignView.prototype.setListData = function (signObj) {
        var _this = this;
        var vos = game.table.T_MonthSign_Table.getAllVo();
        var month = signObj.CurMonth();
        var signTimes = signObj.getCumulativeSignTimes(); //累计签到次数
        var shengyuTimes = signObj.getRemainMakeUpTimes(); //剩余补签次数
        var isToday = signObj.IsTodaySign(); //是否今天签到
        var isTodayMask = signObj.IsTodayMakeUp(); //是否今天补签
        var len = vos.length;
        var arrData = new Array();
        for (var i = 0; i < len; i++) {
            if (vos[i].month == month) {
                arrData.push(vos[i]);
            }
        }
        this._uiDisplay.listGroup.removeChildren();
        var lenNew = arrData.length;
        for (var i = 0; i < lenNew; i++) {
            var item = new SignItemCom();
            item.setData(signTimes, arrData[i]);
            this._uiDisplay.listGroup.addChild(item);
        }
        var tLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingBottom = 20;
        this._uiDisplay.listGroup.layout = tLayout; /// 网格布局
        //添加列表以外的东西
        RES.getResAsync("cardLeiji_fnt", function () {
            RES.getResAsync("cardLeiji_png", function () {
                _this._uiDisplay.leijiGroup.removeChildren();
                _this._uiDisplay.buqianGroup.removeChildren();
                var leijiFont = new egret.BitmapText();
                leijiFont.font = RES.getRes("cardLeiji_fnt");
                leijiFont.text = String(signTimes);
                leijiFont.anchorOffsetX = leijiFont.width / 2;
                leijiFont.anchorOffsetY = leijiFont.height / 2;
                _this._uiDisplay.leijiGroup.addChild(leijiFont);
                var shengyuFont = new egret.BitmapText();
                shengyuFont.font = RES.getRes("cardLeiji_fnt");
                shengyuFont.text = String(shengyuTimes);
                shengyuFont.anchorOffsetX = shengyuFont.width / 2;
                shengyuFont.anchorOffsetY = shengyuFont.height / 2;
                _this._uiDisplay.buqianGroup.addChild(shengyuFont);
            }, _this);
        }, this);
        //
        if (signObj.IsTodaySign()) {
            //let colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
            //this._uiDisplay.qiandao.filters = [colorFlilter];
            this._uiDisplay.qiandao.visible = false;
        }
        else {
            this._uiDisplay.qiandao.visible = true;
        }
        if (signObj.IsTodayMakeUp()) {
            this._uiDisplay.buqian.visible = false;
        }
        else {
            this._uiDisplay.buqian.visible = true;
        }
    };
    /** 签到 */
    SignView.prototype.onQiandao = function (e) {
        var model = burn.Director.getModelByKey(UserModel);
        var month = model.getSignObj().CurMonth();
        var send = new MonthSignSendMessage();
        send.initData();
        send.setOperationType(0);
        send.setCurMonth(month);
        NetManager.send(send);
    };
    SignView.prototype.onBuqian = function (e) {
        var model = burn.Director.getModelByKey(UserModel);
        var month = model.getSignObj().CurMonth();
        var send = new MonthSignSendMessage();
        send.initData();
        send.setOperationType(1);
        send.setCurMonth(month);
        NetManager.send(send);
    };
    SignView.prototype.onHelp = function (e) {
        game.util.GameUtil.openCommonHelp(null, 1);
    };
    /**关闭游戏 */
    SignView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    SignView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/sign/SignUI.exml", this.addBgResource, this);
    };
    SignView.prototype.destroy = function () {
        var self = this;
        this._bPop = false;
        //关闭UI动画
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self._uiDisplay.qiandao.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onQiandao, self);
            self._uiDisplay.buqian.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onBuqian, self);
            self._uiDisplay.help.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onHelp, self);
            self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/sign/SignUI.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/sign/SignItem.exml");
        });
    };
    return SignView;
}(burn.view.PopView));
__reflect(SignView.prototype, "SignView");
/***操作UI的对应类 */
var SignCom = (function (_super) {
    __extends(SignCom, _super);
    function SignCom() {
        return _super.call(this) || this;
    }
    return SignCom;
}(eui.Component));
__reflect(SignCom.prototype, "SignCom");
//# sourceMappingURL=SignView.js.map