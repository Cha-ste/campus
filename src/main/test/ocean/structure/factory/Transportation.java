package ocean.structure.factory;

/**
 * 交通工具抽象接口
 * 将所有具体的交通工具共同的方法和属性提取到该类中
 */
public interface Transportation {

    void move();

    void park(String address);

    void show();
}
