var handleBoardID;

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
                $(a).html(randomPop(words));
                $(a).data('color', randomPop(colors));
            });
        });
    }

    function clearColors() {
        $('#grid .word').each(function(i, a) {
            $(a).removeClass('btn-danger btn-primary btn-warning');
        });
    }

    function showColors() {
        $('#grid .word').each(function(i, a) {
            $(a).addClass(colorClasses[$(a).data('color')]);
        });
    }

    handleBoardID = function(e) {
        setSeed($('#seed').val());
        populateGrid();
    }

    $('#toggle').click(function() {
        if (colorsHidden) {
            showColors();
        } else {
            clearColors();
        }
        colorsHidden = !colorsHidden;
    });

    setSeed(Math.round(1 + maxSeed * Math.random()));
    populateGrid();
})
