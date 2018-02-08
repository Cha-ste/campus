package com.ocean.model;

/**
 * 消息实体类
 *
 * @newsnewsAuthor Ocean
 */
public class News {
    private String newsId;              //id
    private String newsTitle;            //标题
    private String newsAuthor;            //作者
    private String newsDate;            //日期
    private String newsContent;            //内容
    private String newsTypeId;            //消息类型id
    private String newsStatus;            //状态
    private String newsAbstract;        //新闻摘要
    private int order;

    public News(String newsId, String newsTitle, String newsAuthor, String newsDate, String newsContent,
                String newsTypeId, String newsStatus, String newsAbstract) {
        super();
        this.newsId = newsId;
        this.newsTitle = newsTitle;
        this.newsAuthor = newsAuthor;
        this.newsDate = newsDate;
        this.newsContent = newsContent;
        this.newsTypeId = newsTypeId;
        this.newsStatus = newsStatus;
        this.newsAbstract = newsAbstract;
    }

    public News(String newsId, String newsTitle, String newsAuthor, String newsDate, String newsContent,
                String newsTypeId, String newsAbstract) {
        this.newsId = newsId;
        this.newsTitle = newsTitle;
        this.newsAuthor = newsAuthor;
        this.newsDate = newsDate;
        this.newsContent = newsContent;
        this.newsTypeId = newsTypeId;
        this.newsAbstract = newsAbstract;
    }

    public String getNewsStatus() {
        return newsStatus;
    }

    public void setNewsStatus(String newsStatus) {
        this.newsStatus = newsStatus;
    }

    public String getNewsId() {
        return newsId;
    }

    public void setNewsId(String newsId) {
        this.newsId = newsId;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getNewsAuthor() {
        return newsAuthor;
    }

    public void setNewsAuthor(String newsAuthor) {
        this.newsAuthor = newsAuthor;
    }

    public String getNewsDate() {
        return newsDate;
    }

    public void setNewsDate(String newsDate) {
        this.newsDate = newsDate;
    }

    public String getNewsContent() {
        return newsContent;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent;
    }

    public String getNewsTypeId() {
        return newsTypeId;
    }

    public void setNewsTypeId(String newsTypeId) {
        this.newsTypeId = newsTypeId;
    }

    public String getNewsAbstract() {
        return newsAbstract;
    }

    public void setNewsAbstract(String newsAbstract) {
        this.newsAbstract = newsAbstract;
    }

    public News() {

    }

    public void setOrder(int order) {
        this.order = order;
    }

    public int getOrder() {
        return order;
    }

}
