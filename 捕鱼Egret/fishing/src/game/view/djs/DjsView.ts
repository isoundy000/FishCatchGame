class DjsView extends burn.view.PopView {
	private _uiDisplay:DjsCom;
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
		let uiObj = new DjsCom();
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
		},this);
	}
	public initList(msg:GrandPrixRankBackMessage):void
	{
		/** 
		 * 		required RankDataMessage myData = 1;
				required RankDataMessage weekData = 2;
				repeated RankDataMessage dayData = 3;
				required uint32 weekIntegral = 4;

			message RankDataMessage {
				required int32 rankType = 1;//排行类型1等级 2金币
				required int32 rank = 2;//排名
				required int32 userId = 3;//玩家ID
				required int32 roleLevel = 4;//玩家等级
				required int32 vipLevel = 5;//玩家VIP等级	
				required int64 rankValue = 6;//排行对应的值
				required string name = 7;//玩家昵称
				required string iconUrl = 8;//头像
			}
		 */

		//周冠军数据
		if (msg.getWeekData()) {
			let weekData = msg.getWeekData();
			this._uiDisplay.zhouNameLab.text = "周冠军:" + weekData.name;
			this._uiDisplay.zhouScoreLab.text = "周积分:" + weekData.rankValue;
			this._uiDisplay.weekInfoTip.text = game.util.Language.getText(2424);
			this._uiDisplay.weekInfoTip.visible = false;
		} else {
			this._uiDisplay.weekInfoTip.text = game.util.Language.getText(2424);			
			this._uiDisplay.weekInfoTip.visible = true;
			this._uiDisplay.zhouNameLab.text = "";
			this._uiDisplay.zhouScoreLab.text = "";
		}

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
			if (gainTable[i].roomType == RequesetRoomState.DjsRoom) {
				_arr.push(gainTable[i]);
			}
		}
		for (let i = 0; i < _arr.length; i++) {
			if (i >= strDate.length) {
				continue;
			}
			let dataItem = null;
			if (i < len) {
				dataItem = dayData[i];
			}
			let item = new DjsUIItem();
			item.setData(dataItem,strDate[i],_arr[i],i);
			this._uiDisplay.listGroup.addChild(item);
		}
		let tLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
		tLayout.gap = 23;
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
		}

		if (djsObj.grandPrixSignUp == 1) {
			this._uiDisplay.signUpGroup.visible = false;
		}
		//自己数据
		let myData = msg.getMyData();
		this._uiDisplay.weekScoreLab.text = msg.getWeekIntegral();
		this._uiDisplay.dayScoreLab.text = myData.rankValue + "";
		this._uiDisplay.rankLab.text = myData.rank + "";
		if(myData.rankValue.low <= 0){
			this._uiDisplay.rankLab.text = game.util.Language.getText(2425);
		}
		let date = new Date(new Date().getTime());
		this._uiDisplay.rankTimeLab.text = (date.getMonth() + 1) + "月" + date.getDate() + "日排行";
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
		let settingView:DjsRuleView = new DjsRuleView(Rule_State.DjsRoom);
		let settingMed:DjsRuleMediator = new DjsRuleMediator(settingView);
		burn.Director.pushView(settingMed);
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Djs/DjsUI.exml",this.addBgResource,this);
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
		
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Djs/DjsUI.exml");
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Djs/DjsItem.exml");
	}
}

/***操作UI的对应类 */
class DjsCom extends eui.Component{
	public constructor(){super();}
	public closeBtn:eui.Button;//关闭
	public listGroup:eui.Group;

	public helpBtn:eui.Button;
	//报名按钮
	public signUpGroup:eui.Group;

	//自己的属性
	public weekScoreLab:eui.Label;
	public dayScoreLab:eui.Label;
	public rankLab:eui.Label;
	public labGroup:eui.Group;//自己属性的group
	//周冠军属性
	public zhouNameLab:eui.Label;
	public zhouScoreLab:eui.Label;
	public weekInfoTip:eui.Label;

	//
	public free:eui.Group;
	public goldGroup:eui.Group;
	public rankTimeLab:eui.Label;
}