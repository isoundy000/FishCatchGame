var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShareMediator = (function (_super) {
    __extends(ShareMediator, _super);
    function ShareMediator(view) {
        return _super.call(this, view) || this;
    }
    ShareMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
        var self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.WECHATSHAREINFO, function (msg) {
            self.receiveWechat(msg);
        });
        game.net.MessageDispatcher.register(game.net.ResponseType.RECEIVEWECHATSHAREAWARDBACK, function (msg) {
            self.shareBack(msg);
        });
    };
    ShareMediator.prototype.shareBack = function (msg) {
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
            game.util.GameUtil.popTips("//今日分享次数超过上限");
        }
    };
    ShareMediator.prototype.receiveWechat = function (msg) {
        var newbieAwardState = msg.getNewbieAwardState(); //新人奖励状态
        var invitedUserNum = msg.getInvitedUserNum(); //邀请人数
        var todayShareTimes = msg.getTodayShareTimes(); //今日成功分享次数
        this.getView().initShareData(newbieAwardState, invitedUserNum, todayShareTimes);
    };
    ShareMediator.prototype.init = function () {
    };
    ShareMediator.prototype.destroy = function () {
        this.getView().destroy();
        game.net.MessageDispatcher.unregister(game.net.ResponseType.WECHATSHAREINFO);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.RECEIVEWECHATSHAREAWARDBACK);
    };
    return ShareMediator;
}(burn.mediator.SimpleMediator));
__reflect(ShareMediator.prototype, "ShareMediator");
//# sourceMappingURL=ShareMediator.js.map