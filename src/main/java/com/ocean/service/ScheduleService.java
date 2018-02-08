package com.ocean.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ocean.dao.ScheduleDao;
import com.ocean.model.Schedule;

@Service
public class ScheduleService {

    @Resource
    private ScheduleDao dao;

    public void addCourseForClass(Schedule schedule) {
        dao.addCourseForClass(schedule);
    }

    public void updateCourseForClass(Schedule schedule) {
        dao.updateCourseForClass(schedule);
    }


    public List<Schedule> getScheduleInClass(Map<String, Object> map) {
        return dao.getScheduleInClass(map);
    }

    public int getCTotal(Map<String, Object> map) {
        return dao.getCTotal(map);
    }

    public List<Schedule> getScheduleInInstitute(Map<String, Object> map) {
        return dao.getScheduleInInstitute(map);
    }

    public int getITotal(Map<String, Object> map) {
        return dao.getITotal(map);
    }

    public void deleteSchedule(String id) {
        dao.deleteSchedule(id);
    }

    public List<Schedule> getScheduleByClass(Map<String, String> map) {
        return dao.getScheduleByClass(map);
    }

    public List<Schedule> getScheduleByTeacherId(Map<String, String> map) {
        return dao.getScheduleByTeacherId(map);
    }
}
