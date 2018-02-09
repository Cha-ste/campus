package ocean.structure.factory;

import org.junit.Test;

/**
 * 工厂模式
 *
 * 在任何需要生成复杂对象的地方，都可以用到工厂方法
 */

public class Main {

    /**
     * 简单工厂模式：创建型模式
     * 传递不同的参数，返回不同的实体，这就是工厂的作用
     * 创建对象和对象的使用分离
     */
    @Test
    public void testSimpleFactory() {
        Jeep jeep = (Jeep) TransportationFactory.createTransportation("jeep");
        if (jeep == null){
            System.out.println("the transportation you want is not support");
        }else {
            jeep.move();
            jeep.park("GuangZhou");
            jeep.recharge();
        }
        Bike bike = (Bike) TransportationFactory.createTransportation("bike");
        if (bike == null){
            System.out.println("the transportation you want is not support");
        }else {
            bike.move();
            bike.park("street");
        }

        Transportation transportation = TransportationFactory.createTransportation("jeep");
        if (transportation == null){
            System.out.println("the transportation you want is not support");
        }else {
            transportation.move();
            transportation.park("HonKong");
        }
    }

    /**
     * 工厂方法模式
     *
     * 此处是两个抽象：工厂的抽象， 生产对象的抽象
     * 也许是我还没完全理解，这里又回到了创建对象和使用对象耦合到一起了
     */
    @Test
    public void testFactory(){
        TransportationFactoryInterface factory = new TransportationCreator();
        Transportation transportation = factory.createDelicately();
        transportation.show();
    }
}
