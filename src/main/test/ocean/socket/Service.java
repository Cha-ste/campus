package ocean.socket;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Created by Ocean on 2017/9/22.
 */
public class Service {
    public static void main(String[] args) {
        try {
            System.out.println("server starting...");
            System.out.println("waiting client request...");
            ServerSocket serverSocket = new ServerSocket(8946);
            while (true) {
                Socket socket = serverSocket.accept();
                acceptClient(socket);
                System.out.println("--------------------------------");
                responseClient(socket);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void acceptClient(Socket socket) {
        try {
            InputStreamReader reader = new InputStreamReader(socket.getInputStream());
            BufferedReader bufferedReader = new BufferedReader(reader);
            String data;
            while ((data = bufferedReader.readLine()) != null) {
                System.out.println("client said that : " + data);
            }
//            reader.close();
//            bufferedReader.close();
//            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void responseClient(Socket socket){
        try {
            OutputStream outputStream = socket.getOutputStream();
            PrintWriter printWriter = new PrintWriter(outputStream);
            printWriter.write("欢迎访问服务器");
            /**
             * 做一些数据显示什么的
             */printWriter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
