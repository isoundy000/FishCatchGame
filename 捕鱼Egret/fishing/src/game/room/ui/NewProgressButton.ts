/**
 * 待冷却框的按钮组件
 */
class NewProgresButton extends eui.Component {
    //root
    public root:eui.Group;
    public icon:eui.Group;
    public coverLeft:eui.Image;
    public coverRight:eui.Image;
    public cover:eui.Image;
    //Shape
    public _Leftshape:eui.Rect;
    public _Rightshape:eui.Rect;
    public _imageRight:egret.Bitmap;
    public _imageLeft:egret.Bitmap;
    
    public coverLeftR:eui.Rect;
    public coverRightR:eui.Rect;

    private time:number = 0;
    //按钮的回调
    public _funCall:Function;
    //按钮的点击屏蔽
    public _bClick:boolean = true;
    //angle
    private angle:number = 0;
    //是否切换过状态
    public _bSwrap:boolean = false;
    //总冷却时间
    public _nTimeTotal:number;
    //free图标
    public freeImg:eui.Image;
    //锁的图标
    public lockedImg:eui.Image;
    
    private gemGroup:eui.Group;

    public rect:eui.Image;
    public gemIcon:eui.Image;
    private numGroup:eui.Group;
    private gemCostGroup:eui.Group;

    private numFont:egret.BitmapText;
    private gemCostFont:egret.BitmapText;
    private bNoGem:boolean;

