package ar.uba.fi.tdd.exercise;

import static java.lang.Math.min;

public class BackStagePass implements Good {

    private static final int ZERO_TO_FIVE_FACTOR = 3;
    private static final int SIX_TO_TEN_FACTOR = 2;

    @Override
    public void update(Item item) {
        int newQuality = item.quality;
        if (item.sellIn >= 0 && item.sellIn <= 5) newQuality += (GOOD_SELL_IN_UPDATE * ZERO_TO_FIVE_FACTOR);
        if (item.sellIn > 5 && item.sellIn <= 10) newQuality += (GOOD_SELL_IN_UPDATE * SIX_TO_TEN_FACTOR);
        if (item.sellIn > 10) newQuality += GOOD_SELL_IN_UPDATE;
        item.sellIn -= GOOD_SELL_IN_UPDATE;
        if (item.sellIn < 0) newQuality = GOOD_MIN_QUALITY;
        item.quality = min(newQuality, GOOD_MAX_QUALITY);
    }
}
