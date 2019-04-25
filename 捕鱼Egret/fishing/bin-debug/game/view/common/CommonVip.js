var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var CommonVipPanel = (function (_super) {
    __extends(CommonVipPanel, _super);
    function CommonVipPanel(arr, parent) {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._btnWrapList = new Array();
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Qihang/CommonVip.exml";
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
        _this.titleBgInner.visible = true;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Qihang/CommonVip.exml", _this.setData, _this);
        return _this;
    }
    //设置
    CommonVipPanel.prototype.setData = function () {
        if (!this.list) {
            return;
        }
        if (this.list.length == 0) {
            return;
        }
        this.setList(this.list);
        if (!this._bPop) {
            //打开UI动画
            game.util.UIUtil.popView(this.root);
            this._bPop = true;
        }
        //this.effct.blendMode = egret.BlendMode.ADD;
    };
    CommonVipPanel.prototype.setList = function (list) {
        if (list && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var item = new BagViewItem(list[i].getItemId(), list[i].getCount(), false);
                item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
                item.name = list[i].getItemId() + "";
                item.scaleX = item.scaleY = 0.95;
                item.init();
                this.scrolGroup.addChild(item);
            }
            var tLayout = new eui.HorizontalLayout();
            tLayout.paddingTop = 20;
            tLayout.paddingLeft = 10;
            tLayout.paddingRight = 0;
            tLayout.paddingBottom = 0;
            this.scrolGroup.layout = tLayout; /// 网格布局
        }
        egret.setTimeout(function () {
            game.util.LoaderUtil.startMainSilentLoad();
            if (CONFIG.isOpenMusic) {
                RES.loadGroup("ui_sound");
            }
        }, this, 300);
    };
    /**确定按钮 */
    CommonVipPanel.prototype.onOKButtonClick = function (e) {
        this.startAction();
        var userModle = burn.Director.getModelByKey(UserModel);
        burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: userModle.getUserId(), isTween: true, count: userModle.getCoins() });
        burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userModle.getUserId(), isTween: true, count: userModle.getMoney() });
        if (this._parentView) {
            this._parentView.removeChild(this);
        }
    };
    CommonVipPanel.prototype.setPosFun = function (to, fun) {
        this._to = to;
        this._fun = fun;
    };
    CommonVipPanel.prototype.setGoldNum = function (value) {
        //descGold
        var arrName = new Array();
        arrName.push(value + "");
        this.descGold.text = game.util.Language.getDynamicTextByStr(this.descGold.text, arrName);
    };
    CommonVipPanel.prototype.startAction = function () {
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
        var rect = new eui.Rect();
        rect.width = 1280;
        rect.height = 720;
        rect.alpha = 0.7;
        rect.name = "rect";
        this._parentView.addChild(rect);
        var _loop_1 = function (i) {
            var item = new BagViewItem(this_1.list[i].getItemId(), this_1.list[i].getCount(), false);
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
            item.name = this_1.list[i].getItemId() + "";
            item.scaleX = item.scaleY = 0.95;
            var posLocal = this_1.scrolGroup.getChildAt(i).localToGlobal();
            item.x = posLocal.x;
            item.y = posLocal.y;
            item.init();
            // item.changeState();
            this_1._parentView.addChild(item);
            var parentView = this_1._parentView;
            var self_1 = this_1;
            var time = egret.Point.distance(posLocal, self_1._to) / 0.5;
            (function (goldIcon, i) {
                egret.Tween.get(goldIcon)
                    .wait(800 + i * 100)
                    .to({ y: goldIcon.y - 60 }, 240)
                    .to({ x: self_1._to.x - goldIcon.width / 2, y: self_1._to.y - goldIcon.height / 2 }, 600, egret.Ease.backIn).call(function () {
                    if (goldIcon == null) {
                        return;
                    }
                    if (i == (len - 1)) {
                        self_1._fun && self_1._fun();
                        //干掉遮罩
                        var child = parentView.getChildByName("rect");
                        child && parentView.removeChild(child);
                    }
                    parentView.removeChild(goldIcon);
                    goldIcon = null;
                    //添加一个特效
                    var txtr = RES.getRes("ef_addcoin_png");
                    var effct = new egret.Bitmap(txtr);
                    effct.anchorOffsetX = effct.width / 2;
                    effct.anchorOffsetY = effct.height / 2;
                    parentView.addChild(effct, 81);
                    effct.x = self_1._to.x;
                    effct.y = self_1._to.y;
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
    CommonVipPanel.prototype.destroy = function () {
        var self = this;
        game.util.UIUtil.closeView(self.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self.parent && self.parent.removeChild(self);
            self.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onOKButtonClick, self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Qihang/CommonVip.exml");
        });
    };
    return CommonVipPanel;
}(eui.Component));
__reflect(CommonVipPanel.prototype, "CommonVipPanel");
//# sourceMappingURL=CommonVip.js.map