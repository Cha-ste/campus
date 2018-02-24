package ocean.other;

import java.io.OutputStream;

public class ConstructorMan {

    public ConstructorMan() {
    }

    public ConstructorMan(OutputStream out) {
        System.out.println(out);
    }

    public static void main(String[] args) {
        ConstructorMan test = new ConstructorMan(System.out);
    }
}


