class RoomUtil {
	public constructor() {
	}

	/**
	 * 分身相关枚举
	 */
	public static getAvaPosByFlip(pos:number,isFlip:boolean,nGunIndex:number):number {
		if (isFlip) {
			switch (pos) {
				case RoomPosEnum.GUN_POS_0:
						return RoomAvaPosEnum["GUN_POS_" + 3 + "_" + (nGunIndex + 1)];
				case RoomPosEnum.GUN_POS_1:
						return RoomAvaPosEnum["GUN_POS_" + 2 + "_" + (nGunIndex + 1)];
				case RoomPosEnum.GUN_POS_2:
						return RoomAvaPosEnum["GUN_POS_" + 1 + "_" + (nGunIndex + 1)];
				case RoomPosEnum.GUN_POS_3:
						return RoomAvaPosEnum["GUN_POS_" + 0 + "_" + (nGunIndex + 1)];
			}
		} else {
			return RoomAvaPosEnum["GUN_POS_" + pos + "_" + (nGunIndex + 1)];
		}
	}
	/**
	 * 跟进是否反转和位置获取UI显示位置
	 */
	public static getPosByFlip(pos:number, isFlip:boolean):number {
		if (isFlip) {
			switch (pos) {
				case RoomPosEnum.GUN_POS_0:
					return RoomPosEnum.GUN_POS_3;
				case RoomPosEnum.GUN_POS_1:
					return RoomPosEnum.GUN_POS_2;
				case RoomPosEnum.GUN_POS_2:
					return RoomPosEnum.GUN_POS_1;
				case RoomPosEnum.GUN_POS_3:
					return RoomPosEnum.GUN_POS_0;
			}
		} else {
			return pos;
		}
	}
	/**
	 * 获取玩家自己的位置
	 */
	public static getMyPosByFlip(pos:number):number {
		switch (pos) {
			case RoomPosEnum.GUN_POS_0:
			case RoomPosEnum.GUN_POS_3:
				return RoomPosEnum.GUN_POS_0;
			case RoomPosEnum.GUN_POS_1:
			case RoomPosEnum.GUN_POS_2:
				return RoomPosEnum.GUN_POS_1;
		}
		return 0;
	}

	public static getAngleByFlip(angle:number, isFlip:boolean):number  {
		if (isFlip) {
			return angle + 180;
		} else {
			return angle;
		}
	}

	public static getAngleByPos(angle:number, pos:number):number  {
		switch (pos) {
				case RoomPosEnum.GUN_POS_0:
					return angle + 180;
				case RoomPosEnum.GUN_POS_1:
					return angle + 180;
				case RoomPosEnum.GUN_POS_2:
					return angle;
				case RoomPosEnum.GUN_POS_3:
					return angle + 180;
			}
	}

	/**
	 * 根据玩家位置获取目标坐标
	 */
	public static getPointByPos(pos:number, isFlip:boolean):egret.Point {
		if (isFlip) {
			switch (pos) {
				case RoomPosEnum.GUN_POS_0:
					return new egret.Point(1115, 65);
				case RoomPosEnum.GUN_POS_1:
					return new egret.Point(235, 65);
				case RoomPosEnum.GUN_POS_2:
					return new egret.Point(1115, 629);
				case RoomPosEnum.GUN_POS_3:
					return new egret.Point(235, 629);
			}
		} else {
			switch (pos) {
				case RoomPosEnum.GUN_POS_0:
					return new egret.Point(235, 629);
				case RoomPosEnum.GUN_POS_1:
					return new egret.Point(1115, 629);
				case RoomPosEnum.GUN_POS_2:
					return new egret.Point(235, 65);
				case RoomPosEnum.GUN_POS_3:
					return new egret.Point(1115, 65);
			}
		}
		return null;
	}
	/**
	 * 根据玩家位置获取玩家炮台
	 */
	public static getGunPointByPos(pos:number, isFlip:boolean):egret.Point {
		if (isFlip) {
			switch (pos) {
				case RoomPosEnum.GUN_POS_0:
					return new egret.Point(890, 165);
				case RoomPosEnum.GUN_POS_1:
					return new egret.Point(400, 165);
				case RoomPosEnum.GUN_POS_2:
					return new egret.Point(890, 529);
				case RoomPosEnum.GUN_POS_3:
					return new egret.Point(400, 529);
			}
		} else {
			switch (pos) {
				case RoomPosEnum.GUN_POS_0:
					return new egret.Point(400, 529);
				case RoomPosEnum.GUN_POS_1:
					return new egret.Point(880, 529);
				case RoomPosEnum.GUN_POS_2:
					return new egret.Point(400, 165);
				case RoomPosEnum.GUN_POS_3:
					return new egret.Point(880, 165);
			}
		}
		return null;
	}

