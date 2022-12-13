const { createCanvas } = require("canvas");

// https://gist.github.com/wesbos/1bb53baf84f6f58080548867290ac2b5
// const alternateCapitals = (str) =>
//   [...str]
//     .map((char, i) => char[`to${i % 2 ? "Upper" : "Lower"}Case`]())
//     .join("");

// // Get a random string of alphanumeric characters
// const randomText = () =>
//   alternateCapitals(Math.random().toString(36).substring(2, 8));

const configureText = (ctx, textColors, fonts) => {
  const text = textGenerator();
  const letterSpace = 150 / text.length;
  //loop through string
  for (let i = 0; i < text.length; i++) {
    //Define initial space on X axis
    const xInitialSpace = 25;
    //Set font for canvas element
    ctx.font = `30px ${fonts[randomNumber(0, 1)]}`;
    //set text color
    ctx.fillStyle = textColors[randomNumber(0, 2)];
    ctx.fillText(
      text[i],
      xInitialSpace + i * letterSpace,
      randomNumber(25, 40),
      100
    );
  }
  return text;
};

const textGenerator = () => {
  let result = "";
  let characters = "abcdefghijklmnpqrstuvwxyz123456789";
  for (let i = 0; i < characters.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result.slice(0, 6);
};
//Generate random numbers between a given range
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function generate() {
  const bgColors = ["rgb(107,192,221)", "rgb(189,189,189)", "rgb(255,213,132)"];
  const textColors = ["rgb(0,0,0)", "rgb(198,0,0)", "rgb(0,57,214)"];
  const fonts = ["Arial", "Georgia"];

  const canvas = createCanvas(200, 50);
  let ctx = canvas.getContext("2d");

  ctx.fillStyle = bgColors[randomNumber(0, 2)];
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const text = configureText(ctx, textColors, fonts);

  return {
    image: canvas.toDataURL(),
    text,
  };
}

module.exports = generate;
