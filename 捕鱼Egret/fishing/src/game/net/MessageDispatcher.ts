module game.net {
	export class MessageDispatcher {

		private static responseList = new burn.util.Map();

		public constructor() {

		}

		public static register(pid:number, fun:Function):void {
			if (this.responseList.contains(pid)) {
				console.warn("【" + pid + "】该消息已经注册!");
			} else {
				this.responseList.put(pid, fun);
			}
		}

		public static unregister(pid:number, fun:Function = null):void {
			this.responseList.remove(pid);
		}

		public static unregisterByType(pid:number):void {
			this.responseList.remove(pid);
		}

		public static removeAll():void {
			this.responseList.clear();
		}

		public static dispatch(pid:number, msg:MessageBase):void {
			var fun = this.responseList.get(pid);
			if (fun) {
				fun(msg);
			} else {
				console.warn("消息[" + pid + "]未被注册过!");
			}
		}
	}
}