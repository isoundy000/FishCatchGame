module game.util {
	/**
	 * 音效管理类
	 * 
	 */
	export class SoundManager {

		//背景音乐开关状态
		private static _backgroundMusicState:boolean;
		//音效开关状态
		private static _soundEffectState:boolean;
		//音量大小
		private static _volumeValue:number;

		//当前背景音乐
		private static _musicChannel:egret.SoundChannel;
		//当前背景音乐资源名称
		private static _musicName:string;
		//鱼类音效是否加载完成
		public static fishSoundLoadEnd:boolean;
		//特效音效是否加载完成
		public static effectSoundLoadEnd:boolean;
		//UI音效是否加载完成
		public static uiSoundLoadEnd:boolean;

		public constructor() {
			
		}

		//音效管理类初始化
		public static init():void {
			//本地保存的用户习惯可以在这里处理
			SoundManager._backgroundMusicState = true;
			SoundManager._soundEffectState = true;
			SoundManager._volumeValue = 1;
			SoundManager.fishSoundLoadEnd = false;
			SoundManager.effectSoundLoadEnd = false;
			SoundManager.uiSoundLoadEnd = false;
		}
 
		//加载UI音效
		public static loadUISound():void {

		}
		
		//加载捕鱼音效
		public static loadFishSound():void {

		}

		//播放声音
		private static playSound(name:string, loop:number = 1, volume:number = 1):void {
			let sound:egret.Sound = RES.getRes(name);
			if (sound) {
				let channel = sound.play(0, loop);
				channel.volume = volume;
			}
		}

		//播放音效
		public static playSoundEffect(name:string, loop:number = 1):void {
			if (SoundManager._soundEffectState) {
				SoundManager.playSound(name, loop, SoundManager._volumeValue);
			}
		}

		//播放背景音乐
		public static playBackgroundMusic(name:string):void {
			if (SoundManager._backgroundMusicState) {
				if (SoundManager._musicChannel) {
					SoundManager._musicChannel.stop();
				}
				SoundManager._musicName = name;
				let sound:egret.Sound = RES.getRes(name);
				if (sound) {
					SoundManager._musicChannel = sound.play(0, -1);
					SoundManager._musicChannel.volume = SoundManager._volumeValue;
				}
			}
		}

		//设置背景音乐开关
		public static setBackgroundMusicState(state:boolean, showTips:boolean = true):void {
			SoundManager._backgroundMusicState = state;
			if (state) {
				let sound:egret.Sound = RES.getRes(SoundManager._musicName);
				if (sound) {
					SoundManager._musicChannel = sound.play(0, -1);
					SoundManager._musicChannel.volume = SoundManager._volumeValue;
					showTips && game.util.GameUtil.popTips(game.util.Language.getText(62));
				}
			} else {
				this._musicChannel && this._musicChannel.stop();
				showTips && game.util.GameUtil.popTips(game.util.Language.getText(63));
			}
		}
		
		//设置音效开关
		public static setSoundEffectState(state:boolean, showTips:boolean = true):void {
			if(state)
			{
				showTips && game.util.GameUtil.popTips(game.util.Language.getText(60));
			}else
			{
				showTips && game.util.GameUtil.popTips(game.util.Language.getText(61));
			}
			SoundManager._soundEffectState = state;
		}

		//设置音量
		public static setVolume(volume:number):void {
			SoundManager._volumeValue = volume;
			SoundManager._musicChannel.volume = volume;
		}

		public static getBackgroundMusicState():boolean {
			return SoundManager._backgroundMusicState;
		}

		public static getSoundEffectState():boolean {
			return SoundManager._soundEffectState;
		}

		public static resetBackgroundMusicState(s:boolean):void {
			SoundManager._backgroundMusicState = s;
		}

		public static resetSoundEffectState(s:boolean):void {
			SoundManager._soundEffectState = s;
		}

		//播放鱼死亡音效
		public static playFishDeathSound(fishId:number):void {
			let fishVo = game.table.T_Fish_Table.getVoByKey(fishId);
			if (fishVo.sound != "null" && SoundManager.fishSoundLoadEnd) {
				SoundManager.playSoundEffect(fishVo.sound + "_mp3");
			}
		}
		//播放特效音效
		public static playEffectSound(sound:string):void {
			if ( sound != "null" && SoundManager.effectSoundLoadEnd) {
				SoundManager.playSoundEffect(sound + "_mp3");
			}
		}
		//播放UI音效
		public static playUISound(sound:string):void{
			if ( sound != "null" && SoundManager.uiSoundLoadEnd) {
				SoundManager.playSoundEffect(sound + "_mp3");
			}
		}
	}
}