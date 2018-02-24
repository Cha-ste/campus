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

import com.ocean.model.Admin;
import com.ocean.service.AdminService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping(value = "/admin")
public class AdminController {

    private final long timeOut = 30 * 60 * 1000;
    @Resource
    AdminService service;

    @RequestMapping(value = "/login")
    @ResponseBody
    public JSONObject login(@RequestBody JSONObject json, RedirectAttributes redirectAttributes) {
        String account = json.getString("account");
        String password = json.getString("password");
        json.clear();

        Admin admin = service.login(account);

        if (admin != null) {
            if (!admin.getPassword().equals(password)) {
                json.put("result", "password error");
            } else {
                String code = String.valueOf(new Date().getTime());
                String[] groupId = admin.getGroupId().split(",");
                json.put("code", code);
                json.put("account", account);
                json.put("groupId", groupId);
                json.put("result", "success");
            }
        } else {
            json.put("result", "no such a manager");
        }

        //这属性要在前端接收，不然add了就没什么意义
        redirectAttributes.addFlashAttribute("success", "just test");

        return json;
    }


    /**
     * 查询管理员，返回所有同学院（institute）的管理员
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/selectAdmin")
    @ResponseBody
    public JSONObject selectAdmin(@RequestBody JSONObject json) {
        String instituteId = json.getString("instituteCode");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String account = json.getString("account");
        String[] groupId = json.getString("groupId").split(",");
        json.clear();

        if ((now - before) < timeOut) {
            List<Admin> admins = service.selectAdmin(instituteId);

            json.put("code", String.valueOf(now));
            json.put("account", account);
            json.put("groupId", groupId);
            json.put("array", admins);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }


    /**
     * 查询管理员，返回所有同类（Group）的管理员
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/selectAdminG")
    @ResponseBody
    public JSONObject selectAdminG(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String instituteId = json.getString("instituteCode");
        String[] groupId = json.getString("groupId").split(",");
        String gId = json.getString("gId");
        json.clear();

        if ((now - before) < timeOut) {
            Map<String, String> map = new HashMap<String, String>();
            map.put("instituteId", instituteId);
            map.put("gId", gId);
            List<Admin> admins = service.selectAdminG(map);

            json.put("code", String.valueOf(now));
            json.put("account", account);
            json.put("groupId", groupId);
            json.put("array", admins);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }


    //获取单个管理员信息
    @RequestMapping(value = "/getAdmin")
    @ResponseBody
    public JSONObject getAdmin(@RequestBody JSONObject json) {
        String id = json.getString("id");
        String[] groupId = json.getString("groupId").split(",");
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        json.clear();

        if ((now - before) < timeOut) {
            Admin admin = service.getAdmin(id);
            String[] gId = admin.getGroupId().split(",");//所查管理员的权限码

            json.put("code", String.valueOf(now));
            json.put("account", account);
            json.put("groupId", groupId);                 //登录管理员的权限码

            json.put("name", admin.getName());
            json.put("tell", admin.getTell());
            json.put("email", admin.getEmail());
            json.put("password", admin.getPassword());
            json.put("gId", gId);
            json.put("instituteId", admin.getInstituteId());
            json.put("result", "success");

        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    //更新
    @RequestMapping(value = "/updateAdmin")
    @ResponseBody
    public JSONObject updateAdmin(@RequestBody JSONObject json) {
        String id = json.getString("id");
        String name = json.getString("name");
        String tell = json.getString("tell");
        String email = json.getString("email");
        String password = json.getString("password");
        JSONArray array = json.getJSONArray("gId");
        String gId = array.getString(0);
        for (int i = 1; i < array.size(); i++) {
            gId += ("," + array.getString(i));
        }

        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        json.clear();

        if ((now - before) < timeOut) {
            if (name.equals(account) || AdminController.isSupermanager(groupId) == true) {
                Admin admin = new Admin();
                admin.setId(id);
                admin.setEmail(email);
                admin.setGroupId(gId);
                admin.setName(name);
                admin.setPassword(password);
                admin.setTell(tell);

                service.updateAdmin(admin);
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

    //添加管理员
    @RequestMapping(value = "/addAdmin")
    @ResponseBody
    public JSONObject addAdmin(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String name = json.getString("name");
        String tell = json.getString("tell");
        String email = json.getString("email");
        String password = json.getString("password");
        JSONArray array = json.getJSONArray("gId");
        String gId = array.getString(0);
        for (int i = 1; i < array.size(); i++) {
            gId += ("," + array.getString(i));
        }
        String instituteId = json.getString("instituteId");

        if ((now - before) < timeOut) {
            if (AdminController.isSupermanager(groupId) == true) {
                Admin admin = new Admin();
                admin.setId(UUID.randomUUID().toString());
                admin.setEmail(email);
                admin.setGroupId(gId);
                admin.setName(name);
                admin.setPassword(password);
                admin.setTell(tell);
                admin.setInstituteId(instituteId);

                service.addAdmin(admin);
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

    //删除管理员
    @RequestMapping(value = "/deleteAdmin")
    @ResponseBody
    public JSONObject deleteAdmin(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        String id = json.getString("id");
        json.clear();

        if ((now - before) < timeOut) {
            if (AdminController.isSupermanager(groupId) == true) {
                service.deleteAdmin(id);
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

    //批量删除管理员
    @RequestMapping(value = "deleteAdminBatch")
    @ResponseBody
    public JSONObject deleteAdminBatch(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        JSONArray array = json.getJSONArray("ids");

        if ((now - before) < timeOut) {
            if (AdminController.isSupermanager(groupId) == true) {
                for (int i = 0; i < array.size(); i++) {
                    service.deleteAdmin(array.getString(i));
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

    @RequestMapping(value = "/logOut")
    @ResponseBody
    public JSONObject logOut(@RequestBody JSONObject json) {
        String account = json.getString("account");
        String[] groupId = json.getString("groupId").split(",");

        json.clear();

        json.put("account", account);
        json.put("code", (new Date().getTime() - timeOut));
        json.put("groupId", groupId);
        json.put("result", "success");

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
