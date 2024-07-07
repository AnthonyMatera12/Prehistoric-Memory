function init() {
  $("#bookForm").on("submit", addBook);
  $("#listButton").on("click", listBooks);
  $("#authorDropdown").on("change", function() {
    $("#author").val($(this).val());
  });
  $("#publisherDropdown").on("change", function() {
    $("#publisher").val($(this).val());
  });
  updateDropdowns();
}

function addBook(e) {
  e.preventDefault();
  const book = {
    title: $("#title").val(),
    author: $("#author").val(),
    genre: $("#genre").val(),
    publisher: $("#publisher").val(),
    year: $("#year").val(),
    types: $("input[type=checkbox]:checked").map(function() {
      return $(this).val();
    }).get()
  };

  $.ajax({
    url: "/addBook",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(book),
    success: function(response) {
      updateDropdowns(response.authors, response.publishers);
      $("#bookForm")[0].reset();
    }
  });
}

function updateDropdowns(authors = [], publishers = []) {
  $("#authorDropdown").html("<option value=''>Select Author</option>" + 
    authors.map(author => `<option value="${author}">${author}</option>`).join(""));
  $("#publisherDropdown").html("<option value=''>Select Publisher</option>" + 
    publishers.map(publisher => `<option value="${publisher}">${publisher}</option>`).join(""));
}

function listBooks() {
  $.ajax({
    url: "/getBooks",
    method: "GET",
    success: function(books) {
      let tableBody = "";
      books.forEach(book => {
        tableBody += `
          <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.publisher}</td>
            <td>${book.year}</td>
            <td>${book.types.join(", ")}</td>
          </tr>
        `;
      });
      $("#bookList tbody").html(tableBody);
    }
  });
}


$(() => {
  init();
});