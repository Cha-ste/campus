package com.ocean.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 日志需求：
 * 凡是对数据库有修改的操作都应该记录下来（增加、修改、删除）
 * 如何区分这些操作：规定增加前缀add，修改前缀update，删除前缀delete（命名规范）
 * 如何区分是对哪一个角色类型进行的操作：每一个角色定义一个切面？比如student的如下：增删改；然后在配置文件配置n个aop：config
 * 操作内容参数如何传递：比如：管理员1添加了一个学生，那么这个管理员1和学生，怎么传到切面去？通过代理对象获取参数？
 * 参数判断后设置角色名；参数获取agrs[]
 * 获取参数，存储信息
 *
 * @author Ocean
 */
public class StudentAspect {

    /**
     * 添加日志eg:**添加了**
     *
     * @param admin
     * @param role  这个角色怎么确定，之后怎么取值
     */
    public void afterAdd(/*String studentName*/) {
        String admin = "管理员1";
        System.out.println("-------------after the add option---------------");
        //添加操作时间
        //操作内容
//		String option = "添加了 "+studentName;
        Date time = new Date();
        SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String date = f.format(time).toString();
        //文件操作。。。。。。
//		LogSaving.save(admin,option,date);
    }

    //修改日志 eg： ** 修改了 **
    public void afterUpdate() {
        System.out.println("-------------------after the update option----------------------");
    }

    //删除日志 eg： ** 删除了 **
    public void afterDelete() {
        System.out.println("-------------------after the delete option----------------------");
    }
}
