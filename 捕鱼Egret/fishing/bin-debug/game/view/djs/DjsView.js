var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DjsView = (function (_super) {
    __extends(DjsView, _super);
    function DjsView() {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        return _this;
    }
    DjsView.prototype.addBgResource = function (clazz, url) {
        var _this = this;
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new DjsCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //关闭当前界面
        this._uiDisplay.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
        this._uiDisplay.signUpGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.signUp, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.helpBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.signUpGroup));
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Djs/DjsItem.exml", function () {
            _this.send(NotifyEnum.DJS_ITEM_LOADED);
        }, this);
    };
    DjsView.prototype.initList = function (msg) {
        /**
         * 		required RankDataMessage myData = 1;
                required RankDataMessage weekData = 2;
                repeated RankDataMessage dayData = 3;
                required uint32 weekIntegral = 4;

            message RankDataMessage {
                required int32 rankType = 1;//排行类型1等级 2金币
                required int32 rank = 2;//排名
                required int32 userId = 3;//玩家ID
                required int32 roleLevel = 4;//玩家等级
                required int32 vipLevel = 5;//玩家VIP等级
                required int64 rankValue = 6;//排行对应的值
                required string name = 7;//玩家昵称
                required string iconUrl = 8;//头像
            }
         */
        //周冠军数据
        if (msg.getWeekData()) {
            var weekData = msg.getWeekData();
            this._uiDisplay.zhouNameLab.text = "周冠军:" + weekData.name;
            this._uiDisplay.zhouScoreLab.text = "周积分:" + weekData.rankValue;
            this._uiDisplay.weekInfoTip.text = game.util.Language.getText(2424);
            this._uiDisplay.weekInfoTip.visible = false;
        }
        else {
            this._uiDisplay.weekInfoTip.text = game.util.Language.getText(2424);
            this._uiDisplay.weekInfoTip.visible = true;
            this._uiDisplay.zhouNameLab.text = "";
            this._uiDisplay.zhouScoreLab.text = "";
        }
        //排行数据
        var dayData = msg.getDayData();
        this._uiDisplay.listGroup.removeChildren();
        //1,2,3,4-10,11-20,21-50,51-100,101-200    68
        var str = game.table.T_Config_Table.getVoByKey(68).value;
        var len = dayData.length;
        var strDate = str.split(",");
        var gainTable = game.table.T_GrandPrixRankRange_Table.getAllVo();
        var _arr = new Array();
        for (var i = 0; i < gainTable.length; i++) {
            if (gainTable[i].roomType == RequesetRoomState.DjsRoom) {
                _arr.push(gainTable[i]);
            }
        }
        for (var i = 0; i < _arr.length; i++) {
            if (i >= strDate.length) {
                continue;
            }
            var dataItem = null;
            if (i < len) {
                dataItem = dayData[i];
            }
            var item = new DjsUIItem();
            item.setData(dataItem, strDate[i], _arr[i], i);
            this._uiDisplay.listGroup.addChild(item);
        }
        var tLayout = new eui.HorizontalLayout();
        tLayout.gap = 23;
        this._uiDisplay.listGroup.layout = tLayout; /// 网格布局
        //看看第几次。要不要显示免费还是啥玩意
        var userModel = burn.Director.getModelByKey(UserModel);
        var roomModel = burn.Director.getModelByKey(RoomModel);
        var roomer = roomModel.getRoomerById(userModel.getUserId());
        var djsObj = roomer.getDjsObj();
        if (!djsObj) {
            return;
        }
        if (djsObj.todayGrandPrixTimes > 0) {
            this._uiDisplay.free.visible = false;
            this._uiDisplay.goldGroup.visible = true;
        }
        else {
            this._uiDisplay.free.visible = true;
            this._uiDisplay.goldGroup.visible = false;
        }
        if (djsObj.grandPrixSignUp == 1) {
            this._uiDisplay.signUpGroup.visible = false;
        }
        //自己数据
        var myData = msg.getMyData();
        this._uiDisplay.weekScoreLab.text = msg.getWeekIntegral();
        this._uiDisplay.dayScoreLab.text = myData.rankValue + "";
        this._uiDisplay.rankLab.text = myData.rank + "";
        if (myData.rankValue.low <= 0) {
            this._uiDisplay.rankLab.text = game.util.Language.getText(2425);
        }
        var date = new Date(new Date().getTime());
        this._uiDisplay.rankTimeLab.text = (date.getMonth() + 1) + "月" + date.getDate() + "日排行";
    };
    /** 报名 */
    DjsView.prototype.signUp = function (e) {
        burn.Director.popView();
        this.send(NotifyEnum.SIGN_UP_DJS);
        this.send(NotifyEnum.CLOSE_SIGN_VIEW);
    };
    /**关闭游戏 */
    DjsView.prototype.onClosttButtonClick = function (e) {
        this.send(NotifyEnum.CLOSE_SIGN_VIEW);
        burn.Director.popView();
    };
    /** 打开规则 */
    DjsView.prototype.openHelp = function (e) {
        var settingView = new DjsRuleView(Rule_State.DjsRoom);
        var settingMed = new DjsRuleMediator(settingView);
        burn.Director.pushView(settingMed);
    };
    DjsView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Djs/DjsUI.exml", this.addBgResource, this);
    };
    DjsView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.helpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
        this._uiDisplay.signUpGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.signUp, this);
        this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Djs/DjsUI.exml");
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Djs/DjsItem.exml");
    };
    return DjsView;
}(burn.view.PopView));
__reflect(DjsView.prototype, "DjsView");
/***操作UI的对应类 */
var DjsCom = (function (_super) {
    __extends(DjsCom, _super);
    function DjsCom() {
        return _super.call(this) || this;
    }
    return DjsCom;
}(eui.Component));
__reflect(DjsCom.prototype, "DjsCom");
//# sourceMappingURL=DjsView.js.map