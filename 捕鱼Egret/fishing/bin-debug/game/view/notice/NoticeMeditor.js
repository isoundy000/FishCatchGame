var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 公告界面中介者
 */
var NoticeMeditor = (function (_super) {
    __extends(NoticeMeditor, _super);
    function NoticeMeditor(view) {
        var _this = _super.call(this, view) || this;
        _this._currId = 0;
        return _this;
    }
    NoticeMeditor.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    NoticeMeditor.prototype.init = function () {
        game.util.UIUtil.startLoading();
        this.subscrib(NotifyEnum.CLICK_NOTICE_ITEM, this.clickNoticeItem);
        var self = this;
        this.getView().initView(function () {
            var respHandler = function (evt) {
                switch (evt.type) {
                    case egret.Event.COMPLETE:
                        var request_1 = evt.currentTarget;
                        self.setNoticeData(request_1.response);
                        break;
                    case egret.IOErrorEvent.IO_ERROR:
                        console.log("respHandler io error");
                        break;
                }
                game.util.UIUtil.closeLoading();
            };
            //加载公告内容
            var request = new egret.HttpRequest();
            request.once(egret.Event.COMPLETE, respHandler, null);
            request.once(egret.IOErrorEvent.IO_ERROR, respHandler, null);
            request.open(CONFIG.LOGIN_ADDR + "gameNotices.action?platformId=" + CONFIG.PLATFORM_ID, egret.HttpMethod.GET);
            request.send();
        });
    };
    NoticeMeditor.prototype.setNoticeData = function (str) {
        this._data = JSON.parse(str);
        function compareFun(item1, item2) {
            if (item1.orders > item2.orders) {
                return 1; // 如果是降序排序，返回-1。
            }
            else if (item1.orders === item2.orders) {
                return 0;
            }
            else {
                return -1; // 如果是降序排序，返回1。
            }
        }
        this._data.sort(compareFun);
        this.getView().setNoticeData(this._data);
    };
    NoticeMeditor.prototype.clickNoticeItem = function (obj, target) {
        var view = target.getView();
        var id = Number(obj);
        for (var i = 0; i < target._data.length; i++) {
            var notice = target._data[i];
            if (id == notice.orders) {
                view.clickItem(id, notice.title, notice.content);
                break;
            }
        }
    };
    NoticeMeditor.prototype.destroy = function () {
        this._data = null;
        this.unsubscribByType(NotifyEnum.CLICK_NOTICE_ITEM);
        this.getView().destroy();
    };
    return NoticeMeditor;
}(burn.mediator.SimpleMediator));
__reflect(NoticeMeditor.prototype, "NoticeMeditor");
//# sourceMappingURL=NoticeMeditor.js.map