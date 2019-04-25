/**
 * 邮箱数据
 */
class EmailModel extends burn.model.ModelBase {
    private _emailList:Array<game.model.EmailItem>;
    private _currEmialId:number = -1;
	public constructor()
    {
		super();
	}

    public init():void {
        this._emailList = new Array<game.model.EmailItem>();
        this._currEmialId = -1;
    }
    /** 向邮箱添加邮件 */
    public addItem(item:game.model.EmailItem):void {
        var flag = this.isExist(item);
        if (!flag) {
            this._emailList.push(item);
            return;
        }
        for (var i = 0; i < this._emailList.length; i++) {
            var currItem = this._emailList[i];
            if (item.getMailId() == currItem.getMailId()) {
               this._emailList[i] = item;
            } else {
                this._emailList.push(item);
            }
        }
    }
    /** 清空邮箱 */
    public clearEmail():void
    {
        this._emailList = null;
        this._emailList = new Array<game.model.EmailItem>();
    }
    /** 从邮箱中删除邮件 */
    public removeItem(mailId:number):boolean {
        for (var i = 0; i < this._emailList.length; i++) {
            var currItem = this._emailList[i];
            if (mailId == currItem.getMailId()) {
                this._emailList.splice(i, 1);
                return true;
            }
        }
        return false;
    }    
    /** 获取邮件列表 */
    public getMailList(): Array<game.model.EmailItem> {
        return this._emailList;
    }
    /** 获取邮件列表 */
    public getMailListByType(type:number): Array<game.model.EmailItem> {
        var arrData = new Array<game.model.EmailItem>();
        for (var i = 0; i < this._emailList.length; i++) {
            var currItem = this._emailList[i];
            if(currItem.getMailType() == type)
            {   
                arrData.push(currItem);
            }
        }
        return arrData;
    }
    public setCurrEmialId(id:number):void {
        this._currEmialId = id;
    }
    public getCurrEmailId():number {
        return this._currEmialId;
    }
    /** 获取邮件实体 */
    public getMailListById(id:number):game.model.EmailItem {
        for (var i = 0; i < this._emailList.length; i++) {
            var currItem = this._emailList[i];
            if (id == currItem.getMailId()) {
                return currItem;
            }
        }
        return null;
    } 
     /** 获取邮件实体 */
    public updateMailState(id:number,state:number):void {
        for (var i = 0; i < this._emailList.length; i++) {
            var currItem = this._emailList[i];
            if (id == currItem.getMailId()) {
                currItem.setState(state);
                break;
            }
        }
    }
    //判断邮件是否存在
    public isExist(item:game.model.EmailItem):boolean {
        for (var i = 0; i < this._emailList.length; i++) {
            var currItem = this._emailList[i];
            if (item.getMailId() == currItem.getMailId()) {
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