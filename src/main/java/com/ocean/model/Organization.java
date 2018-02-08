package com.ocean.model;

import java.util.UUID;

public class Organization {
    private String id;
    private String name;

    public Organization() {
    }

    public Organization(String name) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
    }

    public Organization(String id, String name) {
        this.id = id;
        this.name = name;
    }

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


}
