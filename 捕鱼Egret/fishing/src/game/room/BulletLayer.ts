/**
 * 子弹层
 */
class BulletLayer extends egret.DisplayObjectContainer {

	private _frozenBg: egret.Bitmap;
	private _movie: WaveComingAnimUI;
	private _frozenMove: FrozenAnimUI;
	private _bossComing: BossComingUI;
	//boss来袭是否初始化
	private _bInitBoss: boolean;
	//冰冻是否初始化
	private _bInitFrozen: boolean;
	private _nBossComID: number;
	public constructor() {
		super();
		this._bInitBoss = false;
		this._bInitFrozen = false;
	}

	/** 播放冰冻特效 */
	public playFrozenEffect() {
		if (this._frozenBg != null) {
			egret.Tween.removeTweens(this._frozenBg);
			this.removeChild(this._frozenBg);
		}
		this._frozenBg = new egret.Bitmap(RES.getRes("frozen_mask_png"));
		this._frozenBg.touchEnabled = false;
		this._frozenBg.width = CONFIG.contentWidth;
		this._frozenBg.height = CONFIG.contentHeight;
		this._frozenBg.anchorOffsetX = this._frozenBg.width >> 1;
		this._frozenBg.anchorOffsetY = this._frozenBg.height >> 1;
		this._frozenBg.x = CONFIG.contentWidth / 2 + CONFIG.adaptX;
		this._frozenBg.y = CONFIG.contentHeight / 2 + CONFIG.adaptY;

		this._frozenBg.alpha = 0;
		this.addChild(this._frozenBg);

		let tw = egret.Tween.get(this._frozenBg);
		tw.
			wait(300).
			to({ alpha: 0.8 }, 1000);

	}
	/** 清除冰冻特效 */
	public clearFrozenEffect() {
		if (this._frozenBg) {
			let self = this;
			let tw = egret.Tween.get(this._frozenBg);
			tw.to({ alpha: 0 }, 500).call(function (): void {
				egret.Tween.removeTweens(self._frozenBg);
				self.removeChild(self._frozenBg);
				self._frozenBg = null;
			});
		}
	}
	//播放冰冻动画
	public showFrozen(): void {
		if(this._bInitFrozen) {
			return;
		}
		this._bInitFrozen = true;
		if(this._frozenMove) {
			this.onFrozenAninmComplete();
		}
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/FrozenAnim.exml", this.onFrozenAnimLoaded, this);
	}
	private onFrozenAnimLoaded() {
		this._frozenMove = new FrozenAnimUI();
		this._frozenMove.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/FrozenAnim.exml";
		this.addChildAt(this._frozenMove, 1);

		let twZi = egret.Tween.get(this._frozenMove.Zi, {loop:false});
		this._frozenMove.Zi.x = 640;
		this._frozenMove.Zi.y = 360;
		this._frozenMove.Zi.alpha = 0;
		this._frozenMove.Zi.scaleX = 2.5;
		this._frozenMove.Zi.scaleY = 2.5;
		twZi.to({scaleX:1,scaleY:1,alpha:1},250, egret.Ease.backOut)
			.to({scaleX:1.2,scaleY:1.2},100, egret.Ease.backOut)
			.to({scaleX:1,scaleY:1},100, egret.Ease.backOut)
			.wait(300)
			.to({alpha:0,y:188},500, egret.Ease.backOut)
			.call(()=>{
				this.onFrozenAninmComplete();
			});

		let twXuLie_1 = egret.Tween.get(this._frozenMove.XuLie_1, {loop:false});
		this._frozenMove.XuLie_1.alpha = 0;
		twXuLie_1.wait(250)
					.to({x:640,y:373.3,alpha:1},0, egret.Ease.backOut)
					.wait(50)
					.to({scaleX:1.1,scaleY:1.1,alpha:1}, 0, egret.Ease.backOut);
		
		let twXuLie_2 = egret.Tween.get(this._frozenMove.XuLie_2, {loop:false});
		this._frozenMove.XuLie_2.alpha = 0;
		twXuLie_2.wait(300)
					.to({x:630.05,y:371.49,alpha:1,scaleX:1,scaleY:1},0, egret.Ease.backOut)
					.wait(50)
					.to({scaleX:1,scaleY:1,alpha:0}, 0, egret.Ease.backOut);

		let twXuLie_3 = egret.Tween.get(this._frozenMove.XuLie_3, {loop:false});
		this._frozenMove.XuLie_3.alpha = 0;
		twXuLie_3.wait(350)
					.to({x:636,y:368.83,alpha:1},350, egret.Ease.backOut)
					.wait(50)
					.to({alpha:0}, 0, egret.Ease.backOut);

		let twXuLie_4 = egret.Tween.get(this._frozenMove.XuLie_4, {loop:false});
		this._frozenMove.XuLie_4.alpha = 0;
		twXuLie_4.wait(400)
					.to({x:639.14,y:361.95,alpha:0},350, egret.Ease.backOut)
					.wait(50)
					.to({alpha:1}, 0, egret.Ease.backOut)
					.wait(50)
					.to({alpha:0}, 0, egret.Ease.backOut);

		let twBaoGuang = egret.Tween.get(this._frozenMove.BaoGuang, {loop:false});
		this._frozenMove.BaoGuang.alpha = 0;
		this._frozenMove.BaoGuang.x = 636;
		this._frozenMove.BaoGuang.y = 363.51;
		twBaoGuang.wait(250)
					.to({alpha:1}, 0, egret.Ease.backOut)
					.to({x:639.14,y:361.95,alpha:0},0, egret.Ease.backOut)
					.wait(50)
					.to({x:636,y:363.51,alpha:1,scaleX:1.3,scaleY:1.3}, 0, egret.Ease.backOut)
					.to({alpha:0}, 250, egret.Ease.backOut);

		let twGuangTiao = egret.Tween.get(this._frozenMove.GuangTiao, {loop:false});
		this._frozenMove.GuangTiao.alpha = 0;
		twGuangTiao.wait(250)
					.to({alpha:1, x:192.69, y:363.33, width:1064}, 0, egret.Ease.backOut)
					.to({x:-313.94,y:216.7,alpha:0,width:2064, height:330},450, egret.Ease.backOut);
		
		// this._frozenMove.play.addEventListener('complete', this.onFrozenAninmComplete, this);
		// this._frozenMove.play.play(0);
		this._bInitFrozen = false;
	}

