package com.ocean.testAOP;

import org.springframework.stereotype.Component;

@Component
public interface StudentDAO {
	
	void addStudent(String str);
}
