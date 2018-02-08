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

import com.ocean.model.Server;
import com.ocean.pojo.PageSelect;
import com.ocean.service.ServerService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/server")
public class ServerController {
    @Resource
    ServerService service;
    public final long timeOut = 30 * 60 * 1000;

    //查询
    @RequestMapping(value = "/selectServer")
    @ResponseBody
    public JSONObject selectServer(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        PageSelect page = new PageSelect();
        page.setPageSize(json.getInt("pageSize"));
        page.setPageNo(json.getInt("pageIndex"));
        String keyword = json.getString("keyword");
        json.clear();

        if ((now - before) < timeOut) {
            Map<Object, Object> map = new HashMap<Object, Object>();
            map.put("key", keyword);
            map.put("pageSize", page.getPageSize());
            map.put("firstRecord", page.getFirstRecord());

            List<Server> servers = service.selectServer(map);
            JSONArray jsonArray = JSONArray.fromObject(servers);
            page.setTotalRecords(service.getTotalRecord(map));

            json.put("array", jsonArray);
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

    //添加
    @RequestMapping(value = "/addServer")
    @ResponseBody
    public JSONObject addServer(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        Server server = new Server();
        server.setServerId(UUID.randomUUID().toString());
        server.setServerAddress(json.getString("serverAddress"));
        server.setServerName(json.getString("serverName"));
        server.setServerTell(json.getString("serverTell"));
        json.clear();

        if ((now - before) < timeOut) {
            if (NewsController.isNewsManager(groupId) == true) {
                service.addServer(server);

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

    //取单独一条server
    @RequestMapping(value = "/getServer")
    @ResponseBody
    public JSONObject getServer(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String serverId = json.getString("serverId");

        if ((now - before) < timeOut) {
            Server server = service.getServer(serverId);
            json.put("serverName", server.getServerName());
            json.put("serverAddress", server.getServerAddress());
            json.put("serverTell", server.getServerTell());
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    //更新
    @RequestMapping(value = "/updateServer")
    @ResponseBody
    public JSONObject updateServer(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        Server server = new Server();
        server.setServerId(json.getString("serverId"));
        server.setServerName(json.getString("serverName"));
        server.setServerTell(json.getString("serverTell"));
        server.setServerAddress(json.getString("serverAddress"));
        json.clear();

        if ((now - before) < timeOut) {
            if (NewsController.isNewsManager(groupId) == true) {
                service.updateServer(server);

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
    @RequestMapping(value = "/deleteServer")
    @ResponseBody
    public JSONObject deleteServer(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String serverId = json.getString("serverId");
        json.clear();

        if ((now - before) < timeOut) {
            if (NewsController.isNewsManager(groupId) == true) {
                service.deleteServer(serverId);

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

    //操作权限判断
    static boolean isNewsManager(String[] groupId) {
        boolean result = false;
        for (int i = 0; i < groupId.length; i++) {
            if (groupId[i].equals("1") || groupId[i].equals("4")) {
                result = true;
                break;
            }
        }
        return result;
    }
}
