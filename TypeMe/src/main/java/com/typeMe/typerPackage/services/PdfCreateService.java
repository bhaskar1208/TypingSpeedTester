package com.typeMe.typerPackage.services;

import java.awt.Color;
import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Image;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfWriter;

import jakarta.servlet.http.HttpServletResponse;


@Service
public class PdfCreateService {
	public void export(HttpServletResponse response,String name,String address, String wpm, double accuracy, String lang) throws IOException {
		System.out.println("Lang: "+lang);
		
		//Get current time and date
        DateFormat dateFormatter = new SimpleDateFormat("dd MMMM yyyy h:mm a");
        String currentDateTime = dateFormatter.format(new Date());
        
        //Border rectangle
		Rectangle box=new Rectangle(600,500);
		//box.enableBorderSide(1);
		//box.enableBorderSide(2);
		//box.enableBorderSide(4);
		//box.enableBorderSide(8);
		//box.setBackgroundColor(Color.LIGHT_GRAY);
		//box.setBorderColor(Color.black);
		//box.setBorderWidth(10);
		Image bg=Image.getInstance("Images/bg1.jpg");
		bg.setAlignment(Image.UNDERLYING);
		bg.setAbsolutePosition(0, 0);
		bg.scaleAbsoluteHeight(500);
		bg.scaleAbsoluteWidth(600);
		
		
		//Creating the document
        Document document = new Document();
        document.setPageSize(box);
        
        PdfWriter.getInstance(document, response.getOutputStream());

        //Opening document
        document.open();
        
        //Adding the background image
        document.add(bg);
        
        //Font customization for Heading 
        Font fontHeading = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontHeading.setSize(30);
        fontHeading.setColor(Color.black);
        fontHeading.setStyle(4);//Underline style
        
        
        
        //Font customization for content
        Font fontContent = FontFactory.getFont(FontFactory.TIMES);
        fontContent.setSize(15);
        fontContent.setColor(Color.black);
        fontContent.setStyle(2); //Italic style
        
        //Bold content
        Font fontContentBold = FontFactory.getFont(FontFactory.TIMES);
        fontContentBold.setSize(15);
        fontContentBold.setColor(Color.black);
        fontContentBold.setStyle(2);
        fontContentBold.setStyle(1); //Bold style
        
        
        //Font customization for Organization stamp
        Font fontOrg = FontFactory.getFont(FontFactory.COURIER);
        fontOrg.setSize(13);
        
        //Font customization for footer text
        Font fontFooter=FontFactory.getFont(FontFactory.TIMES_ITALIC);
        fontFooter.setSize(12);
        
        //Logo 
        //String IMG="Images\\achievement.png";
        //String IMG="Images\\madal.png";
        String IMG="Images\\logo.png";
        File f=new File(IMG);
        if(f.exists()) {
        	Image image=Image.getInstance(IMG);
        	image.setAlignment(Element.ALIGN_CENTER);
            image.scaleAbsolute(100, 60);
            document.add(image);
        }
        

        //Heading Paragraph
        Paragraph heading = new Paragraph("CERTIFICATE OF ACHIEVEMENT", fontHeading);
        heading.setAlignment(Paragraph.ALIGN_CENTER);
        
        
        //Content paragraph
        Paragraph content = new Paragraph("This certificate is proudly awarded to ", fontContent);
        
        Chunk n=new Chunk(name,fontContentBold);
        content.add(n);
        
        content.add(" (Address: ");
        
        Chunk addr=new Chunk(address,fontContentBold);
        content.add(addr);
        
        content.add(") for typing in ");
        
        Chunk lg=new Chunk(lang.toUpperCase(),fontContentBold);
        content.add(lg);
        
        content.add(" with a speed of ");
        
        Chunk w=new Chunk(wpm, fontContentBold);
        content.add(w);
        
        content.add(" Word Per Minute(WPM) and an accuracy of ");
        
        Chunk a=new Chunk(String.valueOf(accuracy), fontContentBold);
        content.add(a);
        
        content.add("% .");
        
        content.setAlignment(Paragraph.ALIGN_JUSTIFIED);
        
        //Organization paragraph
        Paragraph paraOrg=new Paragraph("BJD Technologies Prv. Ltd.",fontOrg);
        paraOrg.setAlignment(Paragraph.ALIGN_LEFT);
        
        // Timestamp Paragraph
        Paragraph paraTimestamp=new Paragraph(currentDateTime,fontOrg);
        paraTimestamp.setAlignment(Paragraph.ALIGN_LEFT);
        
        //Sign paragraph
        Paragraph paraSign=new Paragraph("BHASKAR DEKA",fontOrg);
        paraSign.setAlignment(Paragraph.ALIGN_LEFT);
        
        // Footer paragraph
        Paragraph paraFooter=new Paragraph("This is system generated certificate, signature not required",fontFooter);
        paraFooter.setAlignment(Paragraph.ALIGN_CENTER);
        
        
        
        //Adding heading to document
        document.add(heading); 
        
        //Adding new blank line to document
        document.add( Chunk.NEWLINE );
        //document.add( Chunk.NEWLINE );
        
        //Adding Content to document
        document.add(content);
        
        //Adding new blank line to document
        document.add( Chunk.NEWLINE );
        
        //Adding Organization to document
        document.add(paraOrg);
        
        //Adding Timestamp to document
        document.add(paraTimestamp);
        
        //Adding sign to document
        //document.add(paraSign);
        
        //Adding new blank line to document
        document.add( Chunk.NEWLINE );
        
        
        IMG="Images\\achievement.png";
        f=new File(IMG);
        if(f.exists()) {
        	Image image=Image.getInstance(IMG);
        	image.setAlignment(Element.ALIGN_CENTER);
            image.scaleAbsolute(70, 50);
            document.add(image);
        }
        
        //Adding footer to document
        document.add(paraFooter);
       
        document.close();
    }
}
