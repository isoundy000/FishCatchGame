// TypeScript file
class CommonHelpView  extends eui.Component {
    //父控件
    private _parentView:any;
    //root
    private root:eui.Group;
    public contain:eui.Group;//340 240
    public bgInner:eui.Image;//370 270
    public bg:eui.Image;//400 300

    /** 宽高 */
    private _containW:number;
    private _containH:number;
    private _str:string;
	public constructor(parent:any, id:number) {
		super();
        this._parentView = parent;
        
        this._str = game.util.Language.getText(game.table.T_Desc_Table.getVoByKey(id).descVip);
        let strW_H = game.table.T_Desc_Table.getVoByKey(id).descW_H.split("_");
        this._containW = Number(strW_H[0]);
        this._containH = Number(strW_H[1]);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/commonHelp/CommonHelpUI.exml",this.loaded,this);
	}
    public loaded(clazz:any,url:string):void {
		this.skinName = clazz;
		game.util.UIUtil.popView(this.root);
		this.root.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        this.contain.width = this._containW;
        this.contain.height = this._containH;

        this.bgInner.width = this._containW + 30;
        this.bgInner.height = this._containH + 30;

        this.bg.width = this._containW + 60;
        this.bg.height = this._containH + 60;

        let contentTxt = new egret.TextField();
		contentTxt.textAlign = egret.HorizontalAlign.LEFT;
		contentTxt.textFlow = (new egret.HtmlTextParser).parser(this._str);
		contentTxt.touchEnabled = false;
		contentTxt.lineSpacing = 16;
        contentTxt.width = this._containW;
        contentTxt.height = this._containH;
        this.contain.addChild(contentTxt);
    }
    /**确定按钮 */
    private onOKButtonClick(e:egret.TouchEvent) {
		if (this._parentView) {
            this._parentView.removeChild(this);
            burn._Notification_.send(NotifyEnum.CHECK_POP);
        }
	}
	public destroy():void {
		game.util.UIUtil.closeView(this.root, ()=>{
            this.parent && this.parent.removeChild(this);
            this.root.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/commonHelp/CommonHelpUI.exml");
		});
	}
}