class FishKindsView extends burn.view.PopView {
	private _uiDisplay:FishKindsUI;
	/**scroview */
	private _roomListGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	public constructor() {
		super();
		game.util.ReyunUtil.sendEvent(game.util.LogEnum.CHECK_FISH_FUN_COUNT);
		this._btnWrapList = new Array();
	}
	private addBgResource(clazz:any,url:string):void
	{
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new FishKindsUI();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//关闭当前界面
		let closeBtn = this._uiDisplay.btnClose;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
		let usermodel:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
		this._roomListGroup = uiObj.scrollerGroup;//uiObj.roomList_group;
		let newTeshuGroup = new eui.Group();
		newTeshuGroup.width = 1060;
		let fishData = game.table.T_Fish_Table.getAllVo();
		let arrTeshu = new Array<game.table.T_Fish>();
		let arrPutong = new Array<game.table.T_Fish>();
		let fishRoom = new Array<game.table.T_Fish>();
		for (let i = 0; i < fishData.length; i++) {
			let str = fishData[i].containRoomId;
			let data = str.split(",");
			for (let j = data.length - 1; j >= 0; j--) {
				if (Number(data[j]) == usermodel.getMatchRoomLevel()) {
					fishRoom.push(fishData[i]);
					break;
				}
			}
		}
		for (let i = 0; i < fishRoom.length; i++) {
			if (fishRoom[i].type >= 2) {
				arrTeshu.push(fishRoom[i]);
			} else {
				arrPutong.push(fishRoom[i])
			}
		}
		for (let i = 0; i < arrTeshu.length; i++) {
			let item = new FishKindsItemUI();
			item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/FishKindItem.exml";
			item.iconBtn.name = ""+i;
			item.labname.text = game.util.Language.getText(arrTeshu[i].name);//""+i;
			item.imageicon.source = "fishkind_"+arrTeshu[i].fishkindIcon+"_png";
			if (arrTeshu[i].quality == 2) {
				item.imageHuang.visible = true;
				item.imageZi.visible = false;
			} else if (arrTeshu[i].quality == 3) {
				item.imageHuang.visible = false;
				item.imageZi.visible = true;
			} else {
				item.imageHuang.visible = false;
				item.imageZi.visible = false;
			}
			newTeshuGroup.addChild(item);
		}
		let tLayout:eui.TileLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 10;
        tLayout.paddingRight = 10;
        tLayout.paddingBottom = 10;
		newTeshuGroup.layout = tLayout;    /// 网格布局
		
		if (arrTeshu.length > 0) {
			let itemType = new FishKindsTypeItemUI();
			itemType.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/FishKindTypeItem.exml";
			itemType.titlePutong.visible = false;
			itemType.titleTeshu.visible = true;
			this._roomListGroup.addChild(itemType);
			this._roomListGroup.addChild(newTeshuGroup);
		}
		//普通
		let newPutongGroup = new eui.Group();
		newPutongGroup.width = 1060;

		for (let i = 0; i < arrPutong.length; i++) {
			let item = new FishKindsItemUI();
			item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/FishKindItem.exml";
			item.iconBtn.name = ""+i;
			//item.labname.text = arrPutong[i].name;//""+i;
			let arrName = new Array<string>();
			arrName.push(arrPutong[i].score + "");
			item.labname.text = game.util.Language.getDynamicText(13,arrName);//arrPutong[i].name;
			item.imageicon.source = "fishkind_"+arrPutong[i].fishkindIcon+"_png";
			if (arrPutong[i].quality == 2) {
				item.imageHuang.visible = true;
				item.imageZi.visible = false;
			} else if (arrPutong[i].quality == 3) {
				item.imageHuang.visible = false;
				item.imageZi.visible = true;
			} else {
				item.imageHuang.visible = false;
				item.imageZi.visible = false;
			}
			newPutongGroup.addChild(item);
		}
		let ntLayout:eui.TileLayout = new eui.TileLayout();
        ntLayout.paddingTop = 10;
        ntLayout.paddingLeft = 10;
        ntLayout.paddingRight = 10;
        ntLayout.paddingBottom = 10;
		newPutongGroup.layout = ntLayout;    /// 网格布局

		let itemTypePu = new FishKindsTypeItemUI();
		itemTypePu.skinName =  CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/FishKindTypeItem.exml";
		itemTypePu.titlePutong.visible = true;
		itemTypePu.titleTeshu.visible = false;
		this._roomListGroup.addChild(itemTypePu);
		this._roomListGroup.addChild(newPutongGroup);

		let vLayout:eui.VerticalLayout = new eui.VerticalLayout();
        vLayout.paddingTop = 10;
		this._roomListGroup.layout = vLayout;
	}
	/**选择右侧列表*/
	private selectRightItem(e:egret.TouchEvent) {
		console.log("#---------------------name---->",e.target.name);
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/FishKindItem.exml",()=>{
			EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/FishKindTypeItem.exml", ()=>{
				EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/FishKinds.exml",this.addBgResource,this);
			}, this);
		}, this);
	}

	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		this._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this.parent && this.parent.removeChild(this);
		
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/FishKindItem.exml");
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/FishKindTypeItem.exml");
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/FishKinds.exml");
	}
}

/***操作UI的对应类 */
class FishKindsUI extends eui.Component{
	public constructor(){super();}
	public btnClose:eui.Button;//关闭
	public scrollerGroup:eui.Group;

}
class FishKindsItemUI extends eui.Component{
	public constructor(){super();}
	public iconBtn:eui.Button;//选择按钮
	public imageicon:eui.Image;//鱼的头像
	public labname:eui.Label;//鱼的名称标签
	public imageHuang:eui.Image;//黄色品质
	public imageZi:eui.Image;//紫色品质
}
class FishKindsTypeItemUI extends eui.Component{
	public constructor(){super();}
	public titleTeshu:eui.Image;
	public titlePutong:eui.Image;
}