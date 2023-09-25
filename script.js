const root = document.getElementById("root");
const searchBar = document.getElementById("searchBar");
const getBeer = (page) => {
  const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`;
  const promise = fetch(url);
  promise
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //  console.log(data);
      data.map((ele) => {
        //console.log(ele);
        displayBeer(ele);
      });
    });
};

const displayBeer = (data) => {
  const image = document.createElement("img");
  image.src = data.image_url;
  const name = document.createElement("h1");
  name.innerText = data.name;
  const first_brewed = document.createElement("div");
  first_brewed.className = "first_brewed";
  first_brewed.innerText = `First Brewed on ${data.first_brewed}`;
  const container = document.createElement("div");
  container.className = "container";
  container.appendChild(image);
  container.appendChild(name);
  container.appendChild(first_brewed);
  root.appendChild(container);
};

document.getElementById("pages").addEventListener("click", (e) => {
  // console.log(e.target.id);
  if (e.target.id === pages) {
    root.innerHTML = "";
    root.appendChild(getBeer(1));
  }
  const page = e.target.id;
  root.innerHTML = "";
  root.appendChild(getBeer(page));
});

document.getElementById("reset").addEventListener("click", () => {
  searchBar.value = ""
  root.innerHTML = "";
  getBeer(1);
});

const displaySearch = (value) => {
  fetch("https://api.punkapi.com/v2/beers?per_page=60")
    .then((res) => res.json())
    .then((data) =>
      data.map((data) => {
        //  console.log(data);
        if (data.name.toLowerCase().includes(value.toLowerCase())) {
          root.innerHTML = "";
          const image = document.createElement("img");
          image.src = data.image_url;
          const name = document.createElement("h1");
          name.innerText = data.name;
          const first_brewed = document.createElement("div");
          first_brewed.className = "first_brewed";
          first_brewed.innerText = `First Brewed on ${data.first_brewed}`;
          const container = document.createElement("div");
          container.className = "container";
          container.appendChild(image);
          container.appendChild(name);
          container.appendChild(first_brewed);
          root.appendChild(container);
        }

      })
    );
};

// if (data.name.toLowerCase().includes(searchBarValue.toLowerCase())) {
//   root.innerHTML = "";
//   getBeer(1);
// }

searchBar.addEventListener("input", () => {
  const value = searchBar.value;
  displaySearch(value);
});

getBeer(1);

const range1 = document.getElementById("range1")
range1.addEventListener("change", ()=>{
  const range = range1.value
  displaySearch(range)
})

const range2 = document.getElementById("range2")
range2.addEventListener("change", ()=>{
  const range = range2.value
  displaySearch(range)
})