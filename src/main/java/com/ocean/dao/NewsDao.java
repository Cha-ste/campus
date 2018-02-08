package com.ocean.dao;

import java.util.List;
import java.util.Map;

import com.ocean.model.News;

@SuppressWarnings("rawtypes")
public interface NewsDao {
    /**
     * 模糊查询消息(后台)
     * 可以根据标题、时间、作者、类型来查找
     * 要解决的问题：前端，后台，数据库时间格式的转换
     * 前后台查看的消息不一样，前台只能看到已发布的消息，后台是所有
     *
     * @param key
     * @return
     */
    List<News> selectNews(Map map);

    /**
     * 计算符合条件的所有消息
     *
     * @param map
     * @return
     */
    int totalRecord(Map map);

    /**
     * 根据消息ID获取消息
     *
     * @param newsId
     * @return
     */
    News getNews(String newsId);

    /**
     * 消息模糊查询（前端）
     *
     * @param key
     * @return
     */
    List<News> selectNews02(Map map);

    /**
     * 保存消息
     * 消息的出事状态都是就绪
     *
     * @param news
     */
    void saveNews(News news);

    /**
     * 修改消息
     * 不能修改消息状态
     *
     * @param news
     */
    void updateNews(News news);

    /**
     * 发布消息
     * 将消息状态改为发布
     *
     * @param newsId
     */
    void publicNews(String newsId);

    /**
     * 过期
     * 将消息改为未发布状态
     *
     * @param newsId
     */
    void unPublicNews(String newsId);

    /**
     * 删除消息
     * 在数据库中删掉该消息
     *
     * @param newsId
     */
    void deleteNews(String newsId);

    /*******************************************/
    /*******************客户端********************/
    /*******************************************/
    List<News> selectClientNews(Map<String, Object> map);

    int getTotalRecord(Map<String, Object> map);

    News getClientNews(String newsId);
}
