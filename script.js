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
      console.log(data);
      let newHtml = "";

      getResultElement.innerHTML = "";
      for (let i = 0; i < data.records.length; i++) {
        let name = data.records[i].fields["Name"];
        let address = data.records[i].fields["Address"];
        let phone = data.records[i].fields["Phone"];
        let hours = data.records[i].fields["Hours"];
        let site = data.records[i].fields["Site"];
        let rating = data.records[i].fields["Google Rating"];
        let mapLink = data.records[i].fields["Google Map Link"];
        let image = data.records[i].fields["Image"];

        newHtml += `
         <div class="col-md-4 col-lg-3 d-flex">
            <div class="card flex-fill h-100">
              <a href="details.html?id=${data.records[i].id}">
                ${
                  image
                    ? `<img class="card-img-top rounded" alt="${name}" src="${image[0].url}" style="height: 200px; object-fit: cover;">`
                    : ``
                }
              </a>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${name}</h5>
                <a class="btn btn-primary mt-auto" href="details.html?id=${data.records[i].id}">View Details</a>
              </div>
            </div>
          </div>


        
        `;
      }
      getResultElement.innerHTML = newHtml;
    });
}

async function getOneRecord(id) {
  let getResultElement = document.getElementById("bakeries");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patyyUVgV0jDN68AP.c4716268bb89fcf20813c88f10403594c2e1e6c4be1cb9fd7bca307d838ef39a`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appEvTziueCGBcypI/Bakeries/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      getResultElement.innerHTML = "";

      let newHtml = "";

      let name = data.fields["Name"];
      let address = data.fields["Address"];
      let phone = data.fields["Phone"];
      let hours = data.fields["Hours"];
      let site = data.fields["Site"];
      let rating = data.fields["Google Rating"];
      let mapLink = data.fields["Google Map Link"];
      let image = data.fields["Image"];

      newHtml += `
      <div class="card mx-auto" style="max-width: 600px;">
          ${
            image
              ? `<img class="card-img-top" alt="${name}" src="${image[0].url}">`
              : ``
          }
          <div class="card-body">
            <h3 class="card-title">${name}</h3>
            <p><strong>Address:</strong> ${address || "N/A"}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Hours:</strong> ${hours || "N/A"}</p>
            <p><strong>Google Rating:</strong> ${rating || "N/A"}</p>
            ${
              mapLink
                ? `<a href="${mapLink}" target="_blank" class="btn btn-outline-primary me-2">Google Maps</a>`
                : ``
            }
            ${
              site
                ? `<a href="${site}" target="_blank" class="btn btn-outline-secondary">Website</a>`
                : ``
            }
            <a href="index.html" class="btn btn-link mt-3">← Back to List</a>
          </div>
        </div>

        
        `;

      getResultElement.innerHTML = newHtml;
    });
}

let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]);
} else {
  getAllRecords();
}
