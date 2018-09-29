package com.itheima.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.itheima.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Reference
	private UserService userService;
	
	@RequestMapping("/showName")
	@ResponseBody
	public String showName() {
		
		return userService.getName();
	}
}
