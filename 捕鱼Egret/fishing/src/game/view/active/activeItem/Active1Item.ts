/** 活动类型1 */
class Active1Item extends ComponetBase
{
    public timeLab:eui.Label;
    public desc:eui.Label;
    public maxGunRateLab:egret.BitmapText;
    public proCur_220:eui.Image;
    public proLab:eui.Label;

    public gainIconGroup_80:eui.Group;
    public gainDesc:eui.Label;

    public gainGroup:eui.Group;//按钮
    public toGain:eui.Image;//领取奖励
    public toCom:eui.Image;//去完成
    public toStart:eui.Image;//开始任务
    public yilingqu:eui.Image;//已领取

    private _state:any;
    private _id:any;
    private _percent:any;
	public constructor() {
		super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/fish_skins/active/Active_1.exml";
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this.setData();
	}
    private setData():void {
		let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let type = Active_Type.LIMIT_TIME_ACTIVE_TYPE_FISH_SEND;
        let item = activeModel.getActiveObjByType(type);
        let data = activeModel.getActiveDataById(item._id);

        let curGunId = userModel.getCurGunID();
        let gunVo = game.table.T_Gun_Table.getVoByKey(curGunId);
        //活动时间 
        // let startDate = new Date(item._startTime);
        // let entDate = new Date(item._endTime);
        this.timeLab.text = game.util.Language.getText(186) + game.util.TimeUtil.getActiveTime(item._startTime,item._endTime);
        //this.timeLab.textAlign = egret.HorizontalAlign.LEFT;
        //描述
        this.desc.text = item._descVip;
        this.maxGunRateLab.text = gunVo.bulletNum + "";
        //进度条
        let max = Number(item._parameter1) * gunVo.bulletNum;//第一个参数是进度条的max
        let cur = data._value;
        let percent = cur * 1.0 / Number(max);
        this.proCur_220.width = 350.0 * percent;
        if(percent > 1) {
            this.proCur_220.width = 350.0 ;
        }
        this._percent = percent;
        this.proLab.text = cur + "/" + max;

        //奖励信息
        let gainNum = gunVo.bulletNum * 100;
        let gainStr = "";
        if(gainNum > 10000) {
            gainStr = gainNum / 10000 + "万";
        }
        if(gainStr != "") {
            this.gainDesc.text = "x" + gainStr + "";
        }else
        {
            this.gainDesc.text = "x" + gainNum + "";
        }

        let state = data._state;
        this._state = data._state;
        this._id = item._id;
        /** 	
         *  LIMIT_TIME_ACTIVE_STATE_INIT = 0,// 未达条件
            LIMIT_TIME_ACTIVE_STATE_CAN_RECEIVE = 1,// 可以领取
            LIMIT_TIME_ACTIVE_STATE_RECEIVED = 2,// 已经领取
            LIMIT_TIME_ACTIVE_STATE_OVERDUE = 3,// 已经过期
            LIMIT_TIME_ACTIVE_STATE_ACCEPTED = 4// 接受了活动任务 */
        switch(state) {
            case Active_State.LIMIT_TIME_ACTIVE_STATE_INIT: //未达条件
                this.toGain.visible = false;
                this.toCom.visible = false;
                this.toStart.visible = true;
                break;
            case Active_State.LIMIT_TIME_ACTIVE_STATE_ACCEPTED://接受了活动任务
                //判断是否是可以领取
                if(percent >= 1) {
                    this.toGain.visible = true;
                    this.toCom.visible = false;
                    this.toStart.visible = false;
                }else {
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
                let colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
                this.gainGroup.filters = [colorFlilter];
            break;
        }
        let gainBtn = new burn.tools.UIWrap(this.gainGroup);
        this.gainGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
    public onClick() {
        switch(this._state) {
            case Active_State.LIMIT_TIME_ACTIVE_STATE_INIT: //未达条件
                let send:LimitedTimeActiveSendMessage = new LimitedTimeActiveSendMessage();
                send.initData();
                send.setId(this._id);
                send.setState(0);//0:接受;1:领取;
                NetManager.send(send);
            break;
            case Active_State.LIMIT_TIME_ACTIVE_STATE_ACCEPTED://接受了活动任务
                if(this._percent >= 1) {
                    let send:LimitedTimeActiveSendMessage = new LimitedTimeActiveSendMessage();
                    send.initData();
                    send.setId(this._id);
                    send.setState(1);//0:接受;1:领取;
                    NetManager.send(send);
                }else {
                    //自动开始
                    burn._Notification_.send(NotifyEnum.RES_LOAD_OVER, null);
                }
            break;
            case Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED:
                game.util.GameUtil.popTips(game.util.Language.getText(195));
            break;
        }
    }
    public destory() {
        this.gainGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
}