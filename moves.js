let eps = 1+starting_y;
function eat(value)
{
    busy=true;
    let isBox = false;
    console.log("current ", cat.x , cat.y)
    //let status = document.getElementById("status");
    for(let i=0;i<box_count;i++)
    {   
        if((Math.abs(cat.x - (bonus[i].box.x+starting_x))<eps) && (Math.abs(cat.y - (bonus[i].box.y+starting_y))<eps))
        {
            isBox = true;
            console.log(bonus[i].type)
            console.log(value)
            console.log(bonus[i].count)
            while(value > 0&& bonus[i].count>0)
            {
                console.log(bonus[i].type)
                //isBox = true;
                //status.innerHTML = bonus[i].type
                if(bonus[i].type==="Salmon") 
                {
                    healthBar.outer.width += 7;
                    healthValue_label.text= "Energy: "+  parseInt(healthPercent*outerBar.width);
                }
                else if(bonus[i].type==="Tuna") 
                {
                    healthBar.outer.width += 7;
                    healthValue_label.text= "Energy: "+ parseInt(healthPercent*outerBar.width);
                }
                else if(bonus[i].type==="Trout")
                {
                    healthBar.outer.width += 3.5;
                    healthValue_label.text= "Energy: "+  parseInt(healthPercent*outerBar.width);
                } 
                else if(bonus[i].type==="Carp")
                {
                    healthBar.outer.width += 3.5; 
                    healthValue_label.text= "Energy: "+ parseInt(healthPercent*outerBar.width);
                }
                else if(bonus[i].type==="Fugu")
                {   
                    healthBar.outer.width -= 7; 
                    healthValue_label.text= "Energy: "+  parseInt(healthPercent*outerBar.width);
                    if(outerBar.width<=0)
                    {
                        var log = document.getElementById("log")
                        log.value += "No energy left. You died :(\n" 
                        break; 
                    }
                }
                value--;
                bonus[i].count--;
                bonus[i].text_elem.text= "Bites: "+  bonus[i].count;
            }
                if(!bonus[i].count)
                {
                    var log = document.getElementById("log")
                    log.value += "Done eating "+ bonus[i].type+" \n"  
                    bonus[i].box.destroy();
                    bonus.splice(i, 1);
                    box_count--; 
                   // isBox = false;
                }    
        }
    }
    if (!isBox)
    {    
        var log = document.getElementById("log")
        log.value += "No food here\n"
        healthBar.outer.width -= 14;
        healthValue_label.text= "Energy: "+  parseInt(healthPercent*outerBar.width);
        if(outerBar.width<=0)
        {
            var log = document.getElementById("log")
            log.value += "No energy left. You died :(\n"  
        }
    }
}
function check(fish)
{
    console.log("x:"+cat.x+" y:"+cat.y)
    let index = -1;
    for(let i=0;i<box_count;i++)
    {   
        console.log(" box x:"+bonus[i].box.x+" box y:"+ bonus[i].box.y)
        if((Math.abs(cat.x - ((bonus[i].box).x+starting_x))<2*eps) && (Math.abs(cat.y - ((bonus[i].box).y+starting_y))<2*eps))
        {
            index = i;
            console.log(" box x:"+bonus[index].box.x+" box y:"+ bonus[index].box.y)
        }
    }
    if(index === -1)
    {
        healthBar.outer.width -= 7;
        healthValue_label.text= "Energy: "+  parseInt(healthPercent*healthBar.outer.width);
        if( outerBar.width<1)
        {
            healthValue_label.text= "Energy: 0"; 
            var log = document.getElementById("log")
            log.value += "No energy left. You died :(\n"  
            return false
        }
        else
        {
            var log = document.getElementById("log")
            healthValue_label.text= "Energy: "+  parseInt(healthPercent*outerBar.width);
            log.value += "No box here :(\n"  
            
        }
        return false;
    }
    else
    {
        if(fish === bonus[index].type)
        {
            var log = document.getElementById("log")
            log.value += ("Yeeeep! That`s " + fish +"\n")
            return true
        }
        else
        {
            var log = document.getElementById("log")
            log.value += ("That`s not " + fish +"\n")
            healthBar.outer.width -= 7;
            healthValue_label.text= "Energy: "+  parseInt(healthPercent*outerBar.width);
                if( outerBar.width<1)
                {
                    healthValue_label.text= "Energy: 0"; 
                    var log = document.getElementById("log")
                    log.value += "No energy left. You died :(\n" 
                }
            return false 
        }
    }
}
function right(value)
{
    console.log("right")
    { 
        if( outerBar.width<1)
        {
            healthValue_label.text= "Energy: 0"; 
            var log = document.getElementById("log")
            log.value += "No energy left. You died :(" 
        }
        else
        {
            console.log(outerBar.width)
            outerBar.width -= 7*value;
            healthValue_label.text= "Energy: "+  parseInt(healthPercent*outerBar.width); 
            position_counter = step_position*value;
            cat.vx = 1;
            var log = document.getElementById("log")
            log.value += "Moved right "+ value + " time(s)\n"  
        }
    }
    if( outerBar.width<1)
    {
        healthValue_label.text= "Energy: 0"; 
        var log = document.getElementById("log")
        log.value += "No energy left. You died :(\n" 
    }
}
function left(value)
{
    console.log("left")
    { 
        if( outerBar.width<1)
        {
            healthValue_label.text= "Energy: 0"; 
            var log = document.getElementById("log")
            log.value += "No energy left. You died :(\n"  
        }
        else
        {
            console.log(outerBar.width)
            outerBar.width -= 7*value;
            healthValue_label.text= "Energy: "+  parseInt(healthPercent*outerBar.width); 
            position_counter = step_position*value;
            cat.vx = -1;
            var log = document.getElementById("log")
            log.value += "Moved left "+ value + " time(s)\n"  
        }
    }
    if( outerBar.width<1)
    {
        healthValue_label.text= "Energy: 0"; 
        var log = document.getElementById("log")
        log.value += "No energy left. You died :(\n" 
    }
}
function up(value)
{
    console.log("up")
    { 
        if( outerBar.width<1)
        {
            healthValue_label.text= "Energy: 0"; 
            var log = document.getElementById("log")
            log.value += "No energy left. You died :(\n" 
        }
        else
        {
            console.log(outerBar.width)
            outerBar.width -= 7*value;
            healthValue_label.text= "Energy: "+  parseInt(healthPercent*outerBar.width); 
            position_counter = step_position*value;
            cat.vy = -1; 
            var log = document.getElementById("log") 
            log.value += "Moved up "+ value + " time(s)\n"  
        }
    }
    if( outerBar.width<1)
    {
        healthValue_label.text= "Energy: 0"; 
        var log = document.getElementById("log")
        log.value += "No energy left. You died :(\n" 
    }
}
function down(value)
{
    console.log("down")
    { 
        if( outerBar.width<1)
        {
            healthValue_label.text= "Energy: 0"; 
            var log = document.getElementById("log")
            log.value += "No energy left. You died :(\n" 
        }
        else
        {
            console.log(outerBar.width)
            outerBar.width -= 7*value;
            healthValue_label.text= "Energy: "+  parseInt(healthPercent*outerBar.width); 
            position_counter = step_position*value;
            cat.vy = 1;
            var log = document.getElementById("log")
            log.value += "Moved down "+ value + " time(s)\n"  
        }
    }
    if( outerBar.width<1)
    {
        healthValue_label.text= "Energy: 0"; 
        var log = document.getElementById("log")
        log.value += "No energy left. You died :\n" 
    } 
}
function gameLoop(delta)
{
    if(!position_counter)
    { 
        cat.vx =0;
        cat.vy =0;
    }
    else
    {
        cat.x += cat.vx;
        cat.y += cat.vy;
        position_counter--;
       //console.log(position_counter)
    }
}