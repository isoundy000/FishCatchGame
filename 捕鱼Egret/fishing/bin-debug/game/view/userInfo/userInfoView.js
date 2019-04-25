var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var UserInfoView = (function (_super) {
    __extends(UserInfoView, _super);
    function UserInfoView() {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        game.util.UIUtil.startLoading();
        return _this;
    }
    UserInfoView.prototype.addBgResource = function (clazz, url) {
        game.util.UIUtil.closeLoading();
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new UserInfoUI();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //打开UI动画
        game.util.UIUtil.popView(this._uiDisplay.root);
        this._uiDisplay.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.chakanGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenVip, this);
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.chakanGroup));
        this.addAvator();
    };
    UserInfoView.prototype.addAvator = function () {
        var self = this;
        var userModel = burn.Director.getModelByKey(UserModel);
        var headUrl = "";
        if (CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
            headUrl = userModel.getHeadUrl().replace("yiwantang/", "");
        }
        else {
            headUrl = userModel.getHeadUrl();
        }
        game.util.IconUtil.getHeadIcon(headUrl, function (bmp) {
            //设置玩家头像
            bmp.x = bmp.y = -47;
            self._uiDisplay.avatorGroup.addChild(bmp);
        });
        this.send(NotifyEnum.USER_INFO_UI_LOADED);
    };
    UserInfoView.prototype.setData = function (lvStr, idStr, uName, vipStr) {
        this._uiDisplay.userId.text = "ID:" + idStr;
        this._uiDisplay.userName.text = uName;
        //lvGroup    数字
        var numFont = new egret.BitmapText();
        numFont.font = RES.getRes("bitmapNum_2_fnt");
        numFont.text = "" + lvStr;
        numFont.anchorOffsetX = numFont.width / 2;
        numFont.anchorOffsetY = numFont.height / 2;
        numFont.textAlign = egret.HorizontalAlign.LEFT;
        numFont.scaleX = 0.5;
        numFont.scaleY = 0.5;
        this._uiDisplay.lvGroup.addChild(numFont);
        //vipNumGroup vip 数字
        var numFontVip = new egret.BitmapText();
        numFontVip.font = RES.getRes("bitmapNum_2_fnt");
        numFontVip.text = "" + vipStr;
        numFontVip.anchorOffsetX = numFontVip.width / 2;
        numFontVip.anchorOffsetY = numFontVip.height / 2;
        numFontVip.textAlign = egret.HorizontalAlign.CENTER;
        numFontVip.scaleX = 0.5;
        numFontVip.scaleY = 0.5;
        this._uiDisplay.vipNumGroup.addChild(numFontVip);
        //设置按钮切换
        this._uiDisplay.scoreGroup.name = "scoreGroup";
        this._uiDisplay.areaGroup.name = "areaGroup";
        this._uiDisplay.scoreGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeFunClick, this);
        this._uiDisplay.areaGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeFunClick1, this);
        this.changeFunList(0);
    };
    UserInfoView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserInfoUI.exml", this.addBgResource, this);
    };
    UserInfoView.prototype.changeFunList = function (nIndex) {
        if (nIndex == this._nIndexFun) {
            return;
        }
        this._nIndexFun = nIndex;
        if (this._nIndexFun == 0) {
            //this._uiDisplay.an.visible = false;
            this._uiDisplay.liang.visible = true;
            //this._uiDisplay.an0.visible = true;
            this._uiDisplay.liang0.visible = false;
        }
        else if (this._nIndexFun == 1) {
            //this._uiDisplay.an.visible = true;
            this._uiDisplay.liang.visible = false;
            //this._uiDisplay.an0.visible = false;
            this._uiDisplay.liang0.visible = true;
        }
    };
    UserInfoView.prototype.changeFunClick = function (e) {
        this.changeFunList(0);
    };
    UserInfoView.prototype.changeFunClick1 = function (e) {
        this.changeFunList(1);
    };
    /**关闭游戏 */
    UserInfoView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    UserInfoView.prototype.onOpenVip = function (e) {
        burn.Director.popView();
        var view = new VipView();
        var med = new VipMediator(view);
        burn.Director.pushView(med);
    };
    UserInfoView.prototype.destroy = function () {
        var self = this;
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self._uiDisplay.scoreGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.changeFunClick, self);
            self._uiDisplay.areaGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.changeFunClick1, self);
            self._uiDisplay.chakanGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onOpenVip, self);
            self.parent && self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserInfoUI.exml");
        });
    };
    return UserInfoView;
}(burn.view.PopView));
__reflect(UserInfoView.prototype, "UserInfoView");
/***操作UI的对应类 */
var UserInfoUI = (function (_super) {
    __extends(UserInfoUI, _super);
    function UserInfoUI() {
        return _super.call(this) || this;
    }
    return UserInfoUI;
}(eui.Component));
__reflect(UserInfoUI.prototype, "UserInfoUI");
var AvatorUI = (function (_super) {
    __extends(AvatorUI, _super);
    function AvatorUI() {
        return _super.call(this) || this;
    }
    return AvatorUI;
}(eui.Component));
__reflect(AvatorUI.prototype, "AvatorUI");
//# sourceMappingURL=userInfoView.js.map