module room {
	/**
	 * 奖金鱼抽奖界面
	 */
	export class LotteryUI extends eui.Component {
		private _bGuide:boolean;
		//抽奖面板
		public root:eui.Group;
		//关闭按钮
		public closeBtn:eui.Button;
		//领奖按钮
		public getBtn:eui.Button;
		//鱼
		public fish:eui.Image;
		//抽奖
		public chou:eui.Image;
		//TabBar
		public tabBar:eui.TabBar;
		//奖金池奖金
		public score_txt:eui.Label;
		//奖池进度描述
		public tips_txt:eui.Label;
		//
		public max_tips_txt:eui.Label;
		//奖金池进度条
		public progressBar:eui.ProgressBar;
		//当前tab页
		public currTab:number = 1;
		//当前可以抽奖的tab页
		public currSucTag:number = 1;

		//抽奖界面
		public lottery:eui.Group;
		
		//6个item
		public item_1:eui.Group;
		public item_2:eui.Group;
		public item_3:eui.Group;
		public item_4:eui.Group;
		public item_5:eui.Group;
		public item_6:eui.Group;

		private title_0:eui.Label;
		private title_1:eui.Label;
		private title_2:eui.Label;
		private title_3:eui.Label;
		private title_4:eui.Label;
		private title_5:eui.Label;
		private arrTitle:Array<eui.Label>;
		//6个item上内容
		public count_txt1:egret.BitmapText;
		public back_1:eui.Image;
		public count_txt2:egret.BitmapText;
		public back_2:eui.Image;
		public count_txt3:egret.BitmapText;
		public back_3:eui.Image;
		public count_txt4:egret.BitmapText;
		public back_4:eui.Image;
		public count_txt5:egret.BitmapText;
		public back_5:eui.Image;
		public count_txt6:egret.BitmapText;
		public back_6:eui.Image;
		public num_1:eui.Group;
		public num_2:eui.Group;
		public num_3:eui.Group;
		public num_4:eui.Group;
		public num_5:eui.Group;
		public num_6:eui.Group;

		//点击开始抽奖按钮
		public lotteryBtn:eui.Group;
		//确定奖励按钮
		public sureBtn:eui.Group;
		//动画组
		public playAction:egret.tween.TweenGroup;
		//当前可抽奖的最大档位
		public currMaxTab:number;
		//抽奖时所选的item项目
		private _currClickItem:string;

		//奖励飞行目标点
		private _to:egret.Point;
		//按钮封装对象集合
		private _btnWrapList:Array<burn.tools.UIWrap>;

		 public constructor(to:egret.Point) {
			super();
			this._bGuide = false;
			this._btnWrapList = new Array();
			this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Lottery.exml";
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
			EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/LotteryItem.exml", this.addBgResource, this);
			this._to = this.globalToLocal(to.x, to.y);
			this.arrTitle = new Array<eui.Label>();
			this.arrTitle.push(this.title_0);
			this.arrTitle.push(this.title_1);
			this.arrTitle.push(this.title_2);
			this.arrTitle.push(this.title_3);
			this.arrTitle.push(this.title_4);
			this.arrTitle.push(this.title_5);
			this._currClickItem = "";
			this.setCountFont();
		}
		private setCountFont():void {
			this.num_1.name = "num_1";
			this.num_2.name = "num_2";
			this.num_3.name = "num_3";
			this.num_4.name = "num_4";
			this.num_5.name = "num_5";
			this.num_6.name = "num_6";
			
			this.count_txt1 = new egret.BitmapText();
			this.count_txt1.font = RES.getRes("bitmapNum_4_fnt");
			this.count_txt1.name = "txt1";
			this.count_txt1.text = String("1");
			this.num_1.addChildAt(this.count_txt1,1);
			this.count_txt1.textAlign = egret.HorizontalAlign.CENTER;
			this.count_txt1.anchorOffsetX = this.count_txt1.width/2;
			this.count_txt1.anchorOffsetY = this.count_txt1.height/2;

			this.count_txt2 = new egret.BitmapText();
			this.count_txt2.font = RES.getRes("bitmapNum_4_fnt");
			this.count_txt2.name = "txt2";
			this.count_txt2.text = String("1");
			this.num_2.addChildAt(this.count_txt2,1);
			this.count_txt2.textAlign = egret.HorizontalAlign.CENTER;
			this.count_txt2.anchorOffsetX = this.count_txt2.width/2;
			this.count_txt2.anchorOffsetY = this.count_txt2.height/2;

			this.count_txt3 = new egret.BitmapText();
			this.count_txt3.font = RES.getRes("bitmapNum_4_fnt");
			this.count_txt3.name = "txt3";
			this.count_txt3.text = String("1");
			this.num_3.addChildAt(this.count_txt3,1);
			this.count_txt3.textAlign = egret.HorizontalAlign.CENTER;
			this.count_txt3.anchorOffsetX = this.count_txt3.width/2;
			this.count_txt3.anchorOffsetY = this.count_txt3.height/2;

			this.count_txt4 = new egret.BitmapText();
			this.count_txt4.font = RES.getRes("bitmapNum_4_fnt");
			this.count_txt4.name = "txt4";
			this.count_txt4.text = String("1");
			this.num_4.addChildAt(this.count_txt4,1);
			this.count_txt4.textAlign = egret.HorizontalAlign.CENTER;
			this.count_txt4.anchorOffsetX = this.count_txt4.width/2;
			this.count_txt4.anchorOffsetY = this.count_txt4.height/2;

			this.count_txt5 = new egret.BitmapText();
			this.count_txt5.font = RES.getRes("bitmapNum_4_fnt");
			this.count_txt5.name = "txt5";
			this.count_txt5.text = String("1");
			this.num_5.addChildAt(this.count_txt5,1);
			this.count_txt5.textAlign = egret.HorizontalAlign.CENTER;
			this.count_txt5.anchorOffsetX = this.count_txt5.width/2;
			this.count_txt5.anchorOffsetY = this.count_txt5.height/2;

			this.count_txt6 = new egret.BitmapText();
			this.count_txt6.font = RES.getRes("bitmapNum_4_fnt");
			this.count_txt6.name = "txt6";
			this.count_txt6.text = String("1");
			this.num_6.addChildAt(this.count_txt6,1);
			this.count_txt6.textAlign = egret.HorizontalAlign.CENTER;
			this.count_txt6.anchorOffsetX = this.count_txt6.width/2;
			this.count_txt6.anchorOffsetY = this.count_txt6.height/2;
		}

