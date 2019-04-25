module main {
	export class MainItemUI extends eui.Component {
		//动画组
		public play: egret.tween.TweenGroup;

		public constructor() {
			super();
		}
	}
	//this._uiDisplay.play.removeEventListener('complete', this.onTweenGroupComplete, this);
	export class MainItem extends burn.display.PageItem {

		private _isSelected: boolean;
		private _item: any;
		private _callback: Function;
		public _alivePerson: AlivePersonItem;

		private container: eui.Group;
		public constructor(iid: number, isSelected: boolean = false, callback: Function) {
			super();
			this._isSelected = isSelected;
			this.id = iid;
			this._callback = callback;
			if (CONFIG.IS_WEB) {
				this.init(undefined, undefined);
			} else {
				EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/main_func_" + this.id + ".exml", this.init, this);
			}
		}

		public init(cls: any, url: string): void {
			let self = this;
			let posX = 20;
			if (CONFIG.IS_WEB) {
				// 1 新手 2低倍 3高倍 4手动 5大奖
				self.container = new eui.Group();
				self.addChild(self.container);
				self.container.width = 106;
				self.container.height = 0;
				if(self.id == 1){
					self.container.x = 340/2 - 20;
					self.container.y = 500/2 + 280;
				}else if(self.id == 2){
					self.container.x = 160;
					self.container.y = 500/2 + 265;
				}else if(self.id == 3){
					self.container.x = 340/2 - 10;
					self.container.y = 500/2 + 315;
				}else if(self.id == 4){
					self.container.x = 340/2 - 20;
					self.container.y = 500/2 + 325;
				}else{
					self.container.x = 340/2 - 20;
					self.container.y = 500/2 + 280;
				}
				self._item = new game.util.DragonBonesUtil(self.id, game.util.DragonBonesUtil.itemMovie);
				self.container.addChild(self._item);
				self.touchEnabled = true;
				self.touchChildren = false;
				self._item.createMovie(() => {
					self._item.setMovieXY(0, 0);
					self._item.gotoAndStopMovie();
					if (self._isSelected) {
						self._item.playMovie(0);
					}
				});
			
			} else {
				self._item = new MainItemUI();
				self._item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/main_func_" + self.id + ".exml";
				self.addChild(self._item);
				self._item.anchorOffsetX = self._item.width >> 1;
				self._item.anchorOffsetY = self._item.height >> 1;
				self._item.play.addEventListener('complete', self.onTweenGroupComplete, self);
				self._item.x = 170;
				self._item.y = 260;
				self._item.play.play(0);
			}

			self.isLocked = false;

			let configVo = game.table.T_Config_Table.getVoByKey(36).value;
			let datas = configVo.split("_");
			let contaier = new egret.DisplayObjectContainer();
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			let curGunId = userModel.getCurGunID();
			if (self.id == 2) {
				let chu = Number(datas[0]); // 2
				if (curGunId < chu) {
					let bg1 = new egret.Bitmap(RES.getRes("MainviewUnlockBg_Bg_png"));
					let bg = new egret.Bitmap(RES.getRes("MainviewUnlockBg_png"));
					let numImg = new egret.Bitmap(RES.getRes("MainviewUnlock_1_png"));
					numImg.anchorOffsetX = numImg.width;
					numImg.x = 0;
					numImg.y = 5;
					bg1.x = -60;
					bg1.y = -2;
					contaier.addChild(bg1);
					contaier.addChild(bg);
					contaier.addChild(numImg);
					let lock = new egret.Bitmap(RES.getRes("MainviewUnlock_Suo_png"));
					lock.anchorOffsetX = lock.width;
					lock.anchorOffsetY = lock.height;
					lock.x = 40;
					lock.y = -30;
					contaier.addChild(lock);
					self.isLocked = true;
				}
			} else if (self.id == 3) {
				let gao = Number(datas[1]); // 3
				if (curGunId < gao) {
					let bg1 = new egret.Bitmap(RES.getRes("MainviewUnlockBg_Bg_png"));
					let bg = new egret.Bitmap(RES.getRes("MainviewUnlockBg_png"));
					let numImg = new egret.Bitmap(RES.getRes("MainviewUnlock_2_png"));
					numImg.anchorOffsetX = numImg.width;
					numImg.x = 0;
					numImg.y = 5;
					bg1.x = -60;
					bg1.y = -2;
					contaier.addChild(bg1);
					contaier.addChild(bg);
					contaier.addChild(numImg);
					let lock = new egret.Bitmap(RES.getRes("MainviewUnlock_Suo_png"));
					lock.anchorOffsetX = lock.width;
					lock.anchorOffsetY = lock.height;
					lock.x = 40;
					lock.y = -30;
					contaier.addChild(lock);
					self.isLocked = true;
				}
			} else if (self.id == 4) {
				let xuan = Number(datas[2]);// 4
				if (curGunId < xuan) {
					let bg1 = new egret.Bitmap(RES.getRes("MainviewUnlockBg_Bg_png"));
					let bg = new egret.Bitmap(RES.getRes("MainviewUnlockBg_png"));
					let numImg = new egret.Bitmap(RES.getRes("MainviewUnlock_3_png"));
					numImg.anchorOffsetX = numImg.width;
					numImg.x = 0;
					numImg.y = 5;
					bg1.x = -60;
					bg1.y = -2;
					contaier.addChild(bg1);
					contaier.addChild(bg);
					contaier.addChild(numImg);
					let lock = new egret.Bitmap(RES.getRes("MainviewUnlock_Suo_png"));
					lock.anchorOffsetX = lock.width;
					lock.anchorOffsetY = lock.height;
					lock.x = 40;
					lock.y = -30;
					contaier.addChild(lock);
					self.isLocked = true;
				}
			}
			contaier.anchorOffsetX = contaier.width >> 1;
			contaier.anchorOffsetY = contaier.height >> 1;
			contaier.x = self._item.x + posX;
			contaier.y = 535 / 2 + 100;
			self.addChild(contaier);
			//设置选中状态
			egret.setTimeout(() => {
				self.setSelected(self._isSelected, true);
			}, this, 100);
			self._callback();

			//添加在线人数刷新
			//123 新手 初级 高级
			if (this.id == 1 || this.id == 2 || this.id == 3) {
				EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/alivePerson/AlivePerson.exml", () => {
					self._alivePerson = new AlivePersonItem();
					self._alivePerson.setPersonNumById(self.id);
					if (CONFIG.IS_WEB) {
						self.container.addChild(self._alivePerson);
					} else {
						self._item.addChild(self._alivePerson);
					}

					if (self.id == 3) {
						burn._Notification_.send(NotifyEnum.REFRES_ROOM_ONLINE);
					}
				}, this);
			}
		}

		public setSelected(select: boolean, flag: boolean = false): void {
			this._isSelected = select;
			if (select) {
				if (CONFIG.IS_WEB) {
					this.container.scaleX = this.container.scaleY = 1;
				} else {
					this._item.scaleX = this._item.scaleY = 1;
				}

				// if (this.isLocked) {
				// 	return;
				// }
				//取消滤镜
				this._item.filters = null;
				if (!flag) {
					if (CONFIG.IS_WEB) {
						this._item.playMovie(0);
					} else {
						this._item.play.play();
					}
				}
			} else {
				if (CONFIG.IS_WEB) {
					this.container.scaleX = this.container.scaleY = 0.8;
				} else {
					this._item.scaleX = this._item.scaleY = 0.8;
				}

				//设置滤镜
				let colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
				this._item.filters = [colorFlilter];
				if (CONFIG.IS_WEB) {
					if(this._item.movie)
					this._item.gotoAndStopMovie();
				} else {
					this._item.play.pause();
				}
			}
		}

		//播放主场景UI动画
		private onTweenGroupComplete(): void {
			this._item.play.play(0);
		}

		public getSelected(): boolean {
			return this._isSelected;
		}

		public clicked(): void {
			super.clicked();
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			if (CONFIG.openGuide) {
				if (userModel.getGuideID() <= 1) {
					return;
				}
			}
			if (this._isSelected) {
				if (this.id == 4) {	//手动选房
					burn._Notification_.send(NotifyEnum.OPEN_SELECT_ROOM);
				} else if (this.id == 1) {	//新手场
					burn._Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, { type: RequesetRoomState.NewbieRoom, id: 0 });
				} else if (this.id == 2) {	//初级场
					burn._Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, { type: RequesetRoomState.AutoLowRoom, id: 0 });
				} else if (this.id == 3) {	//高倍场
					burn._Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, { type: RequesetRoomState.AutoHighRoom, id: 0 });
				} else if (this.id == 5) {	//大奖赛
					let curGunId = userModel.getCurGunID();
					let minGunId = game.table.T_Config_Table.getVoByKey(78).value;
					if (curGunId < Number(minGunId)) {
						//popTips
						game.util.GameUtil.popTips(game.util.Language.getText(154));
						return;
					}
					let view: DjsMainView = new DjsMainView();
					let med: DjsMainMediator = new DjsMainMediator(view);
					burn.Director.pushView(med);
				} else {
					//功能尚未开放
					game.util.GameUtil.popTips(game.util.Language.getText(47));
				}
			} else {
				burn._Notification_.send(NotifyEnum.CLICK_MAIN_FUN_ITEM, this.id);
			}
		}

		public destory(): void {
			if (!CONFIG.IS_WEB) {
				this._item && this._item.play.removeEventListener('complete', this.onTweenGroupComplete, this);
				RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/main_func_" + this.id + ".exml");
			}
			this.removeChildren();
			// RES.destroyRes("mainAnim");
		}
	}
}