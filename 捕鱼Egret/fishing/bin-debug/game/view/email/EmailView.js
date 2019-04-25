var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 邮箱界面view
 */
var EmailView = (function (_super) {
    __extends(EmailView, _super);
    function EmailView() {
        var _this = _super.call(this) || this;
        game.util.UIUtil.startLoading();
        return _this;
    }
    EmailView.prototype.initView = function () {
        var _this = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/EmailItme.exml", function () {
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/EmailUI.exml", function (clazz, url) {
                this.loadComplete(clazz, url);
            }, _this);
        }, this);
        this._btnWrapList = new Array();
    };
    EmailView.prototype.loadComplete = function (clazz, url) {
        game.util.UIUtil.closeLoading();
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        //添加操作UI
        var uiObj = new EmailViewUI();
        this._emialUI = uiObj;
        this._emialUI.skinName = clazz;
        this._emialUI.horizontalCenter = 0;
        this._emialUI.verticalCenter = 0;
        uiLayer.addChild(this._emialUI);
        //打开UI动画
        game.util.UIUtil.popView(this._emialUI.root);
        //添加关闭按钮事件
        this._emialUI.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseEvent, this);
        //添加按钮事件
        this._emialUI.giftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeList, this);
        this._emialUI.serverBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeList, this);
        //封装按钮状态功能
        this._btnWrapList.push(new burn.tools.UIWrap(this._emialUI.closeBtn));
        this.send(NotifyEnum.SHOW_EMAIL_LIST, 1);
        //this.changeListByIndex(1);
    };
    //显示礼物列表
    EmailView.prototype.showGiftList = function (list) {
        this._emialUI.scrolGroup.removeChildren();
        for (var i = 0; i < list.length; i++) {
            var item = new EmailViewItem();
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/EmailItme.exml";
            item.setData(list[i]);
            item.lingquBtn.name = list[i].getMailId() + "";
            item.lingquBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
            item.chakanBtn.name = list[i].getMailId() + "";
            item.chakanBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
            this._emialUI.scrolGroup.addChild(item);
        }
        var tLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingBottom = 20;
        this._emialUI.scrolGroup.layout = tLayout; /// 网格布局
    };
    EmailView.prototype.touchItemEvent = function (e) {
        var _this = this;
        var name = e.currentTarget.name;
        var emialModel = burn.Director.getModelByKey(EmailModel);
        var itemList = emialModel.getMailListById(Number(name));
        game.util.GameUtil.openEmailChakan(null, function () {
            _this.send(NotifyEnum.RECEIVE_MAIL_SEND, name);
        }, itemList.getMailContent(), itemList.getItems(), itemList.getState());
    };
    //显示系统消息列表
    EmailView.prototype.showServerList = function (list) {
        this._emialUI.scrolGroup.removeChildren();
        for (var i = 0; i < list.length; i++) {
            var item = new EmailViewItem();
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/EmailItme.exml";
            item.setData(list[i]);
            item.lingquBtn.name = list[i].getMailId() + "";
            item.lingquBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
            item.chakanBtn.name = list[i].getMailId() + "";
            item.chakanBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
            this._emialUI.scrolGroup.addChild(item);
        }
        var tLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingBottom = 20;
        this._emialUI.scrolGroup.layout = tLayout; /// 网格布局
    };
    /** 切换列表 */
    EmailView.prototype.changeList = function (e) {
        if (e.target == this._emialUI.giftBtn) {
            //this.changeListByIndex(1);
            this.send(NotifyEnum.SHOW_EMAIL_LIST, 1);
        }
        else if (e.target == this._emialUI.serverBtn) {
            //this.changeListByIndex(2);
            this.send(NotifyEnum.SHOW_EMAIL_LIST, 2);
        }
    };
    EmailView.prototype.changeListByIndex = function (nIndex, list, update, bAlert) {
        function sortFun(a, b) {
            if (a.getState() > b.getState()) {
                return 1;
            }
            else if (a.getState() < b.getState()) {
                return -1;
            }
            else {
                return 0;
            }
        }
        list.sort(sortFun);
        if (this.selectIndex == nIndex && !update) {
            return;
        }
        if (nIndex == 1) {
            this._emialUI.unSel.visible = false;
            this._emialUI.Sel.visible = true;
            this._emialUI.unSelServer.visible = true;
            this._emialUI.SelServer.visible = false;
            this._emialUI.giftAlert.visible = false;
            this._emialUI.serverAlert.visible = bAlert;
            this.showGiftList(list);
        }
        else if (nIndex == 2) {
            this._emialUI.unSelServer.visible = false;
            this._emialUI.SelServer.visible = true;
            this._emialUI.unSel.visible = true;
            this._emialUI.Sel.visible = false;
            this._emialUI.serverAlert.visible = false;
            this._emialUI.giftAlert.visible = bAlert;
            this.showServerList(list);
        }
        this.selectIndex = nIndex;
    };
    /** 关闭界面按钮事件 */
    EmailView.prototype.onCloseEvent = function (e) {
        burn.Director.popView();
    };
    EmailView.prototype.destroy = function () {
        var self = this;
        game.util.UIUtil.closeView(this._emialUI.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._emialUI.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onCloseEvent, self);
            self._emialUI.giftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.changeList, self);
            self._emialUI.serverBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.changeList, self);
            self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/EmailItme.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/EmailUI.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/EmailChakanPanel.exml");
        });
    };
    return EmailView;
}(burn.view.FullView));
__reflect(EmailView.prototype, "EmailView");
var EmailViewUI = (function (_super) {
    __extends(EmailViewUI, _super);
    function EmailViewUI() {
        return _super.call(this) || this;
    }
    return EmailViewUI;
}(eui.Component));
__reflect(EmailViewUI.prototype, "EmailViewUI");
//# sourceMappingURL=EmailView.js.map