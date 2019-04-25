class GlobalManager {
	private static _instance: GlobalManager = null;
	private _isInit: boolean = false;

	public static isFirstOpenGame: boolean = true;
	/** 不同资源资源版本目录 */
	public static SkinPath: string = "fish_skins";

	public static BAN_TIPS: string = "您的帐号因违规操作，如有疑问请联系官方QQ群179830410";

	public static SERVER_CLOSED_TIPS: string = "服务器维护中，请稍后登录。";

	//炮台普通状态下的攻击频率
	public GUN_FRAME_TIME: number = 205;
	//主界面当前滑动到了第几个入口
	public MAIN_ENTR_IDX: number = 2;
	//心跳定时器
	private _heartTimer: egret.Timer;
	//LOG平台心跳
	private _logHeartTimer: egret.Timer;
	//玩家小喇叭消息集合
	public trumpetMsgList: Array<string>;
	//是否需要延时登录
	public bIsNeedDelayLogin: boolean;
	private constructor() {
		if (this._isInit) {
			throw (new burn.error.SimpleError(""));
		}
		this._isInit = true;
		this.bIsNeedDelayLogin = false;
	}

	public static getInstance(): GlobalManager {
		if (this._instance == null) {
			this._instance = new GlobalManager();
			//初始化全局管理类
			this._instance.init();
		}
		return this._instance;
	}

	public init(): void {
		//初始化消息集合
		this.trumpetMsgList = new Array<string>();
		//添加如假消息
		let fakeStr = game.table.T_Config_Table.getVoByKey(85);
		let fakeArr = fakeStr.value.split(",");
		let randomNum = Math.random() * 8 + 2;
		for (let i = 0; i < randomNum; i++) {
			let fakeArrLen = fakeArr.length - 1;
			let tempIdx = Math.random() * fakeArrLen;
			let ele = fakeArr.splice(tempIdx, 1);
			this.trumpetMsgList.push(game.util.Language.getText(Number(ele[0])));
		}
		///////////////////////////////////////////////
		let self = this;
		//服务器通用状态返回
		game.net.MessageDispatcher.register(game.net.ResponseType.COMMONSTATUS, function (msg: CommonStatusMessage): void {
			switch (msg.getStatus()) {
				case CommonEnum.RECONNECT:
					self.reconnect();
					break;
				case CommonEnum.RELOGIN:
					game.util.GameUtil.openConfirm(null, function (): void {
						GlobalManager.getInstance().reLogin();
					}, this, game.util.Language.getText(59));
					break;
				case CommonEnum.LOGIN_FAIL:
					game.util.GameUtil.openConfirm(null, null, this, game.util.Language.getText(64));
					break;
				case CommonEnum.REPLACED:
					game.util.GameUtil.openConfirm(null, null, this, game.util.Language.getText(59));
					GlobalManager.getInstance().reLogin();
					break;
				case CommonEnum.ACCOUNT_BAN:
					game.util.GameUtil.openConfirm(null, null, this, GlobalManager.BAN_TIPS);
					break;
				case CommonEnum.DALAY_LOGIN:
					GlobalManager.getInstance().bIsNeedDelayLogin = true;
					setTimeout(function(){
						if(!GlobalManager.getInstance().bIsNeedDelayLogin){
							return;
						}
						let req = new LoginSendMessage();
						req.initData();
						req.setId(CONFIG.USER_ID);
						req.setAccount(CONFIG.ACCOUNT);
						req.setPlatform(CONFIG.PLATFORM_ID);
						req.setSecret(CONFIG.USER_SECRET);
						NetManager.send(req);
					}, 1000);
					break;
			}
		});
		// game.net.MessageDispatcher.register(game.net.ResponseType.LOGINBACK, function(msg:LoginBackMessage):void{});
		//监听玩家主要数据变化
		game.net.MessageDispatcher.register(game.net.ResponseType.MAJORPARAMETERCHANGE, function (msg: MajorParameterChangeMessage): void {
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			let userId = Number(msg.getUserId());
			let coins = Number(msg.getCoins());
			let money = Number(msg.getGems());
			if (userId == userModel.getUserId()) {
				let level = Number(msg.getLevel());
				if (msg.getCoins() != null) {
					userModel.setCoins(coins);
					burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: userId });
				}
				if (msg.getGems() != null) {
					userModel.setMoney(money);
					burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userId });
				}
				let coupon = msg.getCoupon();
				if (coupon != null) {
					userModel.setTicket(coupon);
				}
				if (level) {
					userModel.setLevel(level);
				}
				let items = msg.getItem() as Array<any>;
				let len = items.length;
				for (let i = 0; i < len; i++) {
					let vo = game.table.T_Item_Table.getVoByKey(Number(items[i].itemId));
					let time = 0;
					if (vo.type == BagItemType.BARBETTE
						|| vo.type == BagItemType.BATTERY) {
						time = items[i].expried;
					}
					userModel.updateItem(items[i].itemId, items[i].totalCount, time);
					//发消息同步
					let id = items[i].itemId;
					if (id == PropEnum.CALABASH
						|| id == PropEnum.CLONE
						|| id == PropEnum.RAGE
						|| id == PropEnum.FREE_RAGE
						|| id == PropEnum.FREE_CLONE
						|| id == PropEnum.FROZEN
						|| id == PropEnum.LOCK
						|| id == PropEnum.GOLD_WARHEAD
						|| id == PropEnum.SILVER_WARHEAD
						|| id == PropEnum.BRONZE_WARHEAD
						|| id == PropEnum.NUCLEAR_WARHEAD) {
						burn._Notification_.send(NotifyEnum.SET_PROP_NUM);
					}
				}
				burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
			} else {
				let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
				let roomer = roomModel.getRoomerById(userId);
				if (!roomer) {
					return;
				}
				if (coins) {
					roomer.setCoins(coins);
					burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: userId });
					burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
				}
				if (money) {
					roomer.setMoney(money);
					burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userId });
					burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
				}
			}
		});
		//监听救济金状态
		game.net.MessageDispatcher.register(game.net.ResponseType.BANKRUPT, function (msg: BankruptMessage): void {
			let status = Number(msg.getState());
			let uId = Number(msg.getUserId());
			if (status == BankruptStauts.BANKRUPT) {
				burn._Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, { status: status, userId: uId, time: Number(msg.getCanReliefTime()) });
			} else if (status == BankruptStauts.STATE_RESUME) {
				burn._Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, { status: status, userId: uId });
			} else if (status == BankruptStauts.GET_SUCC) {
				burn._Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, { status: status, userId: uId, coins: Number(msg.getCoins()) });
			} else if (status == BankruptStauts.GET_LIMIT) {
				burn._Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, { status: status, userId: uId });
			} else if (status == BankruptStauts.NOT_TO_TIME) {
				burn._Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, { status: status, userId: uId, time: Number(msg.getCanReliefTime()) });
			}
		});
		//监听服务器通知：跑马灯		世界广播 > 兑奖消息 > 分享消息 > 打死高倍鱼 > 获得鱼券
		game.net.MessageDispatcher.register(game.net.ResponseType.GCBROADCASTMESSAGEBACK, function (msg: GCBroadcastMessageBackMessage): void {
			let broadcastList = msg.getMessageList() as Array<any>;
			let hallList = new Array<string>();
			for (let broadVo of broadcastList) {
				let broadType = broadVo.broadType;
				let txt = broadVo.msg;
				let langId = broadVo.langId;
				let msgType:number = broadVo.priority;
				let param: Array<string> = broadVo.params as Array<string>;
				if (broadType == BroadType.NewsActive) {			//活动广告
					if (txt) {
						hallList.push(txt);
					} else {
						let lan = game.util.Language.getDynamicText(langId, param);
						hallList.push(lan);
					}
				} else if (broadType == BroadType.NewsFishing) {	//房间捕鱼消息
					if (txt) {
						game.util.GCBroadcastManager.addRoomBroadcast(txt, broadType);
					} else {
						let lan = game.util.Language.getDynamicText(langId, param);
						game.util.GCBroadcastManager.addRoomBroadcast(lan, broadType, msgType);
					}
				} else if (broadType == BroadType.NewsWorld) {		//小喇叭消息
					if (txt) {
						game.util.GCBroadcastManager.addRoomBroadcast(txt, broadType);
						if (self.trumpetMsgList.length > 20) {
							self.trumpetMsgList.shift();
						}
						self.trumpetMsgList.unshift(txt);
					}
				}
			}
			if (hallList.length > 0) {
				game.util.GCBroadcastManager.addHallBroadcast(hallList);
			}
		});
		//监听任务变更
		game.net.MessageDispatcher.register(game.net.ResponseType.TASKPARAMETERCHANGE, function (msg: TaskParameterChangeMessage): void {
			let changeTaskList = msg.getChangedTasks() as Array<any>;
			let taskModel: TaskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
			let len = changeTaskList.length;
			let isFindPrix = false;
			let isPriceTask = false;
			for (let i = 0; i < len; i++) {
				let id = changeTaskList[i].taskId;
				let state = changeTaskList[i].taskStatus;
				let value = changeTaskList[i].curParameterValue;
				taskModel.updateItem(id, state, value);
				let vo = game.table.T_FishTaskItem_Table.getVoByKey(Number(id));
				if (vo && vo.type == TaskType.TASK_TYPE_NEWBIE) {
					burn._Notification_.send(NotifyEnum.TASK_GUIDE_CHANGE);
				} else if (vo && vo.type == TaskType.TASK_TYPE_GRAND_PRIX) {
					isFindPrix = true;
				} else if (vo && vo.type == TaskType.TASK_TYPE_PRICE) {
					isPriceTask = true;
					if (msg.getPirateTaskEndTime() != null) {
						let comTime = Number(msg.getPirateTaskEndTime());
						taskModel.updateItem(id, state, value, comTime);
					}
				} else {
					burn._Notification_.send(NotifyEnum.TASK_ACT_CHANGE);
				}
			}
			//大奖赛数据设置完成
			if (isFindPrix) {
				let taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX);
				burn._Notification_.send(NotifyEnum.DJS_TASK_CHANGE, { times: msg.getArenaTaskTimes() });
			}
			//悬赏任务
			if (isPriceTask) {
				burn._Notification_.send(NotifyEnum.PRICE_TASK_CHANGE);
			}
		});
		//监听VIP更改
		game.net.MessageDispatcher.register(game.net.ResponseType.VIPLEVELUP, function (msg: VipLevelUpMessage): void {
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			userModel.setVipLevel(Number(msg.getNewLevel()));
		});

		//房间人数变化
		game.net.MessageDispatcher.register(game.net.ResponseType.ROOMONLINEMESSAGE, function (msg: RoomOnlineMessageMessage): void {
			let list: Array<RoomOnlineInfoMessage> = msg.getOnlineList();
			let len = list.length;
			let arr = new Array<number>();
			arr.push(1);
			arr.push(1);
			arr.push(1);
			for (let i = 0; i < len; i++) {
				let item = list[i];
				let roomType = item.getRoomType();
				let num = item.getNum();
				arr[roomType - 2] = num;
			}
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			userModel.setRoomOnLine(arr);
			burn._Notification_.send(NotifyEnum.REFRES_ROOM_ONLINE);
		});

		//活动信息
		game.net.MessageDispatcher.register(game.net.ResponseType.ACTIVECONFIGMESSAGESBACK, function (msg: ActiveConfigMessagesBackMessage): void {
			let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
			activeModel.setData(msg);
			burn._Notification_.send(NotifyEnum.ACTIVE_CONFIG_DATA_LOAEDED);
		});
		//初始化子渠道数据
		this.initSubPlatformData();
	}

	private _subsMap:burn.util.Map;
	/**
	 * 初始化子渠道数据
	 */
	private initSubPlatformData():void {
		this._subsMap = new burn.util.Map();
		let vo = game.table.T_Config_Table.getVoByKey(94);
		let subs = vo.value.split(",");
		for (let sub of subs) {
			let data = sub.split("_");
			let subId = Number(data[0]);
			let key = data[1];
			this._subsMap.put(subId, key);
		}
	}

	/**
	 * 根据子渠道id获取热云appkey
	 */
	public getKeyBySubId(id:number):string {
		if(CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG || CONFIG.PLATFORM_ID == PlatformTypeEnum.ZI_YOU){
			return CONFIG.logAppID;
		}
		if (this._subsMap.contains(id)) {
			return this._subsMap.get(id);
		} else {
			return CONFIG.logAppID;
		}
	}

	//开始发送心跳轮询
	public startHeartbeat(): void {
		//心跳协议轮询
		this._heartTimer = new egret.Timer(1000 * 60, 0);
		this._heartTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this._heartTimer.start();
	}

	public startLogHeartBeat(): void {
		//心跳协议轮询
		this._logHeartTimer = new egret.Timer(1000 * 5, 0);
		this._logHeartTimer.addEventListener(egret.TimerEvent.TIMER, this.logTimerFunc, this);
		this._logHeartTimer.start();
	}

	//心跳函数
	private timerFunc(): void {
		let req: HeartbeatMessage = new HeartbeatMessage();
		req.initData();
		NetManager.send(req);
	}

	//心跳函数
	private logTimerFunc(): void {
		game.util.ReyunUtil.heartbeat();
	}

	/** 初始化服务器时间 */
	public setServerTime(time: number): void {
		// GlobalManager.SERVER_TIME_STAMP = time;
		game.util.TimeUtil.initServerTime(time);
	}

	/** 断线重连 */
	private reconnect(): void {
		let view: FishMainView = new FishMainView();
		let med: FishMainMediator = new FishMainMediator(view);
		burn.Director.repleaceView(med);
	}

	/** 清除所有数据 */
	public clearAllGameData(): void {
		//清除所有消息通知
		burn._Notification_.removeAll();
		//清除所有消息协议
		game.net.MessageDispatcher.removeAll();
		//清除所有Model
		burn.Director.clearAllModel();
		//清除Global
		this._heartTimer && this._heartTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this._logHeartTimer && this._logHeartTimer.addEventListener(egret.TimerEvent.TIMER, this.logTimerFunc, this);
		this._isInit = false;
		GlobalManager._instance = null;
	}

	/** 重新登录 */
	public reLogin(auto: boolean = false): void {
		//清除数据
		this.clearAllGameData();
		//切换登录
		let loginView: LoginView = new LoginView();
		let loginMed: LoginMediator = new LoginMediator(loginView);
		burn.Director.repleaceView(loginMed);
	}

	/** 添加重连 */
	public addReconnectListener(): void {
		game.net.MessageDispatcher.register(game.net.ResponseType.LOGINBACK, function (msg: LoginBackMessage): void {
			GlobalManager.getInstance().bIsNeedDelayLogin = false;
			let model: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
			model.setUserId(msg.getId());
			model.setMoney(msg.getGems());
			model.setCoins(msg.getCoins());
			model.setCurGunID(msg.getMaxGunId());
			model.setBankruptTime(msg.getCanReliefTime());
			model.setTodayFirstLogin(msg.getIsTodayFirstLogin());

			let chargedGearsMsg = msg.getChargedGears() as Array<number>;
			if (chargedGearsMsg.length > 0) {
				let len = chargedGearsMsg.length;
				for (let i = 0; i < len; i++) {
					model.addChargedGears(Number(chargedGearsMsg[i]));
				}
			}

			//初始化人物信息
			let lv = msg.getRoleLevel();
			let exp = msg.getRoleExp();
			let vipLv = msg.getVipLevel();
			model.setLevel(Number(lv));
			model.setExp(Number(exp));
			model.setVipLevel(vipLv);

			//初始化服务器时间戳
			GlobalManager.getInstance().setServerTime(Number(msg.getSystemTime()));
			//回到大厅
			let view: FishMainView = new FishMainView();
			let med: FishMainMediator = new FishMainMediator(view);
			burn.Director.repleaceView(med);
			//清理房间内的数据
			let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
			roomModel.clearRoom();
		});
	}

	public initUserData(msg: LoginBackMessage): void {
		let model: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
		model.init();
		model.setUserId(msg.getId());
		model.setUserName(msg.getName());
		model.setHeadUrl(msg.getIconUrl());
		model.setMoney(msg.getGems());
		model.setCoins(msg.getCoins());
		model.setTicket(msg.getCoupon());
		model.setCurGunID(msg.getMaxGunId());
		model.setBankruptTime(msg.getCanReliefTime());
		model.setEverydayActive(msg.getEverydayActive());
		model.setEveryWeekActive(msg.getEveryWeekActive());
		model.setGuideID(msg.getNewbieGuideId());
		model.setCurSkinId(msg.getBatterySkinId());
		model.setCurGunBgId(msg.getGunrestSkinId());
		model.setTatolChargeRMB(msg.getTotalChargeRMB());
		model.setMonthEndTime(msg.getMonthEndTime());
		model.setTodayFirstLogin(msg.getIsTodayFirstLogin());
		model.setSignObj(msg.getMonthSignActiveInfo());
		model.setIsTodayDraw(msg.getIsTodayDraw());
		model.setInviteCode(msg.getSelfInviteCode());
		//处理充值项
		let chargedGearsMsg = msg.getChargedGears() as Array<number>;
		if (chargedGearsMsg.length > 0) {
			let len = chargedGearsMsg.length;
			for (let i = 0; i < len; i++) {
				model.addChargedGears(Number(chargedGearsMsg[i]));
			}
		}
		//处理兑换项
		let exchangedGears = msg.getExchangedGears();
		for (let eVo of exchangedGears) {
			model.addExchangeGears(eVo);
		}

		let activeInfo = msg.getActiveInfo();
		let conVo = game.table.T_Config_Table.getVoByKey(79);
		let shareTime = Number(conVo.value) - activeInfo.getShareTimes();
		if (shareTime < 0) {
			shareTime = 0;
		}
		model.setShareTimes(shareTime);
		model.setIsFocusFlag(activeInfo.getFocusFlag() == 1);

		if (msg.getNextDayAwardActiveInfo()) {
			model.setCiriState(msg.getNextDayAwardActiveInfo().nextDayAwardState);
		}

		//初始化服务器时间戳
		GlobalManager.getInstance().setServerTime(Number(msg.getSystemTime()));
		//开始心跳
		GlobalManager.getInstance().startHeartbeat();
		//开始日志平台心跳
		GlobalManager.getInstance().startLogHeartBeat();
		//初始化物品列表
		let items: Array<any> = msg.getItemInfo();
		for (let i = 0; i < items.length; i++) {
			let itemId = items[i].itemId;
			let count = items[i].totalCount;
			let vo = game.table.T_Item_Table.getVoByKey(Number(itemId));
			let time = 0;
			if (vo.type == BagItemType.BARBETTE
				|| vo.type == BagItemType.BATTERY) {
				time = items[i].expried;
			}
			let item = new game.model.Item(itemId, count, time);
			model.addItem(item);
		}
		//初始化Email列表
		let mailItems = msg.getMailListByType();
		let emailModel: EmailModel = burn.Director.getModelByKey(EmailModel) as EmailModel;
		emailModel.init();
		for (let i = 0; i < mailItems.length; i++) {
			let dataObj = mailItems[i].getMails();
			for (let j = 0; j < dataObj.length; j++) {
				let data = dataObj[j];
				let emailItem = new game.model.EmailItem(data.getMailId(), data.getMailType(), data.getUserId(), data.getReceiveUserName(),
					data.getSendUserId(), data.getSendUserName(), data.getItems(), data.getTime(),
					data.getState(), data.getMailContent(), data.getMailTitle());
				emailModel.addItem(emailItem);
			}
		}
		//初始化人物信息
		let lv = msg.getRoleLevel();
		let exp = msg.getRoleExp();
		let vipLv = msg.getVipLevel();
		model.setLevel(Number(lv));
		model.setExp(Number(exp));
		model.setVipLevel(vipLv);
		//初始化人物信息
		let tasks = msg.getTaskInfo() as Array<any>;
		let taskModel: TaskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
		taskModel.init();
		let taskLen = tasks.length;
		for (let i = 0; i < taskLen; i++) {
			let obj = tasks[i];
			let taskItem = new game.model.TaskItem(obj.taskId, obj.taskStatus, obj.curParameterValue);
			taskModel.addItem(taskItem);
		}
		
		if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET) {
			burn.net.HttpManager.init("http://gamecenter.combunet.com/LoginServer/weixinShare.action", egret.HttpResponseType.TEXT, egret.HttpMethod.GET,
				function (httpResp) {
					let model: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
					var resp = JSON.parse(httpResp);
					game.platform.PaymentManager.WXConfig(Number(resp.timestamp), resp.noncestr, resp.signature, model.getInviteCode());
				}, function () {
				});
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			var url = window.location.href;
			let urls = url.split("?");
			burn.net.HttpManager.addParam("url", url);
			burn.net.HttpManager.send();
		}
		
		if(CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG){
			burn.net.HttpManager.init("http://gamecenter.combunet.com/LoginServer4yiwantang/weixinShare.action", egret.HttpResponseType.TEXT, egret.HttpMethod.GET,
				function (httpResp) {
					let model: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
					var resp = JSON.parse(httpResp);
					game.platform.PaymentManager.WXConfig(Number(resp.timestamp), resp.noncestr, resp.signature, model.getInviteCode());
				}, function () {
				});
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			var url:string = window["FISHING_CONFIG"]["curURL"];
			burn.net.HttpManager.addParam("url", url);
			burn.net.HttpManager.send();
		}

		//清空房间属性
		let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
		roomModel.init();

		//清空活动属性
		let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
		activeModel.init();

		//清空兑换属性
		let exchangeModel = burn.Director.getModelByKey(ExchangeModel) as ExchangeModel;
		exchangeModel.init();

		//清空抽奖属性
		let lotterModel = burn.Director.getModelByKey(LotteryModel) as LotteryModel;
		lotterModel.init();
	}

	/** 重新连接服务器 */
	public reConnect2Server(): void {
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let req = new LoginSendMessage();
		req.initData();
		req.setId(userModel.getUserId());
		req.setAccount(CONFIG.ACCOUNT);
		req.setPlatform(CONFIG.PLATFORM_ID);
		req.setSecret(CONFIG.USER_SECRET);
		NetManager.send(req);
	}
}