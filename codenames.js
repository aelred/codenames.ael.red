var handleBoardID;

$(document).ready(function() {
    var colorsHidden = true;

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
            $("#grid tr").each(function() {
                $('td', this).each(function() {
                    $(this).removeClass('red blue neutral assassin');
                    $(this).addClass(randomPop(colors));
                    $(this).html(randomPop(words));
                });
            });
        });
    }

    handleBoardID = function(e) {
        setSeed($('#seed').val());
        populateGrid();
    }

    $('#toggle').click(function() {
        if (colorsHidden) {
            $('link[href="colors_hide.css"]').attr('href', 'colors_show.css');
        } else {
            $('link[href="colors_show.css"]').attr('href', 'colors_hide.css');
        }
        colorsHidden = !colorsHidden;
    });

    setSeed(Math.round(1 + maxSeed * Math.random()));
    populateGrid();
})
