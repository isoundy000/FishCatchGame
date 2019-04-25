var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var platform;
    (function (platform) {
        var ShareManager = (function () {
            function ShareManager() {
            }
            ShareManager.showQRcode = function () {
            };
            ShareManager.share = function () {
            };
            return ShareManager;
        }());
        platform.ShareManager = ShareManager;
        __reflect(ShareManager.prototype, "game.platform.ShareManager");
    })(platform = game.platform || (game.platform = {}));
})(game || (game = {}));
//# sourceMappingURL=ShareManager.js.map