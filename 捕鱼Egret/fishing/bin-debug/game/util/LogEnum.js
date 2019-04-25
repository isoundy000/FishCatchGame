var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var util;
    (function (util) {
        var LogEnum = (function () {
            function LogEnum() {
            }
            return LogEnum;
        }());
        LogEnum.GUIDE_START = "_guide_start"; //开始引导
        LogEnum.GUIDE_END = "_guide_end"; //开始引导
        LogEnum.GUIDE_TASK_END = "_guide_task_end"; //新手任务完成
        // static START_LOGIN_LOADING = "Loading_login_start";	//登录开始加载
        // static END_LOGIN_LOADING = "Loading_login_end";	//登录加载结束
        // static START_ROOM_LOADING = "Loading_room_start";	//房间开始加载
        // static END_ROOM_LOADING = "Loading_room_end";	//房间加载结束
        LogEnum.LOGIN_LOADING_TIME = "login_loading_time"; //登录加载时长
        LogEnum.INTO_ROOM_LOADING_TIME = "room_loading_time"; //进入房间加载时长
        LogEnum.HALL_CLICK_EXCHANGE_COUNT = "hall_click_exchange_count"; //在大厅中点击兑换的人数
        LogEnum.FISH_CLICK_EXCHANGE_COUNT = "fish_click_exchange_count"; //在捕鱼界面点击兑换的人数
        LogEnum.CLICK_EXCHANGE_COUNT = "click_exchange_count"; //点击兑换的人数
        LogEnum.CHECK_FISH_FUN_COUNT = "check_fish_fun_count"; //查看鱼种功能人数
        LogEnum.QUICKLY_GAME_COUNT = "quickly_game_count"; //快速游戏人数
        LogEnum.MANUAL_SEAT_SELECTION = "manual_seat_selection"; //手动选坐人数
        LogEnum.DAYUSONGLI_START_COUNT = "dayusongli_start_count"; //打鱼送礼开始任务人数
        LogEnum.CHONGZHISONG_RECEIVE_COUNT = "chongzhisong_receive_count"; //充值送送送领取奖励人数
        LogEnum.VIPFREESEND_RECEIVE_COUNT = "vipfreesend_receive_count"; //VIP免费送领取人数
        util.LogEnum = LogEnum;
        __reflect(LogEnum.prototype, "game.util.LogEnum");
        var LogUtil = (function () {
            function LogUtil() {
            }
            /** 向服务器发送逻辑日志 */
            LogUtil.sendLogicalLog = function (type, content) {
                var msg = new LogicalLogSendMessage();
                msg.initData();
                msg.setType(type);
                msg.setContent(JSON.stringify(content));
                NetManager.send(msg);
            };
            return LogUtil;
        }());
        util.LogUtil = LogUtil;
        __reflect(LogUtil.prototype, "game.util.LogUtil");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=LogEnum.js.map