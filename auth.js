import {signUpNewUser, signInUser, postAdToDb,uploadImage, getAdsFromDb} from './config/firebase.js';

if (location.href !== ' http://127.0.0.1:5501/addDetails.html ')
{showAd()}

window.signUp = async function (){
  
    //this is for firebase auth
    const fullname = document.getElementById("fullname").value
    const email = document.getElementById("email").value;

    // all three in firestore database
    // const email = allInputs[0].value   yes this as well
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;

    var signupbtn = document.getElementById('signupbtn')

    signUpNewUser({email, password, fullname, age }); // these curly braces cuz object IF we are passing two or more values to a function
    try{
        await signUpNewUser({email, password,fullname, age})
        signupbtn.setAttribute('data-bs-dismiss',"modal")
        alert('successfully registred')
      }
      catch(e){
        const errorElem = document.getElementById('error')
        errorElem.innerHTML = e.message
        console.log(e.message);
      }
}

window.signIn1 = async function(){
     //1. values get karunga
    const email = document.getElementById("signIn-email").value;
    const password = document.getElementById("signIn-password").value

   try{
    const loginBtn = document.getElementById("signInbtn");
    loginBtn.setAttribute("disabled", "");
    await signInUser(email, password)
    alert ('succy signed inn')
   }
   catch(e){
    const errorElem = document.getElementById('signIn-error')
    errorElem.innerHTML = e.message
    console.log(e.message);
  }
}

window.postAd = async function(){
  const adTitle = document.getElementById("ad-title").value
  const description = document.getElementById("description").value
  const price = document.getElementById("price").value
  const images = document.getElementById("images").files[0];
  
  try{
    const imageURL = await uploadImage(images);
      await postAdToDb(adTitle,description,price,imageURL)
      alert('ad posted')
  }
  catch(e){
    console.log('e-->', e.message)
  }
}


async function showAd(){
  try{
    
    const data = await getAdsFromDb()
  
    for (let item of data) {
      const adsElem = document.getElementById("ads");
      const ddiv = document.createElement("div");

      ddiv.innerHTML += `
      <a>
      <div onclick="goToDetailsPage('${item.id}')" class="card " style="width: 18rem;">
          <img src="${item.imageUrl}"  class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${item.adTitle}</h5>
              <p class="card-text">Rs ${item.adPrice}</p>
          </div>
      </div>
  </a>
`
  adsElem.appendChild(ddiv);
  }
  }
  catch(e){
    console.log('errorr-->', e.message)
  }
}


window.goToDetailsPage = function (id) {
  location.href= `/detail.html?id=${id}`
}




/*
Import Export:

1. type="module" ke functions/variables global nahi hotay.
2. Agr hum unko dosri file use karna chahtay hain to us file se export karenge aur
dosri file me import karenge
3. Agr kisi file me import/export use karna hai, to us ke lye type="module" use karna hoga.
4. Agr type="module" ke functions HTML me use karne hain, to us function ko window.functionName
equal karna hoga
*/
