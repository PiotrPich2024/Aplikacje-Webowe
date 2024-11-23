main();
let items = [];
async function main() {
    const data = await getData();
    const products = data.products;
    
    const placeholder = document.querySelector("#data-output");
    let html = "";
    for (const product of products){
        html += `
            <tr>
                <td><img src=${product.images[0]}></td>
                <td id="info">${product.title}</td>
                <td id="info">${product.description}</td>
            </tr>
            `;
        
    }
    
    placeholder.innerHTML = html;
}

async function getData() {
    const res = await fetch("products.json");
    const data = await res.json();
    return data;
}



const searchInput = document.getElementById('search-input');
searchInput.addEventListener("input",function(){
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll('#listOfProducts tbody tr');
    rows.forEach(row=>{
        const cells = row.querySelectorAll("#info");
        let containsVal = false;
        
        cells.forEach(cell=>{
            if(cell.textContent.toLowerCase().includes(searchValue)){
                containsVal = true;
            }
        })
        if(containsVal){
            row.style.display = "";
        }
        else{
            row.style.display = "none";
        }
    })
})



