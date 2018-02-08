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

import com.ocean.model.Clazz;
import com.ocean.service.ClassService;

import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/class")
public class ClassController {
    @Resource
    ClassService service;
    private final long timeOut = 30 * 60 * 1000;

    @RequestMapping(value = "/addClass")
    @ResponseBody
    public JSONObject addClass(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        Clazz clazz = new Clazz();
        clazz.setClassNo(UUID.randomUUID().toString());
        clazz.setClassName(json.getString("className"));
        clazz.setpNo(json.getString("pNo"));
        clazz.setInstituteNo(json.getString("instituteNo"));
        json.clear();

        if ((now - before) < timeOut) {
            if (ClassController.isAllow(groupId) == true) {
                service.addClass(clazz);

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

    //查看班级
    @RequestMapping(value = "/getClass")
    @ResponseBody
    public JSONObject getClass(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String id = json.getString("classNo");
        json.clear();

        if ((now - before) < timeOut) {
            if (ClassController.isAllow(groupId) == true) {
                Clazz clazz = service.getClass(id);

                json.put("clazz", clazz);
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

    @RequestMapping(value = "/updateClass")
    @ResponseBody
    public JSONObject updateClass(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        Clazz clazz = new Clazz();
        clazz.setClassNo(json.getString("classNo"));
        clazz.setClassName(json.getString("className"));
        json.clear();

        if ((now - before) < timeOut) {
            if (ClassController.isAllow(groupId) == true) {
                service.updateClass(clazz);

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

    @RequestMapping(value = "/deleteClass")
    @ResponseBody
    public JSONObject deleteClass(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String classNo = json.getString("classNo");
        json.clear();

        if ((now - before) < timeOut) {
            if (ClassController.isAllow(groupId) == true) {
                service.deleteClass(classNo);

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

    //搜索班级
    @RequestMapping(value = "/selectClass")
    @ResponseBody
    public JSONObject selectClass(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String instituteId = json.getString("instituteId");
        String keyword = json.getString("keyword");
        Map<String, String> map = new HashMap<String, String>();
        map.put("instituteId", instituteId);
        map.put("keyword", keyword);
        json.clear();

        if ((now - before) < timeOut) {
            List<Clazz> list = service.seleteClass(map);
            json.put("array", list);
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    //根据课程获取班级
    @RequestMapping(value = "/getClassByCourseId")
    @ResponseBody
    public JSONObject getClassByCourseId(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String courseId = json.getString("courseId");
        json.clear();

        if ((now - before) < timeOut) {
            List<Clazz> list = service.getClassByCourseId(courseId);
            json.put("array", list);
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    //获取专业下的所有班级
    @RequestMapping(value = "/getClassBypId")
    @ResponseBody
    public JSONObject getClassBypId(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String pId = json.getString("pId");
        json.clear();

        if ((now - before) < timeOut) {
            List<Clazz> list = service.getClassBypId(pId);
            json.put("array", list);
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    static boolean isAllow(String[] groupId) {
        boolean result = false;
        for (int i = 0; i < groupId.length; i++) {
            if (groupId[i].equals("4")) {
                result = true;
                break;
            }
        }
        return result;
    }
}
