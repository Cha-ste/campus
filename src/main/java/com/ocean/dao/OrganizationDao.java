package com.ocean.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ocean.model.Organization;

@Repository
public interface OrganizationDao {
    void addOrganization(Organization organization);

    void deleteOrganization(String id);

    List<Organization> selectOrganization();

    void updateOrganization(Organization organization);

    List<Organization> selectOrganizationByName(String name);
}
