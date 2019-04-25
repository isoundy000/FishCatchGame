var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var RmbGainView = (function (_super) {
    __extends(RmbGainView, _super);
    function RmbGainView(parent) {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._btnWrapList = new Array();
        _this.actArr = new Array();
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/guide/RmbGain.exml";
        var okOneBtn = _this.okBtn;
        okOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOKButtonClick, _this);
        //封装按钮
        _this._btnWrapList.push(new burn.tools.UIWrap(_this.okBtn));
        _this._parentView = parent;
        _this.titleBgGain.visible = true;
        _this.setData();
        return _this;
    }
    //设置
    RmbGainView.prototype.setData = function () {
        burn.tools.TweenTools.rotation(this.effct, 4000);
        if (!this._bPop) {
            //打开UI动画
            var self_1 = this;
            game.util.UIUtil.popView(this.root, function () {
            });
            this._bPop = true;
        }
    };
    /**确定按钮 */
    RmbGainView.prototype.onOKButtonClick = function (e) {
        var userModle = burn.Director.getModelByKey(UserModel);
        var roomType = userModle.getMatchRoomLevel();
        if (roomType != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(roomType)) {
            burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: userModle.getUserId(), isTween: true, count: userModle.getCoins() });
        }
        burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userModle.getUserId(), isTween: true, count: userModle.getMoney() });
        if (this._parentView) {
            this._parentView.removeChild(this);
        }
    };
    RmbGainView.prototype.destroy = function () {
        var self = this;
        game.util.UIUtil.closeView(self.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self.parent && self.parent.removeChild(self);
            self.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onOKButtonClick, self);
        });
    };
    return RmbGainView;
}(eui.Component));
__reflect(RmbGainView.prototype, "RmbGainView");
//# sourceMappingURL=RmbGain.js.map