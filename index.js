#!/usr/bin/env node

import readlineSync from 'readline-sync';

const game = () => {
    const name = readlineSync.question('Hello, hero, \nenter your name: ');
    const entities = ['stones', 'scissors', 'paper'];
    const raunds = [1, 2, 3];
    
    const round = () => {
        const choice = readlineSync.keyInSelect(
            entities,
            'press key',
            { cancel: 'What`s happening?' },
          );
        const userEssence = entities[choice];
        if (choice === -1) {
            console.log('Call ChatGPT\n\n');
            return NaN;
        }
        console.log(`Your choice: ${userEssence}`);
        const copyEntities = [...entities];
        const aiEssence = copyEntities.sort(() => Math.random() - 0.5)[1];
        console.log(`AI choice: ${aiEssence}`);
       
        const res = entities.indexOf(userEssence) - entities.indexOf(aiEssence);
        let win;
        if (res === 0) {
            console.log('This time nobody win.');
            return NaN;
        }
        if  ((res === -1) || (res === 2)) win = true;
        if ((res === 1) || (res === -2)) win = false;
        return win;
        }
    
    const count = {user: 0, ai: 0};
    console.log('You have three rounds.')
    raunds.map(() => {
        console.log(`\n${name}, choose your essence: `)
        const win = round();
        if (win === true) {
            count.user += 1;
            console.log('       You win!\n<____________________>\n');
        }
        if (win === false) {
            count.ai += 1;
            console.log('       AI win!\n<____________________>\n');
            }
        });
    if (count.user === count.ai) {
        console.log('Nobody win! One moor game.');
        return game();
    }
    console.log((count.user > count.ai) ? `${name} is champion!` : 'AI better!');

};
game();
