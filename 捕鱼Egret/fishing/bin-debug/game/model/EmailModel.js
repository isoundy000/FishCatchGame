var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 邮箱数据
 */
var EmailModel = (function (_super) {
    __extends(EmailModel, _super);
    function EmailModel() {
        var _this = _super.call(this) || this;
        _this._currEmialId = -1;
        return _this;
    }
    EmailModel.prototype.init = function () {
        this._emailList = new Array();
        this._currEmialId = -1;
    };
    /** 向邮箱添加邮件 */
    EmailModel.prototype.addItem = function (item) {
        var flag = this.isExist(item);
        if (!flag) {
            this._emailList.push(item);
            return;
        }
        for (var i = 0; i < this._emailList.length; i++) {
            var currItem = this._emailList[i];
            if (item.getMailId() == currItem.getMailId()) {
                this._emailList[i] = item;
            }
            else {
                this._emailList.push(item);
            }
        }
    };
    /** 清空邮箱 */
    EmailModel.prototype.clearEmail = function () {
        this._emailList = null;
        this._emailList = new Array();
    };
    /** 从邮箱中删除邮件 */
    EmailModel.prototype.removeItem = function (mailId) {
        for (var i = 0; i < this._emailList.length; i++) {
            var currItem = this._emailList[i];
            if (mailId == currItem.getMailId()) {
                this._emailList.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    /** 获取邮件列表 */
    EmailModel.prototype.getMailList = function () {
        return this._emailList;
    };
    /** 获取邮件列表 */
    EmailModel.prototype.getMailListByType = function (type) {
        var arrData = new Array();
        for (var i = 0; i < this._emailList.length; i++) {
            var currItem = this._emailList[i];
            if (currItem.getMailType() == type) {
                arrData.push(currItem);
            }
        }
        return arrData;
    };
    EmailModel.prototype.setCurrEmialId = function (id) {
        this._currEmialId = id;
    };
    EmailModel.prototype.getCurrEmailId = function () {
        return this._currEmialId;
    };
    /** 获取邮件实体 */
    EmailModel.prototype.getMailListById = function (id) {
        for (var i = 0; i < this._emailList.length; i++) {
            var currItem = this._emailList[i];
            if (id == currItem.getMailId()) {
                return currItem;
            }
        }
        return null;
    };
    /** 获取邮件实体 */
    EmailModel.prototype.updateMailState = function (id, state) {
        for (var i = 0; i < this._emailList.length; i++) {
            var currItem = this._emailList[i];
            if (id == currItem.getMailId()) {
                currItem.setState(state);
                break;
            }
        }
    };
    //判断邮件是否存在
    EmailModel.prototype.isExist = function (item) {
        for (var i = 0; i < this._emailList.length; i++) {
            var currItem = this._emailList[i];
            if (item.getMailId() == currItem.getMailId()) {
                return true;
            }
        }
        return false;
    };
    EmailModel.prototype.clear = function () {
    };
    EmailModel.prototype.destroy = function () {
    };
    return EmailModel;
}(burn.model.ModelBase));
__reflect(EmailModel.prototype, "EmailModel");
//# sourceMappingURL=EmailModel.js.map