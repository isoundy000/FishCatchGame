var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KssWaitView = (function (_super) {
    __extends(KssWaitView, _super);
    function KssWaitView(type) {
        if (type === void 0) { type = 0; }
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        _this._nType = type;
        _this._peopleNum = -1;
        return _this;
    }
    KssWaitView.prototype.addBgResource = function (clazz, url) {
        var _this = this;
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new KssWaitCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        this._arrImg = new Array();
        this._arrImg.push(this._uiDisplay.img_0);
        this._arrImg.push(this._uiDisplay.img_1);
        this._arrImg.push(this._uiDisplay.img_2);
        this._arrImg.push(this._uiDisplay.img_3);
        var closeBtn = this._uiDisplay.btnClose;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        var userModel = burn.Director.getModelByKey(UserModel);
        RES.getResAsync("background_" + userModel.getMatchRoomLevel() + "_jpg", function (data, key) {
            //添加背景
            var bg = new egret.Bitmap(data);
            _this._uiDisplay.bgGroup.addChild(bg);
            bg.anchorOffsetX = bg.width >> 1;
            bg.anchorOffsetY = bg.height >> 1;
            _this.setData();
        }, this);
    };
    /**关闭游戏 */
    KssWaitView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
        this.send(NotifyEnum.CLICK_EXIT_ROOM);
    };
    KssWaitView.prototype.setPeople = function (value) {
        this._peopleNum = value;
        if (!this._uiDisplay) {
            return;
        }
        this._uiDisplay.playerNum.text = value + "";
    };
    KssWaitView.prototype.setData = function () {
        if (this._peopleNum != -1) {
            this._uiDisplay.playerNum.text = this._peopleNum + "";
        }
        for (var i = 0; i < this._arrImg.length; i++) {
            if (i == this._nType) {
                this._arrImg[i].visible = true;
            }
            else {
                this._arrImg[i].visible = false;
            }
        }
        var id = this._nType + 7;
        this._uiDisplay.gain_0.removeChildren();
        this._uiDisplay.gain_1.removeChildren();
        this._uiDisplay.gain_2.removeChildren();
        var vo = game.table.T_QuickGame_Table.getVoByKey(id);
        var gainStr_0 = vo.theFirst;
        var gainStr_1 = vo.theSecond;
        var gainStr_2 = vo.theThird;
        var self = this;
        var gainData_0 = gainStr_0.split("_");
        var gainData_1 = gainStr_1.split("_");
        var gainData_2 = gainStr_2.split("_");
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, Number(gainData_0[0]), function (icon) {
            if (!icon) {
                return;
            }
            icon.width = 50;
            icon.height = 50;
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            self._uiDisplay.gain_0.addChild(icon);
        });
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, Number(gainData_1[0]), function (icon) {
            if (!icon) {
                return;
            }
            icon.width = 50;
            icon.height = 50;
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            self._uiDisplay.gain_1.addChild(icon);
        });
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, Number(gainData_2[0]), function (icon) {
            if (!icon) {
                return;
            }
            icon.width = 50;
            icon.height = 50;
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            self._uiDisplay.gain_2.addChild(icon);
        });
        var lab_0 = new eui.Label();
        lab_0.textAlign = egret.HorizontalAlign.LEFT;
        lab_0.text = gainData_0[1] + "";
        lab_0.anchorOffsetX = 0;
        lab_0.anchorOffsetY = lab_0.height / 2;
        lab_0.x = 25;
        self._uiDisplay.gain_0.addChild(lab_0);
        var lab_1 = new eui.Label();
        lab_1.textAlign = egret.HorizontalAlign.LEFT;
        lab_1.text = gainData_1[1] + "";
        lab_1.anchorOffsetX = 0;
        lab_1.anchorOffsetY = lab_1.height / 2;
        lab_1.x = 25;
        self._uiDisplay.gain_1.addChild(lab_1);
        var lab_2 = new eui.Label();
        lab_2.textAlign = egret.HorizontalAlign.LEFT;
        lab_2.text = gainData_2[1] + "";
        lab_2.anchorOffsetX = 0;
        lab_2.anchorOffsetY = lab_2.height / 2;
        lab_2.x = 25;
        self._uiDisplay.gain_2.addChild(lab_2);
        //添加动画
        //imgAct_0
        var arr = new Array();
        arr.push(this._uiDisplay.imgAct_9);
        arr.push(this._uiDisplay.imgAct_8);
        arr.push(this._uiDisplay.imgAct_7);
        arr.push(this._uiDisplay.imgAct_6);
        arr.push(this._uiDisplay.imgAct_5);
        arr.push(this._uiDisplay.imgAct_4);
        arr.push(this._uiDisplay.imgAct_3);
        arr.push(this._uiDisplay.imgAct_2);
        arr.push(this._uiDisplay.imgAct_1);
        arr.push(this._uiDisplay.imgAct_0);
        game.util.GameUtil.playWaitAction(arr);
    };
    /**关闭游戏 */
    KssWaitView.prototype.onClose = function () {
        burn.Director.popView();
    };
    KssWaitView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssWaitUI.exml", this.addBgResource, this);
    };
    KssWaitView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this.parent && this.parent.removeChild(this);
    };
    return KssWaitView;
}(burn.view.PopView));
__reflect(KssWaitView.prototype, "KssWaitView");
/***操作UI的对应类 */
var KssWaitCom = (function (_super) {
    __extends(KssWaitCom, _super);
    function KssWaitCom() {
        return _super.call(this) || this;
    }
    return KssWaitCom;
}(eui.Component));
__reflect(KssWaitCom.prototype, "KssWaitCom");
//# sourceMappingURL=KssWaitView.js.map