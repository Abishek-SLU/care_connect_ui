/*
Author       : Dreamguys
Template Name: Care Connect - Bootstrap Template
Version      : 1.3
*/

window.onload = function () {
  "use strict";

  // Sidebar

  // Textarea Text Count
  var maxLength = 100;
  $("#review_desc").on("keyup change", function () {
    var length = $(this).val().length;
    length = maxLength - length;
    $("#chars").text(length);
  });

  // Floating Label
  if ($(".floating").length > 0) {
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  // Add More Hours
  $(".hours-info").on("click", ".trash", function () {
    $(this).closest(".hours-cont").remove();
    return false;
  });

  $(".add-hours").on("click", function () {
    var hourscontent =
      '<div class="row form-row hours-cont">' +
      '<div class="col-12 col-md-10">' +
      '<div class="row form-row">' +
      '<div class="col-12 col-md-6">' +
      '<div class="form-group">' +
      "<label>Start Time</label>" +
      '<select class="form-control">' +
      "<option>-</option>" +
      "<option>12.00 am</option>" +
      "<option>12.30 am</option>" +
      "<option>1.00 am</option>" +
      "<option>1.30 am</option>" +
      "</select>" +
      "</div>" +
      "</div>" +
      '<div class="col-12 col-md-6">' +
      '<div class="form-group">' +
      "<label>End Time</label>" +
      '<select class="form-control">' +
      "<option>-</option>" +
      "<option>12.00 am</option>" +
      "<option>12.30 am</option>" +
      "<option>1.00 am</option>" +
      "<option>1.30 am</option>" +
      "</select>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="col-12 col-md-2"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="javascript:void(0)" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>' +
      "</div>";

    $(".hours-info").append(hourscontent);
    return false;
  });

  // Chat
  var chatAppTarget = $(".chat-window");
  (function () {
    if ($(window).width() > 991) chatAppTarget.removeClass("chat-slide");

    $(document).on(
      "click",
      ".chat-window .chat-users-list a.media",
      function () {
        if ($(window).width() <= 991) {
          chatAppTarget.addClass("chat-slide");
        }
        return false;
      }
    );
    $(document).on("click", "#back_user_list", function () {
      if ($(window).width() <= 991) {
        chatAppTarget.removeClass("chat-slide");
      }
      return false;
    });
  })();

  // Circle Progress Bar

  function animateElements() {
    $(".circle-bar1").each(function () {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var percent = $(this).find(".circle-graph1").attr("data-percent");
      var animate = $(this).data("animate");
      if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
        $(this).data("animate", true);
        $(this)
          .find(".circle-graph1")
          .circleProgress({
            value: percent / 100,
            size: 400,
            thickness: 30,
            fill: {
              color: "#da3f81",
            },
          });
      }
    });
    $(".circle-bar2").each(function () {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var percent = $(this).find(".circle-graph2").attr("data-percent");
      var animate = $(this).data("animate");
      if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
        $(this).data("animate", true);
        $(this)
          .find(".circle-graph2")
          .circleProgress({
            value: percent / 100,
            size: 400,
            thickness: 30,
            fill: {
              color: "#68dda9",
            },
          });
      }
    });
    $(".circle-bar3").each(function () {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var percent = $(this).find(".circle-graph3").attr("data-percent");
      var animate = $(this).data("animate");
      if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
        $(this).data("animate", true);
        $(this)
          .find(".circle-graph3")
          .circleProgress({
            value: percent / 100,
            size: 400,
            thickness: 30,
            fill: {
              color: "#1b5a90",
            },
          });
      }
    });
  }

  if ($(".circle-bar").length > 0) {
    animateElements();
  }
  $(window).scroll(animateElements);

  // Preloader

  $(window).on("load", function () {
    if ($("#loader").length > 0) {
      $("#loader").delay(350).fadeOut("slow");
      $("body").delay(350).css({ overflow: "visible" });
    }
  });
  // Signup Toggle
  $(function () {
    $("#is_registered").click(function () {
      if ($(this).is(":checked")) {
        $("#preg_div").show();
      } else {
        $("#preg_div").hide();
      }
    });
  });

  //Increment Decrement value
  $(".inc.button").click(function () {
    var $this = $(this),
      $input = $this.prev("input"),
      $parent = $input.closest("div"),
      newValue = parseInt($input.val()) + 1;
    $parent.find(".inc").addClass("a" + newValue);
    $input.val(newValue);
    newValue += newValue;
  });
  $(".dec.button").click(function () {
    var $this = $(this),
      $input = $this.next("input"),
      $parent = $input.closest("div"),
      newValue = parseInt($input.val()) - 1;
    console.log($parent);
    $parent.find(".inc").addClass("a" + newValue);
    $input.val(newValue);
    newValue += newValue;
  });

  // Signup Profile
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#prof-avatar").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#profile_image").change(function () {
    readURL(this);
  });

  // Datepicker
  var maxDate = $("#maxDate").val();
  if ($("#dob").length > 0) {
    $("#dob").datepicker({
      startView: 2,
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true,
      endDate: maxDate,
    });
  }
  if ($("#editdob").length > 0) {
    $("#editdob").datepicker({
      startView: 2,
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true,
      endDate: maxDate,
    });
  }
  if ($("#dep-dob").length > 0) {
    $("#dep-dob").datepicker({
      startView: 2,
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true,
      endDate: maxDate,
    });
  }
  if ($("#dep-editdob").length > 0) {
    $("#dep-editdob").datepicker({
      startView: 2,
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true,
      endDate: maxDate,
    });
  }
};
