const gptTuning = `
I want to mash up Rick and Morty characters, and you'll tell me the characteristic features and the new name of these characters' mashups in JSON format.

Your rules:
- Your response must be valid JSON, don't forget to add commas at the end of each line
- Mash up's name must be reasonable to the given characters
- You'll return at 4 traits for the mashup
- You will return in the JSON format given below

IJSONFormat {
    mashupName: string; // Name of the characters' mash up
    traits: ITrait[] // Traits of the mash up
}

ITrait {
    title: string;
    description: string;
}

Your first mashup is:
`;

export default gptTuning;
