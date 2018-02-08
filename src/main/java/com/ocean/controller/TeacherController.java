package com.ocean.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.ocean.model.Teacher;
import com.ocean.pojo.PageSelect;
import com.ocean.service.TeacherService;
import com.ocean.util.TeacherJxlExcel;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/teacher")
public class TeacherController {
    @Resource
    TeacherService service;
    @Resource
    private ServletContext servletContext;

    private final long timeOut = 30 * 60 * 1000;

    @RequestMapping(value = "/addTeacher")
    @ResponseBody
    public JSONObject addTeacher(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        Teacher teacher = new Teacher();
        teacher.setId(UUID.randomUUID().toString());
        teacher.setTeacherNo(json.getString("teacherNo"));
        teacher.setTeacherName(json.getString("teacherName"));
        teacher.setTeacherPicture(json.getString("teacherPicture"));
        teacher.setExpression(json.getString("expression"));
        teacher.setInstituteNo(json.getString("instituteNo"));
        JSONArray array = json.getJSONArray("teacherDegree");
        String teacherDegree = array.getString(0);
        for (int i = 1; i < array.size(); i++) {
            teacherDegree += ("," + array.getString(i));
        }
        teacher.setTeacherDegree(teacherDegree);
        teacher.setTeacherMail(json.getString("teacherMail"));
        teacher.setTeacherTell(json.getString("teacherTell"));
        teacher.setPassword(json.getString("teacherNo"));
        teacher.setStatus("1");
        json.clear();

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                service.addTeacher(teacher);

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

    @RequestMapping(value = "/updateTeacher")
    @ResponseBody
    public JSONObject updateTeacher(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        Teacher teacher = new Teacher();
        teacher.setId(json.getString("id"));
        teacher.setTeacherNo(json.getString("teacherNo"));
        teacher.setTeacherName(json.getString("teacherName"));
        teacher.setTeacherPicture(json.getString("teacherPicture"));
        teacher.setExpression(json.getString("expression"));
        JSONArray array = json.getJSONArray("teacherDegree");
        String teacherDegree = array.getString(0);
        for (int i = 1; i < array.size(); i++) {
            teacherDegree += ("," + array.getString(i));
        }
        teacher.setTeacherDegree(teacherDegree);
        teacher.setTeacherMail(json.getString("teacherMail"));
        teacher.setTeacherTell(json.getString("teacherTell"));
        teacher.setPassword(json.getString("teacherNo"));
        teacher.setInstituteNo(json.getString("instituteNo"));
        json.clear();

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                service.updateTeacher(teacher);

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

    @RequestMapping(value = "/selectTeacher")
    @ResponseBody
    public JSONObject selectTeacher(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        PageSelect page = new PageSelect();
        page.setPageNo(json.getInt("pageIndex"));
        page.setPageSize(json.getInt("pageSize"));

        String instituteNo = json.getString("instituteNo");
        String tDegree = json.getString("tDegree");
        String key = json.getString("keyword");

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("instituteNo", instituteNo);
        map.put("tDegree", tDegree);
        map.put("key", key);
        map.put("firstRecord", page.getFirstRecord());
        map.put("pageSize", page.getPageSize());

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                List<Teacher> array = service.selectTeacher(map);
                page.setTotalRecords(service.selectTotalRecord(map));
                // 位每个教师添加序号
                int i = 1;
                for (Teacher teacher : array) {
                    teacher.setOrder(i++);
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

    @RequestMapping(value = "/getTeacher")
    @ResponseBody
    public JSONObject getTeacher(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String id = json.getString("id");

        if ((now - before) < timeOut) {
            Teacher teacher = service.getTeacher(id);

            json.put("teacher", teacher);
            json.put("code", now);
            json.put("account", account);
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    @RequestMapping(value = "/deleteTeacher")
    @ResponseBody
    public JSONObject deleteTeacher(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String teacherId = json.getString("id");

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                service.deleteTeacher(teacherId);

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

    @RequestMapping(value = "/deleteTeacherBatch")
    @ResponseBody
    public JSONObject deleteTeacherBatch(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        JSONArray teacherIds = json.getJSONArray("teacherIds");

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                for (int i = 0; i < teacherIds.size(); i++) {
                    service.deleteTeacher(teacherIds.getString(i));
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

    @RequestMapping(value = "/freeze")
    @ResponseBody
    public JSONObject freezeTeacher(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        JSONArray array = json.getJSONArray("teacherIds");
        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                for (int i = 0; i < array.size(); i++) {
                    service.freezeTeacher(array.getString(i));
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

    @RequestMapping(value = "/unFreeze")
    @ResponseBody
    public JSONObject unFreezeTeacher(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        JSONArray array = json.getJSONArray("teacherIds");
        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                for (int i = 0; i < array.size(); i++) {
                    service.unFreezeTeacher(array.getString(i));
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

    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject importExcel(@RequestParam("file") CommonsMultipartFile cmFile, HttpServletRequest request) {
        JSONObject json = new JSONObject();
        long before = Long.parseLong(request.getParameter("code"));
        String account = request.getParameter("account");
        long now = new Date().getTime();
        String[] groupId = request.getParameter("groupId").split(",");
        String instituteId = request.getParameter("instituteId");

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

//		DiskFileItem fi = (DiskFileItem)cmFile.getFileItem(); 
//        File file = fi.getStoreLocation();
//		System.out.println(file.getPath());
        if ((now - before) < timeOut) {
            if (StudentController.isAllow(groupId) == true) {
                List<Teacher> array = TeacherJxlExcel.readExcel(file, instituteId);
                //逐条记录添加
                for (Teacher teacher : array) {
                    service.addTeacher(teacher);
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
        int pageSize;
        int pageIndex;
        //全部
        if (index.equals(null) || index.equals("")) {
            pageSize = 1000000;
            pageIndex = 1;
        } else {
            //字符串查找数字
            String num = "";
            for (int i = 0; i < index.length(); i++) {
                if (index.charAt(i) >= 48 && index.charAt(i) <= 57) {
                    num += index.charAt(i);
                }
            }

            pageIndex = Integer.valueOf(num.trim());
            pageSize = json.getInt("pageSize");
        }
        PageSelect page = new PageSelect();
        page.setPageNo(pageIndex);
        page.setPageSize(pageSize);

        String instituteNo = json.getString("instituteNo");
        String tDegree = json.getString("tDegree");
        String key = json.getString("keyword");

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("instituteNo", instituteNo);
        map.put("tDegree", tDegree);
        map.put("key", key);
        map.put("firstRecord", page.getFirstRecord());
        map.put("pageSize", page.getPageSize());

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                List<Teacher> list = service.selectTeacher(map);
                //路径选择有问题，待解决
                String path = "D://excel/";
                TeacherJxlExcel.writeExcel(path, list);
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

    //以复制形式上传文件（图片）
    @ResponseBody
    @RequestMapping(value = "/uploadTeacherPic", method = RequestMethod.POST)
    public JSONObject uploadPhoto(@RequestParam("file") CommonsMultipartFile file, HttpServletRequest request) {
        JSONObject json = new JSONObject();
        long before = Long.parseLong(request.getParameter("code"));
        String account = request.getParameter("account");
        long now = new Date().getTime();
        String[] groupId = request.getParameter("groupId").split(",");

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                if (!file.isEmpty()) {
                    String fileName = file.getOriginalFilename();
                    int index = fileName.lastIndexOf(".");
                    fileName = fileName.replace(fileName.substring(0, index), String.valueOf(System.currentTimeMillis()));
                    String path = request.getSession().getServletContext().getRealPath("/teacherPic");
                    File file2 = new File(path, fileName);
                    try {
                        file.getFileItem().write(file2);
                        json.put("teacherPic", "../teacherPic/" + fileName);
                        json.put("code", now);
                        json.put("account", account);
                        json.put("groupId", groupId);
                        json.put("result", "success");
                        return json;
                    } catch (Exception e) {
                        e.printStackTrace();
                        json.put("result", "fail");
                        return json;
                    }

                }
                json.put("result", "empty file");
            } else {
                json.put("result", "noPower");
            }
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    @RequestMapping(value = "/getTeacherByInstituteId")
    @ResponseBody
    public JSONObject getTeacherByInstituteId(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        String instituteId = json.getString("instituteId");
        json.clear();

        if ((now - before) < timeOut) {

            List<Teacher> array = service.getTeacherByInstituteId(instituteId);

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

    /**
     * 获取课程任教老师
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getTeacherByCourseId")
    @ResponseBody
    public JSONObject getTeacherByCourseId(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        String courseId = json.getString("courseId");
        json.clear();

        if ((now - before) < timeOut) {
            String[] teachers = service.getTeacherIds(courseId).split(",");
            List<Teacher> array = new ArrayList<Teacher>();
            for (int i = 0; i < teachers.length; i++) {
                Teacher teacher = service.getTeacherByCourseId(teachers[i]);
                array.add(teacher);
            }

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
