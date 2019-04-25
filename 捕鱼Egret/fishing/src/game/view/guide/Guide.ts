module two {
	export class Guide extends egret.DisplayObjectContainer{
		public constructor() {
			super();
		}

		/**
		 * dp 确保已经定位并且没有加入到显示列表中。
		 */
		public init(dp:egret.DisplayObject, w:number, h:number):void {
			let container:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();

			let bg:egret.Shape = new egret.Shape();
			bg.graphics.beginFill(0x000000, 0.5);
			bg.graphics.drawRect(0, 0, w, h);
			bg.graphics.endFill();

			container.addChild(bg);

			container.addChild(dp);

			dp.blendMode = egret.BlendMode.ERASE;

			let renderTexture:egret.RenderTexture = new egret.RenderTexture();
			renderTexture.drawToTexture(container);

			let bitmap:egret.Bitmap = new egret.Bitmap(renderTexture);
			this.addChild(bitmap);
		}
	}
}