	private onFrozenAninmComplete(): void {
		egret.Tween.removeTweens(this._frozenMove.XuLie_1);
		egret.Tween.removeTweens(this._frozenMove.GuangTiao);
		egret.Tween.removeTweens(this._frozenMove.BaoGuang);
		egret.Tween.removeTweens(this._frozenMove.XuLie_4);
		egret.Tween.removeTweens(this._frozenMove.XuLie_3);
		egret.Tween.removeTweens(this._frozenMove.XuLie_2);
		egret.Tween.removeTweens(this._frozenMove.Zi);
		this._frozenMove.parent && this._frozenMove.parent.removeChild(this._frozenMove);
		this._frozenMove = null;
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/FrozenAnim.exml");
	}

	private _isFlip: boolean;
	private _callback: Function;
	//显示鱼潮来临
	public showWave(callback: Function, isFlip: boolean): void {
		let blackBgOld = this.getChildByName("blackBg");
		blackBgOld && this.removeChild(blackBgOld);

		this._isFlip = isFlip;
		this._callback = callback;
		game.util.SoundManager.playEffectSound("changefishzhen");
		let blackBg: egret.Shape = new egret.Shape();
		blackBg.graphics.beginFill(0x000000, 0.5);
		blackBg.graphics.drawRect(0, 0, CONFIG.contentWidth, CONFIG.contentHeight);
		blackBg.graphics.endFill();
		blackBg.name = "blackBg";
		this.addChildAt(blackBg, 1);

		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/WaveComing.exml", this.onWaveComingLoaded, this);
	}
	/**
	 * 不适用匿名内部函数,以释放this
	 */
	private onWaveComingLoaded() {
		this._movie = new WaveComingAnimUI();
		this._movie.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/WaveComing.exml";
		this.addChildAt(this._movie, 2);
		
		let twimage = egret.Tween.get(this._movie.image, {loop:false});
		this._movie.image.x = 430;
		this._movie.image.y = 226.33;
		this._movie.image.width = 855;
		this._movie.image.height = 34;
		this._movie.image.scaleX = -1;
		this._movie.image.scaleY = 1;
		this._movie.image.alpha = 0.75;
		twimage.to({x:1081.51},550, egret.Ease.backOut)
					.wait(1500)
					.to({alpha:0},1100, egret.Ease.backOut);

		let twimage0 = egret.Tween.get(this._movie.image0, {loop:false});
		this._movie.image0.x = 800;
		this._movie.image0.y = 392.33;
		this._movie.image0.width = 855;
		this._movie.image0.height = 34;
		this._movie.image0.alpha = 0.75;
		twimage0.to({x:209.1},550, egret.Ease.backOut)
					.wait(1500)
					.to({alpha:0},1100, egret.Ease.backOut);
		
		let twimage1 = egret.Tween.get(this._movie.image1, {loop:false});
		this._movie.image1.x = 113.38;
		this._movie.image1.y = 322.25;
		twimage1.to({x:643.62},550, egret.Ease.backOut)
				.wait(1500)
				.to({alpha:0},1100, egret.Ease.backOut);

		let twimage2 = egret.Tween.get(this._movie.image2, {loop:false});
		this._movie.image2.x = 1158.81;
		this._movie.image2.y = 322.26;
		twimage2.to({x:643.72,y:322.23},350, egret.Ease.backOut)
				.to({alpha:0,scaleX:1.25,scaleY:1.25,x:643.72,y:322.23},350, egret.Ease.backOut)
				.wait(1820)
				.call(()=>{
					this.onTweenGroupComplete();
				});
	}

