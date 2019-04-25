module game.util {
	export class IconUtil {

		/**
		 * 获取头像
		 * url:头像地址
		 * type：头像类型1-圆头像 2-方头像
		 */
		public static getHeadIcon(url:string, callback:Function, type:number = 1):void {
			//设置玩家头像
			let imgLoadHandler = function(evt:egret.Event) {
				let avatar = new egret.DisplayObjectContainer();
				let avatarContainer = new egret.DisplayObjectContainer();
				let bg = new egret.Bitmap(RES.getRes("main_iamge_avaBgR_png"));
				bg.x = bg.y = -6;
				avatar.addChild(bg);
				let loader:egret.ImageLoader = evt.currentTarget;
				let bmd:egret.BitmapData = loader.data;
				let bmp:egret.Bitmap = new egret.Bitmap(bmd);
				bmp.width = bmp.height = 94;
				avatarContainer.addChild(bmp);
				avatar.addChild(avatarContainer);
				callback(avatar);
			}
			let imgLoadErrorHandler = function(evt:egret.Event) {
				RES.getResAsync("TouXiang_2_png", ()=>{
					let avatar = new egret.DisplayObjectContainer();
					let avatarContainer = new egret.DisplayObjectContainer();
					let bg = new egret.Bitmap(RES.getRes("main_iamge_avaBgR_png"));
					bg.x = bg.y = -6;
					avatar.addChild(bg);
					let bmp:egret.Bitmap = new egret.Bitmap(RES.getRes("TouXiang_2_png"));
					bmp.width = bmp.height = 94;
					avatarContainer.addChild(bmp);
					avatar.addChild(avatarContainer);
					callback(avatar);
				}, self);
			}
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			let imgLoader:egret.ImageLoader = new egret.ImageLoader;
			imgLoader.crossOrigin = "anonymous";
			imgLoader.once(egret.Event.COMPLETE, imgLoadHandler, self); 
			imgLoader.once(egret.IOErrorEvent.IO_ERROR, imgLoadErrorHandler, self);
			imgLoader.load(url);
		}

		/** 动态获取图标 */
		public static getIconByIdAsync(type:number, id:number, fun:Function):void {
			if (type == IconType.PROP) {
				let txtr:string = "";
				if (id == 10001) {
					txtr = "common_coins_png";
				} else if (id == 10002) {
					txtr = "common_diamond_png";
				} else if (id == 30002) {
					txtr = "common_fish_ticket_png";
				} else if (id == 10012) {
					txtr = "common_point_ticket_png";
				} else if (id == 10013) {
					txtr = "common_active_icon_png";
				} else {
					let itemVo = game.table.T_Item_Table.getVoByKey(id);
					if (itemVo == null) {
						console.warn("道具[" + id + "]不存在！");
						fun(null);
						return;
					}
					txtr = "goodsicon_" + id +  "_png";
				}
				if (!RES.hasRes(txtr)) {
					console.warn("贴图资源不存在："　+ txtr);
					fun(null);
					return;
				}
				RES.getResAsync(txtr, function():void {
					let txture:egret.Texture = RES.getRes(txtr);
					let img:egret.Bitmap = new egret.Bitmap(txture);
					fun(img);
				}, this);
			} else if (type == IconType.BIG_PROP) {
				let txtr:string = "";
				if (id == 10001) {
					txtr = "common_coins_png";
				} else if (id == 10002) {
					txtr = "common_diamond_png";
				} else if (id == 30002) {
					txtr = "common_fish_ticket_png";
				} else {
					let itemVo = game.table.T_Item_Table.getVoByKey(id);
					if (itemVo == null) {
						console.warn("道具[" + id + "]不存在！");
						fun(null);
						return;
					}
					txtr = "goodsicon_big_" + id +  "_png";
				}
				if (!RES.hasRes(txtr)) {
					console.warn("贴图资源不存在："　+ txtr);
					fun(null);
					return;
				}
				RES.getResAsync(txtr, function():void {
					let txture:egret.Texture = RES.getRes(txtr);
					let img:egret.Bitmap = new egret.Bitmap(txture);
					fun(img);
				}, this);
			} else if (type == IconType.EXCHANGE) {
				// let txtr:string = "";
				// let itemExchangeVo = game.table.T_Exchange_Table.getVoByKey(id);
				// if (itemExchangeVo == null) {
				// 	console.warn("道具[" + id + "]不存在！");
				// 	fun(null);
				// 	return;
				// }
				// txtr = "exchange_" + itemExchangeVo.url +  "_png";
				// if (!RES.hasRes(txtr)) {
				// 	console.warn("贴图资源不存在："　+ txtr);
				// 	fun(null);
				// 	return;
				// }
				// RES.getResAsync(txtr, function():void {
				// 	let txture:egret.Texture = RES.getRes(txtr);
				// 	let img:egret.Bitmap = new egret.Bitmap(txture);
				// 	fun(img);
				// }, this);
			} else if (type == IconType.CHARGE) {
				let txtr:string = "";
				txtr = "charge_" + id +  "_png";
				if (!RES.hasRes(txtr)) {
					console.warn("贴图资源不存在："　+ txtr);
					fun(null);
					return;
				}
				RES.getResAsync(txtr, function():void {
					let txture:egret.Texture = RES.getRes(txtr);
					let img:egret.Bitmap = new egret.Bitmap(txture);
					fun(img);
				}, this);
			} else if (type == IconType.PAO) {
				let txtr:string = "";
				let itemPaoVo = game.table.T_Item_Table.getVoByKey(id);
				if (itemPaoVo == null) {
					console.warn("道具[" + id + "]不存在！");
					fun(null);
					return;
				}
				txtr = "gunsicon_" + id +  "_png";
				if (!RES.hasRes(txtr)) {
					console.warn("贴图资源不存在："　+ txtr);
					fun(null);
					return;
				}
				RES.getResAsync(txtr, function():void {
					let txture:egret.Texture = RES.getRes(txtr);
					let img:egret.Bitmap = new egret.Bitmap(txture);
					fun(img);
				}, this);
			} else if (type == IconType.PAOBG) {
				let txtr:string = "";
				let itemPaoBgVo = game.table.T_Item_Table.getVoByKey(id);
				if (itemPaoBgVo == null) {
					console.warn("道具[" + id + "]不存在！");
					fun(null);
					return;
				}
				txtr = "gunBgsicon_" + id +  "_png";
				if (!RES.hasRes(txtr)) {
					console.warn("贴图资源不存在："　+ txtr);
					fun(null);
					return;
				}
				RES.getResAsync(txtr, function():void {
					let txture:egret.Texture = RES.getRes(txtr);
					let img:egret.Bitmap = new egret.Bitmap(txture);
					fun(img);
				}, this);
			} else if (type == IconType.PAOSHOW) {
				let txtr:string = "";
				let itemPaoBgVo = game.table.T_Item_Table.getVoByKey(id);
				if (itemPaoBgVo == null) {
					console.warn("道具[" + id + "]不存在！");
					fun(null);
					return;
				}
				txtr = "gunShowsicon_" + id +  "_png";
				if (!RES.hasRes(txtr)) {
					console.warn("贴图资源不存在："　+ txtr);
					fun(null);
					return;
				}
				RES.getResAsync(txtr, function():void {
					let txture:egret.Texture = RES.getRes(txtr);
					let img:egret.Bitmap = new egret.Bitmap(txture);
					fun(img);
				}, this);
			} else if (type == IconType.PAO_CLONE) {
				let txtr:string = "";
				let itemPaoVo = game.table.T_Item_Table.getVoByKey(id);
				if (itemPaoVo == null) {
					console.warn("道具[" + id + "]不存在！");
					fun(null);
					return;
				}
				txtr = "gunsiconClone_" + id +  "_png";
				if (!RES.hasRes(txtr)) {
					console.warn("贴图资源不存在："　+ txtr);
					fun(null);
					return;
				}
				RES.getResAsync(txtr, function():void {
					let txture:egret.Texture = RES.getRes(txtr);
					let img:egret.Bitmap = new egret.Bitmap(txture);
					fun(img);
				}, this);
			} else if(type == IconType.CAIPAN) {
				let txtr:string = "";
				txtr = "caipan_" + id +  "_png";
				if (!RES.hasRes(txtr)) {
					console.warn("贴图资源不存在："　+ txtr);
					fun(null);
					return;
				}
				RES.getResAsync(txtr, function():void {
					let txture:egret.Texture = RES.getRes(txtr);
					let img:egret.Bitmap = new egret.Bitmap(txture);
					fun(img);
				}, this);
			} else if(type == IconType.VIP_SHOW) {
				let txtr:string = "";
				txtr = "vip_" + id +  "_png";
				if (!RES.hasRes(txtr)) {
					console.warn("贴图资源不存在："　+ txtr);
					fun(null);
					return;
				}
				RES.getResAsync(txtr, function():void {
					let txture:egret.Texture = RES.getRes(txtr);
					let img:egret.Bitmap = new egret.Bitmap(txture);
					fun(img);
				}, this);
			}
		}
	}
}