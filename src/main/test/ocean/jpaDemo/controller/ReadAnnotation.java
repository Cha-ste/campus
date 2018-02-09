package ocean.jpaDemo.controller;


import ocean.jpaDemo.entity.Person;
import ocean.jpaDemo.entity.TestAnnotation;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class ReadAnnotation {
    public static void main(String[] args) {
        readAnnotation();
    }

    public static void readAnnotation() {
        //反射获取注解(类、属性、方法)
        Class<Person> personClass = Person.class;
        //类
        Annotation[] declaredAnnotations = personClass.getDeclaredAnnotations();
        //属性
        Field[] declaredFields = personClass.getDeclaredFields();
        //方法
        Method[] declaredMethods = personClass.getDeclaredMethods();

        for (Method method : declaredMethods) {
            TestAnnotation annotation = method.getAnnotation(TestAnnotation.class);
            if (annotation != null) {
                System.out.println("type: " + annotation.annotationType().getName());
                System.out.println("what: " + annotation.toString());
                System.out.println("required: " + annotation.required());
                System.out.println("level: " + annotation.levle());
                System.out.println("name: " + annotation.name());
                if (annotation.required()) {
                    System.out.println("do something");
                }
            }
        }

        for (Field field : declaredFields) {
            TestAnnotation annotation = field.getAnnotation(TestAnnotation.class);
            if (annotation != null) {
                System.out.println("required: " + annotation.required());
                System.out.println("what: " + annotation.toString());
                System.out.println("level: " + annotation.levle());
            }
        }

        for (Annotation annotation : declaredAnnotations) {
            System.out.println("type: " + annotation.annotationType());
            System.out.println(annotation.toString());
        }
    }
}
