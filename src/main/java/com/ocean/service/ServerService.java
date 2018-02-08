package com.ocean.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ocean.dao.ServerDao;
import com.ocean.model.Server;

@Service
public class ServerService {

    @Resource
    ServerDao dao;

    public List<Server> selectServer(Map map) {
        return dao.selectServer(map);
    }

    public int getTotalRecord(Map map) {
        return dao.getTotalRecord(map);
    }

    public Server getServer(String serverId) {
        return dao.getServer(serverId);
    }

    public void addServer(Server server) {
        dao.addServer(server);
    }

    public void updateServer(Server server) {
        dao.updateServer(server);
    }

    public void deleteServer(String serverId) {
        dao.deleteServer(serverId);
    }

    /*********************************************************/
    /**
     * 客户端
     */
    /*********************************************************/
    public List<Server> selectClientServer(Map<String, Object> map) {
        return dao.selectClientServer(map);
    }
}
