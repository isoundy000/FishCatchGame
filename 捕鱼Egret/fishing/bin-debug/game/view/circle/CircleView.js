var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CircleView = (function (_super) {
    __extends(CircleView, _super);
    function CircleView() {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._btnWrapList = new Array();
        game.util.UIUtil.startLoading();
        return _this;
    }
    CircleView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/circle/CircleUI.exml", this.addBgResource, this);
    };
    CircleView.prototype.addBgResource = function (clazz, url) {
        game.util.UIUtil.closeLoading();
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new CircleCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        if (!this._bPop) {
            game.util.UIUtil.popViewCircle(this._uiDisplay.root);
            this._bPop = true;
        }
        var userModel = burn.Director.getModelByKey(UserModel);
        var isTodayDraw = userModel.isTodayDraw();
        //关闭当前界面
        if (isTodayDraw) {
            var colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
            this._uiDisplay.start.filters = [colorFlilter];
        }
        var closeBtn = this._uiDisplay.start;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.start));
        this._arrItem = new Array();
        this._arrItem.push(this._uiDisplay.item_0);
        this._arrItem.push(this._uiDisplay.item_1);
        this._arrItem.push(this._uiDisplay.item_2);
        this._arrItem.push(this._uiDisplay.item_3);
        this._arrItem.push(this._uiDisplay.item_4);
        this._arrItem.push(this._uiDisplay.item_5);
        this._arrItem.push(this._uiDisplay.item_6);
        this._arrItem.push(this._uiDisplay.item_7);
        this._arrItem.push(this._uiDisplay.item_8);
        this._arrItem.push(this._uiDisplay.item_9);
        this._arrLabel = new Array();
        this._arrLabel.push(this._uiDisplay.lab_0);
        this._arrLabel.push(this._uiDisplay.lab_1);
        this._arrLabel.push(this._uiDisplay.lab_2);
        this._arrLabel.push(this._uiDisplay.lab_3);
        this._arrLabel.push(this._uiDisplay.lab_4);
        this._arrLabel.push(this._uiDisplay.lab_5);
        this._arrLabel.push(this._uiDisplay.lab_6);
        this._arrLabel.push(this._uiDisplay.lab_7);
        this._arrLabel.push(this._uiDisplay.lab_8);
        this._arrLabel.push(this._uiDisplay.lab_9);
        var str = game.table.T_Config_Table.getVoByKey(59).value;
        var strs = str.split(",");
        var len = strs.length;
        this._arrDate = new Array();
        for (var i = 0; i < len; i++) {
            var dataItem = strs[i].split("_");
            var obj = { id: Number(dataItem[0]), count: Number(dataItem[1]) };
            this._arrDate.push(obj);
        }
        // let data = [{id:10001,count:1},{id:10002,count:2},{id:40001,count:3},{id:40002,count:4},{id:50001,count:5},{id:50002,count:6},
        // 			{id:10001,count:7},{id:10002,count:8},{id:40001,count:9},{id:40002,count:10}];
        //this._arrDate = data;
        this._uiDisplay.lab_0.text = "1";
        for (var i = 1; i < this._arrItem.length; i++) {
            var item = this._arrItem[i];
            var lab = this._arrLabel[i];
            lab.textAlign = egret.HorizontalAlign.CENTER;
            lab.letterSpacing = -5;
            (function (disp, id, num, lab) {
                game.util.IconUtil.getIconByIdAsync(IconType.PROP, id, function (icon) {
                    if (!icon) {
                        return;
                    }
                    icon.width = 70;
                    icon.height = 70;
                    icon.anchorOffsetX = icon.width / 2;
                    icon.anchorOffsetY = icon.height / 2;
                    icon.x = disp.width / 2;
                    icon.y = disp.height / 4;
                    if (id == PropEnum.FISH_TICKIT) {
                        lab.text = num / 10 + "元";
                    }
                    else {
                        lab.text = num + "";
                    }
                    disp.addChild(icon);
                });
            })(item, this._arrDate[i].id, this._arrDate[i].count, lab);
        }
        RES.getResAsync("iphone_png", function () {
            var txture = RES.getRes("iphone_png");
            var icon = new egret.Bitmap(txture);
            var disp = this._arrItem[0];
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            icon.x = disp.width / 2;
            icon.y = disp.height / 2;
            this._arrLabel[0].text = "";
            disp.addChild(icon);
        }, this);
    };
    /**关闭游戏 */
    CircleView.prototype.onClosttButtonClick = function (e) {
        var userModel = burn.Director.getModelByKey(UserModel);
        var isTodayDraw = userModel.isTodayDraw();
        if (isTodayDraw) {
            game.util.GameUtil.popTips(game.util.Language.getText(124));
            burn.Director.popView();
            return;
        }
        var send = new DailyLoginDrawMessage();
        send.initData();
        NetManager.send(send);
        this._uiDisplay.start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        // this.showResult(5);
    };
    CircleView.prototype.showResult = function (index) {
        var self = this;
        this._uiDisplay.result.visible = false;
        //let index = 5;
        (function (disp, id, num, lab) {
            game.util.IconUtil.getIconByIdAsync(IconType.PROP, id, function (icon) {
                if (!icon) {
                    return;
                }
                icon.width = 70;
                icon.height = 70;
                icon.anchorOffsetX = icon.width / 2;
                icon.anchorOffsetY = icon.height / 2;
                icon.x = disp.width / 2;
                icon.y = disp.height / 2;
                if (id == PropEnum.FISH_TICKIT) {
                    lab.text = num / 10 + "元";
                }
                else {
                    lab.text = num + "";
                }
                lab.textAlign = egret.HorizontalAlign.CENTER;
                lab.letterSpacing = -5;
                disp.addChild(icon);
            });
        })(this._uiDisplay.item_result, this._arrDate[index].id, this._arrDate[index].count, this._uiDisplay.lab_result);
        var rota = -18 + (-36) * index;
        var twObj = this._uiDisplay.circlePanel;
        var tw = egret.Tween.get(twObj, { loop: false });
        tw.to({ rotation: 360 * 5 }, 2500, egret.Ease.circIn)
            .to({ rotation: 360 * 7 + rota }, 4000, egret.Ease.circOut)
            .call(function () {
            burn.tools.TweenTools.showOutAndInHalf(self._uiDisplay.selectImg, 700);
            self._uiDisplay.result.visible = true;
            var circle = new egret.Shape();
            circle.graphics.beginFill(0x0000ff);
            circle.graphics.drawCircle(269, 269, 235);
            circle.graphics.endFill();
            self._uiDisplay.result.addChild(circle);
            self._uiDisplay.rectResult.mask = circle;
        }).wait(1500).call(function () {
            egret.Tween.removeTweens(twObj);
            if (self._arrDate[index].id == PropEnum.GOLD_WARHEAD) {
                if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
                    burn.Director.popView();
                    var yaoQingView = new ShareZiYou(ShareType.Circle_GoldWar);
                    egret.MainContext.instance.stage.addChild(yaoQingView);
                    return;
                }
            }
            var gainArr = new Array();
            var item = new game.model.Item(self._arrDate[index].id, self._arrDate[index].count);
            gainArr.push(item);
            game.util.GameUtil.openCommonGainByPos(null, gainArr, new egret.Point(262, 659), function () {
                burn.Director.popView();
            });
        });
    };
    CircleView.prototype.destroy = function () {
        //移除按钮封装
        var self = this;
        this._bPop = false;
        //关闭UI动画
        game.util.UIUtil.closeViewCircle(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.start.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/circle/CircleUI.exml");
        });
    };
    return CircleView;
}(burn.view.PopView));
__reflect(CircleView.prototype, "CircleView");
/***操作UI的对应类 */
var CircleCom = (function (_super) {
    __extends(CircleCom, _super);
    function CircleCom() {
        return _super.call(this) || this;
    }
    return CircleCom;
}(eui.Component));
__reflect(CircleCom.prototype, "CircleCom");
//# sourceMappingURL=CircleView.js.map