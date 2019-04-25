class FishMainMediator extends burn.mediator.SimpleMediator {

	/** 主界面定时器 */
	private _timer:egret.Timer;

	/** 是否在救济金状态 */
	private _isInBankrupt:boolean;
	/** 是否第一次打开主界面 */
	public static isFirstOpen:boolean = true;

	private _arrPop:Array<number>;
	public constructor(view:burn.view.ViewBase) {
		super(view);
		this._isInBankrupt = false;
		
	}

	public onAdded() {
		super.onAdded();
		this._arrPop = new Array<number>();
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let vipLv = userModel.getVipLevel();
		let voVip = game.table.T_VipLevel_Table.getVoByKey(vipLv);
		//判断是否是今天头一次登录
		let isFirstLogin = userModel.isTodayFirstLogin();
		if (isFirstLogin) {
			if (voVip.makeUpConisTo > 0) {
				this._arrPop.push(Pop_State.VIP);
			}
			let monthTime = userModel.getMonthEndTime();
			let residueTime = monthTime - game.util.TimeUtil.getCurrTime();
			//弹出板子
			if (residueTime > 0 && FishMainMediator.isFirstOpen) {
				FishMainMediator.isFirstOpen = false;
				this._arrPop.push(Pop_State.MONTH_CARD);
			}
		}

		let state = userModel.getCiriState();
		if (state == Ciri_State.Un_Gain) {
			if (isFirstLogin) {
				this._arrPop.push(Pop_State.CIRI);
			}
		}

		if (!userModel.isTodayDraw()) {
			if (isFirstLogin) {
				this._arrPop.push(Pop_State.CIRCLE);
			}
		}


		// if(userModel.getTatolChargeRMB() <= 0)
		// {
		// 	this._arrPop.push(Pop_State.FIRST_CHARGE);
		// } 
		this.subscrib(NotifyEnum.CHECK_POP,this.checkPop);
		(this.getView() as FishMainView).initView();
	}
	private checkPop(obj:any, target:any):void {
		let self = target;
		let view = target.getView() as FishMainView;
		if (target._arrPop.length == 0) {
			return;
		}
		let id = target._arrPop.shift();
		view.openPanel(id);
	}

	public init():void {
		//注册观察者
		this.subscrib(NotifyEnum.MAIN_UI_INIT, this.viewInit);
		this.subscrib(NotifyEnum.RES_LOAD_OVER, this.resLoadOver);
		this.subscrib(NotifyEnum.OPEN_SELECT_ROOM, this.openSelcetRoom);
		this.subscrib(NotifyEnum.CLICK_MAIN_FUN_ITEM, this.clickMainFunItem);
		this.subscrib(NotifyEnum.CLICK_MAIN_BTN, this.clickMainBtn);
		this.subscrib(NotifyEnum.UPDATE_MAIN_DATA, this.updateMainState);
		this.subscrib(NotifyEnum.CHECK_MAIN_ALERT, this.checkMainAlert);
		//刷新房间在线人数
		this.subscrib(NotifyEnum.REFRES_ROOM_ONLINE, this.refreshRoomOnline);
		//监听救济金返回消息
		this.subscrib(NotifyEnum.BANKRUPT_MESSAGE, this.bankruptBack);
		//监听救济金更新金币的消息
		this.subscrib(NotifyEnum.UPDATE_ROOM_UI_COINS, this.updateUICoins);
		//领取qq玩吧礼包
		this.subscrib(NotifyEnum.REQ_QQZONE_GIFT, this.reqQQZoneGift);
		//关闭qq玩吧礼包
		this.subscrib(NotifyEnum.CLOSE_QQZONE_GIFT, this.checkMianViewPopLogic);
		//TEST
		this.subscrib(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, this.openLoadingUI);
		//活动信息加载成功
		this.subscrib(NotifyEnum.ACTIVE_CONFIG_DATA_LOAEDED, this.showActiveAlert);
		
        game.net.MessageDispatcher.register(game.net.ResponseType.MAIL, (msg:MailMessage)=>{
            this.receiMail(msg);
        });
        game.net.MessageDispatcher.register(game.net.ResponseType.MAILBOX, (msg:MailboxMessage)=>{
            this.refreshMail(msg);
        });
		game.net.MessageDispatcher.register(game.net.ResponseType.GETWANBAGIFTBACK, (msg:GetWanbaGiftBackMessage)=>{
			this.getWanbaGiftback(msg);
		});
		game.net.MessageDispatcher.register(game.net.ResponseType.NEXTDAYAWARDBACK, (msg:NextDayAwardBackMessage)=>{
			this.nextDarWard(msg);
		});

		this.sendRefreshMail();
		//添加断线重连监听
		GlobalManager.getInstance().addReconnectListener();
		//提前加载主场景UI资源
		this.preLoad();
	}

	/** 提前加载主场景UI资源 */
	private preLoad():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/SideProp.exml");
		//加载冰冻和锁定UI
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/FrozenAndLock.exml");
		//加载解锁炮倍UI
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/UnlockGunGroup.exml");
		//加载炮台资源
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Gun.exml");
		//加载War资源
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/WarGroup.exml");
		//加载chakanUI资源
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/ChakanPanel.exml");
	}

	private sendRefreshMail():void {
		let req = new CommonRequestMessage();
		req.initData();
		req.setType(CommonRequest.EMAIL);//1 email
		NetManager.send(req);
	}
	private refreshMail(msg:MailboxMessage):void
	{
		let emailModel:EmailModel = burn.Director.getModelByKey(EmailModel) as EmailModel;
		emailModel.clearEmail();
		let mailItems = msg.getMailListByType();
		for (let i = 0; i < mailItems.length; i++) {
			let dataObj = mailItems[i].getMails();
			for (let j = 0; j < dataObj.length; j++) {
				let data = dataObj[j];
				let emailItem = new game.model.EmailItem(data.getMailId(),data.getMailType(),data.getUserId(),data.getReceiveUserName(),
														data.getSendUserId(),data.getSendUserName(),data.getItems(),data.getTime(),
														data.getState(),data.getMailContent(),data.getMailTitle());
				emailModel.addItem(emailItem);
			}
		}
		this.checkMail();
		//发送通知消息
		this.getView().send(NotifyEnum.REFRESH_EMAIL,msg);
		burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
	}

	//检查主界面弹出面板逻辑
	private checkMianViewPopLogic(obj:any, target:any):void {
		(target.getView() as FishMainView).checkMianLogic();
	}
	
	//次日礼包提醒
	private nextDarWard(msg:NextDayAwardBackMessage):void {
		let state = msg.getResultState();
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		userModel.setCiriState(state);
		let view = this.getView() as FishMainView
		//0时间没到不可领取，2已领取，3已过期  //113 - 115
		if (state == 0) {
			game.util.GameUtil.popTips(game.util.Language.getText(113));
		} else if (state == 2) {
			game.util.GameUtil.popTips(game.util.Language.getText(114));
		} else if(state == 3) {
			game.util.GameUtil.popTips(game.util.Language.getText(115));
		}
		view.checkCiri();
	}
	private getWanbaGiftback(msg:GetWanbaGiftBackMessage):void {
		let state:number = msg.getResult();
		let view = (this.getView() as FishMainView);
		if (state != 0) {
			view.showWanbaGift(state, msg.getRewardList());
		} else {
			view.checkMianLogic();
		}
	}

	private checkMail():void
	{
		let emailModel:EmailModel = burn.Director.getModelByKey(EmailModel) as EmailModel;
		let list = emailModel.getMailListByType(3);
		for (let i = 0; i < list.length; i++) {
			let data = list[i];
			let self = this;
			let arrName = new Array<string>();
			arrName.push(data.getSendUserName() + "");
			arrName.push(data.getSendUserId() + "");
			arrName.push(data.getItems()[0].getCount() + "");
			let vo = game.table.T_Item_Table.getVoByKey(Number(data.getItems()[0].getItemId()));
			arrName.push(game.util.Language.getText(vo.name) + "");
			//是否邮寄{0}个{1}给{2}({3})
			let string = game.util.Language.getDynamicText(46,arrName);
			(function (data,string) {
				game.util.GameUtil.openEmailChakan(null,function(){
					let req:ReceiveMailSendMessage = new ReceiveMailSendMessage();
					req.initData();
					req.setMailId(data.getMailId());
					NetManager.send(req);
				}, string,data.getItems(), data.getState());
			}(data,string));
		}
	}
	/** 收取邮件 */
	private receiMail(msg:MailMessage) {
		let data = msg;
		let emailItem = new game.model.EmailItem(data.getMailId(),data.getMailType(),data.getUserId(),data.getReceiveUserName(),
															data.getSendUserId(),data.getSendUserName(),data.getItems(),data.getTime(),
															data.getState(),data.getMailContent(),data.getMailTitle());
		let self = this;
		let arrName = new Array<string>();
		arrName.push(data.getSendUserName() + "");
		arrName.push(data.getSendUserId() + "");
		arrName.push(emailItem.getItems()[0].getCount() + "");
		let vo = game.table.T_Item_Table.getVoByKey(Number(emailItem.getItems()[0].getItemId()));
		arrName.push(game.util.Language.getText(vo.name) + "");
		//是否邮寄{0}个{1}给{2}({3})
		let string = game.util.Language.getDynamicText(46,arrName);
		(function (emailItem, string) {
			game.util.GameUtil.openEmailChakan(null,function() {
				let req:ReceiveMailSendMessage = new ReceiveMailSendMessage();
				req.initData();
				req.setMailId(emailItem.getMailId());
				NetManager.send(req);
			}, string,emailItem.getItems(), emailItem.getState());
		}(emailItem, string));
	}
	/**UI资源加载完成的回调 */
	public viewInit(obj:any, target:any):void
	{
		//请求活动信息
		let sendActive:ActiveConfigMessagesSendMessage = new ActiveConfigMessagesSendMessage();
		sendActive.initData();
		NetManager.send(sendActive);
		
		let self = target;
		let model:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let view = (self.getView() as FishMainView);
		//更新UI数据
		// self.setMainState();
		//设置玩家头像
		self.setHeadIcon();
		//请求房间连接监听
		game.net.MessageDispatcher.register(game.net.ResponseType.REQUESTROOMBACK, function(msg:RequestRoomBackMessage):void{
			if (msg.getFlag()) {
				NetManager.resetNet(msg.getIp(), msg.getPort(), function():void{
					let roomType = msg.getType();
					let skinid = model.getCurSkinId();
					model.setMatchRoomLevel(roomType);
					//记录开始加载前时间
					game.util.LogUtil.timestamp = new Date().getTime();
					// game.util.ReyunUtil.sendEvent(game.util.LogEnum.START_ROOM_LOADING);
					let intoRoomScene = function ():void {
						// game.util.ReyunUtil.sendEvent(game.util.LogEnum.END_ROOM_LOADING);
						//发送进入房间请求
						let req = new IntoRoomSendMessage();
						req.initData();
						req.setId(msg.getRoomId());
						req.setUid(model.getUserId());
						NetManager.send(req);
					}
					let fishingLoadCount = 0;
					let onResourceLoadComplete = function (event) {
						//发送进入房间消息
						if (event.groupName == "asyn_fish_" + roomType + skinid) {
							RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);
							RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);
							intoRoomScene();
							// fishingLoadCount++;
							// if (fishingLoadCount >= 2) {
							// 	intoRoomScene();
							// } else {
							// 	RES.loadGroup("fishing");
							// }
						}
						//  else if (event.groupName == "fishing") {
						// 	fishingLoadCount++;
						// 	if (fishingLoadCount >= 2) {
						// 		intoRoomScene();
						// 	}
						// }
					}

					//资源加载进度
					let onResourceProgress = function (event) {
						if (event.groupName == "asyn_fish_" + roomType) {
							view.updateLoading(event.itemsLoaded, event.itemsTotal);
						} else {
							view.updateLoading(event.itemsLoaded, event.itemsTotal);
						}
					}

					RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);
					RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);

					EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Loading.exml", function():void {
						view.addLoadingUI();
						let resList = game.util.LoaderUtil.getFishResByType(roomType);
						resList.push("gunsicon_" + skinid +  "_png");
						resList.push("fishing");
						RES.createGroup("asyn_fish_" + roomType + skinid, resList);
						RES.loadGroup("asyn_fish_" + roomType + skinid);
					}, self);
				} );	
			} else {
				console.log("进入房间失败:" + msg.getFlag());
			}
		});
		//请求房间数据监听
		game.net.MessageDispatcher.register(game.net.ResponseType.INTOROOMBACK, function(msg:IntoRoomBackMessage):void{
			//初始化房间model
			let rModel:RoomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
			let uModel:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
			//玩家信息列表
			let playList:Array<any> = msg.getPlayerInfo() as Array<any>;

			for (let i = 0; i < playList.length; i++ ) {
				let roomer:game.model.Roomer = new game.model.Roomer (
						parseInt(playList[i].playerId), 
						parseInt(playList[i].position), 
						playList[i].name,
						parseInt(playList[i].gunId),
						parseInt(playList[i].coins),
						parseInt(playList[i].gems),
						playList[i].items,
						playList[i].lockRelation,
						playList[i].vipLevel,
						playList[i].batterySkinId,
						playList[i].gunrestSkinId,
						playList[i].roleLevel
					);
				rModel.addRoomer(roomer);
				let roomType = uModel.getMatchRoomLevel();
				if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom || game.util.GameUtil.isKss(roomType)) {
					//如果是大奖赛
					let djsObj = new game.model.DjsObj(playList[i].grandPrixMessage);
					roomer.setDjsObj(djsObj);
				}
			}
			if (uModel.isTodayFirstLogin()) {
				//记录登录加载时长
				let tempTime = new Date().getTime() - game.util.LogUtil.timestamp;
				let content = {duration:tempTime};
				game.util.LogUtil.sendLogicalLog(game.util.LogEnum.INTO_ROOM_LOADING_TIME, content);
			}
			
		});
		//初始房间内鱼群
		game.net.MessageDispatcher.register(game.net.ResponseType.PONDFISHES, function(msg:PondFishesMessage):void {
			game.net.MessageDispatcher.unregister(game.net.ResponseType.PONDFISHES);
			let rModel:RoomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
			let fishList:Array<any> = msg.getFishes();
			for (let i = 0; i < fishList.length; i++ ) {
				if (!rModel.isPathExist(fishList[i].pathId)) {
					let fish:game.model.Fish = new game.model.Fish();
					fish.fishId = fishList[i].fishId;
					fish.pathId = fishList[i].pathId;
					fish.fishType = fishList[i].type;
					fish.uniqId = fishList[i].uniId;
					fish.coord = new egret.Point(fishList[i].coordinate.xvalue, fishList[i].coordinate.yvalue);
					fish.aliveTime = Number(fishList[i].aliveTime);
					rModel.addRoomLiveFish(fish);
				}
			}
			game.util.UIUtil.startLoading();
			//关闭loading界面
			view.closeLoadingUI();
			//进入房间
			let roomView:RoomView = new RoomView();
			let roomMed:RoomMediator = new RoomMediator(roomView);
			burn.Director.repleaceView(roomMed);
		});

		self._timer = new egret.Timer(1000, 0);
		self._timer.addEventListener(egret.TimerEvent.TIMER, self.timerFunc, self);
        //开始计时
        self._timer.start();
		//设置玩家信息
	}
	//主界面计时
	private timerFunc():void {
		let view = (this.getView() as FishMainView);
		let model:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
		if (this._isInBankrupt) {
			let time = model.getBankruptTime();
			let currTime = game.util.TimeUtil.getCurrTime();
			let residue = time - currTime;
			if (residue > 0) {
				let str = game.util.TimeUtil.sceonds2MinStr(residue);
				view.setBankruptTime(str);
			} else {
				view.setBankruptTime(game.util.Language.getText(32));
			}
		}
    }

	private setHeadIcon():void {
		let self = this;
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let headUrl:string = "";
		if(CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG){
			headUrl = userModel.getHeadUrl().replace("yiwantang/","");
		}else{
			headUrl = userModel.getHeadUrl();
		}
		game.util.IconUtil.getHeadIcon(headUrl, (bmp)=>{
			//设置玩家头像
			(self.getView() as FishMainView).setHeadIcon(bmp);
		});
	}

	private resLoadOver(obj:any, target:any):void {
		let model:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
		if (model.getCoins() <= 0) {
			game.util.GameUtil.openConfirm(null, null, target,game.util.Language.getText(2));
			return;
		}
		let req = new RequestRoomMessage();
		req.initData();
		let roomType = 0;
		let view:FishMainView = (target.getView() as FishMainView);
		if (obj == null)	{	//快速游戏自动匹配
			game.util.ReyunUtil.sendEvent(game.util.LogEnum.QUICKLY_GAME_COUNT);
			req.setId(model.getUserId());
			//根据金币和炮倍获取可进入的房间类型,炮倍
			// roomType = game.util.GameUtil.getRoomTypeByCoinsAndRate(model.getCoins(), model.getCurGunID());
			req.setType(RequesetRoomState.QuickGame);
			NetManager.send(req);
		} else {	//手动选择房间类型
			roomType = obj.type;
			let flag = game.util.GameUtil.verifyRoomCoins(roomType, model.getCoins());
			if (!flag) {
				let coins = game.util.GameUtil.getNeedCoinsByRoomType(roomType);
				game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(57, [String(coins)]));
				return;
			}
			let gunFlag = game.util.GameUtil.getNeedGunByRoomType(roomType, model.getCurGunID());
			if (gunFlag != -1) {
				let vo = game.table.T_Gun_Table.getVoByKey(gunFlag);
				game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(77, [String(vo.bulletNum)]));
				return;
			}
			let rId = obj.id;
			req.setId(model.getUserId());
			req.setType(roomType);
			req.setRoomId(rId);
			NetManager.send(req);
		}
		
	}
	//刷新room在线人数UI
	public refreshRoomOnline(obj:any, target:any):void {
		let view = target.getView() as FishMainView;
		view.setRoomOnLineUI();
	}
	
	public checkMainAlert(obj:any, target:any):void {
		let emailAlert = false;
		let emailModel:EmailModel = target.getModel(EmailModel) as EmailModel;
		let list = emailModel.getMailList();
		let listLen = list.length;
		for (let i = 0; i < listLen; i++) {
			let emailItemState = list[i].getState();
			if (emailItemState == 0) {
				emailAlert = true;
				break;
			}
		}
		let taskModel:TaskModel = target.getModel(TaskModel) as TaskModel;
		let taskAlert = taskModel.showAlert();
		let view = (target.getView() as FishMainView);
		
        let model = target.getModel(UserModel) as UserModel;
		let signObj:game.model.SignObj = model.getSignObj();

		let monthArert:boolean = false;
		let monthModel = target.getModel(UserModel) as UserModel;
		var endTime = monthModel.getMonthEndTime() - game.util.TimeUtil.getCurrTime();
		if(endTime < 0 && !monthModel.bOpenedMonthUI){
			monthArert = true;
		}else{
			monthArert = false;
		}
		view.checkAlert(emailAlert, taskAlert, !signObj.IsTodaySign(),monthArert);
	}
	
	public updateMainState(obj:any, target:any):void {
		target.setMainState();
	}

	public setMainState():void {
		let view = (this.getView() as FishMainView);
		let userModel:UserModel = this.getModel(UserModel) as UserModel;
		let exp = userModel.getExp();
		let vo = game.table.T_RoleLevel_Table.getVoByKey(userModel.getLevel());
		let maxExp = vo.levelUpExp;
		//更新玩家数据：金币和钻石
		view.setMainStateInfo(String(userModel.getCoins()), String(userModel.getMoney()), String(userModel.getTicket()), 
							String(userModel.getLevel()), String(userModel.getExp()),
							String(exp),String(maxExp), userModel.getUserName());
		//判断救济金状态
		let bankruptTime = userModel.getBankruptTime();

		if (bankruptTime > 0 && userModel.getCoins() > 0) {
			let msg:BankruptMessage = new BankruptMessage();
			msg.initData();
			msg.setState(BankruptStauts.STATE_RESUME);
			NetManager.send(msg);
			userModel.setBankruptTime(0);
			bankruptTime = 0;
		}

		if (bankruptTime == 0) {
			view.setBankruptVisble(false);
			this._isInBankrupt = false;
		} else {
			view.setBankruptVisble(true);
			this._isInBankrupt = true;
		}
	}

	//进入手动选房功能
	private openSelcetRoom(obj:any, target:any):void {
		let userModel:UserModel = target.getModel(UserModel) as UserModel;
		let flag = game.util.GameUtil.verifyRoomCoins(RequesetRoomState.SelectRoom, userModel.getCoins());
		if (flag) {
			let flag1 = game.util.GameUtil.verifyRoomCoins(RequesetRoomState.SelectRoom, userModel.getCoins());
			if (!flag1) {
				let coins = game.util.GameUtil.getNeedCoinsByRoomType(RequesetRoomState.SelectRoom);
				game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(57, [String(coins)]));
				return;
			}

			let gunFlag = game.util.GameUtil.getNeedGunByRoomType(RequesetRoomState.SelectRoom, userModel.getCurGunID());
			if (gunFlag != -1) {
				let vo = game.table.T_Gun_Table.getVoByKey(gunFlag);
				game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(77, [String(vo.bulletNum)]));
				return;
			}
			(target.getView() as FishMainView).onSelectButtonClick();
		} else {
			let gunFlag = game.util.GameUtil.getNeedGunByRoomType(RequesetRoomState.SelectRoom, userModel.getCurGunID());
			if (gunFlag != -1) {
				let vo = game.table.T_Gun_Table.getVoByKey(gunFlag);
				game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(77, [String(vo.bulletNum)]));
				return;
			}
			let coins = game.util.GameUtil.getNeedCoinsByRoomType(RequesetRoomState.SelectRoom);
			game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(57, [String(coins)]));
		}
	}

	//点击两边非中间item的时候
	private clickMainFunItem(obj:any, target:any):void {
		let view = target.getView() as FishMainView;
		let vos:Array<main.MainItem> = view.getScrollView().getVos() as Array<main.MainItem>;

		let middleItem:main.MainItem = null;
		for (let vo of vos) {
			if (vo.getSelected() == true) {
				middleItem = vo;
			}
		}
		if (obj) {
			let currId = middleItem.id;
			if (currId < obj && obj - currId == 1) {
				view.getScrollView().prevPosition();
			} else if (currId > obj && currId - obj == 1) {
				view.getScrollView().nextPosition();
			} else if (currId < obj && obj - currId > 1) {
				view.getScrollView().nextPosition();
			} else if (currId > obj && currId - obj > 1) {
				view.getScrollView().prevPosition();
			}
		}
	}

	//点击主界面上的按钮
	private clickMainBtn(obj:any, target:any):void {
		if ("bagBtn" == obj) {
			let bagView:BagView = new BagView();
			let bagMed:BagMediator = new BagMediator(bagView);
			burn.Director.pushView(bagMed);
		} else if ("makeBtn" == obj) {
			let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
			//最高ID
			let gunRate = userModle.getCurGunID();
			let gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
			//判断有没有下一个炮倍
			if (gunRateVo) {
				let arr = gunRateVo.upgradeOrForgeCost;
				let arrData = arr.split(",");
				if (arrData.length > 1) {
					let forgeView:ForgeView = new ForgeView();
					let forgeMed:ForgeMediator = new ForgeMediator(forgeView);
					burn.Director.pushView(forgeMed);
					return;
				}
			}
			if (gunRate == 54) {
				//未开启锻造界面
				game.util.GameUtil.popTips("已经是最高炮倍");
			} else {
				//未开启锻造界面
				game.util.GameUtil.popTips(game.util.Language.getText(28));
			}
		} else if ("bankruptBtn" == obj) {
			let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
			let time = userModle.getBankruptTime();
			if (time > 0) {
				let currTime = game.util.TimeUtil.getCurrTime();
				let residue = time - currTime;
				if (residue > 0) {
					game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getText(33));//时间还没到，等一会！
				} else {
					let req:BankruptMessage = new BankruptMessage();
					req.initData();
					//7:领取救济金
					req.setState(7);
					NetManager.send(req);
				}
			} else {
				game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getText(34));//你没破产，没有救济金！
			}
		} else if ("emailBtn" == obj) {
			let emailView:EmailView = new EmailView();
			let emailMed:EmailMediator = new EmailMediator(emailView);
			burn.Director.pushView(emailMed);
		} else if ("exchangeBtn" == obj) {
			let exchangeView:ExchangeView = new ExchangeView(false);
			let exchangeMed:ExchangeMediator = new ExchangeMediator(exchangeView);
			burn.Director.pushView(exchangeMed);
		} else if ("roleAvaGroup" == obj) {
			let userView:UserInfoView = new UserInfoView();
			let userMed:UserInfoMediator = new UserInfoMediator(userView);
			burn.Director.pushView(userMed);
		} else if ("taskBtn" == obj) {
			let taskView:TaskView = new TaskView();
			let taskMed:TaskMediator = new TaskMediator(taskView);
			burn.Director.pushView(taskMed);
		} else if ("shopBtn" == obj) {
			let itemShopView:ItemShopView = new ItemShopView();
			let itemShopMed:ItemShopMediator = new ItemShopMediator(itemShopView);
			burn.Director.pushView(itemShopMed);
		} else if ("settingBtn" == obj) {
			let settingView:SettingView = new SettingView();
			let settingMed:SettingMediator = new SettingMediator(settingView);
			burn.Director.pushView(settingMed);
			
			// let yaoQingView = new ShareZiYou(ShareType.Forge_Succ, 3333);
			// target.getView().addChild(yaoQingView);
			/**{"signature":"3e83bda4d08391b491e129df1e30ecf00fb52007","noncestr":"4a3b51fe-c909-464a-9158-426f6e9c19b0","timestamp":"1498874321"} */
			//game.platform.PaymentManager.WXConfig();
		} else if ("vipBtn" == obj) {
			let view:VipView = new VipView();
			let med:VipMediator = new VipMediator(view);
			burn.Director.pushView(med);
		} else if ("signinBtn" == obj) {
			let view2:SignView = new SignView();
			let med2:SignMediator = new SignMediator(view2);
			burn.Director.pushView(med2);
		} else if ("activityBtn" == obj) {
			let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
			if (activeModel.getActiveList().length > 0) {
				let view3:ActiveView = new ActiveView();
				let med3:ActiveMediator = new ActiveMediator(view3);
				burn.Director.pushView(med3);
			} else {
				game.util.GameUtil.popTips(game.util.Language.getText(190));
			}
		} else if ("vipLotteryBtn" == obj) {
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			if (userModel.getTatolChargeRMB() > 0) {
				let chargeView:ChargeView = new ChargeView(ChargeType.Ticket);
				let chargeMed:ChargeMediator = new ChargeMediator(chargeView);
				burn.Director.pushView(chargeMed);
			} else {
				let firstChargeView:FirstChargeView = new FirstChargeView();
				let firstChargeMed:FirstChargeMediator = new FirstChargeMediator(firstChargeView);
				burn.Director.pushView(firstChargeMed);
			}
		} else if ("rankBtn" == obj) {
			let view4:RankView = new RankView();
			let med4:RankMediator = new RankMediator(view4);
			burn.Director.pushView(med4);
		} else if ("monthBtn" == obj) {
			let view1:MonthCardView = new MonthCardView();
			let med1:MonthCardMediator = new MonthCardMediator(view1);
			burn.Director.pushView(med1);
			(target.getView() as FishMainView).setMonthAlert(false);
		} else if ("charge_gold" == obj) {
			let chargeView:ChargeView = new ChargeView(ChargeType.Gold);
			let chargeMed:ChargeMediator = new ChargeMediator(chargeView);
			burn.Director.pushView(chargeMed);
		} else if ("charge_gem" == obj) {
			let chargeView:ChargeView = new ChargeView(ChargeType.Gem);
			let chargeMed:ChargeMediator = new ChargeMediator(chargeView);
			burn.Director.pushView(chargeMed);
		} else if ("charge_ticket" == obj) {
			let chargeView:ChargeView = new ChargeView(ChargeType.Ticket);
			let chargeMed:ChargeMediator = new ChargeMediator(chargeView);
			burn.Director.pushView(chargeMed);
		} else if ("yaoqingBtn" == obj) {
			// let view = target.getView() as FishMainView;
			// let yaoQingView = new YaoQingView();
			// view.addChild(yaoQingView);
			// let shareView:ShareView = new ShareView();
			// let shareMed:ShareMediator = new ShareMediator(shareView);
			// burn.Director.pushView(shareMed);

			let yaoQingView = new ShareZiYou(ShareType.NORMAL, "");
			target.getView().addChild(yaoQingView);
			
		} else if ("guanzhuBtn" == obj) {
			if (CONFIG.PLATFORM_ID == PlatformTypeEnum.ZI_YOU) {
				openQrCode();
			}
			if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
				openCombunetQrCode(Number(CONFIG.SUB_PLATFORM_ID));
			}
		}
	}
	private updateUICoins(obj:any, target:any):void {
		let view = target.getView() as FishMainView;
		let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
		view.updateCoins(userModle.getCoins() + "");
	}

	//请求qq玩吧礼包
	private reqQQZoneGift(obj:any, target:any):void {
		let giftId = Number(window["FISHING_CONFIG"]["giftId"]);
		if (giftId > 0) {
			let req:GetWanbaGiftMessage = new GetWanbaGiftMessage();
			req.initData();
			req.setGiftId(giftId);
			NetManager.send(req);
		} else {
			(target.getView() as FishMainView).checkMianLogic();
		}
	}

	//救济金消息返回
	private bankruptBack(obj:any, target:any):void {
		let status = obj.status;
		if (status == BankruptStauts.GET_SUCC) {
			let coins = obj.coins;
			let userId = obj.userId;
			// let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
			// let coinsTatal = Number(userModle.getCoins()) + Number(coins);
			// userModle.setCoins( coinsTatal );
			game.util.GameUtil.flyCoins(coins, 3, new egret.Point(1200, 400), new egret.Point(300, 55), null, userId);
			//
			let view = (target.getView() as FishMainView);
			view.setBankruptVisble(false);
		} else if (status == BankruptStauts.GET_LIMIT) {
			game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getText(35));
		} else if (status == BankruptStauts.NOT_TO_TIME) {
			game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getText(33));
		}
	}
	//活动数据加载完成
	private showActiveAlert(obj:any, target:any)
	{
		let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
		let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
		let view = target.getView() as FishMainView;
		if (activeModel.getActiveList().length > 0) {
			if (!userModle.bOpenedActiveUI) {
				//添加
				view.setActiveAlert(true);
				return;
			}
		}
		//去掉
		view.setActiveAlert(false);
	}

	private openLoadingUI(obj:any, target:any):void {
		//检测
		let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
		if (obj.type == RequesetRoomState.NewbieRoom) {
			let lv = userModle.getLevel();
			let gunRateVo = game.table.T_Gun_Table.getVoByKey(userModle.getCurGunID());
			let lvLimit = game.table.T_Config_Table.getVoByKey(37);	//等级限制
			let gunRateLimit = game.table.T_Config_Table.getVoByKey(38);	//炮倍限制
			// if (lv > Number(lvLimit.value)) {
			// 	game.util.GameUtil.popTips(game.util.Language.getDynamicText(81, [lvLimit.value]));
			// 	return;
			// }
			// if (gunRateVo.bulletNum >= Number(gunRateLimit.value)) {
			// 	game.util.GameUtil.popTips(game.util.Language.getDynamicText(80, [gunRateLimit.value]));
			// 	return;
			// }
		}
		userModle.setMatchRoomLevel(Number(obj.type));
		let flag = game.util.GameUtil.verifyRoomCoins(Number(obj.type), userModle.getCoins());
		// if (!flag) {
		// 	let coins = game.util.GameUtil.getNeedCoinsByRoomType(Number(obj.type));
		// 	game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(57, [String(coins)]));
		// 	return;
		// }

		// let gunFlag = game.util.GameUtil.getNeedGunByRoomType(Number(obj.type), userModle.getCurGunID());
		// if (gunFlag != -1) {
		// 	let vo = game.table.T_Gun_Table.getVoByKey(gunFlag);
		// 	game.util.GameUtil.openConfirm(null, null, target, game.util.Language.getDynamicText(77, [String(vo.bulletNum)]));
		// 	return;
		// }

		let view = target.getView() as FishMainView;
		view.openLoadingUI(obj);
	}
	public destroy():void {
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);

		this.unsubscribByType(NotifyEnum.RES_LOAD_OVER);
		this.unsubscribByType(NotifyEnum.MAIN_UI_INIT);
		this.unsubscribByType(NotifyEnum.OPEN_SELECT_ROOM);
		this.unsubscribByType(NotifyEnum.CLICK_MAIN_FUN_ITEM);
		this.unsubscribByType(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM);
		this.unsubscribByType(NotifyEnum.ACTIVE_CONFIG_DATA_LOAEDED);
		this.unsubscribByType(NotifyEnum.CLICK_MAIN_BTN);
		this.unsubscribByType(NotifyEnum.BANKRUPT_MESSAGE);
		this.unsubscribByType(NotifyEnum.UPDATE_ROOM_UI_COINS);
		this.unsubscribByType(NotifyEnum.REQ_QQZONE_GIFT);
		this.unsubscribByType(NotifyEnum.CLOSE_QQZONE_GIFT);
		this.unsubscribByType(NotifyEnum.CHECK_MAIN_ALERT);
		this.unsubscribByType(NotifyEnum.CHECK_POP);
		this.unsubscribByType(NotifyEnum.REFRES_ROOM_ONLINE);
		this.getView().destroy();
		//移除监听
		game.net.MessageDispatcher.unregister(game.net.ResponseType.PONDFISHES);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.INTOROOMBACK);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.REQUESTROOMBACK);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.NEXTDAYAWARDBACK);
		//清理资源
		RES.destroyRes("mainUI", false);
	}
}