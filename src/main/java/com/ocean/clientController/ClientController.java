package com.ocean.clientController;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ocean.model.Institute;
import com.ocean.model.News;
import com.ocean.model.Organizer;
import com.ocean.model.Profession;
import com.ocean.model.Schedule;
import com.ocean.model.Server;
import com.ocean.model.Student;
import com.ocean.model.Teacher;
import com.ocean.pojo.PageSelect;
import com.ocean.service.InstituteService;
import com.ocean.service.NewsService;
import com.ocean.service.OrganizerService;
import com.ocean.service.ProfessionService;
import com.ocean.service.ScheduleService;
import com.ocean.service.ServerService;
import com.ocean.service.StudentService;
import com.ocean.service.TeacherService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/client")
public class ClientController {

    public final long timeOut = 30 * 60 * 1000;
    @Resource
    NewsService newsService;
    @Resource
    ServerService serverService;
    @Resource
    StudentService studentService;
    @Resource
    TeacherService teacherService;
    @Resource
    OrganizerService organizerService;
    @Resource
    InstituteService instituteService;
    @Resource
    ProfessionService professionService;
    @Resource
    ScheduleService scheduleService;

    /**
     * 登录*********************************************************
     */
    @RequestMapping(value = "/login")
    @ResponseBody
    public JSONObject clientLogin(@RequestBody JSONObject json) {
        // 登录角色
        String role = json.getString("role");
        // 账号
        String account = json.getString("account");
        // 密码
        String password = json.getString("password");
        // 时间控制器
        long now = new Date().getTime();
        json.clear();

        if ("student".equals(role)) {
            Student student = studentService.getStudentByAccount(account);
            if (student == null) {
                json.put("result", "no such a student");
            }
            // 账号被冻结
            else if (student.getStatus().equals("0")) {
                json.put("result", "you can not login the system now");
            } else if (!student.getPassword().equals(password)) {
                json.put("result", "password error");
            } else {
                json.put("account", account);
                json.put("code", String.valueOf(now));
                json.put("role", role);
                json.put("result", "success");
            }
        } else if ("teacher".equals(role)) {
            Teacher teacher = teacherService.getTeacherByAccount(account);
            if (teacher == null) {
                json.put("result", "no such a teacher");
            }
            // 账号被冻结
            else if (teacher.getStatus().equals("0")) {
                json.put("result", "you can not login the system now");
            } else if (!teacher.getPassword().equals(password)) {
                json.put("result", "password error");
            } else {
                json.put("account", account);
                json.put("code", String.valueOf(now));
                json.put("role", role);
                json.put("result", "success");
            }
        } else {
            json.put("result", "please choose a role");
        }

        return json;
    }

