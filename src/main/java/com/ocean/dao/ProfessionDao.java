package com.ocean.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ocean.model.Profession;

@Repository
public interface ProfessionDao {
    void deleteProfession(String pId);

    void addProfession(Profession profession);

    void updateProfession(Profession profession);

    List<Profession> selectProfession(String pName);

    List<Profession> getProfession(String instituteId);
}
