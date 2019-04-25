var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/** 活动类型2 */
var Active2Item = (function (_super) {
    __extends(Active2Item, _super);
    function Active2Item() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_2.exml";
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        _this.setData();
        return _this;
    }
    Active2Item.prototype.setData = function () {
        var activeModel = burn.Director.getModelByKey(ActiveModel);
        var userModel = burn.Director.getModelByKey(UserModel);
        var type = Active_Type.LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND;
        var item = activeModel.getActiveObjByType(type);
        var data = activeModel.getActiveDataById(item._id);
        var curGunId = userModel.getCurGunID();
        var gunVo = game.table.T_Gun_Table.getVoByKey(curGunId);
        //活动时间 
        this.timeLab.text = game.util.Language.getText(186) + game.util.TimeUtil.getActiveTime(item._startTime, item._endTime);
        /** 获得东西相关内容
         *  public gainIconGroup_80:eui.Group;//奖励group
            public gainLab_0:eui.Label;//第一个奖励标签 x50万
            public gainIconGroup_0:eui.Group;//第二个奖励group
            public gainLab_1:eui.Label;//第二个奖励标签 x50万 */
        var dataS = item._parameter2.split(",");
        var gain1Data = dataS[0].split("_");
        var gain2Data = dataS[1].split("_");
        var gain1Id = Number(gain1Data[0]);
        var gain2Id = Number(gain2Data[0]);
        var gain1Num = Number(gain1Data[1]);
        var gain2Num = Number(gain2Data[1]);
        if (gain1Num > 10000) {
            this.gainLab_0.text = "x" + gain1Num / 10000 + "万";
        }
        else {
            this.gainLab_0.text = "x" + gain1Num;
        }
        if (gain2Num > 10000) {
            this.gainLab_1.text = "x" + gain2Num / 10000 + "万";
        }
        else {
            this.gainLab_1.text = "x" + gain2Num;
        }
        var self = this;
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, gain1Id, function (icon) {
            if (!icon) {
                return;
            }
            icon.width = 100;
            icon.height = 100;
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            icon.x = self.gainIconGroup_80.width / 2;
            icon.y = self.gainIconGroup_80.height / 2;
            self.gainIconGroup_80.addChild(icon);
        });
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, gain2Id, function (icon) {
            if (!icon) {
                return;
            }
            icon.width = 100;
            icon.height = 100;
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            icon.x = self.gainIconGroup_80.width / 2;
            icon.y = self.gainIconGroup_80.height / 2;
            self.gainIconGroup_0.addChild(icon);
        });
        //描述
        this.desc.text = item._descVip;
        //状态
        var state = data._state;
        /**
         *  LIMIT_TIME_ACTIVE_STATE_INIT = 0,// 未达条件
            LIMIT_TIME_ACTIVE_STATE_CAN_RECEIVE = 1,// 可以领取
            LIMIT_TIME_ACTIVE_STATE_RECEIVED = 2,// 已经领取
            LIMIT_TIME_ACTIVE_STATE_OVERDUE = 3,// 已经过期
            LIMIT_TIME_ACTIVE_STATE_ACCEPTED = 4// 接受了活动任务 */
        switch (state) {
            case Active_State.LIMIT_TIME_ACTIVE_STATE_INIT:
                this.toGain.visible = false;
                this.lingqu.visible = true;
                break;
            case Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED:
                this.toGain.visible = true;
                this.lingqu.visible = false;
                var colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
                this.gainGroup.filters = [colorFlilter];
                break;
        }
        this._state = state;
        this._id = item._id;
        var gainBtn = new burn.tools.UIWrap(this.gainGroup);
        this.gainGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    Active2Item.prototype.onClick = function () {
        if (this._state == Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED) {
            //提示
            game.util.GameUtil.popTips(game.util.Language.getText(181));
        }
        else {
            var send = new LimitedTimeActiveSendMessage();
            send.initData();
            send.setId(this._id);
            send.setState(1);
            NetManager.send(send);
        }
    };
    Active2Item.prototype.destory = function () {
        this.gainGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return Active2Item;
}(ComponetBase));
__reflect(Active2Item.prototype, "Active2Item");
//# sourceMappingURL=Active2Item.js.map