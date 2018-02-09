package ocean.structure.factory;

public class Bike implements Transportation {
    private Double fee;

    public Bike(Double fee){
        this.fee = fee;
    }
    public void move() {
        System.out.println("i am an environmental tool which can go out freely");
    }

    public void park(String address) {
        System.out.println(" I can park in everywhere I want");
        System.out.println("and now I parking my bike in " + address);
    }

    @Override
    public void show() {
        System.out.println("As my power comes from my owner, so you just pay " + getFee() + "and then i will belong to you");
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }
}
