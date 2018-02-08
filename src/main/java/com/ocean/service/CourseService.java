package com.ocean.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ocean.dao.CourseDao;
import com.ocean.model.Course;

@Service
public class CourseService {
    @Resource
    CourseDao dao;

    public void addCourse(Course course) {
        dao.addCourse(course);
    }

    public void update(Course course) {
        dao.updateCourse(course);
    }

    public void deleteCourse(String courseNo) {
        dao.deleteCourse(courseNo);
    }

    public List<Course> selectCourse(Map<String, Object> map) {
        return dao.selectCourse(map);
    }

    public int getTotalRecord(Map<String, Object> map) {
        return dao.getTotalRecord(map);
    }

    public List<Course> getCourseByInstituteId(String instituteId) {
        return dao.getCourseByInstituteId(instituteId);
    }

    public void addTeacherForCourse(Map<String, Object> map) {
        dao.addTeacherForCourse(map);
    }

    public Course getCourse(String CourseId) {
        return dao.getCourse(CourseId);
    }
}
