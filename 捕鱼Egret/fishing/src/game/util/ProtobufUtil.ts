module game.util {
	export class ProtobufUtil {
		private static _instance:ProtobufUtil = null;
		private _isInit:boolean = false;

		private _gunSendMsg:FishingGunSendMessage;
		private _hitSendMsg:FishingHitSendMessage;
		private _bulletDisappearMsg:BulletDisappearMessage;

		
		public constructor() {
			if (this._isInit) {
				throw(new burn.error.SimpleError(""));
			}
			this._isInit = true;
		}

		public static getInstance():ProtobufUtil {
			if (this._instance) {
				return this._instance;
			} else {
				this._instance = new ProtobufUtil();
			}
			return this._instance;
		}

		//缓存常用协议
		public initCacheProto():void {
			//开枪消息
			this._gunSendMsg = new FishingGunSendMessage();
			this._gunSendMsg.initData();

			this._hitSendMsg = new FishingHitSendMessage();
			this._hitSendMsg.initData();

			this._bulletDisappearMsg = new BulletDisappearMessage();
			this._bulletDisappearMsg.initData();
		}

		public getGunSend():FishingGunSendMessage {
			return this._gunSendMsg;
		}

		public getHitSend():FishingHitSendMessage {
			return this._hitSendMsg;
		}

		public getBulletDisappear():BulletDisappearMessage {
			return this._bulletDisappearMsg;
		}

	}
}