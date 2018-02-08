package com.ocean.model;

import java.util.Map;

/**
 * 课程实体类
 *
 * @author Ocean
 */
public class Course {
    private String courseNo;
    private String courseName;
    private String teacherNo;
    private String teacherName;
    private String instituteId;
    private int order;
    private Teacher[] teachers;

    public Teacher[] getTeachers() {
        return teachers;
    }

    public void setTeachers(Teacher[] teachers) {
        this.teachers = teachers;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getCourseNo() {
        return courseNo;
    }

    public void setCourseNo(String courseNo) {
        this.courseNo = courseNo;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
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

    public String getInstituteId() {
        return instituteId;
    }

    public void setInstituteId(String instituteId) {
        this.instituteId = instituteId;
    }

    public Course(String courseNo, String courseName, String teacherNo, String instituteId) {
        this.courseNo = courseNo;
        this.courseName = courseName;
        this.teacherNo = teacherNo;
        this.instituteId = instituteId;
    }

    public Course() {

    }

}
