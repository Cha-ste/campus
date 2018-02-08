package com.ocean.model;

import java.util.UUID;

public class Schedule {
    private String id;
    private String courseNo;
    private String courseName;
    private String teacherNo;
    private String teacherName;
    private String classNo;
    private String className;
    private String instituteId;
    private String year;
    private String term;
    private String week;
    private String time;
    private int order;

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
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

    public String getCourseNo() {
        return courseNo;
    }

    public void setCourseNo(String courseNo) {
        this.courseNo = courseNo;
    }

    public String getTeacherNo() {
        return teacherNo;
    }

    public void setTeacherNo(String teacherNo) {
        this.teacherNo = teacherNo;
    }

    public String getClassNo() {
        return classNo;
    }

    public void setClassNo(String classNo) {
        this.classNo = classNo;
    }

    public String getInstituteId() {
        return instituteId;
    }

    public void setInstituteId(String instituteId) {
        this.instituteId = instituteId;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Schedule() {
    }

    public Schedule(String courseNo, String teacherNo, String classNo, String instituteId, String year,
                    String term, String week, String time) {
        this.id = UUID.randomUUID().toString();
        this.courseNo = courseNo;
        this.teacherNo = teacherNo;
        this.classNo = classNo;
        this.instituteId = instituteId;
        this.year = year;
        this.term = term;
        this.week = week;
        this.time = time;
    }

}
