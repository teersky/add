package com.zhd.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.zhd.conn.connection;

public class dormAllocation extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Connection conn;
	private static PreparedStatement pstmt;
	public dormAllocation(){
		conn = new connection().getConn();
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
		String dormType = request.getParameter("dormType");
		response.setCharacterEncoding("UTF-8"); 
		if(dormType.equals("getAllDorm")){
			JSONArray jArray = new JSONArray();
			String sql1 = "select * from dormallocation";
			try {
				pstmt=conn.prepareStatement(sql1);
				ResultSet rs=pstmt.executeQuery();
				ResultSetMetaData data=rs.getMetaData();
				while(rs.next()){
					List<String> list=new ArrayList<String>();
					String name = "";
					Map<String, String> map = new HashMap<String, String>();
					int columnCount=data.getColumnCount();
					for(int i = 1; i <= columnCount; i++){
						 map.put(data.getColumnName(i), rs.getString(i));
						 list.add(rs.getString(i));
				 	}
					//System.out.println(list.get(3));
					if(list.get(3) != null && !list.get(3).isEmpty()){
						String []stuNum = list.get(3).split("&");
						int count=0;
						for(int i=0; i<stuNum.length;i++){
							String y = stuNum[i].toString();
							String year = y.substring(0, 4);
							String sql = "select name from "+ year +"year where stuNum = "+ stuNum[i]+"";
							try {
								pstmt=conn.prepareStatement(sql);
								ResultSet rs2=pstmt.executeQuery();
								while(rs2.next()){
									int cun=data.getColumnCount();
									name += rs2.getString(1)+"&";
								}
							} catch (Exception e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}
						count=0;
					}
					list.add(name.substring(0,name.length()));
			        jArray.put(list);
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			PrintWriter writer=response.getWriter();
			writer.write(jArray.toString());
		}
		
		if(dormType.equals("getEvery")){
			JSONArray jArray = new JSONArray();
			//String member[] = new String[6];  
			String mm = "";
			for(int i=1; i<7; i++){
				String num = request.getParameter("m"+i); 
				if(!request.getParameter("m"+i).equals("NaN")){
					//member[i-1] =  request.getParameter("m"+i);
					mm+=request.getParameter("m"+i)+",";
				}
			}
			String[] member = mm.split(",");
			System.out.println(member.length);
			for(int i=0; i<member.length;i++){
				String y = member[i].toString();
				String year = y.substring(0, 4);
				String sql = "select name from "+ year +"year where stuNum = "+ member[i]+"";
				try {
					pstmt=conn.prepareStatement(sql);
					ResultSet rs=pstmt.executeQuery();
					ResultSetMetaData data=rs.getMetaData();
					while(rs.next()){
				        jArray.put(rs.getString(1));
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			PrintWriter writer=response.getWriter();
			writer.write(jArray.toString());
		}
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}
}
