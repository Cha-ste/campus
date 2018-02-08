package ocean.collection;

import java.util.LinkedList;
import java.util.Queue;

/**
 * Created by Ocean on 2017/10/29.
 */
public class MyQueue {

    public static void main(String[] args) {
        Queue queue = new LinkedList();
        queue.add(new String("one"));
        queue.add(new String("two"));
        while (!queue.isEmpty()) {
            System.out.println(queue.peek());
            queue.remove();
        }
    }
}
