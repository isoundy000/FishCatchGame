class BulletBase extends egret.DisplayObjectContainer {
    //子弹id
    private _bulletId:number = -1;
    //子弹归属的炮台
    public belongGun:number;
    public bePos:number;
    //子弹归属炮台的索引，用于分身
    public nGunIndex:number;

    private _bShowDead:boolean;
    protected _bDead:boolean;
    /***是否继续逻辑更新 */
    protected _bUpdate:boolean = true;
    /**子弹的运动逻辑 */
    protected _logicMove:MoveLogicBase;
    /**子弹的类型参数 */
    private _enumType:BULLET_TYPE;
    /** */
    private _nAniType : BULLET_ANI_TYPE = -1;
    /**反弹子弹次数 */
    private _nReboundTimes:number = 0;

    ////////////分身功能相关////////////////////
    private _nCloneTag:number = -1;
    public isPushPool:boolean;
    public constructor(nId:number) {
        super();
        this.create(nId);
    }
    private create(nId:number):void {
        this.bePos = Number(game.table.T_Config_Table.getVoByKey(51).value);
        let dataVo = game.table.T_Bullet_Table.getVoByKey(nId);
        if (dataVo == null) {
            console.log("Warnning!!!the fish data is null,id--->",nId);
            return ;
        }
        this._enumType = dataVo.type;
        let resUrl = dataVo.resUrl;
        let res = RES.getRes(resUrl);
        if (!res) {
            let image = new egret.Bitmap(RES.getRes("bullet_png"));
            image.scaleX = image.scaleY = 1.25;
            this.addChild(image);
            RES.getResAsync(resUrl, function(){}, this);
            this.isPushPool = false;
        } else {
            let image = new egret.Bitmap(res);
            image.scaleX = image.scaleY = 1.25;
            this.addChild(image);
            this.isPushPool = true;
        }
        // bullet_png bullet_bomb_1_png
        this.cacheAsBitmap = true;
		this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this._bDead = false;
        this._bShowDead = false;
    }
    public resetData():void {
        this._bShowDead = false;
        this._bDead = false;
        /***是否继续逻辑更新 */
        this._bUpdate = true;
        /**子弹的运动逻辑 */
        if (this._logicMove) {
            this._logicMove.end();
            this._logicMove = null;
        }
        /**反弹子弹次数 */
        this._nReboundTimes = 0;
    }
    public setBulletPos(xPos:number,yPos:number,rotationDefault:number):void {
        this.rotation = rotationDefault - 180;
        let degree = Math.PI/180 * (this.rotation + 90);
        let xChange = xPos + Math.cos(degree) * 85;
        let yChange = yPos + Math.sin(degree) * 85;
        this.x = xChange ;//+ Math.atan(this.rotation)*85;
        this.y = yChange ;//+ Math.acos(this.rotation)*123;
    }
    public moveLogicBind(logicMove:MoveLogicBase):void {
        if (this._logicMove) {
            this._logicMove.end();
            this._logicMove = null;
        }
        this._logicMove = logicMove;
        this._logicMove.start();
    }
    //逻辑更新
    public logicUpdate():void {
        if (!this._bUpdate) {
            return;
        }
        let isRebound = false;
        let rectObj = FishUtil.GET_FISHING_RECT();
        if (this.x <= rectObj.x) {
            this.x = rectObj.x;
            isRebound = true;
        }
        if (this.x >= rectObj.width) {
            this.x = rectObj.width;
            isRebound = true;
        }
        if (this.y <= rectObj.y) {
            this.y = rectObj.y;
            isRebound = true;
        }
        if (this.y >= rectObj.height) {
           this.y = rectObj.height;
           isRebound = true;
        }
        if (isRebound) {
            this._logicMove.end();
            this.reboundBullet();
        }
    }
    public getBDead():boolean {
        return this._bDead;
    }
    public setBDead(bDead:boolean):void {
        this._logicMove.end();
        this._bUpdate = false;
        this._bDead = true;
    } 
    getBUpdate():boolean {
        return this._bUpdate;
    }
    /**反弹轨迹 */
    reboundBullet():void {
        let rectObj = FishUtil.GET_FISHING_RECT();
        if (this.rotation < 0 && this.rotation > -90) {//右下
            //x超出界限
            if (this.x >= rectObj.width) {
                this.rotation = -this.rotation;
            }
            //y超出界限
            if (this.y >= rectObj.height) {
                this.rotation = 180 - this.rotation;
            }
        } else if (this.rotation < -90 && this.rotation > - 180) { //右上
            //x 超出边界
            if (this.x >= rectObj.width) {
                this.rotation = -this.rotation;
            }
            //y 小于 0
            if (this.y <= rectObj.y) {
                this.rotation = 180 - this.rotation;
            }
        } else if (this.rotation < 90 && this.rotation > 0) { //左下
            //y超出界限
            if (this.y >= rectObj.height) {
                this.rotation = 180 - this.rotation;
            }
            //x 小于 0
            if (this.x <= rectObj.x) {
                this.rotation = -this.rotation;
            }
        } else if (this.rotation < 180 && this.rotation > 90) {//左上
            //x 小于 0
            if (this.x <= rectObj.x) {
                this.rotation = -this.rotation;
            }
            //y 小于 0
            if (this.y <= rectObj.y) {
                this.rotation = 180 - this.rotation;
            }
        }
        else if (this.rotation == 0 
              ||this.rotation == 90
              ||this.rotation == -90
              ||this.rotation == 180
              ||this.rotation == -180) {
            this.rotation += 180;
        }
        if (this.rotation > 360) {
            let mul:number = this.rotation / 360;
            this.rotation -= (mul * 360);
        } else if (this.rotation < -360) {
            let mul:number = this.rotation / 360;
            this.rotation += (mul * 360);
        }
        this.setNewLogicMove();
    }
    private setNewLogicMove():void {
        if (this._nReboundTimes >= 10) {
            this.setBDead(true);
            if (this._bulletId > 0) {
                let msg = game.util.ProtobufUtil.getInstance().getBulletDisappear();
                msg.setBulletId(this._bulletId);
                NetManager.send(msg);
            }
            return;
        }
        this._nReboundTimes ++;
        //this._bUpdate = false;
        let degree = Math.PI/180 * (this.rotation - 270);
        let xChange = this.x ;// + Math.cos(degree) * 85;
        let yChange = this.y ;//+ Math.sin(degree) * 85;
		let destX = xChange + Math.cos(degree) * 2000;
		let destY = yChange + Math.sin(degree) * 2000;
		let destPos:egret.Point = new egret.Point(destX,destY);
		let costTime = egret.Point.distance(new egret.Point(this.x,this.y),destPos)/CONFIG.BULLET_SPEED;
		/**给子弹绑定移动逻辑**/
		this.moveLogicBind(FishUtil.GET_BULLET_MOVELOGIC(this,destX,destY,1,costTime));
    }

    public getBulletId():number {
        return this._bulletId;
    }

    public setBulletId(bId:number):void {
        this._bulletId = bId;
    }

    public getBulletType():number {
        return this._enumType;
    }
    /**获取分身子弹自己的tag */
    public getBulletTag():number {
        return this._nCloneTag;
    }
    public setBulletTag(nTag:number):void {
        this._nCloneTag = nTag;
    }
    public getReboundTimes():number {
        return this._nReboundTimes;
    }
    //资源动作更新
    public resUpdate():void {
        
    }
}