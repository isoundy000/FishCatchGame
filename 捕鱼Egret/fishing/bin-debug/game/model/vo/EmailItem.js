var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var model;
    (function (model) {
        /**
         * Email对象
         */
        var EmailItem = (function () {
            function EmailItem(mailId, mailType, userId, receiveUserName, sendUserId, sendUserName, items, time, state, mailContent, mailTitle) {
                this._mailId = mailId;
                this._mailType = mailType;
                this._userId = userId;
                this._receiveUserName = receiveUserName;
                this._sendUserId = sendUserId;
                this._sendUserName = sendUserName;
                this._items = new Array();
                for (var i = 0; i < items.length; i++) {
                    var obj = items[i];
                    this._items.push(new game.model.Item(obj.itemId, obj.totalCount));
                }
                this._time = time;
                this._state = state;
                this._mailContent = mailContent;
                this._mailTitle = mailTitle;
            }
            EmailItem.prototype.getMailId = function () {
                return this._mailId;
            };
            EmailItem.prototype.getMailType = function () {
                return this._mailType;
            };
            EmailItem.prototype.getUserId = function () {
                return this._userId;
            };
            EmailItem.prototype.getReceiveUserName = function () {
                return this._receiveUserName;
            };
            EmailItem.prototype.getSendUserId = function () {
                return this._sendUserId;
            };
            EmailItem.prototype.getSendUserName = function () {
                return this._sendUserName;
            };
            EmailItem.prototype.getItems = function () {
                return this._items;
            };
            EmailItem.prototype.setState = function (value) {
                this._state = value;
            };
            EmailItem.prototype.getState = function () {
                return this._state;
            };
            EmailItem.prototype.getMailContent = function () {
                return this._mailContent;
            };
            EmailItem.prototype.getMailTitle = function () {
                return this._mailTitle;
            };
            EmailItem.prototype.getTime = function () {
                return this._time;
            };
            return EmailItem;
        }());
        model.EmailItem = EmailItem;
        __reflect(EmailItem.prototype, "game.model.EmailItem");
    })(model = game.model || (game.model = {}));
})(game || (game = {}));
//# sourceMappingURL=EmailItem.js.map