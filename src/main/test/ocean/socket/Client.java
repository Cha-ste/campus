package ocean.socket;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

/**
 * Created by Ocean on 2017/9/22.
 */
public class Client {
    public static void main(String[] args) {
        try {
            System.out.println("client starting...");
            Socket socket = new Socket("127.0.0.1", 8946);
            OutputStream os = socket.getOutputStream();
            PrintWriter printWriter = new PrintWriter(os);
            Scanner scanner = new Scanner(System.in);
            System.out.println("input something:");
            printWriter.write(scanner.next());
            printWriter.flush();

            os.close();
            printWriter.close();
            socket.close();
            System.out.println("client living");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
