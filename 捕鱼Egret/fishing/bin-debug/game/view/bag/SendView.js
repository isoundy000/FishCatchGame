var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var SendView = (function (_super) {
    __extends(SendView, _super);
    function SendView(id) {
        var _this = _super.call(this) || this;
        _this._id = id;
        _this._btnWrapList = new Array();
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/SendUI.exml";
        _this._userModel = burn.Director.getModelByKey(UserModel);
        //封装按钮
        _this._btnWrapList.push(new burn.tools.UIWrap(_this.closeBtn));
        _this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClosttButtonClick, _this);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/SendUI.exml", _this.addBgResource, _this);
        return _this;
    }
    SendView.prototype.addBgResource = function (clazz, url) {
        var itemVo = game.table.T_Item_Table.getVoByKey(this._id);
        var itemData = this._userModel.getItemById(this._id);
        var item = new BagViewItem(itemData.getItemId(), itemData.getCount());
        item.init();
        item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
        item.anchorOffsetX = item.width / 2;
        item.anchorOffsetY = item.height / 2;
        item.countTxt.visible = false;
        item.numBg.visible = false;
        this.itemGroup.addChild(item);
        this.itemName.text = game.util.Language.getText(itemVo.name);
        this.nCurNumber = itemVo.everyTimeLimit;
        this.numLab.text = this.nCurNumber + "";
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClick, this);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addResource, this);
        this.resouceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resouce, this);
        this.username.alpha = 0.5;
        this.username.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
    };
    SendView.prototype.onChange = function (e) {
        e.target.text = "";
        e.target.alpha = 1;
    };
    SendView.prototype.setParent = function (parent) {
        this._parent = parent;
    };
    SendView.prototype.initView = function () {
    };
    /**增加 */
    SendView.prototype.addResource = function (e) {
        var itemVo = game.table.T_Item_Table.getVoByKey(this._id);
        var itemData = this._userModel.getItemById(this._id);
        if (itemData.getCount() < (this.nCurNumber + itemVo.everyTimeLimit)) {
            return;
        }
        this.nCurNumber += itemVo.everyTimeLimit;
        this.numLab.text = this.nCurNumber + "";
    };
    /**减少 */
    SendView.prototype.resouce = function (e) {
        var itemVo = game.table.T_Item_Table.getVoByKey(this._id);
        var itemData = this._userModel.getItemById(this._id);
        if (this.nCurNumber == itemVo.everyTimeLimit) {
            return;
        }
        this.nCurNumber -= itemVo.everyTimeLimit;
        this.numLab.text = this.nCurNumber + "";
    };
    /**关闭游戏 */
    SendView.prototype.onClosttButtonClick = function (e) {
        if (this._parent) {
            this._parent.removeChild(this);
        }
    };
    /**发送 */
    SendView.prototype.sendClick = function (e) {
        if (this.username.text == "") {
            game.util.GameUtil.popTips(game.util.Language.getText(38));
            return;
        }
        if (Number(this.username.text) == this._userModel.getUserId()) {
            game.util.GameUtil.popTips(game.util.Language.getText(39));
            return;
        }
        var reg = new RegExp("^[0-9]*$");
        if (!reg.test(this.username.text)) {
            game.util.GameUtil.popTips(game.util.Language.getText(38));
            return;
        }
        var req = new FindUserSendMessage();
        req.initData();
        req.setUserId(Number(this.username.text));
        NetManager.send(req);
    };
    SendView.prototype.sendGiveMes = function (userName) {
        var itemVo = game.table.T_Item_Table.getVoByKey(this._id);
        var arrName = new Array();
        arrName.push(this.nCurNumber + "");
        arrName.push(game.util.Language.getText(itemVo.name) + "");
        arrName.push(this.username.text + "");
        arrName.push(userName + "");
        //是否邮寄{0}个{1}给{2}({3})
        var string = game.util.Language.getDynamicText(41, arrName);
        var self = this;
        game.util.GameUtil.openConfirmByTwoButton(null, function () {
            burn._Notification_.send(NotifyEnum.GIVE_ITEM_DATA, { id: self._id, num: self.nCurNumber, userId: self.username.text });
            //发送赠送消息
            var req = new GiveItemSendMessage();
            req.initData();
            req.setGiveItem({ itemId: self._id, totalCount: self.nCurNumber });
            req.setReceiveUserId(Number(self.username.text));
            NetManager.send(req);
            self.onClosttButtonClick(null);
        }, this, string);
    };
    SendView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this.parent && this.parent.removeChild(this);
        this.sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClick, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addResource, this);
        this.resouceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.resouce, this);
        this.username.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        console.log("LoginView destory!");
    };
    return SendView;
}(eui.Component));
__reflect(SendView.prototype, "SendView");
//# sourceMappingURL=SendView.js.map