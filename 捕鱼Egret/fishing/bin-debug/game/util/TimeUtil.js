var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var util;
    (function (util) {
        /**
         * 时间相关工具类
         */
        var TimeUtil = (function () {
            function TimeUtil() {
            }
            /** 初始化服务器时间 */
            TimeUtil.initServerTime = function (time) {
                TimeUtil.SERVER_TIME_STAMP = time;
                var tt = new Date().getTime() / 1000;
                TimeUtil.CLIENT_TIME_STAMP = new Date().getTime() / 1000;
            };
            /** 获取当前时间 */
            TimeUtil.getCurrTime = function () {
                var temp = new Date().getTime() / 1000 - TimeUtil.CLIENT_TIME_STAMP;
                return TimeUtil.SERVER_TIME_STAMP + temp;
            };
            /** 秒转字符串 */
            TimeUtil.sceonds2MinStr = function (s) {
                var min = s / 60;
                var sec = s % 60;
                var h = Math.floor(min);
                if (h < 0) {
                    h = 0;
                }
                var strH = h + "";
                if (h < 10) {
                    strH = "0" + strH;
                }
                var strSec = Math.floor(sec) + "";
                if (Math.floor(sec) < 10) {
                    strSec = "0" + strSec;
                }
                return strH + ":" + strSec;
            };
            /** Long转Date字符串 */
            TimeUtil.longToDateStr = function (time) {
                var date = new Date(time);
                return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
            };
            /** 开始时间到结束时间 */
            TimeUtil.getActiveTime = function (startTime, endTime) {
                var startDate = new Date(startTime * 1000);
                var entDate = new Date(endTime * 1000);
                //如果分钟小于10需要在前边添加0
                var startMinutes = startDate.getMinutes() < 10 ? "0" + startDate.getMinutes() : startDate.getMinutes();
                var endMinutes = entDate.getMinutes() < 10 ? "0" + entDate.getMinutes() : entDate.getMinutes();
                return (startDate.getMonth() + 1) + "月" + startDate.getDate() + "日" + startDate.getHours() + ":" + startMinutes + ":" + startDate.getSeconds()
                    + "-" +
                    (entDate.getMonth() + 1) + "月" + entDate.getDate() + "日" + entDate.getHours() + ":" + endMinutes + ":" + entDate.getSeconds();
                // return startDate.getMonth() + 1 + "/" +  startDate.getDay() + "/" + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds()
                // 		+ "-" + 
                // 	   entDate.getMonth() + 1 + "/" +  entDate.getDay() + "/" + entDate.getHours() + ":" + entDate.getMinutes() + ":" + entDate.getSeconds()
                // 		;
            };
            /** 月卡秒转字符串 */
            TimeUtil.sceondsMonthCard = function (s) {
                return "月卡剩余:" + Math.floor(s / (60 * 60 * 24)) + "天";
            };
            /** 剩余时间 */
            TimeUtil.expireTime = function (str) {
                var today = new Date();
                today.setHours(0);
                today.setMinutes(0);
                today.setSeconds(0);
                today.setMilliseconds(0);
                var current_time = this.getCurrTime();
                var expire = today.getTime() / 1000 + (24 * 3600) - current_time;
                expire = Math.floor(expire / (60 * 60));
                return str + expire + "小时";
            };
            return TimeUtil;
        }());
        util.TimeUtil = TimeUtil;
        __reflect(TimeUtil.prototype, "game.util.TimeUtil");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=TimeUtil.js.map