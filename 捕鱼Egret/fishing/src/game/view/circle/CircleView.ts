class CircleView extends burn.view.PopView {
	private _uiDisplay:CircleCom;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _arrItem:Array<eui.Group>;
	private _arrLabel:Array<egret.BitmapText>;
	private _arrDate:Array<any>;
	private _bPop:boolean = false;
	public constructor() {
		super();
		this._btnWrapList = new Array();
		game.util.UIUtil.startLoading();
	}

	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/circle/CircleUI.exml", this.addBgResource, this);
	}

	private addBgResource(clazz:any, url:string):void {
		game.util.UIUtil.closeLoading();
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new CircleCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		if (!this._bPop) {
			game.util.UIUtil.popViewCircle(this._uiDisplay.root);
			this._bPop = true;
		}

		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let isTodayDraw = userModel.isTodayDraw();
		//关闭当前界面
		if (isTodayDraw) {
			let colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
			this._uiDisplay.start.filters = [colorFlilter];
		}
		let closeBtn = this._uiDisplay.start;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.start));

		this._arrItem = new Array<eui.Group>();
		this._arrItem.push(this._uiDisplay.item_0);
		this._arrItem.push(this._uiDisplay.item_1);
		this._arrItem.push(this._uiDisplay.item_2);
		this._arrItem.push(this._uiDisplay.item_3);
		this._arrItem.push(this._uiDisplay.item_4);
		this._arrItem.push(this._uiDisplay.item_5);
		this._arrItem.push(this._uiDisplay.item_6);
		this._arrItem.push(this._uiDisplay.item_7);
		this._arrItem.push(this._uiDisplay.item_8);
		this._arrItem.push(this._uiDisplay.item_9);

		this._arrLabel = new Array<egret.BitmapText>();
		this._arrLabel.push(this._uiDisplay.lab_0);
		this._arrLabel.push(this._uiDisplay.lab_1);
		this._arrLabel.push(this._uiDisplay.lab_2);
		this._arrLabel.push(this._uiDisplay.lab_3);
		this._arrLabel.push(this._uiDisplay.lab_4);
		this._arrLabel.push(this._uiDisplay.lab_5);
		this._arrLabel.push(this._uiDisplay.lab_6);
		this._arrLabel.push(this._uiDisplay.lab_7);
		this._arrLabel.push(this._uiDisplay.lab_8);
		this._arrLabel.push(this._uiDisplay.lab_9);
		let str = game.table.T_Config_Table.getVoByKey(59).value;
		let strs = str.split(",");
		let len = strs.length;
		this._arrDate = new Array<any>();
		for (let i = 0; i < len; i ++) {
			let dataItem = strs[i].split("_");
			let obj = {id:Number(dataItem[0]),count:Number(dataItem[1])};
			this._arrDate.push(obj);
		}
		// let data = [{id:10001,count:1},{id:10002,count:2},{id:40001,count:3},{id:40002,count:4},{id:50001,count:5},{id:50002,count:6},
		// 			{id:10001,count:7},{id:10002,count:8},{id:40001,count:9},{id:40002,count:10}];
		//this._arrDate = data;
		this._uiDisplay.lab_0.text = "1";
		for (let i = 1; i < this._arrItem.length; i++) {
			let item = this._arrItem[i];
			let lab = this._arrLabel[i];
			lab.textAlign = egret.HorizontalAlign.CENTER;
			lab.letterSpacing = -5;
			(function (disp, id, num, lab) {
			game.util.IconUtil.getIconByIdAsync(IconType.PROP, id, function(icon:egret.Bitmap):void {
				if (!icon) {
					return;
				}
				icon.width = 70;
				icon.height = 70;
				icon.anchorOffsetX = icon.width/2;
				icon.anchorOffsetY = icon.height/2;
				icon.x = disp.width/2;
				icon.y = disp.height/4;
				if (id == PropEnum.FISH_TICKIT) {
					lab.text = num/10 + "元";
				} else {
					lab.text = num + "";
				}
				disp.addChild(icon);
			});
			})(item,this._arrDate[i].id, this._arrDate[i].count,lab);
		}
		RES.getResAsync("iphone_png", function():void {
			let txture:egret.Texture = RES.getRes("iphone_png");
			let icon:egret.Bitmap = new egret.Bitmap(txture);
			let disp = this._arrItem[0];
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			icon.x = disp.width/2;
			icon.y = disp.height/2;
			this._arrLabel[0].text = "";
			disp.addChild(icon);
		}, this);
    }
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let isTodayDraw = userModel.isTodayDraw();
		if (isTodayDraw) {
			game.util.GameUtil.popTips(game.util.Language.getText(124));
			burn.Director.popView();
			return;
		}
		let send:DailyLoginDrawMessage = new DailyLoginDrawMessage();
        send.initData();
		NetManager.send(send);
		this._uiDisplay.start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		// this.showResult(5);
	}
	public showResult(index:number):void {
		let self = this;
		this._uiDisplay.result.visible = false;
		//let index = 5;
		(function (disp, id, num, lab) {
			game.util.IconUtil.getIconByIdAsync(IconType.PROP, id, function(icon:egret.Bitmap):void {
				if (!icon) {
					return;
				}
				icon.width = 70;
				icon.height = 70;
				icon.anchorOffsetX = icon.width/2;
				icon.anchorOffsetY = icon.height/2;
				icon.x = disp.width/2;
				icon.y = disp.height/2;
				if (id == PropEnum.FISH_TICKIT) {
					lab.text = num/10 + "元";
				} else {
					lab.text = num + "";
				}
				lab.textAlign = egret.HorizontalAlign.CENTER;
				lab.letterSpacing = -5;
				disp.addChild(icon);
			});
		})(this._uiDisplay.item_result,this._arrDate[index].id, this._arrDate[index].count,this._uiDisplay.lab_result);

		let rota = -18 + (-36) * index;
		let twObj = this._uiDisplay.circlePanel;
		let tw = egret.Tween.get(twObj,{loop:false});
		tw.to({rotation:360*5 }, 2500, egret.Ease.circIn)
		.to({rotation:360*7 + rota}, 4000, egret.Ease.circOut)
		.call(function(){
			burn.tools.TweenTools.showOutAndInHalf(self._uiDisplay.selectImg, 700);
			self._uiDisplay.result.visible = true;

			let circle:egret.Shape = new egret.Shape();
			circle.graphics.beginFill(0x0000ff);
			circle.graphics.drawCircle(269,269,235);
			circle.graphics.endFill();
			self._uiDisplay.result.addChild(circle);
			self._uiDisplay.rectResult.mask = circle;
		}).wait(1500).call(function(){
			egret.Tween.removeTweens(twObj);
			if(self._arrDate[index].id == PropEnum.GOLD_WARHEAD) {
				if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
					burn.Director.popView();
					let yaoQingView = new ShareZiYou(ShareType.Circle_GoldWar);
					egret.MainContext.instance.stage.addChild(yaoQingView);
					return;
				}
			}
			let gainArr = new Array<game.model.Item>();
			let item = new game.model.Item(self._arrDate[index].id, self._arrDate[index].count);
			gainArr.push(item);
			game.util.GameUtil.openCommonGainByPos(null,gainArr,new egret.Point(262,659),function(){
				burn.Director.popView();
			});
		});
	}

	public destroy():void {
		//移除按钮封装
		let self = this;
		this._bPop = false;
		//关闭UI动画
		game.util.UIUtil.closeViewCircle(this._uiDisplay.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self._uiDisplay.start.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self.parent.removeChild(self);
			
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/circle/CircleUI.exml");
		});
	}
}

/***操作UI的对应类 */
class CircleCom extends eui.Component{
	public constructor(){super();}
	public start:eui.Group;//关闭
	
	public circlePanel:eui.Group;//转

	public item_0:eui.Group;
	public item_1:eui.Group;
	public item_2:eui.Group;
	public item_3:eui.Group;
	public item_4:eui.Group;
	public item_5:eui.Group;
	public item_6:eui.Group;
	public item_7:eui.Group;
	public item_8:eui.Group;
	public item_9:eui.Group;

	public lab_0:egret.BitmapText;
	public lab_1:egret.BitmapText;
	public lab_2:egret.BitmapText;
	public lab_3:egret.BitmapText;
	public lab_4:egret.BitmapText;
	public lab_5:egret.BitmapText;
	public lab_6:egret.BitmapText;
	public lab_7:egret.BitmapText;
	public lab_8:egret.BitmapText;
	public lab_9:egret.BitmapText;

	public result:eui.Group;
	public item_result:eui.Group;
	public lab_result:egret.BitmapText;
	public rectResult:eui.Rect;

	public selectImg:eui.Image;

	public root:eui.Group;
}