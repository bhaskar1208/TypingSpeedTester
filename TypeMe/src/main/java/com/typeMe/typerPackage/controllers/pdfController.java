package com.typeMe.typerPackage.controllers;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import com.typeMe.typerPackage.services.PdfCreateService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



@Controller
public class pdfController {
	
	private final PdfCreateService pdfcreateservice;
	
	public pdfController(PdfCreateService pdfcreateservice) {
		this.pdfcreateservice= pdfcreateservice;
	}
	
	String name="",address="",wpm="",lang="";
	double accuracy=0;
	
	@GetMapping("createPDF")
	public void generatePDF(HttpServletResponse response,HttpServletRequest request) {
		name=request.getParameter("name");
		address=request.getParameter("address");
		wpm=request.getParameter("wpm");
		lang=request.getParameter("lang");
		if(request.getParameter("accuracy")!=null) {
			accuracy=Math.round(Double.parseDouble(request.getParameter("accuracy")));
		}
		if(name!="" && address!="" && wpm!="" && accuracy!=0 && lang!="") {
			System.out.println("Language:" +lang);
			response.setContentType("application/pdf");
	        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd:hh:mm:ss");
	        String currentDateTime = dateFormatter.format(new Date());

	        String headerKey = "Content-Disposition";
	        String headerValue = "attachment; filename=Certificate_"+name.replaceAll(" ","-")+"_"+ currentDateTime + ".pdf";
	        response.setHeader(headerKey, headerValue);

	        try {
				this.pdfcreateservice.export(response,name,address,wpm,accuracy,lang);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
    }
}
