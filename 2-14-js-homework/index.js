document.querySelector(".orion").addEventListener("click", function (event) {
  var rect = event.target.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var width = rect.right - rect.left;

  if (x < width / 2) {
    alert.log("Script will be displayed here");
  } else {
    alert.log(
      "Design aspects such as groundplan or prop list will be displayed here"
    );
  }
});

//STILL IN PROGRESS
