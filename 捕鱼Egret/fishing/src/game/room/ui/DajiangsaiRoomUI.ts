class DajiangsaiRoomUI extends RoomUI {
	/** ---------------------------大奖赛相关----------------------------- */
	public DjsGroup: eui.Group;
	//积分组
	public DjsScore_0: eui.Group;
	public DjsScore_1: eui.Group;
	public DjsScore_2: eui.Group;
	public DjsScore_3: eui.Group;
	public DjsScoreArr: Array<eui.Group>;
	//积分标签
	public DjsScoreLab_0: egret.BitmapText;
	public DjsScoreLab_1: egret.BitmapText;
	public DjsScoreLab_2: egret.BitmapText;
	public DjsScoreLab_3: egret.BitmapText;
	public DjsScoreLabArr: Array<egret.BitmapText>;

	//排名积分
	public rankScoreLab: egret.BitmapText;
	public bulletNumLab: egret.BitmapText;
	//完成任务 积分增加 的提示
	public scoreTips: eui.BitmapLabel;
	public scoreTipsAdd:eui.Group;
	//任务的族群
	public DjsTaskGroup: eui.Group;
	//时间
	public taskTimeLab: eui.Label;
	//积分标签
	public scoreGainLab: eui.Label;
	public _timer: egret.Timer;
	//任务图标组
	public gain_0: eui.Group;
	public gain_1: eui.Group;
	public gain_2: eui.Group;
	public gainArr: Array<eui.Group>;
	//任务奖励数量
	public gainNumLab_0: eui.Label;
	public gainNumLab_1: eui.Label;
	public gainNumLab_2: eui.Label;
	public gainLabArr: Array<eui.Label>;

	//按钮
	public DjsBtn: eui.Button;
	/**------------------------------ 全民赛------------------------------ */
	public Djs: eui.Group;
	public qmsGroup_0: eui.Group;
	public qmsGroup_1: eui.Group;
	public qmsGroup_2: eui.Group;
	public qmsGroup_3: eui.Group;

	public addGoldBtn_0: eui.Button;
	public addGemBtn_0: eui.Button;
	public addGoldBtn_1: eui.Button;
	public addGemBtn_1: eui.Button;
	public addGoldBtn_2: eui.Button;
	public addGemBtn_2: eui.Button;
	public addGoldBtn_3: eui.Button;
	public addGemBtn_3: eui.Button;
	/**-------------------------------快速赛--------------------------------*/
	public KssGroup: eui.Group;
	public timeLab: eui.Label;
	public rankLab: eui.Label;

	public cur_0: eui.Image;//140
	public sel_0: eui.Image;//选中
	public rank_0: eui.Label;//第几名
	public kssScore_0: eui.Label;//积分

	public cur_1: eui.Image;//140
	public sel_1: eui.Image;//选中
	public rank_1: eui.Label;//第几名
	public kssScore_1: eui.Label;//积分

	public cur_2: eui.Image;//140
	public sel_2: eui.Image;//选中
	public rank_2: eui.Label;//第几名
	public kssScore_2: eui.Label;//积分

	public cur_3: eui.Image;//140
	public sel_3: eui.Image;//选中
	public rank_3: eui.Label;//第几名
	public kssScore_3: eui.Label;//积分

	public _arrCur: Array<eui.Image>;
	public _arrSel: Array<eui.Image>;
	public _arrRank: Array<eui.Label>;
	public _arrScore: Array<eui.Label>;

	//子弹和积分
	public kssGroup_0: eui.Group;
	public kssGem_0: eui.Image;
	public kssCup_0: eui.Image;

	public kssGroup_1: eui.Group;
	public kssGem_1: eui.Image;
	public kssCup_1: eui.Image;

	public kssGroup_2: eui.Group;
	public kssGem_2: eui.Image;
	public kssCup_2: eui.Image;

	public kssGroup_3: eui.Group;
	public kssGem_3: eui.Image;
	public kssCup_3: eui.Image;

	//房间类型
	public img_0: eui.Image;
	public img_1: eui.Image;
	public img_2: eui.Image;
	public img_3: eui.Image;

	public _nKssEndTime: number;

	///////////////////////////////////////////按钮特效////////////////////////////////////////////
	public djsEffectGroup: eui.Group;
	public constructor(clazz: any) {
		super(clazz);
		//this.guideTaskGroup.visible = false;
	}
	/** 大奖赛 */
	public setDjsUI(isFlip: boolean): void {
		//新手引导不显示
		this.guideTaskGroup.visible = false;

		this.djsEffectGroup.removeChildren();
		let ef_button = new egret.Bitmap(RES.getRes("ef_rotation_bg_png"));
		burn.tools.TweenTools.rotation(ef_button, 10000);
		ef_button.anchorOffsetX = ef_button.width / 2;
		ef_button.anchorOffsetY = ef_button.height / 2;
		this.djsEffectGroup.addChild(ef_button);

		this.getCoinsBtn.visible = true;
		this.exchangeBtn.visible = true;
		this.lotteryBtn.visible = false;
		this.unlockBtn.visible = false;
		this.unlockGunGroup.visible = false;
		this.lotteryGroup.visible = false;
		this.exchangeGroup.visible = false;
		this.effect_Gold.visible = false;
		this.effect_Arena.visible = false;

		//大奖赛组显示
		this.DjsGroup.visible = true;
		//设置自己的积分,子弹数量
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
		let roomer = roomModel.getRoomerById(userModel.getUserId());
		let djsObj = roomer.getDjsObj();
		if (djsObj) {
			this.rankScoreLab.text = djsObj.grandPrixIntegral + "";
			this.bulletNumLab.text = djsObj.grandPrixBulletNum + "";
		} else {
			this.rankScoreLab.text = "0";
			this.bulletNumLab.text = "0";
		}
		this.DjsScoreArr = new Array<eui.Group>();
		this.DjsScoreArr.push(this.DjsScore_0);
		this.DjsScoreArr.push(this.DjsScore_1);
		this.DjsScoreArr.push(this.DjsScore_2);
		this.DjsScoreArr.push(this.DjsScore_3);

		this.DjsScoreLabArr = new Array<egret.BitmapText>();
		this.DjsScoreLab_0.text = "0";
		this.DjsScoreLab_1.text = "0";
		this.DjsScoreLab_2.text = "0";
		this.DjsScoreLab_3.text = "0";
		this.DjsScoreLabArr.push(this.DjsScoreLab_0);
		this.DjsScoreLabArr.push(this.DjsScoreLab_1);
		this.DjsScoreLabArr.push(this.DjsScoreLab_2);
		this.DjsScoreLabArr.push(this.DjsScoreLab_3);

		this.gainArr = new Array<eui.Group>();
		this.gainArr.push(this.gain_0);
		this.gainArr.push(this.gain_1);
		this.gainArr.push(this.gain_2);

		this.gainLabArr = new Array<eui.Label>();
		this.gainLabArr.push(this.gainNumLab_0);
		this.gainLabArr.push(this.gainNumLab_1);
		this.gainLabArr.push(this.gainNumLab_2);

		let pos = RoomUtil.getPosByFlip(roomer.getRoomPos(), isFlip);
		this.DjsScoreArr[pos].visible = false;

		for (let i = 0; i < 4; i++) {
			let roomerItem = roomModel.getRoomerByPos(i);
			if (!roomerItem) {
				this.DjsScoreArr[i].visible = false;
			}
		}

		this.DjsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openArenaSignView, this);
		this.btnWrapList.push(new burn.tools.UIWrap(this.DjsBtn));
		this.DjsTaskGroup.visible = false;
		//加减炮倍
		let gunId = userModel.getCurGunID();
		let gunVo = game.table.T_Gun_Table.getVoByKey(gunId);
		if (gunVo.bulletNum < 3000) {
			this.addRateBtn_0.visible = false;
			this.reduceRateBtn_0.visible = false;
			this.addRateBtn_1.visible = false;
			this.reduceRateBtn_1.visible = false;
		}

		this.warGroupPos.visible = false;
		this.openWarHeadBtn.visible = false;
	}

	//根据位置设置积分显示隐藏
	public setDjsScoreVisableByPos(pos: number, vis: boolean): void {
		if (this.DjsScoreArr) {
			this.DjsScoreArr[pos].visible = vis;
		}
	}
	//根据位置设置积分
	public setDjsScoreByPos(pos: number, num: number): void {
		this.DjsScoreLabArr[pos].text = num + "";
	}

	//设置任务
	public setDjsTask(times: number): void {
		let self = this;
		let taskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX);
		let scoreStr = game.table.T_Config_Table.getVoByKey(69).value;
		let index = 0;
		if (userModel.getMatchRoomLevel() == RequesetRoomState.DjsRoom) {
			index = 0;
		} else if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
			index = 1;
		}
		let scorData = scoreStr.split(",")[index].split("_")[times];
		this.scoreGainLab.text = "积分+" + scorData;
		if (taskList.length == 0) {
			this.DjsTaskGroup.visible = false;
		} else {
			this.DjsTaskGroup.visible = true;
		}
		if (this._timer) {
			this._timer.stop();
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
			this._timer = null;
		}
		//定义Timer
		this._timer = new egret.Timer(1000, 0);
		//注册事件侦听器
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this._timer.start();

		//奖励更新
		this.gain_0.removeChildren();
		this.gain_1.removeChildren();
		this.gain_2.removeChildren();

		this.gainNumLab_0.text = "";
		this.gainNumLab_1.text = "";
		this.gainNumLab_2.text = "";

		let len = taskList.length;
		let comArr = 0;
		for (let i = 0; i < len; i++) {
			let item = taskList[i];
			if (i >= self.gainLabArr.length) {
				continue;
			}
			let vo = game.table.T_FishTaskItem_Table.getVoByKey(item.getTaskID());
			if (!vo) {
				continue;
			}
			self.gainLabArr[i].text = item.getValue() + "/" + vo.parameter2;
			if (item.getValue() >= vo.parameter2) {
				comArr++;
			}
			let fishVo = game.table.T_Fish_Table.getVoByKey(vo.parameter1);
			if (!fishVo) {
				continue;
			}
			(function (fishVo, i, group) {
				let txtr = "fishkind_" + fishVo.fishkindIcon + "_png";
				let self = this;
				RES.getResAsync(txtr, function (): void {
					let txture: egret.Texture = RES.getRes(txtr);
					let img: egret.Bitmap = new egret.Bitmap(txture);
					img.scaleX = 0.7;
					img.scaleY = 0.7;
					img.anchorOffsetX = img.width / 2;
					img.anchorOffsetY = img.height / 2;
					group.addChild(img);
				}, this);
			})(fishVo, i, self.gainArr[i]);
		}
		//任务完成
		if (comArr == len) {
			this.scoreTipsAdd.visible = true;
			this.scoreTips.text = scorData;
			let tipsTw = egret.Tween.get(this.scoreTipsAdd);
			tipsTw.to({ alpha: 0 }, 500).to({ alpha: 1 }, 500)
				.to({ alpha: 0 }, 500).to({ alpha: 1 }, 500)
				.to({ alpha: 0 }, 500).to({ alpha: 1 }, 500)
				.to({ alpha: 0 }, 500).to({ alpha: 1 }, 500)
				.call(() => {
					egret.Tween.removeTweens(this.scoreTipsAdd);
					this.scoreTipsAdd.visible = false;
					this.rankScoreLab.text = Number(this.rankScoreLab.text) + Number(scorData) + "";
				});
			let tw = egret.Tween.get(this.DjsTaskGroup, { loop: false });
			tw.to({ alpha: 0 }, 500)
				.to({ alpha: 1 }, 500)
				.to({ alpha: 0 }, 500)
				.to({ alpha: 1 }, 500)
				.to({ alpha: 0 }, 500)
				.to({ alpha: 1 }, 500)
				.to({ alpha: 0 }, 500)
				.to({ alpha: 1 }, 500)
				.call(() => {
					egret.Tween.removeTweens(this.DjsTaskGroup);
					this.clearTask();
				});
		}
	}
	private timerFunc(): void {
		let taskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
		let taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX);
		if (taskList.length == 0) {
			return;
		}
		let len = taskList.length;
		let time = taskList[0].getComTime();
		let residueTime = time - game.util.TimeUtil.getCurrTime();
		if (residueTime <= 0) {
			//任务失败
			burn._Notification_.send(NotifyEnum.PRICE_CHALLENGE_FAIL);
			this.clearTask();
			return;
		}
		let timeStr = game.util.TimeUtil.sceonds2MinStr(residueTime);
		this.taskTimeLab.text = timeStr;
	}

	//清空大奖赛任务
	public clearTask(): void {
		let taskModel = burn.Director.getModelByKey(TaskModel) as TaskModel;
		let taskList = taskModel.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX);
		let len = taskList.length;
		for (let i = 0; i < len; i++) {
			taskModel.removeItem(taskList[i].getTaskID());
		}
		this.DjsTaskGroup.visible = false;
		if (this._timer) {
			this._timer.stop();
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
			this._timer = null;
		}
	}

	//更新子弹数量
	public updateDjdBulletNum(value: number): void {
		this.bulletNumLab.text = value + "";
	}

	//更新积分显示
	public updateDjsScore(value: number): void {
		this.rankScoreLab.text = value + "";
	}

	//打开大奖赛报名
	public openArenaSignView(): void {
		if (this._bOpenSignView) {
			return;
		}
		this._bOpenSignView = true;
		//加入判断。单次加载
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		if (userModel.getMatchRoomLevel() == RequesetRoomState.DjsRoom) {
			let view: DjsView = new DjsView();
			let med: DjsMediator = new DjsMediator(view);
			burn.Director.pushView(med);
		} else if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
			let view1: QmsView = new QmsView();
			let med1: QmsMediator = new QmsMediator(view1);
			burn.Director.pushView(med1);
		}
	}

	/**---------------------------全民赛-------------------------------*/
	/** 全民赛 */
	public setQmsUI(isFlip: boolean): void {
		//新手引导不显示
		this.guideTaskGroup.visible = false;
		this.djsEffectGroup.removeChildren();
		let ef_button = new egret.Bitmap(RES.getRes("ef_rotation_bg_png"));
		burn.tools.TweenTools.rotation(ef_button, 10000);
		ef_button.anchorOffsetX = ef_button.width / 2;
		ef_button.anchorOffsetY = ef_button.height / 2;
		this.djsEffectGroup.addChild(ef_button);

		this.getCoinsBtn.visible = true;
		this.exchangeBtn.visible = true;
		this.lotteryBtn.visible = false;
		this.unlockBtn.visible = false;
		this.unlockGunGroup.visible = false;
		this.lotteryGroup.visible = false;
		this.exchangeGroup.visible = false;
		this.effect_Gold.visible = false;
		this.effect_Arena.visible = false;

		//大奖赛组显示
		this.DjsGroup.visible = true;
		//设置自己的积分,子弹数量
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
		let roomer = roomModel.getRoomerById(userModel.getUserId());
		let djsObj = roomer.getDjsObj();
		if (djsObj) {
			this.rankScoreLab.text = djsObj.grandPrixIntegral + "";
			this.bulletNumLab.text = djsObj.grandPrixBulletNum + "";
		} else {
			this.rankScoreLab.text = "0";
			this.bulletNumLab.text = "0";
		}
		this.DjsScoreArr = new Array<eui.Group>();
		this.DjsScoreArr.push(this.DjsScore_0);
		this.DjsScoreArr.push(this.DjsScore_1);
		this.DjsScoreArr.push(this.DjsScore_2);
		this.DjsScoreArr.push(this.DjsScore_3);

		this.DjsScoreLabArr = new Array<egret.BitmapText>();
		this.DjsScoreLab_0.text = "0";
		this.DjsScoreLab_1.text = "0";
		this.DjsScoreLab_2.text = "0";
		this.DjsScoreLab_3.text = "0";
		this.DjsScoreLabArr.push(this.DjsScoreLab_0);
		this.DjsScoreLabArr.push(this.DjsScoreLab_1);
		this.DjsScoreLabArr.push(this.DjsScoreLab_2);
		this.DjsScoreLabArr.push(this.DjsScoreLab_3);

		this.gainArr = new Array<eui.Group>();
		this.gainArr.push(this.gain_0);
		this.gainArr.push(this.gain_1);
		this.gainArr.push(this.gain_2);

		this.gainLabArr = new Array<eui.Label>();
		this.gainLabArr.push(this.gainNumLab_0);
		this.gainLabArr.push(this.gainNumLab_1);
		this.gainLabArr.push(this.gainNumLab_2);

		let pos = RoomUtil.getPosByFlip(roomer.getRoomPos(), isFlip);
		this.DjsScoreArr[pos].visible = false;

		for (let i = 0; i < 4; i++) {
			let roomerItem = roomModel.getRoomerByPos(i);
			if (!roomerItem) {
				this.DjsScoreArr[i].visible = false;
			}
		}

		this.DjsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openArenaSignView, this);
		this.btnWrapList.push(new burn.tools.UIWrap(this.DjsBtn));
		this.DjsTaskGroup.visible = false;
		//加减炮倍
		this.addRateBtn_0.visible = false;
		this.reduceRateBtn_0.visible = false;
		this.addRateBtn_1.visible = false;
		this.reduceRateBtn_1.visible = false;

		this.qmsGroup_0.visible = true;
		this.addGoldBtn_0.visible = false;
		this.addGemBtn_0.visible = false;

		this.qmsGroup_1.visible = true;
		this.addGoldBtn_1.visible = false;
		this.addGemBtn_1.visible = false;

		this.qmsGroup_2.visible = true;
		this.addGoldBtn_2.visible = false;
		this.addGemBtn_2.visible = false;

		this.qmsGroup_3.visible = true;
		this.addGoldBtn_3.visible = false;
		this.addGemBtn_3.visible = false;

		this.Djs.visible = false;
		this.warGroupPos.visible = false;
		this.openWarHeadBtn.visible = false;
	}

	/**-------------------------------------快速赛------------------------------------*/
	public setKssUI(isFlip: boolean): void {
		//新手引导不显示
		this.guideTaskGroup.visible = false;

		this.getCoinsBtn.visible = false;
		this.exchangeBtn.visible = false;
		this.lotteryBtn.visible = false;
		this.unlockBtn.visible = false;
		this.unlockGunGroup.visible = false;
		this.lotteryGroup.visible = false;
		this.exchangeGroup.visible = false;
		this.effect_Gold.visible = false;
		this.effect_Arena.visible = false;

		this.KssGroup.visible = true;

		this.qmsGroup_0.visible = true;
		this.addGoldBtn_0.visible = false;
		this.addGemBtn_0.visible = false;

		this.qmsGroup_1.visible = true;
		this.addGoldBtn_1.visible = false;
		this.addGemBtn_1.visible = false;

		this.qmsGroup_2.visible = true;
		this.addGoldBtn_2.visible = false;
		this.addGemBtn_2.visible = false;

		this.qmsGroup_3.visible = true;
		this.addGoldBtn_3.visible = false;
		this.addGemBtn_3.visible = false;

		this._arrCur = new Array<eui.Image>();
		this._arrCur.push(this.cur_0);
		this._arrCur.push(this.cur_1);
		this._arrCur.push(this.cur_2);
		this._arrCur.push(this.cur_3);

		this._arrSel = new Array<eui.Image>();
		this._arrSel.push(this.sel_0);
		this._arrSel.push(this.sel_1);
		this._arrSel.push(this.sel_2);
		this._arrSel.push(this.sel_3);
		//添加动画
		burn.tools.TweenTools.showOutAndIn(this.sel_0, 1500);
		burn.tools.TweenTools.showOutAndIn(this.sel_1, 1500);
		burn.tools.TweenTools.showOutAndIn(this.sel_2, 1500);
		burn.tools.TweenTools.showOutAndIn(this.sel_3, 1500);

		this._arrRank = new Array<eui.Label>();
		this._arrRank.push(this.rank_0);
		this._arrRank.push(this.rank_1);
		this._arrRank.push(this.rank_2);
		this._arrRank.push(this.rank_3);

		this._arrScore = new Array<eui.Label>();
		this._arrScore.push(this.kssScore_0);
		this._arrScore.push(this.kssScore_1);
		this._arrScore.push(this.kssScore_2);
		this._arrScore.push(this.kssScore_3);


		this.DjsScoreArr = new Array<eui.Group>();
		this.DjsScoreArr.push(this.DjsScore_0);
		this.DjsScoreArr.push(this.DjsScore_1);
		this.DjsScoreArr.push(this.DjsScore_2);
		this.DjsScoreArr.push(this.DjsScore_3);

		this.DjsScoreLabArr = new Array<egret.BitmapText>();
		this.DjsScoreLab_0.text = "0";
		this.DjsScoreLab_1.text = "0";
		this.DjsScoreLab_2.text = "0";
		this.DjsScoreLab_3.text = "0";
		this.DjsScoreLabArr.push(this.DjsScoreLab_0);
		this.DjsScoreLabArr.push(this.DjsScoreLab_1);
		this.DjsScoreLabArr.push(this.DjsScoreLab_2);
		this.DjsScoreLabArr.push(this.DjsScoreLab_3);

		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
		let roomer = roomModel.getRoomerById(userModel.getUserId());

		let pos = RoomUtil.getPosByFlip(roomer.getRoomPos(), isFlip);
		this.DjsScoreArr[pos].visible = false;
		for (let i = 0; i < 4; i++) {
			let roomerItem = roomModel.getRoomerByPos(i);
			if (!roomerItem) {
				this.DjsScoreArr[i].visible = false;
			}
		}

		this.addRateBtn_0.visible = false;
		this.reduceRateBtn_0.visible = false;
		this.addRateBtn_1.visible = false;
		this.reduceRateBtn_1.visible = false;

		let imgArr = new Array<eui.Image>();
		imgArr.push(this.img_0);
		imgArr.push(this.img_1);
		imgArr.push(this.img_2);
		imgArr.push(this.img_3);
		let roomType = userModel.getMatchRoomLevel();
		for (let i = 0; i < imgArr.length; i++) {
			if ((i + 7) == roomType) {
				imgArr[i].visible = true;
			} else {
				imgArr[i].visible = false;
			}
		}
		//核弹不显示
		this.warGroupPos.visible = false;
		this.openWarHeadBtn.visible = false;
	}

	//快速赛开始，添加计时器
	public startKssTime(value: number): void {
		this._nKssEndTime = value;
		if (this._timer) {
			this._timer.stop();
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFuncKss, this);
			this._timer = null;
		}
		//定义Timer
		this._timer = new egret.Timer(1000, 0);
		//注册事件侦听器
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFuncKss, this);
		this._timer.start();
	}
	//快速赛时间变更
	private timerFuncKss(): void {
		let time = this._nKssEndTime;
		let residueTime = time - game.util.TimeUtil.getCurrTime();
		if (residueTime <= 0) {
			if (this._timer) {
				this._timer.stop();
				this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFuncKss, this);
				this._timer = null;
			}
			return;
		}
		let timeStr = game.util.TimeUtil.sceonds2MinStr(residueTime);
		this.timeLab.text = timeStr;
	}
	//变更快速赛左侧排行信息
	public changeKssInfoList(arrData: Array<QuickInfo>, rank: number): void {
		//最大子弹数
		let maxBullet = 600;
		let len = arrData.length;
		for (let i = 0; i < len; i++) {
			let item = arrData[i];
			if (i == rank) {
				this._arrSel[i].visible = true;
			} else {
				this._arrSel[i].visible = false;
			}
			this._arrScore[i].text = item.getIntegral() + "";
			let percent = item.getBulletNum() * 1.0 / maxBullet;
			this._arrCur[i].width = 140.0 * percent;
		}
		if (rank >= 3) {
			this._arrRank[3].text = (rank + 1) + "";
			this._arrSel[3].visible = true;
		}
		this.rankLab.text = (rank + 1) + "/8";
	}

	public destory():void  {
		super.destory();
		this.DjsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openArenaSignView, this);
	}
}