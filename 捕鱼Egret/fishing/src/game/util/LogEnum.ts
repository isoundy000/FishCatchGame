module game.util {
	export class LogEnum {
		
		static GUIDE_START = "_guide_start";         //开始引导
		static GUIDE_END = "_guide_end";         //开始引导
		static GUIDE_TASK_END = "_guide_task_end";  //新手任务完成

		// static START_LOGIN_LOADING = "Loading_login_start";	//登录开始加载
		// static END_LOGIN_LOADING = "Loading_login_end";	//登录加载结束
		// static START_ROOM_LOADING = "Loading_room_start";	//房间开始加载
		// static END_ROOM_LOADING = "Loading_room_end";	//房间加载结束

		static LOGIN_LOADING_TIME = "login_loading_time";	//登录加载时长
		static INTO_ROOM_LOADING_TIME = "room_loading_time";	//进入房间加载时长

		static HALL_CLICK_EXCHANGE_COUNT = "hall_click_exchange_count";	//在大厅中点击兑换的人数
		static FISH_CLICK_EXCHANGE_COUNT = "fish_click_exchange_count";	//在捕鱼界面点击兑换的人数
		static CLICK_EXCHANGE_COUNT = "click_exchange_count"; 			//点击兑换的人数

		static CHECK_FISH_FUN_COUNT = "check_fish_fun_count";		//查看鱼种功能人数
		static QUICKLY_GAME_COUNT = "quickly_game_count";			//快速游戏人数
		static MANUAL_SEAT_SELECTION = "manual_seat_selection";		//手动选坐人数

		static DAYUSONGLI_START_COUNT = "dayusongli_start_count";		//打鱼送礼开始任务人数
		static CHONGZHISONG_RECEIVE_COUNT = "chongzhisong_receive_count";		//充值送送送领取奖励人数
		static VIPFREESEND_RECEIVE_COUNT = "vipfreesend_receive_count";			//VIP免费送领取人数
	}

	export class LogUtil {
		public static timestamp:number;

		/** 向服务器发送逻辑日志 */
		public static sendLogicalLog(type:string, content:any):void {
			let msg:LogicalLogSendMessage = new LogicalLogSendMessage();
			msg.initData();
			msg.setType(type);
			msg.setContent(JSON.stringify(content));
			NetManager.send(msg);
		}

		
	}
}