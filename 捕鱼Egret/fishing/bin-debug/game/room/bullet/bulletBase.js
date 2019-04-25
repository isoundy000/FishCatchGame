var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BulletBase = (function (_super) {
    __extends(BulletBase, _super);
    function BulletBase(nId) {
        var _this = _super.call(this) || this;
        //子弹id
        _this._bulletId = -1;
        /***是否继续逻辑更新 */
        _this._bUpdate = true;
        /** */
        _this._nAniType = -1;
        /**反弹子弹次数 */
        _this._nReboundTimes = 0;
        ////////////分身功能相关////////////////////
        _this._nCloneTag = -1;
        _this.create(nId);
        return _this;
    }
    BulletBase.prototype.create = function (nId) {
        this.bePos = Number(game.table.T_Config_Table.getVoByKey(51).value);
        var dataVo = game.table.T_Bullet_Table.getVoByKey(nId);
        if (dataVo == null) {
            console.log("Warnning!!!the fish data is null,id--->", nId);
            return;
        }
        this._enumType = dataVo.type;
        var resUrl = dataVo.resUrl;
        var res = RES.getRes(resUrl);
        if (!res) {
            var image = new egret.Bitmap(RES.getRes("bullet_png"));
            image.scaleX = image.scaleY = 1.25;
            this.addChild(image);
            RES.getResAsync(resUrl, function () { }, this);
            this.isPushPool = false;
        }
        else {
            var image = new egret.Bitmap(res);
            image.scaleX = image.scaleY = 1.25;
            this.addChild(image);
            this.isPushPool = true;
        }
        // bullet_png bullet_bomb_1_png
        this.cacheAsBitmap = true;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this._bDead = false;
        this._bShowDead = false;
    };
    BulletBase.prototype.resetData = function () {
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
    };
    BulletBase.prototype.setBulletPos = function (xPos, yPos, rotationDefault) {
        this.rotation = rotationDefault - 180;
        var degree = Math.PI / 180 * (this.rotation + 90);
        var xChange = xPos + Math.cos(degree) * 85;
        var yChange = yPos + Math.sin(degree) * 85;
        this.x = xChange; //+ Math.atan(this.rotation)*85;
        this.y = yChange; //+ Math.acos(this.rotation)*123;
    };
    BulletBase.prototype.moveLogicBind = function (logicMove) {
        if (this._logicMove) {
            this._logicMove.end();
            this._logicMove = null;
        }
        this._logicMove = logicMove;
        this._logicMove.start();
    };
    //逻辑更新
    BulletBase.prototype.logicUpdate = function () {
        if (!this._bUpdate) {
            return;
        }
        var isRebound = false;
        var rectObj = FishUtil.GET_FISHING_RECT();
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
    };
    BulletBase.prototype.getBDead = function () {
        return this._bDead;
    };
    BulletBase.prototype.setBDead = function (bDead) {
        this._logicMove.end();
        this._bUpdate = false;
        this._bDead = true;
    };
    BulletBase.prototype.getBUpdate = function () {
        return this._bUpdate;
    };
    /**反弹轨迹 */
    BulletBase.prototype.reboundBullet = function () {
        var rectObj = FishUtil.GET_FISHING_RECT();
        if (this.rotation < 0 && this.rotation > -90) {
            //x超出界限
            if (this.x >= rectObj.width) {
                this.rotation = -this.rotation;
            }
            //y超出界限
            if (this.y >= rectObj.height) {
                this.rotation = 180 - this.rotation;
            }
        }
        else if (this.rotation < -90 && this.rotation > -180) {
            //x 超出边界
            if (this.x >= rectObj.width) {
                this.rotation = -this.rotation;
            }
            //y 小于 0
            if (this.y <= rectObj.y) {
                this.rotation = 180 - this.rotation;
            }
        }
        else if (this.rotation < 90 && this.rotation > 0) {
            //y超出界限
            if (this.y >= rectObj.height) {
                this.rotation = 180 - this.rotation;
            }
            //x 小于 0
            if (this.x <= rectObj.x) {
                this.rotation = -this.rotation;
            }
        }
        else if (this.rotation < 180 && this.rotation > 90) {
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
            || this.rotation == 90
            || this.rotation == -90
            || this.rotation == 180
            || this.rotation == -180) {
            this.rotation += 180;
        }
        if (this.rotation > 360) {
            var mul = this.rotation / 360;
            this.rotation -= (mul * 360);
        }
        else if (this.rotation < -360) {
            var mul = this.rotation / 360;
            this.rotation += (mul * 360);
        }
        this.setNewLogicMove();
    };
    BulletBase.prototype.setNewLogicMove = function () {
        if (this._nReboundTimes >= 10) {
            this.setBDead(true);
            if (this._bulletId > 0) {
                var msg = game.util.ProtobufUtil.getInstance().getBulletDisappear();
                msg.setBulletId(this._bulletId);
                NetManager.send(msg);
            }
            return;
        }
        this._nReboundTimes++;
        //this._bUpdate = false;
        var degree = Math.PI / 180 * (this.rotation - 270);
        var xChange = this.x; // + Math.cos(degree) * 85;
        var yChange = this.y; //+ Math.sin(degree) * 85;
        var destX = xChange + Math.cos(degree) * 2000;
        var destY = yChange + Math.sin(degree) * 2000;
        var destPos = new egret.Point(destX, destY);
        var costTime = egret.Point.distance(new egret.Point(this.x, this.y), destPos) / CONFIG.BULLET_SPEED;
        /**给子弹绑定移动逻辑**/
        this.moveLogicBind(FishUtil.GET_BULLET_MOVELOGIC(this, destX, destY, 1, costTime));
    };
    BulletBase.prototype.getBulletId = function () {
        return this._bulletId;
    };
    BulletBase.prototype.setBulletId = function (bId) {
        this._bulletId = bId;
    };
    BulletBase.prototype.getBulletType = function () {
        return this._enumType;
    };
    /**获取分身子弹自己的tag */
    BulletBase.prototype.getBulletTag = function () {
        return this._nCloneTag;
    };
    BulletBase.prototype.setBulletTag = function (nTag) {
        this._nCloneTag = nTag;
    };
    BulletBase.prototype.getReboundTimes = function () {
        return this._nReboundTimes;
    };
    //资源动作更新
    BulletBase.prototype.resUpdate = function () {
    };
    return BulletBase;
}(egret.DisplayObjectContainer));
__reflect(BulletBase.prototype, "BulletBase");
//# sourceMappingURL=bulletBase.js.map