// List files function for Cloudflare Pages
export async function onRequestGet(context) {
  const { env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const objects = await env.MY_BUCKET.list();
    const files = [];
    
    for (const object of objects.objects) {
      const fileInfo = {
        filename: object.key,
        size: object.size,
        uploadedAt: object.uploaded,
        url: `https://g103200-file-share.pages.dev/public-images/${object.key}`,
        type: object.httpMetadata?.contentType || 'unknown',
        markdown: `![${object.key}](https://g103200-file-share.pages.dev/public-images/${object.key})`
      };
      files.push(fileInfo);
    }
    
    // Sort by upload date (newest first)
    files.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    
    return new Response(JSON.stringify({
      success: true,
      files: files,
      total: files.length,
      totalSize: files.reduce((sum, file) => sum + file.size, 0)
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('List files error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to list files',
      message: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
} 