module burn.net {
	export class HttpManager {
		//Http连接
		private static _httpRequest:egret.HttpRequest;
		//请求类型
		private static _responseType:string;
		//请求地址
		private static _requestUrl:string;
		//method请求方式:GET/POST
		private static _method:string;
		//回调函数
		private static _succCallback:Function;
		private static _failCallback:Function;
		//参数列表
		private static _paramList:burn.util.Map;

		public constructor() {
			throw(new burn.error.SimpleError("HttpManager can't call constructor!"));
		}

		/** 初始化连接 */
		public static init(url:string, responseType:string = egret.HttpResponseType.TEXT, method:string = egret.HttpMethod.GET, 
							succCallback:Function = null, failCallback:Function = null):void {
			HttpManager._responseType = responseType;
			HttpManager._requestUrl = url;
			HttpManager._method = method;
			HttpManager._succCallback = succCallback;
			HttpManager._failCallback = failCallback;
			HttpManager._paramList = new burn.util.Map();
		}

		/** 添加参数 */
		public static addParam(key:string, value:string):void {
			HttpManager._paramList.put(key, value);
		}

		/** 发送请求 */
		public static send():void {
			HttpManager._httpRequest = new egret.HttpRequest();
			HttpManager._httpRequest.responseType = HttpManager._responseType;
			let param = HttpManager._getParamStr();
			if (HttpManager._method == egret.HttpMethod.GET) {
				HttpManager._httpRequest.open(HttpManager._requestUrl + "?" + param, HttpManager._method);
				HttpManager._httpRequest.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
				HttpManager._httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
				HttpManager._httpRequest.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
				HttpManager._httpRequest.send();
			} else if (HttpManager._method == egret.HttpMethod.POST) {
				HttpManager._httpRequest.open(HttpManager._requestUrl, HttpManager._method);
				HttpManager._httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				HttpManager._httpRequest.send(param);

				HttpManager._httpRequest.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
				HttpManager._httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
				HttpManager._httpRequest.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
			}
			HttpManager._paramList.clear();
		}

		private static onPostComplete(event:egret.Event) {
			let response = event.target.response;
			HttpManager._succCallback && HttpManager._succCallback(response);
		}

		private static onPostIOError(event:egret.IOErrorEvent):void {
			HttpManager._failCallback && HttpManager._failCallback();
		}
		
		private static onPostProgress(event:egret.ProgressEvent):void {
		}

		//获取参数
		private static _getParamStr():string {
			let param = "";
			let list = HttpManager._paramList.getList();
			for (let i = 0; i < list.length; i++) {
				let key = list[i].key;
				let value = list[i].value;
				param = param + key + "=" + value + "&";
			}
			param = param.substr(0, param.length - 1);
			return param;
		}
	}
}