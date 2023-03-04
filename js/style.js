const loadApi = (dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayData(data.data.tools, dataLimit));
};

const displayData = (data, dataLimit) => {
  //console.log(data);
  const container = document.getElementById('tools-container');
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

  data.forEach((tool) => {
      const div = document.createElement('div');
      div.innerHTML = `
          <div class="d-flex justify-center mb-5">
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
                      data-bs-target="#toolDetailModal" onclick="fetchAIDetails('${tool.id}')"> <i class="fas fa-arrow-right text-danger"></i></a>
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


// see more
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

   //fetch data by id:
   const fetchAIDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayAIDetails(data.data);
  };

    //display data by id
    const displayAIDetails = (data) => {
      // console.log(data) 
      const modalContainer = document.getElementById('modal-container');
      const {accuracy} = data;
      const score = accuracy.score;
      const percentage = score * 100 + "% Accuracy";

      
  modalContainer.innerHTML = `
  <div class="col-md-6 border border-danger rounded p-3 shadow" style="background-color: rgb(249, 227, 227)">
    <H5 class="fw-semibold">${data.description}</H5>
        <div class="d-flex justify-content-center g-3 mt-3 text-center">
          <p class="fs-6 bg-white text-success p-2 mx-2 rounded fw-bold" style="height: 85px">${data.pricing === null ? "Free Of Cost/" : data.pricing[0].price}</br> Basic</p>
          <p class="fs-6 bg-white text-warning p-2 mx-2 rounded fw-bold" style="height: 85px">${data.pricing === null ? "Free Of Cost/" : data.pricing[1].price}</br> Pro</p>
          <p class="fs-6 bg-white text-danger p-2 mx-2 rounded fw-bold" style="height: 85px">${data.pricing === null ? "Free Of Cost/" : data.pricing[2].price}</br>Enterprise</p>
        </div>
        <div class="d-flex justify-content-between">
          <div>
            <h4 class="fw-bold">Features</h4>
            <ul class="ps-3">
              <li>${data.features['1'] ? data.features['1'].feature_name: "No data Found"}</li>
              <li>${data.features['2'] ? data.features['2'].feature_name: "No data Found"}</li>
              <li>${data.features['3'] ? data.features['3'].feature_name: "No data Found"}</li>
            </ul>
          </div>
          <div>
            <h4 class="fw-bold">Integrations</h4>
            <ul class="ps-3">
                <li>${data.integrations === null ? "No Data Found" : data.integrations[0]}</li>
                <li>${data.integrations === null ? "No Data Found" : data.integrations[1]}</li>
                <li>${data.integrations === null ? "No Data Found" : data.integrations[2]}</li>
            </ul>
          </div>
        </div> 
      </div>
      <div class="col-md-6 px-2">
        <div class="card shadow text-center" > 
          <img src ="${data.image_link[0] ? data.image_link[0] : "Image Didn't Found"}" class="card-image-top rounded m-3" style="height: 270px" alt="...">
          <div class="card-body">
          <h5 class="fw-bold">${data.input_output_examples === null ? "Can you give any Example?": data.input_output_examples[0].input}</h5>
          <p>${data.input_output_examples === null ? "No! Not Yet! Take a break!!!" : data.input_output_examples[0].output.slice(0,173)}</p>
        </div>
        <div class="d-flex justify-content-end relative">
          <button class="btn btn-danger position-absolute top-0 end-0 ${data.accuracy.score ? "m-0" : "d-none"}">${percentage}</button>
        </div>
      </div>
    </div>
  `;
};

