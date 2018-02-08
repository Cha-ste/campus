package ocean.other;

public class Equals {
	public static void main(String[] args) {
		String str1 = new String("abc");
		String str2 = new String("abc");
		String str3 = "abc";
		System.out.println(str1==str2);
		System.out.println(str3.equals(str2));
		//一行可以写多条语句
		int a = 1; int b = 5; int c = b + a;
		System.out.println("c = " + c);
	}
}
