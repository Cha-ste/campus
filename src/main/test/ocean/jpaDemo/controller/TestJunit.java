package ocean.jpaDemo.controller;

import ocean.jpaDemo.entity.Person;
import ocean.jpaDemo.entity.Type;
import ocean.jpaDemo.entity.Worker;
import org.apache.log4j.Logger;
import org.junit.Test;
import redis.clients.jedis.Jedis;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class TestJunit {

    private Logger logger = Logger.getLogger(getClass().getName());

    public static void main(String[] args) {
        Person person = new Person();
        Worker worker = new Worker();

        System.out.println(person instanceof Worker);
        System.out.println(worker instanceof Person);
        nothing();
        noReturn(9);
    }

    private static void nothing() {
        System.out.println("python, you have want to learn for a long time, but now, you have nothing");
        System.out.println("java is a travel, hoping study is a good tool please persist to do" + "");
    }

    public static void noReturn(int param) {
        if (param > 5) {
            return;
        }
        System.out.println("一个人简单点");
    }

    @Test
    public void upset() {
        System.out.println("类名冲突，所以Junit无法使用");
    }

    @Test
    public void TestType() {
        Type type = new Type<String>();
        type.setData(new BigDecimal(100));
        System.out.println("type:" + type.getData().getClass());
        type.setData(100);
        System.out.println("type:" + type.getData().getClass());
        System.out.println(type.getData());
        System.out.println("在真正传参的时候，才能确定类型是什么");

        Type<String> stringType = new Type<String>();
//        stringType.setData(10);
        stringType.setData("在创建时确定对象的类型");
        System.out.println(stringType.getData());

    }

    public <T> T testType(Class<T> object) {

        T obj = null;
        try {
            Class<?> aClass = Class.forName(object.getName());
            Field[] declaredFields = aClass.getDeclaredFields();
            obj = (T) aClass.newInstance();
            for (Field field : declaredFields) {
                System.out.println(field.getName());
                System.out.println("-------------------------------");
                Annotation[] declaredAnnotations = field.getDeclaredAnnotations();
                for (Annotation annotation : declaredAnnotations) {
                    System.out.println(annotation.equals("baLa"));
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return obj;
    }

    @Test
    public void test1() {
        testType(Worker.class);
    }

    @Test
    public void collection() {
        Map<String, String> map = new HashMap<String, String>();
        map.put("first", "xiaMing");

        for (Map.Entry<String, String> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " : " + entry.getValue());
        }


        List<String> list = new ArrayList<String>();
        list.add("FirstBlood");
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }

    @Test
    public void testTranslate() {
//        Object object = 0.22;
//        Object obj = 2;
//        String number = "2";
//        Integer integer = 2;
////        System.out.println((BigDecimal) object);
//
//        System.out.println((double)integer );
//        System.out.println(Double.valueOf(2));
//        System.out.println(Double.valueOf("2"));
//        new BigDecimal(Double.valueOf("0"));
//        List list = new ArrayList<Number>();
//        list.add(12);
//        List<String> stringList = list;
//        System.out.println(stringList.get(0));

        System.out.println(BigInteger.ONE.compareTo(new BigInteger("1")));
    }


    @Test
    public void LoggerTest() {
        //log4j需要和Spring或者Junit结合，才能使用？？？？结果是Nop，只要加一个配置文件，就能使用者东西打印log了
        //那么，log4j是用来打印什么信息的呢？如何将报错信息打印出来？
        logger.info("is so easy, so don't afraid to try something you haven't understood");
        TestJunit.InnerClass innerClass = new TestJunit.InnerClass();
        int a = 1/0;
        System.out.println(a);
        innerClass.changeName("heaven");
        System.out.println(innerClass.getOutClassName());

        System.out.println();
    }

    //哪里可以用到成员内部类

    private String name = "Ocean";
    class InnerClass{
        public void changeName(String newName){
            name = newName;
        }

        public String getOutClassName(){
            return name;
        }
    }

    @Test
    public void redisTest(){
        Jedis jedis = new Jedis("localhost");
        System.out.println("如果Redis服务没开，报错");

        jedis.set("name", "ocean");
        System.out.println(jedis.get("name"));

        jedis.lpush("aim", "learning", "keep fit", "travel", "playing");
        List<String> list = jedis.lrange("aim", 5, 9);
        for (String value : list) {
            System.out.println(value);
        }
        System.out.println("如果结束的参数超过了list的长度，会重头开始下一次循环");
    }

    @Test
    public void redisListTest(){
        Jedis jedis = new Jedis("localhost");

        jedis.lpush("aim", "learning", "keep fit", "travel", "playing");
        List<String> list = jedis.lrange("aim", 0, 6);
        for (String value : list) {
            System.out.println(value);
        }
        System.out.println("顺序相反——有序");
    }

    @Test
    public void addKey(){
        Jedis jedis = new Jedis("localhost");

        jedis.set("a", "address");
        jedis.set("b", "bottom");
    }

    @Test
    //定时器
    public void timerTest(){

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        try {
            Date time = format.parse("2018-01-23 14:38:30");
            Timer timer = new Timer();
            System.out.println(time);

            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    System.out.println("inner class drink");
                }
            }, time, 3000L);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testPointer(){
        String s = new String("hello");
        String s1 = s;
        s = null;
        System.gc();
        System.out.println(s1);
    }


}
