package ocean.other;

/**
 * Created by Ocean on 2017/6/10.
 */
public class CombinationAndExtends {
    public static void main(String[] args) {

        Combination c = new Combination();
        c.sport();
        c.getT().setName("jack");
        System.out.println("------------------------");
        MyExtends myExtends = new MyExtends();
        myExtends.sing();
        System.out.println("----------------------------");


    }
}

class Combination{

    private Test t = new Test();
    public void sport(){
        t.run();
        System.out.println("and at the same time, i am singing");
    }

    public Test getT() {
        return t;
    }

    public void setT(Test t) {
        this.t = t;
    }
}

class MyExtends extends Test{
    private String age;


    public void sing(){
        run();
        System.out.println("i am singing");
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }
}

class Test{
    private String name;
    private String sex;

    public void run(){
        System.out.println("i am running");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
