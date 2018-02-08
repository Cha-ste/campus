package com.ocean.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ocean.dao.OrganizationDao;
import com.ocean.model.Organization;

@Service
public class OrganizationService {
    @Resource
    private OrganizationDao dao;

    public void addOrganization(Organization organization) {
        dao.addOrganization(organization);
    }

    public void deleteOrganization(String id) {
        dao.deleteOrganization(id);
    }

    public List<Organization> selectOrganization() {
        return dao.selectOrganization();
    }

    public void updateOrganization(Organization organization) {
        dao.updateOrganization(organization);
    }

    public List<Organization> selectOrganizationByName(String name) {

        return dao.selectOrganizationByName(name);
    }
}