	//获取倍率最高的一条鱼
	public static getMaxScoreFish(arrFish:Array<room.action.ActionBase>):room.actor.FishBase {
		let len = arrFish.length;
		if (len <= 0) {
			return null;
		}
		let maxFish = arrFish[0].getActor();
		if (maxFish.getType() == AddFishType.FISH) {
			for (let i = 1; i < len; i++) {
				let temp = arrFish[i].getActor();
				if (temp.getType() == AddFishType.FISH) {
					let tempFish = temp as room.actor.FishBase;
					if ((maxFish as room.actor.FishBase).getFishScore() < tempFish.getFishScore()) {
						maxFish = arrFish[i].getActor() as room.actor.FishBase;
					}
				} else if (temp.getType() == AddFishType.FISH_GROUP) {
					let fishList = (temp as room.actor.FishGroup).getFishList();
					let maxInGroup = RoomUtil.getMaxScoreFishFromGroup(fishList);
					if (maxInGroup == null) {
						continue;
					}
					if ((maxFish as room.actor.FishBase).getFishScore() < maxInGroup.getFishScore()) {
						maxFish = maxInGroup;
					}
				}
			}
			return maxFish as room.actor.FishBase;
		} else if (maxFish.getType() == AddFishType.FISH_GROUP) {
			let maxInGroup = RoomUtil.getMaxScoreFishFromGroup((maxFish as room.actor.FishGroup).getFishList());
			for (let i = 1; i < len; i++) {
				let temp = arrFish[i].getActor();
				if (temp.getType() == AddFishType.FISH) {
					let tempFish = temp as room.actor.FishBase;
					if (maxInGroup.getFishScore() < tempFish.getFishScore()) {
						maxInGroup = tempFish;
					}
				} else if (temp.getType() == AddFishType.FISH_GROUP) {
					let fishList = (temp as room.actor.FishGroup).getFishList();
					let tempMaxInGroup = RoomUtil.getMaxScoreFishFromGroup(fishList);
					if (tempMaxInGroup == null) {
						continue;
					}
					if (maxInGroup.getFishScore() < tempMaxInGroup.getFishScore()) {
						maxInGroup = tempMaxInGroup;
					}
				}
			}
			return maxInGroup;
		}
		return null;
	}

	/**
	 * 从鱼组中获取最高分的鱼
	 */
	public static getMaxScoreFishFromGroup(list:Array<room.actor.FishBase>):room.actor.FishBase {
		if (list.length <= 0) {
			return null;
		}
		let maxFish = list[0];
		for (let i = 1; i < list.length; i++) {
			if (maxFish.getFishScore() < list[i].getFishScore()) {
				maxFish = list[i];
			}
		}
		return maxFish;
	}

