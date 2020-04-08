# PRACTICE 3
## Layouts

Layout is a type of data representation. `D3` has a set of layouts which can be used to transform information in data to a form
in which it can be straightly mapped to the `svg` elements and attributes to form one of the most common visualisation types.

### Hierarchy

A [`d3.hierarchy`](https://observablehq.com/@d3/d3-hierarchy) is a nested data structure representing a tree: each node has one parent node (node.parent),
except for the root; likewise, each node has one or more child nodes (node.children),
except for the leaves. In addition, each node can have associated data (node.data) to store whatever additional fields you like.

This layout not calculates any positions. It can be used to work with hierarchical data which can then be than be used in other layout
such as [`tidy tree`](https://observablehq.com/@d3/tidy-tree), [`treemap`](https://observablehq.com/@d3/treemap) or [`sunburst`](https://observablehq.com/@d3/sunburst).

You can make a `hierarchy` layout like this:
```JavaScript
const data = {
  "name": "Eve",
  "children": [
    {
      "name": "Cain"
    },
    {
      "name": "Abel"
    },
    {
      "name": "Awan",
      "children": [
        {
          "name": "Enoch"
        }
      ]
    },
    {
      "name": "Azura"
    }
  ]
}
d3.hierarchy(data);
```
You can also specify a `children` accessor function as a second argument to return property other than `d.children`. 

If you have data in row format such as `csv` you can use [`d3.stratify()`](https://observablehq.com/@d3/d3-stratify) to make a `hierarchy` object.
```JavaScript
var data = [
  {"name": "Eve",   "parent": ""},
  {"name": "Cain",  "parent": "Eve"},
  {"name": "Seth",  "parent": "Eve"},
  {"name": "Enos",  "parent": "Seth"},
  {"name": "Noam",  "parent": "Seth"},
  {"name": "Abel",  "parent": "Eve"},
  {"name": "Awan",  "parent": "Eve"},
  {"name": "Enoch", "parent": "Awan"},
  {"name": "Azura", "parent": "Eve"}
]
var root = d3.stratify()
    .id(function(d) { return d.name; })
    .parentId(function(d) { return d.parent; })
    (data);
console.log(root instanceof d3.hierarchy) // true
```

### Pie

[`d3.pie`](https://github.com/d3/d3-shape/blob/v1.3.5/README.md#pie) calculates the `startAngle` and `endAngel` for each element in dataset
to for the pie chart.
```JavaScript
var data = [
  {"number":  4, "name": "Locke"},
  {"number":  8, "name": "Reyes"},
  {"number": 15, "name": "Ford"},
  {"number": 16, "name": "Jarrah"},
  {"number": 23, "name": "Shephard"},
  {"number": 42, "name": "Kwon"}
];

var arcs = d3.pie()
    .value(function(d) { return d.number; })
    (data);
// -> [{
  data:{
    name: "Locke",
    number: 4
  },
  endAngle: 6.283185307179586,
  index: 5,
  padAngle: 0,
  startAngle: 6.050474740247009,
  value: 4
}, ...
]
```
You can also configure `startAngle` and `endAngel` for this layout to make in uncomplete circle.

### Pack

[`d3.pack`](https://github.com/d3/d3-hierarchy/blob/v1.1.8/README.md#pack) computes the `x`, `y` and `r` for each element in dataset
to make it fill the defined space.
```JavaScript
d3.pack()
    .size([width - 2, height - 2])
    .padding(3)
    .radius(d=>d.age)
    (employers)
```

### Force directed layout

`Force directed layout` is a dynamic layout it updates data properties every `tick` while `simulation` is active.
Here is an [example](http://bl.ocks.org/mbostock/31ce330646fa8bcb7289ff3b97aab3f5).

In `d3` `Force directed layout` represented as `d3.forceSimulation`. 
The `simulation` is controled by `alpha` variable and getting to `alphaMin` with a speed of `alphaDecay` during a course of simulation.
All those parameters can be configured(all in range `[0,1]`).

There are number of forces that can be added to `simulation`
and affect the behavior of objects in it:

- forceCenter - force to specefied point
- forceCollide - is a collision force with specified radius
- forceManyBody - applies a force to each node 
- forceLink - The link force pushes linked nodes together or apart according to the desired distance
- forceX - Creates a new positioning force along the x-axis towards the given position x
- forceY - Creates a new positioning force along the x-axis towards the given position y
- Radial - Creates a new positioning force towards a circle of the specified radius centered at specified position.

You can update element's positions on `simulation`'s `tick` event.
```JavaScript
const simulation = d3.forceSimulation()
        .nodes(nodes)
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));
        .on("tick", ticked);
        
 node = svg.append("g")
        .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle");
    
 function ticked() {
    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}
```
## Generators 

### Arc 

[`d3.arc`](https://github.com/d3/d3-shape/blob/v1.3.5/README.md#arcs) generator computes `svg path` using `startAngle` and `endAngle`.
```JavaScript
var data = [
  {"number":  4, "name": "Locke"},
  {"number":  8, "name": "Reyes"},
  {"number": 15, "name": "Ford"},
  {"number": 16, "name": "Jarrah"},
  {"number": 23, "name": "Shephard"},
  {"number": 42, "name": "Kwon"}
];

var pie = d3.pie().value(function(d){return d.number;});

var arc = d3.arc()
       .innerRadius(30) // it'll be donut chart
        .outerRadius(50)
        .padAngle(0.02)
        .cornerRadius(5);

svg.selectAll('path')
  .data(pie(data))
  .enter().append('path')
  .attr('d', arc) // each element'll be passed to generator
  .attr('fill', 'red')
  .style("opacity", 0.7);
```

### Line 
[`d3.line`](https://github.com/d3/d3-shape/blob/v1.3.5/README.md#lines) calculates a line from given array of values.

```JavaScript
const line = d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        (data);
svg.append("path")
      .attr("fill", "none") // not to fill the area
      .attr("stroke", "steelblue") 
      .attr("stroke-width", 1.5)
      .attr("d", line)
```
### Area

[`d3.area`](https://github.com/d3/d3-shape/blob/v1.3.5/README.md#areas) calculates a `path` on four parameters.
```JavaScript
const area = d3.area()
        .x((d) => { return x(d.date) })
        .y0((d) => { return y(d.value1) })                        
        .y1((d) => { return y(d.value2) })
        (data)
svg.append("path")
      .attr("fill", "#cce5df")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", area)
```


