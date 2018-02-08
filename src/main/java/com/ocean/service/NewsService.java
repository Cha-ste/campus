package com.ocean.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ocean.dao.NewsDao;
import com.ocean.model.News;

@Service

@SuppressWarnings("rawtypes")
public class NewsService {

    @Resource
    NewsDao dao;

    //后台
    public List<News> selectNews(Map map) {
        return dao.selectNews(map);
    }

    public int totalRecord(Map map) {
        return dao.totalRecord(map);
    }

    //前端
    public List<News> selectNews02(Map map) {
        return dao.selectNews02(map);
    }

    public void saveNews(News news) {
        dao.saveNews(news);
    }

    public News getNews(String newsId) {
        return dao.getNews(newsId);
    }

    public void updateNews(News news) {
        dao.updateNews(news);
    }

    public void publicNews(String newsId) {
        dao.publicNews(newsId);
    }

    public void unPublicNews(String newsId) {
        dao.unPublicNews(newsId);
    }

    public void deleteNews(String newsId) {
        dao.deleteNews(newsId);
    }

    /*******************************************/
    /*******************客户端********************/
    /*******************************************/

    public List<News> selectClientNews(Map<String, Object> map) {
        return dao.selectClientNews(map);
    }

    public int getTotalRecord(Map<String, Object> map) {
        return dao.getTotalRecord(map);
    }

    public News getClientNews(String newsId) {
        return dao.getClientNews(newsId);
    }
}
