var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 任务数据
 */
var TaskModel = (function (_super) {
    __extends(TaskModel, _super);
    function TaskModel() {
        return _super.call(this) || this;
    }
    TaskModel.prototype.init = function () {
        this._taskList = new Array();
        this._nActivityDay = 0;
        this._nActivityWeek = 0;
    };
    /** 添加 */
    TaskModel.prototype.addItem = function (item) {
        var flag = this.isExist(item);
        if (!flag) {
            this._taskList.push(item);
            return;
        }
        for (var i = 0; i < this._taskList.length; i++) {
            var currItem = this._taskList[i];
            if (item.getTaskID() == currItem.getTaskID()) {
                this._taskList[i] = item;
            }
            else {
                this._taskList.push(item);
            }
        }
    };
    TaskModel.prototype.updateItem = function (itemId, state, value, comTime) {
        if (comTime === void 0) { comTime = null; }
        var len = this._taskList.length;
        for (var i = 0; i < len; i++) {
            var currItem = this._taskList[i];
            if (itemId == currItem.getTaskID()) {
                currItem.setTaskState(state);
                currItem.setValue(value);
                if (comTime) {
                    currItem.setComTime(comTime);
                }
                return;
            }
        }
        //如果没有return.说明是第一次添加
        var item = new game.model.TaskItem(itemId, state, value, comTime);
        this.addItem(item);
    };
    /** 清空 */
    TaskModel.prototype.clearEmail = function () {
        this._taskList = null;
        this._taskList = new Array();
    };
    TaskModel.prototype.removeItem = function (mailId) {
        for (var i = 0; i < this._taskList.length; i++) {
            var currItem = this._taskList[i];
            if (mailId == currItem.getTaskID()) {
                this._taskList.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    /** 获取列表 */
    TaskModel.prototype.getTaskList = function () {
        return this._taskList;
    };
    /** 获取实体 */
    TaskModel.prototype.getTaskListById = function (id) {
        for (var i = 0; i < this._taskList.length; i++) {
            var currItem = this._taskList[i];
            if (id == currItem.getTaskID()) {
                return currItem;
            }
        }
        return null;
    };
    /** 获取实体 */
    TaskModel.prototype.getTaskListByType = function (type) {
        var arrData = new Array();
        for (var i = 0; i < this._taskList.length; i++) {
            var currItem = this._taskList[i];
            if (currItem.getType() == type) {
                arrData.push(currItem);
            }
        }
        return arrData;
    };
    //判断是否存在
    TaskModel.prototype.isExist = function (item) {
        for (var i = 0; i < this._taskList.length; i++) {
            var currItem = this._taskList[i];
            if (item.getTaskID() == currItem.getTaskID()) {
                return true;
            }
        }
        return false;
    };
    //是否该显示红点
    TaskModel.prototype.showAlert = function () {
        var alert = false;
        var list = this.getTaskListByType(TaskType.TASK_TYPE_AVT_DAY);
        for (var i = 0; i < list.length; i++) {
            if (list[i].getTaskState() == TaskState.TAST_STATE_CAN_RECEIVE) {
                alert = true;
                break;
            }
        }
        if (alert) {
            return alert;
        }
        list = this.getTaskListByType(TaskType.TASK_TYPE_AVT_WEEK);
        for (var i = 0; i < list.length; i++) {
            if (list[i].getTaskState() == TaskState.TAST_STATE_CAN_RECEIVE) {
                alert = true;
                break;
            }
        }
        if (alert) {
            return alert;
        }
        list = this.getTaskListByType(TaskType.TASK_TYPE_EVERYDAY);
        for (var i = 0; i < list.length; i++) {
            if (list[i].getTaskState() == TaskState.TAST_STATE_CAN_RECEIVE) {
                alert = true;
                break;
            }
        }
        if (alert) {
            return alert;
        }
        list = this.getTaskListByType(TaskType.TASK_TYPE_EVERY_WEEK);
        for (var i = 0; i < list.length; i++) {
            if (list[i].getTaskState() == TaskState.TAST_STATE_CAN_RECEIVE) {
                alert = true;
                break;
            }
        }
        return alert;
    };
    TaskModel.prototype.clear = function () {
    };
    TaskModel.prototype.destroy = function () {
    };
    return TaskModel;
}(burn.model.ModelBase));
__reflect(TaskModel.prototype, "TaskModel");
//# sourceMappingURL=TaskModel.js.map