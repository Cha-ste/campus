package com.ocean.util;

import java.io.File;

/**
 * 日志存储
 * 需求：把所有日志存放到一个文件里面，每一个操作换行
 * 问题：文件的位置；每次重启Tomcat是否要重新建立一个新的文件
 *
 * @author Ocean
 */
public class LogSaving {

    //每次Tomcat启动，新建一个TXT文件（类加载）
    final static String path = "C://log/" + System.currentTimeMillis() + ".txt";

    public static void loginLog(String amind, Object role, String date) {
        File logFile = new File(path);

    }
}
