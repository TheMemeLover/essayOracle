import OpenAI from "openai";
import { process } from './env';

const mySecret = process.env['key']
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});
const brainstormInput = document.querySelector(".brainstormInput");
const brainstormArea = document.querySelector(".brainstormArea");
const brainstormForm = document.querySelector(".brainstormForm");
const brainstormHome = document.querySelector('.brainstormHome');
const brainstormResults = document.querySelector('.brainstormResults');






async function handleBrainstorm(event) {
  event.preventDefault()
  if (brainstormInput.value && brainstormArea.value) {
    brainstormHome.classList.add('addLayout')

    brainstormResults.classList.add('makeVisible')
    const prompt = `Brainstorm ideas for a college essay using the prompt ${brainstormInput.value}. Keep in mind the ideas should be relevant to the person's interests: ${brainstormArea.value}`
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
    });
    const splitString = response.choices[0].text.split(/\d+\. /);
    const stringWithBreaks = splitString.filter(Boolean).join("<br /><br />");
    document.querySelector('.brainstormingResults').innerHTML = stringWithBreaks
  } else {
    console.log("Nope")
  }
}
brainstormForm.addEventListener('submit', handleBrainstorm);


