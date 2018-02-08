package ocean.jpaDemo.controller;

import org.junit.Test;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExcutorController {

    /**
     * question： 是什么时候会用到线程池？不知道会有多少线程会创建时
     * 不同的接口需要用到线程池吗？
     * 是否能做到线程池的线程公用？公用，那就要将线程池定义成公共池
     */
    @Test
    public void testExcutor() {
        //单例线程
//        ExecutorService service = Executors.newSingleThreadExecutor();
        //缓存线程池
//        ExecutorService service = Executors.newCachedThreadPool();
        //固定数量线程池
        ExecutorService service = Executors.newFixedThreadPool(10);
        int i = 0;
        while (i++ < 100000) {
            service.submit(new Runnable() {
                public void run() {
                    System.out.println("hello");
                    try {
                        System.out.println("-------------sleeping-------------");
                        Thread.sleep(10L);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            });
            System.out.println("world");
        }
    }
}
