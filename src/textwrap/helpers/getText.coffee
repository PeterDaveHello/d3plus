# Fetches text if not specified, and formats text to array.
module.exports = (vars) ->

  unless vars.text.value
    text = vars.container.value.text()
    if text
      if text.indexOf("tspan") >= 0
        text.replace /\<\/tspan\>\<tspan\>/g, " "
        text.replace /\<\/tspan\>/g, ""
        text.replace /\<tspan\>/g, ""
      text = text.replace /(\r\n|\n|\r)/gm, ""
      text = text.replace /^\s+|\s+$/g, ""
      vars.self.text text

  if vars.text.value instanceof Array
    vars.text.phrases = vars.text.value.filter (t) -> ["string", "number"].indexOf(typeof t) >= 0
  else
    vars.text.phrases = [vars.text.value + ""]

  vars.container.value.text ""

  return
