```java
    /**28. Implement strStr() 
     * @param haystack
     * @param needle
     * @returnint   needle是不是haystack的子串，是的话就返回这个子串
     */
    public int strStr(String haystack, String needle) {
        if (haystack == null || needle == null)
        	return -1;
        if (haystack.length() < needle.length())
        	return -1;
        int hlen = haystack.length();
        int nlen = needle.length();
        for (int i=0; i<=hlen-nlen; i++) {
        	String str = haystack.substring(i, i+nlen);
        	if (str.equals(needle)) {
        		return i;
        	}
        }
        return -1;
    }
```
 每次截取等长字符串，进行比较


数据结构中关于子串的KMP算法
```java
	public int strStr1(String haystack, String needle) {
		for (int i = 0;; i++) {
			for (int j = 0;; j++) {
				if (j == needle.length())
					return i;
				if (i + j == haystack.length())
					return -1;
				if (needle.charAt(j) != haystack.charAt(i + j))
					break;
			}
		}
	}
```