package ocean.structure.factory;

public class Jeep implements Transportation {

    private String engine;
    private Double fee;

    public Jeep(String engine, Double fee){
        this.engine = engine;
        this.fee = fee;
    }

    public void recharge(){
        System.out.println("this is the private method");
        System.out.println("---------------------------");
    }
    public void move() {
        System.out.println("speed in 100 km/h");
    }

    public void park(String address) {
        System.out.println("parking in the parking lot");
        System.out.println("now i am in " + address);
    }

    @Override
    public void show() {
        System.out.println("if you want to have a jeep, you need to pay " + getFee() + "$");
        System.out.println("why the jeep is so expensive, you can get the answer from it's engine" + getEngine());
    }

    public String getEngine() {
        return engine;
    }

    public void setEngine(String engine) {
        this.engine = engine;
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }
}
