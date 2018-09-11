package com.pinyougou.sellergoods.service;
/**
 * 品牌接口
 * @author Administrator
 *
 */

import java.util.List;

import com.pinyougou.pojo.TbBrand;

public interface BrandService {
	public List<TbBrand> findAll();
}
