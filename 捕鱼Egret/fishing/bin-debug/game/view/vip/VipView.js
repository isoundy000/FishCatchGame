var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VipView = (function (_super) {
    __extends(VipView, _super);
    function VipView() {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._btnWrapList = new Array();
        return _this;
    }
    VipView.prototype.addBgResource = function () {
        var _this = this;
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new VipCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/vip/VipUI.exml";
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
        this._uiDisplay.chargeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharge, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/vip/VipItem.exml", function () {
            RES.getResAsync("vipShow_png", function () {
                RES.getResAsync("vipShow_fnt", function () {
                    _this.setData();
                }, _this);
            }, _this);
        }, this);
    };
    VipView.prototype.setData = function () {
        /**
        public desc:eui.Label;
        public proLab:eui.Label;
        public cur_350:eui.Image; */
        var userModel = burn.Director.getModelByKey(UserModel);
        var vipLv = userModel.getVipLevel();
        var totalRMB = userModel.getTatolChargeRMB();
        this._uiDisplay.listGroup.removeChildren();
        var vos = game.table.T_VipLevel_Table.getAllVo();
        var len = vos.length;
        var maxLv = 0;
        for (var i = 1; i < len; i++) {
            var item = new VipItemUI(vos[i], vipLv);
            this._uiDisplay.listGroup.addChild(item);
            maxLv = vos[i].vipLevel;
        }
        var tLayout = new eui.HorizontalLayout();
        this._uiDisplay.listGroup.layout = tLayout; /// 网格布局
        var curLv = new egret.BitmapText();
        curLv.font = RES.getRes("vipShow_fnt");
        curLv.text = String(vipLv);
        this._uiDisplay.vipCurGroup.addChild(curLv);
        curLv.textAlign = egret.HorizontalAlign.CENTER;
        curLv.anchorOffsetX = curLv.width / 2;
        curLv.anchorOffsetY = curLv.height / 2;
        var nextLv = new egret.BitmapText();
        nextLv.font = RES.getRes("vipShow_fnt");
        nextLv.text = String(vipLv + 1);
        this._uiDisplay.vipNextGroup.addChild(nextLv);
        nextLv.textAlign = egret.HorizontalAlign.CENTER;
        nextLv.anchorOffsetX = nextLv.width / 2;
        nextLv.anchorOffsetY = nextLv.height / 2;
        if (maxLv <= vipLv) {
            this._uiDisplay.cur_350.width = 350.0;
            var curVo = game.table.T_VipLevel_Table.getVoByKey(vipLv - 1);
            this._uiDisplay.proLab.text = curVo.levelUpExp / 100 + "/" + curVo.levelUpExp / 100;
            this._uiDisplay.desc.text = game.util.Language.getText(175);
            this._uiDisplay.vipNextGroup.visible = false;
            this._uiDisplay.nextVipIcon.visible = false;
        }
        else {
            var curVo = game.table.T_VipLevel_Table.getVoByKey(vipLv);
            var lastVo = game.table.T_VipLevel_Table.getVoByKey(vipLv - 1);
            if (lastVo) {
                var maxExp = curVo.levelUpExp / 100;
                var chargeTxt = totalRMB / 100;
                var percent = chargeTxt * 1.0 / (curVo.levelUpExp / 100);
                this._uiDisplay.proLab.text = chargeTxt + "/" + curVo.levelUpExp / 100;
                this._uiDisplay.cur_350.width = 350.0 * percent;
                var arrName = new Array();
                arrName.push(curVo.levelUpExp / 100 - chargeTxt + "");
                arrName.push(curVo.vipLevel + "");
                this._uiDisplay.desc.text = game.util.Language.getDynamicText(93, arrName);
            }
            else {
                var maxExp = curVo.levelUpExp / 100;
                var chargeTxt = totalRMB / 100;
                var percent = chargeTxt * 1.0 / (curVo.levelUpExp / 100);
                this._uiDisplay.proLab.text = chargeTxt + "/" + curVo.levelUpExp / 100;
                this._uiDisplay.cur_350.width = 350.0 * percent;
                var arrName = new Array();
                arrName.push(curVo.levelUpExp / 100 - chargeTxt + "");
                arrName.push(curVo.vipLevel + "");
                this._uiDisplay.desc.text = game.util.Language.getDynamicText(93, arrName);
            }
        }
    };
    /**关闭游戏 */
    VipView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    VipView.prototype.onCharge = function (e) {
        burn.Director.popView();
        var chargeView = new ChargeView(ChargeType.Ticket);
        var chargeMed = new ChargeMediator(chargeView);
        burn.Director.pushView(chargeMed);
    };
    VipView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/vip/VipUI.exml", this.addBgResource, this);
    };
    VipView.prototype.destroy = function () {
        //移除按钮封装
        var self = this;
        this._bPop = false;
        //关闭UI动画
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self._uiDisplay.chargeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCharge, self);
            self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/vip/VipUI.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/vip/VipItem.exml");
            RES.destroyRes("vipShow_png");
            RES.destroyRes("vipShow_fnt");
        });
    };
    return VipView;
}(burn.view.PopView));
__reflect(VipView.prototype, "VipView");
/***操作UI的对应类 */
var VipCom = (function (_super) {
    __extends(VipCom, _super);
    function VipCom() {
        return _super.call(this) || this;
    }
    return VipCom;
}(eui.Component));
__reflect(VipCom.prototype, "VipCom");
//# sourceMappingURL=VipView.js.map