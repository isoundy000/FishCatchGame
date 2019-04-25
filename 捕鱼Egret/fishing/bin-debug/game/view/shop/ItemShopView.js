var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 道具商城UI
 */
var ItemShopView = (function (_super) {
    __extends(ItemShopView, _super);
    function ItemShopView() {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._nIdx = -1;
        _this._bPop = false;
        return _this;
    }
    ItemShopView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/ItemShopUI.exml", this.addUIResource, this);
        this._btnWrapList = new Array();
    };
    ItemShopView.prototype.addUIResource = function (clazz, url) {
        var _this = this;
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        //添加操作UI
        this._uiDisplay = new ItemShopViewUI();
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //添加关闭按钮事件
        this._uiDisplay.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this._uiDisplay.gunBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSideBtnClick, this);
        this._uiDisplay.itemBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSideBtnClick, this);
        this._uiDisplay.barbetteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSideBtnClick, this);
        //封装按钮状态功能
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
        //默认打开第一个tab页面
        if (!this._bPop) {
            game.util.UIUtil.popView(this._uiDisplay.root);
            this._bPop = true;
            this._uiDisplay.gunBtn.enabled = false;
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/GunShopItem.exml", function () {
                _this.updateViewByIndex(1);
            }, this);
        }
        this._uiDisplay.gun_des.lineSpacing = 5;
        this._uiDisplay.gun_des_1.lineSpacing = 5;
    };
    ItemShopView.prototype.onSideBtnClick = function (e) {
        var tar = e.target;
        if (tar == this._uiDisplay.barbetteBtn) {
            this._uiDisplay.barbetteBtn.enabled = false;
            this._uiDisplay.gunBtn.enabled = true;
            this._uiDisplay.itemBtn.enabled = true;
            this.updateViewByIndex(2);
        }
        else if (tar == this._uiDisplay.gunBtn) {
            this._uiDisplay.gunBtn.enabled = false;
            this._uiDisplay.barbetteBtn.enabled = true;
            this._uiDisplay.itemBtn.enabled = true;
            this.updateViewByIndex(1);
        }
        else if (tar == this._uiDisplay.itemBtn) {
            this._uiDisplay.itemBtn.enabled = false;
            this._uiDisplay.barbetteBtn.enabled = true;
            this._uiDisplay.gunBtn.enabled = true;
            this.updateViewByIndex(3);
        }
    };
    ItemShopView.prototype.updateViewByIndex = function (idx) {
        if (this._nIdx == idx) {
            return;
        }
        this._nIdx = idx;
        if (idx == 3) {
            this._uiDisplay.tab_3.visible = true;
            this._uiDisplay.tab_1.visible = false;
            this._uiDisplay.tab_2.visible = false;
            this._uiDisplay.item_group.removeChildren();
            var vos = game.table.T_Shop_Table.getAllVo();
            var bFirst = false;
            for (var i = 0; i < vos.length; i++) {
                var vo = vos[i];
                if (vo.shopType == idx) {
                    var tempArr = vo.price.split("_");
                    var item = new GunShopItemView(idx, vo.id, vo.itemId, Number(tempArr[0]), Number(tempArr[1]), vo.num);
                    item.scaleX = item.scaleY = 0.96;
                    this._uiDisplay.item_group.addChild(item);
                    item.name = vo.itemId + "";
                    item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLeft, this);
                    if (!bFirst) {
                        item.select.visible = true;
                        burn.tools.TweenTools.showOutAndIn(item.select, 1500);
                    }
                    bFirst = true;
                }
            }
            this._uiDisplay.itemList_scroll.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
            this._uiDisplay.itemList_scroll.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
            var tLayout = new eui.TileLayout();
            tLayout.paddingTop = 20;
            tLayout.paddingLeft = 0;
            tLayout.paddingRight = 0;
            tLayout.paddingBottom = 0;
            this._uiDisplay.item_group.layout = tLayout; // 网格布局
        }
        else if (idx == 1) {
            this._uiDisplay.tab_3.visible = false;
            this._uiDisplay.tab_2.visible = false;
            this._uiDisplay.tab_1.visible = true;
            this._uiDisplay.gun_group.removeChildren();
            var vos = game.table.T_Shop_Table.getAllVo();
            var _loop_1 = function (i) {
                var vo = vos[i];
                if (vo.shopType == idx) {
                    var tempArr = vo.price.split("_");
                    var item = new GunShopItemView(idx, vo.id, vo.itemId, Number(tempArr[0]), Number(tempArr[1]), vo.num);
                    item.name = vo.itemId + "";
                    this_1._uiDisplay.gun_group.addChild(item);
                    item.addEventListener(egret.TouchEvent.TOUCH_TAP, this_1.showLeft, this_1);
                    if (i == 0) {
                        item.select.visible = true;
                        burn.tools.TweenTools.showOutAndIn(item.select, 1500);
                        var self_1 = this_1;
                        game.util.IconUtil.getIconByIdAsync(IconType.PAOSHOW, Number(item.name), function (icon) {
                            if (icon) {
                                self_1._uiDisplay.gun_contaner.addChild(icon);
                            }
                        });
                        var voItem = game.table.T_Item_Table.getVoByKey(Number(item.name));
                        if (voItem) {
                            this_1._uiDisplay.gun_des.text = game.util.Language.getText(voItem.desc);
                        }
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < vos.length; i++) {
                _loop_1(i);
            }
            this._uiDisplay.gunList_scroll.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
            this._uiDisplay.gunList_scroll.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
            var tLayout = new eui.TileLayout();
            tLayout.paddingTop = 10;
            tLayout.paddingLeft = 15;
            tLayout.paddingRight = 15;
            tLayout.paddingBottom = 20;
            this._uiDisplay.gun_group.layout = tLayout; // 网格布局
        }
        else if (idx == 2) {
            this._uiDisplay.tab_3.visible = false;
            this._uiDisplay.tab_1.visible = false;
            this._uiDisplay.tab_2.visible = true;
            this._uiDisplay.gun_group_1.removeChildren();
            var vos = game.table.T_Shop_Table.getAllVo();
            var _loop_2 = function (i) {
                var vo = vos[i];
                if (vo.shopType == idx) {
                    var tempArr = vo.price.split("_");
                    var item = new GunShopItemView(idx, vo.id, vo.itemId, Number(tempArr[0]), Number(tempArr[1]), vo.num);
                    item.name = vo.itemId + "";
                    this_2._uiDisplay.gun_group_1.addChild(item);
                    item.addEventListener(egret.TouchEvent.TOUCH_TAP, this_2.showLeft, this_2);
                    if (vo.itemId == 80001) {
                        item.select.visible = true;
                        burn.tools.TweenTools.showOutAndIn(item.select, 1500);
                        var self_2 = this_2;
                        game.util.IconUtil.getIconByIdAsync(IconType.PAOSHOW, Number(item.name), function (icon) {
                            if (icon) {
                                self_2._uiDisplay.gun_contaner_1.addChild(icon);
                            }
                        });
                        var voItem = game.table.T_Item_Table.getVoByKey(Number(item.name));
                        if (voItem) {
                            this_2._uiDisplay.gun_des_1.text = game.util.Language.getText(voItem.desc);
                        }
                    }
                }
            };
            var this_2 = this;
            for (var i = 0; i < vos.length; i++) {
                _loop_2(i);
            }
            this._uiDisplay.gunList_scroll_1.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
            this._uiDisplay.gunList_scroll_1.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
            var tLayout = new eui.TileLayout();
            tLayout.paddingTop = 10;
            tLayout.paddingLeft = 15;
            tLayout.paddingRight = 15;
            tLayout.paddingBottom = 20;
            this._uiDisplay.gun_group_1.layout = tLayout; // 网格布局
        }
    };
    ItemShopView.prototype.showLeft = function (e) {
        var name = e.target.name;
        if (name == "") {
            return;
        }
        var self = this;
        if (this._nIdx == 1) {
            self._uiDisplay.gun_contaner.removeChildren();
            game.util.IconUtil.getIconByIdAsync(IconType.PAOSHOW, Number(name), function (icon) {
                if (icon) {
                    self._uiDisplay.gun_contaner.addChild(icon);
                }
            });
            //
            var vo = game.table.T_Item_Table.getVoByKey(Number(name));
            if (vo) {
                this._uiDisplay.gun_des.text = game.util.Language.getText(vo.desc);
            }
            var numChild = this._uiDisplay.gun_group.numChildren;
            for (var i = 0; i < numChild; i++) {
                var child = this._uiDisplay.gun_group.getChildAt(i);
                if (child.name == name) {
                    child.select.visible = true;
                    burn.tools.TweenTools.showOutAndIn(child.select, 1500);
                }
                else {
                    child.select.visible = false;
                    egret.Tween.removeTweens(child.select);
                }
            }
        }
        else if (this._nIdx == 2) {
            self._uiDisplay.gun_contaner_1.removeChildren();
            game.util.IconUtil.getIconByIdAsync(IconType.PAOSHOW, Number(name), function (icon) {
                if (icon) {
                    self._uiDisplay.gun_contaner_1.addChild(icon);
                }
            });
            //
            var vo = game.table.T_Item_Table.getVoByKey(Number(name));
            if (vo) {
                this._uiDisplay.gun_des_1.text = game.util.Language.getText(vo.desc);
            }
            var numChild = this._uiDisplay.gun_group_1.numChildren;
            for (var i = 0; i < numChild; i++) {
                var child = this._uiDisplay.gun_group_1.getChildAt(i);
                if (child.name == name) {
                    child.select.visible = true;
                    burn.tools.TweenTools.showOutAndIn(child.select, 1500);
                }
                else {
                    child.select.visible = false;
                    egret.Tween.removeTweens(child.select);
                }
            }
        }
        else if (this._nIdx == 3) {
            var numChild = this._uiDisplay.item_group.numChildren;
            for (var i = 0; i < numChild; i++) {
                var child = this._uiDisplay.item_group.getChildAt(i);
                if (child.name == name) {
                    child.select.visible = true;
                    burn.tools.TweenTools.showOutAndIn(child.select, 1500);
                }
                else {
                    child.select.visible = false;
                    egret.Tween.removeTweens(child.select);
                }
            }
        }
    };
    /**滚动结束的事件回调 */
    ItemShopView.prototype.rollOverCall = function (e) {
    };
    ItemShopView.prototype.onCloseBtn = function (e) {
        burn.Director.popView();
    };
    ItemShopView.prototype.destroy = function () {
        var self = this;
        this._bPop = false;
        while (self._btnWrapList.length > 0) {
            var wrap = self._btnWrapList.pop();
            wrap.destroy();
        }
        //关闭UI动画
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onCloseBtn, self);
            self._uiDisplay.gunBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSideBtnClick, self);
            self._uiDisplay.itemBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSideBtnClick, self);
            self._uiDisplay.barbetteBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSideBtnClick, self);
            self._uiDisplay.gunList_scroll.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, self.rollOverCall, self);
            self.parent && self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/GunShopItem.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/ItemShopUI.exml");
        });
    };
    return ItemShopView;
}(burn.view.PopView));
__reflect(ItemShopView.prototype, "ItemShopView");
/**
 * 道具商店UI
 */
var ItemShopViewUI = (function (_super) {
    __extends(ItemShopViewUI, _super);
    function ItemShopViewUI() {
        return _super.call(this) || this;
    }
    return ItemShopViewUI;
}(eui.Component));
__reflect(ItemShopViewUI.prototype, "ItemShopViewUI");
//# sourceMappingURL=ItemShopView.js.map