```java
    /**16. 3Sum Closest
     * @param nums
     * @param target
     * @return 找到3个数，相加最接近target
     */
    public int threeSumClosest(int[] nums, int target) {
    	Arrays.sort(nums);
    	
    	int close = nums[0] + nums[1] + nums[2];
    	for (int i=0, len= nums.length; i<=len-3; i++) {
    		int low = i+1;
    		int high = len-1;
    		while (low < high) {
    			int sum = nums[i] + nums[low] + nums[high];
    			if (Math.abs(sum-target)==0){
    				return sum;
    			} 
    			if (Math.abs(sum-target) < Math.abs(close-target)) {
    				close = sum;
    			} 
    			if (sum > target)
    				high--;
    			else 
    				low++;
    		}
    	}
    	return close;
    }
    //beats 46.37%
```