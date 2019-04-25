class GuideView extends burn.view.PopView {
	private _uiDisplay:GuidesUI;
	private _nCurId:number;
	private _nType:number;

	/** 显示图片的索引 */
	private _nImgIndex:number;
	private _strString:string;
	private _nStrIndex:number;
	private timer:egret.Timer;
	public constructor() {
		super();
		this._nImgIndex = 0;
	}
	private addBgResource(clazz:any, url:string):void {
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new GuidesUI();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/guide/GuideUI.exml";
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//关闭当前界面
		let root = this._uiDisplay.root;
		root.touchEnabled = false;
		RES.getResAsync("ef_finger_circle_json", ()=>{
			RES.getResAsync("ef_finger_circle_png", ()=>{
				RES.getResAsync("ef_finger_json", ()=>{
					RES.getResAsync("ef_finger_png", ()=>{
						this.setData();
					}, this);
				}, this);
			}, this);
		}, this);
   	}
	private setData():void {
		switch (this._nType) {
			case GuideShow.Finger_Txt:
			case GuideShow.Finger:
				this._uiDisplay.fingerAndTxt.visible = true;
				let vo = game.table.T_Guide_Table.getVoByKey(this._nCurId);
				let str = game.util.Language.getText(vo.desc);
				if (str != "Key:null") {
					this._uiDisplay.tips_1.visible = true;
					//this._uiDisplay.tips_1.text = str;
					this._strString = str;
					this._nStrIndex = 0;
					let param = vo.showPos;
					let ps = param.split("_");
					this._uiDisplay.showP.x = Number(ps[0]);
					this._uiDisplay.showP.y = Number(ps[1]);

					this.timer = new egret.Timer(100, 100);
					this.timer.addEventListener(egret.TimerEvent.TIMER, this.onChangeTxt , this);
					this._uiDisplay.fingerAndTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.skipGuide, this);
					this.timer.start();
				} else {
					this._uiDisplay.showP.visible = false;
					this._uiDisplay.tips_1.visible = false;
					this._uiDisplay.fingerAndTxtR.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intercept, this);
				}
				let param = vo.param;
				let ps = param.split("_");
				let cotainW_H = vo.containW_H.split("_");
				let shp2:egret.Shape = new egret.Shape();
				shp2.graphics.beginFill( 0x00ff00 );
				let max = Number(cotainW_H[0]);
				if (max < Number(cotainW_H[1])) {
					max = Number(cotainW_H[1]);
				}
				shp2.graphics.drawCircle( 0, 0, max);
				shp2.graphics.endFill();
				this._uiDisplay.addChild( shp2 );
				shp2.x =  Number(ps[0]);
				shp2.y = Number(ps[1]);
				this._uiDisplay.fingerAndTxtR.mask = shp2;

				let maskIcon:egret.Shape = new egret.Shape();
				maskIcon.graphics.beginFill(0x000000, 1);
				maskIcon.graphics.drawEllipse( 0, 0, Number(cotainW_H[0]), Number(cotainW_H[1]));
				maskIcon.anchorOffsetX = maskIcon.width/2;
				maskIcon.anchorOffsetY = maskIcon.height/2;
				maskIcon.graphics.endFill();
				maskIcon.x = Number(ps[0]);
				maskIcon.y = Number(ps[1]);

				let guide:two.Guide = new two.Guide();
				guide.init(maskIcon, this.stage.stageWidth, this.stage.stageHeight);
				this._uiDisplay.rectGroup.addChild(guide);


				let data = RES.getRes("ef_finger_json");
				let txtr = RES.getRes("ef_finger_png");
				let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
				let finger = new egret.MovieClip(mcFactory.generateMovieClipData("ef_finger"));
				finger.gotoAndPlay("play", -1);
				finger.touchEnabled = false;
				finger.anchorOffsetX = finger.width/2;
				finger.anchorOffsetY = finger.height/2;
				finger.x =  Number(ps[0]) + 35;
				finger.y =  Number(ps[1]) + 30;
				finger.scaleX = 0.6;
				finger.scaleY = 0.6;

				let container = new egret.DisplayObjectContainer();
				let imgClick = game.util.GameUtil.getCircle();
				container.addChild(imgClick);
				let imgClick1 = game.util.GameUtil.getCircle1();
				container.addChild(imgClick1);
				this._uiDisplay.addChild(container);
				this._uiDisplay.addChild(finger);
				container.x = Number(ps[0]);
				container.y = Number(ps[1]);
				container.width = 100;
				container.height = 100;
				container.touchEnabled = false;
			break;
			case GuideShow.Txt:
				this._uiDisplay.txt.visible = true;
				let gvo = game.table.T_Guide_Table.getVoByKey(this._nCurId);
				let gstr = game.util.Language.getText(gvo.desc);
				let gparam = gvo.showPos;
				let gps = gparam.split("_");
				this._uiDisplay.showT.x = Number(gps[0]);
				this._uiDisplay.showT.y = Number(gps[1]);
				//this._uiDisplay.tips.text = str;
				this._strString = gstr;
				this._nStrIndex = 0;
				this.timer = new egret.Timer(100, 100);
        		this.timer.addEventListener(egret.TimerEvent.TIMER, this.onChangeTxt , this);
				this._uiDisplay.txt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.skipGuide, this);
				this.timer.start();
			break;
			case GuideShow.Texture:         //图片
				this._uiDisplay.first.visible = true;
				this._uiDisplay.image_1.visible = true;
				this._uiDisplay.image_1_1.visible = false;
				this._uiDisplay.image_2.visible = true;
				this._uiDisplay.image_2_1.visible = false;
				this._uiDisplay.first.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTextureClick, this);
			break;
			case GuideShow.NONE:                //没有表现
				this.onClosttButtonClick(null);
			break;
		}
	}

	private onChangeTxt() {
		if (this._nType == GuideShow.Txt) {
			this._uiDisplay.tips.text = this._strString.substr(0,this._nStrIndex);
		} else if (this._nType == GuideShow.Finger || this._nType == GuideShow.Finger_Txt) {
			this._uiDisplay.tips_1.text = this._strString.substr(0,this._nStrIndex);
		}
		this._nStrIndex ++;
		if (this._nStrIndex == (this._strString.length + 1)) {
			this.timer.stop();
        	this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onChangeTxt , this);
			this.timer = null;
			if (this._nType == GuideShow.Txt) {
				this._uiDisplay.txt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.skipGuide, this);
				this._uiDisplay.txt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
			} else if(this._nType == GuideShow.Finger || this._nType == GuideShow.Finger_Txt) {
				this._uiDisplay.fingerAndTxtR.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.skipGuide, this);
				this._uiDisplay.fingerAndTxtR.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intercept, this);
			}
		}
	}
	private onTextureClick(e:egret.TouchEvent) {
		this._uiDisplay.first.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTextureClick, this);
		let self = this;
		
		let twG = egret.Tween.get(this._uiDisplay.image_1_1, {loop:false});
		this._uiDisplay.image_1_1.alpha = 0;
		twG.wait(200)
			.call(function(){
			   self._uiDisplay.image_1_1.visible = true;
			})
			.to({alpha: 1}, 200, egret.Ease.backIn)
			.to({alpha: 0},500)
			.call(function(){
				egret.Tween.removeTweens(twG);
			})
		let tw = egret.Tween.get(this._uiDisplay.image_1, {loop:false});
		tw.to({scaleX:0.4, scaleY:0.4},200)
		.call(function(){
			egret.Tween.removeTweens(tw);
			self._uiDisplay.image_1.visible = false;
			self._uiDisplay.image_2.visible = false;
			self._uiDisplay.image_2_1.visible = true;
		})
		let tw1 = egret.Tween.get(this._uiDisplay.image_2_1, {loop:false});
		this._uiDisplay.image_2_1.scaleX = 0.4;
		this._uiDisplay.image_2_1.scaleY = 0.4;
		tw1.wait(200)
		.to({scaleX:1.25, scaleY:1.25}, 150, egret.Ease.backIn)
		.to({scaleX:1, scaleY:1}, 50, egret.Ease.backIn)
		.call(function(){
			egret.Tween.removeTweens(tw1);
			//self._uiDisplay.first.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
		})
		let twSelf = egret.Tween.get(this, {loop:false});
		twSelf.wait(400).to({alpha:0}, 1500).call(function(){
			egret.Tween.removeTweens(self);
			self.onClosttButtonClick(null);
		})
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
		game.util.Guide.completeGuide();
	}
	private skipGuide(e:egret.TouchEvent) {
		if (this._nType == GuideShow.Txt) {
			this._uiDisplay.txt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.skipGuide, this);
			this._uiDisplay.txt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		} else if (this._nType == GuideShow.Finger || this._nType == GuideShow.Finger_Txt) {
			this._uiDisplay.fingerAndTxtR.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.skipGuide, this);
			this._uiDisplay.fingerAndTxtR.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intercept, this);
		}
		if (this.timer) {
			this.timer.stop();
			this.timer = null;
		}
		this._uiDisplay.tips_1.text = this._strString;
		this._uiDisplay.tips.text = this._strString;
	}
	private intercept(e:egret.TouchEvent) {
		burn.Director.popView();
		game.util.Guide.completeGuide();
	}
	public initView(nId:number):void {
		this._nCurId = nId;
		this._nType = game.table.T_Guide_Table.getVoByKey(nId).showtype;
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/guide/GuideUI.exml", this.addBgResource, this);
	}

	public destroy():void {
		if (this._nType == GuideShow.Texture) {
			if (this._uiDisplay) {
				this._uiDisplay.first.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
			}
		} else if(this._nType == GuideShow.Txt) {
			if (this._uiDisplay) {
				this._uiDisplay.txt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
			}
		}
		this.parent && this.parent.removeChild(this);
		console.log("LoginView destory!");
	}
}

/***操作UI的对应类 */
class GuidesUI extends eui.Component{
	public constructor(){super();}
	public root:eui.Group;//关闭
	public first:eui.Group;//
	public image_1:eui.Image;
	public image_1_1:eui.Image;//道光
	public image_2:eui.Image;
	public image_2_1:eui.Image;
	//
	public txt:eui.Group;
	public tips:eui.Label;

	public fingerAndTxt:eui.Group;
	public fingerAndTxtR:eui.Rect;
	public tips_1:eui.Label;

	public showT:eui.Group;
	public showP:eui.Group;

	public rectGroup:eui.Group;
}