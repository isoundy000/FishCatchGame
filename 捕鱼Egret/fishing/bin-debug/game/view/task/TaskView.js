var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TaskView = (function (_super) {
    __extends(TaskView, _super);
    function TaskView() {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._btnWrapList = new Array();
        _this._bArrShowAct = new Array();
        _this._bPop = false;
        _this._arrAct = new Array();
        game.util.UIUtil.startLoading();
        return _this;
    }
    TaskView.prototype.addBgResource = function () {
        var _this = this;
        game.util.UIUtil.closeLoading();
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new TaskViewUI();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/task/TaskUI.exml";
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //关闭当前界面
        var closeBtn = this._uiDisplay.closeBtn;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
        if (!this._bPop) {
            game.util.UIUtil.popView(this._uiDisplay.root);
            this._bPop = true;
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/task/TaskItem.exml", function () {
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/task/Task_Pro_Item.exml", function () {
                    RES.getResAsync("ef_baoxiang_json", function () {
                        RES.getResAsync("ef_baoxiang_png", function () {
                            _this.send(NotifyEnum.TASK_UI_LOADED);
                        }, _this);
                    }, _this);
                }, _this);
            }, this);
        }
    };
    TaskView.prototype.setViewData = function () {
        this._uiDisplay.dailyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeListDaily, this);
        this._uiDisplay.weekBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeListWeed, this);
        this.onChangeListDaily(null);
    };
    TaskView.prototype.onChangeListDaily = function (e) {
        if (this._nCurListIndex == 2) {
            return;
        }
        this._nCurListIndex = 2;
        this._uiDisplay.weekBtn.alpha = 0;
        this._uiDisplay.dailyBtn.alpha = 1;
        this._uiDisplay.weekImg_on.alpha = 0;
        this._uiDisplay.dailyImg_on.alpha = 1;
        this.send(NotifyEnum.TASK_CHANGE_LIST, this._nCurListIndex);
    };
    TaskView.prototype.onChangeListWeed = function (e) {
        if (this._nCurListIndex == 3) {
            return;
        }
        this._nCurListIndex = 3;
        this._uiDisplay.weekBtn.alpha = 1;
        this._uiDisplay.dailyBtn.alpha = 0;
        this._uiDisplay.weekImg_on.alpha = 1;
        this._uiDisplay.dailyImg_on.alpha = 0;
        this.send(NotifyEnum.TASK_CHANGE_LIST, this._nCurListIndex);
    };
    TaskView.prototype.initList = function (arr) {
        var newArr = new Array();
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i].getTaskState() == TaskState.TAST_STATE_CAN_RECEIVE) {
                newArr.push(arr[i]);
            }
        }
        for (var i = 0; i < len; i++) {
            if (arr[i].getTaskState() == TaskState.TAST_STATE_CANT_RECEIVE) {
                newArr.push(arr[i]);
            }
        }
        for (var i = 0; i < len; i++) {
            if (arr[i].getTaskState() == TaskState.TAST_STATE_RECEIVED) {
                newArr.push(arr[i]);
            }
        }
        this._uiDisplay.listGroup.removeChildren();
        var len1 = newArr.length;
        var bFindAct = this.findAct(this._nCurListIndex);
        for (var i = 0; i < len1; i++) {
            var itemDown = new TaskItemUI();
            itemDown.setPro(newArr[i]);
            this._uiDisplay.listGroup.addChild(itemDown);
            if (!bFindAct) {
                game.util.UIUtil.listTween(itemDown.root, i);
            }
        }
        var tLayout = new eui.VerticalLayout();
        this._uiDisplay.listGroup.layout = tLayout; /// 网格布局
        this.setActNum();
    };
    TaskView.prototype.findAct = function (nType) {
        var bFind = false;
        var len = this._bArrShowAct.length;
        for (var i = 0; i < len; i++) {
            if (this._bArrShowAct[i] == nType) {
                return true;
            }
        }
        if (!bFind) {
            this._bArrShowAct.push(nType);
        }
        return bFind;
    };
    TaskView.prototype.setActNum = function () {
        this._uiDisplay.task_pro_num.removeChildren();
        var lab = new eui.Label();
        var actNum = 0;
        if (this._nCurListIndex == TaskType.TASK_TYPE_EVERY_WEEK) {
            var userModel = burn.Director.getModelByKey(UserModel);
            actNum = userModel.getEveryWeekActive();
        }
        else if (this._nCurListIndex == TaskType.TASK_TYPE_EVERYDAY) {
            var userModel = burn.Director.getModelByKey(UserModel);
            actNum = userModel.getEverydayActive();
        }
        lab.text = actNum + "";
        lab.textAlign = egret.HorizontalAlign.CENTER;
        lab.anchorOffsetX = lab.width / 2;
        lab.anchorOffsetY = lab.height / 2;
        this._uiDisplay.task_pro_num.addChild(lab);
        if (actNum > 120) {
            actNum = 120;
        }
        var percent = actNum / 120.0;
        var widthOld = 682;
        this._uiDisplay.pro_cur.width = widthOld * percent;
    };
    TaskView.prototype.setActList = function (arr) {
        if (!arr) {
            return;
        }
        if (arr.length != 4) {
            return;
        }
        this._arrAct.length = 0;
        this._uiDisplay.pro_0.removeChildren();
        this._uiDisplay.pro_1.removeChildren();
        this._uiDisplay.pro_2.removeChildren();
        this._uiDisplay.pro_3.removeChildren();
        var item = new TaskActivityItemUI();
        item.name = "actItem";
        item.setNormalNum(30);
        this._uiDisplay.pro_0.addChild(item);
        item.setData(arr[0]);
        var item1 = new TaskActivityItemUI();
        item1.name = "actItem";
        item1.setNormalNum(60);
        this._uiDisplay.pro_1.addChild(item1);
        item1.setData(arr[1]);
        var item2 = new TaskActivityItemUI();
        item2.name = "actItem";
        item2.setNormalNum(90);
        this._uiDisplay.pro_2.addChild(item2);
        item2.setData(arr[2]);
        var item3 = new TaskActivityItemUI();
        item3.name = "actItem";
        item3.setNormalNum(120);
        this._uiDisplay.pro_3.addChild(item3);
        item3.setData(arr[3]);
        this._arrAct.push(item);
        this._arrAct.push(item1);
        this._arrAct.push(item2);
        this._arrAct.push(item3);
    };
    TaskView.prototype.showActSuc = function (id, type) {
        if (this._nCurListIndex != (type - 6)) {
            return;
        }
        var taskModel = burn.Director.getModelByKey(TaskModel);
        var list = taskModel.getTaskListByType(type);
        var len = list.length;
        var index = -1;
        for (var i = 0; i < len; i++) {
            if (list[i].getTaskID() == id) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            return;
        }
        //播放一个动画
        this._arrAct[index].playSuc(list[index]);
    };
    /**关闭游戏 */
    TaskView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    TaskView.prototype.initView = function () {
        //userLvUp 
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/task/TaskUI.exml", this.addBgResource, this);
    };
    TaskView.prototype.destroy = function () {
        var self = this;
        this._bPop = false;
        //关闭UI动画
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self.parent && self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/task/TaskUI.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/task/Task_Pro_Item.exml");
            RES.destroyRes("ef_baoxiang_json");
            RES.destroyRes("ef_baoxiang_png");
        });
    };
    return TaskView;
}(burn.view.PopView));
__reflect(TaskView.prototype, "TaskView");
/***操作UI的对应类 */
var TaskViewUI = (function (_super) {
    __extends(TaskViewUI, _super);
    function TaskViewUI() {
        return _super.call(this) || this;
    }
    return TaskViewUI;
}(eui.Component));
__reflect(TaskViewUI.prototype, "TaskViewUI");
//# sourceMappingURL=TaskView.js.map