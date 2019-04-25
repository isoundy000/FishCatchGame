var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TaskItemUI = (function (_super) {
    __extends(TaskItemUI, _super);
    function TaskItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/task/TaskItem.exml";
        _this.toCom.visible = false;
        _this.toGain.visible = false;
        _this._nId = -1;
        return _this;
    }
    TaskItemUI.prototype.setPro = function (data) {
        var vo = game.table.T_FishTaskItem_Table.getVoByKey(data.getTaskID());
        if (!vo) {
            return;
        }
        this._nId = vo.id;
        var param = vo.award;
        var items = param.split(",");
        var itemData = items[0].split("_");
        var id = Number(itemData[0]);
        var count = Number(itemData[1]);
        var self = this;
        var showItem = new BagViewItem(id, count);
        showItem.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
        showItem.scaleX = showItem.scaleY = 0.75;
        showItem.anchorOffsetX = showItem.width / 2;
        showItem.anchorOffsetY = showItem.height / 2;
        showItem.init();
        this.iconGroup.addChild(showItem);
        this.proObj.maximum = vo.parameter2;
        this.proObj.value = data.getValue();
        //pro_des
        var txt = this.pro_des.text;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemData_1 = item.split("_");
            var id_1 = Number(itemData_1[0]);
            var count_1 = Number(itemData_1[1]);
            if (id_1 == PropEnum.ACT_DAY || id_1 == PropEnum.ACT_WEED) {
                var arrName = new Array();
                arrName.push(count_1 + "");
                this.pro_des.text = game.util.Language.getDynamicTextByStr(txt, arrName);
                break;
            }
        }
        this.nameLab.text = game.util.Language.getText(vo.describe);
        switch (data.getTaskState()) {
            case TaskState.TAST_STATE_CANT_RECEIVE:
                this.toCom.visible = true;
                this.toCom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCom, this);
                break;
            case TaskState.TAST_STATE_CAN_RECEIVE:
                this.toGain.visible = true;
                this.toGain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGain, this);
                break;
            case TaskState.TAST_STATE_RECEIVED:
                this.toEnd.visible = true;
                break;
        }
    };
    TaskItemUI.prototype.onCom = function (e) {
        if (this._nId == -1) {
            return;
        }
        if (this._nId == 2001 || this._nId == 3004) {
            burn.Director.popView();
            var signView = new SignView();
            var signMed = new SignMediator(signView);
            burn.Director.pushView(signMed);
            return;
        }
        burn.Director.popView();
        burn._Notification_.send(NotifyEnum.RES_LOAD_OVER, null);
    };
    TaskItemUI.prototype.onGain = function (e) {
        if (this._nId == -1) {
            return;
        }
        var send = new FinishTaskSendMessage();
        send.initData();
        send.setTaskId(this._nId);
        NetManager.send(send);
    };
    return TaskItemUI;
}(eui.Component));
__reflect(TaskItemUI.prototype, "TaskItemUI");
//# sourceMappingURL=TaskItem.js.map