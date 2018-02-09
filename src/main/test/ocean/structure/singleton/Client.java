package ocean.structure.singleton;

/**
 * 测试恶汉和懒汉模式的单例
 */
public class Client {
    public static void main(String[] args) {
//        testSingletonL();
        testSingletonE();
    }

    private static void testSingletonL() {

        SingletonL singleton = SingletonL.getSingleton();
        SingletonL singleton1 = SingletonL.getSingleton();
        System.out.println("is the same object: " + (singleton == singleton1));

        for (int i = 0; i < 5; i++) {
            Thread thread = new Thread(new Runnable() {
                SingletonL singleton2;

                public void run() {
                    singleton2 = SingletonL.getSingleton();
                    System.out.println("single" + " : " + singleton2.toString());
                }
            });
            thread.start();
        }
    }

    private static void testSingletonE() {
        SingletonE singleton = SingletonE.getInstance();
        SingletonE singleton1 = SingletonE.getInstance();
        System.out.println("is the same object: " + (singleton == singleton1));

        for (int i = 0; i < 5; i++) {
            Thread thread = new Thread(new Runnable() {
                SingletonE singleton2;

                public void run() {
                    singleton2 = SingletonE.getInstance();
                    System.out.println("single" + " : " + singleton2.toString());
                }
            });
            thread.start();
        }

    }
}
