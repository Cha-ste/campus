package com.ocean.model;

import java.util.UUID;

/**
 * 成绩实体类
 *
 * @author Ocean
 */
public class Score {
    private String id;
    private String courseId;
    private String courseName;
    private String scheduleId;
    private String pScore;
    private String examScore;
    private String totalScore;
    private String studentNo;
    private String studentName;
    private String classNo;
    private String className;
    private String instituteId;
    private int order;

    public Score(String courseId, String scheduleId, String pScore, String examScore, String studentNo,
                 String studentName, String classNo, String instituteId) {
        this.id = UUID.randomUUID().toString();
        this.courseId = courseId;
        this.scheduleId = scheduleId;
        this.pScore = pScore;
        this.examScore = examScore;
        this.studentNo = studentNo;
        this.studentName = studentName;
        this.classNo = classNo;
        this.instituteId = instituteId;
    }

    public Score() {
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
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

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId;
    }

    public String getpScore() {
        return pScore;
    }

    public void setpScore(String pScore) {
        this.pScore = pScore;
    }

    public String getExamScore() {
        return examScore;
    }

    public void setExamScore(String examScore) {
        this.examScore = examScore;
    }

    public String getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(String totalScore) {
        this.totalScore = totalScore;
    }

    public String getStudentNo() {
        return studentNo;
    }

    public void setStudentNo(String studentNo) {
        this.studentNo = studentNo;
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

}
