const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
  secret: 'seu_fauna_db_secret'
});

exports.handler = async (event) => {
  try {
    if (event.httpMethod === 'GET') {
      const data = await client.query(
        q.Get(q.Ref(q.Collection('site_config'), '1'))
      );
      return {
        statusCode: 200,
        body: JSON.stringify(data.data)
      };
    }
    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body);
      await client.query(
        q.Replace(
          q.Ref(q.Collection('site_config'), '1'),
          { data }
        )
      );
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
