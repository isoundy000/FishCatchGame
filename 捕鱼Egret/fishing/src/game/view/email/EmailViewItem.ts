class EmailViewItem extends eui.Component{
	public lingqu:eui.Group;
	public lingquBtn:eui.Button;
	public imgLingqu:eui.Image;
	public imgYilingqu:eui.Image;

	public chakan:eui.Group;
	public chakanBtn:eui.Button;
	public imgChakan:eui.Image;
	public imgYiChakan:eui.Image;

	public endChakan:eui.Image;
	public endLingqu:eui.Image;
	//标题
	public labTil:eui.Label;
	//显示内容 或者时间
	public labContain:eui.Label; 
	public constructor() 
	{
		super();
	}
	public setData(data:game.model.EmailItem):void
	{
		/** required uint32 mailId = 1;
			required uint32 mailType = 2;
			required uint32 userId = 3;//收件人id
			required string receiveUserName = 4;
			required uint32 sendUserId = 5;
			required string sendUserName = 6;
			repeated ItemInfo items = 7;
			required uint64 time = 8;//发送时间为1970年至今毫秒数
			required uint32 state = 9;//0未领取（查看），1领取，2查看（无物品附件）
			required string mailContent = 10;//邮件文字内容
	    */
		this.labTil.text = data.getMailTitle();
		this.labContain.text = data.getMailContent();
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
		if(items.length > 0)
		{
			this.setLingqu(isEnd);
		}else
		{
			this.setChaKan(isEnd);
		}
	}
	//查看按钮
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
}