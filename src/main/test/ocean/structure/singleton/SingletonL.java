package ocean.structure.singleton;

/**
 * 单例模式
 * 私有化构造器，提供对象获取方法
 * 恶汉模式：编译时就创建该对象
 * 懒汉模式：使用时才创建
 */
//懒汉模式
public class SingletonL {
    private static SingletonL instance;
    private SingletonL(){}
    synchronized public static SingletonL getSingleton()
    {
        if(instance == null)
        {
            instance = new SingletonL();
        }
        /*try {
            Thread.sleep(1000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/
        return instance;
    }
}

/**
 * 恶汉模式
 */
class SingletonE {
    private static SingletonE instance;
    static {
        instance = new SingletonE();
    }

    public static SingletonE getInstance(){
        try {
            Thread.sleep(1000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return instance;
    }
}