		//UI资源加载完成
		private addBgResource(clazz:any, url:string):void {
			this.root.visible = true;
			this.lottery.visible = false;
			this.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
			this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetReward, this);
			this.fish.visible = false;
			this.chou.visible = false;
			//封装按钮
			this._btnWrapList.push(new burn.tools.UIWrap(this.getBtn));
			this._btnWrapList.push(new burn.tools.UIWrap(this.closeBtn));
			this._btnWrapList.push(new burn.tools.UIWrap(this.sureBtn));

			let model = burn.Director.getModelByKey(LotteryModel) as LotteryModel;
			let score = model.getScore();
			let arrVo = game.table.T_Lottery_Table.getAllVo();
			let curTag = 0;
			for (let i = 0; i < arrVo.length; i++) {
				let scoreCur = arrVo[i].integral;
				if (score >= scoreCur) {
					curTag = i; 
				} else {
					break;
				}
			}

			let killNum = model.getKillNum();
			let maxNum = model.getMaxKill(model.getTodayCount());
			let tips = "";
			let lotteryVo = game.table.T_Lottery_Table.getVoByKey(1);
			if (killNum >= maxNum && score >= lotteryVo.integral) {
				//curTag += 1;
				this.currSucTag = curTag + 1;
				this.setData(this.currSucTag);
				this.initView();
				this.tabBar.selectedIndex = curTag;
				if (this.currSucTag == this.currTab) {
					let lotteryVo = game.table.T_Lottery_Table.getVoByKey(this.currTab + 1);
					if (!lotteryVo) {
						if (this.currTab == game.table.T_Lottery_Table.getAllVo().length) {
							lotteryVo = game.table.T_Lottery_Table.getVoByKey(this.currTab);
						}
					}
					this.setProgress(model.getScore(), lotteryVo.integral);
					this.getBtn.label = game.util.Language.getText(9);//抽奖
					this.fish.visible = false;
					this.chou.visible = true;

				} else {
					let lotteryVo = game.table.T_Lottery_Table.getVoByKey(this.currTab);
					this.setProgress(model.getScore(), lotteryVo.integral);
					this.getBtn.label = game.util.Language.getText(8);//查看鱼种
					this.fish.visible = true;
					this.chou.visible = false;
				}
				//tips = game.util.Language.getText(7);
				tips = this.arrTitle[curTag].text;
			} else { //现在还不能抽奖
				this.currSucTag = 1;
				this.setData(1);
				this.getBtn.label = game.util.Language.getText(8);//查看鱼种
				this.fish.visible = true;
				this.chou.visible = false;
				tips = game.util.Language.getText(6);
				if (killNum >= maxNum) {
					this.setProgress(score, lotteryVo.integral);
				} else {
					this.setProgress(killNum, maxNum);
				}
			}
			
			//设置UI显示
			this.setScore(model.getScore());
			this.setTipsTxt(tips);
			this.visibleTitle(false);
			//监听消息返回
			let self = this;
			game.net.MessageDispatcher.register(game.net.ResponseType.DRAWLOTTERYBACK, function(msg:DrawLotteryBackMessage):void{
				self.lotteryDataBack(msg);
			});

			if (this._bGuide) {
				this.setScore(2222);
				this.setTipsTxt(game.util.Language.getText(9));
				this.setProgress(2000, 2000);
				this.getBtn.label = game.util.Language.getText(9);//抽奖
				this.fish.visible = false;
				this.chou.visible = true;
			}
		}

		//初始化界面
		private initView():void {

		}

