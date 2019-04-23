var geoP=d3.json("data/us-states.json")
var stateP=d3.json("data/us-states.json")

// geoP.then(function(geoData)
// {
//   console.log(geoData);
//   drawMap(geoData)
// })

Promise.all([geoP,stateP])
       .then(function(values)
     {
       var geoData=values[0];
       var stateData=values[1];
       console.log(geoData,stateDate);
       var stateDict={}
       stateData.forEach(function(state)
       {
         stateDict[state.NAME.trim()]=state;
       })
       console.log(stateDict)
       //stateDict.Alabama
       //stateDict.["New York"] we can use branket to fixed the space problem
       geoData.features.forEach(function(state)
       {
         state
       })
       drawMap(geoData);
     })
var drawMap=function(geoData)
{
  var screen={width:700,height:600}

  var projection=d3.geoAlbersUsa()
                  .translate([screen.width/2,screen.height/2])
                  .scale([screen.width])//try look up for scale

  var stateGenerator=d3.geoPath().projection(projection);

  console.log(projection([-85,35]))

  var svg=d3.select("svg")
            .attr("width",screen.width)
            .attr("height",screen.height);

  var states=svg.append("g")
                .attr("id","states")
                .selectAll("g")
                .data(geoData.features)
                .enter()
                .append("g")
                .classed("state",true);

  states.append("path")
       .attr("d",stateGenerator)
       //.attr("d",function(d){return stateGenerator(d)});
       .attr("stroke","red")
       .attr("fill",none)
  states.append("text")
        .text(function(d){return d.properties.ABBR;})
        .attr("x",function(d){return stateGenerator.centroid(d)[0];})
        .attr("y",function(d){return stateGenerator.centroid(d)[1];})
}
