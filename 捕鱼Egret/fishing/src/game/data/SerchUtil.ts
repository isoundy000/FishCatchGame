module game.table {
    /**
     * 检表工具,二分查找
     * @author Ojq
     */
	export class SerchUtil {
		public static binary_search(arr: Array<any>, serchKey:string, low: number, high: number, key: number): any {
            if (low > high){
                return null;
            }
            var mid = Math.floor((high + low) / 2);
            if(mid >= arr.length) {
                return null;
            }
            if(arr[mid][serchKey] == key){
                return arr[mid];
            }else if (arr[mid][serchKey] > key){
                high = mid - 1;
                return SerchUtil.binary_search(arr, serchKey, low, high, key);
            }else if (arr[mid][serchKey] < key){
                low = mid + 1;
                return SerchUtil.binary_search(arr, serchKey, low, high, key);
            }
        };
	}
}