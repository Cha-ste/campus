package com.ocean.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ocean.dao.StudentDao;
import com.ocean.model.Student;

@Service
public class StudentService {
    @Resource
    StudentDao dao;

    /**
     * 添加学生
     *
     * @param student
     */
    public void addStudent(Student student) {
        dao.addStudent(student);
    }


    /**
     * 查询所有学生
     *
     * @return
     */
    public List<Student> selectAll() {
        return dao.selectAll();
    }

    /**
     * 模糊查询学生
     *
     * @param map
     * @return
     */
    public List<Student> selectStudent(Map<String, Object> map) {
        return dao.selectStudent(map);
    }

    /**
     * 返回所有符合条件的学生总数
     *
     * @param map
     * @return
     */
    public int selectTotal(Map<String, Object> map) {
        return dao.selectTotal(map);
    }

    public Student getStudent(String id) {
        return dao.getStudent(id);
    }

    public List<Student> getStudentByClassNo(String classNo) {
        return dao.getStudentByClassNo(classNo);
    }

    public int getTotal(Map<String, Object> map) {
        return dao.getTotal(map);
    }

    /**
     * 更新学生信息
     *
     * @param student
     */
    public void updateStudent(Student student) {
        dao.updateStudent(student);
    }

    /**
     * 删除学生
     *
     * @param studentId
     */
    public void deleteStudent(String studentId) {
        dao.deleteStudent(studentId);
    }


    public List<Student> getStudentByInstituteId(Map<String, Object> map) {
        return dao.getStudentByInstituteId(map);
    }

    public void freezeStudent(String id) {
        dao.freezeStudent(id);
    }

    public void unFreezeStudent(String id) {
        dao.unFreezeStudent(id);
    }

    public Student getStudentByAccount(String account) {
        return dao.getStudentByAccount(account);
    }

    public void updatePassword(Map<String, String> map) {
        dao.updatePassword(map);
    }


    public List<Student> selectStudentInClass(Map<String, Object> map) {

        return dao.selectStudentInClass(map);
    }

    public int getTotalRecord(Map<String, Object> map) {
        return dao.getTotalRecord(map);
    }
}
