'use strict';

const AWS = require('aws-sdk');
const AWS_DEPLOY_REGION = "us-east-1";
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    api_version: '2012-08-10',
    region: AWS_DEPLOY_REGION
});

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};


module.exports.thisIsATest = async(event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'I wonder if this will work...',
      input: event,
   }),
  };
};

module.exports.dbTestCreate = async (event, context) => {
  let _parsed;
  try {
    _parsed = JSON.parse(event.body);
  } catch (err) {
    console.error(`Could not parse requested JSON ${event.body}: ${err.stack}`);
    return {
      statusCode: 500,
      error: `Could not parse requested JSON: ${err.stack}`
    };
  }
  const { swipeId, swiperId, dateTime, swipeLimit, timeCreated, isDonation, swiperConfirmed, customerId, customerIdsConfirmed, transactionCompleted } = _parsed;

  const params = {
    TableName: "Swipes",
    Item: {
      swipeId: swipeId,
      swiperId: swiperId,
      dateTime: dateTime,
      swipeLimit: swipeLimit,
      timeCreated: timeCreated,
      isDonation: isDonation,
      swiperConfirmed: swiperConfirmed,
      customerId: customerId,
      customerIdsConfirmed: customerIdsConfirmed,
      transactionCompleted: transactionCompleted
    },
  };

  return await new Promise((resolve, reject) => {
    dynamoDb.put(params, (error, data) => {
      if (error) {
        console.log(`dbTestCreate ERROR=${error.stack}`);
        resolve({
          statusCode: 400,
          error: `dbTestCreate: ${error.stack}`
        });

      } else {
        console.log(`dbTestCreate data=${JSON.stringify(data)}`);
        resolve({ statusCode: 200, body: JSON.stringify(params.Item) });
      }
    });
  });
};