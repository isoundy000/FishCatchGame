module game.util {
	export class LoaderUtil {

		/** 根据房间类型获取需要加载的资源列表 */
		public static getFishResByType(type:number):Array<string> {
			let resList:Array<string> = new Array<string>();
			// let vos = game.table.T_Fish_Table.getAllVo();
			// let len = vos.length;
			// for (let i = 0; i < len; i++) {
			// 	if (vos[i].containRoomId.indexOf("" + type) != -1) {
			// 		let name = vos[i].resRunUrl;
			// 		if (name != "" && name != "null") {
			// 			resList.push(name + "_png");
			// 			resList.push(name + "_json");
			// 			if (RES.hasRes(name + "_rect_json")) {
			// 				resList.push(name + "_rect_json");
			// 			}
			// 		}
			// 	}
			// }
			//提前加载背景图片
			resList.push("background_" + type + "_jpg");
			if (CONFIG.isOpenMusic) {
                resList.push("bgm_scene2_mp3");
				resList.push("gunFire_mp3");
            }
			return resList;
		}

		/**
		 * 静默加载队列
		 * type: 1=普通资源，2=资源组，3=exml
		 */
		private static RES_LOGIN_SEQ:Array<any> = [
				{name:"resource/"+ GlobalManager.SkinPath +"/component/newProgressButton.exml", type:3},
				{name:"resource/"+ GlobalManager.SkinPath +"/component/SideProp.exml", type:3},
				{name:"resource/"+ GlobalManager.SkinPath +"/component/FrozenAndLock.exml", type:3},
				{name:"resource/"+ GlobalManager.SkinPath +"/component/UnlockGunGroup.exml", type:3},
				{name:"resource/"+ GlobalManager.SkinPath +"/Gun.exml", type:3},
				{name:"resource/"+ GlobalManager.SkinPath +"/component/WarGroup.exml", type:3},
				{name:"resource/"+ GlobalManager.SkinPath +"/component/ChakanPanel.exml", type:3},
				{name:"frozen_mask_png", type:1}, 
				{name:"ef_caipanBg_png", type:1}, 
				{name:"baofu_png", type:1},
				{name:"ShaYu_png", type:1},
				{name:"dayu_png", type:1},
				{name:"Zhang_Tou_png", type:1},
				{name:"Zhang_Zui_png", type:1},
				{name:"Zhang_ShenTi_1_png", type:1},
				{name:"Zhang_ShenTi_2_png", type:1},
				{name:"ef_baojinbi_png", type:1}
			];
		private static RES_MAIN_SEQ:Array<any> = [
				{name:"fishing", type:2}
			];
		private static RES_FISHING_SEQ:Array<any> = [
				{name:"boss_coming", type:2},
				{name:"common", type:2}
				// {name:"goods_icon", type:2}
			];

		/** 登录界面静默加载 */
		public static startLoginSilentLoad():void {
			LoaderUtil.startSilentLoad(LoaderUtil.RES_LOGIN_SEQ);
		}
		/** 主界面静默加载 */
		public static startMainSilentLoad():void {
			LoaderUtil.startSilentLoad(LoaderUtil.RES_MAIN_SEQ);
		}
		/** 捕鱼界面静默加载 */
		public static startFishingSilentLoad():void {
			LoaderUtil.startSilentLoad(LoaderUtil.RES_FISHING_SEQ);
		}

		/** 静默加载 */
		private static startSilentLoad(loadList:Array<any>):void {
			if (loadList.length <= 0)
				return; 
			let item = loadList.shift();
			if (item.type == 1) {
				RES.getResAsync(item.name, ()=>{
					LoaderUtil.startSilentLoad(loadList);
				}, this);
			} else if (item.type == 2) {
				let onResLoadComplete = function (event:RES.ResourceEvent) {
					if (event.groupName == item.name) {
						RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResLoadComplete, this);
						RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResLoadError, this);
						LoaderUtil.startSilentLoad(loadList);
					}
				}
				let loaderCount = 0;
				let onResLoadError = function (event:RES.ResourceEvent) {
					if (event.groupName == item.name) {
						loaderCount++;
						if (loaderCount < 3) {
							RES.loadGroup(item.name);
						} else {
							RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResLoadComplete, this);
        					RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResLoadError, this);
							LoaderUtil.startSilentLoad(loadList);
						}
					}
				}
				RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResLoadComplete, this);
        		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onResLoadError, this);
				RES.loadGroup(item.name, -1);
			} else if (item.type == 3) {
				EXML.load(CONFIG.RES_PATH_PREFIX + item.name, ()=>{
					LoaderUtil.startSilentLoad(loadList);
				}, this);
			}
		}
	}
}