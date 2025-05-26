let tileSize = 60;
let rows = 5;
let cols = 5;
let farm = [];

function setup() {
  
  createCanvas(cols * tileSize, rows * tileSize); // quadriculado
  for (let y = 0; y < rows; y++) {
    farm[y] = [];
    for (let x = 0; x < cols; x++) {
      farm[y][x] = {
        stage: 0,     // 0: vazio, 1: plantado, 2: crescendo, 3: pronto
        timer: 0
      };
    }
  }
}

function draw() {
  
  background(120, 200, 120);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let tile = farm[y][x];
      let px = x * tileSize;
      let py = y * tileSize;

      // Fundo da plantação
      fill(getSoilColor(tile.stage));
      rect(px, py, tileSize, tileSize);

      // Planta (baseado no estágio)
      if (tile.stage === 1) {
        fill(100, 200, 100);
        ellipse(px + tileSize / 2, py + tileSize / 2, 10);
      } else if (tile.stage === 2) {
        fill("rgb(191,236,10)");
        ellipse(px + tileSize / 2, py + tileSize / 2, 20);
      } else if (tile.stage === 3) {
        fill("red");
        ellipse(px + tileSize / 2, py + tileSize / 2, 30);
      }

      // Crescimento automático
      if (tile.stage > 0 && tile.stage < 3) {
        tile.timer++;
        if (tile.timer > 120) { // após 2 segundos (120 frames)
          tile.stage++;
          tile.timer = 0;
        }
      }

      // Grade
      stroke(0);
      noFill();
      rect(px, py, tileSize, tileSize);
    }
  }
   drawInstructions(); // 👈 chamada no final do draw()

}

function mousePressed() {
  let x = floor(mouseX / tileSize);
  let y = floor(mouseY / tileSize);
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    let tile = farm[y][x];

    if (tile.stage === 0) {
      // Planta uma semente
      tile.stage = 1;
      tile.timer = 0;
    } else if (tile.stage === 3) {
      // Colhe a planta
      tile.stage = 0;
      tile.timer = 0;
      

    }
  }
 
}
function getSoilColor(stage) {
  if (stage === 0) return color(160, 100, 60);       // seco
  if (stage === 1) return color(140, 90, 50);        // recém plantado
  if (stage === 2) return color(120, 80, 40);        // úmido
  return color(100, 60, 30);   // animação da Terra ; seca - recém plantada - úmida
}


function drawInstructions() {
  fill("rgb(11,255,11)");
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text("Clique para plantar, aguarde... Colha seu tomate!", 10, height - 10); // Intruções para o jogador
}
