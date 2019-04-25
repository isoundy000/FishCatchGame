class RankView extends burn.view.PopView {
	private _uiDisplay:RankCom;
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
		let uiObj = new RankCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//关闭当前界面
		this._uiDisplay.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		this._uiDisplay.lvLab.text = "" + userModel.getLevel();
		this._uiDisplay.expLab.text = "" + userModel.getExp();
		
		this._uiDisplay.lvBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeLv, this);
		this._uiDisplay.goldBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeGold, this);
		this._uiDisplay.saiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeSai, this);
		this._uiDisplay.zhouBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeZhou, this);
		this._uiDisplay.tuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeTu, this);
		this.onChangeLv(null);
    }
	private onChangeLv(e:egret.TouchEvent) {
		this._uiDisplay.lvSel.visible = true;
		this._uiDisplay.goldSel.visible = false;
		this._uiDisplay.saiSel.visible = false;
		this._uiDisplay.zhouSel.visible = false;
		this._uiDisplay.tuSel.visible = false;
		this.send(NotifyEnum.SET_RANK_LIST,{type:1});
	}
	private onChangeGold(e:egret.TouchEvent) {
		this._uiDisplay.lvSel.visible = false;
		this._uiDisplay.goldSel.visible = true;
		this._uiDisplay.saiSel.visible = false;
		this._uiDisplay.zhouSel.visible = false;
		this._uiDisplay.tuSel.visible = false;
		this.send(NotifyEnum.SET_RANK_LIST,{type:2});
	}
	private onChangeSai(e:egret.TouchEvent) {
		this._uiDisplay.lvSel.visible = false;
		this._uiDisplay.goldSel.visible = false;
		this._uiDisplay.saiSel.visible = true;
		this._uiDisplay.zhouSel.visible = false;
		this._uiDisplay.tuSel.visible = false;
		this.send(NotifyEnum.SET_RANK_LIST,{type:3});
	}
	private onChangeZhou(e:egret.TouchEvent) {
		this._uiDisplay.lvSel.visible = false;
		this._uiDisplay.goldSel.visible = false;
		this._uiDisplay.saiSel.visible = false;
		this._uiDisplay.zhouSel.visible = true;
		this._uiDisplay.tuSel.visible = false;
		this.send(NotifyEnum.SET_RANK_LIST,{type:4});
	}
	private onChangeTu(e:egret.TouchEvent) {
		this._uiDisplay.lvSel.visible = false;
		this._uiDisplay.goldSel.visible = false;
		this._uiDisplay.saiSel.visible = false;
		this._uiDisplay.zhouSel.visible = false;
		this._uiDisplay.tuSel.visible = true;
		//this.changeList(5);
		this.send(NotifyEnum.SET_RANK_LIST,{type:99});
	}
	public changeList(arr:Array<game.model.RankDataItem>):void {
		this._uiDisplay.scrolGroup.removeChildren();
		if (arr.length == 0) {
			this._uiDisplay.nullLab.visible = true;
			return;
		}
		this._uiDisplay.nullLab.visible = false;
		let self = this;
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/rank/RankItem.exml",function(){
			for (let i = 0; i < arr.length; i++) {
				let item = new RankItem();
				item.setData(arr[i]);
				self._uiDisplay.scrolGroup.addChild(item);
			}
			let tLayout:eui.TileLayout = new eui.TileLayout();
			tLayout.paddingTop = 10;
			tLayout.paddingBottom = 20;
			self._uiDisplay.scrolGroup.layout = tLayout;    /// 网格布局
		},this);
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) 
	{
		burn.Director.popView();
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/rank/RankUI.exml",this.addBgResource,this);
	}

	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}

		this._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._uiDisplay.lvBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeLv, this);
		this._uiDisplay.goldBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeGold, this);
		this._uiDisplay.saiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeSai, this);
		this._uiDisplay.zhouBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeZhou, this);
		this._uiDisplay.tuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeTu, this);

		this.parent && this.parent.removeChild(this);
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/rank/RankUI.exml");
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/rank/RankItem.exml");
	}
}

/***操作UI的对应类 */
class RankCom extends eui.Component{
	public constructor(){super();}
	public closeBtn:eui.Button;//关闭

	public scrolGroup:eui.Group;//_roomListGroup

	public lvSel:eui.Group;
	public lvBtn:eui.Button;

	public goldSel:eui.Group;
	public goldBtn:eui.Button;

	public saiSel:eui.Group;
	public saiBtn:eui.Button;

	public zhouSel:eui.Group;
	public zhouBtn:eui.Button;

	public tuSel:eui.Group;
	public tuBtn:eui.Button;

	public nullLab:eui.Label;

	public lvLab:eui.BitmapLabel;
	public expLab:eui.BitmapLabel;
}