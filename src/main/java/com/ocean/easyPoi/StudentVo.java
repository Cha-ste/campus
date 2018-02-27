package com.ocean.easyPoi;

import org.jeecgframework.poi.excel.annotation.Excel;

public class StudentVo {

    @Excel(name = "学号")
    String studentNo;
    @Excel(name = "班级")
    String className;
    @Excel(name = "性别")
    String sex;

    public String getStudentNo() {
        return studentNo;
    }

    public void setStudentNo(String studentNo) {
        this.studentNo = studentNo;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
