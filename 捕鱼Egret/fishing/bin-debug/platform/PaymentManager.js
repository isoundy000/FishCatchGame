var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var platform;
    (function (platform) {
        var PaymentManager = (function () {
            function PaymentManager() {
            }
            PaymentManager.pay = function (pId, price) {
                if (CONFIG.PLATFORM_ID == PlatformTypeEnum.EGRET) {
                    PaymentManager.egretPay(pId, price);
                }
                else if (CONFIG.PLATFORM_ID == PlatformTypeEnum.QQ_ZONE) {
                    var vo = game.table.T_Charge_Table.getVoByKey(pId);
                    callQZonePay("" + price / 10, vo.productId);
                }
                else if (CONFIG.PLATFORM_ID == PlatformTypeEnum.QUN_HEI) {
                    var vo = game.table.T_Charge_Table.getVoByKey(pId);
                    qunHeiPay(CONFIG.ACCOUNT, CONFIG.USER_NAME, pId + "", game.util.Language.getText(vo.name), vo.price);
                }
                else if (CONFIG.PLATFORM_ID == PlatformTypeEnum.ZI_YOU) {
                    PaymentManager.ziyouPay(pId);
                }
                else if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET) {
                    var vo = game.table.T_Charge_Table.getVoByKey(pId);
                    var userModel = burn.Director.getModelByKey(UserModel);
                    //核客 / 微信 /  扫码  /  h5支付
                    if (CONFIG.SUB_PLATFORM_ID == 7) {
                        createOrder4hekePay(vo.id, userModel.getUserId());
                    }
                    else if (isWeixin()) {
                        createOrder4Wechat(CONFIG.ACCOUNT, vo.id, userModel.getUserId());
                    }
                    else if (IsInPC()) {
                        var chargeStr = Number(vo.price) / 100 + ""; //道具价格
                        createOrder4QRcode(vo.id, userModel.getUserId(), PayType.PC, chargeStr);
                    }
                    else {
                        createOrder4h5Pay(vo.id, userModel.getUserId(), PayType.MWEB);
                    }
                }
                else if (CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
                    var vo = game.table.T_Charge_Table.getVoByKey(pId);
                    var userModel = burn.Director.getModelByKey(UserModel);
                    //微信 /  扫码  /  h5支付
                    if (isWeixin()) {
                        createOrder4Wechat(CONFIG.ACCOUNT, vo.id, userModel.getUserId());
                    }
                    else if (IsInPC()) {
                        var chargeStr = Number(vo.price) / 100 + ""; //道具价格
                        createOrder4QRcode(vo.id, userModel.getUserId(), PayType.PC, chargeStr);
                    }
                    else {
                        createOrder4h5Pay(vo.id, userModel.getUserId(), PayType.MWEB);
                    }
                }
            };
            PaymentManager.WXConfig = function (timestamp, nonceStr, signature, invitecode, functionType, str) {
                if (functionType === void 0) { functionType = 0; }
                if (str === void 0) { str = ""; }
                WXConfig(timestamp, nonceStr, signature, invitecode, '震惊！同事说玩游戏比上班赚钱...', '《街机捕鱼现金版》来了~全新捕鱼，红包满天飞！', "http://gamecenter.combunet.com/LoginServer/combunet/CombunetIcon.png", functionType, str);
            };
            PaymentManager.ziyouPay = function (pId) {
                //@@_ziyou_start
                var vo = game.table.T_Charge_Table.getVoByKey(pId);
                var userModel = burn.Director.getModelByKey(UserModel);
                showZiyouPay(pId, Number(vo.price), userModel.getUserId(), game.util.Language.getText(vo.name), CONFIG.OPEN_ID, CONFIG.OPEN_KEY, userModel.getUserName());
                //@@_ziyou_end
            };
            PaymentManager.egretPay = function (pId, price) {
                //@@_Egret_start
                // let info = {
                // 	goodsId:"" + pId,
                // 	goodsNumber:"1",
                // 	serverId:"1",
                // 	ext:"xx"
                // };
                // nest.iap.pay(info, function (data) {
                // 	if (data.result == 0) {
                // 		console.log("支付成功");
                // 	} else if(data.result == -1) {
                // 		console.log("支付取消");
                // 	} else if (data.result == -3) {
                // 		console.log("平台登陆账号被踢掉，需要重新登陆");
                // 	} else {
                // 		console.log("支付失败");
                // 	}
                // })
                //@@_Egret_end
            };
            return PaymentManager;
        }());
        platform.PaymentManager = PaymentManager;
        __reflect(PaymentManager.prototype, "game.platform.PaymentManager");
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
var SendServer;
(function (SendServer) {
    var Sample = (function () {
        function Sample() {
        }
        Sample.ShareEnd = function (type, str) {
            if (type === void 0) { type = 0; }
            if (str === void 0) { str = ""; }
            var req = new ReceiveWeChatShareAwardSendMessage();
            req.initData();
            req.setType(2); //新人奖励1，邀请成功奖励2
            if (type != 0 && str != "") {
                req.setFunctionType(type); //邀请成功类型，1兑换，2锻造，3获得弹头，4大奖赛
                req.setFunctionParam(str);
            }
            NetManager.send(req);
        };
        return Sample;
    }());
    SendServer.Sample = Sample;
    __reflect(Sample.prototype, "SendServer.Sample");
})(SendServer || (SendServer = {}));
//# sourceMappingURL=PaymentManager.js.map