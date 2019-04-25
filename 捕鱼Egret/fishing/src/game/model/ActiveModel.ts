/**
 * 活动信息
 */
class ActiveModel extends burn.model.ModelBase {
    private _activeList:Array<game.model.ActiveObj>;
    private _activeDataList:Array<game.model.ActiveData>;
    private _activeShowList:Array<game.model.ActiveData>;
    private _activeCoin:number;//活动币
	public constructor()
    {
		super();
	}

    public init():void {
        this._activeList = new Array<game.model.ActiveObj>();
        this._activeDataList = new Array<game.model.ActiveData>();
        this._activeShowList = new Array<game.model.ActiveData>();
        this._activeCoin = 0;
    }
    public setData(msg:ActiveConfigMessagesBackMessage):void
    {
        let list = msg.getMessageList() as Array<ActiveConfigMessageMessage>;
        if(list.length == 0)
        {
            return;
        }
        this._activeList.length = 0;
        let len = list.length;
        for(let i = 0; i < len; i++)
        {
            this._activeList.push(new game.model.ActiveObj(list[i]));
        }
    }
    public getActiveList():Array<game.model.ActiveObj>
    {
        return this._activeList;
    }
    public getActiveDataList():Array<game.model.ActiveData>
    {
        return this._activeDataList;
    }
    public getActiveShopDataList():Array<game.model.ActiveData>
    {
        return this._activeShowList;
    }
    public getActiveObjByType(value:number):game.model.ActiveObj
    {
        let len = this._activeList.length;
        for(let i = 0; i < len; i++)
        {
            let itemObj = this._activeList[i];
            if(itemObj._type == value)
            {
                return itemObj;
            }
        }
        return null;
    }
    public getActiveObjById(value:number):game.model.ActiveObj
    {
        let len = this._activeList.length;
        for(let i = 0; i < len; i++)
        {
            let itemObj = this._activeList[i];
            if(itemObj._id == value)
            {
                return itemObj;
            }
        }
        return null;
    }

    //服务器数据
    public setActiveInfo(msg:LimitedTimeActiveInfoMessage):void
    {
        //_activeDataList
        this._activeDataList.length = 0;
        let awardData = msg.getSendAwardActiveInfo() as Array<LimitedTimeActiveItemMessage>;
        let lenAward = awardData.length;
        for(var i = 0; i < lenAward; i++)
        {
            let obj = this.getActiveObjById(awardData[i].getId());
            let dataObj = new game.model.ActiveData(awardData[i], obj);
            this._activeDataList.push(dataObj);
        }

        this._activeShowList.length = 0;
        let shopData = msg.getSecretShopActiveInfo() as Array<LimitedTimeActiveItemMessage>;
        let lenShop = shopData.length;
        for(var i = 0; i < lenShop; i++)
        {
            let obj = this.getActiveObjById(shopData[i].getId());
            let dataObj = new game.model.ActiveData(shopData[i], obj);
            this._activeShowList.push(dataObj);
        }
    }
    public getActiveDataById(value:number):game.model.ActiveData
    {
        var len = this._activeDataList.length;
        for(var i = 0; i < len; i++)
        {
            var item = this._activeDataList[i];
            if(item._id == value)
            {
                return item;
            }
        }
        return null;
    }

    public getActiveShopDataById(value:number):game.model.ActiveData
    {
        var len = this._activeShowList.length;
        for(var i = 0; i < len; i++)
        {
            var item = this._activeShowList[i];
            if(item._id == value)
            {
                return item;
            }
        }
        return null;
    }

    public setActiveCoin(value:number):void
    {
        this._activeCoin = value;
    }

    public getActiveCoin():number
    {
        return this._activeCoin;
    }
    public clear():void {
				
	}
    public destroy():void 
    {

	}
}