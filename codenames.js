$(document).ready(function() {
    var randomPop = function (array) {
        var index = Math.floor(Math.random() * array.length);
        return array.splice(index, 1)[0];
    }

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
                $(this).addClass(randomPop(colors));
                $(this).append(randomPop(words));
            });
        });
    });
})
