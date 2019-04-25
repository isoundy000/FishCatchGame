var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GuideView = (function (_super) {
    __extends(GuideView, _super);
    function GuideView() {
        var _this = _super.call(this) || this;
        _this._nImgIndex = 0;
        return _this;
    }
    GuideView.prototype.addBgResource = function (clazz, url) {
        var _this = this;
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new GuidesUI();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/guide/GuideUI.exml";
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //关闭当前界面
        var root = this._uiDisplay.root;
        root.touchEnabled = false;
        RES.getResAsync("ef_finger_circle_json", function () {
            RES.getResAsync("ef_finger_circle_png", function () {
                RES.getResAsync("ef_finger_json", function () {
                    RES.getResAsync("ef_finger_png", function () {
                        _this.setData();
                    }, _this);
                }, _this);
            }, _this);
        }, this);
    };
    GuideView.prototype.setData = function () {
        switch (this._nType) {
            case GuideShow.Finger_Txt:
            case GuideShow.Finger:
                this._uiDisplay.fingerAndTxt.visible = true;
                var vo = game.table.T_Guide_Table.getVoByKey(this._nCurId);
                var str = game.util.Language.getText(vo.desc);
                if (str != "Key:null") {
                    this._uiDisplay.tips_1.visible = true;
                    //this._uiDisplay.tips_1.text = str;
                    this._strString = str;
                    this._nStrIndex = 0;
                    var param_1 = vo.showPos;
                    var ps_1 = param_1.split("_");
                    this._uiDisplay.showP.x = Number(ps_1[0]);
                    this._uiDisplay.showP.y = Number(ps_1[1]);
                    this.timer = new egret.Timer(100, 100);
                    this.timer.addEventListener(egret.TimerEvent.TIMER, this.onChangeTxt, this);
                    this._uiDisplay.fingerAndTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.skipGuide, this);
                    this.timer.start();
                }
                else {
                    this._uiDisplay.showP.visible = false;
                    this._uiDisplay.tips_1.visible = false;
                    this._uiDisplay.fingerAndTxtR.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intercept, this);
                }
                var param = vo.param;
                var ps = param.split("_");
                var cotainW_H = vo.containW_H.split("_");
                var shp2 = new egret.Shape();
                shp2.graphics.beginFill(0x00ff00);
                var max = Number(cotainW_H[0]);
                if (max < Number(cotainW_H[1])) {
                    max = Number(cotainW_H[1]);
                }
                shp2.graphics.drawCircle(0, 0, max);
                shp2.graphics.endFill();
                this._uiDisplay.addChild(shp2);
                shp2.x = Number(ps[0]);
                shp2.y = Number(ps[1]);
                this._uiDisplay.fingerAndTxtR.mask = shp2;
                var maskIcon = new egret.Shape();
                maskIcon.graphics.beginFill(0x000000, 1);
                maskIcon.graphics.drawEllipse(0, 0, Number(cotainW_H[0]), Number(cotainW_H[1]));
                maskIcon.anchorOffsetX = maskIcon.width / 2;
                maskIcon.anchorOffsetY = maskIcon.height / 2;
                maskIcon.graphics.endFill();
                maskIcon.x = Number(ps[0]);
                maskIcon.y = Number(ps[1]);
                var guide = new two.Guide();
                guide.init(maskIcon, this.stage.stageWidth, this.stage.stageHeight);
                this._uiDisplay.rectGroup.addChild(guide);
                var data = RES.getRes("ef_finger_json");
                var txtr = RES.getRes("ef_finger_png");
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var finger = new egret.MovieClip(mcFactory.generateMovieClipData("ef_finger"));
                finger.gotoAndPlay("play", -1);
                finger.touchEnabled = false;
                finger.anchorOffsetX = finger.width / 2;
                finger.anchorOffsetY = finger.height / 2;
                finger.x = Number(ps[0]) + 35;
                finger.y = Number(ps[1]) + 30;
                finger.scaleX = 0.6;
                finger.scaleY = 0.6;
                var container = new egret.DisplayObjectContainer();
                var imgClick = game.util.GameUtil.getCircle();
                container.addChild(imgClick);
                var imgClick1 = game.util.GameUtil.getCircle1();
                container.addChild(imgClick1);
                this._uiDisplay.addChild(container);
                this._uiDisplay.addChild(finger);
                container.x = Number(ps[0]);
                container.y = Number(ps[1]);
                container.width = 100;
                container.height = 100;
                container.touchEnabled = false;
                break;
            case GuideShow.Txt:
                this._uiDisplay.txt.visible = true;
                var gvo = game.table.T_Guide_Table.getVoByKey(this._nCurId);
                var gstr = game.util.Language.getText(gvo.desc);
                var gparam = gvo.showPos;
                var gps = gparam.split("_");
                this._uiDisplay.showT.x = Number(gps[0]);
                this._uiDisplay.showT.y = Number(gps[1]);
                //this._uiDisplay.tips.text = str;
                this._strString = gstr;
                this._nStrIndex = 0;
                this.timer = new egret.Timer(100, 100);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.onChangeTxt, this);
                this._uiDisplay.txt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.skipGuide, this);
                this.timer.start();
                break;
            case GuideShow.Texture:
                this._uiDisplay.first.visible = true;
                this._uiDisplay.image_1.visible = true;
                this._uiDisplay.image_1_1.visible = false;
                this._uiDisplay.image_2.visible = true;
                this._uiDisplay.image_2_1.visible = false;
                this._uiDisplay.first.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTextureClick, this);
                break;
            case GuideShow.NONE:
                this.onClosttButtonClick(null);
                break;
        }
    };
    GuideView.prototype.onChangeTxt = function () {
        if (this._nType == GuideShow.Txt) {
            this._uiDisplay.tips.text = this._strString.substr(0, this._nStrIndex);
        }
        else if (this._nType == GuideShow.Finger || this._nType == GuideShow.Finger_Txt) {
            this._uiDisplay.tips_1.text = this._strString.substr(0, this._nStrIndex);
        }
        this._nStrIndex++;
        if (this._nStrIndex == (this._strString.length + 1)) {
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onChangeTxt, this);
            this.timer = null;
            if (this._nType == GuideShow.Txt) {
                this._uiDisplay.txt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.skipGuide, this);
                this._uiDisplay.txt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
            }
            else if (this._nType == GuideShow.Finger || this._nType == GuideShow.Finger_Txt) {
                this._uiDisplay.fingerAndTxtR.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.skipGuide, this);
                this._uiDisplay.fingerAndTxtR.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intercept, this);
            }
        }
    };
    GuideView.prototype.onTextureClick = function (e) {
        this._uiDisplay.first.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTextureClick, this);
        var self = this;
        var twG = egret.Tween.get(this._uiDisplay.image_1_1, { loop: false });
        this._uiDisplay.image_1_1.alpha = 0;
        twG.wait(200)
            .call(function () {
            self._uiDisplay.image_1_1.visible = true;
        })
            .to({ alpha: 1 }, 200, egret.Ease.backIn)
            .to({ alpha: 0 }, 500)
            .call(function () {
            egret.Tween.removeTweens(twG);
        });
        var tw = egret.Tween.get(this._uiDisplay.image_1, { loop: false });
        tw.to({ scaleX: 0.4, scaleY: 0.4 }, 200)
            .call(function () {
            egret.Tween.removeTweens(tw);
            self._uiDisplay.image_1.visible = false;
            self._uiDisplay.image_2.visible = false;
            self._uiDisplay.image_2_1.visible = true;
        });
        var tw1 = egret.Tween.get(this._uiDisplay.image_2_1, { loop: false });
        this._uiDisplay.image_2_1.scaleX = 0.4;
        this._uiDisplay.image_2_1.scaleY = 0.4;
        tw1.wait(200)
            .to({ scaleX: 1.25, scaleY: 1.25 }, 150, egret.Ease.backIn)
            .to({ scaleX: 1, scaleY: 1 }, 50, egret.Ease.backIn)
            .call(function () {
            egret.Tween.removeTweens(tw1);
            //self._uiDisplay.first.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
        });
        var twSelf = egret.Tween.get(this, { loop: false });
        twSelf.wait(400).to({ alpha: 0 }, 1500).call(function () {
            egret.Tween.removeTweens(self);
            self.onClosttButtonClick(null);
        });
    };
    /**关闭游戏 */
    GuideView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
        game.util.Guide.completeGuide();
    };
    GuideView.prototype.skipGuide = function (e) {
        if (this._nType == GuideShow.Txt) {
            this._uiDisplay.txt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.skipGuide, this);
            this._uiDisplay.txt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        }
        else if (this._nType == GuideShow.Finger || this._nType == GuideShow.Finger_Txt) {
            this._uiDisplay.fingerAndTxtR.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.skipGuide, this);
            this._uiDisplay.fingerAndTxtR.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intercept, this);
        }
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }
        this._uiDisplay.tips_1.text = this._strString;
        this._uiDisplay.tips.text = this._strString;
    };
    GuideView.prototype.intercept = function (e) {
        burn.Director.popView();
        game.util.Guide.completeGuide();
    };
    GuideView.prototype.initView = function (nId) {
        this._nCurId = nId;
        this._nType = game.table.T_Guide_Table.getVoByKey(nId).showtype;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/guide/GuideUI.exml", this.addBgResource, this);
    };
    GuideView.prototype.destroy = function () {
        if (this._nType == GuideShow.Texture) {
            if (this._uiDisplay) {
                this._uiDisplay.first.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
            }
        }
        else if (this._nType == GuideShow.Txt) {
            if (this._uiDisplay) {
                this._uiDisplay.txt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
            }
        }
        this.parent && this.parent.removeChild(this);
        console.log("LoginView destory!");
    };
    return GuideView;
}(burn.view.PopView));
__reflect(GuideView.prototype, "GuideView");
/***操作UI的对应类 */
var GuidesUI = (function (_super) {
    __extends(GuidesUI, _super);
    function GuidesUI() {
        return _super.call(this) || this;
    }
    return GuidesUI;
}(eui.Component));
__reflect(GuidesUI.prototype, "GuidesUI");
//# sourceMappingURL=GuideView.js.map