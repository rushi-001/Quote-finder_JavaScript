// Function to fetch and display a random quote
function fetchAndDisplayQuote() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Get a random quote from the data
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex].text;
      const QuoteAuthor = data[randomIndex].author;
      let Author = QuoteAuthor;
      // remove the ", type.fit"
      Author = Author.split(",")[0].trim();
      // Display the quote
      document.getElementById("quote_text").innerText = `${randomQuote}`;
      document.getElementById("quote_author").innerText = `${Author}`;
    })
    // shows the error when the error acour in fetch quote
    .catch(function (error) {
      console.error("Error fetching the quote:", error);
    });
}

// tack author name from search
// document.getElementById("btn-input").addEventListener("click", function(event){
//   event.preventDefault(); // prevent form from refrashing when submitting
//   const authorName = document.getElementById("input-search").value;
//   if (authorName !== "") {
//     fetchQuoteByAuthor(authorName);
//   }
// })

// this didt work...

// function fetchQuoteByAuthor(author) {
//   // Fetch quotes by the specified author from the API
//   fetch(`https://type.fit/api/quotes?author=${encodeURIComponent(author)}`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       // Check if there are quotes by the specified author
//       if (data.length > 0) {
//         // Get a random quote from the data
//         const randomIndex = Math.floor(Math.random() * data.length);
//         const randomQuote = data[randomIndex].text;

//         // Build a list of quotes
//         const quotesList = data.map(quote => `${quote.text}\n`).join('');

//         // Display the quote and author
//         document.getElementById("quote_list").innerText = `${randomQuote}`;
//       } else {
//         // If no quotes are found for the specified author, display a message
//         document.getElementById("quote_list").innerText = "No quotes found for this author.";
//       }
//     })
//     .catch(function (error) {
//       console.error("Error fetching the quote:", error);
//     });
// }

// adding new quotes
document
  .getElementById("btn_add_quote")
  .addEventListener("click", function (event) {
    event.preventDefault(); // prevent form from refrashing when submitting
    const newQuote = document.getElementById("input_new_quote").value;

    if (newQuote !== "") {
      let li = document.createElement("li");
      li.innerHTML = newQuote;
      document.getElementById("container_quote").appendChild(li);
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);
    } else {
      alert("Add Quote !!!");
    }

    document.getElementById("input_new_quote").value = "";
    saveQuotes();
  });

// delete quote
container_quote.addEventListener(
  "click",
  function (e) {
    e.preventDefault();

    if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveQuotes();
    }
  },
  false
);

// save data in catch
function saveQuotes() {
  localStorage.setItem("quote", container_quote.innerHTML);
}

//
function showQuotes() {
  container_quote.innerHTML = localStorage.getItem("quote");
}
showQuotes();

// Call the function to fetch and display a quote when the page loads
fetchAndDisplayQuote();

// show the quote when click on btn
document
  .getElementById("btn-show")
  .addEventListener("click", fetchAndDisplayQuote);
