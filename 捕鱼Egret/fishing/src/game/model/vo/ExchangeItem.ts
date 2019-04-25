module game.model {
	/**
	 * exchange对象
	 */
	export class ExchangeItem {
        /**
         * required uint32 id = 1;//兑换货品id
	required string name = 2;
	required uint32 type = 3;//游戏中的物品：4：红包
	required uint32 exchangePriceId = 4;//货币在游戏里item表中的id
	required uint32 exchangePrice = 5;
	required string instruction = 6;
	required uint32 marketPrice = 7;
	required string url = 8;
	required uint32 minVip = 9;
	required uint32 goodsId = 10;//0表示实物
	required uint32 goodsNum = 11;
	required int32 serverNum = 12;//服务器剩余数量
         */
        public _id:number;
        public _name:string;
        public _type:number;
        public _exchangePriceId:number;
        public _exchangePrice:number;
        public _instruction:string;
        public _marketPrice:number;
        public _url:string;
        public _minVip:number;
        public _goodsId:number;
        public _goodsNum:number;
        public _serverNum:number;
        public _order:number;
        public _color:number;
        public _minGunId:number;
        public _state:number;//发货状态 0，未发货，1发货
		public constructor(id:number,name:string,type:number,exchangePriceId:number,exchangePrice:number,
                        instruction:string,marketPrice:number,url:string,minVip:number,goodsId:number,
                        goodsNum:number,serverNum:number, order:number, color:number, minGunId:number, state:number) 
        {
            this._id = id;
            this._name = name;
            this._type = type;
            this._exchangePriceId = exchangePriceId;
            this._exchangePrice = exchangePrice;
            this._instruction = instruction;
            this._marketPrice = marketPrice;
            this._url = url;
            this._minVip = minVip;
            this._goodsId = goodsId;
            this._goodsNum = goodsNum;
            this._serverNum = serverNum;
            this._order = order;
            this._color = color;
            this._minGunId = minGunId;
            this._state = state;
		}
	}
}