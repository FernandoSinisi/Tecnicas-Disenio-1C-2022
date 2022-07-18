package ar.uba.fi.tdd.exercise;

public class Item {

    //name
    public String Name;

    // seell in
    public int sellIn;

    //
    public int quality;

    // constructor
    public Item(String _name, int _sellIn, int _quality) {
        this.Name = _name;
        this.sellIn = _sellIn;
        this.quality = _quality;
    }

    // shows the Item representation
   @Override
   public String toString() {

     return this.Name + ", " + this.sellIn + ", " + this.quality;
    }
 }
