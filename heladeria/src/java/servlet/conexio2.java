package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import java.util.*;
import com.google.gson.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebServlet(name = "conexio2", urlPatterns = {"/conexio2"})
public class conexio2 extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       PrintWriter out = response.getWriter();
        
        
       out.println("[OK]Funciona el servlet de la heladeria");
       out.println("-----------");
       out.println("[OK]Funciona el servlet de la heladeria");
       out.println("-----------");
      
        try {
            
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            out.println("[OK]Funciona el Driver MySQL ");
            out.println("--------------------------");
            
            Connection conMariaDB = DriverManager.getConnection("jdbc:mysql://localhost/cremo","root","root");
            
            out.println("[OK]Funciona la conexion  con MariaDB ");
            out.println("--------------------------");
            
            PreparedStatement sentencia = conMariaDB.prepareStatement("select * from heladerias");
            
            out.println("[OK]Funciona crear sentencia ");
            out.println("--------------------------");
            
            ResultSet resultado = sentencia.executeQuery();
            
            out.println("[OK]Funciona la ejecucion del query ");
            out.println("--------------------------");
            
            while(resultado.next()){
            
            out.println("[OK]" + resultado.getString(1) + "," + resultado.getString(2) + "," + resultado.getString(3));
            
            
            }
            
        } catch (Exception ex) {
            ex.printStackTrace();
            
            out.println("[ERROR]Hubo un error " + ex.getMessage());
        }
       
       out.close();

    }

}
