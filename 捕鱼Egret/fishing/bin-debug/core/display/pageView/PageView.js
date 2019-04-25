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
        var PageView = (function (_super) {
            __extends(PageView, _super);
            function PageView() {
                var _this = _super.call(this) || this;
                //是否在触摸中
                _this._isTouchBegin = false;
                _this._isInTouch = false;
                return _this;
            }
            /**
             * 初始化滚动视图
             */
            PageView.prototype.init = function (viewWidth, viewHeight, itemWidth, interval, loop) {
                if (loop === void 0) { loop = false; }
                this._viewWidth = viewWidth;
                this._viewHeight = viewHeight;
                this._itemWidth = itemWidth;
                this._interval = interval;
                this._loop = loop;
                //Add mask
                var rect = new egret.Rectangle(0, 0, viewWidth, viewHeight);
                this.mask = rect;
                this.touchEnabled = true;
                this.SHOW_NUMBER = Math.ceil(viewWidth / (itemWidth + interval));
            };
            PageView.prototype.startRegistEvent = function () {
                //Add event listener.
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
                // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
                this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
            };
            /**
             * Set data source
             */
            PageView.prototype.setData = function (list) {
                this._dataList = list;
                this._container = new egret.DisplayObjectContainer();
                this.addChild(this._container);
                this.sortData();
                this.showView();
            };
            //为方便显示，将最后一个元素放到第一个元素前，准备显示
            PageView.prototype.sortData = function () {
                var last = this._dataList.pop();
                this._dataList.unshift(last);
            };
            /**
             * 显示
             */
            PageView.prototype.showView = function () {
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
            PageView.prototype.touchBegin = function (evt) {
                if (this._isTouchBegin)
                    return;
                this._isTouchBegin = true;
                this._beginPoint = evt.target.localToGlobal(evt.localX, evt.localX);
            };
            PageView.prototype.touchEnd = function (evt) {
                if (this._isInTouch)
                    return;
                if (this._beginPoint == null) {
                    return;
                }
                var currPoint = evt.target.localToGlobal(evt.localX, evt.localX);
                //判断是拖拽还是点击
                if (Math.abs(currPoint.x - this._beginPoint.x) > 20) {
                    if (currPoint.x - this._beginPoint.x > 0) {
                        this.nextPosition();
                    }
                    else {
                        this.prevPosition();
                    }
                }
                else {
                    for (var i = 0; i < this._dataList.length; i++) {
                        var item = this._dataList[i];
                        if (item.hitTestPoint(currPoint.x, currPoint.y)) {
                            item.clicked();
                            break;
                        }
                    }
                }
                this._beginPoint == null;
            };
            //滑动到下一个位置-右滑
            PageView.prototype.nextPosition = function (isTween) {
                if (isTween === void 0) { isTween = true; }
                this._isInTouch = true;
                var temp = this._dataList[0];
                var last = this._dataList.pop();
                last.x = temp.x - (this._itemWidth + this._interval);
                this._dataList.unshift(last);
                var dist = this._itemWidth + this._interval;
                for (var i = 0; i < this._dataList.length; i++) {
                    (function (_item, _dist, _isTween) {
                        var tw = egret.Tween.get(_item, { loop: false });
                        var toX = _item.x + _dist;
                        if (_isTween) {
                            tw.to({ x: toX }, 150).call(function () {
                                egret.Tween.removeTweens(_item);
                            });
                        }
                        else {
                            _item.x = toX;
                        }
                    })(this._dataList[i], dist, isTween);
                }
                var self = this;
                if (isTween) {
                    setTimeout(function () {
                        var daterEvent = new burn.event.PageEvent(burn.event.PageEvent.SCROLL_END);
                        daterEvent.scrollType = "right";
                        self.dispatchEvent(daterEvent);
                        self._isInTouch = false;
                        self._isTouchBegin = false;
                    }, 150);
                }
                else {
                    self._isInTouch = false;
                    self._isTouchBegin = false;
                }
            };
            //滑动到上一个位置-左滑
            PageView.prototype.prevPosition = function (isTween) {
                if (isTween === void 0) { isTween = true; }
                this._isInTouch = true;
                var last = this._dataList[this._dataList.length - 1];
                var first = this._dataList.shift();
                first.x = last.x + (this._itemWidth + this._interval);
                this._dataList.push(first);
                var dist = this._itemWidth + this._interval;
                for (var i = 0; i < this._dataList.length; i++) {
                    (function (_item, _dist, _isTween) {
                        var tw = egret.Tween.get(_item, { loop: false });
                        var toX = _item.x - _dist;
                        if (_isTween) {
                            tw.to({ x: toX }, 150).call(function () {
                                egret.Tween.removeTweens(_item);
                            });
                        }
                        else {
                            _item.x = toX;
                        }
                    })(this._dataList[i], dist, isTween);
                }
                var self = this;
                if (isTween) {
                    setTimeout(function () {
                        var daterEvent = new burn.event.PageEvent(burn.event.PageEvent.SCROLL_END);
                        daterEvent.scrollType = "left";
                        self.dispatchEvent(daterEvent);
                        self._isInTouch = false;
                        self._isTouchBegin = false;
                    }, 150);
                }
                else {
                    self._isInTouch = false;
                    self._isTouchBegin = false;
                }
            };
            //滑动到指定页
            PageView.prototype.gotoPage = function (idx) {
                if (idx <= this.getVos().length && idx > 2) {
                    for (var i = 2; i < idx; i++) {
                        this.prevPosition(false);
                    }
                }
                else if (idx < 2 && idx >= 1) {
                    this.nextPosition(false);
                }
            };
            //return the data list.
            PageView.prototype.getVos = function () {
                return this._dataList;
            };
            //Get the visible item list.
            PageView.prototype.getVisibleItems = function () {
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
            PageView.prototype.destroy = function () {
                this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
                // this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
            };
            return PageView;
        }(egret.DisplayObjectContainer));
        display.PageView = PageView;
        __reflect(PageView.prototype, "burn.display.PageView", ["burn.base.IDestory"]);
    })(display = burn.display || (burn.display = {}));
})(burn || (burn = {}));
//# sourceMappingURL=PageView.js.map