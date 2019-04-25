module game.util {
	export class GorgeousManager {
		//是否是华丽版 true是 false否
		private static _state:boolean = true;

		public static initState(s:boolean):void {
			GorgeousManager._state = s;
		}

		public static setState(s:boolean):void {
			GorgeousManager._state = s;
			//处理激活逻辑
			burn._Notification_.send(NotifyEnum.UPDATE_GORGEOUS_STATE);
		}
		public static getState():boolean {
			return GorgeousManager._state;
		}
	}
}