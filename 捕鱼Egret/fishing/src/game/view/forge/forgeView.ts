// TypeScript file
class ForgeView extends burn.view.PopView {
	private _uiDisplay:ForgeUI;
	/**scroview */
	private _roomListGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	//水晶图片集合
	private _arrImage:Array<eui.Group>;
	//水晶标签集合
	private _arrLab:Array<eui.Label>;
	//是否使用水晶精华
	private _isUseEns:boolean;
	//是否满足升级需求
	private _bEnough:boolean;
	//是否正在播放特效
	private _bIsRunning: boolean;
	//当前炮倍
	private _curRate: string;
	public constructor() {
		super();
		this._btnWrapList = new Array();
		game.util.UIUtil.startLoading();
	}
	private addBgResource(clazz:any,url:string):void {
		game.util.UIUtil.closeLoading();
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new ForgeUI();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//打开UI动画
		game.util.UIUtil.popView(this._uiDisplay.root);
		this._bIsRunning = false;
		//关闭当前界面
		let closeBtn = this._uiDisplay.btnClose;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
		this._uiDisplay.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
		this._uiDisplay.useEns.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeUse, this);
		
		//水晶图片集合
		this._arrImage = new Array<eui.Group>();
		this._arrImage.push(this._uiDisplay.ensIcon0);
		this._arrImage.push(this._uiDisplay.ensIcon1);
		this._arrImage.push(this._uiDisplay.ensIcon2);
		this._arrImage.push(this._uiDisplay.ensIcon3);
		//水晶标签集合
		this._arrLab = new Array<eui.Label>();
		this._arrLab.push(this._uiDisplay.costEnsLab1);
		this._arrLab.push(this._uiDisplay.costEnsLab2);
		this._arrLab.push(this._uiDisplay.costEnsLab3);
		this._arrLab.push(this._uiDisplay.costEnsLab4);