		//点击tab菜单
		private onBarItemTap(e:eui.ItemTapEvent): void {
			this.setData(e.itemIndex + 1);
			let model = burn.Director.getModelByKey(LotteryModel) as LotteryModel;
			let killNum = model.getKillNum();
			let maxNum = model.getMaxKill(model.getTodayCount());
			let lotteryVo = game.table.T_Lottery_Table.getVoByKey(1);
			if (killNum >= maxNum && model.getScore() >= lotteryVo.integral) {
				if (this.currSucTag == this.currTab) {
					this.visibleTitle(false);
					let lotteryVo = game.table.T_Lottery_Table.getVoByKey(this.currTab + 1);
					if (!lotteryVo) {
						if (this.currTab == game.table.T_Lottery_Table.getAllVo().length) {
							lotteryVo = game.table.T_Lottery_Table.getVoByKey(this.currTab);
						}
					}
					this.setProgress(model.getScore(), lotteryVo.integral);
					this.getBtn.label = game.util.Language.getText(9);//查看鱼种
					this.fish.visible = false;
					this.chou.visible = true;

				} else if (this.currSucTag < this.currTab) {
					this.visibleTitle(false);
					let lotteryVo = game.table.T_Lottery_Table.getVoByKey(this.currTab);
					this.setProgress(model.getScore(), lotteryVo.integral);
					this.getBtn.label = game.util.Language.getText(8);//查看鱼种
					this.fish.visible = true;
					this.chou.visible = false;
				} else {
					this.visibleTitle(true);
				}
			}
    	}
		//隐藏下标题栏
		private visibleTitle(flag:boolean):void {
			if (flag) {
				this.getBtn.visible = false;
				this.tips_txt.visible = false;
				this.progressBar.visible = false;
				this.max_tips_txt.visible = true;
			} else {
				this.getBtn.visible = true;
				this.tips_txt.visible = true;
				this.progressBar.visible = true;
				this.max_tips_txt.visible = false;
			}
		}
		//初始化档位数据
		private setData(id:number):void {
			this.currTab = id;
			let vo = game.table.T_Lottery_Table.getVoByKey(id);
			//奖励1
			let award_1_arr = vo.award1.split("_");
			let item_1:LotteryItemUI = this.root.getChildByName("item_1") as LotteryItemUI;
			if (item_1 == null) {
				item_1 = new LotteryItemUI(Number(award_1_arr[0]), Number(award_1_arr[1]));
				item_1.name = "item_1";
				item_1.x = 140 + item_1.width/2;
				item_1.y = 255 + item_1.height/2;
				this.root.addChild(item_1);
			} else {
				item_1.setData(Number(award_1_arr[0]), Number(award_1_arr[1]));
			}
			
			//奖励2
			let award_2_arr = vo.award2.split("_");
			let item_2:LotteryItemUI = this.root.getChildByName("item_2") as LotteryItemUI;
			if (item_2 == null) {
				item_2 = new LotteryItemUI(Number(award_2_arr[0]), Number(award_2_arr[1]));
				item_2.name = "item_2";
				item_2.x = 308 + item_1.width/2;
				item_2.y = 255 + item_1.height/2;
				this.root.addChild(item_2);
			} else {
				item_2.setData(Number(award_2_arr[0]), Number(award_2_arr[1]));
			}
			
			//奖励3
			let award_3_arr = vo.award3.split("_");
			let item_3:LotteryItemUI = this.root.getChildByName("item_3") as LotteryItemUI;
			if (item_3 == null) {
				item_3 = new LotteryItemUI(Number(award_3_arr[0]), Number(award_3_arr[1]));
				item_3.name = "item_3";
				item_3.x = 475 + item_1.width/2;
				item_3.y = 255 + item_1.height/2;
				this.root.addChild(item_3);
			} else {
				item_3.setData(Number(award_3_arr[0]), Number(award_3_arr[1]));
			}
			
			//奖励4
			let award_4_arr = vo.award4.split("_");
			let item_4:LotteryItemUI = this.root.getChildByName("item_4") as LotteryItemUI;
			if (item_4 == null) {
				item_4 = new LotteryItemUI(Number(award_4_arr[0]), Number(award_4_arr[1]));
				item_4.name = "item_4";
				item_4.x = 643 + item_1.width/2;
				item_4.y = 255 + item_1.height/2;
				this.root.addChild(item_4);
			} else {
				item_4.setData(Number(award_4_arr[0]), Number(award_4_arr[1]));
			}
			
			//奖励5
			let award_5_arr = vo.award5.split("_");
			let item_5:LotteryItemUI = this.root.getChildByName("item_5") as LotteryItemUI;
			if (item_5 == null) {
				item_5 = new LotteryItemUI(Number(award_5_arr[0]), Number(award_5_arr[1]));
				item_5.name = "item_5";
				item_5.x = 810 + item_1.width/2;
				item_5.y = 255 + item_1.height/2;
				this.root.addChild(item_5);
			} else {
				item_5.setData(Number(award_5_arr[0]), Number(award_5_arr[1]));
			}

			//奖励6
			let award_6_arr = vo.award6.split("_");
			let item_6:LotteryItemUI = this.root.getChildByName("item_6") as LotteryItemUI;
			if (item_6 == null) {
				item_6 = new LotteryItemUI(Number(award_6_arr[0]), Number(award_6_arr[1]));
				item_6.name = "item_6";
				item_6.x = 978 + item_1.width/2;
				item_6.y = 255 + item_1.height/2;
				this.root.addChild(item_6);
			} else {
				item_6.setData(Number(award_6_arr[0]), Number(award_6_arr[1]));
			}

			let arr = new Array<LotteryItemUI>();
			arr.push(item_6);
			arr.push(item_5);
			arr.push(item_4);
			arr.push(item_3);
			arr.push(item_2);
			arr.push(item_1);
			game.util.GameUtil.playWarAction(arr);
		}

		//设置奖金鱼奖池奖金
		public setScore(score:number):void {
			this.score_txt.text = String(score);
		}

		//设置奖池进度描述
		public setTipsTxt(tips:string):void {
			this.tips_txt.text = tips;
		}

		//设置进度条
		public setProgress(val:number, max:number):void {
			this.progressBar.maximum = max;
			this.progressBar.value = val;
		}

