var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 活动信息
 */
var ActiveModel = (function (_super) {
    __extends(ActiveModel, _super);
    function ActiveModel() {
        return _super.call(this) || this;
    }
    ActiveModel.prototype.init = function () {
        this._activeList = new Array();
        this._activeDataList = new Array();
        this._activeShowList = new Array();
        this._activeCoin = 0;
    };
    ActiveModel.prototype.setData = function (msg) {
        var list = msg.getMessageList();
        if (list.length == 0) {
            return;
        }
        this._activeList.length = 0;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            this._activeList.push(new game.model.ActiveObj(list[i]));
        }
    };
    ActiveModel.prototype.getActiveList = function () {
        return this._activeList;
    };
    ActiveModel.prototype.getActiveDataList = function () {
        return this._activeDataList;
    };
    ActiveModel.prototype.getActiveShopDataList = function () {
        return this._activeShowList;
    };
    ActiveModel.prototype.getActiveObjByType = function (value) {
        var len = this._activeList.length;
        for (var i = 0; i < len; i++) {
            var itemObj = this._activeList[i];
            if (itemObj._type == value) {
                return itemObj;
            }
        }
        return null;
    };
    ActiveModel.prototype.getActiveObjById = function (value) {
        var len = this._activeList.length;
        for (var i = 0; i < len; i++) {
            var itemObj = this._activeList[i];
            if (itemObj._id == value) {
                return itemObj;
            }
        }
        return null;
    };
    //服务器数据
    ActiveModel.prototype.setActiveInfo = function (msg) {
        //_activeDataList
        this._activeDataList.length = 0;
        var awardData = msg.getSendAwardActiveInfo();
        var lenAward = awardData.length;
        for (var i = 0; i < lenAward; i++) {
            var obj = this.getActiveObjById(awardData[i].getId());
            var dataObj = new game.model.ActiveData(awardData[i], obj);
            this._activeDataList.push(dataObj);
        }
        this._activeShowList.length = 0;
        var shopData = msg.getSecretShopActiveInfo();
        var lenShop = shopData.length;
        for (var i = 0; i < lenShop; i++) {
            var obj = this.getActiveObjById(shopData[i].getId());
            var dataObj = new game.model.ActiveData(shopData[i], obj);
            this._activeShowList.push(dataObj);
        }
    };
    ActiveModel.prototype.getActiveDataById = function (value) {
        var len = this._activeDataList.length;
        for (var i = 0; i < len; i++) {
            var item = this._activeDataList[i];
            if (item._id == value) {
                return item;
            }
        }
        return null;
    };
    ActiveModel.prototype.getActiveShopDataById = function (value) {
        var len = this._activeShowList.length;
        for (var i = 0; i < len; i++) {
            var item = this._activeShowList[i];
            if (item._id == value) {
                return item;
            }
        }
        return null;
    };
    ActiveModel.prototype.setActiveCoin = function (value) {
        this._activeCoin = value;
    };
    ActiveModel.prototype.getActiveCoin = function () {
        return this._activeCoin;
    };
    ActiveModel.prototype.clear = function () {
    };
    ActiveModel.prototype.destroy = function () {
    };
    return ActiveModel;
}(burn.model.ModelBase));
__reflect(ActiveModel.prototype, "ActiveModel");
//# sourceMappingURL=ActiveModel.js.map