    /**
     * 退出登录
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/logOut")
    @ResponseBody
    public JSONObject logOut(@RequestBody JSONObject json) {
        String account = json.getString("account");

        json.clear();

        json.put("account", account);
        json.put("code", (new Date().getTime() - timeOut));
        json.put("result", "success");

        return json;
    }

    @RequestMapping(value = "/updatePassword")
    @ResponseBody
    public JSONObject udatePassword(@RequestBody JSONObject json) {
        // 账号
        String account = json.getString("account");
        // 密码
        String oldPassword = json.getString("oldPassword");
        String newPassword = json.getString("newPassword");
        // 时间控制器
        long before = Long.valueOf(json.getString("code"));
        long now = new Date().getTime();

        Map<String, String> map = new HashMap<String, String>();
        map.put("account", account);
        map.put("newPassword", newPassword);

        Student student = studentService.getStudentByAccount(account);
        Teacher teacher = teacherService.getTeacherByAccount(account);

        if ((now - before) < timeOut) {
            if (!(student == null)) {
                if (!student.getPassword().equals(oldPassword)) {
                    json.put("result", "the old password is error");
                } else {
                    studentService.updatePassword(map);
                    json.put("result", "success");
                }
                json.put("account", account);
                json.put("code", String.valueOf(now));

            } else if (!(teacher == null)) {
                if (!teacher.getPassword().equals(oldPassword)) {
                    json.put("result", "the old password is error");
                } else {
                    teacherService.updatePassword(map);
                    json.put("result", "success");
                }
                json.put("account", account);
                json.put("code", String.valueOf(now));
            } else {
                json.put("result", "the acount is illegle");
            }
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    /**
     * 消息新闻 模糊查询+分页
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/selectNews")
    @ResponseBody
    public JSONObject selectNews(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        // 当前时间
        long now = new Date().getTime();
        // 分页对象
        PageSelect page = new PageSelect();
        page.setPageSize(json.getInt("pageSize"));
        page.setPageNo(json.getInt("pageIndex"));

        int pageSize = page.getPageSize();
        int firstRecord = page.getFirstRecord();
        String key = json.getString("keyword");
        String newsTypeId = json.getString("newsTypeId");

        json.clear();

        if ((now - before) < timeOut) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("key", key);
            map.put("newsTypeId", newsTypeId);
            map.put("pageSize", pageSize);
            map.put("firstRecord", firstRecord);

            List<News> news = newsService.selectClientNews(map);
            // 将时间以字符串的形式返回,目的是将数据最后的毫秒去掉
            // 设置序号
            int order = 1;
            for (News n : news) {
                char[] time = n.getNewsDate().toCharArray();
                char[] t = new char[20];
                for (int i = 0; i < 19; i++) {
                    t[i] = time[i];
                }
                n.setNewsDate(String.valueOf(t));
                n.setOrder(order++);
            }

            JSONArray jsonArray = JSONArray.fromObject(news);

            page.setTotalRecords(newsService.getTotalRecord(map));
            json.put("array", jsonArray);
            json.put("totalPage", page.getTotalPages());
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("result", "success");

        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    /**
     * 消息新闻 获取单条消息的详情
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getNews")
    @ResponseBody
    public JSONObject getClientNews(@RequestBody JSONObject json) {
        String newsId = json.getString("newsId");
        News news = newsService.getClientNews(newsId);
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        json.clear();

        if ((now - before) < timeOut) {
            json.put("news", news);
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    // ******************************公共服务*******************************//

    /**
     * 服务 模糊查询+分页
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/selectServer")
    @ResponseBody
    public JSONObject selectServer(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();

        PageSelect page = new PageSelect();
        page.setPageSize(json.getInt("pageSize"));
        page.setPageNo(json.getInt("pageIndex"));
        String keyword = json.getString("keyword");
        json.clear();

        if ((now - before) < timeOut) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("key", keyword);
            map.put("pageSize", page.getPageSize());
            map.put("firstRecord", page.getFirstRecord());

            List<Server> servers = serverService.selectClientServer(map);
            JSONArray jsonArray = JSONArray.fromObject(servers);
            page.setTotalRecords(serverService.getTotalRecord(map));

            json.put("array", jsonArray);
            json.put("totalPage", page.getTotalPages());
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    /************************************ 机构 *************************************/

