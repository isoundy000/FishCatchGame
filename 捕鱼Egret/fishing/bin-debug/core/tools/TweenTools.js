var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var burn;
(function (burn) {
    var tools;
    (function (tools) {
        var TweenTools = (function () {
            function TweenTools() {
            }
            /**
             * 循环上下播放动画
             * amplitude：振幅
             * during：单次上下的时间
             * */
            TweenTools.upAndDown = function (obj, amplitude, during) {
                TweenTools.upOutIn(obj, amplitude, during);
            };
            /**
             * 渐隐渐现
             * during：单次消失和出现的时间
             * */
            TweenTools.showOutAndIn = function (obj, during) {
                TweenTools.outAndIn(obj, during);
            };
            /**
             * 渐隐渐现 0.5 - 1
             * during：单次消失和出现的时间
             * */
            TweenTools.showOutAndInHalf = function (obj, during) {
                TweenTools.outAndInHalf(obj, during);
            };
            /** 新手任务渐隐
             *
             */
            TweenTools.ShowOutAndInMoreHalf = function (obj, during) {
                TweenTools.outAndInMoreHalf(obj, during);
            };
            /***
             * 分身特效
             */
            TweenTools.showOutAndInAndScale = function (obj, during) {
                TweenTools.outAndInAndScale(obj, during);
            };
            TweenTools.showOuntAndInAndRotation = function (obj, during) {
                TweenTools.outAndInAndRotation(obj, during);
            };
            /**
             * 旋转动画
             * during：单圈旋转的时间
             * */
            TweenTools.rotation = function (obj, during) {
                TweenTools._rotate(obj, during);
            };
            TweenTools.doop = function (obj, during) {
                TweenTools._doop(obj, during);
            };
            /** 反着转 */
            TweenTools.rotationFan = function (obj, during) {
                TweenTools._rotateFan(obj, during);
            };
            /**
             * 循环收缩
             * amplitude：振幅
             * during：单次时间
             */
            TweenTools.shrink = function (obj, amplitude, during) {
                TweenTools._shrink(obj, amplitude, during);
            };
            TweenTools.circle = function (obj) {
                TweenTools._circle(obj);
            };
            TweenTools._circle = function (obj) {
                obj.scaleX = 0.2;
                obj.scaleY = 0.2;
                obj.alpha = 1;
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ scaleX: 0.7, scaleY: 0.7 }, 700)
                    .to({ scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 300)
                    .call(function () {
                    egret.Tween.removeTweens(obj);
                    TweenTools._circle(obj);
                });
            };
            /** hop循环跳一跳 */
            TweenTools.hop = function (obj, amplitude, during) {
                TweenTools._hop(obj, amplitude, during);
            };
            TweenTools.hopOnce = function (obj, amplitude, during) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ rotation: -4 }, 100)
                    .to({ rotation: -8 }, 30)
                    .to({ rotation: 0 }, 30)
                    .to({ rotation: 8 }, 30)
                    .to({ rotation: 0 }, 30)
                    .to({ rotation: -8 }, 30)
                    .to({ rotation: 0 }, 30)
                    .to({ rotation: 8 }, 30)
                    .to({ rotation: 4 }, 30)
                    .to({ rotation: 0 }, 30)
                    .wait(1000)
                    .call(function () {
                    egret.Tween.removeTweens(obj);
                });
            };
            TweenTools._hop = function (obj, amplitude, during) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ rotation: -4 }, 100)
                    .to({ rotation: -8 }, 30)
                    .to({ rotation: 0 }, 30)
                    .to({ rotation: 8 }, 30)
                    .to({ rotation: 0 }, 30)
                    .to({ rotation: -8 }, 30)
                    .to({ rotation: 0 }, 30)
                    .to({ rotation: 8 }, 30)
                    .to({ rotation: 4 }, 30)
                    .to({ rotation: 0 }, 30)
                    .wait(1000)
                    .call(function () {
                    egret.Tween.removeTweens(obj);
                    TweenTools._hop(obj, amplitude, during);
                });
            };
            TweenTools._shrink = function (obj, amplitude, during) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ scaleX: 1 - amplitude, scaleY: 1 - amplitude }, during / 2)
                    .to({ scaleX: 1 + amplitude, scaleY: 1 + amplitude }, during / 2)
                    .call(function () {
                    egret.Tween.removeTweens(obj);
                    TweenTools._shrink(obj, amplitude, during);
                });
            };
            TweenTools._rotate = function (obj, during) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ rotation: obj.rotation + 360 }, during).call(function () {
                    egret.Tween.removeTweens(obj);
                    TweenTools._rotate(obj, during);
                });
            };
            TweenTools._doop = function (obj, during) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ scaleY: 0.8, y: obj.y + 10 }, during / 4)
                    .to({ y: obj.y - 30 }, during / 2)
                    .to({ scaleY: 1, y: obj.y }, during / 4).call(function () {
                    egret.Tween.removeTweens(obj);
                    TweenTools._doop(obj, during);
                });
            };
            TweenTools._rotateFan = function (obj, during) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ rotation: obj.rotation - 360 }, during).call(function () {
                    egret.Tween.removeTweens(obj);
                    TweenTools._rotateFan(obj, during);
                });
            };
            TweenTools.outAndIn = function (obj, during) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ alpha: 0 }, during / 2).to({ alpha: 1 }, during / 2).call(function () {
                    egret.Tween.removeTweens(obj);
                    TweenTools.outAndIn(obj, during);
                });
            };
            TweenTools.outAndInHalf = function (obj, during) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ alpha: 0.5 }, during / 2).to({ alpha: 1 }, during / 2).call(function () {
                    egret.Tween.removeTweens(obj);
                    TweenTools.outAndInHalf(obj, during);
                });
            };
            TweenTools.outAndInMoreHalf = function (obj, during) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ alpha: 0.5 }, during / 2).to({ alpha: 1 }, during / 2).wait(1000).call(function () {
                    egret.Tween.removeTweens(obj);
                    TweenTools.outAndInHalf(obj, during);
                });
            };
            TweenTools.outAndInAndScale = function (obj, during) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ alpha: 0, scaleX: 1.2, scaleY: 1.2 }, during).call(function () {
                    obj.alpha = 1;
                    obj.scaleX = 1;
                    obj.scaleY = 1;
                    egret.Tween.removeTweens(obj);
                    TweenTools.outAndInAndScale(obj, during);
                });
            };
            TweenTools.outAndInAndRotation = function (obj, during) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ alpha: 0, rotation: obj.rotation + 180 }, during / 2).to({ alpha: 1, rotation: obj.rotation + 360 }, during / 2).call(function () {
                    egret.Tween.removeTweens(obj);
                    TweenTools.outAndInAndRotation(obj, during);
                });
            };
            TweenTools.downOutIn = function (obj, amplitude, during) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ y: obj.y + amplitude }, during / 2).to({ y: obj.y - amplitude }, during / 2).call(function () {
                    egret.Tween.removeTweens(obj);
                    TweenTools.upOutIn(obj, amplitude, during);
                });
            };
            TweenTools.upOutIn = function (obj, amplitude, during) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ y: obj.y - amplitude }, during / 2).to({ y: obj.y + amplitude }, during / 2).call(function () {
                    egret.Tween.removeTweens(obj);
                    TweenTools.downOutIn(obj, amplitude, during);
                });
            };
            TweenTools.clearTween = function (obj) {
                egret.Tween.removeTweens(obj);
            };
            TweenTools.jump = function (obj) {
                TweenTools.jumpOnce(obj);
            };
            TweenTools.jumpOnce = function (obj) {
                obj.anchorOffsetY = obj.height - 12.4;
                var x = obj.x;
                var y = obj.y;
                var tw = egret.Tween.get(obj, { loop: false });
                tw.to({ x: x, y: y, scaleX: 1, scaleY: 1 }, 10)
                    .to({ x: x, y: y, scaleX: 1, scaleY: 0.84 }, 30)
                    .to({ x: x, y: y - 19, scaleX: 1, scaleY: 1.12 }, 210)
                    .to({ x: x, y: y, scaleX: 1, scaleY: 0.71 }, 90)
                    .to({ x: x, y: y, scaleX: 1, scaleY: 1.04 }, 90)
                    .to({ x: x, y: y, scaleX: 1, scaleY: 1 }, 60)
                    .wait(690).call(function () {
                    egret.Tween.removeTweens(obj);
                    TweenTools.jump(obj);
                });
            };
            return TweenTools;
        }());
        tools.TweenTools = TweenTools;
        __reflect(TweenTools.prototype, "burn.tools.TweenTools");
    })(tools = burn.tools || (burn.tools = {}));
})(burn || (burn = {}));
//# sourceMappingURL=TweenTools.js.map