class QuickInfo
{
    private _nIntegral:number;
    private _nUserId:number;
    private _nBulletNum:number;
    public constructor(msg:QuickGameRankItemMessage)
    {
        /**
        required uint32 userId = 1;
        required string name = 2;
        required uint32 rank = 3;
        required uint32 integral = 4;
        required uint32 bulletNum = 5; */
        this._nIntegral = Number(msg.getIntegral());
        this._nUserId = Number(msg.getUserId());
        this._nBulletNum = Number(msg.getBulletNum());
    }
    public getUserId():number
    {
        return this._nUserId;
    }
    public getBulletNum():number
    {
        return this._nBulletNum;
    }
    public setBulletNum(value:number):void
    {
        this._nBulletNum = value;
    }
    public getIntegral():number
    {
        return this._nIntegral;
    }
    public setIntegral(value:number):void
    {
        this._nIntegral = value;
    }
}