class SelectRoomView extends burn.view.PopView {
	private _uiDisplay:SelectRoomUI;
	/**scroview */
	private _roomListGroup:eui.Group;
	/**左侧list */
	private _roomListLeftGroup:eui.Group;
	//左侧区域列表的ID数组
	private _arrLeftList:Array<any>;
	//右侧房间列表的数据数组
	private _arrRightList:Array<any>;
	//当前想选中的按钮
	private _curTouchItem:any;
	public constructor() {
		super();
	}
	private addBgResource(clazz:any,url:string):void {
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new SelectRoomUI();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);

		//打开UI动画
		game.util.UIUtil.popView(this._uiDisplay.root);

		//关闭当前界面
		let closeBtn = this._uiDisplay.colse_btn;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		
		//开始游戏的按钮
		
		let startBtn = this._uiDisplay.start_btn;
		startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartButtonClick, this);
		
		//设置列表显示内容
		//this.setLeftList();
		//加载完成，发送请求消息
		//ROOMLIST_RESOUCE_LOADED
		burn._Notification_.send(NotifyEnum.ROOMLIST_RESOUCE_LOADED);
	}

	//显示左侧列表
	//required uint32 serverId = 1;
	//required uint32 state = 2;//1流畅(0<100)，2繁忙(101<150)，3拥挤(151~180)，4满员(181~200)
	public showLeftList(arr:Array<any>):void {
		this._arrLeftList = new Array<any>();
		this._arrLeftList = arr;
		this._roomListLeftGroup = this._uiDisplay.room_Left_group;
		for (let i = 0; i < arr.length; i++) {
			let itemLeft = new SelectRoomLeftItem();
			let state = arr[i].state;
			itemLeft.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/RoomListItem.exml";
			itemLeft.name = ""+i;
			itemLeft.name_bitlab.text = ""+(i+1);
			itemLeft.okBtn.name = ""+i;
			itemLeft.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectLeftItem, this);

			for (let j = 1; j <=4; j++) {
				if (j == state) {
					itemLeft["imgStage_" + j].visible = true;
				} else {
					itemLeft["imgStage_" + j].visible = false;
				}
			}
			this._roomListLeftGroup.addChild(itemLeft);
		}
		let vLayout:eui.VerticalLayout = new eui.VerticalLayout();
        vLayout.paddingTop = 10;
		this._roomListLeftGroup.layout = vLayout;
		//首次显示内容
		this.setLeftList();
	}
	//单独更新右侧单独项
	public updateRightItem(data:any):void {
		let defaultSelect = -1;
		let len = this._arrRightList.length;
		for (let i = 0; i < len; i++) {
			if (data.roomId == this._arrRightList[i].roomId) {
				defaultSelect = i;
				break;
			}
		}
		if (defaultSelect != -1) {
			let item = (this._roomListGroup.getChildAt(defaultSelect) as SelectRoomItem);
			if (item) {
				item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/RoomItem.exml";
				item.nameTitle.touchEnabled = false;
				item.name_bitLab.touchEnabled = false;
				item.ren.touchEnabled = false;
				item.image_RED.touchEnabled = false;
				item.image_CUR.touchEnabled = false;
				//当前房间人数
				item.name_bitLabCur.text = String(data.userCount);
				//当前进度条
				if (data.userCount == 4) {
					item.image_RED.visible = true;
					item.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this .tipsRoomMax, this);
				} else {
					item.image_RED.visible = false;
					item.image_CUR.width = (data.userCount/4.0) * 222;
					item.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectRightItem, this);
				}
			}
		}
	}
	//显示右侧列表
	public showRightList(arr:Array<any>):void {
		this._arrRightList = new Array<any>();
		this._arrRightList = arr;

		this._roomListGroup = this._uiDisplay.room_group;//uiObj.roomList_group;
		this._roomListGroup.removeChildren();
		for (let i = 0; i < arr.length; i++) {
			let item = new SelectRoomItem();
			item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/RoomItem.exml";
			item.name_bitLab.text = String(i + 1);
			item.imageBg.name = String(i);
			//item.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectRightItem, this);
			item.root.name = String(i);
			item.nameTitle.touchEnabled = false;
			item.name_bitLab.touchEnabled = false;
			item.ren.touchEnabled = false;
			item.image_RED.touchEnabled = false;
			item.image_CUR.touchEnabled = false;

			item.root.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDownRightItem, this);
			item.root.addEventListener(egret.TouchEvent.TOUCH_END, this.touchCancelRightItem, this);
			item.root.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchCancelRightItem, this);
			//当前房间人数
			item.name_bitLabCur.text = String(arr[i].userCount);
			//当前进度条
			if (arr[i].userCount == 4) {
				item.image_RED.visible = true;
				item.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this .tipsRoomMax, this);
			} else {
				item.image_RED.visible = false;
				item.image_CUR.width = (arr[i].userCount/4.0) * 222;
				item.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectRightItem, this);
			}
			item.anchorOffsetX = 0.5;
			item.anchorOffsetY = 0.5;
			this._roomListGroup.addChild(item);
		}
		let scroller = this._uiDisplay.roomList_scrol;
		scroller.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
		//scroller.addEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this.rollOverCall, this);
		let tLayout:eui.TileLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 15;
        tLayout.paddingRight = 15;
        tLayout.paddingBottom = 20;
		this._roomListGroup.layout = tLayout;    /// 网格布局
	}
	private setLeftList():void {
		let defaultSelect = 0;
		let numChildren  = this._roomListLeftGroup.numChildren;

		let item = this._roomListLeftGroup.getChildAt(defaultSelect);
		(item as SelectRoomLeftItem).image_select.visible = true; 
	}
	/**选择左侧列表*/
	private selectLeftItem(e:egret.TouchEvent) {
		let defaultSelect = parseInt(e.target.name);
		let numChildren  = this._roomListLeftGroup.numChildren;
		
		for (let i = 0; i < numChildren; i++) {
			(this._roomListLeftGroup.getChildAt(i) as SelectRoomLeftItem).image_select.visible = false; 
		}
		
		let item = this._roomListLeftGroup.getChildAt(defaultSelect);
		(item as SelectRoomLeftItem).image_select.visible = true; 

		let req:ManualChooseRoomSendMessage = new ManualChooseRoomSendMessage();
        req.initData();
        req.setServerId(this._arrLeftList[defaultSelect].serverId);
        NetManager.send(req);
	}
	/**取消房间按钮 */
	private touchCancelRightItem(e:egret.TouchEvent) {
		if (this._curTouchItem == null) {
			return;
		}
		this._curTouchItem.scaleX = this._curTouchItem.scaleY = 1;
		this._curTouchItem = null;
	}
	/**滚动结束的事件回调 */
	private rollOverCall(e:egret.TouchEvent) {
		let numChildren  = this._roomListGroup.numChildren;
		
		for (let i = 0; i < numChildren; i++) {
			let item = (this._roomListGroup.getChildAt(i) as SelectRoomItem);
			item.scaleX = item.scaleY = 1;
		}
	}
	/**按下房间按钮 */
	private touchDownRightItem(e:egret.TouchEvent) {
		let self = this;
		if (e.target.name == null || e.target.name == "") {
			return;
		}
		let defaultSelect = Number(e.target.name);
		if (defaultSelect == NaN) {
			return;
		}
		let item = this._roomListGroup.getChildAt(defaultSelect);
		this._curTouchItem = item;
		this._curTouchItem.scaleX = this._curTouchItem.scaleY = 0.95;

	}
	//提示房间已满
	private tipsRoomMax(e:egret.TouchEvent) {
		game.util.GameUtil.popTips(game.util.Language.getText(11));
	}

	/**选择右侧列表*/
	private selectRightItem(e:egret.TouchEvent) {
		burn.Director.popView();
		let defaultSelect = Number(e.target.name);
		let roomId = this._arrRightList[defaultSelect].roomId;
		burn._Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {type:RequesetRoomState.SelectRoom, id:roomId});
		game.util.ReyunUtil.sendEvent(game.util.LogEnum.MANUAL_SEAT_SELECTION);
	}

	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
	}
	private onStartButtonClick(e:egret.TouchEvent) {
		this.send(NotifyEnum.RES_LOAD_OVER, null);
	}


	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/RoomItem.exml");
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/RoomListItem.exml");
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/SelectRoom.exml", this.addBgResource, this);
	}

	public destroy():void {
		let self = this;
		game.util.UIUtil.closeView(this._uiDisplay.root, function():void {
			let childItemNum = self._roomListGroup.numElements;
			for (let i = 0; i < childItemNum; i++) {
				let item = self._roomListGroup.getElementAt(i) as SelectRoomItem;
				item.imageBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, self .tipsRoomMax, self);
				item.imageBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.selectRightItem, self);
			}
			self._roomListGroup.removeChildren();

			self._uiDisplay.colse_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self.parent && self.parent.removeChild(self);
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/RoomItem.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/RoomListItem.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/SelectRoom.exml");
		});
	}
}

