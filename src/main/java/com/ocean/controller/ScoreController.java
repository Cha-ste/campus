package com.ocean.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ocean.model.Score;
import com.ocean.pojo.PageSelect;
import com.ocean.service.ScoreService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 成绩
 *
 * @author Ocean
 */
@Controller
@RequestMapping(value = "/score")
public class ScoreController {
    @Resource
    private ScoreService service;
    private final long timeOut = 30 * 60 * 1000;

    @RequestMapping(value = "/addScoreForStudent")
    public @ResponseBody
    JSONObject addScoreForStudent(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String scheduleId = json.getString("scheduleId");   //课程表id
        String courseId = json.getString("courseId");       //课程id
        String pScore = json.getString("pScore");           //平时成绩
        String examScore = json.getString("examScore");     //考试成绩
//		String totalScore = String.valueOf((Integer.valueOf(pScore)*0.3 
//				+ Integer.valueOf(examScore)*0.7));   //总评成绩
        String studentNo = json.getString("studentNo");     //学号
        String studentName = json.getString("studentName"); //学生姓名
        String classNo = json.getString("classNo");         //班级id
        String instituteId = json.getString("instituteId"); //学院id
        json.clear();
        Score score = new Score(courseId, scheduleId, pScore, examScore,
                studentNo, studentName, classNo, instituteId);

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                service.addScoreForStudent(score);

                json.put("code", now);
                json.put("account", account);
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

    @RequestMapping(value = "/selectScore")
    @ResponseBody
    public JSONObject selectScore(@RequestBody JSONObject json) {
        //权限数据
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        //分页数据处理
        int pageIndex = json.getInt("pageIndex");
        int pageSize = json.getInt("pageSize");
        PageSelect page = new PageSelect();
        page.setPageNo(pageIndex);
        page.setPageSize(pageSize);
        //查询关键字
        String keyword = json.getString("keyword");
        //学院id
        String instituteId = json.getString("instituteId");
        //课程id
        String courseId = json.getString("courseId");
        //班级编号
        String classNo = json.getString("classNo");

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("keyword", keyword);
        map.put("classNo", classNo);
        map.put("courseId", courseId);
        map.put("instituteId", instituteId);
        map.put("pageSize", page.getPageSize());
        map.put("firstRecord", page.getFirstRecord());

        if ((now - before) < timeOut) {
            List<Score> array = service.selectScore(map);
            page.setTotalRecords(service.getTotalRecord(map));
            for (int i = 0; i < array.size(); i++) {
                array.get(i).setOrder(i + 1);
            }

            json.put("array", array);
            json.put("totalPage", page.getTotalPages());
            json.put("code", now);
            json.put("account", account);
            json.put("groupId", groupId);
            json.put("result", "success");

        } else {
            json.put("result", "noPower");
        }
        return json;
    }

    /**
     * 获取某成绩的基本信息
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getScore")
    @ResponseBody
    public JSONObject getScore(@RequestBody JSONObject json) {
        //权限数据
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String id = json.getString("id");

        if ((now - before) < timeOut) {
            if (ScoreController.isAllow(groupId) == true) {
                Score score = service.getScore(id);

                json.put("score", score);
                json.put("code", now);
                json.put("account", account);
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
     * 修改成绩(成绩、课程、)
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/updateScore")
    @ResponseBody
    public JSONObject updateScore(@RequestBody JSONObject json) {
        //权限数据
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String id = json.getString("id");
        String pScore = json.getString("pScore");
        String examScore = json.getString("examScore");

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("id", id);
        map.put("pScore", pScore);
        map.put("examScore", examScore);

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                service.updateScore(map);

                json.put("code", now);
                json.put("account", account);
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

    @RequestMapping(value = "/deleteScore")
    @ResponseBody
    public JSONObject deleteScore(@RequestBody JSONObject json) {
        //权限数据
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        JSONArray ids = json.getJSONArray("ids");

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                for (int i = 0; i < ids.size(); i++) {
                    service.deleteScore(ids.getString(i));
                }

                json.put("code", now);
                json.put("account", account);
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
            if (groupId[i].equals("4") || groupId[i].equals("3")) {
                result = true;
                break;
            }
        }
        return result;
    }

}
