package com.ocean.model;

import java.util.UUID;

/**
 * 学院实体类
 */
public class Institute {
    private String instituteId;           //id
    private String instituteName;         //名称

    public String getInstituteId() {
        return instituteId;
    }

    public void setInstituteId(String instituteId) {
        this.instituteId = instituteId;
    }

    public String getInstituteName() {
        return instituteName;
    }

    public void setInstituteName(String instituteName) {
        this.instituteName = instituteName;
    }

    public Institute(String instituteName) {
        this.instituteId = UUID.randomUUID().toString();
        this.instituteName = instituteName;
    }

    public Institute() {
    }

}
