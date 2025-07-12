// Serve files from R2 bucket
export async function onRequestGet(context) {
  const { request, env, params } = context;
  
  const filename = params.file;
  
  if (!filename) {
    return new Response('File not specified', { status: 400 });
  }

  try {
    const object = await env.MY_BUCKET.get(filename);

    if (object === null) {
      return new Response('File not found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=31536000');
    headers.set('Access-Control-Allow-Origin', '*');

    return new Response(object.body, { headers });
  } catch (error) {
    console.error('File serve error:', error);
    return new Response('Failed to serve file', { status: 500 });
  }
} 