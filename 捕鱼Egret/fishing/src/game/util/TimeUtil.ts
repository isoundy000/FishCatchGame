module game.util {
	/**
	 * 时间相关工具类
	 */
	export class TimeUtil {
		//初始化服务器时间
		private static SERVER_TIME_STAMP:number;
		//客户端时间戳
		private static CLIENT_TIME_STAMP:number;

		/** 初始化服务器时间 */
		public static initServerTime(time:number):void {
			TimeUtil.SERVER_TIME_STAMP = time;
			let tt = new Date().getTime() / 1000;
			TimeUtil.CLIENT_TIME_STAMP = new Date().getTime() / 1000;
		}

		/** 获取当前时间 */
		public static getCurrTime():number {
			let temp = new Date().getTime() / 1000 - TimeUtil.CLIENT_TIME_STAMP;
			return TimeUtil.SERVER_TIME_STAMP + temp;
		}

		/** 秒转字符串 */
		public static sceonds2MinStr(s:number):string {
			let min = s/60;
			let sec = s%60;
			let h = Math.floor(min);
			if(h < 0)
			{
				h = 0;
			}
			let strH:string = h + "";
			if(h < 10)
			{
				strH = "0" + strH;
			}
			let strSec:string = Math.floor(sec) + "";
			if(Math.floor(sec) < 10)
			{
				strSec = "0" + strSec;
			}
			return strH + ":" + strSec;
		}
		/** Long转Date字符串 */
		public static longToDateStr(time:number):string
		{
			let date = new Date(time);
			return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
		}

		/** 开始时间到结束时间 */
		public static getActiveTime(startTime:number, endTime:number):string
		{
			let startDate = new Date(startTime * 1000);
			let entDate = new Date(endTime * 1000);
			//如果分钟小于10需要在前边添加0
			let startMinutes= startDate.getMinutes()<10? "0" + startDate.getMinutes() : startDate.getMinutes();
			let endMinutes= entDate.getMinutes()<10? "0" + entDate.getMinutes() : entDate.getMinutes();
			return (startDate.getMonth() + 1) + "月" +  startDate.getDate() + "日" + startDate.getHours() + ":" + startMinutes + ":" + startDate.getSeconds()
					+ "-" + 
				   (entDate.getMonth() + 1) + "月" +  entDate.getDate() + "日" + entDate.getHours() + ":" + endMinutes + ":" + entDate.getSeconds()
					;
			// return startDate.getMonth() + 1 + "/" +  startDate.getDay() + "/" + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds()
			// 		+ "-" + 
			// 	   entDate.getMonth() + 1 + "/" +  entDate.getDay() + "/" + entDate.getHours() + ":" + entDate.getMinutes() + ":" + entDate.getSeconds()
			// 		;
		}
		/** 月卡秒转字符串 */
		public static sceondsMonthCard(s:number):string {
			return "月卡剩余:" + Math.floor(s/(60*60*24)) + "天";
		}

		/** 剩余时间 */
		public static expireTime(str:string):string 
		{
			let today = new Date();
			today.setHours(0);
			today.setMinutes(0);
			today.setSeconds(0);
			today.setMilliseconds(0);
			let current_time = this.getCurrTime();
			let expire = today.getTime()/1000 + (24*3600) - current_time;
			expire = Math.floor(expire/(60*60));
			return str + expire + "小时";
		}
	}
}