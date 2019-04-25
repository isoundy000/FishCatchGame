var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var QmsView = (function (_super) {
    __extends(QmsView, _super);
    function QmsView() {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        return _this;
    }
    QmsView.prototype.addBgResource = function (clazz, url) {
        var _this = this;
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new QmsCom();
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
    QmsView.prototype.initList = function (msg) {
        //自己数据
        var myData = msg.getMyData();
        this._uiDisplay.dayScoreLab.text = myData.rankValue + "";
        this._uiDisplay.rankLab.text = myData.rank + "";
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
            if (gainTable[i].roomType == RequesetRoomState.QmsRoom) {
                _arr.push(gainTable[i]);
            }
        }
        for (var i = 0; i < _arr.length; i++) {
            if (i >= strDate.length) {
                continue;
            }
            var dataItem = dayData[i];
            var item = new DjsUIItem();
            item.setData(dataItem, strDate[i], _arr[i], i);
            this._uiDisplay.listGroup.addChild(item);
        }
        var tLayout = new eui.HorizontalLayout();
        tLayout.gap = 50;
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
            //修改,当天未完成一场全民赛时，1处显示为“今日排名：暂未入榜”；2处显示为“？？？”、“积分：0”。
            this._uiDisplay.dayScoreLab.text = "0";
            this._uiDisplay.rankLab.text = game.util.Language.getText(2425);
        }
        if (djsObj.grandPrixSignUp == 1) {
            this._uiDisplay.signUpGroup.visible = false;
        }
    };
    /** 报名 */
    QmsView.prototype.signUp = function (e) {
        burn.Director.popView();
        this.send(NotifyEnum.SIGN_UP_DJS);
        this.send(NotifyEnum.CLOSE_SIGN_VIEW);
    };
    /**关闭游戏 */
    QmsView.prototype.onClosttButtonClick = function (e) {
        this.send(NotifyEnum.CLOSE_SIGN_VIEW);
        burn.Director.popView();
    };
    /** 打开规则 */
    QmsView.prototype.openHelp = function (e) {
        var settingView = new DjsRuleView(Rule_State.QmsRoom);
        var settingMed = new DjsRuleMediator(settingView);
        burn.Director.pushView(settingMed);
    };
    QmsView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Qms/QmsUI.exml", this.addBgResource, this);
    };
    QmsView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.helpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
        this._uiDisplay.signUpGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.signUp, this);
        this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Qms/QmsUI.exml");
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Djs/DjsItem.exml");
    };
    return QmsView;
}(burn.view.PopView));
__reflect(QmsView.prototype, "QmsView");
/***操作UI的对应类 */
var QmsCom = (function (_super) {
    __extends(QmsCom, _super);
    function QmsCom() {
        return _super.call(this) || this;
    }
    return QmsCom;
}(eui.Component));
__reflect(QmsCom.prototype, "QmsCom");
//# sourceMappingURL=QmsView.js.map