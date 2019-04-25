// TypeScript file
class SendView  extends eui.Component {
    public closeBtn:eui.Button;
	public _id:number;
	private _parent:BagView;
	private _userModel:UserModel;
	//当前赠送数量
	public nCurNumber:number;
	//控件
	public itemGroup:eui.Group;
	//名称
	public itemName:eui.Label;
	//数量
	public numLab:eui.Label;
	//输入框
	public username:eui.EditableText;
	//按钮加
	public resouceBtn:eui.Button;
	//按钮减
	public addBtn:eui.Button;
	//赠送按钮
	public sendBtn:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	public constructor(id:number) 
	{
		super();
		this._id = id;
		this._btnWrapList = new Array();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/SendUI.exml";
        
		this._userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this.closeBtn));
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/SendUI.exml",this.addBgResource,this);
	}
	private addBgResource(clazz:any,url:string):void
	{
		let itemVo = game.table.T_Item_Table.getVoByKey(this._id);
		let itemData = this._userModel.getItemById(this._id);
        let item = new BagViewItem(itemData.getItemId(), itemData.getCount());
		item.init();
		item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml";
		item.anchorOffsetX = item.width/2;
		item.anchorOffsetY = item.height/2;
		item.countTxt.visible = false;
		item.numBg.visible = false;
		this.itemGroup.addChild(item);

		this.itemName.text = game.util.Language.getText(itemVo.name);
		this.nCurNumber = itemVo.everyTimeLimit;
		this.numLab.text = this.nCurNumber + "";
		this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClick, this);
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addResource, this);
		this.resouceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resouce, this);
		this.username.alpha = 0.5;
		this.username.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);

	}
	public onChange(e:egret.Event){
    	e.target.text = "";
		e.target.alpha = 1;
	}
	public setParent(parent:BagView)
	{
		this._parent = parent;
	}
	public initView():void {
	}
	/**增加 */
	public addResource(e:egret.TouchEvent) :void
	{
		let itemVo = game.table.T_Item_Table.getVoByKey(this._id);
		let itemData = this._userModel.getItemById(this._id);
		if (itemData.getCount() < (this.nCurNumber + itemVo.everyTimeLimit)) {
			return;
		}
		this.nCurNumber += itemVo.everyTimeLimit;
		this.numLab.text = this.nCurNumber + "";
	}
	/**减少 */
	public resouce(e:egret.TouchEvent) :void
	{
		let itemVo = game.table.T_Item_Table.getVoByKey(this._id);
		let itemData = this._userModel.getItemById(this._id);
		if (this.nCurNumber == itemVo.everyTimeLimit) {
			return;
		}
		this.nCurNumber -= itemVo.everyTimeLimit;
		this.numLab.text = this.nCurNumber + "";
	}
	/**关闭游戏 */
	public onClosttButtonClick(e:egret.TouchEvent) {
		if (this._parent) {
			this._parent.removeChild(this);
		}
	}
	/**发送 */
	public sendClick(e:egret.TouchEvent) 
	{
		if (this.username.text == "") {
			game.util.GameUtil.popTips(game.util.Language.getText(38));
			return;		
		}
		if (Number(this.username.text) == this._userModel.getUserId()) {
			game.util.GameUtil.popTips(game.util.Language.getText(39));
			return;		
		}
		let reg = new RegExp("^[0-9]*$");
		if (!reg.test(this.username.text)) {
			game.util.GameUtil.popTips(game.util.Language.getText(38));
			return;
		}
		
		let req:FindUserSendMessage = new FindUserSendMessage();
		req.initData();
		req.setUserId(Number(this.username.text));
		NetManager.send(req);
	}
	public sendGiveMes(userName:string)
	{
		let itemVo = game.table.T_Item_Table.getVoByKey(this._id);
		let arrName = new Array<string>();
		arrName.push(this.nCurNumber + "");
		arrName.push(game.util.Language.getText(itemVo.name) + "");
		arrName.push(this.username.text + "");
		arrName.push(userName + "");
		//是否邮寄{0}个{1}给{2}({3})
		let string = game.util.Language.getDynamicText(41,arrName);
		let self = this;
		game.util.GameUtil.openConfirmByTwoButton(null,function(){
			burn._Notification_.send(NotifyEnum.GIVE_ITEM_DATA,{id:self._id,num:self.nCurNumber,userId:self.username.text});
			//发送赠送消息
			let req:GiveItemSendMessage = new GiveItemSendMessage();
			req.initData();
			req.setGiveItem({itemId:self._id,totalCount:self.nCurNumber});
			req.setReceiveUserId(Number(self.username.text));
			NetManager.send(req);
			self.onClosttButtonClick(null);
		}, this, string);
	}
	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		this.parent && this.parent.removeChild(this);
		this.sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClick, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addResource, this);
		this.resouceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.resouce, this);
		this.username.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);
		console.log("LoginView destory!");
	}
}