		this._isUseEns = false;
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.loadGroup("forge");
	}
	private loadErrorCount = 0;
	private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "forge") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);	
			this.send(NotifyEnum.CHECK_FORGEUI_LOADED);
        }
    }
	private onResourceLoadError(event:RES.ResourceEvent):void {
		this.loadErrorCount += 1;
		console.warn("Group:" + event.groupName + " has failed to load");
		//加载失败后尝试5次重新加载
		if (this.loadErrorCount < 5) {
			RES.loadGroup(event.groupName);
		}
    }
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Forge.exml",this.addBgResource,this);
	}
	//设置界面属性
	public setUIData(gunId:number,bUseEns:boolean = false,bEnough:boolean = false):void {
		//gunId = 54;
		let self = this;
		this._bEnough = bEnough;
		let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        let gunVo = game.table.T_Gun_Table.getVoByKey(gunId);
        let gunNextVo = game.table.T_Gun_Table.getVoByKey(gunId + 1);
		//炮倍
		let rate = gunVo.bulletNum;
		this._curRate = rate + "";
		this._uiDisplay.paobeiNum.text = rate + "";
		if (gunNextVo) {
			let rateNext = gunNextVo.bulletNum;
			let arrName = new Array<string>();
			arrName.push(rateNext + "");
			this._uiDisplay.titleShow.text = game.util.Language.getDynamicText(30,arrName); //30 
		} else {
			this._uiDisplay.titleShow.text = game.table.T_Language_Table.getVoByKey(25).value;//25
		}
		//显示炮
		game.util.IconUtil.getIconByIdAsync(IconType.PAO, userModle.getCurSkinId(), function(icon:egret.Bitmap):void {
			if (icon) {
                self._uiDisplay.gunImgGroup.removeChildren();
				icon.anchorOffsetX = icon.width/2;
				icon.anchorOffsetY = icon.height/2;
				self._uiDisplay.gunImgGroup.addChild(icon);
			}
		});
		//消耗
		let arr = gunVo.upgradeOrForgeCost;
		let arrEnsence = gunVo.forgeSuccessAlsoCost;
		let arrEnsData = arrEnsence.split("_");
		let arrData = arr.split(",");
		if (arrData.length <= 1) {
			//70001_10,70002_10,70003_10,70004_10
			//70005_1800
			arrData = "70001_10,70002_10,70003_10,70004_10".split(",");
			arrEnsData = "70005_1800".split("_");
			//return;
		}
		let nEnoughNum = 0;
		let nCurNum = 0;
		//四个水晶的图标
		for (let i = 0; i < arrData.length; i++) {
			let item = arrData[i];
			let arrStr = item.split("_");
			let id = parseInt(arrStr[0]);
			let num = parseInt(arrStr[1]);
			let curNum = 0;
			let itemObj:game.model.Item = new game.model.Item(id,0);
			if (userModle.isExist(itemObj)) {
				curNum = userModle.getItemById(id).getCount();
			}
			if (gunId == 54) {
				this._arrLab[i].text = curNum + "";
			} else {
				this._arrLab[i].text = curNum + "/" + num;
			}
			(function (Image) {     
				game.util.IconUtil.getIconByIdAsync(IconType.PROP, id, function(icon:egret.Bitmap):void {
					icon.anchorOffsetX = icon.width/2;
					icon.anchorOffsetY = icon.height/2;
					icon.x = Image.width/2;
					icon.y = Image.height/2;
					Image.addChild(icon);
				});	
			})(self._arrImage[i]);
		}
		//如果是精华锻造,扣除精华
		let ensId = parseInt(arrEnsData[0]);
		let ensNum = parseInt(arrEnsData[1]);
		let arrName1 = new Array<string>();
		arrName1.push(ensNum + "");
		this._uiDisplay.costEnsLab.text = game.util.Language.getDynamicText(31,arrName1); //30 
		let curEnsNum = 0;
		let itemEnsObj:game.model.Item = new game.model.Item(ensId,0);
		if (userModle.isExist(itemEnsObj)) {
			curEnsNum = userModle.getItemById(ensId).getCount();
		}
		if (gunId == 54) {
			this._uiDisplay.costEnsLab0.text = curEnsNum + "";
		} else {
			this._uiDisplay.costEnsLab0.text = curEnsNum + "/" + ensNum;
		}
		game.util.IconUtil.getIconByIdAsync(IconType.PROP, ensId, function(icon:egret.Bitmap):void {
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			icon.x = self._uiDisplay.ensIcon.width/2;
			icon.y = self._uiDisplay.ensIcon.height/2;
			self._uiDisplay.ensIcon.addChild(icon);
		});	
		if (gunId == 54) {
			this._uiDisplay.useEns.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeUse, this);
			this._uiDisplay.costEnsLab.text = game.table.T_Language_Table.getVoByKey(25).value;
			return;
		}
		this._isUseEns = bUseEns;
		this.changeUseEns();
	}	
	//根据当前使用状态。设置图片
	private changeUseEns():void {
		if (this._isUseEns) {
			this._uiDisplay.useEnsImag.visible = true;
			this._uiDisplay.useEnsImag.touchEnabled = false;
		} else {
			this._uiDisplay.useEnsImag.visible = false;
			this._uiDisplay.useEnsImag.touchEnabled = false;
		}
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
	}
	/**切换是否使用水晶精华 */
	public onChangeUse(e:egret.TouchEvent) {
		this.send(NotifyEnum.SET_USEENSENCE_FLAG);
	}
	/**确认锻造 */
	public onOKButtonClick(e:egret.TouchEvent) {
		if(this._bIsRunning) {
			return;
		}
		if (!this._bEnough) {
			this._uiDisplay.useEns.touchEnabled = false;
			this._uiDisplay.okBtn.touchEnabled = false;
			game.util.GameUtil.openConfirm(this,this.callFun,this,"材料不足");
		} else {
			this._bIsRunning = true;
			//发消息
			let req = new UpgradeOrForgeSendMessage();
			req.initData();
			if (this._isUseEns) {
				req.setType(GunUpdateType.USE_ESSENCE_FORGE_TYPE);
			} else {
				req.setType(GunUpdateType.NO_ESSENCE_FORGE_TYPE);
			}
			NetManager.send(req);
			for (let i = 0; i < this._arrImage.length; i ++) {
				(function (Image) {     
					let data = RES.getRes("ef_forge_json");
					let txtr = RES.getRes("ef_forge_png");
					let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
					let effect = new MovieFish(mcFactory.generateMovieClipData("ef_forge"),egret.Event.COMPLETE);
					effect.initEvent();	
					let dataMc:egret.MovieClipData = effect.movieClipData;
					let frameCur = 0;
					let modifyRect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
					effect.gotoAndPlay("play",1);
					Image.addChild(effect);
					effect.anchorOffsetX = effect.width/2 + modifyRect.x;
					effect.anchorOffsetY = effect.height/2 + modifyRect.y;
					effect.x = 50;
					effect.y = 50;
					effect.frameRate = 9;
				})(this._arrImage[i]);
			}
		}
	}
	public setEffect(state:number):void {
		if (state != 1) {
			let txtr = RES.getRes("ef_forge_lost_png");
			let effect = new egret.Bitmap(txtr);
			this._uiDisplay.gunGroup.addChild(effect);
			effect.anchorOffsetX = effect.width/2;
			effect.anchorOffsetY = effect.height/2;
			effect.x = 80;
			effect.y = 90;
			let tw = egret.Tween.get(effect);
			effect.alpha = 0;
			let self = this;
			tw.to({alpha: 0.5},300).
			   to({alpha: 0.8},300).
			   to({alpha: 0},300).
			   to({alpha: 0.5},300).
			   to({alpha: 0.25},300).
			   to({alpha: 0},300).
			   call(function(){
					egret.Tween.removeTweens(effect);
					self._uiDisplay.gunGroup.removeChild(effect);
					self._bIsRunning = false;
					if (state == UpdateOrForgeType.TYPE_MAX) {
						game.util.GameUtil.popTips(game.util.Language.getText(29));
					} else if (state == UpdateOrForgeType.TYPE_NOENOUGH) {
						game.util.GameUtil.popTips(game.util.Language.getText(29));
					} else if (state == UpdateOrForgeType.TYPE_NULL) {
						game.util.GameUtil.popTips(game.util.Language.getText(29));
					} else if (state == UpdateOrForgeType.TYPE_FAIL) {
						game.util.GameUtil.popTips(game.util.Language.getText(29));
					}
			   });
		} else if(state == 1) {
			//锻造成功的分享
			if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
				let yaoQingView = new ShareZiYou(ShareType.Forge_Succ, this._curRate);
				this.addChild(yaoQingView);
				return;
			}
			let data = RES.getRes("ef_forge_win_json");
			let txtr = RES.getRes("ef_forge_win_png");
			let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
			let effect1 = new MovieFish(mcFactory.generateMovieClipData("ef_forge_win"),egret.Event.COMPLETE, ()=>{
            	game.util.GameUtil.popTips("锻造成功");
				this._bIsRunning = false;
			});
			effect1.initEvent();	
			let dataMc:egret.MovieClipData = effect1.movieClipData;

			let frameCur = 0;
			let modifyRect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
			effect1.gotoAndPlay("play",1);
			this._uiDisplay.gunGroup.addChild(effect1);
			effect1.frameRate = 9;
			effect1.anchorOffsetX = effect1.width/2 + modifyRect.x;
			effect1.anchorOffsetY = effect1.height/2 + modifyRect.y;
			effect1.x = 67;
			effect1.y = 90;
		}
	}
	public callFun(target:any):void
	{
		target._uiDisplay.useEns.touchEnabled = true;
		target._uiDisplay.okBtn.touchEnabled = true;
	}
	public destroy():void {
		let self = this;
		game.util.UIUtil.closeView(this._uiDisplay.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self._uiDisplay.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onOKButtonClick, self);
			self.parent && self.parent.removeChild(self);

			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Forge.exml");
		});
		
		
	}
}

/***操作UI的对应类 */
class ForgeUI extends eui.Component{
	public constructor(){super();}
	public btnClose:eui.Button;//关闭
	public okBtn:eui.Group;//锻造按钮
	public useEns:eui.Button;//使用水晶精华按钮
	public useEnsImag:eui.Image;//选择水晶的图片
	public costEnsLab:eui.Label;//显示消耗水晶精华的标签
	public ensIcon:eui.Group;//水晶精华图片
	public costEnsLab0:eui.Label;//水晶精华消耗标签
	//水晶图片
	public ensIcon0:eui.Group;
	public ensIcon1:eui.Group;
	public ensIcon2:eui.Group;
	public ensIcon3:eui.Group;

	//水晶数量
	public costEnsLab1:eui.Label;
	public costEnsLab2:eui.Label;
	public costEnsLab3:eui.Label;
	public costEnsLab4:eui.Label;

	//当前炮倍label
	public paobeiNum:eui.Label;
	//锻造至多少倍炮
	public titleShow:eui.Label;

	public root:eui.Group;
	public gunGroup:eui.Group;

	//炮的显示
	public gunImgGroup:eui.Group;
}
