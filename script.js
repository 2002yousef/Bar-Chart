const width = 800;
const height = 400;
const barWidth = width / 275

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
.then(response => response.json())
.then(data => {
    const arr = data.data

    const GDP = arr.map((item) => {
        return item[1];
    })
    
    var yearsDate = arr.map((item) => {
        return new Date(item[0])
    })

    var tooltip = d3.select('.container')
                    .append('div')
                    .attr('id', 'tooltip')
                    .style('opacity', 0)
                

    var xMax = new Date(d3.max(yearsDate))
    xMax.setMonth(xMax.getMonth() + 3)

    var years = data.data.map(function (item) {
        var quarter;
        var temp = item[0].substring(5, 7);
  
        if (temp === '01') {
          quarter = 'Q1';
        } else if (temp === '04') {
          quarter = 'Q2';
        } else if (temp === '07') {
          quarter = 'Q3';
        } else if (temp === '10') {
          quarter = 'Q4';
        }
  
        return item[0].substring(0, 4) + ' ' + quarter;
    });

    var svg = d3.select('.container')
            .append('svg')
            .attr('width', width + 100)
            .attr('height', height + 60)

    var scaleX = d3.scaleTime()
                    .domain([d3.min(yearsDate), xMax])
                    .range([0, width])

    var x_axis = d3.axisBottom()
                    .scale(scaleX)

    svg.append('g')
        .call(x_axis)
        .attr('transform', 'translate(60, 400)')
        .attr('id', 'x-axis')
        

    var scaleY = d3.scaleLinear()
                    .domain([0, d3.max(GDP)])
                    .range([height, 0])

    var y_axis = d3.axisLeft()
                    .scale(scaleY)

    var scaledGDP = []
    var linearScale = d3.scaleLinear()
                        .domain([0, d3.max(GDP)])
                        .range([0, height])

    scaledGDP = GDP.map((item) => {
        return(linearScale(item))
    })
    
    svg.append('g')
        .call(y_axis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(60, 0)')

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -200)
        .attr('y', 80)
        .text('Gross Domestic Product');
    
    d3.select('svg')
        .selectAll('rect')
        .data(scaledGDP)
        .enter()
        .append("rect")
        .style("fill", "steelblue")
        .attr("class","bar")
        .attr('x', (d,i) => {
            return scaleX(yearsDate[i])
        })
        .attr('y', (d) => {
            return height - d
        })
        .attr('width' , barWidth)
        .attr('height', (d) => {
            return d
        })
        .attr('transform', 'translate(60, 0)')
        .attr('data-date', (d,i) => {
            return arr[i][0]
        })
        .attr('data-gdp', (d,i) => {
            return GDP[i];
        })
        .attr('index', (d,i) => i)
        .on('mouseover' , (event ,d) => {
            var i = d3.select(event.currentTarget).attr('index')
            d3.select(event.currentTarget)
            .style("fill", "white");
            tooltip.style('opacity' , 0.9)
                    .style('left', i * barWidth + 50 + 'px')
                    .style('top', height + 'px')
                    .style('transform', 'translateX(60px)')
                    .html(
                        years[i] +
                        '<br>' +
                        '$' +
                        GDP[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
                        ' Billion'
                    )
                    .attr('data-date', arr[i][0])
        })
        .on('mouseout', (event, d) => {
            d3.select(event.currentTarget)
            .style("fill",'steelblue');
            tooltip.style('opacity', '0')
        })
        
});



    