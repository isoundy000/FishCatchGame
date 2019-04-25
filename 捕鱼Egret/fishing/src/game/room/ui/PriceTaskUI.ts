//PriceTaskUI
class PriceTaskUI extends eui.Component 
{
    public taskTimeLab:eui.Label;
    public gain_0:eui.Group;
    public gain_1:eui.Group;
    public gain_2:eui.Group;
    
    public gainNumLab_0:eui.Label;
    public gainNumLab_1:eui.Label;
    public gainNumLab_2:eui.Label;
	public shink:eui.Image;
    private _timer:egret.Timer;
    private gainArr:Array<eui.Group>;
    private gainLabArr:Array<eui.Label>;
    public constructor() {
		super();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/price/PriceTask.exml";
        this.gainArr = new Array<eui.Group>();
		this.gainArr.push(this.gain_0);
		this.gainArr.push(this.gain_1);
		this.gainArr.push(this.gain_2);

		this.gainLabArr = new Array<eui.Label>();
		this.gainLabArr.push(this.gainNumLab_0);
		this.gainLabArr.push(this.gainNumLab_1);
		this.gainLabArr.push(this.gainNumLab_2);
		
		burn.tools.TweenTools.ShowOutAndInMoreHalf(this.shink, 2000);
	}
    public setTask():void {
        let taskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
		if (this._timer) {
			this._timer.stop();
        	this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
			this._timer = null;
		}
		//定义Timer
        this._timer = new egret.Timer(1000, 0);
        //注册事件侦听器
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this._timer.start();

		//奖励更新
		this.gain_0.removeChildren();
		this.gain_1.removeChildren();
		this.gain_2.removeChildren();

		this.gainNumLab_0.text = "";
		this.gainNumLab_1.text = "";
		this.gainNumLab_2.text = "";
        let len = taskList.length;
		for (let i = 0; i < len; i++) {
			let item = taskList[i];
			if (i >= this.gainLabArr.length) {
				continue;
			}
			let vo = game.table.T_FishTaskItem_Table.getVoByKey(item.getTaskID());
			if (!vo) {
				continue;
			}
			this.gainLabArr[i].text = item.getValue() + "/" + vo.parameter2; 
			let fishVo = game.table.T_Fish_Table.getVoByKey(vo.parameter1);
			if (!fishVo) {
				continue;
			}
			(function (fishVo, i, group) {
				let txtr = "fishkind_"+fishVo.fishkindIcon+"_png";
				RES.getResAsync(txtr, function():void {
					let txture:egret.Texture = RES.getRes(txtr);
					let img:egret.Bitmap = new egret.Bitmap(txture);
					img.scaleX = 0.7;
					img.scaleY = 0.7;
					img.anchorOffsetX = img.width/2;
					img.anchorOffsetY = img.height/2;
					group.addChild(img);
				}, this);
			})(fishVo, i, this.gainArr[i]);
		}
    }

    
	private timerFunc():void {
		let taskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
        let taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
		if (taskList.length == 0) {
			return;
		}
		let len = taskList.length;
		let time = taskList[0].getComTime();
		let residueTime = time - game.util.TimeUtil.getCurrTime();
		if (residueTime <= 0) {
			burn._Notification_.send(NotifyEnum.CLEAR_PRICE_TASK);
			burn._Notification_.send(NotifyEnum.PRICE_CHALLENGE_FAIL);
			return;
		}
		let timeStr = game.util.TimeUtil.sceonds2MinStr(residueTime);
		this.taskTimeLab.text = timeStr;
	}

	//清空
	public clearTask():void {
		if (this._timer) {
			this._timer.stop();
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
			this._timer = null;
		}
	}

	/** 销毁函数 */
	public destroy():void {
		
	}
}