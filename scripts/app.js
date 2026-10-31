function saveTask(){
    //1. Get values from the DOM
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    //2. Create an Object using our Class
    const taskToSave = new Task(title,desc,color,date,status,budget);
}

function init()
{
    console.log("hello from ch72");
}

window.onload = init;
//Force that the HTML and CSS gets resolved before the logic