package com.ocean.controller;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.ocean.model.Organizer;
import com.ocean.pojo.PageSelect;
import com.ocean.service.OrganizerService;
import com.ocean.util.OrganizerJxlExcel;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/organizer")
public class OrganizerController {
    @Resource
    OrganizerService service;
    private final long timeOut = 30 * 60 * 1000;

    @RequestMapping(value = "/addOrganizer")
    @ResponseBody
    public JSONObject addOrganizer(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String account = json.getString("account");
        String[] groupId = json.getString("groupId").split(",");

        //机构id
        String organizationId = json.getString("organizationId");
        //机构成员
        String name = json.getString("name");
        String tell = json.getString("tell");
        String email = json.getString("email");

        if ((now - before) < timeOut) {
            if (OrganizerController.isAllow(groupId) == true) {
                Organizer org = new Organizer(organizationId, name, tell, email);
                service.addOrganizer(org);

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

    @RequestMapping(value = "/deleteOrganizer")
    @ResponseBody
    public JSONObject deleteOrganizer(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String account = json.getString("account");
        String[] groupId = json.getString("groupId").split(",");

        String id = json.getString("id");

        if ((now - before) < timeOut) {
            if (OrganizerController.isAllow(groupId) == true) {
                service.deleteOrganizer(id);

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

    @RequestMapping(value = "/deleteOrganizerBatch")
    @ResponseBody
    public JSONObject deleteOrganizerBatch(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String account = json.getString("account");
        String[] groupId = json.getString("groupId").split(",");

        JSONArray ids = json.getJSONArray("ids");

        if ((now - before) < timeOut) {
            if (OrganizerController.isAllow(groupId) == true) {
                for (int i = 0; i < ids.size(); i++) {
                    service.deleteOrganizer(ids.getString(i));
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

    @RequestMapping(value = "/updateOrganizer")
    @ResponseBody
    public JSONObject updateOrganizer(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String account = json.getString("account");
        String[] groupId = json.getString("groupId").split(",");

        String id = json.getString("id");
        //机构名
        String organizationId = json.getString("organizationId");
        //机构成员
        String name = json.getString("name");
        String tell = json.getString("tell");
        String email = json.getString("email");

        if ((now - before) < timeOut) {
            if (OrganizerController.isAllow(groupId) == true) {
                Organizer org = new Organizer(id, organizationId, name, tell, email);
                service.updateOrganizer(org);

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


    @RequestMapping(value = "/selectOrganizer")
    @ResponseBody
    public JSONObject selectOrganizer(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String account = json.getString("account");
        String[] groupId = json.getString("groupId").split(",");

        //机构id
        String organizationId = json.getString("organizationId");
        //机构成员
        String keyword = json.getString("keyword");
        int pageSize = json.getInt("pageSize");
        int pageIndex = json.getInt("pageIndex");
        PageSelect page = new PageSelect();
        page.setPageSize(pageSize);
        page.setPageNo(pageIndex);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("keyword", keyword);
        map.put("organizationId", organizationId);
        map.put("pageSize", page.getPageSize());
        map.put("firstRecord", page.getFirstRecord());

        if ((now - before) < timeOut) {
            if (OrganizerController.isAllow(groupId) == true) {
                List<Organizer> array = service.selectOrganizer(map);
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
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    @RequestMapping(value = "/getOrganizer")
    @ResponseBody
    public JSONObject getOrganizer(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String account = json.getString("account");
        String[] groupId = json.getString("groupId").split(",");

        String id = json.getString("id");

        if ((now - before) < timeOut) {
            Organizer organizer = service.getOrganizer(id);

            json.put("organizer", organizer);
            json.put("code", now);
            json.put("account", account);
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject importExcel(@RequestParam("file") CommonsMultipartFile cmFile, HttpServletRequest request) {
        JSONObject json = new JSONObject();
        long before = Long.parseLong(request.getParameter("code"));
        long now = new Date().getTime();
        String account = request.getParameter("account");
        String[] groupId = request.getParameter("groupId").split(",");

        String organizationId = request.getParameter("organizationId");

        String fileName = cmFile.getOriginalFilename();
        int index = fileName.lastIndexOf(".");
        fileName = fileName.replace(fileName.substring(0, index), String.valueOf(System.currentTimeMillis()));
        String path = request.getSession().getServletContext().getRealPath("/") + "ImportExcel/";
        File file = new File(path, fileName);
        try {
            cmFile.getFileItem().write(file);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if ((now - before) < timeOut) {
            if (OrganizerController.isAllow(groupId) == true) {
                List<Organizer> list = OrganizerJxlExcel.readExcel(file, organizationId);
                for (int i = 0; i < list.size(); i++) {
                    service.addOrganizer(list.get(i));
                    System.out.println("--------------------------------------");
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

    @RequestMapping(value = "/exportExcel")
    @ResponseBody
    public JSONObject importExcel(HttpServletRequest request, HttpServletResponse response, @RequestBody JSONObject json) {
        long before = json.getLong("code");
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        String index = json.getString("pageIndex");
        //字符串查找数字
        String num = "";
        int pageIndex;
        int pageSize;
        PageSelect page = new PageSelect();
        if (index.equals(null) || index.equals("")) {
            pageIndex = 1;
            pageSize = 1000000;
        } else {
            for (int i = 0; i < index.length(); i++) {
                if (index.charAt(i) >= 48 && index.charAt(i) <= 57) {
                    num += index.charAt(i);
                }
            }
            pageIndex = Integer.valueOf(num.trim());
            pageSize = json.getInt("pageSize");
        }

        page.setPageNo(pageIndex);
        page.setPageSize(pageSize);

        String organizationId = json.getString("organizationId");

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("organizationId", organizationId);
        map.put("firstRecord", page.getFirstRecord());
        map.put("pageSize", page.getPageSize());

        if ((now - before) < timeOut) {
            if (OrganizerController.isAllow(groupId) == true) {
                List<Organizer> list = service.selectOrganizer(map);
                //路径选择有问题，待解决
                String path = "D://excel/";
                OrganizerJxlExcel.writeExcel(path, list, request, response);
                System.out.println(path);
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
