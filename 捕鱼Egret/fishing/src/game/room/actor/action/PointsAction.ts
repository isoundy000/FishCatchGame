module room.action {
	
	/**
	 * @author ybb
	 * 由点构成的路径
	 */
	export class PointsAction extends room.action.ActionBase {
 
		public constructor(actor:room.actor.ActorBase) {
			super(actor);
		}

		//开始行为
		public runByData(points:Array<PathPoint>, aliveTime:number = 0):void {
			let self = this;
			this.setActionAlive(true);
			let tw = this.getTween();
			let ac = this.getActor();
			let len = points.length;
			let tempX = ac.x;
			let tempY = ac.y;
			let tempR = ac.rotation;
			for (let i = 0; i < len; i++) {
				let p = points[i];
				tempX += p.x;
				tempY += p.y;
				tempR += p.r;
				let event = p.e;
				tw.to({x:tempX, y:tempY, rotation:tempR}, p.t);
				(function(evt) {
					tw.call(function():void {
						if (evt > 0) {
							let type = ac.getType();
							if (type == AddFishType.FISH) {
								if (evt == room.PointEventEnum.FLIP_Y) {
									ac.fishflipY();
								} else if (evt == room.PointEventEnum.FLIP_X) {
									// tar.scaleX = -tar.scaleX;
								}
							} else if (type == AddFishType.FISH_GROUP) {
								let fList:Array<room.actor.FishBase> = (ac as room.actor.FishGroup).getFishList();
								let fListLen = fList.length;
								for (let j = 0; j < fListLen; j++) {
									fList[j].fishflipY();
								}
							}
						}
					});
				})(event);
			}
			tw.call(function():void {
				self.setActionAlive(false);
			});
		}

		public destory():void {
			super.destory();
		}
	}

	/**
	 * 由点构成的路径单位
	 */
	export class PathPoint {
		
		public x:number;	//路径相对x坐标
		public y:number;	//路径相对y坐标
		public r:number;	//旋转角度
		public t:number;	//路程时间
		public e:number;	//路径事件

		public constructor(x:number, y:number, r:number, t:number, e:number) {
			this.x = x;
			this.y = y;
			this.r = r;
			this.t = t;
			this.e = e;
		}
	}
}