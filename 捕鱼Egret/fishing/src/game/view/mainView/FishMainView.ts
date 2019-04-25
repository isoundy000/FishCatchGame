class FishMainView extends burn.view.FullView {
	private _uiDisplay: MainViewUI;
	private _btnStartGame: eui.Button;
	//loading界面
	private _loadingUI: LoadingUI;

	//scroll view
	private _scrollView: burn.display.PageView;
	//按钮封装对象集合
	private _btnWrapList: Array<burn.tools.UIWrap>;

	private _bgMusicName: string;
	//添加倒计时的东西
	private _bankruptView: BankruptView;
	private MAIN_ITEM_COUNT: number = 6;

	//在线人数
	private _arrMainItem: Array<main.MainItem>;
	//索引
	private _nExchangeActIndex: number;
	public constructor() {
		super();
		this._nExchangeActIndex = 0;
	}

	public initView(): void {
		let userModel: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
		if (!userModel.isTodayFirstLogin()) {
			//开始转loading
			game.util.UIUtil.startLoading();
		}
		let model: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/MainView.exml", this.addBgResource, this);
		this._btnWrapList = new Array();
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
	}
	private loadErrorCount: number = 0;
	private onResourceLoadError(event: RES.ResourceEvent): void {
		if (event.groupName == "currBgMusic") {
			console.warn("Group:" + event.groupName + " has failed to load");
			this.loadErrorCount += 1;
			if (this.loadErrorCount < 3) {
				RES.loadGroup(event.groupName);
			}
		}
	}
	private onResourceLoadComplete(event: RES.ResourceEvent): void {
		if (event.groupName == "ui_sound") {
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
			game.util.SoundManager.uiSoundLoadEnd = true;
			if (CONFIG.isOpenMusic) {
				this._bgMusicName = "bgm_lobby_mp3";
				RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
				RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
				RES.createGroup("currBgMusic", [this._bgMusicName]);
				RES.loadGroup("currBgMusic");
			}
		}
		if (event.groupName == "currBgMusic") {
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
			game.util.SoundManager.playBackgroundMusic(this._bgMusicName);
			// RES.loadGroup("fishing");
		}
	}
	private addBgResource(clazz: any, url: string): void {

		let uiLayer: eui.UILayer = new eui.UILayer();
		this.addChild(uiLayer);
		//添加操作UI
		this._uiDisplay = new MainViewUI();
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
		this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		this.send(NotifyEnum.MAIN_UI_INIT);
		let vos = new Array<main.MainItem>();
		this._arrMainItem = new Array<main.MainItem>();
		let itemLoadCount = 0;
		let itemCallback = function (): void {
			itemLoadCount++;
			if (itemLoadCount > 3) {
				game.util.UIUtil.closeLoading();
				let userModel: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
				if (userModel.getGuideID() >= 1) {
					game.util.LoaderUtil.startMainSilentLoad();
					if (CONFIG.isOpenMusic) {
						RES.loadGroup("ui_sound");
					}
				}
			}
		}
		for (let i = 1; i < this.MAIN_ITEM_COUNT; i++) {
			if (i == GlobalManager.getInstance().MAIN_ENTR_IDX) {
				let item = new main.MainItem(i, true, itemCallback);
				item.scaleX = item.scaleY = 0.9;
				vos.push(item);
				if (i < 4) {
					this._arrMainItem.push(item);
				}
			} else {
				let item = new main.MainItem(i, false, itemCallback);
				item.scaleX = item.scaleY = 0.9;
				vos.push(item);
				if (i < 4) {
					this._arrMainItem.push(item);
				}
			}
		}


		this._scrollView = new burn.display.PageView();
		this._scrollView.init(1020, 535, 340, 10);
		this._scrollView.setData(vos);

		// this._scrollView.x = 120;
		// this._scrollView.y = 100;

		this._uiDisplay.mainItemGroup.addChild(this._scrollView);
		this._scrollView.gotoPage(GlobalManager.getInstance().MAIN_ENTR_IDX);
		this._scrollView.addEventListener(burn.event.ScrollEvent.SCROLL_END, this.scrollEnd, this);
		//为按钮添加事件
		this._uiDisplay.bagBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.aquariumBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.makeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.emailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.bankruptBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.exchangeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.roleAvaGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.taskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.signinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.monthBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.activityBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.vipLotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.vipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.btnAddGem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.btnAddTicket.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this._uiDisplay.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		// this._uiDisplay.guanzhuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		//
		this._uiDisplay.imageAvaBg.touchEnabled = false;
		this._uiDisplay.imageAva.touchEnabled = false;

		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.aquariumBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.bagBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.makeBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.taskBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.shopBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.exchangeBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.emailBtn));

		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.bankruptBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.signinBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.monthBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.activityBtn));

		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.settingBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.rankBtn));
		//this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.vipLotteryBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.vipBtn));

		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnAddGold));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnAddGem));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnAddTicket));

		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.yaoqingBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.guanzhuBtn));

		//播放动画
		this._uiDisplay.play.addEventListener('complete', this.onTweenGroupComplete, this);
		this._uiDisplay.play.play(0);

		// Debug模式，编辑鱼的碰撞区域入口按钮
		if (DEBUG) {
			if (CONFIG.DEBUG) {
				let debugBtn: eui.Button = new eui.Button();
				debugBtn.width = 150;
				debugBtn.height = 40;
				debugBtn.label = "超级无敌模式";
				// debugBtn.skinName = "ButtonSkin.exml";
				this._uiDisplay.addChild(debugBtn);
				debugBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (): void {
					let testView: TestView = new TestView();
					let testMed: TestMediator = new TestMediator(testView);
					burn.Director.pushView(testMed);
				}, this);
			}
		}

		this._uiDisplay.rankGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
		//增加UI适配边框
		game.util.UIUtil.screenAdapter(this._uiDisplay);

		//登录后进入主界面请求滚屏公告
		let send: CGBroadcastMessageSendMessage = new CGBroadcastMessageSendMessage();
		send.initData();
		NetManager.send(send);

		//处理QQ玩吧礼包
		if (CONFIG.PLATFORM_ID == PlatformTypeEnum.QQ_ZONE && !FishMainView._isOpenWanbaUI) {
			FishMainView._isOpenWanbaUI = true;
			this.send(NotifyEnum.REQ_QQZONE_GIFT);
		} else {
			this.checkMianLogic();
		}

		//设置首冲按钮
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		if (userModel.getTatolChargeRMB() > 0) {
			this._uiDisplay.firstChargeImg.visible = false;
			this._uiDisplay.chargeImg.visible = true;
		} else {
			this._uiDisplay.firstChargeImg.visible = true;
			this._uiDisplay.chargeImg.visible = false;
		}

		if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
			this._uiDisplay.guanzhuBtn.visible = true;
			this._uiDisplay.yaoqingBtn.visible = true;
			if (CONFIG.IS_WEB) {
				this._uiDisplay.yaoqingBtn.visible = false;
			}
			this._uiDisplay.guanzhuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.yaoqingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}


		let imageGold = this._uiDisplay.imageGold;
		game.util.GameUtil.addGoldEffect(imageGold);

		let imageGem = this._uiDisplay.imageGem;
		let tw = egret.Tween.get(imageGem);
		tw.wait(1000).call(() => {
			egret.Tween.removeTweens(imageGem);
			game.util.GameUtil.addGoldEffect(imageGem);
		});

		let imageTic = this._uiDisplay.imageTicket;
		let twTic = egret.Tween.get(imageTic);
		twTic.wait(2000).call(() => {
			egret.Tween.removeTweens(imageTic);
			game.util.GameUtil.addGoldEffect(imageTic);
		});

		//添加动画
		let group = this._uiDisplay.exchangeGroup;
		this.playActExchange();

		//给充值按钮添加跳一跳动画
		burn.tools.TweenTools.jump(this._uiDisplay.vipLotteryBtn);
	}
	private playActExchange(): void {
		let tw = egret.Tween.get(this._uiDisplay.exchangeGroup, { loop: false });
		tw.to({ x: 912, y: 71, scaleX: 1, scaleY: 1 }, 20)
			.to({ x: 912, y: 73, scaleX: 1, scaleY: 0.78 }, 100)
			.to({ x: 912, y: 63, scaleX: 1, scaleY: 1 }, 100)
			.to({ x: 912, y: 71, scaleX: 1, scaleY: 1 }, 60)
			.to({ x: 912, y: 73, scaleX: 1, scaleY: 0.78 }, 40)
			.to({ x: 912, y: 71, scaleX: 1, scaleY: 1 }, 60)
			.wait(5000).call(() => {
				egret.Tween.removeTweens(this._uiDisplay.exchangeGroup);
				this.playActExchange();
			})
	}

	private static _isOpenWanbaUI: boolean = false;

	/** qq玩吧礼包 */
	public showWanbaGift(state: number, itemList: Array<any>): void {
		let wanbaView = new WanbaGiftView(state, itemList);
		let wanbaMed = new WanbaGiftMeditor(wanbaView);
		burn.Director.pushView(wanbaMed);
	}

	/** 检查进入游戏大厅逻辑 */
	public checkMianLogic(): void {
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		//检查次日礼包
		this.checkCiri();
		//检查红点
		this.send(NotifyEnum.CHECK_MAIN_ALERT);
		if (CONFIG.openGuide) {
			//检测抽奖
			if (userModel.getGuideID() != 9999) {
				userModel.setGuideID(9998);
				game.util.Guide.checkGuide(GuideTrriger.First);
				//播放入场动画
				this.playIntoAct();
				return;
			}
			let guideOver = game.table.T_Config_Table.getVoByKey(49).value;
			let curID = userModel.getGuideID();
			let strOver = guideOver.split(",");
			for (let i = 0; i < strOver.length; i++) {
				if (curID >= Number(strOver[i])) {
					//this.openPanel();
					this.send(NotifyEnum.CHECK_POP);
					break;
				}
			}
		}

		if (!CONFIG.openGuide) {
			//this.openPanel();
			this.send(NotifyEnum.CHECK_POP);
		}
		//播放入场动画
		this.playIntoAct();
	}

	//检查次日礼包
	public checkCiri(): void {
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let state = userModel.getCiriState();
		switch (state) {
			case Ciri_State.Expired:
				this._uiDisplay.ciriBtn.visible = false;
				this._uiDisplay.expireTime.visible = false;
				this._uiDisplay.ciriAlert.visible = false;
				break;
			case Ciri_State.Gained:
				this._uiDisplay.ciriBtn.visible = false;
				this._uiDisplay.expireTime.visible = false;
				this._uiDisplay.ciriAlert.visible = false;
				break;
			case Ciri_State.Time_Up:
				this._uiDisplay.ciriBtn.visible = true;
				this._uiDisplay.ciriAlert.visible = false;
				let gainArr = new Array<game.model.Item>();
				let voItem = game.table.T_Config_Table.getVoByKey(57).value;
				let str = voItem.split(",");
				let len = str.length;
				for (let i = 0; i < len; i++) {
					let dataS = str[i].split("_");
					gainArr.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]), 0));
				}
				this._uiDisplay.ciriBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
					game.util.GameUtil.openCiriByPos(null, gainArr, null, null);
				}, this);
				//expireTime
				this._uiDisplay.expireTime.text = game.util.TimeUtil.expireTime(game.table.T_Language_Table.getVoByKey(120).value);
				break;
			case Ciri_State.Un_Gain:
				this._uiDisplay.ciriBtn.visible = true;
				this._uiDisplay.ciriAlert.visible = true;
				let cireGainArr = new Array<game.model.Item>();
				let cvoItem = game.table.T_Config_Table.getVoByKey(57).value;
				let cstr = cvoItem.split(",");
				let clen = cstr.length;
				for (let i = 0; i < clen; i++) {
					let dataS = cstr[i].split("_");
					cireGainArr.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]), 0));
				}
				this._uiDisplay.ciriBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
					game.util.GameUtil.openCiriByPos(null, cireGainArr, new egret.Point(262, 659), function () {
						let send: NextDayAwardSendMessage = new NextDayAwardSendMessage();
						send.initData();
						NetManager.send(send);
					});
				}, this);
				this._uiDisplay.expireTime.text = game.util.TimeUtil.expireTime(game.table.T_Language_Table.getVoByKey(120).value);
				break;
		}
	}
	//弹出各种板子
	public openPanel(state: number): void {
		switch (state) {
			case Pop_State.VIP:
				let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
				let vipLv = userModel.getVipLevel();
				let voVip = game.table.T_VipLevel_Table.getVoByKey(vipLv);
				let makeUpConisTo = voVip.makeUpConisTo;
				let award = voVip.everydayAward;
				if (makeUpConisTo > 0 && userModel.isTodayFirstLogin()) {
					let gainArr = new Array<game.model.Item>();
					gainArr.push(new game.model.Item(PropEnum.GOLD, makeUpConisTo, 0));
					let str = award.split(",");
					let len = str.length;
					for (let i = 0; i < len; i++) {
						let dataS = str[i].split("_");
						gainArr.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]), 0));
					}
					let self = this;
					game.util.GameUtil.openVipCommonPanel(null, gainArr, new egret.Point(262, 659), function () {
						self.send(NotifyEnum.CHECK_POP);
					}, makeUpConisTo);
				} else {
					this.send(NotifyEnum.CHECK_POP);
				}
				break;
			case Pop_State.MONTH_CARD:
				// let view1:MonthCardView = new MonthCardView(true);
				// let med1:MonthCardMediator = new MonthCardMediator(view1);
				// burn.Director.pushView(med1);
				let view1: MonthCardRewardView = new MonthCardRewardView(true);
				let med1: MonthCardRewardMediator = new MonthCardRewardMediator(view1);
				burn.Director.pushView(med1);
				break;
			case Pop_State.FIRST_CHARGE:
				// let view:FirstChargeView = new FirstChargeView();
				// let med:FirstChargeMediator = new FirstChargeMediator(view);
				// burn.Director.pushView(med);
				break;
			case Pop_State.CIRI:
				let gainArr = new Array<game.model.Item>();
				let voItem = game.table.T_Config_Table.getVoByKey(57).value;
				let str = voItem.split(",");
				let len = str.length;
				for (let i = 0; i < len; i++) {
					let dataS = str[i].split("_");
					gainArr.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]), 0));
				}
				let self = this;
				game.util.GameUtil.openCiriByPos(null, gainArr, new egret.Point(262, 659), function () {
					let send: NextDayAwardSendMessage = new NextDayAwardSendMessage();
					send.initData();
					NetManager.send(send);
					self.send(NotifyEnum.CHECK_POP);
				});
				break;
			case Pop_State.CIRCLE:
				let view3: CircleView = new CircleView();
				let med3: CircleMediator = new CircleMediator(view3);
				burn.Director.pushView(med3);
				break;
		}
	}
	public playIntoAct(): void {
		this._uiDisplay.start_btn.touchEnabled = false;
		/** down up right */
		let actTime = 600;
		let self = this;
		let twUp = egret.Tween.get(this._uiDisplay.up, { loop: false });
		this._uiDisplay.up.y = -100;
		twUp.to({ y: 0 }, actTime, egret.Ease.backOut)
			.call(() => {
				egret.Tween.removeTweens(self._uiDisplay.up);
			});

		let twDown = egret.Tween.get(this._uiDisplay.down, { loop: false });
		this._uiDisplay.down.y = 600;
		twDown.to({ y: 488 }, actTime, egret.Ease.backOut)
			.call(() => {
				egret.Tween.removeTweens(self._uiDisplay.down);
			});

		let twDownRight = egret.Tween.get(this._uiDisplay.mainBtnGroup, { loop: false });
		this._uiDisplay.mainBtnGroup.x = -1280;
		twDownRight.wait(actTime).to({ x: 0 }, actTime, egret.Ease.backOut)
			.call(() => {
				egret.Tween.removeTweens(self._uiDisplay.mainBtnGroup);
				this._uiDisplay.start_btn.touchEnabled = true;
			});

		let twRight = egret.Tween.get(this._uiDisplay.rightGroup, { loop: false });
		this._uiDisplay.rightGroup.x = 1180;
		twRight.to({ x: 1080 }, actTime, egret.Ease.backOut)
			.call(() => {
				egret.Tween.removeTweens(self._uiDisplay.rightGroup);
			});

		let twLeft = egret.Tween.get(this._uiDisplay.rankGroup, { loop: false });
		this._uiDisplay.rankGroup.x = -150;
		twLeft.to({ x: -100 }, actTime, egret.Ease.backOut)
			.call(() => {
				egret.Tween.removeTweens(self._uiDisplay.rankGroup);
			});


		let items = this._scrollView.getVisibleItems();
		let twMiddle = egret.Tween.get(items[1], { loop: false });
		items[1].y = 200;
		twMiddle.to({ y: 0 }, actTime, egret.Ease.backOut)
			.call(() => {
				egret.Tween.removeTweens(items[1]);
			});

		let twMiddleLeft = egret.Tween.get(items[0], { loop: false });
		items[0].x = -175;
		twMiddleLeft.to({ x: 0 }, actTime, egret.Ease.backOut)
			.call(() => {
				egret.Tween.removeTweens(items[0]);
				this._scrollView.startRegistEvent();
			});

		let twMiddleRight = egret.Tween.get(items[2], { loop: false });
		items[2].x = 875;
		twMiddleRight.to({ x: 700 }, actTime, egret.Ease.backOut)
			.call(() => {
				egret.Tween.removeTweens(items[2]);
			});
	}
	public checkAlert(bEmail: boolean, bTask: boolean, bSign: boolean, monthArert: boolean): void {
		if(this._uiDisplay){
			this._uiDisplay.alertEmail.visible = bEmail;
			this._uiDisplay.alertTask.visible = bTask;
			this._uiDisplay.alertSign.visible = bSign;
			this._uiDisplay.alertMonth.visible = monthArert;
		}
	}

	private shouTips(evt: egret.TouchEvent): void {
		game.util.GameUtil.popTips(game.util.Language.getText(47));
	}

	//播放主场景UI动画
	private onTweenGroupComplete(): void {
		if (this._uiDisplay) {
			this._uiDisplay.play.play(0);
		}
	}

	/** 点击功能按钮 */
	private onButtonClick(e: egret.TouchEvent): void {
		let target = e.target;
		if (target == this._uiDisplay.bagBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "bagBtn");
		} else if (target == this._uiDisplay.makeBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "makeBtn");
		} else if (target == this._uiDisplay.bankruptBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "bankruptBtn");
		} else if (target == this._uiDisplay.emailBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "emailBtn");
		} else if (target == this._uiDisplay.exchangeBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "exchangeBtn");
		} else if (target == this._uiDisplay.roleAvaGroup) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "roleAvaGroup");
		} else if (target == this._uiDisplay.taskBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "taskBtn");
		} else if (target == this._uiDisplay.shopBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "shopBtn");
		} else if (target == this._uiDisplay.settingBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "settingBtn");
		} else if (target == this._uiDisplay.signinBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "signinBtn");
		} else if (target == this._uiDisplay.btnAddGold) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "charge_gold");
		} else if (target == this._uiDisplay.btnAddGem) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "charge_gem");
		} else if (target == this._uiDisplay.btnAddTicket) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "charge_ticket");
		} else if (target == this._uiDisplay.vipBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "vipBtn");
		} else if (target == this._uiDisplay.monthBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "monthBtn");
		} else if (target == this._uiDisplay.vipLotteryBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "vipLotteryBtn");
		} else if (target == this._uiDisplay.rankBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "rankBtn");
		} else if (target == this._uiDisplay.yaoqingBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "yaoqingBtn");
		} else if (target == this._uiDisplay.guanzhuBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "guanzhuBtn");
		} else if (target == this._uiDisplay.activityBtn) {
			this.send(NotifyEnum.CLICK_MAIN_BTN, "activityBtn");
		} else {
			game.util.GameUtil.popTips(game.util.Language.getText(47));
		}
	}

	//滚动结束事件
	private scrollEnd(evt: burn.event.PageEvent): void {
		if (CONFIG.openGuide) {
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			if (userModel.getGuideID() <= 1) {
				return;
			}
		}
		let vos: Array<main.MainItem> = this._scrollView.getVos() as Array<main.MainItem>;
		let middleItem: main.MainItem = null;
		for (let i = 0; i < vos.length; i++) {
			let vo = vos[i];
			if (vo.getSelected() == true) {
				if (evt.scrollType == "left") {
					let j = i + 1;
					if (j < vos.length) {
						let temp = vos[j];
						temp.setSelected(true);
						GlobalManager.getInstance().MAIN_ENTR_IDX = temp.id;
					} else {
						let temp = vos[0];
						temp.setSelected(true);
						GlobalManager.getInstance().MAIN_ENTR_IDX = temp.id;
					}
				} else if (evt.scrollType == "right") {
					let j = i - 1;
					if (j > 0) {
						let temp = vos[j];
						temp.setSelected(true);
						GlobalManager.getInstance().MAIN_ENTR_IDX = temp.id;
					} else {
						let temp = vos[vos.length - 1];
						temp.setSelected(true);
						GlobalManager.getInstance().MAIN_ENTR_IDX = temp.id;
					}
				}
				vo.setSelected(false);
				break;
			}
		}


		// let vos = this._scrollView.getVisibleItems();
		// for (let i = 0; i < vos.length; i++) {
		// 	let item = vos[i] as main.MainItem;
		// 	if (i == 1) {
		// 		item.setSelected(true);
		// 		GlobalManager.getInstance().MAIN_ENTR_IDX = item.id;
		// 	} else {
		// 		item.setSelected(false);
		// 	}
		// }
	}
	public updateCoins(goldStr: string): void {
		let labGold = this._uiDisplay.labelGoldNum;
		labGold.text = goldStr;
	}
	//设置主界面状态
	public setMainStateInfo(goldStr: string, gemStr: string, ticStr: string, lvStr: string, exp: string, cunExp, maxExp, uName: string): void {
		this._btnStartGame = this._uiDisplay.start_btn;
		this._btnStartGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartButtonClick, this);
		this._btnStartGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this._btnStartGame.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this._btnStartGame.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);

		let labGold = this._uiDisplay.labelGoldNum;
		labGold.text = goldStr;
		let labGem = this._uiDisplay.labelGemNum;
		labGem.text = gemStr;
		let labTicket = this._uiDisplay.labelTicketNum;
		labTicket.text = ticStr;

		if (uName.length > 5) {
			uName = uName.substr(0, 5) + "...";
		}

		this._uiDisplay.user_name.text = uName + "  Lv:" + lvStr;
		this._uiDisplay.expLab.text = cunExp + "/" + maxExp;

		let percent = Number(cunExp) * 1.0 / Number(maxExp);
		this._uiDisplay.expCur_152.width = percent * 152.0;


		let userModel: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
		this._uiDisplay.vipLab.text = "VIP " + userModel.getVipLevel();
	}

	//设置玩家头像
	public setHeadIcon(bmp: egret.DisplayObject): void {
		bmp.x = 7;
		bmp.y = 7;
		this._uiDisplay.roleAvaGroup.addChild(bmp);
	}

	/**直接捕鱼的界面 */
	private onStartButtonClick(e: egret.TouchEvent) {
		this.openLoadingUI(null);
	}

	private onTouchBegin(e: egret.TouchEvent): void {
		this._btnStartGame.scaleX = this._btnStartGame.scaleY = 1.1;
	}

	private onTouchEnd(e: egret.TouchEvent): void {
		this._btnStartGame.scaleX = this._btnStartGame.scaleY = 1;
	}

	/**开启选房间界面 */
	public onSelectButtonClick() {
		let selectRoomView: SelectRoomView = new SelectRoomView();
		let selectRoomMed: SelectRoomMediator = new SelectRoomMediator(selectRoomView);
		burn.Director.pushView(selectRoomMed);

	}

	public openLoadingUI(data: any): void {
		if (data == null) {//参数为空：快速开始游戏
			this.send(NotifyEnum.RES_LOAD_OVER, null);
		} else {
			this.send(NotifyEnum.RES_LOAD_OVER, data);
		}
	}

	//添加loadingUI
	public addLoadingUI(): void {
		//清除大厅内的滚动公告
		game.util.GCBroadcastManager.clearHallBroadcast();
		this._loadingUI = new LoadingUI();
		this.addChild(this._loadingUI);
		this._loadingUI.initView();
	}

	//更新loading进度
	public updateLoading(itemsLoaded: number, itemsTotal: number): void {
		this._loadingUI.setProgress(itemsLoaded, itemsTotal);
	}

	public closeLoadingUI(): void {
		this._loadingUI.parent.removeChild(this._loadingUI);
	}

	public getScrollView(): burn.display.PageView {
		return this._scrollView;
	}

	/** 设置救济金倒计时 */
	public setBankruptTime(str: string): void {
		this._uiDisplay.bankruptTime.text = str;
	}

	/** 设置救济金倒计时是否显示 */
	public setBankruptVisble(flag: boolean): void {
		this._uiDisplay.bankruptTime.visible = flag;
	}

	//设置在线人数
	public setRoomOnLineUI(): void {
		//this._arrMainItem
		if (!this._arrMainItem) {
			return;
		}
		let len = this._arrMainItem.length;
		for (let i = 0; i < len; i++) {
			if (this._arrMainItem[i]._alivePerson) {
				this._arrMainItem[i]._alivePerson.setPersonNumById(this._arrMainItem[i].id);
			}
		}
	}
	//设置活动红点
	public setActiveAlert(bShow: boolean): void {
		if (!this._uiDisplay) {
			return;
		}
		this._uiDisplay.alertActive.visible = bShow;
	}
	//设置月卡红点
	public setMonthAlert(bShow: boolean): void {
		if (!this._uiDisplay) {
			return;
		}
		this._uiDisplay.alertMonth.visible = bShow;
	}
	public destroy(): void {
		this._loadingUI && this._loadingUI.destroy();
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		//清理主界面入口相关资源
		let vos: Array<main.MainItem> = this._scrollView.getVos() as Array<main.MainItem>;
		for (let vo of vos) {
			vo.destory();
		}

		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
		if (this._uiDisplay) {
			this._uiDisplay.play.removeEventListener('complete', this.onTweenGroupComplete, this);
			this._btnStartGame.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartButtonClick, this);
			this._uiDisplay.makeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.bagBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.emailBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.exchangeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.taskBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.aquariumBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.bankruptBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.roleAvaGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.shopBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.signinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.monthBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.activityBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.vipLotteryBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.vipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.btnAddGold.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.btnAddGem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.btnAddTicket.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.rankGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
			this._uiDisplay.settingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			this._uiDisplay.guanzhuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}

		this.parent && this.parent.removeChild(this);
	}
}

