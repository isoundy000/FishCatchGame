class ChargeView extends burn.view.PopView {
	private _uiDisplay:ChargeUI;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _nType:number;
	public _toType:number;
	public _curVipFont:egret.BitmapText;
	public _maxVipFont:egret.BitmapText;
	public constructor(type:number) {
		super();
		this._btnWrapList = new Array();
		this._nType = -1;
		this._toType = type;
	}
	private addBgResource(clz:any, url:string):void {
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new ChargeUI();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeUI.exml";
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		game.util.UIUtil.popView(this._uiDisplay.root);
		//关闭当前界面
		let closeBtn = this._uiDisplay.closeBtn;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._uiDisplay.gold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeType, this);
		this._uiDisplay.gem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeType, this);
		this._uiDisplay.ticket.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeType, this);

		this._uiDisplay.showPrivilege.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowPrivilege, this);

		RES.getResAsync("vipNum_fnt", ()=>{
			RES.getResAsync("vipNum_png", ()=>{
				this._curVipFont = new egret.BitmapText();
				this._curVipFont.font = RES.getRes("vipNum_fnt");
				this._curVipFont.text = "0";
				this._curVipFont.anchorOffsetX = 0;
				this._curVipFont.anchorOffsetY = this._curVipFont.height/2;
				this._uiDisplay.vipCurGroup.addChild(this._curVipFont);

				this._maxVipFont = new egret.BitmapText();
				this._maxVipFont.font = RES.getRes("vipNum_fnt");
				this._maxVipFont.text = "0";
				this._maxVipFont.anchorOffsetX = 0;
				this._maxVipFont.anchorOffsetY = this._maxVipFont.height/2;
				this._uiDisplay.vipNextGroup.addChild(this._maxVipFont);
				//打开默认界面
				this.showListByType(this._toType);
			}, this);
		}, this);

		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
    }
	public showListByType(type:number, clean:boolean = false):void {
		if (this._nType == type && !clean) {
			console.log("#------------重复点击?");
			return;
		}
		this._uiDisplay.selectGem.visible = false;
		this._uiDisplay.selectGold.visible = false;
		this._uiDisplay.selectTicket.visible = false;
		switch (type) {
			case ChargeType.Gold:
				this._uiDisplay.selectGold.visible = true;
				break;
			case ChargeType.Gem:
				this._uiDisplay.selectGem.visible = true;
				break;
			case ChargeType.Ticket:
				this._uiDisplay.selectTicket.visible = true;
		}
		this._nType = type;
		this.showDataList(clean);
	}
	public showDataList(clean:boolean = false):void {
		let vos = game.table.T_Charge_Table.getAllVo();
		let len = vos.length;
		let voList = new Array<game.table.T_Charge>();
		if (this._nType == 1 || this._nType == 2) {
			let voMonthCard = null;
			for (let i = 0; i < len; i++) {
				if (vos[i].type == 4) {
					voMonthCard = vos[i];
					break;
				}
			}
			voList.push(voMonthCard);
		}
		if (this._nType == 3) {
			let curPid = CONFIG.PLATFORM_ID;
			if (curPid == PlatformTypeEnum.QQ_ZONE) {
				curPid += Number(CONFIG.CHANNEL_ID);
			}
			for (let i = 0; i < len; i++) {
				if (vos[i].type == this._nType && vos[i].platform == curPid) {
					voList.push(vos[i]);
				} 
			}
		} else {
			for (let i = 0; i < len; i++) {
				if (vos[i].type == this._nType) {
					voList.push(vos[i]);
				} 
			}
		}
		
		let childNum = this._uiDisplay.listGroup.numChildren;
		for (let i = 0; i < childNum; i++) {
			let child = this._uiDisplay.listGroup.getElementAt(i) as ChargeItemUI;
			child.clearItem();
		}
		this._uiDisplay.listGroup.removeChildren();
		if (this._uiDisplay.listGroup.layout) {
			this._uiDisplay.listGroup.layout.scrollPositionChanged();
		}
		let lenN = voList.length;
		for (let i = 0; i < lenN; i++) {
			let item = new ChargeItemUI();
			item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeItem.exml";
			item.setData(voList[i]);
			this._uiDisplay.listGroup.addChild(item);
			if (!clean) {
				game.util.UIUtil.listTweenFly(item.root, i, 3);
			}
		}
		let tLayout:eui.TileLayout = new eui.TileLayout();
        tLayout.paddingLeft = 20;
        tLayout.paddingRight = 20;
		this._uiDisplay.listGroup.layout = tLayout;    /// 网格布局

		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let vipLv = userModel.getVipLevel();
		let totalRMB = userModel.getTatolChargeRMB();
		let vos1 = game.table.T_VipLevel_Table.getAllVo();
		let vlen = vos1.length;
		let maxVo = null;
		let maxLv = 0;
		maxLv = vos1[vlen - 1].vipLevel;
		maxVo = vos1[vlen - 1];
		if (maxLv <= vipLv) {
			this.initData(maxLv,maxLv,maxVo.levelUpExp,maxVo.levelUpExp);
		} else {
			let curVo = game.table.T_VipLevel_Table.getVoByKey(vipLv);
			let lastVo = game.table.T_VipLevel_Table.getVoByKey(vipLv - 1);
			if (lastVo) {
				let maxExp = curVo.levelUpExp/100;
				let arrName = new Array<string>();
				let chargeTxt = totalRMB/100;
				let percent = chargeTxt * 1.0 / (curVo.levelUpExp/100);
				this.initData(vipLv,vipLv+1,chargeTxt,curVo.levelUpExp/100);
			} else {
				let maxExp = curVo.levelUpExp/100;
				let arrName = new Array<string>();
				let chargeTxt = totalRMB/100;
				let percent = chargeTxt * 1.0 / (curVo.levelUpExp/100);
				this.initData(vipLv,vipLv+1,chargeTxt,curVo.levelUpExp/100);
			}
		}
		this._uiDisplay.scroller.viewport.scrollV = 0;
		this._uiDisplay.scroller.viewport.scrollH = 0;
		
	}
	public initData(curVip:number,nextVip:number,curExp:number,maxExp:number):void {
		this._curVipFont.text = curVip + "";
		this._maxVipFont.text = nextVip + "";
		this._uiDisplay.proTxt.text = curExp + "/" + maxExp;
		let percent = curExp * 1.0 / maxExp;
		this._uiDisplay.proCur_228.width = 228 * percent;
		//txt
		if (curVip < nextVip) {
			let curVo = game.table.T_VipLevel_Table.getVoByKey(curVip);
			let maxExp = curVo.levelUpExp/100;
			let percent = curExp * 1.0 / maxExp;
			let arrName = new Array<string>();
			let chargeTxt = maxExp - curExp;
			arrName.push(chargeTxt + "");
			arrName.push(nextVip + "");
			this._uiDisplay.txt.text = game.util.Language.getDynamicText(121,arrName);
		} else {
			this._uiDisplay.txt.text = game.util.Language.getText(176);
			this._uiDisplay.nextVipIcon.visible = false;
			this._uiDisplay.vipNextGroup.visible = false;
			this._uiDisplay.proCur_228.width = 228;
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			let vipLv = userModel.getVipLevel();
			let lastVo = game.table.T_VipLevel_Table.getVoByKey(vipLv - 1);
			this._uiDisplay.proTxt.text = lastVo.levelUpExp/100 + "/" + lastVo.levelUpExp/100;
		}
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeItem.exml", ()=>{
			EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeUI.exml", this.addBgResource, this);
		}, this);
	}

	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
	}
	private onShowPrivilege(e:egret.TouchEvent) {
		burn.Director.popView();
		let view:VipView = new VipView();
		let med:VipMediator = new VipMediator(view);
		burn.Director.pushView(med);
	}
	private onChangeType(e:egret.TouchEvent) {
		let target = e.target;
		if (target == this._uiDisplay.gold) {
			// this.send(NotifyEnum.SHOW_CHARGE_LIST, ChargeType.Gold);
			this.showListByType(ChargeType.Gold);
		} else if (target == this._uiDisplay.gem) {
			this.showListByType(ChargeType.Gem);
		} else if (target == this._uiDisplay.ticket) {
			this.showListByType(ChargeType.Ticket);
		}
	}
	public destroy():void {
		let self = this;
		//关闭UI动画
		game.util.UIUtil.closeView(this._uiDisplay.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			
			let childNum = self._uiDisplay.listGroup.numChildren;
			for (let i = 0; i < childNum; i++) {
				let child = self._uiDisplay.listGroup.getElementAt(i) as ChargeItemUI;
				child.clearItem();
			}
			self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self._uiDisplay.gold.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChangeType, self);
			self._uiDisplay.gem.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChangeType, self);
			self._uiDisplay.ticket.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChangeType, self);
			self._uiDisplay.showPrivilege.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onShowPrivilege, self);
			self.parent && self.parent.removeChild(self);

			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeUI.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeItem.exml");
		});
	}
}

/***操作UI的对应类 */
class ChargeUI extends eui.Component{
	public constructor(){super();}
	public root:eui.Group;
	public closeBtn:eui.Button;//关闭
	public scrollerGroup:eui.Group;

	public gold:eui.Group;
	public selectGold:eui.Image;

	public gem:eui.Group;
	public selectGem:eui.Image;

	public ticket:eui.Group;
	public selectTicket:eui.Image;
	//查看特权
	public showPrivilege:eui.Group;
	//进度条
	public proCur_228:eui.Image;
	//进度条的数字 0/10
	public proTxt:eui.Label;
	//左侧显示的内容
	public txt:eui.Label;
	//当前VIP等级数字框
	public vipCurGroup:eui.Group;
	//下一VIP等级数字狂
	public vipNextGroup:eui.Group;

	public nextVipIcon:eui.Group;

	/////////////////
	public listGroup:eui.Group;

	public scroller:eui.Scroller;
}