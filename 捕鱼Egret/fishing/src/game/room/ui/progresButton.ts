/**
 * 待冷却框的按钮组件
 */
class ProgresButton extends eui.Component {
    //root
    public root:eui.Group;
    //按钮
    public btn:eui.Button;
    //图标
    public icon:eui.Image;
    //进度遮板
    public progress:eui.Image;
    //Shape
    public _shape:egret.Shape;
    //cover
    public cover:eui.Image;
    //按钮的回调
    public _funCall:Function;
    //按钮的点击屏蔽
    public _bClick:boolean = true;
    //总冷却时间
    public _nTimeTotal:number;
    private time:number = 0;

    private wProgress:number = 130;
    private hProgress:number = 130;

    private gemGroup:eui.Group;

    private numGroup:eui.Group;
    private gemCostGroup:eui.Group;

    private numFont:egret.BitmapText;
    private gemCostFont:egret.BitmapText;

    private noChange:eui.Group;
    private bNoGem:boolean;
	public constructor(clazz:any) {
		super();
		this.skinName = clazz;
		//冰冻
        this.btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_END, this.click, this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.click, this);

        this.icon.touchEnabled = false;
        this.gemGroup.visible = false;
        this.gemGroup.touchEnabled = false;
        this.numGroup.touchEnabled = false;
        this.cover.touchEnabled = false;
        this.progress.touchEnabled = false;
        this.progress.width = 110;
        this.progress.height = 110;
        this.wProgress = this.root.width;
        this.hProgress = this.root.height;
        this._shape = new egret.Shape();
        this._shape.x = this.root.width >> 1;
        this._shape.y = this.root.height >> 1;
        this._shape.rotation = -90;
        this.progress.mask = this._shape;
        this.addChild(this._shape);
        this._shape.touchEnabled = false;

        
        this.numFont = new egret.BitmapText();
        this.numFont.font = RES.getRes("iconNum_1_fnt");
        this.numFont.text = "0";
        this.numFont.scaleX = 1.04;
        this.numFont.scaleY = 1.03;
        this.numFont.anchorOffsetX = this.numFont.width;
        this.numFont.anchorOffsetY = this.numFont.height/2;
        this.numGroup.addChild(this.numFont);

