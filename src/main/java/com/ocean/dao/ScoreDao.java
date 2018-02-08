package com.ocean.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.ocean.model.Score;

@Repository
public interface ScoreDao {

    /**
     * 添加班级添加某课程的成绩
     *
     * @param score
     */
    void addScoreForStudent(Score score);

    /**
     * 查询某课程的全部成绩
     *
     * @return
     */
    List<Score> selectScore(Map<String, Object> map);

    /**
     * 获得符合条件的成绩记录条数
     *
     * @param map
     * @return
     */
    int getTotalRecord(Map<String, Object> map);

    /**
     * 修改成绩
     *
     * @param score
     */
    void updateScore(Map<String, Object> map);

    /**
     * 删除指定成绩
     *
     * @param scoreId
     */
    void deleteScore(String id);

    /**
     * 获取成绩基本信息
     *
     * @param id
     * @return
     */
    Score getScore(String id);
}
