const b_width = 1000;
const d_width = 500;
const b_height = 1000;
const d_height = 1000;
const colors = [
    '#DB202C','#a6cee3','#1f78b4',
    '#33a02c','#fb9a99','#b2df8a',
    '#fdbf6f','#ff7f00','#cab2d6',
    '#6a3d9a','#ffff99','#b15928']

const radius = d3.scaleLinear().range([.5, 20]);
const color = d3.scaleOrdinal().range(colors);
const x = d3.scaleLinear().range([0, b_width]);

const bubble = d3.select('.bubble-chart')
    .attr('width', b_width).attr('height', b_height);
const donut = d3.select('.donut-chart')
    .attr('width', d_width).attr('height', d_height)
    .append("g")
        .attr("transform", "translate(" + d_width / 2 + "," + d_height / 2 + ")");

const donut_lable = d3.select('.donut-chart').append('text')
        .attr('class', 'donut-lable')
        .attr("text-anchor", "middle")
        .attr('transform', `translate(${(d_width/2)} ${d_height/2})`);
const tooltip = d3.select('.tooltip');
//  Part 1 - Create simulation with forceCenter(), forceX() and forceCollide()
const simulation = d3.forceSimulation()
    // ..


d3.csv('data/netflix.csv').then(data=>{
    data = d3.nest().key(d=>d.title).rollup(d=>d[0]).entries(data).map(d=>d.value).filter(d=>d['user rating score']!=='NA');
    console.log(data)
    
    const rating = data.map(d=>+d['user rating score']);
    const years = data.map(d=>+d['release year']);
    let ratings = d3.nest().key(d=>d.rating).rollup(d=>d.length).entries(data);
    
    
    // Part 1 - add domain to color, radius and x scales 
    // ..
    
    // Part 1 - create circles
    var nodes = bubble
        .selectAll("circle")
        // ..
    // mouseover and mouseout event listeners
            // .on('mouseover', overBubble)
            // .on('mouseout', outOfBubble);

    
    // Part 1 - add data to simulation and add tick event listener 
    // ..

    // Part 1 - create layout with d3.pie() based on rating
    // ..
    
    // Part 1 - create an d3.arc() generator
    // ..
    
    // Part 1 - draw a donut chart inside donut
    // ..

    // mouseover and mouseout event listeners
        //.on('mouseover', overArc)
        //.on('mouseout', outOfArc);

    function overBubble(d){
        console.log(d)
        // Part 2 - add stroke and stroke-width   
        // ..
        
        // Part 3 - updata tooltip content with title and year
        // ..

        // Part 3 - change visibility and position of tooltip
        // ..
    }
    function outOfBubble(){
        // Part 2 - remove stroke and stroke-width
        // ..
            
        // Part 3 - change visibility of tooltip
        // ..
    }

    function overArc(d){
        console.log(d)
        // Part 2 - change donut_lable content
        // ..
        // Part 2 - change opacity of an arc
        // ..

        // Part 3 - change opacity, stroke и stroke-width of circles based on rating
        // ..
    }
    function outOfArc(){
        // Part 2 - change content of donut_lable
        // ..
        // Part 2 - change opacity of an arc
        // ..

        // Part 3 - revert opacity, stroke and stroke-width of circles
        // ..
    }
});
