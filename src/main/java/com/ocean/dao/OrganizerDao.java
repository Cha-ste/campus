package com.ocean.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.ocean.model.Organizer;

@Repository
public interface OrganizerDao {
    /**
     * 添加机构成员
     *
     * @param organization
     */
    void addOrganizer(Organizer organizer);

    /**
     * 删除机构成员
     *
     * @param id
     */
    void deleteOrganizer(String id);

    /**
     * 修改机构成员
     *
     * @param organization
     */
    void updateOrganizer(Organizer organizer);

    /**
     * 模糊查询机构成员
     *
     * @param map
     * @return
     */
    List<Organizer> selectOrganizer(Map<String, Object> map);

    /**
     * 获取所有机构成员
     *
     * @return
     */
    List<Organizer> selectAll();

    /**
     * 获取符合条件的总记录数
     *
     * @param map
     * @return
     */
    int getTotalRecord(Map<String, Object> map);

    /**
     * 根据id查看机构人员
     *
     * @param id
     * @return
     */
    Organizer getOrganizer(String id);
}
