// Upload function for Cloudflare Pages
const UPLOAD_TOKEN = 'Gbenjamin3#,';
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB limit
const ALLOWED_TYPES = [
  'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 
  'image/svg+xml', 'image/bmp', 'image/tiff',
  'application/pdf', 'text/plain', 'application/json'
];

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Content-Length',
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

    if (!request.body) {
      return new Response(JSON.stringify({ error: 'Request body is empty' }), { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const contentType = request.headers.get('Content-Type');
    const contentLength = parseInt(request.headers.get('Content-Length') || '0');

    // Validate file type
    if (!ALLOWED_TYPES.includes(contentType)) {
      return new Response(JSON.stringify({ 
        error: 'Unsupported file type',
        allowedTypes: ALLOWED_TYPES 
      }), { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate file size
    if (contentLength > MAX_FILE_SIZE) {
      return new Response(JSON.stringify({ 
        error: 'File too large',
        maxSize: MAX_FILE_SIZE,
        receivedSize: contentLength
      }), { 
        status: 413,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const extension = getMimeType(contentType);
    const randomFileName = `${timestamp}-${crypto.randomUUID()}${extension}`;

    // Upload to R2
    await env.MY_BUCKET.put(randomFileName, request.body, {
      httpMetadata: {
        contentType: contentType,
        cacheControl: 'public, max-age=31536000',
      },
      customMetadata: {
        uploadedAt: new Date().toISOString(),
        originalType: contentType,
        size: contentLength.toString()
      }
    });

    const publicUrl = `https://g103200-file-share.pages.dev/public-images/${randomFileName}`;
    
    return new Response(JSON.stringify({
      success: true,
      url: publicUrl,
      filename: randomFileName,
      size: contentLength,
      type: contentType,
      uploadedAt: new Date().toISOString(),
      markdown: `![${randomFileName}](${publicUrl})`
    }), { 
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ 
      error: 'Upload failed',
      message: error.message 
    }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

function getMimeType(contentType) {
  if (!contentType) return '';
  
  const mimeMap = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'image/bmp': '.bmp',
    'image/tiff': '.tiff',
    'application/pdf': '.pdf',
    'text/plain': '.txt',
    'application/json': '.json'
  };
  
  return mimeMap[contentType] || '';
} 