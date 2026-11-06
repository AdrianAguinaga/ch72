function saveTask() {
    //1. Get values from the DOM
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    //2. Create an Object using our Class
    const taskToSave = new Task(title, desc, color, date, status, budget);
    //3. Send to Server
    $.ajax(
        {
            type: "POST", // HTTP Verb: create
            url: serverName,
            data: JSON.stringify(taskToSave),
            contentType: "application/json",
            success: function (response) {
                console.log(response);                                         
            },
            error: function (fails) {
                console.log(fails);
            }

        }
    )

}

//this URL it is the server 
const serverName = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function updateTask() {
    $.ajax({
        type: "PUT", //HTTP Verb: Update
        url: "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks/1",
        data: JSON.stringify({
            title: "Hello",
            budget: 99999,
        }),
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        }, error: function (fails) {
            console.log(fails);
        }
    })
}

function loadTask() {
    $.ajax(//Asyc JavaScript XML
        {
            type: "get", //HTTP verb: READ
            url: serverName,
            success: function (response) {
                console.log(response);
                for(let i=0; i<response.length;i++)//reusing the displaytask code
                {
                    displayTask(response[i]);
                }
            },
            error: function (fail) {
                console.log(fail)
            }

        }
    )
}

function displayTask(task) {
    // Template literal using backticks
    let html = `
    <div class="task" id="${task.id}" style="border-color:${task.color}">
      <div class="info">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
      </div>
      <label class="status">${task.status}</label>
      <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: $${task.budget}</label>
      </div>
      <button class="btn-delete">Delete</button>
    </div>`;

    // Add to DOM
    $(".list").append(html);
}

function deleteTask(){
    console.log("hello from the delete");
    // 1. This is the specific button that was clicked
    let btn = $(this);
    // 2. Find the parent 
    let element = btn.parents(".task");
    // 3. Get the ID
    let id = element.attr("id");
    console.log(id);
}

function init() {
    console.log("hello from ch72");
    //hook the save button
    $("#btnSave").click(saveTask);
    //Lets try this in to the delete Button
    //$(".btn-delete").click(deleteTask);
    $(".list").on("click",".btn-delete",deleteTask);
    //load data from the server 
    loadTask();
}

window.onload = init;
//Force that the HTML and CSS gets resolved before the logic