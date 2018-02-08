package com.ocean.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.ocean.model.Teacher;

@Repository
/**
 * 教师模块
 * @author Ocean
 *
 */
public interface TeacherDao {

    /**
     * 添加教师信息
     *
     * @param teacher
     */
    void addTeacher(Teacher teacher);

    /**
     * 修改教师信息
     *
     * @param teacher
     */
    void updateTeacher(Teacher teacher);

    int selectTotalRecord(Map<String, Object> map);

    /**
     * 查找教师信息
     *
     * @param key
     * @return
     */
    List<Teacher> selectTeacher(Map<String, Object> map);

    Teacher getTeacher(String id);

    /**
     * 删除教师信息
     *
     * @param teachreId
     */
    void deleteTeacher(String teacherId);

    /**
     * 冻结教师账号
     *
     * @param teacherNo
     */
    void freezeTeacher(String teacherNo);

    /**
     * 解冻教师账号
     *
     * @param teacherNo
     */
    void unFreezeTeacher(String teacherNo);

    /**
     * 客户端登录
     *
     * @param account
     * @return
     */
    Teacher getTeacherByAccount(String account);

    /**
     * 修改密码
     */
    void updatePassword(Map<String, String> map);

    List<Teacher> getTeacherByInstituteId(String instituteId);

    /**
     * 获取课程的任教老师
     *
     * @param courseId
     * @return
     */
    Teacher getTeacherByCourseId(String teacherId);

    String getTeacherIds(String courseId);

}
