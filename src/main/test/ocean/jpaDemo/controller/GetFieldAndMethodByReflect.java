package ocean.jpaDemo.controller;

import ocean.jpaDemo.entity.Person;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class GetFieldAndMethodByReflect {
    public static void main(String[] args) {
        getField(Person.class);
        getMethod(Person.class);
    }

    public static void getField(Class<?> tClass){
        Field[] declaredFields = tClass.getDeclaredFields();
        for (Field field : declaredFields){
            System.out.println("name: " + field.getName());
            System.out.println("type: " + field.getGenericType().toString());
        }

    }

    public static void getMethod(Class<?> tClass){
        Method[] declaredMethods = tClass.getDeclaredMethods();
        try {
            Person person = (Person) tClass.newInstance();
            for (Method method : declaredMethods){
                if (method.getName().equals("setFirstName"))
                    method.invoke(person, "Mr");
                if (method.getName().equals("setLastName"))
                    method.invoke(person, "Ocean");
            }
            System.out.println("--------------------------------------------------");
            System.out.println(person.getFirstName() + " " + person.getLastName());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
