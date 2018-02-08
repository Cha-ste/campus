package com.ocean.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.ocean.model.Score;

public class ScoreJxlExcel {

    /**
     * 导入
     * 读取Excel表数据，存到成绩列表中
     *
     * @param file 要读取的Excel文件
     * @param id   课程id
     * @return
     */
    public static List<Score> readExcel(File file, String courseId) {
        //获取工作簿
        HSSFWorkbook workbook;
        //创建实例列表
        List<Score> list = new ArrayList<Score>();
        try {
            workbook = new HSSFWorkbook(new FileInputStream(file));
            //获取sheet，获取第一个sheet
            HSSFSheet sheet = workbook.getSheetAt(0);
            //跳过标题，从第二行开始读取
            for (int i = 1; i < sheet.getLastRowNum(); i++) {
                int j = 0;
                Score score = new Score();
                //创建一个行对象
                HSSFRow row = sheet.getRow(i);
                //为对象属性设置
                score.setId(UUID.randomUUID().toString());
                score.setCourseId(courseId);
                score.setClassNo(row.getCell(j++).getStringCellValue());
                score.setStudentNo(new DecimalFormat("#").format(row.getCell(j++).getNumericCellValue()));
                score.setStudentName(row.getCell(j++).getStringCellValue());
                score.setpScore(String.valueOf(row.getCell(j++).getNumericCellValue()));
                score.setExamScore(String.valueOf(row.getCell(j++).getNumericCellValue()));
                score.setTotalScore(String.valueOf(row.getCell(j++).getNumericCellValue()));

                list.add(score);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }


        return list;
    }

    /**
     * 往Excel表写入数据（导出）
     *
     * @param file
     * @param list
     */
    public static void writeExcel(String path, List<Score> list, HttpServletRequest request, HttpServletResponse response) {
        String[] title = {"课程", "班级", "学号", "姓名", "平时成绩", "考试成绩", "总评成绩"};
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
                Score score = list.get(i);
                int j = 0;       //列坐标
                //从第二行开始往工作表里写数据
                row1 = sheet.createRow(i + 1);
                row1.createCell(j++).setCellValue(score.getCourseId());
                row1.createCell(j++).setCellValue(score.getClassNo());
                row1.createCell(j++).setCellValue(score.getStudentNo());
                row1.createCell(j++).setCellValue(score.getpScore());
                row1.createCell(j++).setCellValue(score.getExamScore());
                row1.createCell(j++).setCellValue(score.getTotalScore());
            }
            File file = new File(path + System.currentTimeMillis() + ".xls");
            FileOutputStream stream = FileUtils.openOutputStream(file);
            //写出sheet表
            workbook.write(stream);
            stream.close();

//				DownloadExcel.download(file.getPath(), response);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void tamplate(String path) {
        String[] title = {"课程", "班级", "学号", "姓名", "平时成绩", "考试成绩", "总评成绩"};
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
//		String instituteId = "11";
        String path = "D://excel";
//		File file = new File("D:\\1489719882407.xls");
//		readExcel(file, instituteId);
        tamplate(path);
        System.out.println("-----------------");
    }

}
