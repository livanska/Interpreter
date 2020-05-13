class Parser {
    constructor() {
        this.command_rules = {
            is_movement_command_pattern : (command) => /@keyword[ \t]*@next_operator[ \t]*@direction_const[ \t]*@quantity_operator[ \t]*@number/.test(command),
            is_loop_command_pattern : (command) => /@keyword[ \t]*@next_operator[ \t]*@block[ \t]*@quantity_operator[ \t]*@number/.test(command),
            is_check_command_pattern : (command) => /@keyword[ \t]*@next_operator[ \t]*@block[ \t]*@quantity_operator[ \t]*@fish_const/.test(command),
            is_bite_command_pattern : (command) => /@keyword[ \t]*@quantity_operator[ \t]*@number/.test(command),
        }
    }
    simplifyBlocks(tokens) {
        do {
            if(tokens.findIndex(e => e.type === 'closing_brace') ===-1 &&tokens.findIndex(e => e.type === 'opening_brace')===-1)
            {
                break;
            }
            const block = [];
            let firstCloseIndex = tokens.findIndex(e => e.type === 'closing_brace');
            
            if(firstCloseIndex === -1 && (tokens.findIndex(e => e.type === 'opening_brace') !== -1)) {
                throw new Error(`[Parse Error] Invalid matching brace for existing brace at: ${tokens.findIndex(e => e.type === 'opening_brace')}`);
            }
            let matchingOpeningIndex = undefined;
            for (let index = firstCloseIndex; index > 0; index--) {
                if(tokens[index].type === 'opening_brace') {
                    matchingOpeningIndex = index;
                    break;
                }
                else block.unshift(tokens[index]);
            }
            if(matchingOpeningIndex === undefined) {
                throw new Error(`[Parse Error] Invalid matching brace for closing brace at: ${firstCloseIndex}`);
            }
            let currentBlock = {
                type: 'block',
                body: block,
            };
            tokens.splice(matchingOpeningIndex, block.length + 1, currentBlock);
        } while(tokens.some(token => token.type === 'opening_brace'));
        console.log(tokens)
        return tokens;
    }
    separateCommands(tokens) {
        const separatedCommands = [];
        let t_index = 0;
        let command_index = 0;
        while(t_index < tokens.length) {
            if(tokens[t_index].type === 'block') {
                tokens[t_index].body = this.separateCommands(tokens[t_index].body);
            }
            else if(tokens[t_index].type === 'semicolon') {
                let currentCommand = [];
                while(command_index < t_index) {
                    currentCommand.push(tokens[command_index]);
                    command_index++;
                }
                command_index++;
                t_index++;
                separatedCommands.push(currentCommand);
            }
            t_index++;
        }
        return separatedCommands; 
    }
    parse(commands) {
        let tree = [];
        for(let command of commands) {
            let pattern = [];
            let command_string = []
            command.forEach(element => pattern.push(`@${element.type}`));
            command.forEach(element => command_string.push(`${element.value}`));
            pattern = pattern.join(' ');

            if(this.command_rules.is_loop_command_pattern(pattern)) {
                let command_subtree = {
                    command: command[0].value,
                    body: this.parse(command[2].body),
                    howMany: command[4].value,
                };
                tree.push(command_subtree);
            }
            else if(this.command_rules.is_check_command_pattern(pattern)) {
                let command_subtree = {
                    command: command[0].value,
                    body: this.parse(command[2].body),
                    what: command[4].value,
                };
                tree.push(command_subtree);
            }
            else if(this.command_rules.is_movement_command_pattern(pattern)) {
                let command_subtree = {
                    command: command[0].value,
                    where: command[2].value,
                    howMany: command[4].value,
                };
                tree.push(command_subtree);
            }
            else if(this.command_rules.is_bite_command_pattern(pattern)) {
                let command_subtree = {
                    command: command[0].value,
                    howMany: command[2].value,
                };
                tree.push(command_subtree);
            }
            else throw new Error(`[Parse Error] Invalid command: ${command_string.join(' ')}`);
        }
        return tree
    }   
}