package com.typeMe.typerPackage.methods;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class GetRandomString {
	public static String randomString(String lang) {
		String randomString="";
		String raw="";
		try {
			//String raw="I LOVE INDIA";
			if(lang!=null) {
				if(lang.equals("english")) {
					raw="There have been several claims for the longest sentence in english language we can use the below code to prevent the opening hereby declare that all the statements made in this application are true complete and correct to the best of my knowledge and belief understand that in the event of any information being found supressed false or incorrect at any stage or ineligibility being detected before or after the Examination The dog is a pet animal A dog has sharp teeth so that it can eat flesh very easily it has four legs two ears two eyes a tail a mouth and a nose It is a very clever animal and is very useful in catching thieves It runs very fast barks loudly and attacks the strangers A dog saves the life of the master from danger One can find dogs everywhere in the world Dogs are a very faithful animal";
				}else if(lang.equals("assamese")) {
					raw="মাছৰোকা সাধাৰণতে উজ্জ্বল বৰণৰ সৰুৰ পৰা মধ্যমীয়া আকাৰৰ এবিধ চৰাইৰ গোষ্ঠী সমগ্ৰ বিশ্বত এই গোষ্ঠীৰ মুঠ ৯৩ টা প্ৰজাতি পোৱা যায় ভাৰতবৰ্ষত তাৰে ১২ টা স্থানীয় তথা এটা পৰিভ্ৰমী প্ৰজাতি পোৱা যায় এই গোষ্ঠীৰ সকলোবোৰ প্ৰজাতিৰে বৈশিষ্ট্য হল বৃহৎ মুণ্ড দীঘলীয়া আৰু জোঙা আকৃতিৰ ঠোঁট তথা চুটী নেজ প্ৰায়বোৰ প্ৰজাতিৰে গাৰ বৰণ উজ্জ্বল হয় আৰু মতা-মাইকীৰ মাজত বিশেষ পাৰ্থক্য থকা দেখা নাযায় মাছৰোকাই মাছৰ পৰা আৰম্ভ কৰি কেঁকোৰা বিভিন্ন পোক-পৰুৱা তথা অন্য চৰাইৰ পোৱালীও চিকাৰ কৰে৷";
				}
				
			}
			raw.replaceAll(",","");
			raw.replaceAll(".", "");
			raw.replaceAll("-","");
			raw.replaceAll("'","");
			String[] strSplit = raw.split(" ");
	        ArrayList<String> wordList = new ArrayList<String>(Arrays.asList(strSplit));
	        Collections.shuffle(wordList);
	        randomString= String.join(" ", wordList);
		}catch(Exception e) {
			System.out.println(e);
		}
		return randomString;
    }
}
