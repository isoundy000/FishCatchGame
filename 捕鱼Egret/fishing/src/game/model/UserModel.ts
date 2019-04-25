/**
 * 玩家数据
 */
class UserModel extends burn.model.ModelBase {
    /** 用户id */
    private _userId:number;
    /** 用户昵称 */
    private _userName:string;
    /** 玩家头像地址 */
    private _headUrl:string;
    /** level */
    private _level:number;
    /** exp */
    private _exp:number;
    /** vipLevel */
    private _vipLevel:number;
    /** 金币数量 */
    private _nCoins:number;
    /** 钻石数量 */
    private _nMoney:number;
    /** 点券数量 */
    private _nTicket:number;
    /** 背包道具列表 */
    private _bagList:Array<game.model.Item>;
    /** 当前炮倍 */
    private _nCurGunId:number;
    /** 当前可领救济金时间 */
    private _bankruptTime:number;
    /** 当前房间类型 */
    private _currRoomType:number;
    /** 当前引导完成ID */
    private _nGuideID:number;
    /** 每日活跃度 */
    private _everydayActive:number;
    /** 每周活跃度 */
    private _everyWeekActive:number;
    /** 当前装备炮 */
    private _nCurGunSkinId:number;
    /** 当前底座 */
    private _nCurGunBgId:number;
    /** 累计充值（分） */
    private _nTotalChargeRMB:number;
    /** 月卡过期时间 */
    private _nMonthEndTime:number;
    /** 是否是今天头一次登录 */
    private _bIsTodayFirstLogin:boolean;
    /** 签到信息 */
    private _objSign:game.model.SignObj;
    /** 次日礼包状态 */
    private _nCiriState:number;
    /** 今日分享次数 */
    private _shareTimes:number;
    /** 是否关注过 */
    private _isFocusFlag:boolean;
    /** 排行榜 */
    private _arrRankList:Array<game.model.RankDataItem>;
    /** 今日是否抽过奖 */
    private _bIsTodayDraw:boolean;
    /** 房间在线人数 */
    private _arrRoomOnline:Array<number>;
    /** 充值过的档位 */
    private _arrChargedGears:Array<number>;
    /** 兑换过的档位 */
    private _arrExchangeGears:Array<number>;
    /** 今天是否打开过活动界面 */
    public bOpenedActiveUI:boolean;
    /** 今天是否打开过兑换界面 */
    public bOpenedExchangeUI:boolean;
    /** 今天是否打开过月卡界面 */
    public bOpenedMonthUI:boolean;
    /** 自己的邀请码 */
    public _strInviteCode:string;
	public constructor()
    {
		super();
	}

    public init():void {
        this._bagList = new Array<game.model.Item>();
        this._bankruptTime = -1;
        this._nGuideID = 0;
        this._nCurGunSkinId = 20007;
        this._nCurGunBgId = null;
        this._objSign = new game.model.SignObj();
        this._nCiriState = Ciri_State.Expired;
        this._arrRankList = new Array<game.model.RankDataItem>();
        this._bIsTodayDraw = false;
        this._arrRoomOnline = new Array<number>();
        this._arrRoomOnline.push(0);
        this._arrRoomOnline.push(0);
        this._arrRoomOnline.push(0);
        this._arrChargedGears = new Array<number>();
        this._arrExchangeGears = new Array<number>();
        this.bOpenedActiveUI = false;
        this.bOpenedExchangeUI = false;
        this.bOpenedMonthUI = false;
    }

    /** 向背包中添加物品 */
    public addItem(item:game.model.Item):void {
        if(item.getItemId() == PropEnum.GOLD 
        || item.getItemId() == PropEnum.GEM)
        {
            console.log("#----------bag can't insert GemOrGold");
            return;
        }
        var flag = this.isExist(item);
        if (!flag) {
            this._bagList.push(item);
            return;
        }
        var len = this._bagList.length;
        for (var i = 0; i < len; i++) {
            var currItem = this._bagList[i];
            if (item.getItemId() == currItem.getItemId()) {
                currItem.setCount(currItem.getCount() + item.getCount());
            } else {
                this._bagList.push(item);
            }
        }
    }

