var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var util;
    (function (util) {
        var Guide = (function () {
            function Guide() {
            }
            Guide.checkGuide = function (nType) {
                var userModle = burn.Director.getModelByKey(UserModel);
                var curId = userModle.getGuideID();
                var id = Number(curId) + 1;
                var vo = game.table.T_Guide_Table.getVoByKey(id);
                if (!vo) {
                    return;
                }
                if (vo.trrigertype == nType) {
                    Guide.openGuide(id);
                }
            };
            Guide.completeGuide = function () {
                var userModle = burn.Director.getModelByKey(UserModel);
                var curId = userModle.getGuideID();
                var id = Number(curId) + 1;
                var vo = game.table.T_Guide_Table.getVoByKey(id);
                if (!vo) {
                    return;
                }
                userModle.setGuideID(id, false);
                this._bOpen = false;
                switch (vo.closetype) {
                    case GuideClose.GUIDE_CLOSE_INTOROOM:
                        var gainArr = new Array();
                        var voItem = game.table.T_Guide_Table.getVoByKey(9999);
                        if (!voItem.gain || voItem.gain == "null") {
                            //burn._Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {type:RequesetRoomState.NewbieRoom, id:0});
                            return;
                        }
                        var str = voItem.gain.split(",");
                        var len = str.length;
                        for (var i = 0; i < len; i++) {
                            var dataS = str[i].split("_");
                            gainArr.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]), 0));
                        }
                        game.util.GameUtil.openQihangByPos(null, gainArr, new egret.Point(262, 659), function () {
                            //burn._Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {type:RequesetRoomState.NewbieRoom, id:0});
                            burn._Notification_.send(NotifyEnum.CHECK_POP);
                        });
                        break;
                    case GuideClose.GUIDE_CLOSE_UNLOCK:
                        burn._Notification_.send(NotifyEnum.GUIDE_CLOSE, vo.closetype);
                        break;
                    case GuideClose.GUIDE_CLOSE_TRRIGER_NEXT:
                        burn._Notification_.send(NotifyEnum.GUIDE_CLOSE, vo.closetype);
                        break;
                    case GuideClose.GUIDE_CLOSE_LOCK:
                        burn._Notification_.send(NotifyEnum.GUIDE_CLOSE, vo.closetype);
                        break;
                    case GuideClose.GUIDE_CLOSE_OPENLOTTERY:
                        burn._Notification_.send(NotifyEnum.GUIDE_CLOSE, vo.closetype);
                        break;
                    case GuideClose.GUIDE_CLOSE_LOTTERY:
                        burn._Notification_.send(NotifyEnum.GUIDE_CLOSE, vo.closetype);
                        break;
                    case GuideClose.GUIDE_CLOSE_CLOSE_RMB_GAIN:
                        burn._Notification_.send(NotifyEnum.GUIDE_CLOSE, vo.closetype);
                        break;
                    case GuideClose.GUIDE_CLOSE_CLICK_EXCHAGE:
                        burn._Notification_.send(NotifyEnum.GUIDE_CLOSE, vo.closetype);
                        break;
                    case GuideClose.GUIDE_CLOSE_EXCHNANGE_END:
                        burn._Notification_.send(NotifyEnum.GUIDE_CLOSE, vo.closetype);
                        break;
                }
                var send = new NewbieGuideSendMessage();
                send.initData();
                send.setGuideId(id);
                NetManager.send(send);
                game.util.ReyunUtil.sendEvent(curId + game.util.LogEnum.GUIDE_END);
                if (!this.isOpentask) {
                    var guideTaskHide = game.table.T_Config_Table.getVoByKey(48).value;
                    var strGuideTaskHide = guideTaskHide.split(",");
                    for (var i = 0; i < strGuideTaskHide.length; i++) {
                        var param2 = strGuideTaskHide[i].split("_");
                        if (id >= Number(param2[0]) && id <= Number(param2[1])) {
                            burn._Notification_.send(NotifyEnum.TASK_GUIDE_LOAD);
                        }
                    }
                }
                var guidePopCiri = game.table.T_Config_Table.getVoByKey(77).value;
                if (curId == Number(guidePopCiri)) {
                    burn._Notification_.send(NotifyEnum.POP_CIRI);
                }
            };
            Guide.openGuide = function (nId) {
                if (this._bOpen) {
                    return;
                }
                this._bOpen = true;
                var vo = game.table.T_Guide_Table.getVoByKey(nId);
                switch (vo.opentype) {
                    case GuideOpen.GUIDE_OPEN_UNLOCK:
                        burn._Notification_.send(NotifyEnum.GUIDE_OPEN, vo.opentype);
                        break;
                    case GuideOpen.GUIDE_OPEN_ADDFISH:
                        burn._Notification_.send(NotifyEnum.GUIDE_OPEN, vo.opentype);
                        break;
                    case GuideOpen.GUIDE_OPEN_FISHDEAD:
                        this._bOpen = false;
                        burn._Notification_.send(NotifyEnum.GUIDE_OPEN, vo.opentype);
                        break;
                    case GuideOpen.GUIDE_OPEN_OPENLOTTERY:
                        burn._Notification_.send(NotifyEnum.GUIDE_OPEN, vo.opentype);
                        break;
                    case GuideOpen.GUIDE_OPEN_TRRIGERTASK:
                        burn._Notification_.send(NotifyEnum.GUIDE_OPEN, vo.opentype);
                        break;
                    case GuideOpen.GUIDE_OPEN_EXCHANGE:
                        burn._Notification_.send(NotifyEnum.GUIDE_OPEN, vo.opentype);
                        break;
                    case GuideOpen.GUIDE_OPEN_POP_RMB_GAIN:
                        burn._Notification_.send(NotifyEnum.GUIDE_OPEN, vo.opentype);
                        break;
                }
                if (vo.opentype == GuideOpen.GUIDE_OPEN_POP_RMB_GAIN) {
                    EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/guide/RmbGain.exml", function () {
                        var gView = new GuideView();
                        var gMed = new GuideMediator(gView, nId);
                        burn.Director.pushView(gMed);
                    }, this);
                }
                else {
                    var gView = new GuideView();
                    var gMed = new GuideMediator(gView, nId);
                    burn.Director.pushView(gMed);
                }
                game.util.ReyunUtil.sendEvent(nId + game.util.LogEnum.GUIDE_START);
            };
            return Guide;
        }());
        Guide._bOpen = false;
        Guide.gunSendTimes = 0;
        Guide.isOpentask = false;
        util.Guide = Guide;
        __reflect(Guide.prototype, "game.util.Guide");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=GuideManager.js.map