	//获取倍率最高的指定条数的条鱼
	public static getMaxScoreFishByNum(arrFish:Array<room.action.ActionBase>, num:number):Array<room.actor.FishBase> {
		let result = new Array<room.actor.FishBase>();
		function compareFunction(a:room.action.ActionBase, b:room.action.ActionBase) {
			let item1 = 0;
			let item2 = 0;
			let actor = a.getActor();
			if (actor.getType() == AddFishType.FISH) {
				item1 = (actor as room.actor.FishBase).getFishScore();
			} else if(actor.getType() == AddFishType.FISH_GROUP) {
				let fishList = (actor as room.actor.FishGroup).getFishList();
				if (fishList && fishList.length >0) {
					item1 = fishList[0].getFishScore();
				}
			}

			let actorb = b.getActor();
			if (actorb.getType() == AddFishType.FISH) {
				item2 = (actorb as room.actor.FishBase).getFishScore();
			} else if (actorb.getType() == AddFishType.FISH_GROUP) {
				let fishList = (actorb as room.actor.FishGroup).getFishList();
				if (fishList && fishList.length >0) {
					item2 = fishList[0].getFishScore();
				}
			}
			if (item1 > item2) {
				return -1; // 如果是降序排序，返回-1。
			} else if (item1 === item2) {
				return 0;
			} else {
				return 1; // 如果是降序排序，返回1。
			}
		}
		arrFish.sort(compareFunction);
		let count = 0;
		for (let i = 0; i < arrFish.length; i++) {
			let actor = arrFish[i].getActor();
			if (count >= num) {
				break;
			}
			if (actor.getType() == AddFishType.FISH) {
				result.push(actor as room.actor.FishBase);
				count ++;
			} else if (actor.getType() == AddFishType.FISH_GROUP) {
				let fishList = (actor as room.actor.FishGroup).getFishList();
				if (fishList && fishList.length > 0 && fishList[0]) {
					result.push(fishList[0]);
					count ++;
				}
			}
		}
		/* 检测LOG
		for (let i = 0; i < arrFish.length; i++) {
			let actor = arrFish[i].getActor();
			if (actor.getType() == AddFishType.FISH) {
				console.log("##-------------score->",(actor as room.actor.FishBase).getFishScore());
			} else if (actor.getType() == AddFishType.FISH_GROUP) {
				let fishList = (actor as room.actor.FishGroup).getFishList();
				if (fishList && fishList.length > 0 && fishList[0]) {
					console.log("##-------------score->",fishList[0].getFishScore());
				}
			}
		}
		console.log("##-------------num->",num);
		for(let i = 0; i < result.length; i++) {
			console.log("#-----------id--->",result[i].getUniqId());
		}
		*/
		return result;
	}

	//跟进鱼的唯一id获取鱼
	public static getFishById(allFish:Array<room.action.ActionBase>, id:number):room.actor.FishBase {
		let len = allFish.length;
		for (let i = 0; i < len; i++) {
			let fish = allFish[i].getActor();
			if (fish.getType() == AddFishType.FISH_GROUP) {
				let fishGroup = (fish as room.actor.FishGroup).getFishList();
				let fGroupLen = fishGroup.length;
				for (let j = 0; j < fGroupLen; j++) {
					let f = fishGroup[j];
					if (id == f.getUniqId()) {
						return f;
					}
				}
			} else if (AddFishType.FISH) {
				let f = fish as room.actor.FishBase;
				if (f.getUniqId() == id) {
					return f;
				}
			}
		}
		return null;
	}

	//跟进鱼的唯一id获取鱼action
	public static getActionByUid(allFish:Array<room.action.ActionBase>, id:number):room.action.ActionBase {
		let len = allFish.length;
		for (let i = 0; i < len; i++) {
			let fish = allFish[i].getActor();
			if (AddFishType.FISH) {
				let f = fish as room.actor.FishBase;
				let fishId = f.getUniqId();
				if (fishId == id) {
					return allFish[i];
				}
			}
		}
		return null;
	}

	//获得奖金鱼列表
	public static getBonusFish(allFish:Array<room.action.ActionBase>):Array<room.actor.FishBase> {
		let bonusList = new Array<room.actor.FishBase>();
		let len = allFish.length;
		for (let i = 0; i < len; i++) {
			let fish = allFish[i].getActor();
			if (fish.getType() == AddFishType.FISH_GROUP) {
				let fishGroup = (fish as room.actor.FishGroup).getFishList();
				for (let j = 0; j < fishGroup.length; j++) {
					let f = fishGroup[j];
					let fishId = f.getFishId();
					let vo = game.table.T_Fish_Table.getVoByKey(fishId);
					if (vo.functionType == FishType.BOUNS) {
						bonusList.push(f);
					}
				}
			} else if (AddFishType.FISH) {
				let f = fish as room.actor.FishBase;
				let fishId = f.getFishId();
				let vo = game.table.T_Fish_Table.getVoByKey(fishId);
				if (vo.functionType == FishType.BOUNS) {
					bonusList.push(f);
				}
			}
		}
		return bonusList;
	}

