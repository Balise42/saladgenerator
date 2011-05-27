var current = 0;
var type;
var categories;
var catnames;
var lang;

function choose_element(i){
  var elems = eval(type + "_" + lang + "_" + $("#selector"+i).val());
  var index=Math.floor(Math.random()*elems.length);
  $("#result"+i).empty();
  $("#result"+i).append(elems[index]);
}
			
function create_selector(){
  $("body").append("<p>");
  $("body").append("<select name='selector" + current + "' id='selector" + current +"'></select>");
  $("body").append("<span id='result" + current + "'></span>");
  $("body").append("<button name='change" + current + "' id='change"+current + "'>Aut'chose!</button>");
  $("body").append("</p>");
  $("#selector"+current).append("<option></option>");		
  for (key in catnames){
    $("#selector"+current).append("<option value='"+key+"'>" + catnames[key] +"</option>");
  }
				$("#selector"+current).change(function(event){
					choose_element(event.target.id.replace("selector", ""));
				});
				$("#change"+current).click(function(event){
					choose_element(event.target.id.replace("change", ""));
				});
				current++;
			}
			
      $(document).ready(function(){
				$("#moar").click(create_selector);
				$("#premix").click(premix);
				$("#lucky").click(lucky);
				$("input[type=radio]").click(redraw);
        redraw();
      }); 
      
      function redraw(){
				for (var i = 0; i<current; i++){
					$("#selector"+i).remove();
					$("#change"+i).remove();
					$("#result"+i).remove();
					$("p").remove();
				}
				type = $("input[name=type-o-dish]:checked").val();
				lang = $("input[name=lang]:checked").val();
				categories = eval("cat_"+ type);
				catnames = eval("cat_" + type + "_" + lang);
				current = 0;
				for (var i = 0; i< 5; i++) {
					create_selector();
				}
			}
      
      function premix(){
				switch(type){
					case("salad"):
						$("#selector0").val("veggies");
						$("#selector1").val("veggies");
						$("#selector2").val("proteins");
						$("#selector3").val("cheese");
						$("#selector4").val("extra");
						if($("#needbase").attr('checked')){
							if(current <= 5){
								create_selector();
							}
							$("#selector5").val("base");
						}
						break;
					case("pizza"):
					case("risotto"):
						$("#selector0").val("veggies");
						$("#selector1").val("veggies");
						$("#selector2").val("veggies");
						$("#selector3").val("cheese");
						$("#selector4").val("proteins");
						break;
					case("pasta"):
						$("#selector0").val("veggies");
						$("#selector1").val("veggies");
						$("#selector2").val("proteins");
						$("#selector3").val("sauce");
						$("#selector4").val("extra");
						break;
				}
				fill_all();
			}
			function fill_all(){
				for (var i = 0; i<current; i++){
					choose_element(i);
				}
			}
			function lucky(){
				
				for (var i = 0; i<current; i++){
					var cat= categories[Math.floor(Math.random()*categories.length)];
					$("#selector"+i).val(cat);
				}
				fill_all()
			}
