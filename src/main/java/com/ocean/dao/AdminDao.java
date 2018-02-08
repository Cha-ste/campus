package com.ocean.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.ocean.model.Admin;

@Repository
public interface AdminDao {

    Admin login(String name);

    List<Admin> selectAdmin(String instituteId);

    List<Admin> selectAdminG(Map<String, String> map);

    Admin getAdmin(String name);

    void updateAdmin(Admin admin);

    void addAdmin(Admin admin);

    void deleteAdmin(String name);
}
