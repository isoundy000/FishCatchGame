var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelectRoomView = (function (_super) {
    __extends(SelectRoomView, _super);
    function SelectRoomView() {
        return _super.call(this) || this;
    }
    SelectRoomView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new SelectRoomUI();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //打开UI动画
        game.util.UIUtil.popView(this._uiDisplay.root);
        //关闭当前界面
        var closeBtn = this._uiDisplay.colse_btn;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        //开始游戏的按钮
        var startBtn = this._uiDisplay.start_btn;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartButtonClick, this);
        //设置列表显示内容
        //this.setLeftList();
        //加载完成，发送请求消息
        //ROOMLIST_RESOUCE_LOADED
        burn._Notification_.send(NotifyEnum.ROOMLIST_RESOUCE_LOADED);
    };
    //显示左侧列表
    //required uint32 serverId = 1;
    //required uint32 state = 2;//1流畅(0<100)，2繁忙(101<150)，3拥挤(151~180)，4满员(181~200)
    SelectRoomView.prototype.showLeftList = function (arr) {
        this._arrLeftList = new Array();
        this._arrLeftList = arr;
        this._roomListLeftGroup = this._uiDisplay.room_Left_group;
        for (var i = 0; i < arr.length; i++) {
            var itemLeft = new SelectRoomLeftItem();
            var state = arr[i].state;
            itemLeft.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomListItem.exml";
            itemLeft.name = "" + i;
            itemLeft.name_bitlab.text = "" + (i + 1);
            itemLeft.okBtn.name = "" + i;
            itemLeft.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectLeftItem, this);
            for (var j = 1; j <= 4; j++) {
                if (j == state) {
                    itemLeft["imgStage_" + j].visible = true;
                }
                else {
                    itemLeft["imgStage_" + j].visible = false;
                }
            }
            this._roomListLeftGroup.addChild(itemLeft);
        }
        var vLayout = new eui.VerticalLayout();
        vLayout.paddingTop = 10;
        this._roomListLeftGroup.layout = vLayout;
        //首次显示内容
        this.setLeftList();
    };
    //单独更新右侧单独项
    SelectRoomView.prototype.updateRightItem = function (data) {
        var defaultSelect = -1;
        var len = this._arrRightList.length;
        for (var i = 0; i < len; i++) {
            if (data.roomId == this._arrRightList[i].roomId) {
                defaultSelect = i;
                break;
            }
        }
        if (defaultSelect != -1) {
            var item = this._roomListGroup.getChildAt(defaultSelect);
            if (item) {
                item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomItem.exml";
                item.nameTitle.touchEnabled = false;
                item.name_bitLab.touchEnabled = false;
                item.ren.touchEnabled = false;
                item.image_RED.touchEnabled = false;
                item.image_CUR.touchEnabled = false;
                //当前房间人数
                item.name_bitLabCur.text = String(data.userCount);
                //当前进度条
                if (data.userCount == 4) {
                    item.image_RED.visible = true;
                    item.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tipsRoomMax, this);
                }
                else {
                    item.image_RED.visible = false;
                    item.image_CUR.width = (data.userCount / 4.0) * 222;
                    item.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectRightItem, this);
                }
            }
        }
    };
    //显示右侧列表
    SelectRoomView.prototype.showRightList = function (arr) {
        this._arrRightList = new Array();
        this._arrRightList = arr;
        this._roomListGroup = this._uiDisplay.room_group; //uiObj.roomList_group;
        this._roomListGroup.removeChildren();
        for (var i = 0; i < arr.length; i++) {
            var item = new SelectRoomItem();
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomItem.exml";
            item.name_bitLab.text = String(i + 1);
            item.imageBg.name = String(i);
            //item.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectRightItem, this);
            item.root.name = String(i);
            item.nameTitle.touchEnabled = false;
            item.name_bitLab.touchEnabled = false;
            item.ren.touchEnabled = false;
            item.image_RED.touchEnabled = false;
            item.image_CUR.touchEnabled = false;
            item.root.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDownRightItem, this);
            item.root.addEventListener(egret.TouchEvent.TOUCH_END, this.touchCancelRightItem, this);
            item.root.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchCancelRightItem, this);
            //当前房间人数
            item.name_bitLabCur.text = String(arr[i].userCount);
            //当前进度条
            if (arr[i].userCount == 4) {
                item.image_RED.visible = true;
                item.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tipsRoomMax, this);
            }
            else {
                item.image_RED.visible = false;
                item.image_CUR.width = (arr[i].userCount / 4.0) * 222;
                item.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectRightItem, this);
            }
            item.anchorOffsetX = 0.5;
            item.anchorOffsetY = 0.5;
            this._roomListGroup.addChild(item);
        }
        var scroller = this._uiDisplay.roomList_scrol;
        scroller.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
        //scroller.addEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this.rollOverCall, this);
        var tLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 15;
        tLayout.paddingRight = 15;
        tLayout.paddingBottom = 20;
        this._roomListGroup.layout = tLayout; /// 网格布局
    };
    SelectRoomView.prototype.setLeftList = function () {
        var defaultSelect = 0;
        var numChildren = this._roomListLeftGroup.numChildren;
        var item = this._roomListLeftGroup.getChildAt(defaultSelect);
        item.image_select.visible = true;
    };
    /**选择左侧列表*/
    SelectRoomView.prototype.selectLeftItem = function (e) {
        var defaultSelect = parseInt(e.target.name);
        var numChildren = this._roomListLeftGroup.numChildren;
        for (var i = 0; i < numChildren; i++) {
            this._roomListLeftGroup.getChildAt(i).image_select.visible = false;
        }
        var item = this._roomListLeftGroup.getChildAt(defaultSelect);
        item.image_select.visible = true;
        var req = new ManualChooseRoomSendMessage();
        req.initData();
        req.setServerId(this._arrLeftList[defaultSelect].serverId);
        NetManager.send(req);
    };
    /**取消房间按钮 */
    SelectRoomView.prototype.touchCancelRightItem = function (e) {
        if (this._curTouchItem == null) {
            return;
        }
        this._curTouchItem.scaleX = this._curTouchItem.scaleY = 1;
        this._curTouchItem = null;
    };
    /**滚动结束的事件回调 */
    SelectRoomView.prototype.rollOverCall = function (e) {
        var numChildren = this._roomListGroup.numChildren;
        for (var i = 0; i < numChildren; i++) {
            var item = this._roomListGroup.getChildAt(i);
            item.scaleX = item.scaleY = 1;
        }
    };
    /**按下房间按钮 */
    SelectRoomView.prototype.touchDownRightItem = function (e) {
        var self = this;
        if (e.target.name == null || e.target.name == "") {
            return;
        }
        var defaultSelect = Number(e.target.name);
        if (defaultSelect == NaN) {
            return;
        }
        var item = this._roomListGroup.getChildAt(defaultSelect);
        this._curTouchItem = item;
        this._curTouchItem.scaleX = this._curTouchItem.scaleY = 0.95;
    };
    //提示房间已满
    SelectRoomView.prototype.tipsRoomMax = function (e) {
        game.util.GameUtil.popTips(game.util.Language.getText(11));
    };
    /**选择右侧列表*/
    SelectRoomView.prototype.selectRightItem = function (e) {
        burn.Director.popView();
        var defaultSelect = Number(e.target.name);
        var roomId = this._arrRightList[defaultSelect].roomId;
        burn._Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, { type: RequesetRoomState.SelectRoom, id: roomId });
        game.util.ReyunUtil.sendEvent(game.util.LogEnum.MANUAL_SEAT_SELECTION);
    };
    /**关闭游戏 */
    SelectRoomView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    SelectRoomView.prototype.onStartButtonClick = function (e) {
        this.send(NotifyEnum.RES_LOAD_OVER, null);
    };
    SelectRoomView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomItem.exml");
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomListItem.exml");
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/SelectRoom.exml", this.addBgResource, this);
    };
    SelectRoomView.prototype.destroy = function () {
        var self = this;
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            var childItemNum = self._roomListGroup.numElements;
            for (var i = 0; i < childItemNum; i++) {
                var item = self._roomListGroup.getElementAt(i);
                item.imageBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.tipsRoomMax, self);
                item.imageBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.selectRightItem, self);
            }
            self._roomListGroup.removeChildren();
            self._uiDisplay.colse_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self.parent && self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomItem.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomListItem.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/SelectRoom.exml");
        });
    };
    return SelectRoomView;
}(burn.view.PopView));
__reflect(SelectRoomView.prototype, "SelectRoomView");
/***操作UI的对应类 */
var SelectRoomUI = (function (_super) {
    __extends(SelectRoomUI, _super);
    function SelectRoomUI() {
        return _super.call(this) || this;
    }
    return SelectRoomUI;
}(eui.Component));
__reflect(SelectRoomUI.prototype, "SelectRoomUI");
var SelectRoomItem = (function (_super) {
    __extends(SelectRoomItem, _super);
    function SelectRoomItem() {
        return _super.call(this) || this;
    }
    return SelectRoomItem;
}(eui.Component));
__reflect(SelectRoomItem.prototype, "SelectRoomItem");
var SelectRoomLeftItem = (function (_super) {
    __extends(SelectRoomLeftItem, _super);
    function SelectRoomLeftItem() {
        return _super.call(this) || this;
    }
    return SelectRoomLeftItem;
}(eui.Component));
__reflect(SelectRoomLeftItem.prototype, "SelectRoomLeftItem");
//# sourceMappingURL=SelectRoomView.js.map