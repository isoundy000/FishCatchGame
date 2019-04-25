module game.model {
	/**
	 * Rank对象
	 */
	export class RankDataItem {
        /** required int32 rankType = 1;//排行类型1等级 2金币
            required int32 rank = 2;//排名
            required int32 userId = 3;//玩家ID
            required int64 rankValue = 4;//排行对应的值
            required int32 vipLevel = 5;//玩家VIP等级	
            required int32 exp = 6;//玩家经验
            required string name = 7;//玩家昵称
            required string iconUrl = 8;//头像 */
        public _nRankType:number;
        public _nRank:number;
        public _nUserId:number;
        public _nRankValue:number;
        public _nVipLevel:number;
        public _nExp:number;
        public _strName:string;
        public _strIconUrl:string;
		public constructor(rankType:number, rank:number, userId:number,
                           rankValue:number, vipLevel:number, exp:number,
                           name:string, iconUrl:string) 
        {
            this._nRankType = rankType;
            this._nRank = rank;
            this._nUserId = userId;
            this._nRankValue = rankValue;
            this._nVipLevel = vipLevel;
            this._nExp = exp;
            this._strName = name;
            this._strIconUrl = iconUrl;
		}
	}
}