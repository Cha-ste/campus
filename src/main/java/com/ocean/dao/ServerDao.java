package com.ocean.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.ocean.model.Server;

@Repository
public interface ServerDao {

    /**
     * 查询所有服务
     *
     * @return
     */
    List<Server> selectServer(Map map);

    /**
     * 获取符合条件的记录页数
     *
     * @param map
     * @return
     */
    int getTotalRecord(Map map);

    /**
     * 根据ID查找server
     *
     * @param serverId
     * @return
     */
    Server getServer(String serverId);

    /**
     * 添加服务
     */
    void addServer(Server server);

    /**
     * 修改服务
     *
     * @param server
     */
    void updateServer(Server server);

    /**
     * 删除服务
     *
     * @param serverId
     */
    void deleteServer(String serverId);

    /*********************************************************/
    /**
     * 客户端
     */
    /*********************************************************/
    List<Server> selectClientServer(Map<String, Object> map);
}
