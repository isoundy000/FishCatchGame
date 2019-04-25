class TaskItemUI extends eui.Component{
    public icon:eui.Image;
    public nameLab:eui.Label;
    public progress:eui.Group;
    public pro_des:eui.Label;
    public toCom:eui.Group;
    public toGain:eui.Group;
    public toEnd:eui.Group;
	public proObj:eui.ProgressBar;
    public iconGroup:eui.Group;
    public root:eui.Group;
    private _nId:number;
	public constructor(){
        super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/task/TaskItem.exml";
        this.toCom.visible = false;
        this.toGain.visible = false;
        this._nId = -1;
    }
    public setPro(data:game.model.TaskItem):void
    {
        let vo = game.table.T_FishTaskItem_Table.getVoByKey(data.getTaskID());
        if(!vo)
        {
            return;
        }
        this._nId = vo.id;
        let param = vo.award;
        let items = param.split(",");
        let itemData = items[0].split("_");
        let id = Number(itemData[0]);
        let count = Number(itemData[1]);
        let self = this;
        let showItem = new BagViewItem(id, count);
        showItem.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml";
        showItem.scaleX = showItem.scaleY = 0.75;
        showItem.anchorOffsetX = showItem.width/2;
        showItem.anchorOffsetY = showItem.height/2;
        showItem.init();
        this.iconGroup.addChild(showItem);
        this.proObj.maximum = vo.parameter2;
        this.proObj.value = data.getValue();
        //pro_des
        let txt = this.pro_des.text;
        for(let i = 0; i < items.length; i ++)
        {
            let item = items[i];
            let itemData = item.split("_");
            let id = Number(itemData[0]);
            let count = Number(itemData[1]);
            if(id == PropEnum.ACT_DAY || id == PropEnum.ACT_WEED)
            {
                let arrName = new Array<string>();
                arrName.push(count + "");
                this.pro_des.text = game.util.Language.getDynamicTextByStr(txt,arrName);
                break;
            }
        }

        this.nameLab.text = game.util.Language.getText(vo.describe);
        switch(data.getTaskState())
        {
            case TaskState.TAST_STATE_CANT_RECEIVE:/**任务状态0.不能领取*/
                this.toCom.visible = true;
                this.toCom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCom, this);
                break;
            case TaskState.TAST_STATE_CAN_RECEIVE:/**任务状态1.能领取*/
                this.toGain.visible = true;
                this.toGain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGain, this);
                break;
            case TaskState.TAST_STATE_RECEIVED:/**任务状态2.已领取*/
                this.toEnd.visible = true;
                break;
        }
    }
    private onCom(e:egret.TouchEvent) 
    {
        if(this._nId == -1)
        {
            return;
        }
        if (this._nId == 2001 || this._nId == 3004) {
            burn.Director.popView();
            let signView:SignView = new SignView();
			let signMed:SignMediator = new SignMediator(signView);
			burn.Director.pushView(signMed);
            return;
        }
		burn.Director.popView();
        burn._Notification_.send(NotifyEnum.RES_LOAD_OVER, null);
	}
    private onGain(e:egret.TouchEvent) 
    {
        if(this._nId == -1)
        {
            return;
        }
        let send:FinishTaskSendMessage = new FinishTaskSendMessage();
        send.initData();
        send.setTaskId(this._nId);
        NetManager.send(send);
	}
}


