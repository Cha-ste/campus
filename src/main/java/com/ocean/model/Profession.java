package com.ocean.model;


/**
 * 专业实体类
 *
 * @author Ocean
 */
public class Profession {
    private String pId;
    private String pName;
    private String iNo;

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }

    public String getpName() {
        return pName;
    }

    public void setpName(String pName) {
        this.pName = pName;
    }

    public String getiNo() {
        return iNo;
    }

    public void setiNo(String iNo) {
        this.iNo = iNo;
    }

    public Profession(String pId, String pName, String iNo) {
        this.pId = pId;
        this.pName = pName;
        this.iNo = iNo;
    }

    public Profession(String pId, String pName) {
        this.pId = pId;
        this.pName = pName;
    }

    public Profession() {
    }


}
