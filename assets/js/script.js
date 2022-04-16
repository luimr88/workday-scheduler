var currentTime = null;
var currentDate = null;
var containerEl = $('.container');
var timeArray = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

// Function that adds the current time to the page.
var update = function () {
    currentDate = moment(new Date())
    currentTime.html(currentDate.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

// timer event to show the current time as being live
$(document).ready(function () {
    currentTime = $('#currentDay')
    update();
    setInterval(update, 1000);
});

containerEl.on("click", "button", saveText);

// Dynamically creates html elements on the page.
console.log(timeArray);
var appendContainer = function () {
    indexId = 7;
    for (var i = 0; i < timeArray.length; i++) {
        indexId++;
        var timeBlock = $("<div>").addClass("row time-block").attr('id', indexId);
        var hour = $("<div>").addClass("col-md-1 hour").html(timeArray[i]);
        var description = $("<textarea>").addClass("col-md-10 description").attr('id', 'text-area');
        description.text(localStorage.getItem(`timeSlot${i}`) || '');
        var saveBtn = $("<button>").addClass("col-md-1 btn saveBtn").attr('id', `${i}`);
        var btnIcon = $("<i>").addClass("fas fa-save");
        containerEl.append(timeBlock);
        timeBlock.append(hour);
        timeBlock.append(description);
        timeBlock.append(saveBtn);
        saveBtn.append(btnIcon);

    }
    listColor();
}

// Allows the time blocks to change color depending on the current time
function listColor() {
    var time = moment().hour();
    
    $(".time-block").each(function () {
        var calendarTime = $(this).attr("id");
        console.log(time);
        console.log(calendarTime);
        if (calendarTime == time) {
            $(this).removeClass("past");
            $(this).removeClass("future");
            $(this).addClass("present");
        } else if(calendarTime < time) {
            $(this).addClass("past");
            $(this).removeClass("future");
            $(this).removeClass("present");
        } else if(calendarTime > time) {
            $(this).removeClass("past");
            $(this).addClass("future");
            $(this).removeClass("present");
        }
    })
}

// Saves the event text entered to local storage
function saveText() {
    for (var i = 0; i < timeArray.length; i++) {
        if ($(this).attr('id') == i) {
            localStorage.setItem(`timeSlot${i}`, $(this).siblings(".description").val());
        }
    }
}
appendContainer();
