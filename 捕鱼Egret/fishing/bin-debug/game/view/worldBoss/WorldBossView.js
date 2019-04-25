var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WorldBossView = (function (_super) {
    __extends(WorldBossView, _super);
    function WorldBossView() {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        return _this;
    }
    WorldBossView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new WorldBossCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //关闭当前界面
        this._uiDisplay.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.helpBtn));
        var self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Djs/DjsItem.exml", function () {
            self.send(NotifyEnum.DJS_ITEM_LOADED);
        }, this);
    };
    WorldBossView.prototype.initList = function (msg) {
        //排行数据
        var myData = msg.getMyData();
        this._uiDisplay.myScoreLab.text = myData.rankValue + "";
        if (myData.rankValue != 0) {
            this._uiDisplay.myRankLab.text = myData.rank + "";
        }
        else {
            this._uiDisplay.myRankLab.text = "未上榜";
        }
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
    };
    /**关闭游戏 */
    WorldBossView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    /** 打开规则 */
    WorldBossView.prototype.openHelp = function (e) {
        var settingView = new DjsRuleView(Rule_State.WorldBoss);
        var settingMed = new DjsRuleMediator(settingView);
        burn.Director.pushView(settingMed);
    };
    WorldBossView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/worldBoss/WorldBossUI.exml", this.addBgResource, this);
    };
    WorldBossView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.helpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
        this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/worldBoss/WorldBossUI.exml");
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Djs/DjsItem.exml");
    };
    return WorldBossView;
}(burn.view.PopView));
__reflect(WorldBossView.prototype, "WorldBossView");
/***操作UI的对应类 */
var WorldBossCom = (function (_super) {
    __extends(WorldBossCom, _super);
    function WorldBossCom() {
        return _super.call(this) || this;
    }
    return WorldBossCom;
}(eui.Component));
__reflect(WorldBossCom.prototype, "WorldBossCom");
//# sourceMappingURL=WorldBossView.js.map