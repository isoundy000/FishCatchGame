class ActiveLeftItem extends eui.Component{
    public unSelGroup:eui.Group;
    public selGroup:eui.Group;
    public selected:eui.Group;
    public _nIndex:number;
    public alert:eui.Image;
	public constructor() {
		super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/active/ActiveLeftItem.exml";
	}
    public setImg(url:string, index:number):void
    {
        let self = this;
        let txtr = url + "_2_png";
        RES.getResAsync(txtr, function():void {
            let txture:egret.Texture = RES.getRes(txtr);
            let img:egret.Bitmap = new egret.Bitmap(txture);
            img.anchorOffsetX = img.width/2;
            img.anchorOffsetY = img.height/2;
            self.unSelGroup.addChild(img);
        }, this);
        
        let txtr1 = url + "_1_png";
        RES.getResAsync(txtr1, function():void {
            let txture:egret.Texture = RES.getRes(txtr1);
            let img:egret.Bitmap = new egret.Bitmap(txture);
            img.anchorOffsetX = img.width/2;
            img.anchorOffsetY = img.height/2;
            self.selGroup.addChild(img);
        }, this);

        this._nIndex = index;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeActive, this);

        //alert 获取活动状态
        
		let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let list = activeModel.getActiveList();
        let type = list[this._nIndex]._type;
        let item = activeModel.getActiveObjByType(type);
        let data = activeModel.getActiveDataById(item._id);
        switch(type) {
            case Active_Type.LIMIT_TIME_ACTIVE_TYPE_FISH_SEND: //
                let curGunId = userModel.getCurGunID();
                let gunVo = game.table.T_Gun_Table.getVoByKey(curGunId);
                let max = Number(item._parameter1) * gunVo.bulletNum;//第一个参数是进度条的max
                let cur = data._value;
                let percent = cur * 1.0 / Number(max);
                if (data._state == Active_State.LIMIT_TIME_ACTIVE_STATE_ACCEPTED) {
                    if (percent >= 1) {
                        this.alert.visible = true;
                        return;
                    }
                }
                break;
            case Active_Type.LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND:
                //value / _parameter1 * 10
                let curv = data._value;
                let maxv = Number(item._parameter1) * 10;
                if (data._state != Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED) {
                    if (curv >= maxv) {
                        this.alert.visible = true;
                        return;
                    }
                }
                //充值杜少
            break;
            case Active_Type.LIMIT_TIME_ACTIVE_TYPE_VIP_SEND:
                //
                if (userModel.getVipLevel() > 0 && data._state != Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED) {
                    this.alert.visible = true;
                    return;
                }
            break;
        }
        this.alert.visible = false;
    }
    public onChangeActive(e:egret.TouchEvent) 
    {
        burn._Notification_.send(NotifyEnum.CHANGE_ACTIVE,this._nIndex);
    }
    public selectByBoolean(value:boolean):void
    {
        this.selected.visible = value;
    }
}