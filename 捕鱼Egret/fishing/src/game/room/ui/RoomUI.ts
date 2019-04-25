class RoomUI extends eui.Component {
	//查看板子相关
	public chakanUI:ChakanPanelUI;
	private bShowChakan:boolean;
	public nChakanPos:number;
	/**位置 */
	public posEff_0:eui.Group;
	public posEff_1:eui.Group;
	public posEff_2:eui.Group;
	public posEff_3:eui.Group;

	public posEff_4:eui.Group;
	public posEff_5:eui.Group;
	public posEff_6:eui.Group;
	public posEff_7:eui.Group;
	/** 炮座 */
	public zuoGroup_0:eui.Group;
	public zuoGroup_1:eui.Group;
	public zuoGroup_2:eui.Group;
	public zuoGroup_3:eui.Group;
	public zuoList:Array<eui.Group>;
	/** 炮口调优 */
	//炮口位置0普通炮
	public groupGun_0:eui.Group;
	//分身炮的坐标点
	public groupGun_0_1:eui.Group;
	public groupGun_0_2:eui.Group;
	public groupGun_0_3:eui.Group;
	//炮口位置1普通炮
	public groupGun_1:eui.Group;
	//分身炮的坐标点
	public groupGun_1_1:eui.Group;
	public groupGun_1_2:eui.Group;
	public groupGun_1_3:eui.Group;
	//炮口位置2普通炮
	public groupGun_2:eui.Group;
	//分身炮的坐标点
	public groupGun_2_1:eui.Group;
	public groupGun_2_2:eui.Group;
	public groupGun_2_3:eui.Group;
	//炮口位置3普通炮
	public groupGun_3:eui.Group;
	//分身炮的坐标点
	public groupGun_3_1:eui.Group;
	public groupGun_3_2:eui.Group;
	public groupGun_3_3:eui.Group;

	//炮台集合
	public gunList:Array<GunTempleUI>;
	public gunList_0:GunTempleUI;
	public gunList_1:GunTempleUI;
	public gunList_2:GunTempleUI;
	public gunList_3:GunTempleUI;

	//分身炮的集合
	public avatarGunList:Array<Array<GunTempleUI>>;
	//分身炮
	public gun_0_1:GunTempleUI;
	public gun_0_2:GunTempleUI;
	public gun_0_3:GunTempleUI;
	public gun_1_1:GunTempleUI;
	public gun_1_2:GunTempleUI;
	public gun_1_3:GunTempleUI;
	public gun_2_1:GunTempleUI;
	public gun_2_2:GunTempleUI;
	public gun_2_3:GunTempleUI;
	public gun_3_1:GunTempleUI;
	public gun_3_2:GunTempleUI;
	public gun_3_3:GunTempleUI;

	///////////////////////////炮口调优/////////////////////////////
	//特效
	public imageGunTe_0:eui.Group;
	public imageGunXiao_0:eui.Image;
	
	public waiting_0:eui.Image;
	public waiting_1:eui.Image;
	public waiting_2:eui.Image;
	public waiting_3:eui.Image;

	/** 炮台组 */
	public gold_eff_1:eui.Group;
	public gold_eff_2:eui.Group;
	public gold_eff_3:eui.Group;
	public gold_eff_0:eui.Group;
	public group_0:eui.Group;
	public goldLab_0:eui.Group;
	public gemLab_0:eui.Group;
	public goldLab_num_0:egret.BitmapText;
	public gemLab_num_0:egret.BitmapText;
	public group_1:eui.Group;
	public goldLab_1:eui.Group;
	public gemLab_1:eui.Group;
	public goldLab_num_1:egret.BitmapText;
	public gemLab_num_1:egret.BitmapText;
	public group_2:eui.Group;
	public goldLab_2:eui.Group;
	public gemLab_2:eui.Group;
	public goldLab_num_2:egret.BitmapText;
	public gemLab_num_2:egret.BitmapText;
	public group_3:eui.Group;
	public goldLab_3:eui.Group;
	public gemLab_3:eui.Group;
	public goldLab_num_3:egret.BitmapText;
	public gemLab_num_3:egret.BitmapText;

	/** 炮台倍率显示 */
	public rateLab_0:eui.Group;
	public rateLab_1:eui.Group;
	public rateLab_2:eui.Group;
	public rateLab_3:eui.Group;
	public rageLab_num_0:egret.BitmapText;
	public rageLab_num_1:egret.BitmapText;
	public rageLab_num_2:egret.BitmapText;
	public rageLab_num_3:egret.BitmapText;
	
	/** 退出房间 */
	public backBtn:eui.Button;
	/** 金币数量 */
	public goldLab:eui.Label;
	/** 钻石数量 */
	public gemLab:eui.Label;
	/** 倍率的标签 */
	public rateLab:eui.Label;
	/** 加倍率 */
	public addRateBtn_0:eui.Button;
	public addRateBtn_1:eui.Button;
	/** 减倍率 */
	public reduceRateBtn_0:eui.Button;
	public reduceRateBtn_1:eui.Button;

	public sound_off:eui.Image;
	public music_off:eui.Image;
	/** 背景音乐按钮 */
	public bgMusicBtn:eui.Button;
	/** 音效按钮 */
	public soundEffectBtn:eui.Button;
	/**商城按钮 */
	public shopBtn:eui.Button;
	/** 解锁炮倍按钮 */
	public unlockBtn:eui.Button;
	/** 兑换按钮 */
	public exchangeBtn:eui.Button;
	/** 获取金币按钮 */
	public getCoinsBtn:eui.Button;
	/** 奖金鱼抽奖按钮 */
	public lotteryBtn:eui.Button;
	/** 公告喇叭按钮 */
	public trumpetBtn:eui.Button;
	/** 点击开始抽奖 */
	public lottery_tips:eui.Label;
	/** 奖金标题 */
	public jiangjinyu_txt:eui.Label;
	/** 奖金数量文本背景 */
	public jjy_txt_bg:eui.Image;

	/** 加载错误次数 */
	public loadErrorCount:number = 0;
	//抽奖小面板
	public lotteryGroup:eui.Group;
	//抽奖小面板是否打开
	private _lotteryIsOpen:boolean;
	//抽奖小面板 击杀奖金鱼数量
	public fishCountGroup:eui.Group;
	//抽奖小面板 奖金数量
	public bounsGroup:eui.Group;
	//抽奖小面板 击杀奖金鱼数量
	public fishCountTxt:egret.BitmapText;
	//抽奖小面板 奖金数量
	public bounsTxt:egret.BitmapText;
	//解锁炮倍面板
	public unlockGunGroup:eui.Group;

	//世界boss的按钮
	public bossBtn:eui.Button;

	//弹头横幅是否展开
	public warHeadGroupIsClose:boolean;
	//弹头弹开的开关
	public openWarHeadBtn:eui.Button;

	/** 弹头UI的pos坐标 */
	public warGroupPos:eui.Group;
	/** 弹头UI */
	private warUI:WarView;
	/** 黄金弹头 */
	public goldGroup:eui.Group;
	/** 白银弹头 */
	public silverGroup:eui.Group;
	/** 青铜弹头 */
	public bronzeGroup:eui.Group;
	/** 核弹头 */
	public nuclearGroup:eui.Group;
	/** 黄金弹头 */
	public goldBulletBtn:NewProgresButton = null;
	/** 白银弹头 */
	public silverBulletBtn:NewProgresButton = null;
	/** 青铜弹头 */
	public bronzeBulletBtn:NewProgresButton = null;
	/** 核弹头 */
	public nuclearBulletBtn:NewProgresButton = null;

	//功能收缩横幅
	public shrinkGroup:eui.Group;
	//功能伸缩按钮
	public shrinkBtn:eui.Button;
	public shrinkBackBtn:eui.Image;
	//功能横幅是否展开
	private _shrinkGroupIsOpen:boolean;

	//功能横幅展示中的第一个鱼种按钮
	private fishkindBtn:eui.Button;
	//按钮封装对象集合
	protected btnWrapList:Array<burn.tools.UIWrap>;

	//冰冻和锁定ui
	private _frozenAndLockUI:FrozenAndLockUI;
	//侧边道具栏ui
	private _sidePropUI:SidePropUI;
	//炮倍解锁的UI
	private _unlockGunUpdateUI:UnlockGunUpdateUI;
	//新手任务的板子
	private _guideTaskUI:GuideTaskUI;
	public guideTaskGroup:eui.Group;
	//玩家四个标准位置，用于播放特效等
	public pos_0:eui.Group;
	public pos_1:eui.Group;
	public pos_2:eui.Group;
	public pos_3:eui.Group;

	public cache_group_0:eui.Group;
	public cache_group_1:eui.Group;
	public cache_group_2:eui.Group;
	public cache_group_3:eui.Group;

	//破产倒计时UI
	private _bankruptView:BankruptView;

	//按钮后背特效
	public effect_Arena:eui.Group;
	public effect_Gold:eui.Group;

	//兑换相关
	public exchangeGroup:eui.Group;
	public exchangeName:eui.Label;
	public exchangeNum:eui.Group;
	private _bIsShowExchange:boolean;
	private txtExchangeNum:egret.BitmapText;

	//已经打开过界面
	public _bOpenSignView:boolean = false;
	//次日礼包
	public ciriGroup:eui.Group;
	//凤凰UI
	public shieldGroup:eui.Group;
	public shieldUI:PhoenixShield;
	public shieldTips:PhoenixTop;

	//悬赏任务
	public priceTaskUI:PriceTaskUI;
	//排行
	public priceRankUI:PriceTaskRankUI

	public bossTopGroup:eui.Group;
	//兑奖中
	public exchange_0:eui.Group;
	public exchange_1:eui.Group;
	public exchange_2:eui.Group;
	public exchange_3:eui.Group;
	public constructor(clazz:any) {
		super();
		this._bOpenSignView = false;
		this.skinName = clazz;
		this.anchorOffsetX = CONFIG.contentWidth/2;
		this.anchorOffsetY = 740/2;
		this.x = egret.MainContext.instance.stage.stageWidth/2;
		this.y = egret.MainContext.instance.stage.stageHeight/2;

		//添加按钮特效
		let ef_button = new egret.Bitmap(RES.getRes("ef_rotation_bg_png"));
		burn.tools.TweenTools.rotation(ef_button, 10000);
		ef_button.anchorOffsetX = ef_button.width/2;
		ef_button.anchorOffsetY = ef_button.height/2;
		this.effect_Arena.addChild(ef_button);
		let ef_button1 = new egret.Bitmap(RES.getRes("ef_rotation_bg_png"));
		burn.tools.TweenTools.rotation(ef_button1, 10000);
		ef_button1.anchorOffsetX = ef_button1.width/2;
		ef_button1.anchorOffsetY = ef_button1.height/2;
		this.effect_Gold.addChild(ef_button1);

		this.btnWrapList = new Array();
		
		//默认炮台隐藏
		this.setGunVisableByPos(RoomPosEnum.GUN_POS_0, false);
		this.setGunVisableByPos(RoomPosEnum.GUN_POS_1, false);
		this.setGunVisableByPos(RoomPosEnum.GUN_POS_2, false);
		this.setGunVisableByPos(RoomPosEnum.GUN_POS_3, false);

		//修改炮台位置
		this.reviseGun();

		//倍率调整
		this.addRateBtn_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.modifRate, this);
		this.addRateBtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.modifRate, this);
		this.reduceRateBtn_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.modifRate, this);
		this.reduceRateBtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.modifRate, this);
		
		//退出房间
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exitRoom, this);
		// 背景音乐
		this.bgMusicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgMusic, this);
		// 音效按钮
		this.soundEffectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.soundEffect, this);
		
		this.sound_off.visible = !game.util.SoundManager.getSoundEffectState();
		this.music_off.visible = !game.util.SoundManager.getBackgroundMusicState();

		//奖金鱼抽奖按钮默认隐藏，等待资源加载结束后显示
		this.lotteryBtn.visible = false;
		this.lotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openLotteryGroup, this);
		this.lotteryGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openLotteryView, this);
		this.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openShopView, this);
		this.getCoinsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getCoins, this);
		this.exchangeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exchange, this);
		this.trumpetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.trumpet, this);

		//为按钮增加按下状态
		this.btnWrapList.push(new burn.tools.UIWrap(this.trumpetBtn));
		this.btnWrapList.push(new burn.tools.UIWrap(this.lotteryBtn));
		this.btnWrapList.push(new burn.tools.UIWrap(this.unlockBtn));
		this.btnWrapList.push(new burn.tools.UIWrap(this.exchangeBtn));
		this.btnWrapList.push(new burn.tools.UIWrap(this.getCoinsBtn));
		this.btnWrapList.push(new burn.tools.UIWrap(this.backBtn));
		this.btnWrapList.push(new burn.tools.UIWrap(this.bgMusicBtn));
		this.btnWrapList.push(new burn.tools.UIWrap(this.soundEffectBtn));
		this.btnWrapList.push(new burn.tools.UIWrap(this.shopBtn));
		this.btnWrapList.push(new burn.tools.UIWrap(this.fishkindBtn));
		this.btnWrapList.push(new burn.tools.UIWrap(this.addRateBtn_0));
		this.btnWrapList.push(new burn.tools.UIWrap(this.addRateBtn_1));
		this.btnWrapList.push(new burn.tools.UIWrap(this.reduceRateBtn_0));
		this.btnWrapList.push(new burn.tools.UIWrap(this.reduceRateBtn_1));
		
		//添加炮倍的美术字
		this.initRateLab();

		//开始加载抽奖UI
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.loadGroup("lottery");

		//加载侧边道具栏
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/SideProp.exml", this.loadSideProp, this);
		//加载冰冻和锁定UI
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/FrozenAndLock.exml", this.frozenAndLock, this);
		//加载解锁炮倍UI
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/UnlockGunGroup.exml", this.unlockGunUpdate, this);
		//加载炮台资源
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Gun.exml", this.gunTemp, this);
		//加载War资源
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/WarGroup.exml", this.warLoaded, this);
		//加载chakanUI资源
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/ChakanPanel.exml", this.chakanLoaded,this);

		this.setExchange();

        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let gunRate = userModel.getCurGunID();
		let gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
		//判断有没有下一个炮倍
		if (gunRateVo) {
			let arr = gunRateVo.upgradeOrForgeCost;
			let arrData = arr.split(",");
			if (arrData.length > 1) {
				this.setHideUnlock();
			}
		}
		if (!CONFIG.openGuide) {
			this.addGuideTask();
			return ;
		}
		let guideOver = game.table.T_Config_Table.getVoByKey(49).value;
		let curID = userModel.getGuideID();
		let strOver = guideOver.split(",");
		for (let i = 0; i < strOver.length; i++) {
			if (curID >= Number(strOver[i])) {
				this.addGuideTask();
				return;
			}
		}
		let unLock = game.table.T_Config_Table.getVoByKey(46).value;
		let strUnlock = unLock.split(",");
		for (let i = 0; i < strUnlock.length; i++) {
			let param = strUnlock[i].split("_");
			if (curID >= Number(param[0]) && curID <= Number(param[1])) {
				this.unlockGunGroup.visible = false;
			}
		}
		let unLottery = game.table.T_Config_Table.getVoByKey(50).value;
		let strUnLottery = unLottery.split(",");
		for (let i = 0; i < strUnLottery.length; i++) {
			let param1 = strUnLottery[i].split("_");
			if (curID >= Number(param1[0]) && curID <= Number(param1[1])) {
				this.lotteryGroup.visible = false;
			}
		}
		let guideTaskHide = game.table.T_Config_Table.getVoByKey(48).value;
		let strGuideTaskHide = guideTaskHide.split(",");
		for (let i = 0; i < strGuideTaskHide.length; i++) {
			let param2 = strGuideTaskHide[i].split("_");
			if (curID >= Number(param2[0]) && curID <= Number(param2[1])) {
				this.addGuideTask();
			}
		}
	}
	public addGuideTask():void {
		//加载GuideTask
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/task/TaskGuide.exml", this.guideTaskLoaded,this);
		game.util.Guide.isOpentask = true;
	}
	private guideTaskLoaded(clazz:any, url:string):void {
        let taskModel:TaskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
        let task = taskModel.getTaskListByType(TaskType.TASK_TYPE_NEWBIE);
        let taskPrice = taskModel.getTaskListByType(TaskType.TASK_TYPE_PRICE);
		if (taskPrice.length > 0) {
			return;
		}
		this._guideTaskUI = new GuideTaskUI();
		this._guideTaskUI.anchorOffsetX = this._guideTaskUI.width/2;
		this._guideTaskUI.anchorOffsetY = 0;
		this.guideTaskGroup.addChild(this._guideTaskUI);
		//this.guideTaskGroup.visible = false;
		burn._Notification_.send(NotifyEnum.TASK_GUIDE_PANEL_LOADED);
	}
	private chakanLoaded(clazz:any, url:string):void {
		this.chakanUI = new ChakanPanelUI();
		this.chakanUI.anchorOffsetX = this.chakanUI.width/2;
		this.chakanUI.anchorOffsetY = this.chakanUI.height;
		this.chakanUI.x = -500;
		this.chakanUI.y = -500;
		this.addChild(this.chakanUI);
		this.bShowChakan = false;
	}
	//加载炮台资源
	private warLoaded(clazz:any, url:string):void {
		this.warUI = new WarView();
		this.warUI.anchorOffsetX = this.warUI.width;
		this.warUI.anchorOffsetY = this.warUI.height/2;
		this.warGroupPos.addChild(this.warUI);
		//this.warUI.cacheAsBitmap = true;
		/** 黄金弹头 */
		this.goldGroup = this.warUI.goldBulletGroup;
		/** 白银弹头 */
		this.silverGroup = this.warUI.silverBulletGroup;
		/** 青铜弹头 */
		this.bronzeGroup = this.warUI.bronzeBulletGroup;
		/** 核弹头 */
		this.nuclearGroup = this.warUI.nuclearBulletGroup;

		this.warUI.closeWarGroupBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseWarHead, this);
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/newProgressButton.exml", this.loadedButton, this);
	}
	private loadedButton(clazz:any, url:string):void {
		this.goldBulletBtn = new NewProgresButton(clazz, "goldWarBtn");
		this.goldBulletBtn.setButtonClickFun(function() {
			burn._Notification_.send(NotifyEnum.USE_WARHEAD, PropEnum.GOLD_WARHEAD);
		});
		let w_vo = game.table.T_Config_Table.getVoByKey(86);
		let w_time = 20;
		if (w_vo) {
			w_time = Number(w_vo.value);
		}

		this.goldBulletBtn.setIcon("goldWarBtn_png");
		this.goldBulletBtn.setTypeWar();
		this.goldBulletBtn.setTimeTotal(w_time);

		let goldVo = game.table.T_Item_Table.getVoByKey(PropEnum.GOLD_WARHEAD);
		let str = goldVo.worth.split('_')[2];
		this.goldBulletBtn.setGemCost(str);
		
		this.goldBulletBtn.anchorOffsetX = this.goldBulletBtn.width/2;
		this.goldBulletBtn.anchorOffsetY = this.goldBulletBtn.height/2;
		this.goldGroup.addChild(this.goldBulletBtn);

		this.silverBulletBtn = new NewProgresButton(clazz,"silverWarBtn");
		this.silverBulletBtn.setButtonClickFun(function(){
			burn._Notification_.send(NotifyEnum.USE_WARHEAD, PropEnum.SILVER_WARHEAD);
		});
		this.silverBulletBtn.setIcon("silverWarBtn_png");
		this.silverBulletBtn.setTypeWar();
		this.silverBulletBtn.setTimeTotal(w_time);

		let silverVo = game.table.T_Item_Table.getVoByKey(PropEnum.SILVER_WARHEAD);
		let str1 = silverVo.worth.split('_')[2];
		this.silverBulletBtn.setGemCost(str1);
		this.silverBulletBtn.anchorOffsetX = this.silverBulletBtn.width/2;
		this.silverBulletBtn.anchorOffsetY = this.silverBulletBtn.height/2;
		this.silverGroup.addChild(this.silverBulletBtn);

		this.bronzeBulletBtn = new NewProgresButton(clazz,"tongWarBtn");
		this.bronzeBulletBtn.setButtonClickFun(function(){
			burn._Notification_.send(NotifyEnum.USE_WARHEAD, PropEnum.BRONZE_WARHEAD);
		});
		this.bronzeBulletBtn.setIcon("tongWarBtn_png");
		this.bronzeBulletBtn.setTypeWar();
		this.bronzeBulletBtn.setTimeTotal(w_time);

		let bronzeVo = game.table.T_Item_Table.getVoByKey(PropEnum.BRONZE_WARHEAD);
		let str2 = bronzeVo.worth.split('_')[2];
		this.bronzeBulletBtn.setGemCost(str2);

		this.bronzeBulletBtn.anchorOffsetX = this.bronzeBulletBtn.width/2;
		this.bronzeBulletBtn.anchorOffsetY = this.bronzeBulletBtn.height/2;
		this.bronzeGroup.addChild(this.bronzeBulletBtn);

		this.nuclearBulletBtn = new NewProgresButton(clazz,"tongWarBtn");
		this.nuclearBulletBtn.setButtonClickFun(function(){
			burn._Notification_.send(NotifyEnum.USE_WARHEAD, PropEnum.NUCLEAR_WARHEAD);
		});
		this.nuclearBulletBtn.setIcon("tongWarBtn_png");
		this.nuclearBulletBtn.setTypeWar();
		this.nuclearBulletBtn.setTimeTotal(w_time);
		//83
		let minVipLv = game.table.T_Config_Table.getVoByKey(83).value;
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		if (userModel.getVipLevel() < Number(minVipLv)) {
			this.nuclearBulletBtn.lockedImg.visible = true;
		} else {
			this.nuclearBulletBtn.lockedImg.visible = false;
		}

		let nuclearVo = game.table.T_Item_Table.getVoByKey(PropEnum.NUCLEAR_WARHEAD);
		let str3 = nuclearVo.worth.split('_')[2];
		this.nuclearBulletBtn.setGemCost(str3);

		this.nuclearBulletBtn.anchorOffsetX = this.nuclearBulletBtn.width/2;
		this.nuclearBulletBtn.anchorOffsetY = this.nuclearBulletBtn.height/2;
		this.nuclearGroup.addChild(this.nuclearBulletBtn);

        let goldItem:game.model.Item = userModel.getItemById(PropEnum.GOLD_WARHEAD);
        let silverItem:game.model.Item = userModel.getItemById(PropEnum.SILVER_WARHEAD);
        let bronzeItem:game.model.Item = userModel.getItemById(PropEnum.BRONZE_WARHEAD);
        let nucleareItem:game.model.Item = userModel.getItemById(PropEnum.NUCLEAR_WARHEAD);
		
        let goldNum = 0;
        let silverNum = 0;
        let bronzeNum = 0;
        let nucleareNum = 0;
        if (goldItem) {
            goldNum = goldItem.getCount();
        }
        if (silverItem) {
            silverNum = silverItem.getCount();
        }
        if (bronzeItem) {
            bronzeNum = bronzeItem.getCount();
        }
        if (nucleareItem) {
            nucleareNum = nucleareItem.getCount();
        }
		this.goldBulletBtn.setNum(String(goldNum));
		this.silverBulletBtn.setNum(String(silverNum));
		this.bronzeBulletBtn.setNum(String(bronzeNum));
		this.nuclearBulletBtn.setNum(String(nucleareNum));
	}
	private initRateLab():void {
		this.rageLab_num_0 = new egret.BitmapText();
		this.rageLab_num_0.font = RES.getRes("bitmapNum_3_fnt");
		this.rageLab_num_0.text = String("1");
		this.rateLab_0.addChild(this.rageLab_num_0);
		this.rageLab_num_0.textAlign = egret.HorizontalAlign.CENTER;
		this.rageLab_num_0.anchorOffsetX = this.rageLab_num_0.width/2;
		this.rageLab_num_0.anchorOffsetY = this.rageLab_num_0.height/2;
		
		this.rageLab_num_1 = new egret.BitmapText();
		this.rageLab_num_1.font = RES.getRes("bitmapNum_3_fnt");
		this.rageLab_num_1.text = String("1");
		this.rateLab_1.addChild(this.rageLab_num_1);
		this.rageLab_num_1.textAlign = egret.HorizontalAlign.CENTER;
		this.rageLab_num_1.anchorOffsetX = this.rageLab_num_1.width/2;
		this.rageLab_num_1.anchorOffsetY = this.rageLab_num_1.height/2;
		
		this.rageLab_num_2 = new egret.BitmapText();
		this.rageLab_num_2.font = RES.getRes("bitmapNum_3_fnt");
		this.rageLab_num_2.text = String("1");
		this.rateLab_2.addChild(this.rageLab_num_2);
		this.rageLab_num_2.textAlign = egret.HorizontalAlign.CENTER;
		this.rageLab_num_2.anchorOffsetX = this.rageLab_num_2.width/2;
		this.rageLab_num_2.anchorOffsetY = this.rageLab_num_2.height/2;
		
		this.rageLab_num_3 = new egret.BitmapText();
		this.rageLab_num_3.font = RES.getRes("bitmapNum_3_fnt");
		this.rageLab_num_3.text = String("1");
		this.rateLab_3.addChild(this.rageLab_num_3);
		this.rageLab_num_3.textAlign = egret.HorizontalAlign.CENTER;
		this.rageLab_num_3.anchorOffsetX = this.rageLab_num_3.width/2;
		this.rageLab_num_3.anchorOffsetY = this.rageLab_num_3.height/2;

		this.goldLab_num_0 = new egret.BitmapText();
		this.goldLab_num_0.font = RES.getRes("bitmapNum_4_fnt");
		this.goldLab_num_0.text = String("1");
		this.goldLab_0.addChild(this.goldLab_num_0);
		this.goldLab_num_0.textAlign = egret.HorizontalAlign.CENTER;
		this.goldLab_num_0.anchorOffsetX = this.goldLab_num_0.width/2;
		this.goldLab_num_0.anchorOffsetY = this.goldLab_num_0.height/2;

		this.gemLab_num_0 = new egret.BitmapText();
		this.gemLab_num_0.font = RES.getRes("bitmapNum_4_fnt");
		this.gemLab_num_0.text = String("1");
		this.gemLab_0.addChild(this.gemLab_num_0);
		this.gemLab_num_0.textAlign = egret.HorizontalAlign.CENTER;
		this.gemLab_num_0.anchorOffsetX = this.gemLab_num_0.width/2;
		this.gemLab_num_0.anchorOffsetY = this.gemLab_num_0.height/2;
		/////////////////////////////////pos1////////////////////////////////////
		this.goldLab_num_1 = new egret.BitmapText();
		this.goldLab_num_1.font = RES.getRes("bitmapNum_4_fnt");
		this.goldLab_num_1.text = String("1");
		this.goldLab_1.addChild(this.goldLab_num_1);
		this.goldLab_num_1.textAlign = egret.HorizontalAlign.CENTER;
		this.goldLab_num_1.anchorOffsetX = this.goldLab_num_1.width/2;
		this.goldLab_num_1.anchorOffsetY = this.goldLab_num_1.height/2;

		this.gemLab_num_1 = new egret.BitmapText();
		this.gemLab_num_1.font = RES.getRes("bitmapNum_4_fnt");
		this.gemLab_num_1.text = String("1");
		this.gemLab_1.addChild(this.gemLab_num_1);
		this.gemLab_num_1.textAlign = egret.HorizontalAlign.CENTER;
		this.gemLab_num_1.anchorOffsetX = this.gemLab_num_1.width/2;
		this.gemLab_num_1.anchorOffsetY = this.gemLab_num_1.height/2;
		/////////////////////////////////pos2////////////////////////////////////
		this.goldLab_num_2 = new egret.BitmapText();
		this.goldLab_num_2.font = RES.getRes("bitmapNum_4_fnt");
		this.goldLab_num_2.text = String("2");
		this.goldLab_2.addChild(this.goldLab_num_2);
		this.goldLab_num_2.textAlign = egret.HorizontalAlign.CENTER;
		this.goldLab_num_2.anchorOffsetX = this.goldLab_num_2.width/2;
		this.goldLab_num_2.anchorOffsetY = this.goldLab_num_2.height/2;

		this.gemLab_num_2 = new egret.BitmapText();
		this.gemLab_num_2.font = RES.getRes("bitmapNum_4_fnt");
		this.gemLab_num_2.text = String("1");
		this.gemLab_2.addChild(this.gemLab_num_2);
		this.gemLab_num_2.textAlign = egret.HorizontalAlign.CENTER;
		this.gemLab_num_2.anchorOffsetX = this.gemLab_num_2.width/2;
		this.gemLab_num_2.anchorOffsetY = this.gemLab_num_2.height/2;
		/////////////////////////////////pos3////////////////////////////////////
		this.goldLab_num_3 = new egret.BitmapText();
		this.goldLab_num_3.font = RES.getRes("bitmapNum_4_fnt");
		this.goldLab_num_3.text = String("3");
		this.goldLab_3.addChild(this.goldLab_num_3);
		this.goldLab_num_3.textAlign = egret.HorizontalAlign.CENTER;
		this.goldLab_num_3.anchorOffsetX = this.goldLab_num_3.width/2;
		this.goldLab_num_3.anchorOffsetY = this.goldLab_num_3.height/2;

		this.gemLab_num_3 = new egret.BitmapText();
		this.gemLab_num_3.font = RES.getRes("bitmapNum_4_fnt");
		this.gemLab_num_3.text = String("1");
		this.gemLab_3.addChild(this.gemLab_num_3);
		this.gemLab_num_3.textAlign = egret.HorizontalAlign.CENTER;
		this.gemLab_num_3.anchorOffsetX = this.gemLab_num_3.width/2;
		this.gemLab_num_3.anchorOffsetY = this.gemLab_num_3.height/2;

		//抽奖小面板 击杀奖金鱼数量
		//抽奖小面板 奖金数量
		//public bounsGroup:eui.Group;
		//抽奖小面板 击杀奖金鱼数量
		this.fishCountTxt = new egret.BitmapText();
		this.fishCountTxt.font = RES.getRes("bitmapNum_4_fnt");
		this.fishCountTxt.text = String("1");
		this.fishCountGroup.addChild(this.fishCountTxt);
		this.fishCountTxt.textAlign = egret.HorizontalAlign.CENTER;
		this.fishCountTxt.anchorOffsetX = this.fishCountTxt.width/2;
		this.fishCountTxt.anchorOffsetY = this.fishCountTxt.height/2;


		this.bounsTxt = new egret.BitmapText();
		this.bounsTxt.font = RES.getRes("bitmapNum_4_fnt");
		this.bounsTxt.text = String("1");
		this.bounsGroup.addChild(this.bounsTxt);
		this.bounsTxt.textAlign = egret.HorizontalAlign.CENTER;
		this.bounsTxt.anchorOffsetX = this.bounsTxt.width/2;
		this.bounsTxt.anchorOffsetY = this.bounsTxt.height/2;
		//抽奖小面板 奖金数量
		//public bounsTxt:eui.Label;
		let scaleParam = 1.1;
		this.goldLab_0.scaleX = scaleParam;
		this.goldLab_0.scaleY = scaleParam;
		this.goldLab_1.scaleX = scaleParam;
		this.goldLab_1.scaleY = scaleParam;
		this.goldLab_2.scaleX = scaleParam;
		this.goldLab_2.scaleY = scaleParam;
		this.goldLab_3.scaleX = scaleParam;
		this.goldLab_3.scaleY = scaleParam;

		this.gemLab_0.scaleX = scaleParam;
		this.gemLab_0.scaleY = scaleParam;
		this.gemLab_1.scaleX = scaleParam;
		this.gemLab_1.scaleY = scaleParam;
		this.gemLab_2.scaleX = scaleParam;
		this.gemLab_2.scaleY = scaleParam;
		this.gemLab_3.scaleX = scaleParam;
		this.gemLab_3.scaleY = scaleParam;

	}
	//加载炮台资源
	private gunTemp(clazz:any, url:string):void {
		let model:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
		this.gunList = new Array<GunTempleUI>();
		///groupGun_0
		this.gunList_0 = new GunTempleUI(clazz);
		this.gunList_0.anchorOffsetX = this.gunList_0.width/2;
		this.gunList_0.anchorOffsetY = this.gunList_0.height;
		this.gunList_0.setRoomerPos(0);
		this.groupGun_0.addChild(this.gunList_0);
		this.gunList.push(this.gunList_0);
		///groupGun_1
		this.gunList_1 = new GunTempleUI(clazz);
		this.gunList_1.anchorOffsetX = this.gunList_1.width/2;
		this.gunList_1.anchorOffsetY = this.gunList_1.height;
		this.gunList_1.setRoomerPos(1);
		this.groupGun_1.addChild(this.gunList_1);
		this.gunList.push(this.gunList_1);
		///groupGun_2
		this.gunList_2 = new GunTempleUI(clazz);
		this.gunList_2.anchorOffsetX = this.gunList_2.width/2;
		this.gunList_2.anchorOffsetY = 0;
		this.gunList_2.setRoomerPos(2);
		this.groupGun_2.addChild(this.gunList_2);
		this.groupGun_2.rotation = 180;
		this.gunList.push(this.gunList_2);
		///groupGun_3
		this.gunList_3 = new GunTempleUI(clazz);
		this.gunList_3.anchorOffsetX = this.gunList_3.width/2;
		this.gunList_3.anchorOffsetY = 0;
		this.gunList_3.setRoomerPos(3);
		this.groupGun_3.addChild(this.gunList_3);
		this.groupGun_3.rotation = 180;
		this.gunList.push(this.gunList_3);


		//分身炮
		this.avatarGunList = new Array<Array<GunTempleUI>>();
		let avaGunList1 = new Array<GunTempleUI>();
		//第一组分身炮
		this.gun_0_1 = new GunTempleUI(clazz);
		this.gun_0_1.anchorOffsetX = this.gun_0_1.width/2;
		this.gun_0_1.anchorOffsetY = this.gun_0_1.height;
		this.gun_0_1.setRoomerPos(0);
		this.groupGun_0_1.addChild(this.gun_0_1);
		avaGunList1.push(this.gun_0_1);

		this.gun_0_2 = new GunTempleUI(clazz);
		this.gun_0_2.anchorOffsetX = this.gun_0_2.width/2;
		this.gun_0_2.anchorOffsetY = this.gun_0_2.height;
		this.gun_0_2.setRoomerPos(0);
		this.groupGun_0_2.addChild(this.gun_0_2);
		avaGunList1.push(this.gun_0_2);

		this.gun_0_3 = new GunTempleUI(clazz);
		this.gun_0_3.anchorOffsetX = this.gun_0_3.width/2;
		this.gun_0_3.anchorOffsetY = this.gun_0_3.height;
		this.gun_0_3.setRoomerPos(0);
		this.groupGun_0_3.addChild(this.gun_0_3);
		avaGunList1.push(this.gun_0_3);
		this.gun_0_1.visible = false;
		this.gun_0_2.visible = false;
		this.gun_0_3.visible = false;
		this.avatarGunList.push(avaGunList1);

		//位置2的分身炮
		let avaGunList2 = new Array<GunTempleUI>();
		//第一组分身炮
		this.gun_1_1 = new GunTempleUI(clazz);
		this.gun_1_1.anchorOffsetX = this.gun_1_1.width/2;
		this.gun_1_1.anchorOffsetY = this.gun_1_1.height;
		this.groupGun_1_1.addChild(this.gun_1_1);
		avaGunList2.push(this.gun_1_1);

		this.gun_1_2 = new GunTempleUI(clazz);
		this.gun_1_2.anchorOffsetX = this.gun_1_2.width/2;
		this.gun_1_2.anchorOffsetY = this.gun_1_2.height;
		this.groupGun_1_2.addChild(this.gun_1_2);
		avaGunList2.push(this.gun_1_2);

		this.gun_1_3 = new GunTempleUI(clazz);
		this.gun_1_3.anchorOffsetX = this.gun_1_3.width/2;
		this.gun_1_3.anchorOffsetY = this.gun_1_3.height;
		this.groupGun_1_3.addChild(this.gun_1_3);
		avaGunList2.push(this.gun_1_3);
		this.gun_1_1.visible = false;
		this.gun_1_2.visible = false;
		this.gun_1_3.visible = false;
		this.gun_1_1.setRoomerPos(1);
		this.gun_1_2.setRoomerPos(1);
		this.gun_1_3.setRoomerPos(1);
		this.avatarGunList.push(avaGunList2);
		
		//位置3的分身炮
		let avaGunList3 = new Array<GunTempleUI>();
		//第一组分身炮
		this.gun_2_1 = new GunTempleUI(clazz);
		this.gun_2_1.anchorOffsetX = this.gun_2_1.width/2;
		this.gun_2_1.anchorOffsetY = 0;
		this.groupGun_2_1.addChild(this.gun_2_1);
		this.groupGun_2_1.rotation = 180;
		avaGunList3.push(this.gun_2_1);

		this.gun_2_2 = new GunTempleUI(clazz);
		this.gun_2_2.anchorOffsetX = this.gun_2_2.width/2;
		this.gun_2_2.anchorOffsetY = 0;
		this.groupGun_2_2.addChild(this.gun_2_2);
		this.groupGun_2_2.rotation = 180;
		avaGunList3.push(this.gun_2_2);

		this.gun_2_3 = new GunTempleUI(clazz);
		this.gun_2_3.anchorOffsetX = this.gun_2_3.width/2;
		this.gun_2_3.anchorOffsetY = 0;
		this.groupGun_2_3.addChild(this.gun_2_3);
		this.groupGun_2_3.rotation = 180;
		avaGunList3.push(this.gun_2_3);
		this.gun_2_1.visible = false;
		this.gun_2_2.visible = false;
		this.gun_2_3.visible = false;
		this.gun_2_1.setRoomerPos(2);
		this.gun_2_2.setRoomerPos(2);
		this.gun_2_3.setRoomerPos(2);
		this.avatarGunList.push(avaGunList3);
		
		//位置4的分身炮
		let avaGunList4 = new Array<GunTempleUI>();
		//第一组分身炮
		this.gun_3_1 = new GunTempleUI(clazz);
		this.gun_3_1.anchorOffsetX = this.gun_3_1.width/2;
		this.gun_3_1.anchorOffsetY = 0;
		this.groupGun_3_1.addChild(this.gun_3_1);
		this.groupGun_3_1.rotation = 180;
		avaGunList4.push(this.gun_3_1);

		this.gun_3_2 = new GunTempleUI(clazz);
		this.gun_3_2.anchorOffsetX = this.gun_3_2.width/2;
		this.gun_3_2.anchorOffsetY = 0;
		this.groupGun_3_2.addChild(this.gun_3_2);
		this.groupGun_3_2.rotation = 180;
		avaGunList4.push(this.gun_3_2);

		this.gun_3_3 = new GunTempleUI(clazz);
		this.gun_3_3.anchorOffsetX = this.gun_3_3.width/2;
		this.gun_3_3.anchorOffsetY = 0;
		this.groupGun_3_3.addChild(this.gun_3_3);
		this.groupGun_3_3.rotation = 180;
		avaGunList4.push(this.gun_3_3);
		this.gun_3_1.visible = false;
		this.gun_3_2.visible = false;
		this.gun_3_3.visible = false;
		this.gun_3_1.setRoomerPos(3);
		this.gun_3_2.setRoomerPos(3);
		this.gun_3_3.setRoomerPos(3);
		this.avatarGunList.push(avaGunList4);

		this.zuoList = new Array<eui.Group>();
		this.zuoList.push(this.zuoGroup_0);
		this.zuoList.push(this.zuoGroup_1);
		this.zuoList.push(this.zuoGroup_2);
		this.zuoList.push(this.zuoGroup_3);

		burn._Notification_.send(NotifyEnum.ROOM_UI_INIT_END);
	}
	//冰冻和锁定ui加载结束
	private frozenAndLock(clazz:any, url:string):void {
		this._frozenAndLockUI = new FrozenAndLockUI(clazz);
		this._frozenAndLockUI.x = 480;
		this._frozenAndLockUI.y = 580;
		this.addChild(this._frozenAndLockUI);
		// this._frozenAndLockUI.cacheAsBitmap = true;
		burn._Notification_.send(NotifyEnum.SET_PROP_NUM);
	}
	//炮倍解锁的UI
	private unlockGunUpdate(clazz:any, url:string):void
	{
		this._unlockGunUpdateUI = new UnlockGunUpdateUI(clazz);
		this._unlockGunUpdateUI.x = -400;
		this._unlockGunUpdateUI.y = 0;
		this.unlockGunGroup.addChild(this._unlockGunUpdateUI);
		burn._Notification_.send(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED);
	}
	//侧边道具栏
	private loadSideProp(clazz:any, url:string):void {
		this._sidePropUI = new SidePropUI(clazz);
		this._sidePropUI.x = 1176;
		this._sidePropUI.y = 214;
		this.addChild(this._sidePropUI);
		//this._sidePropUI.cacheAsBitmap = true;
		burn._Notification_.send(NotifyEnum.SET_PROP_NUM);
	}
	//兑换板子
	private setExchange():void
	{
		this.exchangeGroup.x = -400;
		this.txtExchangeNum = new egret.BitmapText();
		this.txtExchangeNum.font = RES.getRes("bitmapNum_4_fnt");
		this.txtExchangeNum.text = String("1");
		this.exchangeNum.addChild(this.txtExchangeNum);
		this.txtExchangeNum.textAlign = egret.HorizontalAlign.CENTER;
		this.txtExchangeNum.anchorOffsetX = this.txtExchangeNum.width/2;
		this.txtExchangeNum.anchorOffsetY = this.txtExchangeNum.height/2;

		this._bIsShowExchange = false;

		this.exchangeName.text = "";
	}

	public updateShowExchangeBan(cur:number, max:number):void {
		this.txtExchangeNum.text = (cur/10 + "元") + "/" + (max/10 + "元");
	}

	//弹出兑换板
	public showExchangeBan(name:string,cur:number,max:number):void
	{
		this.txtExchangeNum.text = (cur/10 + "元") + "/" + (max/10 + "元");
		this.txtExchangeNum.textAlign = egret.HorizontalAlign.CENTER;
		this.txtExchangeNum.anchorOffsetX = this.txtExchangeNum.width/2;
		this.txtExchangeNum.anchorOffsetY = this.txtExchangeNum.height/2;
		this.exchangeName.text = name;
		let self = this;
		let lotteryObj = self.exchangeGroup;
		egret.Tween.removeTweens(lotteryObj);
		if (self._bIsShowExchange) {
			self._bIsShowExchange = false;
			let tw = egret.Tween.get(lotteryObj, {loop:false});
			tw.to({scaleX:0}, 2000).call(function():void{
				egret.Tween.removeTweens(lotteryObj);
				lotteryObj.x = -400;
				lotteryObj.scaleX = 1;
			});
		} else {
			lotteryObj.scaleX = 0;
			lotteryObj.x = 3;
			self._bIsShowExchange = true;
			let tw = egret.Tween.get(lotteryObj, {loop:false});
			tw.to({scaleX:1}, 200).wait(4000).to({scaleX:0}, 200).call(function():void{
				egret.Tween.removeTweens(lotteryObj);
				self._bIsShowExchange = false;
				lotteryObj.x = -400;
				lotteryObj.scaleX = 1;
			});
		}
	}
	//UI资源加载完成
	private addBgResource(clazz:any, url:string):void {
		//显示抽奖按钮
		this.lotteryBtn.visible = true;
		this.lotteryGroup.scaleX = 1;
		this.lotteryGroup.x = -300;
		this._lotteryIsOpen = true;
		burn._Notification_.send(NotifyEnum.LOTTERY_UI_LOAD_END);

		this.unlockBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openGunUpdateGroup, this);
		//弹头横幅
		this.warHeadGroupIsClose = true;
		this.openWarHeadBtn.name = "openWarHeadBtn";
		this.openWarHeadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseWarHead, this);

		this.shrinkGroup.x = 1280;
		this.shrinkGroup.cacheAsBitmap = true;
		this._shrinkGroupIsOpen = false;
		this.shrinkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseShrink, this);
		this.shrinkBackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseShrink, this);

		//this.btnWrapList.push(new burn.tools.UIWrap(this.shrinkBtn));
		//加载鱼死亡音效
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
		if (CONFIG.isOpenMusic) {
			RES.loadGroup("fish_sound");
		}
	}

	/** 显示您在此处 */
	public showYourPos(pos:number):void {
		let gunPos = this.getGunGroup(pos);
		let yourTips = new egret.Bitmap(RES.getRes("youAreHere_png"));
		this.addChild(yourTips);
		//gunPos.addChild(yourTips);
		yourTips.x = gunPos.x;
		yourTips.y = gunPos.y;
		yourTips.name = "yourTips";
		yourTips.anchorOffsetX = yourTips.width/2;
		yourTips.anchorOffsetY = 180;
		yourTips.touchEnabled = false;
		burn.tools.TweenTools.shrink(yourTips, 0.05, 1500);
	}
	
	/** 隐藏您在此处的提示 */
	public hideYourPos(pos:number):void {
		let yourTips = this.getChildByName("yourTips");
		if (yourTips) {
			yourTips.parent && yourTips.parent.removeChild(yourTips);
		}
	}

	//打开或者关闭弹头横幅
	private openAndCloseWarHead(evt:egret.TouchEvent):void {
		if (evt.target instanceof eui.Button) {
		
		} else {
			return;
		}
		let self = this;//{x:self.warHeadGroup.x - 472} {x:self.warHeadGroup.x + 472} {scaleX:1}
		egret.Tween.removeTweens(self.warUI);
		let tw = egret.Tween.get(this.warUI, {loop:false});
		this.openWarHeadBtn.touchEnabled = false;
		this.goldBulletBtn.touchEnabled = false;
		this.silverBulletBtn.touchEnabled = false;
		this.bronzeBulletBtn.touchEnabled = false;
		this.nuclearBulletBtn.touchEnabled = false;
		if (this.warHeadGroupIsClose) {
			tw.to({x:-348}, 200).call(function():void {
				self.warHeadGroupIsClose = false;
				self.warUI.touchEnabled = false;
				self.openWarHeadBtn.touchEnabled = true;
				self.goldBulletBtn.touchEnabled = true;
				self.silverBulletBtn.touchEnabled = true;
				self.bronzeBulletBtn.touchEnabled = true;
				self.nuclearBulletBtn.touchEnabled = true;
			});
			let arr = new Array<eui.Group>();
			arr.push(self.goldGroup);
			arr.push(self.silverGroup);
			arr.push(self.bronzeGroup);
			arr.push(self.nuclearGroup);
			game.util.GameUtil.playWarAction(arr);
		} else {
			tw.to({x:0}, 200).call(function(){
				egret.Tween.removeTweens(self.warUI);
				self.warHeadGroupIsClose = true;
				self.openWarHeadBtn.touchEnabled = true;
			});
		}
	}

	//打开或关闭功能菜单
	private openAndCloseShrink(evt:egret.TouchEvent):void {
		let self = this;
		egret.Tween.removeTweens(self.shrinkGroup);
		if (self._shrinkGroupIsOpen) {
			self.fishkindBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openFishKindsView, self);
			let tw = egret.Tween.get(this.shrinkGroup, {loop:false});
			tw.to({x:1280}, 200).call(function():void {
				egret.Tween.removeTweens(self.shrinkGroup);
				self._shrinkGroupIsOpen = false;	
				self.shrinkBtn.visible = true;
			});
		} else {
			self._shrinkGroupIsOpen = true;
			self.shrinkBtn.visible = false;
			let arr = new Array<eui.Button>();
			arr.push(self.fishkindBtn);
			arr.push(self.shopBtn);
			arr.push(self.soundEffectBtn);
			arr.push(self.bgMusicBtn);
			arr.push(self.backBtn);
			game.util.GameUtil.playWarAction(arr);
			self.fishkindBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.openFishKindsView, self);
			let tw = egret.Tween.get(this.shrinkGroup, {loop:false});
			tw.to({x:800}, 200).wait(7000).to({x:1280}, 200).call(function():void{
				egret.Tween.removeTweens(self.shrinkGroup);
				self._shrinkGroupIsOpen = false;
				self.shrinkBtn.visible = true;
			});
		}
	}

	private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "lottery") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);	
			EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Lottery.exml",this.addBgResource,this);
			this.loadErrorCount = 0;
        } else if (event.groupName == "fish_sound") {
			game.util.SoundManager.fishSoundLoadEnd = true;
        	RES.loadGroup("effect_sound");
		} else if (event.groupName == "effect_sound") {
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);	
			game.util.SoundManager.effectSoundLoadEnd = true;
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

	//修改炮台位置
	public reviseGun():void {
		
	}

	//更新玩家金币数量显示
	public updateRoomerCoins(pos:number, coins:number, isTween:boolean = false):void {
		let lab = null;
		let parent = null;
		if (pos == RoomPosEnum.GUN_POS_0) {
			lab = this.goldLab_num_0;
			parent = this.gold_eff_0;
		} else if (pos == RoomPosEnum.GUN_POS_1) {
			lab = this.goldLab_num_1;
			parent = this.gold_eff_1;
		} else if (pos == RoomPosEnum.GUN_POS_2) {
			lab = this.goldLab_num_2;
			parent = this.gold_eff_2;
		} else if (pos == RoomPosEnum.GUN_POS_3) {
			lab = this.goldLab_num_3;
			parent = this.gold_eff_3;
		}
		if (isTween) {
			let twlab = egret.Tween.get(lab, {loop:false});
			twlab.to({scaleX:1.5, scaleY:1.5}, 200).call(function():void {
				lab.text = "" + coins;
			}).to({scaleX:1, scaleY:1}, 200).call(function():void {
				egret.Tween.removeTweens(lab);
			});
			let ef_gold = new egret.Bitmap(RES.getRes("ef_gold_png"));
			ef_gold.alpha = 0;
			ef_gold.anchorOffsetX = ef_gold.width/2;
			ef_gold.anchorOffsetY = ef_gold.height/2;
			let tw = egret.Tween.get(ef_gold, {loop:false});
			tw.to({alpha: 1}, 300).
			to({alpha: 0}, 300).call(function(){
				egret.Tween.removeTweens(ef_gold);
				parent.removeChild(ef_gold);
			});
			parent.addChild(ef_gold);
			lab.text = "" + coins;
			lab.anchorOffsetX = lab.width/2;
			lab.anchorOffsetY = lab.height/2;
		} else {
			lab.text = "" + coins;
			lab.anchorOffsetX = lab.width/2;
			lab.anchorOffsetY = lab.height/2;
		}
	}

	//更新玩家钻石数量显示
	public updateRoomerMoney(pos:number, money:number):void {
		if (pos == RoomPosEnum.GUN_POS_0) {
			this.gemLab_num_0.text = "" + money;
			this.gemLab_num_0.anchorOffsetX = this.gemLab_num_0.width/2;
			this.gemLab_num_0.anchorOffsetY = this.gemLab_num_0.height/2;
		} else if (pos == RoomPosEnum.GUN_POS_1) {
			this.gemLab_num_1.text = "" + money;
			this.gemLab_num_1.anchorOffsetX = this.gemLab_num_1.width/2;
			this.gemLab_num_1.anchorOffsetY = this.gemLab_num_1.height/2;
		} else if (pos == RoomPosEnum.GUN_POS_2) {
			this.gemLab_num_2.text = "" + money;
			this.gemLab_num_2.anchorOffsetX = this.gemLab_num_2.width/2;
			this.gemLab_num_2.anchorOffsetY = this.gemLab_num_2.height/2;
		} else if (pos == RoomPosEnum.GUN_POS_3) {
			this.gemLab_num_3.text = "" + money;
			this.gemLab_num_3.anchorOffsetX = this.gemLab_num_3.width/2;
			this.gemLab_num_3.anchorOffsetY = this.gemLab_num_3.height/2;
		}
	}

	//更新玩家炮台倍率显示
	public updateGunRate(pos:number, rate:number,bClone:boolean = false):void {
		if (pos == RoomPosEnum.GUN_POS_0) {
			//this.rateLab_0.text = rate.toString();
			this.rageLab_num_0.text = "" + rate;
			this.rageLab_num_0.anchorOffsetX = this.rageLab_num_0.width/2;
			this.rageLab_num_0.anchorOffsetY = this.rageLab_num_0.height/2;
			this.rageLab_num_0.x = 0;
			this.rageLab_num_0.y = 0;
		} else if (pos == RoomPosEnum.GUN_POS_1) {
			//this.rateLab_1.text = rate.toString();
			this.rageLab_num_1.text = "" + rate;
			this.rageLab_num_1.anchorOffsetX = this.rageLab_num_1.width/2;
			this.rageLab_num_1.anchorOffsetY = this.rageLab_num_1.height/2;
		} else if (pos == RoomPosEnum.GUN_POS_2) {
			//this.rateLab_2.text = rate.toString();
			this.rageLab_num_2.text = "" + rate;
			this.rageLab_num_2.anchorOffsetX = this.rageLab_num_2.width/2;
			this.rageLab_num_2.anchorOffsetY = this.rageLab_num_2.height/2;
		} else if (pos == RoomPosEnum.GUN_POS_3) {
			//this.rateLab_3.text = rate.toString();
			this.rageLab_num_3.text = "" + rate;
			this.rageLab_num_3.anchorOffsetX = this.rageLab_num_3.width/2;
			this.rageLab_num_3.anchorOffsetY = this.rageLab_num_3.height/2;
		}
		this.playAddGunRateEffect(pos,bClone);
	}
	/** 炮台更换皮肤 */
	public changeGunSkin(roomer:game.model.Roomer,isFlip:boolean):void 
	{
		let skinId = roomer.getCurSkinId();
		let pos = RoomUtil.getPosByFlip(roomer.getRoomPos(), isFlip);
		let skinBgId = roomer.getCurSkinBgId();
		if(this.gunList)
		{
			let gun = this.gunList[pos];
			if(gun)
			{
				gun.setGunImageAnchor(skinId);
				gun.setGunNorData(skinId);
				//gun.playGunChangeEff();
			}
		}
		if(this.avatarGunList)
		{
			for(let i = 0; i < 3; i++)
			{
				let gun = this.avatarGunList[pos][i];
				if(gun)
				{
					gun.setGunImageAnchor(skinId);
					gun.setGunData(skinId);
					//gun.playGunChangeEff();
				}
			}
		} 
		//炮座this.zuoList
		if(skinBgId == 0)
		{
            let vo = game.table.T_Gun_skin_Table.getVoByKey(skinId);
            let zuoUrl = vo.zuoUrl;
			this.changeGunBgSkin(pos,zuoUrl);
		}else
		{

			this.changeGunBgSkin(pos,"gunBgsicon_" + skinBgId +  "_png");
		}
	}
	/** 更换炮座皮肤 */
	public changeGunBgSkin(pos:number,txtr:string):void
	{
		if(this.zuoList)
		{
			let zuo = this.zuoList[pos];
			if(zuo)
			{
				RES.getResAsync(txtr, function():void {
					let txture:egret.Texture = RES.getRes(txtr);
					let icon:egret.Bitmap = new egret.Bitmap(txture);
					if (icon) {
						zuo.removeChildren();
						if(pos > 1)
						{
							icon.anchorOffsetX = icon.width/2;
							icon.anchorOffsetY = icon.height - 11;
							icon.rotation = 180;
						}else
						{
							icon.x = -90;
							icon.y = -98;
						}
						zuo.addChild(icon);
					}
				}, this);
			}
		}
	}
	/** 播放调整炮倍动画 */
	public playAddGunRateEffect(pos:number,bClone:boolean = false):void {
		let data = RES.getRes("addGunRate_json");
		let txtr = RES.getRes("addGunRate_png");
		let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		let addGunRate = new MovieFish(mcFactory.generateMovieClipData("addGunRate"),egret.Event.COMPLETE);
		addGunRate.initEvent();
		addGunRate.gotoAndPlay("play", 1);
		addGunRate.frameRate = 24;
		//TODO：坐标暂时固定写死，等O重构炮台修改。
		if (pos == RoomPosEnum.GUN_POS_0) {
			addGunRate.x = 224;//259;
			addGunRate.y = 554;
		} else if (pos == RoomPosEnum.GUN_POS_1) {
			addGunRate.x = 781;
			addGunRate.y = 554;
		} else if (pos == RoomPosEnum.GUN_POS_2) {
			addGunRate.x = 224;
			addGunRate.y = -100;
		} else if (pos == RoomPosEnum.GUN_POS_3) {
			addGunRate.x = 781;
			addGunRate.y = -100;
		}
		//放大1.25倍使用
		addGunRate.scaleX = addGunRate.scaleY = 1.25;
		this.addChild(addGunRate);
		if(!bClone)
		{
			if(this.gunList)
			{
				let gun = this.gunList[pos];
				if(gun)
				{
					gun.playGunChangeEff();
				}
			}
		}else
		{
			if(this.avatarGunList)
			{
				for(let i = 0; i < 3; i++)
				{
					let gun = this.avatarGunList[pos][i];
					if(gun)
					{
						gun.playGunChangeEff();
					}
				}
			}
		}
	}

	//跟进炮台位置设置炮台隐藏和显示
	public setGunVisableByPos(pos:number, vis:boolean):void {
		switch (pos) {
			case RoomPosEnum.GUN_POS_0:
				//group隐藏
				this.groupGun_0.visible = vis;
				this.group_0.visible = vis;
				this.waiting_0.visible = !vis;
				if (!vis){
					burn.tools.TweenTools.showOutAndIn(this.waiting_0, 3000);
				} else {
					this.cache_group_0.cacheAsBitmap = true;
					burn.tools.TweenTools.clearTween(this.waiting_0);
				}
				break;
			case RoomPosEnum.GUN_POS_1:
				this.groupGun_1.visible = vis;
				this.group_1.visible = vis;
				this.waiting_1.visible = !vis;
				if (!vis){
					burn.tools.TweenTools.showOutAndIn(this.waiting_1, 3000);
				} else {
					this.cache_group_1.cacheAsBitmap = true;
					burn.tools.TweenTools.clearTween(this.waiting_1);
				}
				break;
			case RoomPosEnum.GUN_POS_2:
				this.groupGun_2.visible = vis;
				this.group_2.visible = vis;
				this.waiting_2.visible = !vis;
				if (!vis){
					burn.tools.TweenTools.showOutAndIn(this.waiting_2, 3000);
				} else {
					this.cache_group_2.cacheAsBitmap = true;
					burn.tools.TweenTools.clearTween(this.waiting_2);
				}
				break;
			case RoomPosEnum.GUN_POS_3:
				this.groupGun_3.visible = vis;
				this.group_3.visible = vis;
				this.waiting_3.visible = !vis;
				if (!vis){
					burn.tools.TweenTools.showOutAndIn(this.waiting_3, 3000);
				} else {
					this.cache_group_3.cacheAsBitmap = true;
					burn.tools.TweenTools.clearTween(this.waiting_3);
				}
				break;
		}
	}
	
	public setGunState(pos:number,isAva:boolean,state:number = 2,oldPos:number):void
	{
		//显示分身炮
		if(isAva) 
		{
			this.gunList[pos].visible = false;
			let roomerModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
			let roomer:game.model.Roomer = roomerModel.getRoomerByPos(oldPos);
			let vipLevel = roomer.getVipLevel();
            state = roomer.getGunNum();
			for(let i = 0; i < state; i++)
			{
				let item = this.avatarGunList[pos][i];
				item.visible = true;
			}
		}
		//显示普通跑
		else
		{
			this.gunList[pos].visible = true;
			for(let i = 0; i < this.avatarGunList[pos].length; i++)
			{
				let item = this.avatarGunList[pos][i];
				item.visible = false;
			}
		}
	}

	//开炮
	public gunfire(pos:number, r:number,isAva:boolean = false,nAvaPos:number = 0):void {
		if(pos <= 1)
		{
			if(r > 90 && r < 270)
			{
				if(r > 90 && r < 180)
				{
					r = 90;
				}
				if(r < 270 && r > 180)
				{
					r = 270;
				}
			}
		}
		if(!isAva) {
			let gunListTemp = this.gunList;
			if(gunListTemp && gunListTemp[pos]) {
				let gun = gunListTemp[pos];
				if(pos > 1) {
					gun.gunFireTw(r + 180);
				} else {
					gun.gunFireTw(r);
				}
			}
		} else {	
			if(this.avatarGunList && this.avatarGunList[pos]) {
				let gun = this.avatarGunList[pos][nAvaPos];
				if (pos > 1) {
					gun.gunFireTw(r + 180);
				} else {
					gun.gunFireTw(r);
				}
			}
		}
	}
	public setGunRageEff(pos:number, bRage:boolean, isAva:boolean = false, nAvaPos:number = 0):void
	{
		if(!isAva) {
			let gun = this.gunList[pos];
			gun.setRage(bRage);
		} else {	
			let gun = this.avatarGunList[pos][nAvaPos];
			gun.setRage(bRage);
		}

	}
	//根据位置获取炮台
	public getGunByPos(pos:number,isAva:boolean = false,nGUNIndex:number = 0):egret.Point {
		if(!isAva)
		{
			if(this.gunList && this.gunList[pos])
			{
				return this.gunList[pos].gunFirePos();
			} else {
				return RoomUtil.getGunPointByPos(pos, false);
			}
		}
		else
		{
			if(this.avatarGunList && this.avatarGunList[pos]) {
				return this.avatarGunList[pos][nGUNIndex].gunFirePos();
			} else {
				return  RoomUtil.getGunPointByPos(pos,false);
			}
		}
	}

	/**打开鱼种界面 */
	public openFishKindsView(evt:egret.TouchEvent):void {
		if(!this._shrinkGroupIsOpen) {
			return;
		}
		let fishKindsView:FishKindsView = new FishKindsView();
		let fishKindsMed:FishKindsMediator = new FishKindsMediator(fishKindsView);
		burn.Director.pushView(fishKindsMed);
	}

	/** 修改倍率 */
	public modifRate(evt:egret.TouchEvent):void {
		if (evt.target == this.addRateBtn_0 || evt.target == this.addRateBtn_1) {
			burn._Notification_.send(NotifyEnum.RESET_RATE, "add");
		} else if (evt.target == this.reduceRateBtn_0 || evt.target == this.reduceRateBtn_1) {
			burn._Notification_.send(NotifyEnum.RESET_RATE, "reduce");
		}
	}

	/** 点击退出房间 */
	private exitRoom(evt:egret.TouchEvent) {
		game.util.GameUtil.openConfirmByTwoButton(null, function() {
			game.util.UIUtil.startLoading();
			burn._Notification_.send(NotifyEnum.CLICK_EXIT_ROOM);
		}, this, game.util.Language.getText(78));
	}

	/** 背景音乐 */
	private bgMusic(evt:egret.TouchEvent) {
		game.util.SoundManager.setBackgroundMusicState(!game.util.SoundManager.getBackgroundMusicState());
		this.music_off.visible = !game.util.SoundManager.getBackgroundMusicState();
	}

	/** 音效 */
	private soundEffect(evt:egret.TouchEvent) {
		game.util.SoundManager.setSoundEffectState(!game.util.SoundManager.getSoundEffectState());
		this.sound_off.visible = !game.util.SoundManager.getSoundEffectState();
	}
	//设置解锁炮倍需要的
	public setUpdateGunNum(gunId:number, value:number, max:number):void
	{
		this._unlockGunUpdateUI.setUpdateGunNum(gunId,value,max);
	}
	/**打开解锁炮倍界面 */
	public openGunUpdateGroup(evt:egret.TouchEvent):void
	{
        let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        let userId = userModle.getUserId();
        let _roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
        let roomer:game.model.Roomer = _roomModel.getRoomerById(userId);
        //最高ID
        let gunRate = roomer.getGunRate();
        let gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
        //判断有没有下一个炮倍
        if(gunRateVo) {
            let arr = gunRateVo.upgradeOrForgeCost;
            let arrData = arr.split(",");
            let bEnough = true;
            let nEnoughNum = 0;
            let nCurNum = 0;
            if(arrData.length > 1) {
                return;
            }
			this._unlockGunUpdateUI.openGunUpdateGroup();
		}
	}
	public openGunUpdateGroupByEnough()
	{
		this._unlockGunUpdateUI.openGunUpdateGroupByEnough();
	}
	/** 打开抽奖界面 */
	private openLotteryGroup(evt:egret.TouchEvent):void {
		let self = this;
		if(evt == null)
		{
			if(self._lotteryIsOpen)
			{
				let lotteryModel = burn.Director.getModelByKey(LotteryModel) as LotteryModel;
				let lotteryVo = game.table.T_Lottery_Table.getVoByKey(1);
				let score = lotteryModel.getScore(); 
				let killNum = lotteryModel.getKillNum();
				let max = lotteryModel.getMaxKill(lotteryModel.getTodayCount());
				if(killNum >= max && score >= lotteryVo.integral) {
					self._lotteryIsOpen = false;
				}
			}
		}
		let lotteryObj = self.lotteryGroup;
		egret.Tween.removeTweens(lotteryObj);
		if (self._lotteryIsOpen) {
			self._lotteryIsOpen = false;
			let tw = egret.Tween.get(lotteryObj, {loop:false});
			tw.to({scaleX:0}, 200).call(function():void{
				egret.Tween.removeTweens(lotteryObj);
				lotteryObj.x = -400;
				lotteryObj.scaleX = 1;
			});
		} else {
			lotteryObj.scaleX = 0;
			lotteryObj.x = 3;
			self._lotteryIsOpen = true;
			let tw = egret.Tween.get(lotteryObj, {loop:false});
			tw.to({scaleX:1}, 200).wait(5000).to({scaleX:0}, 200).call(function():void{
				egret.Tween.removeTweens(lotteryObj);
				self._lotteryIsOpen = false;
				lotteryObj.x = -400;
				lotteryObj.scaleX = 1;
			});
		}
	}

	/** 打开抽奖提示面板 */
	public openLotteryGroupWithData(score:number, killNum:number, max:number) {
		let lotteryVo = game.table.T_Lottery_Table.getVoByKey(1);
		if (killNum >= max && score >= lotteryVo.integral) {
			this.lottery_tips.visible = true;
			this.lottery_tips.text = game.util.Language.getText(14);	//点击开始抽奖
			this.jiangjinyu_txt.visible = false;
			this.jjy_txt_bg.visible = false;
			this.fishCountTxt.visible = false;
			let self = this;
			let hintChild = this.lotteryGroup.getChildByName("LotteryHint");
			if (!hintChild) {
					let hint = new egret.Bitmap(RES.getRes("ef_lottery_hint_png"));
					hint.name = "LotteryHint";
					hint.anchorOffsetX = 0;
					hint.anchorOffsetY = hint.height/2;
					hint.width = 272;
					hint.height = 94;
					hint.x = 12;
					hint.y = hint.height/2 - 1;
					hint.blendMode = egret.BlendMode.ADD;
					self.lotteryGroup.addChild(hint);
					self.openLotteryGroup(null);
					burn.tools.TweenTools.showOutAndIn(hint, 1500);
			}
		} else {
			this.fishCountTxt.visible = true;
			this.fishCountTxt.text = killNum + "/" + max;
			this.fishCountTxt.anchorOffsetX = this.fishCountTxt.width/2;
			this.fishCountTxt.anchorOffsetY = this.fishCountTxt.height/2;
			
			this.lottery_tips.visible = false;
			this.jiangjinyu_txt.visible = true;
			this.jjy_txt_bg.visible = true;

			let hintChild = this.lotteryGroup.getChildByName("LotteryHint");
			if (hintChild) {
				this.lotteryGroup.removeChild(hintChild);
			}
		}
		this.bounsTxt.text = "" + score;
		this.bounsTxt.anchorOffsetX = this.bounsTxt.width/2;
		this.bounsTxt.anchorOffsetY = this.bounsTxt.height/2;
		this.openLotteryGroup(null);
	}

	public openLotteryGuide():void
	{
		//造假
		this.lottery_tips.visible = true;
		this.lottery_tips.text = game.util.Language.getText(14);	//点击开始抽奖
		this.jiangjinyu_txt.visible = false;
		this.jjy_txt_bg.visible = false;
		this.fishCountTxt.visible = false;
		let self = this;
		let hintChild = this.lotteryGroup.getChildByName("LotteryHint");
		if (!hintChild) {
				let hint = new egret.Bitmap(RES.getRes("ef_lottery_hint_png"));
				hint.name = "LotteryHint";
				hint.anchorOffsetX = 0;
				hint.anchorOffsetY = hint.height/2;
				hint.width = 272;
				hint.height = 94;
				hint.x = 12;
				hint.y = hint.height/2 - 1;
				hint.blendMode = egret.BlendMode.ADD;
				self.lotteryGroup.addChild(hint);
				self.openLotteryGroup(null);
				burn.tools.TweenTools.showOutAndIn(hint, 1500);
		}
		this.bounsTxt.text = "" + 2000;
		this.bounsTxt.anchorOffsetX = this.bounsTxt.width/2;
		this.bounsTxt.anchorOffsetY = this.bounsTxt.height/2;
		//弹出
		let lotteryObj = self.lotteryGroup;
		egret.Tween.removeTweens(lotteryObj);
		lotteryObj.scaleX = 0;
		lotteryObj.x = 3;
		self._lotteryIsOpen = true;
		let tw = egret.Tween.get(lotteryObj, {loop:false});
		tw.to({scaleX:1}, 200).call(function():void{
			egret.Tween.removeTweens(lotteryObj);
		});
	}
	/** 打开抽奖界面 */
	private openLotteryView(evt:egret.TouchEvent):void {
		if (this._lotteryIsOpen) {
			burn._Notification_.send(NotifyEnum.OPEN_LOTTERY_UI);
		}
	}
	/** 打开商店UI */
	private openShopView(evt:egret.TouchEvent):void {
		let itemShopView:ItemShopView = new ItemShopView();
		let itemShopMed:ItemShopMediator = new ItemShopMediator(itemShopView);
		burn.Director.pushView(itemShopMed);
	}
	/** 购买金币界面 */
	private getCoins(evt:egret.TouchEvent):void {
		let chargeView:ChargeView = new ChargeView(ChargeType.Gold);
		let chargeMed:ChargeMediator = new ChargeMediator(chargeView);
		burn.Director.pushView(chargeMed);
	}
	/** tips */
	private exchange(evt:egret.TouchEvent):void {
		let exchangeView:ExchangeView = new ExchangeView();
		let exchangeMed:ExchangeMediator = new ExchangeMediator(exchangeView);
		burn.Director.pushView(exchangeMed);
	}
	/** 打开喇叭界面 */
	private trumpet(evt:egret.TouchEvent):void {
		let trumpetView = new TrumpetView();
		let trumpetMed = new TrumpetMediator(trumpetView);
		burn.Director.pushView(trumpetMed);
	}

	/** 设置破产特效 */
	public setBankrupt(pos:number, time:string, showTime:boolean = false):void {
		let self = this;
		let gun = this.getGunGroup(pos);
		let tempChild = gun.getChildByName("bankrupt" + pos);
		if (tempChild) {
			return;
		}
		let onResourceLoadComplete = function():void {
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResourceLoadError, self);
			let bankrupt = new egret.Bitmap(RES.getRes("bankrupt_fishing_png"));
			bankrupt.anchorOffsetX = bankrupt.width/2;
			bankrupt.anchorOffsetY = bankrupt.height/2;
			bankrupt.scaleX = bankrupt.scaleY = 3;
			bankrupt.name = "bankrupt" + pos;
			bankrupt.y = 50;
			gun.addChild(bankrupt);
			let tw = egret.Tween.get(bankrupt);
			tw.to({scaleX:1, scaleY:1}, 166, egret.Ease.circIn).call(function():void {
				egret.Tween.removeTweens(bankrupt);
			});
			if (showTime) {
				self._bankruptView = new BankruptView();
				self._bankruptView.x = -170;
				self._bankruptView.y = -100;
				self._bankruptView.name = "" + pos;
				gun.addChild(self._bankruptView);
				self._bankruptView.setText(time);
				self._bankruptView.startTick();
			}
		}
		let onResourceLoadError = function():void {
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResourceLoadError, self);
		}
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResourceLoadError, this);

		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BankruptUI.exml", function(clazz:any, url:string) {
			RES.createGroup("bankrupt_fishing_png", ["bankrupt_fishing_png"]);
			RES.loadGroup("bankrupt_fishing_png");
		}, this);
	}

	/** 移除破产状态显示 */
	public removeBankrupt(pos:number):void {
		let gun = this.getGunGroup(pos);
		let tempChild = gun.getChildByName("bankrupt" + pos);
		if (tempChild) {
			gun.removeChild(tempChild);
		}
		if (this._bankruptView && pos == Number(this._bankruptView.name)) {
			this._bankruptView.destroy();
			this._bankruptView.parent && this._bankruptView.parent.removeChild(this._bankruptView);
		}
	}

	/** 隐藏解锁按钮 */
	public setHideUnlock():void {
		this.unlockBtn.visible = false;
		this.unlockGunGroup.visible = false;
		this.bossBtn.visible = false;
		return;
		if (this.bossBtn.visible) {
			return;
		}
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		if (userModel.getMatchRoomLevel() != RequesetRoomState.SelectRoom) {
			return;
		}
		this.bossBtn.visible = true;
		this.bossBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
			let view:WorldBossView = new WorldBossView();
			let med:WorldBossMediator = new WorldBossMediator(view);
			burn.Director.pushView(med);
		}, this);
	}

	//获取特效播放位置
	private getGunGroup(pos:number):eui.Group {
		switch (pos) {
			case RoomPosEnum.GUN_POS_0:
				return this.pos_0;
			case RoomPosEnum.GUN_POS_1:
				return this.pos_1;
			case RoomPosEnum.GUN_POS_2:
				return this.pos_2;
			case RoomPosEnum.GUN_POS_3:
				return this.pos_3;
		}
	}	
	public getGunPointByPos(pos:number, isFlip:boolean):eui.Group {
		if (isFlip) {
			switch (pos) {
				case RoomPosEnum.GUN_POS_0:
					return this.posEff_3;
				case RoomPosEnum.GUN_POS_1:
					return  this.posEff_2;
				case RoomPosEnum.GUN_POS_2:
					return  this.posEff_1;
				case RoomPosEnum.GUN_POS_3:
					return  this.posEff_0;
			}
		} else {
			switch (pos) {
				case RoomPosEnum.GUN_POS_0:
					return this.posEff_0;
				case RoomPosEnum.GUN_POS_1:
					return this.posEff_1;
				case RoomPosEnum.GUN_POS_2:
					return this.posEff_2;
				case RoomPosEnum.GUN_POS_3:
					return this.posEff_3;
			}
		}
		return null;
	}

	public setExchangeByPos(pos:number, isFlip:boolean, isShow:boolean):void {
		if (isFlip) {
			switch (pos) {
				case RoomPosEnum.GUN_POS_0:
					this.exchange_3.visible = isShow;
					break;
				case RoomPosEnum.GUN_POS_1:
					this.exchange_2.visible = isShow;
					break;
				case RoomPosEnum.GUN_POS_2:
					this.exchange_1.visible = isShow;
					break;
				case RoomPosEnum.GUN_POS_3:
					this.exchange_0.visible = isShow;
					break;
			}
		} else {
			switch (pos) {
				case RoomPosEnum.GUN_POS_0:
					this.exchange_0.visible = isShow;
					break;
				case RoomPosEnum.GUN_POS_1:
					this.exchange_1.visible = isShow;
					break;
				case RoomPosEnum.GUN_POS_2:
					this.exchange_2.visible = isShow;
					break;
				case RoomPosEnum.GUN_POS_3:
					this.exchange_3.visible = isShow;
					break;
			}
		}
	}
	//获取排行信息
	public getRankByPos(pos:number, isFlip:boolean):eui.Group {
		if (isFlip) {
			switch (pos) {
				case RoomPosEnum.GUN_POS_0:
					return this.posEff_7;
				case RoomPosEnum.GUN_POS_1:
					return  this.posEff_6;
				case RoomPosEnum.GUN_POS_2:
					return  this.posEff_5;
				case RoomPosEnum.GUN_POS_3:
					return  this.posEff_4;
			}
		} else {
			switch (pos) {
				case RoomPosEnum.GUN_POS_0:
					return this.posEff_4;
				case RoomPosEnum.GUN_POS_1:
					return this.posEff_5;
				case RoomPosEnum.GUN_POS_2:
					return this.posEff_6;
				case RoomPosEnum.GUN_POS_3:
					return this.posEff_7;
			}
		}
		return null;
	}
	public setShowChakan(roomer:game.model.Roomer,bFlip:boolean):void {
		let id = roomer.getUserId();
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let newPos = RoomUtil.getPosByFlip(roomer.getRoomPos(),bFlip);
		if (id == userModel.getUserId()) {
			this.chakanUI.setMine();
		} else {
			if (newPos > 1) {
				this.chakanUI.setOther(true,roomer);
			} else {
				this.chakanUI.setOther(false,roomer);
			}
		}
		let posObj:eui.Group = this.getGunPointByPos(newPos,false);
		let posPoint = new egret.Point(posObj.x,posObj.y);
		let posX = posPoint.x + CONFIG.adaptX;
		let posY = posPoint.y + CONFIG.adaptY;
		if (posY > 360) {
			posY -= 100;
			posY -= CONFIG.adaptY;
		}
		if (posY < 360) {
			posY += 300;
			posY += CONFIG.adaptY;
		}
		this.chakanUI.x = posX;
		this.chakanUI.y = posY;
		this.bShowChakan = true;
		this.nChakanPos = roomer.getRoomPos();
	}
	public setHideChakan():void {
		this.chakanUI.x = -500;
		this.chakanUI.y = -500;
		this.bShowChakan = false;
		this.nChakanPos = -1;
	}

	//添加一个按钮
	public addCiriBtn():void {
		if (this.ciriGroup.numChildren > 0) {
			//已经存在按钮
			return;
		}
		RES.getResAsync("CiRiLiBao_png", (data, key)=>{
			let img = new eui.Image(data);
			img.x = -img.width/2;
			img.y = -img.height/2;
			img.touchEnabled = false;
			this.ciriGroup.addChild(img);
		}, this);
		
		this.ciriGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
			burn._Notification_.send(NotifyEnum.POP_CIRI);
		}, this);

		let posX = this.ciriGroup.x;
		let posY = this.ciriGroup.y;

		this.ciriGroup.x = CONFIG.contentWidth/2;
		this.ciriGroup.y = CONFIG.contentHeight/2;
		this.ciriGroup.scaleX = 0.3;
		this.ciriGroup.scaleY = 0.3;

		let tw = egret.Tween.get(this.ciriGroup, {loop: false});
		let self = this;
		tw.to({x:posX, y:posY, scaleX:0.7, scaleY:0.7}, 1000, egret.Ease.backOut)
		.call(function(){
			egret.Tween.removeTweens(self.ciriGroup);
		});
	}

	//凤凰UI
	public addPhoenixShield(cur:number, max:number):void {
		if (this.shieldGroup.numChildren > 0) {
			//已经存在UI
			this.setPhoenixShield(cur, max);
			if ((max - cur) <= 0) {
				this.clearPhoenixUI();
			}
			return ;
		}
		let self = this;
		//添加UI,然后回调 
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/worldBoss/worldBossShield.exml", function(){
			self.shieldUI = new PhoenixShield();
			self.shieldUI.anchorOffsetX = self.shieldUI.width/2;
			self.shieldUI.anchorOffsetY = 0;
			self.shieldGroup.addChild(self.shieldUI);
			self.setPhoenixShield(cur, max);
			burn._Notification_.send(NotifyEnum.CHANGE_PHOENIX_UI);
		}, this);

		return ;
	}
	//护盾UI
	private setPhoenixShield(cur:number, max:number):void {
		this.shieldUI && this.shieldUI.setData(cur, max);
	}
	//凤凰顶部的时间
	public addShieldTopPanel():void {
		if (this.bossTopGroup.numChildren > 0) {
			//已经存在UI
			return;
		}
		let self = this;
		//添加UI,然后回调 
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/worldBoss/worldBossTips.exml", function(){
			self.shieldTips = new PhoenixTop();
			self.shieldTips.anchorOffsetX = self.shieldTips.width/2;
			self.shieldTips.anchorOffsetY = 0;
			self.bossTopGroup.addChild(self.shieldTips);
			self.shieldTips.start();
		}, this);
	}
	//tops
	public clearPhoenixTop():void {
		this.bossTopGroup.removeChildren();
		this.shieldTips = null;
	}
	//清除UI
	public clearPhoenixUI():void {
		this.shieldGroup.removeChildren();
		this.shieldUI = null;
	}

	//////////////////////////海盗悬赏任务////////////////////////////////////
	public changePriceTask() {
		if (this.priceTaskUI) {
			this.priceTaskUI.setTask();
			return;
		}
		this.guideTaskGroup.removeChildren();
		let self = this;
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/price/PriceTask.exml", ()=>{
			self.priceTaskUI = new PriceTaskUI();
			self.priceTaskUI.anchorOffsetX = self.priceTaskUI.width/2;
			self.priceTaskUI.anchorOffsetY = 0;
			self.guideTaskGroup.addChild(self.priceTaskUI);
			burn._Notification_.send(NotifyEnum.PRICE_TASK_CHANGE);
		}, this);
	}

	//清除任务
	public clearPriceTask():void {
		this.guideTaskGroup.removeChildren();
		this.priceTaskUI = null;
	}

	//显示排行信息
	public showPriceRank(pos:number, isFlip, rank:number):void {
		let group = this.getRankByPos(pos, isFlip);
		group.removeChildren();
		if (rank == -1) {
			return;
		}
		let priceRankUI = new PriceTaskRankUI(rank);
		group.addChild(priceRankUI);
	}

	//情况排行
	public clearPriceRank():void {
		for (let i = 0; i < 4; i++) {
			let group = this.getRankByPos(i, true);
			group.removeChildren();
		}
	}
	//海盗悬赏任务失败的UI
	public showPriceFail():void {
		let self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/price/PriceFail.exml",()=>{
            let ui = new PriceFailUI();
            self.addChild(ui);
            ui.anchorOffsetX = ui.width/2;
            ui.anchorOffsetY = ui.height/2;
            ui.x = self.width/2;
            ui.y = self.height/2;
            let tw = egret.Tween.get(ui,{loop:false});
            tw.wait(2000).call(function(){
                egret.Tween.removeTweens(ui);
                self.removeChild(ui);
            });
        }, this);
	}
	public getIsChakan():boolean {
		return this.bShowChakan;
	}
	/** 获取冰冻和锁定组件 */
	public getFrozenAndLockUI():FrozenAndLockUI {
		return this._frozenAndLockUI;
	}
	/**获取炮倍解锁的组件 */
	public getUnlockUpdateUI():UnlockGunUpdateUI{
		return this._unlockGunUpdateUI;
	}
	/** 获取道具侧边栏组件 */
	public getSidePropUI():SidePropUI {
		return this._sidePropUI;
	}
	/** 获取弹头组件 */
	public getGoldBtn():NewProgresButton {
		return this.goldBulletBtn;
	}
	public getSilverBtn():NewProgresButton {
		return this.silverBulletBtn;
	}
	public getBronzeBtn():NewProgresButton {
		return this.bronzeBulletBtn;
	}
	public getNuclearBtn():NewProgresButton {
		return this.nuclearBulletBtn;
	}
	public getGuideTaskUI():GuideTaskUI {
		return this._guideTaskUI;
	}

	public destory():void {
		//移除按钮封装
		while (this.btnWrapList.length > 0) {
			let wrap = this.btnWrapList.pop();
			wrap.destroy();
		}
		//移除事件监听
		this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.exitRoom, this);
		this.openWarHeadBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseWarHead, this);
		this.shrinkBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseShrink, this);
		this.shrinkBackBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseShrink, this);
		this.lotteryBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openLotteryGroup, this);
		this.lotteryBtn.name = "lotteryBtn";
		this.lotteryGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openLotteryView, this);
		this.lotteryGroup.name = "lotteryGroup";
		this.addRateBtn_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.modifRate, this);
		this.addRateBtn_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.modifRate, this);
		this.reduceRateBtn_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.modifRate, this);
		this.reduceRateBtn_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.modifRate, this);
		this.getCoinsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getCoins, this);
		this.exchangeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.exchange, this);
		this.shopBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openShopView, this);
		this.unlockBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openGunUpdateGroup, this);
		this.warUI.closeWarGroupBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseWarHead, this);

		burn.tools.TweenTools.clearTween(this.waiting_0);
		burn.tools.TweenTools.clearTween(this.waiting_1);
		burn.tools.TweenTools.clearTween(this.waiting_2);
		burn.tools.TweenTools.clearTween(this.waiting_3);
	}
}