class ActiveRulePanel extends eui.Component{
    public btnClose:eui.Button;//关闭按钮
    public root:eui.Group;
    private _parentView:egret.DisplayObjectContainer;
    public contain:eui.Group;
	public constructor(parent:egret.DisplayObjectContainer) {
		super();
        this._parentView = parent;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/active/ActiveReul.exml",this.loaded,this);
	}
    public loaded():void
    {
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/active/ActiveReul.exml";
		game.util.UIUtil.popView(this.root);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        let contentTxt = new egret.TextField();
        contentTxt.textAlign = egret.HorizontalAlign.LEFT;
        contentTxt.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(178).value);
        contentTxt.touchEnabled = false;
        contentTxt.lineSpacing = 16;
        contentTxt.width = this.contain.width;
        contentTxt.height = this.contain.height;
        this.contain.addChild(contentTxt);
    }
    /**确定按钮 */
    private onOKButtonClick(e:egret.TouchEvent) 
	{
		if (this._parentView) {
            game.util.UIUtil.closeView(this.root,()=>{
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
                this._parentView.removeChild(this);
            })
        }
	}
}