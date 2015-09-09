$(document).ready(function() {
    var colorsHidden = true;
    var redWords = 9;
    var blueWords = 8;
    var redRevealed;
    var blueRevealed;

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
            words.pop(); // Remove final blank word
            colors = [
                'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red',
                'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
                'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral',
                'neutral', 'assassin'
            ];
            redRevealed = 0;
            blueRevealed = 0;

            // Iterate over and populate table cells
            $('#grid .word').each(function(i, a) {
                $(a).removeClass('active');
                $(a).html(randomPop(words));
                $(a).data('color', randomPop(colors));
            });

            clearColors();
            if (!colorsHidden) showColors();
            updateScore();
        });
    }

    function clearColors() {
        $('#grid .word').each(function(i, a) {
            clearColor(a);
        });
    }

    function clearColor(word) {
        if (! $(word).hasClass('active')) {
            $(word).removeClass('btn-danger btn-primary btn-warning');
        }
    }

    function showColors() {
        $('#grid .word').each(function(i, a) {
            showColor(a);
        });
    }

    function showColor(word) {
        $(word).addClass(colorClasses[$(word).data('color')]);
    }

    function updateScore() {
        updateScoreText(
            '' + redRevealed + '/' + redWords,
            '' + blueRevealed + '/' + blueWords);
    }

    function updateScoreText(red, blue) {
        $('#red-text').html(red);
        $('#blue-text').html(blue);
    }

    $('#board-id-form').submit(function() {
        setSeed($('#seed').val());
        populateGrid();
        return false;
    });

    $('.word').click(function() {
        var assassin = false;

        if (! $(this).hasClass('active')) {
            $(this).addClass('active');
            showColor(this);
            if ($(this).data('color') === 'red') redRevealed++;
            if ($(this).data('color') === 'blue') blueRevealed++;
            if ($(this).data('color') === 'assassin') assassin = true;
        } else {
            $(this).removeClass('active');
            if (colorsHidden) clearColor(this);
            if ($(this).data('color') === 'red') redRevealed--;
            if ($(this).data('color') === 'blue') blueRevealed--;
        }

        // Check win condition
        if (assassin) {
            updateScoreText('Game Over!', 'Game Over!');
        } else if (redRevealed === redWords) {
            updateScoreText('Red Wins!', 'Blue Loses!');
        } else if (blueRevealed === blueWords) {
            updateScoreText('Red Loses!', 'Blue Wins!');
        } else {
            updateScore();
        }
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