		//领取奖励
		public onGetReward(evt:egret.TouchEvent):void {
			this.sureBtn.visible = false;
			let model = burn.Director.getModelByKey(LotteryModel) as LotteryModel;
			let killNum = model.getKillNum();
			let maxNum = model.getMaxKill(model.getTodayCount());
			let lotteryVo = game.table.T_Lottery_Table.getVoByKey(1);
			if (killNum >= maxNum && model.getScore() >= lotteryVo.integral) {
				if (this.currSucTag != this.currTab) {
					let fishKindsView:FishKindsView = new FishKindsView();
					let fishKindsMed:FishKindsMediator = new FishKindsMediator(fishKindsView);
					burn.Director.pushView(fishKindsMed);
					return;
				}

				if (this.currSucTag != 6) {
					let txt = this.arrTitle[this.currSucTag].text;
					let lotteryVo = game.table.T_Lottery_Table.getVoByKey(this.currSucTag + 1);
					if (lotteryVo) {
						let model = burn.Director.getModelByKey(LotteryModel) as LotteryModel;
						let changePoint = Number(lotteryVo.integral) - model.getScore();
						
						let arrName = new Array<string>();
						arrName.push(txt);
						arrName.push(changePoint + "");
						let self = this;
						game.util.GameUtil.openConfirmByTwoButton(null,function(){
							//领奖
							self.root.visible = false;
							self.lottery.visible = true;
							self.setItems();
							self.lotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.startToLottery, self);
						}, this, game.util.Language.getDynamicText(79, arrName));
					}
					return;
				}
				//领奖
				this.root.visible = false;
				this.lottery.visible = true;
				this.setItems();
				this.lotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startToLottery, this);
			} else {
				//查看鱼种
				let fishKindsView:FishKindsView = new FishKindsView();
				let fishKindsMed:FishKindsMediator = new FishKindsMediator(fishKindsView);
				burn.Director.pushView(fishKindsMed);
			}
		}

		//设置抽奖时的档位items信息
		private setItems():void {
			let model = burn.Director.getModelByKey(LotteryModel) as LotteryModel;
			let score = model.getScore();
			let vos = game.table.T_Lottery_Table.getAllVo();
			this.currMaxTab = 1;
			for (let i = 0; i < vos.length; i++) {
				if (score >= vos[i].integral) {
					this.currMaxTab = vos[i].id;
				}
			}

			let vo = game.table.T_Lottery_Table.getVoByKey(this.currMaxTab);
			
			let award_1_arr = vo.award1.split("_");
			let item_1_vo = game.table.T_Item_Table.getVoByKey(Number(award_1_arr[0]));
			if (Number(award_1_arr[0]) == PropEnum.FISH_TICKIT) {
				this.count_txt1.text = Number(award_1_arr[1])/10 + "元";
			} else {
				this.count_txt1.text = award_1_arr[1];
			}
			this.count_txt1.anchorOffsetX = this.count_txt1.width/2;
			this.count_txt1.anchorOffsetY = this.count_txt1.height/2;
			this.count_txt1.name = "count_1";
			this.back_1.name = "back_1";
			let icon_1 = game.util.GameUtil.getIconById(IconType.PROP, item_1_vo.id, Number(award_1_arr[1]));
			icon_1.width = 100;
			icon_1.height = 100;
			icon_1.anchorOffsetX = icon_1.width/2;
			icon_1.anchorOffsetY = icon_1.height/2;
			icon_1.x = 95;
			icon_1.y = 75;
			icon_1.name = "icon";
			this.item_1.addChildAt(icon_1, 2);


			let award_2_arr = vo.award2.split("_");
			let item_2_vo = game.table.T_Item_Table.getVoByKey(Number(award_2_arr[0]));
			if (Number(award_2_arr[0]) == PropEnum.FISH_TICKIT) {
				this.count_txt2.text = Number(award_2_arr[1])/10 + "元";
			} else {
				this.count_txt2.text = award_2_arr[1];
			}
			this.count_txt2.anchorOffsetX = this.count_txt2.width/2;
			this.count_txt2.anchorOffsetY = this.count_txt2.height/2;
			this.count_txt2.name = "count_2";
			this.back_2.name = "back_2";
			let icon_2 = game.util.GameUtil.getIconById(IconType.PROP, item_2_vo.id, Number(award_2_arr[1]));
			icon_2.width = 100;
			icon_2.height = 100;
			icon_2.anchorOffsetX = icon_2.width/2;
			icon_2.anchorOffsetY = icon_2.height/2;
			icon_2.x = 95;
			icon_2.y = 75;
			icon_2.name = "icon";
			this.item_2.addChildAt(icon_2, 2);

			let award_3_arr = vo.award3.split("_");
			let item_3_vo = game.table.T_Item_Table.getVoByKey(Number(award_3_arr[0]));
			if (Number(award_3_arr[0]) == PropEnum.FISH_TICKIT) {
				this.count_txt3.text = Number(award_3_arr[1])/10 + "元";
			} else {
				this.count_txt3.text = award_3_arr[1];
			}
			this.count_txt3.anchorOffsetX = this.count_txt3.width/2;
			this.count_txt3.anchorOffsetY = this.count_txt3.height/2;
			this.count_txt3.name = "count_3";
			this.back_3.name = "back_3";
			let icon_3 = game.util.GameUtil.getIconById(IconType.PROP, item_3_vo.id, Number(award_3_arr[1]));
			icon_3.width = 100;
			icon_3.height = 100;
			icon_3.anchorOffsetX = icon_3.width/2;
			icon_3.anchorOffsetY = icon_3.height/2;
			icon_3.x = 95;
			icon_3.y = 75;
			icon_3.name = "icon";
			this.item_3.addChildAt(icon_3, 2);

			let award_4_arr = vo.award4.split("_");
			let item_4_vo = game.table.T_Item_Table.getVoByKey(Number(award_4_arr[0]));
			if (Number(award_4_arr[0]) == PropEnum.FISH_TICKIT) {
				this.count_txt4.text = Number(award_4_arr[1])/10 + "元";
			} else {
				this.count_txt4.text = award_4_arr[1];
			}
			this.count_txt4.anchorOffsetX = this.count_txt4.width/2;
			this.count_txt4.anchorOffsetY = this.count_txt4.height/2;
			this.count_txt4.name = "count_4";
			this.back_4.name = "back_4";
			let icon_4 = game.util.GameUtil.getIconById(IconType.PROP, item_4_vo.id, Number(award_4_arr[1]));
			icon_4.width = 100;
			icon_4.height = 100;
			icon_4.anchorOffsetX = icon_4.width/2;
			icon_4.anchorOffsetY = icon_4.height/2;
			icon_4.x = 95;
			icon_4.y = 75;
			icon_4.name = "icon";
			this.item_4.addChildAt(icon_4, 2);

			let award_5_arr = vo.award5.split("_");
			let item_5_vo = game.table.T_Item_Table.getVoByKey(Number(award_5_arr[0]));
			if (Number(award_5_arr[0]) == PropEnum.FISH_TICKIT) {
				this.count_txt5.text = Number(award_5_arr[1])/10 + "元";
			} else {
				this.count_txt5.text = award_5_arr[1];
			}
			this.count_txt5.anchorOffsetX = this.count_txt5.width/2;
			this.count_txt5.anchorOffsetY = this.count_txt5.height/2;
			this.count_txt5.name = "count_5";
			this.back_5.name = "back_5";
			let icon_5 = game.util.GameUtil.getIconById(IconType.PROP, item_5_vo.id, Number(award_5_arr[1]));
			icon_5.width = 100;
			icon_5.height = 100;
			icon_5.anchorOffsetX = icon_5.width/2;
			icon_5.anchorOffsetY = icon_5.height/2;
			icon_5.x = 95;
			icon_5.y = 75;
			icon_5.name = "icon";
			this.item_5.addChildAt(icon_5, 2);

			let award_6_arr = vo.award6.split("_");
			let item_6_vo = game.table.T_Item_Table.getVoByKey(Number(award_6_arr[0]));
			if (Number(award_6_arr[0]) == PropEnum.FISH_TICKIT) {
				this.count_txt6.text = Number(award_6_arr[1])/10 + "元";
			} else {
				this.count_txt6.text = award_6_arr[1];
			}
			this.count_txt6.anchorOffsetX = this.count_txt6.width/2;
			this.count_txt6.anchorOffsetY = this.count_txt6.height/2;
			this.count_txt6.name = "count_6";
			this.back_6.name = "back_6";
			let icon_6 = game.util.GameUtil.getIconById(IconType.PROP, item_6_vo.id, Number(award_6_arr[1]));
			icon_6.anchorOffsetX = icon_6.width/2;
			icon_6.anchorOffsetY = icon_6.height/2;
			icon_6.x = 95;
			icon_6.y = 75;
			icon_6.name = "icon";
			this.item_6.addChildAt(icon_6, 2);
		}

		//开始抽奖
		private startToLottery(evt:egret.TouchEvent):void {
			let self = this;
			let tw =  egret.Tween.get(this, {loop:false});
			this.playAction.addEventListener(egret.Event.COMPLETE, self.onTweenGroupComplete, this);
			tw.wait(600).call(function(){
				self.playAction.play();
				egret.Tween.removeTweens(self);
			});

			this.item_1.getChildByName("icon").visible = false;
			this.item_2.getChildByName("icon").visible = false;
			this.item_3.getChildByName("icon").visible = false;
			this.item_4.getChildByName("icon").visible = false;
			this.item_5.getChildByName("icon").visible = false;
			this.item_6.getChildByName("icon").visible = false;

			this.lotteryBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startToLottery, this);
			this.lotteryBtn.visible = false;
			this.playFlip(this.item_1, this.count_txt1, this.back_1);
			this.playFlip(this.item_2, this.count_txt2, this.back_2);
			this.playFlip(this.item_3, this.count_txt3, this.back_3);
			this.playFlip(this.item_4, this.count_txt4, this.back_4);
			this.playFlip(this.item_5, this.count_txt5, this.back_5);
			this.playFlip(this.item_6, this.count_txt6, this.back_6);
		}

		private playFlip(item:eui.Group, count:egret.BitmapText, back:eui.Image):void {
			let tw = egret.Tween.get(item, {loop:false});
			tw.to({scaleX:0}, 300).call(function():void{
				count.visible = false;
				back.visible = true;
			}).to({scaleX:1}, 300).call(function():void{
				egret.Tween.removeTweens(item);
			});
		}

		//动画播放完成
		private onTweenGroupComplete(): void {
			this.item_1.name = "lottery_1";
			this.item_2.name = "lottery_2";
			this.item_3.name = "lottery_3";
			this.item_4.name = "lottery_4";
			this.item_5.name = "lottery_5";
			this.item_6.name = "lottery_6";
        	this.item_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this);
			this.item_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this);
			this.item_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this);
			this.item_4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this);
			this.item_5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this);
			this.item_6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this);

			let self = this;
			let effectChild = self.item_1.getChildByName("ef_lottery_1");
			if (!effectChild) {
				let onConfigComplete = function (event:RES.ResourceEvent):void {
					RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onConfigComplete, self);
					let hint = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
					hint.anchorOffsetX = hint.width/2;
					hint.anchorOffsetY = hint.height/2;
					hint.x = self.item_1.width/2;
					hint.y = self.item_1.height/2;
					hint.blendMode = egret.BlendMode.ADD;
					hint.name = "ef_lottery_1";
					self.item_1.addChild(hint);

					
					let hint1 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
					hint1.anchorOffsetX = hint1.width/2;
					hint1.anchorOffsetY = hint1.height/2;
					hint1.x = self.item_1.width/2;
					hint1.y = self.item_1.height/2;
					hint1.blendMode = egret.BlendMode.ADD;
					hint1.name = "ef_lottery_1";
					self.item_2.addChild(hint1);

					
					let hint2 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
					hint2.anchorOffsetX = hint2.width/2;
					hint2.anchorOffsetY = hint2.height/2;
					hint2.x = self.item_1.width/2;
					hint2.y = self.item_1.height/2;
					hint2.blendMode = egret.BlendMode.ADD;
					hint2.name = "ef_lottery_1";
					self.item_3.addChild(hint2);

					
					let hint3 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
					hint3.anchorOffsetX = hint3.width/2;
					hint3.anchorOffsetY = hint3.height/2;
					hint3.x = self.item_1.width/2;
					hint3.y = self.item_1.height/2;
					hint3.blendMode = egret.BlendMode.ADD;
					hint3.name = "ef_lottery_1";
					self.item_4.addChild(hint3);

					
					let hint4 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
					hint4.anchorOffsetX = hint4.width/2;
					hint4.anchorOffsetY = hint4.height/2;
					hint4.x = self.item_1.width/2;
					hint4.y = self.item_1.height/2;
					hint4.blendMode = egret.BlendMode.ADD;
					hint4.name = "ef_lottery_1";
					self.item_5.addChild(hint4);

					
					let hint5 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
					hint5.anchorOffsetX = hint5.width/2;
					hint5.anchorOffsetY = hint5.height/2;
					hint5.x = self.item_1.width/2;
					hint5.y = self.item_1.height/2;
					hint5.blendMode = egret.BlendMode.ADD;
					hint5.name = "ef_lottery_1";
					self.item_6.addChild(hint5);
					burn.tools.TweenTools.showOutAndInHalf(hint,1000);
					burn.tools.TweenTools.showOutAndInHalf(hint1,1000);
					burn.tools.TweenTools.showOutAndInHalf(hint2,1000);
					burn.tools.TweenTools.showOutAndInHalf(hint3,1000);
					burn.tools.TweenTools.showOutAndInHalf(hint4,1000);
					burn.tools.TweenTools.showOutAndInHalf(hint5,1000);
				}
				RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onConfigComplete, this);
				RES.createGroup("ef_lottery_1_group", ["ef_lottery_1_json", "ef_lottery_1_png"]);
				RES.loadGroup("ef_lottery_1_group");
			}		
			setTimeout(function(){
				if (self._currClickItem != "") {
					return;
				}
				if (self._bGuide) {
					return;
				}
				self._currClickItem = "lottery_1";
				self.deleteEffect();
				let req:DrawLotterySendMessage = new DrawLotterySendMessage();
				req.initData();
				req.setGear(self.currMaxTab);
				NetManager.send(req);
			}, 10000);
    	}
		private deleteEffect():void {
			let child1 = this.item_1.getChildByName("ef_lottery_1");
			if (child1) {
				this.item_1.removeChild(child1);
			}
			let child2 = this.item_2.getChildByName("ef_lottery_1");
			if (child2) {
				this.item_2.removeChild(child2);
			}
			let child3 = this.item_3.getChildByName("ef_lottery_1");
			if (child3) {
				this.item_3.removeChild(child3);
			}
			let child4 = this.item_4.getChildByName("ef_lottery_1");
			if (child4) {
				this.item_4.removeChild(child4);
			}
			let child5 = this.item_5.getChildByName("ef_lottery_1");
			if (child5) {
				this.item_5.removeChild(child5);
			}
			let child6 = this.item_6.getChildByName("ef_lottery_1");
			if (child6) {
				this.item_6.removeChild(child6);
			}
		}
		//向服务器发送抽奖消息
		private sendToLottery(evt:egret.TouchEvent):void {
			if (this._bGuide) {
				this._currClickItem = evt.currentTarget.name;
				this.deleteEffect();
				this.lotteryDataBackGuide();
				let self = this;
				//移除监听
				self.item_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
				self.item_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
				self.item_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
				self.item_4.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
				self.item_5.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
				self.item_6.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
				return;
			}
			this._currClickItem = evt.currentTarget.name;
			this.deleteEffect();
			let req:DrawLotterySendMessage = new DrawLotterySendMessage();
			req.initData();
			req.setGear(this.currMaxTab);
			NetManager.send(req);
			
			let self = this;	
			//移除监听
			self.item_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
			self.item_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
			self.item_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
			self.item_4.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
			self.item_5.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);
			self.item_6.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.sendToLottery, self);

		}

		//抽奖返回
		private lotteryDataBack(msg:DrawLotteryBackMessage):void {
			let self = this;
			let state = msg.getState();
			if (GetLotteryState.GET_SUCC == state) {
				let itemIdx = msg.getItemIndex();
				let idx = this._currClickItem.substr(8, 1);
				let item = this.lottery.getChildByName(this._currClickItem) as eui.Group;
				let tw = egret.Tween.get(item, {loop:false});
				tw.to({scaleX:0}, 300).call(function():void {
					let count = item.getChildByName("num_" + idx) as eui.Group;
					let back = item.getChildByName("back_" + idx) as eui.Image;
					let iconAva = item.getChildByName("icon");
					if (iconAva) {
						iconAva.visible = true;
					}
					count.visible = true;
					back.visible = false;
					//设置item显示
					let vo = game.table.T_Lottery_Table.getVoByKey(self.currMaxTab);
					let award:string = self.getAwardByIdx(itemIdx);
					let awardContend = award.split("_");
					item.removeChildAt(2);
					let itemVo = game.table.T_Item_Table.getVoByKey(Number(awardContend[0]));
					let countNum = count.getChildByName("count_" + idx) as egret.BitmapText;

					if (Number(awardContend[0]) == PropEnum.FISH_TICKIT) {
						countNum.text = Number(awardContend[1])/10 + "元";
					} else {
						countNum.text = awardContend[1];
					}
					countNum.visible = true;
					countNum.anchorOffsetX = countNum.width/2;
					countNum.anchorOffsetY = countNum.height/2;
					let icon = game.util.GameUtil.getIconById(IconType.PROP, itemVo.id, Number(awardContend[1]));
					icon.anchorOffsetX = icon.width/2;
					icon.anchorOffsetY = icon.height/2;
					icon.x = 95;
					icon.y = 75;
					item.addChildAt(icon, 2);
					if (Number(awardContend[0]) == 10001) {
						//TODO 以后这里要播放一个特效 
					}
				}).to({scaleX:1}, 300).call(function():void {
					self.playEnd(itemIdx,Number(idx));
					//添加监听按钮
					self.sureBtn.visible = true;
					self.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.getLotteryEnd, self);
					let effectChild = item.getChildByName("ef_lottery");
					if (!effectChild) {
						let hint5 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
						hint5.anchorOffsetX = hint5.width/2;
						hint5.anchorOffsetY = hint5.height/2;
						hint5.x = self.item_1.width/2;
						hint5.y = self.item_1.height/2;
						hint5.blendMode = egret.BlendMode.ADD;
						hint5.name = "ef_lottery_1";
						item.addChild(hint5);
						burn.tools.TweenTools.showOutAndInHalf(hint5,1000);

						let data1 = RES.getRes("ef_lottery_bao_json");
						let txtr1 = RES.getRes("ef_lottery_bao_png");
						let mcFactory1:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data1, txtr1);
						let hintBao = new MovieFish(mcFactory1.generateMovieClipData("ef_lottery_bao"),egret.Event.COMPLETE);
						hintBao.initEvent();
						let dataMc1:egret.MovieClipData = hintBao.movieClipData;
						let frameCur = 0;
						let modifyRectBao = new egret.Rectangle(dataMc1.frames[frameCur].x,dataMc1.frames[frameCur].y,0,0);
						hintBao.gotoAndPlay("play", 1);
						hintBao.frameRate = 14;
						hintBao.anchorOffsetX = hintBao.width/2;
						hintBao.anchorOffsetY = hintBao.height/2;
						hintBao.x = item.width/2 - modifyRectBao.x  ;
						hintBao.y = item.height/2 - modifyRectBao.y  ;
						hintBao.blendMode = egret.BlendMode.ADD;
						hintBao.name = "ef_lottery_bao";
						item.addChild(hintBao);
						let tw = egret.Tween.get(effectChild, {loop:false});
						tw.wait(3500).call(function(){
							let ef_lottery_1 = item.getChildByName("ef_lottery_1");
							if(ef_lottery_1 != null) {
								item.removeChild(ef_lottery_1);
							}
							let ef_lottery_bao = item.getChildByName("ef_lottery_bao");
							if(ef_lottery_bao != null) {
								item.removeChild(ef_lottery_bao);
							}
							egret.Tween.removeTweens(effectChild);
						});
					}
				});
				this.sureBtn.visible = true;
				this.lotteryBtn.visible = false;
			} else {
				game.util.GameUtil.popTips(state);
			}
		}
		private playEnd(itemIdx:number,idx:number):void {
			let self = this;
			let arr = new Array<number>();
			for (let i = 0; i < 6; i++) {
				if (i == itemIdx) {
					continue;
				}
				arr.push(i);
			}
			let j = 0;
			for (let i = 1; i < 7; i++) {
				if (i == idx) {
					continue;
				}
				itemIdx = arr[j];
				j++;
				(function (i,self,itemIdx) {
				let item = self.lottery.getChildByName("lottery_" + (i)) as eui.Group;
				let tw = egret.Tween.get(item, {loop:false});
				tw.to({scaleX:0}, 300).call(function():void {
					let count = item.getChildByName("num_" + (i)) as eui.Group;
					let back = item.getChildByName("back_" + (i)) as eui.Image;
					let iconAva = item.getChildByName("icon_lottery");
					if (iconAva) {
						iconAva.visible = true;
					}
					count.visible = true;
					back.visible = false;
					//设置item显示
					let vo = game.table.T_Lottery_Table.getVoByKey(self.currMaxTab);
					let award:string = self.getAwardByIdx(itemIdx);
					let awardContend = award.split("_");
					let itemVo = game.table.T_Item_Table.getVoByKey(Number(awardContend[0]));
					let countNum = count.getChildByName("count_" + (i)) as egret.BitmapText;
					if (Number(awardContend[0]) == PropEnum.FISH_TICKIT) {
						countNum.text = Number(awardContend[1])/10 + "元";
					} else {
						countNum.text = awardContend[1];
					}
					countNum.visible = true;
					countNum.anchorOffsetX = countNum.width/2;
					countNum.anchorOffsetY = countNum.height/2;
					let icon = game.util.GameUtil.getIconById(IconType.PROP, itemVo.id, Number(awardContend[1]));
					icon.anchorOffsetX = icon.width/2;
					icon.anchorOffsetY = icon.height/2;
					icon.x = 95;
					icon.y = 75;
					item.addChildAt(icon, 2);
				}).to({scaleX:1}, 300).call(function(){
					egret.Tween.removeTweens(item);
				});
				})(i, this, itemIdx);
			}
		}
		private getAwardByIdx(idx:number):string {
			let vo = game.table.T_Lottery_Table.getVoByKey(this.currMaxTab);
			let award:string = "";
			switch (idx) {
				case 0: award = vo.award1;
					break;
				case 1: award = vo.award2;
					break;
				case 2: award = vo.award3;
					break;
				case 3: award = vo.award4;
					break;
				case 4: award = vo.award5;
					break;
				case 5: award = vo.award6;
					break;
			}
			return award;
		}

		//领取奖励结束后
		private getLotteryEnd(evt:egret.TouchEvent):void {
			this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getLotteryEnd, this);
			// for (let i = 1; i <= 6; i++) {
			// 	let item = this.lottery.getChildByName("lottery_" + i) as eui.Group;
			// 	if (item.name != this._currClickItem) {
			// 		(function(_item:eui.Group, _i){
			// 			let tw = egret.Tween.get(_item, {loop:false});
			// 			tw.to({scaleX:1}, 300).call(function():void {
			// 				let count = _item.getChildByName("num_" + _i);
			// 				count.visible = false;
			// 				egret.Tween.removeTweens(_item);
			// 			});
			// 		})(item, i);
			// 	}
			// }
			//当前选择的item
			let self = this;
			let currItem = this.lottery.getChildByName(this._currClickItem) as eui.Group;
			setTimeout(function():void {
				let tw = egret.Tween.get(currItem, {loop:false});
				tw.to({x:self._to.x, y:self._to.y, scaleX:0.2, scaleY:0.2}, 300).call(function():void {
					egret.Tween.removeTweens(currItem);
					self.closeUI(null);
					let model = burn.Director.getModelByKey(UserModel) as UserModel;
					burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, {userId:model.getUserId(), isTween:true});
					burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {userId:model.getUserId()});
					burn._Notification_.send(NotifyEnum.SET_PROP_NUM);
				});
			}, 600);
		}