/***操作UI的对应类 */
class MainViewUI extends eui.Component {

	public start_btn: eui.Button;
	public classBtn: eui.Button;
	public fastBtn: eui.Button;
	/** 钻石数量标签 */
	public labelGemNum: eui.Label;
	/** 金币数量标签 */
	public labelGoldNum: eui.Label;
	/** 点券数量标签 */
	public labelTicketNum: eui.Label;
	/** 金币的图标 */
	public imageGold: eui.Group;
	/** 钻石图标 */
	public imageGem: eui.Group;
	/** 点券图标 */
	public imageTicket: eui.Group;
	////////////////下排功能按钮//////////////////
	/** 水族箱 */
	public aquariumBtn: eui.Button;
	/** 背包 */
	public bagBtn: eui.Button;
	/** 锻造 */
	public makeBtn: eui.Button;
	/** 任务 */
	public taskBtn: eui.Button;
	/** 商城 */
	public shopBtn: eui.Button;
	/** 兑换 */
	public exchangeBtn: eui.Button;
	/** 邮件 */
	public emailBtn: eui.Button;

	////////////////右侧功能按钮/////////////////
	/** 救济金倒计时 */
	public bankruptTime: eui.Label;
	/** 救济金 */
	public bankruptBtn: eui.Button;
	/** 签到 */
	public signinBtn: eui.Button;
	/** 月卡 */
	public monthBtn: eui.Button;
	/** 活动 */
	public activityBtn: eui.Button;
	/** 设置按钮 */
	public settingBtn: eui.Button;
	/** 排行榜按钮 */
	public rankBtn: eui.Button;
	/** VIP抽奖按钮 */
	public vipLotteryBtn: eui.Button;
	/** VIP按钮 */
	public vipBtn: eui.Button;
	/** 邀请按钮 */
	public yaoqingBtn: eui.Button;
	/** 关注按钮 */
	public guanzhuBtn: eui.Button;

