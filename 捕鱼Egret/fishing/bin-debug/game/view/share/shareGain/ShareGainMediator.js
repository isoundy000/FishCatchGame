var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShareGainMediator = (function (_super) {
    __extends(ShareGainMediator, _super);
    function ShareGainMediator(view) {
        return _super.call(this, view) || this;
    }
    ShareGainMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
    };
    ShareGainMediator.prototype.init = function () {
        var self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.RECEIVEMAILBACK, function (msg) {
            self.receiMailBack(msg);
        });
        this._curMailId = -1;
        this.subscrib(NotifyEnum.REFRESH_EMAIL, this.refreshMail);
        this.subscrib(NotifyEnum.RECEIVE_MAIL_SEND, this.receiveMail);
        this.subscrib(NotifyEnum.SHARE_GAIN_UI_LOADED, this.uiLoaded);
    };
    ShareGainMediator.prototype.receiveMail = function (obj, target) {
        if (obj == null) {
            return;
        }
        var emialModel = target.getModel(EmailModel);
        var mailObj = emialModel.getMailListById(Number(obj));
        if (mailObj == null) {
            return;
        }
        var req = new ReceiveMailSendMessage();
        req.initData();
        req.setMailId(mailObj.getMailId());
        NetManager.send(req);
        target._curMailId = mailObj.getMailId();
        emialModel.setCurrEmialId(mailObj.getMailId());
    };
    ShareGainMediator.prototype.receiMailBack = function (msg) {
        var emialModel = this.getModel(EmailModel);
        this._curMailId = emialModel.getCurrEmailId();
        if (this._curMailId == -1) {
            //tips
            return;
        }
        var state = msg.getState();
        //0:背包已满，1：领取（查看）成功
        if (state == 0) {
            game.util.GameUtil.popTips(game.util.Language.getText(48));
            return;
        }
        if (state == 1) {
            var mailObj = emialModel.getMailListById(this._curMailId);
            if (mailObj == null) {
                //tips
                return;
            }
            emialModel.updateMailState(this._curMailId, 1);
            var userModle = burn.Director.getModelByKey(UserModel);
            //emialModel.removeItem(mailObj.getMailId());
            this._curMailId = -1;
            var view = this.getView();
            var list = emialModel.getMailListByType(5);
            view.showList(list);
        }
        burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
        burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
        //burn.Director.popView();
    };
    ShareGainMediator.prototype.uiLoaded = function (obj, target) {
        target.sendRefreshMail();
    };
    ShareGainMediator.prototype.refreshMail = function (obj, target) {
        var msg = obj;
        var view = target.getView();
        var emialModel = target.getModel(EmailModel);
        var list = emialModel.getMailListByType(5);
        view.showList(list);
    };
    ShareGainMediator.prototype.sendRefreshMail = function () {
        var req = new CommonRequestMessage();
        req.initData();
        req.setType(CommonRequest.EMAIL); //1 email
        NetManager.send(req);
    };
    ShareGainMediator.prototype.destroy = function () {
        this.getView().destroy();
        game.net.MessageDispatcher.unregister(game.net.ResponseType.RECEIVEMAILBACK);
    };
    return ShareGainMediator;
}(burn.mediator.SimpleMediator));
__reflect(ShareGainMediator.prototype, "ShareGainMediator");
//# sourceMappingURL=ShareGainMediator.js.map