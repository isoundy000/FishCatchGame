/**
 * 兑换数据
 */
class ExchangeModel extends burn.model.ModelBase {
    private _exchangeList:Array<game.model.ExchangeItem>;
    private _nActivityDay:number;
    private _nActivityWeek:number;
	public constructor() {
		super();
	}
    public init():void {
        this._exchangeList = new Array<game.model.ExchangeItem>();
        this._nActivityDay = 0;
        this._nActivityWeek = 0;
    }
    /** 添加 */
    public addItem(item:game.model.ExchangeItem):void {
        let flag = this.isExist(item);
        if (!flag) {
            this._exchangeList.push(item);
            return;
        }
        for (let i = 0; i < this._exchangeList.length; i++) {
            let currItem = this._exchangeList[i];
            if (item._id == currItem._id) {
               this._exchangeList[i] = item;
            } else {
                this._exchangeList.push(item);
            }
        }
    }
    /** 清空 */
    public clearList():void
    {
        this._exchangeList = null;
        this._exchangeList = new Array<game.model.ExchangeItem>();
    }
    public removeItem(mailId:number):boolean {
        for (let i = 0; i < this._exchangeList.length; i++) {
            let currItem = this._exchangeList[i];
            if (mailId == currItem._id) {
                this._exchangeList.splice(i, 1);
                return true;
            }
        }
        return false;
    }    
    /** 获取列表 */
    public getList(): Array<game.model.ExchangeItem> {
        return this._exchangeList;
    }
    /** 获取实体 */
    public getListById(id:number):game.model.ExchangeItem {
        for (let i = 0; i < this._exchangeList.length; i++) {
            let currItem = this._exchangeList[i];
            if (id == currItem._id) {
                return currItem;
            }
        }
        return null;
    } 
    /** 获取实体 */
    public getListByType(type:number): Array<game.model.ExchangeItem> {
        let arrData = new Array<game.model.ExchangeItem>();
        for (let i = 0; i < this._exchangeList.length; i++) {
            let currItem = this._exchangeList[i];
            if(currItem._type == type)
            {   
                arrData.push(currItem);
            }
        }
        return arrData;
    } 
    //判断是否存在
    public isExist(item:game.model.ExchangeItem):boolean {
        for (let i = 0; i < this._exchangeList.length; i++) {
            let currItem = this._exchangeList[i];
            if (item._id == currItem._id) {
                return true;
            }
        }
        return false;
    }
    public clear():void {
				
	}

    public destroy():void 
    {

	}
}