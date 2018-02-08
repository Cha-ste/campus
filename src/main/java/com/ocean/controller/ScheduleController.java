package com.ocean.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ocean.model.Schedule;
import com.ocean.pojo.PageSelect;
import com.ocean.service.ScheduleService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/schedule")
public class ScheduleController {
    @Resource
    private ScheduleService service;
    private final long timeOut = 30 * 60 * 1000;

    /**
     * 为某个班级添加一节课
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/addCourseForClass")
    @ResponseBody
    public JSONObject addCourseForClass(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        Schedule schedule = new Schedule();
        schedule.setId(UUID.randomUUID().toString());
        schedule.setClassNo(json.getString("classNo"));
        schedule.setClassName(json.getString("className"));
        schedule.setCourseNo(json.getString("courseId"));
        schedule.setCourseName(json.getString("courseName"));
        schedule.setTeacherNo(json.getString("teacherNo"));
        schedule.setTeacherName(json.getString("teacherName"));
        schedule.setInstituteId(json.getString("instituteId"));
        schedule.setYear(json.getString("year"));
        schedule.setTerm(json.getString("term"));
        schedule.setWeek(json.getString("week"));
        schedule.setTime(json.getString("time"));
        json.clear();

        if ((now - before) < timeOut) {
            if (ScheduleController.isAllow(groupId) == true) {
                service.addCourseForClass(schedule);

                json.put("account", account);
                json.put("code", String.valueOf(now));
                json.put("groupId", groupId);
                json.put("result", "success");
            } else {
                json.put("result", "noPower");
            }
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    /**
     * 获取班级所有课程
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getScheduleInClass")
    @ResponseBody
    public JSONObject getScheduleInClass(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String classNo = json.getString("classNo");
        // 分页数据处理
        int pageIndex = json.getInt("pageIndex");
        int pageSize = json.getInt("pageSize");
        PageSelect page = new PageSelect();
        page.setPageNo(pageIndex);
        page.setPageSize(pageSize);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("classNo", classNo);
        map.put("firstRecord", page.getFirstRecord());
        map.put("pageSize", page.getPageSize());

        json.clear();

        if ((now - before) < timeOut) {
            List<Schedule> array = service.getScheduleInClass(map);
            page.setTotalRecords(service.getCTotal(map));

            json.put("array", array);
            json.put("totalPage", page.getTotalPages());
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    /**
     * 获取学院所有课程表
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getScheduleInInstitute")
    @ResponseBody
    public JSONObject getScheduleInInstitute(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String instituteId = json.getString("instituteId");
        String courseId = json.getString("courseId");
        String classNo = json.getString("classNo");
        String keyword = json.getString("keyword");
        // 分页数据处理
        int pageIndex = json.getInt("pageIndex");
        int pageSize = json.getInt("pageSize");
        PageSelect page = new PageSelect();
        page.setPageNo(pageIndex);
        page.setPageSize(pageSize);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("instituteId", instituteId);
        map.put("courseId", courseId);
        map.put("classNo", classNo);
        map.put("keyword", keyword);
        map.put("firstRecord", page.getFirstRecord());
        map.put("pageSize", page.getPageSize());

        json.clear();

        if ((now - before) < timeOut) {
            List<Schedule> array = service.getScheduleInInstitute(map);
            page.setTotalRecords(service.getITotal(map));
            int order = 1;
            for (Schedule schedule : array) {
                schedule.setOrder(order++);
            }

            json.put("array", array);
            json.put("totalPage", page.getTotalPages());
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    /**
     * 修改课程
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/updateCourseForClass")
    @ResponseBody
    public JSONObject updateCourseForClass(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        Schedule schedule = new Schedule();
        schedule.setId(json.getString("id"));
        schedule.setCourseNo(json.getString("courseId"));
        schedule.setCourseName(json.getString("courseName"));
        schedule.setTeacherNo(json.getString("teacherNo"));
        schedule.setYear(json.getString("year"));
        schedule.setTerm(json.getString("term"));
        schedule.setWeek(json.getString("week"));
        schedule.setTime(json.getString("time"));
        json.clear();

        if ((now - before) < timeOut) {
            if (ScheduleController.isAllow(groupId) == true) {
                service.updateCourseForClass(schedule);

                json.put("account", account);
                json.put("code", String.valueOf(now));
                json.put("groupId", groupId);
                json.put("result", "success");
            } else {
                json.put("result", "noPower");
            }
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    /**
     * 删除课程
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/deleteSchedule")
    @ResponseBody
    public JSONObject deleteSchedule(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        JSONArray ids = json.getJSONArray("ids");
        json.clear();

        if ((now - before) < timeOut) {
            if (ScheduleController.isAllow(groupId) == true) {
                for (int i = 0; i < ids.size(); i++) {
                    service.deleteSchedule(ids.getString(i));
                }

                json.put("account", account);
                json.put("code", String.valueOf(now));
                json.put("groupId", groupId);
                json.put("result", "success");
            } else {
                json.put("result", "noPower");
            }
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    static boolean isAllow(String[] groupId) {
        boolean result = false;
        for (int i = 0; i < groupId.length; i++) {
            if (groupId[i].equals("4") || groupId[i].equals("2")) {
                result = true;
                break;
            }
        }
        return result;
    }
}
