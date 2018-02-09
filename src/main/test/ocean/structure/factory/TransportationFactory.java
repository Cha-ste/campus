package ocean.structure.factory;

public class TransportationFactory {
    public static Transportation createTransportation(String type) {
        switch (type) {
            case "jeep":
                return new Jeep("improver", 50000.0);
            case "bike":
                return new Bike(80.0);
            default:
                return null;
        }
    }
}
