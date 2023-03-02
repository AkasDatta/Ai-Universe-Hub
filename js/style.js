const loadApi = () =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayData(data.data.tools))
}
const displayData = tools =>{
    const toolContainer = document.getElementById('tools-container');
    toolContainer.textContent = '';
    tools.forEach(tool =>{
        console.log(tool);
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML = `
        <div class="card h-100 p-4">
        <img src="${tool.image}" class="card-img-top rounded" alt="...">
        <div class="card-body">
          <h5 class="card-title fw-bold">Features</h5>
   
          <p class="card-text text-muted">1. ${tool.features[0] ? tool.features[0]: ''} </br> 2. ${tool.features[1] ? tool.features[1]: ''} </br> 3. ${tool.features[2] ? tool.features[2]: ''} </br> ${tool.features[3] ? tool.features[3]: ''}</p> 

        </div>
        <hr>
        <h5 class="card-title fw-bold mx-3 mt-3">${tool.name}</h5>
        <i class="fas fa-solid fa-arrow-right"></i>
        <p class="mx-3 text-muted"><i class="fa-solid fa-calendar-days"></i> ${tool.published_in}
        </p>
      </div>
        `;
        toolContainer.appendChild(toolDiv);
    })
}

loadApi();