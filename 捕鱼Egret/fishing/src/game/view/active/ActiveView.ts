class ActiveView extends burn.view.PopView {
	private _uiDisplay:ActiveCom;
	/**scroview */
	private _roomListGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _bPop:boolean = false;

	//数据模型列表
	public _list:Array<game.model.ActiveObj>;
	public constructor() {
		super();
		this._btnWrapList = new Array();
		this._bPop = false;
	}
	private addBgResource(clazz:any,url:string):void
	{
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new ActiveCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//关闭当前界面
		let closeBtn = this._uiDisplay.closeBtn;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this.send(NotifyEnum.CHANGE_SETTING);

		if(!this._bPop)
		{
			//打开UI动画
			game.util.UIUtil.popView(this._uiDisplay.root);
			this._bPop = true;
		}
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));

		let self = this;
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/active/ActiveLeftItem.exml",()=>{
			// self.setLeftList();
        	// //选择第一个活动
        	// self.changeActive(0);
			let send:GetLimitedTimeActiveInfoMessage = new GetLimitedTimeActiveInfoMessage();
			send.initData();
			NetManager.send(send);
		},this);

	}
	public setLeftList(list:Array<game.model.ActiveObj>):void
	{
		// this._uiDisplay.leftGroup.removeChildren();
		// let vos = game.table.T_Active_Table.getAllVo();
		// let len = vos.length;
		// for(let i = 0; i < len; i++)
		// {
		// 	let leftItem = new ActiveLeftItem();
		// 	this._uiDisplay.leftGroup.addChild(leftItem);
		// 	leftItem.setImg(vos[i].nameUrl,i);
		// 	leftItem.name = i + "";
		// }

		// let tLayout:eui.VerticalLayout  = new eui.VerticalLayout();
		// this._uiDisplay.leftGroup.layout = tLayout;    
		this._uiDisplay.leftGroup.removeChildren();
		let len = list.length;
		for (let i = 0; i < len; i++) {
			let leftItem = new ActiveLeftItem();
			this._uiDisplay.leftGroup.addChild(leftItem);
			leftItem.setImg(list[i]._nameUrl,i);
			leftItem.name = i + "";
		}

		let tLayout:eui.VerticalLayout  = new eui.VerticalLayout();
		this._uiDisplay.leftGroup.layout = tLayout; 
		this._list = list;
	}
	//切换活动
	public changeActive(nIndex:number):void
	{
		let numChild = this._uiDisplay.leftGroup.numChildren;
		for (let i = 0; i < numChild; i++) {
			let item = this._uiDisplay.leftGroup.getElementAt(i) as ActiveLeftItem;
			if (i == nIndex) {
				item.selectByBoolean(true);
			} else {
				item.selectByBoolean(false);
			}
		}

		this.clearActiveItem();
		this._uiDisplay.activeGroup.removeChildren();
		let self = this;

		let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
		switch (this._list[nIndex]._type) {
			case Active_Type.LIMIT_TIME_ACTIVE_TYPE_FISH_SEND: ////捕鱼送礼
				EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_1.exml",()=>{
					let itemPanel = new Active1Item();
					self._uiDisplay.activeGroup.addChild(itemPanel);
				},this);
			break;
			case Active_Type.LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND://充值送礼
				EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_2.exml",()=>{
					let itemPanel = new Active2Item();
					self._uiDisplay.activeGroup.addChild(itemPanel);
				},this);
			break;
			case Active_Type.LIMIT_TIME_ACTIVE_TYPE_VIP_SEND://VIP送礼
				EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_3.exml",()=>{
					let itemPanel = new Active3Item();
					self._uiDisplay.activeGroup.addChild(itemPanel);
				},this);
			break;
			case Active_Type.LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP://神秘商店
				EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_4.exml",()=>{
					let itemPanel = new Active4Item();
					self._uiDisplay.activeGroup.addChild(itemPanel);
				},this);
			break;
		}

	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) 
	{
		burn.Director.popView();
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/active/ActiveUI.exml",this.addBgResource,this);
	}
	private clearActiveItem() {
		if(this._uiDisplay.activeGroup.numChildren > 0) {
			let child = this._uiDisplay.activeGroup.getElementAt(0) as ComponetBase;
			if(child) {
				child.destory();
			}
		}
	}
	public destroy():void {
		//关闭UI动画
		let self = this;
		game.util.UIUtil.closeView(this._uiDisplay.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self.clearActiveItem();
			self.parent && self.parent.removeChild(self);
			
			self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);

			self._bPop = false;
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/ActiveUI.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_1.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_2.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_3.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_4.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/ActiveLeftItem.exml");
			
			let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
			let list = activeModel.getActiveList();
			let len = list.length;
			for (let i = 0; i < len; i++) {
				let url = list[i]._nameUrl;
				RES.destroyRes(url + "_1_png");
				RES.destroyRes(url + "_2_png");
			}
		});
	}
}

/***操作UI的对应类 */
class ActiveCom extends eui.Component{
	public constructor(){super();}
	public closeBtn:eui.Button;//关闭
	public root:eui.Group;

	public leftGroup:eui.Group;
	public activeGroup:eui.Group;
}