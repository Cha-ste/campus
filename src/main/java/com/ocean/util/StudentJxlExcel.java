package com.ocean.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.ocean.model.Student;

public class StudentJxlExcel {

    /**
     * 导入
     * 读取Excel表数据，存到学生列表中
     *
     * @param file 要读取的Excel文件
     * @return
     */
    public static List<Student> readExcel(File file, Map<String, String> map) {
        //获取工作簿
        HSSFWorkbook workbook;
        //创建实例列表
        List<Student> list = new ArrayList<Student>();
        try {
            workbook = new HSSFWorkbook(new FileInputStream(file));
            //获取sheet，获取第一个sheet
            HSSFSheet sheet = workbook.getSheetAt(0);
            //跳过标题，从第二行开始读取
            for (int i = 1; i < sheet.getLastRowNum(); i++) {
                int j = 0;
                Student student = new Student();
                //创建一个行对象
                HSSFRow row = sheet.getRow(i);
                //为对象属性设置
                student.setId(UUID.randomUUID().toString());
                student.setClassNo(map.get("classNo"));
                student.setpId(map.get("pId"));
                student.setInstituteId(map.get("instituteId"));
                student.setStatus("1");
                student.setStudentPicture("./image/default.png");
                student.setStudentNo(new DecimalFormat("#").format(row.getCell(j++).getNumericCellValue()));
                student.setStudentName(row.getCell(j++).getStringCellValue());
                student.setStudentSex(row.getCell(j++).getStringCellValue());
                student.setStudentTell(new DecimalFormat("#").format(row.getCell(j++).getNumericCellValue()));
                student.setStudentMail(row.getCell(j++).getStringCellValue());
                list.add(student);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }


        return list;
    }

    /**
     * 导出
     * 往Excel表写入数据
     *
     * @param file
     */
    public static void writeExcel(String path, List<Student> list) {
        String[] title = {"学号", "姓名", "性别", "电话", "邮箱"};
        try {
            //创建工作簿
            HSSFWorkbook workbook = new HSSFWorkbook();
            //创建sheet
            HSSFSheet sheet = workbook.createSheet();
            //创建行对象
            HSSFRow row = sheet.createRow(0);
            //创建列对象
            HSSFCell cell = null;
            //建立表头
            for (int i = 0; i < title.length; i++) {
                cell = row.createCell(i);
                cell.setCellValue(title[i]);
            }

            //创建行对象
            HSSFRow row1 = null;
            //往sheet添加数据
            for (int i = 0; i < list.size(); i++) {
                Student student = list.get(i);
                int j = 0;       //列坐标
                //从第二行开始往工作表里写数据
                row1 = sheet.createRow(i + 1);
                row1.createCell(j++).setCellValue(student.getStudentNo());
                row1.createCell(j++).setCellValue(student.getStudentName());
                row1.createCell(j++).setCellValue(student.getStudentSex());
                row1.createCell(j++).setCellValue(student.getStudentTell());
                row1.createCell(j++).setCellValue(student.getStudentMail());
            }
            File file = new File(path + "StudentVo" + System.currentTimeMillis() + ".xls");
            FileOutputStream stream = FileUtils.openOutputStream(file);
            //写出sheet表
            workbook.write(stream);
            //关闭流
            stream.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //下载模板
    public static void tamplate(String path) {
        String[] title = {"学号", "姓名", "性别", "电话", "邮箱"};
        try {
            //创建工作簿
            HSSFWorkbook workbook = new HSSFWorkbook();
            //创建sheet
            HSSFSheet sheet = workbook.createSheet();
            //创建行对象
            HSSFRow row = sheet.createRow(0);
            HSSFCell cell = null;
            //建立表头
            for (int i = 0; i < title.length; i++) {
                cell = row.createCell(i);
                cell.setCellValue(title[i]);
            }
            File file = new File(path + System.currentTimeMillis() + ".xls");
            FileOutputStream stream = FileUtils.openOutputStream(file);
            //写出sheet表
            workbook.write(stream);
            //关闭流
            stream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        String path = "D:\\ecxel" + System.currentTimeMillis();
        tamplate(path);

    }
}
