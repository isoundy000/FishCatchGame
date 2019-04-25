class RoomView extends room.base.RoomBase {
	//最高层：99
	private _tipsLayer:egret.DisplayObjectContainer;
	//UI层：80
	private _roomUI:RoomUI;
	//逻辑最上层：70
	private _ceilingLayer:CeilingLayer;
	//子弹层 60
	private _bulletLayer:BulletLayer;
	//对象层：50
	private _objectLayer:ObjectLayer;
	//备用中间层：20
	private _floorLayer:FloorLayer;
	//背景层：10
	private _bgLayer:egret.DisplayObjectContainer;

	//是否反转场景
	private _isFlip:boolean;
	//我在房间里的位置
    private _myPositon:number;
	//屏幕适配的偏移量
	private _offsetWidth:number;

	//当前炮台倍率
	// private _gunRate:number;
	//上一次开炮时间
	private _preGunTime:number = 0;
	//帧时间
	private _timeOnEnterFrame:number;
	//当前开炮方向坐标点
	private _gunToPos:egret.Point;

	/*********************各种状态***********************/
	private _isInFire:boolean;		//是否在开炮状态
	//自动开炮标志
	private _autoFire:boolean;
	//锁定功能改
	private _arrLockedObj:Array<LockedObj> = null;

    //分身更换锁定鱼的枪口索引
    private _nAvaGunIndex:number = 0;
	
	private _isLocked:boolean;
	private _isRage:boolean;		//是否是狂暴状态
	private _isClone:boolean;		//是否是分身状态
	private _inHandWarHeadFish:number = -1;	//使用弹头时手选的奖金鱼
	private _selectFishState:boolean;	//是否是选择鱼的状态
	private _isBgInit:boolean = false;
	/*********************各种状态***********************/

	/** 自己有几个炮 */
	private _nGunNum:number;
	/** 自己子弹id */
	private _bulletId:number;
	/** 子弹最大数目 */
	private BULLET_MAX_COUNT:number;
	/** 缓存一个Usermodel */
	private _userModel: UserModel;
	/** 缓存一个roomModel */
	private _roomModel: RoomModel;
	public constructor() {
		super();
		this.initFishList();
		this.initBulletList();
		this._gunToPos = new egret.Point();
		this._isFlip = false;
		this._myPositon = 0;
		this._isInFire = false;
		this._autoFire = false;
		this._selectFishState = false;
		this._nGunNum = 2;
		this._bulletId = 0;
		this.BULLET_MAX_COUNT = Number(game.table.T_Config_Table.getVoByKey(29).value);
		this._userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		this._roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
	}

	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/GameFishing.exml", this.addBgResource, this);
		//初始化层级
		this._bgLayer = new egret.DisplayObjectContainer();
		this.addChildAt(this._bgLayer, 10);

		this._floorLayer = new FloorLayer();
		this.addChildAt(this._floorLayer, 20);

		this._objectLayer = new ObjectLayer();
		this.addChildAt(this._objectLayer, 50);

		this._bulletLayer = new BulletLayer;
		this.addChildAt(this._bulletLayer, 60);

		// this._ceilingLayer = new CeilingLayer();
		// this.addChildAt(this._ceilingLayer, 70);
		
		this._tipsLayer = new egret.DisplayObjectContainer();
		this.addChildAt(this._tipsLayer, 99);
		let self = this;
		let bgUrl = "background_" + this._userModel.getMatchRoomLevel() + "_jpg";
		RES.getResAsync(bgUrl, function(data, key) {
			//添加背景
			let bg:egret.Bitmap = new egret.Bitmap(data);
			self._bgLayer.addChild(bg);
			self._bgLayer.anchorOffsetX = bg.width >> 1;
			self._bgLayer.anchorOffsetY = bg.height >> 1;
			self._bgLayer.x = egret.MainContext.instance.stage.stageWidth >> 1;
			self._bgLayer.y = egret.MainContext.instance.stage.stageHeight >> 1;
			if (self._isBgInit) {
				self._bgLayer.touchEnabled = true;
				self._bgLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBegin, self);
				self._bgLayer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, self.touchCacel, self);
				self._bgLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.touchMove, self);
				self._bgLayer.addEventListener(egret.TouchEvent.TOUCH_END, self.touchEnd, self);
			}
			self.addBoguang();
			self._isBgInit = true;
		}, this);

		//适配宽度偏移量
		this._offsetWidth = (egret.MainContext.instance.stage.stageWidth - CONFIG.contentWidth) >> 1;
	}
	//添加波光粼粼效果
	public addBoguang():void {
		if (game.util.GorgeousManager.getState()) {
			RES.getResAsync("ef_boguang_json", ()=>{
				RES.getResAsync("ef_boguang_png",()=>{
					let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(
																			RES.getRes("ef_boguang_json"), 
																			RES.getRes("ef_boguang_png"));
					let bowen = new egret.MovieClip(mcFactory.generateMovieClipData("ef_boguang"));	
					bowen.name = "bowen";
					this._bgLayer.addChild(bowen);
					bowen.scaleX = 6.8;
					bowen.scaleY = 6.8;
					bowen.frameRate = 7;
					bowen.alpha = 0.5;
					bowen.blendMode = egret.BlendMode.ADD;
					bowen.gotoAndPlay("play", -1);
				}, self);
			}, self);
		} else {
			let child = this._bgLayer.getChildByName("bowen");
			if (child) {
				this._bgLayer.removeChild(child);
			}
		}
	}

	public startRoom():void {	
		this._isBgInit = true;
		//添加触摸事件
		this._objectLayer.touchEnabled = false;
        this._objectLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.fishTouchEnd, this);
		
		if (this._isBgInit) {
			this._bgLayer.touchEnabled = true;
			this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchCacel, this);
			this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
			this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
		}
		
		//添加帧事件
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this._preGunTime = 0;
		this._timeOnEnterFrame = egret.getTimer();
	}
	//UI加载完成
	private addBgResource(clazz:any,url:string):void {
		this._roomUI = new DajiangsaiRoomUI(clazz);
		this._roomUI.y += 10;
		this.addChildAt(this._roomUI, 80);
		this._roomUI.touchEnabled = false;
		//增加UI适配边框
		game.util.UIUtil.screenAdapter(this._roomUI);
	}

	//根据服务器信息设置UI数据
	public resetView(isFlip:boolean, roomerList:Array<game.model.Roomer>, myPos:number):void {
		this._isFlip = isFlip;
		this._myPositon = myPos;
		//设置界面反转
		if (this._isFlip) {
			this._objectLayer.rotation = 180;
			this._objectLayer.x = egret.MainContext.instance.stage.stageWidth;
			this._objectLayer.y = egret.MainContext.instance.stage.stageHeight;
		}
		//设置炮台显示
		for (let i = 0; i < roomerList.length; i++) {
			let roomer = roomerList[i];
			if (this._isFlip) {
				this._roomUI.setGunVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), this._isFlip), true);
			} else {
				this._roomUI.setGunVisableByPos(roomer.getRoomPos(), true);
			}
		}
	}
	/** 显示您在此处 */
	public showYourPos(pos:number):void {
		let rPos = RoomUtil.getMyPosByFlip(pos);
		this._roomUI.showYourPos(rPos);
	}

	/** 隐藏您在此处的提示 */
	public hideYourPos(pos:number):void {
		let rPos = RoomUtil.getMyPosByFlip(pos);
		this._roomUI.hideYourPos(rPos);
	}

	private touchBegin(evt:egret.TouchEvent) {
		this._isInFire = true;
		//this._preGunTime = 0;
		this._timeOnEnterFrame = egret.getTimer();
		this._gunToPos.x = evt.stageX;
		this._gunToPos.y = evt.stageY;

		let container = new egret.DisplayObjectContainer();
		let imgClick = new egret.Bitmap(RES.getRes("fish_click_png"));
		imgClick.scaleX = 0.1;
		imgClick.scaleY = 0.1;
		imgClick.anchorOffsetX = imgClick.width/2;
		imgClick.anchorOffsetY = imgClick.height/2;
		container.addChild(imgClick);

		let imgClick1 = new egret.Bitmap(RES.getRes("fish_click_png"));
		imgClick1.scaleX = 0.3;
		imgClick1.scaleY = 0.3;
		imgClick1.anchorOffsetX = imgClick1.width/2;
		imgClick1.anchorOffsetY = imgClick1.height/2;
		container.addChild(imgClick1);
		container.x = evt.stageX;
		container.y = evt.stageY;
		let scaleParam = 1.5
		let tw = egret.Tween.get(imgClick);
		let self = this;
		tw.to({scaleX:scaleParam, scaleY:scaleParam, alpha: 0.1},400).
		call(function(){
			egret.Tween.removeTweens(imgClick);
		});

		let tw1 = egret.Tween.get(imgClick1);
		imgClick1.visible = false;

		tw1.wait(190).
		call(function(){
			imgClick1.visible = true;
		}).to({scaleX:scaleParam, scaleY:scaleParam, alpha: 0.1},400).
		call(function(){
			egret.Tween.removeTweens(imgClick1);
			self._tipsLayer.removeChild(container);
		});

		this._tipsLayer.addChild(container);

		/*
		按住不丢。开枪速度。为最大速率
		//开枪
		this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), evt.stageX, evt.stageY);
		*/
	}

	private touchMove(evt:egret.TouchEvent) {
		this._gunToPos.x = evt.stageX;
		this._gunToPos.y = evt.stageY;
	}

	private touchCacel(evt:egret.TouchEvent) {
		this._isInFire = false;
	}
	private touchEnd(evt:egret.TouchEvent) {
		if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME) {
			this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), this._gunToPos.x, this._gunToPos.y);
			this._preGunTime = 0;
		}
		this._isInFire = false;
        if (this.getRoomUI().getIsChakan()) {
            this.getRoomUI().setHideChakan();
        }
	}

	private fishTouchEnd(evt:egret.TouchEvent) {
		let fishTarget:room.actor.FishBase = null;
		let len = this.getFishList().length;
		for (let i = 0; i < len; i++) {
			let fish = this.getFishList()[i].getActor();
			if (fish.getType() == AddFishType.FISH || fish.getType() == AddFishType.CATCH_WHOLE_FISH) {
				if (fish.hitTestPoint(evt.stageX, evt.stageY)) {
					this.send(NotifyEnum.SEND_CLICK_FISH, fish.getUniqId());
					fishTarget = fish as room.actor.FishBase;
					break;
				}
			} else if (fish.getType() == AddFishType.FISH_GROUP) {
				let fishList = (fish as room.actor.FishGroup).getFishList();
				let fLen = fishList.length;
				for (let j = 0; j < fLen; j++) {
					if (fishList[j].hitTestPoint(evt.stageX, evt.stageY)) {
						this.send(NotifyEnum.SEND_CLICK_FISH, fishList[j].getUniqId());
						fishTarget = fishList[j];
						break;
					}
				}
			}
		}
		if (fishTarget == null) {
			return;
		}
		if (this._isLocked || this._isRage || this._isClone) {
			if (this._isClone) {
				if (this._nAvaGunIndex == this._nGunNum) {
					this._nAvaGunIndex = 0;
				}
				this.changeLockedFish(this._userModel.getUserId(),fishTarget,this._nAvaGunIndex);
				this._nAvaGunIndex ++;
				//发消息。。。。告诉其他人。更改了枪and鱼
				this.send(NotifyEnum.LOCKED_FISH_CHANGE,{fishId:fishTarget.getUniqId(), gunIndex:this._nAvaGunIndex});
			} else {
				let curId = this._userModel.getGuideID();
				if(curId < 8 && CONFIG.openGuide)
				{
					return;
				}
				this.changeLockedFish(this._userModel.getUserId(),fishTarget);
				this.send(NotifyEnum.LOCKED_FISH_CHANGE,{fishId:fishTarget.getUniqId(), gunIndex:0});
			}
		}
	}
	private _frameCount = 0;
	//主循环帧事件
	private onEnterFrame(e:egret.Event) {
		//每3帧抽一帧
		if (this._frameCount == 2) {
			this._frameCount = 0;
			return;
		} else {
			this._frameCount++;
		}
		if (this._isLocked || this._isRage || this._isClone) {
			this._objectLayer.touchEnabled = true;
			this._bgLayer.touchEnabled = false;
		}
		//碰撞检测
		this.hitUpdate();
		//更新子弹逻辑
		this.bulletLogicUpdate();
		//更新炮台状态
		this.updateGunStatus();
	}

	/** 更新炮台显示 */
	private updateGunStatus():void {
		let now = egret.getTimer();
		let time = this._timeOnEnterFrame;
		let pass = now - time;
		this._timeOnEnterFrame = egret.getTimer();
		this._preGunTime += pass;
		if (this._isLocked || this._isRage || this._isClone) {
			if (this._isClone) {
				if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME) {
					let UserId = this._userModel.getUserId();
					let bulletN = this._nGunNum;
					for (let gunIndex = 0; gunIndex < bulletN; gunIndex++) {
						let fishId = this.getLockedFishId(UserId, gunIndex);
						let fish = RoomUtil.getFishById(this.getFishList(), fishId);
						if (!fish) {
							this.send(NotifyEnum.LOCKED_FISH_DISAPPEAR, {index:gunIndex, simple:false});
							return;
						}
						let lock = fish.getEFFECT_LAYER().getChildByName("locked");
						if (lock) {
							let pt = fish.localToGlobal(lock.x, lock.y);
							this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), pt.x, pt.y, gunIndex);
						} else {
							this.send(NotifyEnum.LOCKED_FISH_DISAPPEAR, {index:gunIndex, simple:false});
						}
						this._preGunTime = 0;
					}
				}
			} else {
				if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME) {
					let UserId = this._userModel.getUserId();
					
					let fish = RoomUtil.getFishById(this.getFishList(), this.getLockedFishId(UserId));
					if (!fish) {
						this.send(NotifyEnum.LOCKED_FISH_DISAPPEAR, {index:0, simple:true});
						return;
					}
					let lock = fish.getEFFECT_LAYER().getChildByName("locked");
					if (lock) {
						let pt = fish.localToGlobal(lock.x, lock.y);
						this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), pt.x, pt.y);
					} else {
						this.send(NotifyEnum.LOCKED_FISH_DISAPPEAR, {index:0, simple:true});
					}
					this._preGunTime = 0;
				}
			}
			/* 锁定改
			if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME) {
				let fish = RoomUtil.getFishById(this.getFishList(), this._isLocked);
				if (fish == null) {
					this.send(NotifyEnum.LOCKED_FISH_DISAPPEAR);
					return;
				}
				let pt = fish.localToGlobal();
				this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), fish.x, fish.y);
				this._preGunTime = 0;
			}
			*/
		} else if (this._isRage) {
			if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME) {
				this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), this._gunToPos.x, this._gunToPos.y);
				this._preGunTime = 0;
			}
		} else {
			//更新按住自动开枪逻辑
			if (this._isInFire || this._autoFire) {
				if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME) {
					this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), this._gunToPos.x, this._gunToPos.y);
					this._preGunTime = 0;
				}
			}
		}
	}


	/**子弹逻辑更新 */
	private bulletLogicUpdate():void {
		let bulletList = this.getBulletList();
		if (!bulletList) {
			return;
		}
		let bLen = bulletList.length;
		for (let i = 0; i < bLen; i++) {
			let bullet = bulletList[i];
			bullet && bullet.logicUpdate();
		} 
		let arrDeadBullet = new Array<BulletBase>();
		for (let i = 0; i < bLen; i++) {
			let bullet = bulletList[i];
			if (bullet.getBDead()) {
				arrDeadBullet.push(bullet);
			}
		}
		let deadLen = arrDeadBullet.length;
		for (let i = 0; i < deadLen; i++) {
			let bullet = arrDeadBullet[i];
			let index = bulletList.indexOf(bullet);
			bulletList.splice(index, 1);
			this._bulletLayer.removeChild(bullet);
			if (bullet.isPushPool) {
				FishingObjPool.getInstance().nBulletObjPool.push(bullet);
			}
		}
	}

	//碰撞检测
	private hitUpdate():void {
		let fLen = this.getFishList().length;
		for (let i = 0; i < fLen; i++) {
			let fish = this.getFishList()[i];
			let bulletLen = this.getBulletList().length;
			for (let j = 0; j < bulletLen; j++) {
				let bullet = this.getBulletList()[j];
				if (!bullet.getBUpdate()) {
					continue;
				}
				let actor = fish.getActor();
				let type = actor.getType();
				if (this.isBulletLocked(bullet.belongGun) && bullet.getReboundTimes() == 0) {
					let lockId:number = -1;
					if (bullet.nGunIndex != -1) {
						lockId = this.getBulletLockedId(bullet.belongGun)[bullet.nGunIndex];
					} else {
						lockId = this.getBulletLockedId(bullet.belongGun)[0];
					}
					//console.log("#----------------1----bullet.nGunIndex--->",bullet.nGunIndex,"----lockId---->",lockId);
					if (type == AddFishType.FISH || type == AddFishType.CATCH_WHOLE_FISH) {
						if ((actor as room.actor.FishBase).getUniqId() == lockId) {
							//判断这条鱼是否在屏幕内
							let pos = actor.localToGlobal();
							if (pos.x + (actor.measuredWidth >> 1) >= 0 && pos.x - (actor.measuredWidth >> 1) <= 1280 
									&& pos.y + (actor.measuredHeight >> 1) >= 0 && pos.y - (actor.measuredHeight >> 1) <= 720) {
								let hitId = RoomUtil.hitRect(bullet, actor, AddFishType.FISH);
								if (this.sendHitFish(bullet, hitId, actor as room.actor.FishBase)) {
									return;
								}
							}	
						}
					} else if (type == AddFishType.FISH_GROUP) {
						let fishList = (actor as room.actor.FishGroup).getFishList();
						let groupFLen = fishList.length
						for (let k = 0; k < groupFLen; k++) {
							if (fishList[k].getUniqId() == lockId) {
								//判断这条鱼是否在屏幕内
								let pos = actor.localToGlobal();
								if (pos.x + actor.measuredWidth/2 >= 0 && pos.x - actor.measuredWidth/2 <= 1280 
									&& pos.y + actor.measuredHeight/2 >= 0 && pos.y - actor.measuredHeight/2 <= 720) {
									let hitId = RoomUtil.hitRect(bullet, fishList[k], AddFishType.FISH);
									if (this.sendHitFish(bullet, hitId, fishList[k])) {
										return;
									}
								}
							}
						}
					}
				} else {
					if (type == AddFishType.FISH || type == AddFishType.CATCH_WHOLE_FISH) {
						let hitId = RoomUtil.hitRect(bullet, fish.getActor(), type);
						if (this.sendHitFish(bullet, hitId, fish.getActor() as room.actor.FishBase)) {
							return;
						}
					} else if (type == AddFishType.FISH_GROUP) {
						let fishList = (actor as room.actor.FishGroup).getFishList();
						let groupFLen = fishList.length
						for (let k = 0; k < groupFLen; k++) {
							let hitId = RoomUtil.hitRect(bullet, fishList[k], AddFishType.FISH);
							if (this.sendHitFish(bullet, hitId, fishList[k])) {
								return;
							}
						}
					}
				}
			}
		}
	}

	//子弹碰撞结果的处理
	private sendHitFish(bullet:BulletBase, hitId:number, fish:room.actor.FishBase):boolean {
		if (hitId > 0) {
			if (bullet.belongGun == this._myPositon) {
				fish.playHitEffect();
				//自己击中鱼的时候发送击中事件
				this.send(NotifyEnum.HIT_FISH, {fId:hitId, bId:bullet.getBulletId()}); 
			}
			bullet.setBDead(true);
			//显示渔网位置
			let skinVo = game.table.T_Gun_skin_Table.getVoByKey(bullet.bePos);

			this._bulletLayer.showBulletBomb(skinVo.net, bullet.x, bullet.y, FishingObjPool.getInstance());
			return true;
		}
		return false;
	}
	//检测领取救济金
	private checkBankrupt():void {
		let time = this._userModel.getBankruptTime();
		if (time > 0) {
			let currTime = game.util.TimeUtil.getCurrTime();
			let residue = time - currTime;
			if (residue <= 0) {
				let req:BankruptMessage = new BankruptMessage();
				req.initData();
				//7:领取救济金
				req.setState(7);
				NetManager.send(req);
			}
		}
	}
	//开炮
	private gunFire(pos:number, mx:number, my:number,gunIndex:number = 2):void {
		let bulletCount = this.getBulletNumByPos(pos, this._isFlip);
		this.checkBankrupt();
		if (bulletCount >= this.BULLET_MAX_COUNT && this._userModel.getCoins() > 0) {
			return ;
		}

		let roomer = this._roomModel.getRoomerById(this._userModel.getUserId());
		if (!roomer) {
			return;
		}
		let gunRateVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
		let roomType = this._userModel.getMatchRoomLevel();
		if (game.util.GameUtil.isKss(roomType)) {
			if (roomer.getDjsObj().grandPrixBulletNum <= 0) {
				if(this._autoFire){
					this._autoFire = false;
				}
				game.util.GameUtil.popTips(game.util.Language.getText(180));
				//不能开枪
				this.cleanBuff();
				return;
			}
		}
        if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom) {
			if (roomer.getDjsObj()) {
				if (roomer.getDjsObj().grandPrixSignUp == 0) {
					if(this._autoFire){
						this._autoFire = false;
					}
					//弹出报名界面
					(this.getRoomUI() as DajiangsaiRoomUI).openArenaSignView();
					return;
				}
				if (roomer.getDjsObj().grandPrixBulletNum <= 0) {
					if (bulletCount <= 0) {
						//发送结算消息
						burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE,1);
						burn._Notification_.send(NotifyEnum.DJS_RESULT_SEND);
						return;
					}
					//不能开枪
					this.cleanBuff();
					return;
				}
			}

			//破产或者待着
			let flagDjs = game.util.GameUtil.isEnough(CurrencyEnum.COINS, gunRateVo.bulletNum, false);
			if (!flagDjs) {
				game.util.GameUtil.popTips(game.util.Language.getText(2));
				if (bulletCount == 0 && this._userModel.getCoins() <= 0 && this._userModel.getBankruptTime() <= 0) {
					let req:BankruptMessage = new BankruptMessage();
					req.initData();
					req.setState(0);
					NetManager.send(req);
					this.cleanBuff();
				}
				return;
			}
		}

		//检测当前炮倍是否高于房间内要求最低炮倍
		let flag_min = game.util.GameUtil.getNeedGunByRoomType(this._userModel.getMatchRoomLevel(),roomer.getGunRate());
		if (flag_min != -1) {
			let maxId = game.util.GameUtil.getMaxGunRateByGold(this._userModel.getCoins());
			if (maxId != -1 && gunRateVo.id < maxId && this._userModel.getCoins() > 0) {
				let send:ChangeGunSendMessage = new ChangeGunSendMessage();
				send.initData();
				send.setType(ChangeGunState.AUTO_CHANGE);
				NetManager.send(send);
				return;
			}
		}

		let flag = game.util.GameUtil.isEnough(CurrencyEnum.COINS, gunRateVo.bulletNum, false);
		if (flag) {
			let gunObj = this._roomUI.gunList[pos];
			if (gunObj) {
				if(gunObj.getGunLocked()) {
					this.send(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED, true);
					gunObj.setLocked(false);
					return;
				}
			}
			//获取真实炮台
			let gunPos = this.getRoomUI().getGunByPos(pos,this._isClone,gunIndex);
			gunPos.x -= CONFIG.adaptX;
			// if(my >= gunPos.y)
			// {
			// 	my = gunPos.y;
			// }
			//计算炮台角度
			let rotationGun = FishUtil.getAngle(gunPos.x + this._offsetWidth, gunPos.y, mx, my);
			//添加检测狂暴的
			let skinVo = game.table.T_Gun_skin_Table.getVoByKey(this._userModel.getCurSkinId());
			let bulId = skinVo.bulletId;
			if (this._isRage) {
				bulId = skinVo.rageBulletId;
				this._roomUI.setGunRageEff(pos, true ,this._isClone,gunIndex);
			}
			let bullet:BulletBase = null;
			if (FishingObjPool.getInstance()) {
				bullet = FishingObjPool.getInstance().getBulletObj(bulId);
			} else {
				bullet = new BulletBase(bulId);
			}
			//270 360 0 90
			
			//设置炮台UI显示
			this._roomUI.gunfire(pos, rotationGun, this._isClone, gunIndex);
			if (this._isClone) {
				bullet.belongGun = RoomUtil.getPosByFlip(pos, this._isFlip);
				bullet.bePos = roomer.getCurSkinId();
				bullet.nGunIndex = gunIndex;
			} else {
				bullet.belongGun = RoomUtil.getPosByFlip(pos, this._isFlip);
				bullet.bePos = roomer.getCurSkinId();
				bullet.nGunIndex = -1;
			}
			//bullet.belongGun = RoomUtil.getPosByFlip(pos, this._isFlip);
			bullet.setBulletPos(gunPos.x + this._offsetWidth, gunPos.y, rotationGun);
			let degree = Math.PI/180 * (bullet.rotation - 270);
			let destX = mx + Math.cos(degree) * 2000;
			let destY = my + Math.sin(degree) * 2000;
			//计算路径
			let destPos:egret.Point = new egret.Point(destX, destY);
			let costTime = egret.Point.distance(new egret.Point(gunPos.x + this._offsetWidth, gunPos.y), destPos)/CONFIG.BULLET_SPEED;
			/**给子弹绑定移动逻辑**/
			bullet.moveLogicBind(FishUtil.GET_BULLET_MOVELOGIC(bullet, destX, destY, 1, costTime));
			this._bulletLayer.addChild(bullet);
			this.getBulletList().push(bullet);
			this._bulletId++;
			bullet.setBulletId(this._bulletId);
			//发送开炮消息
			this.send(NotifyEnum.GUN_SEND, {angle:RoomUtil.getAngleByFlip(rotationGun, this._isFlip), gunIndex:gunIndex, bulletId:this._bulletId});
		} else {
			let gunObj = this._roomUI.gunList[pos];
			if (gunObj) {
				if (gunObj.getGunLocked()) {
					this.send(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED,true);
					gunObj.setLocked(false);
					return;
				}
			}
			let flag_0 = game.util.GameUtil.isEnough(CurrencyEnum.COINS, 0, false);
			if (flag_0 && this._userModel.getCoins() > 0) {
				let send:ChangeGunSendMessage = new ChangeGunSendMessage();
				send.initData();
				send.setType(ChangeGunState.AUTO_CHANGE);
				NetManager.send(send);
			}
			if (bulletCount == 0 && this._userModel.getCoins() <= 0 && this._userModel.getBankruptTime() <= 0) {
				game.util.GameUtil.popTips(game.util.Language.getText(2));
				let req:BankruptMessage = new BankruptMessage();
				req.initData();
				req.setState(0);
				NetManager.send(req);
				this.cleanBuff();
			}
			//破产时候。弹出充值
			if (bulletCount == 0 && this._userModel.getCoins() <= 0 && this._userModel.getBankruptTime() > 0){
				this.cleanBuff();
				burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE,1);
				this.send(NotifyEnum.POP_CHARGE, {type:ChargeType.Gold});
			}
		}
	}

	//其他玩家开炮
	public otherGunFire(pos:number, angle:number,bClone:boolean = false,gunIndex:number = 0,isRage:boolean = false,skinId:number):void {
		let bulletCount = this.getBulletNumByPos(pos, this._isFlip);
		if (bulletCount >= this.BULLET_MAX_COUNT) {
			return ;
		}
		let gunPos = this.getRoomUI().getGunByPos(pos,bClone,gunIndex);
		gunPos.x -= CONFIG.adaptX;
		
		//创建子弹
		let skinVo = game.table.T_Gun_skin_Table.getVoByKey(skinId);
		let bulId = skinVo.bulletId;
		if (isRage) {
			bulId = skinVo.rageBulletId;
			this._roomUI.setGunRageEff(pos, true ,bClone,gunIndex);
		}
		let bullet:BulletBase = null;
		if (FishingObjPool.getInstance()) {
			bullet = FishingObjPool.getInstance().getBulletObj(bulId);
		} else {
			bullet = new BulletBase(bulId);
		}
		//设置炮台UI旋转角度
		this._roomUI.gunfire(pos, angle,bClone,gunIndex);
		if (bClone) {
			bullet.belongGun = RoomUtil.getPosByFlip(pos, this._isFlip);
			bullet.bePos = skinId;
			bullet.nGunIndex = gunIndex;
		} else {
			bullet.belongGun = RoomUtil.getPosByFlip(pos, this._isFlip);
			bullet.bePos = skinId;
			bullet.nGunIndex = -1;
		}
		//bullet.belongGun = pos;
		bullet.setBulletPos(gunPos.x + this._offsetWidth, gunPos.y, angle);
		let degree = Math.PI/180 * (bullet.rotation - 270);
		let destX = gunPos.x + this._offsetWidth + Math.cos(degree) * 2000;
		let destY = gunPos.y + Math.sin(degree) * 2000;

		let destPos:egret.Point = new egret.Point(destX, destY);
		let costTime = egret.Point.distance(new egret.Point(gunPos.x + this._offsetWidth, gunPos.y), destPos)/CONFIG.BULLET_SPEED;
		//给子弹绑定移动逻辑
		bullet.moveLogicBind(FishUtil.GET_BULLET_MOVELOGIC(bullet, destX, destY, 1, costTime));
		this._bulletLayer.addChild(bullet);
		this.getBulletList().push(bullet);
	}

	//加鱼
	public addUnitFish(type:number, uniqIdArr:Array<number>, fishId:number, pahtId:number, pos:egret.Point,
								 aliveTime:number = 0, pathPot:number = -1):void {
		//测试提供接口
		if (CONFIG.DEBUG) {
			if (CONFIG.TEST_FISH_ID > 0) {
				fishId = CONFIG.TEST_FISH_ID;
				type = AddFishType.FISH;
			}
			if (CONFIG.TEST_PATH_ID > 0) {
				pahtId = CONFIG.TEST_PATH_ID;
			}
		}
		let self = this;
		let fish;
		//处理鱼的出生handler
		let drawFishHandler = function () {
			//处理已经在鱼塘中存活的鱼，让其不让在起始点出生。
			let rota = 0;
			let flipY = false;
			if (aliveTime > 0) {
				let result = RoomUtil.getPointsAndPos(arr, aliveTime);
				arr = result[0];
				pos.x = pos.x + result[1].x;
				pos.y = pos.y + result[1].y;
				rota = result[2];
				flipY = result[3];
			}
			//处理葫芦产生的鱼路径问题 
			if (pathPot >= 0) {
				let result = RoomUtil.getPointsAndPosByCala(arr, pathPot);
				arr = result[0];
				pos.x = pos.x + result[1].x;
				pos.y = pos.y + result[1].y;
				rota = result[2];
				flipY = result[3];
			}
			//设置actor对象锚点为中心
			//fish.anchorOffsetX = fish.width/2;
			//fish.anchorOffsetY = fish.height/2;
			pos.x += CONFIG.adaptX;
			pos.y += CONFIG.adaptY;
			fish.setFishPosition(pos);
			fish.rotation = rota;
			//处理已经在鱼塘中存活的鱼反转问题
			if ((aliveTime > 0) 
					|| (pathPot >= 0)) {
				if (self._isFlip) {
					if (flipY) {
						fish.fishflipY();
					}
				} else {
					if (flipY) {
						fish.fishflipY();
					}
				}
			}
			if (type == AddFishType.FISH || type == AddFishType.CATCH_WHOLE_FISH) {
				let fishVo = game.table.T_Fish_Table.getVoByKey(fishId);
				self._objectLayer.addFishAt(fish, fishVo.layer);
			} else if (type == AddFishType.FISH_GROUP) {
				let fishGroupVo = game.table.T_FishGroup_Table.getVoByKey(fishId);
				let fishVo = game.table.T_Fish_Table.getVoByKey(fishGroupVo.fishId);
				self._objectLayer.addFishAt(fish, fishVo.layer);
			} else {
				self._objectLayer.addFishAt(fish, 1);
			}
			// this._objectLayer.addChild(fish);
			let action = new room.action.PointsAction(fish);
			action.runByData(arr);
			self.getFishList().push(action);
			if (DEBUG) {
				//如果是调试状态，则显示路径id 
				if (CONFIG.DEBUG) {
					let label:egret.TextField = new egret.TextField(); 
					label.text = "PATH:" + pahtId; 
					fish.addChild(label);
				}
			}
		}
		//给鱼绑定移动逻辑
		let strMove = game.table.T_FishPath_Table.getVoByKey(pahtId);
		let arr:Array<room.action.PathPoint> = RoomUtil.getFishPathById(pahtId);

		//创建鱼 
		if (type == AddFishType.FISH) {	//普通鱼
			fish = FishingObjPool.getInstance().getFishById(fishId);
			if (fish == null) {
				fish = new room.actor.FishBase(fishId, function(){
					if (self._isFlip) {
						fish.fishflipY();
					}
					fish.setType(type);
					drawFishHandler();
				});
				fish.setUniqId(uniqIdArr[0]);
			} else {
				if (self._isFlip) {
					fish.fishflipY();
				}
				fish.setType(type);
				drawFishHandler();
				fish.setUniqId(uniqIdArr[0]);
			}
		} else if (type == AddFishType.FISH_GROUP) {	//鱼组
			fish = new room.actor.FishGroup(fishId, uniqIdArr, function(){ 
				if (self._isFlip) {
					fish.fishflipY();
				}
				fish.setType(type);
				drawFishHandler();
			});
		} else if (type == AddFishType.CATCH_WHOLE_FISH) {	//一网打尽鱼
			fish = FishingObjPool.getInstance().getFishById(fishId);
			if (fish == null) {
				fish = new room.actor.FishBase(fishId, function(){
					fish.setUniqId(uniqIdArr[0]);
					fish.addChassis(fishId);
					if (self._isFlip) {
						fish.fishflipY();
					}
					fish.setType(type);
					drawFishHandler();
				}, self._isFlip);
			} else {
				fish.setUniqId(uniqIdArr[0]);
				fish.addChassis(fishId);
				if (self._isFlip) {
					fish.fishflipY();
				}
				fish.setType(type);
				drawFishHandler();
			}
		}
	}
	
	//冰冻
	public frozen(fishIds:Array<number>):void {
		//播放冰冻特效
		this._bulletLayer.playFrozenEffect();
		/*
		let len = fishIds.length;
		//暂停鱼的游动
		for(let i = 0; i < len; i++) {
			let fish = RoomUtil.getActionByUid(this.getFishList(),fishIds[i]);
			fish && fish.pause();
		}
		*/
		let len = this.getFishList().length;
		//让鱼重新游动
		for (let i = 0; i < len; i++) {
			let action = this.getFishList()[i];
			if (action.getActor().getUniqId() != Especial_Fish.Phoenix) {
				action.pause();
			}
		}
	}
	//解除冰冻
	public unfrozen():void {
		this._bulletLayer.clearFrozenEffect();
		let len = this.getFishList().length;
		//让鱼重新游动
		for (let i = 0; i < len; i++) {
			let action = this.getFishList()[i];
			action.resume();
		}
	}
	//BOSS来临
	public bossComing(fId:number):void {
		this._bulletLayer.bossComing(fId);
	}
	//显示鱼潮来临
	public showWave(callback:Function):void {
		this._bulletLayer.showWave(callback, this._isFlip);
	}
	/**
	 * 使用葫芦
	 * roomerPos:玩家位置
	 * pathPoint：鱼从pathId的哪个点开始
	 * cx,cy：是鱼原始的出生点
	 * x, y：是仍葫芦鱼产生的点
	 */
	public useCalabash(roomerPos:number, uniqId:number, fishId:number, 
						pathId:number, cx:number, cy:number, x:number, y:number, pathPoint:number):void {
		let pathVo = game.table.T_FishPath_Table.getVoByKey(pathId);
		//播放仍葫芦特效
		x += CONFIG.adaptX;
		y += CONFIG.adaptY;
		game.util.FrameUtil.playHuluEffect(roomerPos, uniqId, fishId, pathId, pathPoint, cx, cy, x, y, this);
	}

	/** 打开抽奖提示面板 */
	public openLotteryTips(score:number, killNum:number, max:number):void {
		this._roomUI.openLotteryGroupWithData(score, killNum, max);
	}
	/**设置解锁炮倍面板内容 */
	public setGunUpdateContains(gunId:number, value:number, max:number):void {
		this._roomUI.setUpdateGunNum(gunId,value,max);
	}
	/**打开解锁炮倍面板 */
	public openGunUpdateTips():void {
		this._roomUI.openGunUpdateGroup(null);
	}
	/** 只能打开解锁炮倍面板 */
	public openGunUpdateGroupByEnough():void {
		this._roomUI.openGunUpdateGroupByEnough();
	}
	//打开抽奖UI
	public openLotteryUI(to:egret.Point):void {
		let lotterUI = new room.LotteryUI(to);
		lotterUI.x += CONFIG.adaptX; 
		lotterUI.y += CONFIG.adaptY;
		this.addChildAt(lotterUI, 82);
	}

	//根据玩家位置设置玩家金币数量显示
	public setRoomerCoins(pos:number, num:number, isTween:boolean = false):void {
		let newPos = RoomUtil.getPosByFlip(pos, this._isFlip);
		this._roomUI.updateRoomerCoins(newPos, num, isTween);
	}
	
	//根据玩家位置设置玩家子弹数量显示
	public setRoomerBullet(pos:number, num:number, isTween:boolean = false):void {
		let newPos = RoomUtil.getPosByFlip(pos, this._isFlip);
		this._roomUI.updateRoomerCoins(newPos, num, isTween);
	}

	//根据玩家位置设置炮台皮肤
	public changeGunSkin(roomer:game.model.Roomer):void {
		this._roomUI.changeGunSkin(roomer,this._isFlip);
	}
	//根据玩家位置设置玩家钻石数量显示
	public setRoomerMoney(pos:number, num:number):void {
		let newPos = RoomUtil.getPosByFlip(pos, this._isFlip);
		this._roomUI.updateRoomerMoney(newPos, num);
	}

	//根据玩家位置设置玩家金币数量显示
	public setRoomerGunRate(pos:number, num:number,bClone:boolean = false):void {
		let newPos = RoomUtil.getPosByFlip(pos, this._isFlip);
		this._roomUI.updateGunRate(newPos, num,bClone);
	}

	//设置道具数量
	public setPropNum(frozen:number, lock:number, clone:number, rage:number, calabash:number,
					goleHead:number, silverHead:number, bronzeHead:number, nuclearHead:number):void {
		if (this._roomUI.getFrozenAndLockUI()) {
			this._roomUI.getFrozenAndLockUI().setFrozenTxt("" + frozen);
			this._roomUI.getFrozenAndLockUI().setLockTxt("" + lock);
		}
		
		if (this._roomUI.getSidePropUI()) {
			this._roomUI.getSidePropUI().setCloneTxt("" + clone);
			this._roomUI.getSidePropUI().setRageTxt("" + rage);
			this._roomUI.getSidePropUI().setCalabashTxt("" + calabash);
		}

		if (this._roomUI.getGoldBtn()) {
			this._roomUI.getGoldBtn().setNum("" + goleHead);
		}
		if (this._roomUI.getSilverBtn()) {
			this._roomUI.getSilverBtn().setNum("" + silverHead);
		}
		if (this._roomUI.getBronzeBtn()) {
			this._roomUI.getBronzeBtn().setNum("" + bronzeHead);
		}
		if (this._roomUI.getNuclearBtn()) {
			this._roomUI.getNuclearBtn().setNum("" + nuclearHead);
		}
	}

	//设置对象池
	public setObjPool():void {
		FishingObjPool.getInstance().reset();
	}

	//获取子弹层
	public getBulletLayer():BulletLayer {
		return this._bulletLayer;
	}

	//获取tips层
	public getCeilingLayer():CeilingLayer{
		return this._ceilingLayer;
	}
	//获取UI层
	public getRoomUI():RoomUI {
		return this._roomUI;
	}

	//获取反转状态
	public getIsFlip():boolean {
		return this._isFlip;
	}
	public setLocked(flag:boolean):void {
		this._isLocked = flag;
	}
	public getLocked():boolean {
		return this._isLocked;
	}
	//设置狂暴状态
	public setRage(flag:boolean):void {
		this._isRage = flag;
	}
	//设置狂暴特效
	public setRageEffect(flag:boolean, pos:number):void {
		if (flag) {
            let child = this.getBulletLayer().getChildByName("fazhen" + pos);
            if (child) {
                this.getBulletLayer().removeChild(child);
            }
			let posObj:eui.Group = this._roomUI.getGunPointByPos(pos,this.isFlip());
			let posPoint = new egret.Point(posObj.x,posObj.y);
			let posX = posPoint.x + CONFIG.adaptX;
			let posY = posPoint.y + CONFIG.adaptY;
			let posFlip = RoomUtil.getPosByFlip(pos, this._isFlip);
			//播放动画
            game.util.BonesUtil.kuangbaoEffct(this.getBulletLayer(), this, posX, posY, posFlip);
		} else {
			let posFlip = RoomUtil.getPosByFlip(pos, this._isFlip);
            let child = this.getBulletLayer().getChildByName("kuangbao" + posFlip);
            if (child) {
                this.getBulletLayer().removeChild(child);
            }
		}
	}
	//设置分身特效
	public setCloneEffect(flag:boolean,pos:number):void {
		if (flag) {
            let child = this.getBulletLayer().getChildByName("fazhen" + pos);
            if (child) {
                this.getBulletLayer().removeChild(child);
            }
            let child1 = this.getBulletLayer().getChildByName("kuangbao" + pos);
            if (child1) {
                this.getBulletLayer().removeChild(child1);
            }
			let posObj:eui.Group = this._roomUI.getGunPointByPos(pos,this.isFlip());
			let posPoint = new egret.Point(posObj.x,posObj.y);
			let posX = posPoint.x + CONFIG.adaptX;
			let posY = posPoint.y + CONFIG.adaptY;
			//播放动画
            game.util.GameUtil.cloneEffect(this.getBulletLayer(),this,posX,posY,pos);
		} else {
            let child = this.getBulletLayer().getChildByName("clone" + pos);
            if (child) {
                this.getBulletLayer().removeChild(child);
            }
		}
	}
	//设置锁定特效
	public setLockedEffect(flag:boolean,pos:number):void {
		if (flag) {
			let posObj:eui.Group = this._roomUI.getGunPointByPos(pos,this.isFlip());
			let posPoint = new egret.Point(posObj.x,posObj.y);
			let posX = posPoint.x + CONFIG.adaptX;
			let posY = posPoint.y + CONFIG.adaptY;
			//播放动画
            game.util.GameUtil.fazhenEffect(this.getBulletLayer(), this, posX, posY, pos);
		} else {
            let child = this.getBulletLayer().getChildByName("fazhen" + pos);
            if (child) {
                this.getBulletLayer().removeChild(child);
            }
		}
	}
	public getRage():boolean {
		return this._isRage
	}
	//锁定功能改
	public setLockedObj(objLocked:LockedObj):void {
		if (this._arrLockedObj == null) {
			this._arrLockedObj = new Array<LockedObj>();
		}
		let len = this._arrLockedObj.length;
		for (let i = 0; i < len; i++) {
			if (this._arrLockedObj[i].getLockedPos() == objLocked.getLockedPos()) {
				this._arrLockedObj[i] = objLocked;
				return;
			}
		}
		this._arrLockedObj.push(objLocked);
	}
	//去掉锁定对象
	public deleteLockedObj(nUserId:number,isAll:boolean = true):void {
		if (this._arrLockedObj == null) {
			this._arrLockedObj = new Array<LockedObj>();
		}
		let index = -1;
		let len = this._arrLockedObj.length;
		for (let i = 0; i < len; i++) {
			if (this._arrLockedObj[i].getUserId() == nUserId) {
				index = i;
				break;
			}
		}
		if (index != -1) {
			let UserId = this._userModel.getUserId();
			if (nUserId == UserId && isAll) {
                this.setSelectFishState(false);
			}
			if (this._arrLockedObj[index] != null) {
				let ids = this._arrLockedObj[index].getLockedID();
				for (let i = 0; i < ids.length; i++) {
					let fish = RoomUtil.getFishById(this.getFishList(), ids[i]);
					if (fish) {
						fish.removeEffect("locked");
					}
				}
			}
			if (isAll) {
				this._arrLockedObj.splice(index, 1);
			} else {
				this._arrLockedObj[index].spliceLockedID();
			}
		}
	}
	//锁定者是自己
	public isLockedMine():boolean {
		if (this._arrLockedObj) {
			let len = this._arrLockedObj.length;
			if (len == 0) {
				return false;
			}
			let UserId = this._userModel.getUserId();
			for (let i = 0; i < len; i++) {
				if (this._arrLockedObj[i].getUserId() == UserId) {
					return true;
				}
			}
		}
		return false;
	}

	//设置自己锁定的鱼
	public setLockedFishMindeId(nUserId:number,nLockedId:number,gunIndex:number):void {	
		if (this._arrLockedObj == null || this._arrLockedObj.length == 0) {
			return ;
		}
		let len = this._arrLockedObj.length;
		for (let i = 0; i < len; i++) {
			if (this._arrLockedObj[i].getUserId() == nUserId) {
				this._arrLockedObj[i].setLockedId(nLockedId,gunIndex);
				break;
			}
		}
	}
	//获取自己锁定的鱼ID
	public getLockedFishId(nUserId:number, nGunIndex:number = 0):number {
		if (this._arrLockedObj == null) {
			return -1;
		}
		let len = this._arrLockedObj.length;
		if (len == 0) {
			return -1;
		}
		for (let i = 0; i < len; i++) {
			let obj = this._arrLockedObj[i];
			if (obj.getUserId() == nUserId) {
				return obj.getLockedID()[nGunIndex];
			}
		}
		return -1;
	}
	//更改自己锁定的鱼
	public changeLockedFish(nUserId:number,fishTarget:room.actor.FishBase,gunIndex:number = 0):void {
		let preFish = RoomUtil.getFishById(this.getFishList(), this.getLockedFishId(nUserId,gunIndex));
		if (preFish && nUserId == this._userModel.getUserId()) {
			preFish.removeEffect("locked");
		}
		//如果别人锁定的鱼为空。则跳过该阶段 
		if (fishTarget == null) {
			return;
		}
		let fishId = fishTarget.getUniqId();
		this.setLockedFishMindeId(nUserId,fishId,gunIndex);
		if (nUserId == this._userModel.getUserId()) {
			game.util.GameUtil.setLockedEffect(fishTarget,"locked","locked_circle_png");
		}
	}
	//当前子弹是否是碰撞子弹
	public isBulletLocked(bBelongGun:number):boolean {
		let bLocked:boolean = false;
		let obj = this._arrLockedObj;
		if (obj) {
			let len = obj.length;
			if (len > 0) {
				for (let i = 0; i < len; i++) {
					if (obj[i].getLockedPos() == bBelongGun) {
						return true;
					}
				}
			}
		}
		return bLocked;
	}
	//当前子弹锁定的鱼的ID
	public getBulletLockedId(bBelongGun:number):Array<number> {
		let obj = this._arrLockedObj;
		if (obj) {
			let len = obj.length;
			if (len > 0) {
				for (let i = 0; i < len; i++) {
					if (obj[i].getLockedPos() == bBelongGun) {
						return obj[i].getLockedID();
					}
				}
			}
		}
		return null;
	}
	//分身状态
	public setClone(flag:boolean):void {
		this._isClone = flag;
		if (this._isClone) {
			this.getRoomUI().setGunState(RoomUtil.getPosByFlip(this._myPositon, this._isFlip),true,3,this._myPositon);
		} else {
			this.getRoomUI().setGunState(RoomUtil.getPosByFlip(this._myPositon, this._isFlip),false,3,this._myPositon);
		}
	}
	public setGunNum(nGunNum:number):void {
		this._nGunNum = nGunNum;
	}
	public getClone():boolean {
		return this._isClone;
	}
	public setPaobeiAddState(isLeft:boolean):void {
		if (isLeft) {
			this._roomUI.addRateBtn_0.visible = true;
			this._roomUI.reduceRateBtn_0.visible = true;
			this._roomUI.addRateBtn_1.visible = false;
			this._roomUI.reduceRateBtn_1.visible = false;
			this._roomUI.addRateBtn_1.touchEnabled = false;
			this._roomUI.reduceRateBtn_1.touchEnabled = false;
		} else {
			this._roomUI.addRateBtn_0.visible = false;
			this._roomUI.reduceRateBtn_0.visible = false;
			this._roomUI.addRateBtn_0.touchEnabled = false;
			this._roomUI.reduceRateBtn_0.touchEnabled = false;
			
			this._roomUI.addRateBtn_1.visible = true;
			this._roomUI.reduceRateBtn_1.visible = true;
		}
	}
	//手选奖金鱼id
	public getInHandWarHeadFish():number {
		return this._inHandWarHeadFish;
	}
	public setInHandWarheadFish(id:number):void {
		this._inHandWarHeadFish = id;
	}
	public resetInHandWarHeadFish():void {
		this._inHandWarHeadFish = -1;
	}
	//设置选择鱼的状态
	public setSelectFishState(state:boolean):void {
		this._selectFishState = state;
		if (this._selectFishState) {
			this._objectLayer.touchEnabled = true;
			this._bgLayer.touchEnabled = false;
		} else {
			this._objectLayer.touchEnabled = false;
			this._bgLayer.touchEnabled = true;
		}
	}
	//更新背景层的气泡特效
	public updateStageBubble():void {
		this._floorLayer.addBubble();
	}
	//破产。清除自己的状态
	private cleanBuff():void {
		let roomer = this._roomModel.getRoomerById(this._userModel.getUserId());
		//去除身上的锁定,狂暴,分身效果
		roomer.setIsLock(false);
		this.setLockedEffect(false,roomer.getRoomPos());
		this.setLocked(false);
		roomer.setIsClone(false);
		this.setCloneEffect(false,roomer.getRoomPos());
		this.setClone(false);
		roomer.setIsRage(false);
		this.setRageEffect(false,roomer.getRoomPos());
		this.setRage(false);
		this.deleteLockedObj(this._userModel.getUserId(),true);
	}
	//设置破产
	public setBackrupt(pos:number, time:string, showTime:boolean = false):void {
		let rPos = RoomUtil.getPosByFlip(pos, this._isFlip);
		this._roomUI.setBankrupt(rPos, time, showTime);
	}
	//移除破产状态
	public removeBankrupt(pos:number):void {
		let rPos = RoomUtil.getPosByFlip(pos, this._isFlip);
		this._roomUI.removeBankrupt(rPos);
	}
	//显示倒计时数字
	public showNum(num:number):void {
		this._bulletLayer.showNum(num);
	}
	public showChakan(roomer:game.model.Roomer):void {
		if (!this.getRoomUI().chakanUI) {
			return;
		}
		this.getRoomUI().setShowChakan(roomer, this.isFlip());
	}
	//获取自己炮口位置
	public getMyPosition():number {
		return this._myPositon;
	}
	//获取自己炮口的偏移量
	public getOffsetWidth():number {
		return this._offsetWidth;
	}
	//获取自己是否是翻转状态
	public isFlip():boolean {
		return this._isFlip;
	}

	//设置自动开炮
	public setAutoGunFire(bAuto:boolean):void {
		if (bAuto) {
			this._autoFire = false;
			return;
		}
		if (this._autoFire) {
			this._autoFire = false;
		} else {
			this._autoFire = true;
		}
	}

	///////////////////////////////////////////////新手引导相关/////////////////////////////////////////////////////
	public guide_addFish():void {
		//测试提供接口
		//创建鱼 
		let fish = new room.actor.FishBase(22);
		fish.setUniqId(Especial_Fish.Guide_Fish);
		let type = AddFishType.FISH;
		fish.setType(type);
		//处理已经在鱼塘中存活的鱼，让其不让在起始点出生。
		let rota = 0;
		//处理已经在鱼塘中存活的鱼反转问题
		if (this.isFlip()) {
			fish.fishflipY();
			let pos = new egret.Point(CONFIG.contentWidth/2 - 100,CONFIG.contentHeight/2 + 120);
			pos.x += CONFIG.adaptX;
			pos.y += CONFIG.adaptY;
			fish.setFishPosition(pos);
		} else {
			let pos = new egret.Point(CONFIG.contentWidth/2 - 100,CONFIG.contentHeight/2 - 50);
			pos.x += CONFIG.adaptX;
			pos.y += CONFIG.adaptY;
			fish.setFishPosition(pos);
		}
		let tw = egret.Tween.get(fish,{loop:false});
		tw.to({scaleX:1.7,scaleY:1.7}, 400)
		.call(function(){
			egret.Tween.removeTweens(fish);
		})
		this._objectLayer.addFishAt(fish, 3);
		// this._objectLayer.addChild(fish);
		let action = new room.action.PointsAction(fish);
		action.setActionAlive(true);
		this.getFishList().push(action);
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//销毁
	public destroy():void {
		//销毁RoomUI
		this._roomUI.destory();
		//消耗floor层
		this._floorLayer.destory();
		//移除触摸事件
		this._bgLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this._bgLayer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this._bgLayer.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);

		this._bgLayer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchCacel, this);

		//移除帧事件
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.removeChildren();
		this.parent && this.parent.removeChild(this); 
	}
}