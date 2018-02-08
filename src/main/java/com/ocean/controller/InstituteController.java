package com.ocean.controller;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.apache.poi.util.SystemOutLogger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ocean.model.Institute;
import com.ocean.service.InstituteService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller("instituteController")
@RequestMapping(value = "/institute")
public class InstituteController {

    @Resource
    InstituteService service;
    public final long timeOut = 30 * 60 * 1000;

    @RequestMapping(value = "/selectInstitute")
    @ResponseBody
    public JSONObject selectInstitute(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        if ((now - before) < timeOut) {
            List<Institute> institutes = service.selectInstitute();
            JSONArray jsonArray = JSONArray.fromObject(institutes);

            json.put("array", jsonArray);
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("groupId", groupId);
            json.put("result", "success");

        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    // 添加学院
    @RequestMapping(value = "/addInstitute")
    @ResponseBody
    public JSONObject addInstitute(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        Institute institute = new Institute();
        institute.setInstituteId(UUID.randomUUID().toString());
        institute.setInstituteName(json.getString("name"));

        if ((now - before) < timeOut) {
            if (InstituteController.isAllow(groupId) == true) {
                service.addInstitute(institute);

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

    //更新
    @RequestMapping(value = "/updateInstitute")
    @ResponseBody
    public JSONObject updateInstitute(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        Institute institute = new Institute();
        institute.setInstituteId(json.getString("id"));
        institute.setInstituteName(json.getString("name"));

        if ((now - before) < timeOut) {
            if (InstituteController.isAllow(groupId) == true) {
                service.updateInstitute(institute);

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

    //删除
    @RequestMapping(value = "/deleteInstitute")
    @ResponseBody
    public JSONObject deleteInstitute(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String id = json.getString("id");

        if ((now - before) < timeOut) {
            if (InstituteController.isAllow(groupId) == true) {
                service.deleteInstitute(id);

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
            if (groupId[i].equals("4")) {
                result = true;
                break;
            }
        }
        return result;
    }
}
