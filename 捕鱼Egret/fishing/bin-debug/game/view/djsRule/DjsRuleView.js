var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DjsRuleView = (function (_super) {
    __extends(DjsRuleView, _super);
    function DjsRuleView(state) {
        if (state === void 0) { state = 0; }
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        _this._state = state;
        return _this;
    }
    DjsRuleView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new DjsRuluCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //关闭当前界面
        var closeBtn = this._uiDisplay.btnClose;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
        this._uiDisplay.sel_1.visible = false;
        this._uiDisplay.sel_2.visible = false;
        this._uiDisplay.sel_3.visible = false;
        this._uiDisplay.sel_4.visible = false;
        this._uiDisplay.btn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_1, this);
        this._uiDisplay.btn_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_2, this);
        this._uiDisplay.btn_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_3, this);
        this._uiDisplay.btn_4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_4, this);
        this.onChange_1(null);
    };
    DjsRuleView.prototype.onChange_1 = function (e) {
        this._uiDisplay.sel_1.visible = true;
        this._uiDisplay.sel_2.visible = false;
        this._uiDisplay.sel_3.visible = false;
        this._uiDisplay.sel_4.visible = false;
        this.changeContain(1);
    };
    DjsRuleView.prototype.onChange_2 = function (e) {
        this._uiDisplay.sel_1.visible = false;
        this._uiDisplay.sel_2.visible = true;
        this._uiDisplay.sel_3.visible = false;
        this._uiDisplay.sel_4.visible = false;
        this.changeContain(2);
    };
    DjsRuleView.prototype.onChange_3 = function (e) {
        this._uiDisplay.sel_1.visible = false;
        this._uiDisplay.sel_2.visible = false;
        this._uiDisplay.sel_3.visible = true;
        this._uiDisplay.sel_4.visible = false;
        this.changeContain(3);
    };
    DjsRuleView.prototype.onChange_4 = function (e) {
        this._uiDisplay.sel_1.visible = false;
        this._uiDisplay.sel_2.visible = false;
        this._uiDisplay.sel_3.visible = false;
        this._uiDisplay.sel_4.visible = true;
        this.changeContain(4);
    };
    DjsRuleView.prototype.changeContain = function (value) {
        this._uiDisplay.containGroup.removeChildren();
        switch (value) {
            case 1:
                var contentTxt = new egret.TextField();
                contentTxt.textAlign = egret.HorizontalAlign.LEFT;
                if (this._state == Rule_State.KssRoom) {
                    contentTxt.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(144).value);
                }
                else if (this._state == Rule_State.DjsRoom) {
                    contentTxt.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(131).value);
                }
                else if (this._state == Rule_State.WorldBoss) {
                    contentTxt.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(196).value);
                }
                else if (this._state == Rule_State.QmsRoom) {
                    contentTxt.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(200).value);
                }
                contentTxt.touchEnabled = false;
                contentTxt.lineSpacing = 16;
                contentTxt.width = 590;
                var group = new eui.Group();
                group.addChild(contentTxt);
                group.width = contentTxt.width;
                group.height = contentTxt.height;
                this._uiDisplay.containGroup.addChild(group);
                break;
            case 2:
                var contentTxt2 = new egret.TextField();
                contentTxt2.textAlign = egret.HorizontalAlign.LEFT;
                if (this._state == Rule_State.KssRoom) {
                    contentTxt2.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(145).value);
                }
                else if (this._state == Rule_State.DjsRoom) {
                    contentTxt2.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(132).value);
                }
                else if (this._state == Rule_State.WorldBoss) {
                    contentTxt2.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(197).value);
                }
                else if (this._state == Rule_State.QmsRoom) {
                    contentTxt2.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(201).value);
                }
                contentTxt2.touchEnabled = false;
                contentTxt2.lineSpacing = 16;
                contentTxt2.width = 590;
                var group = new eui.Group();
                group.addChild(contentTxt2);
                group.width = contentTxt2.width;
                group.height = contentTxt2.height;
                this._uiDisplay.containGroup.addChild(group);
                break;
            case 3:
                var contentTxt3 = new egret.TextField();
                contentTxt3.textAlign = egret.HorizontalAlign.LEFT;
                if (this._state == Rule_State.KssRoom) {
                    contentTxt3.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(146).value);
                }
                else if (this._state == Rule_State.DjsRoom) {
                    contentTxt3.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(133).value);
                }
                else if (this._state == Rule_State.WorldBoss) {
                    contentTxt3.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(198).value);
                }
                else if (this._state == Rule_State.QmsRoom) {
                    contentTxt3.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(202).value);
                }
                contentTxt3.touchEnabled = false;
                contentTxt3.lineSpacing = 16;
                contentTxt3.width = 590;
                var group = new eui.Group();
                group.addChild(contentTxt3);
                group.width = contentTxt3.width;
                group.height = contentTxt3.height;
                this._uiDisplay.containGroup.addChild(group);
                break;
            case 4:
                var contentTxt4 = new egret.TextField();
                contentTxt4.textAlign = egret.HorizontalAlign.LEFT;
                if (this._state == Rule_State.KssRoom) {
                    contentTxt4.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(147).value);
                }
                else if (this._state == Rule_State.DjsRoom) {
                    contentTxt4.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(134).value);
                }
                else if (this._state == Rule_State.WorldBoss) {
                    contentTxt4.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(199).value);
                }
                else if (this._state == Rule_State.QmsRoom) {
                    contentTxt4.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(203).value);
                }
                contentTxt4.touchEnabled = false;
                contentTxt4.lineSpacing = 16;
                contentTxt4.width = 590;
                var group = new eui.Group();
                group.addChild(contentTxt4);
                group.width = contentTxt4.width;
                group.height = contentTxt4.height;
                this._uiDisplay.containGroup.addChild(group);
                break;
        }
    };
    /**关闭游戏 */
    DjsRuleView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    DjsRuleView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/DjsRule/DjsRuleUI.exml", this.addBgResource, this);
    };
    DjsRuleView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this._uiDisplay.btn_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_1, this);
        this._uiDisplay.btn_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_2, this);
        this._uiDisplay.btn_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_3, this);
        this._uiDisplay.btn_4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_4, this);
        this.parent && this.parent.removeChild(this);
        RES.getRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/DjsRule/DjsRuleUI.exml");
    };
    return DjsRuleView;
}(burn.view.PopView));
__reflect(DjsRuleView.prototype, "DjsRuleView");
/***操作UI的对应类 */
var DjsRuluCom = (function (_super) {
    __extends(DjsRuluCom, _super);
    function DjsRuluCom() {
        return _super.call(this) || this;
    }
    return DjsRuluCom;
}(eui.Component));
__reflect(DjsRuluCom.prototype, "DjsRuluCom");
//# sourceMappingURL=DjsRuleView.js.map