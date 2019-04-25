class DjsResultView extends burn.view.PopView {
	private _uiDisplay:DjsResultCom;
	/**scroview */
	private _roomListGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _msg:GrandPrixSettlementMessage;
	private _roomType:number;
	private _score:string;
	public constructor(msg:GrandPrixSettlementMessage,roomType:number) {
		super();
		this._btnWrapList = new Array();
		this._msg = msg;
		this._roomType = roomType;
	}
	private addBgResource(clazz:any,url:string):void {
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new DjsResultCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//关闭当前界面
		let closeBtn = this._uiDisplay.btnClose;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._uiDisplay.okGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSignUp, this);
		if(CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG){
			// this._uiDisplay.shareGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
			this.onShare();
		}else{
			// this._uiDisplay.shareGroup.visible = false;
		}
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
		// this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.shareGroup));

		let userModel:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
		let roomer = roomModel.getRoomerById(userModel.getUserId());
        roomer.getDjsObj().grandPrixSignUp = 0;
		roomer.getDjsObj().todayGrandPrixTimes ++;
		this.setUI(this._msg);
		//结算前分数
		var score:number = this._msg.getBeforeIntegral();
		this._uiDisplay.djsResTip.visible = false;
		this._uiDisplay.djsDesTip.visible = false;
		this._uiDisplay.qmsResTip.visible = false;
		this._uiDisplay.qmsDesTip.visible = false;
		if (this._roomType == RequesetRoomState.DjsRoom) {
			this._uiDisplay.djsTitle.visible = true;
			this._uiDisplay.kssTitle.visible = false;
			this._uiDisplay.costLab.text = "100";
			if(score > 2400){
				this._uiDisplay.djsResTip.visible = true;
				userModel.setMoney( Number(Number(userModel.getMoney()) + 100)) ;
				this._uiDisplay.djsDesTip.visible = false;
				this._uiDisplay.qmsResTip.visible = false;
				this._uiDisplay.qmsDesTip.visible = false;
			}else{

				this._uiDisplay.djsResTip.visible = false;
				this._uiDisplay.djsDesTip.visible = true;
				this._uiDisplay.qmsResTip.visible = false;
				this._uiDisplay.qmsDesTip.visible = false;
			}
		} else if (this._roomType == RequesetRoomState.QmsRoom) {
			this._uiDisplay.djsTitle.visible = false;
			this._uiDisplay.kssTitle.visible = true;
			this._uiDisplay.gunTitleImg.visible = false;
			this._uiDisplay.VIPTitleImg.visible = false;
			this._uiDisplay.gunImg.visible = false;
			this._uiDisplay.vipImg.visible = false;
			this._uiDisplay.gunLab.visible = false;
			this._uiDisplay.vipLab.visible = false;
			this._uiDisplay.costLab.text = "20";
			if(score > 1600){
				this._uiDisplay.djsResTip.visible = false;
				this._uiDisplay.djsDesTip.visible = false;
				this._uiDisplay.qmsResTip.visible = true;
				this._uiDisplay.qmsDesTip.visible = false;
			}else{
				this._uiDisplay.djsResTip.visible = false;
				this._uiDisplay.djsDesTip.visible = false;
				this._uiDisplay.qmsResTip.visible = false;
				this._uiDisplay.qmsDesTip.visible = true;
			}
		}
		
		//roomer.getDjsObj()
        let arrName = new Array<string>();
		arrName.push((roomer.getDjsObj().todayGrandPrixTimes) + "");
		let str = game.util.Language.getDynamicTextByStr(this._uiDisplay.okLab.text,arrName);
		this._uiDisplay.okLab.text = str;
	}
	public setUI(msg:GrandPrixSettlementMessage):void {
        /** 	
         *  required uint32 beforeIntegral = 1;//结算前
            required uint32 gunPlus = 2;	//炮倍加成
            required uint32 vipPlus = 3;	//vip加成
            required uint32 timesPlus = 4;	//参加次数加成
            required uint32 afterIntegral = 5;//结算后
            optional ItemInfo item = 6;
		 */
		this._uiDisplay.fishScoreLab.text = msg.getBeforeIntegral();
		this._uiDisplay.myScoreBitLab.text = msg.getAfterIntegral();
		this._score = msg.getAfterIntegral() + "";
		this._uiDisplay.gunLab.text = msg.getGunPlus() + "%";
		this._uiDisplay.vipLab.text = msg.getVipPlus() + "%";
		this._uiDisplay.challengLab.text = msg.getTimesPlus() + "%";
		//排名
		if (msg.getCurRank()) {
			let rank = Number(msg.getCurRank());
			if (rank == 0) {
				this._uiDisplay.rankBitLab.text = "未上榜";
			} else {
				this._uiDisplay.rankBitLab.text = rank + "";
			}
		}
		let rankNum = Number(msg.getCurRank());
		if (rankNum <= 0) {
			return;
		}
		let gainTable = game.table.T_GrandPrixRankRange_Table.getAllVo();
		let award = "";
		for (let i = 0; i < gainTable.length; i++) {
			if (gainTable[i].rangeMin == rankNum) {
				award = gainTable[i].award;
				break;
			}
		}
		if (award == "") {
			this._uiDisplay.gainLab.text = "";
			return;
		}
		let str = award.split("_");  
		let id = Number(str[0]);
		let num = Number(str[1]);
		let vo = game.table.T_Item_Table.getVoByKey(Number(id));
		this._uiDisplay.gainLab.text = game.util.Language.getText(vo.name) + num + "个";
		let self = this;
		game.util.IconUtil.getIconByIdAsync(IconType.PROP,Number(id), function(icon:egret.Bitmap):void {
			if (!icon) {
				return;
			}
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			self._uiDisplay.iconGroup.addChild(icon);
		});
		
		//奖励
		if (!msg.getItem()) {
			this._uiDisplay.gainGroup.visible = false;
			return;
		}
	}
	private onSignUp(e:egret.TouchEvent) {
		burn.Director.popView();
		this.send(NotifyEnum.SIGN_UP_DJS);
        this.send(NotifyEnum.CLOSE_SIGN_VIEW);
	}
	private onShare() {//e:egret.TouchEvent
		//分享大奖赛奖励
		let yaoQingView = new ShareZiYou(ShareType.Share_Djs, this._score);
		this.addChild(yaoQingView);
	}	
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
        this.send(NotifyEnum.CLOSE_SIGN_VIEW);
		burn.Director.popView();
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/DjsResult/DjsResultUI.exml",this.addBgResource,this);
	}

	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		this._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._uiDisplay.okGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSignUp, this);
		// this._uiDisplay.shareGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
		this.parent && this.parent.removeChild(this);
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/DjsResult/DjsResultUI.exml");
	}
}

/***操作UI的对应类 */
class DjsResultCom extends eui.Component{
	public constructor(){super();}
	public btnClose:eui.Button;//关闭

	public fishScoreLab:eui.Label;
	public myScoreBitLab:egret.BitmapText;
	//炮台加成
	public gunLab:eui.Label;
	//vip加成
	public vipLab:eui.Label;
	//调整加成
	public challengLab:eui.Label;
	//名词
	public rankBitLab:egret.BitmapText;
	//奖励名称
	public gainLab:eui.Label;
	public iconGroup:eui.Group;
	//再次报名
	public okGroup:eui.Group;

	public djsTitle:eui.Image;
	public kssTitle:eui.Image;

	public VIPTitleImg:eui.Image;
	public gunTitleImg:eui.Image;
	public gunImg:eui.Image;
	public vipImg:eui.Image;

	public costLab:egret.BitmapText;
	public okLab:eui.Label;
	
	public gainGroup:eui.Group;
	public djsResTip:eui.Image;
	public djsDesTip:eui.Image;
	public qmsResTip:eui.Image;
	public qmsDesTip:eui.Image;

	// public shareGroup:eui.Group;
}