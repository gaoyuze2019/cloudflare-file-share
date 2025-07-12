// Delete file function for Cloudflare Pages
const UPLOAD_TOKEN = 'Gbenjamin3#,';

export async function onRequestPost(context) {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = request.headers.get('X-Auth-Token');
    if (token !== UPLOAD_TOKEN) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const filename = body.filename;

    if (!filename) {
      return new Response(JSON.stringify({ error: 'Please specify a filename to delete' }), { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check if file exists first
    const object = await env.MY_BUCKET.get(filename);
    if (object === null) {
      return new Response(JSON.stringify({ error: 'File not found' }), { 
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    await env.MY_BUCKET.delete(filename);
    return new Response(JSON.stringify({ 
      success: true,
      message: `Deleted: ${filename}`,
      deletedAt: new Date().toISOString()
    }), { 
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Delete error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to delete file',
      message: error.message 
    }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
} 