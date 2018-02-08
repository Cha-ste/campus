package ocean.collection;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * list 有序可重复的集合
 */
public class ListTest {
	public static void main(String[] args) {
		//当没有给定类型的时候，list可以存放所有类型的对像
		List list = new ArrayList();
		StudentObject student = new StudentObject("jack","103902349");
		list.add("string");
		list.add(student);
		System.out.println(list.size());
		System.out.println(list.get(0));
		StudentObject student1;
		student1 = (StudentObject)list.get(1);
		System.out.println(student1.getName());
		System.out.println(student1.getTell());
		
		Iterator<ArrayList> iterator = list.iterator();
		while(iterator.hasNext())
		{
			System.out.println(iterator.next());
		}
	}
}
