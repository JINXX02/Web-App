"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("bakeries");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patyyUVgV0jDN68AP.c4716268bb89fcf20813c88f10403594c2e1e6c4be1cb9fd7bca307d838ef39a`,
    },
  };

  await fetch(`https://api.airtable.com/v0/appEvTziueCGBcypI/Bakeries`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let name = data.records[i].fields["Name"];
        let address = data.records[i].fields["Address"];
        let phone = data.records[i].fields["Phone"];
        let hours = data.records[i].fields["Hours"];
        let site = data.records[i].fields["Site"];
        let rating = data.records[i].fields["Google Rating"];

        newHtml += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Some quick example text.</p>
                <a href="${site}" class="card-link">Bakery Link</a>
            </div>
        </div>
    
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}
getAllRecords();
