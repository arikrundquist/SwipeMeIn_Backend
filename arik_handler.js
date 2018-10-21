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


module.exports.postSwipe = async (event, context) => {
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
        console.log(`postSwipe ERROR=${error.stack}`);
        resolve({
          statusCode: 400,
          error: `postSwipe: ${error.stack}`
        });

      } else {
        console.log(`postSwipe data=${JSON.stringify(data)}`);
        resolve({ statusCode: 200, body: JSON.stringify(params.Item) });
      }
    });
  });
};


module.exports.postDonation = async (event, context) => {
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
  const { donationId, swiperId, schoolId, amount } = _parsed;

  const params = {
    TableName: "Donations",
    Item: {
      donationId: donationId,
      swiperId: swiperId,
      schoolId: schoolId,
      amount: amount
    },
  };

  return await new Promise((resolve, reject) => {
    dynamoDb.put(params, (error, data) => {
      if (error) {
        console.log(`postDonation ERROR=${error.stack}`);
        resolve({
          statusCode: 400,
          error: `postDonation: ${error.stack}`
        });

      } else {
        console.log(`postDonation data=${JSON.stringify(data)}`);
        resolve({ statusCode: 200, body: JSON.stringify(params.Item) });
      }
    });
  });
};


module.exports.getDonation = async (event, context) => {

  if (!("queryStringParameters" in event) || !(event.queryStringParameters)) {
    return {
      statusCode: 404,
      error: `No Query String`
    };
  }
  if (!(event.queryStringParameters.donationId)) {
    return {
      statusCode: 404,
      error: `No donationId in Query String: ${JSON.stringify(event.queryStringParameters)}`
    };
  }

  const params = {
    TableName: "Donations",
    Key: { donationId: event.queryStringParameters.donationId }
  };

  return await new Promise((resolve, reject) => {
    dynamoDb.get(params, function(err, data) {
      if (err) {
        console.log(`getDonation ERROR=${error.stack}`);
        resolve({
          statusCode: 400,
          error: `Could not retrieve donation: ${error.stack}`
        });
      } else if (!data || typeof data === 'undefined' || !data.Item) {
        console.log(`getDonation did not find donationId=${event.queryStringParameters.donationId}`);
        resolve({
          statusCode: 404,
          error: `Could not find donation for donationId: ${event.queryStringParameters.donationId}`
        });
      } else {
        console.log(`getMessage data=${JSON.stringify(data.Item)}`);
        resolve({ statusCode: 200, body: JSON.stringify(data.Item) });
      }
    });
  });
};