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

import com.ocean.model.Course;
import com.ocean.model.Teacher;
import com.ocean.pojo.PageSelect;
import com.ocean.service.CourseService;
import com.ocean.service.TeacherService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/course")
public class CourseController {
    @Resource
    CourseService service;
    @Resource
    TeacherService teacherService;
    public final long timeOut = 30 * 60 * 1000;

    @RequestMapping(value = "/addCourse")
    @ResponseBody
    public JSONObject addCourse(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        Course course = new Course();
        course.setCourseNo(UUID.randomUUID().toString());
        course.setCourseName(json.getString("courseName"));
        course.setInstituteId(json.getString("instituteId"));
        json.clear();

        if ((now - before) < timeOut) {
            if (CourseController.isAllow(groupId) == true) {
                service.addCourse(course);
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

    @RequestMapping(value = "/updateCourse")
    @ResponseBody
    public JSONObject updateCourse(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        Course course = new Course();
        course.setCourseNo(json.getString("courseId"));
        course.setCourseName(json.getString("courseName"));
        JSONArray teacherIds = json.getJSONArray("teacherIds");
        String teacherNo = teacherIds.getString(0);
        json.clear();
        for (int i = 1; i < teacherIds.size(); i++) {
            teacherNo += ("," + teacherIds.getString(i));
        }
        course.setTeacherNo(teacherNo);
        json.clear();

        if ((now - before) < timeOut) {
            if (CourseController.isAllow(groupId) == true) {
                service.update(course);
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

    @RequestMapping("/deleteCourse")
    @ResponseBody
    public JSONObject deleteCourse(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        JSONArray ids = json.getJSONArray("ids");
        if ((now - before) < timeOut) {
            if (CourseController.isAllow(groupId) == true) {
                for (int i = 0; i < ids.size(); i++) {
                    service.deleteCourse(ids.getString(i));
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

    @RequestMapping(value = "/selectCourse")
    @ResponseBody
    public JSONObject selectCourse(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        // 分页对象
        PageSelect page = new PageSelect();
        page.setPageSize(json.getInt("pageSize"));
        page.setPageNo(json.getInt("pageIndex"));
        //查询字段
        String keyword = json.getString("keyword");
        String instituteId = json.getString("instituteId");
        json.clear();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("pageSize", page.getPageSize());
        map.put("firstRecord", page.getFirstRecord());
        map.put("keyword", keyword);
        map.put("instituteId", instituteId);

        if ((now - before) < timeOut) {
            if (CourseController.isAllow(groupId) == true) {
                List<Course> array = service.selectCourse(map);
                page.setTotalRecords(service.getTotalRecord(map));

                int order = 1;
                for (Course c : array) {
                    //为课程添加序号
                    c.setOrder(order++);

                    //将课程的任教老师读取出来，存放到数组里
                    if (c.getTeacherNo() != null) {
                        //将教工号拆分成数组
                        String[] ids = c.getTeacherNo().split(",");
                        Teacher[] teachers = new Teacher[ids.length];
                        for (int i = 0; i < ids.length; i++) {
//							teachers[i] = new Teacher();64c0a406-24bb-4051-8eba-13799d082064
                            teachers[i] = teacherService.getTeacher(ids[i]);
                        }
                        c.setTeachers(teachers);
                    }
                }
                json.put("array", array);
                json.put("account", account);
                json.put("code", String.valueOf(now));
                json.put("groupId", groupId);
                json.put("totalPage", page.getTotalPages());
                json.put("result", "success");
            } else {
                json.put("result", "noPower");
            }
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    //获取某学院下的所有课程
    @RequestMapping(value = "/getCourseByInstituteId")
    @ResponseBody
    public JSONObject getCourseByInstituteId(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        String instituteId = json.getString("instituteId");
        json.clear();

        if ((now - before) < timeOut) {
            List<Course> courses = service.getCourseByInstituteId(instituteId);

            json.put("array", courses);
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    //位课程添加任教老师
    @RequestMapping(value = "/addTeacherForCourse")
    @ResponseBody
    public JSONObject addTeacherForCourse(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        String courseId = json.getString("courseId");
        JSONArray teacherIds = json.getJSONArray("teacherIds");
        String teacherNo = service.getCourse(courseId).getTeacherNo();

        if (teacherNo == null) {
            //避免数据在开始就加个“，”，例如：“，教师1，教师2”
            teacherNo = teacherIds.getString(0);
            for (int i = 1; i < teacherIds.size(); i++) {
                teacherNo += ("," + teacherIds.getString(i));
            }
        } else {
            String[] ids = teacherNo.split(",");
            for (int i = 0; i < teacherIds.size(); i++) {
                int exsit = 0; //标记教师存在
                //遍历存在的教师
                for (int j = 0; j < ids.length; j++) {
                    //如果教师存在，则不进行字符串拼接
                    if (teacherIds.getString(i).equals(ids[j])) {
                        exsit = 1;
                        break;
                    }
                }
                if (exsit == 0) {
                    teacherNo += ("," + teacherIds.getString(i));
                }
            }
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("courseId", courseId);
        map.put("teacherNo", teacherNo);

        json.clear();

        if ((now - before) < timeOut) {
            service.addTeacherForCourse(map);

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
            if (groupId[i].equals("3") || groupId[i].equals("4")) {
                result = true;
                break;
            }
        }
        return result;
    }

}
