var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var UserInfoMediator = (function (_super) {
    __extends(UserInfoMediator, _super);
    function UserInfoMediator(view) {
        return _super.call(this, view) || this;
    }
    UserInfoMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
        //注册观察者
        this.subscrib(NotifyEnum.USER_INFO_UI_LOADED, this.viewInit);
    };
    UserInfoMediator.prototype.viewInit = function (obj, target) {
        var view = target.getView();
        var userModle = burn.Director.getModelByKey(UserModel);
        var lvStr = userModle.getLevel();
        var idStr = userModle.getUserId();
        var vipLvStr = userModle.getVipLevel();
        view.setData(String(lvStr), String(idStr), userModle.getUserName(), vipLvStr + "");
    };
    UserInfoMediator.prototype.destroy = function () {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.USER_INFO_UI_LOADED);
    };
    return UserInfoMediator;
}(burn.mediator.SimpleMediator));
__reflect(UserInfoMediator.prototype, "UserInfoMediator");
//# sourceMappingURL=userInfoMediator.js.map