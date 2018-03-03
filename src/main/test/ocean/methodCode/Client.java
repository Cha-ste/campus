package ocean.methodCode;

/**
 * 函数式编程
 */
public class Client {

    public static void main(String[] args) {
        //

        String string = "abcdefg";
        System.out.println("result: " + reverse(string));

    }

    //将字符串顺序倒叙
    public static String reverse(String string) {
        if (string.length() == 0) {
            return string;
        }else {
            return reverse(string.substring(1, string.length())) + string.substring(0, 1);
        }
    }
}
