
package ar.uba.fi.tdd.exercise;

import java.util.HashMap;
import java.util.Map;

class GildedRose {
    Item[] items;

    private static final String AGED_BRIE = "Aged Brie";
    private static final String BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
    private static final String CONJURED = "Conjured";
    private static final String SULFURAS = "Sulfuras, Hand of Ragnaros";
    private static final Map<String, Good> GOODS = new HashMap<>();
    private static final Good normal = new Normal();

    static {
        GOODS.put(AGED_BRIE, new AgedBrie());
        GOODS.put(BACKSTAGE_PASSES, new BackStagePass());
        GOODS.put(CONJURED, new Conjured());
        GOODS.put(SULFURAS, new Sulfuras());
    }

    //Don't touch
    public GildedRose(Item[] _items) {
        items = _items;
    }

    public void updateItems() {
        for (Item item : items) {
            GOODS.getOrDefault(item.Name, normal).update(item);
        }
    }
}
