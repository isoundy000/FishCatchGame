// TypeScript file
class EmailChakanView  extends eui.Component {
    public showTips:eui.Label;//提示字符创
    //单个按钮
    public oneGroup:eui.Group;//
    public lingqu:eui.Group;
	public lingquBtn:eui.Button;
	public imgLingqu:eui.Image;
	public imgYilingqu:eui.Image;

	public chakan:eui.Group;
	public chakanBtn:eui.Button;
	public imgChakan:eui.Image;
	public imgYiChakan:eui.Image;

	public endLingqu:eui.Image;
	public endChakan:eui.Image;
    public okOneBtn:eui.Group;//
    //
    public scrolGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
    //回调函数
    private _callFun:Function;
    //父控件
    private _parentView:any;
    private _list:Array<game.model.Item>;
    private _strTips:string;
    private _state:number;
	public constructor(strTips:string, callFun:Function, parent:egret.DisplayObject, list:Array<game.model.Item>, state:number) {
		super();
        this._strTips = strTips;
        this._callFun = callFun;
        this._parentView = parent;
        this._list = list;
        this._state = state;
		this._btnWrapList = new Array();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/EmailChakanPanel.exml";
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml", ()=>{
		    EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/EmailChakanPanel.exml",this.addBgResource,this);
        }, this);
	}
	private addBgResource(clazz:any,url:string):void
	{
		this.oneGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this.oneGroup));
        //
        this.setGroupOne();
        this.setTips(this._strTips);
		this.setOkCallFun(this._list);

        let state = this._state;
		/**	0:没领取/没查看
			1:已领取
			2:已查看 */
		let isEnd = false;
		let items = this._list;
		if(state == 0)
		{
			isEnd = false;
		}else
		{
			isEnd = true;
		}
		if(items.length > 0)
		{
			this.setLingqu(isEnd);
		}else
		{
			this.setChaKan(isEnd);
		}
	}
    public setOkCallFun(list:Array<game.model.Item>):void
    {
        if(list && list.length > 0)
        {
            for (let i = 0; i < list.length; i++) {
                let item = new BagViewItem(list[i].getItemId(), list[i].getCount());
                item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml";
                item.name = list[i].getItemId() + "";
                item.scaleX = item.scaleY = 0.95;
                item.init();
                this.scrolGroup.addChild(item);
            }

            let tLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
            tLayout.gap = 10;
            tLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
            this.scrolGroup.layout = tLayout;    /// 网格布局
            this.scrolGroup.anchorOffsetX = this.scrolGroup.width/2;
            this.scrolGroup.anchorOffsetY = this.scrolGroup.height/2;
        }
    }
	public setChaKan(bEnd:boolean):void
	{
		this.lingqu.visible = false;
		this.chakan.visible = true;
		if(bEnd)
		{
			this.imgYiChakan.visible = true;
			this.imgChakan.visible = false;
			this.endChakan.visible = true;
		}else
		{
			this.imgYiChakan.visible = false;
			this.imgChakan.visible = true;
			this.endChakan.visible = false;
		}
	}
	//领取按钮
	public setLingqu(bEnd:boolean):void
	{
		this.lingqu.visible = true;
		this.chakan.visible = false;
		if(bEnd)
		{
			this.imgYilingqu.visible = true;
			this.imgLingqu.visible = false;
			this.endLingqu.visible = true;
		}else
		{
			this.imgYilingqu.visible = false;
			this.imgLingqu.visible = true;
			this.endLingqu.visible = false;
		}
	}
    public setTips(str:string):void
    {
        this.showTips.text = str;
    }
    public setGroupOne():void
    {
         this.oneGroup.visible = true;
    }
	public initView():void {
	}
	/**关闭游戏 */
	public onClosttButtonClick(e:egret.TouchEvent) 
	{
		if(this._parentView)
        {
            this._parentView.removeChild(this);
        }
	}
    /**确定按钮 */
    private onOKButtonClick(e:egret.TouchEvent) 
	{
        if(this._callFun)
        {
            this._callFun();
        }
		if(this._parentView)
        {
            this._parentView.removeChild(this);
        }
	}
	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		this.oneGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
		this.parent && this.parent.removeChild(this);
		console.log("LoginView destory!");
	}
}