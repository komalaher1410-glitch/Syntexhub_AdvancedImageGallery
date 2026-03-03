let images=[
{src:"images/nature.jpg",caption:"Nature View",category:"nature"},
{src:"images/city.jpg",caption:"City Life",category:"city"},
{src:"images/animal.jpg",caption:"Wild Animal",category:"animals"}
];

const gallery=document.getElementById("gallery");
const searchInput=document.getElementById("searchInput");
const filterBtns=document.querySelectorAll(".filter-btn");
const uploadBtn=document.getElementById("uploadBtn");
const imageUpload=document.getElementById("imageUpload");
const imageCaption=document.getElementById("imageCaption");
const imageCategory=document.getElementById("imageCategory");

const lightbox=document.getElementById("lightbox");
const lightboxImg=document.getElementById("lightboxImg");
const closeBtn=document.getElementById("closeBtn");
const nextBtn=document.getElementById("nextBtn");
const prevBtn=document.getElementById("prevBtn");
const imageCounter=document.getElementById("imageCounter");
const thumbnailStrip=document.getElementById("thumbnailStrip");
const themeToggle=document.getElementById("themeToggle");

let currentIndex=0;
let filteredImages=[...images];

function renderGallery(){
gallery.innerHTML="";
filteredImages.forEach((img,index)=>{
const item=document.createElement("div");
item.classList.add("gallery-item");
item.innerHTML=`<img src="${img.src}"><div class="caption">${img.caption}</div>`;
item.onclick=()=>showImage(index);
gallery.appendChild(item);
});
}

function showImage(index){
currentIndex=index;
lightboxImg.src=filteredImages[index].src;
imageCounter.textContent=`${index+1}/${filteredImages.length}`;
updateThumbnails();
lightbox.classList.add("active");
}

function updateThumbnails(){
thumbnailStrip.innerHTML="";
filteredImages.forEach((img,i)=>{
const t=document.createElement("img");
t.src=img.src;
if(i===currentIndex)t.classList.add("active-thumb");
t.onclick=()=>showImage(i);
thumbnailStrip.appendChild(t);
});
}

nextBtn.onclick=()=>{currentIndex=(currentIndex+1)%filteredImages.length;showImage(currentIndex)};
prevBtn.onclick=()=>{currentIndex=(currentIndex-1+filteredImages.length)%filteredImages.length;showImage(currentIndex)};
closeBtn.onclick=()=>lightbox.classList.remove("active");

searchInput.addEventListener("input",()=>{
const value=searchInput.value.toLowerCase();
filteredImages=images.filter(img=>img.caption.toLowerCase().includes(value));
renderGallery();
});

filterBtns.forEach(btn=>{
btn.onclick=()=>{
document.querySelector(".filter-btn.active").classList.remove("active");
btn.classList.add("active");
const cat=btn.dataset.category;
filteredImages=cat==="all"?images:images.filter(img=>img.category===cat);
renderGallery();
};
});

uploadBtn.onclick=()=>{
const file=imageUpload.files[0];
if(!file)return alert("Select image");
const reader=new FileReader();
reader.onload=e=>{
images.push({src:e.target.result,caption:imageCaption.value||"Uploaded",category:imageCategory.value});
filteredImages=[...images];
renderGallery();
};
reader.readAsDataURL(file);
};

let dark=false;
themeToggle.onclick=()=>{
dark=!dark;  
document.body.classList.toggle("dark");
themeToggle.textContent=dark?"☀":"🌙";
};

renderGallery();