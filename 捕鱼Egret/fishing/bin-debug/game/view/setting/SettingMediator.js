var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SettingMediator = (function (_super) {
    __extends(SettingMediator, _super);
    function SettingMediator(view) {
        return _super.call(this, view) || this;
    }
    SettingMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
        this.subscrib(NotifyEnum.CHANGE_SETTING, this.changeStateX);
    };
    SettingMediator.prototype.init = function () {
    };
    SettingMediator.prototype.changeStateX = function (obj, target) {
        var view = target.getView();
        if (obj == null) {
            view.changeMusicState(game.util.SoundManager.getBackgroundMusicState());
            view.changeSoundState(game.util.SoundManager.getSoundEffectState());
            return;
        }
        if (obj.type == "music") {
            game.util.SoundManager.setBackgroundMusicState(!game.util.SoundManager.getBackgroundMusicState());
            view.changeMusicState(game.util.SoundManager.getBackgroundMusicState());
        }
        else if (obj.type == "sound") {
            game.util.SoundManager.setSoundEffectState(!game.util.SoundManager.getSoundEffectState());
            view.changeSoundState(game.util.SoundManager.getSoundEffectState());
        }
    };
    SettingMediator.prototype.destroy = function () {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.CHANGE_SETTING);
    };
    return SettingMediator;
}(burn.mediator.SimpleMediator));
__reflect(SettingMediator.prototype, "SettingMediator");
//# sourceMappingURL=SettingMediator.js.map