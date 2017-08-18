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

@WebServlet(name = "conexion3", urlPatterns = {"/conexion3"})
public class conexion3 extends HttpServlet {
    
    
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        
        
        PrintWriter out = response.getWriter();
        
        
        out.println("[OK] Funciona Consulta Servlet de la Heladeria" + "<br>");
        
       

        try {
            
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            
            out.println("[OK] Funciona el Driver MySQL" + "<br>");
            
            
            Connection conMDB = DriverManager.getConnection("jdbc:mysql://localhost/cremo", "root", "root");
            
            out.println("[OK] Funciona Conectado con MariaDB" +  "<br>");
            

            PreparedStatement sentencia = conMDB.prepareStatement( "select * from item_vendido");
            out.println("[OK] Funciona Crear La Sentencia" + "<br>");
            
            
            ResultSet resultado = sentencia.executeQuery();//ResulSet pone el puntero en la primera fila de la tabla de la Base de datos.
            out.println("[OK] Funciona La Ejecucion Del Query" + "<br>");
            
             while( resultado.next() ){
              out.println("[OK] "  + resultado.getString(1) + ", " + resultado.getString(2) + ", " + resultado.getString(3) + "<br>") ;
            }
            
            sentencia = conMDB.prepareStatement( "select * from venta");
            resultado = sentencia.executeQuery();
            
            while( resultado.next() ){
              out.println("[OK] "  + resultado.getString(1) + ", " + resultado.getString(2) + ", " + resultado.getString(3) + "<br>");
            }
            
            
            
        } catch (Exception ex) {
            ex.printStackTrace();
            out.println("[ERROR] Hubo un Error: " + ex.getMessage());
        }
        
        
        
        out.close();
        
    }
    
    

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
         
        
        Gson convertir = new Gson();

        PrintWriter out = response.getWriter(); // PrintWriter imprime texto en un objeto. getWriter() devuelve un objeto PrintWriter.
        
        String texto = request.getReader().readLine();//getReader() devuelve el contenido de la respuesta. readLine() lee el contenido de la variable "texto" y lo retorna.
        
        TreeMap<String, String> objetoSabor = convertir.fromJson(texto, TreeMap.class);// Crea una lista treemap y convierte la respuesta de JSON a treemap..
        
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection conMDB = DriverManager.getConnection("jdbc:mysql://localhost/cremo", "root", "root");
            PreparedStatement sentencia = conMDB.prepareStatement("insert into venta (ven_hel_id,fecha) values (?,?)");
            
            sentencia.setString(1, objetoSabor.get("heladerias"));//"nombre" lo saca del objeto "sabor" en AJAX (sabor.nombre)
            sentencia.setString(2, objetoSabor.get("fecha"));
            //sentencia.setString(2, objetoSabor.get("sabores"));//"calorias" lo saca del objeto "calorias" en AJAX (sabor.calorias)
            //sentencia.setString(3, objetoSabor.get("calorias"));//"calorias" lo saca del objeto "calorias" en AJAX (sabor.calorias)
            sentencia.execute();
                  
            sentencia = conMDB.prepareStatement("insert into item_vendido (inv_sab_id, inv_cantidad) values (?,?)");
            sentencia.setString(1, objetoSabor.get("sabores"));
            sentencia.setString(2, objetoSabor.get("calorias"));
            
            sentencia.execute();
            
            out.println("OK");
            
        } catch (Exception ex) {
            ex.printStackTrace();
            out.println("UPS!!");
        }
        
        
        
        out.close();
         
    }


}