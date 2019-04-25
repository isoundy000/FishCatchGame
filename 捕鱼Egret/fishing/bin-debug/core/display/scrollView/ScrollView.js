var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var burn;
(function (burn) {
    var display;
    (function (display) {
        /**
         * Scroll list components.support loop scroll.
         * @author ituuz
         * @since 2017.01.19
         * @link http://www.ituuz.com
         */
        var ScrollView = (function (_super) {
            __extends(ScrollView, _super);
            function ScrollView() {
                return _super.call(this) || this;
            }
            /**
             * 初始化滚动视图
             */
            ScrollView.prototype.init = function (viewWidth, viewHeight, itemWidth, itemHeight, interval, loop) {
                if (loop === void 0) { loop = false; }
                this._viewWidth = viewWidth;
                this._viewHeight = viewHeight;
                this._itemWidth = itemWidth;
                this._itemHeight = itemHeight;
                this._interval = interval;
                this._loop = loop;
                //Add event listener.
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
                this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
                this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
                //Add mask
                var rect = new egret.Rectangle(0, 0, viewWidth, viewHeight);
                this.mask = rect;
                this.touchEnabled = true;
                //初始化操作状态
                this._operaState = ScrollType.FAST;
                this.SHOW_NUMBER = Math.ceil(viewWidth / (itemWidth + interval));
            };
            /**
             * Set data source
             */
            ScrollView.prototype.setData = function (list) {
                this._dataList = list;
                this._container = new egret.DisplayObjectContainer();
                this.addChild(this._container);
                this.sortData();
                this.showView();
            };
            //为方便显示，将最后一个元素放到第一个元素前，准备显示
            ScrollView.prototype.sortData = function () {
                var last = this._dataList.pop();
                this._dataList.unshift(last);
            };
            /**
             * 显示
             */
            ScrollView.prototype.showView = function () {
                var initX = -(this._itemWidth + this._interval);
                var initY = 0;
                for (var i = 0; i < this._dataList.length; i++) {
                    var item = this._dataList[i];
                    this._container.addChild(item);
                    item.x = initX;
                    item.y = initY;
                    initX = initX + this._itemWidth + this._interval;
                }
            };
            ScrollView.prototype.touchBegin = function (evt) {
                this._prePoint = new egret.Point(evt.localX, evt.localY);
                this._beginPoint = new egret.Point(evt.localX, evt.localY);
            };
            ScrollView.prototype.touchMove = function (evt) {
                var currPoint = new egret.Point(evt.localX, evt.localY);
                if (Math.abs(currPoint.x - this._prePoint.x) > 20 && this._operaState != ScrollType.SLOW) {
                    this._operaState = ScrollType.FAST;
                }
                else {
                    this._operaState = ScrollType.SLOW;
                    //head-tail handler
                    this.sortItem();
                    for (var i = 0; i < this._dataList.length; i++) {
                        var item = this._dataList[i];
                        item.x += currPoint.x - this._prePoint.x;
                    }
                }
                this._prePoint = currPoint;
            };
            ScrollView.prototype.sortItem = function () {
                var temp = this._dataList[0];
                if (temp.x > 0) {
                    var last = this._dataList.pop();
                    last.x = temp.x - (this._itemWidth + this._interval);
                    this._dataList.unshift(last);
                }
                else if (temp.x < -(this._itemWidth + this._interval)) {
                    var first = this._dataList.shift();
                    var last = this._dataList[this._dataList.length - 1];
                    first.x = last.x + (this._itemWidth + this._interval);
                    this._dataList.push(first);
                }
            };
            ScrollView.prototype.touchEnd = function (evt) {
                var currPoint = new egret.Point(evt.localX, evt.localY);
                //判断是拖拽还是点击
                if (Math.abs(currPoint.x - this._beginPoint.x) > 20) {
                    this.sortItem();
                    this.scrollToPos();
                }
                else {
                    var gPoint = this.localToGlobal(currPoint.x, currPoint.y);
                    for (var i = 0; i < this._dataList.length; i++) {
                        var item = this._dataList[i];
                        if (item.hitTestPoint(gPoint.x, gPoint.y)) {
                            item.clicked();
                            break;
                        }
                    }
                }
            };
            //滑动到下一个位置-右滑
            ScrollView.prototype.nextPosition = function () {
                var last = this._dataList.pop();
                this._dataList.unshift(last);
                var dist = this._itemWidth + this._interval;
                for (var i = 0; i < this._dataList.length; i++) {
                    (function (_item, _dist) {
                        var tw = egret.Tween.get(_item, { loop: false });
                        var toX = _item.x + _dist;
                        tw.to({ x: toX }, 150).call(function () {
                            egret.Tween.removeTweens(_item);
                        });
                    })(this._dataList[i], dist);
                }
                var self = this;
                setTimeout(function () {
                    var daterEvent = new burn.event.ScrollEvent(burn.event.ScrollEvent.SCROLL_END);
                    self.dispatchEvent(daterEvent);
                }, 170);
            };
            //滑动到上一个位置-左滑
            ScrollView.prototype.prevPosition = function () {
                var dist = this._itemWidth + this._interval;
                for (var i = 0; i < this._dataList.length; i++) {
                    (function (_item, _dist) {
                        var tw = egret.Tween.get(_item, { loop: false });
                        var toX = _item.x - _dist;
                        tw.to({ x: toX }, 150).call(function () {
                            egret.Tween.removeTweens(_item);
                        });
                    })(this._dataList[i], dist);
                }
                var first = this._dataList.shift();
                this._dataList.push(first);
                var self = this;
                setTimeout(function () {
                    var daterEvent = new burn.event.ScrollEvent(burn.event.ScrollEvent.SCROLL_END);
                    self.dispatchEvent(daterEvent);
                }, 170);
            };
            //Scroll to the standard position
            ScrollView.prototype.scrollToPos = function () {
                var first = this._dataList[0];
                var currX = first.x;
                var move = currX % (this._itemWidth + this._interval);
                //滑动到就近的对齐点
                if (Math.abs(move) > (this._itemWidth + this._interval) / 2) {
                    if (move > 0) {
                        move = move - (this._itemWidth + this._interval);
                    }
                    else {
                        move = move + (this._itemWidth + this._interval);
                    }
                }
                for (var i = 0; i < this._dataList.length; i++) {
                    (function (_item, _dist) {
                        var tw = egret.Tween.get(_item, { loop: false });
                        var toX = _item.x - _dist;
                        tw.to({ x: toX }, 100).call(function () {
                            egret.Tween.removeTweens(_item);
                        });
                    })(this._dataList[i], move);
                }
                var self = this;
                setTimeout(function () {
                    var daterEvent = new burn.event.ScrollEvent(burn.event.ScrollEvent.SCROLL_END);
                    self.dispatchEvent(daterEvent);
                }, 120);
            };
            //return the data list.
            ScrollView.prototype.getVos = function () {
                return this._dataList;
            };
            //Get the visible item list.
            ScrollView.prototype.getVisibleItems = function () {
                var arr = new Array();
                for (var i = 0; i < this._dataList.length; i++) {
                    var item = this._dataList[i];
                    if (item.x >= 0 && arr.length <= this.SHOW_NUMBER) {
                        arr.push(item);
                    }
                }
                return arr;
            };
            //销毁函数
            ScrollView.prototype.destroy = function () {
                this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
            };
            return ScrollView;
        }(egret.DisplayObjectContainer));
        display.ScrollView = ScrollView;
        __reflect(ScrollView.prototype, "burn.display.ScrollView", ["burn.base.IDestory"]);
        /**
         * 滚动类型
         */
        var ScrollType;
        (function (ScrollType) {
            ScrollType[ScrollType["FAST"] = 0] = "FAST";
            ScrollType[ScrollType["SLOW"] = 1] = "SLOW"; //
        })(ScrollType || (ScrollType = {}));
    })(display = burn.display || (burn.display = {}));
})(burn || (burn = {}));
//# sourceMappingURL=ScrollView.js.map