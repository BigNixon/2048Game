import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class AppComponent {
  title = '2048Game';
  score=4
  casilla=[0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,0];
  best=4;
  is0(casilla:number){
    if(casilla===0) return true;
    return false;
  }
  is2(casilla:number){
    if(casilla===2) return true;
    return false;
  }
  is4(casilla:number){
    if(casilla===4) return true;
    return false;
  }
  is8(casilla:number){
    if(casilla===8) return true;
    return false;
  }
  is16(casilla:number){
    if(casilla===16) return true;
    return false;
  }
  is32(casilla:number){
    if(casilla===32) return true;
    return false;
  }
  is64(casilla:number){
    if(casilla===64) return true;
    return false;
  }
  is128(casilla:number){
    if(casilla===128) return true;
    return false;
  }
  is256(casilla:number){
    if(casilla===256) return true;
    return false;
  }
  is512(casilla:number){
    if(casilla===512) return true;
    return false;
  }
  is1024(casilla:number){
    if(casilla===1024) return true;
    return false;
  }
  is2048(casilla:number){
    if(casilla===2048) return true;
    return false;
  }


  getScore(){
    let sum=0
    for(let i=0;i<this.casilla.length;i++){
      sum+=this.casilla[i];
    }
    this.score=sum;
    this.getBest();
  }
  getBest(){
    if(this.score>this.best) this.best = this.score;
  }
  resetGame(){
    this.score=4;
    for(let i=0;i<this.casilla.length;i++){
      this.casilla[i]=0;
    }
    let index1 = Math.floor(Math.random()*this.casilla.length);
    let index2 = Math.floor(Math.random()*this.casilla.length);
    while(index1==index2){
      index2=Math.floor(Math.random()*this.casilla.length);
    }
    this.casilla[index1]=2;
    this.casilla[index2]=2;
  }
  
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key == 'a'){
      this.moveToLeft();
    }
    if(event.key == 'd'){
      this.moveToRight();
    }
    if(event.key == 's'){
      this.moveToDown();
    }
    if(event.key == 'w'){
      this.moveToUp();
    }
  }
  generateNewNumber(){
    let randomIndex=Math.floor(Math.random()*this.casilla.length);
    let isFull = true;
    for(let i=0;i<this.casilla.length;i++){
      if(this.casilla[i]===0) {
        isFull=false;
        break;
      }
    }
    while(this.casilla[randomIndex]!==0 && !isFull){
      randomIndex=Math.floor(Math.random()*this.casilla.length);
    }
    if(!isFull){
      this.casilla[randomIndex] = 2;
    }
    this.getScore();
  }
  


  moveToRight(){
    let moved=false;
    for(let i=0;i<this.casilla.length;i++){
      if(i%4===0){ //get a new row
        let One  = this.casilla[i];
        let Two  = this.casilla[i+1];
        let Three= this.casilla[i+2];
        let Four = this.casilla[i+3];
        let row = [One,Two,Three,Four];
        // console.log(row);
        let filteredRow = row.filter(num=>num);
        // console.log(filteredRow);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);
        // console.log(newRow);
        for(let k=0;k<row.length;k++){
          if(newRow[k]!=row[k]){
            moved=true;
            break;
          }
        }
        this.casilla[i] = newRow[0];
        this.casilla[i+1] = newRow[1];
        this.casilla[i+2] = newRow[2];
        this.casilla[i+3] = newRow[3];
      }
    }
    this.combineRight(moved);
  }
  moveToDown(){
    let moved=false;
    for(let i=0;i<this.casilla.length;i++){
      if(Math.floor(i/4)===0){ //get a new row
        let One  = this.casilla[i];
        let Two  = this.casilla[i+4];
        let Three= this.casilla[i+8];
        let Four = this.casilla[i+12];
        let col = [One,Two,Three,Four];
        // console.log(col);
        let filteredCol = col.filter(num=>num);
        // console.log(filteredRow);
        let missing = 4 - filteredCol.length;
        let zeros = Array(missing).fill(0);
        let newCol = zeros.concat(filteredCol);
        // console.log(newCol);
        for(let k=0;k<col.length;k++){
          if(newCol[k]!=col[k]){
            moved=true;
            break;
          }
        }
        this.casilla[i] = newCol[0];
        this.casilla[i+4] = newCol[1];
        this.casilla[i+8] = newCol[2];
        this.casilla[i+12] = newCol[3];
      }
    }
    this.combineDown(moved);
  }
  moveToUp(){
    let moved=false;
    for(let i=0;i<this.casilla.length;i++){
      if(Math.floor(i/4)===0){ //get a new row
        let One  = this.casilla[i];
        let Two  = this.casilla[i+4];
        let Three= this.casilla[i+8];
        let Four = this.casilla[i+12];
        let col = [One,Two,Three,Four];
        // console.log(col);
        let filteredCol = col.filter(num=>num);
        // console.log(filteredRow);
        let missing = 4 - filteredCol.length;
        let zeros = Array(missing).fill(0);
        let newCol = filteredCol.concat(zeros);
        // console.log(newCol);
        for(let k=0;k<col.length;k++){
          if(newCol[k]!=col[k]){
            moved=true;
            break;
          }
        }
        this.casilla[i] = newCol[0];
        this.casilla[i+4] = newCol[1];
        this.casilla[i+8] = newCol[2];
        this.casilla[i+12] = newCol[3];
      }
    }
    this.combineUp(moved);
  }
  moveToLeft(){
    let moved=false;
    for(let i=0;i<this.casilla.length;i++){
      if(i%4===0){ //get a new row
        let One  = this.casilla[i];
        let Two  = this.casilla[i+1];
        let Three= this.casilla[i+2];
        let Four = this.casilla[i+3];
        let row = [One,Two,Three,Four];
        // console.log(row);
        let filteredRow = row.filter(num=>num);
        // console.log(filteredRow);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);
        // console.log(newRow);
        for(let k=0;k<row.length;k++){
          if(newRow[k]!=row[k]){
            moved=true;
            break;
          }
        }

        this.casilla[i] = newRow[0];
        this.casilla[i+1] = newRow[1];
        this.casilla[i+2] = newRow[2];
        this.casilla[i+3] = newRow[3];
      }
    }
    this.combineLeft(moved);
  }

  


  combineLeft(moved:boolean){
    let combined = false;
    for(let i=0;i<this.casilla.length;i++){
      if(i%4===0){
        let One  = this.casilla[i];
        let Two  = this.casilla[i+1];
        let Three= this.casilla[i+2];
        let Four = this.casilla[i+3];
        let row = [One,Two,Three,Four];
        // console.log(row);
        for(let j=0;j<row.length-1;j++){
          if(row[j]===row[j+1]){
            row[j]=row[j]+row[j+1];
            row[j+1]=0;
          }
        }
        let filteredRow = row.filter(num=>num);
        // console.log(filteredRow);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);
        for(let k=0;k<row.length;k++){
          if(newRow[k]!=row[k]){
            combined=true;
            break;
          }
        }
        this.casilla[i] = newRow[0];
        this.casilla[i+1] = newRow[1];
        this.casilla[i+2] = newRow[2];
        this.casilla[i+3] = newRow[3];
      }
    }

    console.clear();
    console.log(moved);
    console.log(combined);
    
    if(moved || combined){
      this.generateNewNumber();
    }
  }

  combineRight(moved:boolean){
    let combined = false;
    for(let i=0;i<this.casilla.length;i++){
      if(i%4===0){
        let One  = this.casilla[i];
        let Two  = this.casilla[i+1];
        let Three= this.casilla[i+2];
        let Four = this.casilla[i+3];
        let row = [One,Two,Three,Four];
        // console.log(row);
        for(let j=row.length-1;j>0;j--){
          if(row[j]===row[j-1]){
            row[j]=row[j]+row[j-1];
            row[j-1]=0;
          }
        }
        let filteredRow = row.filter(num=>num);
        // console.log(filteredRow);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);
        for(let k=0;k<row.length;k++){
          if(newRow[k]!=row[k]){
            combined=true;
            break;
          }
        }
        this.casilla[i] = newRow[0];
        this.casilla[i+1] = newRow[1];
        this.casilla[i+2] = newRow[2];
        this.casilla[i+3] = newRow[3];
      }
    }
    console.clear();
    console.log(moved);
    console.log(combined);
    
    if(moved || combined){
      this.generateNewNumber();
    }
  }

  combineUp(moved:boolean){
    let combined = false;
    for(let i=0;i<this.casilla.length;i++){
      if(Math.floor(i/4)===0){
        let One  = this.casilla[i];
        let Two  = this.casilla[i+4];
        let Three= this.casilla[i+8];
        let Four = this.casilla[i+12];
        let row = [One,Two,Three,Four];
        // console.log(row);
        for(let j=0;j<row.length-1;j++){
          if(row[j]===row[j+1]){
            row[j]=row[j]+row[j+1];
            row[j+1]=0;
          }
        }
        let filteredRow = row.filter(num=>num);
        // console.log(filteredRow);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);
        for(let k=0;k<row.length;k++){
          if(newRow[k]!=row[k]){
            combined=true;
            break;
          }
        }
        this.casilla[i] = newRow[0];
        this.casilla[i+4] = newRow[1];
        this.casilla[i+8] = newRow[2];
        this.casilla[i+12] = newRow[3];
      }
    }
    console.clear();
    console.log(moved);
    console.log(combined);
    
    if(moved || combined){
      this.generateNewNumber();
    }
  }

  combineDown(moved:boolean){
    let combined = false;
    for(let i=0;i<this.casilla.length;i++){
      if(Math.floor(i/4)===0){
        let One  = this.casilla[i];
        let Two  = this.casilla[i+4];
        let Three= this.casilla[i+8];
        let Four = this.casilla[i+12];
        let row = [One,Two,Three,Four];
        // console.log(row);
        for(let j=row.length-1;j>0;j--){
          if(row[j]===row[j-1]){
            row[j]=row[j]+row[j-1];
            row[j-1]=0;
          }
        }
        let filteredRow = row.filter(num=>num);
        // console.log(filteredRow);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);
        for(let k=0;k<row.length;k++){
          if(newRow[k]!=row[k]){
            combined=true;
            break;
          }
        }
        this.casilla[i] = newRow[0];
        this.casilla[i+4] = newRow[1];
        this.casilla[i+8] = newRow[2];
        this.casilla[i+12] = newRow[3];
      }
    }
    console.clear();
    console.log(moved);
    console.log(combined);
    
    if(moved || combined){
      this.generateNewNumber();
    }
  }

}