	//跟进路径id获取路径数据
	public static getFishPathById(id:number):Array<room.action.PathPoint> {
		let strMove = game.table.T_FishPath_Table.getVoByKey(id);
		let dataMove = strMove.path.points;
		let arr:Array<room.action.PathPoint> = new Array();
		for (let i = 0; i < dataMove.length; i++) {
			let moveDataVo = dataMove[i];
			arr.push(
				new room.action.PathPoint(
					Number(moveDataVo.x), 
					Number(moveDataVo.y), 
					Number(moveDataVo.r), 
					Number(moveDataVo.d),
					Number(moveDataVo.e)
					)
				);
		}
		return arr;
	}

	/** 碰撞检查逻辑 */
	public static hitRect(bullet:BulletBase, fish:room.actor.ActorBase, type:number):number {
		let hitId = -1;
		if (type == AddFishType.FISH || type == AddFishType.CATCH_WHOLE_FISH) {
			hitId = fish.hitRect(bullet.x, bullet.y);
		} else if (type == AddFishType.FISH_GROUP) {
			let fishList = (fish as room.actor.FishGroup).getFishList();
			if (!fishList) {
				return hitId;
			}
			let len = fishList.length;
			for (let k = 0; k < len; k++) {
				hitId = fishList[k].hitRect(bullet.x,bullet.y);
				if (hitId > 0) {
					break;
				}
			}
		}
		return hitId;
	}

	/** 跟进类型获取地盘 */
	public static getChasisByType(fishType:number, type:number):string {
		if (fishType == ChasisFish.GROUP_FISH) {
			switch (type) {
				case ChasisType.GROUP_S:
					return "chassis_group_small_png";
				case ChasisType.GROUP_B:
					return "chassis_group_big_png";
				default:
					return "chassis_group_big_png";
			}
		}
	}

	/** 跟进两点获取两点间角度 */
	public static getAngle(px:number, py:number, mx:number, my:number):number {
		let x = Math.abs(px - mx);
		let y = Math.abs(py - my);
		let z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		let cos = y / z;

		let radina = Math.acos(cos);
		let angle = Math.floor(Math.asin(y / z)/Math.PI * 180);

		if (mx >= px && my <= py) {
			return angle;
		} else if (mx <= px && my <= py) {
			return 180 - angle;
		} else if (mx <= px && my >= py) {
			return 180 + angle;
		} else if (mx >= px && my >= py) {
			return 360 - angle;
		}
		return angle;
	}

