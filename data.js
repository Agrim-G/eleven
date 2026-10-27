// Sample data for demonstration only. Photos are representative stock images.
const IMGS = [
  "photo-1503376780353-7e6692767b70","photo-1494976388531-d1058494cdd8","photo-1552519507-da3b142c6e3d",
  "photo-1555215695-3004980ad54e","photo-1618843479313-40f8afb4b4d8","photo-1542362567-b07e54358753",
  "photo-1580273916550-e323be2ae537","photo-1502877338535-766e1452684a","photo-1525609004556-c46c7d6cf023",
  "photo-1511919884226-fd3cad34687c","photo-1553440569-bcc63803a83d","photo-1541899481282-d53bffe3c35d",
  "photo-1617788138017-80ad40651399","photo-1519641471654-76ce0107ad1b","photo-1549399542-7e3f8b79c341",
  "photo-1568605117036-5fe5e7bab0b7"
];
const CITIES = ["Jammu", "Srinagar", "Delhi", "Chandigarh"];
// id, make, model, year, km, fuel, transmission, price (INR), body, power, efficiency, owners, colour, featured
const ROWS = [
  [1,"Maruti Suzuki","Swift ZXi",2022,18400,"Petrol","Manual",640000,"Hatchback","89 bhp","22 km/l",1,"Pearl White",0],
  [2,"Hyundai","Creta SX",2021,32100,"Diesel","Automatic",1475000,"SUV","114 bhp","21 km/l",1,"Polar White",1],
  [3,"Tata","Nexon EV Max",2023,9800,"Electric","Automatic",1620000,"SUV","141 bhp","437 km range",1,"Teal Blue",1],
  [4,"Mahindra","Thar LX",2022,21500,"Diesel","Manual",1595000,"SUV","130 bhp","15 km/l",1,"Napoli Black",1],
  [5,"Toyota","Fortuner Legender",2021,44200,"Diesel","Automatic",3850000,"SUV","201 bhp","14 km/l",1,"Platinum White",1],
  [6,"Honda","City ZX",2020,38900,"Petrol","Manual",995000,"Sedan","119 bhp","17 km/l",2,"Lunar Silver",0],
  [7,"Kia","Seltos HTX",2022,26700,"Petrol","Automatic",1325000,"SUV","113 bhp","16 km/l",1,"Gravity Grey",0],
  [8,"Tata","Harrier XZA",2021,41300,"Diesel","Automatic",1590000,"SUV","167 bhp","16 km/l",1,"Orcus White",0],
  [9,"Volkswagen","Virtus GT",2023,12400,"Petrol","Automatic",1625000,"Sedan","148 bhp","18 km/l",1,"Curcuma Yellow",0],
  [10,"Skoda","Slavia Style",2022,19800,"Petrol","Automatic",1410000,"Sedan","148 bhp","18 km/l",1,"Candy White",0],
  [11,"MG","Hector Sharp",2020,52600,"Petrol","Manual",1175000,"SUV","141 bhp","14 km/l",2,"Aurora Silver",0],
  [12,"Toyota","Innova Crysta GX",2019,78200,"Diesel","Manual",1895000,"MPV","148 bhp","15 km/l",2,"Super White",0],
  [13,"BMW","330i M Sport",2021,29500,"Petrol","Automatic",4650000,"Sedan","255 bhp","14 km/l",1,"Alpine White",1],
  [14,"Mercedes-Benz","C 220d",2020,41800,"Diesel","Automatic",3950000,"Sedan","194 bhp","18 km/l",1,"Obsidian Black",0],
  [15,"Audi","A4 Premium Plus",2019,56400,"Petrol","Automatic",3175000,"Sedan","188 bhp","15 km/l",2,"Glacier White",0],
  [16,"Hyundai","i20 Asta",2023,8200,"Petrol","Manual",915000,"Hatchback","82 bhp","20 km/l",1,"Fiery Red",0]
];
const CARS = ROWS.map((r, i) => ({
  id: r[0], make: r[1], model: r[2], year: r[3], km: r[4], fuel: r[5], trans: r[6], price: r[7],
  body: r[8], power: r[9], eff: r[10], owners: r[11], color: r[12], feat: !!r[13],
  img: IMGS[i], city: CITIES[i % 4]
}));
