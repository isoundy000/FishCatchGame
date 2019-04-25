var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/** 活动类型1 */
var Active1Item = (function (_super) {
    __extends(Active1Item, _super);
    function Active1Item() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/fish_skins/active/Active_1.exml";
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        _this.setData();
        return _this;
    }
    Active1Item.prototype.setData = function () {
        var activeModel = burn.Director.getModelByKey(ActiveModel);
        var userModel = burn.Director.getModelByKey(UserModel);
        var type = Active_Type.LIMIT_TIME_ACTIVE_TYPE_FISH_SEND;
        var item = activeModel.getActiveObjByType(type);
        var data = activeModel.getActiveDataById(item._id);
        var curGunId = userModel.getCurGunID();
        var gunVo = game.table.T_Gun_Table.getVoByKey(curGunId);
        //活动时间 
        // let startDate = new Date(item._startTime);
        // let entDate = new Date(item._endTime);
        this.timeLab.text = game.util.Language.getText(186) + game.util.TimeUtil.getActiveTime(item._startTime, item._endTime);
        //this.timeLab.textAlign = egret.HorizontalAlign.LEFT;
        //描述
        this.desc.text = item._descVip;
        this.maxGunRateLab.text = gunVo.bulletNum + "";
        //进度条
        var max = Number(item._parameter1) * gunVo.bulletNum; //第一个参数是进度条的max
        var cur = data._value;
        var percent = cur * 1.0 / Number(max);
        this.proCur_220.width = 350.0 * percent;
        if (percent > 1) {
            this.proCur_220.width = 350.0;
        }
        this._percent = percent;
        this.proLab.text = cur + "/" + max;
        //奖励信息
        var gainNum = gunVo.bulletNum * 100;
        var gainStr = "";
        if (gainNum > 10000) {
            gainStr = gainNum / 10000 + "万";
        }
        if (gainStr != "") {
            this.gainDesc.text = "x" + gainStr + "";
        }
        else {
            this.gainDesc.text = "x" + gainNum + "";
        }
        var state = data._state;
        this._state = data._state;
        this._id = item._id;
        /**
         *  LIMIT_TIME_ACTIVE_STATE_INIT = 0,// 未达条件
            LIMIT_TIME_ACTIVE_STATE_CAN_RECEIVE = 1,// 可以领取
            LIMIT_TIME_ACTIVE_STATE_RECEIVED = 2,// 已经领取
            LIMIT_TIME_ACTIVE_STATE_OVERDUE = 3,// 已经过期
            LIMIT_TIME_ACTIVE_STATE_ACCEPTED = 4// 接受了活动任务 */
        switch (state) {
            case Active_State.LIMIT_TIME_ACTIVE_STATE_INIT:
                this.toGain.visible = false;
                this.toCom.visible = false;
                this.toStart.visible = true;
                break;
            case Active_State.LIMIT_TIME_ACTIVE_STATE_ACCEPTED:
                //判断是否是可以领取
                if (percent >= 1) {
                    this.toGain.visible = true;
                    this.toCom.visible = false;
                    this.toStart.visible = false;
                }
                else {
                    this.toGain.visible = false;
                    this.toCom.visible = true;
                    this.toStart.visible = false;
                }
                break;
            case Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED:
                this.toGain.visible = false;
                this.toCom.visible = false;
                this.toStart.visible = false;
                this.yilingqu.visible = true;
                var colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
                this.gainGroup.filters = [colorFlilter];
                break;
        }
        var gainBtn = new burn.tools.UIWrap(this.gainGroup);
        this.gainGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    Active1Item.prototype.onClick = function () {
        switch (this._state) {
            case Active_State.LIMIT_TIME_ACTIVE_STATE_INIT:
                var send = new LimitedTimeActiveSendMessage();
                send.initData();
                send.setId(this._id);
                send.setState(0); //0:接受;1:领取;
                NetManager.send(send);
                break;
            case Active_State.LIMIT_TIME_ACTIVE_STATE_ACCEPTED:
                if (this._percent >= 1) {
                    var send_1 = new LimitedTimeActiveSendMessage();
                    send_1.initData();
                    send_1.setId(this._id);
                    send_1.setState(1); //0:接受;1:领取;
                    NetManager.send(send_1);
                }
                else {
                    //自动开始
                    burn._Notification_.send(NotifyEnum.RES_LOAD_OVER, null);
                }
                break;
            case Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED:
                game.util.GameUtil.popTips(game.util.Language.getText(195));
                break;
        }
    };
    Active1Item.prototype.destory = function () {
        this.gainGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return Active1Item;
}(ComponetBase));
__reflect(Active1Item.prototype, "Active1Item");
//# sourceMappingURL=Active1Item.js.map