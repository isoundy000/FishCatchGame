module room.actor {
	export class FishBase extends room.actor.ActorBase {

		/** 鱼的倍率 */
		private _fishScore:number;
		/** 鱼的动作文件 */
    	// private _mcFish:FishMoveClip;
		/** 鱼的碰撞区 */
		private _rectList:Array<egret.Shape>;
		//MovieCLip偏移量
		private _modifyRect:egret.Rectangle;
		/** 一网打尽底盘 */
		private _chasis:egret.Bitmap;
		/** 是否是组合鱼 */
		private _isGroupFish:boolean = false;
		/** 组合鱼地盘 */
		private _groupChasisArr:Array<egret.Bitmap>;
		/** 组合鱼对象集合 */
		private _groupFishList:Array<egret.MovieClip>;
		/** 底盘偏移量 */
		private _chasisModify:Array<number>;
		/** 是否发生过偏移 */
		private _bModifed:boolean;
		/** 地盘长度 */
		private _groupChasisLen:number;
		/** 是否正在闪 */
		private _bIsBling:boolean;
		private _blingTimer:egret.Timer;
		/** MC加载完成回调 */
		private _loadCallback:Function;

		private _shield:egret.Bitmap;
		private _bViewFlip:boolean;
		public constructor(id:number, loadCallback:Function = null, bViewFlip:boolean = false) {
			super();
			this._loadCallback = loadCallback;
			this._bIsBling = false;
			this._bModifed = false;
			this._bFlipY = false;
			this._rectList = new Array<egret.Shape>();
			this.CHASIS_LAYER = new egret.DisplayObjectContainer();
			this.CHASIS_LAYER.anchorOffsetX = this.CHASIS_LAYER.width/2;
			this.CHASIS_LAYER.anchorOffsetY = this.CHASIS_LAYER.height/2;
			this.addChild(this.CHASIS_LAYER);
			this.FISH_LAYER = new egret.DisplayObjectContainer();
			this.FISH_LAYER.anchorOffsetX = this.FISH_LAYER.width/2;
			this.FISH_LAYER.anchorOffsetY = this.FISH_LAYER.height/2;
			this.addChild(this.FISH_LAYER);
			this.EFFECT_LAYER = new egret.DisplayObjectContainer();
			this.EFFECT_LAYER.anchorOffsetX = this.EFFECT_LAYER.width/2;
			this.EFFECT_LAYER.anchorOffsetY = this.EFFECT_LAYER.height/2;
			this.addChild(this.EFFECT_LAYER);
			
			this.FISH_POP_LAYER = new egret.DisplayObjectContainer();
			this.FISH_POP_LAYER.anchorOffsetX = this.FISH_POP_LAYER.width/2;
			this.FISH_POP_LAYER.anchorOffsetY = this.FISH_POP_LAYER.height/2;
			this.addChild(this.FISH_POP_LAYER);
			this._bViewFlip = bViewFlip;
			this.init(id);
		}

		/** 初始化鱼的数据 */
		private init(id:number):void {
			this._fid = id;
			let dataVo = game.table.T_Fish_Table.getVoByKey(id);
			if (dataVo == null) {
				console.log("Warnning!!!the fish data is null,id--->", id);
				return;
			}
			//初始化鱼的倍率
			this._fishScore = dataVo.score;
			this._groupFishList = new Array();
			if (dataVo.groupId <= 0) {
				this.preLoadData(dataVo.resRunUrl, 0, 0, dataVo.frameRate);
			} else {
				this._isGroupFish = true;
				let data = game.table.T_FishGroup_Table.getVoByKey(dataVo.groupId);
				if (data) {
					this._groupChasisArr = new Array<egret.Bitmap>();
					let posStr = data.pos;
					let singleFishArr = posStr.split("|");
					let singLen = singleFishArr.length;
					this._chasisModify = new Array<number>();
					this._preLoadMaxCount = singLen;
					for (let i = 0; i < singLen; i++) {
						let fishData = singleFishArr[i].split("_");
						let fishId = fishData[0].split(",");
						let pos = fishData[1].split(",");
						let fishVo = game.table.T_Fish_Table.getVoByKey(Number(fishId[0]));
						this.preLoadData(fishVo.resRunUrl, Number(pos[0]), Number(pos[1]), dataVo.frameRate);
						//鱼的底盘
						let chasisStr = RoomUtil.getChasisByType(ChasisFish.GROUP_FISH,  Number(fishId[1]));
						RES.getResAsync(chasisStr, (tData, key)=>{
							let chasisImg = new egret.Bitmap(tData);
							this.CHASIS_LAYER.addChild(chasisImg);
							chasisImg.scaleX = chasisImg.scaleY = Number(fishId[2]);
							chasisImg.anchorOffsetX = chasisImg.width/2;
							chasisImg.anchorOffsetY = chasisImg.height/2;
							chasisImg.x = Number(fishId[3]);
							chasisImg.y = Number(fishId[4]);
							burn.tools.TweenTools.rotationFan(chasisImg, 2000);
							this._groupChasisArr.push(chasisImg);
							this._chasisModify.push(Number(fishId[4]) - Number(pos[1]));
						}, this);
					}
					//添加帧事件
					this._groupChasisLen = this._groupChasisArr.length;
				} else {
					console.error("没有这个组合鱼！");
				}
			}
		}
		private _preLoadMaxCount:number = 1;
		private _preLoadCount:number = 0;
		private preLoadData(url:string, posX:number, posY:number, frameRate:number):void {
			RES.getResAsync(url + "_json", ()=>{
				RES.getResAsync(url + "_png", ()=>{
					if(RES.hasRes(url + "_rect_json"))
					{
						RES.getResAsync(url + "_rect_json", ()=>{
							this.initFishData(url, posX, posY, frameRate);
							this._preLoadCount++;
							if (this._preLoadCount >= this._preLoadMaxCount) {
								this._loadCallback && this._loadCallback();
							}
						}, this);
					}else
					{
						this.initFishData(url, posX, posY, frameRate);
						this._preLoadCount++;
						if (this._preLoadCount >= this._preLoadMaxCount) {
							this._loadCallback && this._loadCallback();
						}
					}
				}, this);
			}, this);
		}

		private initFishData(url:string, posX:number, posY:number, frameRate:number):void {
			let data = RES.getRes(url + "_json");
			let txtr = RES.getRes(url + "_png");
			if (RELEASE) {
				if (data == undefined || txtr == undefined) {
					let userM = burn.Director.getModelByKey(UserModel) as UserModel;
					console.error("类型为" + userM.getMatchRoomLevel() + "的房间不存在这条鱼：" + url);
					data = RES.getRes("xiaochouyu_json");
					txtr = RES.getRes("xiaochouyu_png");
					url = "xiaochouyu";
				}
			}
			if (DEBUG) {
				if (data == undefined || txtr == undefined) {
					let userM = burn.Director.getModelByKey(UserModel) as UserModel;
					console.error("类型为" + userM.getMatchRoomLevel() + "的房间不存在这条鱼：" + url);
				}
			}
			let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
			let mcFish = new egret.MovieClip(mcFactory.generateMovieClipData(url));
			let dataMc:egret.MovieClipData = mcFish.movieClipData;

			let frameCur = 0;
			this._modifyRect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
			
			mcFish.anchorOffsetX = mcFish.width/2;
			mcFish.anchorOffsetY = mcFish.height/2;
			mcFish.x = posX;
			mcFish.y = posY;
			//对鱼的资源进行缩放使用
			mcFish.scaleX = mcFish.scaleY = 1.5;
			this.FISH_LAYER.addChild(mcFish);
			//保存到集合中
			this._groupFishList.push(mcFish);
			if (CONFIG.DEBUG) {
				if (CONFIG.TEST_fishFrameRate > 0) {
					mcFish.frameRate = CONFIG.TEST_fishFrameRate;
				} else {
					if (frameRate > 0) {
						mcFish.frameRate = frameRate;
					} else {
						mcFish.frameRate = CONFIG.defaultFishFrameRate;
					}
				}
			} else {
				if (frameRate > 0) {
					mcFish.frameRate = frameRate;
				} else {
					mcFish.frameRate = CONFIG.defaultFishFrameRate;
				}
			}
			mcFish.gotoAndPlay("run", -1);

			let rectData = RES.getRes(url + "_rect_json");
			if (rectData != null) {
				let dataRect = rectData.rect;
				let rectLen = dataRect.length;
				for (let i = 0; i < rectLen; i++) {
					let rect = new egret.Rectangle(dataRect[i].x, dataRect[i].y, dataRect[i].w, dataRect[i].h);
					let shape = new egret.Shape();
					shape.graphics.beginFill(0xff0000, 0);
					if (CONFIG.DEBUG) {
						shape.graphics.lineStyle(2, 0x000000);
						shape.visible = true;
					} else {
						shape.graphics.lineStyle(2, 0x000000, 0);
						shape.visible = false;
					}
					shape.graphics.drawRect(rect.x,rect.y,rect.width,rect.height);
					shape.graphics.endFill();
					shape.x = posX;
					shape.y = posY;
					this.FISH_LAYER.addChild(shape);
					this._rectList.push(shape);
				}
			}

			let self = this;
			//boss_shield
			//如果是凤凰
			if(url == "fenghuang")
			{
				let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
				let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
				if(roomModel.getPhoenix())
				{
					let phoenixObj = roomModel.getPhoenix();
					let cur = phoenixObj.getCurShield();
					let max = phoenixObj.getMaxShield();
					if((max - cur) <= 0)
					{
						return;
					}
				}
				RES.getResAsync("boss_shield_png", ()=>{
					self._shield = new egret.Bitmap(RES.getRes("boss_shield_png"));
					let vo = game.table.T_Fish_Table.getVoByKey(self._fid);
					let strPos = vo.posLocked;
					let arrPos = strPos.split(",");
					let isFlipY = self.isFlipY();
					let isGroup = self.getIsGroupFish();
					self._shield.x = parseInt(arrPos[0]) + self.getModifyRect().x;
					self._shield.y = parseInt(arrPos[1]) + self.getModifyRect().y;
					if (isFlipY)
					{
						if(!isGroup)
						{
							self._shield.y = -self._shield.y;
						}else
						{
							if(self.getChasisModify())
							{
								self._shield.y -= (self.getChasisModify() * 2);
							}
						}
					}
					self._shield.anchorOffsetX = self._shield.width/2;
					self._shield.anchorOffsetY = self._shield.height/2;
					self._shield.name = "boss_shield_png";
					self.addEffect(self._shield,"boss_shield_png");
				}, self);
			}

			if(url == "guanyu")
			{
				RES.getResAsync("GuanYu_Tips_png", ()=>{
					let guanyuTips = new egret.Bitmap(RES.getRes("GuanYu_Tips_png"));
					let vo = game.table.T_Fish_Table.getVoByKey(self._fid);
					let strPos = vo.posLocked;
					let arrPos = strPos.split(",");
					let isFlipY = self.isFlipY();
					let isGroup = self.getIsGroupFish();
					guanyuTips.x = parseInt(arrPos[0]) + self.getModifyRect().x - 20;
					guanyuTips.y = parseInt(arrPos[1]) + self.getModifyRect().y - 200;
					if (isFlipY)
					{
						guanyuTips.y = -guanyuTips.y;
						if(this._bFlipY != this._bViewFlip)
						{
							if(!this._bFlipY)
							{
								guanyuTips.scaleY = guanyuTips.scaleY;
								guanyuTips.scaleX = guanyuTips.scaleX;
							}else
							{
								guanyuTips.scaleY = -guanyuTips.scaleY;
								guanyuTips.scaleX = -guanyuTips.scaleX;
							}
						}else
						{
							if(!this._bFlipY)
							{
								guanyuTips.scaleY = -guanyuTips.scaleY;
								guanyuTips.scaleX = -guanyuTips.scaleX;
							}else
							{
								guanyuTips.scaleY = guanyuTips.scaleY;
								guanyuTips.scaleX = guanyuTips.scaleX;
							}
						}
					}
					guanyuTips.anchorOffsetX = guanyuTips.width/2;
					guanyuTips.anchorOffsetY = guanyuTips.height;
					guanyuTips.name = "GuanYu_Tips_png";
					self.FISH_POP_LAYER.addChild(guanyuTips);
				}, this);
			}
		}

		//设置位置
		public setFishPosition(pos:egret.Point):void {
			this.x = pos.x;
			this.y = pos.y;
		}

		/** 碰撞检测 */
		public hitRect(x: number, y: number):number {
			let hitId:number = -1;
			let len = this._rectList.length;
			if (len > 0) {
				for (let i = 0; i < len; i++) {
					let isHit = this._rectList[i].hitTestPoint(x, y);
					if(isHit) {
						hitId = this.getUniqId();
						// this.playHitEffect();
						break;
					}
				}
				return hitId;
			} else {
				let isHit =  this.hitTestPoint(x, y);
				if(isHit) {
					hitId = this.getUniqId();
					// this.playHitEffect();
				}
				return hitId;
			}
		}

		//在鱼身上加特效
		public addEffect(dis:egret.DisplayObject, name:string):boolean {
			let child = this.EFFECT_LAYER.getChildByName(name);
			if (child == null) {
				//dis.x = this.width/2;
				//dis.y = this.height/2;
				this.EFFECT_LAYER.addChildAt(dis, 7);
				return true;
			}
			return false;
		}
		//移除鱼身上增加的特效
		public removeEffect(name:string):void {
			let child = this.EFFECT_LAYER.getChildByName(name);
			if (child) {
				this.EFFECT_LAYER.removeChild(child);
			}
		}

		public playHitEffect():void {
			let vo = game.table.T_Fish_Table.getVoByKey(this._fid);
			let colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.LESS_LIGTH);
			if(vo.Matrix == game.util.FilterEnmu.FISH_TYPE_MATRIX_1)
			{
				colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.FISH_TYPE_1);
			}else if(vo.Matrix == game.util.FilterEnmu.FISH_TYPE_MATRIX_2)
			{
				colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.FISH_TYPE_2);
			}
			this.getFISH_LAYER().filters = [colorFlilter];
			if(this._bIsBling)
			{
				return;
			}
			this._blingTimer = new egret.Timer(300, 1);
			this._blingTimer.addEventListener(egret.TimerEvent.TIMER, this.timeFun,this);
			this._blingTimer.start();
			this._bIsBling = true;
		}
		private timeFun() {
			if(!this._blingTimer) {
				return;
			}
			this._blingTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeFun, this);
			this.getFISH_LAYER().filters = null;
			this._bIsBling = false;
		}

		public playDead(isGroup:boolean = false):void {
			//播放死亡音效
			game.util.SoundManager.playFishDeathSound(this._fid);
			if (isGroup) {
				this.destory();
			} else {
				//暂时停止其它动作
				egret.Tween.removeTweens(this);
				//播放死亡特效
				let self = this;
				let obj = this.getFISH_LAYER();
				let vo = game.table.T_Fish_Table.getVoByKey(this._fid);
				if(vo.deadType == FishDeadType.RotationAndScale)
				{
					let tw = egret.Tween.get(obj, {loop: false});
					tw.
					to({scaleX:1.8, scaleY:1.8},200).
					to({rotation:obj.rotation + 360}, 800).
					to({alpha:0},200).call(function():void {
						egret.Tween.removeTweens(self.getFISH_LAYER());
						self.poolPushFish();
					});
				}else if(vo.deadType == FishDeadType.Speed)
				{
					//加快频率
					//this._groupFishList
					for(let i = 0; i < this._groupFishList.length; i++)
					{
						this._groupFishList[i].frameRate = 25;
					}
					let tw = egret.Tween.get(obj, {loop: false});
					tw.wait(1000).
					to({alpha:0},200).call(function():void {
						egret.Tween.removeTweens(self.getFISH_LAYER());
						self.poolPushFish();
					});
				}else if(vo.deadType == FishDeadType.SpeedAndScale)
				{
					for(let i = 0; i < this._groupFishList.length; i++)
					{
						this._groupFishList[i].frameRate = 25;
					}
					let tw = egret.Tween.get(obj, {loop: false});
					tw.
					to({scaleX:1.5, scaleY:1.5},200).
					wait(1000).
					to({alpha:0},200).call(function():void {
						egret.Tween.removeTweens(self.getFISH_LAYER());
						self.poolPushFish();
					});
				}else if(vo.deadType == FishDeadType.DeadAtOnce)
				{
					self.poolPushFish();
				}else if(vo.deadType == FishDeadType.N_1)
				{	
					obj.scaleX = 1.3;
					obj.scaleY = 1.3;
					for(let i = 0; i < this._groupFishList.length; i++)
					{
						this._groupFishList[i].frameRate = 25;
					}
					let tw = egret.Tween.get(obj, {loop: false});
					tw.wait(500).
					to({scaleX:1.2,scaleY:1.2},100).
					to({scaleX:1.3,scaleY:1.3},100).
					to({scaleX:1.2,scaleY:1.2},100).
					to({scaleX:1.3,scaleY:1.3},100).
					to({scaleX:1.2,scaleY:1.2},100).
					to({scaleX:1.3,scaleY:1.3},100).
					to({scaleX:0.2,scaleY:0.2,alpha:0,rotation:obj.rotation - 360},1200).call(function():void {
						egret.Tween.removeTweens(self.getFISH_LAYER());
						self.poolPushFish();
					});
				}else if(vo.deadType == FishDeadType.N_2)
				{
					let tw = egret.Tween.get(obj, {loop: false});
					tw.
					wait(180).
					call(function(){
						obj.rotation -= 120;
					}).
					wait(180).
					call(function(){
						obj.rotation -= 120;
					}).
					wait(180).
					call(function(){
						obj.rotation -= 120;
					}).
					wait(180).
					call(function(){
						obj.rotation -= 150;
						obj.alpha -= 0.125;
					}).
					wait(180).
					call(function(){
						obj.rotation -= 150;
						obj.alpha -= 0.125;
					}).
					wait(180).
					call(function(){
						obj.rotation -= 150;
						obj.alpha -= 0.125;
					}).
					wait(180).
					call(function(){
						obj.rotation -= 150;
						obj.alpha -= 0.125;
					}).
					wait(180).
					call(function(){
						obj.rotation -= 150;
						obj.alpha -= 0.25;
					}).
					wait(180).
					call(function(){
						obj.rotation -= 150;
						obj.alpha -= 0.25;
					}).
					call(function():void {
						egret.Tween.removeTweens(self.getFISH_LAYER());
						self.poolPushFish();
					});
				}else if(vo.deadType == FishDeadType.Alpha)
				{
					let tw = egret.Tween.get(obj, {loop: false});
					tw.
					to({alpha:0},416).
					call(function():void {
						egret.Tween.removeTweens(self.getFISH_LAYER());
						self.poolPushFish();
					});
				}
			}
			if(this.EFFECT_LAYER)
			{
				this.EFFECT_LAYER.removeChildren();
			}
		}
		//将死亡鱼加入对象池
		public poolPushFish(){
			FishingObjPool.getInstance().insertFishPool(this);
		}
		//鱼的积分倍率
		public getFishScore():number {
			return this._fishScore;
		}
		//获取显示特效偏移量
		public getModifyRect():egret.Rectangle
		{
			return this._modifyRect;
		}

		public getIsGroupFish():boolean {
			return this._isGroupFish;
		}
		public fishflipY():void {
			if(this._isGroupFish)
			{
				this.scaleY = -this.scaleY;
				return;
			}
			let childFishs = this.FISH_LAYER.numChildren;
			for (let i = 0; i < childFishs; i++) {
				let fish = this.FISH_LAYER.getChildAt(i);
				fish.scaleY = -fish.scaleY;
				if(fish.scaleY < 0)
				{
					this._bFlipY = true;
				}else
				{
					this._bFlipY = false;
				}
			}
			//return;
			let childs = this.CHASIS_LAYER.numChildren;
			let bFind = false;
			for(let i = 0; i < childs; i ++)
			{
				let child = this.CHASIS_LAYER.getChildAt(i);
				if(this._isGroupFish)
				{
					child.scaleY = -child.scaleY;
					if(this._chasisModify[i])
					{
						if(!this._bModifed)
						{
							child.y -= (this._chasisModify[i] * 2);
						}else
						{
							child.y += (this._chasisModify[i] * 2);
						}
						bFind = true;
					}
				}else
				{
					child.y = -child.y;
				}
			}
			//特效翻转
			let childEffects = this.EFFECT_LAYER.numChildren;
			for(let i = 0; i < childEffects; i ++)
			{
				let child = this.EFFECT_LAYER.getChildAt(i);
				if(this._isGroupFish)
				{
					if(this._chasisModify[0])
					{
						if(!this._bModifed)
						{
							child.y -= (this._chasisModify[0] * 2);
						}else
						{
							child.y += (this._chasisModify[0] * 2);
						}
					}
				}else
				{
					child.y = -child.y;
				}
			}

			if(this._fid == 100)
			{
				let childPop = this.FISH_POP_LAYER.numChildren;
				for(let i = 0; i < childPop; i ++)
				{
					let child = this.FISH_POP_LAYER.getChildAt(i);
					child.y = -child.y;
					if(this._bFlipY != this._bViewFlip)
					{
						if(!this._bFlipY)
						{
							child.scaleY = child.scaleY;
							child.scaleX = child.scaleX;
						}else
						{
							child.scaleY = -child.scaleY;
							child.scaleX = -child.scaleX;
						}
					}else
					{
						if(!this._bFlipY)
						{
							child.scaleY = -child.scaleY;
							child.scaleX = -child.scaleX;
						}else
						{
							child.scaleY = child.scaleY;
							child.scaleX = child.scaleX;
						}
					}
				}
			}
			if(bFind)
			{	
				this._bModifed = !this._bModifed;
			}
		}
		public getChasisModify():number
		{
			return this._chasisModify[0];
		}
		public resetData():void
		{
			this.scaleX = 1;
			this.scaleY = 1;
			this.getFISH_LAYER().alpha = 1;
			this.getFISH_LAYER().scaleX = 1;
			this.getFISH_LAYER().scaleY = 1;
			this.rotation = 0;
			let dataVo = game.table.T_Fish_Table.getVoByKey(this._fid);
			let frameRate = dataVo.frameRate;
			if (frameRate <= 0) {
				frameRate = CONFIG.defaultFishFrameRate;
			}
			for(let i = 0; i < this._groupFishList.length; i++)
			{
				this._groupFishList[i].frameRate = frameRate;
			}
			let numChild = this.numChildren;
			for(let i = 0; i < numChild; i++)
			{
				let child = this.getChildAt(i);
				child.alpha = 1;
				child.rotation = 0;
			}
			if(this._bFlipY)
			{
				this.fishflipY();
			}
			if(this.EFFECT_LAYER)
			{
				this.EFFECT_LAYER.removeChildren();
			}

			// for (let i = 0; i < this._groupChasisLen; i++) {
			// 	let chasisImg = this._groupChasisArr[i];
			// 	burn.tools.TweenTools.rotationFan(chasisImg, 2000);
			// }
			let numChasisChild = this.CHASIS_LAYER.numChildren;
			for(let i = 0; i < numChasisChild; i++) {
				burn.tools.TweenTools.rotationFan(this.CHASIS_LAYER.getChildAt(i), 2000);
			}
			// for(let i = 0; i < this.numChildren; i++){
			// 	if(this.getChildAt(i) instanceof egret.MovieClip){
			// 		this.removeChild(this.getChildAt(i));
			// 	}
			// }
		}
		public destory():void {
			let numChild = this.numChildren;
			for(let i = 0; i < numChild; i++)
			{
				let child = this.getChildAt(i);
				child.alpha = 0;
			}
			this.timeFun();
			//this.CHASIS_LAYER.addChild(chasisImg);
							
			let numChasisChild = this.CHASIS_LAYER.numChildren;
			for(let i = 0; i < numChasisChild; i++) {
				egret.Tween.removeTweens(this.CHASIS_LAYER.getChildAt(i));
			}
			egret.Tween.removeTweens(this.getFISH_LAYER());
			egret.Tween.removeTweens(this);
			this.parent && this.parent.removeChild(this);
			//this._rectList = [];
			// for (let i = 0; i < this._groupChasisLen; i++) {
			// 	let img = this._groupChasisArr[i];
			// 	burn.tools.TweenTools.clearTween(img);
			// }
			//this.removeChildren();
			//this.parent && this.parent.removeChild(this);
		}
	}
}