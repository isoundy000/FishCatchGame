module game.model {
	/**
	 * 活动对象
	 */
    /** 	required uint32 id = 1;//活动id
	required uint32 type = 2;//类型
	required uint32 startTime = 3;//开始时间
	required uint32 endTime = 4;//结束时间
	required uint32 activeState = 5;//活动状态  0: 过期;1: 正在进行;3: 暂停;
	required string parameter1 = 6;//参数1
	required string parameter2 = 7;//参数1
	required string descVip = 8;//特权描述
	required string nameUrl = 9;//名称Url
	required uint32 order = 10;//排序 */
	export class ActiveObj {
        public _id:number;
        public _type:number;
        public _startTime:number;
        public _endTime:number;
        public _activeState:number;
        public _parameter1:string;
        public _parameter2:string;
        public _descVip:string;
        public _nameUrl:string;
        public _order:number;
		public constructor(msg:ActiveConfigMessageMessage) 
        {
            this._id = msg.getId();
            this._type = msg.getType();
            this._startTime = msg.getStartTime();
            this._endTime = msg.getEndTime();
            this._activeState = msg.getActiveState();
            this._parameter1 = msg.getParameter1();
            this._parameter2 = msg.getParameter2();
            this._descVip = msg.getDescVip();
            this._nameUrl = msg.getNameUrl();
            this._order = msg.getOrder();
		}
	}
    /** 实体类 */
    export class ActiveData {
        public _id:number;
        public _state:number;
        public _value:number;
        public _activeObj:ActiveObj;
        public constructor(msg:LimitedTimeActiveItemMessage, activeObj:ActiveObj) 
        {
            this._id = msg.getId();
            this._state = msg.getState();
            this._value = msg.getValue();
            this._activeObj = activeObj;
        }
    }
}