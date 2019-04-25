var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FishingObjPool = (function () {
    function FishingObjPool() {
        this._isInit = false;
        if (this._isInit) {
            throw (new burn.error.SimpleError(""));
        }
        this._isInit = true;
        this.reset();
    }
    FishingObjPool.prototype.reset = function () {
        this.nBulletObjPool = new Array();
        this.nFishingNetPool = new Array();
        this.nFishPool = new Array();
        this.nGroupFishPool = new Array();
    };
    FishingObjPool.getInstance = function () {
        if (this._instance == null) {
            this._instance = new FishingObjPool();
        }
        return this._instance;
    };
    FishingObjPool.prototype.getBulletObj = function (nId) {
        if (this.nBulletObjPool.length == 0) {
            return new BulletBase(nId);
        }
        else {
            var nType = game.table.T_Bullet_Table.getVoByKey(nId).type;
            var bulletObj = this.getBulletObjByType(nId, nType);
            bulletObj.resetData();
            return bulletObj;
        }
    };
    FishingObjPool.prototype.getBulletObjByType = function (nType, nId) {
        var bulletObj = null;
        var len = this.nBulletObjPool.length;
        for (var i = 0; i < len; i++) {
            var objItem = this.nBulletObjPool[i];
            if (objItem.getBulletType() == nType) {
                bulletObj = objItem;
                break;
            }
        }
        if (bulletObj == null) {
            bulletObj = new BulletBase(nId);
        }
        else {
            var index = this.nBulletObjPool.indexOf(bulletObj);
            this.nBulletObjPool.splice(index, 1);
        }
        return bulletObj;
    };
    //获取渔网
    FishingObjPool.prototype.getFishingNetById = function (id) {
        var len = this.nFishingNetPool.length;
        if (CONFIG.IS_WEB) {
            if (len <= 0) {
                var bombweb = new game.util.DragonBonesUtil(id, game.util.DragonBonesUtil.bulletMovie);
                return bombweb;
            }
            else {
                var bombweb = this.getNetByID(id);
                return bombweb;
            }
        }
        else {
            if (len <= 0) {
                var bomb = new netObj(id);
                return bomb;
            }
            else {
                var bomb = this.getNetByID(id);
                return bomb;
            }
        }
    };
    FishingObjPool.prototype.getNetByID = function (id) {
        if (CONFIG.IS_WEB) {
            var bulletObj = null;
            var len = this.nFishingNetPool.length;
            for (var i = 0; i < len; i++) {
                var objItem = this.nFishingNetPool[i];
                if (objItem.nId == id) {
                    bulletObj = objItem;
                    break;
                }
            }
            if (bulletObj == null) {
                bulletObj = new game.util.DragonBonesUtil(id, game.util.DragonBonesUtil.bulletMovie);
            }
            else {
                var index = this.nFishingNetPool.indexOf(bulletObj);
                this.nFishingNetPool.splice(index, 1);
            }
            bulletObj.scaleX = 0.75;
            bulletObj.scaleY = 0.75;
            bulletObj.alpha = 1;
            return bulletObj;
        }
        else {
            var bulletObj = null;
            var len = this.nFishingNetPool.length;
            for (var i = 0; i < len; i++) {
                var objItem = this.nFishingNetPool[i];
                if (objItem.nId == id) {
                    bulletObj = objItem;
                    break;
                }
            }
            if (bulletObj == null) {
                bulletObj = new netObj(id);
            }
            else {
                var index = this.nFishingNetPool.indexOf(bulletObj);
                this.nFishingNetPool.splice(index, 1);
            }
            bulletObj.scaleX = 0.75;
            bulletObj.scaleY = 0.75;
            bulletObj.alpha = 1;
            return bulletObj;
        }
    };
    FishingObjPool.prototype.getGroupFishById = function (id) {
        var fish = null;
        var nIndex = -1;
        var len = this.nGroupFishPool.length;
        for (var i = 0; i < len; i++) {
            var fishItem = this.nGroupFishPool[i];
            if (fishItem.getFishId() == id) {
                fish = fishItem;
                nIndex = i;
                break;
            }
        }
        if (nIndex != -1) {
            this.nGroupFishPool.splice(nIndex, 1);
            fish.resetData();
            return fish;
        }
        else {
            return null;
        }
    };
    FishingObjPool.prototype.insertGroupFishPool = function (fish) {
        this.nGroupFishPool.push(fish);
    };
    FishingObjPool.prototype.getFishById = function (id) {
        var fish = null;
        var nIndex = -1;
        var len = this.nFishPool.length;
        for (var i = 0; i < len; i++) {
            var fishItem = this.nFishPool[i];
            if (fishItem.getFishId() == id) {
                fish = fishItem;
                nIndex = i;
                break;
            }
        }
        if (nIndex != -1) {
            this.nFishPool.splice(nIndex, 1);
            fish.resetData();
            return fish;
        }
        else {
            return null;
        }
    };
    /**
     * 根据ID判断是否达到上限
     */
    FishingObjPool.prototype.isMaxFishById = function (id) {
        var maxNum = 0;
        var vo = game.table.T_Fish_Table.getVoByKey(id);
        if (vo) {
            maxNum = vo.cacheNum;
        }
        var num = 0;
        var len = this.nFishPool.length;
        for (var i = 0; i < len; i++) {
            var fishItem = this.nFishPool[i];
            if (fishItem.getFishId() == id) {
                num++;
                if (num >= maxNum) {
                    return true;
                }
            }
        }
        return false;
    };
    FishingObjPool.prototype.insertFishPool = function (fish) {
        //看下池子里有多少个,多的就不要往池子里放了
        var fishId = fish.getFishId();
        //如果鱼超过池子上限
        if (this.isMaxFishById(fishId)) {
            fish.destory();
            if (fish && fish.parent) {
                fish.parent.removeChild(fish);
                fish = null;
            }
            return;
        }
        fish.destory();
        fish.resetData();
        this.nFishPool.push(fish);
    };
    return FishingObjPool;
}());
FishingObjPool._instance = null;
__reflect(FishingObjPool.prototype, "FishingObjPool");
var netObj = (function (_super) {
    __extends(netObj, _super);
    function netObj(id) {
        var _this;
        var res = RES.getRes("bullet_bomb_" + id + "_png");
        if (!res) {
            _this = _super.call(this, RES.getRes("bullet_bomb_1_png")) || this;
            RES.getResAsync("bullet_bomb_" + id + "_png", function () { }, _this);
            _this.bInPool = false;
        }
        else {
            _this = _super.call(this, RES.getRes("bullet_bomb_" + id + "_png")) || this;
            _this.bInPool = true;
        }
        _this.nId = id;
        _this.scaleX = 0.75;
        _this.scaleY = 0.75;
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        return _this;
    }
    return netObj;
}(egret.Bitmap));
__reflect(netObj.prototype, "netObj");
//# sourceMappingURL=FishingObjPool.js.map