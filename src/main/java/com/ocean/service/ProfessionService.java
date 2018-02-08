package com.ocean.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ocean.dao.ProfessionDao;
import com.ocean.model.Profession;

@Service
public class ProfessionService {
    @Resource
    ProfessionDao dao;

    public List<Profession> selectProfession(String pName) {
        return dao.selectProfession(pName);
    }

    public void updateProfession(Profession profession) {
        dao.updateProfession(profession);
    }

    public void deleteProfession(String pId) {
        dao.deleteProfession(pId);
    }

    public void addProfession(Profession profession) {
        dao.addProfession(profession);
    }

    public List<Profession> getProfession(String instituteId) {
        return dao.getProfession(instituteId);
    }
}
