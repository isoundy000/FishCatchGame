module game.util {
	export class Language {
		public static getText(key:number):string {
			let lan:table.T_Language = table.T_Language_Table.getVoByKey(key);
			if (lan) {
				if (CONFIG.LANGUAGE == LanguageType.Simp_Chinese) {
					return lan.value;
				} else if (CONFIG.LANGUAGE == LanguageType.TW_Chinese) {
					return lan.value_tw;
				}
				return lan.value;
			} else {
				return "Key:" + key;
			}
		}

		//arr:["1", "我", "zzz"]
		public static getDynamicText(key:number, arr:Array<string>):string {
			let lan:table.T_Language = table.T_Language_Table.getVoByKey(key);
			let text:string = lan.value;
			if (CONFIG.LANGUAGE == LanguageType.Simp_Chinese) {
				text = lan.value;
			} else if (CONFIG.LANGUAGE == LanguageType.TW_Chinese) {
				text = lan.value_tw;
			}
			let len = arr.length;
			if (len > 0) {
				for (let i = 0; i < len; i++) {
					let temp:string = arr[i];
					text = text.replace("{" + i + "}", temp);
				}
			} else {
				return text;
			}
			return text;
		}

		public static getDynamicTextByStr(text:string, arr:Array<string>):string {
			let len = arr.length;
			if (len > 0) {
				for (let i = 0; i < len; i++) {
					let temp:string = arr[i];
					text = text.replace("{" + i + "}", temp);
				}
			} else {
				return text;
			}
			return text;
		}
	}
}