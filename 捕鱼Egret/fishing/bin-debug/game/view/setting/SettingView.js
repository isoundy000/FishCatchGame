var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SettingView = (function (_super) {
    __extends(SettingView, _super);
    function SettingView() {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._btnWrapList = new Array();
        _this._bPop = false;
        return _this;
    }
    SettingView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new SettingUI();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //关闭当前界面
        var closeBtn = this._uiDisplay.closeBtn;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
            this._uiDisplay.icon_change.visible = true;
            this._uiDisplay.icon_change.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onchangIdBtn, this);
        }
        this._uiDisplay.groupMus.name = "groupMus";
        this._uiDisplay.groupSel.name = "groupSel";
        this._uiDisplay.groupMus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeState, this);
        this._uiDisplay.groupSel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeState, this);
        this.send(NotifyEnum.CHANGE_SETTING);
        if (!this._bPop) {
            //打开UI动画
            game.util.UIUtil.popView(this._uiDisplay.root);
            this._bPop = true;
        }
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
    };
    SettingView.prototype.changeMusicState = function (state) {
        this._uiDisplay.music_sel.visible = state;
        this._uiDisplay.bg_1.visible = !state;
        this._uiDisplay.icon0.visible = !state;
        this._uiDisplay.iconKai0.visible = !state;
    };
    SettingView.prototype.changeSoundState = function (state) {
        this._uiDisplay.sound_sel.visible = state;
        this._uiDisplay.bg_2.visible = !state;
        this._uiDisplay.icon1.visible = !state;
        this._uiDisplay.iconKai1.visible = !state;
    };
    SettingView.prototype.changeState = function (e) {
        var target = e.target;
        if (target.name == "groupMus") {
            this.send(NotifyEnum.CHANGE_SETTING, { type: "music" });
        }
        else if (target.name == "groupSel") {
            this.send(NotifyEnum.CHANGE_SETTING, { type: "sound" });
        }
    };
    /**切换账号 */
    SettingView.prototype.onchangIdBtn = function (e) {
        game.util.GameUtil.openConfirmByTwoButton(null, function () {
            if (CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
                deleteCookie4YWT();
            }
            else {
                deleteCookie4ChangeAccount();
            }
        }, this, game.table.T_Language_Table.getVoByKey(2439).value);
    };
    /**关闭游戏 */
    SettingView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    SettingView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/setting/SettingUI.exml", this.addBgResource, this);
    };
    SettingView.prototype.destroy = function () {
        //关闭UI动画
        var self = this;
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self.parent && self.parent.removeChild(self);
            self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self._uiDisplay.groupMus.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.changeState, self);
            self._uiDisplay.groupSel.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.changeState, self);
            self._uiDisplay.icon_change.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onchangIdBtn, self);
            self._bPop = false;
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/setting/SettingUI.exml");
        });
    };
    return SettingView;
}(burn.view.PopView));
__reflect(SettingView.prototype, "SettingView");
/***操作UI的对应类 */
var SettingUI = (function (_super) {
    __extends(SettingUI, _super);
    function SettingUI() {
        return _super.call(this) || this;
    }
    return SettingUI;
}(eui.Component));
__reflect(SettingUI.prototype, "SettingUI");
//# sourceMappingURL=SettingView.js.map