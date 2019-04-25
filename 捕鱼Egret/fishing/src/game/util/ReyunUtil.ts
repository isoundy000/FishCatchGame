module game.util {
	export class ReyunUtil {

		private static _url: string;

		/** 初始化 */
		public static init(url: string): void {
			ReyunUtil._url = url;
		}

		/** 心跳 */
		public static heartbeat(): void {
			if (RELEASE) {
				let model: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
				sendReyunHeartbeat(model.getUserId() + "", model.getLevel() + "", CONFIG.PLATFORM_ID + "", model.getUserId() + "");
			}
		}

		/**
		 * 自定义事件
		 */
		public static sendEvent(eve: string, txt: string = ""): void {
			if (RELEASE) {
				let uId = -1;
				let level = -1;
				let model: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
				if (model != null) {
					uId = model.getUserId();
					level = model.getLevel();
				}
				sendCostomEvent(eve, txt, uId + "", level + "", CONFIG.PLATFORM_ID + "", uId + "");
			}
		}
	}
}