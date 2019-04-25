var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//在线人数
var AlivePersonItem = (function (_super) {
    __extends(AlivePersonItem, _super);
    function AlivePersonItem() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/alivePerson/AlivePerson.exml";
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        _this.personLab.textAlign = egret.HorizontalAlign.CENTER;
        return _this;
    }
    AlivePersonItem.prototype.setPersonNumById = function (nId) {
        var num = 600;
        this.x = 210;
        this.y = 520;
        var userModel = burn.Director.getModelByKey(UserModel);
        switch (nId) {
            case 1:
                if (CONFIG.IS_WEB) {
                    this.x = 0;
                    this.y = -45;
                }
                else {
                    this.x = 190;
                    this.y = 520;
                }
                num = userModel.getRoomOnLineByID(nId - 1);
                break;
            case 2:
                if (CONFIG.IS_WEB) {
                    this.x = 0;
                    this.y = -30;
                }
                else {
                    this.x = 205;
                    this.y = 530;
                }
                num = userModel.getRoomOnLineByID(nId - 1);
                break;
            case 3:
                if (CONFIG.IS_WEB) {
                    this.x = 0;
                    this.y = -90;
                }
                else {
                    this.x = 220;
                    this.y = 490;
                }
                num = userModel.getRoomOnLineByID(nId - 1);
                break;
        }
        this.personLab.text = num + "";
    };
    /** 销毁函数 */
    AlivePersonItem.prototype.destroy = function () {
    };
    return AlivePersonItem;
}(eui.Component));
__reflect(AlivePersonItem.prototype, "AlivePersonItem");
//# sourceMappingURL=AlivePersonItem.js.map