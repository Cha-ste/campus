package com.ocean.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ocean.dao.AdminDao;
import com.ocean.model.Admin;

@Service
public class AdminService {
    @Resource
    AdminDao dao;

    public Admin login(String name) {
        return dao.login(name);
    }

    public List<Admin> selectAdmin(String instituteId) {
        return dao.selectAdmin(instituteId);
    }

    public List<Admin> selectAdminG(Map<String, String> map) {
        return dao.selectAdminG(map);
    }

    public Admin getAdmin(String name) {
        return dao.getAdmin(name);
    }

    public void updateAdmin(Admin admin) {
        dao.updateAdmin(admin);
    }

    public void addAdmin(Admin admin) {
        dao.addAdmin(admin);
    }

    public void deleteAdmin(String name) {
        dao.deleteAdmin(name);
    }
}