    private _str:string;
	public constructor(clazz:any,str:string) {
		super();
		this.skinName = clazz;
        this._str = str;
        // right rightCover left leftCover
        //CD 时间过一半之后
        // left leftCover right rightCover
        this.root.addEventListener(egret.TouchEvent.TOUCH_END, this.click, this);
        this.scaleX = 1;
        this.scaleY = 1;
        
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
        this.bNoGem = false;
        this.initOld();
	}
    public setTypeSide():void {
        this.scaleX = 0.7;
        this.scaleY = 0.7;
        this.coverLeftR.scaleX = 0.85;
        this.coverLeftR.scaleY = 0.85;
        this.coverRightR.scaleX = 0.85;
        this.coverRightR.scaleY = 0.85;
        this.cover.visible = false;
        
        this.gemGroup.right = 0;
        this.gemGroup.bottom = 0;
        this.gemGroup.width = 75;

        this.rect.width = 90;
        this.rect.x -= 15;
        this.rect.bottom = 8;

        this.gemIcon.y -= 5;
        this.gemCostGroup.y -= 5;

        this.numGroup.right = 3;
        this.numGroup.bottom = 15;
    }
    public setTypeWar():void {
        this.scaleX = 0.75;
        this.scaleY = 0.75;
        this.coverLeftR.scaleX = 0.85;
        this.coverLeftR.scaleY = 0.85;
        this.coverRightR.scaleX = 0.85;
        this.coverRightR.scaleY = 0.85;
        this.cover.visible = false;
        
        this.gemGroup.right = 5;
        this.gemGroup.bottom = 5;
        this.gemGroup.width = 90;

        this.rect.width = 90;
        this.rect.height = 30;
        this.rect.x -= 6;
        this.rect.bottom = 4;

        this.gemIcon.y -= 5;
        this.gemIcon.x -= 8;
        this.gemCostGroup.y -= 5;

        this.numGroup.right = 8;
        this.numGroup.bottom = 20;
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
    public initOld():void {
        if (this._imageRight) {
            this.icon.removeChild(this._imageRight);
        }
        if (this._imageLeft) {
            this.icon.removeChild(this._imageLeft);
        }
        if (this.icon.getChildByName("_Leftshape")) {
            this.icon.removeChild(this._Leftshape);
        }
        if (this.icon.getChildByName("_Rightshape")) {
            this.icon.removeChild(this._Rightshape);
        }
        this._imageRight = new egret.Bitmap(RES.getRes(this._str + "_2_png"));
        this._imageRight.anchorOffsetX = 0;
        this._imageRight.anchorOffsetY = this._imageRight.height >> 1;
        this._imageLeft = new egret.Bitmap(RES.getRes(this._str + "_1_png"));
        this._imageLeft.anchorOffsetX = this._imageLeft.width;
        this._imageLeft.anchorOffsetY = this._imageLeft.height >> 1;
        
        this.icon.addChildAt(this._imageRight, 0);
        this.icon.addChildAt(this._imageLeft, 2); 
    }
    public setIcon(str:string):void {

    }
    public initObj():void {
        this._bClick = true;
        this._bSwrap = false;
        if (this._imageRight) {
            this.icon.removeChild(this._imageRight);
        }
        if (this._imageLeft) {
            this.icon.removeChild(this._imageLeft);
        }
        if (this.icon.getChildByName("_Leftshape")) {
            this.icon.removeChild(this._Leftshape);
        }
        if (this.icon.getChildByName("_Rightshape")) {
            this.icon.removeChild(this._Rightshape);
        }
        this._imageRight = new egret.Bitmap(RES.getRes(this._str + "_2_png"));
        this._imageRight.anchorOffsetX = 0;
        this._imageRight.anchorOffsetY = this._imageRight.height >> 1;
        this._imageLeft = new egret.Bitmap(RES.getRes(this._str + "_1_png"));
        this._imageLeft.anchorOffsetX = this._imageLeft.width ;
        this._imageLeft.anchorOffsetY = this._imageLeft.height >> 1;
        this._imageLeft.x = 0;


        this._Leftshape = new eui.Rect();
        this._Leftshape.alpha = 0.7;
        this._Leftshape.width = 139;
        this._Leftshape.height = 139;
        this._Leftshape.name = "_Leftshape";
        this._Leftshape.anchorOffsetX = this._Leftshape.width;
        this._Leftshape.anchorOffsetY = this._Leftshape.height >> 1;
        this._Leftshape.mask = this.coverLeftR;
        this._Leftshape.x = 0;

        this._Rightshape = new eui.Rect();
        this._Rightshape.alpha = 0.7;
        this._Rightshape.width = 139;
        this._Rightshape.height = 139;
        this._Rightshape.name = "_Rightshape";
        this._Rightshape.anchorOffsetX = 0;
        this._Rightshape.anchorOffsetY = this._Rightshape.height >> 1;
        this._Rightshape.mask = this.coverRightR;
        
        this.icon.addChild(this._imageRight);
        this.icon.addChild(this._Rightshape);
        this.icon.addChild(this._imageLeft); 
        this.icon.addChild(this._Leftshape);
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
    public click(evt:egret.TouchEvent):void {
        this.icon.filters = null;
        if (!this._bClick) {
            return;
        }
        this._funCall(evt);
    }
    
    public startBtnTick():void {
        this.initObj();
        this._bClick = false;
        this.angle = 0;
        this.time = egret.getTimer();
        let self = this;
        egret.startTick(this.fun, this);
    }
    private fun(timeStamp:number): boolean {
        if (this._bClick) {
            return;
        }
        let now = timeStamp;
        let time = this.time;
        let pass = now - time;   //平均时间间隔=1000ms/60=16.67ms
        this.time = now;
        this.angle += (this._nTimeTotal * pass);
        this.changeGraphics(this.angle);
        if (Math.floor(this.angle) >= 180 && !this._bSwrap) {
            this.changeWrap();
        }
        if (Math.floor(this.angle) >= 360) {
            this.changeGraphics(-1);
            egret.stopTick(this.fun,this);
            this._bClick = true;
        }
        return true;
    }
    public changeGraphics(angle) {
        if (angle == 0) {
            return;
        }
        if (angle == -1) {
            this.initOld();
            return;
        }
        // return;
        if (this._bSwrap) {
            this._Leftshape.rotation = (angle - 180);
        } else {
            this._Rightshape.rotation = angle;
        }
    }
    public changeWrap():void {
        this._bSwrap = true;
        this.icon.swapChildrenAt(0, 2);
        this.icon.swapChildrenAt(1, 3);
        this._Rightshape.visible = false;
        this._imageLeft.x = 0;
        this._Leftshape.x = 0;
    }
    public stopBtnTick():void {
        this.changeGraphics(-1);
        this._bClick = true;
    }
    public isClick():boolean {
        return this._bClick;
    }
	public destory():void {
        this.root.removeEventListener(egret.TouchEvent.TOUCH_END, this.click, this);
        if(this._bClick) {
            egret.stopTick(this.fun,this);
        }
    }
}