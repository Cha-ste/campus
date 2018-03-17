package ocean.threadAndRunable;

import org.junit.Test;

public class ByThread extends Thread{
    @Override
    public void run() {
        System.out.println("我重写了run（）方法，所以我拥有自己的业务");
    }
}
