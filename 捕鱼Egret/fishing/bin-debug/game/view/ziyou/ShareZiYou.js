var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShareZiYou = (function (_super) {
    __extends(ShareZiYou, _super);
    function ShareZiYou(type, param) {
        if (type === void 0) { type = null; }
        if (param === void 0) { param = null; }
        var _this = _super.call(this) || this;
        _this._type = type;
        _this._param = param;
        var self = _this;
        game.net.MessageDispatcher.register(game.net.ResponseType.RECEIVEWECHATSHAREAWARDBACK, function (msg) {
            self.shareBack(msg);
        });
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/platform/ShareZiYouUI.exml", _this.initView, _this);
        _this.visible = false;
        return _this;
    }
    ShareZiYou.prototype.shareBack = function (msg) {
        //required uint32 type = 1;//新人奖励1，邀请成功奖励2
        //required uint32 state = 2;//1成功，0不是通过分享连接进入，2通过自己的分享连接进入，3领取过
        var type = msg.getType();
        var state = msg.getState();
        if (state == 1) {
            game.util.GameUtil.popTips(game.util.Language.getText(2434));
            var req = new CommonRequestMessage();
            req.initData();
            req.setType(CommonRequest.COMMON_REQUEST_WECHAT_SHARE_INFO); //1 email
            NetManager.send(req);
            if (type == 1) {
                var configData = game.table.T_Config_Table.getVoByKey(91).value.split(",");
                var configArr1 = configData[0].split("_");
                var configArr2 = configData[1].split("_");
                var gainId_1 = Number(configArr1[0]);
                var gainNum_1 = Number(configArr1[1]);
                var gainId_2 = Number(configArr2[0]);
                var gainNum_2 = Number(configArr2[1]);
                var gainArr = new Array();
                gainArr.push(new game.model.Item(gainId_1, gainNum_1));
                gainArr.push(new game.model.Item(gainId_2, gainNum_2));
                game.util.GameUtil.openCommongain(null, gainArr);
            }
            else if (type == 2) {
                var configData = game.table.T_Config_Table.getVoByKey(92).value;
                var config = configData.split("_");
                var gainId_1 = Number(config[0]);
                var gainNum_1 = Number(config[1]);
                var gainArr = new Array();
                gainArr.push(new game.model.Item(gainId_1, gainNum_1));
                game.util.GameUtil.openCommongain(null, gainArr);
            }
        }
        else if (state == 2) {
            game.util.GameUtil.popTips(game.util.Language.getText(2436));
        }
        else if (state == 3) {
            game.util.GameUtil.popTips(game.util.Language.getText(2437));
        }
        else if (state == 0) {
            game.util.GameUtil.popTips(game.util.Language.getText(2435));
        }
        else if (state == 5) {
            game.util.GameUtil.popTips("今日分享次数超过上限");
        }
    };
    ShareZiYou.prototype.initView = function (cls, url) {
        var _this = this;
        var shareType = 0;
        var shareStr = "";
        var uiLayer = new eui.UILayer();
        ShareZiYou._ui = new ShareZiYouUI();
        ShareZiYou._ui.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/platform/ShareZiYouUI.exml";
        uiLayer.addChild(ShareZiYou._ui);
        this.addChild(uiLayer);
        ShareZiYou._ui.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
        burn.tools.TweenTools.rotation(ShareZiYou._ui.effct, 3000);
        var userModel = burn.Director.getModelByKey(UserModel);
        RES.getResAsync("ziyou_fenxiang_png", function (data, key) {
            var curW = document.body.clientWidth;
            var curH = document.body.clientHeight;
            var fenxiang = new egret.Bitmap(data);
            _this.addChild(fenxiang);
            RES.getResAsync("share_finger_png", function () {
                RES.getResAsync("share_finger_body_png", function () {
                    console.log("#------------------------->1");
                    var fingerImg = new egret.Bitmap(RES.getRes("share_finger_png"));
                    var bodyImg = new egret.Bitmap(RES.getRes("share_finger_body_png"));
                    _this.addChild(fingerImg);
                    _this.addChild(bodyImg);
                    if (curW >= curH) {
                        fenxiang.x = CONFIG.contentWidth - fenxiang.width;
                        fingerImg.x = CONFIG.contentWidth - bodyImg.width;
                        bodyImg.x = CONFIG.contentWidth - bodyImg.width;
                        //横屏的屏幕
                        bodyImg.x -= bodyImg.width;
                        bodyImg.y += bodyImg.height / 2;
                        fingerImg.x -= fingerImg.width / 2;
                        fingerImg.y += fingerImg.height;
                        fenxiang.y += bodyImg.height;
                        fenxiang.y += fenxiang.height;
                        var posY = fingerImg.y;
                        var fingerTw = egret.Tween.get(fingerImg, { loop: true });
                        fingerTw.set({ y: posY + 10 })
                            .wait(70)
                            .set({ y: posY - 10 })
                            .wait(70);
                    }
                    else {
                        bodyImg.x += bodyImg.width * 1.5;
                        bodyImg.y += bodyImg.height * 0.7;
                        fingerImg.x += fingerImg.width * 2;
                        fingerImg.y += fingerImg.width * 0.8;
                        fingerImg.anchorOffsetX = fingerImg.width / 2;
                        fingerImg.anchorOffsetY = fingerImg.height / 2;
                        bodyImg.anchorOffsetX = bodyImg.width / 2;
                        bodyImg.anchorOffsetY = bodyImg.height / 2;
                        fingerImg.rotation = -90;
                        bodyImg.rotation = -90;
                        fenxiang.y += bodyImg.height;
                        fenxiang.y += fenxiang.height;
                        var posX = fingerImg.x;
                        var fingerTw = egret.Tween.get(fingerImg, { loop: true });
                        fingerTw.set({ x: posX + 10 })
                            .wait(70)
                            .set({ x: posX - 10 })
                            .wait(70);
                    }
                }, _this);
            }, _this);
            if (_this._type != null) {
                var title_1 = "";
                var desc_1 = "";
                var iconUrl_1 = "";
                var icon_1 = "";
                switch (_this._type) {
                    case ShareType.Share_Money:
                        var vo = _this._param;
                        iconUrl_1 = game.util.Language.getText(2441);
                        desc_1 = title_1 = game.util.Language.getText(2446);
                        icon_1 = "exchange_" + _this._param._url + "_png";
                        shareType = ShareSuccType.EXCHANGE_SUCC;
                        shareStr = vo._name;
                        break;
                    case ShareType.Share_Djs:
                        iconUrl_1 = game.util.Language.getText(2442);
                        desc_1 = title_1 = game.util.Language.getDynamicText(2447, [_this._param]);
                        ShareZiYou._ui.root.visible = false;
                        ShareZiYou._ui.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.closeUI, _this);
                        shareType = ShareSuccType.DAJIANGSAI_SUCC;
                        shareStr = _this._param + "积分";
                        //统统干掉
                        break;
                    case ShareType.NORMAL:
                        iconUrl_1 = game.util.Language.getText(2442);
                        desc_1 = title_1 = game.util.Language.getText(2431);
                        ShareZiYou._ui.root.visible = false;
                        ShareZiYou._ui.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.closeUI, _this);
                        shareType = 0;
                        shareStr = "";
                        break;
                    case ShareType.Forge_Succ:
                        ShareZiYou._ui.titleBgForge.visible = true;
                        ShareZiYou._ui.titleBgGain.visible = false;
                        iconUrl_1 = game.util.Language.getText(2443);
                        desc_1 = title_1 = game.util.Language.getDynamicText(2448, [_this._param]);
                        var model1 = burn.Director.getModelByKey(UserModel);
                        var skinId = model1.getCurSkinId();
                        icon_1 = "gunsicon_" + skinId + "_png";
                        {
                            RES.getResAsync("ef_forge_win_json", function () {
                                RES.getResAsync("ef_forge_win_png", function () {
                                    var data = RES.getRes("ef_forge_win_json");
                                    var txtr = RES.getRes("ef_forge_win_png");
                                    var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                                    var effect1 = new MovieFish(mcFactory.generateMovieClipData("ef_forge_win"), egret.Event.COMPLETE, function () {
                                        game.util.GameUtil.popTips("锻造成功");
                                    });
                                    effect1.initEvent();
                                    var dataMc = effect1.movieClipData;
                                    var frameCur = 0;
                                    var modifyRect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
                                    effect1.gotoAndPlay("play", 1);
                                    ShareZiYou._ui.iconGroup.addChild(effect1);
                                    effect1.frameRate = 9;
                                    effect1.anchorOffsetX = effect1.width / 2 + modifyRect.x;
                                    effect1.anchorOffsetY = effect1.height / 2 + modifyRect.y;
                                }, this);
                            }, _this);
                        }
                        shareType = ShareSuccType.FORGING_SUCC;
                        shareStr = _this._param + "炮倍";
                        break;
                    case ShareType.Circle_GoldWar:
                        iconUrl_1 = game.util.Language.getText(2444);
                        desc_1 = title_1 = game.util.Language.getText(2449);
                        icon_1 = "goodsicon_50001_png";
                        shareType = ShareSuccType.DANTOU_SUCC;
                        shareStr = game.util.Language.getText(2093);
                        break;
                    case ShareType.Share_GuangYU:
                        iconUrl_1 = game.util.Language.getText(2445);
                        desc_1 = title_1 = game.util.Language.getText(2450);
                        icon_1 = "goodsicon_50001_png";
                        shareType = ShareSuccType.DANTOU_SUCC;
                        shareStr = game.util.Language.getText(2093);
                        break;
                }
                //异步加载
                RES.getResAsync(icon_1, function () {
                    var txture = RES.getRes(icon_1);
                    var img = new egret.Bitmap(txture);
                    img.anchorOffsetX = img.width / 2;
                    img.anchorOffsetY = img.height / 2;
                    ShareZiYou._ui.iconGroup.addChild(img);
                }, _this);
                var self_1 = _this;
                if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET) {
                    //注册一个分享事件
                    burn.net.HttpManager.init("http://gamecenter.combunet.com/LoginServer/weixinShare.action", egret.HttpResponseType.TEXT, egret.HttpMethod.GET, function (httpResp) {
                        var model = burn.Director.getModelByKey(UserModel);
                        var resp = JSON.parse(httpResp);
                        WXConfig(Number(resp.timestamp), resp.noncestr, resp.signature, model.getInviteCode(), title_1, desc_1, iconUrl_1, shareType, shareStr);
                        self_1.visible = true;
                    }, function () {
                        self_1.visible = true;
                    });
                    var userModel_1 = burn.Director.getModelByKey(UserModel);
                    var url = window.location.href;
                    // let urls = url.split("?")[0];
                    // var urls = encodeURIComponent(url);
                    burn.net.HttpManager.addParam("url", url);
                    burn.net.HttpManager.send();
                }
                else if (CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
                    //注册一个分享事件
                    burn.net.HttpManager.init("http://gamecenter.combunet.com/LoginServer4yiwantang/weixinShare.action", egret.HttpResponseType.TEXT, egret.HttpMethod.GET, function (httpResp) {
                        var model = burn.Director.getModelByKey(UserModel);
                        var resp = JSON.parse(httpResp);
                        WXConfig(Number(resp.timestamp), resp.noncestr, resp.signature, model.getInviteCode(), title_1, desc_1, iconUrl_1, shareType, shareStr);
                        self_1.visible = true;
                    }, function () {
                        self_1.visible = true;
                    });
                    var userModel_2 = burn.Director.getModelByKey(UserModel);
                    // var url = window.location.href;
                    var url = window["FISHING_CONFIG"]["curURL"];
                    // let urls = url.split("?");
                    burn.net.HttpManager.addParam("url", url);
                    burn.net.HttpManager.send();
                }
            }
            else {
                _this.visible = true;
            }
        }, this);
    };
    ShareZiYou.prototype.closeUI = function (evt) {
        game.net.MessageDispatcher.unregisterByType(game.net.ResponseType.RECEIVEWECHATSHAREAWARDBACK);
        ShareZiYou._ui.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
        this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/platform/ShareZiYouUI.exml");
    };
    return ShareZiYou;
}(egret.DisplayObjectContainer));
__reflect(ShareZiYou.prototype, "ShareZiYou");
var ShareZiYouUI = (function (_super) {
    __extends(ShareZiYouUI, _super);
    function ShareZiYouUI() {
        return _super.call(this) || this;
    }
    return ShareZiYouUI;
}(eui.Component));
__reflect(ShareZiYouUI.prototype, "ShareZiYouUI");
//# sourceMappingURL=ShareZiYou.js.map