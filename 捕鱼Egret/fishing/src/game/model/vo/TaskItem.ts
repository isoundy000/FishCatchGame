module game.model {
	/**
	 * task对象
	 */
	export class TaskItem {
        private _nTaskID:number;
        private _nTaskState:number;
        private _nCurValue:number;

        private _nType:number;

        //完成时间
        private _nComTime:number;
		public constructor(taskID:number, taskState:number, curValue:number, comTime:number = null) 
        {
            this._nTaskID = taskID;
            this._nTaskState = taskState;
            this._nCurValue = curValue;
            var vo = game.table.T_FishTaskItem_Table.getVoByKey(taskID);
            if(vo)
            {
                this._nType = vo.type;
                //大奖赛 添加完成时间
                if(vo.type == TaskType.TASK_TYPE_GRAND_PRIX)
                {
                    var timeValue = game.table.T_Config_Table.getVoByKey(67).value;
                    var time = game.util.TimeUtil.getCurrTime() + (Number(timeValue));
                    this._nComTime = time;
                }else if(vo.type == TaskType.TASK_TYPE_PRICE)
                {
                    var timeValue = game.table.T_Config_Table.getVoByKey(67).value;
                    var time = game.util.TimeUtil.getCurrTime() + (Number(timeValue));
                    this._nComTime = time;
                }
            }
		}
        public getTaskID():number
        {
            return this._nTaskID;
        }
        public getTaskState():number
        {
            return this._nTaskState;
        }
        public setTaskState(state:number):void
        {
            this._nTaskState = state;
        }
        public getValue():number
        {
            return this._nCurValue;
        }
        public setValue(value):void
        {
            this._nCurValue = value;
        }
        public getType():number
        {
            return this._nType;
        }
        //获取完成时间
        public getComTime():number
        {
            return this._nComTime;
        }
        //
        public setComTime(value:number):void
        {
            this._nComTime = value;
        }
	}
}