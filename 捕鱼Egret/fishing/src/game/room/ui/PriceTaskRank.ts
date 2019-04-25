//PriceTaskUI
/** 悬赏任务 第几名 UI */
class PriceTaskRankUI extends eui.Component 
{
    public rankLab:egret.BitmapText;
    public root:eui.Group;
    private _nRank;number;
    public constructor(nRank:number) {
		super();
        this._nRank = nRank;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/price/PriceTaskRank.exml", ()=>{
            this.init();
        }, this);
	}
    public init():void {
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/price/PriceTaskRank.exml";
        this.rankLab.text = this._nRank + "";
        this.rankLab.anchorOffsetX = this.rankLab.width/2;
        this.rankLab.anchorOffsetY = this.rankLab.height/2;
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
    }
	/** 销毁函数 */
	public destroy():void {
		this.parent && this.parent.removeChild(this);
	}
}