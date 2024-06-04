// // JavaScript code to hide .hover-cart when mouse leaves both .quantity and .hover-cart
// document.addEventListener("DOMContentLoaded", function() {
//     const quantity = document.querySelector(".quantity");
//     const hoverCart = document.querySelector(".hover-cart");
  
//     document.addEventListener("mouseover", function(event) {
//       const isHoveringQuantity = quantity.contains(event.target);
//       const isHoveringHoverCart = hoverCart.contains(event.target);
  
//       if (!isHoveringQuantity && !isHoveringHoverCart) {
//         hoverCart.style.display = "none";
//       }
//     });
//   });
// document.addEventListener("DOMContentLoaded", function() {
//     const quantity = document.querySelector(".quantity");
//     const hoverCart = document.querySelector(".hover-cart");
  
//     document.addEventListener("mouseover", function(event) {
//       const isHoveringQuantity = quantity.contains(event.target);
//       const isHoveringHoverCart = hoverCart.contains(event.target);
  
//       if (!isHoveringQuantity && !isHoveringHoverCart) {
//         hoverCart.style.right = "-300px"; // Slide the cart out of view
//       }
//     });
  
//     quantity.addEventListener("mouseover", function() {
//       hoverCart.style.right = "-10px"; // Slide the cart back into view
//     });
//   });
  