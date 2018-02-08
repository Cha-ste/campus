package com.ocean.aop;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class loginAspect {

    Logger logger = LoggerFactory.getLogger(this.getClass());
    org.apache.log4j.Logger logger1 = org.apache.log4j.Logger.getLogger(this.getClass());

    @After(value = "execution(* com.ocean.controller.AdminController.login(..))")
    public void test(){
        logger.info("- - - - - - - - - - - -this is slog4j logger- - - - - - - - - - - ");
        logger1.info(" - - - - - - - - - - - this is apache logger- - - - - - - - - - - ");

    }
}
