// jQuery

// menu

$('.menu-bar').on('click', function () {
    if ($(window).width() <= 1199) {
        $('.menu').slideToggle();
        $(this).toggleClass('active-menu');
    }
});
// export-btn jQuery start
$(document).ready(function () {
    $('.export-col>.btn').on('click', function (e) {
        e.stopPropagation();
        $(".export-option").addClass('active-option');
    });

    $(document).on('click', function () {
        $('.export-option').removeClass('active-option');
    });

    $('.smart-col>.btn').on('click', function (e) {
        e.stopPropagation();
        $(".smart-option").addClass('active-smart-option');
    });

    $(document).on('click', function () {
        $('.smart-option').removeClass('active-smart-option');
    });


    // edit-option
    $('.trigger-option').on('click', function (e) {
        e.stopPropagation();
        $(this).next().addClass('edit-active');
        $(this).parent().parent().addClass('routes-col-active');
    });

    $(document).on('click', function () {
        $(".routes-option").removeClass('edit-active');
        $(".routes-col").removeClass('routes-col-active');
    });


    // publish-form

    $('.publish').click(function () {
        $('.publish-shift-form').addClass('show-form');
    });

    $('.close-btn, .cancel-btn').click(function () {
        $('.form-outer').removeClass('show-form');
    });

    // Filter-form

    $('.filter-col>.btn').click(function () {
        $('.filter-form').addClass('show-form');
        $(this).addClass('filter-active-btn');
    });

    $('.close-btn').click(function () {
        $('.filter-form').removeClass('show-form');
        $(".filter-col>.btn").removeClass('filter-active-btn');
    });

    // routes-form

    $('.add-routes').click(function () {
        $('.add-route-form').addClass('show-form');
    });

    $('.close-btn').click(function () {
        $('.add-route-form').removeClass('show-form');
    });
    // manager-form

    $('.manager').click(function () {
        $('.route-manager').addClass('show-form');
    });

    $('.close-btn').click(function () {
        $('.route-manager').removeClass('show-form');
    });

    // add-employe-form

    $('.btn-add-employe').click(function () {
        $('.add-employee-form').addClass('show-form');
    });

    $('.close-btn').click(function () {
        $('.add-employee-form').removeClass('show-form');
    });

    // edit-shift-form

    $('.edit-shift-form-btn').click(function () {
        $('.edit-shift-form').addClass('show-form');
    });

    $('.close-btn').click(function () {
        $('.edit-shift-form').removeClass('show-form');
    });

    // open-shift-form

    $('.post-form-btn').click(function () {
        $('.open-shift-form').addClass('show-form');
    });

    $('.close-btn').click(function () {
        $('.open-shift-form').removeClass('show-form');
    });

    // create-employee-form

    $('.create-employee-btn, .edit-driver-form-btn').click(function () {
        $('.create-employee-form').addClass('show-form');
        $(this).parents(".routes-option").addClass('show-routes-option');
        $(this).addClass('active-option');
    });

    $('.close-btn, .cancel-btn').click(function () {
        $('.create-employee-form').removeClass('show-form');
        $('.routes-option').removeClass('show-routes-option');
        $(this).removeClass('active-option');
    });

    // add-new-rmployee-form

    $('.add-drivers-btn').click(function () {
        $('.add-new-drivers-form').addClass('show-form');
        $('.create-employee-form').removeClass('show-form');
    });

    $('.close-btn').click(function () {
        $('.add-new-drivers-form').removeClass('show-form');
    });


    // collaspm sidebar
    $('.sidebar-collaps-btn').click(function () {
        $('.sidebar').toggleClass('short-sidebar');
        $('.dashboard-main').toggleClass('collapse-main');
        $(this).toggleClass('collapse-btn');
    });

});



$('.all').on('change', function () {
    $('.day-checkbox').prop('checked', this.checked);
});

// Update "All" checkbox state based on individual checkboxes
$('.day-checkbox').on('change', function () {
    const total = $('.day-checkbox').length;
    const checked = $('.day-checkbox:checked').length;
    $('.all').prop('checked', total === checked);
});

// export-btn jQuery end


// assign-option
/* $('.assign-btn').on('click', function (e) {
    e.stopPropagation();
    $(this).next().addClass('assign-active');
    $(this).parent().parent().addClass('assign-col-active');
});

$(document).on('click', function () {
    $(".assign-option").removeClass('assign-active');
    $(".not-assigned ").removeClass('assign-col-active');
}); */

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


$(document).ready(function () {
    const $areas = $(".droppable-area1, .droppable-area2, .droppable-area3, .droppable-area4");

    // Make routes-box draggable
/*     $(".routes-move a").on("mousedown", function () {
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
            const $draggedBox = ui.draggable;
            const $sourceCell = $draggedBox.closest("td");
            const $targetCell = $(this);

            // If target is "not-assigned", swap the cells
            if ($targetCell.hasClass("not-assigned")) {
                const sourceTd = $sourceCell.get(0);
                const targetTd = $targetCell.get(0);

                // Create temporary markers
                const sourceMarker = $("<span>").insertBefore($sourceCell);
                const targetMarker = $("<span>").insertBefore($targetCell);

                // Swap the actual td elements
                $(targetTd).insertAfter(sourceMarker);
                $(sourceTd).insertAfter(targetMarker);

                // Remove markers
                sourceMarker.remove();
                targetMarker.remove();
            } else {
                // Regular drop: move box into target
                $draggedBox.detach().appendTo($targetCell).css({
                    top: 0,
                    left: 0,
                    position: 'relative'
                });

                $targetCell.removeClass("not-assigned");
                $targetCell.find(".not-assigned-content").hide();
            }
        }
    });
}); */

/*     $(".routes-move a").on("mousedown", function () {
        $(".routes-box").draggable({
            //helper: "clone",
            revert: "invalid",
            start: function (event, ui) {
                ui.helper.css("z-index", 10);
            }
        });

        // Make all draggable-item TDs droppable
        $(".draggable-item").droppable({
            accept: ".routes-box",
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {
                const $targetCell = $(this);
                const $movedBox = ui.draggable;

                // Move the box into this td
                $movedBox.detach().appendTo($targetCell).css({ top: 0, left: 0, position: 'relative' });

                // Clean up if it was a not-assigned cell
                $targetCell.removeClass("not-assigned");
                $targetCell.find(".not-assigned-content").hide();
            }
        });
    }); */

    // Optional: Destroy draggable after mouse up
 /*    $(document).on("mouseup", function () {
        if ($(this).data("ui-draggable")) {
            $(this).draggable("destroy");
        }
    }); */
});


    // publish-form

