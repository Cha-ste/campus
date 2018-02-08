package com.ocean.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ocean.dao.ClassDao;
import com.ocean.model.Clazz;

@Service
/**
 *
 * @author Ocean
 *
 */
public class ClassService {
    @Resource
    ClassDao dao;

    public void addClass(Clazz clazz) {
        dao.addClass(clazz);
    }

    public Clazz getClass(String id) {
        return dao.getClass(id);
    }

    public void updateClass(Clazz clazz) {
        dao.updateClass(clazz);
    }

    public void deleteClass(String classNo) {
        dao.deleteClass(classNo);
    }

    public List<Clazz> seleteClass(Map<String, String> map) {
        return dao.selectClass(map);
    }

    public List<Clazz> getClassByCourseId(String courseId) {
        return dao.getClassByCourseId(courseId);
    }

    public List<Clazz> getClassBypId(String pId) {
        return dao.getClassBypId(pId);
    }
}
