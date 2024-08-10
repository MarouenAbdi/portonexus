$(document).ready(function () {
  $(".popClose").on("click", function () {
    $(".popWrapper").removeClass("slideTop");
    $(".popWrapper").addClass("slideTopRev");

    setTimeout(() => {
      $(".popUpmain").removeClass("d-flex");
    }, 500);
  });
});
