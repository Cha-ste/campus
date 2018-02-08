package com.ocean.util;

import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * 此类为JSON数据处理工具
 *
 * @author Ocean
 */
@SuppressWarnings("all")
public class JsonTool {
    public static JSONObject readJson(HttpServletRequest request, @RequestBody Map<String, Object> account,
                                      @RequestBody Map<String, Object> password) throws Exception {
        JSONObject jsonObject = new JSONObject();
        System.out.println(account);
        try {
            Map parameterMap = request.getParameterMap();
            // 通过循环遍历的方式获得key和value并set到JSONObject中
            Iterator paIter = parameterMap.keySet().iterator();
            while (paIter.hasNext()) {
                String key = paIter.next().toString();
                String[] values = (String[]) parameterMap.get(key);
                jsonObject.accumulate(key, values[0]);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
        return jsonObject;
    }
}
