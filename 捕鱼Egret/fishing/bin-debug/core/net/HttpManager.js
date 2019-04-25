var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var burn;
(function (burn) {
    var net;
    (function (net) {
        var HttpManager = (function () {
            function HttpManager() {
                throw (new burn.error.SimpleError("HttpManager can't call constructor!"));
            }
            /** 初始化连接 */
            HttpManager.init = function (url, responseType, method, succCallback, failCallback) {
                if (responseType === void 0) { responseType = egret.HttpResponseType.TEXT; }
                if (method === void 0) { method = egret.HttpMethod.GET; }
                if (succCallback === void 0) { succCallback = null; }
                if (failCallback === void 0) { failCallback = null; }
                HttpManager._responseType = responseType;
                HttpManager._requestUrl = url;
                HttpManager._method = method;
                HttpManager._succCallback = succCallback;
                HttpManager._failCallback = failCallback;
                HttpManager._paramList = new burn.util.Map();
            };
            /** 添加参数 */
            HttpManager.addParam = function (key, value) {
                HttpManager._paramList.put(key, value);
            };
            /** 发送请求 */
            HttpManager.send = function () {
                HttpManager._httpRequest = new egret.HttpRequest();
                HttpManager._httpRequest.responseType = HttpManager._responseType;
                var param = HttpManager._getParamStr();
                if (HttpManager._method == egret.HttpMethod.GET) {
                    HttpManager._httpRequest.open(HttpManager._requestUrl + "?" + param, HttpManager._method);
                    HttpManager._httpRequest.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
                    HttpManager._httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
                    HttpManager._httpRequest.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
                    HttpManager._httpRequest.send();
                }
                else if (HttpManager._method == egret.HttpMethod.POST) {
                    HttpManager._httpRequest.open(HttpManager._requestUrl, HttpManager._method);
                    HttpManager._httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    HttpManager._httpRequest.send(param);
                    HttpManager._httpRequest.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
                    HttpManager._httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
                    HttpManager._httpRequest.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
                }
                HttpManager._paramList.clear();
            };
            HttpManager.onPostComplete = function (event) {
                var response = event.target.response;
                HttpManager._succCallback && HttpManager._succCallback(response);
            };
            HttpManager.onPostIOError = function (event) {
                HttpManager._failCallback && HttpManager._failCallback();
            };
            HttpManager.onPostProgress = function (event) {
            };
            //获取参数
            HttpManager._getParamStr = function () {
                var param = "";
                var list = HttpManager._paramList.getList();
                for (var i = 0; i < list.length; i++) {
                    var key = list[i].key;
                    var value = list[i].value;
                    param = param + key + "=" + value + "&";
                }
                param = param.substr(0, param.length - 1);
                return param;
            };
            return HttpManager;
        }());
        net.HttpManager = HttpManager;
        __reflect(HttpManager.prototype, "burn.net.HttpManager");
    })(net = burn.net || (burn.net = {}));
})(burn || (burn = {}));
//# sourceMappingURL=HttpManager.js.map