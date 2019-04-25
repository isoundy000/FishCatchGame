module game.util {
	export class FilterEnmu {
		public static GRAY = [
				0.3,0.6,0,0,0,
				0.3,0.6,0,0,0,
				0.3,0.6,0,0,0,
				0,0,0,1,0
			];

		public static LESS_LIGTH = [
				1,0,0,0,0,
				0,1,0.25,0,0,
				0,50,1,0,0,
				0,0,0,1,0
			];

		public static LIGHT = [
				1,0,0,0,100,
				0,1,0,0,100,
				0,0,1,0,100,
				0,0,0,1,0
			];

		public static DARK = [
				1,0,0,0,-40,
				0,1,0,0,-40,
				0,0,1,0,-40,
				0,0,0,1,0
			];

		public static RED = [
				1,0,0,0,100,
				0,1,0,0,0,
				0,0,1,0,0,
				0,0,0,1,0
			];

		public static FISH_TYPE_1 = [
				1,0,0,0,0,
				0,0.45,0.0,0,0,
				0,0,0.45,0,0,
				0,0,0,1,0
			];

		public static FISH_TYPE_2 = [
				1.3,0,0,0,160,
				0,0.45,0,0,0,
				0,0,0.45,0,0,
				0,0,0,1,0
			];
		public static FISH_TYPE_MATRIX_1 = 1;
		public static FISH_TYPE_MATRIX_2 = 2;
	}
}