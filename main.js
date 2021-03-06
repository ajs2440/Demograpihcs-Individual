const dataPromise = d3.csv('data/simple_2007_2019.csv')
.then(function(d) {
    cleanUpData(d);
    
    setup(d);
    return d;
})
.catch(function(error){
    console.log(error);
});

// cleans up data by simply converting string numbers into number format, 
// todo: make a general cleanup function that cleans up any dataset given
function cleanUpData(d) {
    d.forEach(function(d) {
        d["Academic Year"] = +d["Academic Year"];
        d.StudentCount = +d.StudentCount;
    })
    return d;
}

function setup(d) {
    setupSelector(d);
}

function getYMax(d) {
    return d3.max(d.StudentCount);
}

//global variables for each person's svg
let xvar, year;

function update() {
    xvar = d3.select('select#x-selector').property('value');
    year = +d3.select('input#slider').property('value');
}

function setupSelector(da) {
    
    let options = [];
    console.log(da);

    Object.keys(da[0]).forEach((key, value) => {
        options.push(key);
    });
    
    d3.select('select#x-selector')
        .on('change', () => update())
        .selectAll('option')
        .data(options)
        .enter()
        .append('option')
        .attr('value', d => d)
        .text(d => d);

}    

/*var slider = d3
.min(2007)
.max(2019)
.step(1)
.width(300)
.ticks(5)
.displayValue(false)
*/

d3.select('#slider')
  .on('change', () => update())
  .append('svg')
  .attr('width', 500)
  .attr('height', 300)
  .append('g')
  .attr('transform', 'translate(30,30)')
  //.call(slider)
