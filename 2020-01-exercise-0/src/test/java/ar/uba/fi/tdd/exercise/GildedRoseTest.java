package ar.uba.fi.tdd.exercise;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class GildedRoseTest {

    @Test
    void foo() {
        Item[] items = new Item[]{new Item("fixme", 0, 0)};
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat("fixme").isEqualTo(app.items[0].Name);
    }

    @Test
    void updateNormalGood() {
        Item[] items = new Item[]{new Item("Normal", 5, 10)};
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat(app.items[0].Name).isEqualTo("Normal");
        assertThat(app.items[0].sellIn).isEqualTo(4);
        assertThat(app.items[0].quality).isEqualTo(9);
    }

    @Test
    void updateAgedBrie() {
        Item[] items = new Item[]{new Item("Aged Brie", 5, 10)};
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat(app.items[0].Name).isEqualTo("Aged Brie");
        assertThat(app.items[0].sellIn).isEqualTo(4);
        assertThat(app.items[0].quality).isEqualTo(11);
    }

    @Test
    void updateSulfuras() {
        Item[] items = new Item[]{new Item("Sulfuras, Hand of Ragnaros", 5, 80)};
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat(app.items[0].Name).isEqualTo("Sulfuras, Hand of Ragnaros");
        assertThat(app.items[0].sellIn).isEqualTo(5);
        assertThat(app.items[0].quality).isEqualTo(80);
    }

    @Test
    void updateBackstagePasses_SellInGreaterThanTen() {
        Item[] items = new Item[]{new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)};
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat(app.items[0].Name).isEqualTo("Backstage passes to a TAFKAL80ETC concert");
        assertThat(app.items[0].sellIn).isEqualTo(10);
        assertThat(app.items[0].quality).isEqualTo(11);
    }

    @Test
    void updateBackstagePasses_SellInEqualTen() {
        Item[] items = new Item[]{new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)};
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat(app.items[0].Name).isEqualTo("Backstage passes to a TAFKAL80ETC concert");
        assertThat(app.items[0].sellIn).isEqualTo(9);
        assertThat(app.items[0].quality).isEqualTo(12);
    }

    @Test
    void updateBackstagePasses_SellInlessThanTenGreaterThanFive() {
        Item[] items = new Item[]{new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10)};
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat(app.items[0].Name).isEqualTo("Backstage passes to a TAFKAL80ETC concert");
        assertThat(app.items[0].sellIn).isEqualTo(5);
        assertThat(app.items[0].quality).isEqualTo(12);
    }

    @Test
    void updateBackstagePasses_SellInEqualFive() {
        Item[] items = new Item[]{new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)};
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat(app.items[0].Name).isEqualTo("Backstage passes to a TAFKAL80ETC concert");
        assertThat(app.items[0].sellIn).isEqualTo(4);
        assertThat(app.items[0].quality).isEqualTo(13);
    }

    @Test
    void updateBackstagePasses_SellInLessThanFive() {
        Item[] items = new Item[]{new Item("Backstage passes to a TAFKAL80ETC concert", 2, 10)};
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat(app.items[0].Name).isEqualTo("Backstage passes to a TAFKAL80ETC concert");
        assertThat(app.items[0].sellIn).isEqualTo(1);
        assertThat(app.items[0].quality).isEqualTo(13);
    }

    @Test
    void updateBackstagePasses_SellInZero() {
        Item[] items = new Item[]{new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)};
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat(app.items[0].Name).isEqualTo("Backstage passes to a TAFKAL80ETC concert");
        assertThat(app.items[0].sellIn).isEqualTo(-1);
        assertThat(app.items[0].quality).isZero();
    }

    @Test
    void updateConjured() {
        Item[] items = new Item[]{new Item("Conjured", 5, 10)};
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat(app.items[0].Name).isEqualTo("Conjured");
        assertThat(app.items[0].sellIn).isEqualTo(4);
        assertThat(app.items[0].quality).isEqualTo(8);
    }

    @Test
    void QualityDegradesTwiceAsFast() {
        Item[] items = new Item[]{
                new Item("Normal", 0, 10),
                new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
                new Item("Sulfuras, Hand of Ragnaros", 0, 80),
                new Item("Aged Brie", 0, 10),
                new Item("Conjured", -1, 10),
        };
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat(app.items[0].Name).isEqualTo("Normal");
        assertThat(app.items[0].quality).isEqualTo(8);
        assertThat(app.items[1].Name).isEqualTo("Backstage passes to a TAFKAL80ETC concert");
        assertThat(app.items[1].quality).isZero();
        assertThat(app.items[2].Name).isEqualTo("Sulfuras, Hand of Ragnaros");
        assertThat(app.items[2].quality).isEqualTo(80);
        assertThat(app.items[3].Name).isEqualTo("Aged Brie");
        assertThat(app.items[3].quality).isEqualTo(12);
        assertThat(app.items[4].Name).isEqualTo("Conjured");
        assertThat(app.items[4].quality).isEqualTo(6);
    }

    @Test
    void QualityNotNegative() {
        Item[] items = new Item[]{
                new Item("Normal", 0, 0),
                new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0),
                new Item("Sulfuras, Hand of Ragnaros", 0, 80),
                new Item("Aged Brie", 0, 0),
                new Item("Conjured", 0, 0),
        };
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat(app.items[0].Name).isEqualTo("Normal");
        assertThat(app.items[0].quality).isZero();
        assertThat(app.items[1].Name).isEqualTo("Backstage passes to a TAFKAL80ETC concert");
        assertThat(app.items[1].quality).isZero();
        assertThat(app.items[2].Name).isEqualTo("Sulfuras, Hand of Ragnaros");
        assertThat(app.items[2].quality).isEqualTo(80);
        assertThat(app.items[3].Name).isEqualTo("Aged Brie");
        assertThat(app.items[3].quality).isEqualTo(2);
        assertThat(app.items[4].Name).isEqualTo("Conjured");
        assertThat(app.items[4].quality).isZero();
    }

    @Test
    void QualityNotGreaterThanFifty() {
        Item[] items = new Item[]{
                new Item("Normal", 30, 50),
                new Item("Backstage passes to a TAFKAL80ETC concert", 30, 50),
                new Item("Sulfuras, Hand of Ragnaros", 30, 80),
                new Item("Aged Brie", 30, 50),
                new Item("Conjured", 30, 50),
        };
        GildedRose app = new GildedRose(items);
        app.updateItems();
        assertThat(app.items[0].Name).isEqualTo("Normal");
        assertThat(app.items[0].quality).isEqualTo(49);
        assertThat(app.items[1].Name).isEqualTo("Backstage passes to a TAFKAL80ETC concert");
        assertThat(app.items[1].quality).isEqualTo(50);
        assertThat(app.items[2].Name).isEqualTo("Sulfuras, Hand of Ragnaros");
        assertThat(app.items[2].quality).isEqualTo(80);
        assertThat(app.items[3].Name).isEqualTo("Aged Brie");
        assertThat(app.items[3].quality).isEqualTo(50);
        assertThat(app.items[4].Name).isEqualTo("Conjured");
        assertThat(app.items[4].quality).isEqualTo(48);
    }
}
