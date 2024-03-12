const core = require('nft-chatbot-core');
const natural = require('natural');
const axios = require('axios');

// Enhanced feature: Perform sentiment analysis on NFT collection descriptions from a mock API and log results
async function enhance() {
    console.log('Enhancing NFT chatbot with sentiment analysis on NFT collections.');
    const apiUrl = 'https://api.mocknft.com/collections';
    try {
        const response = await axios.get(apiUrl);
        const collections = response.data;
        const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
        const tokenizer = new natural.WordTokenizer();
        
        collections.forEach(collection => {
            const tokens = tokenizer.tokenize(collection.description);
            const sentiment = analyzer.getSentiment(tokens);
            console.log(`Collection: ${collection.name}, Sentiment: ${sentiment > 0 ? 'Positive' : sentiment < 0 ? 'Negative' : 'Neutral'}`);
        });
    } catch (error) {
        console.error('Error enhancing chatbot:', error);
    }
}

module.exports = { enhance };
