
/**
 * 捕鱼的动画类，继承egret.MovieClip,
 * 添加事件类型和回调
 */
class MovieFish extends egret.MovieClip {
    //清空事件时的回调函数
    private _callFun:Function;
    //清空类型
    private _type:string;
    public constructor(movieClipData: egret.MovieClipData, type: string = egret.Event.COMPLETE, callFun:Function = null) {
        super(movieClipData);
        this._type = type;
        this._callFun = callFun;
    }
    public initEvent() {
		this.addEventListener(this._type, this.complete, this);
    }

    public complete(e:egret.Event) {
        this.removeEventListener(this._type, this.complete,this);
        if(this && this._callFun) {
            this._callFun();
        }
        //清空UI
		this.parent && this.parent.removeChild(this);
        this._callFun = null;
        this._type = null;
    }
}