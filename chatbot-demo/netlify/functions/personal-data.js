const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    // Load personal data from the same directory as the function
    const dataPath = path.join(__dirname, 'KavindaDetails.txt');
    const personalData = fs.readFileSync(dataPath, 'utf-8');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ data: personalData }),
    };
  } catch (error) {
    console.error('Error loading personal data:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to load personal data',
        data: "Kavinda Rajapaksha is a final year Computer Engineering undergraduate at University of Ruhuna, specializing in cloud data engineering."
      }),
    };
  }
};
