package com.ocean.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ocean.dao.ScoreDao;
import com.ocean.model.Score;

@Service
public class ScoreService {
    @Resource
    private ScoreDao dao;

    public void addScoreForStudent(Score score) {
        dao.addScoreForStudent(score);
    }

    public List<Score> selectScore(Map<String, Object> map) {
        return dao.selectScore(map);
    }

    public int getTotalRecord(Map<String, Object> map) {
        return dao.getTotalRecord(map);
    }

    public void updateScore(Map<String, Object> map) {
        dao.updateScore(map);
    }

    public void deleteScore(String id) {
        dao.deleteScore(id);
    }

    public Score getScore(String id) {
        return dao.getScore(id);
    }
}
