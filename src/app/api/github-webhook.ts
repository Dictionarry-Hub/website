import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Only revalidate if push was to stable branch
    if (payload.ref === 'refs/heads/stable') {
      // Revalidate all content types
      revalidateTag('wiki-content');
      revalidateTag('release-group-tiers');
      // Revalidate other content types
      ['dev_logs', 'custom_formats', 'profiles', 'wiki'].forEach((type) => {
        revalidateTag(`content-${type}`);
      });

      return Response.json({ message: 'Revalidation successful' });
    }

    return Response.json({ message: 'Ignored - not stable branch' });
  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({ message: 'Error processing webhook' }, { status: 500 });
  }
}
