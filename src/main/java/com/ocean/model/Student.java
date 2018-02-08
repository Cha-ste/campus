package com.ocean.model;

import java.util.UUID;

/**
 * 学生实体类
 *
 * @author Ocean
 */
public class Student {
    private String id;
    private String studentNo;
    private String studentName;
    private String studentTell;
    private String studentMail;
    private String studentPicture;
    private String studentSex;
    private String instituteId;
    private String pId;
    private String pName;
    private String classNo;
    private String className;
    private String password;
    private int order;
    private String status;


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getpName() {
        return pName;
    }

    public void setpName(String pName) {
        this.pName = pName;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentNo() {
        return studentNo;
    }

    public void setStudentNo(String studentNo) {
        this.studentNo = studentNo;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentTell() {
        return studentTell;
    }

    public void setStudentTell(String studentTell) {
        this.studentTell = studentTell;
    }

    public String getStudentMail() {
        return studentMail;
    }

    public void setStudentMail(String studentMail) {
        this.studentMail = studentMail;
    }

    public String getStudentPicture() {
        return studentPicture;
    }

    public void setStudentPicture(String studentPicture) {
        this.studentPicture = studentPicture;
    }

    public String getStudentSex() {
        return studentSex;
    }

    public void setStudentSex(String studentSex) {
        this.studentSex = studentSex;
    }

    public String getClassNo() {
        return classNo;
    }

    public void setClassNo(String classNo) {
        this.classNo = classNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getInstituteId() {
        return instituteId;
    }

    public void setInstituteId(String instituteId) {
        this.instituteId = instituteId;
    }

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }


    public Student(String studentNo, String studentName, String studentTell, String studentMail,
                   String studentPicture, String studentSex, String instituteId, String pId, String classNo,
                   String password) {
        this.id = UUID.randomUUID().toString();
        this.studentNo = studentNo;
        this.studentName = studentName;
        this.studentTell = studentTell;
        this.studentMail = studentMail;
        this.studentPicture = studentPicture;
        this.studentSex = studentSex;
        this.instituteId = instituteId;
        this.pId = pId;
        this.classNo = classNo;
        this.password = password;
    }

    public Student() {

    }


}
