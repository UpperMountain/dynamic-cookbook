function lerp(min, max, amt) {
  return min + (max - min) * amt;
}

const shadow = amt => ({
  // For android
  elevation: lerp(0, 24, amt),

  // and for iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: lerp(1, 10, amt) },
  shadowOpacity: lerp(0, 0.75, amt),
  shadowRadius: lerp(0, 20, amt)
});

export default shadow;
