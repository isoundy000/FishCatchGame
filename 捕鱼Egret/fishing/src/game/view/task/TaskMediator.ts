class TaskMediator extends burn.mediator.SimpleMediator {
	private _nCurIndex:number;
	public constructor(view:burn.view.ViewBase) {
		super(view, "TaskMediator");
		this._nCurIndex = 2;
	}

	public onAdded() {
		super.onAdded();
		this.subscrib(NotifyEnum.TASK_UI_LOADED, this.viewInit);
		this.subscrib(NotifyEnum.TASK_CHANGE_LIST,this.changeList);
		this.subscrib(NotifyEnum.TASK_ACT_CHANGE,this.actChange);
		let self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.FINISHTASKBACK, function(msg:FinishTaskBackMessage):void {
            self.taskFinishBack(msg);
        });
		(this.getView() as TaskView).initView();
	}
	public actChange(obj:any, target:any):void
	{
		//初始化数据
		let view = target.getView() as TaskView;
		let taskModel:TaskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
		//活跃度
		let actType = target._nCurIndex + 6;
		view.setActList(taskModel.getTaskListByType(actType));
	}
	public changeList(obj:any, target:any, bAct:boolean):void
	{
		//初始化数据
		let view = target.getView() as TaskView;
		let taskModel:TaskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
		let type = Number(obj);
		target._nCurIndex = type;
		view.initList(taskModel.getTaskListByType(type));
		if(bAct)
		{
			return;
		}
		//活跃度
		let actType = type + 6;
		view.setActList(taskModel.getTaskListByType(actType));
	}
	public viewInit(obj:any, target:any):void
	{
		//初始化数据
		let view = target.getView() as TaskView;
		view.setViewData();
	}
	public taskFinishBack(msg:FinishTaskBackMessage):void
	{
		/**required uint32 state = 1;
	required uint32 taskId = 2;	
	repeated ItemInfo taskAward = 3; */
		let state = msg.getState();
		if(state != 1)
		{
			return;
		}
		let taskId = msg.getTaskId();
		let vo = game.table.T_FishTaskItem_Table.getVoByKey(taskId);
		if(!vo)
		{
			return;
		}
		let items = msg.getTaskAward();
		let model:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let gainArr = new Array<game.model.Item>();
		for (let i = 0; i < items.length; i++) {
			let itemId = items[i].itemId;
			let count = items[i].totalCount;
			let data = new game.model.Item(itemId,count);
			let voItem = game.table.T_Item_Table.getVoByKey(itemId);
			if(!voItem)
			{
				continue;
			}
			let bInsert = false;
			if(itemId == PropEnum.GOLD)
			{
				model.setCoins(Number(model.getCoins()) + Number(count));
                burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, {userId: model.getUserId()});
			}else if(itemId == PropEnum.GEM)
			{
				model.setMoney(Number(model.getMoney()) + Number(count));
                burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {userId: model.getUserId()});
			}
			if(voItem.type == 1)
			{
				if(itemId == PropEnum.ACT_DAY)
				{
					model.setEverydayActive(model.getEverydayActive() + count);
				}else if(itemId == PropEnum.ACT_WEED)
				{
					model.setEveryWeekActive(model.getEveryWeekActive() + count);
				}else if(itemId == PropEnum.GOLD 
						||itemId == PropEnum.GEM)
				{
					gainArr.push(data);
					bInsert = true;
				}
				continue;
			}
			if (model.isExist(data))
			{
				let itemLast = model.getItemById(itemId);
				model.updateItem(itemId, itemLast.getCount() + count);
			} else
			{
				model.addItem(data);
			}
			if(!bInsert)
			{
				gainArr.push(data);
			}
		}
		if(gainArr.length > 0)
		{
			if(vo.type != TaskType.TASK_TYPE_AVT_DAY)
			{
				if(vo.type != TaskType.TASK_TYPE_AVT_WEEK)
				{
					game.util.GameUtil.openCommongain(null,gainArr);
				}
			}
		}
		let taskModel:TaskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
		let item = taskModel.getTaskListById(taskId);
		taskModel.updateItem(taskId,TaskState.TAST_STATE_RECEIVED,item.getValue());
		let view = this.getView() as TaskView;
		let type = vo.type;
		{
			switch(type)
			{
				case TaskType.TASK_TYPE_AVT_DAY:/**8.每日活跃任务 */
					view.showActSuc(taskId,type);
					this.changeList(this._nCurIndex, this, true);
					break;
				case TaskType.TASK_TYPE_AVT_WEEK:/**9.每周活跃任务 */
					view.showActSuc(taskId,type);
					this.changeList(this._nCurIndex, this, true);
					break;
				case TaskType.TASK_TYPE_NEWBIE:/**1.新手任务*/
					
					break;
				case TaskType.TASK_TYPE_EVERYDAY:/**2.每日任务*/
					view.initList(taskModel.getTaskListByType(type));
					this.changeList(this._nCurIndex, this, false);
					break;
				case TaskType.TASK_TYPE_EVERY_WEEK:/**3.每周任务*/
					view.initList(taskModel.getTaskListByType(type));
					this.changeList(this._nCurIndex, this, false);
					break;
			}
		}
		view.setActNum();
		
		burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
		burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
	}	
	public destroy():void {
		this.getView().destroy();
		this.unsubscribByType(NotifyEnum.TASK_UI_LOADED);
		this.unsubscribByType(NotifyEnum.TASK_CHANGE_LIST);
		this.unsubscribByType(NotifyEnum.TASK_ACT_CHANGE);
		game.net.MessageDispatcher.unregisterByType(game.net.ResponseType.FINISHTASKBACK);
	}
}