module game.model {
	/**
	 * Email对象
	 */
	export class EmailItem {
        private _mailId:number;
        private _mailType:number;
        private _userId:number;
        private _receiveUserName:string;
        private _sendUserId:number;
        private _sendUserName:string;
        private _items:Array<game.model.Item>;
        private _time:number;
        private _state:number;//
        private _mailContent:string;
        private _mailTitle:string;
		public constructor(mailId:number, mailType:number, userId:number, receiveUserName:string, sendUserId:number, sendUserName:string, 
                           items:Array<any>, time:number, state:number, mailContent:string, mailTitle:string) 
        {
            this._mailId = mailId;
            this._mailType = mailType;
            this._userId = userId;
            this._receiveUserName = receiveUserName;
            this._sendUserId = sendUserId;
            this._sendUserName = sendUserName;
            this._items = new Array<game.model.Item>();
            for(var i = 0; i < items.length; i++)
            {
                var obj = items[i];
                this._items.push(new game.model.Item(obj.itemId,obj.totalCount))
            }
            this._time = time;
            this._state = state;
            this._mailContent = mailContent;
            this._mailTitle = mailTitle;
		}
        public getMailId():number
        {
            return this._mailId;
        }
        public getMailType():number
        {
            return this._mailType;
        }
        public getUserId():number
        {
            return this._userId;
        }
        public getReceiveUserName():string
        {
            return this._receiveUserName;
        }
        public getSendUserId():number
        {
            return this._sendUserId;
        }
        public getSendUserName():string
        {
            return this._sendUserName;
        }
        public getItems():Array<game.model.Item>
        {
            return this._items;
        }
        public setState(value:number):void
        {
            this._state = value;
        }
        public getState():number
        {
            return this._state;
        }
        public getMailContent():string
        {
            return this._mailContent;
        }
        public getMailTitle():string
        {
            return this._mailTitle;
        }
        public getTime():number
        {
            return this._time;
        }
	}
}