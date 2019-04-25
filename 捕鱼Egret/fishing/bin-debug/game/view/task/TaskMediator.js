var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TaskMediator = (function (_super) {
    __extends(TaskMediator, _super);
    function TaskMediator(view) {
        var _this = _super.call(this, view, "TaskMediator") || this;
        _this._nCurIndex = 2;
        return _this;
    }
    TaskMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.subscrib(NotifyEnum.TASK_UI_LOADED, this.viewInit);
        this.subscrib(NotifyEnum.TASK_CHANGE_LIST, this.changeList);
        this.subscrib(NotifyEnum.TASK_ACT_CHANGE, this.actChange);
        var self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.FINISHTASKBACK, function (msg) {
            self.taskFinishBack(msg);
        });
        this.getView().initView();
    };
    TaskMediator.prototype.actChange = function (obj, target) {
        //初始化数据
        var view = target.getView();
        var taskModel = burn.Director.getModelByKey(TaskModel);
        //活跃度
        var actType = target._nCurIndex + 6;
        view.setActList(taskModel.getTaskListByType(actType));
    };
    TaskMediator.prototype.changeList = function (obj, target, bAct) {
        //初始化数据
        var view = target.getView();
        var taskModel = burn.Director.getModelByKey(TaskModel);
        var type = Number(obj);
        target._nCurIndex = type;
        view.initList(taskModel.getTaskListByType(type));
        if (bAct) {
            return;
        }
        //活跃度
        var actType = type + 6;
        view.setActList(taskModel.getTaskListByType(actType));
    };
    TaskMediator.prototype.viewInit = function (obj, target) {
        //初始化数据
        var view = target.getView();
        view.setViewData();
    };
    TaskMediator.prototype.taskFinishBack = function (msg) {
        /**required uint32 state = 1;
    required uint32 taskId = 2;
    repeated ItemInfo taskAward = 3; */
        var state = msg.getState();
        if (state != 1) {
            return;
        }
        var taskId = msg.getTaskId();
        var vo = game.table.T_FishTaskItem_Table.getVoByKey(taskId);
        if (!vo) {
            return;
        }
        var items = msg.getTaskAward();
        var model = burn.Director.getModelByKey(UserModel);
        var gainArr = new Array();
        for (var i = 0; i < items.length; i++) {
            var itemId = items[i].itemId;
            var count = items[i].totalCount;
            var data = new game.model.Item(itemId, count);
            var voItem = game.table.T_Item_Table.getVoByKey(itemId);
            if (!voItem) {
                continue;
            }
            var bInsert = false;
            if (itemId == PropEnum.GOLD) {
                model.setCoins(Number(model.getCoins()) + Number(count));
                burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: model.getUserId() });
            }
            else if (itemId == PropEnum.GEM) {
                model.setMoney(Number(model.getMoney()) + Number(count));
                burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: model.getUserId() });
            }
            if (voItem.type == 1) {
                if (itemId == PropEnum.ACT_DAY) {
                    model.setEverydayActive(model.getEverydayActive() + count);
                }
                else if (itemId == PropEnum.ACT_WEED) {
                    model.setEveryWeekActive(model.getEveryWeekActive() + count);
                }
                else if (itemId == PropEnum.GOLD
                    || itemId == PropEnum.GEM) {
                    gainArr.push(data);
                    bInsert = true;
                }
                continue;
            }
            if (model.isExist(data)) {
                var itemLast = model.getItemById(itemId);
                model.updateItem(itemId, itemLast.getCount() + count);
            }
            else {
                model.addItem(data);
            }
            if (!bInsert) {
                gainArr.push(data);
            }
        }
        if (gainArr.length > 0) {
            if (vo.type != TaskType.TASK_TYPE_AVT_DAY) {
                if (vo.type != TaskType.TASK_TYPE_AVT_WEEK) {
                    game.util.GameUtil.openCommongain(null, gainArr);
                }
            }
        }
        var taskModel = burn.Director.getModelByKey(TaskModel);
        var item = taskModel.getTaskListById(taskId);
        taskModel.updateItem(taskId, TaskState.TAST_STATE_RECEIVED, item.getValue());
        var view = this.getView();
        var type = vo.type;
        {
            switch (type) {
                case TaskType.TASK_TYPE_AVT_DAY:
                    view.showActSuc(taskId, type);
                    this.changeList(this._nCurIndex, this, true);
                    break;
                case TaskType.TASK_TYPE_AVT_WEEK:
                    view.showActSuc(taskId, type);
                    this.changeList(this._nCurIndex, this, true);
                    break;
                case TaskType.TASK_TYPE_NEWBIE:
                    break;
                case TaskType.TASK_TYPE_EVERYDAY:
                    view.initList(taskModel.getTaskListByType(type));
                    this.changeList(this._nCurIndex, this, false);
                    break;
                case TaskType.TASK_TYPE_EVERY_WEEK:
                    view.initList(taskModel.getTaskListByType(type));
                    this.changeList(this._nCurIndex, this, false);
                    break;
            }
        }
        view.setActNum();
        burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
        burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
    };
    TaskMediator.prototype.destroy = function () {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.TASK_UI_LOADED);
        this.unsubscribByType(NotifyEnum.TASK_CHANGE_LIST);
        this.unsubscribByType(NotifyEnum.TASK_ACT_CHANGE);
        game.net.MessageDispatcher.unregisterByType(game.net.ResponseType.FINISHTASKBACK);
    };
    return TaskMediator;
}(burn.mediator.SimpleMediator));
__reflect(TaskMediator.prototype, "TaskMediator");
//# sourceMappingURL=TaskMediator.js.map