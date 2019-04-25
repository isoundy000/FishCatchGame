var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LotteryModel = (function (_super) {
    __extends(LotteryModel, _super);
    function LotteryModel() {
        return _super.call(this) || this;
    }
    LotteryModel.prototype.init = function () {
        //初始化静态数据
        this._getArr = new Array();
        var item = game.table.T_Config_Table.getVoByKey(15).value;
        var tempArr = item.split("_");
        for (var i = 0; i < tempArr.length; i++) {
            this._getArr.push(Number(tempArr[i]));
        }
    };
    LotteryModel.prototype.getMaxKill = function (count) {
        return this._getArr[count];
    };
    LotteryModel.prototype.setScore = function (s) {
        this._score = s;
    };
    LotteryModel.prototype.getScore = function () {
        return this._score;
    };
    LotteryModel.prototype.setKillNum = function (num) {
        this._killNum = num;
    };
    LotteryModel.prototype.getKillNum = function () {
        return this._killNum;
    };
    LotteryModel.prototype.setTodayCount = function (count) {
        this._todayCount = count;
    };
    LotteryModel.prototype.getTodayCount = function () {
        return this._todayCount;
    };
    LotteryModel.prototype.clear = function () {
    };
    LotteryModel.prototype.destroy = function () {
    };
    return LotteryModel;
}(burn.model.ModelBase));
__reflect(LotteryModel.prototype, "LotteryModel");
//# sourceMappingURL=LotteryModel.js.map