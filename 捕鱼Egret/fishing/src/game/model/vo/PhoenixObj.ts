module game.model {
    /** 世界boss的数据对象 */
    export class PhoenixObj {
        private _state:number;//状态 当前状态0要来了 1在池塘中 2消失倒计时 3死亡
        private _time:number;//倒计时,秒
        private _curShield:number;
        private _maxShield:number;
        public constructor(msg:WorldBossInfoBackMessage){
            this.changeData(msg);
        };
        public changeData(msg:WorldBossInfoBackMessage):void
        {
            var bChange = false;
            if(msg.getState())
            {
                if(msg.getState() != Phoenix_State.ShieldDead)
                {
                    this._state = msg.getState();
                }else
                {
                    bChange = true;
                }
            }
            if(msg.getTime() && !bChange)
            {
                this._time = msg.getTime();
            }
            if(msg.getCurShieldValue() != null)
            {
                this._curShield = msg.getCurShieldValue();
            }
            if(msg.getShieldMax() != null)
            {
                this._maxShield = msg.getShieldMax();
            }
        }
        public getState():number
        {
            return this._state;
        }
        public getTime():number
        {
            return this._time;
        }
        public getCurShield():number
        {
            return this._curShield;
        }
        public getMaxShield():number
        {
            return this._maxShield;
        }
    }
}