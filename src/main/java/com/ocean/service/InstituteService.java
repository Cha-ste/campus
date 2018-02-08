package com.ocean.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ocean.dao.InstituteDao;
import com.ocean.model.Institute;

@Service
public class InstituteService {

    @Resource
    InstituteDao dao;

    public List<Institute> selectInstitute() {
        return dao.selectInstitute();
    }

    public void addInstitute(Institute institute) {
        dao.addInstitute(institute);
    }

    public void updateInstitute(Institute institute) {
        dao.updateInstitute(institute);
    }

    public void deleteInstitute(String id) {
        dao.deleteInstitute(id);
    }
}
