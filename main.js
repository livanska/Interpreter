
function play()
{  
    let log = document.getElementById("log"); 
    log.value= "";
    let code;
    code = document.getElementById("code").value
    try{
    log.style["color"] = "black";
    const fishTokeneizer = new Tokeneizer(code);
    const tokens = fishTokeneizer.normalize().tokeneize().tokens;
    const fishParser = new Parser();
    const separatedBlocks = fishParser.simplifyBlocks(tokens);
    const commands = fishParser.separateCommands(separatedBlocks);
    const tree = fishParser.parse(commands);
   //$('#json').JSONView((JSON.stringify(commands)));
    const evaluator = new Evaluator();
    $('#json').JSONView((JSON.stringify(tree)));
    const stack = evaluator.evaluate(tree); 
    evaluator.execute(stack);
    }
    catch(error)
    {
        log.style["color"] = "red";
        log.value= error;
    } 
}
function move(...args)
{
    console.log(args)
    if(args[2]==undefined)
    
    {
            if(args[0] === "Up")
        {
            up(args[1]);
        }
        else if(args[0]  === "Down")
        {   
            down(args[1] );  
        }
        else if(args[0]  === "Right")
        {   
            right(args[1] ); ; 
        }
        else if(args[0]  === "Left")
        {
            left(args[1] ); 
        }   
    }
    else
    { 
        if(check(args[2]))
        {
            if(args[0] === "Up")
            {
                up(args[1]);
            }
            else if(args[0]  === "Down")
            {   
                down(args[1] );  
            }
            else if(args[0]  === "Right")
            {   
                right(args[1] ); ; 
            }
            else if(args[0]  === "Left")
            {
                left(args[1] ); 
            }    
        }
    }
}
function bite(...args)
{
    console.log(args)
    if(args[1]== undefined)
    {
        eat(args[0])
    }
    else
    {
        if(check(args[1]))
        {
            eat(args[0])
        }
    }
}
function checkFish(fish)
{
    let result = check(fish);
    return result
}
