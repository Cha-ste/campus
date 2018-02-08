package com.ocean.pojo;

import org.springframework.stereotype.Component;

/**
 * 公共模块，查询全校教师信息类
 *
 * @author Ocean
 */
@Component
public class TeacherInfo {
    private String teacherNo;            //教工号
    private String teacherName;          //教师姓名
    private String teacherDegree;        //教师学历
    private String teacherTell;          //电话
    private String teacherMail;          //邮箱
    private String teacherPicture;       //相片
    private String expression;           //简介
    private String instituteNo;          //学院号
    private String course;               //课程

    public String getTeacherNo() {
        return teacherNo;
    }

    public void setTeacherNo(String teacherNo) {
        this.teacherNo = teacherNo;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getTeacherDegree() {
        return teacherDegree;
    }

    public void setTeacherDegree(String teacherDegree) {
        this.teacherDegree = teacherDegree;
    }

    public String getTeacherTell() {
        return teacherTell;
    }

    public void setTeacherTell(String teacherTell) {
        this.teacherTell = teacherTell;
    }

    public String getTeacherMail() {
        return teacherMail;
    }

    public void setTeacherMail(String teacherMail) {
        this.teacherMail = teacherMail;
    }

    public String getTeacherPicture() {
        return teacherPicture;
    }

    public void setTeacherPicture(String teacherPicture) {
        this.teacherPicture = teacherPicture;
    }

    public String getExpression() {
        return expression;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public String getInstituteNo() {
        return instituteNo;
    }

    public void setInstituteNo(String instituteNo) {
        this.instituteNo = instituteNo;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    @Override
    public String toString() {
        return "TeacherInfo [teacherNo=" + teacherNo + ", teacherName=" + teacherName + ", teacherDegree="
                + teacherDegree + ", teacherTell=" + teacherTell + ", teacherMail=" + teacherMail + ", teacherPicture="
                + teacherPicture + ", expression=" + expression + ", instituteNo=" + instituteNo + ", course=" + course
                + "]";
    }

    public TeacherInfo(String teacherNo, String teacherName, String teacherDegree, String teacherTell,
                       String teacherMail, String teacherPicture, String expression, String instituteNo, String course) {
        this.teacherNo = teacherNo;
        this.teacherName = teacherName;
        this.teacherDegree = teacherDegree;
        this.teacherTell = teacherTell;
        this.teacherMail = teacherMail;
        this.teacherPicture = teacherPicture;
        this.expression = expression;
        this.instituteNo = instituteNo;
        this.course = course;
    }

    public TeacherInfo() {

    }

}
