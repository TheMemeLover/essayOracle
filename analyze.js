import OpenAI from "openai";
import { process } from './env';

const mySecret = process.env['key']
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const outlineInput = document.querySelector(".outlineInput");
const outlineArea = document.querySelector(".outlineArea");
const essayArea = document.querySelector(".essayArea");
const analyzeForm = document.querySelector(".analyzeForm");
const outlineHome = document.querySelector('.outlineHome');
const outlineResults = document.querySelector('.outlineResults');
const analysisHome = document.querySelector('.analysisHome');


async function handleAnalysis(event) {
  event.preventDefault()
  
  if (outlineInput.value && essayArea.value && outlineArea.value) {
    analysisHome.classList.add("newLayout")
    outlineResults.classList.add('makeVisible')
    const prompt = `Analyze the college essay "${essayArea.value}" using the prompt ${outlineInput.value}. Keep in mind the analysis should be relevant to the person's interests: ${outlineArea.value}. Remember, talk about ALL the pros and cons of the essay according to the person's interests, and talk about everything that they could do better. Remember to elaborate on everything.`
    const response = await openai.completions.create({
      model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 3000,
      });

    document.querySelector('.outliningResults').innerHTML = response.choices[0].text
  }
}
analyzeForm.addEventListener('submit', handleAnalysis);