/** 活动类型2 */
class Active2Item extends ComponetBase
{
    public timeLab:eui.Label;//时间标签
    public desc:eui.Label;//描述标签
    public gainIconGroup_80:eui.Group;//奖励group
    public gainLab_0:eui.Label;//第一个奖励标签 x50万

    public gainIconGroup_0:eui.Group;//第二个奖励group
    public gainLab_1:eui.Label;//第二个奖励标签 x50万

    public gainGroup:eui.Group;//按钮
    public toGain:eui.Image;//去完成
    public lingqu:eui.Image;//领取

    private _state:any;
    private _id:any;
	public constructor() {
		super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_2.exml";
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this.setData();
	}
    private setData():void {
        let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let type = Active_Type.LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND;
        let item = activeModel.getActiveObjByType(type);
        let data = activeModel.getActiveDataById(item._id);

        let curGunId = userModel.getCurGunID();
        let gunVo = game.table.T_Gun_Table.getVoByKey(curGunId);
        //活动时间 
        this.timeLab.text = game.util.Language.getText(186) + game.util.TimeUtil.getActiveTime(item._startTime,item._endTime);

        /** 获得东西相关内容
         *  public gainIconGroup_80:eui.Group;//奖励group
            public gainLab_0:eui.Label;//第一个奖励标签 x50万
            public gainIconGroup_0:eui.Group;//第二个奖励group
            public gainLab_1:eui.Label;//第二个奖励标签 x50万 */
        let dataS = item._parameter2.split(",");
        let gain1Data = dataS[0].split("_");
        let gain2Data = dataS[1].split("_");
        let gain1Id = Number(gain1Data[0]);
        let gain2Id = Number(gain2Data[0]);
        let gain1Num = Number(gain1Data[1]);
        let gain2Num = Number(gain2Data[1]);

        if (gain1Num > 10000) {
            this.gainLab_0.text = "x" + gain1Num/10000 + "万";
        } else {
            this.gainLab_0.text = "x" + gain1Num;
        }

        if (gain2Num > 10000) {
            this.gainLab_1.text = "x" + gain2Num/10000 + "万";
        } else {
            this.gainLab_1.text = "x" + gain2Num;
        }

        let self = this;
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, gain1Id, function(icon:egret.Bitmap):void {
            if (!icon) {
                return;
            }
            icon.width = 100;
            icon.height = 100;
            icon.anchorOffsetX = icon.width/2;
            icon.anchorOffsetY = icon.height/2;
            icon.x = self.gainIconGroup_80.width/2;
            icon.y = self.gainIconGroup_80.height/2;
            self.gainIconGroup_80.addChild(icon);
        });
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, gain2Id, function(icon:egret.Bitmap):void {
            if (!icon) {
                return;
            }
            icon.width = 100;
            icon.height = 100;
            icon.anchorOffsetX = icon.width/2;
            icon.anchorOffsetY = icon.height/2;
            icon.x = self.gainIconGroup_80.width/2;
            icon.y = self.gainIconGroup_80.height/2;
            self.gainIconGroup_0.addChild(icon);
        });
        //描述
        this.desc.text = item._descVip;
        //状态
        let state = data._state;
        /** 	
         *  LIMIT_TIME_ACTIVE_STATE_INIT = 0,// 未达条件
            LIMIT_TIME_ACTIVE_STATE_CAN_RECEIVE = 1,// 可以领取
            LIMIT_TIME_ACTIVE_STATE_RECEIVED = 2,// 已经领取
            LIMIT_TIME_ACTIVE_STATE_OVERDUE = 3,// 已经过期
            LIMIT_TIME_ACTIVE_STATE_ACCEPTED = 4// 接受了活动任务 */
        switch (state) {
            case Active_State.LIMIT_TIME_ACTIVE_STATE_INIT: //未达条件
                this.toGain.visible = false;
                this.lingqu.visible = true;
            break;
            case Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED:// 已经领取
                this.toGain.visible = true;
                this.lingqu.visible = false;
                let colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
			    this.gainGroup.filters = [colorFlilter];
            break;
        }
        this._state = state;
        this._id = item._id;
        let gainBtn = new burn.tools.UIWrap(this.gainGroup);
        this.gainGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
    private onClick() {
        if (this._state == Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED) {//已经领取
            //提示
            game.util.GameUtil.popTips(game.util.Language.getText(181));
        } else {
            let send:LimitedTimeActiveSendMessage = new LimitedTimeActiveSendMessage();
            send.initData();
            send.setId(this._id);
            send.setState(1);
            NetManager.send(send);
        }
    }
    public destory() {
        this.gainGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
}