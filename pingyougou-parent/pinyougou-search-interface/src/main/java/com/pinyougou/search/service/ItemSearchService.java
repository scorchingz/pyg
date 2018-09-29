package com.pinyougou.search.service;
/**
 * 搜索
 * @author Administrator
 *
 */

import java.util.List;
import java.util.Map;

public interface ItemSearchService {
	
	public Map<String,Object> search(Map searchMsp);
	
	/**
	 * 导入数据
	 * @param list
	 */
	public void importList(List list);
	
	/**
	 * 删除数据
	 * @param goodsIdsList
	 */
	public void deleteByGoodsIds(List goodsIdsList);
}
