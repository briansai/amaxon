export const getCartTotal = (cart) => {
  return cart?.reduce((acc, cur) => cur.price + acc, 0);
};

export const getFirstName = (displayName) => {
  return displayName?.split(' ')[0];
};

export const displayStars = (rating) => {
  const stars = [];

  for (let x = 0; x < rating; x++) {
    stars.push(x);
  }

  return stars.map((star, index) => (
    <div key={`${star}-${index}`} className="stars">
      ★
    </div>
  ));
};
