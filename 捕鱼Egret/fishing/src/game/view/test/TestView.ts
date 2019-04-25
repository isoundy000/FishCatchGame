class TestView extends burn.view.FullView {
	//_loadingUI
	private _loadingUI:LoadingUI;
	//操作类型 1：画    2：挪    3：删    4：导
	private _state:number = 1;
	//鱼的模型
	private _fish:room.actor.FishBase;

	////////////////////////////////////
	//层级
	private drawLayer:egret.DisplayObjectContainer;
	private uiLayer:egret.DisplayObjectContainer;
	////////////////////////////////////
	public constructor() {
		super();
	}

	public initView():void {
		let self = this;
		//资源加载完成
		let onResourceLoadComplete = function (event) {
			if (event.groupName == "fishing") {
				let fishId = CONFIG.TEST_FISH_ID;
				let fVo = game.table.T_Fish_Table.getVoByKey(fishId);
				if (fVo) {
					if (fVo.groupId > 0) {
						let resArr = [];
						let groupVo = game.table.T_FishGroup_Table.getVoByKey(fVo.groupId);
						let fishArr = groupVo.pos.split("|");
						for (let i = 0; i < fishArr.length; i++) {
							let fishItem = fishArr[i].split(",");
							let tempFish = game.table.T_Fish_Table.getVoByKey(Number(fishItem[0]));
							resArr.push(tempFish.resRunUrl + "_png");
							resArr.push(tempFish.resRunUrl + "_json");
							resArr.push(tempFish.resRunUrl + "_rect_json");
						}
						RES.createGroup("fff", resArr);
						RES.loadGroup("fff");
						return;
					} else {
						RES.createGroup("fff", [fVo.resRunUrl + "_png", fVo.resRunUrl + "_json", fVo.resRunUrl + "_rect_json"]);
						RES.loadGroup("fff");
						return;
					}
				}
			} 
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);
			self.loadSecond();
		}
		//资源加载进度
		let onResourceProgress = function (event) {
			if (event.groupName == "fishing") {
				// self._loadingUI.setProgress(event.itemsLoaded, event.itemsTotal);
			} 
		}
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, this);

		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Loading.exml", function():void {
            self._loadingUI = new LoadingUI();
            self.addChild(self._loadingUI);
            RES.loadGroup("fishing");
        }, this);
		//初始化操作状态为0
		this._state = 0;
	}

	public loadSecond():void {
		let self = this;
		let onResourceLoadComplete = function (event) {
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);
			self.showUI();
		}
		//资源加载进度
		let onResourceProgress = function (event) {

		}
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, this);
		RES.loadGroup("test");
	}

	public showUI():void {

		let self = this;

		//初始化层级
		this.drawLayer = new egret.DisplayObjectContainer();
		this.addChildAt(this.drawLayer, 50);

		this.uiLayer = new egret.DisplayObjectContainer();
		this.addChildAt(this.uiLayer, 100);

		RES.getResAsync("background_1_jpg", function(data, key):void {
			let bg:egret.Bitmap = new egret.Bitmap(data);
			this.drawLayer.addChildAt(bg, 0);
		}, this);

		this._fish = new room.actor.FishBase(CONFIG.TEST_FISH_ID);
		this._fish.setUniqId(123123);
		this._fish.anchorOffsetX = 0;
		this._fish.anchorOffsetY = 0;
		this._fish.setFishPosition(new egret.Point(640, 360));
		this.drawLayer.addChild(this._fish);
		//	game.util.GameUtil.setLockedEffect(this._fish,"locked","locked_circle_png");

		//添加触摸事件
		this.drawLayer.touchEnabled = true;
		this.drawLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.drawLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.drawLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);

		//GM工具
		let addId:eui.EditableText = new eui.EditableText();
		addId.borderColor = 0xFF0000;
		addId.border = true;
		this.addChild(addId);
		addId.x = 40;
		addId.y = 35;

		let addCount:eui.EditableText = new eui.EditableText();
		addCount.border = true;
		addCount.borderColor = 0xFF0000;
		this.addChild(addCount);
		addCount.x = 150;
		addCount.y = 35;

		let huaBtn:eui.Button = new eui.Button();
		huaBtn.width = 80;
		huaBtn.height = 40;
		huaBtn.label = "加";
		huaBtn.x = 290;
		huaBtn.y = 30;
		
		this.addChild(huaBtn);
		huaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function():void {
			let msg:ModifyDataMessage = new ModifyDataMessage();
			msg.initData();
			msg.setId(Number(addId.text));
			msg.setCount(Number(addCount.text));
			NetManager.send(msg);
		}, this);
		this.initTabBar();
	}

	private toggleBtns:Array<eui.ToggleButton> = [];
	private initTabBar():void {
		for (let i: number = 0; i < 6; i++) {
			let btn: eui.ToggleButton = new eui.ToggleButton();
			btn.y = 100;
			btn.width = 80;
			btn.height = 60;
			btn.x = 20 + i * 80;
			btn.addEventListener(eui.UIEvent.CHANGE, this.toggleChangeHandler, this);
			this.toggleBtns.push(btn);
			this.uiLayer.addChild(btn);
			if (i == 0) {
				btn.label = i + 1 + "画";
			} else if (i == 1) {
				btn.label = i + 1 + "挪";
			} else if (i == 2) {
				btn.label = i + 1 + "删";
			} else if (i == 3) {
				btn.label = i + 1 + "导";
			} else if (i == 4) {
				btn.label = i + 1 + "放";
			} else if (i == 5) {
				btn.label = i + 1 + "翻";
			}
		}
	}
	private toggleChangeHandler(evt: eui.UIEvent) {
		let fx = this._fish.x;
		let fy = this._fish.y;
		for (let i: number = 0; i < this.toggleBtns.length; i++) {
			let btn: eui.ToggleButton = this.toggleBtns[i];
			if (btn == evt.target) {
				btn.selected = true;
				this._state = i + 1;

				if (i == 3) {
					let json:string = "{\"rect\":\n" + 
										"\t[\n";
					for (let j = 0; j < this.kuangList.length; j++) {
						let temp = this.kuangList[j];
						json += "\t\t{\n";
						json += "\t\t\t\"x\":" + (temp.x - fx) + ",\n";
						json += "\t\t\t\"y\":" + (temp.y - fy) + ",\n";
						json += "\t\t\t\"w\":" + temp.width + ",\n";
						json += "\t\t\t\"h\":" + temp.height + "\n";
						json += "\t\t},";
						if (j == this.kuangList.length - 1) {
							json = json.substr(0, json.length - 1);
						}
					}
					json += "\n\t]\n" + 
						"}\n";

					console.log(json);
				}
			} else {
				btn.selected = false;
			}
		}
	}

	private beginPoint:egret.Point;
	private prevPoint:egret.Point;

	private currKuang:egret.Bitmap;

	private kuangList:Array<egret.Bitmap> = new Array<egret.Bitmap>();

	private touchBegin(evt:egret.TouchEvent) {
		console.log("============touchBegin===========");
		let x = evt.stageX;
		let y = evt.stageY;
		this.beginPoint = new egret.Point(x, y);
		this.prevPoint = new egret.Point(x, y);
		if (this._state == 1) {	//画框框
			this.currKuang = new egret.Bitmap();
			this.currKuang.texture = RES.getRes("test_png");
			let rect:egret.Rectangle = new egret.Rectangle(15, 15, 10, 10);
			this.currKuang.scale9Grid = rect;
			this.currKuang.width = 10;
			this.currKuang.height = 10;
			this.currKuang.x = x;
			this.currKuang.y = y;
			this.drawLayer.addChild(this.currKuang);
		} else if (this._state == 2) {	//挪框框
			for (let i = 0; i < this.kuangList.length; i++) {
				let temp = this.kuangList[i];
				let flag = temp.hitTestPoint(x, y);
				if (flag) {
					this.currKuang = temp;
					break;
				}
			}
		} else if (this._state == 6) {	//翻转 111
			game.util.GameUtil.setLockedEffect(this._fish,"locked","locked_circle_png");
			this._fish.fishflipY();
		} else if (this._state == 5) {	//放特效
			let dropX = CONFIG.contentWidth/2;
			let dropY = CONFIG.contentHeight/2;
            let parent = this.drawLayer;
            let data = RES.getRes(CONFIG.EFFECT_1 + "_json");
            let txtr = RES.getRes(CONFIG.EFFECT_1 + "_png");
            let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
            
            let goldIcon = new egret.MovieClip(mcFactory.generateMovieClipData(CONFIG.EFFECT_1));	
            goldIcon.blendMode = egret.BlendMode.ADD;
            goldIcon.scaleX = CONFIG.EFFECT_1_SCALE;
            goldIcon.scaleY = CONFIG.EFFECT_1_SCALE;
            goldIcon.gotoAndPlay("play", 1);
            let dataMc:egret.MovieClipData = goldIcon.movieClipData;

            let frameCur = 0;
            let Rect = new egret.Rectangle(dataMc.frames[frameCur].x,dataMc.frames[frameCur].y,0,0);
            goldIcon.anchorOffsetX = goldIcon.width/2 + Rect.x;
            goldIcon.anchorOffsetY = goldIcon.height/2 + Rect.y;
            goldIcon.frameRate = 10;
            goldIcon.x = dropX;
            goldIcon.y = dropY;
            parent.addChild(goldIcon);

            goldIcon.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
                parent.removeChild(goldIcon);
            }, this);

			if(CONFIG.EFFECT_2 == null)
			{
				return;
			}
            let data1 = RES.getRes(CONFIG.EFFECT_2 + "_json");
            let txtr1 = RES.getRes(CONFIG.EFFECT_2 + "_png");
            let mcFactory1:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data1, txtr1);
            
            let goldIcon1 = new egret.MovieClip(mcFactory1.generateMovieClipData(CONFIG.EFFECT_2));	
            let dataMc1:egret.MovieClipData = goldIcon1.movieClipData;
            let Rect1 = new egret.Rectangle(dataMc1.frames[frameCur].x,dataMc1.frames[frameCur].y,0,0);
            goldIcon1.visible = false;
            goldIcon1.frameRate = 10;
            goldIcon1.scaleX = CONFIG.EFFECT_1_SCALE;
            goldIcon1.scaleY = CONFIG.EFFECT_1_SCALE;
            let tw = egret.Tween.get(goldIcon1);
            tw.wait(CONFIG.EFFECT_DELAY).call(function(){
                egret.Tween.removeTweens(goldIcon1);
                goldIcon1.visible = true;
                goldIcon1.gotoAndPlay("play", 1);
            });
            goldIcon1.anchorOffsetX = goldIcon1.width/2 + Rect1.x;
            goldIcon1.anchorOffsetY = goldIcon1.height/2 + Rect1.y;
            goldIcon1.x = dropX;
            goldIcon1.y = dropY;
            parent.addChild(goldIcon1);
            goldIcon1.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
                parent.removeChild(goldIcon1);
            }, this);
			
		}
	}

	private touchMove(evt:egret.TouchEvent) {
		console.log("============touchMove===========");
		let x = evt.stageX;
		let y = evt.stageY;

		if (this._state == 1) {	//画框框
			let px = this.beginPoint.x;
			let py = this.beginPoint.y;
			let w = Math.abs(px - x);
			let h = Math.abs(py - y);

			this.currKuang.width = w;
			this.currKuang.height = h;
		} else if (this._state == 2) {	//挪框框
			let px = this.prevPoint.x;
			let py = this.prevPoint.y;
			let w = x - px;
			let h = y - py;
			this.currKuang.x += w;
			this.currKuang.y += h; 
		}
		
		this.prevPoint.x = x;
		this.prevPoint.y = y;
	}

	private touchEnd(evt:egret.TouchEvent) {
		console.log("============touchEnd===========");
		let x = evt.stageX;
		let y = evt.stageY;
		if (this._state == 1) {	//画框框
			this.kuangList.push(this.currKuang);
		} else if (this._state == 3) {	//删框框
			for (let i = 0; i < this.kuangList.length; i++) {
				let temp = this.kuangList[i];
				let flag = temp.hitTestPoint(x, y);
				if (flag) {
					this.drawLayer.removeChild(temp);
					this.kuangList.splice(i, 1);
					break;
				}
			}
		}
	}

	public destroy():void {
	
	}
}