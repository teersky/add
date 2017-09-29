package com.zhd.servlet;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.filefilter.SuffixFileFilter;

import com.zhd.conn.connection;

public class UploadBackups extends HttpServlet{
	private static final long serialVersionUID1 = 1L;
	private static Connection conn;
	private static PreparedStatement pstmt;
	
	public UploadBackups() {
		conn =new connection().getConn();
	}
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			addMsg(request, response);
    	
	}
	public void addMsg(HttpServletRequest request,HttpServletResponse response)
			throws ServletException,IOException{
		
		String message=null;
		request.setCharacterEncoding("utf-8");
    	
    	String t=Thread.currentThread().getContextClassLoader().getResource("").getPath(); 
    	int num=t.indexOf(".metadata");
    	String uploadpath=t.substring(1,num).replace('/', '/')+"DormMag/WebContent/data/";
    	System.out.println(uploadpath);
    	DiskFileItemFactory factory= new DiskFileItemFactory();
    	factory.setSizeThreshold(30*1024);
    	factory.setRepository(factory.getRepository());
    	ServletFileUpload upload=new ServletFileUpload(factory);
    	int maxsize=10*1024*1024;
    	List list=new ArrayList();
		try {
			list = upload.parseRequest(request);
		} catch (FileUploadException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
    	String []limit=new String[]{".xls"};
    	SuffixFileFilter filter= new SuffixFileFilter(limit);
    	Iterator iterator=list.iterator();
    	
    	while(iterator.hasNext()){
    		FileItem item=(FileItem)iterator.next();
    		if(!item.isFormField()){
    			String filePath=item.getName();
    			if(filePath!=null){
    				File filename=new File(item.getName()); 
    			}
    			if(item.getSize()>maxsize){
    				message="文件太大，不得超过10M";
    				break;
    			}
    			
    			File saveFile=new File(uploadpath,filePath);
    			boolean flag=filter.accept(saveFile);
    			
    			if(!flag){
    				message="不支持的格式，请选择文件格式为.xls";
    				break;
    			}else{
    				try {
						item.write(saveFile);
						message="文件上传成功";
						System.out.println(message);
						String fileName = uploadpath;
					    File file = new File(fileName+filePath);//根据文件名创建一个文件对象
					    Workbook wb;
						try {
							String outPut="";
							List nameList = new ArrayList();
							List list1 = new ArrayList();
							wb = Workbook.getWorkbook(file);
							Sheet[] sheets = wb.getSheets();       
							// 获得表数       
							int pages = sheets.length;
							Sheet sheetT = wb.getSheet(0);//从工作区中取得页，取得这个对象的时候既可以用名称来获得，也可以用序号
						    int j_l=sheetT.getColumns();
						   
							for(int z=0;z<pages;z++){
								Sheet sheet = wb.getSheet(z);//从工作区中取得页，取得这个对象的时候既可以用名称来获得，也可以用序号
							    int j_leng=sheet.getColumns();
							    for(int i=1; i < sheet.getRows(); i++){
							        for(int j=0; j < j_leng; j++){
							        	Cell cell = sheet.getCell(j,i);
								        nameList.add(cell.getContents());
							            if(j>=sheet.getColumns()-1){
							            	list1.add(nameList);
							            	nameList=new ArrayList();
							            	continue;
							            }
							        }
							    }
							}
						    String str="";
						    Calendar a=Calendar.getInstance();
						    String table=String.valueOf(a.get(Calendar.YEAR));
						    ResultSet rs = conn.getMetaData().getTables(null, null, table+"year", null); 
						    Boolean beReady=rs.next();
						    System.out.println(list1.size()%6);
						    if(beReady) { 
						    	int index = 0, count=0;
						    	String dormNum="";
						    	String oneDorm="", dormArr="";
						    	String numArr="";
						    	String memArr_B="", memArr_G="";
						    	for(int r=0; r<list1.size();r++){
						    		List xxList=new ArrayList();
						    		xxList=(List) list1.get(r);
						    		String lt="";
						    		for(int p=0;p<xxList.size();p++){
						    			if(p>=xxList.size()-1){
						    				lt=lt+"'"+xxList.get(p)+"'";
						    				oneDorm=(String) xxList.get(0);
						    				break;
						    			}
						    			
						    			lt=lt+"'"+xxList.get(p)+"',";
						    		}
						    		numArr = numArr + xxList.get(0)+"&";
						    		
						    		if(xxList.get(2).equals("男")){
						    			memArr_B = memArr_B + xxList.get(0)+"&";
						    		}else{
						    			memArr_G = memArr_G + xxList.get(0)+"&";
						    		}
						    		if(r==0){
						    			dormArr=oneDorm;
						    		}else{
						    			dormArr=dormArr+"&"+oneDorm;
						    		}
						    		
					    			if(count%6==0){
						    			index++;
						    			String sql2="select dormNum from dormallocation where id="+index+"";
						    			pstmt=conn.prepareStatement(sql2);
						    			ResultSet rs2=pstmt.executeQuery();
						    			while(rs2.next()){
						    				dormNum = rs2.getString(1);
										}
						    		}
					    			if(count/6 < list1.size()/6){
						    			if(memArr_B.substring(0, memArr_B.length()-1).split("&").length==6){
						    				inertDormNum(memArr_B.substring(0, memArr_B.length()-1), table, dormNum, "1");
						    			}
						    			if(memArr_G.substring(0, memArr_G.length()-1).split("&").length==6){
						    				inertDormNum(memArr_G.substring(0, memArr_G.length()-1), table, dormNum, "0");
						    			}
					    			}else{
					    				if(memArr_B.substring(0, memArr_B.length()-1).split("&").length==list1.size()%6){
					    					inertDormNum(memArr_B.substring(0, memArr_B.length()-1), table, dormNum, "1");
					    				}
					    				if(memArr_G.substring(0, memArr_G.length()-1).split("&").length==list1.size()%6){
					    					inertDormNum(memArr_G.substring(0, memArr_G.length()-1), table, dormNum, "0");
					    				}
					    			}
					    			count++;
					    			if(count%6==0){
						    			numArr = "";
					    			}
					    			
					    			lt=lt+",'"+dormNum+"'";
					    			
					    			String sql1="select * from "+table+"year where stuNum="+xxList.get(0)+"";
					    			pstmt=conn.prepareStatement(sql1);
					    			ResultSet rs1=pstmt.executeQuery();
						    		if(rs1.next()){
						    			continue;
						    		}else{
						    			String insert="insert into "+table+"year (stuNum, name, sex, nation, brithday, IDCard, collage, major, class, address, phone, QQNum, remarks, dormNum) VALUE("+lt+")";
						    			pstmt=conn.prepareStatement(insert);
						    			pstmt.executeUpdate();
						    		}
						    		System.out.println(dormArr);
						    		xxList=null;
						    	}
						    	
						    } else {  
						    	Statement stmt = conn.createStatement();
						    	String sql = "CREATE TABLE `"+table+"year`( `stuNum` VARCHAR(20) PRIMARY KEY NOT NULL, `name` VARCHAR(30) NOT NULL, `sex` VARCHAR(4) NOT NULL,`nation` VARCHAR(20) NOT NULL, `brithday` VARCHAR(20) NOT NULL, `IDCard` VARCHAR(30) NOT NULL, `collage` VARCHAR(30) NOT NULL, `major` VARCHAR(30) NOT NULL, `class` VARCHAR(20) NOT NULL, `address` VARCHAR(30) NOT NULL,`phone` VARCHAR(30) NOT NULL,`QQNum` VARCHAR(30) NOT NULL,`remarks` VARCHAR(200), `dormNum` VARCHAR(30))";
						    	int index = 0, count=0;
						    	String dormNum="",remarks="";
						    	String oneDorm="", dormArr="";
						    	stmt.execute(sql);

						    	String numArr="";
						    	for(int r=0; r<list1.size();r++){
						    		List xxList=new ArrayList();
						    		xxList=(List) list1.get(r);
						    		String lt="";
						    		for(int p=0;p<xxList.size();p++){
						    			if(p>=xxList.size()-1){
						    				lt=lt+"'"+xxList.get(p)+"'";
						    				oneDorm=(String) xxList.get(0);
						    				break;
						    			}
						    			lt=lt+"'"+xxList.get(p)+"',";
						    		}
						    		numArr = numArr + xxList.get(0)+"&";
						    		
						    		if(r==0){
						    			dormArr=oneDorm;
						    		}else{
						    			dormArr=dormArr+"&"+oneDorm;
						    		}
						    		
						    		if(count%6==0){
						    			index++;
						    			String sql2="select dormNum from dormallocation where id="+index+"";
						    			pstmt=conn.prepareStatement(sql2);
						    			ResultSet rs2=pstmt.executeQuery();
						    			while(rs2.next()){
						    				dormNum = rs2.getString(1);
										}
						    		}
					    			count++;
					    			if(count%6==0){
					    				System.out.println(numArr);
						    			numArr = "";
					    			}
					    			lt=lt+",'"+dormNum+"'";
					    			String  insert="insert into "+table+"year (stuNum, name, sex, nation, brithday, IDCard, collage, major, class, address, phone, QQNum, remarks, dormNum) VALUE("+lt+")";
					    			pstmt=conn.prepareStatement(insert);
					    			pstmt.executeUpdate();
					    			
					    			xxList=null;
						    	}
						    	System.out.println(dormArr);
						    }
						
						} catch (Exception e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
    			}   			    			
    		}
    	}
    	
	}
	
	public void setDorm(String str){
		
	}
	
	public void inertDormNum(String str,String year, String dormNum, String sex){
		System.out.println(str);
		String  insertMember="UPDATE dormallocation SET grade = '"+year+"',member = '"+str+"' WHERE dormNum = '"+dormNum+"' and sex = '"+sex+"'";
		try {
			pstmt=conn.prepareStatement(insertMember);
			pstmt.executeUpdate();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}