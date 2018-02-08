package com.ocean.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ocean.model.News;
import com.ocean.pojo.PageSelect;
import com.ocean.service.NewsService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/news")
@SuppressWarnings({"rawtypes", "unchecked"})
public class NewsController {

    public final long timeOut = 30 * 60 * 1000;
    @Resource
    NewsService service;

    /**
     * 后台消息模糊查询+分页
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/selectNews")
    @ResponseBody
    public JSONObject selectNews(@RequestBody JSONObject json) {
        //权限
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        //分页对象
        PageSelect page = new PageSelect();
        page.setPageSize(json.getInt("pageSize"));
        page.setPageNo(json.getInt("pageIndex"));

        int pageSize = page.getPageSize();
        int firstRecord = page.getFirstRecord();
        String key = json.getString("keyword");
        String newsTypeId = json.getString("newsTypeId");
        String newsStatus = json.getString("status");

        json.clear();

        if ((now - before) < timeOut) {
            Map map = new HashMap();
            map.put("key", key);
            map.put("newsTypeId", newsTypeId);
            map.put("newsStatus", newsStatus);
            map.put("pageSize", pageSize);
            map.put("firstRecord", firstRecord);

            List<News> news = service.selectNews(map);

            for (News n : news) {
                char[] time = n.getNewsDate().toCharArray();
                char[] t = new char[20];
                for (int i = 0; i < 19; i++) {
                    t[i] = time[i];
                }
                n.setNewsDate(String.valueOf(t));
            }

            JSONArray jsonArray = JSONArray.fromObject(news);

            page.setTotalRecords(service.totalRecord(map));
            json.put("array", jsonArray);
            json.put("totalPage", page.getTotalPages());
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("groupId", groupId);
            json.put("result", "success");

        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    /**
     * 前端消息查询
     * @return
     */
    /*
	@RequestMapping(value = "/selectNews02")
	@ResponseBody
	public JSONArray selectNews02(@RequestBody JSONObject json)
	{
		NewsSelect key = new NewsSelect();
		key.setNewsAuthor(json.getString("newsAuthor"));
		key.setNewsDate(json.getString("newsDate"));
		key.setNewsTitle(json.getString("newsTitle"));
		key.setNewsTypeId(json.getString("newsTypeId"));
		List<News> news = service.selectNews02(key);
		JSONArray jsonArray = JSONArray.fromObject(news);
		
		return jsonArray;
	}*/

    /**
     * 消息保存
     */
    @RequestMapping(value = "/saveNews")
    @ResponseBody
    public JSONObject saveNews(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String newsId = UUID.randomUUID().toString();
        String newsTitle = json.getString("newsTitle");
        String newsAuthor = json.getString("newsAuthor");
        String newsContent = json.getString("newsContent");
        Date d = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String newsDate = format.format(d);
        String newsTypeId = json.getString("newsTypeId");
        String newsAbstract = json.getString("newsAbstract");
        json.clear();

        if ((now - before) < timeOut) {
            if (NewsController.isNewsManager(groupId) == true) {
                News news = new News(newsId, newsTitle, newsAuthor, newsDate, newsContent, newsTypeId, newsAbstract);
                service.saveNews(news);
                json.put("account", account);
                json.put("code", String.valueOf(now));
                json.put("groupId", groupId);
                json.put("result", "success");
            } else {
                json.put("result", "noPower");
            }

        } else {
            json.put("result", "timeOver");
        }


        return json;
    }

    @RequestMapping(value = "/getNews")
    @ResponseBody
    public JSONObject getNews(@RequestBody JSONObject json) {
        String newsId = json.getString("newsId");
        News news = service.getNews(newsId);
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");
        json.clear();

        if ((now - before) < timeOut) {
            json.put("newsTitle", news.getNewsTitle());
            json.put("newsAuthor", news.getNewsAuthor());
            json.put("newsAbstract", news.getNewsAbstract());
            json.put("newsTypeId", news.getNewsTypeId());
            json.put("newsContent", news.getNewsContent());
            json.put("account", account);
            json.put("code", String.valueOf(now));
            json.put("groupId", groupId);
            json.put("result", "success");
        } else {
            json.put("result", "timeOver");
        }
        return json;
    }

    @RequestMapping(value = "/updateNews")
    @ResponseBody
    public JSONObject updateNews(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String newsId = json.getString("newsId");
        String newsTitle = json.getString("newsTitle");
        String newsAuthor = json.getString("newsAuthor");
        String newsContent = json.getString("newsContent");
        Date d = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String newsDate = format.format(d);
        String newsTypeId = json.getString("newsTypeId");
        String newsAbstract = json.getString("newsAbstract");

        if ((now - before) < timeOut) {
            if (NewsController.isNewsManager(groupId) == true) {
                News news = new News(newsId, newsTitle, newsAuthor, newsDate, newsContent, newsTypeId, newsAbstract);
                service.updateNews(news);
                json.clear();
                json.put("account", account);
                json.put("code", String.valueOf(now));
                json.put("groupId", groupId);
                json.put("result", "success");
            } else {
                json.put("result", "noPower");
            }
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    /**
     * 消息发布
     *
     * @return
     */
    @RequestMapping(value = "/publicNews")
    @ResponseBody
    public JSONObject publicNews(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        if ((now - before) < timeOut) {
            if (NewsController.isNewsManager(groupId) == true) {
                String newsId = json.getString("newsId");
                json.clear();
                service.publicNews(newsId);
                json.put("account", account);
                json.put("code", String.valueOf(now));
                json.put("groupId", groupId);
                json.put("result", "success");
            } else {
                json.put("result", "noPower");
            }
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    @RequestMapping(value = "/unPublicNews")
    @ResponseBody
    public JSONObject unPublicNews(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String newsId = json.getString("newsId");
        json.clear();
        if ((now - before) < timeOut) {
            if (NewsController.isNewsManager(groupId) == true) {
                service.unPublicNews(newsId);
                json.put("account", account);
                json.put("code", String.valueOf(now));
                json.put("groupId", groupId);
                json.put("result", "success");
            } else {
                json.put("result", "noPower");
            }
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    @RequestMapping(value = "/deleteNews")
    @ResponseBody
    public JSONObject deleteNews(@RequestBody JSONObject json) {
        String account = json.getString("account");
        long before = Long.parseLong(json.getString("code"));
        long now = new Date().getTime();
        String[] groupId = json.getString("groupId").split(",");

        String newsId = json.getString("newsId");
        json.clear();

        if ((now - before) < timeOut) {
            if (NewsController.isNewsManager(groupId) == true) {
                service.deleteNews(newsId);
                json.put("account", account);
                json.put("code", String.valueOf(now));
                json.put("groupId", groupId);
                json.put("result", "success");
            } else {
                json.put("result", "noPower");
            }
        } else {
            json.put("result", "timeOver");
        }

        return json;
    }

    static boolean isNewsManager(String[] groupId) {
        boolean result = false;
        for (int i = 0; i < groupId.length; i++) {
            if (groupId[i].equals("1") || groupId[i].equals("4")) {
                result = true;
                break;
            }
        }
        return result;
    }
}
