const loadData = async (searchText="13", isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    displayPhone(data.data, isShowAll)
};

const displayPhone = (phones, isShowAll) => {
    const divContainer = document.getElementById("div-container");
    divContainer.textContent = '';
    

    const showAll = document.getElementById("showAll-btn");
    if (phones.length > 12 && !isShowAll) {
        showAll.classList.remove("hidden");
    }
    else {
        showAll.classList.add("hidden");
    }


    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone => {
        const phoneCard = document.createElement("div")
        phoneCard.classList = `border rounded-lg p-5`;

        phoneCard.innerHTML = `
            <div class="bg-[#0D6EFD0D] rounded-lg flex justify-center p-8">
                <img src="${phone.image}" alt="">
            </div>
            <div class="text-center px-3 flex flex-col items-center justify-center">
                <h3 class="text-[#403F3F] font-bold text-xl mt-5 mb-4">${phone.phone_name}</h3>
                <p class="text-sm font-normal">There are many variations of passages of available, but the majority have suffered</p>
                <h3 class="text-[#403F3F] font-bold text-xl mt-2 mb-4">$999</h3>
                <button onclick="handleShowDetails('${phone.slug}')" class="py-3 btn px-8 text-base rounded-lg font-bold bg-[#0D6EFD] text-white">Show Details</button>
            </div>
        `
        divContainer.appendChild(phoneCard)
    })
    // hide loading spinner 
    toggleLoadingSppiner(false)
}


const handleShowDetails = async (id) => {
    console.log("details clicked", id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    showPhoneDetails(data.data)
}

// show display modal
const showPhoneDetails = (phone) => {
    const modalContainer = document.getElementById("modal-container");
    modalContainer.textContent = '';
    console.log(phone)
    show_details_modal.showModal()
    
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="bg-[#0D6EFD0D] rounded-lg flex justify-center p-8">
            <img src="${phone.image}" alt="">
        </div>
        <div>
            <h3 class="text-[#403F3F] font-bold text-xl mt-5">${phone?.name}</h3>
            <p class="text-sm font-normal py-4">There are many variations of passages of available, but the majority have suffered
            </p>
            <div class="*:font-normal text-base">
                <p><span class="font-semibold">Storage :</span>${phone?.mainFeatures?.storage}</p>
                <p><span class="font-semibold">Display Size :</span>${phone?.mainFeatures?.displaySize}</p>
                <p><span class="font-semibold">Chipset :</span>${phone?.mainFeatures?.chipSet}</p>
                <p><span class="font-semibold">Memory :</span>${phone?.mainFeatures?.memory}</p>
                <p><span class="font-semibold">Slug :</span>${phone?.slug}</p>
                <p><span class="font-semibold">Release data :</span>${phone?.releaseDate}</p>
                <p><span class="font-semibold">Brand :</span>${phone?.brand}</p>
                <p><span class="font-semibold">GPS :</span> ${phone?.others?.GPS}</p>
            </div>
        </div>
        <div class="modal-action ">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="py-3 btn px-8 text-base rounded-lg font-bold bg-[#DC3545] text-white">Close</button>
                </form>
            </div>
    `
    modalContainer.appendChild(div)
}



// handle seach btn 
function handlerSearch(isShowAll) {
    toggleLoadingSppiner(true)
    const searchFiled = document.getElementById("search-filed");
    const searchText = searchFiled.value;
    loadData(searchText, isShowAll)
}

const toggleLoadingSppiner = (isLoading) => {
    const loadingsppiner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingsppiner.classList.remove("hidden");
    }
    else {
        loadingsppiner.classList.add("hidden")
    }
}

function handleShowAll() {
    handlerSearch(true);
}

loadData()