	private onTweenGroupComplete(): void {
		let blackBg = this.getChildByName("blackBg");
		blackBg && this.removeChild(blackBg);
		egret.Tween.removeTweens(this._movie.image);
		egret.Tween.removeTweens(this._movie.image2);
		egret.Tween.removeTweens(this._movie.image1);
		egret.Tween.removeTweens(this._movie.image0);

		this._movie.parent && this._movie.parent.removeChild(this._movie);
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/WaveComing.exml");

		RES.getResAsync("wave_json", (jdata, jkey) => {
			RES.getResAsync("wave_png", (pdata, pkey) => {
				let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(jdata, pdata);
				let wave = new egret.MovieClip(mcFactory.generateMovieClipData("wave"));
				wave.gotoAndPlay("play", -1);
				let to: number = -500;
				//根据反转控制浪潮方向
				if (!this._isFlip) {
					wave.rotation = 180;
					wave.x = 0;
					wave.y = 720;
					to = 1280;
				} else {
					wave.x = 1280;
				}
				wave.scaleX = wave.scaleY = 2;
				this.addChild(wave);
				let waveTw = egret.Tween.get(wave, { loop: false });
				waveTw.to({ x: to }, 1000).call(() => {
					egret.Tween.removeTweens(wave);
					this.removeChild(wave);
				});
			}, this);
		}, this);

		this._callback();
	}

	//显示倒计时样式字体
	public showNum(num: number): void {
		let numFont = new egret.BitmapText();
		numFont.font = RES.getRes("number_fnt");
		numFont.text = "" + num;
		numFont.x = CONFIG.contentWidth / 2 + CONFIG.adaptX;
		numFont.y = CONFIG.contentHeight / 2 + CONFIG.adaptY;
		numFont.anchorOffsetX = numFont.width / 2;
		numFont.anchorOffsetY = numFont.height / 2;
		numFont.scaleX = 3.6;
		numFont.scaleY = 3.6;
		this.addChild(numFont);
		let self = this;
		let tw = egret.Tween.get(numFont, { loop: false });
		tw.to({ scaleX: 1.8, scaleY: 1.8 }, 300)
			.to({ scaleX: 2.2, scaleY: 2.21 }, 200)
			.to({ scaleX: 1.9, scaleY: 1.9 }, 150).call(function (): void {
				egret.Tween.removeTweens(numFont);
				self.removeChild(numFont);
			});
	}

