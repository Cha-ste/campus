package ocean.threadAndRunable;

public class Client {

    public static void main(String[] args) {
        testThread();
        testRunnable();
    }

    public static void testThread(){
        ByThread thread = new ByThread();
        thread.start();
        try {
            Thread.sleep(10L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("-------------启动线程，看看有什么事情发生-----------------");
        Thread thread1 = new Thread();
        thread1.start();
    }

    public static void testRunnable(){
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("可以直接将runnable实现作为内部类，节省一个类去继承Thread重写run");
            }
        });
        thread.start();
    }
}
