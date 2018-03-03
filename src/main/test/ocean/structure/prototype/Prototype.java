package ocean.structure.prototype;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * 原型模式
 * what：相当于复制了一个一样的对象，内容相同，但是hash地址不一样，不会调用对象的构造器，直接通过父类的clone方法，在内存中复制数据
 *      但是这里的复制需要注意：如果没有对基本类型之外的数据，如：数组，集合，对象等进行特殊处理，那clone出来的对象是不会有原来对象中属性的值的，这就是浅拷贝
 *      如果要实现深拷贝，那就要对非基本类型的数据特殊处理
 * how：首先要实现Cloneable接口，虽然该接口里面什么都没有，如果实现，就会抛异常；
 *      然后是重写父类（Object）的clone方法
 * why：原型模式创建对象会比用new关键字创建对象性能高
 * when：需要创建大量相似对象的时候
 */
public class Prototype implements Cloneable {

    private String remark;
    private ArrayList<String> list = new ArrayList<>();

    public Prototype clone(){
        Prototype prototype = null;

        try {
            prototype = (Prototype)super.clone();
            //非基本类型的特殊处理，集合基本都实现并且重写了clone（）
//            prototype.list = (ArrayList)this.list.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return prototype;
    }

    public void option(){
        System.out.println("原型模式：" + this.hashCode() +  " " + remark);
        System.out.println("listLength:" + list.size());
    }

    public void getListContent(){
        for (String str : list){
            System.out.println(str);
        }
    }

    @Test
    public void test(){
        Prototype prototype = clone();
        Prototype prototype2 = clone();

        prototype.option();
        prototype2.option();

        Prototype prototype3 = new Prototype();
        prototype3.setRemark("属性：同样会复制过去吗？");
        ArrayList<String> stringList = new ArrayList<>();
        stringList.add("hello");
        prototype3.setList(stringList);

        Prototype prototype1 = prototype3.clone();

        prototype1.option();
        prototype3.option();
        prototype3.getListContent();

    }


    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public ArrayList<String> getList() {
        return list;
    }

    public void setList(ArrayList<String> list) {
        this.list = list;
    }
}
