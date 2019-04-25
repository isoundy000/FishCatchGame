//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;

    protected createChildren(): void {
        super.createChildren();    
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //WEBGL 跨域支持相关设置
        egret.ImageLoader.crossOrigin = "anonymous";
        // egret.setTimeout(() => {
            //初始化Resource资源加载库
        CONFIG.RES_PATH_PREFIX = window["FISHING_CONFIG"]["RES_Prefix"];
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onFirstComplete, this);

        let resPath = "resource/default.res.json";
        if (CONFIG.LANGUAGE == LanguageType.TW_Chinese) {
            resPath = "resource/default_tw.res.json";
        } else if (CONFIG.LANGUAGE == LanguageType.English) {
            resPath = "resource/default_en.res.json";
        }

        RES.loadConfig(CONFIG.RES_PATH_PREFIX + resPath, CONFIG.RES_PATH_PREFIX + "resource/");
        // }, this, 100);
        //处理平台传递过来的参数
        let platformId = CONFIG.PLATFORM_ID;
        if (platformId && Number(platformId) > 0) {
            let param = egret.getOption("param");
            game.platform.PlatformManager.platformParseHandler(Number(platformId), param);
        }
    }

    private onFirstComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onFirstComplete, this);
        //初始化Resource资源加载库
        // RES.getResAsync("loading_jpg", this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
    }

    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configur ation file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onConfigComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。

        // let thmPath = "resource/default.thm.json";
        // if (CONFIG.LANGUAGE == LanguageType.TW_Chinese) {
        //     thmPath = "resource/default_tw.thm.json";
        //     GlobalManager.SkinPath = "fish_skins_tw";
        // } else if (CONFIG.LANGUAGE == LanguageType.English) {
        //     thmPath = "resource/default_en.thm.json";
        //     GlobalManager.SkinPath = "fish_skins_en";
        // }
        let thmPath = "resource/login.thm.json";
        if (CONFIG.LANGUAGE == LanguageType.TW_Chinese) {
            thmPath = "resource/login_tw.thm.json";
            GlobalManager.SkinPath = "fish_skins_tw";
        } else if (CONFIG.LANGUAGE == LanguageType.English) {
            thmPath = "resource/login_en.thm.json";
            GlobalManager.SkinPath = "fish_skins_en";
        }
        let theme = new eui.Theme(CONFIG.RES_PATH_PREFIX + thmPath, this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onLoginThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        //设置加载进度界面 
        let self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Loading.exml", function():void {
            self.loadingView = new LoadingUI();
            self.stage.addChild(self.loadingView);
            self.loadingView.initView();
            RES.loadGroup("login");
        }, this);
    }

    private isLoginThemeLoadEnd: boolean = false;
    /**
     * 登录主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onLoginThemeLoadComplete(): void {
        this.isLoginThemeLoadEnd = true;
        this.createScene();
    }
    
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "login") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene() {
        if(this.isLoginThemeLoadEnd && this.isResourceLoadEnd){
            this.stage.removeChild(this.loadingView);
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "login") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        } else if (event.groupName == "loading") {
        }
    }
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        //初始化框架
        burn.Director.initFramework(this.stage);
        //初始化热云
        game.util.ReyunUtil.init("http://log.reyun.com/receive/rest/");
        //注册model
        this.registModel();
        //初始化音效管理类
        game.util.SoundManager.init();
        //初始化滚屏公告相关组件管理类
        game.util.GCBroadcastManager.init();
        //添加全局监听功能
        this.addGlobalListener();
       
        
        
        //进入登录界面
        let loginView = new LoginView();
        let loginMediator = new LoginMediator(loginView);
        burn.Director.repleaceView(loginMediator);
        //销毁当前UI
        this.loadingView.destroy();
        this.parent && this.parent.removeChild(this);

        
    }

    //注册数据模型
    private registModel():void {
        //注册用户UserModel
        burn.Director.registerModel(UserModel, new UserModel());
        //注册房间RoomModel
        burn.Director.registerModel(RoomModel, new RoomModel());
        //注册Email RoomModel
        burn.Director.registerModel(EmailModel, new EmailModel());
        //注册奖金池LotteryModel
        burn.Director.registerModel(LotteryModel, new LotteryModel);
        //注册任务Model
        burn.Director.registerModel(TaskModel, new TaskModel);
        //注册兑换Model
        burn.Director.registerModel(ExchangeModel, new ExchangeModel());
        //注册活动Model
        burn.Director.registerModel(ActiveModel, new ActiveModel());
    }

    private addGlobalListener():void {
        //添加激活侦听
        this.stage.addEventListener(egret.Event.ACTIVATE, this.activateHandler, this);
        //添加取消激活侦听
        this.stage.addEventListener(egret.Event.DEACTIVATE, this.deactivateHandler, this);
        //监听屏幕翻转动作
        // this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, this.onRotationHandler, this);
        
    }

    private activateHandler():void {
        egret.log("activateHandler");
        if (game.util.SoundManager.getBackgroundMusicState()) {
            game.util.SoundManager.setBackgroundMusicState(true, false);
        }
        if (game.util.SoundManager.getSoundEffectState()) {
            game.util.SoundManager.setSoundEffectState(true, false);
        }
        
    }

    private deactivateHandler():void {
        egret.log("deactivateHandler");
        let bS = game.util.SoundManager.getBackgroundMusicState();
        let eS = game.util.SoundManager.getSoundEffectState();
        game.util.SoundManager.setBackgroundMusicState(false, false);
        game.util.SoundManager.setSoundEffectState(false, false);
        game.util.SoundManager.resetBackgroundMusicState(bS);
        game.util.SoundManager.resetSoundEffectState(eS);
    }

    private onRotationHandler(e:egret.StageOrientationEvent):void {
        
    }

}
