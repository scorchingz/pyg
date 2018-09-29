package com.pinyougou.sellergoods.service.impl;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.mapper.TbSpecificationMapper;
import com.pinyougou.mapper.TbSpecificationOptionMapper;
import com.pinyougou.pojo.TbSpecification;
import com.pinyougou.pojo.TbSpecificationExample;
import com.pinyougou.pojo.TbSpecificationExample.Criteria;

import com.pinyougou.pojo.TbSpecificationOption;
import com.pinyougou.pojo.TbSpecificationOptionExample;
import com.pinyougou.pojogroup.Specification; 
import com.pinyougou.sellergoods.service.SpecificationService;

import entity.PageResult;

/**
 * 服务实现层
 * @author Administrator
 *
 */
@Service
@Transactional
public class SpecificationServiceImpl implements SpecificationService {

	@Autowired
	private TbSpecificationMapper specificationMapper;
	@Autowired
	private TbSpecificationOptionMapper specificationOptionMapper;
	
	/**
	 * 查询全部
	 */
	@Override
	public List<TbSpecification> findAll() {
		return specificationMapper.selectByExample(null);
	}

	/**
	 * 按分页查询
	 */
	@Override
	public PageResult findPage(int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);		
		Page<TbSpecification> page=   (Page<TbSpecification>) specificationMapper.selectByExample(null);
		return new PageResult(page.getTotal(), page.getResult());
	}

	/**
	 * 增加
	 */
	@Override
	public void add(Specification specification) {
		//获取实体类
		TbSpecification tbSpecification = specification.getSpecification();
		specificationMapper.insert(tbSpecification);//插入规格	
		//获取选项规格集合
		List<TbSpecificationOption> specificationOptionList = specification.getSpecificationOptionList();
		//循环插入规格选项
		for (TbSpecificationOption option:specificationOptionList) {
			option.setSpecId(tbSpecification.getId());//设置规格id 
			specificationOptionMapper.insert(option);//新增规格
		}
		/*specificationMapper.insert(specification.getSpecification());
		for (TbSpecificationOption specificationOption: specification.getSpecificationOptionList()) {
			specificationOption.setSpecId(specification.getSpecification().getId());
			specificationOptionMapper.insert(specificationOption);
		}*/
		
	}

	
	/**
	 * 修改
	 */
	@Override
	public void update(Specification specification){
		//获取实体类
		TbSpecification tbSpecification = specification.getSpecification();
		specificationMapper.updateByPrimaryKey(tbSpecification);
		
		
		TbSpecificationOptionExample example = new TbSpecificationOptionExample();
		com.pinyougou.pojo.TbSpecificationOptionExample.Criteria criteria = example.createCriteria();
		criteria.andSpecIdEqualTo(tbSpecification.getId());
		specificationOptionMapper.deleteByExample(example);
		
		//获取选项规格集合
		List<TbSpecificationOption> specificationOptionList = specification.getSpecificationOptionList();
		for(TbSpecificationOption option :specificationOptionList ) {
			option.setSpecId(tbSpecification.getId());
			specificationOptionMapper.insert(option);
		}
		
		
		//specificationMapper.updateByPrimaryKey(specification);
	}	
	
	/**
	 * 根据ID获取实体
	 * @param id
	 * @return
	 */
	@Override
	public Specification findOne(Long id){
		Specification specification = new Specification();
		//获取规格实体类
		TbSpecification tbSpecification = specificationMapper.selectByPrimaryKey(id);
		specification.setSpecification(tbSpecification);
		
		//获取规格列表
		 TbSpecificationOptionExample example = new TbSpecificationOptionExample();//获取条件
		 com.pinyougou.pojo.TbSpecificationOptionExample.Criteria criteria = example.createCriteria();
		 criteria.andSpecIdEqualTo(id);//添加条件 
		 List<TbSpecificationOption> specificationOptionList = specificationOptionMapper.selectByExample(example);
		 //将查询出来的添加到SpecificationOptionList集合里面
		 specification.setSpecificationOptionList(specificationOptionList);
		 
		return  specification;//组合实体类
	}

	/**
	 * 批量删除
	 */
	@Override
	public void delete(Long[] ids) {
		for(Long id:ids){
			//删除规格表数据
			specificationMapper.deleteByPrimaryKey(id);
			//删除规格选项表数据
			TbSpecificationOptionExample example = new TbSpecificationOptionExample();
			com.pinyougou.pojo.TbSpecificationOptionExample.Criteria criteria = example.createCriteria();
			criteria.andSpecIdEqualTo(id);
			specificationOptionMapper.deleteByExample(example);
		}		
	}
	
	
		@Override
	public PageResult findPage(TbSpecification specification, int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		
		TbSpecificationExample example=new TbSpecificationExample();
		Criteria criteria = example.createCriteria();
		
		if(specification!=null){			
						if(specification.getSpecName()!=null && specification.getSpecName().length()>0){
				criteria.andSpecNameLike("%"+specification.getSpecName()+"%");
			}
	
		}
		
		Page<TbSpecification> page= (Page<TbSpecification>)specificationMapper.selectByExample(example);		
		return new PageResult(page.getTotal(), page.getResult());
	}

		@Override
		public List<Map> findOptionList() {
			return specificationMapper.findOptionList();
		}
	
}
