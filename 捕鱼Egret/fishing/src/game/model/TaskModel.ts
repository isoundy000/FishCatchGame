/**
 * 任务数据
 */
class TaskModel extends burn.model.ModelBase {
    private _taskList:Array<game.model.TaskItem>;
    private _nActivityDay:number;
    private _nActivityWeek:number;
	public constructor()
    {
		super();
	}
    public init():void {
        this._taskList = new Array<game.model.TaskItem>();
        this._nActivityDay = 0;
        this._nActivityWeek = 0;
    }
    /** 添加 */
    public addItem(item:game.model.TaskItem):void {
        var flag = this.isExist(item);
        if (!flag) {
            this._taskList.push(item);
            return;
        }
        for (var i = 0; i < this._taskList.length; i++) {
            var currItem = this._taskList[i];
            if (item.getTaskID() == currItem.getTaskID()) {
               this._taskList[i] = item;
            } else {
                this._taskList.push(item);
            }
        }
    }
    public updateItem(itemId:number, state:number, value:number, comTime:number = null):void {
        var len = this._taskList.length;
        for (var i = 0; i < len; i++) {
            var currItem = this._taskList[i];
            if (itemId == currItem.getTaskID()) {
                currItem.setTaskState(state);
                currItem.setValue(value);
                if(comTime)
                {
                    currItem.setComTime(comTime);
                }
                return;
            }
        }
        //如果没有return.说明是第一次添加
        var item = new game.model.TaskItem(itemId,state,value,comTime);
        this.addItem(item);
    }
    /** 清空 */
    public clearEmail():void
    {
        this._taskList = null;
        this._taskList = new Array<game.model.TaskItem>();
    }
    public removeItem(mailId:number):boolean {
        for (var i = 0; i < this._taskList.length; i++) {
            var currItem = this._taskList[i];
            if (mailId == currItem.getTaskID()) {
                this._taskList.splice(i, 1);
                return true;
            }
        }
        return false;
    }    
    /** 获取列表 */
    public getTaskList(): Array<game.model.TaskItem> {
        return this._taskList;
    }
    /** 获取实体 */
    public getTaskListById(id:number):game.model.TaskItem {
        for (var i = 0; i < this._taskList.length; i++) {
            var currItem = this._taskList[i];
            if (id == currItem.getTaskID()) {
                return currItem;
            }
        }
        return null;
    } 
    /** 获取实体 */
    public getTaskListByType(type:number): Array<game.model.TaskItem> {
        var arrData = new Array<game.model.TaskItem>();
        for (var i = 0; i < this._taskList.length; i++) {
            var currItem = this._taskList[i];
            if(currItem.getType() == type)
            {   
                arrData.push(currItem);
            }
        }
        return arrData;
    } 
    //判断是否存在
    public isExist(item:game.model.TaskItem):boolean {
        for (var i = 0; i < this._taskList.length; i++) {
            var currItem = this._taskList[i];
            if (item.getTaskID() == currItem.getTaskID()) {
                return true;
            }
        }
        return false;
    }   
    //是否该显示红点
    public showAlert():boolean{
        var alert = false;
        var list = this.getTaskListByType(TaskType.TASK_TYPE_AVT_DAY);
        for(var i = 0; i < list.length; i++)
        {
            if(list[i].getTaskState() == TaskState.TAST_STATE_CAN_RECEIVE)
            {
                alert = true;
                break;
            }
        }
        if(alert)
        {
            return alert;
        }

        list = this.getTaskListByType(TaskType.TASK_TYPE_AVT_WEEK);
        for(var i = 0; i < list.length; i++)
        {
            if(list[i].getTaskState() == TaskState.TAST_STATE_CAN_RECEIVE)
            {
                alert = true;
                break;
            }
        }
        if(alert)
        {
            return alert;
        }
        
        list = this.getTaskListByType(TaskType.TASK_TYPE_EVERYDAY);
        for(var i = 0; i < list.length; i++)
        {
            if(list[i].getTaskState() == TaskState.TAST_STATE_CAN_RECEIVE)
            {
                alert = true;
                break;
            }
        }
        if(alert)
        {
            return alert;
        }
        
        list = this.getTaskListByType(TaskType.TASK_TYPE_EVERY_WEEK);
        for(var i = 0; i < list.length; i++)
        {
            if(list[i].getTaskState() == TaskState.TAST_STATE_CAN_RECEIVE)
            {
                alert = true;
                break;
            }
        }
        return alert;
    }
    public clear():void {
				
	}

    public destroy():void 
    {

	}
}