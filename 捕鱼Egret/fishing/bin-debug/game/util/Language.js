var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var util;
    (function (util) {
        var Language = (function () {
            function Language() {
            }
            Language.getText = function (key) {
                var lan = game.table.T_Language_Table.getVoByKey(key);
                if (lan) {
                    if (CONFIG.LANGUAGE == LanguageType.Simp_Chinese) {
                        return lan.value;
                    }
                    else if (CONFIG.LANGUAGE == LanguageType.TW_Chinese) {
                        return lan.value_tw;
                    }
                    return lan.value;
                }
                else {
                    return "Key:" + key;
                }
            };
            //arr:["1", "我", "zzz"]
            Language.getDynamicText = function (key, arr) {
                var lan = game.table.T_Language_Table.getVoByKey(key);
                var text = lan.value;
                if (CONFIG.LANGUAGE == LanguageType.Simp_Chinese) {
                    text = lan.value;
                }
                else if (CONFIG.LANGUAGE == LanguageType.TW_Chinese) {
                    text = lan.value_tw;
                }
                var len = arr.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        var temp = arr[i];
                        text = text.replace("{" + i + "}", temp);
                    }
                }
                else {
                    return text;
                }
                return text;
            };
            Language.getDynamicTextByStr = function (text, arr) {
                var len = arr.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        var temp = arr[i];
                        text = text.replace("{" + i + "}", temp);
                    }
                }
                else {
                    return text;
                }
                return text;
            };
            return Language;
        }());
        util.Language = Language;
        __reflect(Language.prototype, "game.util.Language");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=Language.js.map