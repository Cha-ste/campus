package com.ocean.model;

/**
 * 消息类型实体类
 *
 * @author Ocean
 */
public class NewsType {
    private String newsTypeId;
    private String newsTypeName;

    public String getNewsTypeId() {
        return newsTypeId;
    }

    public void setNewsTypeId(String newsTypeId) {
        this.newsTypeId = newsTypeId;
    }

    public String getNewsTypeName() {
        return newsTypeName;
    }

    public void setNewsTypeName(String newsTypeName) {
        this.newsTypeName = newsTypeName;
    }

    @Override
    public String toString() {
        return "NewsType [newsTypeId=" + newsTypeId + ", newsTypeName=" + newsTypeName + "]";
    }

    public NewsType(String newsTypeId, String newsTypeName) {
        this.newsTypeId = newsTypeId;
        this.newsTypeName = newsTypeName;
    }

    public NewsType() {

    }

}
