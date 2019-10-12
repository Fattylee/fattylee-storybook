import capitalizeSentence from './capitalizeSentence';

const truncateText = (text, maxChar) => {
 if(typeof maxChar != 'number') {
   throw new Error('Please supply maxChar')
 }
  const truncatedText = capitalizeSentence(text).slice(0, maxChar);
  return truncatedText.length >= maxChar ? truncatedText.trim() + '...' : truncatedText;
};

export default truncateText;

