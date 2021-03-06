var print = require("../../../core/console/print.coffee"),
    color = require("./functions/color.js"),
    icons = require("./functions/icons.js"),
    mouseevents = require("./functions/mouseevents.js"),
    style = require("./functions/style.js")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates a Button
//------------------------------------------------------------------------------
module.exports = function( vars ) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Bind Data to Buttons
  //----------------------------------------------------------------------------
  var button = vars.container.ui.selectAll("div.d3plus_node")
    .data(vars.data.viz,function(d){
      return d[vars.id.value]
    })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Enter Buttons
  //----------------------------------------------------------------------------
  if ( vars.dev.value ) print.time("enter")

  button.enter().append("div")
    .attr("class","d3plus_node")
    .call( color , vars )
    .call( style , vars )
    .call( icons , vars )
    .call( mouseevents , vars , color )

  if ( vars.dev.value ) print.timeEnd("enter")

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Update Buttons
  //----------------------------------------------------------------------------
  if (vars.draw.update || vars.draw.timing) {

    if ( vars.dev.value ) print.time("ordering")
    button.order()
    if ( vars.dev.value ) print.timeEnd("ordering")

    var updatedButtons = button

  }
  else {

    var checks = [ vars.focus.previous
                 , vars.focus.value
                 , vars.hover.previous
                 , vars.hover.value ].filter(function(c){ return c })

    var updatedButtons = button.filter(function(b){
      return checks.indexOf(b[vars.id.value]) >= 0
    })

  }

  if ( vars.dev.value ) print.time("update")
  if (vars.draw.timing) {
    updatedButtons
      .transition().duration(vars.draw.timing)
      .call( color , vars )
      .call( style , vars )
  }
  else {
    updatedButtons
      .call( color , vars )
      .call( style , vars )
  }

  updatedButtons
    .call( icons , vars )
    .call( mouseevents , vars , color )
  if ( vars.dev.value ) print.timeEnd("update")

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Exit Buttons
  //----------------------------------------------------------------------------
  button.exit().remove()

}
