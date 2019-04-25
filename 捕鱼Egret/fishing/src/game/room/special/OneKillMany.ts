module room {
	/**
	 * 一条鱼杀死多条鱼逻辑
	 * 针对特殊鱼：一网打尽、电鳗、炸弹
	 */
	export class OneKillMany {

		/**
		 * 杀死多条鱼
		 * userId：出发的玩家
		 * mainFish：触发的鱼uid
		 * others：波及鱼的数组，包括鱼uid和掉落
		 * type：特效类型，一网打尽、电鳗、炸弹
		 */
		public static killMany(view:RoomView,userId:number, mainFish:number, others:Array<any>,
				 type:number, allFish:Array<room.action.ActionBase>, isFlip:boolean, display:egret.DisplayObject):void {
			//获取主鱼
			let mFishAction = RoomUtil.getActionByUid(allFish, mainFish);
			if (mFishAction == null) {
				console.log("#--------warnning-----killMany--mainFish is null---id-->",mainFish);
				return;
			}
			mFishAction.pause();
			if (type == OneKillManyType.ELECTRIC) {
				this.lockedAllFish(view,userId, mFishAction, others, allFish, type, isFlip, display);
			} else {
				let mFish = mFishAction.getActor();
				//播放触发鱼的特效
				let effect = this.getEffectByType(type);
				let data = RES.getRes(effect + "_json");
				let txtr = RES.getRes(effect + "_png");
				let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
				let mainEffect = new egret.MovieClip(mcFactory.generateMovieClipData(effect));
				mFish.getEFFECT_LAYER().addChild(mainEffect);
				let roOld = mFish.rotation;
				if (roOld != 0) {
					mFish.getFISH_LAYER().rotation = roOld;
				}
				mFish.rotation = 0;
				mainEffect.frameRate = 10;
				if (type == OneKillManyType.BOMB) {
					mainEffect.frameRate = 7;
				}
				mainEffect.scaleX = mainEffect.scaleY = 4;
				mainEffect.gotoAndPlay("play", 1);
				let dataMc:egret.MovieClipData = mainEffect.movieClipData;
				let frameCur = 0;
				let Rect = new egret.Rectangle(dataMc.frames[frameCur].x,dataMc.frames[frameCur].y,0,0);
				mainEffect.anchorOffsetX = mainEffect.width/2 + Rect.x;
				mainEffect.anchorOffsetY = mainEffect.height/2 + Rect.y;
				let count = 0;
				mainEffect.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
					if (count == 0) {
						this.lockedAllFish(view, userId, mFishAction, others, allFish, type, isFlip, display);
					}
					mFish.getEFFECT_LAYER().removeChild(mainEffect);
					mainEffect.stop();
				}, this);
			}
		}

		//锁定所有要死亡的鱼
		private static lockedAllFish(view:RoomView,userId:number, main:room.action.ActionBase, others:Array<any>, 
						allFish:Array<room.action.ActionBase>, type:number, isFlip:boolean, display:egret.DisplayObject):void {
			let mainUid = main.getActor().getUniqId();
			for (let i = 0; i < others.length; i++) {
				let fishAction = RoomUtil.getActionByUid(allFish, others[i].fishId);
				if (fishAction == null) continue;
				fishAction.pause();
				if (type != OneKillManyType.BOMB) {
					this.addLineEffect(main, fishAction, type,isFlip);
				}
			}
			if (type == OneKillManyType.ELECTRIC) {
				let data = RES.getRes("electric_qiu_json");
				let txtr = RES.getRes("electric_qiu_png");
				let mFish = main.getActor();
				let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
				let mainEffect = new egret.MovieClip(mcFactory.generateMovieClipData("electric_qiu"));
				let dataMc:egret.MovieClipData = mainEffect.movieClipData;
				let frameCur = 0;
				let Rect = new egret.Rectangle(dataMc.frames[frameCur].x,dataMc.frames[frameCur].y,0,0);
				mainEffect.anchorOffsetX = mainEffect.width/2 + Rect.x;
				mainEffect.anchorOffsetY = mainEffect.height/2 + Rect.y;
				mFish.getEFFECT_LAYER().addChild(mainEffect);
				mainEffect.gotoAndPlay("play", -1);
				mainEffect.once(egret.Event.REMOVED_FROM_STAGE, (e:egret.Event)=>{
					mainEffect.stop();
				}, this);
			}

			let roomer:game.model.Roomer = (burn.Director.getModelByKey(RoomModel) as RoomModel).getRoomerById(userId);
			let item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), isFlip);
			let to:egret.Point = new egret.Point(item.x,item.y);
			//延迟处理鱼的死亡和掉落
			setTimeout(function():void {
				RoomUtil.fishDeadHandler(allFish, mainUid, userId, to, null, display, view);
				for (let i = 0; i < others.length; i++) {
					let fishAction = RoomUtil.getActionByUid(allFish, others[i].fishId);
					if (fishAction == null) continue;
					RoomUtil.fishDeadHandler(allFish, others[i].fishId, userId, to, others[i].items, display, view);
				}
			}, 750);
		}

		//如果有，播放连接特效
		private static addLineEffect(main:room.action.ActionBase, other:room.action.ActionBase, type:number, isFlip:boolean):void {
			let fish = other.getActor();
			let mainFish = main.getActor();
			//每个鱼身上播放特效
			let effect = this.getEffectByType(type);
			let data = RES.getRes(effect + "_json");
			let txtr = RES.getRes(effect + "_png");
			let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
			let mainEffect = new egret.MovieClip(mcFactory.generateMovieClipData(effect));
			fish.getEFFECT_LAYER().addChild(mainEffect);
			if (type == OneKillManyType.ELECTRIC) {
				mainEffect.anchorOffsetX = mainEffect.width/2;
				mainEffect.anchorOffsetY = mainEffect.height/2;
			}
			mainEffect.gotoAndPlay("play", -1);
			mainEffect.once(egret.Event.REMOVED_FROM_STAGE, (e:egret.Event)=>{
				mainEffect.stop();
			}, this);
			//增加连线
			let lineData = RES.getRes(effect + "_line_json");
			let lineTxtr = RES.getRes(effect + "_line_png");
			let lmcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(lineData, lineTxtr);
			let lineEffect = new egret.MovieClip(lmcFactory.generateMovieClipData(effect + "_line"));
			lineEffect.gotoAndPlay("play", -1);
			let roOld = mainFish.rotation;
			if (roOld != 0) {
				mainFish.getFISH_LAYER().rotation = roOld;
			}
			mainFish.rotation = 0;
			mainFish.getEFFECT_LAYER().addChild(lineEffect);
			lineEffect.anchorOffsetY = lineEffect.height/2;
			lineEffect.anchorOffsetX = 0;
			let mainFishPt = mainFish.localToGlobal();
			let fishPt = fish.localToGlobal();
			//计算两个鱼之间的角度
			let angle = FishUtil.getAngle(mainFishPt.x, mainFishPt.y, fishPt.x, fishPt.y);
			if (isFlip) {
				lineEffect.rotation = angle + 90;
			} else {
				lineEffect.rotation = angle - 90;
			}
			let x = Math.abs(mainFishPt.x - fishPt.x);
			let y = Math.abs(mainFishPt.y - fishPt.y);
			let dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
			lineEffect.scaleX = dist/lineEffect.width;
			lineEffect.scaleY = 1.3;
			lineEffect.once(egret.Event.REMOVED_FROM_STAGE, (e:egret.Event)=>{
				lineEffect.stop();
			}, this);
		}

		//跟进类型获取特效：电鳗、炸弹、一网打尽
		private static getEffectByType(type:number):string {
			switch (type) {
				case OneKillManyType.ELECTRIC: return "electric";
				case OneKillManyType.BOMB: return "bomb";
				case OneKillManyType.CATCH_WHOLE: return "electric";
				default: return "electric";
			}
		}
	}
}