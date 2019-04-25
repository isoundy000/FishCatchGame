var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 邮件中介者
 */
var EmailMediator = (function (_super) {
    __extends(EmailMediator, _super);
    function EmailMediator(view) {
        return _super.call(this, view) || this;
    }
    EmailMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
    };
    EmailMediator.prototype.init = function () {
        //注册观察者
        this.subscrib(NotifyEnum.SHOW_EMAIL_LIST, this.viewInit);
        this.subscrib(NotifyEnum.RECEIVE_MAIL_SEND, this.receiveMail);
        this.subscrib(NotifyEnum.REFRESH_EMAIL, this.refreshMail);
        //注册消息
        //监听服务器
        var self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.RECEIVEMAILBACK, function (msg) {
            self.receiMailBack(msg);
        });
        this._curMailId = -1;
        this._listIndex = -1;
    };
    EmailMediator.prototype.refreshMail = function (obj, target) {
        var msg = obj;
        var view = target.getView();
        var emialModel = target.getModel(EmailModel);
        var list = emialModel.getMailListByType(target._listIndex);
        var bAlert = false;
        if (target._listIndex == 1) {
            var bShowList = emialModel.getMailListByType(2);
            var listLen = bShowList.length;
            for (var i = 0; i < listLen; i++) {
                var emailItemState = bShowList[i].getState();
                if (emailItemState == 0) {
                    bAlert = true;
                    break;
                }
            }
        }
        else if (target._listIndex == 2) {
            var bShowList = emialModel.getMailListByType(1);
            var listLen = bShowList.length;
            for (var i = 0; i < listLen; i++) {
                var emailItemState = bShowList[i].getState();
                if (emailItemState == 0) {
                    bAlert = true;
                    break;
                }
            }
        }
        view.changeListByIndex(target._listIndex, list, false, bAlert);
    };
    EmailMediator.prototype.sendRefreshMail = function () {
        var req = new CommonRequestMessage();
        req.initData();
        req.setType(CommonRequest.EMAIL); //1 email
        NetManager.send(req);
    };
    EmailMediator.prototype.receiveMail = function (obj, target) {
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
    EmailMediator.prototype.receiMailBack = function (msg) {
        var emialModel = this.getModel(EmailModel);
        this._curMailId = emialModel.getCurrEmailId();
        if (this._curMailId == -1) {
            burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
            return;
        }
        var state = msg.getState();
        //0:背包已满，1：领取（查看）成功
        if (state == 0) {
            game.util.GameUtil.popTips(game.util.Language.getText(48));
            burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
            return;
        }
        if (state == 1) {
            var mailObj = emialModel.getMailListById(this._curMailId);
            if (mailObj == null) {
                burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
                return;
            }
            emialModel.updateMailState(this._curMailId, 1);
            var userModle = burn.Director.getModelByKey(UserModel);
            //emialModel.removeItem(mailObj.getMailId());
            this._curMailId = -1;
            var view = this.getView();
            var list = emialModel.getMailListByType(this._listIndex);
            var bAlert = false;
            if (this._listIndex == 1) {
                var bShowList = emialModel.getMailListByType(2);
                var listLen = bShowList.length;
                for (var i = 0; i < listLen; i++) {
                    var emailItemState = bShowList[i].getState();
                    if (emailItemState == 0) {
                        bAlert = true;
                        break;
                    }
                }
            }
            else if (this._listIndex == 2) {
                var bShowList = emialModel.getMailListByType(1);
                var listLen = bShowList.length;
                for (var i = 0; i < listLen; i++) {
                    var emailItemState = bShowList[i].getState();
                    if (emailItemState == 0) {
                        bAlert = true;
                        break;
                    }
                }
            }
            view.changeListByIndex(this._listIndex, list, true, bAlert);
        }
        burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
        burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
        //burn.Director.popView();
    };
    EmailMediator.prototype.viewInit = function (obj, target) {
        if (target._listIndex == -1) {
            target.sendRefreshMail();
            target._listIndex = Number(obj);
        }
        else {
            var view = target.getView();
            var emialModel = target.getModel(EmailModel);
            target._listIndex = Number(obj);
            var list = emialModel.getMailListByType(target._listIndex);
            var bAlert = false;
            if (target._listIndex == 1) {
                var bShowList = emialModel.getMailListByType(2);
                var listLen = bShowList.length;
                for (var i = 0; i < listLen; i++) {
                    var emailItemState = bShowList[i].getState();
                    if (emailItemState == 0) {
                        bAlert = true;
                        break;
                    }
                }
            }
            else if (target._listIndex == 2) {
                var bShowList = emialModel.getMailListByType(1);
                var listLen = bShowList.length;
                for (var i = 0; i < listLen; i++) {
                    var emailItemState = bShowList[i].getState();
                    if (emailItemState == 0) {
                        bAlert = true;
                        break;
                    }
                }
            }
            view.changeListByIndex(target._listIndex, list, false, bAlert);
        }
    };
    EmailMediator.prototype.destroy = function () {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.SHOW_EMAIL_LIST);
        this.unsubscribByType(NotifyEnum.RECEIVE_MAIL_SEND);
        this.unsubscribByType(NotifyEnum.REFRESH_EMAIL);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.RECEIVEMAILBACK);
    };
    return EmailMediator;
}(burn.mediator.SimpleMediator));
__reflect(EmailMediator.prototype, "EmailMediator");
//# sourceMappingURL=EmailMediator.js.map