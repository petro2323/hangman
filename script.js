const words = [
    'taco', 'burger', 'computer', 'wine', 'canada', 'pizza', 'yugoslavia', 'diamonds',
    'titanic', 'basketball', 'programmer', 'playstation', 'flower', 'beautiful', 'minecraft',
    'endurance', 'earth', 'mars', 'book', 'yellow', 'mouse', 'dog', 'wonderful', 'germany', 'france',
    'america', 'internet', 'address', 'red', 'blue', 'oxygen', 'bedroom', 'comedian', 'yacht', 'racist',
    'hawaii', 'pajama', 'rhythmic', 'salesman', 'aerosmith', 'zombie', 'gasket', 'basket', 'crankshaft',
    'headlights', 'apologize', 'chopping', 'sigma', 'inequality', 'approximation', 'multiplication', 'proportion',
    'expression', 'membership', 'watermelon', 'snare', 'snake', 'drums', 'guitar', 'electricity', 'integration', 'interrogate',
    'trumpet', 'harmonica', 'javascript', 'word', 'idea', 'trope', 'invasion', 'jupiter', 'neptune', 'sahara', 'botswana', 'great',
    'borat', 'fact', 'policy', 'gyat', 'skibidi', 'toilet', 'charisma', 'office', 'regular', 'show', 'jolly', 'tea', 'north', 'west',
    'south', 'east', 'flag', 'network', 'project', 'hangman', 'original', 'lmao', 'ocean', 'continent', 'undertale', 'love'
]

let word = ''
let counter = 0

function start_game() {

    word = words[Math.floor(Math.random() * words.length)]

    let blank_word = ''

    for (let i = 0; i < word.length; i++) {
        blank_word += '_ '
    }

    let div_word = create_div_element('word', 'container', 'fontSize', '2.5rem')
    let div_input = create_div_element('input-lw', 'container', 'marginTop', '0.5rem')
    let div_btn = create_div_element('check-btn', 'container', 'marginTop', '1rem')

    div_word.innerHTML = `${blank_word}`
    div_input.innerHTML = `<input type="text" style="border-radius: 2.5rem; height: 2rem; width: 15rem; text-align: center;" placeholder="Add a letter or guess the word" maxlength="${word.length}" id="input_value">`
    div_btn.innerHTML = `<button id="submit-btn">Check</button>`

    document.querySelector('body').appendChild(div_word)
    document.querySelector('body').appendChild(div_input)
    document.querySelector('body').appendChild(div_btn)

    document.getElementById('submit-btn').addEventListener('click', check_letter_or_word)
    document.querySelector('body').addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            check_letter_or_word()
        }
    })
}

function game_status(input, win_bit) {
    input.disabled = true

    if (win_bit == 1) {
        input.placeholder = 'You win!'
    } else if (win_bit == 0) {
        input.placeholder = 'Game over'
    }

    document.getElementById('check-btn').remove()
    let div_try_again = create_div_element('try-again', 'container', 'marginTop', '1rem')
    div_try_again.innerHTML = `<button id="try-again-btn">Try Again?</button>`

    document.querySelector('body').appendChild(div_try_again)

    document.getElementById('try-again-btn').addEventListener('click', () => {
        window.location.reload()
    })
}

function set_hang_status(number) {
    
    switch (number) {
        case 1:
            document.getElementById('hangman-status').src = 'hangman-status/first-mistake.PNG'
            break
        case 2:
            document.getElementById('hangman-status').src = 'hangman-status/second-mistake.PNG'
            break
        case 3:
            document.getElementById('hangman-status').src = 'hangman-status/third-mistake.PNG'
            break
        case 4:
            document.getElementById('hangman-status').src = 'hangman-status/fourth-mistake.PNG'
            break
        case 5:
            document.getElementById('hangman-status').src = 'hangman-status/fifth-mistake.PNG'
            break
        case 6:
            document.getElementById('hangman-status').src = 'hangman-status/game-over.PNG'
            break
    }

}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length)
}

function check_letter_or_word() {
    const max_mistake_num = 5
    let input = document.getElementById('input_value')
    let client_view = document.getElementById('word')

    let convert_input_tolow = input.value.toLowerCase()

    if (counter < max_mistake_num) {
        
        if (word.includes(convert_input_tolow)) {

            if (input.value.length == 1) {
                let indexes = index_letter_appear(word, convert_input_tolow)
                
                for (let index of indexes) {
                    client_view.innerHTML = client_view.textContent.replaceAt(index * 2, convert_input_tolow)
                }

                input.value = ''
                if (!client_view.textContent.includes('_')) {
                    game_status(input, 1)
                }
                
            } else if (input.value.length == word.length) {
                let input_to_arr = [...convert_input_tolow]
                let char_x2 = ''

                for (let i of input_to_arr) {
                    char_x2 += i + ' '
                }

                client_view.innerHTML = char_x2

                input.value = ''
                game_status(input, 1)
                
            } else if (input.value.length == 0) {
                return
            } else {
                counter++
                set_hang_status(counter)

                input.value = ''
            }

        } else {
            counter++
            set_hang_status(counter)

            input.value = ''
        }

    } else {
        input.value = ''

        let input_to_arr = [...word]
        let char_x2 = ''

        for (let i of input_to_arr) {
            char_x2 += i + ' '
        }

        client_view.innerHTML = char_x2

        game_status(input, 0)
        set_hang_status(counter + 1)
    } 
}

window.onload = start_game

function create_div_element(id_name = null, class_name = null, style_name = null, style_value = null) {
    let div_element = document.createElement('div')

    if (id_name) {
        div_element.setAttribute('id', id_name)
    }

    if (class_name) {
        div_element.classList.add(class_name)
    }

    if (style_name && style_value) {
        div_element.style[style_name] = style_value
    }

    return div_element
}

function index_letter_appear(word, letter) {
    let arr = [...word]
    let indexes = []

    for (let i in arr) {
        if (arr[i] == letter) {
            indexes.push(i)
        }
    }

    return indexes
}