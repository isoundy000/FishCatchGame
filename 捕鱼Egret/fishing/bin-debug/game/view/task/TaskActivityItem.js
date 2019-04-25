var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TaskActivityItemUI = (function (_super) {
    __extends(TaskActivityItemUI, _super);
    function TaskActivityItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/task/Task_Pro_Item.exml";
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        _this._nId = -1;
        _this._btnWrapList = new Array();
        return _this;
    }
    TaskActivityItemUI.prototype.setNormalNum = function (nNum) {
        this.num_normal.text = nNum + "";
        this.num_activity.text = nNum + "";
    };
    TaskActivityItemUI.prototype.setData = function (data) {
        this._data = data;
        egret.Tween.removeTweens(this);
        switch (data.getTaskState()) {
            case TaskState.TAST_STATE_CAN_RECEIVE:
                this.activity.visible = true;
                this._nId = data.getTaskID();
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGain, this);
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
                this.normal.visible = false;
                this.gained.visible = false;
                burn.tools.TweenTools.hop(this, 0.05, 250);
                break;
            case TaskState.TAST_STATE_CANT_RECEIVE:
                this.normal.visible = true;
                this.activity.visible = false;
                this.gained.visible = false;
                break;
            case TaskState.TAST_STATE_RECEIVED:
                this.activity.visible = false;
                this.normal.visible = false;
                this.gained.visible = true;
                break;
        }
        this._btnWrapList.push(new burn.tools.UIWrap(this));
    };
    //播放一个成功
    TaskActivityItemUI.prototype.playSuc = function (data) {
        this.setData(data);
        var data1 = RES.getRes("ef_baoxiang_json");
        var txtr = RES.getRes("ef_baoxiang_png");
        var mcFactory = new egret.MovieClipDataFactory(data1, txtr);
        var effect = new egret.MovieClip(mcFactory.generateMovieClipData("ef_baoxiang"));
        effect.frameRate = 10;
        effect.gotoAndPlay("play", 1);
        effect.anchorOffsetX = effect.width / 2;
        effect.anchorOffsetY = effect.height / 2;
        effect.x = this.width / 2;
        effect.y = this.height / 2;
        this.addChild(effect);
        var self = this;
        effect.addEventListener(egret.Event.COMPLETE, function (e) {
            self.removeChild(effect);
            if (!self._data) {
                return;
            }
            var vo = game.table.T_FishTaskItem_Table.getVoByKey(self._data.getTaskID());
            var award = vo.award.split(",");
            var len = award.length;
            var gainArr = new Array();
            for (var i = 0; i < len; i++) {
                var data_1 = award[i].split("_");
                var dataObj = new game.model.Item(Number(data_1[0]), Number(data_1[1]));
                gainArr.push(dataObj);
            }
            game.util.GameUtil.openCommongain(null, gainArr);
        }, this);
    };
    TaskActivityItemUI.prototype.onGain = function (e) {
        if (this._nId == -1) {
            return;
        }
        // let taskModel:TaskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
        // taskModel.updateItem(this._nId,2,1);
        // let item = taskModel.getTaskListById(this._nId);
        // this.playSuc(item);
        // return;
        var send = new FinishTaskSendMessage();
        send.initData();
        send.setTaskId(this._nId);
        NetManager.send(send);
    };
    TaskActivityItemUI.prototype.onTouchBegin = function (e) {
        this.activity.scaleX = this.activity.scaleY = 0.75;
        game.util.SoundManager.playUISound("B06");
    };
    TaskActivityItemUI.prototype.onTouchEnd = function (e) {
        this.activity.scaleX = this.activity.scaleY = 1;
    };
    TaskActivityItemUI.prototype.destroy = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGain, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    };
    return TaskActivityItemUI;
}(eui.Component));
__reflect(TaskActivityItemUI.prototype, "TaskActivityItemUI");
//# sourceMappingURL=TaskActivityItem.js.map