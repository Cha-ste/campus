package com.ocean.testAOP;

import org.springframework.stereotype.Component;

@Component
public class StudentDAOImpl implements StudentDAO{

	@Override
	public void addStudent(String str) {
		//数据处理
		System.out.println("添加了一个学生" + str);
		
	}

}
