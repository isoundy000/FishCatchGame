module game.util {
	export class DragonBonesUtil extends eui.Group {

		public constructor(id: number, type: string) {
			super();
			//flag_dragon_start
			this.nId = id;
			let res1 = RES.getRes(this.dbmvArr[0]);
			let res2 = RES.getRes(this.pngArr[0]);
			if (!res1 && !res2) {
				this.bInPool = false;
			} else {
				this.bInPool = true;
			}
			if (type == game.util.DragonBonesUtil.bulletMovie) {
				this.dbmvObj = this.dbmvArr[id - 1];
				this.pngObj = this.pngArr[id - 1];
				this.scaleX = 0.75;
				this.scaleY = 0.75;
			} else {
				this.dbmvObj = this.itemDbmvArr[id - 1];
				this.pngObj = this.itemPngArr[id - 1];
				this.anchorOffsetX = this.width / 2;
				this.anchorOffsetY = this.height / 2;
			}
			//flag_dragon_end
		}

		// python用屏蔽龙骨代码标签：  flag_dragon_start  flag_dragon_end

		public bInPool: boolean;
		public nId: number;
		//动做列表 统一为 newAnimation
		public static ANIM_ACTION: string = "newAnimation";
		//动作对象 统一为 Armature
		public static ANIM_OBJ: string = "Armature";
		//动画类型 (渔网/主页item)
		public static bulletMovie: string = "bullet";
		public static itemMovie: string = "item";
		
		//根据动画类型获取的数据对象
		private dbmvObj: string;
		private pngObj: string;

		//flag_dragon_start
		private movie: dragonBones.Movie = undefined;
		//flag_dragon_end

		//动画数据加载完成标识
		private skeLoadComplete: boolean;
		private picLoadComplete: boolean;
		//子弹 骨骼与资源文件名
		private dbmvArr: Array<string> = ["bullet_bomb_1_ske_dbmv", "bullet_bomb_2_ske_dbmv", "bullet_bomb_3_ske_dbmv", "bullet_bomb_4_ske_dbmv", "bullet_bomb_5_ske_dbmv", "bullet_bomb_6_ske_dbmv"];
		private pngArr: Array<string> = ["bullet_bomb_1_tex_png", "bullet_bomb_2_tex_png", "bullet_bomb_3_tex_png", "bullet_bomb_4_tex_png", "bullet_bomb_5_tex_png", "bullet_bomb_6_tex_png"];
		//主页Item 骨骼与资源文件名
		private itemDbmvArr: Array<string> = ["XinShouChang_DongHua_ske_dbmv", "DiBeiChang_DongHua_ske_dbmv", "GaoBeiChang_DongHua_ske_dbmv", "ShouDongXuanZuo_DongHua_ske_dbmv", "DaJiangSai_DongHua_ske_dbmv"];
		private itemPngArr: Array<string> = ["XinShouChang_DongHua_tex_png", "DiBeiChang_DongHua_tex_png", "GaoBeiChang_DongHua_tex_png", "ShouDongXuanZuo_DongHua_tex_png", "DaJiangSai_DongHua_tex_png"];

		/**
		 * 创建一个龙骨动画 
		 * dragonBones.addMovieGroup 与 dragonBones.buildMovie 执行时需添加唯一动画组名
		 * @param callback 创建完成回调
		 */
		public createMovie(callback: Function = null): void {
			//flag_dragon_start
			let dragonbonesData;
			let texture;
			RES.getResAsync(this.dbmvObj, (data, key) => {
				dragonbonesData = data;
				this.skeLoadComplete = true;
				this.createMovieFn(dragonbonesData, texture, callback);
			}, this);
			RES.getResAsync(this.pngObj, (data, key) => {
				texture = data;
				this.picLoadComplete = true;
				this.createMovieFn(dragonbonesData, texture, callback);
			}, this);
			//flag_dragon_end

		}
		private createMovieFn(skeData: any, picData: any, callback: Function = null) {
			//flag_dragon_start
			if (this.skeLoadComplete && this.picLoadComplete) {
				this.skeLoadComplete = false;
				this.picLoadComplete = false;
				dragonBones.addMovieGroup(skeData, picData, this.nId + "");
				this.movie = dragonBones.buildMovie(game.util.DragonBonesUtil.ANIM_OBJ, this.nId + "");
				this.addChild(this.movie);
				callback && callback();
			}
			//flag_dragon_end

		}

		/**
		 * 播放一个动画 (动作对象及动作名统一指定)
		 * @param count 播放次数 0为无限循环 -1为播放默认动画
		 * @param callback 播放一次完成回调
		 */
		public playMovie(count: number, callback: Function = null) {
			//flag_dragon_start
			this.movie.play(game.util.DragonBonesUtil.ANIM_ACTION, count);
			this.movie.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
				callback && callback();
			}, this);
			//flag_dragon_end

		}

		/**
		 * 设置movieXY
		 */
		public setMovieXY(x: number, y: number) {
			//flag_dragon_start
			this.movie.x = x;
			this.movie.y = y;
			//flag_dragon_end

		}
		/**
		 * 暂停播放动画
		 */
		public pauseMovie() {
			//flag_dragon_start
			this.movie.stop();
			//flag_dragon_end
		}

		/**
		 * 停止到second处
		 * @param second 进行到second(单位秒)处并停止
		 */
		public gotoAndStopMovie(second:number = 2) {
			//flag_dragon_start
			this.movie.gotoAndStop(game.util.DragonBonesUtil.ANIM_ACTION, second);
			//flag_dragon_end
		}

		/**
		 * 停止播放动画
		 */
		public stopMovie() {
			//flag_dragon_start
			this.movie.stop();
			dragonBones.removeMovieGroup(this.nId + "");
			this.movie.parent && this.movie.parent.removeChild(this.movie);
			//flag_dragon_end

		}

	}

}