/////////////////////////////////////////////////////////引导///////////////////////////////////////////////////////////
		public setGuide():void {
			this._bGuide = true;
		}
		public startLottery():void {
			this.sureBtn.visible = false;
			if (this.currSucTag != 6) {
				//领奖
				this.root.visible = false;
				this.lottery.visible = true;
				this.setItems();
				this.lotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startToLottery, this);
				return;
			}
		}
		private lotteryDataBackGuide():void {
			let self = this;
			let itemIdx = 0;
			let idx = this._currClickItem.substr(8, 1);
			let item = this.lottery.getChildByName(this._currClickItem) as eui.Group;
			let tw = egret.Tween.get(item, {loop:false});
			tw.to({scaleX:0}, 300).call(function():void {
				let count = item.getChildByName("num_" + idx) as eui.Group;
				let back = item.getChildByName("back_" + idx) as eui.Image;
				let iconAva = item.getChildByName("icon");
				if (iconAva) {
					iconAva.visible = true;
				}
				count.visible = true;
				back.visible = false;
				//设置item显示
				let vo = game.table.T_Lottery_Table.getVoByKey(self.currMaxTab);
				let award:string = self.getAwardByIdx(itemIdx);
				let awardContend = award.split("_");
				item.removeChildAt(2);
				let itemVo = game.table.T_Item_Table.getVoByKey(Number(awardContend[0]));
				let countNum = count.getChildByName("count_" + idx) as egret.BitmapText
				countNum.text = Number(awardContend[1])/10 + "元";
				countNum.visible = true;
				countNum.anchorOffsetX = countNum.width/2;
				countNum.anchorOffsetY = countNum.height/2;
				let icon = game.util.GameUtil.getIconById(IconType.PROP, itemVo.id, Number(awardContend[1]));
				icon.anchorOffsetX = icon.width/2;
				icon.anchorOffsetY = icon.height/2;
				icon.x = 95;
				icon.y = 75;
				item.addChildAt(icon, 2);
				if (Number(awardContend[0]) == 10001) {
					//TODO 以后这里要播放一个特效 
				}
			}).to({scaleX:1}, 300).call(function():void {
				//添加监听按钮
				self.sureBtn.visible = true;
				self.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.getLotteryEnd, self);
				let effectChild = item.getChildByName("ef_lottery");
				if (!effectChild) {
					let hint5 = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
					hint5.anchorOffsetX = hint5.width/2;
					hint5.anchorOffsetY = hint5.height/2;
					hint5.x = self.item_1.width/2;
					hint5.y = self.item_1.height/2;
					hint5.blendMode = egret.BlendMode.ADD;
					hint5.name = "ef_lottery_1";
					item.addChild(hint5);
					burn.tools.TweenTools.showOutAndInHalf(hint5,1000);
					
					let data1 = RES.getRes("ef_lottery_bao_json");
					let txtr1 = RES.getRes("ef_lottery_bao_png");
					let mcFactory1:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data1, txtr1);
					let hintBao = new MovieFish(mcFactory1.generateMovieClipData("ef_lottery_bao"),egret.Event.COMPLETE);
					hintBao.initEvent();
					let dataMc1:egret.MovieClipData = hintBao.movieClipData;
					let frameCur = 0;
					let modifyRectBao = new egret.Rectangle(dataMc1.frames[frameCur].x,dataMc1.frames[frameCur].y,0,0);
					hintBao.gotoAndPlay("play", 1);
					hintBao.frameRate = 14;
					hintBao.anchorOffsetX = hintBao.width/2;
					hintBao.anchorOffsetY = hintBao.height/2;
					hintBao.x = item.width/2 - modifyRectBao.x  ;
					hintBao.y = item.height/2 - modifyRectBao.y  ;
					hintBao.blendMode = egret.BlendMode.ADD;
					hintBao.name = "ef_lottery_bao";
					item.addChild(hintBao);

					let tw = egret.Tween.get(effectChild, {loop:false});
					tw.wait(3500).call(function(){
						let ef_lottery_1 = item.getChildByName("ef_lottery_1");
						if(ef_lottery_1 != null) {
							item.removeChild(ef_lottery_1);
						}
						let ef_lottery_bao = item.getChildByName("ef_lottery_bao");
						if(ef_lottery_bao != null) {
							item.removeChild(ef_lottery_bao);
						}
						egret.Tween.removeTweens(effectChild);
					});
				}

			});
			this.sureBtn.visible = true;
			this.lotteryBtn.visible = false;
		}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/** 点击退出UI */
		private closeUI(evt:egret.TouchEvent) {
			//移除按钮封装
			while (this._btnWrapList.length > 0) {
				let wrap = this._btnWrapList.pop();
				wrap.destroy();
			}

			if(this.num_1) {
				this.num_1.removeChildren();
			}
			if(this.num_2) {
				this.num_2.removeChildren();
			}
			if(this.num_3) {
				this.num_3.removeChildren();
			}
			if(this.num_4) {
				this.num_4.removeChildren();
			}
			if(this.num_5) {
				this.num_5.removeChildren();
			}
			if(this.num_6) {
				this.num_6.removeChildren();
			}
			if(this.item_1) {
				this.item_1.removeChildren();
			}
			if(this.item_2) {
				this.item_2.removeChildren();
			}
			if(this.item_3) {
				this.item_3.removeChildren();
			}
			if(this.item_4) {
				this.item_4.removeChildren();
			}
			if(this.item_5) {
				this.item_5.removeChildren();
			}
			if(this.item_6) {
				this.item_6.removeChildren();
			}
			if(this.root) {
				this.root.removeChildren();
			}
			this.removeChildren();
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
			this.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
			this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetReward, this);
        	game.net.MessageDispatcher.unregister(game.net.ResponseType.DRAWLOTTERYBACK);
			this.parent.removeChild(this);
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Lottery.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/LotteryItem.exml");
			burn._Notification_.send(NotifyEnum.LOTTERY_UI_LOAD_END);
		}
	}
}