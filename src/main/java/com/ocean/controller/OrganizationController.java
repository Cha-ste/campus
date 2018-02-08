package com.ocean.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ocean.model.Organization;
import com.ocean.service.OrganizationService;

import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/organization")
public class OrganizationController {
    @Resource
    private OrganizationService service;
    private final long timeOut = 30 * 60 * 1000;

    @RequestMapping(value = "/addOrganization")
    @ResponseBody
    public JSONObject addOrganization(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String account = json.getString("account");
        String[] groupId = json.getString("groupId").split(",");

        String name = json.getString("name");
        Organization organization = new Organization(name);

        if ((now - before) < timeOut) {
            if (OrganizerController.isAllow(groupId) == true) {
                service.addOrganization(organization);

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

    @RequestMapping(value = "/deleteOrganization")
    @ResponseBody
    public JSONObject deleteOrganization(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String account = json.getString("account");
        String[] groupId = json.getString("groupId").split(",");

        String id = json.getString("id");

        if ((now - before) < timeOut) {
            if (OrganizerController.isAllow(groupId) == true) {
                service.deleteOrganization(id);

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

    @RequestMapping(value = "/selectOrganization")
    @ResponseBody
    public JSONObject selectOrganization(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String account = json.getString("account");
        String[] groupId = json.getString("groupId").split(",");

        if ((now - before) < timeOut) {
            List<Organization> array = service.selectOrganization();

            json.put("array", array);
            json.put("code", now);
            json.put("account", account);
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    @RequestMapping(value = "/selectOrganizationByName")
    @ResponseBody
    public JSONObject selectOrganizationByName(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String account = json.getString("account");
        String[] groupId = json.getString("groupId").split(",");

        String name = json.getString("name");

        if ((now - before) < timeOut) {
            List<Organization> array = service.selectOrganizationByName(name);

            json.put("array", array);
            json.put("code", now);
            json.put("account", account);
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    @RequestMapping(value = "/updateOrganization")
    @ResponseBody
    public JSONObject updateOrganization(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String account = json.getString("account");
        String[] groupId = json.getString("groupId").split(",");

        String id = json.getString("id");
        String name = json.getString("name");
        Organization organization = new Organization(id, name);

        if ((now - before) < timeOut) {
            if (OrganizerController.isAllow(groupId) == true) {
                service.updateOrganization(organization);

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
            if (groupId[i].equals("4") || groupId[i].equals("2")) {
                result = true;
                break;
            }
        }
        return result;
    }
}
