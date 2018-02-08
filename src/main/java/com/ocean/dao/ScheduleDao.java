package com.ocean.dao;

import java.util.List;
import java.util.Map;

import com.ocean.model.Schedule;

/**
 * 教师学生课程表
 * 需求：能够根据教师来查找，该教师有什么课程，根据班级能够知道这个班一周下来的课程安排，数据库以一节课为单位
 * 解决方案1：在某个课程下添加教师和班级（同时），那么教师和班级就建立了关联。同时添加上课时间。
 * 待解决：如何避免上课时间的冲突，以及班级重复同一课程？时间该怎么去拆分
 * 解决方案2：在某个班级下添加课程选择教师和选择时间(一个页面，能够添加整天的课程，数组形式返回后台，)一个班级一个课程表。
 *
 * @author Ocean
 */
public interface ScheduleDao {

    /**
     * 给班级添加一节课
     *
     * @param schedule(teacherNo、classNo、dates、courseNo、instituteId)
     */
    void addCourseForClass(Schedule schedule);

    /**
     * 修改某班级的课程
     *
     * @param shedule
     */
    void updateCourseForClass(Schedule schedule);

    /**
     * 获取班级所有课程
     *
     * @param classNo
     * @return
     */
    List<Schedule> getScheduleInClass(Map<String, Object> map);

    int getCTotal(Map<String, Object> map);

    /**
     * 获取学院所有课程
     *
     * @param instituteId
     * @return
     */
    List<Schedule> getScheduleInInstitute(Map<String, Object> map);

    int getITotal(Map<String, Object> map);


    void deleteSchedule(String id);

    List<Schedule> getScheduleByClass(Map<String, String> map);

    List<Schedule> getScheduleByTeacherId(Map<String, String> map);

}
