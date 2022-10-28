import { getFirebaseAd, getFirebaseUser } from '../../config/firebase.js';
// 
let data;
let userName;
getAdDetails();

async function getAdDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const doc = await getFirebaseAd(id)
    data = doc.data();
    const userID = data.userId;

    const doc1 = await getFirebaseUser(userID)
    userName = doc1.data().name;
    console.log(userName)
    
    const left = document.querySelector("#col-1");
    left.innerHTML = `
    <img width="100%" src="${data.imageUrl}" />

    <div class="details">
        <div class="container">
            <div class="row">
                <p>Details</p>
            </div>
            <div class="row">
                <div class="col-6">Price</div>
                <div class="col-6">${data.adPrice}</div>

            </div>
            <div class="row">
                <div class="col-6">Location</div>
                <div class="col-6">${data.adLocation}</div>
            </div>
            <hr>
            <p>Description</p>
            <p>${data.adDescription}</p>
        </div>
    </div>`; 

    const right = document.querySelector("#col-2");
    right.innerHTML = `<div class="price">
    <p>Rs ${data.adPrice}</p>
    <p>${data.adTitle}</p>
    <small>${data.adLocation}</small>
</div>
<div class="seller">
    <h2>Seller Description</h2>
        <div class="row">
            <div class="col-3">
                <img src="../../images/profilePic.png" width="60px" alt="">
            </div>
            <div class="col-9">
                <p>${userName}</p>
            </div>
            <div class="col">
                <button class="post-Btn">Chat with Seller</button>
            
            </div>
        </div>
</div>`
}
