package ocean.structure.factory;

public class TransportationCreator implements TransportationFactoryInterface {
    @Override
    public Transportation createQuickly() {
        Transportation transportation = new Bike(500.0);
        return transportation;
    }

    @Override
    public Transportation createDelicately() {
        Transportation transportation = new Jeep("开发者", 100000.0);
        return transportation;
    }
}
