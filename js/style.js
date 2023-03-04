const loadApi = (dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayData(data.data.tools, dataLimit));
};

const displayData = (data, dataLimit) => {
  //console.log(data);
  const container = document.getElementById('cards-container');
  container.innerHTML = "";
  //display 6 data
  const showAll = document.getElementById('See-all');
  if(dataLimit && data.length > 6){
      data = data.slice(0, 6);
      showAll.classList.remove('d-none');
  }
  else{
      showAll.classList.add('d-none');
  }

  document.getElementById('btn-sort').addEventListener('click', function(){
      const sortArray = data.sort(sorting);
      console.log(sortArray);
  });

  data.forEach((tool) => {
      const div = document.createElement('div');
      div.innerHTML = `
          <div class="d-flex justify-center">
              <div class="card h-100 p-4 border-0 shadow-lg" ">
              <img src="${tool.image}" style="height: 200px;" class="card-img-top rounded" alt="...">
              <div class="card-body">
                  <h4 class="fw-semibold">Features</h4>
                  <ol class="list-decimal ps-3 text-muted">
                      <li class="fw-semibold">${tool.features[0] ? tool.features[0]: "No features found"} </li>
                      <li class="fw-semibold ">${tool.features[1] ? tool.features[1]: "No features found"} </li>
                      <li class="fw-semibold ">${tool.features[2] ? tool.features[2]: "No features found"} </li>
                      <li class="fw-semibold ">${tool.features[3] ? tool.features[3]: "No features found"} </li>
                  </ol>
                  <div class="justify-content-between align-items-center py-1 border-top">
                      <h4 class="fw-bold">${tool.name}</h4>
                      <div class="d-flex justify-content-between align-items-center">
                      <p class="text-muted"><i class="fa-solid fa-calendar-days"></i> ${tool.published_in}
                      </p>
                                      
                      <a data-bs-toggle="modal"
                      data-bs-target="#exampleModal" onclick="fetchAIDetails('${tool.id}')"> <i class="fas fa-arrow-right text-danger"></i></a>
                      </div>
                  </div>
              </div>
              </div>
          </div>
      `;
      container.appendChild(div);
      toggleSpinner(false);
  });
};


// show more
document.getElementById('btn-See-more').addEventListener('click', function(){
  loadApi();
  toggleSpinner(true);
});

  // spinner
  const toggleSpinner = isLoading =>{
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
  };