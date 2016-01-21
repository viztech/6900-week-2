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
for(var i=0; i<300; i++){
    values.push({
        id:i,
        v:Math.random()*100
    });
}

//Generate 300 random numbers based on a normal distribution, with a mean of 50
/*var normal = d3.random.normal(50,10);
for(var i=0; i<300; i++){
    values.push({
        id:i,
        v:normal()
    });
}*/

//Visualize the distribution of these 300 random numbers, but how?
//We can visualize by position, and/or color


