// specific category findout by id function
const handleCardLoad = async (categoryId) =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    const data = await res.json();
    const cardData = data.data;


    const sortByView = () => {
        cardData.sort((a, b) => {
            const viewsA = parseInt(a.others?.views || 0, 10);
            const viewsB = parseInt(b.others?.views || 0, 10);
            return viewsB - viewsA;
        })
        displaySortByView();
    };


    function secToHouAndMi(seconds) {
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        return { hours, minutes };
    };

    // Card container loop
    const displaySortByView = () => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    cardData.forEach((card) =>{
        console.log(card);
        const timeS = card?.others?.posted_date;
        const time = secToHouAndMi(timeS);
        const div = document.createElement('div');
        div.innerHTML = `
        <figure class="w-full"><img class="w-full h-60 rounded-lg relative z-0"  src=${card?.thumbnail} />
        <p id="time" class="absolute z-10 ml-64 mt-44 text-white bg-black rounded-lg py-[5px] px-[5px] lg:py-1 lg:px-3">${time.hours} hrs ${time.minutes} min ago</p>
        </figure>
        <div class="card-body">
        <div class="flex gap-4">
        <img class="rounded-full w-10 h-10" src=${card?.authors[0]?.profile_picture} /> 
        <div>
        <h2 class="card-title">${card?.title}</h2>
        <div class="flex">
        <p>${card?.authors[0]?.profile_name}</p>
        <p>
        ${card?.authors[0]?.verified === true ? '<img src="images/verify.svg">'
         : (card?.authors[0]?.verified === false ? '' : '')}
        </p>
        </div>
        <p>${card?.others?.views}</p>
        </div>
        </div>
        </div>
        `;
        cardContainer.appendChild(div);
    });
};

document.getElementById('short-by-view').addEventListener('click', sortByView);
}

handleCardLoad('1000');