	///////////////上方按钮功能//////////////////
	/** 添加金币按钮 */
	public btnAddGold: eui.Button;
	/** 添加钻石按钮 */
	public btnAddGem: eui.Button;
	/** 添加点券按钮 */
	public btnAddTicket: eui.Button;

	/** userInfoGroup */
	public roleAvaGroup: eui.Group;
	public imageAvaBg: eui.Image;
	public user_name: eui.Label;
	public imageAva: eui.Image;
	public expLab: eui.Label;
	public expCur_152: eui.Image;

	public vipLab: eui.Label;
	public rankGroup: eui.Group;

	//动画组
	public play: egret.tween.TweenGroup;

	//红点提示
	public alertTask: eui.Image;
	public alertEmail: eui.Image;
	public alertSign: eui.Image;
	public alertActive: eui.Image;
	public alertMonth: eui.Image;
	/** 布局 */
	public down: eui.Group;
	public rightGroup: eui.Group;
	public up: eui.Group;
	public mainBtnGroup: eui.Group;
	//次日礼包
	public ciriBtn: eui.Button;
	//剩余时间
	public expireTime: eui.Label;
	//次日礼包提醒
	public ciriAlert: eui.Image;

	//入口添加项
	public mainItemGroup: eui.Group;

	//首冲
	public firstChargeImg: eui.Image;
	public chargeImg: eui.Image;

	//动画
	public exchangeGroup: eui.Group;

	public constructor() {
		super();
	}

}