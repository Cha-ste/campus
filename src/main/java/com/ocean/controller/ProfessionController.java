package com.ocean.controller;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ocean.model.Profession;
import com.ocean.service.ProfessionService;

import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/profession")
public class ProfessionController {
    @Resource
    ProfessionService service;
    public final long timeOut = 30 * 60 * 1000;

    @RequestMapping(value = "/selectProfession")
    @ResponseBody
    public JSONObject selectProfession(@RequestBody JSONObject json) {
        String pName = json.getString("pName");

        String account = json.getString("account");
        long before = json.getLong("code");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        json.clear();

        if ((now - before < timeOut)) {
            List<Profession> professions = service.selectProfession(pName);

            json.put("array", professions);
            json.put("account", account);
            json.put("code", now);
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    @RequestMapping(value = "/getProfession")
    @ResponseBody
    public JSONObject getProfession(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = json.getLong("code");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        String instituteId = json.getString("instituteId");
        json.clear();

        if ((now - before < timeOut)) {
            List<Profession> professions = service.getProfession(instituteId);

            json.put("array", professions);
            json.put("account", account);
            json.put("code", now);
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    @RequestMapping(value = "/updateProfession")
    @ResponseBody
    public JSONObject updateProfession(@RequestBody JSONObject json) {
        String pId = json.getString("pId");
        String pName = json.getString("pName");
        Profession profession = new Profession(pId, pName);

        String account = json.getString("account");
        long before = json.getLong("code");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        json.clear();

        if ((now - before < timeOut)) {
            if (ProfessionController.isSupermanager(groupId)) {
                service.updateProfession(profession);

                json.put("account", account);
                json.put("code", now);
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

    @RequestMapping(value = "/deleteProfession")
    @ResponseBody
    public JSONObject deleteProfession(@RequestBody JSONObject json) {
        String pId = json.getString("pId");

        String account = json.getString("account");
        long before = json.getLong("code");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        json.clear();

        if ((now - before < timeOut)) {
            if (ProfessionController.isSupermanager(groupId)) {
                service.deleteProfession(pId);

                json.put("account", account);
                json.put("code", now);
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
     * 为某学院添加专业
     */
    @RequestMapping(value = "/addProfession")
    @ResponseBody
    public JSONObject addProfession(@RequestBody JSONObject json) {
        String pId = UUID.randomUUID().toString();
        String pName = json.getString("pName");
        String iNo = json.getString("instituteId");
        Profession profession = new Profession(pId, pName, iNo);

        String account = json.getString("account");
        long before = json.getLong("code");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        json.clear();
        if ((now - before < timeOut)) {
            if (ProfessionController.isSupermanager(groupId)) {
                service.addProfession(profession);

                json.put("account", account);
                json.put("code", now);
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

    static boolean isSupermanager(String[] groupId) {
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
