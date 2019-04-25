class KssView extends burn.view.PopView {
	private _uiDisplay:KssCom;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;

	public _unArr:Array<eui.Group>;
	public _selArr:Array<eui.Group>;
	public _selectArr:Array<eui.Image>;

	private _nIndex:number;
	private _strGun:string;
	public constructor() {
		super();
		this._btnWrapList = new Array();
		this._nIndex = -1;
	}
	private addBgResource(clazz:any,url:string):void {
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new KssCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//关闭当前界面
		let closeBtn = this._uiDisplay.btnClose;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);	
		
		this._unArr = new Array<eui.Group>();
		this._unArr.push(this._uiDisplay.unFree);
		this._unArr.push(this._uiDisplay.unChu);
		this._unArr.push(this._uiDisplay.unZhong);
		this._unArr.push(this._uiDisplay.unJingying);

		this._selArr = new Array<eui.Group>();
		this._selArr.push(this._uiDisplay.selFree);
		this._selArr.push(this._uiDisplay.selChu);
		this._selArr.push(this._uiDisplay.selZhong);
		this._selArr.push(this._uiDisplay.selJingying);

		this._selectArr = new Array<eui.Image>();
		this._selectArr.push(this._uiDisplay.img_0);
		this._selectArr.push(this._uiDisplay.img_1);
		this._selectArr.push(this._uiDisplay.img_2);
		this._selectArr.push(this._uiDisplay.img_3);

		this._uiDisplay.free.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_0, this);
		this._uiDisplay.chu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_1, this);
		this._uiDisplay.zhong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_2, this);
		this._uiDisplay.jingying.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_3, this);

		this._uiDisplay.joinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoin, this);
		this._uiDisplay.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRule, this);
		this._strGun = this._uiDisplay.gunRateLab.text;
		this.selectByIndex(0);
    }
	private onRule(e:egret.TouchEvent) {
		let settingView:DjsRuleView = new DjsRuleView(Rule_State.KssRoom);
		let settingMed:DjsRuleMediator = new DjsRuleMediator(settingView);
		burn.Director.pushView(settingMed);
	}

	private onJoin(e:egret.TouchEvent) {
		//暂时屏蔽后两个等级的比赛
		if(this._nIndex == 2 || this._nIndex ==3){
			game.util.GameUtil.openConfirm(null, null, this, game.util.Language.getText(190));
			return;
		}

		if (this._nIndex == -1) {
			return;
		}

		//判断炮倍和钱
		let id = this._nIndex + 7;
		let vo = game.table.T_QuickGame_Table.getVoByKey(id);
		if (!vo) {
			return;
		}
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		if (userModel.getCurGunID() < vo.minGunId) {
			//提示炮倍不足
			game.util.GameUtil.popTips(game.util.Language.getText(148));
			return;
		}

		let flagCoin = game.util.GameUtil.isEnough(CurrencyEnum.COINS, Number(vo.admissionFee.split("_")[1]));
		if (!flagCoin) {
			//提示钱不够
			game.util.GameUtil.popTips(game.util.Language.getText(149));
			return;
		}
		
		this.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {type:id, id:0});
		burn.Director.popView();
		// let view:KssWaitView = new KssWaitView(this._nIndex);
		// let med:KssWaitMediator = new KssWaitMediator(view);
		// burn.Director.pushView(med);
	}

	private onChange_0(e:egret.TouchEvent) {
		this.selectByIndex(0);
	}
	private onChange_1(e:egret.TouchEvent) {
		this.selectByIndex(1);
	}
	private onChange_2(e:egret.TouchEvent) {
		this.selectByIndex(2);
	}
	private onChange_3(e:egret.TouchEvent) {
		this.selectByIndex(3);
	}
	private selectByIndex(nIndex:number):void {
		let self = this;
		if (this._nIndex == nIndex) {
			return;
		}
		let id = nIndex + 7;
		let vo = game.table.T_QuickGame_Table.getVoByKey(id);
		if (!vo) {
			return;
		}

		this._nIndex = nIndex;
		for (let i = 0; i < this._unArr.length; i++) {
			if (i == nIndex) {
				this._unArr[i].visible = false;
			} else {
				this._unArr[i].visible = true;
			}
		}

		for (let i = 0; i < this._selArr.length; i++) {
			if (i == nIndex) {
				this._selArr[i].visible = true;
				this._selectArr[i].visible = true;
			} else {
				this._selArr[i].visible = false;
				this._selectArr[i].visible = false;
			}
		}

		this._uiDisplay.ticket.removeChildren();
		let nid = this._nIndex + 7;
		let nvo = game.table.T_QuickGame_Table.getVoByKey(nid);
		if (nvo)	{
			let tickeNum = Number(nvo.admissionFee.split("_")[1]);
			let ticketId = Number(nvo.admissionFee.split("_")[0]);
			game.util.IconUtil.getIconByIdAsync(IconType.PROP, ticketId, function(icon:egret.Bitmap):void {
				if (!icon) {
					return;
				}
				icon.width = 50;
				icon.height = 50;
				icon.anchorOffsetX = icon.width/2;
				icon.anchorOffsetY = icon.height/2;
				self._uiDisplay.ticket.addChild(icon);
			});
			
			let lab_ticket = new eui.Label();
			lab_ticket.textAlign = egret.HorizontalAlign.LEFT;
			lab_ticket.text = tickeNum + "";
			lab_ticket.anchorOffsetX = 0;
			lab_ticket.anchorOffsetY = lab_ticket.height/2;
			lab_ticket.x = 25;
			self._uiDisplay.ticket.addChild(lab_ticket);
		}
		

		//gunRateLab
		//gain_0 - gain_2
		this._uiDisplay.gain_0.removeChildren();
		this._uiDisplay.gain_1.removeChildren();
		this._uiDisplay.gain_2.removeChildren();
		let gunId = nvo.minGunId;
		let gainStr_0 = nvo.theFirst;
		let gainStr_1 = nvo.theSecond;
		let gainStr_2 = nvo.theThird;

		let gunVo = game.table.T_Gun_Table.getVoByKey(Number(gunId));
        let arrName = new Array<string>();
        arrName.push(gunVo.bulletNum + "");
        this._uiDisplay.gunRateLab.text = game.util.Language.getDynamicTextByStr(this._strGun,arrName);

		let gainData_0 = gainStr_0.split("_");
		let gainData_1 = gainStr_1.split("_");
		let gainData_2 = gainStr_2.split("_");
		game.util.IconUtil.getIconByIdAsync(IconType.PROP, Number(gainData_0[0]), function(icon:egret.Bitmap):void {
			if (!icon) {
				return;
			}
			icon.width = 50;
			icon.height = 50;
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			self._uiDisplay.gain_0.addChild(icon);
		});
		game.util.IconUtil.getIconByIdAsync(IconType.PROP, Number(gainData_1[0]), function(icon:egret.Bitmap):void {
			if (!icon) {
				return;
			}
			icon.width = 50;
			icon.height = 50;
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			self._uiDisplay.gain_1.addChild(icon);
		});
		game.util.IconUtil.getIconByIdAsync(IconType.PROP, Number(gainData_2[0]), function(icon:egret.Bitmap):void {
			if (!icon) {
				return;
			}
			icon.width = 50;
			icon.height = 50;
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			self._uiDisplay.gain_2.addChild(icon);
		});
		let lab_0 = new eui.Label();
		lab_0.textAlign = egret.HorizontalAlign.LEFT;
		lab_0.text = gainData_0[1] + "";
		lab_0.anchorOffsetX = 0;
		lab_0.anchorOffsetY = lab_0.height/2;
		lab_0.x = 25;
		self._uiDisplay.gain_0.addChild(lab_0);
		
		let lab_1 = new eui.Label();
		lab_1.textAlign = egret.HorizontalAlign.LEFT;
		lab_1.text = gainData_1[1] + "";
		lab_1.anchorOffsetX = 0;
		lab_1.anchorOffsetY = lab_1.height/2;
		lab_1.x = 25;
		self._uiDisplay.gain_1.addChild(lab_1);
		
		let lab_2 = new eui.Label();
		lab_2.textAlign = egret.HorizontalAlign.LEFT;
		lab_2.text = gainData_2[1] + "";
		lab_2.anchorOffsetX = 0;
		lab_2.anchorOffsetY = lab_2.height/2;
		lab_2.x = 25;
		self._uiDisplay.gain_2.addChild(lab_2);

	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssUI.exml",this.addBgResource,this);
	}

	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		
		this._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);	
		this._uiDisplay.free.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_0, this);
		this._uiDisplay.chu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_1, this);
		this._uiDisplay.zhong.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_2, this);
		this._uiDisplay.jingying.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange_3, this);

		this.parent && this.parent.removeChild(this);

		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssUI.exml");
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssWaitUI.exml");
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssResultUI.exml");
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssResultItem.exml");
	}
}

/***操作UI的对应类 */
class KssCom extends eui.Component{
	public constructor(){super();}
	public btnClose:eui.Button;//关闭

	public free:eui.Group;
	public chu:eui.Group;
	public zhong:eui.Group;
	public jingying:eui.Group;

	public unFree:eui.Group;
	public selFree:eui.Group;

	public unChu:eui.Group;
	public selChu:eui.Group;

	public unZhong:eui.Group;
	public selZhong:eui.Group;

	public unJingying:eui.Group;
	public selJingying:eui.Group;

	public img_0:eui.Image;
	public img_1:eui.Image;
	public img_2:eui.Image;
	public img_3:eui.Image;
	
	public gunRateLab:eui.Label;//解锁炮倍:{0}倍
	public gain_0:eui.Group;
	public gain_1:eui.Group;
	public gain_2:eui.Group;

	public joinBtn:eui.Group;//报名
	public ruleBtn:eui.Group;//规则

	public ticket:eui.Group;
}