package com.ocean.model;

/**
 * 教师实体类
 *
 * @author Ocean
 */
public class Teacher {
    private String id;
    private String teacherNo;
    private String teacherName;
    private String teacherDegree;
    private String teacherTell;
    private String teacherMail;
    private String teacherPicture;
    private String expression;
    private String instituteNo;
    private String password;
    private String status;
    private int order;


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

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

    public String[] getTDegree() {
        if (teacherDegree != null) {
            return teacherDegree.split(",");
        } else
            return null;
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

    public Teacher() {

    }

    public Teacher(String id, String teacherNo, String teacherName, String teacherDegree, String teacherTell,
                   String teacherMail, String teacherPicture, String expression, String instituteNo, String password,
                   int order) {
        this.id = id;
        this.teacherNo = teacherNo;
        this.teacherName = teacherName;
        this.teacherDegree = teacherDegree;
        this.teacherTell = teacherTell;
        this.teacherMail = teacherMail;
        this.teacherPicture = teacherPicture;
        this.expression = expression;
        this.instituteNo = instituteNo;
        this.password = password;
        this.order = order;
    }


}
