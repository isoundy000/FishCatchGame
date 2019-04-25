var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var CommonGainView = (function (_super) {
    __extends(CommonGainView, _super);
    function CommonGainView(arr, parent) {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._btnWrapList = new Array();
        _this.actArr = new Array();
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserLvUp.exml";
        var okOneBtn = _this.okBtn;
        okOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOKButtonClick, _this);
        //封装按钮
        _this._btnWrapList.push(new burn.tools.UIWrap(_this.okBtn));
        _this._parentView = parent;
        _this.list = new Array();
        for (var i = 0; i < arr.length; i++) {
            var data = arr[i];
            _this.list.push(data);
        }
        _this.showTips.visible = false;
        _this.titleBgInner.visible = false;
        _this.titleBgGain.visible = true;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserLvUp.exml", function () {
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", _this.setData, _this);
        }, _this);
        return _this;
    }
    //设置
    CommonGainView.prototype.setData = function () {
        if (!this.list) {
            return;
        }
        if (this.list.length == 0) {
            return;
        }
        this.setList(this.list);
        burn.tools.TweenTools.rotation(this.effct, 4000);
        if (!this._bPop) {
            //打开UI动画
            var self_1 = this;
            game.util.UIUtil.popView(this.root, function () {
                game.util.GameUtil.playWarAction(self_1.actArr);
            });
            this._bPop = true;
        }
        //this.effct.blendMode = egret.BlendMode.ADD;
    };
    CommonGainView.prototype.setList = function (list) {
        if (list && list.length > 0) {
            this.okBtn.scaleX = 0;
            this.okBtn.scaleY = 0;
            for (var i = 0; i < list.length; i++) {
                var item = new BagViewItem(list[i].getItemId(), list[i].getCount());
                item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
                item.name = list[i].getItemId() + "";
                item.scaleX = item.scaleY = 0.95;
                item.init();
                this.scrolGroup.addChild(item);
                item.root.scaleX = 0;
                item.root.scaleY = 0;
                this.actArr.push(item.root);
            }
            this.actArr.reverse();
            this.actArr.push(this.okBtn);
            var tLayout = new eui.HorizontalLayout();
            tLayout.gap = 10;
            tLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
            this.scrolGroup.layout = tLayout; /// 网格布局
            this.scrolGroup.anchorOffsetX = this.scrolGroup.width / 2;
            this.scrolGroup.anchorOffsetY = this.scrolGroup.height / 2;
        }
    };
    /**确定按钮 */
    CommonGainView.prototype.onOKButtonClick = function (e) {
        this.startAction();
        var userModle = burn.Director.getModelByKey(UserModel);
        var roomType = userModle.getMatchRoomLevel();
        if (roomType != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(roomType)) {
            burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: userModle.getUserId(), isTween: true, count: userModle.getCoins() });
        }
        burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userModle.getUserId(), isTween: true, count: userModle.getMoney() });
        if (this._parentView) {
            this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
            burn.tools.TweenTools.clearTween(this.effct);
            this._parentView.removeChild(this);
        }
    };
    CommonGainView.prototype.setPosFun = function (to, fun) {
        this._to = to;
        this._fun = fun;
    };
    CommonGainView.prototype.startAction = function () {
        if (!this._parentView) {
            return;
        }
        if (!this.list) {
            return;
        }
        if (!this._to) {
            return;
        }
        var len = this.scrolGroup.numChildren;
        var _loop_1 = function (i) {
            var item = new BagViewItem(this_1.list[i].getItemId(), this_1.list[i].getCount());
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
            item.name = this_1.list[i].getItemId() + "";
            item.scaleX = item.scaleY = 0.95;
            var posLocal = this_1.scrolGroup.getChildAt(i).localToGlobal();
            item.x = posLocal.x;
            item.y = posLocal.y;
            item.init();
            this_1._parentView.addChild(item);
            var parentView = this_1._parentView;
            var self_2 = this_1;
            var time = egret.Point.distance(posLocal, self_2._to) / 0.5;
            (function (goldIcon, i) {
                egret.Tween.get(goldIcon)
                    .wait(800 + i * 100)
                    .to({ y: goldIcon.y - 60 }, 240)
                    .to({ x: self_2._to.x - goldIcon.width / 2, y: self_2._to.y - goldIcon.height / 2 }, 600, egret.Ease.backIn).call(function () {
                    if (goldIcon == null) {
                        return;
                    }
                    if (i == (len - 1)) {
                        self_2._fun && self_2._fun();
                    }
                    parentView.removeChild(goldIcon);
                    goldIcon = null;
                    //添加一个特效
                    var txtr = RES.getRes("ef_addcoin_png");
                    var effct = new egret.Bitmap(txtr);
                    effct.anchorOffsetX = effct.width / 2;
                    effct.anchorOffsetY = effct.height / 2;
                    parentView.addChild(effct, 81);
                    effct.x = self_2._to.x;
                    effct.y = self_2._to.y;
                    effct.scaleX = 0.2;
                    effct.scaleY = 0.2;
                    var tw = egret.Tween.get(effct, { loop: false });
                    tw.to({ scaleX: 0.7, scaleY: 0.7 }, 120)
                        .to({ scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 50)
                        .call(function () {
                        egret.Tween.removeTweens(effct);
                        parentView.removeChild(effct);
                    });
                });
            })(item, i);
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
    };
    CommonGainView.prototype.destroy = function () {
        var self = this;
        game.util.UIUtil.closeView(self.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self.parent && self.parent.removeChild(self);
            self.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onOKButtonClick, self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserLvUp.exml");
        });
    };
    return CommonGainView;
}(eui.Component));
__reflect(CommonGainView.prototype, "CommonGainView");
//# sourceMappingURL=CommonGainUI.js.map