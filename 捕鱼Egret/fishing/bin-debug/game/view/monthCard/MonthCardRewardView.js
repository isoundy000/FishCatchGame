var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MonthCardRewardView = (function (_super) {
    __extends(MonthCardRewardView, _super);
    function MonthCardRewardView(bShow) {
        if (bShow === void 0) { bShow = false; }
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._bShow = bShow;
        game.util.UIUtil.startLoading();
        return _this;
    }
    MonthCardRewardView.prototype.initView = function () {
        var self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/monthCard/MonthRewardUI.exml", function (clazz, url) {
            self.loadComplete(clazz, url);
        }, this);
        this._btnWrapList = new Array();
    };
    MonthCardRewardView.prototype.loadComplete = function (clazz, url) {
        game.util.UIUtil.closeLoading();
        this.removeChildren();
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        //添加操作UI
        var uiObj = new MonthCardReward();
        this._rewardUI = uiObj;
        this._rewardUI.skinName = clazz;
        this._rewardUI.horizontalCenter = 0;
        this._rewardUI.verticalCenter = 0;
        this._rewardUI.scroll.viewport = this._rewardUI.scrolGroup;
        uiLayer.addChild(this._rewardUI);
        if (!this._bPop) {
            game.util.UIUtil.popView(this._rewardUI.root);
            this._bPop = true;
        }
        var list = [];
        var vo = game.table.T_Charge_Table.getVoByKey(30);
        var rewardStr = vo.award.split(",");
        var len = rewardStr.length;
        for (var i = 0; i < len; i++) {
            var item = new game.model.Item(rewardStr[i].split("_")[0], rewardStr[i].split("_")[1]);
            list.push(item);
        }
        //添加关闭按钮事件
        this._rewardUI.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseEvent, this);
        //封装按钮状态功能
        this._btnWrapList.push(new burn.tools.UIWrap(this._rewardUI.okBtn));
        this.setListData(list);
    };
    MonthCardRewardView.prototype.setListData = function (newList) {
        var list = new Array();
        var len = newList.length;
        for (var i = 0; i < len; i++) {
            if (newList[i].getCount() == 0) {
                continue;
            }
            if (newList[i].getItemId() == PropEnum.FREE_RAGE) {
                continue;
            }
            if (newList[i].getItemId() == PropEnum.FREE_CLONE) {
                continue;
            }
            list.push(newList[i]);
        }
        //初始化列表
        var item = null;
        for (var i = 0; i < list.length; i++) {
            item = new MonthCardRewardItem(list[i].getItemId(), list[i].getCount());
            item.name = list[i].getItemId() + "";
            item.scaleX = item.scaleY = 0.95;
            item.init();
            this._rewardUI.scrolGroup.addChild(item);
        }
    };
    MonthCardRewardView.prototype.onCloseEvent = function () {
        burn.Director.popView();
        if (this._bShow) {
            this.send(NotifyEnum.CHECK_POP);
        }
    };
    /** 消毁UI */
    MonthCardRewardView.prototype.destroy = function () {
        var self = this;
        this._bPop = false;
        //关闭UI动画
        game.util.UIUtil.closeView(this._rewardUI.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._rewardUI.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onCloseEvent, self);
            self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/monthCard/MonthRewardUI.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml");
        });
    };
    return MonthCardRewardView;
}(burn.view.PopView));
__reflect(MonthCardRewardView.prototype, "MonthCardRewardView");
/***操作UI的对应类 */
var MonthCardReward = (function (_super) {
    __extends(MonthCardReward, _super);
    function MonthCardReward() {
        return _super.call(this) || this;
    }
    return MonthCardReward;
}(eui.Component));
__reflect(MonthCardReward.prototype, "MonthCardReward");
//# sourceMappingURL=MonthCardRewardView.js.map