    /** 更新背包中的物品数量 */
    public updateItem(itemId:number, count:number, time:number = 0):void {
        var len = this._bagList.length;
        var isExist:boolean = false;
        for (var i = 0; i < len; i++) {
            var currItem = this._bagList[i];
            if (itemId == currItem.getItemId()) {
                currItem.setCount(count);
                currItem.setTime(time);
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            var item = new game.model.Item(itemId, count, time);
            this.addItem(item);
        }
    }

    /** 从背包中删除物品 */
    public removeItem(itemId:number, count:number):boolean {
        var len = this._bagList.length;
        for (var i = 0; i < len; i++) {
            var currItem = this._bagList[i];
            if (itemId == currItem.getItemId()) {
                var temp = currItem.getCount() - count;
                if (temp < 0) {
                    console.warn("物品【" + itemId + "】数量不足!");
                    return false;
                } else if (temp == 0) {
                    this._bagList.splice(i, 1);
                    return true;
                } else {
                    currItem.setCount(temp);
                    return true;
                }
            }
        }
        return false;
    }

    //判断物品是否存在
    public isExist(item:game.model.Item):boolean {
        var len = this._bagList.length;
        for (var i = 0; i < len; i++) {
            var currItem = this._bagList[i];
            if (item.getItemId() == currItem.getItemId()) {
                return true;
            }
        }
        return false;
    }   

    /** 获取物品列表 */
    public getItemList(): Array<game.model.Item> {
        return this._bagList;
    }

    /** 根据物品id获取物品 */
    public getItemById(itemId:number):game.model.Item {
        var len = this._bagList.length;
        for (var i = 0; i < len; i++) {
            var currItem = this._bagList[i];
            if (itemId == currItem.getItemId()) {
                return currItem;
            }
        }
        return null;
    }
    //获取当前炮倍
    public getCurGunID():number
    {
        return this._nCurGunId;
    }
    //设置当前炮倍
    public setCurGunID(nId:number):void
    {
        this._nCurGunId = nId;
    }
    //获取当前匹配的房间等级
    public getMatchRoomLevel():number {
        return this._currRoomType;
    }
    //设置当前房间等级
    public setMatchRoomLevel(type:number):void {
        this._currRoomType = type;
    }
    public setUserId(uid:number):void {
        this._userId = uid;
    }

    public getUserId():number {
        return this._userId;
    }

    public setUserName(name:string):void {
        this._userName = name;
    }

    public getUserName():string {
        return this._userName;
    }

    public setHeadUrl(url:string):void {
        this._headUrl = url;
    }

    public getHeadUrl():string {
        return CONFIG.LOGIN_ADDR + this._headUrl;
    }

    public setLevel(level:number):void {
        this._level = level;
    }

    public getLevel():number {
        return this._level;
    }

    public getExp():number {
        return this._exp;
    }

    public setExp(exp:number):void {
        this._exp = exp;
    }

    public getVipLevel():number {
        return this._vipLevel;
    }

    public setVipLevel(value:number):void {
        this._vipLevel = value;
    }
    public setMoney(money:number):void {
        this._nMoney = money;
    }

    public getMoney():number {
        return this._nMoney;
    }

    public setCoins(coins:number):void {
        this._nCoins = coins;
    }

    public getCoins():number {
        return this._nCoins;
    }

    public setTicket(ticket:number):void {
        this._nTicket = ticket;
    }
    
    public getTicket():number {
        return this._nTicket;
    }

    public setBankruptTime(time:number):void {
        this._bankruptTime = time;
    }

    public getBankruptTime():number {
        return this._bankruptTime;
    }

    public getGuideID():number
    {
        return this._nGuideID;
    }

    public setGuideID(id:number,clean:boolean = true):void
    {
        this._nGuideID = id;
        if(this._nGuideID != 0 && clean && this._nGuideID != 9998  && this._nGuideID != 9999)
        {
            var guideOver = game.table.T_Config_Table.getVoByKey(49).value;
            var strOver = guideOver.split(",");
            this._nGuideID = (Number(strOver[0]) + 1);
        }
    }

    public setEverydayActive(value:number):void
    {
        this._everydayActive = value;
    }
    public getEverydayActive():number
    {
        return this._everydayActive;
    }
    public setEveryWeekActive(value:number):void
    {
        this._everyWeekActive = value;
    }
    public getEveryWeekActive():number
    {
        return this._everyWeekActive;
    }
    public getCurSkinId():number
    {
        return this._nCurGunSkinId;
    }
    public setCurSkinId(skinId:number):void
    {
        if(skinId == 0)
        {
            var value = game.table.T_Config_Table.getVoByKey(51).value;
            skinId = Number(value);
        }
        this._nCurGunSkinId = skinId;
    }
    public setCurGunBgId(gunBgId:number):void
    {
        this._nCurGunBgId = gunBgId;
    }
    public getCurGunBgId():number
    {
        return this._nCurGunBgId;
    }

    public getTatolChargeRMB():number
    {
        return this._nTotalChargeRMB;
    }

    public setTatolChargeRMB(value:number):void
    {
        this._nTotalChargeRMB = value;
    }

    public getMonthEndTime():number
    {
        return this._nMonthEndTime;
    }

    public setMonthEndTime(value:number):void
    {
        this._nMonthEndTime = value;
    }

    public isTodayFirstLogin():boolean
    {
        return this._bIsTodayFirstLogin;
    }
    public setTodayFirstLogin(value:number):void
    {
        if(value == 0)
        {
            this._bIsTodayFirstLogin = false;
        }else if(value == 1)
        {
            this._bIsTodayFirstLogin = true;
        }
    }
    public setSignObj(msg:any):void
    {
        this._objSign.setData(msg);
    }
    public getSignObj():game.model.SignObj
    {
        return this._objSign;
    }
    public setCiriState(state:number):void
    {
        this._nCiriState = state;
    }
    public getCiriState():number
    {
        return this._nCiriState;
    }

    public setShareTimes(times:number):void {
        this._shareTimes = times;
    }
    public getShareTimes():number {
        return this._shareTimes;
    } 

    public setIsFocusFlag(flag:boolean):void {
        this._isFocusFlag = flag;
    }
    public getIsFocusFlag():boolean {
        return this._isFocusFlag;
    }

    public getRankListByType(type:number):Array<game.model.RankDataItem>
    {
        var arr = new Array<game.model.RankDataItem>();
        var len = this._arrRankList.length;
        for(var i = 0; i < len; i++)
        {
            var item = this._arrRankList[i];
            if(item._nRankType == type)
            {
                arr.push(item);
            }
        }
        return arr;
    }
    public setRankList(item:game.model.RankDataItem):void
    {
        this._arrRankList.push(item);
    }
    public setIsTodayDraw(value:number):void
    {
        if(value == 0)
        {
            this._bIsTodayDraw = false;
        }else if(value == 1)
        {
            this._bIsTodayDraw = true;
        }
    }
    public isTodayDraw():boolean
    {
        return this._bIsTodayDraw;
    }
    public setRoomOnLine(arr:Array<number>):void
    {
        this._arrRoomOnline = arr;
    }
    public getRoomOnLineByID(nId:number):number
    {
        return this._arrRoomOnline[nId];
    }

    public addChargedGears(value:number):void
    {
        this._arrChargedGears.push(value);
    }
    public isCharged(value:number):boolean
    {
        let len = this._arrChargedGears.length;
        for(var i = 0; i < len; i++)
        {
            if(this._arrChargedGears[i] == value)
            {
                return true;
            }
        }
        return false;
    }

    public addExchangeGears(value:number):void {
        this._arrExchangeGears.push(value);
    }
    public isInExchanged(value:number):boolean {
        for (let gear of this._arrExchangeGears) {
            if (gear == value) {
                return true;
            }
        }
        return false;
    }
    public setInviteCode(str:string):void
    {
        this._strInviteCode = str;
    }
    public getInviteCode():string
    {
        return this._strInviteCode;
    }
    public clear():void {
				
	}

    public destroy():void 
    {

	}
}