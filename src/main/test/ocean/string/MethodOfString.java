package ocean.string;

/**
 * Created by Ocean on 2017/9/15.
 */
public class MethodOfString {
    private static String source = "goAheadAndDoNotStop,youWillMakeGreatProgress";

    public static void main(String[] args) {
        copy(source);
    }

    public static void copy(String str) {
        for (int i = 0; i < str.length(); i++) {
            System.out.print(i + ":" + str.charAt(i) + "  ");
        }
        System.out.println("");
        System.out.println("截取字符串（从第几个开始，直到第几个）:" + str.substring(10, 19));
        System.out.println("a在目标字符串内最后出现的位置：" + str.lastIndexOf("a"));
        System.out.println("目标字符串的二进制对象：" + str.getBytes());
        System.out.println("在末尾拼接字符串：" + str.concat("abc"));
        System.out.println("返回一个字符串的正则表示:" + str.intern());
        System.out.println("来我们测试一波：" + "aaaaaa".intern() + "    没测试出来");
        System.out.println("替代字符串" + str.replace("Stop", "Quit"));
        String str2 = "abc";
        String str3 = "abc";
        System.out.println("比较两个字符串是否相等" + str2.matches(str3));
    }
}