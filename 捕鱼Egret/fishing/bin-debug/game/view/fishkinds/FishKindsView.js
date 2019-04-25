var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FishKindsView = (function (_super) {
    __extends(FishKindsView, _super);
    function FishKindsView() {
        var _this = _super.call(this) || this;
        game.util.ReyunUtil.sendEvent(game.util.LogEnum.CHECK_FISH_FUN_COUNT);
        _this._btnWrapList = new Array();
        return _this;
    }
    FishKindsView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new FishKindsUI();
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
        var usermodel = burn.Director.getModelByKey(UserModel);
        this._roomListGroup = uiObj.scrollerGroup; //uiObj.roomList_group;
        var newTeshuGroup = new eui.Group();
        newTeshuGroup.width = 1060;
        var fishData = game.table.T_Fish_Table.getAllVo();
        var arrTeshu = new Array();
        var arrPutong = new Array();
        var fishRoom = new Array();
        for (var i = 0; i < fishData.length; i++) {
            var str = fishData[i].containRoomId;
            var data = str.split(",");
            for (var j = data.length - 1; j >= 0; j--) {
                if (Number(data[j]) == usermodel.getMatchRoomLevel()) {
                    fishRoom.push(fishData[i]);
                    break;
                }
            }
        }
        for (var i = 0; i < fishRoom.length; i++) {
            if (fishRoom[i].type >= 2) {
                arrTeshu.push(fishRoom[i]);
            }
            else {
                arrPutong.push(fishRoom[i]);
            }
        }
        for (var i = 0; i < arrTeshu.length; i++) {
            var item = new FishKindsItemUI();
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindItem.exml";
            item.iconBtn.name = "" + i;
            item.labname.text = game.util.Language.getText(arrTeshu[i].name); //""+i;
            item.imageicon.source = "fishkind_" + arrTeshu[i].fishkindIcon + "_png";
            if (arrTeshu[i].quality == 2) {
                item.imageHuang.visible = true;
                item.imageZi.visible = false;
            }
            else if (arrTeshu[i].quality == 3) {
                item.imageHuang.visible = false;
                item.imageZi.visible = true;
            }
            else {
                item.imageHuang.visible = false;
                item.imageZi.visible = false;
            }
            newTeshuGroup.addChild(item);
        }
        var tLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 10;
        tLayout.paddingRight = 10;
        tLayout.paddingBottom = 10;
        newTeshuGroup.layout = tLayout; /// 网格布局
        if (arrTeshu.length > 0) {
            var itemType = new FishKindsTypeItemUI();
            itemType.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindTypeItem.exml";
            itemType.titlePutong.visible = false;
            itemType.titleTeshu.visible = true;
            this._roomListGroup.addChild(itemType);
            this._roomListGroup.addChild(newTeshuGroup);
        }
        //普通
        var newPutongGroup = new eui.Group();
        newPutongGroup.width = 1060;
        for (var i = 0; i < arrPutong.length; i++) {
            var item = new FishKindsItemUI();
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindItem.exml";
            item.iconBtn.name = "" + i;
            //item.labname.text = arrPutong[i].name;//""+i;
            var arrName = new Array();
            arrName.push(arrPutong[i].score + "");
            item.labname.text = game.util.Language.getDynamicText(13, arrName); //arrPutong[i].name;
            item.imageicon.source = "fishkind_" + arrPutong[i].fishkindIcon + "_png";
            if (arrPutong[i].quality == 2) {
                item.imageHuang.visible = true;
                item.imageZi.visible = false;
            }
            else if (arrPutong[i].quality == 3) {
                item.imageHuang.visible = false;
                item.imageZi.visible = true;
            }
            else {
                item.imageHuang.visible = false;
                item.imageZi.visible = false;
            }
            newPutongGroup.addChild(item);
        }
        var ntLayout = new eui.TileLayout();
        ntLayout.paddingTop = 10;
        ntLayout.paddingLeft = 10;
        ntLayout.paddingRight = 10;
        ntLayout.paddingBottom = 10;
        newPutongGroup.layout = ntLayout; /// 网格布局
        var itemTypePu = new FishKindsTypeItemUI();
        itemTypePu.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindTypeItem.exml";
        itemTypePu.titlePutong.visible = true;
        itemTypePu.titleTeshu.visible = false;
        this._roomListGroup.addChild(itemTypePu);
        this._roomListGroup.addChild(newPutongGroup);
        var vLayout = new eui.VerticalLayout();
        vLayout.paddingTop = 10;
        this._roomListGroup.layout = vLayout;
    };
    /**选择右侧列表*/
    FishKindsView.prototype.selectRightItem = function (e) {
        console.log("#---------------------name---->", e.target.name);
    };
    /**关闭游戏 */
    FishKindsView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    FishKindsView.prototype.initView = function () {
        var _this = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindItem.exml", function () {
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindTypeItem.exml", function () {
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKinds.exml", _this.addBgResource, _this);
            }, _this);
        }, this);
    };
    FishKindsView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindItem.exml");
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindTypeItem.exml");
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKinds.exml");
    };
    return FishKindsView;
}(burn.view.PopView));
__reflect(FishKindsView.prototype, "FishKindsView");
/***操作UI的对应类 */
var FishKindsUI = (function (_super) {
    __extends(FishKindsUI, _super);
    function FishKindsUI() {
        return _super.call(this) || this;
    }
    return FishKindsUI;
}(eui.Component));
__reflect(FishKindsUI.prototype, "FishKindsUI");
var FishKindsItemUI = (function (_super) {
    __extends(FishKindsItemUI, _super);
    function FishKindsItemUI() {
        return _super.call(this) || this;
    }
    return FishKindsItemUI;
}(eui.Component));
__reflect(FishKindsItemUI.prototype, "FishKindsItemUI");
var FishKindsTypeItemUI = (function (_super) {
    __extends(FishKindsTypeItemUI, _super);
    function FishKindsTypeItemUI() {
        return _super.call(this) || this;
    }
    return FishKindsTypeItemUI;
}(eui.Component));
__reflect(FishKindsTypeItemUI.prototype, "FishKindsTypeItemUI");
//# sourceMappingURL=FishKindsView.js.map