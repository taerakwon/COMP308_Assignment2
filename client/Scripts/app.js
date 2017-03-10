// CUSTOM SCRIPTS

/* To initialize tooltop
Source code from: http://www.w3schools.com/bootstrap/bootstrap_tooltip.asp
*/
$(document).ready(() => {
    $('[data-toggle="tooltip"]').tooltip();   
});

/* Get ID element when a link is clicked */
$(document).on("click", "a", (event)=>{
    let clickedElement = event.target.id;
    console.log(clickedElement);
});
