package ocean.collection;

import java.util.ArrayList;
import java.util.List;

public class MyCollection {
	public void test()
	{
		Student student = new Student(){
			int age = 10;
			String name = "xiaoming";
		};
		System.out.println(student);
		List list = new ArrayList();
		list.add("student");
		list.add(student);
	}
}
