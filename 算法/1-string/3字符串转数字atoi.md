```java
    /**8. String to Integer (atoi) 
     * @param str
     * @returnint 字符串->数字
     */
	   public int myAtoi(String str) {
	        if (str == null || str.length() == 0)
	        	return 0;
	        boolean negetive = true;
	        boolean start = false;
	        double ret = 0;
	        for (int i=0, len=str.length(); i<len; i++) {
	        	char ch = str.charAt(i);
	        	if (!start && ch == '-') {
	        		start = true;
	        		negetive = false;
	        	} else if (!start && ch == '+') {
	        		start = true;
	        		negetive = true;
	        	}else if (!start && ch == ' '){
	        		continue;
	        	}else if (!(ch>='0' && ch<='9')) {      		
	        		break;
	        	}else {
	        		start = true;
	        		ret = ret*10 + (ch-'0');
	        	}
	        }
	        ret = negetive? ret: -ret;
	        if (negetive && ret > Integer.MAX_VALUE) {
	            return Integer.MAX_VALUE;
	        }else if (!negetive && ret < Integer.MIN_VALUE) {
	        	return Integer.MIN_VALUE;
	        }
	        return (int)ret;
	    }
```

**考虑因素：+-，空额，溢出，不考虑E**
"   -+00123 23"
解决办法：使用double双精度存储结果，最后和最大值最小值比较