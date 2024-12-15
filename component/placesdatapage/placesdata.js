const placesData = {
  'Umarika Cafe': {
    name: 'Umarika Cafe',
    location: 'Purok 15, Damilag, Manolo Fortich, Bukidnon',
    rating: 5,
    description:
      'A charming and cozy cafe, tucked away in a peaceful corner, exuding a warm and inviting ambiance that immediately makes you feel at ease. With its beautifully designed interior, the space seamlessly blends rustic elegance with modern touches, creating an environment that’s as visually pleasing as it is comfortable. The soft lighting, tasteful décor, and the delightful aroma of freshly brewed coffee greet you as soon as you step inside, setting the perfect tone for a relaxing visit. This cafe is a haven for coffee enthusiasts, offering a carefully curated selection of expertly brewed beverages, from rich, aromatic espresso shots to smooth, velvety lattes and unique signature blends. Whether you are a seasoned coffee connoisseur or someone simply looking to enjoy a cup in a cozy setting, the cafe delivers an experience that is both satisfying and memorable. It is also the perfect place for gatherings of all kinds, whether you’re catching up with old friends, hosting a small meeting, or enjoying a quiet afternoon with a good book. The spacious seating arrangements cater to both intimate one-on-one conversations and larger group gatherings, ensuring that everyone can find their own little nook to relax and enjoy the moment. The cafe friendly and attentive staff add to the welcoming vibe, offering excellent service while making sure your time here is as comfortable and enjoyable as possible.',
    activities: ['Dining', 'Coffee', 'Social Events'],
    images: [
      require('../../assets/umarika.png'),
      require('../../assets/bamboo.png'),
      require('../../assets/tree.png'),
      require('../../assets/eunice.png'),
      require('../../assets/brigada.png'),
    ],
    contactNumber: '123456789123',
    email: 'daniel@gmail.com',
    address: 'Purok 10',
    guidelines:
      'Damilag Hills, gracefully nestled within the enchanting and vibrant municipality of Manolo Fortich in the province of Bukidnon, is a truly captivating and serene destination that has gained recognition for its vast, sweeping landscapes of lush, rolling green hills, its unspoiled and pristine natural environment, and its awe-inspiring panoramic vistas that seem to stretch endlessly into the horizon. This idyllic haven, surrounded by the breathtaking beauty of nature, offers visitors a peaceful retreat away from the chaos and noise of urban life, providing an opportunity to immerse themselves in the tranquility and serenity of Bukidnons rich biodiversity, while also serving as a gateway to explore the cultural and natural wonders of this picturesque region in Northern Mindanao.',
    prices: [
      { title: 'Room (Good for 1)', price: 'PHP 1,000' },
      { title: 'Room (Good for 5)', price: 'PHP 3,000' },
      { title: 'Room (Good for 7)', price: 'PHP 4,000' },
      { title: 'Room Set B (Good for 2)', price: 'PHP 5,000' },
    ],
  },
  'Eunice Villa': {
    name: 'Eunice Villa',
    location: 'Purok 13, Damilag, Manolo Fortich, 8703 Bukidnon',
    rating: 4,
    description:
      'A relaxing villa with scenic views, ideal for family retreats and peaceful stays.',
    activities: ['Accommodation', 'Recreation', 'Events'],
    images: [
      require('../../assets/eunice.png'),
      require('../../assets/tree.png'),
      require('../../assets/bamboo.png'),
      require('../../assets/brigada.png'),
      require('../../assets/bao.png'),
    ],
    contactNumber: '123456789456',
    email: 'daniel1@gmail.com',
    address: 'Purok 11',
    guidelines:
      'Ensure peace and quiet to maintain the serene environment. No loud music after 10 PM.',
    prices: [
      { title: 'Standard Room', price: 'PHP 2,000' },
      { title: 'Deluxe Room', price: 'PHP 4,000' },
      { title: 'Family Suite', price: 'PHP 6,000' },
      { title: 'Private Villa', price: 'PHP 10,000' },
    ],
  },
  'Rey\'s Warehouse': {
    name: 'Rey\'s Warehouse',
    location: 'Villa Violeta, Damilag, Manolo Fortich, 8705 Bukidnon',
    rating: 3,
    description:
      'A spacious warehouse suitable for various storage and industrial needs.',
    activities: ['Storage', 'Logistics'],
    images: [
      require('../../assets/rey.png'),
      require('../../assets/bao.png'),
      require('../../assets/brigada.png'),
      require('../../assets/damilag.png'),
      require('../../assets/hardware.png'),
    ],
    contactNumber: '123456789789',
    email: 'daniel2@gmail.com',
    address: 'Purok 12',
    guidelines:
      'Follow safety regulations and avoid unauthorized access to restricted areas.',
    prices: [
      { title: 'Small Storage Unit', price: 'PHP 5,000/month' },
      { title: 'Medium Storage Unit', price: 'PHP 10,000/month' },
      { title: 'Large Storage Unit', price: 'PHP 15,000/month' },
    ],
  },
  'Cuarteros Hardware': {
    name: 'Cuarteros Hardware',
    location: 'Purok 18, Damilag, Manolo Fortich, Bukidnon',
    rating: 3,
    description:
      'Your go-to hardware store for all building materials and tools.',
    activities: ['Shopping', 'Consultation'],
    images: [
      require('../../assets/hardware.png'),
      require('../../assets/damilag.png'),
      require('../../assets/tree.png'),
      require('../../assets/eunice.png'),
      require('../../assets/brigada.png'),
    ],
    contactNumber: '123456789321',
    email: 'daniel3@gmail.com',
    address: 'Purok 13',
    guidelines:
      'Wear safety gear when handling equipment and always follow staff instructions.',
    prices: [
      { title: 'Hammer', price: 'PHP 500' },
      { title: 'Power Drill', price: 'PHP 3,500' },
      { title: 'Toolbox', price: 'PHP 2,000' },
      { title: 'Construction Gloves', price: 'PHP 250' },
    ],
  },
  'Save Mart': {
    name: 'Save Mart',
    location: 'Purok 9, Damilag, Manolo Fortich, Bukidnon',
    rating: 4,
    description:
      'Your one-stop shop for fresh produce, pantry staples, and everyday essentials where quality meets convenience and every aisle is stocked with savings and smiles!',
    activities: ['Storage', 'Logistics'],
    images: [
      require('../../assets/savemart.png'),
      require('../../assets/rey.png'),
      require('../../assets/bao.png'),
      require('../../assets/brigada.png'),
      require('../../assets/damilag.png'),
      require('../../assets/hardware.png'),
    ],
    contactNumber: '987654321',
    email: 'daniel12@gmail.com',
    address: 'Purok 12',
    guidelines:
      'Follow safety regulations and avoid unauthorized access to restricted areas.',
    prices: [
      { title: 'Small Storage Unit', price: 'PHP 5,000/month' },
      { title: 'Medium Storage Unit', price: 'PHP 10,000/month' },
      { title: 'Large Storage Unit', price: 'PHP 15,000/month' },
    ],
  },
  'Concetta Tourist': {
    name: 'Concetta Tourist',
    location: 'Purok 13, Damilag, Manolo Fortich, 8703, Bukidnon',
    rating: 5,
    description:
      'A spacious warehouse suitable for various storage and industrial needs.',
    activities: ['Storage', 'Logistics'],
    images: [
      require('../../assets/concetta.png'),
      require('../../assets/rey.png'),
      require('../../assets/bao.png'),
      require('../../assets/brigada.png'),
      require('../../assets/damilag.png'),
      require('../../assets/hardware.png'),
    ],
    contactNumber: '56789133233',
    email: 'daniel20@gmail.com',
    address: 'Purok 12',
    guidelines:
      'Follow safety regulations and avoid unauthorized access to restricted areas.',
    prices: [
      { title: 'Small Storage Unit', price: 'PHP 5,000/month' },
      { title: 'Medium Storage Unit', price: 'PHP 10,000/month' },
      { title: 'Large Storage Unit', price: 'PHP 15,000/month' },
    ],
  },
  'BCC Business Hotel': {
    name: 'BCC Business Hotel',
    location: '9R56+5RQ, Manolo Fortich, 8703 Bukidnon',
    rating: 4,
    description:
      'A spacious warehouse suitable for various storage and industrial needs.',
    activities: ['Storage', 'Logistics'],
    images: [
      require('../../assets/bcc.png'),
      require('../../assets/rey.png'),
      require('../../assets/bao.png'),
      require('../../assets/brigada.png'),
      require('../../assets/damilag.png'),
      require('../../assets/hardware.png'),
    ],
    contactNumber: '55662287610',
    email: 'daniel23@gmail.com',
    address: 'Purok 12',
    guidelines:
      'Follow safety regulations and avoid unauthorized access to restricted areas.',
    prices: [
      { title: 'Small Storage Unit', price: 'PHP 5,000/month' },
      { title: 'Medium Storage Unit', price: 'PHP 10,000/month' },
      { title: 'Large Storage Unit', price: 'PHP 15,000/month' },
    ],
  },
  'Sebastian\'s Place': {
    name: 'Sebastian\'s Place',
    location: 'BCC Homes, B17 LT13 & LT15, Quatar Street, Manolo Fortich, 8703 Bukidnon',
    rating: 3,
    description:
      'Your go-to hardware store for all building materials and tools.',
    activities: ['Shopping', 'Consultation'],
    images: [
      require('../../assets/sebastian.png'),
      require('../../assets/hardware.png'),
      require('../../assets/damilag.png'),
      require('../../assets/tree.png'),
      require('../../assets/eunice.png'),
      require('../../assets/brigada.png'),
    ],
    contactNumber: '123456789321',
    email: 'daniel3@gmail.com',
    address: 'Purok 13',
    guidelines:
      'Wear safety gear when handling equipment and always follow staff instructions.',
    prices: [
      { title: 'Hammer', price: 'PHP 500' },
      { title: 'Power Drill', price: 'PHP 3,500' },
      { title: 'Toolbox', price: 'PHP 2,000' },
      { title: 'Construction Gloves', price: 'PHP 250' },
    ],
  },
  'Lady\'s First Resto': {
    name: 'Lady\'s First Resto',
    location: 'Damilag, Manolo Fortich, 8703 Bukidnon',
    rating: 4,
    description:
      'A relaxing villa with scenic views, ideal for family retreats and peaceful stays.',
    activities: ['Accommodation', 'Recreation', 'Events'],
    images: [
      require('../../assets/lady.png'),
      require('../../assets/eunice.png'),
      require('../../assets/tree.png'),
      require('../../assets/bamboo.png'),
      require('../../assets/brigada.png'),
      require('../../assets/bao.png'),
    ],
    contactNumber: '123456789456',
    email: 'daniel1@gmail.com',
    address: 'Purok 11',
    guidelines:
      'Ensure peace and quiet to maintain the serene environment. No loud music after 10 PM.',
    prices: [
      { title: 'Standard Room', price: 'PHP 2,000' },
      { title: 'Deluxe Room', price: 'PHP 4,000' },
      { title: 'Family Suite', price: 'PHP 6,000' },
      { title: 'Private Villa', price: 'PHP 10,000' },
    ],
  },
  'Baelly\'s Lechon House': {
    name: 'Baelly\'s Lechon House',
    location: 'Hi-way, Damilag, Manolo Fortich, 8703 Bukidnon',
    rating: 5,
    description:
      'A spacious warehouse suitable for various storage and industrial needs.',
    activities: ['Storage', 'Logistics'],
    images: [
      require('../../assets/baelly.png'),
      require('../../assets/bao.png'),
      require('../../assets/brigada.png'),
      require('../../assets/damilag.png'),
      require('../../assets/hardware.png'),
    ],
    contactNumber: '123456789789',
    email: 'daniel2@gmail.com',
    address: 'Purok 12',
    guidelines:
      'Follow safety regulations and avoid unauthorized access to restricted areas.',
    prices: [
      { title: 'Small Storage Unit', price: 'PHP 5,000/month' },
      { title: 'Medium Storage Unit', price: 'PHP 10,000/month' },
      { title: 'Large Storage Unit', price: 'PHP 15,000/month' },
    ],
  },
  'Damilag Hills': {
    name: 'Damilag Hills',
    location: 'Purok 11, Manolo Fortich, 8703 Bukidnon',
    rating: 4,
    description:
      'A relaxing villa with scenic views, ideal for family retreats and peaceful stays.',
    activities: ['Accommodation', 'Recreation', 'Events'],
    images: [
      require('../../assets/hills.png'),
      require('../../assets/tree.png'),
      require('../../assets/bamboo.png'),
      require('../../assets/brigada.png'),
      require('../../assets/bao.png'),
    ],
    contactNumber: '123456789456',
    email: 'daniel1@gmail.com',
    address: 'Purok 11',
    guidelines:
      'Ensure peace and quiet to maintain the serene environment. No loud music after 10 PM.',
    prices: [
      { title: 'Standard Room', price: 'PHP 2,000' },
      { title: 'Deluxe Room', price: 'PHP 4,000' },
      { title: 'Family Suite', price: 'PHP 6,000' },
      { title: 'Private Villa', price: 'PHP 10,000' },
    ],
  },
  'Cafe 14-15': {
    name: 'Cafe 14-15',
    location: '9RW5+PH, Manolo Fortich, Bukidnon',
    rating: 4,
    description:
      'A relaxing villa with scenic views, ideal for family retreats and peaceful stays.',
    activities: ['Accommodation', 'Recreation', 'Events'],
    images: [
      require('../../assets/cafe.png'),
      require('../../assets/eunice.png'),
      require('../../assets/tree.png'),
      require('../../assets/bamboo.png'),
      require('../../assets/brigada.png'),
      require('../../assets/bao.png'),
    ],
    contactNumber: '123456789456',
    email: 'daniel1@gmail.com',
    address: 'Purok 11',
    guidelines:
      'Ensure peace and quiet to maintain the serene environment. No loud music after 10 PM.',
    prices: [
      { title: 'Standard Room', price: 'PHP 2,000' },
      { title: 'Deluxe Room', price: 'PHP 4,000' },
      { title: 'Family Suite', price: 'PHP 6,000' },
      { title: 'Private Villa', price: 'PHP 10,000' },
    ],
  },
  'Bamboo Pavilion': {
    name: 'Bamboo Pavilion',
    location: '8RV8+4W, Manolo Fortich, Bukidnon',
    rating: 3,
    description:
      'Your go-to hardware store for all building materials and tools.',
    activities: ['Shopping', 'Consultation'],
    images: [
      require('../../assets/bamboo.png'),
      require('../../assets/hardware.png'),
      require('../../assets/damilag.png'),
      require('../../assets/tree.png'),
      require('../../assets/eunice.png'),
      require('../../assets/brigada.png'),
    ],
    contactNumber: '123456789321',
    email: 'daniel3@gmail.com',
    address: 'Purok 13',
    guidelines:
      'Wear safety gear when handling equipment and always follow staff instructions.',
    prices: [
      { title: 'Hammer', price: 'PHP 500' },
      { title: 'Power Drill', price: 'PHP 3,500' },
      { title: 'Toolbox', price: 'PHP 2,000' },
      { title: 'Construction Gloves', price: 'PHP 250' },
    ],
  },
};

export default placesData;