/***操作UI的对应类 */
class SelectRoomUI extends eui.Component{
	public constructor(){super();}
	public start_btn:eui.Button;//开始游戏
	public colse_btn:eui.Button;//关闭界面
	public room_group:eui.Group;
	public room_Left_group:eui.Group;
	//右侧滚动列表
	public roomList_scrol:eui.Scroller;
	public root:eui.Group;

}

class SelectRoomItem extends eui.Component{
	public constructor(){super();}
	public root:eui.Group;//根节点
	public imageBg:eui.Image;

	//当前房间人数
	public name_bitLabCur:eui.BitmapLabel;
	//当前进度条
	public image_CUR:eui.Image;
	//满进度条
	public image_RED:eui.Image;

	public nameTitle:eui.Image;
	public name_bitLab:eui.BitmapLabel;//房间号标签
	public ren:eui.Image;
}

class SelectRoomLeftItem extends eui.Component{
	public constructor(){super();}
	//public name_lab:eui.Label;//标签
	public name_bitlab:eui.BitmapLabel;//数字标签
	public image_select:eui.Image;//选中标签
	public image_bg:eui.Image;
	//状态
	public imgStage_1:eui.Image;
	public imgStage_2:eui.Image;
	public imgStage_3:eui.Image;
	public imgStage_4:eui.Image;

	public okBtn:eui.Group;
}