var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var model;
    (function (model) {
        /**
         * task对象
         */
        var TaskItem = (function () {
            function TaskItem(taskID, taskState, curValue, comTime) {
                if (comTime === void 0) { comTime = null; }
                this._nTaskID = taskID;
                this._nTaskState = taskState;
                this._nCurValue = curValue;
                var vo = game.table.T_FishTaskItem_Table.getVoByKey(taskID);
                if (vo) {
                    this._nType = vo.type;
                    //大奖赛 添加完成时间
                    if (vo.type == TaskType.TASK_TYPE_GRAND_PRIX) {
                        var timeValue = game.table.T_Config_Table.getVoByKey(67).value;
                        var time = game.util.TimeUtil.getCurrTime() + (Number(timeValue));
                        this._nComTime = time;
                    }
                    else if (vo.type == TaskType.TASK_TYPE_PRICE) {
                        var timeValue = game.table.T_Config_Table.getVoByKey(67).value;
                        var time = game.util.TimeUtil.getCurrTime() + (Number(timeValue));
                        this._nComTime = time;
                    }
                }
            }
            TaskItem.prototype.getTaskID = function () {
                return this._nTaskID;
            };
            TaskItem.prototype.getTaskState = function () {
                return this._nTaskState;
            };
            TaskItem.prototype.setTaskState = function (state) {
                this._nTaskState = state;
            };
            TaskItem.prototype.getValue = function () {
                return this._nCurValue;
            };
            TaskItem.prototype.setValue = function (value) {
                this._nCurValue = value;
            };
            TaskItem.prototype.getType = function () {
                return this._nType;
            };
            //获取完成时间
            TaskItem.prototype.getComTime = function () {
                return this._nComTime;
            };
            //
            TaskItem.prototype.setComTime = function (value) {
                this._nComTime = value;
            };
            return TaskItem;
        }());
        model.TaskItem = TaskItem;
        __reflect(TaskItem.prototype, "game.model.TaskItem");
    })(model = game.model || (game.model = {}));
})(game || (game = {}));
//# sourceMappingURL=TaskItem.js.map