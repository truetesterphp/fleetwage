// src/initJqueryUI.js
import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';

export function initJqueryUI() {
  // Menu bar toggle
  $('.menu-bar').off('click').on('click', function () {
    if ($(window).width() <= 1199) {
      $('.menu').slideToggle();
      $(this).toggleClass('active-menu');
    }
  });

  // Export & Smart Options
  $('.export-col>.btn').off('click').on('click', function (e) {
    e.stopPropagation();
    $(".export-option").addClass('active-option');
  });

  $('.smart-col>.btn').off('click').on('click', function (e) {
    e.stopPropagation();
    $(".smart-option").addClass('active-smart-option');
  });

  // Close export/smart options
  $(document).off('click.export-smart').on('click.export-smart', function () {
    $('.export-option').removeClass('active-option');
    $('.smart-option').removeClass('active-smart-option');
  });

  // Trigger 3-dot menu
  $('.trigger-option').off('click').on('click', function (e) {
    e.stopPropagation();
    $(this).next('.routes-option').addClass('edit-active');
    $(this).closest('.routes-col').addClass('routes-col-active');
  });

  $(document).off('click.trigger').on('click.trigger', function () {
    $(".routes-option").removeClass('edit-active');
    $(".routes-col").removeClass('routes-col-active');
  });

  // Assign dropdown
  $('.assign-btn').off('click').on('click', function (e) {
    e.stopPropagation();
    $(this).parent().next().addClass('assign-active');
    $(this).closest('.table-day-col').addClass('assign-col-active');
  });

  $(document).off('click.assign').on('click.assign', function () {
    $(".assign-option").removeClass('assign-active');
    $(".table-day-col").removeClass('assign-col-active');
  });

  // Day vs Week dropdown toggle
  $('.day-dropdown').off('change').on('change', function () {
    const selectedVal = $(this).val();
    if (selectedVal === 'day') {
      $(".day-table").addClass('day-table-show');
      $(".week-table").removeClass('week-table-show');
    } else if (selectedVal === 'Week') {
      $(".week-table").addClass('week-table-show');
      $(".day-table").removeClass('day-table-show');
    }
  });

  // Sidebar collapse
  $('.sidebar-collaps-btn').off('click').on('click', function () {
    $('.sidebar').toggleClass('short-sidebar');
    $('.dashboard-main').toggleClass('collapse-main');
    $(this).toggleClass('collapse-btn');
  });

  // Form open/close buttons
  const formButtons = [
    { btn: '.publish', form: '.publish-shift-form' },
    { btn: '.filter-col>.btn', form: '.filter-form', toggleClass: 'filter-active-btn' },
    { btn: '.add-routes', form: '.add-route-form' },
    { btn: '.manager', form: '.route-manager' },
    { btn: '.btn-add-employe', form: '.add-employee-form' },
    { btn: '.edit-shift-form-btn', form: '.edit-shift-form' },
    { btn: '.post-form-btn', form: '.open-shift-form' },
    { btn: '.create-employee-btn, .edit-driver-form-btn', form: '.create-employee-form' },
    { btn: '.add-drivers-btn', form: '.add-new-drivers-form', hide: '.create-employee-form' },
  ];

  formButtons.forEach(({ btn, form, toggleClass, hide }) => {
    $(btn).off('click').on('click', function () {
      $(form).addClass('show-form');
      if (hide) $(hide).removeClass('show-form');
      if (toggleClass) $(this).addClass(toggleClass);
    });
  });

  $('.close-btn, .cancel-btn').off('click').on('click', function () {
    $('.form-outer, .filter-form, .create-employee-form, .add-new-drivers-form, .add-route-form, .route-manager, .edit-shift-form, .open-shift-form, .add-employee-form').removeClass('show-form');
    $('.routes-option').removeClass('show-routes-option');
    $('.filter-col>.btn').removeClass('filter-active-btn');
    $('.create-employee-btn, .edit-driver-form-btn').removeClass('active-option');
  });

  // Add employee row
  /*   $('.add-employee-btn').off('click.addRow').on('click.addRow', function () {
      const newRow = $('.cloan-row').first().clone();
      $('#employee-wrapper').append(newRow);
    }); */

  // Checkbox - Select all
  $('.all').off('change').on('change', function () {
    $('.day-checkbox').prop('checked', this.checked);
  });

  $('.day-checkbox').off('change').on('change', function () {
    const total = $('.day-checkbox').length;
    const checked = $('.day-checkbox:checked').length;
    $('.all').prop('checked', total === checked);
  });


  // Drag and Drop Logic

   $(".routes-move a").off("mousedown").on("mousedown", function () {
  $(".routes-box").draggable({
    revert: "invalid",
    start: function (event, ui) {
      ui.helper.css("z-index", 10);
      ui.helper.data("sourceCell", ui.helper.closest("td"));
    }
  });

  $(".draggable-item").droppable({
    accept: ".routes-box",
    hoverClass: "ui-state-hover",
    over: function () {
      $(this).css("background-color", "#f0f8ff"); // light blue on hover
    },
    out: function () {
      $(this).css("background-color", ""); // reset background on out
    },
    drop: function (event, ui) {
      const $movedBox = ui.draggable;
      const $targetCell = $(this);
      const $sourceCell = $movedBox.data("sourceCell");
      const $addDriversTarget = $targetCell.find(".add-drivers");

      // Dropping in same cell
      if ($targetCell[0] === $sourceCell[0]) {
        if ($addDriversTarget.length) {
          $movedBox.insertBefore($addDriversTarget);
        } else {
          $targetCell.append($movedBox);
        }

        $movedBox[0].style.setProperty("top", "0", "important");
        $movedBox[0].style.setProperty("left", "0", "important");
        $movedBox[0].style.setProperty("position", "relative", "important");
        $movedBox[0].style.setProperty("z-index", "1", "important");
        return;
      }

      // Dropping in a new cell
      $movedBox.detach();
      if ($addDriversTarget.length) {
        $movedBox.insertBefore($addDriversTarget);
      } else {
        $targetCell.append($movedBox);
      }

      // Handle unassign swap if needed
      if ($targetCell.hasClass("not-assigned")) {
        const $placeholder = $targetCell.find(".not-assigned-outer").detach();
        $sourceCell.append($placeholder);
        $targetCell.removeClass("not-assigned");

        const hasAddDrivers = $sourceCell.find(".add-drivers").length > 0;
        const hasOtherRoutesBox = $sourceCell.find(".routes-box").length > 0;

        if (!hasAddDrivers && !hasOtherRoutesBox) {
          $sourceCell.addClass("not-assigned");
          $sourceCell.find(".not-assigned-outer").show();
        } else {
          $sourceCell.removeClass("not-assigned");
          $sourceCell.find(".not-assigned-outer").hide();
        }
      } else {
        $targetCell.find(".not-assigned-content").hide();
      }

      // ✅ Replace source td with cloned unassigned td if no children at all
      const $divsInSource = $sourceCell.children("div");
      const hasOnlyAddDrivers = $divsInSource.length === 1 && $divsInSource.hasClass("add-drivers");
      const hasNoDivs = $divsInSource.length === 0;

      if (hasNoDivs) {

         const newTD = $(`
      <td class="draggable-item not-assigned  newclone">
                                            <div class="not-assigned-content">
                                                <div class="assigned-title">
                                                    <span class="assigned-alert-icon"><i
                                                            class="fa-solid fa-triangle-exclamation"></i></span>
                                                    <h6>Not Assigned</h6>
                                                </div>
                                                <a href="#" class="assign-btn">Assign now <span><i
                                                            class="fas fa-chevron-down"></i></span></a>
                                                <ul class="assign-option option-box">
                                                    <li class="add-employee-option"><a href="#"
                                                            class="btn-add-employe"><span class="employee-icons"><img
                                                                    src="images/profile-add.svg" alt=""></span>Add
                                                            Employee
                                                        </a>
                                                    </li>
                                                    <li class="post-option"><a href="#" class="post-form-btn"><span
                                                                class="post-icons"><img
                                                                    src="images/Icon@megaphone-01.svg"
                                                                    alt=""></span>Post Now</a></li>
                                                </ul>
                                            </div>

                                        </td>
    `);

    // Append inside a new <tr>
    const newRow = $('<tr></tr>').append(newTD);


       let $clonedUnassignedTD = $("td.newclone").first().clone(false); // avoid copying old event handlers
$sourceCell.replaceWith(newRow);

   const formButtons = [
    { btn: '.publish', form: '.publish-shift-form' },
    { btn: '.filter-col>.btn', form: '.filter-form', toggleClass: 'filter-active-btn' },
    { btn: '.add-routes', form: '.add-route-form' },
    { btn: '.manager', form: '.route-manager' },
    { btn: '.btn-add-employe', form: '.add-employee-form' },
    { btn: '.edit-shift-form-btn', form: '.edit-shift-form' },
    { btn: '.post-form-btn', form: '.open-shift-form' },
    { btn: '.create-employee-btn, .edit-driver-form-btn', form: '.create-employee-form' },
    { btn: '.add-drivers-btn', form: '.add-new-drivers-form', hide: '.create-employee-form' },
  ];

  formButtons.forEach(({ btn, form, toggleClass, hide }) => {
    $(btn).off('click').on('click', function () {
      $(form).addClass('show-form');
      if (hide) $(hide).removeClass('show-form');
      if (toggleClass) $(this).addClass(toggleClass);
    });
  });

$(document).ready(function () {
  // Event delegation for dynamically added links inside .buttonnew div
  $('.newclone').on('click', '.assign-btn', function (e) {
    e.preventDefault();
    alert('Button in .buttonnew clicked!');
     $(this).next().addClass('assign-active');
    $(this).parent().parent().addClass('assign-col-active');
  });
});

$('.day-dropdown').on('change', function () {
    var selectedVal = $(this).val();

    if (selectedVal === 'day') {
        $(".day-table").addClass('day-table-show');
        $(".week-table").removeClass('week-table-show');
    } else if (selectedVal === 'Week') {
        $(".week-table").addClass('week-table-show');
        $(".day-table").removeClass('day-table-show');
    }
});


$('.add-employee-btn').on('click', function () {
    const newRow = $('.cloan-row').first().clone(); // clone the first row
    // newRow.find('select').val(''); // clear selected values
    $('#employee-wrapper').append(newRow); // append to wrapper
});
$clonedUnassignedTD.droppable({
  accept: ".routes-box",
  hoverClass: "ui-state-hover",
  over: function () {
    $(this).css("background-color", "#f0f8ff");
  },
  out: function () {
    $(this).css("background-color", "");
  },
drop: function (event, ui) {
  const $movedBox = ui.draggable;
  const $targetCell = $(this);
  const $sourceCell = $movedBox.data("sourceCell");
  const $addDriversTarget = $targetCell.find(".add-drivers");

  // Move the draggable box
  $movedBox.detach();
  if ($addDriversTarget.length) {
    $movedBox.insertBefore($addDriversTarget);
  } else {
    $targetCell.append($movedBox);
  }

  // Clone a fresh .not-assigned td (clean)
  const $templateTD = $("td.newclone");
  const $clonedUnassignedTD = $templateTD.clone(false).empty(); // clone and clear contents

// add the button

  // Replace the source cell with this new td
  $sourceCell.replaceWith($clonedUnassignedTD);

  // Reinitialize droppable on new td
  $clonedUnassignedTD.droppable({
    accept: ".routes-box",
    hoverClass: "ui-state-hover",
    over: function () {
      $(this).css("background-color", "#f0f8ff");
    },
    out: function () {
      $(this).css("background-color", "");
    },
    drop: arguments.callee
  });

  // ✅ Delegated click handler (place this only once in your setup)

}



});

      }

     
      // Highlight effect
      $targetCell.css("background-color", "#d1ffd1");
      setTimeout(() => {
        $targetCell.css("background-color", "");
      }, 300);

      // Cleanup styles
      $movedBox[0].style.setProperty("top", "0", "important");
      $movedBox[0].style.setProperty("left", "0", "important");
      $movedBox[0].style.setProperty("position", "relative", "important");
      $movedBox[0].style.setProperty("z-index", "1", "important");
    }
  });
});  
/* 
$(".routes-move a").off("mousedown").on("mousedown", function () {
  $(".routes-box").draggable({
    revert: "invalid",
    start: function (event, ui) {
      ui.helper.css("z-index", 10);
      ui.helper.data("sourceCell", ui.helper.closest("td"));
    }
  });

  $(".draggable-item").droppable({
    accept: ".routes-box",
    hoverClass: "ui-state-hover",
    over: function () {
      $(this).css("background-color", "#f0f8ff");
    },
    out: function () {
      $(this).css("background-color", "");
    },
   drop: function (event, ui) {
  const $movedBox = ui.draggable;
  const $targetCell = $(this);
  const $sourceCell = $movedBox.data("sourceCell");
  const $addDriversTarget = $targetCell.find(".add-drivers");

  const sourceCellId = $sourceCell.attr("data-cell-id"); // assume this exists

  // Dropping in same cell — no need to do anything extra
  if ($targetCell[0] === $sourceCell[0]) {
    if ($addDriversTarget.length) {
      $movedBox.insertBefore($addDriversTarget);
    } else {
      $targetCell.append($movedBox);
    }

    resetBoxStyle($movedBox);
    return;
  }

  // Append to new cell
  $movedBox.detach();
  if ($addDriversTarget.length) {
    $movedBox.insertBefore($addDriversTarget);
  } else {
    $targetCell.append($movedBox);
  }

  // Handle not-assigned logic
  if ($targetCell.hasClass("not-assigned")) {
    const $placeholder = $targetCell.find(".not-assigned-outer").detach();
    $sourceCell.append($placeholder);
    $targetCell.removeClass("not-assigned");

    const hasAddDrivers = $sourceCell.find(".add-drivers").length > 0;
    const hasOtherBoxes = $sourceCell.find(".routes-box").length > 0;

    if (!hasAddDrivers && !hasOtherBoxes) {
      $sourceCell.addClass("not-assigned");
      $sourceCell.find(".not-assigned-outer").show();
    } else {
      $sourceCell.removeClass("not-assigned");
      $sourceCell.find(".not-assigned-outer").hide();
    }
  } else {
    $targetCell.find(".not-assigned-content").hide();
  }

  // ✅ Check if source cell is empty AFTER move
  const sourceStillHasRoutes = $sourceCell.find(".routes-box").length > 0;
  const sourceHasAddDrivers = $sourceCell.find(".add-drivers").length > 0;

  const isNowEmpty = !sourceStillHasRoutes && !sourceHasAddDrivers;

if (isNowEmpty) {
  $sourceCell.addClass("not-assigned");

  // Dispatch custom event to React to update state for this cell
  const cellKey = $sourceCell.attr("data-cell-id");
  if (cellKey) {
    window.dispatchEvent(new CustomEvent("routesCellEmpty", { detail: { cellKey } }));
  }
}



  // Feedback effect
  $targetCell.css("background-color", "#d1ffd1");
  setTimeout(() => {
    $targetCell.css("background-color", "");
  }, 300);

  resetBoxStyle($movedBox);
}

  });
});
function resetBoxStyle($el) {
  $el[0].style.setProperty("top", "0", "important");
  $el[0].style.setProperty("left", "0", "important");
  $el[0].style.setProperty("position", "relative", "important");
  $el[0].style.setProperty("z-index", "1", "important");
} */

/*   $(".routes-move a").off("mousedown").on("mousedown", function () {
    $(".routes-box").draggable({
      revert: "invalid",
      start: function (event, ui) {
        ui.helper.css("z-index", 10);
        ui.helper.data("sourceCell", ui.helper.closest("td"));
      }
    });

    $(".draggable-item").droppable({
      accept: ".routes-box",
      hoverClass: "ui-state-hover",
      over: function () {
        $(this).css("background-color", "#f0f8ff"); // light blue on hover
      },
      out: function () {
        $(this).css("background-color", ""); // reset background on out
      },
      drop: function (event, ui) {
        const $movedBox = ui.draggable;
        const $targetCell = $(this);
        const $sourceCell = $movedBox.data("sourceCell") || $movedBox.closest("td");

        const $addDriversTarget = $targetCell.find(".add-drivers");

        // If dropped in same cell
        if ($targetCell[0] === $sourceCell[0]) {
          if ($addDriversTarget.length) {
            $movedBox.insertBefore($addDriversTarget);
          } else {
            $targetCell.append($movedBox);
          }

          // Ensure it resets position even if same cell
          $movedBox[0].style.setProperty("top", "0", "important");
          $movedBox[0].style.setProperty("left", "0", "important");
          $movedBox[0].style.setProperty("position", "relative", "important");
          $movedBox[0].style.setProperty("z-index", "1", "important");

          return;
        }

        // Normal drop into different cell
        $movedBox.detach();
        if ($addDriversTarget.length) {
          $movedBox.insertBefore($addDriversTarget);
        } else {
          $targetCell.append($movedBox);
        }

        // Handle not-assigned logic
        if ($targetCell.hasClass("not-assigned")) {
          const $placeholder = $targetCell.find(".not-assigned-content").detach();
          $sourceCell.append($placeholder);
          $targetCell.removeClass("not-assigned");

          if ($sourceCell.find(".add-drivers").length === 0) {
            $sourceCell.addClass("not-assigned");
            $sourceCell.find(".not-assigned-content").show();
          }
        } else {
          $targetCell.find(".not-assigned-content").hide();
        }

        // Highlight effect
        $targetCell.css("background-color", "#d1ffd1");
        setTimeout(() => {
          $targetCell.css("background-color", "");
        }, 300);

        // Cleanup positioning styles
        $movedBox[0].style.setProperty("top", "0", "important");
        $movedBox[0].style.setProperty("left", "0", "important");
        $movedBox[0].style.setProperty("position", "relative", "important");
        $movedBox[0].style.setProperty("z-index", "1", "important");
      }


    });
  }); */


  /*   $(".routes-move a").off('mousedown').on("mousedown", function () {
      $(".routes-box").draggable({
        revert: "invalid",
        start: function (event, ui) {
          ui.helper.css("z-index", 10);
        }
      });
  
      $(".draggable-item").droppable({
        accept: ".routes-box",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
          const $targetCell = $(this);
          const $movedBox = ui.draggable;
  
          $movedBox.detach().appendTo($targetCell).css({ top: 0, left: 0, position: 'relative' });
          $targetCell.removeClass("not-assigned");
          $targetCell.find(".not-assigned-content").hide();
        }
      });
    }); */

  // Optional: destroy draggable on mouseup
  $(document).off('mouseup.dragEnd').on("mouseup.dragEnd", function () {
    if ($(".routes-box").data("ui-draggable")) {
      $(".routes-box").draggable("destroy");
    }
  });
}
