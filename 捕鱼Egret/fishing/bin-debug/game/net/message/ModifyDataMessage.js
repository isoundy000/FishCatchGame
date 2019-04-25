//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModifyDataMessage = (function (_super) {
    __extends(ModifyDataMessage, _super);
    function ModifyDataMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);
        _this._clazz = builder.build("ModifyData");
        return _this;
    }
    ModifyDataMessage.prototype.setId = function (id) {
        this._data.set("id", id);
    };
    ModifyDataMessage.prototype.getId = function () {
        return this._data.get("id");
    };
    ModifyDataMessage.prototype.setCount = function (count) {
        this._data.set("count", count);
    };
    ModifyDataMessage.prototype.getCount = function () {
        return this._data.get("count");
    };
    ModifyDataMessage.prototype.getPID = function () {
        return 1006;
    };
    ModifyDataMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    ModifyDataMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    ModifyDataMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return ModifyDataMessage;
}(MessageBase));
__reflect(ModifyDataMessage.prototype, "ModifyDataMessage");
//# sourceMappingURL=ModifyDataMessage.js.map