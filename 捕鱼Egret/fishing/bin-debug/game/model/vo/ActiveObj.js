var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var model;
    (function (model) {
        /**
         * 活动对象
         */
        /** 	required uint32 id = 1;//活动id
        required uint32 type = 2;//类型
        required uint32 startTime = 3;//开始时间
        required uint32 endTime = 4;//结束时间
        required uint32 activeState = 5;//活动状态  0: 过期;1: 正在进行;3: 暂停;
        required string parameter1 = 6;//参数1
        required string parameter2 = 7;//参数1
        required string descVip = 8;//特权描述
        required string nameUrl = 9;//名称Url
        required uint32 order = 10;//排序 */
        var ActiveObj = (function () {
            function ActiveObj(msg) {
                this._id = msg.getId();
                this._type = msg.getType();
                this._startTime = msg.getStartTime();
                this._endTime = msg.getEndTime();
                this._activeState = msg.getActiveState();
                this._parameter1 = msg.getParameter1();
                this._parameter2 = msg.getParameter2();
                this._descVip = msg.getDescVip();
                this._nameUrl = msg.getNameUrl();
                this._order = msg.getOrder();
            }
            return ActiveObj;
        }());
        model.ActiveObj = ActiveObj;
        __reflect(ActiveObj.prototype, "game.model.ActiveObj");
        /** 实体类 */
        var ActiveData = (function () {
            function ActiveData(msg, activeObj) {
                this._id = msg.getId();
                this._state = msg.getState();
                this._value = msg.getValue();
                this._activeObj = activeObj;
            }
            return ActiveData;
        }());
        model.ActiveData = ActiveData;
        __reflect(ActiveData.prototype, "game.model.ActiveData");
    })(model = game.model || (game.model = {}));
})(game || (game = {}));
//# sourceMappingURL=ActiveObj.js.map