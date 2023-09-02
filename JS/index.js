const tubeCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const tabContainer = document.getElementById("tab-container");
  data.data.forEach((category) => {
    const div = document.createElement("div");

    div.innerHTML = `
          <a onclick="tubeLoad('${category.category_id}')" class="tab bg-[#25252533] rounded ">${category.category}</a>
          `;
    tabContainer.appendChild(div);
  });
};

// load data function

const tubeLoad = async (categoryId) => {
  updateCategoryId = categoryId;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const cardContainer = document.getElementById("card-container");
  const drawContainer = document.getElementById("drawingError");
  cardContainer.innerHTML = "";
  drawContainer.innerHTML = "";

  if (data.data.length > 0) {
    data.data.forEach((tube) => {
      const div = document.createElement("div");
      div.innerHTML = `<div class="card card-compact bg-base-100 shadow-xl">
          <div class="rounded-2xl h-[220px]">
          <figure class="w-auto h-[200px] ">
              <img class="w-full h-full" src=${tube?.thumbnail} />
            </figure>
            <div class=" text-xs text-white  static flex justify-end -mt-10 mr-2 ">
              <span class="bg-[#171717] rounded w-auto ">${showPostedDate(
                tube.others?.posted_date
              )}</span>
            </div>
      </div>
  <div class="card-body">
  <div class="flex">
  <div>
    <div class="avatar">
      <div class="w-14 rounded-full">
        <img
          src=${tube.authors?.[0].profile_picture}
        />
      </div>
    </div>
  </div>
  <div class="ml-3 ">
    <h2 class="font-bold text-lg pb-2">
    ${tube.title}
    </h2>
    <div class="flex gap-3">
      <h6>${tube.authors?.[0].profile_name}</h6>
      <span>${
        tube.authors?.[0].verified
          ? '<img src="./images/fi_10629607.png" />'
          : ""
      }</span> 
  </div>
    <h6 class="pt-2">${tube.others?.views}</h6>
  </div>
  </div>
  </div>
            </div>`;
      cardContainer.appendChild(div);
    });
  } else {
    const drawDiv = document.createElement("div");

    drawDiv.innerHTML = `
          <img class="mt-24 w-fit mx-auto" src="./images/icon.png"/>
          <p class="mt-4 text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here.</p>
         `;
    drawContainer.appendChild(drawDiv);
  }
};

// posted date convert

function showPostedDate(postedDate) {
  const postedTime = parseInt(postedDate);
  const hours = Math.floor(postedTime / 3600);
  const minutes = Math.floor((postedTime % 3600) / 60);
  if (hours > 0) {
    return `${hours} hrs ${minutes} min ago`;
  } else {
    return "";
  }
}

// sort by views button handler

const sortByViewsButton = document.getElementById("sort-by-views-button");
sortByViewsButton.addEventListener("click", () => {
  if (updateCategoryId) {
    sortByViews(updateCategoryId);
  }
});

// sort data function

const sortByViews = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();

  data.data.sort((a, b) => {
    const viewsA = parseInt(a.others.views);
    const viewsB = parseInt(b.others.views);
    return viewsB - viewsA;
  });

  updateCardContainer(data.data);
};

// update-card-container

function updateCardContainer(sortData) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (sortData.length > 0) {
    sortData.forEach((tube) => {
      const div = document.createElement("div");
      div.innerHTML = `<div class="card card-compact bg-base-100 shadow-xl">
          <div class="rounded-2xl h-[220px]">
          <figure class="w-auto h-[200px] ">
              <img class="w-full h-full" src=${tube?.thumbnail} />
            </figure>
            <div class=" text-xs text-white  static flex justify-end -mt-10 mr-2 ">
              <span class="bg-[#171717] rounded w-auto ">${showPostedDate(
                tube.others?.posted_date
              )}</span>
            </div>
      </div>
  <div class="card-body">
  <div class="flex">
  <div>
    <div class="avatar">
      <div class="w-14 rounded-full">
        <img
          src=${tube.authors?.[0].profile_picture}
        />
      </div>
    </div>
  </div>
  <div class="ml-3 ">
    <h2 class="font-bold text-lg pb-2">
    ${tube.title}
    </h2>
    <div class="flex gap-3">
      <h6>${tube.authors?.[0].profile_name}</h6>
      <span>${
        tube.authors?.[0].verified
          ? '<img src="./images/fi_10629607.png" />'
          : ""
      }</span> 
  </div>
    <h6 class="pt-2">${tube.others?.views}</h6>
  </div>
  </div>
  </div>
            </div>`;
      cardContainer.appendChild(div);
    });
  } else {
    const drawContainer = document.getElementById("drawingError");
    drawContainer.innerHTML = `
        <img class="mt-24 w-fit mx-auto" src="./images/icon.png"/>
        <p class="mt-4 text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here.</p>
      `;
  }
}


tubeCategory();
tubeLoad("1000");
