var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var util;
    (function (util) {
        /**
         * 音效管理类
         *
         */
        var SoundManager = (function () {
            function SoundManager() {
            }
            //音效管理类初始化
            SoundManager.init = function () {
                //本地保存的用户习惯可以在这里处理
                SoundManager._backgroundMusicState = true;
                SoundManager._soundEffectState = true;
                SoundManager._volumeValue = 1;
                SoundManager.fishSoundLoadEnd = false;
                SoundManager.effectSoundLoadEnd = false;
                SoundManager.uiSoundLoadEnd = false;
            };
            //加载UI音效
            SoundManager.loadUISound = function () {
            };
            //加载捕鱼音效
            SoundManager.loadFishSound = function () {
            };
            //播放声音
            SoundManager.playSound = function (name, loop, volume) {
                if (loop === void 0) { loop = 1; }
                if (volume === void 0) { volume = 1; }
                var sound = RES.getRes(name);
                if (sound) {
                    var channel = sound.play(0, loop);
                    channel.volume = volume;
                }
            };
            //播放音效
            SoundManager.playSoundEffect = function (name, loop) {
                if (loop === void 0) { loop = 1; }
                if (SoundManager._soundEffectState) {
                    SoundManager.playSound(name, loop, SoundManager._volumeValue);
                }
            };
            //播放背景音乐
            SoundManager.playBackgroundMusic = function (name) {
                if (SoundManager._backgroundMusicState) {
                    if (SoundManager._musicChannel) {
                        SoundManager._musicChannel.stop();
                    }
                    SoundManager._musicName = name;
                    var sound = RES.getRes(name);
                    if (sound) {
                        SoundManager._musicChannel = sound.play(0, -1);
                        SoundManager._musicChannel.volume = SoundManager._volumeValue;
                    }
                }
            };
            //设置背景音乐开关
            SoundManager.setBackgroundMusicState = function (state, showTips) {
                if (showTips === void 0) { showTips = true; }
                SoundManager._backgroundMusicState = state;
                if (state) {
                    var sound = RES.getRes(SoundManager._musicName);
                    if (sound) {
                        SoundManager._musicChannel = sound.play(0, -1);
                        SoundManager._musicChannel.volume = SoundManager._volumeValue;
                        showTips && game.util.GameUtil.popTips(game.util.Language.getText(62));
                    }
                }
                else {
                    this._musicChannel && this._musicChannel.stop();
                    showTips && game.util.GameUtil.popTips(game.util.Language.getText(63));
                }
            };
            //设置音效开关
            SoundManager.setSoundEffectState = function (state, showTips) {
                if (showTips === void 0) { showTips = true; }
                if (state) {
                    showTips && game.util.GameUtil.popTips(game.util.Language.getText(60));
                }
                else {
                    showTips && game.util.GameUtil.popTips(game.util.Language.getText(61));
                }
                SoundManager._soundEffectState = state;
            };
            //设置音量
            SoundManager.setVolume = function (volume) {
                SoundManager._volumeValue = volume;
                SoundManager._musicChannel.volume = volume;
            };
            SoundManager.getBackgroundMusicState = function () {
                return SoundManager._backgroundMusicState;
            };
            SoundManager.getSoundEffectState = function () {
                return SoundManager._soundEffectState;
            };
            SoundManager.resetBackgroundMusicState = function (s) {
                SoundManager._backgroundMusicState = s;
            };
            SoundManager.resetSoundEffectState = function (s) {
                SoundManager._soundEffectState = s;
            };
            //播放鱼死亡音效
            SoundManager.playFishDeathSound = function (fishId) {
                var fishVo = game.table.T_Fish_Table.getVoByKey(fishId);
                if (fishVo.sound != "null" && SoundManager.fishSoundLoadEnd) {
                    SoundManager.playSoundEffect(fishVo.sound + "_mp3");
                }
            };
            //播放特效音效
            SoundManager.playEffectSound = function (sound) {
                if (sound != "null" && SoundManager.effectSoundLoadEnd) {
                    SoundManager.playSoundEffect(sound + "_mp3");
                }
            };
            //播放UI音效
            SoundManager.playUISound = function (sound) {
                if (sound != "null" && SoundManager.uiSoundLoadEnd) {
                    SoundManager.playSoundEffect(sound + "_mp3");
                }
            };
            return SoundManager;
        }());
        util.SoundManager = SoundManager;
        __reflect(SoundManager.prototype, "game.util.SoundManager");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=SoundManager.js.map