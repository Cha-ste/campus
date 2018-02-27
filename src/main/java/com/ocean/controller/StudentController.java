package com.ocean.controller;

import com.ocean.easyPoi.StudentVo;
import com.ocean.model.Student;
import com.ocean.pojo.PageSelect;
import com.ocean.service.StudentService;
import com.ocean.util.StudentJxlExcel;
import com.ocean.util.WebUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.poi.ss.usermodel.Workbook;
import org.jeecgframework.poi.excel.ExcelExportUtil;
import org.jeecgframework.poi.excel.entity.ExportParams;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.OutputStream;
import java.util.*;

/**
 * RequestMapping  前端页面访问接口
 *
 * @author Ocean
 */
@Controller
@RequestMapping(value = "/student")
public class StudentController {
    @Resource
    private StudentService service;
    public final long timeOut = 30 * 60 * 1000;

    /**
     * 添加学生
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/addStudent")
    @ResponseBody
    public JSONObject addStudent(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String studentNo = json.getString("studentNo");
        String studentName = json.getString("studentName");
        String studentTell = json.getString("studentTell");
        String studentMail = json.getString("studentMail");
        String studentPicture = json.getString("studentPicture");
        String studentSex = json.getString("studentSex");
        String classNo = json.getString("classNo");
        String instituteId = json.getString("instituteId");
        String pId = json.getString("pId");
        Student student = new Student(studentNo, studentName, studentTell,
                studentMail, studentPicture, studentSex, instituteId, pId, classNo, studentNo);

        json.clear();

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                service.addStudent(student);

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

    //导出
    @RequestMapping(value = "/exportExcel", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject exportExcel(HttpServletRequest request, HttpServletResponse response, @RequestBody JSONObject json) {
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

        String instituteId = json.getString("instituteNo");
        String pId = json.getString("pId");
        String classNo = json.getString("classNo");
        String keyword = json.getString("keyword");

        json.clear();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("instituteId", instituteId);
        map.put("pId", pId);
        map.put("classNo", classNo);
        map.put("keyword", keyword);
        map.put("firstRecord", page.getFirstRecord());
        map.put("pageSize", page.getPageSize());

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                List<Student> list = service.getStudentByInstituteId(map);
                //换成输出流的方式，差前端接收
//                List<StudentVo> students = new ArrayList<>();
//                for (Student student : list) {
//                    StudentVo studentVo = new StudentVo();
//                    studentVo.setStudentNo(student.getStudentNo());
//                    studentVo.setClassName(student.getClassName());
//                    studentVo.setSex(student.getStudentSex());
//                    students.add(studentVo);
//                }
//                Workbook workbook = ExcelExportUtil.exportExcel(new ExportParams("学生信息", "学生信息"), StudentVo.class, students);
//                try {
//                    response.setContentType("application/vnd.ms-excel; charset = utf-8");
//                    response.setHeader("Set-Cookie", "fileDownload=true; path=/");
//                    response.setHeader("Content-Disposition", "attachment; filename=" + WebUtils.fileNameInDifferenceBrowser("学生信息.xls", request));
//                    OutputStream os = response.getOutputStream();
//                    if (workbook != null) {
//                        workbook.write(os);
//                        os.close();
//                    }
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
                //路径选择有问题，待解决
                String path = "C://excel/";
                StudentJxlExcel.writeExcel(path, list);
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

    //导入
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject importExcel(@RequestParam("file") CommonsMultipartFile cmFile, HttpServletRequest request) {
        JSONObject json = new JSONObject();
        long before = Long.parseLong(request.getParameter("code"));
        String account = request.getParameter("account");
        long now = new Date().getTime();
        String[] groupId = request.getParameter("groupId").split(",");

        String pId = request.getParameter("pId");
        String classNo = request.getParameter("classNo");
        String instituteId = request.getParameter("instituteId");
        Map<String, String> map = new HashMap<String, String>();
        map.put("classNo", classNo);
        map.put("pId", pId);
        map.put("instituteId", instituteId);
        System.out.println(map.get(instituteId));
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
            if (StudentController.isAllow(groupId) == true) {
                List<Student> array = StudentJxlExcel.readExcel(file, map);
                //逐条记录添加
                for (Student student : array) {
                    service.addStudent(student);
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

    //以复制形式上传文件（图片）
    @ResponseBody
    @RequestMapping(value = "/uploadStudentPic", method = RequestMethod.POST)
    public JSONObject uploadPhoto(@RequestParam("file") CommonsMultipartFile file, HttpServletRequest request) {
        JSONObject json = new JSONObject();
        long before = Long.parseLong(request.getParameter("code"));
        String account = request.getParameter("account");
        long now = new Date().getTime();
        String[] groupId = request.getParameter("groupId").split(",");

        if ((now - before) < timeOut) {
            if (StudentController.isAllow(groupId) == true) {
                if (!file.isEmpty()) {
                    String fileName = file.getOriginalFilename();
                    int index = fileName.lastIndexOf(".");
                    fileName = fileName.replace(fileName.substring(0, index), String.valueOf(System.currentTimeMillis()));
                    String path = request.getSession().getServletContext().getRealPath("/studentPic");
                    File file2 = new File(path, fileName);
                    try {
                        file.getFileItem().write(file2);
                        json.put("studentPic", "../studentPic/" + fileName);
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


    /**
     * 模糊查找学生
     */
    @RequestMapping(value = "/selectStudent")
    @ResponseBody
    public JSONObject selectStudent(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        PageSelect page = new PageSelect();
        page.setPageNo(json.getInt("pageIndex"));
        page.setPageSize(json.getInt("pageSize"));
        String keyword = json.getString("keyword");
        String instituteId = json.getString("instituteNo");
        String pId = json.getString("pId");
        String classNo = json.getString("classNo");
        json.clear();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("instituteId", instituteId);
        map.put("pId", pId);
        map.put("classNo", classNo);
        map.put("keyword", keyword);
        map.put("firstRecord", page.getFirstRecord());
        map.put("pageSize", page.getPageSize());

        if ((now - before) < timeOut) {
            List<Student> array = service.selectStudent(map);
            page.setTotalRecords(service.selectTotal(map));

            //给学生添加序号
            int i = 1;
            for (Student student : array) {
                student.setOrder(i++);
            }

            json.put("array", array);
            json.put("totalPage", page.getTotalPages());
            json.put("code", now);
            json.put("account", account);
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    //查询学院下所有学生
    @RequestMapping(value = "/getStudentByInstituteId")
    @ResponseBody
    public JSONObject getStudentByInstituteId(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        PageSelect page = new PageSelect();
        page.setPageNo(json.getInt("pageIndex"));
        page.setPageSize(json.getInt("pageSize"));
        String instituteId = json.getString("instituteId");
        String pId = json.getString("pId");
        String classNo = json.getString("classNo");
        String keyword = json.getString("keyword");
        json.clear();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("instituteId", instituteId);
        map.put("pId", pId);
        map.put("classNo", classNo);
        map.put("keyword", keyword);
        map.put("firstRecord", page.getFirstRecord());
        map.put("pageSize", page.getPageSize());

        if ((now - before) < timeOut) {
            List<Student> array = service.getStudentByInstituteId(map);
            page.setTotalRecords(service.getTotal(map));
            int totalPages = page.getTotalPages();

            //给学生添加序号
            int i = 1;
            for (Student student : array) {
                student.setOrder(i++);
            }

            json.put("array", array);
            json.put("totalPage", page.getTotalPages());
            json.put("code", now);
            json.put("account", account);
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    //查询班级所有学生
    @RequestMapping(value = "/getStudentByClassNo")
    @ResponseBody
    public JSONObject getStudentByClassNo(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String classNo = json.getString("classNo");
        json.clear();

        if ((now - before) < timeOut) {
            List<Student> array = service.getStudentByClassNo(classNo);

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

    //修改
    @RequestMapping(value = "/updateStudent")
    @ResponseBody
    public JSONObject updatePassword(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        Student student = new Student();
        student.setStudentNo(json.getString("studentNo"));
        student.setStudentName(json.getString("studentName"));
        student.setStudentMail(json.getString("studentMail"));
        student.setStudentPicture(json.getString("studentPicture")); //照片
        student.setStudentTell(json.getString("studentTell"));
        student.setClassNo(json.getString("classNo"));
        student.setId(json.getString("id"));
        student.setStudentSex(json.getString("studentSex"));
        student.setpId(json.getString("pId"));
        student.setInstituteId(json.getString("instituteId"));

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                service.updateStudent(student);

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

    //获取某学生信息
    @RequestMapping(value = "/getStudent")
    @ResponseBody
    public JSONObject getStudent(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String id = json.getString("id");
        json.clear();

        if ((now - before) < timeOut) {
            Student student = service.getStudent(id);

            json.put("StudentVo", student);
            json.put("code", now);
            json.put("account", account);
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    //冻结学生
    @RequestMapping(value = "/freezeStudent")
    @ResponseBody
    public JSONObject freezeStudent(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        JSONArray ids = json.getJSONArray("ids");

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                for (int i = 0; i < ids.size(); i++) {
                    service.freezeStudent(ids.getString(i));
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

    //解冻学生
    @RequestMapping(value = "/unFreezeStudent")
    @ResponseBody
    public JSONObject unFreezeStudent(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        JSONArray ids = json.getJSONArray("ids");

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                for (int i = 0; i < ids.size(); i++) {
                    service.unFreezeStudent(ids.getString(i));
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

    //删除学生
    @RequestMapping(value = "/deleteStudent")
    @ResponseBody
    public JSONObject deleteStudentBatch(@RequestBody JSONObject json) {
        long before = Long.parseLong(json.getString("code"));
        String account = json.getString("account");
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        JSONArray ids = json.getJSONArray("ids");

        if ((now - before) < timeOut) {
            if (TeacherController.isAllow(groupId) == true) {
                for (int i = 0; i < ids.size(); i++) {
                    service.deleteStudent(ids.getString(i));
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
