$(document).ready(function() {
    var colorsHidden = true;

    colorClasses = {
        'red': 'btn-danger',
        'blue': 'btn-primary',
        'neutral': 'btn-default',
        'assassin': 'btn-warning'
    }

    var maxSeed = 999999;
    var initialSeed;
    var seed;

    function setSeed(newSeed) {
        initialSeed = newSeed;
        seed = initialSeed;
        $('#seed').val(newSeed);
    }

    // Custom random function with seed
    function random() {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    var randomPop = function (array) {
        var index = Math.floor(random() * array.length);
        return array.splice(index, 1)[0];
    }

    function populateGrid() {
        $.get('words.txt', function(data) {
            words = data.split("\n");
            colors = [
                'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red',
                'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
                'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral',
                'neutral', 'assassin'
            ];

            // Iterate over and populate table cells
            $('#grid .word').each(function(i, a) {
                $(a).removeClass('active');
                $(a).html(randomPop(words));
                $(a).data('color', randomPop(colors));
            });

            clearColors();
            if (!colorsHidden) showColors();
        });
    }

    function clearColors() {
        $('#grid .word').each(function(i, a) {
            if (! $(a).hasClass('active')) {
                $(a).removeClass('btn-danger btn-primary btn-warning');
            }
            $(a).removeClass('disabled')
        });
    }

    function showColors() {
        $('#grid .word').each(function(i, a) {
            showColor(a);
            if ($(a).hasClass('active')) $(a).addClass('disabled');
        });
    }

    function showColor(word) {
        $(word).addClass(colorClasses[$(word).data('color')]);
    }

    $('#board-id-form').submit(function() {
        setSeed($('#seed').val());
        populateGrid();
        return false;
    });

    $('.word').click(function() {
        showColor(this);
        $(this).addClass('active');
    });

    $('#toggle').click(function() {
        colorsHidden = !colorsHidden;
        if (colorsHidden) {
            clearColors();
        } else {
            showColors();
        }
    });

    setSeed(Math.round(1 + maxSeed * Math.random()));
    populateGrid();
})
