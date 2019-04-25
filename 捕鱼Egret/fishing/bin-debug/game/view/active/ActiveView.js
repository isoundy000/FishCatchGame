var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ActiveView = (function (_super) {
    __extends(ActiveView, _super);
    function ActiveView() {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._btnWrapList = new Array();
        _this._bPop = false;
        return _this;
    }
    ActiveView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new ActiveCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //关闭当前界面
        var closeBtn = this._uiDisplay.closeBtn;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this.send(NotifyEnum.CHANGE_SETTING);
        if (!this._bPop) {
            //打开UI动画
            game.util.UIUtil.popView(this._uiDisplay.root);
            this._bPop = true;
        }
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
        var self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/ActiveLeftItem.exml", function () {
            // self.setLeftList();
            // //选择第一个活动
            // self.changeActive(0);
            var send = new GetLimitedTimeActiveInfoMessage();
            send.initData();
            NetManager.send(send);
        }, this);
    };
    ActiveView.prototype.setLeftList = function (list) {
        // this._uiDisplay.leftGroup.removeChildren();
        // let vos = game.table.T_Active_Table.getAllVo();
        // let len = vos.length;
        // for(let i = 0; i < len; i++)
        // {
        // 	let leftItem = new ActiveLeftItem();
        // 	this._uiDisplay.leftGroup.addChild(leftItem);
        // 	leftItem.setImg(vos[i].nameUrl,i);
        // 	leftItem.name = i + "";
        // }
        // let tLayout:eui.VerticalLayout  = new eui.VerticalLayout();
        // this._uiDisplay.leftGroup.layout = tLayout;    
        this._uiDisplay.leftGroup.removeChildren();
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var leftItem = new ActiveLeftItem();
            this._uiDisplay.leftGroup.addChild(leftItem);
            leftItem.setImg(list[i]._nameUrl, i);
            leftItem.name = i + "";
        }
        var tLayout = new eui.VerticalLayout();
        this._uiDisplay.leftGroup.layout = tLayout;
        this._list = list;
    };
    //切换活动
    ActiveView.prototype.changeActive = function (nIndex) {
        var numChild = this._uiDisplay.leftGroup.numChildren;
        for (var i = 0; i < numChild; i++) {
            var item = this._uiDisplay.leftGroup.getElementAt(i);
            if (i == nIndex) {
                item.selectByBoolean(true);
            }
            else {
                item.selectByBoolean(false);
            }
        }
        this.clearActiveItem();
        this._uiDisplay.activeGroup.removeChildren();
        var self = this;
        var activeModel = burn.Director.getModelByKey(ActiveModel);
        switch (this._list[nIndex]._type) {
            case Active_Type.LIMIT_TIME_ACTIVE_TYPE_FISH_SEND:
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_1.exml", function () {
                    var itemPanel = new Active1Item();
                    self._uiDisplay.activeGroup.addChild(itemPanel);
                }, this);
                break;
            case Active_Type.LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND:
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_2.exml", function () {
                    var itemPanel = new Active2Item();
                    self._uiDisplay.activeGroup.addChild(itemPanel);
                }, this);
                break;
            case Active_Type.LIMIT_TIME_ACTIVE_TYPE_VIP_SEND:
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_3.exml", function () {
                    var itemPanel = new Active3Item();
                    self._uiDisplay.activeGroup.addChild(itemPanel);
                }, this);
                break;
            case Active_Type.LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP:
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_4.exml", function () {
                    var itemPanel = new Active4Item();
                    self._uiDisplay.activeGroup.addChild(itemPanel);
                }, this);
                break;
        }
    };
    /**关闭游戏 */
    ActiveView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    ActiveView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/ActiveUI.exml", this.addBgResource, this);
    };
    ActiveView.prototype.clearActiveItem = function () {
        if (this._uiDisplay.activeGroup.numChildren > 0) {
            var child = this._uiDisplay.activeGroup.getElementAt(0);
            if (child) {
                child.destory();
            }
        }
    };
    ActiveView.prototype.destroy = function () {
        //关闭UI动画
        var self = this;
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self.clearActiveItem();
            self.parent && self.parent.removeChild(self);
            self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self._bPop = false;
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/ActiveUI.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_1.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_2.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_3.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_4.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/ActiveLeftItem.exml");
            var activeModel = burn.Director.getModelByKey(ActiveModel);
            var list = activeModel.getActiveList();
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var url = list[i]._nameUrl;
                RES.destroyRes(url + "_1_png");
                RES.destroyRes(url + "_2_png");
            }
        });
    };
    return ActiveView;
}(burn.view.PopView));
__reflect(ActiveView.prototype, "ActiveView");
/***操作UI的对应类 */
var ActiveCom = (function (_super) {
    __extends(ActiveCom, _super);
    function ActiveCom() {
        return _super.call(this) || this;
    }
    return ActiveCom;
}(eui.Component));
__reflect(ActiveCom.prototype, "ActiveCom");
//# sourceMappingURL=ActiveView.js.map