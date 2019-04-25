module burn.display {
	/**
	 * Scroll list components.support loop scroll.
	 * @author ituuz
	 * @since 2017.01.19
	 * @link http://www.ituuz.com 
	 */
	export class ScrollView extends egret.DisplayObjectContainer implements burn.base.IDestory{
		//可视区域宽高
		private _viewWidth:number;
		private _viewHeight:number;
		//item宽高
		private _itemWidth:number;
		private _itemHeight:number;
		//item之间的间隔
		private _interval:number;
		//是否是循环滚动
		private _loop:boolean;
		//数据列表
		private _dataList:Array<burn.display.ScrollItem>;

		//列表容器
		private _container:egret.DisplayObjectContainer;
		//上一帧触摸点
		private _prePoint:egret.Point;
		//起始触摸点
		private _beginPoint:egret.Point;

		//操作状态
		private _operaState:number;
		//显示的item数量
		private SHOW_NUMBER:number;

		public constructor() {
			super();
		}

		/**
		 * 初始化滚动视图
		 */
		public init(viewWidth:number, viewHeight:number, itemWidth:number, itemHeight:number, interval:number, loop:boolean = false):void {
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
			let rect:egret.Rectangle = new egret.Rectangle(0, 0, viewWidth, viewHeight);  
			this.mask = rect;
			this.touchEnabled = true;
			//初始化操作状态
			this._operaState = ScrollType.FAST;

			this.SHOW_NUMBER = Math.ceil(viewWidth/(itemWidth + interval));
		}

		/**
		 * Set data source
		 */
		public setData(list:Array<burn.display.ScrollItem>):void {
			this._dataList = list;
			this._container = new egret.DisplayObjectContainer();
			this.addChild(this._container);
			this.sortData();
			this.showView();
		}

		//为方便显示，将最后一个元素放到第一个元素前，准备显示
		private sortData():void {
			let last = this._dataList.pop();
			this._dataList.unshift(last);
		}

		/**
		 * 显示
		 */
		private showView():void {
			
			let initX = -(this._itemWidth + this._interval);
			let initY = 0;
			for (let i = 0; i < this._dataList.length; i++) {
				let item = this._dataList[i];
				this._container.addChild(item);
				item.x = initX;
				item.y = initY;
				initX = initX + this._itemWidth + this._interval;
			}
		}

		private touchBegin(evt:egret.TouchEvent) {
			this._prePoint = new egret.Point(evt.localX, evt.localY);
			this._beginPoint = new egret.Point(evt.localX, evt.localY);
		}

		private touchMove(evt:egret.TouchEvent) {
			let currPoint = new egret.Point(evt.localX, evt.localY);
			if (Math.abs(currPoint.x - this._prePoint.x) > 20 && this._operaState != ScrollType.SLOW) {
				this._operaState = ScrollType.FAST;
			} else {
				this._operaState = ScrollType.SLOW;
				//head-tail handler
				this.sortItem();
				for (let i = 0; i < this._dataList.length; i++) {
					let item = this._dataList[i];
					item.x += currPoint.x - this._prePoint.x;
				}
			}
			this._prePoint = currPoint;
		}

		private sortItem():void {
			 let temp = this._dataList[0];
			 if (temp.x > 0) {
				 let last = this._dataList.pop();
				 last.x = temp.x - (this._itemWidth + this._interval);
				 this._dataList.unshift(last);
			 } else if (temp.x < -(this._itemWidth + this._interval)) {
				 let first = this._dataList.shift();
				 let last = this._dataList[this._dataList.length - 1];
				 first.x = last.x + (this._itemWidth + this._interval);
				 this._dataList.push(first);
			 }
		}

		private touchEnd(evt:egret.TouchEvent) {
			let currPoint = new egret.Point(evt.localX, evt.localY);
			//判断是拖拽还是点击
			if (Math.abs(currPoint.x - this._beginPoint.x) > 20) {
				this.sortItem();
				this.scrollToPos();
			} else {
				let gPoint = this.localToGlobal(currPoint.x, currPoint.y);
				for (let i = 0; i < this._dataList.length; i++) {
					let item = this._dataList[i];			
					if (item.hitTestPoint(gPoint.x, gPoint.y)) {
						item.clicked();
						break;
					}
				}
			}
		}

		//滑动到下一个位置-右滑
		public nextPosition():void {
			let last = this._dataList.pop();
			this._dataList.unshift(last);
			let dist = this._itemWidth + this._interval;
			for (let i = 0; i < this._dataList.length; i++) {
				(function(_item, _dist:number):void{
					let tw = egret.Tween.get(_item, {loop:false});
					let toX = _item.x + _dist;
					tw.to({x:toX}, 150).call(function():void {
						egret.Tween.removeTweens(_item);
					});
				})(this._dataList[i], dist);
			}
			let self = this;
			setTimeout(function(){
				let daterEvent = new burn.event.ScrollEvent(burn.event.ScrollEvent.SCROLL_END);
				self.dispatchEvent(daterEvent);
			}, 170);
		}

		//滑动到上一个位置-左滑
		public prevPosition():void {
			let dist = this._itemWidth + this._interval;
			for (let i = 0; i < this._dataList.length; i++) {
				(function(_item, _dist:number):void{
					let tw = egret.Tween.get(_item, {loop:false});
					let toX = _item.x - _dist;
					tw.to({x:toX}, 150).call(function():void {
						egret.Tween.removeTweens(_item);
					});
				})(this._dataList[i], dist);
			}
			let first = this._dataList.shift();
			this._dataList.push(first);
			let self = this;
			setTimeout(function(){
				let daterEvent = new burn.event.ScrollEvent(burn.event.ScrollEvent.SCROLL_END);
				self.dispatchEvent(daterEvent);
			}, 170);
		}

		//Scroll to the standard position
		private scrollToPos():void {
			let first = this._dataList[0];
			let currX = first.x;
			let move =  currX % (this._itemWidth + this._interval);
			//滑动到就近的对齐点
			if (Math.abs(move) > (this._itemWidth + this._interval)/2) {
				if (move > 0) {
					move = move - (this._itemWidth + this._interval);
				} else {
					move = move + (this._itemWidth + this._interval);
				}
			}
			for (let i = 0; i < this._dataList.length; i++) {
				(function(_item, _dist:number):void{
					let tw = egret.Tween.get(_item, {loop:false});
					let toX = _item.x - _dist;
					tw.to({x:toX}, 100).call(function():void {
						egret.Tween.removeTweens(_item);
					});
				})(this._dataList[i], move);
			}
			let self = this;
			setTimeout(function(){
				let daterEvent = new burn.event.ScrollEvent(burn.event.ScrollEvent.SCROLL_END);
				self.dispatchEvent(daterEvent);
			}, 120);
		}

		//return the data list.
		public getVos():Array<burn.display.ScrollItem> {
			return this._dataList;
		}

		//Get the visible item list.
		public getVisibleItems():Array<burn.display.ScrollItem> {
			let arr = new Array<burn.display.ScrollItem>();
			for (let i = 0; i < this._dataList.length; i++) {
				let item = this._dataList[i];
				if (item.x >= 0 && arr.length <= this.SHOW_NUMBER) {
					arr.push(item);
				}
			}
			return arr;
		}

		//销毁函数
		public destroy():void{
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
		}
	}

	/**
	 * 滚动类型
	 */
	enum ScrollType {
		FAST,	//快速拖拽直接翻页
		SLOW	//
	}
}