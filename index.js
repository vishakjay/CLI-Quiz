#!/usr/bin/env node
import chalk from 'chalk';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner} from 'nanospinner';


// global declarations 
let playerName
 const sleep=(ms = 2000) => new Promise((r) => setTimeout(r, ms));
 async function welcome(){
   const title=chalkAnimation.rainbow('Are you really good at using the C programming language ? , lets find out through a small quiz');

   // running the timer for a few seconds
   await sleep();
   title.stop();

   console.log(`
   ${chalk.bgBlue('RULES OF THE GAME !! ')}
   ${chalk.bgRed('(Please do give it a read )')}
   You will have to answer a set of 5 questions
   If you make a mistake in even one of them the quiz will be terminated.
   
   `);
  
   const conclude=chalkAnimation.radar('BEST OF LUCK !!!!! 頑張れ 先輩 !!!!');
   await sleep ();
   conclude.stop();
 }



async function askName(){
 
const recieveName= await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name ?',
    default(){
        return 'John Doe';
    }
});
playerName=recieveName.player_name;


}

async function question_1(){
 const question= await inquirer.prompt({
    name:'question_1',
    type:'list',
    message:" What is the range of values that can be stored by int datatype in C",
    choices:[
         '0 to (2^31)-1',
         '-256 to 255',
         '-(2^31) to (2^31)-1',
         '-(2^63) to (2^63)-1'
    ]
 })
 return(handleAnswer(question.question_1=='-(2^31) to (2^31)-1'))
};
async function question_2(){
    const question= await inquirer.prompt({
       name:'question_2',
       type:'list',
       message:" How is an array initialized in C language?",
       choices:[
            'int a[3]={1,2,3};',
            'int a={1,2,3};',
            'int a[]=new int[3];',
            'int a(3)=[1,2,3];'
       ]
    })
    return(handleAnswer(question.question_2=='int a[3]={1,2,3};'))
   };
   async function question_3(){
    const question= await inquirer.prompt({
       name:'question_3',
       type:'list',
       message:`#include <stdio.h>
       void swap(int *a, int *b) {
           int t = *a;
           *a = *b;
           *b = t;
       }
       void solve() {
           int a = 3, b = 5;
           swap(&a, &b);
           printf("%d %d", a, b);
       }
       int main() {
           solve();
           return 0;
       }`,
       choices:[
            '3 5',
            '5 3',
            '5 5',
            '3 3'
       ]
    })
    return(handleAnswer(question.question_3=='5 3'))
   };
   async function question_4(){
    const question= await inquirer.prompt({
       name:'question_4',
       type:'list',
       message:`#include <stdio.h>
       int main() {
           int a[] = {1, 2, 3, 4};
           int sum = 0;
           for(int i = 0; i < 4; i++) {
               sum += a[i];
           }
           printf("%d", sum);
           return 0;
       }`,
       choices:[
            '1',
            '4',
            '20',
            '10'
       ]
    })
    return(handleAnswer(question.question_4=='10'));
   };
   async function question_5(){
    const question= await inquirer.prompt({
       name:'question_1',
       type:'list',
       message:`#include <stdio.h>
       void solve() {
           int a[] = {1, 2, 3, 4, 5};
           int sum = 0;
           for(int i = 0; i < 5; i++) {
               if(i % 2 == 0) {
                   sum += *(a + i);
               }
               else {
                   sum -= *(a + i);
               }
           }
           printf("%d", sum);
       }
       int main() {
           solve();
           return 0;
       }`,
       choices:[
            '2',
            '15',
            'Syntax Error',
            '3'
       ]
    })
    return(handleAnswer(question.question_1=='3'))
   };

async function handleAnswer(isCorrect){
    const spinner= createSpinner('Checking........').start();
    await  sleep();

    if(isCorrect){
        spinner.success({text:`That's Great You can now proceed to learn other languages as your fundamentals look rock solid !! ${playerName}.`});
    }
    else{
        spinner.error({text:`Game Over ${playerName} !! Better Luck Next Time`});
        process.exit(1);
    }
}
function winner(){
    console.clear();
    const msg=`Congratulations !!! ${playerName}`;
    figlet(msg,(err,data)=>{
      console.log(gradient.pastel.multiline(data));
    });
}
await welcome();
await askName();
await question_1();
await question_2();
await question_3();
await question_4();
await question_5();
await winner();