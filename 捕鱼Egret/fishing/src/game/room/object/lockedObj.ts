/**
 * 锁定状态的结构体
 */
class LockedObj
{
	private _arrLocekdId:Array<number>;	//锁定鱼的ID
	private _nLockedPos:number;		    //使用锁定功能的玩家位置
    private _nUserId:number;            //锁定状态的UserId
	public constructor(nLockedId:Array<number>,nLockedPos:number,nUserId:number) {
        this._arrLocekdId = nLockedId;
        this._nLockedPos = nLockedPos;
        this._nUserId = nUserId;
	}
    public setLockedId(nLockedId:number,nGunIndex:number):void
    {
        this._arrLocekdId[nGunIndex] = nLockedId;
    }
    public getLockedID():Array<number>
    {
        return this._arrLocekdId;
    }
    public spliceLockedID():void
    {
        this._arrLocekdId.splice(1,1);
        this._arrLocekdId.splice(2,1);
    }
    public getLockedPos():number
    {
        return this._nLockedPos;
    }
    public getUserId():number
    {
        return this._nUserId;
    }
}