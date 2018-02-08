package com.ocean.testExcel;

import java.io.File;
import java.util.UUID;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

public class MyJXL_Excel {
	public static void main(String[] args) {
		createExcelFile();
		readExcelFile();
	}
	
	/**
	 * 创建Excel表并往表中添加数据
	 * 需要引入jxl jar包
	 */
	public static void createExcelFile()
	{
		//表头字段
		String [] title = {"id","name","sex"};
		//创建excel文件
		File file = new File("G:\\Coding\\test.xls");
		try {
			file.createNewFile();
			//创建工作簿
			WritableWorkbook workbook = Workbook.createWorkbook(file);
			//创建sheet
			WritableSheet sheet = workbook.createSheet("sheet1",0);
			Label label = null;
			
			//创建表头
			for(int i = 0; i < title.length; i++)
			{
				//单元格（第几列，第几行，内容）以坐标的形式标志位置
				label = new Label(i,0,title[i]);
				//添加到sheet中
				sheet.addCell(label);
			}
			
			//写入数据
			for (int i = 1; i < 11; i++) {
				label = new Label(0,i,UUID.randomUUID().toString());
				sheet.addCell(label);
				label = new Label(1,i,"user"+i);
				sheet.addCell(label);
				label = new Label(2,i,"男");
				sheet.addCell(label);
			}
			//写入操作
			workbook.write();
			//关闭流
			workbook.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * jxl解析Excel文件
	 * 需要引入jxl jar包
	 */
	public static void readExcelFile()
	{
		try {
			//创建workbook
			Workbook workbook = Workbook.getWorkbook(new File("G:\\Coding\\test.xls"));
			//获取第一个sheet
			Sheet sheet = workbook.getSheet(0);
			
			for (int i = 0; i < sheet.getRows(); i++) {
				for (int j = 0; j < sheet.getColumns(); j++) {
					Cell cell = sheet.getCell(j,i);
					System.out.print(cell.getContents() + "   ");
				}
				System.out.println();
				
			}
			workbook.close();
			
		} catch (BiffException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