	//显示渔网
	public showBulletBomb(id: number, x: number, y: number, pool: FishingObjPool): void {
		let bomb = pool.getFishingNetById(id);
		this.addChild(bomb);
		bomb.x = x;
		bomb.y = y;
		if(CONFIG.IS_WEB){
			bomb.createMovie(function(){
				bomb.playMovie(1,function(){
					bomb.stopMovie();
					bomb.parent && bomb.parent.removeChild(bomb);
					if (bomb.bInPool) {
						pool.nFishingNetPool.push(bomb);
					}
				})
			});
		}else{
			let tw = egret.Tween.get(bomb, { loop: false });
			let self = this;
			tw.to({ scaleX: 1.2, scaleY: 1.2 }, 100).to({ scaleX: 1, scaleY: 1 }, 100).to({ alpha: 0 }, 150).call(function (): void {
				egret.Tween.removeTweens(bomb);
				self.removeChild(bomb);
				if (bomb.bInPool) {
					pool.nFishingNetPool.push(bomb);
				}
			});
			tw.play();
		}
	}

	/** 显示BOSS来临 */
	public bossComing(fishId: number): void {
		if(this._bInitBoss) {
			return;
		}
		this._bInitBoss = true;
        // if(this._bossComing) {
        //     this.bossComingComplete();
        // }
		let self = this;
		let vo = game.table.T_Fish_Table.getVoByKey(fishId);
		let name = "Boss_" + vo.resRunUrl + "_png";
		let rate = "Boss_" + vo.score + "_png";
		//关公
		if (fishId == 100) {
			EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/BossComing.exml", (clazz: any, url: string) =>{
				self._bossComing = new BossComingUI();
				self._bossComing.skinName = clazz;
				self._bossComing.L.visible = true;
				self._bossComing.R.visible = true;
				self._bossComing.N.visible = true;
				self._nBossComID = fishId;
				self.anchorOffsetX = CONFIG.contentWidth >> 1;
				self.anchorOffsetY = CONFIG.contentHeight >> 1;
				self.x = egret.MainContext.instance.stage.stageWidth >> 1;
				self.y = egret.MainContext.instance.stage.stageHeight >> 1;
				self.addChild(self._bossComing);
				self._bossComing.setData(name, rate);

			    let twL = egret.Tween.get(self._bossComing.L, {loop:false});
				self._bossComing.L.x = -60.64;
				twL.to({x:651.36},350, egret.Ease.backOut)
					.wait(1400)
					.to({alpha:0},750, egret.Ease.backOut);

				let twheiDi = egret.Tween.get(self._bossComing.heiDi, {loop:false});
				self._bossComing.heiDi.alpha = 0;
				twheiDi.to({alpha:1},350, egret.Ease.backOut)
						.wait(1400)
						.to({alpha:0},750,egret.Ease.backOut);

				let twR = egret.Tween.get(self._bossComing.R, {loop:false});
				self._bossComing.R.x = 1186.36;
				twR.to({x:651.36},350, egret.Ease.backOut)
				   .wait(1400)
				   .to({alpha:0},750, egret.Ease.backOut);
				
				let twN = egret.Tween.get(self._bossComing.N, {loop:false});
				self._bossComing.N.alpha = 0;
				twN.wait(350)
					.to({alpha:1},0, egret.Ease.backOut)
					.to({alpha:0,scaleX:1.25,scaleY:1.25},350,egret.Ease.backOut) 
					.wait(1050)
					.to({alpha:0},750,egret.Ease.backOut);

				let twDanger_2 = egret.Tween.get(self._bossComing.Danger_2, {loop:false});
				self._bossComing.Danger_2.x = 896.2;
				twDanger_2.to({x:21.51},350, egret.Ease.backOut)
						  .wait(1400)
						  .to({alpha:0},750, egret.Ease.backOut);

				let twDanger_1 = egret.Tween.get(self._bossComing.Danger_1, {loop:false});
				self._bossComing.Danger_1.x = -603.8;
				twDanger_1.to({x:18.89,y:222.33},350, egret.Ease.backOut)
						  .wait(1400)
						  .to({alpha:0},750, egret.Ease.backOut);

				let twBg = egret.Tween.get(self._bossComing.bg, {loop:false});
				self._bossComing.bg.alpha = 0;
				twBg.to({alpha:0.75},0, egret.Ease.backOut)
					.wait(2550)
					.call(function(){
						egret.Tween.removeTweens(self._bossComing.bg);
						egret.Tween.removeTweens(self._bossComing.L);
							 egret.Tween.removeTweens(self._bossComing.Danger_1);
							egret.Tween.removeTweens(self._bossComing.Danger_2);
						egret.Tween.removeTweens(self._bossComing.N);
						egret.Tween.removeTweens(self._bossComing.Zi_2);
							egret.Tween.removeTweens(self._bossComing.heiDi);

						self._bossComing && self.removeChild(self._bossComing);
						self._bossComing = null;
						RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/BossComing.exml");
						self._bInitBoss = false;
					});
			}, this);
			return;
		}

		//其他鱼
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/BossComing.exml", (clazz: any, url: string) => {
			if (!RES.hasRes(name)) {
				console.log(name + ":不存在！！！！");
				return;
			}
			RES.getResAsync(name, () => {
				if (!RES.hasRes(rate)) {
					console.log(rate + ":不存在！！！！");
					return;
				}
				RES.getResAsync(rate, () => {
					self._bossComing = new BossComingUI();
					self._bossComing.skinName = clazz;
					self._bossComing.Zi_1.visible = true;
					self._bossComing.Zi_2.visible = true;
					self._bossComing.Zi_3.visible = true;
					self._nBossComID = fishId;
					self.anchorOffsetX = CONFIG.contentWidth >> 1;
					self.anchorOffsetY = CONFIG.contentHeight >> 1;
					self.x = egret.MainContext.instance.stage.stageWidth >> 1;
					self.y = egret.MainContext.instance.stage.stageHeight >> 1;
					self.addChild(self._bossComing);
					self._bossComing.setData(name, rate);
				
					let twDanger_2 = egret.Tween.get(self._bossComing.Danger_2, {loop:false});
					self._bossComing.Danger_2.x = 896.2;
					twDanger_2.to({x:21.51},350, egret.Ease.backOut)
							  .wait(1400)
							  .to({alpha:0},750, egret.Ease.backOut);

					let twDanger_1 = egret.Tween.get(self._bossComing.Danger_1, {loop:false});
					self._bossComing.Danger_1.x = -603.8;
					twDanger_1.to({x:18.89,y:222.33},350, egret.Ease.backOut)
							  .wait(1400)
							  .to({alpha:0},750, egret.Ease.backOut);
					
					let twZi_1 = egret.Tween.get(self._bossComing.Zi_1, {loop:false});
					self._bossComing.Zi_1.x = -141;
					twZi_1.to({x:530},350, egret.Ease.backOut)
						  .wait(1400)
						  .to({alpha:0},750, egret.Ease.backOut);

					let twZi_2 = egret.Tween.get(self._bossComing.Zi_2, {loop:false});
					self._bossComing.Zi_2.x = 1139;
					twZi_2.to({x:530},350, egret.Ease.backOut)
						  .wait(1400)
						  .to({alpha:0},750, egret.Ease.backOut);

					
					let twheiDi = egret.Tween.get(self._bossComing.heiDi, {loop:false});
					self._bossComing.heiDi.alpha = 0;
					twheiDi.to({alpha:1},350, egret.Ease.backOut)
						   .wait(1400)
						   .to({alpha:0},750,egret.Ease.backOut);

					let twZi_3 = egret.Tween.get(self._bossComing.Zi_3, {loop:false});
					self._bossComing.Zi_3.alpha = 0;
					twZi_3.wait(350)
						  .to({alpha:1,x:669.99},0, egret.Ease.backOut)
						  .to({alpha:0,scaleX:1.25,scaleY:1.25},350,egret.Ease.backOut);
					
					let twgroup0 = egret.Tween.get(self._bossComing.group0, {loop:false});
					self._bossComing.heiDi.x = 1186.36;
					self._bossComing.heiDi.y = 342;
					twgroup0.to({x:650,y:372},350, egret.Ease.backOut)
						    .wait(1400)
						    .to({alpha:0},750,egret.Ease.backOut);
						
					let twgroup = egret.Tween.get(self._bossComing.group, {loop:false});
					self._bossComing.group.x = -60.64;
					self._bossComing.group.y = 348;
					twgroup.to({x:605,y:372},350, egret.Ease.backOut)
						   .wait(1400)
						   .to({alpha:0},750,egret.Ease.backOut);

					let twgroup1 = egret.Tween.get(self._bossComing.group1, {loop:false});
					self._bossComing.group.alpha = 0;
					twgroup1.to({x:605,y:372},350, egret.Ease.backOut)
						    .to({alpha:1,x:605,y:372},350,egret.Ease.backOut) 
						    .to({alpha:0,scaleX:1.25,scaleY:1.25},350,egret.Ease.backOut);

					let twBg = egret.Tween.get(self._bossComing.bg, {loop:false});
					self._bossComing.bg.alpha = 0;
					twBg.to({alpha:0.75},0, egret.Ease.backOut)
						.wait(2550)
						.call(function(){
							egret.Tween.removeTweens(self._bossComing.Danger_2);
							egret.Tween.removeTweens(self._bossComing.Danger_1);
							egret.Tween.removeTweens(self._bossComing.Zi_1);
							egret.Tween.removeTweens(self._bossComing.Zi_2);
							egret.Tween.removeTweens(self._bossComing.group1);
							egret.Tween.removeTweens(self._bossComing.group);
							egret.Tween.removeTweens(self._bossComing.bg);
							egret.Tween.removeTweens(self._bossComing.Zi_3);
							egret.Tween.removeTweens(self._bossComing.heiDi);
							egret.Tween.removeTweens(self._bossComing.group0);
							self._bossComing && self.removeChild(self._bossComing);
							self._bossComing = null;
							RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/BossComing.exml");
						});
					
					self._bInitBoss = false;
				}, self);
			}, self);
		}, this);

	}
	
	// public bossComingComplete() {
	// 	if(this._nBossComID == 100){
	// 		this._bossComing.play2.removeEventListener('complete', this.bossComingComplete, this);
	// 	}else {
	// 		this._bossComing.play.removeEventListener('complete', this.bossComingComplete, this);
	// 	}
	// 	this._bossComing && this.removeChild(this._bossComing);
	// 	this._bossComing = null;
	// 	RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/BossComing.exml");
	// }

	public destroy(): void {

	}
}

/** WaveComingAnimUI动画 */
class WaveComingAnimUI extends eui.Component {
	//动画组
	public play: egret.tween.TweenGroup;
	public image:eui.Image;
	public image0:eui.Image;
	public image1:eui.Image;
	public image2:eui.Image;


	public constructor() {
		super();
	}
}

/** FrozenAnimUI动画 */
class FrozenAnimUI extends eui.Component {
	//动画组
	public play: egret.tween.TweenGroup;
	public GuangTiao:eui.Image;
	public XuLie_1:eui.Image;
	public XuLie_2:eui.Image;
	public XuLie_3:eui.Image;
	public XuLie_4:eui.Image;
	public Zi:eui.Image;
	public BaoGuang:eui.Image;


	public constructor() {
		super();
	}
}