	/**处理全民赛鱼死亡 */
	public static fishDeadHandlerByQms(fishList:Array<room.action.ActionBase>, fishUid:number,
					userId:number, to:egret.Point, display:egret.DisplayObject, roomView:RoomView):void {
		let dropX = 0;
        let dropY = 0;
        let fishId = 0;
		let len = fishList.length;
        for (let i = 0; i < len; i++) {
            let fish = fishList[i].getActor();
            if (fish.getType() == AddFishType.FISH || fish.getType() == AddFishType.CATCH_WHOLE_FISH) {
                if (fish.getUniqId() == fishUid) {
               		let p = fish.localToGlobal();
                    dropX = p.x;
                    dropY = p.y;
                    fishId = (fish as room.actor.FishBase).getFishId();
					if ((fish as room.actor.FishBase).getIsGroupFish()) {
                    	fish.playDead(true);
					} else {
                    	fish.playDead(false);
					} 
                    // fishList[i].destory();
                    let index = fishList.indexOf(fishList[i]);
                    if (index >= 0) {
                        fishList.splice(index,1);
                    }
					// FishingObjPool.getInstance().insertFishPool(fish);
                    break;
                }
            } else if (fish.getType() == AddFishType.FISH_GROUP) {
                let arr:Array<room.actor.FishBase> = (fish as room.actor.FishGroup).getFishList();
                for (let j = 0; j < arr.length; j ++) {
                    let gFish = arr[j] as room.actor.FishBase;
                    if (gFish.getUniqId() == fishUid) {
                         //播放特效
                        let p = gFish.localToGlobal();
                        dropX = p.x;
                        dropY = p.y;
                        fishId = gFish.getFishId();
                        //鱼死亡
                        gFish.playDead(true);
                        // gFish.destory();
                        //移除鱼组中的鱼
                        arr.splice(j, 1);
                        break;
                    }
                }
            }
			if (fishId != 0) {
				break;
			}
        }
        if (fishId <= 0) {
			return;
        }
		let roomer:game.model.Roomer = (burn.Director.getModelByKey(RoomModel) as RoomModel).getRoomerById(userId);
		game.util.GameUtil.flyScores(fishId, new egret.Point(dropX, dropY),
							new egret.Point(to.x, to.y), display, userId);
		game.util.SoundManager.playEffectSound("drop_gold");
	}

	/** 处理鱼的死亡handler */
	public static fishDeadHandler(fishList:Array<room.action.ActionBase>, fishUid:number,
					userId:number, to:egret.Point, items:Array<any>, display:egret.DisplayObject, roomView:RoomView):void {
		let dropX = 0;
        let dropY = 0;
        let fishId = 0;
		let len = fishList.length;
        for (let i = 0; i < len; i++) {
            let fish = fishList[i].getActor();
            if (fish.getType() == AddFishType.FISH || fish.getType() == AddFishType.CATCH_WHOLE_FISH) {
                if (fish.getUniqId() == fishUid) {
               		let p = fish.localToGlobal();
                    dropX = p.x;
                    dropY = p.y;
                    fishId = (fish as room.actor.FishBase).getFishId();
					if ((fish as room.actor.FishBase).getIsGroupFish()) {
                    	fish.playDead(true);
					} else {
                    	fish.playDead(false);
					} 
                    // fishList[i].destory();
                    let index = fishList.indexOf(fishList[i]);
                    if (index >= 0) {
                        fishList.splice(index,1);
                    }
					// FishingObjPool.getInstance().insertFishPool(fish);
                    break;
                }
            } else if (fish.getType() == AddFishType.FISH_GROUP) {
                let arr:Array<room.actor.FishBase> = (fish as room.actor.FishGroup).getFishList();
                for (let j = 0; j < arr.length; j ++) {
                    let gFish = arr[j] as room.actor.FishBase;
                    if (gFish.getUniqId() == fishUid) {
                         //播放特效
                        let p = gFish.localToGlobal();
                        dropX = p.x;
                        dropY = p.y;
                        fishId = gFish.getFishId();
                        //鱼死亡
                        gFish.playDead(true);
                        // gFish.destory();
                        //移除鱼组中的鱼
                        arr.splice(j, 1);
                        break;
                    }
                }
            }
			if (fishId != 0) {
				break;
			}
        }
		if (fishId <= 0 || items == null || (to.x == 0 && to.y == 0)) {
			//DEBUG 查询未命中鱼概率的debug代码
			/*
			console.log("##-------------server_fishUid--->",fishUid);
			console.log("##-------------fishId--->",fishId);
			
			let len = fishList.length;
			for (let i = 0; i < len; i++) {
				let fish = fishList[i].getActor();
				if (fish.getType() == AddFishType.FISH) {
					console.log("##--------FISH-----fishId--->",fish.getUniqId());
					let nfishId = (fish as room.actor.FishBase).getFishId();
					console.log("##--------FISH-----nfishId--->",nfishId);

				} else if (fish.getType() == AddFishType.FISH_GROUP) {
					let arr:Array<room.actor.FishBase> = (fish as room.actor.FishGroup).getFishList();
					for (let j = 0; j < arr.length; j ++) {
						let gFish = arr[j] as  room.actor.FishBase;
						console.log("##--------FISH_GROUP-----fishId--->",gFish.getUniqId());
						let nfishId = gFish.getFishId();
						console.log("##--------FISH_GROUP-----fishId--->",nfishId);
					}
				}
			}
			*/
			return;
        }
		let roomer:game.model.Roomer = (burn.Director.getModelByKey(RoomModel) as RoomModel).getRoomerById(userId);
        //掉落内容
		let itemArr = new Array<any>();
		//itemArr.push({itemId:PropEnum.FISH_TICKIT,count:10});
		//itemArr.push({itemId:40002,count:4});
		//itemArr.push({itemId:40002,count:2});
        for (let i = 0; i < items.length; i++) {
			let itemId = Number(items[i].itemId);
			let count = Number(items[i].count); 

            if (itemId == 10001) {  //金币，特殊处理
				//display
				game.util.FrameUtil.playAddCoinsEff(count,new egret.Point(dropX, dropY),display,userId);
				
                game.util.GameUtil.flyCoins(count, fishId, new egret.Point(dropX, dropY),
									new egret.Point(to.x, to.y), display, userId);
				game.util.SoundManager.playEffectSound("drop_gold");
			} else if (itemId == PropEnum.FISH_TICKIT) {
				//点券单独显示
				game.util.GameUtil.flyTickets(count, new egret.Point(dropX, dropY),
				new egret.Point(to.x, to.y), display, userId);
			} else {
				itemArr.push(items[i]);
			}
        }
		if (itemArr.length > 0) {
			let len = itemArr.length;
			for (let i = 0; i < len; i++) {
				let iId = Number(itemArr[i].itemId);
				let iCount = Number(itemArr[i].count);
				let point = new egret.Point(dropX, dropY);
				game.util.GameUtil.flyItems(iCount, iId, point , new egret.Point(to.x, to.y), display, userId);
				let name = game.util.Language.getText(game.table.T_Item_Table.getVoByKey(iId).name);
				let str = name + "X" + iCount;
				(function (str, i) {
					setTimeout(function(){
						game.util.GameUtil.popTips(str,new egret.Point(dropX, dropY));
					}, i*500);
				})(str, i);
			}
		}
	}

