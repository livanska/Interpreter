//App Creation
let Application = PIXI.Application,
Container = PIXI.Container,
loader = PIXI.loader,
resources = PIXI.loader.resources,
TextureCache = PIXI.utils.TextureCache,
Sprite = PIXI.Sprite;
//Create a Pixi Application
let app = new Application({ 
width: 350,
height: 358,                       
antialiasing: true, 
transparent: false, 
resolution: 2,
border: 5,
view: game
}
);
app.renderer.view.style.border = "5px solid green";
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
loader
.add("images/cat.png")
.load(setup);

//Define any variables that are used in more than one function
var cat;
let step_position = 44;
let starting_x = 1.2;
let starting_y = 9;
var position_counter;

//Health bar
healthBar = new PIXI.Container();
healthBar.position.set( 0, 0)
app.stage.addChild(healthBar);

//Create the black background rectangle
let innerBar = new PIXI.Graphics();
innerBar.beginFill(0xFFFFFF);
innerBar.drawRect(0, 0, 350, 8);
innerBar.endFill();
healthBar.addChild(innerBar);

//Create the front red rectangle
let outerBar = new PIXI.Graphics();
outerBar.beginFill(0xFF3300);
outerBar.drawRect(0, 0, 350, 8);
outerBar.endFill();
healthBar.addChild(outerBar);
healthBar.outer = outerBar;

//StartingValue
outerBar.width = 140;
healthPercent = (100/app.stage.width).toPrecision(2);
//console.log(healthPercent*outerBar.width)

//Background
const bg = PIXI.Sprite.from('images/grass.jpg');
bg.position.set( 0, 8)
bg.width = 350;
bg.height = 350;
app.stage.addChild(bg);

//HealthValue
let healthValue_label = new PIXI.Text("Energy: "+  parseInt(healthPercent*outerBar.width), {fontSize:7, fill:"black"});
healthValue_label.x = 145;
healthValue_label.y = 0;
healthBar.addChild(healthValue_label);

function setup() 
{
    //Create cat
    cat = new Sprite(resources["images/cat.png"].texture);
    cat.y = 0 + starting_y;     
    cat.x = 0 + starting_x; 
    cat.vx = 0;
    cat.vy = 0;
    cat.width = 40;
    cat.height = 40;
    app.stage.addChild(cat);
    app.ticker.add(delta => gameLoop(delta));
    var log = document.getElementById("log")
    log.value=""
    bonus=[];
    boxes=[]
    box_count =5;
    get_boxes()
    let code = `Move > Down : 3;
Loop > {
    Move > Right : 1;
    Move > Down : 1;
} : 2;
Check > {
    Move > Right : 1;
}: Tuna; `;
 document.getElementById("code").value = code

} 

// Boxes creation
let bonus=[];
let boxes=[]
let box_count =5;
function get_boxes()
{
    let min =0;
    let max=8;
    let fish_max =5;
    fish_types = ["Tuna","Salmon","Trout","Carp","Fugu"];
    for(let i=0;i<box_count;i++)
    {
        let element = PIXI.Sprite.from('images/box.png') ;
        element.x =(Math.floor(Math.random() * (+max - +min)) + +min)*step_position;
        element.y = (Math.floor(Math.random() * (+max - +min)) + +min)*step_position+starting_y;
        if (element.x === 0 && element.y-starting_y === 0)
        {
            element.x =(Math.floor(Math.random() * (+max - +min)) + +min)*step_position;
            element.y = (Math.floor(Math.random() * (+max - +min)) + +min)*step_position+starting_y;
        }
        element.width = 40;
        element.height = 40;
        app.stage.addChild(element);
        boxes.push(element);
       /* if (i>0)
        {
            if(boxes[i].x === boxes[i-1].x && boxes[i].y === boxes[i-1].y)
            {
            boxes.slice(0, -1);
            i--;
            }
        }*/
        let bites = (Math.floor(Math.random() * (+fish_max - +min)) + +min)+1;
        let element_count = new PIXI.Text("Bites: "+  bites, {fontSize:107, fill:"black"});
        element.addChild(element_count);
        bonus.push({box:boxes[i], type: fish_types[Math.floor(Math.random() * (+fish_max - +min)) + +min] , count:bites , text_elem: element_count});
        element_count.x = bonus[i].box.x/step_position + 20;
        element_count.y = bonus[i].box.y/step_position+10;
        console.log( bonus[i].type+ "  x: "+(bonus[i].box.x/step_position+1)+"  y: "+((bonus[i].box.y-starting_y)/step_position +1))
    }
    
}
document.getElementById("tree").onclick = function() {
    var x = document.getElementById("json");
    if (x.style.display === "none") {
      x.style.display = "block";
      window.scrollTo(0,document.body.scrollHeight);
    } else {
      x.style.display = "none";
     
    }
  }
    