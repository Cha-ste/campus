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

import com.ocean.model.Organizer;
import com.ocean.model.Teacher;

public class OrganizerJxlExcel {

    /**
     * 导入
     * 读取Excel表数据，存到机构人员列表中
     *
     * @param file 要读取的Excel文件
     * @return
     */
    public static List<Organizer> readExcel(File file, String organizationId) {
        //获取工作簿
        HSSFWorkbook workbook;
        //创建实例列表
        List<Organizer> list = new ArrayList<Organizer>();
        try {
            workbook = new HSSFWorkbook(new FileInputStream(file));
            //获取sheet，获取第一个sheet
            HSSFSheet sheet = workbook.getSheetAt(0);
            //跳过标题，从第二行开始读取
            for (int i = 1; i < sheet.getLastRowNum(); i++) {
                int j = 0;
                Organizer organizer = new Organizer();
                //创建一个行对象
                HSSFRow row = sheet.getRow(i);
                //为对象属性设置
                organizer.setId(UUID.randomUUID().toString());
                organizer.setOrganizationId(organizationId);
                ;
                organizer.setName(row.getCell(j++).getStringCellValue());
                organizer.setTell(new DecimalFormat("#").format(row.getCell(j++).getNumericCellValue()));
                organizer.setEmail(row.getCell(j++).getStringCellValue());

                list.add(organizer);
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
    public static void writeExcel(String path, List<Organizer> list, HttpServletRequest request, HttpServletResponse response) {
        String[] title = {"姓名", "电话", "邮箱"};
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
                Organizer organizer = list.get(i);
                int j = 0;       //列坐标
                //从第二行开始往工作表里写数据
                row1 = sheet.createRow(i + 1);
                row1.createCell(j++).setCellValue(organizer.getName());
                row1.createCell(j++).setCellValue(organizer.getTell());
                row1.createCell(j++).setCellValue(organizer.getEmail());
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
        String[] title = {"姓名", "电话", "邮箱"};
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
