var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShareView = (function (_super) {
    __extends(ShareView, _super);
    function ShareView() {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        return _this;
    }
    ShareView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new ShareViewCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //关闭当前界面
        this._uiDisplay.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.gainBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.gainedBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.inviteBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.listBtn));
        var req = new CommonRequestMessage();
        req.initData();
        req.setType(CommonRequest.COMMON_REQUEST_WECHAT_SHARE_INFO); //1 email
        NetManager.send(req);
    };
    ShareView.prototype.initShareData = function (newbieAwardState, invitedUserNum, todayShareTimes) {
        this.initLeft(newbieAwardState);
        this.initCenter(invitedUserNum);
        this.initRight();
    };
    ShareView.prototype.initLeft = function (newbieAwardState) {
        var _this = this;
        /** public itemDesc_0:eui.Label;
            public iconGroup_1:eui.Group;
            public iconGroup_2:eui.Group;
            public gainBtn:eui.Group;
            public gainedBtn:eui.Group; */
        this._uiDisplay.itemDesc_0.text = game.util.Language.getText(2431);
        var configData = game.table.T_Config_Table.getVoByKey(91).value.split(",");
        var configArr1 = configData[0].split("_");
        var configArr2 = configData[1].split("_");
        var gainId_1 = Number(configArr1[0]);
        var gainNum_1 = Number(configArr1[1]);
        var gainId_2 = Number(configArr2[0]);
        var gainNum_2 = Number(configArr2[1]);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", function () {
            var item = new BagViewItem(gainId_1, gainNum_1);
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
            item.init();
            item.anchorOffsetX = item.width / 2;
            item.anchorOffsetY = item.height / 2;
            _this._uiDisplay.iconGroup_1.addChild(item);
            _this._uiDisplay.iconGroup_1.scaleX = _this._uiDisplay.iconGroup_1.scaleY = 0.5;
            var item1 = new BagViewItem(gainId_2, gainNum_2);
            item1.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
            item1.init();
            item1.anchorOffsetX = item1.width / 2;
            item1.anchorOffsetY = item1.height / 2;
            _this._uiDisplay.iconGroup_2.addChild(item1);
            _this._uiDisplay.iconGroup_2.scaleX = _this._uiDisplay.iconGroup_2.scaleY = 0.5;
        }, this);
        if (newbieAwardState == 1) {
            this._uiDisplay.gainBtn.visible = false;
            this._uiDisplay.gainedBtn.visible = true;
        }
        else {
            this._uiDisplay.gainedBtn.visible = false;
            this._uiDisplay.gainBtn.visible = true;
            this._uiDisplay.gainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var req = new ReceiveWeChatShareAwardSendMessage();
                req.initData();
                req.setType(1); ////新人奖励1，邀请成功奖励2
                NetManager.send(req);
            }, this);
        }
    };
    ShareView.prototype.initCenter = function (invitedUserNum) {
        /** public itemDesc_1:eui.Label;
            public iconGroup:eui.Group;
            public item_desc2:eui.Label;
            public inviteBtn:eui.Group; */
        var _this = this;
        this._uiDisplay.itemDesc_1.text = game.util.Language.getText(2432);
        var arrName = new Array();
        arrName.push(invitedUserNum + "");
        this._uiDisplay.item_desc2.text = game.util.Language.getDynamicText(2433, arrName);
        var configData = game.table.T_Config_Table.getVoByKey(92).value;
        var config = configData.split("_");
        var gainId_1 = Number(config[0]);
        var gainNum_1 = Number(config[1]);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", function () {
            var item = new BagViewItem(gainId_1, gainNum_1);
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
            item.init();
            item.anchorOffsetX = item.width / 2;
            item.anchorOffsetY = item.height / 2;
            _this._uiDisplay.iconGroup.addChild(item);
            _this._uiDisplay.iconGroup.scaleX = _this._uiDisplay.iconGroup.scaleY = 0.5;
        }, this);
        this._uiDisplay.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var yaoQingView = new YaoQingView();
            _this.addChild(yaoQingView);
        }, this);
    };
    ShareView.prototype.initRight = function () {
        var _this = this;
        /**public listGroup:eui.Group;
           public listBtn:eui.Button; */
        this._uiDisplay.listBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var shareView = new ShareGainView();
            var shareMed = new ShareGainMediator(shareView);
            burn.Director.pushView(shareMed);
        }, this);
        var list = game.table.T_Share_Table.getAllVo();
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/share/shareGainItem.exml", function () {
            _this._uiDisplay.listGroup.removeChildren();
            for (var i = 0; i < list.length; i++) {
                var item = new ShareItem();
                item.init(list[i]);
                _this._uiDisplay.listGroup.addChild(item);
            }
            var tLayout = new eui.TileLayout();
            tLayout.paddingTop = 10;
            tLayout.paddingLeft = 0;
            tLayout.paddingRight = 0;
            tLayout.paddingBottom = 20;
            _this._uiDisplay.listGroup.layout = tLayout; /// 网格布局
        }, this);
    };
    /**关闭游戏 */
    ShareView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    ShareView.prototype.onHelp = function (e) {
    };
    ShareView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/share/ShareUI.exml", this.addBgResource, this);
    };
    ShareView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this.parent && this.parent.removeChild(this);
        this._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.helpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/share/ShareUI.exml");
    };
    return ShareView;
}(burn.view.PopView));
__reflect(ShareView.prototype, "ShareView");
/***操作UI的对应类 */
var ShareViewCom = (function (_super) {
    __extends(ShareViewCom, _super);
    function ShareViewCom() {
        return _super.call(this) || this;
    }
    return ShareViewCom;
}(eui.Component));
__reflect(ShareViewCom.prototype, "ShareViewCom");
//# sourceMappingURL=ShareView.js.map