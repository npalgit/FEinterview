```java
    /**1. Two Sum 
     * @param nums
     * @param target
     * @return 数组中找两个数字，相加等于target
     */
    public int[] twoSum(int[] nums, int target) {
        int[] ret = new int[2];
        for (int i=0; i<nums.length; i++) {
        	for (int j=i+1; j<nums.length; j++) {
        		if (nums[i] + nums[j] == target) {
        			ret[0] = i;
        			ret[1] = j;
        		}
        	}
        }
        return ret;
    }
```
改进
利用hashmap存储数组，key为数组值，value对对应的下标
```java
    public int[] twoSum(int[] nums, int target) {
        int[] ret = new int[2];
        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
        for (int i=0, len=nums.length; i<len; i++) {
        	if (!map.containsKey(target-nums[i])) {
        		map.put(nums[i], i);
        	} else {
        		ret[0] = i;
        		ret[1] = map.get(target-nums[i]);
        	}
        }       
        return ret;
    }
    // beats 45.40%
```

