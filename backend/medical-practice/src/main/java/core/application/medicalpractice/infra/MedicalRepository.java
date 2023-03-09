package core.application.medicalpractice.infra;

import java.sql.*;

public class MedicalRepository {

    public void Test ()
  {
    try
    {
      //étape 1: charger la classe de driver
      Class.forName("org.postgresql.Driver");
      //étape 2: créer l'objet de connexion
      String host = "postgresql-medical-practice.alwaysdata.net";
      String port = "5432";
      String data_base = "medical-practice_folders";
      String user = "medical-practice";
      String password = "8kPmx2.!XnW97pF"; 
      Connection conn = DriverManager.getConnection(
        "jdbc:postgresql://" + host + ":" + port + "/" + data_base, user, password);
      //étape 3: créer l'objet statement 
      Statement stmt = conn.createStatement();
      ResultSet res = stmt.executeQuery("SELECT * FROM Users");
      //étape 4: exécuter la requête
      while(res.next())
        System.out.println(res.getInt(1)+"  "+res.getString(2)
        +"  "+res.getString(3));
      //étape 5: fermez l'objet de connexion
      conn.close();
    }
    catch(Exception e){ 
      System.out.println(e);
    }
  }

}
