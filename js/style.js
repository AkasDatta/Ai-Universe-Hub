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
          <h5 class="card-title">Features</h5>
          <p class="card-text text-muted">1. Natural language processing </br> 2. Contextual understanding </br>3. Text generation</p>
        </div>
        <hr>
   
      </div>
        `;
        toolContainer.appendChild(toolDiv);
    })
}

loadApi();