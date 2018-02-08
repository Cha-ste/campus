package com.ocean.model;

import java.util.UUID;

/**
 * 班级实体类
 *
 * @author Ocean
 */

public class Clazz {
    private String classNo;
    private String className;
    private String pNo;
    private String instituteNo;

    public String getClassNo() {
        return classNo;
    }

    public void setClassNo(String classNo) {
        this.classNo = classNo;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getpNo() {
        return pNo;
    }

    public void setpNo(String pNo) {
        this.pNo = pNo;
    }

    public String getInstituteNo() {
        return instituteNo;
    }

    public void setInstituteNo(String instituteNo) {
        this.instituteNo = instituteNo;
    }


    public Clazz(String className, String pNo, String instituteNo) {
        this.classNo = UUID.randomUUID().toString();
        this.className = className;
        this.pNo = pNo;
        this.instituteNo = instituteNo;
    }

    public Clazz() {

    }

}