	//核弹的震屏
	public static shakeWindow(view : room.base.RoomBase):void {
		egret.Tween.get( view )
			.to( {x:0, y:0}, 100)
			.wait(800).to( {x:2, y:2}, 50).to( {x:-20, y:-20}, 50).to( {x:30, y:25}, 5)
			.to( {x:-20, y:-30}, 50).to( {x:0, y:20}, 50).to( {x:20, y:20}, 50).to( {x:-20, y:-10}, 50).
			to( {x:14, y:5}, 50).to( {x:-14, y:-24}, 50).to( {x:0, y:26}, 50).
			to( {x:-20, y:-10}, 50).
			to( {x:14, y:5}, 50).to( {x:-14, y:-24}, 50).to( {x:0, y:26}, 50).
			to( {x:2, y:2}, 50).to( {x:-20, y:-20}, 50).to( {x:0, y:0}, 5);
	}
	//炸弹的震屏
	public static shakeWindowByBomb(view : room.base.RoomBase):void {
		egret.Tween.get( view )
			.to( {x:0, y:0}, 100)
			.to( {x:2, y:2}, 50).to( {x:-20, y:-20}, 50).to( {x:30, y:25}, 5)
			.to( {x:-20, y:-30}, 50).to( {x:0, y:20}, 50).to( {x:20, y:20}, 50).to( {x:-20, y:-10}, 50).
			to( {x:14, y:5}, 50).to( {x:-14, y:-24}, 50).to( {x:0, y:26}, 50).
			to( {x:-20, y:-10}, 50).
			to( {x:14, y:5}, 50).to( {x:-14, y:-24}, 50).to( {x:0, y:26}, 50).
			to( {x:2, y:2}, 50).to( {x:-20, y:-20}, 50).to( {x:0, y:0}, 5);
	}
	//爆炸鱼的震屏
	public static shakeWindowByFish(view : room.base.RoomBase):void {
		egret.Tween.get( view )
			.to( {x:0, y:0}, 100)
			.to( {x:2, y:2}, 50).to( {x:-2, y:-2}, 50).to( {x:5, y:7}, 5)
			.to( {x:-4, y:-9}, 50).to( {x:-4, y:-1}, 50).to( {x:0, y:0}, 5)
			.to( {x:-14, y:-24}, 50).to( {x:0, y:26}, 50).to( {x:0, y:0}, 5);
	}

