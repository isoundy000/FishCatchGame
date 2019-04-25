module game.util {
	/**
	 * 播放骨骼动画工具类
	 */
	export class BonesUtil {

		//播放狂暴特效
		public static kuangbaoEffct(display:egret.DisplayObject = null, view:RoomView, posX:number, posY:number, pos:number):void{
			let parentView;
			if (display == null) {
				parentView = egret.MainContext.instance.stage;
			} else {
				parentView = display;
			}
			RES.getResAsync("ef_KuangBao_png", (data, key)=>{
				let armature = new egret.Bitmap(data);
				armature.anchorOffsetX = armature.width >> 1;
				armature.anchorOffsetY = armature.height >> 1;
				burn.tools.TweenTools.rotationFan(armature, 300);
				//armature.blendMode = egret.BlendMode.ADD;
				armature.name = "kuangbao" + pos;
				armature.x = posX;
				armature.y = posY;
				parentView.addChild(armature);
			}, this);
			// if (pos > 1) {
			// 	armature.rotation = 180;
			// }
		}
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	}
}