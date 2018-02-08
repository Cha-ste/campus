package com.ocean.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ocean.model.Institute;

@Repository
/**
 * 学院接口
 * @author Ocean
 *
 */
public interface InstituteDao {

    /**
     * 查询所有学院
     *
     * @return
     */
    List<Institute> selectInstitute();

    /**
     * 添加学院
     *
     * @param institute
     */
    void addInstitute(Institute institute);

    /**
     * 修改学院
     *
     * @param institute
     */
    void updateInstitute(Institute institute);

    /**
     * 删除学院
     *
     * @param id
     */
    void deleteInstitute(String id);

}