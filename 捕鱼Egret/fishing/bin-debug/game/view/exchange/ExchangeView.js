var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeView = (function (_super) {
    __extends(ExchangeView, _super);
    function ExchangeView(bIsSendMsg) {
        if (bIsSendMsg === void 0) { bIsSendMsg = true; }
        var _this = _super.call(this) || this;
        _this._bIsSendMsg = bIsSendMsg;
        if (_this._bIsSendMsg) {
            game.util.ReyunUtil.sendEvent(game.util.LogEnum.FISH_CLICK_EXCHANGE_COUNT);
        }
        else {
            game.util.ReyunUtil.sendEvent(game.util.LogEnum.HALL_CLICK_EXCHANGE_COUNT);
        }
        game.util.ReyunUtil.sendEvent(game.util.LogEnum.CLICK_EXCHANGE_COUNT);
        _this._btnWrapList = new Array();
        _this._itemList = new Array();
        game.util.UIUtil.startLoading();
        return _this;
    }
    ExchangeView.prototype.addBgResource = function (clazz, url) {
        game.util.UIUtil.closeLoading();
        if (this._bIsSendMsg) {
            var send = new PondStateMessage();
            send.initData();
            send.setType(4);
            NetManager.send(send);
        }
        var uiLayer = new eui.UILayer();
        uiLayer.name = "uiLayer";
        this.addChild(uiLayer);
        var uiObj = new ExchangesUI();
        uiObj.name = "ExchangesUI";
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = url;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //打开UI动画
        //game.util.UIUtil.popView(this._uiDisplay.root);
        game.util.SoundManager.playUISound("B02");
        //关闭当前界面
        var closeBtn = this._uiDisplay.closeBtn;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
        this._uiDisplay.recoderGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenRecode, this);
        this._itemGroup = this._uiDisplay.itemGroup;
        this.send(NotifyEnum.SET_EXCHANGE_LIST);
        this._uiDisplay.listScroller.touchEnabled = false;
        this._uiDisplay.listScroller.stopAnimation();
        this._uiDisplay.listScroller.enabled = false;
    };
    ExchangeView.prototype.setRecodeList = function (list) {
        var _this = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/Recode.exml", function () {
            var exchangeModel = burn.Director.getModelByKey(ExchangeModel);
            _this._uiDisplay.recodeList.removeChildren();
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var item = new RecodeItemUI();
                item.touchEnabled = false;
                var obj = exchangeModel.getListById(list[i].exchangeGoodsId);
                if (obj) {
                    item.setData(list[i]);
                    egret.Tween.removeTweens(item);
                    _this._uiDisplay.recodeList.addChild(item);
                }
            }
            var tLayout = new eui.VerticalLayout();
            tLayout.gap = -10;
            _this._uiDisplay.recodeList.touchEnabled = false;
            _this._uiDisplay.recodeList.layout = tLayout;
            _this.playRecodeAct();
            _this._uiDisplay.des_txt.textFlow = (new egret.HtmlTextParser).parser(game.util.Language.getText(127));
        }, this, true);
    };
    ExchangeView.prototype.playRecodeAct = function () {
        var childNum = this._uiDisplay.recodeList.numElements;
        if (childNum <= 4) {
            return;
        }
        var self = this;
        if (self._recodeTimer) {
            this._uiDisplay.listScroller.viewport.scrollV = 0;
            self._recodeTimer.stop();
            self._recodeTimer.removeEventListener(egret.TimerEvent.TIMER, self.tiemFun, self);
            self._recodeTimer = null;
        }
        var totalV = ((childNum * 96));
        self._simpleV = (96.0 / 50);
        self._recodeTimer = new egret.Timer(30, 50 * (childNum));
        self._recodeTimer.addEventListener(egret.TimerEvent.TIMER, self.tiemFun, self);
        self._recodeTimer.start();
        setTimeout(function () {
            self.playRecodeAct();
        }, 1500 * (childNum));
    };
    ExchangeView.prototype.tiemFun = function () {
        this._uiDisplay.listScroller.viewport.scrollV += this._simpleV;
    };
    ExchangeView.prototype.setList = function (listVo, ticketNum, dantou) {
        var _this = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeItem.exml", function () {
            //排序
            function compareFun(item1, item2) {
                if (item1._order < item2._order) {
                    return -1; // 如果是降序排序，返回-1。
                }
                else if (item1._order === item2._order) {
                    return 0;
                }
                else {
                    return 1; // 如果是降序排序，返回1。
                }
            }
            for (var _i = 0, _a = _this._itemList; _i < _a.length; _i++) {
                var item = _a[_i];
                item.destory();
            }
            listVo.sort(compareFun);
            if (_this._itemGroup) {
                _this._itemGroup.removeChildren();
                for (var i = 0; i < listVo.length; i++) {
                    var strNum = Number(listVo[i]._name.substring(0, listVo[i]._name.length - 3)); //根据名字判断是一元红包
                    if (strNum == 1 && CONFIG.PLATFORM_ID != PlatformTypeEnum.YI_WAN_TANG) {
                        continue;
                    }
                    var item = new ExchangeItemUI();
                    item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeItem.exml";
                    item.setData(listVo[i]);
                    if (listVo[i]._type == 4) {
                        item.setMoney();
                    }
                    _this._itemGroup.addChild(item);
                }
                var tLayout = new eui.HorizontalLayout();
                _this._itemGroup.layout = tLayout; /// 网格布局
                _this._uiDisplay.num.text = ticketNum / 10 + "元";
                _this._uiDisplay.d_num.text = dantou + "";
            }
        }, this, true);
    };
    /** 关闭游戏 */
    ExchangeView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
        var userModle = burn.Director.getModelByKey(UserModel);
        var curId = userModle.getGuideID();
        if (curId == 15) {
            var id = Number(curId) + 1;
            var vo = game.table.T_Guide_Table.getVoByKey(id);
            game.util.Guide.checkGuide(vo.trrigertype);
        }
    };
    /** 打开记录 */
    ExchangeView.prototype.onOpenRecode = function (e) {
        var exchangeRecodeView = new ExchangeRecodeView();
        var exchangeRecodeMed = new ExchangeRecodeMediator(exchangeRecodeView);
        burn.Director.pushView(exchangeRecodeMed);
    };
    ExchangeView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeUI.exml", this.addBgResource, this);
    };
    ExchangeView.prototype.destroy = function () {
        var _this = this;
        if (this._bIsSendMsg) {
            var send = new PondStateMessage();
            send.initData();
            send.setType(5);
            NetManager.send(send);
        }
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            if (_this._recodeTimer) {
                _this._uiDisplay.listScroller.viewport.scrollV = 0;
                _this._recodeTimer.stop();
                _this._recodeTimer.removeEventListener(egret.TimerEvent.TIMER, _this.tiemFun, _this);
                _this._recodeTimer = null;
            }
            var childNum = _this._uiDisplay.recodeList.numElements;
            for (var i = 0; i < childNum; i++) {
                var item = _this._uiDisplay.recodeList.getElementAt(i);
                egret.Tween.removeTweens(item);
            }
            _this._uiDisplay.recodeList.removeChildren();
            var childItemNum = _this._itemGroup.numElements;
            for (var i = 0; i < childItemNum; i++) {
                var item = _this._itemGroup.getElementAt(i);
                item.destory();
                egret.Tween.removeTweens(item);
            }
            _this._itemGroup.removeChildren();
            var uiLayer = _this.getChildByName("uiLayer");
            if (uiLayer) {
                var ExchangesUI_1 = uiLayer.getChildByName("ExchangesUI");
                if (ExchangesUI_1) {
                    ExchangesUI_1.removeChildren();
                }
                uiLayer.removeChildren();
            }
            _this.removeChildren();
            //移除按钮封装
            while (_this._btnWrapList.length > 0) {
                var wrap = _this._btnWrapList.pop();
                wrap.destroy();
            }
            _this._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClosttButtonClick, _this);
            _this._uiDisplay.recoderGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOpenRecode, _this);
            _this.parent && _this.parent.removeChild(_this);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeUI.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeItem.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/Recode.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeRecode.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeRecodeItem.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeSure.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeTicket.exml");
        });
    };
    return ExchangeView;
}(burn.view.PopView));
__reflect(ExchangeView.prototype, "ExchangeView");
/***操作UI的对应类 */
var ExchangesUI = (function (_super) {
    __extends(ExchangesUI, _super);
    function ExchangesUI() {
        return _super.call(this) || this;
    }
    return ExchangesUI;
}(eui.Component));
__reflect(ExchangesUI.prototype, "ExchangesUI");
//# sourceMappingURL=ExchangeView.js.map