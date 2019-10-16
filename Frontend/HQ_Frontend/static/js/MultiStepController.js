﻿function CancelModel() {
    $('#myModal').modal('show');
}

//This will move the progress bar forward
window.NextProgressBar = function(NextStep) {
    //If there are no more li to set to active then skip this
    if ($("#Progress-Bar").children().not(".active").length !== 0) {
        //set the next li item as the active one
        var currentTask = $("#Progress-Bar").children(".active").last();
        currentTask.removeClass("error");
        //set the next li item as the active one
        var nextTask = $("#Progress-Bar").children().not(".active").first();
        nextTask.addClass("active");

        //if the last li was just set as active then turn the bar
        //to blue to signify that it is complete
        if ($("#Progress-Bar").children().not(".active").length === 0) {
            $("#Progress-Bar").children().each(function () {
                $(this).addClass("complete");
            });
        }

        if(NextStep === 5){
          let endpoint = `/view/flagReview/${sessionStorage.sessionId}?colName=${JSON.parse(sessionStorage.dataCols)[0]}`
          console.log(endpoint)
          $('#StepPlaceholder').load(endpoint);
        }
        else{
          $('#StepPlaceholder').load("/view/SetStep/Step_" + NextStep, function(){
            if(NextStep === 3){
              loadTestConfigComponents();
            }
        });
      }
    }
}

//This will move the progress bar backwards
function PreviousProgressBar(PreviousStep) {

    //if all the children were set and we are going backwards then
    //remove the complete status
    if ($("#Progress-Bar").children().not(".active").length === 0) {
        $("#Progress-Bar").children().each(function () {
            $(this).removeClass("complete");
        });
    }

    //do not remove the active status from the first li as this
    //should always be the active one if we are here
    if ($("#Progress-Bar").children().filter(".active").length > 1) {
        var currentTask = $("#Progress-Bar").children(".active").last();
        currentTask.removeClass("active");
    }

    if(NextStep === 5){
      $('#StepPlaceholder').load(`/view/flagReview/${sessionStorage.sessionId}?colName=${sessionStorage.dataCols[0]}&indexCol=${sessionStorage.indexCol}`);
    }
    else{
      $('#StepPlaceholder').load("/view/SetStep/Step_" + PreviousStep, function(){
        if(PreviousStep === 3){
          loadTestConfigComponents();
        }
      });
    }
}
