class TaskActivityItemUI extends eui.Component
{
    public normal:eui.Group;
    public activity:eui.Group;
    public gained:eui.Group;
    public num_normal:eui.Label;
    public num_activity:eui.Label;

    private _nId:number;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
    private _data:game.model.TaskItem;
	public constructor() {
        super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/task/Task_Pro_Item.exml";
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this._nId = -1;
        this._btnWrapList = new Array<burn.tools.UIWrap>();
    }
    public setNormalNum(nNum:number) {
        this.num_normal.text = nNum + "";
        this.num_activity.text = nNum + "";
    }
    public setData(data:game.model.TaskItem):void {
        this._data = data;
        egret.Tween.removeTweens(this);
        switch (data.getTaskState()) {
            case TaskState.TAST_STATE_CAN_RECEIVE:/**任务状态1.能领取*/
                this.activity.visible = true;
                this._nId = data.getTaskID();
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGain, this);
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
                this.normal.visible = false;
                this.gained.visible = false;
                burn.tools.TweenTools.hop(this, 0.05 ,250);
                break;
            case TaskState.TAST_STATE_CANT_RECEIVE:/**任务状态0.不能领取*/
                this.normal.visible = true;
                this.activity.visible = false;
                this.gained.visible = false;
                break;
            case TaskState.TAST_STATE_RECEIVED:/**任务状态2.已领取*/
                this.activity.visible = false;
                this.normal.visible = false;
                this.gained.visible = true;
                break;
        }
        this._btnWrapList.push(new burn.tools.UIWrap(this));
    }
    //播放一个成功
    public playSuc(data:game.model.TaskItem):void {
        this.setData(data);
        let data1 = RES.getRes("ef_baoxiang_json");
        let txtr = RES.getRes("ef_baoxiang_png");
        let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data1, txtr);
        let effect = new egret.MovieClip(mcFactory.generateMovieClipData("ef_baoxiang"));
        effect.frameRate = 10;
        effect.gotoAndPlay("play",1);
        effect.anchorOffsetX = effect.width/2;
        effect.anchorOffsetY = effect.height/2;
        effect.x = this.width/2;
        effect.y = this.height/2;
        this.addChild(effect);
        let self = this;
        effect.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
            self.removeChild(effect);
            if (!self._data) {
                return;
            }
            
            let vo = game.table.T_FishTaskItem_Table.getVoByKey(self._data.getTaskID());
            let award = vo.award.split(",");
            let len = award.length;
		    let gainArr = new Array<game.model.Item>();
            for (let i = 0; i < len; i++) {
                let data = award[i].split("_");
                let dataObj = new game.model.Item(Number(data[0]),Number(data[1]));
                gainArr.push(dataObj);
            }
            game.util.GameUtil.openCommongain(null,gainArr);
        }, this);
    }
    private onGain(e:egret.TouchEvent) {
        if (this._nId == -1) {
            return;
        }
		// let taskModel:TaskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
        // taskModel.updateItem(this._nId,2,1);
		// let item = taskModel.getTaskListById(this._nId);
        // this.playSuc(item);
        // return;
        let send:FinishTaskSendMessage = new FinishTaskSendMessage();
        send.initData();
        send.setTaskId(this._nId);
        NetManager.send(send);
	}
    private onTouchBegin(e:egret.TouchEvent):void {
        this.activity.scaleX = this.activity.scaleY = 0.75;
        game.util.SoundManager.playUISound("B06");
    }

    private onTouchEnd(e:egret.TouchEvent):void {
        this.activity.scaleX = this.activity.scaleY = 1;
    }
    public destroy()
    {   
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGain, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    }
}