        this.gemCostFont = new egret.BitmapText();
        this.gemCostFont.font = RES.getRes("iconNum_1_fnt");
        this.gemCostFont.text = "0";
        this.gemCostFont.scaleX = 1.04;
        this.gemCostFont.scaleY = 1.03;
        this.gemCostFont.anchorOffsetX = this.gemCostFont.width;
        this.gemCostFont.anchorOffsetY = this.gemCostFont.height/2;
        this.gemCostGroup.addChild(this.gemCostFont);
        this.changeGraphics(0);
        this.bNoGem = false;
        this.noChange.cacheAsBitmap = true;
	}
    //设置冷却时间
    public setTimeTotal(nTime:number):void {
        nTime += 1;
        this._nTimeTotal = 360 / (nTime * 1000.0);//360 / 20000.0;
    }
    //设置按钮回调函数
    public setButtonClickFun(fun:Function):void {
        this._funCall = fun;
    }
    //设置该道具所需钻石数量
    public setGemCost(str:string):void {
        //this.gemCost.text = str;
        if (str == undefined) {
            this.gemCostGroup.visible = false;
            this.gemCostFont.text != "-1";
            this.bNoGem = true;
            return;
        }
        this.gemCostFont.text = str;
        this.gemCostFont.anchorOffsetX = this.gemCostFont.width;
        this.gemCostFont.anchorOffsetY = this.gemCostFont.height/2;
    }
    public setTypeSide():void {
        this.root.width = 77;
        this.root.height = 77;
        this.btn.width = 77;
        this.btn.height = 77;
        this.progress.width = 77;
        this.progress.height = 77;
        this.icon.width = 77;
        this.icon.height = 77;
        this._shape.x = 110 / 2;
        this._shape.y = 110 / 2;
        this.wProgress = 90;
        this.hProgress = 90;
        this.cover.visible = false;
        this.gemGroup.right = 0;
        this.gemGroup.bottom = 0;
        this.gemGroup.width = 75;

        this.numGroup.right = 3;
        this.numGroup.bottom = 15;

        this.numFont.scaleX = 0.76;
        this.numFont.scaleY = 0.72;
        this.gemCostFont.scaleX = 0.76;
        this.gemCostFont.scaleY = 0.72;
    }
    public setTypeWar():void {
        this.setTypeSide();
        this.root.width = 77;
        this.root.height = 77;
        this.btn.width = 77;
        this.btn.height = 77;
        this.progress.width = 60;
        this.progress.height = 60;
        this.icon.width = 77;
        this.icon.height = 77;
        this._shape.x = 110 / 2;
        this._shape.y = 110 / 2;
        this.wProgress = 90;
        this.hProgress = 90;

        this.gemGroup.right = 5;
        this.gemGroup.bottom = 5;
        this.gemGroup.width = 75;

        this.numGroup.right = 8;
        this.numGroup.bottom = 20;
    }
    public setIcon(str:string):void {
        this.icon.source = str;
    }
    public setNum(num:string):void {
        if (this.bNoGem) {
            this.numFont.text = num;
            this.numFont.anchorOffsetX = this.numFont.width;
            this.numFont.anchorOffsetY = this.numFont.height/2;
            this.gemGroup.visible = false;
            this.numGroup.visible = true;
            return;
        }
        if (num == "0" && this.gemCostFont.text != "-1") {
            this.gemGroup.visible = true;
            this.numGroup.visible = false;
        } else {
            this.gemGroup.visible = false;
            this.numGroup.visible = true;
        }
        this.numFont.text = num;
        this.numFont.anchorOffsetX = this.numFont.width;
        this.numFont.anchorOffsetY = this.numFont.height/2;
    }

    private onTouchBegin(e:egret.TouchEvent):void {
        let colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.GRAY);
        this.icon.filters = [colorFlilter];
    }
    public click(evt:egret.TouchEvent):void {
        this.icon.filters = null;
        if (!this._bClick) {
            return;
        }
        this._funCall(evt);
    }
    public startBtnTick():void {
        this.changeGraphics(360);
        this._bClick = false;
        let angle = 0;
        this.time = egret.getTimer();
        let fun = function (timeStamp:number):boolean {
            if (this._bClick) {
                return;
            }
            let now = timeStamp;
            let time = this.time;
            let pass = now - time;   //平均时间间隔=1000ms/60=16.67ms
            this.time = now;
            angle += (this._nTimeTotal * pass);
            this.changeGraphics(angle);
            if (Math.floor(angle) > 340) {
                this.changeGraphics(0);
                egret.stopTick(fun,this);
                this._bClick = true;
            }
            return true;
        }
        egret.startTick(fun, this);

        // this.changeGraphics(360);
        // let pass = (this._nTimeTotal * 1000) / 360;
        // let timer = new egret.Timer(pass, 360);
        // let self = this;
        // let angle = 0;
        // timer.addEventListener(egret.TimerEvent.TIMER, function():void {
        //     angle += 10;
        //     self.changeGraphics(angle);
        //     if (angle >= 350) {
        //         this.changeGraphics(0);
        //     }
        //     if (angle >= 359) {
        //         this._bClick = true;
        //     }
        // }, this);
        // timer.start();
    }
    public changeGraphics(angle) {
        let w:number = this.wProgress;
        let h:number = this.hProgress;
        let r:number = Math.max(w, h) / 2 * 1.5;
        this._shape.graphics.clear();
        this._shape.graphics.beginFill(0x00ffff, 1);
        this._shape.graphics.lineTo(r, 0);
        this._shape.graphics.drawArc(0, 0, r, 0, angle * Math.PI / 180, true);
        this._shape.graphics.lineTo(0, 0);
        this._shape.graphics.endFill();
    }
    public stopBtnTick():void {
        this.changeGraphics(0);
        this._bClick = true;
    }
    public isClick():boolean {
        return this._bClick;
    }
	public destory():void {
        this.btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.click, this);
        this.btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.click, this);
    }
}