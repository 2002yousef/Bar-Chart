const width = 800;
const height = 400;

var data = [10, 15, 20, 25, 30];

/*var x = '';

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(response => response.json())
.then(data => {x = data.id; console.log(x)});

console.log(lol)
*/

let y = '';

async function fetchData() {
    const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json');
    const data = await response.json();
    const x = data.id;
    y = x;
    console.log(x);
}

fetchData()

console.log(y)



var svg = d3.select('.container')
            .append('svg')
            .attr('width', width)
            .attr('height', height)

var scale = d3.scaleLinear()
                .domain([d3.min(data), d3.max(data)])
                .range([0, width - 100])

var x_axis = d3.axisBottom()
                .scale(scale)

svg.append('g')
    .call(x_axis)
    