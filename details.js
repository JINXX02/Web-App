"use strict";

async function getOneRecord(id) {
  const getResultElement = document.getElementById("bakery-details");
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer YOUR_AIRTABLE_API_KEY`,
    },
  };

  const res = await fetch(`https://api.airtable.com/v0/YOUR_BASE_ID/Bakeries/${id}`, options);
  const data = await res.json();

  const { Name, Address, Phone, Hours, Site, Image, ["Google Rating"]: Rating, ["Google Map Link"]: MapLink } = data.fields;
  const imageUrl = Image ? Image[0].url : "placeholder.jpg";

  getResultElement.innerHTML = `
    <div class="card mx-auto" style="max-width: 600px;">
      <img src="${imageUrl}" class="card-img-top" alt="${Name}">
      <div class="card-body">
        <h3 class="card-title">${Name}</h3>
        <p><strong>Address:</strong> ${Address || "N/A"}</p>
        <p><strong>Phone:</strong> ${Phone || "N/A"}</p>
        <p><strong>Hours:</strong> ${Hours || "N/A"}</p>
        <p><strong>Rating:</strong> ${Rating || "N/A"}</p>
        ${MapLink ? `<a href="${MapLink}" target="_blank" class="btn btn-outline-primary">Google Maps</a>` : ""}
        ${Site ? `<a href="${Site}" target="_blank" class="btn btn-outline-secondary">Website</a>` : ""}
      </div>
    </div>
  `;
}

const idParams = new URLSearchParams(window.location.search).get("id");
if (idParams) {
  getOneRecord(idParams);
}
