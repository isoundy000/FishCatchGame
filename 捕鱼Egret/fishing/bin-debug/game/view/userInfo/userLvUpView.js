var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var UserLvUpView = (function (_super) {
    __extends(UserLvUpView, _super);
    function UserLvUpView(lv, parent) {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._btnWrapList = new Array();
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserLvUp.exml";
        _this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOKButtonClick, _this);
        //封装按钮
        _this._btnWrapList.push(new burn.tools.UIWrap(_this.okBtn));
        _this._lv = lv;
        _this._parentView = parent;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserLvUp.exml", function () {
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", _this.setData, _this);
        }, _this);
        return _this;
    }
    //设置
    UserLvUpView.prototype.setData = function () {
        var vo = game.table.T_RoleLevel_Table.getVoByKey(this._lv);
        if (!vo) {
            this.onOKButtonClick(null);
        }
        var voN = game.table.T_RoleLevel_Table.getVoByKey(this._lv - 1);
        if (!voN) {
            return;
        }
        var str = voN.levelUpAward;
        var datas = str.split(",");
        var list = new Array();
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var obj = data.split("_");
            var item = new game.model.Item(Number(obj[0]), Number(obj[1]));
            list.push(item);
        }
        this.setList(list);
        this.showTips.text = "lv." + this._lv;
        burn.tools.TweenTools.rotation(this.effct, 3000);
        if (!this._bPop) {
            //打开UI动画
            game.util.UIUtil.popView(this.root);
            this._bPop = true;
        }
        this.effct.blendMode = egret.BlendMode.ADD;
    };
    UserLvUpView.prototype.setList = function (list) {
        if (list && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var item = new BagViewItem(list[i].getItemId(), list[i].getCount());
                item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
                item.name = list[i].getItemId() + "";
                item.scaleX = item.scaleY = 0.95;
                item.init();
                this.scrolGroup.addChild(item);
            }
            var tLayout = new eui.HorizontalLayout();
            tLayout.gap = 10;
            tLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
            this.scrolGroup.layout = tLayout; /// 网格布局
            this.scrolGroup.anchorOffsetX = this.scrolGroup.width / 2;
            this.scrolGroup.anchorOffsetY = this.scrolGroup.height / 2;
        }
    };
    /**确定按钮 */
    UserLvUpView.prototype.onOKButtonClick = function (e) {
        var userModle = burn.Director.getModelByKey(UserModel);
        burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: userModle.getUserId(), isTween: true, count: userModle.getCoins() });
        burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userModle.getUserId(), isTween: true, count: userModle.getMoney() });
        if (this._parentView) {
            this._parentView.removeChild(this);
        }
    };
    UserLvUpView.prototype.destroy = function () {
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
    return UserLvUpView;
}(eui.Component));
__reflect(UserLvUpView.prototype, "UserLvUpView");
//# sourceMappingURL=userLvUpView.js.map