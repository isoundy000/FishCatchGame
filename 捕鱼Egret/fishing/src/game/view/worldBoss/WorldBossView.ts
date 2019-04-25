class WorldBossView extends burn.view.PopView {
	private _uiDisplay:WorldBossCom;
	/**scroview */
	private _roomListGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	public constructor() {
		super();
		this._btnWrapList = new Array();
	}
	private addBgResource(clazz:any,url:string):void
	{
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new WorldBossCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//关闭当前界面
		this._uiDisplay.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._uiDisplay.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.helpBtn));
		
		let self = this;
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Djs/DjsItem.exml", function(){
			self.send(NotifyEnum.DJS_ITEM_LOADED);
		},this);
	}
	public initList(msg:GrandPrixRankBackMessage):void
	{
		//排行数据

		let myData = msg.getMyData();
		this._uiDisplay.myScoreLab.text = myData.rankValue + "";
		if(myData.rankValue != 0)
		{
			this._uiDisplay.myRankLab.text = myData.rank + "";
		}else
		{
			this._uiDisplay.myRankLab.text = "未上榜";
		}

		let dayData = msg.getDayData();
		this._uiDisplay.listGroup.removeChildren();
		//1,2,3,4-10,11-20,21-50,51-100,101-200    68
		let str = game.table.T_Config_Table.getVoByKey(68).value;
		let len = dayData.length;
		let strDate = str.split(",");
		let gainTable = game.table.T_GrandPrixRankRange_Table.getAllVo();
		let _arr = new Array<game.table.T_GrandPrixRankRange>();
		for(let i = 0; i < gainTable.length; i++)
		{
			if(gainTable[i].roomType == RequesetRoomState.DjsRoom)
			{
				_arr.push(gainTable[i]);
			}
		}
		for(let i = 0; i < _arr.length; i++)
		{
			if(i >= strDate.length)
			{
				continue;
			}
			let dataItem = null;
			if(i < len)
			{
				dataItem = dayData[i];
			}
			let item = new DjsUIItem();
			item.setData(dataItem,strDate[i],_arr[i],i);
			this._uiDisplay.listGroup.addChild(item);
		}
		let tLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
		tLayout.gap = 23;
		this._uiDisplay.listGroup.layout = tLayout;    /// 网格布局
	}
	
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) 
	{
		burn.Director.popView();
	}
	/** 打开规则 */
	private openHelp(e:egret.TouchEvent) 
	{
		let settingView:DjsRuleView = new DjsRuleView(Rule_State.WorldBoss);
		let settingMed:DjsRuleMediator = new DjsRuleMediator(settingView);
		burn.Director.pushView(settingMed);
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/worldBoss/WorldBossUI.exml",this.addBgResource,this);
	}

	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		this._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._uiDisplay.helpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);

		this.parent && this.parent.removeChild(this);

		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/worldBoss/WorldBossUI.exml");
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Djs/DjsItem.exml");
	}
}

/***操作UI的对应类 */
class WorldBossCom extends eui.Component{
	public constructor(){super();}
	public closeBtn:eui.Button;//关闭
	public listGroup:eui.Group;

	public helpBtn:eui.Button;

	public myScoreLab:eui.Label;
	public myRankLab:eui.Label;
}