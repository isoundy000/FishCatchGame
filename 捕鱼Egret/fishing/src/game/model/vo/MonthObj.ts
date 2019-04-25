module game.model {
	/**
	 * 签到信息对象
	 */
	export class SignObj {
        /**累计签到次数*/
        private _nCumulativeSignTimes:number;
        /** 剩余补签次数 */
        private _nRemainMakeUpTimes:number;
        /** 是否今天签到 */
        private _bIsTodaySign:boolean;
        /** 是否今天补签 */
        private _bIsTodayMakeUp:boolean;
        /** 当前月份 */
        private _nCurMonth:number;
		public constructor() {}
        public setData(msg:any):void
        {
            this._nCumulativeSignTimes = msg.cumulativeSignTimes;
            this._nRemainMakeUpTimes = msg.remainMakeUpTimes;
            this._bIsTodaySign = msg.isTodaySign;
            this._bIsTodayMakeUp = msg.isTodayMakeUp;
            this._nCurMonth = msg.curMonth;
        }
        public getCumulativeSignTimes():number
        {
            return this._nCumulativeSignTimes;
        }
        public getRemainMakeUpTimes():number
        {
            return this._nRemainMakeUpTimes;
        }
        public IsTodaySign():boolean
        {
            return this._bIsTodaySign;
        }
        public IsTodayMakeUp():boolean
        {
            return this._bIsTodayMakeUp;
        }
        public CurMonth():number
        {
            return this._nCurMonth;
        }
	}
}