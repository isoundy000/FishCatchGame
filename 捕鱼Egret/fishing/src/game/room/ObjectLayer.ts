/** 显示鱼的对象层 */
class ObjectLayer extends egret.DisplayObjectContainer {

	private _layer_1:egret.DisplayObjectContainer;
	private _layer_2:egret.DisplayObjectContainer;
	private _layer_3:egret.DisplayObjectContainer;

	public constructor() {
		super();
		this._layer_1 = new egret.DisplayObjectContainer();
		this._layer_2 = new egret.DisplayObjectContainer();
		this._layer_3 = new egret.DisplayObjectContainer();
		this.addChildAt(this._layer_1, 1);
		this.addChildAt(this._layer_2, 2);
		this.addChildAt(this._layer_3, 3);
	}

	/** 添加 */
	public addFishAt(fish:room.actor.FishBase, at:number):void {
		switch (at) {
			case 1:
				this._layer_1.addChildAt(fish, at);
				break;
			case 2:
				this._layer_2.addChildAt(fish, at);
				break;
			case 3:
				this._layer_3.addChildAt(fish, at);
				break;
		}
	}
}