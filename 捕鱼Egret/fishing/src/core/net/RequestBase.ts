module burn.net {
	export class RequestBase {
		public constructor() {
		}

		public toByteArray():egret.ByteArray {
			throw(new burn.error.SimpleError("Request must be override toByteArray!"));
		}
	}
}