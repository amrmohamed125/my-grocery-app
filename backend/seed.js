const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mamr54451_db_user:aassdd@cluster0.qmpjren.mongodb.net/my-grocery-app?appName=Cluster0";
const Product = require('./models/Product');

mongoose.connect(MONGO_URI)
  .then(() => console.log(' Connected to MongoDB Atlas'))
  .catch(err => console.log(' DB Connection Error:', err));

const ALL_PRODUCTS = [
    // --- منتجات الـ Popular ---
    { name: 'Cheese 200g', img: 'gek3mmiig3lixlkpxks8.png', originalPrice: 140, price: 130, discount: '7% OFF', unit: '/200g', category: 'dairy', appearsIn: ['home_page'], stock: 0, description: 'Creamy and delicious, Perfect for pizzas and sandwiches, Rich in calcium' },
    { name: 'Amul Milk 1L', img: 'ooamzy497lhsj2gjuwby.png', originalPrice: 60, price: 55, discount: '8% OFF', unit: '/1L', category: 'dairy', appearsIn: ['products'], stock: 57 , description: 'Fresh milk, Rich in calcium' },
    { name: 'Carrot 500g', img: 'carrot.png', originalPrice: 50, price: 44, discount: '12% OFF', unit: '/500g', category: 'fruits', appearsIn: ['products'], stock: 67 , description: 'Sweet and crunchy, Good for eyesight, Ideal for juices and salads' },
    { name: '7 Up 1.5L', img: '7up.png', originalPrice: 76, price: 70, discount: '8% OFF', unit: '/1.5L', category: 'beverages', appearsIn: ['products'] , stock: 52 , description: 'Refreshing lemon-lime flavor' },
    { name: 'Sprite 1.5L', img: 'daiglpvgna1dlhjplbve.png', originalPrice: 75, price: 60, discount: '20% OFF', unit: '/1.5L', category: 'beverages', appearsIn: ['products'], stock: 80 , description: 'Chilled and refreshing, Perfect for celebrations' },
    { name: 'Tomato 1 kg', img: 'tomato.png', originalPrice: 30, price: 28, discount: '7% OFF', unit: '/1kg', category: 'fruits', appearsIn: ['products'], stock: 74 , description: 'Juicy and ripe, Rich in Vitamin C, Perfect for salads and sauces, Farm fresh quality' },
    { name: 'Spinach 500g', img: 'spinach.png', originalPrice: 30, price: 15, discount: '17% OFF', unit: '/500g', category: 'fruits', appearsIn: ['products'], stock: 93 , description: 'Rich in iron, High in vitamins, Perfect for soups and salads' },
    { name: 'Brown Bread 400g', img: 'bakery-B-i44uip.png', originalPrice: 40, price: 35, discount: '13% OFF', unit: '/400g', category: 'bakery', appearsIn: ['products'] , stock: 47, description: 'Soft and healthy, Ideal for breakfast' },
    { name: 'Potato 500g', img: 'potato.png', originalPrice: 40, price: 35, discount: '13% OFF', unit: '/500g', category: 'fruits', appearsIn: ['products'], stock: 46, description: 'Fresh and organic, Rich in carbohydrates, Ideal for curries and fries'},
    { name: 'Knorr Cup Soup 70g', img: 'vnzb2qbwtpab5gnqvx0f.png', originalPrice: 35, price: 30, discount: '14% OFF', unit: '/70g', category: 'pantry', appearsIn: ['home_page'], stock: 0, description: 'Convenient and tasty' },
    { name: 'Onion 500g', img: 'wnvtwlm2tphqburhsmyc.png', originalPrice: 50, price: 45, discount: '10% OFF', unit: '/500g', category: 'fruits', appearsIn: ['home_page'], stock: 75, description: 'Fresh and pungent, Perfect for cooking, A kitchen staple' },
    { name: 'Basmati Rice 5kg', img: 'evuovl2nlwdjukosfz23.png', originalPrice: 550, price: 520, discount: '5% OFF', unit: '/5kg', category: 'pantry', appearsIn: ['home_page'], stock: 0, description: 'Long grain and aromatic, Perfect for biryani' },
    { name: 'Banana 1kg', img: 'dsnmko6gqtyw31okby80.png', originalPrice: 50, price: 45, discount: '10% OFF', unit: '/1kg', category: 'fruits', appearsIn: ['home_page'], stock: 0, description: 'Sweet and ripe, High in potassium, Great for smoothies and snacking' },
    { name: 'Grapes 500g', img: 'jsmb7caaokhnyci2coga.png', originalPrice: 70, price: 65, discount: '7% OFF', unit: '/500g', category: 'fruits', appearsIn: ['home_page'], stock: 71, description: 'Fresh and juicy, Rich in antioxidants, Perfect for snacking and fruit salads' },
    { name: 'Maggi Noodles 280g', img: 'dsep7owmwvfrukzbslqo.png', originalPrice: 55, price: 40, discount: '27% OFF', unit: '/280g', category: 'pantry', appearsIn: ['home_page'], stock: 0, description: 'Instant and easy to cook' },
    { name: 'Fanta 1.5L', img: 'nexecd3mgyzrpeun1bee.png', originalPrice: 25, price: 22, discount: '7% OFF', unit: '/1.5L', category: 'beverages', appearsIn: ['home_page'], stock: 28, description: 'Sweet and fizzy' },

    // --- منتجات مشتركة (Popular + Deals) ---
    { name: 'Brown Rice 1kg', img: 'dboutcrkdjhoxcvbbqne.png', originalPrice: 120, price: 110, discount: '8% OFF', unit: '/1kg', category: 'pantry', appearsIn: ['home_page', 'deals'], stock: 81, description: 'Whole grain and nutritious' },
    { name: 'Barley 1kg', img: 'spb5sgy8g24rned9nwog.png', originalPrice: 150, price: 140, discount: '7% OFF', unit: '/1kg', category: 'pantry', appearsIn: ['home_page', 'deals'], stock: 34, description: 'Rich in fiber, Helps digestion' },

    // --- منتجات الـ Deals فقط ---
    { name: 'Wheat Flour 5kg', img: 'ooitbkcjcky0gkjmkatb.png', originalPrice: 250, price: 230, discount: '8% OFF', unit: '/5kg', category: 'pantry', appearsIn: ['deals'], stock: 61, description: 'Soft and fluffy rotis, Rich in nutrients' },
    { name: 'Apple 1kg', img: 'apple.png', originalPrice: 100, price: 90, discount: '10% OFF', unit: '/1kg', category: 'fruits', appearsIn: ['deals'], stock:85, description: 'Boosts immunity, Rich in fiber' },
    { name: 'Eggs 12 pcs', img: 'egg.png', originalPrice: 90, price: 85, discount: '6% OFF', unit: '/12pcs', category: 'dairy', appearsIn: ['deals'], stock: 40, description: 'Farm fresh, Rich in protein, Ideal for breakfast and baking' },
    { name: 'Paneer 200g', img: 'panner.png', originalPrice: 90, price: 85, discount: '6% OFF', unit: '/200g', category: 'dairy', appearsIn: ['deals'], stock: 60, description: 'Soft and fresh, Rich in protein, Ideal for curries and snacks' },
    { name: 'Coca-Cola 1.5L', img: 'coca.png', originalPrice: 80, price: 75, discount: '6% OFF', unit: '/1.5L', category: 'beverages', appearsIn: ['deals'], stock: 70, description: 'Perfect for parties and gatherings, Best served chilled' },
    { name: 'Orange 1 kg', img: 'orange.png', originalPrice: 80, price: 75, discount: '6% OFF', unit: '/1kg', category: 'fruits', appearsIn: ['deals'], stock: 31, description: 'Juicy and sweet, Rich in Vitamin C, Perfect for juices and salads' },
    { name: 'Mango 1 kg', img: 'mango.png', originalPrice: 150, price: 140, discount: '7% OFF', unit: '/1kg', category: 'fruits', appearsIn: ['deals'], stock: 0, description: 'Sweet and flavorful, Perfect for smoothies and desserts, Rich in Vitamin A' },
];

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(ALL_PRODUCTS);
    console.log('✅ Database successfully seeded with full properties!');
  } catch (err) {
    console.log('❌ Error seeding products:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();