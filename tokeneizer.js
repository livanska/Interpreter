class Tokeneizer {
    constructor(code) {
            this.input = code;
            this.tokens = [];
            this.rules = {
                is_whitespace : (symbol) => /\s/.test(symbol),
                is_symbol : (symbol) => /\w/i.test(symbol),
                is_next_operator : (symbol) => symbol === '>',
                is_quantity_operator : (symbol) => symbol === ':',
                is_number : (symbol) => /[0-9]/.test(symbol),
                is_opening_brace : (symbol) => symbol === '{',
                is_closing_brace : (symbol) => symbol === '}',
                is_keyword : (symbol) => /\b(Move|Loop|Check|Bite)\b/.test(symbol),
                is_direction_const : (symbol) => /\b(Up|Down|Left|Right)\b/.test(symbol),
                is_fish_const : (symbol) => /\b(Tuna|Salmon|Trout|Carp|Fugu)\b/.test(symbol),
                is_command_end : (symbol) => symbol === ';'
            }
        }
        normalize () {
            this.input = this.input.replace(/[\n]/g,'');
            return this;
        }
        tokeneize () {
            let index = 0;
            const end = this.input.length;
            for (index = 0; index < end; index++){
                if(this.rules.is_whitespace(this.input[index]))
                    continue;
                else if(this.rules.is_next_operator(this.input[index]))
                    this.tokens.push({type:'next_operator',value:'>'});
                else if(this.rules.is_quantity_operator(this.input[index]))
                    this.tokens.push({type:'quantity_operator',value:':'});
                else if(this.rules.is_opening_brace(this.input[index]))
                    this.tokens.push({type:'opening_brace',value:'{'});
                else if(this.rules.is_closing_brace(this.input[index]))
                    this.tokens.push({type:'closing_brace',value:'}'});
                else if(this.rules.is_number(this.input[index])) {
                    let word_char_counter = 0;
                    let match = '';
                    while(true) {
                        match += this.input[index + word_char_counter];
                        word_char_counter ++;
                        if(!this.rules.is_number(this.input[index + word_char_counter])) {
                            index += word_char_counter;
                            break;
                        }
                    }
                    index--;
                    this.tokens.push({type:'number',value:parseInt(match)});
                }
                else if(this.rules.is_command_end(this.input[index]))
                    this.tokens.push({type:'semicolon',value:';'}); 
                else if(this.rules.is_symbol(this.input[index])) {
                    let word_char_counter = 0;
                    let match = '';
                    while(true) {
                        match += this.input[index + word_char_counter];
                        word_char_counter ++;
                        if(!this.rules.is_symbol(this.input[index + word_char_counter])) {
                            index += word_char_counter;
                            break;
                        }
                    }
                    index--;
                    if(this.rules.is_keyword(match))
                        this.tokens.push({type:'keyword',value:match});
                    else if(this.rules.is_direction_const(match))
                        this.tokens.push({type:'direction_const',value:match});
                    else if(this.rules.is_fish_const(match))
                        this.tokens.push({type:'fish_const',value:match});
                    else this.tokens.push({type:'None',value:this.input[index], at: index});
                }
                else this.tokens.push({type:'None',value:this.input[index], at: index});
            }
            return this;
        }
}