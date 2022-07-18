package ar.uba.fi.tdd.exercise;

import static java.lang.Math.max;

public class Conjured implements Good {

    private static final int CONJURED_UPDATE = GOOD_QUALITY_UPDATE * 2;

    @Override
    public void update(Item item) {
        item.sellIn -= GOOD_SELL_IN_UPDATE;
        int newQuality = item.sellIn < 0 ? item.quality - (CONJURED_UPDATE * GOOD_AFTER_SELL_FACTOR) : item.quality - CONJURED_UPDATE;
        item.quality = max(newQuality, GOOD_MIN_QUALITY);
    }
}
