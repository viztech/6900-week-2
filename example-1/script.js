var m = {t:50,r:100,b:50,l:100},
    w = d3.select('.plot').node().clientWidth- m.l- m.r,
    h = d3.select('.plot').node().clientHeight - m.t - m.b;

var plot = d3.select('.plot').append('svg')
    .attr('width',w+ m.l+ m.r)
    .attr('height',h+ m.t+ m.b)
    .append('g').attr('class','histogram')
    .attr('transform','translate('+ m.l+','+ m.t+')');

var scaleX = d3.scale.linear().domain([0,100]).range([0,w]),
    scaleY = d3.scale.linear(),
    scaleC = d3.scale.linear().domain([0,50,100]).range(['blue','purple','red']);

var values = [];

//Generate 300 random numbers between 0 and 100
//Imagine this were the score distribution for 300 students in a final exam
/*for(var i=0; i<300; i++){
    values.push({
        id:i,
        v:Math.random()*100
    });
}*/

//Generate 300 random numbers based on a normal distribution, with a mean of 50
var normal = d3.random.normal(50,15);
for(var i=0; i<300; i++){
    values.push({
        id:i,
        v:normal()});
}
values[299].v+=7000;

//Visualize the distribution of these 300 random numbers, but how?
//We can visualize by position, and/or color
var points = plot.selectAll('.point')
    .data(values)
    .enter()
    .append('circle').attr('class','point')
    .attr('cx',function(d){ return scaleX(d.v)})
    .attr('cy',function(d){ return h})
    .attr('r',3)
    .style('fill',function(d){return scaleC(d.v)})
    .style('fill-opacity',.7)
    .on('click',function(d){console.log(d)});


//How do we show this distribution as a histogram?
//https://github.com/mbostock/d3/wiki/Histogram-Layout#histogram

var bins = d3.range(0,101,3),
    histogramValues = d3.layout.histogram()
    .value(function(d){return d.v;})
    .bins(bins)(values);

histogramValues.forEach(function(bin){
    bin.forEach(function(p,i){
        p.x = bin.x + bin.dx/2;
        p.y = i*8;
    });
});

//Show an axis
plot.append('line').attr({
    x1:0,
    x2:w,
    y1:h,
    y2:h
}).attr('class','guide');
var ticks = plot.selectAll('.tick')
    .data(bins)
    .enter()
    .append('g').attr('class','tick')
    .attr('transform',function(d){return 'translate('+scaleX(d)+','+h+')'});
ticks.append('line').attr({
    y1:-4,
    y2:4
}).attr('class','guide')
ticks.append('text').attr('dy',20).text(function(d){return d;}).attr('text-anchor','middle');


d3.select('#hist').on('click',function(){
    points.transition().duration(2000)
        .attr('cx',function(d){return scaleX(d.x)})
        .attr('cy',function(d){return h- d.y});
});

d3.select('#mean').on('click',function(){
    var mean = d3.mean(values,function(d){return d.v});

    plot.append('line')
        .attr({
            x1:0,
            x2:0,
            y1:0,
            y2:h+50
        }).style('stroke','rgb(200,200,200)').style('stroke-width','2px')
        .transition().duration(1000).attr({
        x1:scaleX(mean),
        x2:scaleX(mean),
        y1:0,
        y2:h+50
    })
        .style('stroke',scaleC(mean))
})

d3.select('#median').on('click',function(){
    var median = d3.median(values,function(d){return d.v});

    plot.append('line')
        .attr({
            x1:0,
            x2:0,
            y1:0,
            y2:h+50
        }).style('stroke','rgb(200,200,200)').style('stroke-width','2px')
        .transition().duration(1000).attr({
            x1:scaleX(median),
            x2:scaleX(median),
            y1:0,
            y2:h+50
        })
        .style('stroke',scaleC(median))
        .style('stroke-dasharray','3,2')

})









