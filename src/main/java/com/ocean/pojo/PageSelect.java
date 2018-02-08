package com.ocean.pojo;

/**
 * 封装分页信息
 *
 * @author Ocean
 */

public class PageSelect {

    //查询记录数  
    private int totalRecords;

    //每页多少条数据  
    private int pageSize;

    //第几页  
    private int pageNo;

    /**
     * 总页数
     *
     * @return
     */
    public int getTotalPages() {
        if (totalRecords == 0)
            return 1;
        else
            return (totalRecords + pageSize - 1) / pageSize;
    }

    public int getFirstRecord() {
        if (pageNo == 1) {
            return 0;
        } else {
            return (pageNo - 1) * pageSize;
        }
    }

    /**
     * 取得首页
     *
     * @return
     */
    public int getTopPageNo() {
        return 1;
    }

    /**
     * 上一页
     *
     * @return
     */
    public int getPreviousPageNo() {
        if (pageNo <= 1) {
            return 1;
        }
        return pageNo - 1;
    }

    /**
     * 下一页
     *
     * @return
     */
    public int getNextPageNo() {
        if (pageNo >= getBottomPageNo()) {
            return getBottomPageNo();
        }
        return pageNo + 1;
    }

    /**
     * 取得尾页
     *
     * @return
     */
    public int getBottomPageNo() {
        return getTotalPages();
    }

    public int getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(int totalRecords) {
        this.totalRecords = totalRecords;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }
}
