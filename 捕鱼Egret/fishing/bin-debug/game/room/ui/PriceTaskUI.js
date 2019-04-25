var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//PriceTaskUI
var PriceTaskUI = (function (_super) {
    __extends(PriceTaskUI, _super);
    function PriceTaskUI() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/price/PriceTask.exml";
        _this.gainArr = new Array();
        _this.gainArr.push(_this.gain_0);
        _this.gainArr.push(_this.gain_1);
        _this.gainArr.push(_this.gain_2);
        _this.gainLabArr = new Array();
        _this.gainLabArr.push(_this.gainNumLab_0);
        _this.gainLabArr.push(_this.gainNumLab_1);
        _this.gainLabArr.push(_this.gainNumLab_2);
        burn.tools.TweenTools.ShowOutAndInMoreHalf(_this.shink, 2000);
        return _this;
    }
    PriceTaskUI.prototype.setTask = function () {
        var taskModel = burn.Director.getModelByKey(TaskModel);
        var userModel = burn.Director.getModelByKey(UserModel);
        var taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
        if (this._timer) {
            this._timer.stop();
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this._timer = null;
        }
        //定义Timer
        this._timer = new egret.Timer(1000, 0);
        //注册事件侦听器
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._timer.start();
        //奖励更新
        this.gain_0.removeChildren();
        this.gain_1.removeChildren();
        this.gain_2.removeChildren();
        this.gainNumLab_0.text = "";
        this.gainNumLab_1.text = "";
        this.gainNumLab_2.text = "";
        var len = taskList.length;
        for (var i = 0; i < len; i++) {
            var item = taskList[i];
            if (i >= this.gainLabArr.length) {
                continue;
            }
            var vo = game.table.T_FishTaskItem_Table.getVoByKey(item.getTaskID());
            if (!vo) {
                continue;
            }
            this.gainLabArr[i].text = item.getValue() + "/" + vo.parameter2;
            var fishVo = game.table.T_Fish_Table.getVoByKey(vo.parameter1);
            if (!fishVo) {
                continue;
            }
            (function (fishVo, i, group) {
                var txtr = "fishkind_" + fishVo.fishkindIcon + "_png";
                RES.getResAsync(txtr, function () {
                    var txture = RES.getRes(txtr);
                    var img = new egret.Bitmap(txture);
                    img.scaleX = 0.7;
                    img.scaleY = 0.7;
                    img.anchorOffsetX = img.width / 2;
                    img.anchorOffsetY = img.height / 2;
                    group.addChild(img);
                }, this);
            })(fishVo, i, this.gainArr[i]);
        }
    };
    PriceTaskUI.prototype.timerFunc = function () {
        var taskModel = burn.Director.getModelByKey(TaskModel);
        var taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
        if (taskList.length == 0) {
            return;
        }
        var len = taskList.length;
        var time = taskList[0].getComTime();
        var residueTime = time - game.util.TimeUtil.getCurrTime();
        if (residueTime <= 0) {
            burn._Notification_.send(NotifyEnum.CLEAR_PRICE_TASK);
            burn._Notification_.send(NotifyEnum.PRICE_CHALLENGE_FAIL);
            return;
        }
        var timeStr = game.util.TimeUtil.sceonds2MinStr(residueTime);
        this.taskTimeLab.text = timeStr;
    };
    //清空
    PriceTaskUI.prototype.clearTask = function () {
        if (this._timer) {
            this._timer.stop();
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this._timer = null;
        }
    };
    /** 销毁函数 */
    PriceTaskUI.prototype.destroy = function () {
    };
    return PriceTaskUI;
}(eui.Component));
__reflect(PriceTaskUI.prototype, "PriceTaskUI");
//# sourceMappingURL=PriceTaskUI.js.map