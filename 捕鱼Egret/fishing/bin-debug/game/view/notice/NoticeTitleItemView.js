var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NoticeTitleItemView = (function (_super) {
    __extends(NoticeTitleItemView, _super);
    function NoticeTitleItemView(id, str, selected) {
        if (selected === void 0) { selected = false; }
        var _this = _super.call(this) || this;
        _this._id = id;
        _this._str = str;
        _this._select = selected;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/notice/NoticeItemBtnUI.exml", _this.initData, _this);
        return _this;
    }
    //初始化数据
    NoticeTitleItemView.prototype.initData = function (clazz, url) {
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/notice/NoticeItemBtnUI.exml";
        this.titleTxt.text = this._str;
        this.selected.visible = this._select;
        this.unSelected.visible = !this._select;
        this.alert.visible = !this._select;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    NoticeTitleItemView.prototype.setSelected = function (s) {
        this.selected.visible = s;
        this.unSelected.visible = !s;
        if (this.alert.visible && s) {
            this.alert.visible = false;
        }
    };
    NoticeTitleItemView.prototype.onButtonClick = function (e) {
        burn._Notification_.send(NotifyEnum.CLICK_NOTICE_ITEM, this._id);
    };
    NoticeTitleItemView.prototype.getId = function () {
        return this._id;
    };
    return NoticeTitleItemView;
}(eui.Component));
__reflect(NoticeTitleItemView.prototype, "NoticeTitleItemView");
//# sourceMappingURL=NoticeTitleItemView.js.map