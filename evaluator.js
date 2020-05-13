class Evaluator {
    constructor() {}
    evaluate(...tree) {
        let command_stack = [];
        for(let node_index in tree[0]) {
            let currentNode = tree[0][node_index];
            if(currentNode.command === 'Move') {
                if(['Up','Down','Left','Right'].includes(currentNode.where)) {
                    if(Number.isInteger(currentNode.howMany)) {
                        command_stack.push([move,[currentNode.where,currentNode.howMany,tree[1]]]);
                    }
                    else throw new Error(`[Evaluation Error] Invalid move quantity: ${currentNode.howMany}`);
                }
                else throw new Error(`[Evaluation Error] Invalid direction: ${currentNode.where}`);
            }
            if(currentNode.command === 'Bite') {
                if(Number.isInteger(currentNode.howMany)) {
                    command_stack.push([bite,[currentNode.howMany,tree[1]]]);
                }
                else throw new Error(`[Evaluation Error] Invalid bite quantity: ${currentNode.howMany}`);
            }
            if(currentNode.command === 'Loop') {
                if(Number.isInteger(currentNode.howMany)) {
                    for(let repetitions = 0; repetitions < currentNode.howMany; repetitions++) {
                        command_stack.push(...this.evaluate(currentNode.body,tree[1]));
                    }
                }
                else throw new Error(`[Evaluation Error] Invalid repetition quantity: ${currentNode.howMany}`);
            }
            if(currentNode.command === 'Check') {
                //if(checkFish(currentNode.what)) { 
                     command_stack.push(...this.evaluate(currentNode.body,currentNode.what));
               // }
                //else throw new Error(`[Evaluation Error] Invalid check condition: ${currentNode.what}`);
            }
        }
        return command_stack;
    }
    async execute(stack) {
    
        for(let command_index =0; command_index<stack.length; command_index++) {
            let action = stack[command_index][0];
            let args = stack[command_index][1];
            let duration = 1;
            if(args[1] && Number.isInteger(args[1]))
            {
                duration = args[1];
                //console.log(duration)
            }
           action(...args) 
           let promise = new Promise((resolve, reject) => {
               setTimeout(function isMoving() {
            console.log("step");
            resolve();},900*duration)
          });
           await promise;
           if(cat.x >= 350 || cat.y >= 350||cat.x < 0||cat.y<0)
           {
                let log = document.getElementById("log"); 
               log.value +="Cat out of map range! You lose :( ";
               break;
           }
        }
    }
} 

