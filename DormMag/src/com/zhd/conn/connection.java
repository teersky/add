package com.zhd.conn;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class connection {
	Connection conn;
	public Connection getConn(){
		try{
			Class.forName("com.mysql.jdbc.Driver");
			String url="jdbc:mysql://localhost/snow?useUnicode=true&characterEncoding=utf-8";
			String user="root";
			String password="admin";
			conn=DriverManager.getConnection(url, user, password);
		
			System.out.println(conn.getMetaData().getURL());
			return conn;
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return null;
		}
		
	}
	
	//关闭对象，释放资源
	public static void close(Connection connection,ResultSet rs,PreparedStatement ps){
		try {
			if (rs!=null) {
				rs.close();
				rs=null;
			}
			if (ps!=null) {
				ps.close();
				ps=null;
			}
			if (connection!=null&&(!connection.isClosed())) {
				connection.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
