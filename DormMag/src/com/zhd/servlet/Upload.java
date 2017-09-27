package com.zhd.servlet;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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

public class Upload extends HttpServlet{
	private static final long serialVersionUID1 = 1L;
	private static Connection conn;
	private static PreparedStatement pstmt;
	
	public Upload() {
		conn =new connection().getConn();
	}
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			Music(request, response);
    	
	}
	public void Music(HttpServletRequest request,HttpServletResponse response)
			throws ServletException,IOException{
		
		String message=null;
		request.setCharacterEncoding("utf-8");
    	
		//String uploadpath="data/";
    	
    	String t=Thread.currentThread().getContextClassLoader().getResource("").getPath(); 
    	int num=t.indexOf(".metadata");
    	String uploadpath=t.substring(1,num).replace('/', '\\')+"DormManage\\WebContent\\data\\";
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
    				message="�ļ�̫�󣬲��ó���10M";
    				break;
    			}
    			
    			File saveFile=new File(uploadpath,filePath);
    			boolean flag=filter.accept(saveFile);
    			
    			if(!flag){
    				message="��֧�ֵĸ�ʽ����ѡ���ļ���ʽΪ.xls";
    				break;
    			}else{
    				try {
						item.write(saveFile);
						message="�ļ��ϴ��ɹ�";
						System.out.println(message);
						String fileName = uploadpath;
					    File file = new File(fileName+filePath);//�����ļ�������һ���ļ�����
					    Workbook wb;
						try {
							String outPut="";
							List nameList = new ArrayList();
							List list1 = new ArrayList();
							wb = Workbook.getWorkbook(file);
							Sheet[] sheets = wb.getSheets();       
							// ��ñ���       
							int pages = sheets.length;
							Sheet sheetT = wb.getSheet(0);//�ӹ�������ȡ��ҳ��ȡ����������ʱ��ȿ�������������ã�Ҳ���������
						    int j_l=sheetT.getColumns();
						   
							for(int z=0;z<pages;z++){
								Sheet sheet = wb.getSheet(z);//�ӹ�������ȡ��ҳ��ȡ����������ʱ��ȿ�������������ã�Ҳ���������
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
						    
						    if(beReady) {  
						    	for(int r=0; r<list1.size();r++){
						    		List xxList=new ArrayList();
						    		xxList=(List) list1.get(r);
						    		String lt="";
						    		for(int p=0;p<xxList.size();p++){
						    			if(p>=xxList.size()-1){
						    				lt=lt+"'"+xxList.get(p)+"'";
						    				break;
						    			}
						    			lt=lt+"'"+xxList.get(p)+"',";
						    		}
						    		String sql1="select * from "+table+"year where stuNum="+xxList.get(0)+"";
					    			pstmt=conn.prepareStatement(sql1);
					    			ResultSet rs1=pstmt.executeQuery();
						    		if(rs1.next()){
						    			continue;
						    		}else{
						    			String  insert="insert into "+table+"year (stuNum, name, sex, nation, brithday, IDCard, collage, major, class, address, phone, QQNum, remarks) VALUE("+lt+")";
						    			pstmt=conn.prepareStatement(insert);
						    			pstmt.executeUpdate();
							    		
						    		}
						    		xxList=null;
						    	}
						    } else {  
						    	Statement stmt = conn.createStatement();
						    	String sql = "CREATE TABLE `"+table+"year`( `stuNum` VARCHAR(20) PRIMARY KEY NOT NULL, `name` VARCHAR(30) NOT NULL, `sex` VARCHAR(4) NOT NULL,`nation` VARCHAR(20) NOT NULL, `brithday` VARCHAR(20) NOT NULL, `IDCard` VARCHAR(30) NOT NULL, `collage` VARCHAR(30) NOT NULL, `major` VARCHAR(30) NOT NULL, `class` VARCHAR(20) NOT NULL, `address` VARCHAR(30) NOT NULL,`phone` VARCHAR(30) NOT NULL,`QQNum` VARCHAR(30) NOT NULL,`remarks` VARCHAR(200), `dormNum` VARCHAR(30))";
						    	
						    	stmt.execute(sql);
						    	for(int r=0; r<list1.size();r++){
						    		List xxList=new ArrayList();
						    		xxList=(List) list1.get(r);
						    		String lt="";
						    		for(int p=0;p<xxList.size();p++){
						    			if(p>=xxList.size()-1){
						    				lt=lt+"'"+xxList.get(p)+"'";
						    				break;
						    			}
						    			lt=lt+"'"+xxList.get(p)+"',";
						    		}
						    		String  insert="insert into "+table+"year (stuNum, name, sex, nation, brithday, IDCard, collage, major, class, address, phone, QQNum, remarks) VALUE("+lt+")";
					    			pstmt=conn.prepareStatement(insert);
					    			pstmt.executeUpdate();
						    		xxList=null;
						    		//request.setAttribute("message", message);
									//request.getRequestDispatcher("index.jsp").forward(request, response);
						    	}
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
	
}