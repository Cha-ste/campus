package com.ocean.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.ocean.model.Clazz;

@Repository
/**
 * 班级
 * @author Ocean
 *
 */
public interface ClassDao {

    /**
     * add a new class
     *
     * @param clazz
     */
    void addClass(Clazz clazz);

    /**
     * 获取某班级基本信息
     *
     * @param clazz
     * @return
     */
    Clazz getClass(String id);

    /**
     * update the class
     *
     * @param clazz
     */
    void updateClass(Clazz clazz);

    /**
     * delete the class
     *
     * @param classNo
     */
    void deleteClass(String classNo);

    /**
     * select the class you want
     *
     * @param key
     * @return
     */
    List<Clazz> selectClass(Map<String, String> map);

    /**
     * 根据课程名称取得有资格上本课程的班级
     *
     * @param courseId
     * @return
     */
    List<Clazz> getClassByCourseId(String courseId);

    /**
     * 获取专业下的所有班级
     *
     * @param courseId
     * @return
     */
    List<Clazz> getClassBypId(String pId);
}
