// pages/api/sitemap.js
import { NextResponse } from 'next/server';

export async function GET(req) {
  const baseUrl = 'https://sjhrc.in';

  const staticPages = [
    '', // Homepage
    '/about', // About Us
    '/contact', // Contact Us
    '/services', // Services Offered
    '/departments', // Departments
    '/specialists', // Medical Specialists
    '/appointments', // Book an Appointment
    '/patient-resources', // Patient Resources
    '/blog', // Hospital Blog
    '/news', // News and Announcements
    '/faq', // Frequently Asked Questions
  ];

  // Generate the sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((page) => {
          return `<url><loc>${baseUrl}${page}</loc></url>`;
        })
        .join('')}
    </urlset>`;

  // Create a response with the sitemap
  const res = NextResponse.json(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });

  return res;
}
