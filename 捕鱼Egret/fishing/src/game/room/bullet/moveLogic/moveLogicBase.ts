/***
 * 
 * 移动逻辑基类
 * 
 */
class MoveLogicBase
{
    /** */
    protected _ojbParent:egret.DisplayObjectContainer;
    /**类型 */
    protected _nType:number;
    /**移动状态是否暂停 */
    /**负责旋转 */
    protected _nObjRotation:number;
    private _bPause:boolean;
    /**坐标 */
    private _vcLocation:Array<egret.Point>;
    /**目标点 */
    private _posDest:egret.Point;
    /**时间 */
    private _nCostTime:number;

    constructor(){}

    /**创建函数 */
    create(nType:number,parent:egret.DisplayObjectContainer,objRotation:number,destPos:egret.Point,nCostTime:number):void
    {
        this._nType = nType;
        this._ojbParent = parent;
        this._posDest = destPos;
        this._nCostTime = nCostTime;
        this._nObjRotation = objRotation;
    }
    public start():void
    {
        if(!this._ojbParent)
        {
            return;
        }
        egret.Tween.get( this._ojbParent ).to( {x:this._posDest.x,y:this._posDest.y}, this._nCostTime);
    }
    public startWithCall(callback: Function, thisObj: any):void
    {
        egret.Tween.get( this._ojbParent ).to(
             {rotation: this._ojbParent.rotation + this._nObjRotation ,x:this._posDest.x,y:this._posDest.y},
              this._nCostTime).call(callback,thisObj);
    }
    public end():void
    {
        if(!this._ojbParent)
        {
            return;
        }
        egret.Tween.removeTweens(this._ojbParent);
        this._ojbParent = null;
    }
}