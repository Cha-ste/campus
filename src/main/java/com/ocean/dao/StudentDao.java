package com.ocean.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.ocean.model.Student;

@Repository
public interface StudentDao {

    /**
     * 添加学生
     *
     * @param student
     */
    void addStudent(Student student);


    List<Student> selectAll();

    /**
     * 查询学生
     *
     * @param studentName
     * @return
     */
    List<Student> selectStudent(Map<String, Object> map);

    /**
     * 模糊查询时符合条件的学生总数
     *
     * @param map
     * @return
     */
    int selectTotal(Map<String, Object> map);

    /**
     * 修改学生获取的基本信息
     *
     * @param id
     * @return
     */
    Student getStudent(String id);

    /**
     * 根据班级筛选学生
     *
     * @param classNo
     * @return
     */
    List<Student> getStudentByClassNo(String classNo);

    /**
     * 修改学生信息
     *
     * @param student
     */
    void updateStudent(Student student);

    /**
     * 删除学生
     *
     * @param studentId
     */
    void deleteStudent(String studentId);

    /**
     * 查询学院所有学生
     *
     * @param instituteId
     * @return
     */
    List<Student> getStudentByInstituteId(Map<String, Object> map);

    /**
     * 查出学院的总学生人数
     *
     * @param map
     * @return
     */
    int getTotal(Map<String, Object> map);

    /**
     * 冻结
     *
     * @param studentNo
     */
    void freezeStudent(String id);

    /**
     * 解冻
     *
     * @param studentNo
     */
    void unFreezeStudent(String id);

    /*****************************客户端**********************************/
    Student getStudentByAccount(String account);

    void updatePassword(Map<String, String> map);


    List<Student> selectStudentInClass(Map<String, Object> map);

    int getTotalRecord(Map<String, Object> map);
}
