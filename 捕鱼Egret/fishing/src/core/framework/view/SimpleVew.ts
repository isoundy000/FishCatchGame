module burn.view {
	export class SimpleVew extends ViewBase {
		public constructor() {
			super();
		}

		public removeFromParent():void {
			this.removeChildren();
			this.parent && this.parent.removeChild(this);
		}
	}
}