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

const tubeLoad = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();

  const cardContainer = document.getElementById("card-container");

  data.data.forEach((tube) => {
    console.log(tube);
    const div = document.createElement("div");
    div.innerHTML = `<div class="card  card-compact bg-base-100 shadow-xl">
    <figure class="w-auto h-[200px] ">
      <img  src=${tube?.thumbnail} />
    </figure>
    <div class="card-body">
      <div class="flex">
        <div>
          <div class="avatar">
            <div class="w-14 rounded-full">
              <img
                src=${tube?.authors?.[0].profile_picture}
              />
            </div>
          </div>
        </div>
        <div class="ml-3 ">
          <h2 class="font-bold text-lg pb-2">
          ${tube?.title}
          </h2>
          <div class="flex gap-3">
            <h6>${tube?.authors?.[0].profile_name}</h6>
            <span>${tube?.authors?.[0].verified === true ? '<img src="./images/fi_10629607.png" />' : ''}</span> 
        </div>
          <h6 class="pt-2">${tube?.others?.views} views</h6>
        </div>
      </div>
    </div>
  </div>`;
    cardContainer.appendChild(div);
  });
};

tubeCategory();
