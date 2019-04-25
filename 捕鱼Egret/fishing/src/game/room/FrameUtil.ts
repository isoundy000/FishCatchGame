module game.util {
    export class FrameUtil {
        //彩盘特效
        public static playCaipan(view:RoomView,roomer:game.model.Roomer,goldNum:number = 0,warId:string = "-1",isWarDead:boolean = false/**是否是炸弹弄死*/):void {
            let pos = roomer.getRoomPos();
            let gunPos1 = view.getRoomUI().getGunPointByPos(pos, view.getIsFlip());
            let gunPos = new egret.Point(gunPos1.x, gunPos1.y);
            gunPos.x += CONFIG.adaptX;
            gunPos.y += CONFIG.adaptY;
			let poY = gunPos.y;
            if (poY > 360) {
                poY = 470 + CONFIG.adaptY;
            } else {
                poY = 250 + CONFIG.adaptY;
            }
            let viewBul = view.getBulletLayer();
            let child = viewBul.getChildByName("caipan" + pos);
            child && viewBul.removeChild(child);
  
            let childNum = viewBul.getChildByName("caipanNum" + pos);
            childNum && viewBul.removeChild(childNum);

            let childMovie = viewBul.getChildByName("movie" + pos);
            childMovie && viewBul.removeChild(childMovie);
            
            let chilGuang = viewBul.getChildByName("caipanGuang" + pos);
            chilGuang && viewBul.removeChild(chilGuang);

            let data = RES.getRes("ef_caipanBg_json");
            let txtr = RES.getRes("ef_caipanBg_png");
            let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
            let movie = new MovieFish(mcFactory.generateMovieClipData("ef_caipanBg"), egret.Event.COMPLETE);	
            movie.initEvent();
			let dataMc:egret.MovieClipData = movie.movieClipData;
			let frameCur = 0;
			let modifyRect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
            movie.frameRate = 14;		
            movie.x = gunPos.x;
            movie.y = poY;
            movie.scaleX = 1.2;
            movie.scaleY = 1.2;
            movie.anchorOffsetX = movie.width / 2 + modifyRect.x;
            movie.anchorOffsetY = movie.height / 2 + modifyRect.y;
            movie.name = "movie" + pos;
            movie.visible = false;
            viewBul.addChild(movie);

            let caipanGuang = null;
            caipanGuang = new egret.Bitmap(RES.getRes("ef_rotation_bg2_png"));	
            caipanGuang.name = "caipanGuang" + pos;
            caipanGuang.anchorOffsetX = caipanGuang.width >> 1;
            caipanGuang.anchorOffsetY = caipanGuang.height >> 1;
            caipanGuang.x = gunPos.x;
            caipanGuang.y = poY;
            caipanGuang.visible = false;
            viewBul.addChildAt(caipanGuang,1);

            let t = 400;
            if (warId == "-1") {
                //处理美术字
                let numFont = new egret.BitmapText();
                
                let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
                let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
                if (roomer.getRoomPos() == pos) {
                    //bitmapNum_1_fnt
                    numFont.font = RES.getRes("bitmapNum_2_fnt");
                    SoundManager.playEffectSound("CoinLightMove");
                    SoundManager.playEffectSound("ubomb");
                } else {
                    //bitmapNum_2_fnt
                    numFont.font = RES.getRes("bitmapNum_1_fnt");
                    SoundManager.playEffectSound("CoinLightMove_o");
                }
                let rate = game.table.T_Config_Table.getVoByKey(30).value;
                if (!isWarDead) {
                    goldNum /= (100 - parseInt(rate)) * 0.01;
                }
                goldNum = Math.floor(goldNum);
                numFont.text = "" + goldNum;
                viewBul.addChildAt(numFont,5);
                numFont.anchorOffsetX = numFont.width/2;
                numFont.anchorOffsetY = numFont.height/2;
                //numFont.scaleX = 0.75;
                //numFont.scaleY = 0.75;
                numFont.x = gunPos.x;
                numFont.y = poY + 4 ;
                numFont.name =  "caipanNum" + pos;

                numFont.scaleX = 0.01;
                numFont.scaleY = 0.01;
                egret.Tween.get( numFont )
                    .to( {scaleX:1.75 ,scaleY:1.75}, 300)
                    .to( {scaleX:0.2 ,scaleY:0.2}, 200)
                    .to( {scaleX:1.2 ,scaleY:1.2}, 200)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t).call(function(){
                        egret.Tween.removeTweens(numFont);
                    }
                );
            } else {
                let str = "warHead_" + warId + "_png";
                let img = new egret.Bitmap(RES.getRes(str));
                viewBul.addChildAt(img, 5);
                img.anchorOffsetX = img.width/2;
                img.anchorOffsetY = img.height/2;
                img.x = gunPos.x;
                img.y = poY - 14;
                img.name =  "caipanNum" + pos;

                img.scaleX = 0.01;
                img.scaleY = 0.01;
                egret.Tween.get( img )
                    .to( {scaleX:1.75 ,scaleY:1.75}, 300)
                    .to( {scaleX:0.2 ,scaleY:0.2}, 200)
                    .to( {scaleX:1 ,scaleY:1}, 200)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t).call(function(){
                        egret.Tween.removeTweens(img);
                    }
                );
            }

            let caipan = null;
            let skinId = roomer.getCurSkinId();
            let vo = game.table.T_Gun_skin_Table.getVoByKey(skinId);
            let caipanUrl = vo.caipanUrl;
            RES.getResAsync(caipanUrl, function():void {
                let txture:egret.Texture = RES.getRes(caipanUrl);
                let icon:egret.Bitmap = new egret.Bitmap(txture);
                if (!icon) {
                    return;
                }
                caipan = icon;	
                caipan.name = "caipan" + pos;
                caipan.anchorOffsetX = caipan.width >> 1;
                caipan.anchorOffsetY = caipan.height >> 1;
                caipan.x = gunPos.x;
                caipan.y = poY;
                viewBul.addChildAt(caipan, 2);

                caipan.scaleX = 0.01;
                caipan.scaleY = 0.01;

                egret.Tween.get(caipan)
                    .to( {scaleX:1.75 ,scaleY:1.75}, 200)
                    .to( {scaleX:0.2 ,scaleY:0.2}, 200)
                    .call(function(){
                        movie.visible = true;
                        movie.gotoAndPlay("play", 1);
                    })
                    .to( {scaleX:1 ,scaleY:1}, 100)
                    .call(function(){
                        caipanGuang.visible = true;
                        burn.tools.TweenTools.rotationFan(caipanGuang,3000);
                    })
                    .to({rotation: 360}, 900)
                    .to({rotation: 720}, 900)
                    .to({rotation: 360 + 360 + 360}, 900)
                    .to({rotation: 360 + 360 + 360 + 360}, 900)
                    .wait(10).call(function(){
                        let child = viewBul.getChildByName("caipan" + pos);
                        if (child) {
                            viewBul.removeChild(child);
                        }
                        let childNum = viewBul.getChildByName("caipanNum" + pos);
                        if (childNum) {
                            viewBul.removeChild(childNum);
                        }
                        let chilGuang = viewBul.getChildByName("caipanGuang" + pos);
                        if (chilGuang) {
                            viewBul.removeChild(chilGuang);
                        }
                        egret.Tween.removeTweens(caipan);
                    }
                );
            }, this);
        }

        ///////////播放葫芦特效////////////////////////////////////////////////////////////////////////////////////////
        public static playHuluEffect(roomerPos:number, uniqId:number, fishId:number, 
                    pathId:number, pathPoint:number, cx:number, cy:number, x:number, y:number,view:RoomView):void {
            let self = view;
            //播放葫芦特效
            let gunPos = RoomUtil.getGunPointByPos(roomerPos, view.getIsFlip());
            if (view.getIsFlip()) {
                x = CONFIG.contentWidth - x;
                y = CONFIG.contentHeight - y;
            }
			let pox1 = gunPos.x;
			let poy1 = gunPos.y;
            if (pox1 < CONFIG.contentWidth/2) {
                pox1 -= 200;
            } else {
                pox1 += 200;
            }
            let isFlip = false;
            if (gunPos.y < CONFIG.contentHeight/2) {
                //反着扔
                isFlip = true;
            }
            let point = new egret.Point(x,y);

            let imageHulu = new egret.Bitmap(RES.getRes("ef_hulu_png"));
            imageHulu.y =  isFlip? 0:720;
            imageHulu.x = pox1;
            imageHulu.name = "hulu";
            imageHulu.anchorOffsetX = imageHulu.width/2;
            imageHulu.anchorOffsetY = imageHulu.height/2;
            self.getBulletLayer().addChild(imageHulu);
            egret.Tween.get( imageHulu)
                .to( {rotation: 270,y: isFlip? 820:-100}, 1000)
                .to( {scale: 1.5, rotation: 540,y: point.y , x : point.x}, 400)
                .call(function(){
                    if (imageHulu == null) {
                        return;
                    }
                    imageHulu.visible = false;
                    egret.Tween.removeTweens(imageHulu);
                    self.getBulletLayer().removeChild(imageHulu);
                    imageHulu = null;

                    let data = RES.getRes("ef_hulu_bomb_json");
                    let txtr = RES.getRes("ef_hulu_bomb_png");
                    let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
                    
                    let animation = new MovieFish(mcFactory.generateMovieClipData("ef_hulu_bomb"), egret.Event.COMPLETE);	
                    animation.initEvent();
                    animation.scaleX = 2.2;
                    animation.scaleY = 2.2;
                    animation.frameRate = 9;
                    animation.gotoAndPlay("play",1);
                    animation.x = point.x;
                    animation.y = point.y;
                    self.getBulletLayer().addChild(animation);
                    game.util.SoundManager.playEffectSound("godlamp_end");
                    setTimeout(function():void {
                        if (uniqId > 0 && fishId > 0 && pathId > 0) {
                            self.addUnitFish(AddFishType.FISH, [uniqId], fishId, pathId, new egret.Point(cx, cy), 0, pathPoint);
                        }
                    }, 500);
                });
        }

        ////////////////////////////////////////////////end/////////////////////////////////////////////

        ////////////////////////////ef_gunPos///////////////////////////////////////////
        public static getEfGunPos():egret.MovieClip {
            let data = RES.getRes("ef_gunPos_json");
			let txtr = RES.getRes("ef_gunPos_png");
			let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
            let caipan = new egret.MovieClip(mcFactory.generateMovieClipData("ef_gunPos"));			
            caipan.gotoAndPlay("play", -1);
            caipan.frameRate = 12;
            return caipan;
        }
        ////////////////////////////////////////////////////////////////////////////////

        //////////////////////////ef_gunPosRage////////////////////////////////////////
        //ef_gunPosRage
        public static getEfGunRagePos():egret.MovieClip {
            let data = RES.getRes("ef_gunPosRage_json");
			let txtr = RES.getRes("ef_gunPosRage_png");
			let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
            let caipan = new egret.MovieClip(mcFactory.generateMovieClipData("ef_gunPosRage"));			
            caipan.gotoAndPlay("play", -1);
            caipan.frameRate = 12;
            return caipan;
        }
        ////////////////////////////////////////////////////////////////////////////////

        //添加金币的+999数字特效
        public static playAddCoinsEff(num:number,pos:egret.Point,display:egret.DisplayObject,userId:number):void {
            let parentView;
			if (display) {
                parentView = display;
			} else {
                parentView = egret.MainContext.instance.stage;
			}
            let container = new egret.DisplayObjectContainer();
			let txtr:egret.Texture = null;
            let img:egret.Bitmap = null;
            //处理美术字
			let numFont = new egret.BitmapText();
            let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
            if(userId == userModel.getUserId()) {
                //bitmapNum_1_fnt
			    numFont.font = RES.getRes("bitmapNum_2_fnt");
                txtr = RES.getRes("bitmap2Add_png");
                img = new egret.Bitmap(txtr);
            } else {
                //bitmapNum_2_fnt
			    numFont.font = RES.getRes("bitmapNum_1_fnt");
                txtr = RES.getRes("bitmap1Add_png");
                img = new egret.Bitmap(txtr);
            }
			img.anchorOffsetY = img.height >> 1;
            container.addChild(img);
            numFont.text = "" + num;
			container.addChild(numFont);
			numFont.anchorOffsetX = 0;
			numFont.anchorOffsetY = numFont.height >> 1;
			numFont.x = img.width;
            container.x = pos.x;
            container.y = pos.y;
			container.anchorOffsetX = container.width >> 1;
			container.anchorOffsetY = container.height >> 1;
            container.cacheAsBitmap = true;
            parentView.addChild(container);

            container.scaleX = 0.01;
            container.scaleY = 0.01;

            egret.Tween.get(container)
                .to( {scaleX: 1.4 , scaleY:1.4 }, 30)
                .to( {scaleX: 1.32 , scaleY:1.32 }, 60)
                .to( {scaleX: 0.96 , scaleY:0.96 }, 180)
                .to( {scaleX: 0.8 , scaleY:0.8 }, 60)
                .to( {scaleX: 0.96 , scaleY:0.96 }, 200)
                .to( {scaleX: 0.8 , scaleY:0.8 }, 200)
                .to( {alpha:0}, 800)
                .call(function(){
                    egret.Tween.removeTweens(container);
                    parentView.removeChild(container);
		        }
            );
        }

        //每个人的金币标签上。显示的+999数字标签
        public static playAddCoinsOnLab(num:number,pos:egret.Point,display:egret.DisplayObject):void {
            let parentView;
			if (display) {
                parentView = display;
			} else {
				parentView = egret.MainContext.instance.stage;
			}
            let container = new egret.DisplayObjectContainer;
			let txtr:egret.Texture = null;
            let img:egret.Bitmap = null;
            //处理美术字
			let numFont = new egret.BitmapText();
            let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
            numFont.font = RES.getRes("bitmapNum_2_fnt");
            txtr = RES.getRes("bitmap2Add_png");
            img = new egret.Bitmap(txtr);
            
			img.anchorOffsetY = img.height >> 1;
            container.addChild(img);
            numFont.text = "" + num;
			container.addChild(numFont);
			numFont.anchorOffsetX = 0;
			numFont.anchorOffsetY = numFont.height >> 1;
			numFont.x = img.width;
            container.scaleX = 0.5;
            container.scaleY = 0.5;
            container.x = pos.x + CONFIG.adaptX;
            container.y = pos.y + CONFIG.adaptY;
			container.anchorOffsetX = container.width >> 1;
			container.anchorOffsetY = container.height >> 1;
            container.cacheAsBitmap = true;
            parentView.addChild(container);

            container.scaleX = 0;
            container.scaleY = 0;

            egret.Tween.get( container )
                .to( {scaleX: 0.7 , scaleY:0.7 }, 600,egret.Ease.quadIn)
                .to( {scaleX: 0.5 , scaleY:0.5 }, 200,egret.Ease.quadInOut).call(function(){
                    egret.Tween.removeTweens(container);
                    parentView.removeChild(container);
		        }
            );

        }

        public static playCaipanTest(view:RoomView, roomer:game.model.Roomer, goldNum:number = 0, 
                                        warId:string = "-1", isWarDead:boolean = false/**是否是炸弹弄死*/):void {
            let pos = roomer.getRoomPos();
            let gunPos1 = view.getRoomUI().getGunPointByPos(pos, view.getIsFlip());
            let gunPos = new egret.Point(gunPos1.x, gunPos1.y);
            gunPos.x += CONFIG.adaptX;
            gunPos.y += CONFIG.adaptY;
			let poY = gunPos.y;
            if (poY > 360) {
                poY = 470 + CONFIG.adaptY;
            } else {
                poY = 250 + CONFIG.adaptY;
            }
            let viewBul = view.getBulletLayer();
            let child = viewBul.getChildByName("caipan" + pos);
            child && viewBul.removeChild(child);
  
            let childNum = viewBul.getChildByName("caipanNum" + pos);
            childNum && viewBul.removeChild(childNum);

            let childMovie = viewBul.getChildByName("movie" + pos);
            childMovie && viewBul.removeChild(childMovie);
            
            let chilGuang = viewBul.getChildByName("caipanGuang" + pos);
            chilGuang && viewBul.removeChild(chilGuang);

            let data = RES.getRes("ef_caipanBg_json");
            let txtr = RES.getRes("ef_caipanBg_png");
            let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
            let movie = new MovieFish(mcFactory.generateMovieClipData("ef_caipanBg"), egret.Event.COMPLETE);	
            movie.initEvent();
			let dataMc:egret.MovieClipData = movie.movieClipData;
			let frameCur = 0;
			let modifyRect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
            movie.frameRate = 14;		
            movie.x = gunPos.x;
            movie.y = poY;
            movie.scaleX = 1.2;
            movie.scaleY = 1.2;
            movie.anchorOffsetX = movie.width / 2 + modifyRect.x;
            movie.anchorOffsetY = movie.height / 2 + modifyRect.y;
            movie.name = "movie" + pos;
            movie.visible = false;
            viewBul.addChild(movie);

            let caipanGuang = null;
            caipanGuang = new egret.Bitmap(RES.getRes("ef_rotation_bg2_png"));	
            caipanGuang.name = "caipanGuang" + pos;
            caipanGuang.anchorOffsetX = caipanGuang.width >> 1;
            caipanGuang.anchorOffsetY = caipanGuang.height >> 1;
            caipanGuang.x = gunPos.x;
            caipanGuang.y = poY;
            caipanGuang.visible = false;
            viewBul.addChildAt(caipanGuang,1);

            let t = 400;
            if (warId == "-1") {
                //处理美术字
                let numFont = new egret.BitmapText();
                
                let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
                let roomModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
                let roomer:game.model.Roomer = roomModel.getRoomerById(userModel.getUserId());
                if (roomer.getRoomPos() == pos) {
                    //bitmapNum_1_fnt
                    numFont.font = RES.getRes("bitmapNum_2_fnt");
                    SoundManager.playEffectSound("CoinLightMove");
                    SoundManager.playEffectSound("ubomb");
                } else {
                    //bitmapNum_2_fnt
                    numFont.font = RES.getRes("bitmapNum_1_fnt");
                    SoundManager.playEffectSound("CoinLightMove_o");
                }
                let rate = game.table.T_Config_Table.getVoByKey(30).value;
                if (!isWarDead) {
                    goldNum /= (100 - parseInt(rate)) * 0.01;
                }
                goldNum = Math.floor(goldNum);
                numFont.text = "" + goldNum;
                viewBul.addChildAt(numFont,5);
                numFont.anchorOffsetX = numFont.width/2;
                numFont.anchorOffsetY = numFont.height/2;
                //numFont.scaleX = 0.75;
                //numFont.scaleY = 0.75;
                numFont.x = gunPos.x;
                numFont.y = poY + 4 ;
                numFont.name =  "caipanNum" + pos;

                numFont.scaleX = 0.01;
                numFont.scaleY = 0.01;
                egret.Tween.get( numFont )
                    .to( {scaleX:1.75 ,scaleY:1.75}, 300)
                    .to( {scaleX:0.2 ,scaleY:0.2}, 200)
                    .to( {scaleX:1.2 ,scaleY:1.2}, 200)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t)
                    .to( {rotation: 20 }, t)
                    .to( {rotation: -20 }, t).call(function(){
                        egret.Tween.removeTweens(numFont);
                    }
                );
            }

            let caipan = null;
            let skinId = roomer.getCurSkinId();
            let vo = game.table.T_Gun_skin_Table.getVoByKey(skinId);
            let caipanUrl = vo.caipanUrl;
            
            RES.getResAsync(caipanUrl, function():void {
                let txture:egret.Texture = RES.getRes(caipanUrl);
                let icon:egret.Bitmap = new egret.Bitmap(txture);
                if (!icon) {
                    return;
                }
                caipan = icon;	
                caipan.name = "caipan" + pos;
                caipan.anchorOffsetX = caipan.width >> 1;
                caipan.anchorOffsetY = caipan.height >> 1;
                caipan.x = gunPos.x;
                caipan.y = poY;
                viewBul.addChildAt(caipan,2);

                caipan.scaleX = 0.01;
                caipan.scaleY = 0.01;

                egret.Tween.get( caipan )
                    .to( {scaleX:1.75 ,scaleY:1.75}, 200)
                    .to( {scaleX:0.2 ,scaleY:0.2}, 200)
                    .call(function(){
                        movie.visible = true;
                        movie.gotoAndPlay("play", 1);
                    })
                    .to( {scaleX:1 ,scaleY:1}, 100)
                    .call(function(){
                        caipanGuang.visible = true;
                        burn.tools.TweenTools.rotationFan(caipanGuang,3000);
                    })
                    .to({rotation: 360}, 900)
                    .to({rotation: 720}, 900)
                    .to({rotation: 360 + 360 + 360}, 900)
                    .to({rotation: 360 + 360 + 360 + 360}, 900)
                    .wait(10).call(function(){
                        let child = viewBul.getChildByName("caipan" + pos);
                        if (child) {
                            viewBul.removeChild(child);
                        }
                        let childNum = viewBul.getChildByName("caipanNum" + pos);
                        if (childNum) {
                            viewBul.removeChild(childNum);
                        }
                        let chilGuang = viewBul.getChildByName("caipanGuang" + pos);
                        if (chilGuang) {
                            viewBul.removeChild(chilGuang);
                        }
                        egret.Tween.removeTweens(caipan);
                    }
                );
            },this);
        }
    }
}