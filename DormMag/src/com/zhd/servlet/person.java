package com.zhd.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.zhd.conn.connection;

public class person extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static Connection conn;
	private static PreparedStatement pstmt;
	
	public person() {
		conn =new connection().getConn();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
		String uid = request.getParameter("uid");
		response.setCharacterEncoding("UTF-8"); 
		JSONObject jObject=new JSONObject();
		String year = uid.substring(0,4);
		JSONArray jArray = new JSONArray();
		String sql1 = "select * from "+year+"year where stuNum = "+uid+"";
		try {
			pstmt=conn.prepareStatement(sql1);
			ResultSet rs=pstmt.executeQuery();
			ResultSetMetaData data=rs.getMetaData();
			while(rs.next()){
				Map<String, String> map = new HashMap<String, String>();
				int columnCount=data.getColumnCount();
				for(int i = 1; i <= columnCount; i++){
					 map.put(data.getColumnName(i), rs.getString(i));
			 	}
		        jArray.put(map);
		        System.out.println(rs.getString(1));
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		PrintWriter writer=response.getWriter();
		writer.write(jArray.toString());
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}
}
