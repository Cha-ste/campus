package com.ocean.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ocean.dao.TeacherDao;
import com.ocean.model.Teacher;

@Service
public class TeacherService {
    @Resource
    TeacherDao dao;

    public void addTeacher(Teacher teacher) {
        dao.addTeacher(teacher);
    }

    public void updateTeacher(Teacher teacher) {
        dao.updateTeacher(teacher);
    }

    public int selectTotalRecord(Map<String, Object> map) {
        return dao.selectTotalRecord(map);
    }

    public List<Teacher> selectTeacher(Map<String, Object> map) {
        return dao.selectTeacher(map);
    }

    public Teacher getTeacher(String id) {
        return dao.getTeacher(id);
    }

    public void deleteTeacher(String teacherId) {
        dao.deleteTeacher(teacherId);
    }

    public void freezeTeacher(String teacherId) {
        dao.freezeTeacher(teacherId);
    }

    public void unFreezeTeacher(String teacherId) {
        dao.unFreezeTeacher(teacherId);
    }

    public Teacher getTeacherByAccount(String account) {
        return dao.getTeacherByAccount(account);
    }

    public void updatePassword(Map<String, String> map) {
        dao.updatePassword(map);
    }

    public List<Teacher> getTeacherByInstituteId(String instituteId) {
        return dao.getTeacherByInstituteId(instituteId);
    }

    public Teacher getTeacherByCourseId(String teacherId) {
        return dao.getTeacherByCourseId(teacherId);
    }

    public String getTeacherIds(String courseId) {
        return dao.getTeacherIds(courseId);
    }

}
