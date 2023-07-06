Blockly.defineBlocksWithJsonArray([{
    "type": "draw_line",
    "message0": "Color: %1 Line # %2 %3",
    "args0": [
        {
            "type": "field_colour",
            "name": "Color",
            "colour": "#ff0000"
        },
        {
            "type": "field_input",
            "name": "NAME",
            "text": "0"
        },
        {
            "type": "input_value",
            "name": "line",
            "check": "Array"
        }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Draw",
    "helpUrl": ""
}]);

Blockly.JavaScript['draw_line'] = function(block) {
    
  
    var colour_color = block.getFieldValue('Color');
    var text_name = block.getFieldValue('NAME');
    var value_line = Blockly.JavaScript.valueToCode(block, 'line', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `
        lines.push(${value_line});
        keys.push("line${text_name}");
        colors.push("${colour_color}");
        var Graph = {};
        Graph.options_ = {
        curveType: 'function',
        width: 1400,
        height: 400,
        chartArea: {left: '10%', width: '85%', height: '85%'}
        };

        Graph.drawVisualization = function(lines) {
        var table = new google.visualization.DataTable();
        table.addColumn('number', 'x');
        for (var i = 0; i < keys.length; i += 1) {
            table.addColumn('number', keys[i]);
        }
        var tables = [];
        for (var x = 0; x < lines[0].length; x += 1) {
            var item = [x];
            for (var y = 0; y < lines.length; y += 1) {
            item.push(lines[y][x]);
            }
            tables.push(item);
        }
        table.addRows(tables);
        if (keys.length === 0) {
            var table1 = [];
            table1.unshift(['x', 'y'], [0, 0]);
            table = google.visualization.arrayToDataTable(table1);
        }
        console.log(table);
        new google.charts.Line(document.getElementById('visualization')).draw(table, Graph.options_);
    };
    Graph.options_['colors'] = colors;
    Graph.drawVisualization(lines); 
    `;

    return code;
};


Blockly.defineBlocksWithJsonArray([
    {
      "type": "draw_line_xy",
      "message0": "Color: %1 Line # %2 X: %3 Y: %4",
      "args0": [
        {
          "type": "field_colour",
          "name": "Color",
          "colour": "#ff0000"
        },
        {
          "type": "field_input",
          "name": "NAME",
          "text": "0"
        },
        {
          "type": "input_value",
          "name": "x",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "y",
          "check": "Number"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "Draw",
      "helpUrl": ""
    }
  ]);
  

  Blockly.JavaScript['draw_line_xy'] = function(block) {
    var colour_color = block.getFieldValue('Color');
    var text_name = block.getFieldValue('NAME');
    var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  
    // TODO: Assemble JavaScript into code variable.
    var code = `
   
    var keys=[];
    var colors=[];
    keys.push("line${text_name}");
    colors.push("${colour_color}");
    var table1 = [];
    table1.push(['x', 'y']);

    // table1.push([${value_x}.concat(${value_y})]);

    for (var i = 0; i < xlist1.length; i++) {
        table1.push([${value_x}[i], ${value_y}[i]]);
      }

    var data = google.visualization.arrayToDataTable(table1);
    var options = {
        curveType: 'function',
        width: 1400,
        height: 400,
        chartArea: {left: '10%', width: '85%', height: '85%'},
        colors:colors
      };
  
      var chart = new google.charts.Line(document.getElementById('visualization'));

      chart.draw(data, options);

    `;
  
    return code;
  };
  