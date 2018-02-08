package com.ocean.model;

import java.util.UUID;

public class Admin {
    public Admin() {
    }

    public Admin(String name, String tell, String groupId, String password, String instituteId, String email) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.tell = tell;
        this.groupId = groupId;
        this.password = password;
        this.instituteId = instituteId;
        this.email = email;
    }

    private String id;
    private String name;
    private String tell;
    private String groupId;
    private String password;
    private String instituteId;
    private String email;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTell() {
        return tell;
    }

    public void setTell(String tell) {
        this.tell = tell;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getInstituteId() {
        return instituteId;
    }

    public void setInstituteId(String instituteId) {
        this.instituteId = instituteId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
