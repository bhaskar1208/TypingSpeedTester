package com.typeMe.typerPackage.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.typeMe.typerPackage.methods.GetRandomString;

@Controller
public class MainController {
	
	@RequestMapping("/")
	public String homeMethod() {
		return "home";
	}
	@GetMapping("getRandomString")
	public @ResponseBody String getRandomString(@RequestParam("lang") String lang) {
		//String str=GetRandomString.randomString();
		String str=GetRandomString.randomString(lang);
		//System.out.println(str);
		return str;
	}
}