    @RequestMapping(value = "/selectOrganizer")
    @ResponseBody
    public JSONObject selectOrganizer(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();

        // 机构id
        String organizationId = json.getString("organizationId");
        // 机构成员
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
            List<Organizer> array = organizerService.selectOrganizer(map);
            page.setTotalRecords(organizerService.getTotalRecord(map));
            for (int i = 0; i < array.size(); i++) {
                array.get(i).setOrder(i + 1);
            }

            json.put("array", array);
            json.put("totalPage", page.getTotalPages());
            json.put("code", now);
            json.put("account", account);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    /************************************ 教师 *************************************/
    /**
     * 教师信息
     * 模糊查询+分页
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/selectTeacher")
    @ResponseBody
    public JSONObject selectTeacher(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();

        String instituteId = json.getString("instituteId");
        String keyword = json.getString("keyword");
        String tDegree = json.getString("tDegree");
        int pageSize = json.getInt("pageSize");
        int pageIndex = json.getInt("pageIndex");
        PageSelect page = new PageSelect();
        page.setPageSize(pageSize);
        page.setPageNo(pageIndex);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("key", keyword);
        map.put("instituteNo", instituteId);
        map.put("tDegree", tDegree);
        map.put("pageSize", page.getPageSize());
        map.put("firstRecord", page.getFirstRecord());

        if ((now - before) < timeOut) {
            List<Teacher> array = teacherService.selectTeacher(map);
            page.setTotalRecords(teacherService.selectTotalRecord(map));
            for (int i = 0; i < array.size(); i++) {
                array.get(i).setOrder(i + 1);
            }

            json.put("array", array);
            json.put("totalPage", page.getTotalPages());
            json.put("code", now);
            json.put("account", account);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    /**
     * 查询教师详情
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/getTeacher")
    @ResponseBody
    public JSONObject getTeacher(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();

        String id = json.getString("id");

        if ((now - before) < timeOut) {
            Teacher teacher = teacherService.getTeacher(id);

            json.put("teacher", teacher);
            json.put("code", now);
            json.put("account", account);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    /************************************ 学院 *************************************/
    /**
     * 学院
     * 返回所有学院
     */

    @RequestMapping(value = "/selectInstitute")
    @ResponseBody
    public JSONObject selectInstitute(@RequestBody JSONObject json) {
        // 权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        json.clear();

        if ((now - before) < timeOut) {
            List<Institute> institutes = instituteService.selectInstitute();
            JSONArray jsonArray = JSONArray.fromObject(institutes);

            json.put("array", jsonArray);
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("result", "success");

        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    /************************************ 专业*************************************/

    /**
     * 专业信息
     * 模糊查询
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/selectProfession")
    @ResponseBody
    public JSONObject selectProfession(@RequestBody JSONObject json) {
        String pName = json.getString("pName");

        String account = json.getString("account");
        long before = json.getLong("code");
        long now = new Date().getTime();
        json.clear();

        if ((now - before < timeOut)) {
            List<Profession> professions = professionService.selectProfession(pName);

            json.put("array", professions);
            json.put("account", account);
            json.put("code", now);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    /************************************ 学生*************************************/

    //查询班级所有学生
    @RequestMapping(value = "/getStudentByClassNo")
    @ResponseBody
    public JSONObject getStudentByClassNo(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();

        String classNo = json.getString("classNo");

        if ((now - before) < timeOut) {
            List<Student> array = studentService.getStudentByClassNo(classNo);

            json.put("array", array);
            json.put("code", now);
            json.put("account", account);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    //获取某学生信息
    @RequestMapping(value = "/getStudent")
    @ResponseBody
    public JSONObject getStudent(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();

        String id = json.getString("id");
        json.clear();

        if ((now - before) < timeOut) {
            Student student = studentService.getStudent(id);

            json.put("student", student);
            json.put("code", now);
            json.put("account", account);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    /**
     * 模糊查找学生
     */
    @RequestMapping(value = "/selectStudent")
    @ResponseBody
    public JSONObject selectStudentInClass(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();

        PageSelect page = new PageSelect();
        page.setPageNo(json.getInt("pageIndex"));
        page.setPageSize(json.getInt("pageSize"));
        String key = json.getString("keyword");
        String classNo = studentService.getStudentByAccount(account).getClassNo();
        json.clear();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("classNo", classNo);
        map.put("key", key);
        map.put("firstRecord", page.getFirstRecord());
        map.put("pageSize", page.getPageSize());

        if ((now - before) < timeOut) {
            List<Student> array = studentService.selectStudentInClass(map);
            page.setTotalRecords(studentService.getTotalRecord(map));

            //给学生添加序号
            int i = 1;
            for (Student student : array) {
                student.setOrder(i++);
            }

            json.put("array", array);
            json.put("totalPage", page.getTotalPages());
            json.put("code", now);
            json.put("account", account);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    /************************************ 课程表*************************************/
    @RequestMapping(value = "/getScheduleByClass")
    @ResponseBody
    public JSONObject getScheduleByClass(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String year = json.getString("year");
        String term = json.getString("term");
        json.clear();

        if ((now - before) < timeOut) {
            //获取到所在班级
            String classNo = studentService.getStudentByAccount(account).getClassNo();
            Map<String, String> map = new HashMap<String, String>();
            map.put("year", year);
            map.put("term", term);
            map.put("classNo", classNo);
            List<Schedule> array = scheduleService.getScheduleByClass(map);

            json.put("array", array);
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }


    @RequestMapping(value = "/getScheduleByTeacherId")
    @ResponseBody
    public JSONObject getScheduleByTeacherId(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String year = json.getString("year");
        String term = json.getString("term");


        json.clear();

        if ((now - before) < timeOut) {
            String teacherId = teacherService.getTeacherByAccount(account).getTeacherNo();
            Map<String, String> map = new HashMap<String, String>();
            map.put("year", year);
            map.put("term", term);
            map.put("teacherId", teacherId);
            List<Schedule> array = scheduleService.getScheduleByTeacherId(map);

            json.put("array", array);
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

}
