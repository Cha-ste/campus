package com.ocean.model;

import java.util.UUID;

public class Organizer {
    private String id;
    private String organizationId;
    private String name;
    private String tell;
    private String email;
    private int order;

    public Organizer() {

    }

    public Organizer(String organizationId, String name, String tell, String email) {
        this.id = UUID.randomUUID().toString();
        this.organizationId = organizationId;
        this.name = name;
        this.tell = tell;
        this.email = email;
    }

    public Organizer(String id, String organizationId, String name, String tell, String email) {
        this.id = id;
        this.organizationId = organizationId;
        this.name = name;
        this.tell = tell;
        this.email = email;
    }


    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(String organizationId) {
        this.organizationId = organizationId;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
