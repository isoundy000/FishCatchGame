class LoginMediator extends burn.mediator.SimpleMediator {

	public constructor(view:burn.view.ViewBase) {
		super(view);
	}
	
	public onAdded():void {
		super.onAdded();
		(this.getView() as LoginView).initView();
		// EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/newProgressButton.exml");
		game.util.LoaderUtil.startLoginSilentLoad();
	}

	public init():void {
		let model:RoomModel = this.getModel(RoomModel) as RoomModel;
		let self = this;
		//初始化GlobalManager.getInstance()
		GlobalManager.getInstance();
		//监听打开公告界面
		this.subscrib(NotifyEnum.OPEN_NOTICE_UI, this.openNoticeUI);
		//更新登录按钮状态
		this.subscrib(NotifyEnum.UPDATE_LOGIN_BTN, this.updateLoginBtn);
		/** 监听登录消息返回 只在登录时监听 */
		let isNewUser:boolean = false;
		(self.getView() as LoginView).enterMainView(isNewUser);
		// game.net.MessageDispatcher.register(game.net.ResponseType.LOGINBACK, function(msg:LoginBackMessage):void{
		// 	GlobalManager.getInstance().bIsNeedDelayLogin = false;
		// 	GlobalManager.getInstance().initUserData(msg);
		// 	let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		// 	let isNewUser:boolean = false;
		// 	if (userModel.getGuideID() <= 0) {
		// 		isNewUser = true;
		// 	}
		// 	//进入主界面
		// 	(self.getView() as LoginView).enterMainView(isNewUser);
		// 	//初始化缓存协议
		// 	game.util.ProtobufUtil.getInstance().initCacheProto();
		// });
		//请求房间连接监听
		game.net.MessageDispatcher.register(game.net.ResponseType.REQUESTROOMBACK, function(msg:RequestRoomBackMessage):void{
			if (msg.getFlag() == 1) {
				NetManager.resetNet(msg.getIp(), msg.getPort(), function():void{
					let model:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
					let view = (self.getView() as LoginView);
					let roomType = msg.getType();
					let skinid = model.getCurSkinId();
					model.setMatchRoomLevel(roomType);
					let onConfigComplete = function () {
						intoRoomScene();
					}

					let onResourceProgress = function (event:RES.ResourceEvent):void {
						view.updateResProgress(event.itemsLoaded, event.itemsTotal);
					}

					let intoRoomScene = function ():void {
						RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onConfigComplete, self);
						RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);
						// game.util.ReyunUtil.sendEvent(game.util.LogEnum.END_ROOM_LOADING);
						//发送进入房间请求
						let req = new IntoRoomSendMessage();
						req.initData(); 
						req.setId(msg.getRoomId());
						req.setUid(model.getUserId());
						NetManager.send(req);
						
					}

					RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onConfigComplete, self);
					RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);
					let resList = game.util.LoaderUtil.getFishResByType(roomType);
					resList.push("gunsicon_" + skinid +  "_png");
					resList.push("fishing");
					RES.createGroup("asyn_fish_" + roomType + skinid, resList);
					RES.loadGroup("asyn_fish_" + roomType + skinid);
				});
			} else {
            	game.util.GameUtil.popTips("进入房间失败:" + msg.getFlag());
				let view = self.getView() as LoginView;
				view._loginBtn.visible = true;
			}
		});

		//请求房间数据监听
		game.net.MessageDispatcher.register(game.net.ResponseType.INTOROOMBACK, function(msg:IntoRoomBackMessage):void{
			//初始化房间model
			let model:RoomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
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
				model.addRoomer(roomer);
			}
			let uModel:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
			if (uModel.isTodayFirstLogin()) {
				//记录登录加载时长
				let tempTime = new Date().getTime() - game.util.LogUtil.timestamp;
				let content = {duration:tempTime};
				game.util.LogUtil.sendLogicalLog(game.util.LogEnum.INTO_ROOM_LOADING_TIME, content);
			}
		});
		//初始房间内鱼群
		game.net.MessageDispatcher.register(game.net.ResponseType.PONDFISHES, function(msg:PondFishesMessage):void {
			let model:RoomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
			let fishList:Array<any> = msg.getFishes();
			for (let i = 0; i < fishList.length; i++ ) {
				if (!model.isPathExist(fishList[i].pathId)) {
					let fish:game.model.Fish = new game.model.Fish();
					fish.fishId = fishList[i].fishId;
					fish.pathId = fishList[i].pathId;
					fish.fishType = fishList[i].type;
					fish.uniqId = fishList[i].uniId;
					fish.coord = new egret.Point(fishList[i].coordinate.xvalue, fishList[i].coordinate.yvalue);
					fish.aliveTime = Number(fishList[i].aliveTime);
					model.addRoomLiveFish(fish);
				}
			}
			game.util.UIUtil.startLoading();
			//进入房间
			let roomView:RoomView = new RoomView();
			let roomMed:RoomMediator = new RoomMediator(roomView);
			burn.Director.repleaceView(roomMed);
		});
	}

	/** 打开公告界面 */
	private openNoticeUI(obj:any, target:any):void {
		let noticeView = new NoticeView();
		let noticeMed = new NoticeMeditor(noticeView);
		burn.Director.pushView(noticeMed);
	}

	/** 过呢关系登录按钮状态 */
	private updateLoginBtn(obj:any, target:any):void {
		let view = target.getView() as LoginView;
		view.updateLoginBtnState(obj);
	}

	public destroy():void {
		this.getView().destroy();
		game.net.MessageDispatcher.unregister(game.net.ResponseType.LOGINBACK);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.REQUESTROOMBACK);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.PONDFISHES);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.INTOROOMBACK);
		this.unsubscribByType(NotifyEnum.OPEN_NOTICE_UI);
		this.unsubscribByType(NotifyEnum.UPDATE_LOGIN_BTN);
		RES.destroyRes("login_serverBg_png", false);
		RES.destroyRes("login_startBtn_png", false);
	}
}
