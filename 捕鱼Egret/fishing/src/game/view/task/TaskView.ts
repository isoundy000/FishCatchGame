class TaskView extends burn.view.PopView {
	private _uiDisplay:TaskViewUI;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _nCurListIndex:number;
	private _bArrShowAct:Array<number>;
	private _bPop:boolean = false;
	private _arrAct:Array<TaskActivityItemUI>;
	public constructor() {
		super();
		this._btnWrapList = new Array();
		this._bArrShowAct = new Array<number>();
		this._bPop = false;
		this._arrAct = new Array<TaskActivityItemUI>();
		game.util.UIUtil.startLoading();
	}
	private addBgResource():void
	{
		game.util.UIUtil.closeLoading();
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new TaskViewUI();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/task/TaskUI.exml";
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//关闭当前界面
		let closeBtn = this._uiDisplay.closeBtn;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
		if(!this._bPop)
		{
			game.util.UIUtil.popView(this._uiDisplay.root);
			this._bPop = true;
			EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/task/TaskItem.exml", ()=>{
				EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/task/Task_Pro_Item.exml", ()=>{
					RES.getResAsync("ef_baoxiang_json", ()=>{
						RES.getResAsync("ef_baoxiang_png", ()=>{
							this.send(NotifyEnum.TASK_UI_LOADED);
						}, this);
					}, this);
				}, this);
			}, this);
		}
    }
	public setViewData():void
	{
		this._uiDisplay.dailyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeListDaily, this);
		this._uiDisplay.weekBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeListWeed, this);
		this.onChangeListDaily(null);
	}
	private onChangeListDaily(e:egret.TouchEvent)
	{
		if(this._nCurListIndex == 2)
		{
			return;
		}
		this._nCurListIndex = 2;
		this._uiDisplay.weekBtn.alpha = 0;	
		this._uiDisplay.dailyBtn.alpha = 1;		
		this._uiDisplay.weekImg_on.alpha = 0;
		this._uiDisplay.dailyImg_on.alpha = 1;
		this.send(NotifyEnum.TASK_CHANGE_LIST,this._nCurListIndex);
	}
	private onChangeListWeed(e:egret.TouchEvent) 
	{
		if(this._nCurListIndex == 3)
		{
			return;
		}
		this._nCurListIndex = 3;
		this._uiDisplay.weekBtn.alpha = 1;	
		this._uiDisplay.dailyBtn.alpha = 0;		
		this._uiDisplay.weekImg_on.alpha = 1;
		this._uiDisplay.dailyImg_on.alpha = 0;
		this.send(NotifyEnum.TASK_CHANGE_LIST,this._nCurListIndex);
	}
	public initList(arr:Array<game.model.TaskItem>):void
	{
		let newArr = new Array<game.model.TaskItem>();
		let len = arr.length;
		for(let i = 0; i < len; i++)
		{
			if(arr[i].getTaskState() == TaskState.TAST_STATE_CAN_RECEIVE)
			{
				newArr.push(arr[i]);
			}
		}
		for(let i = 0; i < len; i++)
		{
			if(arr[i].getTaskState() == TaskState.TAST_STATE_CANT_RECEIVE)
			{
				newArr.push(arr[i]);
			}
		}
		for(let i = 0; i < len; i++)
		{
			if(arr[i].getTaskState() == TaskState.TAST_STATE_RECEIVED)
			{
				newArr.push(arr[i]);
			}
		}
		
		this._uiDisplay.listGroup.removeChildren();
		let len1 = newArr.length;
		let bFindAct = this.findAct(this._nCurListIndex);
		for(let i = 0; i < len1; i++)
		{
			let itemDown = new TaskItemUI();
			itemDown.setPro(newArr[i]);
			this._uiDisplay.listGroup.addChild(itemDown);
			if(!bFindAct)
			{
				game.util.UIUtil.listTween(itemDown.root,i);
			}
		}
		let tLayout:eui.VerticalLayout = new eui.VerticalLayout();
		this._uiDisplay.listGroup.layout = tLayout;    /// 网格布局

		this.setActNum();
	}
	public findAct(nType:number):boolean
	{
		let bFind = false;
		let len = this._bArrShowAct.length;
		for(let i = 0; i < len; i++)
		{
			if(this._bArrShowAct[i] == nType)
			{
				return true;
			}
		}
		if(!bFind)
		{
			this._bArrShowAct.push(nType);
		}
		return bFind;
	}
	public setActNum():void
	{
		this._uiDisplay.task_pro_num.removeChildren();
		let lab = new eui.Label();
		let actNum = 0;
		if(this._nCurListIndex == TaskType.TASK_TYPE_EVERY_WEEK)
		{
        	let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        	actNum = userModel.getEveryWeekActive();
		}else if(this._nCurListIndex == TaskType.TASK_TYPE_EVERYDAY)
		{
        	let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        	actNum = userModel.getEverydayActive();
		}
		lab.text = actNum + "";
		lab.textAlign = egret.HorizontalAlign.CENTER;
		lab.anchorOffsetX = lab.width/2;
		lab.anchorOffsetY = lab.height/2;
		this._uiDisplay.task_pro_num.addChild(lab);
		if(actNum > 120)
		{
			actNum = 120;
		}
		let percent = actNum/120.0;
		let widthOld = 682;
		this._uiDisplay.pro_cur.width = widthOld*percent;
	}
	public setActList(arr:Array<game.model.TaskItem>):void
	{
		if(!arr)
		{
			return;
		}
		if(arr.length != 4)
		{
			return;
		}
		this._arrAct.length = 0;
		this._uiDisplay.pro_0.removeChildren();
		this._uiDisplay.pro_1.removeChildren();
		this._uiDisplay.pro_2.removeChildren();
		this._uiDisplay.pro_3.removeChildren();
		let item = new TaskActivityItemUI();
		item.name = "actItem";
		item.setNormalNum(30);
		this._uiDisplay.pro_0.addChild(item);
		item.setData(arr[0]);

		let item1 = new TaskActivityItemUI();
		item1.name = "actItem";
		item1.setNormalNum(60);
		this._uiDisplay.pro_1.addChild(item1);
		item1.setData(arr[1]);
		
		let item2 = new TaskActivityItemUI();
		item2.name = "actItem";
		item2.setNormalNum(90);
		this._uiDisplay.pro_2.addChild(item2);
		item2.setData(arr[2]);
		
		let item3 = new TaskActivityItemUI();
		item3.name = "actItem";
		item3.setNormalNum(120);
		this._uiDisplay.pro_3.addChild(item3);
		item3.setData(arr[3]);
		
		this._arrAct.push(item);
		this._arrAct.push(item1);
		this._arrAct.push(item2);
		this._arrAct.push(item3);
	}
	public showActSuc(id:number,type:number):void
	{
		if(this._nCurListIndex != (type - 6))
		{
			return;
		}
		let taskModel:TaskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
		let list = taskModel.getTaskListByType(type);
		let len = list.length;
		let index = -1;
		for(let i = 0; i < len; i++)
		{
			if(list[i].getTaskID() == id)
			{
				index = i;
				break;
			}
		}
		if(index == -1)
		{
			return;
		}
		//播放一个动画
		this._arrAct[index].playSuc(list[index]);
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) 
	{
		burn.Director.popView();
	}
	public initView():void {
        //userLvUp 
       EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/task/TaskUI.exml", this.addBgResource, this);
	}
	public destroy():void {
		let self = this;
		this._bPop = false;
		//关闭UI动画
		game.util.UIUtil.closeView(this._uiDisplay.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self.parent && self.parent.removeChild(self);

			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/task/TaskUI.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/task/Task_Pro_Item.exml");
			RES.destroyRes("ef_baoxiang_json");
			RES.destroyRes("ef_baoxiang_png");
		});
	}
}

/***操作UI的对应类 */
class TaskViewUI extends eui.Component{
	public constructor(){super();}
	public closeBtn:eui.Button;//关闭
	public dailyBtn:eui.Button;
	public weekBtn:eui.Button;
	public dailyImg_on:eui.Image;
	public weekImg_on:eui.Image;

	public task_pro_num:eui.Group; //当前活跃度
	public pro_cur:eui.Image;//进度条
	public pro_0:eui.Group;//
	public pro_1:eui.Group;//
	public pro_2:eui.Group;//
	public pro_3:eui.Group;//

	public listGroup:eui.Group; //任务列表
	public root:eui.Group;
}