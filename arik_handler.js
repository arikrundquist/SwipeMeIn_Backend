'use strict';

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  module.exports.thisIsATest = async(event, context) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'I wonder if this will work...',
        input: event,
      }),
    };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
