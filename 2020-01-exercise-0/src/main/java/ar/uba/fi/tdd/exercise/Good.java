package ar.uba.fi.tdd.exercise;

public interface Good {

    int GOOD_SELL_IN_UPDATE = 1;
    int GOOD_QUALITY_UPDATE = 1;
    int GOOD_MIN_QUALITY = 0;
    int GOOD_MAX_QUALITY = 50;
    int GOOD_AFTER_SELL_FACTOR = 2;

    void update(Item item);
}
