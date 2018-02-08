package com.ocean.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.ocean.model.Course;


/**
 * 给学院添加课程，课程添加可以选择老师，一个课程可以由多个老师任教。
 */
@Repository
/**
 * 课程
 * @author Ocean
 *
 */
public interface CourseDao {
    void addCourse(Course course);

    void updateCourse(Course course);

    void deleteCourse(String courseNo);

    List<Course> selectCourse(Map<String, Object> map);

    int getTotalRecord(Map<String, Object> map);

    List<Course> getCourseByInstituteId(String instituteId);

    void addTeacherForCourse(Map<String, Object> map);

    Course getCourse(String CourseId);
}
