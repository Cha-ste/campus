package com.ocean.testSpringMVC;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TestController {
	@RequestMapping("/testController")
	public ModelAndView output()
	{
		System.out.println("test the controller");
		ModelAndView modelAndView  = new ModelAndView();
		modelAndView.setViewName("WEB-INF/jsp/testController.jsp");
		return modelAndView;
	}
}
