// const adTitle = document.getElementById("ad-title");
// const description = document.getElementById("description");
// const price = document.getElementById("price");
// const form = document.getElementById("form");

// let image ;

// function getImage(e) { //event ko get kia
//     const file = e.target.files[0]  //constant bnaya jis me evnet ki files. Files hamesha array me ati hain is liye [0] use kiya hai
//     // const imgElem = document.getElementsByTagName('img') // img k element ko get kia from addDetail 

//     const reader = new FileReader() //sir ka code
//     reader.readAsDataURL(file) //sir ka code "basre64 url"

//     reader.onload = function (e) {  //function call ho rha hai jab image ko select kia. 
//       image = e.target.result
      
//       // imgElem.setAttribute('src', e.target.result) //tab attribute set horha "src". aur us ki value woh haii jo file hum ne apne computer se select ki thi

//     }
// } 

// function createAdd() {
//   let ads = JSON.parse(localStorage.getItem('ads') || "[]"); // how we get multiple data........no idea wtf happened
//   function Ad(adTitle, description, price, image) {
//     this.adTitle = adTitle;
//     this.description = description;
//     this.price = price;
//     this.image = image
//   }

  

//   ads.push(new Ad(adTitle.value, description.value, price.value, image));



//   localStorage.setItem("ads", JSON.stringify(ads));
//   alert("Your add has been posted Successfully", location.replace("http://127.0.0.1:5501/home.html"))
// }

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   createAdd();
// });
