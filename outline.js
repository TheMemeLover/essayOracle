import OpenAI from "openai";
import { process } from './env';

const mySecret = process.env['key']
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const outlineIdea = document.querySelector('.outlineIdea');
const outlineInput = document.querySelector(".outlineInput");
const outlineArea = document.querySelector(".outlineArea");
const outlineForm = document.querySelector(".outlineForm");
const outlineHome = document.querySelector('.outlineHome');
const outlineResults = document.querySelector('.outlineResults');

async function handleOutline(event) {
  event.preventDefault()
  if (outlineInput.value && outlineIdea.value && outlineArea.value) {
    outlineHome.classList.add("newLayout")
    outlineResults.classList.add('makeVisible')
    const prompt = `Outline a college essay using the prompt ${outlineInput.value}. Keep in mind the essay outline should be relevant to the person's interests: ${outlineArea.value}. Remember, do not write an essay, rather write an outline that will help the student write the essay.`
    const response = await openai.completions.create({
      model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 3000,
      });
    const sections = response.choices[0].text.split(/(?=I\.\s|II\.\s|III\.\s)/);

    // Format the sections with proper indentation and line breaks
    const formattedText = sections.map(section => {
        return section
            .replace(/^([A-Z])\.\s/gm, "    $&") // Add indentation for uppercase letters (A, B, C)
            .replace(/^(\d+)\.\s/gm, "          $&") // Add extra indentation for numbers (1, 2, 3)
            .replace(/\.\.\s+/g, "..\n\n") // Replace ".." with line breaks
    }).join("\n");
    console.log(formattedText)
    document.querySelector('.outliningResults').innerHTML = `<pre>${formattedText}</pre>`
  }
}
outlineForm.addEventListener('submit', handleOutline);