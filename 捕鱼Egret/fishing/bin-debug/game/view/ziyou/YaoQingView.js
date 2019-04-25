var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var YaoQingView = (function (_super) {
    __extends(YaoQingView, _super);
    function YaoQingView(type, param) {
        if (type === void 0) { type = null; }
        if (param === void 0) { param = null; }
        var _this = _super.call(this) || this;
        _this._type = type;
        _this._param = param;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/platform/YaoQingUI.exml", _this.initView, _this);
        _this.visible = false;
        return _this;
    }
    YaoQingView.prototype.initView = function (cls, url) {
        var _this = this;
        var uiLayer = new eui.UILayer();
        YaoQingView._ui = new YaoQingViewUI();
        YaoQingView._ui.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/platform/YaoQingUI.exml";
        uiLayer.addChild(YaoQingView._ui);
        this.addChild(uiLayer);
        YaoQingView._ui.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
        var userModel = burn.Director.getModelByKey(UserModel);
        YaoQingView._ui.desTxt.text = game.util.Language.getDynamicText(1, [userModel.getShareTimes() + ""]);
        RES.getResAsync("ziyou_fenxiang_png", function (data, key) {
            var curW = document.body.clientWidth;
            var curH = document.body.clientHeight;
            var fenxiang = new egret.Bitmap(data);
            if (curW >= curH) {
                fenxiang.x = CONFIG.contentWidth - fenxiang.width;
            }
            _this.addChild(fenxiang);
            if (_this._type != null) {
                var title_1 = "";
                var desc_1 = "";
                var iconUrl_1 = "";
                switch (_this._type) {
                    case ShareType.Share_Money:
                        iconUrl_1 = game.util.Language.getText(2441);
                        desc_1 = title_1 = game.util.Language.getText(2446);
                        break;
                    case ShareType.Share_Djs:
                        iconUrl_1 = game.util.Language.getText(2442);
                        desc_1 = title_1 = game.util.Language.getDynamicText(2447, [_this._param]);
                        break;
                    case ShareType.Forge_Succ:
                        iconUrl_1 = game.util.Language.getText(2443);
                        desc_1 = title_1 = game.util.Language.getDynamicText(2448, [_this._param]);
                        break;
                    case ShareType.Circle_GoldWar:
                        iconUrl_1 = game.util.Language.getText(2444);
                        desc_1 = title_1 = game.util.Language.getText(2449);
                        break;
                    case ShareType.Share_GuangYU:
                        iconUrl_1 = game.util.Language.getText(2445);
                        desc_1 = title_1 = game.util.Language.getText(2450);
                        break;
                }
                var self_1 = _this;
                //注册一个分享事件
                burn.net.HttpManager.init("http://gamecenter.combunet.com/LoginServer/weixinShare.action", egret.HttpResponseType.TEXT, egret.HttpMethod.GET, function (httpResp) {
                    var model = burn.Director.getModelByKey(UserModel);
                    var resp = JSON.parse(httpResp);
                    WXConfig(Number(resp.timestamp), resp.noncestr, resp.signature, model.getInviteCode(), title_1, desc_1, iconUrl_1, 0, "");
                    self_1.visible = true;
                }, function () {
                    self_1.visible = true;
                });
                var userModel_1 = burn.Director.getModelByKey(UserModel);
                var url = window.location.href;
                var urls = url.split("?");
                burn.net.HttpManager.addParam("url", urls[0]);
                burn.net.HttpManager.send();
            }
            else {
                _this.visible = true;
            }
        }, this);
    };
    YaoQingView.prototype.closeUI = function (evt) {
        YaoQingView._ui.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
        this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/platform/YaoQingUI.exml");
    };
    //分享回调
    YaoQingView.updateYaoQingView = function (result) {
        if (result) {
            var userModel = burn.Director.getModelByKey(UserModel);
            var times = userModel.getShareTimes();
            if (times > 0) {
                times--;
                userModel.setShareTimes(times);
                var msg = new CommonRequestMessage();
                msg.initData();
                msg.setType(CommonRequest);
                NetManager.send(msg);
                //恭喜获得
                var vo = game.table.T_Config_Table.getVoByKey(80);
                var param = vo.value.split("_");
                game.util.GameUtil.openCommongain(null, [new game.model.Item(Number(param[0]), Number(param[1]))]);
            }
            this._ui.desTxt.text = game.util.Language.getDynamicText(1, [userModel.getShareTimes() + ""]);
        }
        else {
            console.log("分享失败");
        }
    };
    return YaoQingView;
}(egret.DisplayObjectContainer));
__reflect(YaoQingView.prototype, "YaoQingView");
var YaoQingViewUI = (function (_super) {
    __extends(YaoQingViewUI, _super);
    function YaoQingViewUI() {
        return _super.call(this) || this;
    }
    return YaoQingViewUI;
}(eui.Component));
__reflect(YaoQingViewUI.prototype, "YaoQingViewUI");
//# sourceMappingURL=YaoQingView.js.map