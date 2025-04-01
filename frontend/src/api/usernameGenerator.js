import { checkUserName } from "./auth.api";
class UsernameGenerator {
  constructor() {
    this.adjectives = [
      'fierce', 'stealthy', 'mystic', 'electric', 'shadowy', 'radiant', 'blazing',
      'lunar', 'astral', 'venomous', 'rogue', 'thunderous', 'spectral', 'arcane',
      'crimson', 'ironclad', 'obsidian', 'phantom', 'cosmic', 'runic'
    ];
    
    this.nouns = [
      'warrior', 'samurai', 'lynx', 'raven', 'vortex', 'sphinx', 'striker', 'sentinel',
      'falcon', 'pyro', 'nova', 'cyborg', 'pioneer', 'oracle', 'golem', 'juggernaut',
      'tundra', 'nebula', 'drifter', 'ranger'
    ];

    this.maxLength = 15;
  }

async generateUsername(userInput = '') {
    let trimmedInput = userInput.length >= 10 ? userInput.slice(0, 10) : userInput;

    let attempts = 0;
    let isAvailable = false;
    let username = '';

    while (!isAvailable && attempts < 10) {
        const randomAdjective = this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
        const randomNoun = this.nouns[Math.floor(Math.random() * this.nouns.length)];
        const randomNumber = Math.floor(Math.random() * 999);
        const specialChar = '_'; 

        username = userInput
            ? `${trimmedInput}${specialChar}${this.capitalizeFirst(randomNoun)}${randomNumber}`
            : `${this.capitalizeFirst(randomAdjective)}${this.capitalizeFirst(randomNoun)}${randomNumber}`;

        isAvailable = await this.checkAvailability(username);
        attempts++;
    }

    return username.length > this.maxLength ? username.slice(0, this.maxLength) : username;
}


  async generateSuggestions(userInput = '', count = 15) {
    return await Promise.all(
    Array.from({ length: count }, () => this.generateUsername(userInput))
  );
  }

  async getAvailableSuggestions(userInput = '', count = 5) {
    const suggestions = [];
    const maxAttempts = count * 5; 
    let attempts = 0;

    while (suggestions.length < count && attempts < maxAttempts) {
      const username =await this.generateUsername(userInput);
      const isAvailable = await this.checkAvailability(username);

      if (isAvailable) {
        suggestions.push(username);
      }
      attempts++;
    }

    return suggestions.length > 0 ? suggestions : ['No available usernames found'];
  }

  async checkAvailability(username) {
    try {
      const response = await checkUserName(username);
      const data = response.data;
      return data.success;
    } catch (error) {
      console.error('Error checking username availability:', error);
      return false;
    }
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export default UsernameGenerator;