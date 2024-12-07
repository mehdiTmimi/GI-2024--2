package teste;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;



public class Teste {

	public Teste() {
		 String apiUrl = "http://localhost:3000/users/1"; 
		 
	        
	        HttpClient client = HttpClient.newHttpClient();

	       
	        HttpRequest request = HttpRequest.newBuilder()
	                .uri(URI.create(apiUrl))
	                .GET() 
	                .build();

	      
	        try {
	            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

	          
	            if (response.statusCode() == 200) {
	                System.out.println("Response: " + response.body());
	            } else {
	                System.out.println("Failed to fetch data. HTTP Code: " + response.statusCode());
	            }
	        } catch (IOException | InterruptedException e) {
	            e.printStackTrace();
	        }
	}
	public static void main(String[] args) {
		 new Teste();

	}

}
