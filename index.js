// Drag and drop Task
$( function() {
    $( "#draggable" ).draggable();
    $( "#droppable" ).droppable({
        drop: function( _event, ui ) {
            ui.draggable.remove();
      }
    });
  } );

  //------------------------End of drag and drop task---------------------------------------------------

// fetch data task

$(function () {
    $.ajax({
        url: "https://dummyjson.com/products",
        success: function (res) {
            if (res.products && res.products.length > 0) {
                res.products.forEach(function (product) {
                    displayProduct(product);
                });
            }
        },
        error: function (err) {
            console.log(err);
        },
        data: {},
    });

    $("#get-data").click(function () {
        const productId = $("#product-id").val();
        if (!productId) {
            console.log("Please enter a product ID");
            return;
        }
                window.location.href = `product.html?id=${productId}`;
    });
});

function displayProduct(product, isFirstProduct = false) {
    const productContainer = $("<div>").addClass("each-product");
    const img = $("<img>").attr("src", product.images[0]).addClass("product-img");
    const title = $("<div>").text(product.title).addClass("product-title");
    const desc = $("<div>").text(product.description).addClass("product-desc");
    const price = $("<div>").text(product.price).addClass("product-price");
    productContainer.append(img, title, desc, price);

    // Add animation
    if (isFirstProduct) {
            productContainer.hide().prependTo("#fetch-data").fadeIn(1000);
    } else {
        productContainer.hide().appendTo("#fetch-data").fadeIn(1000);
    }
}

// -------------------end of fetch data task---------------------------------------------

// To Do list 
$(document).ready(function () {
    // Save tasks to local storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function (task) {
            appendTaskToList(task);
        });
    }

    // Append task to the task list
    function appendTaskToList(task) {
        let listItem = $('<li>').text(task).addClass('toggler');
        let deleteButton = $('<button>').text('Delete').addClass('delete-button');
        let doneButton = $('<button>').text('Done').addClass('done-button');

        listItem.append(doneButton);
        listItem.append(deleteButton);

        $('#task-list').append(listItem);

        deleteButton.click(function () {
            // Remove the task from the list
            listItem.remove();
            // Remove the task from local storage
            removeTask(task);
        });
    }
    function removeTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        saveTasks(tasks);
    }

   // Event  Done button
$("#task-list").on("click", ".done-button", function () {
    const listItem = $(this).closest("li");
    listItem.toggleClass("Done");
    listItem.css("background-color", listItem.hasClass("Done") ? "#dcf8c6" : "#fff");
});

    $('#task-form').submit(function (event) {
        event.preventDefault();
        let taskInput = $('input[name=task-input]');
        let task = taskInput.val().trim();

        if (task !== '') {
            // Append task to the list
            appendTaskToList(task);
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            saveTasks(tasks);
            // Clear input
            taskInput.val('');
        }
    });

    // Add task on Enter key press
    $("input[name=task-input]").keyup(function (event) {
        if (event.keyCode == 13) {
            $('#task-form').submit();
        }
    });

    // Enable sorting of tasks
    $('#task-list').sortable();

    // Load tasks from local storage
    loadTasks();
});
