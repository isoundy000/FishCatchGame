class ShareGainItem extends eui.Component{
    public iconGroup:eui.Group;
    public vipLv:egret.BitmapText;
    public nameLab:eui.Label;
    public descLab:eui.Label;
    public lingqu:eui.Group;
    public yilingqu:eui.Group;
	public constructor() {
		super();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/share/ShareGainItemB.exml";
	}
	public init(data:game.model.EmailItem):void 
    {
		this.nameLab.text = data.getMailTitle();
		this.descLab.text = data.getMailContent();
		let time = Date.now();
		let emailTime = Date.parse(String(data.getTime()));

		let state = data.getState();
		/**	0:没领取/没查看
			1:已领取
			2:已查看 */
		let isEnd = false;
		let items = data.getItems();
		if(state == 0)
		{
			isEnd = false;
		}else
		{
			isEnd = true;
		}
		this.setLingqu(isEnd);
	}
	//领取按钮
	public setLingqu(bEnd:boolean):void
	{
		this.lingqu.visible = true;
		if(bEnd)
		{
			this.yilingqu.visible = true;
            this.lingqu.visible = false;
		}else
		{
			this.yilingqu.visible = false;
            this.lingqu.visible = true;
		}
	}
}