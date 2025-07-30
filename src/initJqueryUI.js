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
    // Initialize draggable on routes-box elements
    $(".routes-box").draggable({
      revert: "invalid",
      containment: "table", // restricts dragging to within the table
      start: function (event, ui) {
        ui.helper.css("z-index", 10);
        ui.helper.data("sourceCell", ui.helper.closest("td"));
        ui.helper.find(".routes-option").hide();
      },
      stop: function (event, ui) {
       
       ui.helper.find(".routes-option").show();
      }
    });

    // Initialize droppable on cells that accept routes-box
    $(".draggable-item").droppable({
      accept: ".routes-box",
      hoverClass: "ui-state-hover",
      over: function () {
        $(this).css("background-color", "#7B87F5");
      },
      out: function () {
        $(this).css("background-color", "");
      },
      drop: function (event, ui) {
        const $movedBox = ui.draggable;
        const $targetCell = $(this);
        const $sourceCell = $movedBox.data("sourceCell") || $movedBox.closest("td");
        const $addDriversTarget = $targetCell.find(".add-drivers");

        if ($targetCell[0] === $sourceCell[0]) {
          if ($addDriversTarget.length) {
            $movedBox.insertBefore($addDriversTarget);
          } else {
            $targetCell.append($movedBox);
          }
        
          resetBoxStyle($movedBox);
          return;
        }

        $movedBox.detach();
        if ($addDriversTarget.length) {
          $movedBox.insertBefore($addDriversTarget);
        } else {
          $targetCell.append($movedBox);
        }

        // If target cell was empty (not-assigned), remove placeholder and class
        if ($targetCell.hasClass("not-assigned")) {
          $targetCell.removeClass("not-assigned");
          $targetCell.find(".not-assigned-outer").hide();
        }

        const sourceEmpty =
          $sourceCell.find(".routes-box").length === 0 &&
          $sourceCell.find(".add-drivers").length === 0;


        if (sourceEmpty) {
          $sourceCell.addClass("not-assigned");

          if ($sourceCell.find(".not-assigned-outer").length === 0) {
            const placeholder = $(`
            <div class="not-assigned-outer newclone">
              <div class="not-assigned-content">
                <div class="assigned-title">
                  <span class="assigned-alert-icon"><i class="fa-solid fa-triangle-exclamation"></i></span>
                  <h6>Unassigned</h6>
                </div>
                <a href="#" class="assign-btn"><span class="assing-text">Click to assign</span>
                  <span><i class="fas fa-chevron-down"></i></span>
                </a>
                
              </div>
              <ul class="assign-option option-box" >
                  <li class="add-employee-option">
                    <a href="#" class="btn-add-employe">
                      <span class="employee-icons">
                        <img src="${process.env.PUBLIC_URL}/images/profile-add.svg" alt="">
                      </span>
                      Add Employee
                    </a>
                  </li>
                  <li class="post-option">
                    <a href="#" class="post-form-btn">
                      <span class="post-icons">
                        <img src="${process.env.PUBLIC_URL}/images/Icon@megaphone-01.svg" alt="">
                      </span>
                      Post Now
                    </a>
                  </li>
                </ul>
               </div>
           
          `);

            $sourceCell.append(placeholder);
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

            // Attach click handler to assign button inside new placeholder
            $sourceCell.find(".newclone .assign-btn").on("click", function (e) {
              e.preventDefault();
              e.stopPropagation();

              const $btn = $(this);

              // Find the closest .newclone container (to scope properly)
              const $newclone = $btn.closest(".newclone");
              const $optionsBox = $newclone.find(".assign-option");

              // Hide all other open dropdowns
              $(".newclone .assign-option").not($optionsBox).removeClass("assign-active").hide();

              if (!$optionsBox.is(":visible")) {
                $optionsBox.addClass("assign-active").show(); // Add class and show

                // Also add a class to parent if needed
                $newclone.addClass("assign-col-active");

                // One-time outside click to close
                $(document).one("click.assignDropdown", function () {
                  $optionsBox.removeClass("assign-active").hide();
                  $newclone.removeClass("assign-col-active");
                });
              }
            });
          }

          $sourceCell.find(".not-assigned-outer").show();
        } else {
          $sourceCell.removeClass("not-assigned");
     
        }

        $targetCell.css("background-color", "#4253F0");
        setTimeout(() => {
          $targetCell.css("background-color", "");
        }, 300);
      
    // day-col-jquery above 2 or more col
        if ($sourceCell.hasClass('table-day-col')) {
          if ($sourceCell.find(".routes-box").length >= 2) {
            $sourceCell.addClass('day-col-row');
          } else {
            $sourceCell.removeClass('day-col-row');
          }
        }

        if ($targetCell.hasClass('table-day-col')) {
          if ($targetCell.find(".routes-box").length >= 2) {
            $targetCell.addClass('day-col-row');
          } else {
            $targetCell.removeClass('day-col-row');
          }
        }

        resetBoxStyle($movedBox);
      }
    });
  });

  function resetBoxStyle($el) {
    $el[0].style.setProperty("top", "0", "important");
    $el[0].style.setProperty("left", "0", "important");
    $el[0].style.setProperty("position", "relative", "important");
    $el[0].style.setProperty("z-index", "1", "important");
  }


  // Optional: destroy draggable on mouseup
  $(document).off('mouseup.dragEnd').on("mouseup.dragEnd", function () {
    if ($(".routes-box").data("ui-draggable")) {
      $(".routes-box").draggable("destroy");
    }
  });
}



