export default async function handler(req, res) {
  // إرجاع Response سريعة لتأكيد إن الـ API شغال
  try {
    const response = await fetch('https://data.mongodb-api.com/app/data-qwxyt/endpoint/data/v1/action/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
      },
      body: JSON.stringify({
        dataSource: 'Cluster0',
        database: 'my-grocery-app',
        collection: 'products',
      }),
    });

    // لو الـ Fetch العادي فيه مشكلة في Vercel، ارجع ببيانات تجريبية أو تأكد من الـ Endpoint
    return res.status(200).json([
      { _id: "1", name: "Sample Product", price: 10 }
    ]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}