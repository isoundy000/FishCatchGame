var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 兑换数据
 */
var ExchangeModel = (function (_super) {
    __extends(ExchangeModel, _super);
    function ExchangeModel() {
        return _super.call(this) || this;
    }
    ExchangeModel.prototype.init = function () {
        this._exchangeList = new Array();
        this._nActivityDay = 0;
        this._nActivityWeek = 0;
    };
    /** 添加 */
    ExchangeModel.prototype.addItem = function (item) {
        var flag = this.isExist(item);
        if (!flag) {
            this._exchangeList.push(item);
            return;
        }
        for (var i = 0; i < this._exchangeList.length; i++) {
            var currItem = this._exchangeList[i];
            if (item._id == currItem._id) {
                this._exchangeList[i] = item;
            }
            else {
                this._exchangeList.push(item);
            }
        }
    };
    /** 清空 */
    ExchangeModel.prototype.clearList = function () {
        this._exchangeList = null;
        this._exchangeList = new Array();
    };
    ExchangeModel.prototype.removeItem = function (mailId) {
        for (var i = 0; i < this._exchangeList.length; i++) {
            var currItem = this._exchangeList[i];
            if (mailId == currItem._id) {
                this._exchangeList.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    /** 获取列表 */
    ExchangeModel.prototype.getList = function () {
        return this._exchangeList;
    };
    /** 获取实体 */
    ExchangeModel.prototype.getListById = function (id) {
        for (var i = 0; i < this._exchangeList.length; i++) {
            var currItem = this._exchangeList[i];
            if (id == currItem._id) {
                return currItem;
            }
        }
        return null;
    };
    /** 获取实体 */
    ExchangeModel.prototype.getListByType = function (type) {
        var arrData = new Array();
        for (var i = 0; i < this._exchangeList.length; i++) {
            var currItem = this._exchangeList[i];
            if (currItem._type == type) {
                arrData.push(currItem);
            }
        }
        return arrData;
    };
    //判断是否存在
    ExchangeModel.prototype.isExist = function (item) {
        for (var i = 0; i < this._exchangeList.length; i++) {
            var currItem = this._exchangeList[i];
            if (item._id == currItem._id) {
                return true;
            }
        }
        return false;
    };
    ExchangeModel.prototype.clear = function () {
    };
    ExchangeModel.prototype.destroy = function () {
    };
    return ExchangeModel;
}(burn.model.ModelBase));
__reflect(ExchangeModel.prototype, "ExchangeModel");
//# sourceMappingURL=ExchangeModel.js.map