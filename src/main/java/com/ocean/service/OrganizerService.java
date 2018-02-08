package com.ocean.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ocean.dao.OrganizerDao;
import com.ocean.model.Organizer;

@Service
public class OrganizerService {

    @Resource
    OrganizerDao dao;

    public void addOrganizer(Organizer organizer) {
        dao.addOrganizer(organizer);
    }

    public void deleteOrganizer(String id) {
        dao.deleteOrganizer(id);
    }

    public void updateOrganizer(Organizer organizer) {
        dao.updateOrganizer(organizer);
    }

    public List<Organizer> selectOrganizer(Map<String, Object> map) {
        return dao.selectOrganizer(map);
    }

    public int getTotalRecord(Map<String, Object> map) {
        return dao.getTotalRecord(map);
    }

    public Organizer getOrganizer(String id) {
        return dao.getOrganizer(id);
    }
}
