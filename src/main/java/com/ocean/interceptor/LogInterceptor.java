package com.ocean.interceptor;

import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ocean.util.LogSaving;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.NamedThreadLocal;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class LogInterceptor implements HandlerInterceptor {
	
	private final Logger log = LoggerFactory.getLogger(getClass().getName());
	
	private static final ThreadLocal<Long> startTimeThreadLocal = new NamedThreadLocal<Long> ("ThreadLocal StartTime");

	public void afterCompletion(HttpServletRequest request, HttpServletResponse arg1, Object handler, Exception exception)
			throws Exception {
		//保存日志
//		LogSaving.loginLog(request, handler,exception,null);
		log.info("============controller执行完毕，并且视图渲染完成============");
	}

	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView modelAndView)
			throws Exception {
		log.info("--------------controller正在执行--------------");
		if(modelAndView != null)
		{
			log.info("ViewName: " + modelAndView.getViewName());
		}
		
	}

	public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exception {
		//设置开始时间
		long beginTime = System.currentTimeMillis();
		//线程绑定变量（该数据只有当前请求的线程可见）
		startTimeThreadLocal.set(beginTime);
		
		log.info("开始计时：{}", new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS").format(beginTime));
		log.info("---------------controller准备执行---------------");

		return true;
		
	}

}
