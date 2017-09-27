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
import java.util.Map;
 
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.zhd.conn.connection;

@SuppressWarnings("serial")
public class test1 extends HttpServlet{
	
	private Connection conn;
	private PreparedStatement pstmt;

	public test1() {
		conn =new connection().getConn();
	}

		/**
		 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
		 */
		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			doPost(request,response);
			String user = request.getParameter("username");
			response.setCharacterEncoding("UTF-8"); 
			String sql1="select * from 2017year";
			JSONObject jObject=new JSONObject();
			//声明一个Hash对象并添加数据
			//Map hp =  new HashMap();
			try {
				pstmt=conn.prepareStatement(sql1);
				ResultSet rs=pstmt.executeQuery();
				ResultSetMetaData data=rs.getMetaData();
				while(rs.next()){
					 Map<String, String> map1 = new HashMap<String, String>();
					 int columnCount=data.getColumnCount();
					
					 for(int i = 1; i <= columnCount; i++){
						 map1.put(data.getColumnName(i), rs.getString(i));
					 }
				       /* map1.put(data.getColumnName(1), rs.getString(2));
				        map1.put(data.getColumnName(2), rs.getString(3));
				        map1.put(data.getColumnName(3), "汉");
				        map1.put(data.getColumnName(4), rs.getString(4));
				        map1.put(data.getColumnName(5), rs.getString(5));
				        map1.put(data.getColumnName(6), rs.getString(6));
				        map1.put(data.getColumnName(7), rs.getString(7));
				        map1.put(data.getColumnName(8), rs.getString(8));
				        map1.put(data.getColumnName(9), rs.getString(9));
				        String roomNum = rs.getString(10);
				        map1.put("roomNum", roomNum);*/
				        
				        JSONArray jArray = new JSONArray();
				        jArray.put(map1);
				        
				        jObject.put(rs.getString(1), jArray);
				        
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			PrintWriter writer=response.getWriter();
			writer.write(jObject.toString());
		}

		/**
		 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
		 */
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		}
}
