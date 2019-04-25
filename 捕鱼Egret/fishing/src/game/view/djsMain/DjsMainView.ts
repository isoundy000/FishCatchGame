class DjsMainView extends burn.view.PopView {
	private _uiDisplay:DjsMainCom;
	/**scroview */
	private _roomListGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _bPop:boolean = false;
	public constructor() {
		super();
		this._btnWrapList = new Array();
	}
	private addBgResource(clazz:any,url:string):void
	{
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new DjsMainCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		if (!this._bPop) {
			game.util.UIUtil.popViewCircle(this._uiDisplay.root);
			this._bPop = true;
		}
		//关闭当前界面
		let closeBtn = this._uiDisplay.btnClose;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnDjs));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnAll));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnFast));

		//添加描述
		let contentTxt = new egret.TextField();
		contentTxt.textAlign = egret.HorizontalAlign.LEFT;
		contentTxt.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(135).value);
		contentTxt.touchEnabled = false;
		contentTxt.lineSpacing = 16;
		contentTxt.width = this._uiDisplay.descDjs.width;
		contentTxt.height = this._uiDisplay.descDjs.height;
		this._uiDisplay.descDjs.addChild(contentTxt);


		let contentTxt1 = new egret.TextField();
		contentTxt1.textAlign = egret.HorizontalAlign.LEFT;
		contentTxt1.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(136).value);
		contentTxt1.touchEnabled = false;
		contentTxt1.lineSpacing = 16;
		contentTxt1.width = this._uiDisplay.descFast.width;
		contentTxt1.height = this._uiDisplay.descFast.height;
		this._uiDisplay.descFast.addChild(contentTxt1);

		let contentTxt2 = new egret.TextField();
		contentTxt2.textAlign = egret.HorizontalAlign.LEFT;
		contentTxt2.textFlow = (new egret.HtmlTextParser).parser(game.table.T_Language_Table.getVoByKey(137).value);
		contentTxt2.touchEnabled = false;
		contentTxt2.lineSpacing = 16;
		contentTxt2.width = this._uiDisplay.descAll.width;
		contentTxt2.height = this._uiDisplay.descAll.height;
		this._uiDisplay.descAll.addChild(contentTxt2);


		this._uiDisplay.btnDjs.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intoDjs, this);
		this._uiDisplay.btnFast.addEventListener(egret.TouchEvent.TOUCH_TAP, this.noOpen, this);
		this._uiDisplay.btnAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intoKss, this);
	}
	public intoDjs():void
	{
		let gunStr = game.table.T_Config_Table.getVoByKey(60).value;
		let goldStr = game.table.T_Config_Table.getVoByKey(61).value;
		let minGunID = Number(gunStr.split("_")[0]);
		let minGold = Number(goldStr.split("_")[0]);
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		if (userModel.getCoins() <= 0) {
			game.util.GameUtil.popTips(game.util.Language.getText(179));
			return;
		}
		if (userModel.getCurGunID() < minGunID) {
			//提示炮倍不足 138
			game.util.GameUtil.popTips(game.util.Language.getText(138));
			return;
		}
		
		let flagCoins = game.util.GameUtil.isEnough(CurrencyEnum.COINS, minGold);
		if (!flagCoins) {
			//提示钱不够 139
			game.util.GameUtil.popTips(game.util.Language.getText(139));
			return;
		}

		//判断时间
		let date = new Date(new Date().getTime());
		let h = date.getHours();
		if(h >= 7 && h < 23) {

		} else {
			//提示时间不正确
			game.util.GameUtil.popTips(game.util.Language.getText(142));
			return;
		}
		this.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {type:RequesetRoomState.DjsRoom, id:0});
		burn.Director.popView();
	}
	public intoKss():void {
		game.util.GameUtil.popTips(game.util.Language.getText(47));
		return;
		let gunStr = game.table.T_Config_Table.getVoByKey(60).value;
		let goldStr = game.table.T_Config_Table.getVoByKey(61).value;
		let minGunID = Number(gunStr.split("_")[1]);
		let minGold = Number(goldStr.split("_")[1]);
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		if (userModel.getCurGunID() < minGunID) {
			//提示炮倍不足 138
			game.util.GameUtil.popTips(game.util.Language.getText(152));
			return;
		}
		
		let flagCoins = game.util.GameUtil.isEnough(CurrencyEnum.COINS, minGold);
		if (!flagCoins) {
			//提示钱不够 139
			game.util.GameUtil.popTips(game.util.Language.getText(153));
			return;
		}

		//判断时间
		let date = new Date(new Date().getTime());
		let h = date.getHours();
		if (h >= 7 && h < 23) {

		} else {
			//提示时间不正确
			game.util.GameUtil.popTips(game.util.Language.getText(151));
			return;
		}
		this.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {type:RequesetRoomState.QmsRoom, id:0});
		burn.Director.popView();
	}
	public noOpen():void {
		game.util.GameUtil.popTips(game.util.Language.getText(47));
		return;
		let gunStr = game.table.T_Config_Table.getVoByKey(60).value;
		let goldStr = game.table.T_Config_Table.getVoByKey(61).value;
		let minGunID = Number(gunStr.split("_")[2]);
		let minGold = Number(goldStr.split("_")[2]);
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		if (userModel.getCurGunID() < minGunID) {
			//提示炮倍不足 138
			game.util.GameUtil.popTips(game.util.Language.getText(152));
			return;
		}
		//判断时间
		let date = new Date(new Date().getTime());
		let h = date.getHours();
		if (h >= 7 && h < 23) {

		} else {
			//提示时间不正确
			game.util.GameUtil.popTips(game.util.Language.getText(150));
			return;
		}
		burn.Director.popView();
		let roomView:KssView = new KssView();
		let roomMed:KssMediator = new KssMediator(roomView);
		burn.Director.pushView(roomMed);
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/DjsMain/DjsMainUI.exml",this.addBgResource,this);
	}
	public destroy():void {
		//移除按钮封装
		let self = this;
		this._bPop = false;
		//关闭UI动画
		game.util.UIUtil.closeViewCircle(this._uiDisplay.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self._uiDisplay.btnDjs.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.intoDjs, self);
			self._uiDisplay.btnFast.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.noOpen, self);
			self._uiDisplay.btnAll.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.intoKss, self);
			self.parent.removeChild(self);

			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/DjsMain/DjsMainUI.exml");
		});
	}
}

/***操作UI的对应类 */
class DjsMainCom extends eui.Component{
	public constructor(){super();}
	public btnClose:eui.Button;//关闭	
	public root:eui.Group;

	public djs:eui.Group;
	public fast:eui.Group;
	public all:eui.Group;

	public descDjs:eui.Group;
	public descFast:eui.Group;
	public descAll:eui.Group;

	public btnDjs:eui.Group;
	public btnFast:eui.Group;
	public btnAll:eui.Group;
}