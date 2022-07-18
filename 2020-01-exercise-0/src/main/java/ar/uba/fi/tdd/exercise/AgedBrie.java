package ar.uba.fi.tdd.exercise;

import static java.lang.Math.min;

public class AgedBrie implements Good {

    @Override
    public void update(Item item) {
        item.sellIn -= GOOD_SELL_IN_UPDATE;
        int newQuality = item.sellIn < 0 ? item.quality + (GOOD_QUALITY_UPDATE * GOOD_AFTER_SELL_FACTOR) : item.quality + GOOD_QUALITY_UPDATE;
        item.quality = min(newQuality, GOOD_MAX_QUALITY);
    }
}
