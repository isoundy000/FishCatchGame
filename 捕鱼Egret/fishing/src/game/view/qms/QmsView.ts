class QmsView extends burn.view.PopView {
	private _uiDisplay:QmsCom;
	/**scroview */
	private _roomListGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	public constructor() {
		super();
		this._btnWrapList = new Array();
	}
	private addBgResource(clazz:any,url:string):void {
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new QmsCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//关闭当前界面
		this._uiDisplay.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._uiDisplay.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
		this._uiDisplay.signUpGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.signUp, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.helpBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.signUpGroup));
		
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Djs/DjsItem.exml", ()=>{
			this.send(NotifyEnum.DJS_ITEM_LOADED);
		}, this);
	}
	public initList(msg:GrandPrixRankBackMessage):void {
		//自己数据
		let myData = msg.getMyData();
		this._uiDisplay.dayScoreLab.text = myData.rankValue + "";
		this._uiDisplay.rankLab.text = myData.rank + "";

		//排行数据
		let dayData = msg.getDayData();
		this._uiDisplay.listGroup.removeChildren();
		//1,2,3,4-10,11-20,21-50,51-100,101-200    68
		let str = game.table.T_Config_Table.getVoByKey(68).value;
		let len = dayData.length;
		let strDate = str.split(",");
		let gainTable = game.table.T_GrandPrixRankRange_Table.getAllVo();
		let _arr = new Array<game.table.T_GrandPrixRankRange>();
		for (let i = 0; i < gainTable.length; i++) {
			if (gainTable[i].roomType == RequesetRoomState.QmsRoom) {
				_arr.push(gainTable[i]);
			}
		}
		for (let i = 0; i < _arr.length; i++) {
			if (i >= strDate.length) {
				continue;
			}
			let dataItem = dayData[i];
			let item = new DjsUIItem();
			item.setData(dataItem,strDate[i],_arr[i], i);
			this._uiDisplay.listGroup.addChild(item);
		}
		let tLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
		tLayout.gap = 50;
		this._uiDisplay.listGroup.layout = tLayout;    /// 网格布局

		//看看第几次。要不要显示免费还是啥玩意
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
		let roomer = roomModel.getRoomerById(userModel.getUserId());
		let djsObj = roomer.getDjsObj();
		if (!djsObj) {
			return;
		}
		if (djsObj.todayGrandPrixTimes > 0) {
			this._uiDisplay.free.visible = false;
			this._uiDisplay.goldGroup.visible = true;
		} else {
			this._uiDisplay.free.visible = true;
			this._uiDisplay.goldGroup.visible = false;
			//修改,当天未完成一场全民赛时，1处显示为“今日排名：暂未入榜”；2处显示为“？？？”、“积分：0”。
			this._uiDisplay.dayScoreLab.text = "0";
			this._uiDisplay.rankLab.text = game.util.Language.getText(2425);
		}
		if (djsObj.grandPrixSignUp == 1) {
			this._uiDisplay.signUpGroup.visible = false;
		}
	}
	/** 报名 */
	private signUp(e:egret.TouchEvent) {
		burn.Director.popView();
		this.send(NotifyEnum.SIGN_UP_DJS);
        this.send(NotifyEnum.CLOSE_SIGN_VIEW);
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
        this.send(NotifyEnum.CLOSE_SIGN_VIEW);
		burn.Director.popView();
	}
	/** 打开规则 */
	private openHelp(e:egret.TouchEvent) {
		let settingView:DjsRuleView = new DjsRuleView(Rule_State.QmsRoom);
		let settingMed:DjsRuleMediator = new DjsRuleMediator(settingView);
		burn.Director.pushView(settingMed);
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Qms/QmsUI.exml",this.addBgResource,this);
	}

	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		this._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._uiDisplay.helpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
		this._uiDisplay.signUpGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.signUp, this);

		this.parent && this.parent.removeChild(this);

		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Qms/QmsUI.exml");
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Djs/DjsItem.exml");
	}
}

/***操作UI的对应类 */
class QmsCom extends eui.Component{
	public constructor(){super();}
	public closeBtn:eui.Button;//关闭
	public listGroup:eui.Group;
	public helpBtn:eui.Button;
	//报名按钮
	public signUpGroup:eui.Group;
	//自己的属性
	public dayScoreLab:eui.Label;
	public rankLab:eui.Label;
	public free:eui.Group;
	public goldGroup:eui.Group;
}