	//获取冰花的随机点数组
	public static getFrozenEffectPos():Array<any> {
		//426。360
		let arr = new Array<any>();
		let randX = Math.random() * 200;
		let randY = Math.random() * 200;
		arr.push({x: 100 + randX,y:randY + 100});

		let randX1 = Math.random() * 200;
		let randY1 = Math.random() * 200;
		arr.push({x:626 + randX1,y:randY1 + 100});

		let randX2 = Math.random() * 200;
		let randY2 = Math.random() * 200;
		arr.push({x:1060 + randX2,y:randY2 + 100});

		let randX3 = Math.random() * 400;
		let randY3 = Math.random() * 200;
		arr.push({x:200 + randX3,y:randY3 + 460});

		let randX4 = Math.random() * 400;
		let randY4 = Math.random() * 200;
		arr.push({x:725 + randX4,y:460 + randY4});
		return arr;
	}

	/**
	 * 根据存活时间获取动态路径和初始坐标
	 */
	public static getPointsAndPos(points:Array<room.action.PathPoint>, aliveTime:number):Array<any> {

		let result:Array<any> = new Array<any>();
		let tempPoints = new Array<room.action.PathPoint>();
		let totalTime = 0;
		let len = points.length;
		let addX = 0;
		let addY = 0;
		let addR = 0;
		let addFlipY = 0;
		for (let i = len - 1; i >= 0; i--) {
			totalTime += points[i].t;
			if (totalTime >= aliveTime && i < len - 1) {
				addX += points[i].x;
				addY += points[i].y;
				addR += points[i].r;
				if (points[i].e == room.PointEventEnum.FLIP_Y) {
					addFlipY += 1;
				}
			} else {
				tempPoints.push(points[i]);
			}
		}
		tempPoints = tempPoints.reverse();
		result.push(tempPoints);
		result.push(new egret.Point(addX, addY));
		result.push(addR);
		let flipY:boolean = false;
		if (addFlipY%2 == 0) {
			flipY = false;
		} else {
			flipY = true;
		}
		result.push(flipY);
		return result;
	}

	/**
	 * 获取葫芦产鱼需要的数据
	 */
	public static getPointsAndPosByCala(points:Array<room.action.PathPoint>, pot:number):Array<any> {
		let result:Array<any> = new Array<any>();
		let tempPoints = new Array<room.action.PathPoint>();
		let addX = 0;
		let addY = 0;
		let addR = 0;
		let addFlipY = 0;
		for (let i = 0; i < points.length; i++) {
			if (i < pot) {
				addX += points[i].x;
				addY += points[i].y;
				addR += points[i].r;
				if (points[i].e == room.PointEventEnum.FLIP_Y) {
					addFlipY += 1;
				}
			} else {
				tempPoints.push(points[i]);
			}
		}
		// tempPoints = tempPoints.reverse();
		result.push(tempPoints);
		result.push(new egret.Point(addX, addY));
		result.push(addR);
		let flipY:boolean = false;
		if (addFlipY%2 == 0) {
			flipY = false;
		} else {
			flipY = true;
		}
		result.push(flipY);
		return result;
	}

	public static getPointsByCala(points:Array<room.action.PathPoint>, pot:number):any {
		let addX = 0;
		let addY = 0;
		let r = 0;
		for (let i = 0; i < points.length; i++) {
			if (i < pot) {
				addX += points[i].x;
				addY += points[i].y;
				r += points[i].r;
			}
		}
		return {point:new egret.Point(addX, addY), rotation:r};
	}
}